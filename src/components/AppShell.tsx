"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { LangProvider } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/GrainOverlay";
import Cursor from "@/components/Cursor";

type AppContextType = {
  /** page navigation with block-wipe transition; handles same-page hash scrolls */
  navigate: (href: string) => void;
};

const AppContext = createContext<AppContextType>({
  navigate: () => {},
});

export const useApp = () => useContext(AppContext);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const navigatingRef = useRef(false);
  const pendingHashRef = useRef<string | null>(null);
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToHash = useCallback((hash: string, immediate = false) => {
    // when the home deck is active, hashes are slides, not scroll targets
    const deckGo = (window as unknown as Record<string, unknown>).__deckGoTo;
    if (typeof deckGo === "function" && deckGo(hash.slice(1))) return;
    const target = document.querySelector(hash);
    if (!target) return;
    (target as HTMLElement).scrollIntoView({
      behavior: immediate || prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  /* ── Route transitions: geometric block wipe (acid sliver leads, ink covers) ── */
  const navigate = useCallback(
    (href: string) => {
      const [path, hash] = href.split("#");
      const targetPath = path === "" ? pathname : path;

      if (targetPath === pathname && hash) {
        scrollToHash(`#${hash}`);
        return;
      }
      if (targetPath === pathname && !hash) {
        const deckGo = (window as unknown as Record<string, unknown>).__deckGoTo;
        if (typeof deckGo === "function" && deckGo("top")) return;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
        return;
      }

      navigatingRef.current = true;
      pendingHashRef.current = hash ? `#${hash}` : null;
      const curtain = curtainRef.current;
      if (!curtain) {
        router.push(href);
        return;
      }
      const acid = curtain.querySelector<HTMLElement>(".route-curtain__acid");
      const ink = curtain.querySelector<HTMLElement>(".route-curtain__ink");
      const d = prefersReducedMotion() ? 0.01 : 0.55;
      gsap
        .timeline()
        .set(curtain, { display: "block" })
        .set([acid, ink], { yPercent: 101 })
        .to(acid, { yPercent: 0, duration: d, ease: "power3.inOut" }, 0)
        .to(ink, {
          yPercent: 0,
          duration: d,
          ease: "power3.inOut",
          onComplete: () => router.push(targetPath || "/"),
        }, 0.08);

      // failsafe: if the route never changes, lift the curtain
      failsafeRef.current = setTimeout(() => {
        if (!navigatingRef.current) return;
        navigatingRef.current = false;
        pendingHashRef.current = null;
        gsap.to([ink, acid], {
          yPercent: 101,
          duration: prefersReducedMotion() ? 0.01 : 0.5,
          ease: "power3.inOut",
          stagger: 0.08,
          onComplete: () => gsap.set(curtain, { display: "none" }),
        });
      }, 4000);
    },
    [pathname, router, scrollToHash]
  );

  // Reveal the new page once the route has actually changed
  useEffect(() => {
    if (!navigatingRef.current) return;
    navigatingRef.current = false;
    if (failsafeRef.current) {
      clearTimeout(failsafeRef.current);
      failsafeRef.current = null;
    }
    const curtain = curtainRef.current;

    requestAnimationFrame(() => {
      if (pendingHashRef.current) {
        scrollToHash(pendingHashRef.current, true);
        pendingHashRef.current = null;
      } else {
        window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
      if (curtain) {
        const acid = curtain.querySelector<HTMLElement>(".route-curtain__acid");
        const ink = curtain.querySelector<HTMLElement>(".route-curtain__ink");
        const d = prefersReducedMotion() ? 0.01 : 0.6;
        gsap
          .timeline({
            delay: prefersReducedMotion() ? 0 : 0.12,
            onComplete: () => gsap.set(curtain, { display: "none" }),
          })
          .to(ink, { yPercent: -101, duration: d, ease: "power3.inOut" }, 0)
          .to(acid, { yPercent: -101, duration: d, ease: "power3.inOut" }, 0.08);
      }
    });
  }, [pathname, scrollToHash]);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.setTimeout(() => scrollToHash(window.location.hash, true), 0);
      return () => window.clearTimeout(id);
    }
  }, [scrollToHash]);

  /* Screenshots finish loading after ScrollTrigger's initial measurement —
     refresh positions when one settles so reveals don't use stale offsets. */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const scheduleRefresh = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    const onLoad = (event: Event) => {
      if ((event.target as HTMLElement)?.tagName !== "IMG") return;
      scheduleRefresh();
    };
    document.addEventListener("load", onLoad, true);
    window.addEventListener("load", scheduleRefresh);
    return () => {
      document.removeEventListener("load", onLoad, true);
      window.removeEventListener("load", scheduleRefresh);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <LangProvider>
      <AppContext.Provider value={{ navigate }}>
        <GrainOverlay />
        <Cursor />
        <Header />
        <div id="page-root">{children}</div>
        <Footer />
        <div ref={curtainRef} className="route-curtain" aria-hidden="true">
          <div className="route-curtain__acid" />
          <div className="route-curtain__ink" />
        </div>
      </AppContext.Provider>
    </LangProvider>
  );
}

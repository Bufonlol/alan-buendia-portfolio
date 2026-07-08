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
import Navbar from "@/components/Navbar";
import GrainOverlay from "@/components/GrainOverlay";
import Cursor from "@/components/Cursor";
import BootIntro from "@/components/BootIntro";
import AvailableBadge from "@/components/AvailableBadge";
import EasterEggs from "@/components/EasterEggs";

type AppContextType = {
  /** true once the preloader has finished — entrance animations key off this */
  ready: boolean;
  /** page navigation with curtain transition; handles same-page hash scrolls */
  navigate: (href: string) => void;
};

const AppContext = createContext<AppContextType>({
  ready: true,
  navigate: () => {},
});

export const useApp = () => useContext(AppContext);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigatingRef = useRef(false);
  const pendingHashRef = useRef<string | null>(null);
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToHash = useCallback((hash: string, immediate = false) => {
    const target = document.querySelector(hash);
    if (!target) return;
    (target as HTMLElement).scrollIntoView({
      behavior: immediate || prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  /* ───────────── Page transitions (ink curtain) ───────────── */
  const navigate = useCallback(
    (href: string) => {
      const [path, hash] = href.split("#");
      const targetPath = path === "" ? pathname : path;

      // Same page + hash → just smooth-scroll
      if (targetPath === pathname && hash) {
        scrollToHash(`#${hash}`);
        return;
      }
      if (targetPath === pathname && !hash) {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
        return;
      }

      navigatingRef.current = true;
      pendingHashRef.current = hash ? `#${hash}` : null;
      const overlay = overlayRef.current;
      if (!overlay) {
        router.push(href);
        return;
      }
      gsap
        .timeline()
        .set(overlay, { display: "flex", yPercent: 100 })
        .to(overlay, {
          yPercent: 0,
          duration: prefersReducedMotion() ? 0.01 : 0.55,
          ease: "power3.inOut",
          onComplete: () => router.push(targetPath || "/"),
        });

      // failsafe: if the route never changes (network/server error),
      // lift the curtain instead of stranding the user behind it
      failsafeRef.current = setTimeout(() => {
        if (!navigatingRef.current) return;
        navigatingRef.current = false;
        pendingHashRef.current = null;
        gsap.to(overlay, {
          yPercent: 100,
          duration: prefersReducedMotion() ? 0.01 : 0.5,
          ease: "power3.inOut",
          onComplete: () => gsap.set(overlay, { display: "none" }),
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
    const overlay = overlayRef.current;

    // Land at the top (or at the requested hash) before the curtain lifts
    requestAnimationFrame(() => {
      if (pendingHashRef.current) {
        scrollToHash(pendingHashRef.current, true);
        pendingHashRef.current = null;
      } else {
        window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
      if (overlay) {
        gsap.to(overlay, {
          yPercent: -100,
          duration: prefersReducedMotion() ? 0.01 : 0.6,
          delay: prefersReducedMotion() ? 0 : 0.15,
          ease: "power3.inOut",
          onComplete: () => gsap.set(overlay, { display: "none" }),
        });
      }
    });
  }, [pathname, scrollToHash]);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.setTimeout(() => scrollToHash(window.location.hash, true), 0);
      return () => window.clearTimeout(id);
    }
  }, [scrollToHash]);

  /* Images (bento thumbnails, art) finish loading after ScrollTrigger's initial
     measurement and shift layout — refresh positions whenever one settles so
     reveal animations don't get stuck at their pre-image-load offsets. */
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
      <AppContext.Provider value={{ ready: true, navigate }}>
        <BootIntro />
        <GrainOverlay />
        <Cursor />
        <Navbar />
        <AvailableBadge />
        <EasterEggs />
        <div id="page-root">{children}</div>
      {/* Route transition curtain */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[150] hidden items-center justify-center bg-ink text-paper"
        aria-hidden="true"
      >
        <div className="technical-grid absolute inset-0 opacity-25" />
        <div className="relative grid place-items-center">
          <span className="display text-outline-paper text-[clamp(4rem,12vw,6rem)]">AB / 26</span>
          <span className="u-label mt-5 border border-paper/40 px-4 py-3">
            SYSTEM / ROUTE TRANSFER
          </span>
        </div>
      </div>
      </AppContext.Provider>
    </LangProvider>
  );
}

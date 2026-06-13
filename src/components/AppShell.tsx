"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { LangProvider } from "@/lib/i18n";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import EasterEggs from "@/components/EasterEggs";

type AppContextType = {
  /** true once the preloader has finished — entrance animations key off this */
  ready: boolean;
  lenis: Lenis | null;
  /** page navigation with curtain transition; handles same-page hash scrolls */
  navigate: (href: string) => void;
};

const AppContext = createContext<AppContextType>({
  ready: false,
  lenis: null,
  navigate: () => {},
});

export const useApp = () => useContext(AppContext);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigatingRef = useRef(false);
  const pendingHashRef = useRef<string | null>(null);
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const readyRef = useRef(false);

  /* ───────────── Lenis smooth scroll, wired into GSAP's ticker ───────────── */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({ duration: 1.1, smoothWheel: true });
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    if (!readyRef.current) instance.stop(); // locked while preloader runs
    lenisRef.current = instance;
    setLenis(instance);
    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToHash = useCallback((hash: string, immediate = false) => {
    const target = document.querySelector(hash);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target as HTMLElement, {
        offset: 0,
        duration: immediate ? 0 : 1.4,
        immediate,
      });
    } else {
      (target as HTMLElement).scrollIntoView({
        behavior: immediate ? "auto" : "smooth",
      });
    }
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
        lenisRef.current?.scrollTo(0, { duration: 1.2 });
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
          duration: 0.55,
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
          duration: 0.5,
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
        lenisRef.current?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
      if (overlay) {
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.6,
          delay: 0.15,
          ease: "power3.inOut",
          onComplete: () => gsap.set(overlay, { display: "none" }),
        });
      }
    });
  }, [pathname, scrollToHash]);

  const handleLoaderDone = useCallback(() => {
    readyRef.current = true;
    setReady(true);
    lenisRef.current?.start();
    // Deep links like /#stack on first load
    if (window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash, true), 50);
    }
  }, [scrollToHash]);

  return (
    <LangProvider>
      <AppContext.Provider value={{ ready, lenis, navigate }}>
        <Preloader onDone={handleLoaderDone} />
        <Cursor />
        <Navbar />
        <EasterEggs />
        <div id="page-root">{children}</div>
      {/* Route transition curtain */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[150] hidden items-center justify-center bg-ink"
        aria-hidden="true"
      >
        <span className="display text-paper/20 text-[clamp(3rem,10vw,8rem)]">
          AB<span className="text-accent">◆</span>
        </span>
      </div>
        <div className="grain" aria-hidden="true" />
      </AppContext.Provider>
    </LangProvider>
  );
}

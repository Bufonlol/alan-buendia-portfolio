"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Lang = "es" | "en";

/** A bilingual string — every piece of copy on the site is one of these. */
export type L = { es: string; en: string };

const STORAGE_KEY = "ab-lang";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (v: L) => string;
}>({
  lang: "es",
  setLang: () => {},
  t: (v) => v.es,
});

/**
 * Site language. Spanish is the default and what the server renders;
 * a saved preference is applied right after mount (behind the preloader,
 * so the swap is never visible on first load).
 */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback((v: L) => v[lang], [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

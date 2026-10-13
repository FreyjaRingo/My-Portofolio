"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { dict, type DictKey, type Lang } from "@/data/i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, toggle: () => {} });

const STORAGE_KEY = "pf-lang";
const EVENT = "pf-lang-change";
let memoryLang: Lang | null = null;

function readLang(): Lang {
  if (memoryLang) return memoryLang;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "ja" ? "ja" : "en";
  } catch {
    return "en";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function LangProvider({ children }: { children: ReactNode }) {
  // Server and first client render use English, then the saved choice applies.
  const lang = useSyncExternalStore(subscribe, readLang, () => "en" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    memoryLang = l;
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const toggle = useCallback(() => setLang(lang === "en" ? "ja" : "en"), [lang, setLang]);

  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

export function useT() {
  const { lang } = useLang();
  return useCallback((k: DictKey) => dict[k][lang], [lang]);
}

/** Inline translated string. Use inside server components too. */
export function T({ k }: { k: DictKey }) {
  const t = useT();
  return <>{t(k)}</>;
}

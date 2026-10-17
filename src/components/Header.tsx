"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { portfolioData } from "@/data/portfolio";
import type { DictKey } from "@/data/i18n";
import { openPalette } from "./CommandPalette";
import { useLang, useT } from "./LangProvider";

const sections: { id: string; code: string; k: DictKey }[] = [
  { id: "overview", code: "DES", k: "nav.overview" },
  { id: "experience", code: "EXP", k: "nav.experience" },
  { id: "projects", code: "PRJ", k: "nav.projects" },
  { id: "lab", code: "LAB", k: "nav.lab" },
  { id: "skills", code: "SKL", k: "nav.skills" },
  { id: "contact", code: "CNT", k: "nav.contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const t = useT();
  const { lang, setLang } = useLang();
  const isMac = useSyncExternalStore(
    () => () => {},
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => false,
  );

  const current = isHome ? active : pathname.startsWith("/projects") ? "projects" : pathname.startsWith("/lab") ? "lab" : "";

  // On narrow screens the nav scrolls sideways; keep the active chip in view.
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = navRef.current;
    const el = nav?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!nav || !el || nav.scrollWidth <= nav.clientWidth) return;
    const left = el.offsetLeft - (nav.clientWidth - el.offsetWidth) / 2;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nav.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  }, [current]);

  return (
    <header className="topbar" style={{ viewTransitionName: "site-header" }}>
      <div className="topbar-row">
        <Link href="/" className="brand" aria-label="Athallah Azhar, home" transitionTypes={isHome ? undefined : ["nav-back"]}>
          <span className="brand-ticker" translate="no">{portfolioData.personal.ticker}</span>
          <span className="brand-name" translate="no">Athallah Azhar</span>
        </Link>

        <nav ref={navRef} className="fn-nav" aria-label="Sections">
          {sections.map((s) => (
            <Link
              key={s.id}
              href={s.id === "lab" ? "/lab/fund-monitor" : `/#${s.id}`}
              className="fn-key"
              aria-current={current === s.id ? "true" : undefined}
              transitionTypes={s.id === "lab" && !pathname.startsWith("/lab") ? ["nav-forward"] : !isHome && s.id !== "lab" ? ["nav-back"] : undefined}
            >
              <kbd>{s.code}</kbd>
              <span>{t(s.k)}</span>
            </Link>
          ))}
        </nav>

        <div className="topbar-tools">
          <div className="lang-switch" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              EN
            </button>
            <button type="button" aria-pressed={lang === "ja"} onClick={() => setLang("ja")} lang="ja">
              日本語
            </button>
          </div>
          <button type="button" className="palette-trigger" onClick={() => openPalette()} aria-label="Open command palette">
            <Search className="palette-trigger-icon h-4 w-4" aria-hidden />
            <span className="palette-trigger-label">{t("cta.palette")}</span>
            <kbd className="kbd-desktop">{isMac ? "⌘" : "Ctrl"}</kbd>
            <kbd className="kbd-desktop">K</kbd>
          </button>
          <JakartaClock />
        </div>
      </div>
      <Ticker />
    </header>
  );
}

function JakartaClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="clock mono" aria-label={now ? `Jakarta time ${now}` : "Jakarta time"}>
      <span className="clock-zone">JKT</span>
      <span className="clock-time">{now ?? "--:--"}</span>
    </div>
  );
}

function Ticker() {
  const items = portfolioData.terminalTape;
  return (
    <div className="ticker" aria-label="Highlights">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="ticker-list" aria-hidden={copy === 1}>
            {items.map((item) => (
              <li key={`${copy}-${item.label}`}>
                <span className="t-label">{item.label}</span>
                <span className="t-value">{item.value}</span>
                <span className="t-trend">▲ {item.trend}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    if (!enabled) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [enabled]);
  return active;
}

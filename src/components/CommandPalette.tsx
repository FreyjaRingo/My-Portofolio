"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { portfolioData } from "@/data/portfolio";
import { useLang } from "./LangProvider";

const { personal } = portfolioData;

type Action = "cv" | "mail" | "li" | "gh" | "lang";

type Item = {
  id: string;
  code: string;
  label: string;
  hint: string;
  group: "Go to" | "Projects" | "Actions";
  keywords?: string;
  href?: string;
  action?: Action;
};

export const openPalette = (query = "") =>
  window.dispatchEvent(new CustomEvent("palette:open", { detail: { query } }));

export function CommandPalette() {
  const router = useRouter();
  const { lang, toggle } = useLang();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const close = useCallback(() => dialogRef.current?.close(), []);

  const go = useCallback(
    (href: string, forward = true) => {
      close();
      if (href.startsWith("/#")) {
        const id = href.slice(2);
        if (window.location.pathname === "/") {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", href);
          return;
        }
      }
      router.push(href, forward ? { transitionTypes: ["nav-forward"] } : undefined);
    },
    [close, router],
  );

  const items = useMemo<Item[]>(
    () => [
      { id: "des", code: "DES", label: "Overview", hint: "Summary and current role", group: "Go to", href: "/#overview" },
      { id: "exp", code: "EXP", label: "Experience", hint: "Danamon, Maybank, and more", group: "Go to", keywords: "work job intern", href: "/#experience" },
      { id: "prj", code: "PRJ", label: "Projects", hint: "Seven case studies", group: "Go to", keywords: "portfolio work", href: "/#projects" },
      { id: "lab", code: "LAB", label: "Fund Monitor demo", hint: "Interactive dashboard, synthetic data", group: "Go to", keywords: "mutual fund reksa dana dashboard demo", href: "/lab/fund-monitor" },
      { id: "skl", code: "SKL", label: "Skills and education", hint: "Stack, degree, certifications", group: "Go to", keywords: "jlpt toefl unpad", href: "/#skills" },
      { id: "cnt", code: "CNT", label: "Contact", hint: personal.email, group: "Go to", keywords: "email hire", href: "/#contact" },
      ...projects.map<Item>((p) => ({
        id: p.slug,
        code: p.code,
        label: p.title,
        hint: `${p.domains.join(", ")} · ${p.period}`,
        group: "Projects",
        keywords: `${p.stack.join(" ")} ${p.tagline}`,
        href: `/projects/${p.slug}`,
      })),
      { id: "cv", code: "CV", label: "Download CV", hint: "PDF, 2 pages", group: "Actions", keywords: "resume", action: "cv" },
      { id: "mail", code: "MAIL", label: "Copy email address", hint: personal.email, group: "Actions", keywords: "contact", action: "mail" },
      { id: "li", code: "LI", label: "Open LinkedIn", hint: "linkedin.com/in/athallah-azhar", group: "Actions", action: "li" },
      { id: "gh", code: "GH", label: "Open GitHub", hint: "github.com/FreyjaRingo", group: "Actions", action: "gh" },
      {
        id: "lang",
        code: "JA",
        label: lang === "en" ? "日本語で表示" : "Switch to English",
        hint: lang === "en" ? "Show the interface in Japanese" : "インターフェースを英語に戻す",
        group: "Actions",
        keywords: "japanese english language bahasa",
        action: "lang",
      },
    ],
    [lang],
  );

  const run = async (it: Item) => {
    if (it.href) return go(it.href);
    close();
    switch (it.action) {
      case "cv":
        window.open(personal.cv, "_blank", "noopener");
        break;
      case "li":
        window.open(personal.linkedin, "_blank", "noopener");
        break;
      case "gh":
        window.open(personal.github, "_blank", "noopener");
        break;
      case "lang":
        toggle();
        break;
      case "mail":
        try {
          await navigator.clipboard.writeText(personal.email);
          setToast("Email copied");
        } catch {
          window.location.href = `mailto:${personal.email}`;
        }
        break;
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    const terms = q.split(/\s+/);
    return items
      .map((it) => {
        const hay = `${it.code} ${it.label} ${it.hint} ${it.keywords ?? ""}`.toLowerCase();
        if (!terms.every((t) => hay.includes(t))) return null;
        const score = it.code.toLowerCase() === q ? 0 : it.code.toLowerCase().startsWith(q) ? 1 : it.label.toLowerCase().startsWith(q) ? 2 : 3;
        return { it, score };
      })
      .filter((x): x is { it: Item; score: number } => x !== null)
      .sort((a, b) => a.score - b.score)
      .map((x) => x.it);
  }, [items, query]);

  // Open on Ctrl/Cmd+K, "/" outside inputs, or a custom event.
  useEffect(() => {
    const open = (q = "") => {
      const d = dialogRef.current;
      if (!d) return;
      setQuery(q);
      setActive(0);
      if (!d.open) d.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    };
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = !!target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      } else if (e.key === "/" && !typing && !dialogRef.current?.open) {
        e.preventDefault();
        open();
      }
    };
    const onEvt = (e: Event) => open((e as CustomEvent<{ query?: string }>).detail?.query ?? "");
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onEvt);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onEvt);
    };
  }, [close]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) void run(filtered[active]);
    }
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className="palette"
        aria-label="Command palette"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="palette-box">
          <div className="palette-input-row">
            <span className="palette-prompt mono" aria-hidden>
              ATHL&nbsp;&gt;
            </span>
            <input
              ref={inputRef}
              className="palette-input mono"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Type a function (EXP, PRJ, CV) or search…"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={filtered[active] ? `pal-${filtered[active].id}` : undefined}
              aria-autocomplete="list"
              spellCheck={false}
              autoComplete="off"
            />
            <kbd className="palette-esc">Esc</kbd>
          </div>
          <ul id="palette-list" ref={listRef} className="palette-list" role="listbox" aria-label="Results">
            {filtered.length === 0 ? (
              <li className="palette-empty">No match. Try EXP, PRJ, or a tool like Python.</li>
            ) : (
              filtered.map((it, i) => {
                const header = i === 0 || filtered[i - 1].group !== it.group ? it.group : null;
                return (
                  <li key={it.id} role="presentation">
                    {header ? <p className="palette-group" aria-hidden>{header}</p> : null}
                    <div
                      id={`pal-${it.id}`}
                      role="option"
                      aria-selected={i === active}
                      data-index={i}
                      className="palette-item"
                      onMouseMove={() => setActive(i)}
                      onClick={() => void run(it)}
                    >
                      <kbd className="palette-code">{it.code}</kbd>
                      <span className="palette-label">{it.label}</span>
                      <span className="palette-hint">{it.hint}</span>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
          <div className="palette-foot mono" aria-hidden>
            <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
            <span><kbd>↵</kbd> open</span>
            <span><kbd>Ctrl</kbd><kbd>K</kbd> toggle</span>
          </div>
        </div>
      </dialog>
      <div className="toast" role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

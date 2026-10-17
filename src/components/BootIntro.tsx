"use client";

import { useEffect, useRef } from "react";

// First-visit "terminal boot" overlay.
//
// - Rendered on the server and animated with CSS only, so it never waits for JS
//   and the real page loads underneath at the same time.
// - BOOT_GATE (inline in <head>) decides before first paint whether to show it:
//   once per browser session, never with prefers-reduced-motion.
// - Any click, tap, or key skips it. Total runtime is about 1.3 s.

export const BOOT_KEY = "pf-boot";

// Runs before paint. Marks <html data-boot="skip"> when the intro should not show.
export const BOOT_GATE = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem("${BOOT_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.boot="skip"}else{sessionStorage.setItem("${BOOT_KEY}","1")}}catch(e){document.documentElement.dataset.boot="skip"}})();`;

type Line = { text: string; status: string };

export function BootIntro({ projects }: { projects: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || document.documentElement.dataset.boot === "skip") return;
    const skip = () => el.classList.add("boot-done");
    const done = () => {
      el.classList.add("boot-gone");
      cleanup();
    };
    const opts = { once: true } as const;
    window.addEventListener("keydown", skip, opts);
    el.addEventListener("pointerdown", skip, opts);
    el.addEventListener("animationend", (e) => {
      if (e.animationName === "boot-out") done();
    });
    const cleanup = () => {
      window.removeEventListener("keydown", skip);
      el.removeEventListener("pointerdown", skip);
    };
    return cleanup;
  }, []);

  const lines: Line[] = [
    { text: "connecting market data", status: "OK" },
    { text: `loading ${projects} case studies`, status: "OK" },
    { text: "JLPT N2 · TOEFL 600 · GPA 3.81", status: "OK" },
  ];

  return (
    <div ref={ref} className="boot" aria-hidden>
      <div className="boot-box mono">
        <p className="boot-cmd">
          <span className="boot-ticker">ATHL.JK</span> <span className="boot-amber">&lt;EQUITY&gt;</span> DES{" "}
          <span className="boot-go">&lt;GO&gt;</span>
        </p>
        <ul className="boot-lines">
          {lines.map((l, i) => (
            <li key={l.text} style={{ "--i": i } as React.CSSProperties}>
              <span className="boot-prompt">&gt;</span>
              <span className="boot-text">{l.text}</span>
              <span className="boot-dots" />
              <span className="boot-ok">{l.status}</span>
            </li>
          ))}
        </ul>
        <div className="boot-bar">
          <span />
        </div>
        <p className="boot-hint">press any key to skip</p>
      </div>
    </div>
  );
}

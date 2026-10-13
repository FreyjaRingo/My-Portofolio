"use client";

import { useEffect, useState } from "react";
import { openPalette } from "./CommandPalette";

const SUGGESTIONS = ["DES", "EXP", "PRJ", "LAB", "CV"];

// The hero's Bloomberg-style command line. It is a real control: activating it
// opens the command palette.
export function HeroCommand() {
  const [fn, setFn] = useState("DES");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % SUGGESTIONS.length;
      setFn(SUGGESTIONS[i]);
    }, 2400);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <button
      type="button"
      className="cmdline"
      onClick={() => openPalette()}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Open the command palette to search this site"
    >
      <span className="cmd-ticker">ATHL JK</span>
      <span className="cmd-mkt">&lt;Equity&gt;</span>
      <span className="cmd-fn" key={fn}>
        {fn}
      </span>
      <span className="cmd-go">&lt;GO&gt;</span>
      <span className="caret" aria-hidden />
      <span className="cmd-hint">Press / to search</span>
    </button>
  );
}

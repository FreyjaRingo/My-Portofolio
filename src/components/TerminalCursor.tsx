"use client";

import { useEffect, useRef } from "react";

// Terminal-style cursor layer for mouse users.
//
// The native cursor stays (precision, text I-beam, accessibility). On top of it:
// - faint chart crosshair lines with a position readout on the right edge,
// - an amber ring that trails the pointer and grows over links and buttons,
//   with a short label ("OPEN", "↗", or a data-cursor value).
// Only on fine pointers with hover, never with prefers-reduced-motion.
// Moves with transforms only and stops its animation loop when the ring settles.

const INTERACTIVE = 'a, button, [role="option"], summary, label, select, [data-cursor]';
const TEXT_INPUT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]';

export function TerminalCursor() {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const hx = useRef<HTMLDivElement>(null);
  const vy = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = root.current;
    if (!el) return;

    let on = false;
    let raf = 0;
    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let lastLabel = "";

    const paint = () => {
      rx += (tx - rx) * 0.22;
      ry += (ty - ry) * 0.22;
      ring.current!.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (Math.abs(tx - rx) > 0.3 || Math.abs(ty - ry) > 0.3) raf = requestAnimationFrame(paint);
      else raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.visible = "true";
      hx.current!.style.transform = `translate3d(0, ${ty}px, 0)`;
      vy.current!.style.transform = `translate3d(${tx}px, 0, 0)`;
      const doc = document.documentElement;
      const pct = ((window.scrollY + ty) / Math.max(1, doc.scrollHeight)) * 100;
      tag.current!.textContent = pct.toFixed(1);
      tag.current!.style.transform = `translate3d(0, ${ty}px, 0)`;

      const t = e.target instanceof Element ? e.target : null;
      const typing = !!t?.closest(TEXT_INPUT);
      const hit = typing ? null : t?.closest<HTMLElement>(INTERACTIVE);
      el.dataset.mode = typing ? "text" : hit ? "hover" : "idle";
      const next = hit
        ? hit.dataset.cursor ?? (hit.closest(".project-link") ? "OPEN" : hit.getAttribute("target") === "_blank" ? "↗" : "")
        : "";
      if (next !== lastLabel) {
        lastLabel = next;
        label.current!.textContent = next;
        el.dataset.label = next ? "true" : "false";
      }
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => (el.dataset.visible = "false");
    const onDown = () => (el.dataset.press = "true");
    const onUp = () => (el.dataset.press = "false");

    const start = () => {
      if (on) return;
      on = true;
      el.hidden = false;
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
    };
    const stop = () => {
      if (!on) return;
      on = false;
      el.hidden = true;
      cancelAnimationFrame(raf);
      raf = 0;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
    const sync = () => (fine.matches && !reduce.matches ? start() : stop());

    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      stop();
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div ref={root} className="tcursor" aria-hidden hidden data-visible="false" data-mode="idle" data-label="false">
      <div ref={hx} className="tcursor-h" />
      <div ref={vy} className="tcursor-v" />
      <span ref={tag} className="tcursor-tag mono" />
      <div ref={ring} className="tcursor-ring">
        <span className="tcursor-ring-shape" />
        <span ref={label} className="tcursor-label mono" />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

// Decorative market backdrop behind the whole site: a few faint price lines
// drifting left with thin volume bars. Purely visual (aria-hidden), no data
// meaning. Kept cheap on purpose:
// - the terminal grid is plain CSS, the canvas only draws lines and bars
// - capped frame rate (24 fps desktop, 15 fps touch) and pixel ratio
// - stops when the tab is hidden, draws one still frame for reduced motion

type Series = {
  color: string;
  alpha: number;
  band: number; // vertical centre, as a share of the viewport height
  amp: number; // swing in px
  vol: number; // step volatility
  pull: number; // mean reversion
  fill?: boolean;
  pts: number[];
};

const SEED = 20261017;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function MarketBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const touch = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fps = touch ? 15 : 24;
    const step = touch ? 9 : 7; // px between points
    const speed = touch ? 8 : 11; // px per second
    const rand = rng(SEED);
    const gauss = () => (rand() + rand() + rand() - 1.5) * 1.15;

    const series: Series[] = [
      { color: "255,160,40", alpha: 0.26, band: 0.3, amp: 90, vol: 0.13, pull: 0.02, fill: true, pts: [] },
      { color: "52,210,127", alpha: 0.18, band: 0.62, amp: 70, vol: 0.11, pull: 0.03, pts: [] },
      ...(touch ? [] : [{ color: "92,200,240", alpha: 0.15, band: 0.82, amp: 55, vol: 0.12, pull: 0.025, pts: [] } as Series]),
    ];
    let vols: number[] = [];

    let w = 0;
    let h = 0;
    let offset = 0;

    // Mean-reverting walk in [-1, 1]
    const next = (s: Series) => {
      const last = s.pts.length ? s.pts[s.pts.length - 1] : 0;
      const v = last + gauss() * s.vol - last * s.pull;
      return Math.max(-1, Math.min(1, v));
    };
    const fill = () => {
      const n = Math.ceil(w / step) + 3;
      for (const s of series) {
        while (s.pts.length < n) s.pts.push(next(s));
        if (s.pts.length > n) s.pts = s.pts.slice(-n);
      }
      while (vols.length < n) vols.push(rand());
      if (vols.length > n) vols = vols.slice(-n);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, touch ? 1.25 : 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fill();
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const amber = series[0];

      // Volume bars along the bottom, tied loosely to the amber series moves
      const barW = Math.max(2, step - 3);
      ctx.fillStyle = "rgba(255,160,40,0.06)";
      for (let i = 1; i < vols.length; i++) {
        const move = Math.abs(amber.pts[i] - amber.pts[i - 1]);
        const bh = 6 + (vols[i] * 0.5 + move * 6) * 34;
        ctx.fillRect(i * step - offset - barW / 2, h - bh, barW, bh);
      }

      for (const s of series) {
        const cy = h * s.band;
        const amp = Math.min(s.amp, h * 0.12);
        ctx.beginPath();
        for (let i = 0; i < s.pts.length; i++) {
          const x = i * step - offset;
          const y = cy - s.pts[i] * amp;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${s.color},${s.alpha})`;
        ctx.lineWidth = 1.25;
        ctx.stroke();

        if (s.fill) {
          const lastX = (s.pts.length - 1) * step - offset;
          ctx.lineTo(lastX, cy + amp * 1.6);
          ctx.lineTo(-offset, cy + amp * 1.6);
          ctx.closePath();
          const g = ctx.createLinearGradient(0, cy - amp, 0, cy + amp * 1.6);
          g.addColorStop(0, `rgba(${s.color},0.05)`);
          g.addColorStop(1, `rgba(${s.color},0)`);
          ctx.fillStyle = g;
          ctx.fill();
        }

        // Last price marker on the right edge
        const lx = (s.pts.length - 2) * step - offset;
        const ly = cy - s.pts[s.pts.length - 2] * amp;
        if (lx > 0 && lx < w) {
          ctx.fillStyle = `rgba(${s.color},${Math.min(0.5, s.alpha * 2.4)})`;
          ctx.beginPath();
          ctx.arc(lx, ly, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let raf = 0;
    let last = 0;
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (t - last < 1000 / fps) return;
      const dt = last ? Math.min(0.25, (t - last) / 1000) : 0;
      last = t;
      offset += speed * dt;
      while (offset >= step) {
        offset -= step;
        for (const s of series) {
          s.pts.shift();
          s.pts.push(next(s));
        }
        vols.shift();
        vols.push(rand());
      }
      draw();
    };

    const start = () => {
      if (raf || reduce.matches || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVis = () => (document.hidden ? stop() : start());
    const onMotion = () => (reduce.matches ? (stop(), draw()) : start());

    // Only react to real size changes; phone URL bars change innerHeight on scroll.
    let rt = 0;
    let lastW = 0;
    let lastH = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        if (canvas.clientWidth === lastW && Math.abs(canvas.clientHeight - lastH) < 120) return;
        lastW = canvas.clientWidth;
        lastH = canvas.clientHeight;
        resize();
      }, 150);
    };

    resize();
    lastW = w;
    lastH = h;
    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    reduce.addEventListener("change", onMotion);
    return () => {
      stop();
      window.clearTimeout(rt);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      reduce.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <div className="backdrop" aria-hidden style={{ viewTransitionName: "backdrop" }}>
      <canvas ref={ref} className="backdrop-canvas" />
    </div>
  );
}

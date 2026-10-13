"use client";

import { startTransition, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { benchmarks, funds, metrics, PERIODS, RISK_FREE, type Category, type Metrics, type PeriodKey } from "@/lib/funds";

const SERIES_COLORS = ["#ffa028", "#5cc8f0", "#34d27f", "#ff7ac0"];
const CATEGORIES: (Category | "All")[] = ["All", "Equity", "Balanced", "Fixed income", "Money market"];

type SortKey = keyof Metrics | "name";

const pct = (x: number, d = 1) => `${x >= 0 ? "+" : ""}${(x * 100).toFixed(d)}%`;
const num = (x: number, d = 2) => x.toFixed(d);

const COLUMNS: { key: SortKey; label: string; title: string }[] = [
  { key: "name", label: "Fund", title: "Fund name" },
  { key: "ret", label: "Return", title: "Total return over the period" },
  { key: "excess", label: "vs bench", title: "Return minus its benchmark's return" },
  { key: "vol", label: "Volatility", title: "Annualized standard deviation of daily returns" },
  { key: "sharpe", label: "Sharpe", title: `Annualized excess return over an assumed ${RISK_FREE * 100}% risk-free rate, divided by volatility` },
  { key: "mdd", label: "Max DD", title: "Largest peak-to-trough fall in the period" },
];

export function FundMonitor() {
  const [period, setPeriod] = useState<PeriodKey>("1Y");
  const [cat, setCat] = useState<Category | "All">("All");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "sharpe", dir: -1 });
  const [selected, setSelected] = useState<string[]>(["EQA", "BLA", "FIA"]);

  const days = PERIODS.find((p) => p.key === period)!.days;

  const rows = useMemo(() => {
    const list = funds
      .filter((f) => cat === "All" || f.category === cat)
      .map((f) => ({ fund: f, m: metrics(f.nav, benchmarks[f.benchmark], days) }));
    list.sort((a, b) => {
      if (sort.key === "name") return a.fund.name.localeCompare(b.fund.name) * sort.dir;
      return (a.m[sort.key] - b.m[sort.key]) * sort.dir;
    });
    return list;
  }, [cat, days, sort]);

  const best = rows.reduce<(typeof rows)[number] | null>((a, r) => (!a || r.m.ret > a.m.ret ? r : a), null);
  const safest = rows.reduce<(typeof rows)[number] | null>((a, r) => (!a || r.m.mdd > a.m.mdd ? r : a), null);
  const beat = rows.filter((r) => r.m.excess > 0).length;

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length >= 4 ? [...s.slice(1), id] : [...s, id]));

  const onSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: key === "name" || key === "vol" ? 1 : -1 }));

  return (
    <div className="fm">
      <div className="fm-controls">
        <div className="seg" role="group" aria-label="Period">
          {PERIODS.map((p) => (
            <button key={p.key} type="button" aria-pressed={period === p.key} onClick={() => startTransition(() => setPeriod(p.key))}>
              {p.key}
            </button>
          ))}
        </div>
        <div className="filters fm-cats" role="group" aria-label="Category">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className="filter-chip" aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <dl className="fm-kpis">
        <div className="kpi">
          <dt className="kpi-label">Top return, {period}</dt>
          <dd className="kpi-value">{best ? pct(best.m.ret) : "–"}</dd>
          <dd className="kpi-detail">{best?.fund.name}</dd>
        </div>
        <div className="kpi">
          <dt className="kpi-label">Smallest drawdown</dt>
          <dd className="kpi-value">{safest ? pct(safest.m.mdd) : "–"}</dd>
          <dd className="kpi-detail">{safest?.fund.name}</dd>
        </div>
        <div className="kpi">
          <dt className="kpi-label">Beat benchmark</dt>
          <dd className="kpi-value">
            {beat}/{rows.length}
          </dd>
          <dd className="kpi-detail">funds in view</dd>
        </div>
      </dl>

      <Chart ids={selected} days={days} />

      <div className="fm-table-wrap">
        <table className="fm-table">
          <caption className="sr-only">Fund metrics for the selected period. Tick a fund to add it to the chart (up to four).</caption>
          <thead>
            <tr>
              <th scope="col" className="fm-check-col">
                <span className="sr-only">Show in chart</span>
              </th>
              {COLUMNS.map((c) => (
                <th key={c.key} scope="col" aria-sort={sort.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : "none"} className={c.key === "name" ? "" : "num"}>
                  <button type="button" onClick={() => onSort(c.key)} title={c.title}>
                    {c.label}
                    <span className="sort-ind" aria-hidden>
                      {sort.key === c.key ? (sort.dir === 1 ? "▲" : "▼") : ""}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ fund, m }) => {
              const on = selected.includes(fund.id);
              const color = on ? SERIES_COLORS[selected.indexOf(fund.id)] : undefined;
              return (
                <tr key={fund.id} className={on ? "is-on" : ""}>
                  <td className="fm-check-col">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggle(fund.id)}
                      aria-label={`Show ${fund.name} in chart`}
                      style={color ? ({ "--c": color } as React.CSSProperties) : undefined}
                    />
                  </td>
                  <th scope="row">
                    <span className="fm-name">{fund.name}</span>
                    <span className="fm-cat mono">{fund.category}</span>
                  </th>
                  <td className={`num ${m.ret >= 0 ? "up" : "down"}`}>{pct(m.ret)}</td>
                  <td className={`num ${m.excess >= 0 ? "up" : "down"}`}>{pct(m.excess)}</td>
                  <td className="num">{pct(m.vol).replace("+", "")}</td>
                  <td className="num">{num(m.sharpe)}</td>
                  <td className="num down">{pct(m.mdd)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const narrowQuery = "(max-width: 640px)";
const subscribeNarrow = (cb: () => void) => {
  const mq = window.matchMedia(narrowQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

function Chart({ ids, days }: { ids: string[]; days: number }) {
  const narrow = useSyncExternalStore(subscribeNarrow, () => window.matchMedia(narrowQuery).matches, () => false);
  const W = narrow ? 420 : 960;
  const H = narrow ? 280 : 300;
  const pad = { l: 44, r: 12, t: 12, b: 26 };
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const series = useMemo(() => {
    const list = ids
      .map((id, i) => {
        const f = funds.find((x) => x.id === id);
        if (!f) return null;
        const s = f.nav.slice(-(days + 1));
        return { id, name: f.name, color: SERIES_COLORS[i], dash: undefined as string | undefined, values: s.map((v) => (v / s[0]) * 100) };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
    const eq = benchmarks.EQ.slice(-(days + 1));
    list.push({ id: "bench", name: "Equity benchmark", color: "#8a8473", dash: "4 4", values: eq.map((v) => (v / eq[0]) * 100) });
    return list;
  }, [ids, days]);

  const all = series.flatMap((s) => s.values);
  const lo = Math.floor(Math.min(...all) - 1);
  const hi = Math.ceil(Math.max(...all) + 1);
  const n = days + 1;
  const x = (i: number) => pad.l + (i / (n - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - lo) / (hi - lo)) * (H - pad.t - pad.b);
  const ticks = Array.from({ length: 5 }, (_, i) => lo + ((hi - lo) * i) / 4);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - pad.l) / (W - pad.l - pad.r)) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  const daysAgo = hover === null ? null : n - 1 - hover;

  return (
    <figure className="fm-chart">
      <figcaption className="fm-legend">
        {series.map((s) => (
          <span key={s.id} className="fm-legend-item">
            <svg width="18" height="8" aria-hidden>
              <line x1="0" x2="18" y1="4" y2="4" stroke={s.color} strokeWidth="2" strokeDasharray={s.dash} />
            </svg>
            {s.name}
            {hover !== null ? <span className="mono fm-legend-val">{s.values[hover].toFixed(1)}</span> : null}
          </span>
        ))}
        <span className="fm-legend-note mono">{daysAgo === null ? "Indexed to 100 at period start" : daysAgo === 0 ? "Latest" : `${daysAgo} trading days ago`}</span>
      </figcaption>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="fm-svg"
        role="img"
        aria-label={`Indexed performance of ${series.map((s) => s.name).join(", ")}. Exact figures are in the table below.`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} className="fm-grid" />
            <text x={pad.l - 8} y={y(t)} className="fm-tick" textAnchor="end" dominantBaseline="middle">
              {t.toFixed(0)}
            </text>
          </g>
        ))}
        <line x1={pad.l} x2={W - pad.r} y1={y(100)} y2={y(100)} className="fm-base" />
        {series.map((s) => (
          <polyline
            key={s.id}
            points={s.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")}
            fill="none"
            stroke={s.color}
            strokeWidth={s.id === "bench" ? 1.25 : 1.75}
            strokeDasharray={s.dash}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
        ))}
        {hover !== null ? (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={H - pad.b} className="fm-cross" />
            {series.map((s) => (
              <circle key={s.id} cx={x(hover)} cy={y(s.values[hover])} r="3.5" fill={s.color} stroke="#000" strokeWidth="1.5" />
            ))}
          </g>
        ) : null}
        <text x={pad.l} y={H - 6} className="fm-tick">
          {n - 1} trading days ago
        </text>
        <text x={W - pad.r} y={H - 6} className="fm-tick" textAnchor="end">
          Latest
        </text>
      </svg>
    </figure>
  );
}

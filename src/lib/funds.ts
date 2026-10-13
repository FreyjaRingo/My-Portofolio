// Synthetic mutual fund data for the public Fund Monitor demo.
// Nothing here is real: fund names, prices, and benchmarks are generated from a
// fixed seed so the demo looks the same for every visitor.

export type Category = "Equity" | "Balanced" | "Fixed income" | "Money market";

export type Fund = {
  id: string;
  name: string;
  category: Category;
  benchmark: "EQ" | "FI";
  nav: number[]; // daily NAV, oldest first
};

export const TRADING_DAYS = 504; // about two years
export const RISK_FREE = 0.05; // assumed annual risk-free rate for Sharpe, synthetic
export const SEED = 20260914; // chosen so every category lands in a plausible return range

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

function gauss(r: () => number) {
  const u = Math.max(r(), 1e-9);
  const v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const spec: { id: string; name: string; category: Category; mu: number; sigma: number; beta: number; start: number }[] = [
  { id: "EQA", name: "Equity Fund A", category: "Equity", mu: 0.11, sigma: 0.19, beta: 0.88, start: 1450 },
  { id: "EQB", name: "Equity Fund B", category: "Equity", mu: 0.07, sigma: 0.22, beta: 0.93, start: 2310 },
  { id: "EQS", name: "Sharia Equity Fund A", category: "Equity", mu: 0.09, sigma: 0.17, beta: 0.9, start: 1180 },
  { id: "BLA", name: "Balanced Fund A", category: "Balanced", mu: 0.08, sigma: 0.11, beta: 0.55, start: 1720 },
  { id: "BLB", name: "Balanced Fund B", category: "Balanced", mu: 0.065, sigma: 0.1, beta: 0.5, start: 1095 },
  { id: "FIA", name: "Fixed Income Fund A", category: "Fixed income", mu: 0.068, sigma: 0.035, beta: 0.8, start: 1615 },
  { id: "FIB", name: "Fixed Income Fund B", category: "Fixed income", mu: 0.074, sigma: 0.042, beta: 0.75, start: 1340 },
  { id: "MMA", name: "Money Market Fund A", category: "Money market", mu: 0.056, sigma: 0.006, beta: 0, start: 1530 },
];

export function build(seed = SEED) {
  const r = rng(seed);
  const dt = 1 / 252;
  const market: number[] = [];
  const bond: number[] = [];
  for (let i = 0; i < TRADING_DAYS; i++) {
    market.push(gauss(r));
    bond.push(gauss(r));
  }
  const path = (mu: number, sigma: number, start: number, shocks: (i: number) => number) => {
    const out = [start];
    for (let i = 1; i < TRADING_DAYS; i++) {
      const z = shocks(i);
      out.push(out[i - 1] * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z));
    }
    return out;
  };

  const benchmarks = {
    EQ: path(0.085, 0.18, 7000, (i) => market[i]),
    FI: path(0.066, 0.035, 1000, (i) => 0.25 * market[i] + 0.97 * bond[i]),
  };

  const funds: Fund[] = spec.map((s) => {
    const own: number[] = [];
    for (let i = 0; i < TRADING_DAYS; i++) own.push(gauss(r));
    const isFI = s.category === "Fixed income" || s.category === "Money market";
    const isBal = s.category === "Balanced";
    const factor = (i: number) => (isFI ? bond[i] : isBal ? 0.8 * market[i] + 0.6 * bond[i] : market[i]);
    const shocks = (i: number) => {
      const b = Math.min(1, s.beta);
      return b * factor(i) + Math.sqrt(Math.max(0, 1 - b * b)) * own[i];
    };
    return { id: s.id, name: s.name, category: s.category, benchmark: isFI ? "FI" : "EQ", nav: path(s.mu, s.sigma, s.start, shocks) };
  });

  return { funds, benchmarks };
}

export const { funds, benchmarks } = build();

export type Metrics = { ret: number; vol: number; sharpe: number; mdd: number; excess: number };

export function metrics(series: number[], bench: number[], days: number): Metrics {
  const n = series.length;
  const from = Math.max(0, n - 1 - days);
  const s = series.slice(from);
  const b = bench.slice(from);
  const ret = s[s.length - 1] / s[0] - 1;
  const bret = b[b.length - 1] / b[0] - 1;
  const lr: number[] = [];
  for (let i = 1; i < s.length; i++) lr.push(Math.log(s[i] / s[i - 1]));
  const mean = lr.reduce((a, x) => a + x, 0) / lr.length;
  const varr = lr.reduce((a, x) => a + (x - mean) ** 2, 0) / Math.max(1, lr.length - 1);
  const vol = Math.sqrt(varr) * Math.sqrt(252);
  const annRet = Math.pow(1 + ret, 252 / Math.max(1, s.length - 1)) - 1;
  const sharpe = vol > 0 ? (annRet - RISK_FREE) / vol : 0;
  let peak = s[0];
  let mdd = 0;
  for (const x of s) {
    peak = Math.max(peak, x);
    mdd = Math.min(mdd, x / peak - 1);
  }
  return { ret, vol, sharpe, mdd, excess: ret - bret };
}

export const PERIODS = [
  { key: "1M", days: 21 },
  { key: "3M", days: 63 },
  { key: "6M", days: 126 },
  { key: "1Y", days: 252 },
  { key: "2Y", days: TRADING_DAYS - 1 },
] as const;

export type PeriodKey = (typeof PERIODS)[number]["key"];

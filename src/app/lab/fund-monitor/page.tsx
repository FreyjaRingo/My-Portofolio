import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { FundMonitor } from "@/components/FundMonitor";

export const metadata: Metadata = {
  title: "Fund Monitor demo | Athallah Azhar",
  description: "Interactive mutual fund monitoring dashboard running on synthetic data: returns, volatility, Sharpe, drawdown, and benchmark comparison.",
};

export default function FundMonitorPage() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <article className="case lab" aria-labelledby="lab-title">
        <nav className="crumbs mono" aria-label="Breadcrumb">
          <Link href="/#lab" transitionTypes={["nav-back"]}>
            Lab
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page">Fund Monitor</span>
        </nav>

        <header className="case-head">
          <p className="case-kicker mono">
            <span className="case-code">LAB</span>
            Interactive demo
          </p>
          <h1 id="lab-title" className="case-title">
            Fund Monitor
          </h1>
          <p className="case-tagline">Compare funds on return, risk, and benchmark in one screen. Sort the table, change the period, and tick funds to chart them.</p>
        </header>

        <p className="notice" role="note">
          <strong>Synthetic data.</strong> Fund names, prices, and benchmarks are generated for this demo and do not describe any real product. Nothing here is investment advice.
        </p>

        <FundMonitor />

        <section className="case-section lab-notes" aria-labelledby="lab-why">
          <h2 id="lab-why" className="case-h2">
            Why this exists
          </h2>
          <div className="lab-notes-grid">
            <p>
              At Maybank I built a Streamlit dashboard that tracked mutual fund performance across several indicators and refreshed itself automatically, replacing manual data collection and cutting analysis time by 75%. That tool used licensed market data and stays inside the bank.
            </p>
            <p>
              This page rebuilds the core idea in public with generated data: rank funds by risk-adjusted return, compare each one with its benchmark, and see the path behind the numbers. The metrics are computed in your browser from daily prices.
            </p>
          </div>
          <dl className="method">
            <div>
              <dt>Return</dt>
              <dd>Last price over first price in the period, minus one.</dd>
            </div>
            <div>
              <dt>Volatility</dt>
              <dd>Standard deviation of daily log returns, annualized with √252.</dd>
            </div>
            <div>
              <dt>Sharpe</dt>
              <dd>Annualized return above an assumed 5% risk-free rate, divided by volatility.</dd>
            </div>
            <div>
              <dt>Max drawdown</dt>
              <dd>Largest fall from a running peak within the period.</dd>
            </div>
          </dl>
        </section>
      </article>
    </ViewTransition>
  );
}

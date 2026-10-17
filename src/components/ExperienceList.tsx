"use client";

import { useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { T } from "./LangProvider";

// On phones the list starts with the most recent roles only. Older roles are
// still in the DOM (for search engines and Ctrl+F) and hidden by CSS until the
// visitor expands them. Desktop always shows everything.
const VISIBLE_ON_PHONE = 3;

export function ExperienceList() {
  const items = portfolioData.experience;
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const hidden = Math.max(0, items.length - VISIBLE_ON_PHONE);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    // When collapsing, bring the list back into view so the visitor is not left far below it.
    if (!next) listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <ol ref={listRef} id="exp-list" className="blotter" data-collapsed={open ? "false" : "true"}>
        {items.map((item, i) => {
          const live = item.status.toUpperCase() === "LIVE";
          return (
            <li key={item.id} className={`trade${i >= VISIBLE_ON_PHONE ? " trade-more" : ""}`}>
              <div className="trade-meta">
                <span className="mono trade-period">{item.period}</span>
                <span className={`status ${live ? "status-up" : "status-flat"}`}>
                  <T k={live ? "status.active" : "status.completed"} />
                </span>
              </div>
              <div className="trade-body">
                <p className="trade-company">{item.company}</p>
                <h3 className="trade-title">{item.title}</h3>
                <ul className="trade-notes">
                  {item.descriptions.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
      {hidden > 0 ? (
        <button type="button" className="exp-toggle" aria-expanded={open} aria-controls="exp-list" onClick={toggle}>
          <T k={open ? "exp.showLess" : "exp.showMore"} />
          {open ? null : <span className="mono exp-toggle-count">+{hidden}</span>}
        </button>
      ) : null}
    </>
  );
}

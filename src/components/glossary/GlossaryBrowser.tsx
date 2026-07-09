"use client";

import { useMemo, useState } from "react";
import { glossaryTerms } from "@/data/glossary";

export function GlossaryBrowser() {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.toLowerCase().trim();
    const filtered = glossaryTerms.filter(
      (t) =>
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q),
    );
    const byCategory = new Map<string, typeof filtered>();
    for (const entry of filtered) {
      byCategory.set(entry.category, [...(byCategory.get(entry.category) ?? []), entry]);
    }
    return byCategory;
  }, [query]);

  const total = [...grouped.values()].reduce((sum, entries) => sum + entries.length, 0);

  return (
    <div className="mx-auto max-w-[800px]">
      <input
        type="text"
        id="glossary-search"
        name="glossary-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search terms (e.g. pod, SLO, GitOps)..."
        spellCheck={false}
        className="mb-4 w-full rounded-md border border-border bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent-blue"
      />

      {total === 0 ? (
        <p className="glass-panel rounded-xl px-6 py-10 text-center text-[13px] text-text-muted">
          No terms match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="space-y-5">
          {[...grouped.entries()].map(([category, entries]) => (
            <div key={category}>
              <p className="mb-2 text-[11px] tracking-wide text-text-dim uppercase">{category}</p>
              <div className="space-y-2">
                {entries.map((entry) => (
                  <div key={entry.term} className="rounded-md border border-border-3 bg-bg px-4 py-2.5">
                    <p className="mb-0.5 text-[13px] font-semibold text-accent-blue">{entry.term}</p>
                    <p className="text-[12px] leading-relaxed text-text-muted">{entry.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

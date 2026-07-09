"use client";

import { useMemo, useState } from "react";
import { rosettaTasks, type RosettaTask } from "@/data/rosetta";

const CATEGORIES = ["All", ...Array.from(new Set(rosettaTasks.map((t) => t.category)))];

const PROVIDER_META = [
  { key: "aws", label: "AWS", icon: "🟧" },
  { key: "azure", label: "Azure", icon: "🔷" },
  { key: "gcloud", label: "Google Cloud", icon: "🔴" },
  { key: "kubectl", label: "kubectl", icon: "☸️" },
] as const;

function matches(task: RosettaTask, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const haystack = [task.task, task.category, task.aws, task.azure, task.gcloud, task.kubectl]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export function RosettaStone() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const results = useMemo(() => {
    return rosettaTasks.filter(
      (t) => (category === "All" || t.category === category) && matches(t, query),
    );
  }, [query, category]);

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="glass-panel rounded-xl p-6">
        <label htmlFor="rosetta-search" className="mb-2 block text-sm font-medium text-text-muted">
          Search by task or intent — not exact syntax
        </label>
        <input
          id="rosetta-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. create a bucket, list VMs, assign a role..."
          spellCheck={false}
          className="w-full rounded-md border border-border bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent-blue"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3 py-1 text-[12px] font-medium ${
                category === c
                  ? "border-accent-blue/50 bg-accent-blue/10 text-accent-blue"
                  : "border-border bg-surface-2/40 text-text-muted hover:text-text"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-3 text-xs text-text-dim">
          {results.length} matching {results.length === 1 ? "task" : "tasks"} out of{" "}
          {rosettaTasks.length}. Everything is searched in your browser — nothing is sent anywhere.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {results.length === 0 && (
          <div className="glass-panel rounded-xl p-6 text-center text-sm text-text-muted">
            No matching tasks. Try a shorter phrase, or clear the category filter.
          </div>
        )}

        {results.map((t) => (
          <div key={t.id} className="glass-panel rounded-xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-text">{t.task}</p>
              <span className="rounded border border-border-3 bg-surface-2/60 px-2 py-0.5 text-[11px] font-medium text-text-muted">
                {t.category}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2">
              {PROVIDER_META.filter((p) => t[p.key]).map((p) => (
                <div
                  key={p.key}
                  className="grid grid-cols-[110px_1fr] items-center gap-3 rounded-md border border-border-3 bg-bg px-3 py-2"
                >
                  <span className="text-[12px] font-medium text-text-muted">
                    {p.icon} {p.label}
                  </span>
                  <code className="overflow-x-auto font-mono text-[12px] text-text-body">
                    {t[p.key]}
                  </code>
                </div>
              ))}
            </div>

            {t.notes && <p className="mt-3 text-[12px] text-text-dim">{t.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

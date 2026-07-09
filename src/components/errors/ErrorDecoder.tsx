"use client";

import { useMemo, useState } from "react";
import { errors, type ErrorEntry } from "@/data/errors";

const TOOLS = ["All", "Docker", "Kubernetes", "Terraform", "Git"] as const;
type ToolFilter = (typeof TOOLS)[number];

const TOOL_ICON: Record<ErrorEntry["tool"], string> = {
  Docker: "🐳",
  Kubernetes: "☸️",
  Terraform: "🏗️",
  Git: "🔀",
};

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "does", "for", "from",
  "has", "have", "in", "into", "is", "it", "of", "on", "or", "that", "the",
  "there", "this", "to", "was", "were", "will", "with", "already",
]);

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

function stem(word: string): string {
  return word.replace(/(ing|ed|es|s)$/, "");
}

function score(entry: ErrorEntry, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 1;

  const title = entry.title.toLowerCase();
  if (title.includes(q)) return 3;

  for (const phrase of entry.match) {
    if (phrase.toLowerCase().includes(q) || q.includes(phrase.toLowerCase())) return 3;
  }

  const queryWords = tokenize(q)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
    .map(stem);
  if (queryWords.length === 0) return 0;

  const haystackWords = new Set(
    tokenize(`${entry.title} ${entry.match.join(" ")} ${entry.cause} ${entry.fix}`).map(stem),
  );

  const hits = queryWords.filter((w) => haystackWords.has(w)).length;
  const ratio = hits / queryWords.length;
  if (ratio < 0.5) return 0;
  return ratio === 1 ? 2 : 1;
}

export function ErrorDecoder() {
  const [query, setQuery] = useState("");
  const [tool, setTool] = useState<ToolFilter>("All");

  const results = useMemo(() => {
    return errors
      .map((entry) => ({ entry, score: score(entry, query) }))
      .filter(({ entry, score: s }) => (tool === "All" || entry.tool === tool) && s > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ entry }) => entry);
  }, [query, tool]);

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="glass-panel rounded-xl p-6">
        <label htmlFor="error-search" className="mb-2 block text-sm font-medium text-text-muted">
          Paste an error message, or describe the symptom
        </label>
        <input
          id="error-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. CrashLoopBackOff, port is already allocated, merge conflict..."
          spellCheck={false}
          className="w-full rounded-md border border-border bg-bg px-4 py-3 font-mono text-sm text-text outline-none focus:border-accent-blue"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {TOOLS.map((t) => (
            <button
              key={t}
              onClick={() => setTool(t)}
              className={`rounded-full border px-3 py-1 text-[12px] font-medium ${
                tool === t
                  ? "border-accent-blue/50 bg-accent-blue/10 text-accent-blue"
                  : "border-border bg-surface-2/40 text-text-muted hover:text-text"
              }`}
            >
              {t !== "All" ? TOOL_ICON[t] : "🔎"} {t}
            </button>
          ))}
        </div>

        <p className="mt-3 text-xs text-text-dim">
          {results.length} matching {results.length === 1 ? "entry" : "entries"} out of{" "}
          {errors.length}. Everything is searched in your browser — nothing is sent anywhere.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {results.length === 0 && (
          <div className="glass-panel rounded-xl p-6 text-center text-sm text-text-muted">
            No matches. Try a shorter phrase from the error message, or clear the tool filter.
          </div>
        )}

        {results.map((entry) => (
          <div key={entry.id} className="glass-panel rounded-xl p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded border border-border-3 bg-surface-2/60 px-2 py-0.5 text-[11px] font-medium text-text-muted">
                {TOOL_ICON[entry.tool]} {entry.tool}
              </span>
            </div>
            <p className="mt-2 font-mono text-sm text-accent-error">{entry.title}</p>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <p className="text-[10px] tracking-wide text-text-dim uppercase">Cause</p>
                <p className="mt-1 text-[13px] text-text-body">{entry.cause}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-wide text-text-dim uppercase">Fix</p>
                <p className="mt-1 text-[13px] text-text-body">{entry.fix}</p>
              </div>
            </div>

            {entry.relatedCommands && entry.relatedCommands.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.relatedCommands.map((cmd) => (
                  <code
                    key={cmd}
                    className="rounded border border-border-3 bg-bg px-2 py-1 font-mono text-[11px] text-text-muted"
                  >
                    {cmd}
                  </code>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

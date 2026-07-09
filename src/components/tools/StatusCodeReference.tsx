"use client";

import { useMemo, useState } from "react";
import { exitCodes, httpStatusCodes } from "@/data/statusCodes";

function categoryOf(code: number): string {
  return `${Math.floor(code / 100)}xx`;
}

const CATEGORY_LABEL: Record<string, string> = {
  "1xx": "Informational",
  "2xx": "Success",
  "3xx": "Redirection",
  "4xx": "Client Error",
  "5xx": "Server Error",
};

function HttpTab() {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.toLowerCase().trim();
    const filtered = httpStatusCodes.filter(
      (c) =>
        !q ||
        c.code.toString().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q),
    );
    const byCategory = new Map<string, typeof filtered>();
    for (const entry of filtered) {
      const cat = categoryOf(entry.code);
      byCategory.set(cat, [...(byCategory.get(cat) ?? []), entry]);
    }
    return byCategory;
  }, [query]);

  return (
    <div>
      <input
        type="text"
        id="http-status-search"
        name="http-status-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by code, name, or keyword..."
        spellCheck={false}
        className="mb-4 w-full rounded-md border border-border bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent-blue"
      />
      <div className="space-y-5">
        {[...grouped.entries()].map(([cat, entries]) => (
          <div key={cat}>
            <p className="mb-2 text-[11px] tracking-wide text-text-dim uppercase">
              {cat} — {CATEGORY_LABEL[cat]}
            </p>
            <div className="space-y-2">
              {entries.map((entry) => (
                <div
                  key={entry.code}
                  className="grid grid-cols-[70px_140px_1fr] items-start gap-3 rounded-md border border-border-3 bg-bg px-3 py-2"
                >
                  <code className="font-mono text-[13px] text-accent-blue">{entry.code}</code>
                  <span className="text-[13px] font-medium text-text">{entry.name}</span>
                  <span className="text-[12px] text-text-muted">{entry.description}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExitCodeTab() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return exitCodes.filter(
      (c) =>
        !q ||
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div>
      <input
        type="text"
        id="exit-code-search"
        name="exit-code-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by code, name, or keyword..."
        spellCheck={false}
        className="mb-4 w-full rounded-md border border-border bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent-blue"
      />
      <div className="space-y-2">
        {filtered.map((entry) => (
          <div
            key={entry.code}
            className="grid grid-cols-[80px_180px_1fr] items-start gap-3 rounded-md border border-border-3 bg-bg px-3 py-2"
          >
            <code className="font-mono text-[13px] text-accent-blue">{entry.code}</code>
            <span className="text-[13px] font-medium text-text">{entry.name}</span>
            <span className="text-[12px] text-text-muted">{entry.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatusCodeReference() {
  const [tab, setTab] = useState<"http" | "exit">("http");

  return (
    <div className="mx-auto max-w-[800px]">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTab("http")}
          className={`rounded-full border px-3 py-1.5 text-[12px] font-medium ${
            tab === "http"
              ? "border-accent-blue/50 bg-accent-blue/10 text-accent-blue"
              : "border-border bg-surface-2/40 text-text-muted hover:text-text"
          }`}
        >
          HTTP Status Codes
        </button>
        <button
          onClick={() => setTab("exit")}
          className={`rounded-full border px-3 py-1.5 text-[12px] font-medium ${
            tab === "exit"
              ? "border-accent-blue/50 bg-accent-blue/10 text-accent-blue"
              : "border-border bg-surface-2/40 text-text-muted hover:text-text"
          }`}
        >
          POSIX Exit Codes
        </button>
      </div>

      <div className="glass-panel rounded-xl p-6">
        {tab === "http" ? <HttpTab /> : <ExitCodeTab />}
      </div>
    </div>
  );
}

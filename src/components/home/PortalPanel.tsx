"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tools } from "@/data/tools";
import { searchIndex } from "@/data/searchIndex";
import type { ToolCategory } from "@/data/types";
import { useCopy } from "./ToastProvider";

const CATEGORY_TABS: { id: ToolCategory | "all"; label: string }[] = [
  { id: "all", label: "All Tools" },
  { id: "container", label: "Containers & Orchestration" },
  { id: "iac", label: "Infrastructure as Code" },
  { id: "cicd", label: "CI / CD" },
  { id: "os", label: "Core OS" },
  { id: "monitoring", label: "Monitoring" },
];

const POPULAR_SNIPPETS = [
  {
    code: "docker system prune -a --volumes",
    desc: "Deep-clean all unused Docker artifacts",
  },
  {
    code: "kubectl get pods -A -o wide",
    desc: "List all pods across namespace + node IP",
  },
  {
    code: "git commit --amend --no-edit",
    desc: "Quietly amend files into the last commit",
  },
  { code: "ss -tulpn", desc: "List all active listening sockets and PIDs" },
];

export function PortalPanel() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolCategory | "all">("all");
  const copy = useCopy();

  const filteredTools = useMemo(
    () => (category === "all" ? tools : tools.filter((t) => t.category === category)),
    [category],
  );

  const searchMatches = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return searchIndex
      .filter(
        (entry) =>
          entry.cmd.toLowerCase().includes(q) ||
          entry.desc.toLowerCase().includes(q) ||
          entry.tool.toLowerCase().includes(q),
      )
      .slice(0, 30);
  }, [query]);

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="relative mx-auto mb-2 max-w-[650px]">
        <span className="pointer-events-none absolute top-1/2 left-[18px] -translate-y-1/2 text-text-muted">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search across all cheatsheets (e.g. build, rollback, port)..."
          className="w-full rounded-full border border-border bg-surface/80 py-4 pr-5 pl-[50px] text-base text-text outline-none focus:border-accent-blue focus:shadow-[0_0_20px_rgba(88,166,255,0.2)]"
        />
      </div>

      {query.trim() && (
        <div className="relative z-10 mx-auto mb-10 max-w-[650px] rounded-xl border border-border bg-surface-2/95 p-4 shadow-2xl backdrop-blur-md">
          {searchMatches.length === 0 ? (
            <div className="p-3 text-center text-text-muted">
              No exact quick-commands found. Click into the tools below!
            </div>
          ) : (
            searchMatches.map((entry, i) => (
              <button
                key={i}
                onClick={() => copy(entry.cmd)}
                className="flex w-full items-center justify-between gap-3 rounded-md border-b border-white/[0.08] p-3 text-left last:border-b-0 hover:bg-accent-blue/10"
              >
                <span className="max-w-[60%] truncate font-mono text-sm text-accent-blue">
                  {entry.cmd}
                </span>
                <span className="text-right text-[13px] text-text-muted">
                  {entry.desc}
                  <span className="ml-2 rounded bg-white/[0.08] px-1.5 py-0.5 text-[11px] text-text">
                    {entry.tool}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      )}

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategory(tab.id)}
            className={`rounded-full border px-4 py-2 text-[13px] ${
              category === tab.id
                ? "border-accent-blue bg-surface-2 text-text"
                : "border-border bg-surface-2/40 text-text-muted hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className={`relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface p-6 text-text transition-transform hover:-translate-y-1 hover:border-border-3 hover:shadow-2xl before:absolute before:top-0 before:left-0 before:h-1 before:w-full ${tool.accentClass}`}
          >
            <span className="mb-3 block text-3xl">{tool.icon}</span>
            <h3 className="mb-2 font-display text-xl font-semibold">{tool.name}</h3>
            <p className="mb-4 text-sm text-text-muted">{tool.description}</p>
            <div className="flex items-center justify-between border-t border-white/5 pt-3.5">
              <span className="font-mono text-xs text-text-muted">{tool.cmdCount}</span>
              <span className="text-sm font-semibold text-accent-blue">
                Open Cheatsheet →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-surface-2/30 p-6">
        <div className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-accent-blue">
          <span>⭐</span> Fast Copy Favourites
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_SNIPPETS.map((snippet) => (
            <button
              key={snippet.code}
              onClick={() => copy(snippet.code)}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-left hover:border-accent-blue hover:bg-accent-blue/5"
            >
              <div className="min-w-0">
                <div className="truncate font-mono text-[13px] text-accent-blue-light">
                  {snippet.code}
                </div>
                <div className="text-xs text-text-muted">{snippet.desc}</div>
              </div>
              <span>📋</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

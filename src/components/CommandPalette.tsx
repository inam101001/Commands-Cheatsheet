"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { paletteRoutes } from "@/data/paletteRoutes";
import { searchIndex } from "@/data/searchIndex";
import { useRecentlyViewed } from "@/lib/recentlyViewed";

interface PaletteResult {
  key: string;
  href: string;
  icon: string;
  title: string;
  subtitle?: string;
}

const OPEN_EVENT = "opsdeck-palette-open";

export function openCommandPalette(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function buildResults(query: string): PaletteResult[] {
  const q = query.toLowerCase().trim();

  const routeResults: PaletteResult[] = paletteRoutes
    .filter((r) => !q || r.title.toLowerCase().includes(q) || r.keywords.includes(q))
    .map((r) => ({ key: `route-${r.href}`, href: r.href, icon: r.icon, title: r.title }));

  if (!q) return routeResults;

  const commandResults: PaletteResult[] = searchIndex
    .filter(
      (entry) =>
        entry.cmd.toLowerCase().includes(q) ||
        entry.desc.toLowerCase().includes(q) ||
        entry.tool.toLowerCase().includes(q),
    )
    .slice(0, 20)
    .map((entry) => ({
      key: `cmd-${entry.id}`,
      href: entry.href,
      icon: "❯",
      title: entry.cmd,
      subtitle: `${entry.desc} · ${entry.tool}`,
    }));

  return [...routeResults, ...commandResults];
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const recentlyViewed = useRecentlyViewed();

  const results = useMemo(() => buildResults(query), [query]);
  const showRecent = !query.trim() && recentlyViewed.length > 0;

  useEffect(() => {
    function openPalette() {
      setQuery("");
      setActiveIndex(0);
      setIsOpen(true);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((open) => {
          if (open) return false;
          openPalette();
          return true;
        });
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(OPEN_EVENT, openPalette);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(OPEN_EVENT, openPalette);
    };
  }, []);

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  function navigateTo(href: string) {
    setIsOpen(false);
    router.push(href);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[activeIndex];
      if (target) navigateTo(target.href);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[12vh]"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="glass-panel w-full max-w-[560px] overflow-hidden rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
          <span className="text-text-dim">🔍</span>
          <input
            ref={inputRef}
            id="command-palette-search"
            name="command-palette-search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search pages and commands..."
            className="w-full bg-transparent text-[13px] text-text outline-none placeholder:text-text-dim"
          />
          <kbd className="rounded border border-border-3 px-1.5 py-0.5 font-mono text-[10px] text-text-dim">
            Esc
          </kbd>
        </div>

        <div className="max-h-[360px] overflow-y-auto p-2">
          {showRecent && (
            <div className="px-2 pt-1 pb-1.5 font-sans text-[10px] font-semibold tracking-wide text-text-dim uppercase">
              Recently Viewed
            </div>
          )}
          {showRecent &&
            recentlyViewed.map((entry) => (
              <button
                key={`recent-${entry.href}`}
                onClick={() => navigateTo(entry.href)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-accent-blue/10"
              >
                <span>{entry.icon}</span>
                <span className="text-[13px] text-text">{entry.title}</span>
              </button>
            ))}

          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-[13px] text-text-muted">No matches found.</p>
          ) : (
            results.map((result, i) => (
              <button
                key={result.key}
                onClick={() => navigateTo(result.href)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left ${
                  i === activeIndex ? "bg-accent-blue/10" : ""
                }`}
              >
                <span className="flex-shrink-0">{result.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-[13px] text-text">
                    {result.title}
                  </span>
                  {result.subtitle && (
                    <span className="block truncate text-[11px] text-text-dim">{result.subtitle}</span>
                  )}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

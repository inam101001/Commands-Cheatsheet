"use client";

import Link from "next/link";
import { useBookmarks } from "@/lib/bookmarks";

export function SnippetsView() {
  const { bookmarks, removeBookmark } = useBookmarks();

  if (bookmarks.length === 0) {
    return (
      <div className="mx-auto max-w-[600px] text-center">
        <p className="glass-panel rounded-xl px-6 py-10 text-[13px] text-text-muted">
          No snippets saved yet. Hover any command row on a cheatsheet page and click{" "}
          <span className="text-accent-orange">☆</span> to save it here.
        </p>
      </div>
    );
  }

  const byTool = new Map<string, typeof bookmarks>();
  for (const bookmark of bookmarks) {
    const group = byTool.get(bookmark.tool) ?? [];
    group.push(bookmark);
    byTool.set(bookmark.tool, group);
  }

  return (
    <div className="mx-auto max-w-[900px] space-y-5">
      {[...byTool.entries()].map(([tool, entries]) => (
        <div key={tool} className="glass-panel rounded-xl p-5">
          <h2 className="mb-3 font-sans text-[11px] font-semibold tracking-wide text-accent-blue uppercase">
            {tool}
          </h2>
          <div className="space-y-1.5">
            {entries.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex items-baseline gap-2.5 border-b border-border-2 py-1.5 last:border-b-0"
              >
                <Link
                  href={bookmark.href}
                  className="flex-shrink-0 font-mono text-[12px] whitespace-nowrap text-accent-blue-light hover:underline"
                >
                  {bookmark.cmd}
                </Link>
                {bookmark.desc && (
                  <span className="min-w-0 flex-1 font-sans text-[11px] text-text-dim">
                    {bookmark.desc}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeBookmark(bookmark.id)}
                  title="Remove from My Snippets"
                  aria-label="Remove from My Snippets"
                  className="flex-shrink-0 rounded px-1.5 text-[11px] text-text-dim hover:text-accent-error"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

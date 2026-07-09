"use client";

import { useState } from "react";
import { useBookmarks, type Bookmark } from "@/lib/bookmarks";

export function RowActions({ bookmark }: { bookmark: Bookmark }) {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [copied, setCopied] = useState(false);
  const bookmarked = bookmarks.some((b) => b.id === bookmark.id);

  async function handleCopyLink() {
    const url = `${window.location.origin}${bookmark.href}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard permission denied or unavailable — nothing to fall back to for a URL copy.
    }
  }

  return (
    <span className="print-hide ml-auto flex flex-shrink-0 items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100">
      <button
        type="button"
        onClick={handleCopyLink}
        title="Copy link to this command"
        aria-label="Copy link to this command"
        className="rounded px-1 text-[11px] text-text-dim hover:text-accent-blue"
      >
        {copied ? "✓" : "🔗"}
      </button>
      <button
        type="button"
        onClick={() => toggleBookmark(bookmark)}
        title={bookmarked ? "Remove from My Snippets" : "Save to My Snippets"}
        aria-label={bookmarked ? "Remove from My Snippets" : "Save to My Snippets"}
        className={`rounded px-1 text-[11px] ${bookmarked ? "text-accent-orange" : "text-text-dim hover:text-accent-orange"}`}
      >
        {bookmarked ? "★" : "☆"}
      </button>
    </span>
  );
}

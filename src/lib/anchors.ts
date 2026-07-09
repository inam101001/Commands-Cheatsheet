import type { CheatsheetData } from "@/data/types";

function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return base || "row";
}

/**
 * Maps each "row" block's (cardIndex, blockIndex) position to a stable,
 * unique anchor id, so the same slug logic can be reused by the renderer
 * (deep-linkable anchors) and the search index (palette/bookmark links).
 */
export function buildRowAnchorMap(data: CheatsheetData): Map<string, string> {
  const seen = new Map<string, number>();
  const map = new Map<string, string>();

  data.cards.forEach((card, cardIndex) => {
    card.blocks.forEach((block, blockIndex) => {
      if (block.type !== "row") return;
      const base = slugify(block.cmd);
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count + 1}`;
      map.set(`${cardIndex}-${blockIndex}`, id);
    });
  });

  return map;
}

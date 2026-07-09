import type { CheatsheetData } from "@/data/types";
import { buildRowAnchorMap } from "@/lib/anchors";
import { NavHeader } from "./NavHeader";
import { Card } from "./Card";

export function CheatsheetPage({ data, toolSlug }: { data: CheatsheetData; toolSlug: string }) {
  const rowAnchors = buildRowAnchorMap(data);

  return (
    <div className="min-h-screen bg-bg px-5 py-7 pb-12 text-text-body">
      <div className="mx-auto max-w-[1600px]">
        <NavHeader />

        <h1 className="mb-2 text-center font-sans text-2xl font-bold tracking-[3px] text-accent-blue [text-shadow:0_0_30px_#58a6ff55]">
          {data.title}
        </h1>
        {data.subtitle && (
          <p className="mb-8 text-center font-sans text-[11px] tracking-wider text-text-dim uppercase">
            {data.subtitle}
          </p>
        )}

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((card, i) => (
            <Card key={i} card={card} cardIndex={i} toolSlug={toolSlug} rowAnchors={rowAnchors} />
          ))}
        </div>
      </div>
    </div>
  );
}

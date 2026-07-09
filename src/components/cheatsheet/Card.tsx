import type { CheatsheetCard } from "@/data/types";
import { CardBlock } from "./CardBlock";

const SPAN_CLASS: Record<1 | 2 | 3, string> = {
  1: "",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

interface CardProps {
  card: CheatsheetCard;
  cardIndex: number;
  toolSlug: string;
  rowAnchors: Map<string, string>;
}

export function Card({ card, cardIndex, toolSlug, rowAnchors }: CardProps) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-md border border-border bg-surface-2 ${SPAN_CLASS[card.span]}`}
    >
      <div className="border-b border-border px-3.5 py-2">
        <h2 className="font-sans text-[11px] font-semibold tracking-wide text-accent-blue uppercase">
          {card.title}
        </h2>
      </div>
      <div className="flex-1 px-3.5 pt-2.5 pb-3">
        {card.blocks.map((block, i) => (
          <CardBlock
            key={i}
            block={block}
            toolSlug={toolSlug}
            anchorId={rowAnchors.get(`${cardIndex}-${i}`)}
          />
        ))}
      </div>
    </div>
  );
}

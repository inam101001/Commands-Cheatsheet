import type { CheatsheetBlock } from "@/data/types";

function CodeBlock({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <pre className="my-1.5 overflow-x-auto rounded-md border border-border-3 bg-bg p-3 font-mono text-[10.5px] leading-relaxed whitespace-pre text-accent-blue-light">
      {lines.map((line, i) => {
        const isComment = /^\s*(#|\/\/)/.test(line);
        return (
          <div key={i} className={isComment ? "text-accent-green" : undefined}>
            {line || " "}
          </div>
        );
      })}
    </pre>
  );
}

export function CardBlock({ block }: { block: CheatsheetBlock }) {
  switch (block.type) {
    case "divider":
      return (
        <div className="pt-2 pb-0.5 font-sans text-[9.5px] font-semibold tracking-wide text-accent-blue-2 uppercase opacity-80">
          {block.label}
        </div>
      );
    case "row":
      return (
        <div className="flex items-baseline gap-2.5 border-b border-border-2 py-[3px] last:border-b-0">
          <span className="flex-shrink-0 font-mono text-[11.5px] leading-relaxed whitespace-nowrap text-accent-blue-light">
            {block.cmd}
          </span>
          {block.desc && (
            <span className="min-w-0 flex-1 font-sans text-[10.5px] leading-relaxed text-text-dim">
              {block.desc}
            </span>
          )}
        </div>
      );
    case "code":
      return <CodeBlock text={block.text} />;
    case "note":
      return (
        <div className="my-1.5 rounded-md border border-accent-blue/20 bg-accent-blue/5 px-3 py-2 font-sans text-[10.5px] leading-relaxed text-text-muted">
          {block.text}
        </div>
      );
    default:
      return null;
  }
}

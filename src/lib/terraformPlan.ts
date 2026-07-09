export type PlanLineKind = "add" | "remove" | "change" | "replace" | "header" | "neutral";

export interface PlanLine {
  text: string;
  kind: PlanLineKind;
}

export interface PlanSummary {
  toAdd: number;
  toChange: number;
  toDestroy: number;
}

function classifyLine(line: string): PlanLineKind {
  const trimmed = line.trimStart();

  if (trimmed.startsWith("-/+")) return "replace";
  if (trimmed.startsWith("+")) return "add";
  if (trimmed.startsWith("-")) return "remove";
  if (trimmed.startsWith("~")) return "change";
  if (/^#\s/.test(trimmed)) return "header";
  return "neutral";
}

export function parsePlanLines(raw: string): PlanLine[] {
  return raw.split("\n").map((text) => ({ text, kind: classifyLine(text) }));
}

export function parsePlanSummary(raw: string): PlanSummary | null {
  const match = raw.match(/Plan:\s*(\d+)\s*to add,\s*(\d+)\s*to change,\s*(\d+)\s*to destroy/);
  if (!match) return null;
  return {
    toAdd: parseInt(match[1], 10),
    toChange: parseInt(match[2], 10),
    toDestroy: parseInt(match[3], 10),
  };
}

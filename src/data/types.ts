export type CheatsheetBlock =
  | { type: "divider"; label: string }
  | { type: "row"; cmd: string; desc: string }
  | { type: "code"; text: string }
  | { type: "note"; text: string };

export interface CheatsheetCard {
  title: string;
  span: 1 | 2 | 3;
  blocks: CheatsheetBlock[];
}

export interface CheatsheetData {
  title: string;
  subtitle: string;
  cards: CheatsheetCard[];
}

export type ToolCategory = "container" | "iac" | "cicd" | "os" | "monitoring";

export interface ToolMeta {
  slug: string;
  name: string;
  icon: string;
  description: string;
  cmdCount: string;
  category: ToolCategory;
  accentClass: string;
}

import yaml from "js-yaml";

export interface ParseResult {
  data: unknown;
  format: "yaml" | "json";
}

export interface ParseError {
  error: string;
}

export function parseAny(text: string): ParseResult | ParseError {
  const trimmed = text.trim();
  if (!trimmed) return { error: "Nothing to parse yet." };

  try {
    return { data: JSON.parse(trimmed), format: "json" };
  } catch {
    // Not valid JSON — fall through to YAML, which is a superset of JSON syntax anyway.
  }

  try {
    return { data: yaml.load(trimmed), format: "yaml" };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not parse as YAML or JSON." };
  }
}

export function toYaml(data: unknown): string {
  return yaml.dump(data, { indent: 2, lineWidth: -1 });
}

export function toJson(data: unknown): string {
  return JSON.stringify(data, null, 2);
}

export interface DiffEntry {
  path: string;
  kind: "added" | "removed" | "changed";
  before?: unknown;
  after?: unknown;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringifyValue(value: unknown): string {
  if (value === undefined) return "undefined";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function structuralDiff(a: unknown, b: unknown, path = "$"): DiffEntry[] {
  if (isPlainObject(a) && isPlainObject(b)) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    const entries: DiffEntry[] = [];
    for (const key of keys) {
      entries.push(...structuralDiff(a[key], b[key], `${path}.${key}`));
    }
    return entries;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const length = Math.max(a.length, b.length);
    const entries: DiffEntry[] = [];
    for (let i = 0; i < length; i++) {
      entries.push(...structuralDiff(a[i], b[i], `${path}[${i}]`));
    }
    return entries;
  }

  if (a === undefined && b !== undefined) return [{ path, kind: "added", after: b }];
  if (a !== undefined && b === undefined) return [{ path, kind: "removed", before: a }];

  const same = stringifyValue(a) === stringifyValue(b);
  if (same) return [];
  return [{ path, kind: "changed", before: a, after: b }];
}

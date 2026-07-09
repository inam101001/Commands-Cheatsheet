import Ajv, { type ErrorObject } from "ajv";
import yaml from "js-yaml";
import { k8sSchemas, supportedKinds } from "@/data/k8sSchemas";

const ajv = new Ajv({ allErrors: true, strict: false });
const validators = new Map<string, ReturnType<typeof ajv.compile>>();

function getValidator(kind: string) {
  if (!validators.has(kind)) {
    const schema = k8sSchemas[kind];
    if (!schema) return null;
    validators.set(kind, ajv.compile(schema));
  }
  return validators.get(kind)!;
}

export interface ManifestFinding {
  message: string;
  path: string;
  line: number | null;
}

export interface ValidationResult {
  kind: string | null;
  findings: ManifestFinding[];
}

export interface ValidationError {
  error: string;
}

function findLineForPath(yamlText: string, path: string): number | null {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return 1;

  const lines = yamlText.split("\n");
  let searchStart = 0;
  let currentIndent = -1;
  let lastFoundLine: number | null = null;

  for (const segment of segments) {
    const isIndex = /^\d+$/.test(segment);
    let found = false;

    if (isIndex) {
      let count = -1;
      const targetIndex = parseInt(segment, 10);
      for (let i = searchStart; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trimStart();
        if (trimmed === "") continue;
        const indent = line.length - trimmed.length;
        if (indent <= currentIndent && i > searchStart) break;
        if (trimmed.startsWith("- ") && indent > currentIndent) {
          count++;
          if (count === targetIndex) {
            lastFoundLine = i;
            searchStart = i + 1;
            currentIndent = indent;
            found = true;
            break;
          }
        }
      }
    } else {
      for (let i = searchStart; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trimStart();
        if (trimmed === "") continue;
        const indent = line.length - trimmed.length;
        const keyMatch = trimmed.match(/^-?\s*([A-Za-z0-9_.-]+):/);
        if (keyMatch && keyMatch[1] === segment && indent > currentIndent) {
          lastFoundLine = i;
          searchStart = i + 1;
          currentIndent = indent;
          found = true;
          break;
        }
      }
    }

    if (!found) break;
  }

  return lastFoundLine !== null ? lastFoundLine + 1 : null;
}

function formatAjvError(error: ErrorObject): string {
  if (error.keyword === "required") {
    return `Missing required field "${error.params.missingProperty}"`;
  }
  if (error.keyword === "enum") {
    return `Must be one of: ${(error.params.allowedValues as unknown[]).join(", ")}`;
  }
  if (error.keyword === "const") {
    return `Must be exactly "${error.params.allowedValue}"`;
  }
  return error.message ?? "Invalid value";
}

export function validateManifest(rawYaml: string): ValidationResult | ValidationError {
  const trimmed = rawYaml.trim();
  if (!trimmed) return { error: "Paste a Kubernetes manifest to validate." };

  let doc: unknown;
  try {
    doc = yaml.load(trimmed);
  } catch (err) {
    return { error: err instanceof Error ? `YAML parse error: ${err.message}` : "Invalid YAML." };
  }

  if (typeof doc !== "object" || doc === null) {
    return { error: "Manifest must be a YAML mapping (an object), not a scalar or list." };
  }

  const kind = (doc as Record<string, unknown>).kind;
  if (typeof kind !== "string") {
    return { error: 'Manifest is missing a "kind" field.' };
  }

  const validator = getValidator(kind);
  if (!validator) {
    return {
      error: `"${kind}" isn't one of the supported kinds yet: ${supportedKinds.join(", ")}.`,
    };
  }

  validator(doc);
  const errors = validator.errors ?? [];

  const findings: ManifestFinding[] = errors.map((error) => {
    const path = error.keyword === "required"
      ? `${error.instancePath}/${error.params.missingProperty}`
      : error.instancePath;
    return {
      message: formatAjvError(error),
      path: path || "/",
      line: findLineForPath(trimmed, path),
    };
  });

  return { kind, findings };
}

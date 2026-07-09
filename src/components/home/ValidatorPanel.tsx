"use client";

import { useMemo, useState } from "react";
import { load as loadYaml, YAMLException } from "js-yaml";

type Status = "info" | "success" | "error";

function validate(input: string): { status: Status; message: string } {
  const trimmed = input.trim();

  if (!trimmed) {
    return { status: "info", message: "Paste code above to execute the live parsing rules." };
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      JSON.parse(trimmed);
      return { status: "success", message: "✅ Valid JSON! Syntax validation passed successfully." };
    } catch (err) {
      const reason = err instanceof Error ? err.message : "Unknown error";
      return { status: "error", message: `❌ Invalid JSON: ${reason}` };
    }
  }

  try {
    loadYaml(trimmed);
    return {
      status: "success",
      message: "✅ Valid YAML! Structure and nesting indentation validated successfully.",
    };
  } catch (err) {
    if (err instanceof YAMLException) {
      const line = err.mark ? err.mark.line + 1 : "unknown";
      return { status: "error", message: `❌ Invalid YAML: ${err.reason} (Line ${line})` };
    }
    return { status: "error", message: "❌ Invalid YAML: unable to parse input." };
  }
}

const STATUS_CLASS: Record<Status, string> = {
  success: "border-accent-cyan bg-accent-cyan/10 text-accent-cyan",
  error: "border-accent-error bg-accent-error/10 text-accent-error",
  info: "border-border bg-accent-blue/5 text-text-muted",
};

export function ValidatorPanel() {
  const [input, setInput] = useState("");
  const result = useMemo(() => validate(input), [input]);

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="mb-3.5 flex items-center justify-between">
          <span className="font-display text-xl text-accent-blue">
            JSON &amp; YAML Lint Validator
          </span>
          <button
            onClick={() => setInput("")}
            className="rounded-full border border-border bg-surface-2/40 px-4 py-2 text-[13px] text-text-muted hover:text-text"
          >
            Clear
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your YAML config or JSON data block here..."
          className="h-[300px] w-full resize-y rounded-md border border-border bg-bg p-3.5 font-mono text-sm text-text outline-none focus:border-accent-blue"
        />
        <div
          className={`mt-4 flex items-center gap-2.5 rounded-md border p-3.5 text-sm ${STATUS_CLASS[result.status]}`}
        >
          {result.message}
        </div>
      </div>
    </div>
  );
}

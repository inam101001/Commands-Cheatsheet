"use client";

import { useMemo, useState } from "react";
import { parseAny, structuralDiff, toJson, toYaml } from "@/lib/yamlJson";

const SAMPLE_YAML = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: web
          image: nginx:1.27
`;

function ConvertPanel() {
  const [input, setInput] = useState(SAMPLE_YAML);
  const result = useMemo(() => parseAny(input), [input]);

  const output = useMemo(() => {
    if ("error" in result) return "";
    return result.format === "json" ? toYaml(result.data) : toJson(result.data);
  }, [result]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="glass-panel rounded-xl p-4">
        <label htmlFor="yaml-json-input" className="mb-2 block text-[12px] font-medium text-text-muted">
          Input (YAML or JSON — auto-detected)
        </label>
        <textarea
          id="yaml-json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          rows={16}
          className="w-full resize-y rounded-md border border-border bg-bg px-3 py-2 font-mono text-[12px] text-text outline-none focus:border-accent-blue"
        />
      </div>
      <div className="glass-panel rounded-xl p-4">
        <label className="mb-2 block text-[12px] font-medium text-text-muted">
          {"error" in result
            ? "Output"
            : `Output (${result.format === "json" ? "YAML" : "JSON"})`}
        </label>
        {"error" in result ? (
          <p className="text-[13px] text-accent-error">{result.error}</p>
        ) : (
          <pre className="max-h-[26rem] overflow-auto rounded-md border border-border-3 bg-bg px-3 py-2 font-mono text-[12px] text-text-body">
            {output}
          </pre>
        )}
      </div>
    </div>
  );
}

function DiffPanel() {
  const [inputA, setInputA] = useState(SAMPLE_YAML);
  const [inputB, setInputB] = useState(SAMPLE_YAML.replace("replicas: 3", "replicas: 5"));

  const resultA = useMemo(() => parseAny(inputA), [inputA]);
  const resultB = useMemo(() => parseAny(inputB), [inputB]);

  const diff = useMemo(() => {
    if ("error" in resultA || "error" in resultB) return null;
    return structuralDiff(resultA.data, resultB.data);
  }, [resultA, resultB]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="glass-panel rounded-xl p-4">
          <label htmlFor="diff-input-a" className="mb-2 block text-[12px] font-medium text-text-muted">
            A
          </label>
          <textarea
            id="diff-input-a"
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            spellCheck={false}
            rows={12}
            className="w-full resize-y rounded-md border border-border bg-bg px-3 py-2 font-mono text-[12px] text-text outline-none focus:border-accent-blue"
          />
          {"error" in resultA && <p className="mt-2 text-[12px] text-accent-error">{resultA.error}</p>}
        </div>
        <div className="glass-panel rounded-xl p-4">
          <label htmlFor="diff-input-b" className="mb-2 block text-[12px] font-medium text-text-muted">
            B
          </label>
          <textarea
            id="diff-input-b"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            spellCheck={false}
            rows={12}
            className="w-full resize-y rounded-md border border-border bg-bg px-3 py-2 font-mono text-[12px] text-text outline-none focus:border-accent-blue"
          />
          {"error" in resultB && <p className="mt-2 text-[12px] text-accent-error">{resultB.error}</p>}
        </div>
      </div>

      {diff && (
        <div className="glass-panel rounded-xl p-4">
          <p className="mb-2 text-[12px] font-medium text-text-muted">
            Structural diff ({diff.length} {diff.length === 1 ? "difference" : "differences"})
          </p>
          {diff.length === 0 ? (
            <p className="text-[13px] text-accent-green">Structurally identical.</p>
          ) : (
            <ul className="space-y-1.5">
              {diff.map((entry, i) => (
                <li key={i} className="rounded-md border border-border-3 bg-bg px-3 py-2 font-mono text-[12px]">
                  <span
                    className={
                      entry.kind === "added"
                        ? "text-accent-green"
                        : entry.kind === "removed"
                          ? "text-accent-error"
                          : "text-accent-orange"
                    }
                  >
                    {entry.kind}
                  </span>{" "}
                  <span className="text-text-body">{entry.path}</span>
                  {entry.kind !== "added" && (
                    <span className="text-text-dim"> was {JSON.stringify(entry.before)}</span>
                  )}
                  {entry.kind !== "removed" && (
                    <span className="text-text-dim"> now {JSON.stringify(entry.after)}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export function YamlJsonConverter() {
  const [mode, setMode] = useState<"convert" | "diff">("convert");

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setMode("convert")}
          className={`rounded-full border px-3 py-1.5 text-[12px] font-medium ${
            mode === "convert"
              ? "border-accent-blue/50 bg-accent-blue/10 text-accent-blue"
              : "border-border bg-surface-2/40 text-text-muted hover:text-text"
          }`}
        >
          Convert
        </button>
        <button
          onClick={() => setMode("diff")}
          className={`rounded-full border px-3 py-1.5 text-[12px] font-medium ${
            mode === "diff"
              ? "border-accent-blue/50 bg-accent-blue/10 text-accent-blue"
              : "border-border bg-surface-2/40 text-text-muted hover:text-text"
          }`}
        >
          Structural Diff
        </button>
      </div>

      {mode === "convert" ? <ConvertPanel /> : <DiffPanel />}

      <p className="mt-4 text-xs text-text-dim">
        Everything is parsed in your browser — nothing is sent anywhere.
      </p>
    </div>
  );
}

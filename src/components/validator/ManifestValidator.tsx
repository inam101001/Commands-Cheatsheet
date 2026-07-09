"use client";

import { useMemo, useState } from "react";
import { validateManifest } from "@/lib/k8sManifestValidator";
import { supportedKinds } from "@/data/k8sSchemas";

const SAMPLE_MANIFEST = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  selector:
    matchLabels:
      app: web
  template:
    spec:
      containers:
        - name: web
          image: nginx:1.27
          ports:
            - containerPort: 80
`;

export function ManifestValidator() {
  const [input, setInput] = useState(SAMPLE_MANIFEST);
  const result = useMemo(() => validateManifest(input), [input]);

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="glass-panel rounded-xl p-6">
        <label htmlFor="manifest-input" className="mb-2 block text-sm font-medium text-text-muted">
          Kubernetes manifest (YAML)
        </label>
        <textarea
          id="manifest-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          rows={16}
          className="w-full resize-y rounded-md border border-border bg-bg px-4 py-3 font-mono text-[12px] text-text outline-none focus:border-accent-blue"
        />

        <p className="mt-3 text-xs text-text-dim">
          Supports: {supportedKinds.join(", ")}. Everything is validated in your browser —
          nothing is sent anywhere.
        </p>

        <div className="mt-4">
          {"error" in result ? (
            <p className="rounded-md border border-accent-error/40 bg-accent-error/5 px-3 py-2 text-[13px] text-accent-error">
              {result.error}
            </p>
          ) : result.findings.length === 0 ? (
            <p className="rounded-md border border-accent-green/40 bg-accent-green/5 px-3 py-2 text-[13px] text-accent-green">
              ✅ Valid {result.kind} — no schema issues found.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-[12px] text-text-muted">
                {result.findings.length} {result.findings.length === 1 ? "issue" : "issues"} found
                in this {result.kind}:
              </p>
              {result.findings.map((finding, i) => (
                <div
                  key={i}
                  className="rounded-md border border-accent-error/40 bg-accent-error/5 px-3 py-2 text-[13px] text-accent-error"
                >
                  {finding.line !== null && (
                    <span className="mr-2 rounded border border-accent-error/40 px-1.5 py-0.5 font-mono text-[11px]">
                      line {finding.line}
                    </span>
                  )}
                  {finding.message}
                  <span className="ml-2 font-mono text-[11px] text-text-dim">
                    {finding.path || "/"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

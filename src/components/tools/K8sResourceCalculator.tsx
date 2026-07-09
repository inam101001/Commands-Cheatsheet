"use client";

import { useMemo, useState } from "react";
import { analyzeResources, type ResourceInput } from "@/lib/k8sResources";

const LEVEL_CLASS: Record<string, string> = {
  error: "border-accent-error/40 bg-accent-error/5 text-accent-error",
  warning: "border-accent-orange/40 bg-accent-orange/5 text-accent-orange",
  info: "border-accent-blue/40 bg-accent-blue/5 text-accent-blue",
};

const LEVEL_ICON: Record<string, string> = { error: "⛔", warning: "⚠️", info: "ℹ️" };

export function K8sResourceCalculator() {
  const [input, setInput] = useState<ResourceInput>({
    cpuRequest: "250m",
    cpuLimit: "500m",
    memRequest: "256Mi",
    memLimit: "512Mi",
  });

  const findings = useMemo(() => analyzeResources(input), [input]);

  function update(key: keyof ResourceInput, value: string) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <div className="glass-panel rounded-xl p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cpu-request" className="mb-1 block text-[12px] text-text-muted">
              CPU request
            </label>
            <input
              id="cpu-request"
              type="text"
              value={input.cpuRequest}
              onChange={(e) => update("cpuRequest", e.target.value)}
              placeholder="e.g. 250m or 0.25"
              spellCheck={false}
              className="w-full rounded-md border border-border-3 bg-bg px-3 py-2 font-mono text-sm text-text outline-none focus:border-accent-blue"
            />
          </div>
          <div>
            <label htmlFor="cpu-limit" className="mb-1 block text-[12px] text-text-muted">
              CPU limit
            </label>
            <input
              id="cpu-limit"
              type="text"
              value={input.cpuLimit}
              onChange={(e) => update("cpuLimit", e.target.value)}
              placeholder="e.g. 500m or 1"
              spellCheck={false}
              className="w-full rounded-md border border-border-3 bg-bg px-3 py-2 font-mono text-sm text-text outline-none focus:border-accent-blue"
            />
          </div>
          <div>
            <label htmlFor="mem-request" className="mb-1 block text-[12px] text-text-muted">
              Memory request
            </label>
            <input
              id="mem-request"
              type="text"
              value={input.memRequest}
              onChange={(e) => update("memRequest", e.target.value)}
              placeholder="e.g. 256Mi"
              spellCheck={false}
              className="w-full rounded-md border border-border-3 bg-bg px-3 py-2 font-mono text-sm text-text outline-none focus:border-accent-blue"
            />
          </div>
          <div>
            <label htmlFor="mem-limit" className="mb-1 block text-[12px] text-text-muted">
              Memory limit
            </label>
            <input
              id="mem-limit"
              type="text"
              value={input.memLimit}
              onChange={(e) => update("memLimit", e.target.value)}
              placeholder="e.g. 512Mi"
              spellCheck={false}
              className="w-full rounded-md border border-border-3 bg-bg px-3 py-2 font-mono text-sm text-text outline-none focus:border-accent-blue"
            />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {findings.map((finding, i) => (
            <div
              key={i}
              className={`rounded-md border px-3 py-2 text-[13px] ${LEVEL_CLASS[finding.level]}`}
            >
              {LEVEL_ICON[finding.level]} {finding.message}
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-text-dim">
          Everything is calculated in your browser — nothing is sent anywhere.
        </p>
      </div>
    </div>
  );
}

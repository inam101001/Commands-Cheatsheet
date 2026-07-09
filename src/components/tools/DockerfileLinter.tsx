"use client";

import { useMemo, useState } from "react";
import { lintDockerfile } from "@/lib/dockerfileLinter";

const SAMPLE_DOCKERFILE = `FROM node:20
RUN apt-get update
RUN apt-get install curl
ADD ./app /app
WORKDIR /app
CMD ["node", "index.js"]
`;

const SEVERITY_CLASS: Record<string, string> = {
  error: "border-accent-error/40 bg-accent-error/5 text-accent-error",
  warning: "border-accent-orange/40 bg-accent-orange/5 text-accent-orange",
  info: "border-accent-blue/40 bg-accent-blue/5 text-accent-blue",
};

const SEVERITY_ICON: Record<string, string> = { error: "⛔", warning: "⚠️", info: "ℹ️" };

export function DockerfileLinter() {
  const [input, setInput] = useState(SAMPLE_DOCKERFILE);
  const findings = useMemo(() => lintDockerfile(input), [input]);

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="glass-panel rounded-xl p-6">
        <label htmlFor="dockerfile-input" className="mb-2 block text-sm font-medium text-text-muted">
          Dockerfile
        </label>
        <textarea
          id="dockerfile-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          rows={14}
          className="w-full resize-y rounded-md border border-border bg-bg px-4 py-3 font-mono text-[12px] text-text outline-none focus:border-accent-blue"
        />

        <p className="mt-3 text-xs text-text-dim">
          Everything is linted in your browser — nothing is sent anywhere.
        </p>

        <div className="mt-4 space-y-2">
          {findings.length === 0 ? (
            <p className="rounded-md border border-accent-green/40 bg-accent-green/5 px-3 py-2 text-[13px] text-accent-green">
              ✅ No issues found.
            </p>
          ) : (
            <>
              <p className="text-[12px] text-text-muted">
                {findings.length} {findings.length === 1 ? "finding" : "findings"}:
              </p>
              {findings.map((finding, i) => (
                <div
                  key={i}
                  className={`rounded-md border px-3 py-2 text-[13px] ${SEVERITY_CLASS[finding.severity]}`}
                >
                  <span className="mr-2 rounded border px-1.5 py-0.5 font-mono text-[11px]">
                    line {finding.line}
                  </span>
                  {SEVERITY_ICON[finding.severity]} {finding.message}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

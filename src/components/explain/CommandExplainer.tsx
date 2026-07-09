"use client";

import { useMemo, useState } from "react";
import { explainCommand, type TokenKind } from "@/lib/commandExplainer";
import { commandDictionaries } from "@/data/commandDictionary";

const KIND_CLASS: Record<TokenKind, string> = {
  binary: "border-accent-blue/50 bg-accent-blue/10 text-accent-blue",
  subcommand: "border-accent-purple/50 bg-accent-purple/10 text-accent-purple",
  flag: "border-accent-orange/50 bg-accent-orange/10 text-accent-orange",
  value: "border-border-3 bg-surface-2 text-text-body",
  argument: "border-border-3 bg-surface-2 text-text-body",
  unknown: "border-accent-error/50 bg-accent-error/10 text-accent-error",
};

const KIND_LABEL: Record<TokenKind, string> = {
  binary: "Tool",
  subcommand: "Subcommand",
  flag: "Flag",
  value: "Value",
  argument: "Argument",
  unknown: "Unrecognized",
};

const EXAMPLES = [
  "docker run -d --rm -p 8080:80 --name web nginx:alpine",
  "kubectl rollout undo deploy/api --to-revision=2",
  "terraform apply -auto-approve -var-file=prod.tfvars",
  "git push --force-with-lease origin main",
];

export function CommandExplainer() {
  const [input, setInput] = useState(EXAMPLES[0]);
  const tokens = useMemo(() => explainCommand(input), [input]);
  const supportedTools = Object.values(commandDictionaries)
    .map((d) => d.tool)
    .join(", ");

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="glass-panel rounded-xl p-6">
        <label htmlFor="explain-input" className="mb-2 block text-sm font-medium text-text-muted">
          Paste a command
        </label>
        <input
          id="explain-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="w-full rounded-md border border-border bg-bg px-4 py-3 font-mono text-sm text-text outline-none focus:border-accent-blue"
        />
        <p className="mt-2 text-xs text-text-dim">
          Supports {supportedTools}. Everything is parsed in your browser — nothing is sent
          anywhere.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setInput(ex)}
              className="rounded-full border border-border bg-surface-2/40 px-3 py-1 font-mono text-[11px] text-text-muted hover:text-text"
            >
              {ex}
            </button>
          ))}
        </div>

        {tokens.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-2 rounded-md border border-border bg-bg p-4 font-mono text-sm">
              {tokens.map((token, i) => (
                <span
                  key={i}
                  title={token.description}
                  className={`rounded border px-2 py-1 ${KIND_CLASS[token.kind]}`}
                >
                  {token.text}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {tokens
                .filter((t) => t.description)
                .map((token, i) => (
                  <div key={i} className="rounded-md border border-border-2 bg-surface-2/50 p-3">
                    <div className="flex items-center gap-2">
                      <span className={`rounded border px-1.5 py-0.5 font-mono text-xs ${KIND_CLASS[token.kind]}`}>
                        {token.text}
                      </span>
                      <span className="text-[10px] tracking-wide text-text-dim uppercase">
                        {KIND_LABEL[token.kind]}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] text-text-muted">{token.description}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

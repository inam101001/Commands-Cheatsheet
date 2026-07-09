"use client";

import { useState } from "react";
import { checklists, type Checklist } from "@/data/checklists";
import { useChecklistProgress } from "@/lib/useChecklistProgress";

function toMarkdown(checklist: Checklist, progress: Record<string, boolean>): string {
  const lines = [`# ${checklist.title}`, ""];
  for (const item of checklist.items) {
    const box = progress[item.id] ? "[x]" : "[ ]";
    lines.push(`- ${box} ${item.text}`);
  }
  return lines.join("\n");
}

function ChecklistPanel({ checklist }: { checklist: Checklist }) {
  const { progress, toggle, reset } = useChecklistProgress(checklist.id);
  const [copied, setCopied] = useState(false);

  const doneCount = checklist.items.filter((item) => progress[item.id]).length;
  const percent = Math.round((doneCount / checklist.items.length) * 100);

  async function handleCopy() {
    const markdown = toMarkdown(checklist, progress);
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = markdown;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const succeeded = document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(succeeded);
    }
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-text">
            {checklist.icon} {checklist.title}
          </p>
          <p className="mt-1 text-[12px] text-text-muted">{checklist.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="rounded-md border border-border px-3 py-1.5 text-[12px] text-text-muted hover:text-text"
          >
            {copied ? "Copied!" : "Copy as Markdown"}
          </button>
          <button
            onClick={reset}
            className="rounded-md border border-border px-3 py-1.5 text-[12px] text-text-muted hover:text-text"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-accent-blue transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-text-dim">
          {doneCount} / {checklist.items.length} complete
        </p>
      </div>

      <ul className="mt-4 space-y-2">
        {checklist.items.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border-3 bg-bg p-3 hover:border-accent-blue/40">
              <input
                type="checkbox"
                id={item.id}
                name={item.id}
                checked={Boolean(progress[item.id])}
                onChange={() => toggle(item.id)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--c-accent)]"
              />
              <span>
                <span
                  className={`block text-[13px] ${progress[item.id] ? "text-text-dim line-through" : "text-text-body"}`}
                >
                  {item.text}
                </span>
                <span className="mt-0.5 block text-[11px] text-text-dim">{item.rationale}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ChecklistRunner() {
  const [activeId, setActiveId] = useState(checklists[0].id);
  const active = checklists.find((c) => c.id === activeId) ?? checklists[0];

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="mb-6 flex flex-wrap gap-2">
        {checklists.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] font-medium ${
              activeId === c.id
                ? "border-accent-blue/50 bg-accent-blue/10 text-accent-blue"
                : "border-border bg-surface-2/40 text-text-muted hover:text-text"
            }`}
          >
            {c.icon} {c.title}
          </button>
        ))}
      </div>

      <ChecklistPanel checklist={active} />
    </div>
  );
}

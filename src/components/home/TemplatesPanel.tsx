"use client";

import { useState } from "react";
import { templates } from "@/data/templates";
import { useCopy } from "./ToastProvider";

export function TemplatesPanel() {
  const [activeId, setActiveId] = useState(templates[0].id);
  const copy = useCopy();
  const active = templates.find((t) => t.id === activeId) ?? templates[0];

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-[350px_1fr]">
      <div className="glass-panel rounded-xl p-5">
        <div className="mb-4 font-display text-xl text-accent-blue">Boilerplate Catalog</div>
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => setActiveId(tpl.id)}
            className={`mb-2.5 block w-full rounded-md border p-3 text-left ${
              tpl.id === activeId
                ? "border-accent-blue bg-accent-blue/[0.08]"
                : "border-transparent hover:bg-white/[0.03]"
            }`}
          >
            <h4 className="mb-1 text-[15px]">
              {tpl.icon} {tpl.name}
            </h4>
            <p className="text-xs text-text-muted">{tpl.description}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col glass-panel rounded-xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold">{active.title}</span>
          <button
            onClick={() => copy(active.code)}
            className="rounded-md border border-accent-blue/40 bg-accent-blue/10 px-3 py-1.5 text-sm text-accent-blue-light hover:bg-accent-blue/20"
          >
            📋 Copy YAML Config
          </button>
        </div>
        <pre className="max-h-[400px] flex-1 overflow-x-auto rounded-md border border-border bg-bg p-4 font-mono text-[13px] whitespace-pre text-accent-blue-light">
          {active.code}
        </pre>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { flowcharts } from "@/data/flowcharts";

interface Step {
  nodeId: string;
  chosenLabel?: string;
}

function FlowchartPlayer({ flowchartId, onExit }: { flowchartId: string; onExit: () => void }) {
  const flowchart = flowcharts.find((f) => f.id === flowchartId);
  const [path, setPath] = useState<Step[]>(() =>
    flowchart ? [{ nodeId: flowchart.startNodeId }] : [],
  );

  if (!flowchart) return null;
  const startNodeId = flowchart.startNodeId;

  const currentStep = path[path.length - 1];
  const currentNode = flowchart.nodes[currentStep.nodeId];

  function choose(label: string, nextId: string) {
    setPath((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...updated[updated.length - 1], chosenLabel: label };
      return [...updated, { nodeId: nextId }];
    });
  }

  function goBack() {
    setPath((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }

  function restart() {
    setPath([{ nodeId: startNodeId }]);
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onExit}
          className="rounded-md border border-border px-3 py-1.5 text-[12px] text-text-muted hover:text-text"
        >
          ← All flowcharts
        </button>
        <h2 className="text-sm font-semibold text-text">{flowchart.title}</h2>
        <button
          onClick={restart}
          className="rounded-md border border-border px-3 py-1.5 text-[12px] text-text-muted hover:text-text"
        >
          Restart
        </button>
      </div>

      {path.length > 1 && (
        <div className="glass-panel mb-4 rounded-xl p-3">
          <ol className="flex flex-wrap items-center gap-1 text-[11px] text-text-dim">
            {path.slice(0, -1).map((step, i) => (
              <li key={step.nodeId} className="flex items-center gap-1">
                {i > 0 && <span>→</span>}
                <span>{step.chosenLabel}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {currentNode.type === "question" ? (
        <div className="glass-panel rounded-xl p-6">
          <p className="mb-4 text-sm font-medium text-text">{currentNode.text}</p>
          <div className="flex flex-col gap-2">
            {currentNode.options.map((opt) => (
              <button
                key={opt.next}
                onClick={() => choose(opt.label, opt.next)}
                className="rounded-md border border-border-3 bg-bg px-4 py-3 text-left text-sm text-text-body hover:border-accent-blue hover:text-accent-blue"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-xl p-6">
          <p className="text-sm font-semibold text-accent-green">{currentNode.text}</p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[10px] tracking-wide text-text-dim uppercase">Cause</p>
              <p className="mt-1 text-[13px] text-text-body">{currentNode.cause}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-wide text-text-dim uppercase">Fix</p>
              <p className="mt-1 text-[13px] text-text-body">{currentNode.fix}</p>
            </div>
          </div>

          {currentNode.relatedCommands && currentNode.relatedCommands.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {currentNode.relatedCommands.map((cmd) => (
                <code
                  key={cmd}
                  className="rounded border border-border-3 bg-bg px-2 py-1 font-mono text-[11px] text-text-muted"
                >
                  {cmd}
                </code>
              ))}
            </div>
          )}
        </div>
      )}

      {path.length > 1 && (
        <button
          onClick={goBack}
          className="mt-4 rounded-md border border-border px-3 py-1.5 text-[12px] text-text-muted hover:text-text"
        >
          ← Back one step
        </button>
      )}
    </div>
  );
}

export function FlowchartRunner() {
  const [activeId, setActiveId] = useState<string | null>(null);

  if (activeId) {
    return <FlowchartPlayer flowchartId={activeId} onExit={() => setActiveId(null)} />;
  }

  return (
    <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-3">
      {flowcharts.map((f) => (
        <button
          key={f.id}
          onClick={() => setActiveId(f.id)}
          className="glass-panel rounded-xl p-5 text-left hover:border-accent-blue"
        >
          <p className="text-sm font-semibold text-text">{f.title}</p>
          <p className="mt-2 text-[12px] text-text-muted">{f.description}</p>
        </button>
      ))}
    </div>
  );
}

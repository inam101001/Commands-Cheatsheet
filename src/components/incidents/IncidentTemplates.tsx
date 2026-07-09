"use client";

import { useMemo, useState } from "react";
import {
  emptyHandoff,
  emptyPostmortem,
  renderHandoff,
  renderPostmortem,
  type HandoffFields,
  type PostmortemFields,
} from "@/lib/incidentTemplates";

const INPUT_CLASS =
  "w-full rounded-md border border-border bg-bg px-3 py-2 text-[13px] text-text outline-none focus:border-accent-blue";
const LABEL_CLASS = "mb-1 block text-[11px] font-medium text-text-muted";

async function copyToClipboard(text: string, onDone: (ok: boolean) => void) {
  try {
    await navigator.clipboard.writeText(text);
    onDone(true);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);
    onDone(succeeded);
  }
  window.setTimeout(() => onDone(false), 2000);
}

function PreviewPanel({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] tracking-wide text-text-dim uppercase">Generated Markdown</p>
        <button
          type="button"
          onClick={() => copyToClipboard(markdown, setCopied)}
          className="rounded-md border border-border-3 px-2.5 py-1 text-[11px] text-text-muted hover:border-accent-blue hover:text-text"
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </button>
      </div>
      <pre className="max-h-[600px] overflow-auto rounded-md border border-border-3 bg-bg p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-text-body">
        {markdown}
      </pre>
    </div>
  );
}

function PostmortemGenerator() {
  const [fields, setFields] = useState<PostmortemFields>(emptyPostmortem);
  const markdown = useMemo(() => renderPostmortem(fields), [fields]);

  function set<K extends keyof PostmortemFields>(key: K, value: PostmortemFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <div>
          <label className={LABEL_CLASS} htmlFor="pm-title">Title</label>
          <input id="pm-title" name="pm-title" className={INPUT_CLASS} value={fields.title} onChange={(e) => set("title", e.target.value)} placeholder="Checkout API returned 500s for 12 minutes" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLASS} htmlFor="pm-date">Date</label>
            <input id="pm-date" name="pm-date" className={INPUT_CLASS} value={fields.date} onChange={(e) => set("date", e.target.value)} placeholder="2026-07-10" />
          </div>
          <div>
            <label className={LABEL_CLASS} htmlFor="pm-severity">Severity</label>
            <select id="pm-severity" name="pm-severity" className={INPUT_CLASS} value={fields.severity} onChange={(e) => set("severity", e.target.value)}>
              <option>SEV-1</option>
              <option>SEV-2</option>
              <option>SEV-3</option>
              <option>SEV-4</option>
            </select>
          </div>
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="pm-author">Author</label>
          <input id="pm-author" name="pm-author" className={INPUT_CLASS} value={fields.author} onChange={(e) => set("author", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="pm-summary">Summary</label>
          <textarea id="pm-summary" name="pm-summary" rows={2} className={INPUT_CLASS} value={fields.summary} onChange={(e) => set("summary", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="pm-impact">Impact</label>
          <textarea id="pm-impact" name="pm-impact" rows={2} className={INPUT_CLASS} value={fields.impact} onChange={(e) => set("impact", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="pm-timeline">Timeline</label>
          <textarea id="pm-timeline" name="pm-timeline" rows={4} className={INPUT_CLASS} value={fields.timeline} onChange={(e) => set("timeline", e.target.value)} placeholder={"14:02 UTC — alert fired\n14:05 UTC — on-call acknowledged\n14:20 UTC — mitigated via rollback"} />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="pm-root-cause">Root Cause</label>
          <textarea id="pm-root-cause" name="pm-root-cause" rows={2} className={INPUT_CLASS} value={fields.rootCause} onChange={(e) => set("rootCause", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="pm-resolution">Resolution</label>
          <textarea id="pm-resolution" name="pm-resolution" rows={2} className={INPUT_CLASS} value={fields.resolution} onChange={(e) => set("resolution", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="pm-action-items">Action Items</label>
          <textarea id="pm-action-items" name="pm-action-items" rows={3} className={INPUT_CLASS} value={fields.actionItems} onChange={(e) => set("actionItems", e.target.value)} placeholder={"- [ ] Add alert for X (owner: @name, due: 2026-07-17)"} />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="pm-lessons">Lessons Learned</label>
          <textarea id="pm-lessons" name="pm-lessons" rows={2} className={INPUT_CLASS} value={fields.lessonsLearned} onChange={(e) => set("lessonsLearned", e.target.value)} />
        </div>
      </div>
      <PreviewPanel markdown={markdown} />
    </div>
  );
}

function HandoffGenerator() {
  const [fields, setFields] = useState<HandoffFields>(emptyHandoff);
  const markdown = useMemo(() => renderHandoff(fields), [fields]);

  function set<K extends keyof HandoffFields>(key: K, value: HandoffFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLASS} htmlFor="ho-outgoing">Outgoing On-Call</label>
            <input id="ho-outgoing" name="ho-outgoing" className={INPUT_CLASS} value={fields.outgoingOnCall} onChange={(e) => set("outgoingOnCall", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLASS} htmlFor="ho-incoming">Incoming On-Call</label>
            <input id="ho-incoming" name="ho-incoming" className={INPUT_CLASS} value={fields.incomingOnCall} onChange={(e) => set("incomingOnCall", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="ho-date">Shift Date</label>
          <input id="ho-date" name="ho-date" className={INPUT_CLASS} value={fields.shiftDate} onChange={(e) => set("shiftDate", e.target.value)} placeholder="2026-07-10" />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="ho-open">Open Incidents</label>
          <textarea id="ho-open" name="ho-open" rows={3} className={INPUT_CLASS} value={fields.openIncidents} onChange={(e) => set("openIncidents", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="ho-watch">Things to Watch</label>
          <textarea id="ho-watch" name="ho-watch" rows={3} className={INPUT_CLASS} value={fields.watchItems} onChange={(e) => set("watchItems", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="ho-changes">Recent Changes</label>
          <textarea id="ho-changes" name="ho-changes" rows={3} className={INPUT_CLASS} value={fields.recentChanges} onChange={(e) => set("recentChanges", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="ho-notes">Notes for Next On-Call</label>
          <textarea id="ho-notes" name="ho-notes" rows={3} className={INPUT_CLASS} value={fields.notes} onChange={(e) => set("notes", e.target.value)} />
        </div>
      </div>
      <PreviewPanel markdown={markdown} />
    </div>
  );
}

export function IncidentTemplates() {
  const [tab, setTab] = useState<"postmortem" | "handoff">("postmortem");

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("postmortem")}
          className={`rounded-full border px-3 py-1.5 text-[12px] font-medium ${
            tab === "postmortem"
              ? "border-accent-blue/50 bg-accent-blue/10 text-accent-blue"
              : "border-border bg-surface-2/40 text-text-muted hover:text-text"
          }`}
        >
          Blameless Postmortem
        </button>
        <button
          type="button"
          onClick={() => setTab("handoff")}
          className={`rounded-full border px-3 py-1.5 text-[12px] font-medium ${
            tab === "handoff"
              ? "border-accent-blue/50 bg-accent-blue/10 text-accent-blue"
              : "border-border bg-surface-2/40 text-text-muted hover:text-text"
          }`}
        >
          On-Call Handoff
        </button>
      </div>

      <div className="glass-panel rounded-xl p-6">
        {tab === "postmortem" ? <PostmortemGenerator /> : <HandoffGenerator />}
      </div>
    </div>
  );
}

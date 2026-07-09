"use client";

import { useMemo, useState } from "react";
import {
  CRON_PRESETS,
  describeCron,
  fieldsToExpression,
  parseCronFields,
  type CronFields,
} from "@/lib/cron";

const FIELD_META: { key: keyof CronFields; label: string; placeholder: string }[] = [
  { key: "minute", label: "Minute", placeholder: "0-59" },
  { key: "hour", label: "Hour", placeholder: "0-23" },
  { key: "dayOfMonth", label: "Day of month", placeholder: "1-31" },
  { key: "month", label: "Month", placeholder: "1-12" },
  { key: "dayOfWeek", label: "Day of week", placeholder: "0-6 (Sun=0)" },
];

const DEFAULT_FIELDS: CronFields = {
  minute: "0",
  hour: "9",
  dayOfMonth: "*",
  month: "*",
  dayOfWeek: "*",
};

export function CronBuilder() {
  const [expression, setExpression] = useState(fieldsToExpression(DEFAULT_FIELDS));

  const fields = useMemo(() => parseCronFields(expression), [expression]);
  const description = useMemo(() => describeCron(expression), [expression]);

  function updateField(key: keyof CronFields, value: string) {
    const current = fields ?? DEFAULT_FIELDS;
    setExpression(fieldsToExpression({ ...current, [key]: value }));
  }

  return (
    <div className="mx-auto max-w-[800px] space-y-4">
      <div className="glass-panel rounded-xl p-6">
        <label htmlFor="cron-input" className="mb-2 block text-sm font-medium text-text-muted">
          Cron expression
        </label>
        <input
          id="cron-input"
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          spellCheck={false}
          className="w-full rounded-md border border-border bg-bg px-4 py-3 font-mono text-sm text-text outline-none focus:border-accent-blue"
        />

        <p className="mt-3 rounded-md border border-border-3 bg-bg px-4 py-3 text-[13px] text-text-body">
          {description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {CRON_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setExpression(preset.expression)}
              className="rounded-full border border-border bg-surface-2/40 px-3 py-1 text-[11px] text-text-muted hover:text-text"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-xl p-6">
        <p className="mb-3 text-sm font-medium text-text-muted">Or build it field by field</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {FIELD_META.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label htmlFor={`cron-field-${key}`} className="mb-1 block text-[11px] text-text-dim">
                {label}
              </label>
              <input
                id={`cron-field-${key}`}
                type="text"
                value={fields?.[key] ?? ""}
                onChange={(e) => updateField(key, e.target.value)}
                placeholder={placeholder}
                spellCheck={false}
                className="w-full rounded-md border border-border-3 bg-bg px-2 py-1.5 font-mono text-[12px] text-text outline-none focus:border-accent-blue"
              />
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-text-dim">
        Everything is parsed and generated in your browser — nothing is sent anywhere.
      </p>
    </div>
  );
}

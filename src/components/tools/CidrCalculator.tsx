"use client";

import { useMemo, useState } from "react";
import { calculateCidr } from "@/lib/cidr";

const ROW_LABELS = [
  { key: "network", label: "Network Address" },
  { key: "broadcast", label: "Broadcast Address" },
  { key: "netmask", label: "Subnet Mask" },
  { key: "wildcard", label: "Wildcard Mask" },
  { key: "firstHost", label: "First Usable Host" },
  { key: "lastHost", label: "Last Usable Host" },
] as const;

export function CidrCalculator() {
  const [input, setInput] = useState("10.0.0.0/24");
  const result = useMemo(() => calculateCidr(input), [input]);

  return (
    <div className="mx-auto max-w-[700px]">
      <div className="glass-panel rounded-xl p-6">
        <label htmlFor="cidr-input" className="mb-2 block text-sm font-medium text-text-muted">
          CIDR block
        </label>
        <input
          id="cidr-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 192.168.1.0/24"
          spellCheck={false}
          className="w-full rounded-md border border-border bg-bg px-4 py-3 font-mono text-sm text-text outline-none focus:border-accent-blue"
        />

        {"error" in result ? (
          <p className="mt-4 text-[13px] text-accent-error">{result.error}</p>
        ) : (
          <div className="mt-5 space-y-2">
            {ROW_LABELS.map(({ key, label }) => (
              <div
                key={key}
                className="grid grid-cols-[160px_1fr] items-center gap-3 rounded-md border border-border-3 bg-bg px-3 py-2"
              >
                <span className="text-[12px] text-text-muted">{label}</span>
                <code className="font-mono text-[13px] text-text-body">{result[key]}</code>
              </div>
            ))}
            <div className="grid grid-cols-[160px_1fr] items-center gap-3 rounded-md border border-border-3 bg-bg px-3 py-2">
              <span className="text-[12px] text-text-muted">Total Addresses</span>
              <code className="font-mono text-[13px] text-text-body">
                {result.totalAddresses.toLocaleString()}
              </code>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-center gap-3 rounded-md border border-border-3 bg-bg px-3 py-2">
              <span className="text-[12px] text-text-muted">Usable Hosts</span>
              <code className="font-mono text-[13px] text-text-body">
                {result.usableHosts.toLocaleString()}
              </code>
            </div>
          </div>
        )}

        <p className="mt-4 text-xs text-text-dim">
          Everything is calculated in your browser — nothing is sent anywhere.
        </p>
      </div>
    </div>
  );
}

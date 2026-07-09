"use client";

import { useMemo, useState } from "react";
import { parsePlanLines, parsePlanSummary } from "@/lib/terraformPlan";

const SAMPLE_PLAN = `Terraform will perform the following actions:

  # aws_instance.example will be created
  + resource "aws_instance" "example" {
      + ami           = "ami-0c55b159cbfafe1f0"
      + instance_type = "t2.micro"
    }

  # aws_s3_bucket.old will be destroyed
  - resource "aws_s3_bucket" "old" {
      - bucket = "my-old-bucket" -> null
    }

  # aws_instance.web will be updated in-place
  ~ resource "aws_instance" "web" {
      ~ instance_type = "t2.micro" -> "t2.medium"
    }

  # aws_instance.legacy must be replaced
-/+ resource "aws_instance" "legacy" {
      ~ ami = "ami-old" -> "ami-new" # forces replacement
    }

Plan: 2 to add, 2 to change, 1 to destroy.
`;

const KIND_CLASS: Record<string, string> = {
  add: "text-accent-green",
  remove: "text-accent-error",
  change: "text-accent-orange",
  replace: "text-accent-purple",
  header: "text-text font-semibold",
  neutral: "text-text-muted",
};

export function TerraformPlanPrettifier() {
  const [input, setInput] = useState(SAMPLE_PLAN);
  const lines = useMemo(() => parsePlanLines(input), [input]);
  const summary = useMemo(() => parsePlanSummary(input), [input]);

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="glass-panel rounded-xl p-6">
        <label htmlFor="tf-plan-input" className="mb-2 block text-sm font-medium text-text-muted">
          Paste raw `terraform plan` output
        </label>
        <textarea
          id="tf-plan-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          rows={12}
          className="w-full resize-y rounded-md border border-border bg-bg px-4 py-3 font-mono text-[12px] text-text outline-none focus:border-accent-blue"
        />

        {summary && (
          <div className="mt-4 flex flex-wrap gap-3 text-[12px]">
            <span className="rounded-md border border-accent-green/40 bg-accent-green/5 px-3 py-1 text-accent-green">
              + {summary.toAdd} to add
            </span>
            <span className="rounded-md border border-accent-orange/40 bg-accent-orange/5 px-3 py-1 text-accent-orange">
              ~ {summary.toChange} to change
            </span>
            <span className="rounded-md border border-accent-error/40 bg-accent-error/5 px-3 py-1 text-accent-error">
              - {summary.toDestroy} to destroy
            </span>
          </div>
        )}

        <pre className="mt-4 max-h-[32rem] overflow-auto rounded-md border border-border-3 bg-bg px-4 py-3 font-mono text-[12px] leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className={KIND_CLASS[line.kind]}>
              {line.text || " "}
            </div>
          ))}
        </pre>

        <p className="mt-4 text-xs text-text-dim">
          Everything is parsed in your browser — nothing is sent anywhere.
        </p>
      </div>
    </div>
  );
}

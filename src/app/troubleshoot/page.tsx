import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { FlowchartRunner } from "@/components/flowcharts/FlowchartRunner";

export const metadata: Metadata = {
  title: "Troubleshooting Flowcharts",
  description:
    "Click through interactive decision trees to diagnose crashing pods, exiting containers, and failing CI pipelines.",
};

export default function TroubleshootPage() {
  return (
    <ToolPageShell
      title="🧭 Troubleshooting Flowcharts"
      subtitle="Answer a few questions — get the likely cause and the fix"
    >
      <FlowchartRunner />
    </ToolPageShell>
  );
}

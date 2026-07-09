import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { RosettaStone } from "@/components/rosetta/RosettaStone";

export const metadata: Metadata = {
  title: "Cloud CLI Rosetta Stone",
  description:
    "Look up the same task across AWS, Azure, Google Cloud, and kubectl side by side — search by intent, not exact syntax.",
};

export default function RosettaPage() {
  return (
    <ToolPageShell
      title="🌐 Cloud CLI Rosetta Stone"
      subtitle="One task, every cloud — search by intent, compare side by side"
    >
      <RosettaStone />
    </ToolPageShell>
  );
}

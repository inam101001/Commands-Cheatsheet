import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { CommandExplainer } from "@/components/explain/CommandExplainer";

export const metadata: Metadata = {
  title: "Command Explainer",
  description: "Paste a Docker, kubectl, Terraform, or Git command and get every flag explained inline.",
};

export default function ExplainPage() {
  return (
    <ToolPageShell
      title="🧩 Command Explainer"
      subtitle="Paste a command — every token gets broken down inline"
    >
      <CommandExplainer />
    </ToolPageShell>
  );
}

import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { DockerfileLinter } from "@/components/tools/DockerfileLinter";

export const metadata: Metadata = {
  title: "Dockerfile Linter",
  description:
    "Paste a Dockerfile and get flagged lines for missing USER, :latest tags, apt-get pitfalls, ADD vs COPY, and more.",
};

export default function LintPage() {
  return (
    <ToolPageShell title="🧹 Dockerfile Linter" subtitle="Paste a Dockerfile — get flagged lines with explanations">
      <DockerfileLinter />
    </ToolPageShell>
  );
}

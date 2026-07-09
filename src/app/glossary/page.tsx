import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { GlossaryBrowser } from "@/components/glossary/GlossaryBrowser";

export const metadata: Metadata = {
  title: "Cloud-Native Glossary",
  description: "CNCF and DevOps jargon explained in plain English — Kubernetes, containers, networking, IaC, CI/CD, observability, and security terms.",
};

export default function GlossaryPage() {
  return (
    <ToolPageShell title="📚 Cloud-Native Glossary" subtitle="CNCF and DevOps jargon, explained in plain English">
      <GlossaryBrowser />
    </ToolPageShell>
  );
}

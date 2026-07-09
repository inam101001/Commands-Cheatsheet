import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { ChecklistRunner } from "@/components/checklists/ChecklistRunner";

export const metadata: Metadata = {
  title: "Production-Readiness Checklists",
  description:
    "Interactive checklists for Dockerfile hardening, Kubernetes deployment readiness, Terraform module hygiene, and CI/CD pipeline security. Progress saved locally, exportable as Markdown.",
};

export default function ChecklistsPage() {
  return (
    <ToolPageShell
      title="✅ Production-Readiness Checklists"
      subtitle="Check off what's done — progress saved in your browser"
    >
      <ChecklistRunner />
    </ToolPageShell>
  );
}

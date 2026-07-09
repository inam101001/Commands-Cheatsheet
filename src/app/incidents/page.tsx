import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { IncidentTemplates } from "@/components/incidents/IncidentTemplates";

export const metadata: Metadata = {
  title: "Incident Response Templates",
  description: "Blameless postmortem generator and on-call handoff checklist — fill in fields, copy the generated Markdown.",
};

export default function IncidentsPage() {
  return (
    <ToolPageShell title="🚨 Incident Templates" subtitle="Blameless postmortems and on-call handoffs, generated as Markdown">
      <IncidentTemplates />
    </ToolPageShell>
  );
}

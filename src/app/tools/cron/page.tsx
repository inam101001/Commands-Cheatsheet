import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { CronBuilder } from "@/components/tools/CronBuilder";

export const metadata: Metadata = {
  title: "Cron Builder & Explainer",
  description:
    "Build a cron expression field by field, or paste one to get a plain-English explanation of its schedule.",
};

export default function CronPage() {
  return (
    <ToolPageShell
      title="⏰ Cron Builder & Explainer"
      subtitle="Paste a cron expression or build one — works both directions"
    >
      <CronBuilder />
    </ToolPageShell>
  );
}

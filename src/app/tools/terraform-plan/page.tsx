import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { TerraformPlanPrettifier } from "@/components/tools/TerraformPlanPrettifier";

export const metadata: Metadata = {
  title: "Terraform Plan Prettifier",
  description: "Paste raw terraform plan output and get a readable, colorized create/change/destroy diff.",
};

export default function TerraformPlanPage() {
  return (
    <ToolPageShell
      title="🎨 Terraform Plan Prettifier"
      subtitle="Paste raw plan output — get a readable colorized diff"
    >
      <TerraformPlanPrettifier />
    </ToolPageShell>
  );
}

import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { K8sResourceCalculator } from "@/components/tools/K8sResourceCalculator";

export const metadata: Metadata = {
  title: "Kubernetes Resource Sanity Calculator",
  description:
    "Enter CPU and memory requests/limits and get sanity checks against common Kubernetes resource-configuration pitfalls.",
};

export default function K8sResourcesPage() {
  return (
    <ToolPageShell
      title="📐 K8s Resource Sanity Calculator"
      subtitle="Check requests/limits against common pitfalls"
    >
      <K8sResourceCalculator />
    </ToolPageShell>
  );
}

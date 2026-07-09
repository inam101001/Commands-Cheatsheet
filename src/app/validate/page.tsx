import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { ManifestValidator } from "@/components/validator/ManifestValidator";

export const metadata: Metadata = {
  title: "Kubernetes Manifest Validator",
  description:
    "Schema-aware validation for Deployment, Service, Ingress, StatefulSet, ConfigMap, Secret, Job, and CronJob manifests, with errors mapped to line numbers.",
};

export default function ValidatePage() {
  return (
    <ToolPageShell
      title="🔍 Manifest Validator"
      subtitle="Schema-aware validation, errors mapped to line numbers"
    >
      <ManifestValidator />
    </ToolPageShell>
  );
}

import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { ErrorDecoder } from "@/components/errors/ErrorDecoder";

export const metadata: Metadata = {
  title: "Error Decoder",
  description:
    "Search common Docker, Kubernetes, Terraform, and Git errors by message or symptom — get the cause, the fix, and related commands.",
};

export default function ErrorsPage() {
  return (
    <ToolPageShell
      title="🩹 Error Decoder"
      subtitle="Paste an error, or describe the symptom — get the cause and the fix"
    >
      <ErrorDecoder />
    </ToolPageShell>
  );
}

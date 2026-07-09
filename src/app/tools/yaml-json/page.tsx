import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { YamlJsonConverter } from "@/components/tools/YamlJsonConverter";

export const metadata: Metadata = {
  title: "YAML ⇄ JSON Converter",
  description:
    "Convert between YAML and JSON with auto-detected input format, plus a structural diff view for comparing two manifests regardless of formatting.",
};

export default function YamlJsonPage() {
  return (
    <ToolPageShell
      title="🔁 YAML ⇄ JSON Converter"
      subtitle="Auto-detected conversion, plus a structural diff view"
    >
      <YamlJsonConverter />
    </ToolPageShell>
  );
}

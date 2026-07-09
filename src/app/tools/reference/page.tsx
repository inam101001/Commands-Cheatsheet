import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { StatusCodeReference } from "@/components/tools/StatusCodeReference";

export const metadata: Metadata = {
  title: "HTTP & Exit Code Reference",
  description: "Searchable reference for HTTP status codes and POSIX/shell exit codes.",
};

export default function ReferencePage() {
  return (
    <ToolPageShell
      title="📖 HTTP & Exit Code Reference"
      subtitle="Search HTTP status codes and POSIX exit codes"
    >
      <StatusCodeReference />
    </ToolPageShell>
  );
}

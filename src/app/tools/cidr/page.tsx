import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { CidrCalculator } from "@/components/tools/CidrCalculator";

export const metadata: Metadata = {
  title: "CIDR / Subnet Calculator",
  description:
    "Enter a CIDR block and get the network address, broadcast address, subnet mask, usable host range, and host count.",
};

export default function CidrPage() {
  return (
    <ToolPageShell
      title="🧮 CIDR / Subnet Calculator"
      subtitle="Enter a CIDR block — get the full breakdown"
    >
      <CidrCalculator />
    </ToolPageShell>
  );
}

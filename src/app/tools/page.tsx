import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolLinks } from "@/data/toolsIndex";

export const metadata: Metadata = {
  title: "Tools",
  description: "Calculators and generators for DevOps: CIDR, cron, YAML/JSON, JWT, and more.",
};

export default function ToolsIndexPage() {
  return (
    <ToolPageShell title="🛠️ Tools" subtitle="Calculators and generators, all client-side">
      <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-4 sm:grid-cols-2">
        {toolLinks.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="glass-panel rounded-xl p-5 hover:border-accent-blue"
          >
            <p className="text-sm font-semibold text-text">
              {tool.icon} {tool.title}
            </p>
            <p className="mt-2 text-[12px] text-text-muted">{tool.description}</p>
          </Link>
        ))}
      </div>
    </ToolPageShell>
  );
}

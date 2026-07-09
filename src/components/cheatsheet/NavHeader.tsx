"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { tools } from "@/data/tools";
import { ThemeToggle } from "@/components/ThemeToggle";

// Growing list of feature pages beyond the per-tool cheatsheets. Gets a
// proper nav (sidebar / command palette) in the M11 integration pass —
// this flat list is the interim, extensible home for it.
const TOOL_PAGES = [
  { href: "/explain", label: "🧩 Explain" },
  { href: "/errors", label: "🩹 Errors" },
  { href: "/rosetta", label: "🌐 Rosetta" },
  { href: "/troubleshoot", label: "🧭 Troubleshoot" },
  { href: "/checklists", label: "✅ Checklists" },
  { href: "/tools", label: "🛠️ Tools" },
];

export function NavHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname.replace(/^\//, "");

  return (
    <div className="glass-panel sticky top-0 z-50 mb-8 flex items-center justify-between gap-4 rounded-xl px-5 py-3">
      <Link
        href="/"
        className="font-sans text-[13px] font-semibold text-accent-blue hover:text-accent-blue-light"
      >
        ⚡ OpsDeck
      </Link>
      <div className="hidden items-center gap-4 md:flex">
        {TOOL_PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={`text-[12px] font-medium ${
              pathname === page.href ? "text-accent-blue" : "text-text-muted hover:text-text"
            }`}
          >
            {page.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-[11px] text-text-muted sm:inline">
          Quick Switch:
        </span>
        <select
          id="quick-switch"
          name="quick-switch"
          className="cursor-pointer rounded-md border border-border-3 bg-bg px-3 py-1.5 text-[11px] text-text-body outline-none focus:border-accent-blue"
          value={currentSlug || ""}
          onChange={(e) => {
            if (e.target.value) router.push(`/${e.target.value}`);
          }}
        >
          <option value="">🏠 Home Dashboard</option>
          {tools.map((tool) => (
            <option key={tool.slug} value={tool.slug}>
              {tool.icon} {tool.name} Reference
            </option>
          ))}
        </select>
        <ThemeToggle />
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { tools } from "@/data/tools";

export function NavHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname.replace(/^\//, "");

  return (
    <div className="sticky top-0 z-50 mb-8 flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-2/95 px-5 py-3 backdrop-blur-md">
      <Link
        href="/"
        className="font-sans text-[13px] font-semibold text-accent-blue hover:text-accent-blue-light"
      >
        ⚡ DevOps Commands Hub
      </Link>
      <div className="flex items-center gap-2">
        <span className="hidden text-[11px] text-text-muted sm:inline">
          Quick Switch:
        </span>
        <select
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
      </div>
    </div>
  );
}

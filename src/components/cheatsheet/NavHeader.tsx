"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { tools } from "@/data/tools";
import { ThemeToggle } from "@/components/ThemeToggle";
import { openCommandPalette } from "@/components/CommandPalette";

interface FeaturePage {
  href: string;
  label: string;
  group: "Analyze & Debug" | "Reference" | "Operate" | "Personal";
}

const FEATURE_PAGES: FeaturePage[] = [
  { href: "/explain", label: "🧩 Explain", group: "Analyze & Debug" },
  { href: "/errors", label: "🩹 Errors", group: "Analyze & Debug" },
  { href: "/troubleshoot", label: "🧭 Troubleshoot", group: "Analyze & Debug" },
  { href: "/validate", label: "🔍 Validate", group: "Analyze & Debug" },
  { href: "/lint", label: "🧹 Lint", group: "Analyze & Debug" },
  { href: "/rosetta", label: "🌐 Rosetta Stone", group: "Reference" },
  { href: "/glossary", label: "📚 Glossary", group: "Reference" },
  { href: "/tools", label: "🛠️ Calculators & Tools", group: "Reference" },
  { href: "/checklists", label: "✅ Checklists", group: "Operate" },
  { href: "/incidents", label: "🚨 Incident Templates", group: "Operate" },
  { href: "/snippets", label: "📌 My Snippets", group: "Personal" },
];

const GROUP_ORDER: FeaturePage["group"][] = ["Analyze & Debug", "Reference", "Operate", "Personal"];

function FeatureMenu({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const activePage = FEATURE_PAGES.find((p) => p.href === pathname);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium ${
          activePage ? "text-accent-blue" : "text-text-muted hover:text-text"
        }`}
      >
        {activePage ? activePage.label : "☰ Explore"}
        <span className="text-[9px]">▾</span>
      </button>

      {isOpen && (
        <div className="glass-panel absolute top-full left-0 z-50 mt-2 w-[560px] max-w-[80vw] rounded-xl p-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {GROUP_ORDER.map((group) => (
              <div key={group}>
                <p className="mb-2 text-[10px] font-semibold tracking-wide text-text-dim uppercase">{group}</p>
                <div className="flex flex-col gap-1.5">
                  {FEATURE_PAGES.filter((p) => p.group === group).map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-[12px] ${
                        pathname === page.href ? "text-accent-blue" : "text-text-muted hover:text-text"
                      }`}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function NavHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname.replace(/^\//, "");

  return (
    <div className="glass-panel print-hide sticky top-0 z-50 mb-8 flex items-center justify-between gap-4 rounded-xl px-5 py-3">
      <Link
        href="/"
        className="flex-shrink-0 font-sans text-[13px] font-semibold text-accent-blue hover:text-accent-blue-light"
      >
        ⚡ OpsDeck
      </Link>

      <div className="hidden md:block">
        <FeatureMenu pathname={pathname} />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={openCommandPalette}
          title="Open command palette"
          className="flex items-center gap-1.5 rounded-md border border-border-3 bg-bg px-2.5 py-1.5 text-[11px] text-text-muted hover:border-accent-blue hover:text-text"
        >
          🔎 <span className="hidden sm:inline">Jump anywhere</span>{" "}
          <kbd className="font-mono text-[10px]">Ctrl K</kbd>
        </button>
        <select
          id="quick-switch"
          name="quick-switch"
          className="hidden cursor-pointer rounded-md border border-border-3 bg-bg px-3 py-1.5 text-[11px] text-text-body outline-none focus:border-accent-blue sm:block"
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

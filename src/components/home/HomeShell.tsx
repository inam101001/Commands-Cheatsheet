"use client";

import { useState } from "react";
import { ToastProvider } from "./ToastProvider";
import { PortalPanel } from "./PortalPanel";
import { CommandBuilderPanel } from "./CommandBuilderPanel";
import { TemplatesPanel } from "./TemplatesPanel";
import { ValidatorPanel } from "./ValidatorPanel";
import { NodeGraphBackground } from "@/components/NodeGraphBackground";
import { ThemeToggle } from "@/components/ThemeToggle";

type Tab = "portal" | "builder" | "templates" | "validator";

const TABS: { id: Tab; label: string }[] = [
  { id: "portal", label: "🗂️ Cheatsheet Hub" },
  { id: "builder", label: "⚙️ Command Builder" },
  { id: "templates", label: "📄 Config Boilerplates" },
  { id: "validator", label: "🔍 Syntax Validator" },
];

export function HomeShell() {
  const [tab, setTab] = useState<Tab>("portal");

  return (
    <ToastProvider>
      <div className="min-h-screen bg-bg px-5 py-5 text-text-body">
        <div className="absolute top-5 right-5 z-10">
          <ThemeToggle />
        </div>

        <header className="relative mx-auto mt-5 mb-10 max-w-[1200px] overflow-hidden rounded-2xl px-6 py-12 text-center">
          <NodeGraphBackground className="opacity-70" />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-3">
              <span className="animate-logo-pulse text-4xl">⚡</span>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-text">
                OpsDeck
              </h1>
            </div>
            <p className="mx-auto mb-6 max-w-[650px] text-[17px] leading-relaxed font-light text-text-muted">
              The cloud-native command center for DevOps engineers. Interactive builders, template
              generators, live validators, and searchable cheatsheets — all running in your browser.
            </p>

            <nav className="glass-panel mx-auto flex max-w-[750px] flex-wrap justify-center gap-2 rounded-full p-1.5">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-[15px] font-semibold ${
                    tab === t.id
                      ? "bg-border-3 text-text shadow-lg"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <main>
          <div className={tab === "portal" ? "animate-fade-in-up block" : "hidden"}>
            <PortalPanel />
          </div>
          <div className={tab === "builder" ? "animate-fade-in-up block" : "hidden"}>
            <CommandBuilderPanel />
          </div>
          <div className={tab === "templates" ? "animate-fade-in-up block" : "hidden"}>
            <TemplatesPanel />
          </div>
          <div className={tab === "validator" ? "animate-fade-in-up block" : "hidden"}>
            <ValidatorPanel />
          </div>
        </main>

        <footer className="mx-auto mt-20 max-w-[1200px] border-t border-border pt-6 text-center text-sm text-text-muted">
          <p>© 2026 OpsDeck. Built to maximize developer speed and eliminate search fatigue.</p>
        </footer>
      </div>
    </ToastProvider>
  );
}

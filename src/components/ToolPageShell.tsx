import { NavHeader } from "@/components/cheatsheet/NavHeader";

interface ToolPageShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function ToolPageShell({ title, subtitle, children }: ToolPageShellProps) {
  return (
    <div className="min-h-screen bg-bg px-5 py-7 pb-16 text-text-body">
      <div className="mx-auto max-w-[1600px]">
        <NavHeader />

        <h1 className="mb-2 text-center font-sans text-2xl font-bold tracking-[3px] text-accent-blue [text-shadow:0_0_30px_var(--c-accent)]">
          {title}
        </h1>
        <p className="mb-8 text-center font-sans text-[11px] tracking-wider text-text-dim uppercase">
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
}

export type StatusVariant = "success" | "warning" | "error" | "info" | "neutral";

const VARIANT_CLASS: Record<StatusVariant, string> = {
  success: "bg-accent-green text-accent-green",
  warning: "bg-accent-orange text-accent-orange",
  error: "bg-accent-error text-accent-error",
  info: "bg-accent-blue text-accent-blue",
  neutral: "bg-text-dim text-text-dim",
};

interface StatusDotProps {
  variant: StatusVariant;
  pulse?: boolean;
  className?: string;
}

export function StatusDot({ variant, pulse = false, className }: StatusDotProps) {
  return (
    <span
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${VARIANT_CLASS[variant]} ${
        pulse ? "animate-status-pulse" : ""
      } ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

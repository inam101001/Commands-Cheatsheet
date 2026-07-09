export interface ToolLink {
  href: string;
  icon: string;
  title: string;
  description: string;
}

export const toolLinks: ToolLink[] = [
  {
    href: "/tools/cidr",
    icon: "🧮",
    title: "CIDR / Subnet Calculator",
    description: "Network address, broadcast, usable range, and host count from any CIDR block.",
  },
  {
    href: "/tools/cron",
    icon: "⏰",
    title: "Cron Builder & Explainer",
    description: "Bidirectional: build a cron expression, or paste one to get a plain-English schedule.",
  },
  {
    href: "/tools/yaml-json",
    icon: "🔁",
    title: "YAML ⇄ JSON Converter",
    description: "Convert between formats with a structural diff view.",
  },
  {
    href: "/tools/jwt",
    icon: "🔑",
    title: "JWT Decoder",
    description: "Decoded entirely in your browser — nothing is sent anywhere.",
  },
  {
    href: "/tools/reference",
    icon: "📖",
    title: "HTTP & Exit Code Reference",
    description: "HTTP status codes and POSIX exit codes, searchable.",
  },
  {
    href: "/tools/k8s-resources",
    icon: "📐",
    title: "K8s Resource Sanity Calculator",
    description: "Sanity-check CPU/memory requests and limits against common pitfalls.",
  },
  {
    href: "/tools/terraform-plan",
    icon: "🎨",
    title: "Terraform Plan Prettifier",
    description: "Paste raw `terraform plan` output, get a readable colorized diff.",
  },
];

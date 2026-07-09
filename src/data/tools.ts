import type { ToolMeta } from "@/data/types";

export const tools: ToolMeta[] = [
  {
    slug: "docker",
    name: "Docker",
    icon: "🐳",
    description:
      "Complete guide covering container creation, custom builds, volume mapping, logs rotation, swarm systems, and run resource caps.",
    cmdCount: "100+ commands",
    category: "container",
    accentClass: "before:bg-[#2496ed]",
  },
  {
    slug: "kubernetes",
    name: "Kubernetes",
    icon: "☸️",
    description:
      "Robust cluster configuration references. Covers namespace tasks, deployments rollback, daemonset limits, custom JSONPaths, and Helm charts.",
    cmdCount: "120+ commands",
    category: "container",
    accentClass: "before:bg-[#326ce5]",
  },
  {
    slug: "terraform",
    name: "Terraform",
    icon: "🏗️",
    description:
      "HCL resource definitions, workspaces separation, direct state manipulations, lock releases, S3/Azure backends, and modular standards.",
    cmdCount: "80+ commands",
    category: "iac",
    accentClass: "before:bg-[#7c3aed]",
  },
  {
    slug: "git",
    name: "Git",
    icon: "🔀",
    description:
      "From primary config setup, branch merges, interactive rebases, stash profiles, up to advanced worktrees, object reflogs, and diagnostics.",
    cmdCount: "150+ commands",
    category: "os",
    accentClass: "before:bg-[#f05032]",
  },
  {
    slug: "github-actions",
    name: "GitHub Actions",
    icon: "⚡",
    description:
      "Workflow syntax definitions, step outputs, OIDC secure provider integrations, parallel matrices, runner configurations, and environment gates.",
    cmdCount: "90+ commands",
    category: "cicd",
    accentClass: "before:bg-[#238636]",
  },
  {
    slug: "jenkins",
    name: "Jenkins",
    icon: "🔧",
    description:
      "Remote CLI actions, REST crumb generation, Groovy scripts, declarative and scripted pipelines, credentials masking, and config-as-code YAMLs.",
    cmdCount: "60+ commands",
    category: "cicd",
    accentClass: "before:bg-[#d33833]",
  },
  {
    slug: "linux",
    name: "Linux",
    icon: "🐧",
    description:
      "Essential utilities, filesystem permissions, process management, custom storage mounts, dig/tcpdump network checkers, and Bash scripting standards.",
    cmdCount: "200+ commands",
    category: "os",
    accentClass: "before:bg-[#e95420]",
  },
  {
    slug: "prometheus-grafana",
    name: "Prometheus & Grafana",
    icon: "🔥",
    description:
      "TSDB settings, scraping definitions, custom PromQL rate/histogram equations, Alertmanager triggers, Loki LogQL, and Tempo service graphs.",
    cmdCount: "70+ commands",
    category: "monitoring",
    accentClass: "before:bg-[#e6522c]",
  },
  {
    slug: "helm",
    name: "Helm",
    icon: "⎈",
    description:
      "Kubernetes package manager reference — chart installs, upgrades, rollbacks, values precedence, templating, and dependency management.",
    cmdCount: "60+ commands",
    category: "container",
    accentClass: "before:bg-[#0f1689]",
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return tools.find((tool) => tool.slug === slug);
}

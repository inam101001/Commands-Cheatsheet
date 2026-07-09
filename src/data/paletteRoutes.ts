export interface PaletteRoute {
  href: string;
  icon: string;
  title: string;
  keywords: string;
}

export const paletteRoutes: PaletteRoute[] = [
  { href: "/", icon: "🏠", title: "Home Dashboard", keywords: "home dashboard portal search" },
  { href: "/docker", icon: "🐳", title: "Docker Cheatsheet", keywords: "docker container image compose" },
  { href: "/kubernetes", icon: "☸️", title: "Kubernetes Cheatsheet", keywords: "kubernetes k8s kubectl pod" },
  { href: "/terraform", icon: "🏗️", title: "Terraform Cheatsheet", keywords: "terraform hcl iac state" },
  { href: "/git", icon: "🔀", title: "Git Cheatsheet", keywords: "git branch commit rebase merge" },
  {
    href: "/github-actions",
    icon: "⚡",
    title: "GitHub Actions Cheatsheet",
    keywords: "github actions workflow ci cd",
  },
  { href: "/jenkins", icon: "🔧", title: "Jenkins Cheatsheet", keywords: "jenkins pipeline groovy cli" },
  { href: "/linux", icon: "🐧", title: "Linux Cheatsheet", keywords: "linux bash shell unix filesystem" },
  {
    href: "/prometheus-grafana",
    icon: "🔥",
    title: "Prometheus & Grafana Cheatsheet",
    keywords: "prometheus grafana promql alertmanager loki",
  },
  { href: "/explain", icon: "🧩", title: "Command Explainer", keywords: "explain command breakdown flags" },
  { href: "/errors", icon: "🩹", title: "Error Decoder", keywords: "error decoder crashloop exitcode fix" },
  { href: "/rosetta", icon: "🌐", title: "Cloud CLI Rosetta Stone", keywords: "aws azure gcloud cli rosetta" },
  {
    href: "/troubleshoot",
    icon: "🧭",
    title: "Troubleshooting Flowcharts",
    keywords: "troubleshoot flowchart debug diagnose",
  },
  {
    href: "/checklists",
    icon: "✅",
    title: "Production-Readiness Checklists",
    keywords: "checklist readiness production launch",
  },
  { href: "/tools", icon: "🛠️", title: "Tools Index", keywords: "tools calculators generators" },
  {
    href: "/tools/cidr",
    icon: "🧮",
    title: "CIDR / Subnet Calculator",
    keywords: "cidr subnet ip network calculator",
  },
  { href: "/tools/cron", icon: "⏰", title: "Cron Builder & Explainer", keywords: "cron schedule crontab builder" },
  {
    href: "/tools/yaml-json",
    icon: "🔁",
    title: "YAML ⇄ JSON Converter",
    keywords: "yaml json convert diff",
  },
  { href: "/tools/jwt", icon: "🔑", title: "JWT Decoder", keywords: "jwt token decode auth" },
  {
    href: "/tools/reference",
    icon: "📖",
    title: "HTTP & Exit Code Reference",
    keywords: "http status exit code reference",
  },
  {
    href: "/tools/k8s-resources",
    icon: "📐",
    title: "K8s Resource Sanity Calculator",
    keywords: "kubernetes resources cpu memory limits requests",
  },
  {
    href: "/tools/terraform-plan",
    icon: "🎨",
    title: "Terraform Plan Prettifier",
    keywords: "terraform plan diff prettify colorize",
  },
  {
    href: "/validate",
    icon: "🔍",
    title: "Kubernetes Manifest Validator",
    keywords: "kubernetes manifest validate schema yaml",
  },
  { href: "/lint", icon: "🧹", title: "Dockerfile Linter", keywords: "dockerfile lint rules best practices" },
  { href: "/snippets", icon: "📌", title: "My Snippets", keywords: "bookmarks saved snippets favorites" },
];

export interface ChecklistItem {
  id: string;
  text: string;
  rationale: string;
}

export interface Checklist {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: ChecklistItem[];
}

export const checklists: Checklist[] = [
  {
    id: "dockerfile-hardening",
    title: "Dockerfile Hardening",
    icon: "🐳",
    description: "Reduce attack surface and image bloat before it ships.",
    items: [
      {
        id: "pin-base-image",
        text: "Use a specific version tag, never `latest`, for the base image",
        rationale: "Pins builds to a known-good, reproducible base instead of whatever \"latest\" resolves to today.",
      },
      {
        id: "non-root-user",
        text: "Run as a non-root user via a `USER` instruction",
        rationale: "Limits blast radius if the container is compromised — no root inside a compromised container.",
      },
      {
        id: "multi-stage-build",
        text: "Use multi-stage builds to keep build tools out of the final image",
        rationale: "Smaller attack surface and image size — compilers/package managers don't belong in production.",
      },
      {
        id: "dockerignore",
        text: "Add a `.dockerignore` covering `.git`, `node_modules`, secrets, and local env files",
        rationale: "Prevents accidentally baking secrets or bloat into the image.",
      },
      {
        id: "avoid-add-url",
        text: "Avoid `ADD` for remote URLs; use `COPY` and verify checksums for anything downloaded",
        rationale: "`ADD` from a URL skips integrity checking and can silently pull compromised artifacts.",
      },
      {
        id: "no-secrets-in-env",
        text: "Don't hardcode secrets/credentials in `ENV` or `ARG`",
        rationale: "Build args and env vars are visible in image history and `docker inspect`.",
      },
      {
        id: "pin-package-versions",
        text: "Pin package manager installs (e.g. `apt-get install pkg=version`) rather than open-ended",
        rationale: "Prevents unexpected upgrades from breaking or introducing vulnerabilities on rebuild.",
      },
      {
        id: "healthcheck",
        text: "Set a `HEALTHCHECK` instruction",
        rationale: "Lets the orchestrator detect a hung/unhealthy container instead of treating it as up.",
      },
      {
        id: "image-scanning",
        text: "Run image scanning (Trivy, Grype, or equivalent) in CI",
        rationale: "Catches known CVEs in the base image and dependencies before they ship.",
      },
      {
        id: "minimize-packages",
        text: "Minimize installed packages (`--no-install-recommends`, clean package manager cache)",
        rationale: "Fewer packages means a smaller attack surface and image size.",
      },
      {
        id: "explicit-workdir",
        text: "Explicitly set `WORKDIR` rather than relying on the default",
        rationale: "Avoids ambiguity about where files land and commands run.",
      },
      {
        id: "layer-ordering",
        text: "Order layers from least to most frequently changing",
        rationale: "Maximizes Docker build cache reuse and speeds up CI.",
      },
    ],
  },
  {
    id: "k8s-deployment-readiness",
    title: "Kubernetes Deployment Readiness",
    icon: "☸️",
    description: "What a workload needs before it's safe to run in production.",
    items: [
      {
        id: "requests-limits",
        text: "Set resource `requests` and `limits` for every container",
        rationale: "Without these, one pod can starve the node or get evicted unpredictably.",
      },
      {
        id: "probes",
        text: "Configure both `readinessProbe` and `livenessProbe`",
        rationale: "Readiness controls traffic routing, liveness recovers hung processes — they solve different problems.",
      },
      {
        id: "min-replicas",
        text: "Set `replicas` to 2 or more for anything user-facing",
        rationale: "A single replica means any node drain or crash is an outage.",
      },
      {
        id: "pod-disruption-budget",
        text: "Define a `PodDisruptionBudget`",
        rationale: "Protects availability during voluntary disruptions like node upgrades or cluster autoscaling.",
      },
      {
        id: "no-latest-tag",
        text: "Avoid `:latest` image tags in manifests",
        rationale: "Makes rollouts non-reproducible and rollbacks unreliable.",
      },
      {
        id: "graceful-termination",
        text: "Set `terminationGracePeriodSeconds` appropriately and handle SIGTERM in-app",
        rationale: "Prevents dropped requests during rolling updates and scale-down.",
      },
      {
        id: "network-policy",
        text: "Use namespaces and `NetworkPolicy` to restrict traffic",
        rationale: "Default-allow-all networking means any compromised pod can reach anything else in the cluster.",
      },
      {
        id: "security-context",
        text: "Avoid running containers as root; set a `securityContext`",
        rationale: "Limits what a compromised container can do to the node.",
      },
      {
        id: "image-pull-policy",
        text: "Set `imagePullPolicy` deliberately, not left to default assumptions",
        rationale: "`Always` vs `IfNotPresent` behaves very differently with mutable tags.",
      },
      {
        id: "hpa",
        text: "Configure horizontal pod autoscaling if load is variable",
        rationale: "Static replica counts either waste resources or fall over under spikes.",
      },
      {
        id: "config-outside-image",
        text: "Store configuration in ConfigMaps/Secrets, not baked into the image",
        rationale: "Lets you promote the same image across environments without rebuilding.",
      },
      {
        id: "consistent-labels",
        text: "Label resources consistently (`app`, `env`, `version`)",
        rationale: "Makes selectors, monitoring, and cost attribution possible at scale.",
      },
    ],
  },
  {
    id: "terraform-module-hygiene",
    title: "Terraform Module Hygiene",
    icon: "🏗️",
    description: "Keep infrastructure-as-code safe, reviewable, and reusable.",
    items: [
      {
        id: "pin-versions",
        text: "Pin provider and module versions with `required_version`/`required_providers`",
        rationale: "Prevents a provider upgrade from silently changing behavior on the next apply.",
      },
      {
        id: "remote-state",
        text: "Store state remotely with locking (S3+DynamoDB, Terraform Cloud, GCS, etc.)",
        rationale: "Local state risks loss, corruption, and concurrent-apply conflicts.",
      },
      {
        id: "no-state-in-vcs",
        text: "Never commit `.tfstate` or `.tfvars` containing secrets to version control",
        rationale: "State files often contain plaintext secrets and resource IDs.",
      },
      {
        id: "plan-in-ci",
        text: "Run `terraform plan` in CI and require review before `apply`",
        rationale: "Catches unintended destroys/changes before they hit real infrastructure.",
      },
      {
        id: "separate-environments",
        text: "Separate environments (dev/staging/prod) via workspaces or directory structure, not branches",
        rationale: "Branches don't isolate state — a merge can accidentally apply to the wrong environment.",
      },
      {
        id: "typed-variables",
        text: "Use variables and outputs with descriptions and type constraints",
        rationale: "Makes modules self-documenting and catches type errors at plan time.",
      },
      {
        id: "no-hardcoded-ids",
        text: "Avoid hardcoding account IDs, ARNs, and regions",
        rationale: "Makes modules reusable across accounts/regions without copy-paste edits.",
      },
      {
        id: "consistent-tagging",
        text: "Tag all resources consistently (owner, environment, cost-center)",
        rationale: "Essential for cost tracking and accountability at scale.",
      },
      {
        id: "static-analysis",
        text: "Run tflint/checkov/tfsec (or equivalent) in CI",
        rationale: "Catches misconfigurations like public S3 buckets or open security groups before they're provisioned.",
      },
      {
        id: "small-composable-modules",
        text: "Keep modules small and composable rather than one giant root module",
        rationale: "Smaller blast radius per apply, easier review, reusable across projects.",
      },
      {
        id: "prevent-destroy",
        text: "Use `prevent_destroy` lifecycle rules on critical resources (databases, etc.)",
        rationale: "Guards against an accidental `terraform destroy` taking down production data.",
      },
      {
        id: "module-readme",
        text: "Document required variables and expected values in a README per module",
        rationale: "Reduces onboarding time and misconfiguration by other engineers.",
      },
    ],
  },
  {
    id: "cicd-pipeline-security",
    title: "CI/CD Pipeline Security",
    icon: "🔐",
    description: "Close the common supply-chain and credential-leak gaps.",
    items: [
      {
        id: "secrets-in-secret-store",
        text: "Store secrets in the CI provider's secret store, never in the repo or plaintext config",
        rationale: "Secrets committed to git history are effectively public forever.",
      },
      {
        id: "pin-actions-to-sha",
        text: "Pin third-party CI actions/plugins to a commit SHA, not a mutable tag",
        rationale: "A compromised or updated tag can silently inject malicious code into your pipeline.",
      },
      {
        id: "least-privilege-tokens",
        text: "Use least-privilege tokens/credentials scoped to what the job actually needs",
        rationale: "Limits damage if a pipeline step or dependency is compromised.",
      },
      {
        id: "branch-protection",
        text: "Require branch protection and review before merging to the deploy branch",
        rationale: "Prevents unreviewed code from reaching production via CI.",
      },
      {
        id: "no-secrets-in-logs",
        text: "Don't echo/print secrets in logs, even for debugging",
        rationale: "CI logs are often more widely accessible than the secret store itself.",
      },
      {
        id: "separate-build-deploy-creds",
        text: "Separate build and deploy credentials — build shouldn't need production deploy access",
        rationale: "Limits what a compromised build step can reach.",
      },
      {
        id: "scanning-as-gate",
        text: "Run dependency and container image scanning as a pipeline gate, not just informationally",
        rationale: "A scan nobody blocks on doesn't actually stop vulnerable code from shipping.",
      },
      {
        id: "artifact-signing",
        text: "Sign build artifacts / use provenance attestation (SLSA, cosign) where possible",
        rationale: "Lets downstream consumers verify an artifact actually came from your pipeline.",
      },
      {
        id: "rotate-secrets",
        text: "Rotate CI/CD secrets and tokens on a schedule, not just when compromised",
        rationale: "Limits the window of usefulness for a leaked credential nobody noticed yet.",
      },
      {
        id: "manual-deploy-approval",
        text: "Restrict who can trigger deploys to production (manual approval gate)",
        rationale: "Adds a deliberate checkpoint before irreversible actions.",
      },
      {
        id: "no-fork-pr-secrets",
        text: "Avoid trigger types that run untrusted fork PR code with secrets access",
        rationale: "A well-known supply-chain attack vector in public repos.",
      },
      {
        id: "audit-marketplace-actions",
        text: "Audit third-party marketplace actions/plugins before adding them to the pipeline",
        rationale: "Pipeline plugins run with significant access and are a common supply-chain target.",
      },
    ],
  },
];

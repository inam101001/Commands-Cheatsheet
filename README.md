# ⚡ OpsDeck

The cloud-native command center for DevOps, Cloud, and Systems Engineering — built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS v4**.

A searchable cheatsheet library plus a full toolbench of interactive tools — command explainers, an error decoder, a multi-cloud CLI Rosetta Stone, schema-aware validators, calculators, and a command palette tying it all together. The app is installable as a **Progressive Web App** and works offline. Everything runs entirely client-side — nothing you paste or type is ever sent to a server.

See [`plan.md`](./plan.md) for the original product vision/research this was built from, and [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) for the milestone-by-milestone build log. Want to contribute a command, error entry, or a whole new tool? See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## Features

### 🗂️ Cheatsheet Hub

Nine comprehensive, searchable command references:

| Tool | Coverage |
| --- | --- |
| 🐳 **Docker** | Image builds, container lifecycle, volumes, networking, Compose, Swarm |
| ☸️ **Kubernetes** | `kubectl` reference, deployments, rollbacks, JSONPath |
| ⎈ **Helm** | Repos, install/upgrade/rollback, values precedence, chart dev, testing, plugins |
| 🏗️ **Terraform** | CLI workflow, HCL syntax, state management, workspaces, modules |
| 🔀 **Git** | Config, branching, interactive rebase, stash, worktrees, reflog |
| ⚡ **GitHub Actions** | Workflow triggers, jobs/runners, matrices, OIDC, environments |
| 🔧 **Jenkins** | REST/CLI actions, Groovy console scripts, pipelines, config-as-code |
| 🐧 **Linux** | Filesystem, permissions, process management, networking, Bash |
| 🔥 **Prometheus & Grafana** | PromQL, Alertmanager, Loki LogQL, Tempo tracing |

Every command row is deep-linkable (`/tool#command-slug`), bookmarkable to **My Snippets**, and indexed by the command palette and homepage search bar.

### 🧩 Interactive Knowledge Tools

- **Command Explainer** (`/explain`) — paste a Docker/kubectl/Terraform/git command, get each flag broken down inline.
- **Error Decoder** (`/errors`) — searchable library of real error strings with cause, fix, and related commands.
- **Troubleshooting Flowcharts** (`/troubleshoot`) — clickable decision trees for common Kubernetes/Docker/CI failures.
- **Cloud CLI Rosetta Stone** (`/rosetta`) — AWS CLI / Azure CLI / gcloud / kubectl equivalents, searchable by task.
- **Production-Readiness Checklists** (`/checklists`) — interactive, exportable, progress saved locally.
- **Cloud-Native Glossary** (`/glossary`) — CNCF/DevOps jargon in plain English, searchable.
- **Incident Templates** (`/incidents`) — blameless postmortem generator and on-call handoff generator, both Markdown-exportable.

### 🛠️ Calculators & Generators (`/tools`)

CIDR/subnet calculator, cron builder & explainer (bidirectional), YAML⇄JSON converter, JWT decoder, HTTP status/POSIX exit code reference, Kubernetes resource sanity calculator, and a Terraform plan-output prettifier.

### 🔍 Validators

- **Kubernetes Manifest Validator** (`/validate`) — schema-aware validation (`ajv`) for Deployment/Service/Ingress/StatefulSet/ConfigMap/Secret/Job/CronJob, errors mapped to line numbers.
- **Dockerfile Linter** (`/lint`) — rule-based checks (missing `USER`, `:latest` tags, `apt-get` pitfalls, `ADD` vs `COPY`, and more).

### ⚡ Productivity Layer

- **Command palette** (`Ctrl/Cmd+K`) — fuzzy search across every page and every command, keyboard-navigable.
- **My Snippets** (`/snippets`) — bookmark any command row, view/remove them from one page.
- **Recently viewed** — surfaced in the command palette.
- **Print stylesheet** — clean printed/PDF output for cheat sheet pages.

### 📱 Progressive Web App

Installable from the browser address bar. A service worker caches visited pages for offline access.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS v4
- **Language**: TypeScript (strict mode)
- **Validation**: `ajv` (schema-aware K8s manifest validation), `js-yaml` (YAML/JSON parsing)
- **Fonts**: Inter, JetBrains Mono, Outfit (via `next/font/google`)
- **Linting**: ESLint 9 flat config (Next.js core-web-vitals + TypeScript + React Hooks rules)

---

## Project Structure

```bash
src/
├── app/                        # Next.js App Router routes — one folder per feature/tool page
├── components/
│   ├── cheatsheet/                # Shared cheatsheet template (NavHeader, Card, CardBlock, RowActions)
│   ├── home/                      # Homepage panels
│   ├── tools/, validator/, glossary/, incidents/, snippets/, errors/, flowcharts/, checklists/, rosetta/, cron/...
│   └── CommandPalette.tsx, RecentlyViewedTracker.tsx
└── data/
    ├── cheatsheets/*.ts            # Structured command data per tool
    ├── tools.ts                    # Tool metadata used by the portal grid + Quick Switch
    ├── errors.ts, rosetta.ts, checklists.ts, glossary.ts, paletteRoutes.ts
    ├── searchIndex.ts               # Flattened, anchor-linked search index built from all cheatsheet data
    └── types.ts                     # Shared TypeScript types
```

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the exact shape of every data file and how to add to each one.

---

## Local Development

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build       # production build (also runs the TypeScript check)
npm run start        # serve the production build
npm run lint          # ESLint
```

---

## Deployment

Standard Next.js app — deploy to **Vercel** by importing the repository at [vercel.com/new](https://vercel.com/new). No environment variables required — the entire app is static/client-side.

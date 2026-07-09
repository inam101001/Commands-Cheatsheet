# ⚡ DevOps Commands Hub & Workbench

A premium, highly interactive developer workspace for DevOps, Cloud, and Systems Engineering command references — built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS v4**.

It combines a searchable cheatsheet library with a set of interactive tools: a CLI command builder with a mock terminal, a config boilerplate generator, and a live YAML/JSON validator. The app is installable as a **Progressive Web App** and works offline.

---

## Features

### 🗂️ Cheatsheet Hub

Eight comprehensive, searchable command references, ~1,700 commands total:

| Tool | Coverage |
| --- | --- |
| 🐳 **Docker** | Image builds, container lifecycle, volumes, networking, Compose, Swarm |
| ☸️ **Kubernetes** | `kubectl` reference, deployments, rollbacks, JSONPath, Helm |
| 🏗️ **Terraform** | CLI workflow, HCL syntax, state management, workspaces, modules |
| 🔀 **Git** | Config, branching, interactive rebase, stash, worktrees, reflog |
| ⚡ **GitHub Actions** | Workflow triggers, jobs/runners, matrices, OIDC, environments |
| 🔧 **Jenkins** | REST/CLI actions, Groovy console scripts, pipelines, config-as-code |
| 🐧 **Linux** | Filesystem, permissions, process management, networking, Bash |
| 🔥 **Prometheus & Grafana** | PromQL, Alertmanager, Loki LogQL, Tempo tracing |

Every command across every tool is indexed by a single homepage search bar — search by command text, description, or tool name and copy any result with one click. Each cheatsheet page also has a sticky "Quick Switch" dropdown to jump directly to another tool.

### ⚙️ Interactive Command Builder

Build a `docker run` or `kubectl create deployment` command by toggling flags and filling in fields, watch the command string update live, then "run" it in a simulated mock terminal that mimics real CLI output.

### 📄 Config Boilerplates

One-click copy of ready-to-use templates: a Docker Compose multi-service stack, a Kubernetes Pod spec with ConfigMap/Secret references, and a GitHub Actions Node.js CI workflow.

### 🔍 Syntax Validator

Paste JSON or YAML and get live validation feedback, including line numbers on YAML parse errors (powered by `js-yaml`).

### 📱 Progressive Web App

Installable from the browser address bar. A service worker caches visited pages for offline access.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS v4
- **Language**: TypeScript (strict mode)
- **Validation**: `js-yaml` for YAML/JSON parsing
- **Fonts**: Inter, JetBrains Mono, Outfit (via `next/font/google`)
- **Linting**: ESLint 9 flat config (Next.js core-web-vitals + TypeScript + React Hooks rules)

---

## Project Structure

```bash
src/
├── app/                        # Next.js App Router routes
│   ├── page.tsx                  # Home (portal / builder / templates / validator)
│   ├── layout.tsx                 # Root layout, fonts, service worker registration
│   ├── manifest.ts                # PWA manifest (Next.js metadata route)
│   └── <tool>/page.tsx             # One route per cheatsheet (docker, kubernetes, ...)
├── components/
│   ├── cheatsheet/                # Shared cheatsheet page template (NavHeader, Card, blocks)
│   └── home/                      # Homepage panels (Portal, Builder, Templates, Validator)
└── data/
    ├── cheatsheets/*.ts            # Structured command data per tool
    ├── tools.ts                    # Tool metadata used by the portal grid + nav dropdown
    ├── templates.ts                # Config boilerplate catalog
    ├── searchIndex.ts               # Flattened search index built from all cheatsheet data
    └── types.ts                     # Shared TypeScript types
public/
├── sw.js                         # Service worker (offline app-shell caching)
└── icon.svg
```

Adding a new command to an existing tool means editing its file in `src/data/cheatsheets/`; adding a new tool means creating a new data file, a route under `src/app/`, and an entry in `src/data/tools.ts`.

---

## Local Development

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build       # production build
npm run start        # serve the production build
npm run lint          # ESLint
```

---

## Deployment

Standard Next.js app — deploy to **Vercel** by importing the repository at [vercel.com/new](https://vercel.com/new). No environment variables required.

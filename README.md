# 🛠️ DevOps & SysAdmin Command Cheatsheets

A premium, highly legible, and beautifully designed collection of comprehensive command references for modern DevOps, Cloud, and Systems Engineering tools.

Each cheatsheet is formatted as an independent, single-file HTML application utilizing modern, reader-friendly typography with **JetBrains Mono** (for command precision) and **Inter** (for UI elements).

---

## 🎨 Design Philosophy & Features

*   **Soft Typography**: Built with Google Fonts **JetBrains Mono** for commands and code snippets, paired with **Inter** for description text to eliminate eye strain.
*   **Modern Palette**: Styled with a dark-mode GitHub aesthetics theme:
    *   **Background**: Deep slate-navy (`#0d1117`) and card layouts (`#161b22`).
    *   **Commands**: Soft high-contrast blue (`#a5d6ff`).
    *   **Descriptions**: Low-strain muted gray (`#7d8590`).
    *   **Headers & Highlights**: Crisp active blue (`#58a6ff`).
*   **3-Column Grid**: Responsive, dense layouts optimized for widescreen monitors, letting you view hundreds of commands at a single glance.
*   **Copy-Paste Friendly**: All commands are fully ready to copy straight to your terminal without weird formatting issues.
*   **Deep Scope**: Ranges from basic daily commands to complex, expert-level debugging, troubleshooting, and configuration snippets.

---

## 📂 Cheatsheet Catalog

| Tool | Filename | Key Sections Covered |
| :--- | :--- | :--- |
| **🚀 Homepage** | [`index.html`](./index.html) | **Main hub dashboard portal** featuring interactive filters, popular copy-paste boxes, and live cross-tool global search. |
| 🐳 **Docker** | [`docker.html`](./docker.html) | Image building/tagging, resources limits (`--cpus`, `-m`), network namespacing, volume mounts, Swarm mode, and log rotation tricks. |
| ☸️ **Kubernetes** | [`kubernetes.html`](./kubernetes.html) | Config context management, namespaces, pod logs/copy/debug, stateful scaling, secrets management, JSONPath variables, and Helm. |
| 🏗️ **Terraform** | [`terraform.html`](./terraform.html) | Workspaces, state manipulation (`state mv`, `import`), custom backends (S3, GCS, Azure), debugging levels, and full HCL expressions. |
| 🔀 **Git** | [`git.html`](./git.html) | Setup, interactive rebase, stashing, submodules, multi-worktree execution, reflog debugging, and object inspection internals. |
| ⚡ **GitHub Actions** | [`github-actions.html`](./github-actions.html) | Workflow dispatch/schedule triggers, job matrices, custom contexts, caching strategies, OIDC cloud logins, and composite actions. |
| 🔧 **Jenkins** | [`jenkins.html`](./jenkins.html) | CLI actions, REST API crumb tokens, scripted/declarative pipelines, Docker integrations, credentials configuration, and Groovy templates. |
| 🐧 **Linux** | [`linux.html`](./linux.html) | Storage analysis, perm layers, advanced `grep`/`awk`/`sed` utilities, custom systemd control, network analysis (`tcpdump`), and Bash standards. |
| 🔥 **Prometheus & Grafana** | [`prometheus-grafana.html`](./prometheus-grafana.html) | TSDB maintenance, custom scrape configs, PromQL rate/histogram equations, Alertmanager routes, Loki LogQL, and Tempo traces. |

---

## 💻 Quick Start

Simply open any of the `.html` files directly in your web browser of choice (Chrome, Edge, Firefox, Safari):

```bash
# On Linux/macOS
open docker.html

# On Windows (PowerShell)
Start-Process "docker.html"
```

*Tip: Bookmark the files in your browser's favorites bar for instant access during debugging sessions!*

# ⚡ DevOps Commands Hub & Workbench

A premium, highly interactive, and beautifully designed developer workspace and collection of comprehensive command references for modern DevOps, Cloud, and Systems Engineering tools.

This project is built as a **Progressive Web App (PWA)**, making it installable on your desktop or mobile device and capable of running **100% offline**—perfect for secure, air-gapped data centers or environments with restricted internet access.

---

## 🚀 Key Features

*   **🗂️ Cheatsheet Portal**: Clean, searchable grids containing 8 comprehensive cheatsheets (Docker, Kubernetes, Terraform, Git, GitHub Actions, Jenkins, Linux, Prometheus & Grafana). Built with soft readability typography using **JetBrains Mono** and **Inter**.
*   **⚙️ Interactive CLI Builder & Terminal Sandbox**: Visually toggle parameters and input values (images, port mappings, names) to construct commands dynamically. Run them in the built-in **Virtual Mock Terminal** to see a simulated process execution.
*   **📄 Config Boilerplates**: Copy pre-validated templates for Docker Compose, Kubernetes Pods, or GitHub Actions CI workflows in one click.
*   **🔍 Syntax Validator (DevOps Lint)**: A live editor that parses pasted **JSON** and **YAML** code, auto-detects structure, reports validation errors, and warns you if you use tab characters (which YAML prohibits).
*   **📱 Progressive Web App (PWA)**: Works offline and is fully installable on Chrome, Edge, Safari, and Firefox.
*   **🔗 Quick Switch Navigation**: Every single cheatsheet page includes a glassy sticky header dropdown to instantly teleport between different tools without needing to hit the browser's back button.

---

## 📂 Project Structure

```bash
├── index.html          # Main portal, CLI builder, templates, and YAML validator
├── sw.js               # Service Worker caching assets for offline PWA usage
├── manifest.json       # Web App Manifest describing installation configurations
├── README.md           # This documentation guide
├── docker.html         # 🐳 Docker cheatsheet
├── kubernetes.html     # ☸️ Kubernetes cheatsheet
├── terraform.html      # 🏗️ Terraform cheatsheet
├── git.html            # 🔀 Git cheatsheet
├── github-actions.html # ⚡ GitHub Actions cheatsheet
├── jenkins.html        # 🔧 Jenkins cheatsheet
├── linux.html          # 🐧 Linux cheatsheet
└── prometheus-grafana.html # 🔥 Prometheus & Grafana cheatsheet
```

---

## 💻 Local Quick Start

Simply double-click **`index.html`** or run it from your terminal:

```bash
# On Linux/macOS
open index.html

# On Windows (PowerShell)
Start-Process "index.html"
```

*Tip: Click the "Install" icon in your browser's address bar (supported in Chrome/Edge) to run it as a standalone desktop app!*

---

## 🌐 How to Deploy to GitHub Pages (100% Free)

Since this is a client-side frontend-only application, you can deploy it to **GitHub Pages** in under 3 minutes for free:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click **New** (or "+" in the top-right corner) to create a new repository.
3. Name your repository (e.g., `devops-cheatsheet`).
4. Set it to **Public** (required for free GitHub Pages hosting).
5. Leave "Add a README" unchecked, and click **Create repository**.

### Step 2: Push your Code to GitHub
Open your terminal/PowerShell inside your cheatsheet directory (`c:\Users\inam_\Desktop\Commands Cheatsheet`) and run:

```bash
# Initialize a local git repository
git init -b main

# Stage all files (HTMLs, sw.js, manifest, README)
git add .

# Create the initial commit
git commit -m "feat: launch DevOps Workbench & Commands Hub"

# Link your local repo to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/devops-cheatsheet.git

# Push your files to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository page on GitHub.
2. Click the **Settings** tab (the gear icon on the top nav bar).
3. On the left sidebar under "Code and automation", click **Pages**.
4. Under "Build and deployment" -> **Source**, select **Deploy from a branch**.
5. Under **Branch**, change `None` to **`main`** (or `master`), select `/(root)`, and click **Save**.

### Step 4: Access your Live Website!
GitHub will trigger a background workflow deployment (takes ~30 seconds). 
1. Refresh the **Pages** settings screen.
2. At the top of the section, you will see a banner: **"Your site is live at..."**
3. Click the link (usually `https://YOUR_USERNAME.github.io/devops-cheatsheet/`) to launch your public DevOps Commands Hub!

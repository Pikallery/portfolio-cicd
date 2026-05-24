# Portfolio Website — CI/CD with GitHub Actions

<!-- Replace Pikallery and portfolio-cicd with your actual GitHub username and repo name -->
![CI Pipeline](https://github.com/Pikallery/portfolio-cicd/actions/workflows/ci.yml/badge.svg)
![CD Pipeline](https://github.com/Pikallery/portfolio-cicd/actions/workflows/cd.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A portfolio website with a complete **CI/CD pipeline** powered by GitHub Actions. Every push to `main` automatically triggers linting, testing, building, and deployment to GitHub Pages.

---

## Live Demo

> **URL:** `https://Pikallery.github.io/portfolio-cicd/`  
> *(Replace with your actual GitHub Pages URL after the first deploy)*

---

## Project Overview

This project was built as part of a **1-month DevOps internship** focused on CI/CD automation.

| Aspect | Detail |
|---|---|
| Domain | DevOps / Cloud Computing |
| CI Platform | GitHub Actions |
| Deployment | GitHub Pages |
| Language | HTML, CSS, JavaScript |
| Testing | Jest |
| Linting | ESLint + Prettier |

---

## Repository Structure

```
portfolio-cicd/
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI: lint → test → build
│       └── cd.yml          # CD: build → deploy to GitHub Pages
├── src/
│   ├── index.html          # Portfolio HTML
│   ├── style.css           # Styles with dark mode
│   └── script.js           # JavaScript (testable functions exported)
├── tests/
│   └── app.test.js         # Jest unit tests
├── scripts/
│   └── build.js            # Node.js build script (src/ → dist/)
├── dist/                   # Generated at build time (git-ignored)
├── .eslintrc.json          # ESLint config
├── .prettierrc             # Prettier config
├── .gitignore
└── package.json
```

---

## CI/CD Workflow

### How it works

```
Developer pushes code
        │
        ▼
┌─────────────────────────────────────────┐
│             CI Pipeline                 │
│  1. Checkout code                       │
│  2. Setup Node.js (18.x and 20.x)      │
│  3. Install dependencies (npm ci)       │
│  4. ESLint — lint check                 │
│  5. Prettier — format check             │
│  6. Jest — unit tests + coverage        │
│  7. Build — src/ → dist/               │
│  8. Upload dist/ as artifact            │
└──────────────┬──────────────────────────┘
               │ (only if push to main)
               ▼
┌─────────────────────────────────────────┐
│             CD Pipeline                 │
│  1. Checkout code                       │
│  2. Install dependencies                │
│  3. Run tests (safety gate)             │
│  4. Build project                       │
│  5. Upload Pages artifact               │
│  6. Deploy → GitHub Pages               │
└─────────────────────────────────────────┘
               │
               ▼
     Live at GitHub Pages URL
```

### Workflow files

| File | Trigger | Purpose |
|---|---|---|
| `.github/workflows/ci.yml` | Push to `main`/`develop`, any PR | Lint, test, build |
| `.github/workflows/cd.yml` | Push to `main`, manual dispatch | Deploy to GitHub Pages |

---

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) v18 or higher
- A GitHub account

### 1. Clone the repository

```bash
git clone https://github.com/Pikallery/portfolio-cicd.git
cd portfolio-cicd
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
# Open src/index.html directly in a browser, or:
npm run build    # generates dist/
npm start        # serves dist/ at http://localhost:3000
```

### 4. Run checks locally (same as CI)

```bash
npm run lint          # ESLint check
npm run format:check  # Prettier format check
npm test              # Jest unit tests + coverage report
npm run build         # Build dist/
```

---

## Setting Up GitHub Pages (One-Time)

1. Push this project to a GitHub repository
2. Go to **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Push any commit to `main` — the CD pipeline deploys automatically

---

## Available npm Scripts

| Script | Description |
|---|---|
| `npm test` | Run Jest unit tests with coverage |
| `npm run lint` | Run ESLint on `src/**/*.js` |
| `npm run format:check` | Check formatting with Prettier |
| `npm run format` | Auto-fix formatting with Prettier |
| `npm run build` | Copy `src/` to `dist/` |
| `npm start` | Serve `dist/` at port 3000 |

---

## GitHub Secrets

This project uses **no external secrets** because GitHub Pages deployment is handled natively by GitHub Actions. If you extend this project with Netlify, Vercel, or another platform, add their tokens under:

**Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Purpose |
|---|---|
| *(none required for GitHub Pages)* | — |

---

## Evaluation Checklist

- [x] GitHub repository with meaningful commit history
- [x] CI pipeline triggers on push and pull request
- [x] Automated lint check (ESLint)
- [x] Automated format check (Prettier)
- [x] Automated unit tests (Jest) with coverage
- [x] Automated build step
- [x] CD pipeline deploys to GitHub Pages on push to main
- [x] Workflow artifacts uploaded
- [x] GitHub Secrets used (no hardcoded credentials)
- [x] README with badges, workflow diagram, and setup guide

---

## Technologies Used

- **GitHub Actions** — CI/CD automation
- **Jest** — JavaScript unit testing
- **ESLint** — JavaScript linting
- **Prettier** — Code formatting
- **Node.js** — Build scripting
- **GitHub Pages** — Static site hosting
- **HTML / CSS / JavaScript** — Portfolio frontend

---

## Author

**Sai Pradyumna Samal**  
DevOps Intern | samalsaipradyumna@gmail.com

---

*This project is part of the CI/CD Pipeline Automation internship.*

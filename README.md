# My Website

A personal digital home built with **Astro** and **Tailwind CSS** — blog, project showcase, and specialty content sections (programming, machine learning, game guides, chess, sketchbook, animation, and teaching).

**Live site:** [https://howtomithun.netlify.app/](https://howtomithun.netlify.app/)

---

## Tech Stack

- [Astro](https://astro.build/) v6 — static site generation, content collections
- [Tailwind CSS](https://tailwindcss.com/) v4 — CSS-native configuration via `@theme`
- Markdown content collections (Zod-validated schema)
- [Pagefind](https://pagefind.app/) — static full-text search
- Deployed on [Netlify](https://www.netlify.com/), built from GitHub via CI

---

## Running Locally

### Prerequisites

- **Node.js** — v18.20.8+ or v20.3.0+
- **npm** (comes with Node)
- **Git**

Check what you have installed:

```bash
node -v
git --version
```

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/myname-website.git
   cd myname-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

The dev server supports hot reload — changes to `.astro`, `.md`, and `.css` files update automatically without a manual refresh.

> **Note:** Search (`/search`) will **not** work in dev mode. Pagefind generates its index from the production build output, so search only functions after running `npm run build` (see below).

---

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local dev server at `localhost:4321` |
| `npm run build` | Builds the site for production into `dist/`, then runs Pagefind to generate the search index |
| `npm run preview` | Serves the built `dist/` folder locally, so you can test the production build (including search) before deploying |

### Testing the full production build locally

```bash
npm run build
npm run preview
```

This is the closest local equivalent to what Netlify actually serves — use it to verify RSS (`/rss.xml`), the sitemap (`/sitemap-index.xml`), and search (`/search`) all work before pushing.

---

## Project Structure

```
src/
├── components/     → Reusable UI pieces (Header, Footer, ThemeToggle, etc.)
├── layouts/        → Shared page shells (BaseLayout)
├── pages/          → Routes — each file/folder here maps to a URL
├── content/        → Markdown content (blog posts)
├── content.config.ts → Content collection schemas (Zod)
├── styles/         → global.css — Tailwind entry point + theme tokens
└── utils/          → Helper functions (reading time, related posts, theme)
```

---

## Writing a Blog Post

Add a new Markdown file to `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A short summary shown in the blog list and RSS feed."
pubDate: 2026-08-05
tags: ["tag1", "tag2"]
category: "Personal"
draft: false
---

Your post content goes here, in Markdown.
```

Set `draft: true` to keep a post out of the published list/RSS/sitemap until you're ready.

---

## Deployment

The live site auto-deploys from the `main` branch via Netlify's GitHub integration — every `git push` to `main` triggers a new build and deploy automatically.

### Deploying your own copy from scratch

1. Push your project to a GitHub repository (see `.gitignore` below first).
2. Go to [app.netlify.com](https://app.netlify.com/) → **Add new site → Import an existing project**.
3. Connect your GitHub account and select the repository.
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Deploy. Netlify will give you a `*.netlify.app` URL immediately.
6. Update the `site` field in `astro.config.mjs` to match your real deployed URL (needed for correct RSS/sitemap/Open Graph output), then commit and push — Netlify will redeploy automatically.

### `.gitignore`

Make sure these are excluded before your first commit — they're regenerated automatically and shouldn't be tracked:

```
dist/
node_modules/
.env
.env.production
```

---

## License

Personal project — content and code are not licensed for reuse unless otherwise noted.
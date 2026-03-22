# open2nix site

Static blog built with [Astro](https://astro.build), deployed to GitHub Pages at
[open2nix.github.io/open2nix-site](https://open2nix.github.io/open2nix-site).

Extends the WordPress blog at [open2nix.wordpress.com](https://open2nix.wordpress.com) with
deeper technical posts on Nix, Linux, homelabs, and open source tooling.

## Quick start

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:4321
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Writing a new post

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: 'My Post Title'
description: 'A short description for SEO and previews.'
pubDate: '2026-03-29'
tags: ['nix', 'linux']
---

Post content here...
```

The file name becomes the URL slug: `my-post-title.md` → `/blog/my-post-title/`.

## Deployment

Pushes to `main` automatically deploy via GitHub Actions (`.github/workflows/deploy.yml`).

**One-time GitHub Pages setup:**
1. Go to repo **Settings → Pages**
2. Set Source to **GitHub Actions**
3. Push to `main` to trigger the first deploy

## Project structure

```
open2nix-site/
├── public/              # Static assets (favicon, images)
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/
│   │   └── blog/        # Blog posts (.md / .mdx)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Routes (index, about, blog/*)
│   └── styles/          # Global CSS
├── astro.config.mjs     # Astro config (site URL, integrations)
└── .github/workflows/   # GitHub Actions deploy workflow
```

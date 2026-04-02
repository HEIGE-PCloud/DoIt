# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DoIt is a Hugo theme — a template package for the Hugo static site generator. It is not a standalone web app. The `exampleSite/` directory contains a demo Hugo site that uses the theme.

## Commands

```bash
# Development (Hugo server + Tailwind CSS watch, concurrent)
npm run dev

# Production build
npm run build

# Build with draft content
npm run build:preview

# Hugo dev server only (no Tailwind)
npm run server

# Tailwind CSS only (watch mode)
npm run server:tailwind

# Format code
npm run format

# W3C HTML validation (requires Docker)
npm run validate

# Visual regression tests (requires Hugo running)
npx playwright test
```

Hugo requires the **extended** version 0.146.0 or higher. Nix users: `flake.nix` provides the full environment automatically via direnv.

## Architecture

### Directory Layout

- `layouts/` — Hugo HTML templates (the core of the theme)
  - `_partials/` — reusable partials included by other templates
  - `_shortcodes/` — 25+ custom Hugo shortcodes for rich content
  - `_markup/` — render hooks for Markdown elements (links, images, headings, code blocks)
  - `baseof.html`, `home.html`, `page.html`, `section.html`, `taxonomy.html` — top-level page templates
- `assets/` — processed by Hugo pipes
  - `css/` — Tailwind CSS entry point and custom styles
  - `js/` — theme JavaScript
  - `lib/` — vendored third-party libraries (KaTeX, mermaid, ECharts, FontAwesome, etc.)
- `i18n/` — translation strings for 27 languages (TOML files)
- `archetypes/` — content templates for `hugo new` commands
- `static/` — files copied as-is to the output (no processing)
- `exampleSite/` — demo Hugo site; use this to test theme changes

### How It Fits Together

Hugo processes `layouts/` templates, which pull in partials from `_partials/`. CSS is compiled by Tailwind CLI (configured via `package.json` scripts). JavaScript and vendor libs in `assets/` are bundled by Hugo pipes at build time. The `exampleSite/` references the theme via a relative path and is used for the GitHub Pages demo and Playwright visual tests.

### Tailwind CSS

The theme uses Tailwind CSS v4. All classes use the `tw:` prefix (e.g., `tw:flex`, `tw:text-lg`). The Tailwind config/entry point lives in `assets/css/`.

### Testing

Playwright visual regression tests live in `tests/visual.spec.ts`. They spin up a Hugo server at `http://127.0.0.1:1313` and take screenshots across Chromium, Firefox, WebKit, and mobile viewports. Snapshots are stored in `tests/visual.spec.ts-snapshots/`. Note: tests are currently disabled in CI (`if: false` in `.github/workflows/playwright.yml`).

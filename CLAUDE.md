# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A [Mintlify](https://mintlify.com) documentation site for Quicko's developer products. There is no build step you run locally — the Mintlify GitHub app auto-deploys to production on push to the default branch (`main`).

## Common commands

```bash
npm i -g mint   # one-time CLI install
mint dev        # live preview at http://localhost:3000 (run from repo root, where docs.json lives)
mint update     # upgrade CLI if dev breaks after a Mintlify change
mint broken-links  # validate internal links across all .mdx pages
```

There are no tests, linters, or package scripts — this is content, not code.

## Architecture

### `docs.json` is the source of truth for site structure

Every page must be registered in `docs.json`'s `navigation.products[*]` tree by its path (relative to repo root, no `.mdx` extension). Creating an `.mdx` file alone does not surface it in the site — Mintlify will not auto-discover pages. When you add or move a page, you must edit `docs.json` accordingly.

`docs.json` also controls: theme (`palm`), brand colors, logo/favicon paths, navbar links, footer, the icon library (`lucide`), GTM tag, and the contextual "copy/view in Claude/ChatGPT/etc." menu.

### Three products, parallel structure

Content lives under `projects/`, one directory per product surfaced in the top-level navigation:

- `projects/connect/` — Quicko Connect (SDK + APIs for embedded tax workflows). Has both `guides/` and `api-reference/` tabs.
- `projects/integration/` — APIs for partner integrations (broker/HRMS/bank). Single-tab structure.
- `projects/tools/` — Embeddable tax tools (calculators, etc.).

Each product organizes pages into nested groups in `docs.json`. The on-disk folder hierarchy generally mirrors the navigation hierarchy, but the navigation tree in `docs.json` is what actually defines order, grouping, and visibility — keep them aligned but treat `docs.json` as authoritative.

### API reference pages are OpenAPI-driven

Pages under `projects/connect/api-reference/` are thin `.mdx` shells whose frontmatter points at an operation in the spec:

```yaml
---
title: "Authenticate"
openapi: /projects/connect/openapi.json POST /authenticate
---
```

To document a new endpoint: add it to `projects/connect/openapi.json`, then create the wrapper `.mdx` and register it in `docs.json`. Editing only the `.mdx` will not change the rendered request/response schemas — those come from the spec.

### Custom components via `snippets/`

`snippets/HeroCard.jsx` and `snippets/Iframe.jsx` are imported directly into `.mdx` files (e.g. `import { HeroCard } from "/snippets/HeroCard.jsx"`). Mintlify's built-in components (`<Card>`, `<Steps>`, `<AccordionGroup>`, `<Columns>`, `<Tabs>`, etc.) are available without imports.

### Styling

- `style.css` (root) and `styles/global.css` are loaded by Mintlify and apply CSS overrides on top of the Palm theme — use them sparingly for things the theme cannot express (e.g., sidebar overflow, content max-width).
- Tailwind utility classes work inline in `.mdx` (see `index.mdx` for examples). Dark-mode variants use `dark:` prefix.

### Static assets

- `static/` — global brand assets (logos, favicon, landing illustrations), referenced absolutely (e.g. `/static/logo/light.svg`).
- `projects/<product>/assets/` — product-scoped images used by that product's pages.

Provide both `light` and `dark` variants for any branded image; pages typically swap them with `block dark:hidden` / `hidden dark:block` Tailwind classes.

## When editing, watch for

- Path casing matters in `docs.json` — page references are case-sensitive and must omit the `.mdx` extension.
- The `index.mdx` at the repo root uses `mode: "custom"` (full-bleed landing page); regular content pages should not.
- After renaming or moving a page, grep for the old path across `.mdx` files and `docs.json` — internal links are plain strings, not validated at edit time. Run `mint broken-links` before pushing.

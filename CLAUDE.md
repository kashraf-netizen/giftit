# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Giftit — a landing-page-stage web app for organizing group gifts (collecting contributions, picking a gift, signing a card). Currently a single marketing page; product features are not yet implemented.

## Commands

- `npm run dev` — start Next.js dev server at http://localhost:3000
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — ESLint via flat config (`eslint.config.mjs`)

No test framework is configured yet.

## Stack & Conventions

- **Next.js 16** with the **App Router** (`src/app/`). Pages live as `page.js` files; the root layout is `src/app/layout.js`.
- **React 19**, **JavaScript** (no TypeScript). `jsconfig.json` maps `@/*` → `./src/*`.
- **Tailwind CSS v4** via `@tailwindcss/postcss`. Styles are imported with `@import "tailwindcss";` in `src/app/globals.css` — there is no `tailwind.config.js`; theme tokens are declared inline with `@theme inline { ... }` in the CSS file.
- Fonts: `Geist` and `Geist_Mono` loaded via `next/font/google` in `layout.js` and exposed as `--font-geist-sans` / `--font-geist-mono` CSS variables.
- ESLint extends `eslint-config-next/core-web-vitals` (flat config).

When adding new routes, follow App Router conventions (folder-per-route with `page.js`, optional `layout.js`, `loading.js`, etc.). The `metadata` export in `layout.js` is still the create-next-app default and should be updated when the product page replaces the landing page.

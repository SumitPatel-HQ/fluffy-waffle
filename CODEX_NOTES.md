# Codex Working Notes

This file is an internal implementation guide for future coding passes in this repo.

## Project Snapshot

- Stack: React + Vite + Tailwind + Radix UI (frontend), Express (backend), TypeScript (strict), Drizzle + Zod shared schema.
- App purpose: manga-style hackathon handbook page with print and PDF export support.
- Package manager: `npm`.
- Module system: ESM in source, bundled CJS output for production server.

## Useful Commands

- `npm run dev`: starts server + Vite middleware flow.
- `npm run check`: TypeScript check (`tsc --noEmit`).
- `npm run build`: builds client and bundles server to `dist/index.cjs`.
- `npm run start`: runs production build.
- `npm run db:push`: pushes schema using Drizzle.

## Runtime/Data Flow

1. Server boots from `server/index.ts`, registers API routes, then attaches Vite (dev) or static serving (prod).
2. Frontend SPA is routed in `client/src/App.tsx` and currently renders `Handbook` at `/`.
3. `client/src/pages/Handbook.tsx` owns handbook content and UI state.
4. PDF export button calls `GET /api/handbook/export`.
5. Server route (`server/routes.ts`) launches Puppeteer, opens `/?print=1&export=1[&domain=...]`, waits for `window.__HANDBOOK_READY`, then emits PDF.

## Key Files

- Frontend shell: `client/src/App.tsx`
- Main page: `client/src/pages/Handbook.tsx`
- Manga UI primitives: `client/src/components/MangaComponents.tsx`
- Styling/theme/print rules: `client/src/index.css`, `tailwind.config.ts`
- API route contracts: `shared/routes.ts`
- Schema/types: `shared/schema.ts`
- API handlers: `server/routes.ts`
- Storage layer: `server/storage.ts` (currently in-memory)
- Entry/runtime setup: `server/index.ts`, `server/vite.ts`, `server/static.ts`
- Build pipeline: `script/build.ts`, `vite.config.ts`

## Current Implementation Notes

- `shared/schema.ts` defines a `rules` table, but runtime storage uses `MemStorage` only.
- `/api/rules` exists but handbook content is hardcoded client-side, not fetched from API.
- PDF export requires `puppeteer` installed at runtime; route returns a clear error if missing.
- Query param `domain` is sanitized server-side and used to filter domain rules in handbook view.
- Print readiness depends on `window.__HANDBOOK_READY` set after TOC page-number calculations.

## Risks / Follow-ups

- Data inconsistency risk: duplicated rule content (hardcoded UI vs API/schema path).
- Production risk: PDF export fails without `puppeteer` dependency/environment support.
- `script/build.ts` allowlist includes many packages not currently used; keep trimmed to reduce drift.
- If moving from in-memory to Postgres, wire Drizzle in `server/storage.ts` and align handbook data source.

## Editing Conventions To Keep

- Use aliases: `@/`, `@shared/`, `@assets/`.
- Keep strict TS compatibility (`npm run check` clean).
- Preserve manga visual language and print CSS behavior when changing layout.
- For API changes: update both `shared/routes.ts` and server handlers.


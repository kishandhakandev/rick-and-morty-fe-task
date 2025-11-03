# Rick & Morty Explorer (FE Task)

Simple SPA in React + TypeScript. Browse characters, view details and episodes, and open an episode detail page. Built for desktop layout.

## Tech

- React + TypeScript (Vite)
- React Router
- TanStack Query (React Query)
- Tailwind CSS

## Getting started

1. Install and run

```bash
npm install
npm run dev
```

2. Optional: configure env (defaults are fine)

Create `.env.local` if you need overrides:

```
# Overrides API base if needed
VITE_API_BASE=https://rickandmortyapi.com/api
```

## Features

- Characters list with search (debounced) and robust pagination
  - Pagination shows First/Prev/neighbor pages/Next/Last with ellipses
  - Prev disabled on first page; Next disabled on last page
- SPA detail panel
  - Clicking a character shows details in the right pane; page auto-scrolls to top
  - Episodes are fetched in a single batched request
- Episode Detail page (`/episode/:id`) with back button
- Loading UX
  - Skeletons for list and detail; global Error Boundary for uncaught errors
- Performance & DX
  - Code-splitting for routes, memoized components/handlers, React Query caching
- Accessibility
  - Proper ARIA for pagination and search

## Project structure

- `src/api/` REST helpers and config (`API_BASE`)
- `src/components/` UI pieces (cards, detail, pagination, skeletons, error boundary)
- `src/pages/` route screens
- `src/types/` API response types

## Scripts

```bash
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview built app
```

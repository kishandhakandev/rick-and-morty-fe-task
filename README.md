# Rick & Morty Explorer (FE Task)

A simple SPA built with React + TypeScript. It searches characters from the Rick & Morty API and shows a detail view with the list of episodes.

## Tech

- React + TypeScript (Vite)
- React Router
- React Query (data fetching & caching)
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Features

- Characters list with search and pagination
- Character detail view with image, basic info, and episodes list
- Loading and error states for all requests
- Desktop-focused layout

## Assumptions

- API rate limits are acceptable for client usage
- Episodes are fetched in a single batched request using episode IDs from the character payload

## Improvements (if more time)

- Episode detail route and deep linking
- Infinite scrolling for the list
- Better empty-state illustrations and toasts
- Add unit tests for API helpers and components

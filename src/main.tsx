import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
const CharactersPage = lazy(() => import('./pages/CharactersPage'));
const EpisodeDetailPage = lazy(() => import('./pages/EpisodeDetailPage'));
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <CharactersPage /> },
      { path: 'character/:id', element: <CharactersPage /> },
      { path: 'episode/:id', element: <EpisodeDetailPage /> },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div className="container-desktop">Loading…</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

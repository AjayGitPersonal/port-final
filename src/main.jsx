// src/main.jsx
import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import * as Sentry from "@sentry/react";
import ErrorBoundary from "./components/ErrorBoundary";
import useAuthStore from "./store/authStore";
import App, { Loader } from "./App";   // reuse shared Loader — no duplication
import "./styles/tokens.css";
import "./index.css";

// ── Sentry (optional — set VITE_SENTRY_DSN in .env) ──────────────────
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.2,
  });
}

// ── TanStack Query client ─────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,   // 5 min — avoid refetching on every mount
      refetchOnWindowFocus: false,
    },
  },
});

// ── Root component — initialises Firebase auth listener ──────────────
function Root() {
  const init = useAuthStore((s) => s.init);
  useEffect(() => { const unsub = init(); return unsub; }, [init]);
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <Root />
            </Suspense>
          </BrowserRouter>
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

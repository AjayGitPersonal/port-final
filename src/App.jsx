// src/App.jsx
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";

// Lazy-loaded pages
const Portfolio     = lazy(() => import("./pages/Portfolio"));
const AdminLogin    = lazy(() => import("./pages/AdminLogin"));
const Dashboard     = lazy(() => import("./pages/Dashboard"));
const BlogList      = lazy(() => import("./pages/blog/BlogList"));
const BlogPost      = lazy(() => import("./pages/blog/BlogPost"));
const Privacy       = lazy(() => import("./pages/Privacy"));
const Terms         = lazy(() => import("./pages/Terms"));
const ContactPage   = lazy(() => import("./pages/ContactPage"));

export const Loader = () => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "center",
    minHeight: "100vh", fontFamily: "var(--font-body)",
    color: "var(--gray400)", fontSize: 14,
  }}>
    Loading…
  </div>
);

function PrivateRoute({ children }) {
  const { user, loading } = useAuthStore();
  if (loading) return <Loader />;
  // If no user at all → go to login
  if (!user) return <Navigate to="/admin" replace />;
  // If logged in → allow through (Firebase already verified the credentials)
  return children;
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/"           element={<Portfolio />} />
        <Route path="/blog"       element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin"      element={<AdminLogin />} />
        <Route path="/dashboard"  element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/privacy"    element={<Privacy />} />
        <Route path="/terms"      element={<Terms />} />
        <Route path="/contact"    element={<ContactPage />} />
        <Route path="*"           element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

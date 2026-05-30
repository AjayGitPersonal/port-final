// src/components/ErrorBoundary.jsx
import { Component } from "react";
import { reportError } from "../utils/errorHandler";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    reportError(error, { componentStack: info.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", minHeight: "100vh", gap: 16,
          fontFamily: "var(--font-body)", padding: 24, textAlign: "center",
        }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--navy)" }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: 14, color: "var(--gray500)", maxWidth: 400 }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "var(--navy)", color: "#fff", border: "none",
              padding: "10px 24px", borderRadius: "var(--radius-sm)",
              fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// src/components/SectionErrorBoundary.jsx
// Lightweight per-section boundary — prevents one broken section from killing the whole page
import { Component } from "react";

export default class SectionErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(`[SectionError] ${this.props.name}:`, error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          style={{
            padding: "48px 5%",
            textAlign: "center",
            color: "var(--gray400)",
            fontFamily: "var(--font-body)",
            fontSize: 14,
          }}
          aria-live="polite"
        >
          <p>This section couldn&apos;t load. The rest of the page is fine.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginTop: 12,
              background: "none",
              border: "1px solid var(--gray300)",
              borderRadius: "var(--radius-sm)",
              padding: "6px 16px",
              cursor: "pointer",
              fontSize: 13,
              color: "var(--gray500)",
            }}
          >
            Retry
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}

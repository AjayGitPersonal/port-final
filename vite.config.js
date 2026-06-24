import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  // ── Path alias — use @/ instead of long relative paths ─────────────
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ── Build optimisation — split heavy vendors into separate chunks ───
  build: {
    rollupOptions: {
      output: {
       manualChunks(id) {
  if (id.includes("node_modules")) {
    if (id.includes("firebase"))          return "vendor-firebase";
    if (id.includes("framer-motion"))     return "vendor-motion";
    if (id.includes("@tanstack"))         return "vendor-query";
    if (id.includes("@tiptap"))           return "vendor-editor";
    if (id.includes("react-dom") || id.includes("react-router")) return "vendor-react";
    if (id.includes("lucide-react") || id.includes("react-hot-toast")) return "vendor-ui";
  }
},
      },
    },
    // Warn when a chunk exceeds 500 KB
    chunkSizeWarningLimit: 500,
  },

  // ── Test configuration ──────────────────────────────────────────────
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    css: true,
  },
});

// tests/utils.test.js
import { describe, it, expect } from "vitest";
import { validateImageFile } from "../src/utils/fileValidation";
import { parseError } from "../src/utils/errorHandler";

// ── fileValidation ──────────────────────────────────────────
describe("validateImageFile", () => {
  const makeFile = (name, type, size) =>
    new File(["x".repeat(size)], name, { type });

  it("accepts valid JPG under 5MB", () => {
    const f = makeFile("photo.jpg", "image/jpeg", 1024);
    expect(validateImageFile(f).valid).toBe(true);
  });

  it("accepts valid PNG", () => {
    const f = makeFile("photo.png", "image/png", 1024);
    expect(validateImageFile(f).valid).toBe(true);
  });

  it("accepts valid WEBP", () => {
    const f = makeFile("photo.webp", "image/webp", 1024);
    expect(validateImageFile(f).valid).toBe(true);
  });

  it("rejects SVG files", () => {
    const f = makeFile("icon.svg", "image/svg+xml", 100);
    const r = validateImageFile(f);
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/SVG/);
  });

  it("rejects files over 5MB", () => {
    const f = makeFile("big.jpg", "image/jpeg", 6 * 1024 * 1024);
    const r = validateImageFile(f);
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/large/i);
  });

  it("rejects null input", () => {
    expect(validateImageFile(null).valid).toBe(false);
  });

  it("rejects PDF", () => {
    const f = makeFile("doc.pdf", "application/pdf", 100);
    expect(validateImageFile(f).valid).toBe(false);
  });
});

// ── errorHandler ────────────────────────────────────────────
describe("parseError", () => {
  it("returns user-friendly message for wrong password", () => {
    const err = { code: "auth/wrong-password" };
    expect(parseError(err)).toBe("Incorrect password.");
  });

  it("returns user-friendly message for permission denied", () => {
    const err = { code: "permission-denied" };
    expect(parseError(err)).toMatch(/Permission denied/i);
  });


  it("handles null gracefully", () => {
    expect(parseError(null)).toBe("An unknown error occurred.");
  });
});

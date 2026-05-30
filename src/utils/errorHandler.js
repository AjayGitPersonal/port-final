// src/utils/errorHandler.js
import * as Sentry from "@sentry/react";

/**
 * Map Firebase / Cloudinary / generic errors to user-friendly messages.
 */
export function parseError(err) {
  if (!err) return "An unknown error occurred.";

  // Firebase Auth
  const authMessages = {
    "auth/invalid-credential":     "Invalid email or password.",
    "auth/user-not-found":         "No account found with this email.",
    "auth/wrong-password":         "Incorrect password.",
    "auth/too-many-requests":      "Too many attempts. Please wait and try again.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/email-already-in-use":   "This email is already in use.",
  };
  if (err.code && authMessages[err.code]) return authMessages[err.code];

  // Firestore
  const firestoreMessages = {
    "permission-denied":  "Permission denied. Check your login status.",
    "not-found":          "The requested document was not found.",
    "already-exists":     "This record already exists.",
    "resource-exhausted": "Quota exceeded. Try again later.",
    "unavailable":        "Service temporarily unavailable.",
  };
  if (err.code && firestoreMessages[err.code]) return firestoreMessages[err.code];

  // Env config
  if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
    return "Firebase not configured. Fill in your .env file and restart.";
  }

  return err.message || "Something went wrong. Please try again.";
}

/**
 * Report error to Sentry (if configured) and console.
 */
export function reportError(err, context = {}) {
  console.error("[Error]", err, context);

  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureException(err, { extra: context });
  }
}

/**
 * Handle + report in one call. Returns a user-friendly string.
 */
export function handleError(err, context = {}) {
  reportError(err, context);
  return parseError(err);
}

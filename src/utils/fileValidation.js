// src/utils/fileValidation.js

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB   = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

/**
 * Validate an image File before uploading.
 * Returns { valid: true } or { valid: false, error: string }
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: "No file selected." };
  }

  // Block SVG and executables
  if (file.type === "image/svg+xml") {
    return { valid: false, error: "SVG files are not allowed for security reasons." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type: ${file.type}. Only JPG, PNG and WEBP are allowed.`,
    };
  }

  if (file.size > MAX_SIZE_BYTES) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(1);
    return {
      valid: false,
      error: `File too large (${sizeMB} MB). Maximum allowed size is ${MAX_SIZE_MB} MB.`,
    };
  }

  // Block files with no extension or suspicious double extensions
  const name = file.name || "";
  const ext  = name.split(".").pop().toLowerCase();
  if (!["jpg","jpeg","png","webp"].includes(ext)) {
    return { valid: false, error: "File extension not allowed." };
  }

  return { valid: true };
}

// src/services/cloudinary.js
// ─────────────────────────────────────────────────────────────
// Set these in your .env file:
//   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
//   VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
//
// In Cloudinary Dashboard → Settings → Upload → Upload presets
// Create an "Unsigned" preset named e.g. "ar_portfolio"
// ─────────────────────────────────────────────────────────────

const CLOUD_NAME   = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload a File object to Cloudinary.
 * Returns the secure_url of the uploaded image.
 * @param {File} file
 * @param {string} folder  - Cloudinary folder path e.g. "sessions"
 * @param {(pct: number) => void} onProgress
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export async function uploadToCloudinary(file, folder = "portfolio", onProgress) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary env vars missing. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve({ url: data.secure_url, publicId: data.public_id });
      } else {
        reject(new Error(`Cloudinary upload failed: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}

/**
 * Delete an image from Cloudinary.
 * NOTE: Unsigned deletion requires a server-side endpoint.
 * For now we just log — wire up a Firebase Cloud Function or backend route.
 */
export async function deleteFromCloudinary(publicId) {
  console.warn("Cloudinary delete requires a server-side call. publicId:", publicId);
  // TODO: POST to your backend /api/cloudinary/delete with { publicId }
}

// src/components/ui/ImageUploader.jsx
import { useState, useRef } from "react";
import { UploadCloud, X, Loader } from "lucide-react";
import { uploadToCloudinary } from "../../services/cloudinary";
import { validateImageFile } from "../../utils/fileValidation";
import styles from "./ImageUploader.module.css";

export default function ImageUploader({ value, onChange, folder = "sessions", label = "Photo" }) {
  const [dragging, setDragging]   = useState(false);
  const [progress, setProgress]   = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const inputRef = useRef();

  const hasImage = value && typeof value === "string" && value.startsWith("http");

  const handleFile = async (file) => {
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) { setError(validation.error); return; }
    setError("");
    setUploading(true);
    setProgress(0);
    try {
      const result = await uploadToCloudinary(file, folder, setProgress);
      onChange(result);
    } catch (err) {
      setError(err.message || "Upload failed. Check your Cloudinary config.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const onDrop = (e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); };
  const clear  = (e) => { e.stopPropagation(); onChange({ url: "", publicId: "" }); };

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      {hasImage ? (
        <div className={styles.preview}>
          <img src={value} alt="Preview" className={styles.previewImg} />
          <button className={styles.clearBtn} onClick={clear} type="button" aria-label="Remove image"><X size={14} /></button>
        </div>
      ) : (
        <div
          className={`${styles.dropzone} ${dragging ? styles.dragging : ""} ${uploading ? styles.busy : ""}`}
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          role="button" tabIndex={0}
          aria-label="Upload image"
        >
          {uploading ? (
            <div className={styles.uploadingState}>
              <Loader size={24} className={styles.spin} />
              <span className={styles.progressText}>{progress}%</span>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{ width:`${progress}%` }} /></div>
            </div>
          ) : (
            <div className={styles.idleState}>
              <UploadCloud size={28} className={styles.uploadIcon} />
              <p className={styles.dropText}>Drag & drop or <span>click to upload</span></p>
              <p className={styles.hint}>JPG, PNG, WEBP · Max 5 MB</p>
            </div>
          )}
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className={styles.hiddenInput} onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      )}
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}

// src/components/ui/FormField.jsx
import styles from "./FormField.module.css";

export default function FormField({ label, error, required, children, hint }) {
  return (
    <div className={styles.group}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.req}>*</span>}
        </label>
      )}
      {children}
      {hint  && <p className={styles.hint}>{hint}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

// Shared input/textarea/select styles used across forms
export function Input({ className = "", ...props }) {
  return <input className={`${styles.input} ${className}`} {...props} />;
}
export function Textarea({ className = "", ...props }) {
  return <textarea className={`${styles.input} ${styles.textarea} ${className}`} {...props} />;
}
export function Select({ className = "", children, ...props }) {
  return (
    <select className={`${styles.input} ${className}`} {...props}>
      {children}
    </select>
  );
}

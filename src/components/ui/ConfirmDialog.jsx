// src/components/ui/ConfirmDialog.jsx
import Modal from "./Modal";
import styles from "./ConfirmDialog.module.css";

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, danger = true }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onClose}>Cancel</button>
        <button
          className={`${styles.confirm} ${danger ? styles.danger : styles.primary}`}
          onClick={() => { onConfirm(); onClose(); }}
        >
          {danger ? "Delete" : "Confirm"}
        </button>
      </div>
    </Modal>
  );
}

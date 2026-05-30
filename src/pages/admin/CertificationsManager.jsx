// src/pages/admin/CertificationsManager.jsx
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2, Award, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { certsService } from "../../services/firestore";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ImageUploader from "../../components/ui/ImageUploader";
import FormField, { Input, Select } from "../../components/ui/FormField";
import styles from "./AdminPage.module.css";

const COLORS = [
  { label: "Red",    bg: "#fee2e2", text: "#dc2626" },
  { label: "Blue",   bg: "#dbeafe", text: "#2563eb" },
  { label: "Green",  bg: "#d1fae5", text: "#059669" },
  { label: "Amber",  bg: "#fef3c7", text: "#d97706" },
  { label: "Purple", bg: "#ede9fe", text: "#7c3aed" },
  { label: "Indigo", bg: "#e0e7ff", text: "#4f46e5" },
];

export default function CertificationsManager() {
  const [certs, setCerts]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [modalOpen, setModal]       = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [deleteId, setDeleteId]     = useState(null);
  const [saving, setSaving]         = useState(false);
  const [certImgData, setCertImg]   = useState({ url: "", publicId: "" });
  const [logoImgData, setLogoImg]   = useState({ url: "", publicId: "" });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const data = await certsService.getAll();
      setCerts(data);
    } catch { toast.error("Failed to load certifications"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openCreate = () => {
    setEditItem(null);
    setCertImg({ url: "", publicId: "" });
    setLogoImg({ url: "", publicId: "" });
    reset({ color: "Red", status: "completed", order: certs.length + 1 });
    setModal(true);
  };

  const openEdit = (cert) => {
    setEditItem(cert);
    setCertImg({ url: cert.certImage || "", publicId: cert.certImagePublicId || "" });
    setLogoImg({ url: cert.logoUrl || "", publicId: cert.logoPublicId || "" });
    reset({
      title:  cert.title,
      abbr:   cert.abbr,
      issuer: cert.issuer || cert.sub,
      color:  cert.color ? COLORS.find(c => c.text === cert.color)?.label || "Red" : "Red",
      status: cert.status || "completed",
      year:   cert.year,
      link:   cert.link,
      order:  cert.order,
      logo:   cert.logo,
    });
    setModal(true);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const colorObj = COLORS.find((c) => c.label === data.color) || COLORS[0];
      const payload = {
        ...data,
        bg:               colorObj.bg,
        color:            colorObj.text,
        certImage:        certImgData.url,
        certImagePublicId:certImgData.publicId,
        // Use uploaded logo URL if provided, else use devicon URL from field
        logo:             logoImgData.url || data.logo || "",
        logoPublicId:     logoImgData.publicId,
        order:            Number(data.order) || 99,
        issuer:           data.issuer,
        sub:              data.issuer,
      };
      if (editItem) {
        await certsService.update(editItem.id, payload);
        toast.success("Certification updated!");
      } else {
        await certsService.create(payload);
        toast.success("Certification added!");
      }
      await fetchAll();
      setModal(false);
    } catch { toast.error("Something went wrong."); }
    finally { setSaving(false); }
  };

  const onDelete = async () => {
    try {
      await certsService.delete(deleteId);
      setCerts((p) => p.filter((c) => c.id !== deleteId));
      toast.success("Deleted.");
    } catch { toast.error("Delete failed."); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Certifications</h2>
          <p className={styles.pageSubtitle}>{certs.length} certifications</p>
        </div>
        <button className={styles.addBtn} onClick={openCreate}>
          <Plus size={15} /> Add Certification
        </button>
      </div>

      {loading ? <div className={styles.loading}>Loading…</div>
      : certs.length === 0 ? <EmptyState onAdd={openCreate} />
      : (
        <div className={styles.certGrid}>
          {certs.sort((a,b)=>(a.order||99)-(b.order||99)).map((c) => (
            <CertCard key={c.id} cert={c} onEdit={() => openEdit(c)} onDelete={() => setDeleteId(c.id)} />
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModal(false)} title={editItem ? "Edit Certification" : "Add Certification"} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

          <div className={styles.formGrid2}>
            <FormField label="Title" required error={errors.title?.message}>
              <Input placeholder="OCI Foundations Associate" {...register("title", { required: "Required" })} />
            </FormField>
            <FormField label="Abbreviation" required error={errors.abbr?.message}>
              <Input placeholder="OCI" maxLength={5} {...register("abbr", { required: "Required" })} />
            </FormField>
          </div>

          <div className={styles.formGrid2}>
            <FormField label="Issuer / Organisation">
              <Input placeholder="Oracle" {...register("issuer")} />
            </FormField>
            <FormField label="Year">
              <Input placeholder="2024" {...register("year")} />
            </FormField>
          </div>

          <div className={styles.formGrid2}>
            <FormField label="Status">
              <Select {...register("status")}>
                <option value="completed">Completed</option>
                <option value="pursuing">Currently Pursuing</option>
              </Select>
            </FormField>
            <FormField label="Badge Color">
              <Select {...register("color")}>
                {COLORS.map((c) => <option key={c.label} value={c.label}>{c.label}</option>)}
              </Select>
            </FormField>
          </div>

          <FormField label="Tech Logo URL" hint="Paste a devicon or CDN URL for the logo (optional if uploading below)">
            <Input placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/..." {...register("logo")} />
          </FormField>

          <FormField label="Verify / Credential Link">
            <Input type="url" placeholder="https://..." {...register("link")} />
          </FormField>

          <FormField label="Display Order" hint="Lower = shown first">
            <Input type="number" min="1" {...register("order")} />
          </FormField>

          {/* Certificate image upload */}
          <ImageUploader
            label="Certificate Image (upload your actual certificate)"
            value={certImgData.url}
            onChange={setCertImg}
            folder="certificates"
          />

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setModal(false)}>Cancel</button>
            <button type="submit" className={styles.saveBtn} disabled={saving}>
              {saving ? "Saving…" : editItem ? "Update" : "Add Certification"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={onDelete}
        title="Delete Certification" message="Delete this certification permanently?" />
    </div>
  );
}

function CertCard({ cert, onEdit, onDelete }) {
  return (
    <div className={styles.certCard}>
      {/* Certificate thumbnail */}
      {cert.certImage ? (
        <img src={cert.certImage} alt={cert.title} className={styles.certThumb} />
      ) : (
        <div className={styles.certThumbPlaceholder}>
          {cert.logo
            ? <img src={cert.logo} alt={cert.abbr} style={{ width: 32, height: 32, objectFit: "contain" }} />
            : <span style={{ fontWeight: 800, fontSize: 14, color: cert.color }}>{cert.abbr}</span>
          }
          <span style={{ fontSize: 10, color: "var(--gray400)", marginTop: 6 }}>No image yet</span>
        </div>
      )}

      <div className={styles.certInfo}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div className={styles.certLogo} style={{ background: cert.bg, color: cert.color }}>{cert.abbr}</div>
          <div>
            <div className={styles.certTitle}>{cert.title}</div>
            <div className={styles.certSub}>{cert.issuer || cert.sub}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
          {cert.year && <span style={{ fontSize: 11, color: "var(--blue)", fontWeight: 600 }}>{cert.year}</span>}
          <span className={`${styles.statusPill} ${cert.status === "pursuing" ? styles.draft : styles.published}`}>
            {cert.status === "pursuing" ? "Pursuing" : "Completed"}
          </span>
          {cert.link && (
            <a href={cert.link} target="_blank" rel="noreferrer" style={{ color: "var(--gray500)", display: "flex", alignItems: "center" }}>
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>

      <div className={styles.certActions}>
        <button className={styles.editBtn} onClick={onEdit}><Pencil size={13} /></button>
        <button className={styles.deleteBtn} onClick={onDelete}><Trash2 size={13} /></button>
      </div>
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className={styles.empty}>
      <Award size={40} />
      <h3>No certifications yet</h3>
      <p>Add your professional certifications here.</p>
      <button className={styles.addBtn} onClick={onAdd}><Plus size={14} /> Add Certification</button>
    </div>
  );
}

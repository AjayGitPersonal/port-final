// src/pages/admin/SessionsManager.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Pencil, Trash2, MapPin, Calendar, Users, ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { useSessionsQuery, useCreateSession, useUpdateSession, useDeleteSession } from "../../hooks/queries";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ImageUploader from "../../components/ui/ImageUploader";
import FormField, { Input, Textarea, Select } from "../../components/ui/FormField";
import styles from "./AdminPage.module.css";

const SESSION_TYPES = ["Academic","Corporate","Online","Workshop","Bootcamp"];

const schema = z.object({
  title:         z.string().min(3, "Title must be at least 3 characters"),
  org:           z.string().min(2, "Organisation is required"),
  type:          z.string().min(1, "Select a type"),
  location:      z.string().optional(),
  date:          z.string().optional(),
  studentsCount: z.coerce.number().min(0).optional(),
  description:   z.string().optional(),
});

export default function SessionsManager() {
  const { data: sessions = [], isLoading } = useSessionsQuery();
  const createSession = useCreateSession();
  const updateSession = useUpdateSession();
  const deleteSession = useDeleteSession();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem]   = useState(null);
  const [deleteId, setDeleteId]   = useState(null);
  const [photoData, setPhotoData] = useState({ url:"", publicId:"" });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const openCreate = () => {
    setEditItem(null); setPhotoData({ url:"", publicId:"" });
    reset({ type:"" }); setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditItem(s); setPhotoData({ url: s.photoUrl||"", publicId: s.photoPublicId||"" });
    reset({ title:s.title, org:s.org, location:s.location, date:s.date,
      type:s.type, description:s.description, studentsCount:s.studentsCount });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    const payload = { ...data, photoUrl: photoData.url, photoPublicId: photoData.publicId, studentsCount: Number(data.studentsCount)||0 };
    if (editItem) {
      await updateSession.mutateAsync({ id: editItem.id, data: payload });
    } else {
      await createSession.mutateAsync(payload);
    }
    setModalOpen(false);
  };

  const saving = createSession.isPending || updateSession.isPending;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Session Gallery</h2>
          <p className={styles.pageSubtitle}>{sessions.length} sessions total</p>
        </div>
        <button className={styles.addBtn} onClick={openCreate}><Plus size={15} /> Add Session</button>
      </div>

      {isLoading ? <div className={styles.loading}>Loading sessions…</div>
      : sessions.length === 0 ? <EmptyState onAdd={openCreate} />
      : (
        <div className={styles.cardGrid}>
          {sessions.map((s) => (
            <SessionCard key={s.id} session={s} onEdit={() => openEdit(s)} onDelete={() => setDeleteId(s.id)} />
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Session" : "Add New Session"} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGrid2}>
            <FormField label="Session Title" required error={errors.title?.message}>
              <Input placeholder="e.g. Oracle Cloud Workshop" {...register("title")} />
            </FormField>
            <FormField label="Type" required error={errors.type?.message}>
              <Select {...register("type")}>
                <option value="">Select type…</option>
                {SESSION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </FormField>
          </div>
          <div className={styles.formGrid2}>
            <FormField label="Organisation / College" required error={errors.org?.message}>
              <Input placeholder="e.g. PSG College of Technology" {...register("org")} />
            </FormField>
            <FormField label="Location">
              <Input placeholder="e.g. Coimbatore" {...register("location")} />
            </FormField>
          </div>
          <div className={styles.formGrid2}>
            <FormField label="Date"><Input type="date" {...register("date")} /></FormField>
            <FormField label="Students Count"><Input type="number" min="0" placeholder="e.g. 120" {...register("studentsCount")} /></FormField>
          </div>
          <FormField label="Description">
            <Textarea placeholder="Brief description of the session…" rows={3} {...register("description")} />
          </FormField>
          <ImageUploader label="Session Photo" value={photoData.url} onChange={setPhotoData} folder="sessions" />
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className={styles.saveBtn} disabled={saving}>
              {saving ? "Saving…" : editItem ? "Update Session" : "Create Session"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={() => deleteSession.mutate(deleteId)}
        title="Delete Session" message="Permanently delete this session?" />
    </div>
  );
}

function SessionCard({ session, onEdit, onDelete }) {
  const dateStr = session.date ? (() => { try { return format(new Date(session.date),"dd MMM yyyy"); } catch { return session.date; } })() : null;
  return (
    <div className={styles.card}>
      <div className={styles.cardThumb}>
        {session.photoUrl
          ? <img src={session.photoUrl} alt={session.title} className={styles.cardImg} loading="lazy" />
          : <div className={styles.cardImgPlaceholder}><ImageIcon size={24} /></div>}
        {session.type && <span className={`${styles.typeBadge} ${styles[session.type?.toLowerCase()]}`}>{session.type}</span>}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{session.title}</h3>
        <p className={styles.cardOrg}>{session.org}</p>
        <div className={styles.cardMeta}>
          {session.location && <span><MapPin size={11} /> {session.location}</span>}
          {dateStr          && <span><Calendar size={11} /> {dateStr}</span>}
          {session.studentsCount > 0 && <span><Users size={11} /> {session.studentsCount}</span>}
        </div>
        {session.description && <p className={styles.cardDesc}>{session.description}</p>}
      </div>
      <div className={styles.cardActions}>
        <button className={styles.editBtn} onClick={onEdit}><Pencil size={13} /> Edit</button>
        <button className={styles.deleteBtn} onClick={onDelete}><Trash2 size={13} /> Delete</button>
      </div>
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className={styles.empty}>
      <ImageIcon size={40} />
      <h3>No sessions yet</h3>
      <p>Add your first session to display in the gallery.</p>
      <button className={styles.addBtn} onClick={onAdd}><Plus size={14} /> Add Session</button>
    </div>
  );
}

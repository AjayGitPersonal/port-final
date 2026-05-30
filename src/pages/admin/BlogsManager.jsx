// src/pages/admin/BlogsManager.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Pencil, Trash2, BookOpen, Eye } from "lucide-react";
import { format } from "date-fns";
import { useBlogsQuery, useCreateBlog, useUpdateBlog, useDeleteBlog } from "../../hooks/queries";
import { toDate } from "../../services/firestore";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ImageUploader from "../../components/ui/ImageUploader";
import FormField, { Input, Select } from "../../components/ui/FormField";
import RichEditor from "../../components/blog/RichEditor";
import styles from "./AdminPage.module.css";

const CATEGORIES = ["AI & ML","Cloud","DevOps","Python","Data Science","Career","Tutorial","Other"];

const schema = z.object({
  title:    z.string().min(3, "Title must be at least 3 characters"),
  slug:     z.string().optional(),
  category: z.string().min(1, "Select a category"),
  excerpt:  z.string().max(200, "Max 200 characters").optional(),
  tags:     z.string().optional(),
  status:   z.enum(["draft", "published"]),
  readTime: z.coerce.number().min(1).optional(),
  seoTitle: z.string().optional(),
  seoDesc:  z.string().max(160).optional(),
});

export default function BlogsManager() {
  const { data: blogs = [], isLoading } = useBlogsQuery();
  const createBlog  = useCreateBlog();
  const updateBlog  = useUpdateBlog();
  const deleteBlog  = useDeleteBlog();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem]   = useState(null);
  const [deleteId, setDeleteId]   = useState(null);
  const [coverData, setCoverData] = useState({ url: "", publicId: "" });
  const [content, setContent]     = useState("");
  const [filter, setFilter]       = useState("all");
  const [tab, setTab]             = useState("content"); // content | seo

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const openCreate = () => {
    setEditItem(null); setContent(""); setCoverData({ url:"", publicId:"" });
    reset({ status: "draft", category: "" }); setTab("content"); setModalOpen(true);
  };

  const openEdit = (blog) => {
    setEditItem(blog); setContent(blog.content || "");
    setCoverData({ url: blog.coverUrl || "", publicId: blog.coverPublicId || "" });
    reset({ title: blog.title, slug: blog.slug, category: blog.category, excerpt: blog.excerpt,
      tags: blog.tags?.join(", ") || "", status: blog.status || "draft",
      readTime: blog.readTime, seoTitle: blog.seoTitle, seoDesc: blog.seoDesc });
    setTab("content"); setModalOpen(true);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      slug:        data.slug || slugify(data.title),
      tags:        data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      content,
      coverUrl:       coverData.url,
      coverPublicId:  coverData.publicId,
      readTime:    Number(data.readTime) || estimateReadTime(content),
      publishedAt: data.status === "published" ? new Date().toISOString() : null,
      featured:    false,
    };
    if (editItem) {
      await updateBlog.mutateAsync({ id: editItem.id, data: payload });
    } else {
      await createBlog.mutateAsync(payload);
    }
    setModalOpen(false);
  };

  const filtered = filter === "all" ? blogs : blogs.filter((b) => b.status === filter);
  const saving   = createBlog.isPending || updateBlog.isPending;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Blog Posts</h2>
          <p className={styles.pageSubtitle}>{blogs.length} posts · {blogs.filter(b=>b.status==="published").length} published</p>
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <select className={styles.filterSelect} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <button className={styles.addBtn} onClick={openCreate}><Plus size={15} /> New Post</button>
        </div>
      </div>

      {isLoading ? <div className={styles.loading}>Loading posts…</div>
      : filtered.length === 0 ? <EmptyState onAdd={openCreate} />
      : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Read Time</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((b) => <BlogRow key={b.id} blog={b} onEdit={() => openEdit(b)} onDelete={() => setDeleteId(b.id)} />)}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Blog Post" : "New Blog Post"} size="xl">
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button type="button" className={`${styles.tab} ${tab==="content"?styles.tabActive:""}`} onClick={() => setTab("content")}>Content</button>
            <button type="button" className={`${styles.tab} ${tab==="seo"?styles.tabActive:""}`} onClick={() => setTab("seo")}>SEO</button>
          </div>

          {tab === "content" && (
            <>
              <div className={styles.formGrid2}>
                <FormField label="Title" required error={errors.title?.message}>
                  <Input placeholder="e.g. Getting Started with Generative AI" {...register("title")} />
                </FormField>
                <FormField label="Slug" hint="Auto-generated if blank">
                  <Input placeholder="getting-started-generative-ai" {...register("slug")} />
                </FormField>
              </div>
              <div className={styles.formGrid2}>
                <FormField label="Category" required error={errors.category?.message}>
                  <Select {...register("category")}>
                    <option value="">Select…</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Select>
                </FormField>
                <FormField label="Status">
                  <Select {...register("status")}><option value="draft">Draft</option><option value="published">Published</option></Select>
                </FormField>
              </div>
              <FormField label="Excerpt" hint="Max 200 chars — shown in blog listings" error={errors.excerpt?.message}>
                <Input placeholder="A brief overview…" {...register("excerpt")} />
              </FormField>
              <FormField label="Content" required>
                <RichEditor value={content} onChange={setContent} />
              </FormField>
              <div className={styles.formGrid2}>
                <FormField label="Tags" hint="Comma-separated: AI, Python, Cloud">
                  <Input placeholder="AI, Cloud, DevOps" {...register("tags")} />
                </FormField>
                <FormField label="Read Time (min)" hint="Auto-calculated if blank">
                  <Input type="number" min="1" placeholder="5" {...register("readTime")} />
                </FormField>
              </div>
              <ImageUploader label="Cover Image" value={coverData.url} onChange={setCoverData} folder="blogs" />
            </>
          )}

          {tab === "seo" && (
            <>
              <FormField label="SEO Title" hint="Overrides page title for search engines (max 60 chars)">
                <Input placeholder="Custom SEO title…" {...register("seoTitle")} />
              </FormField>
              <FormField label="SEO Description" hint="Shown in search results (max 160 chars)" error={errors.seoDesc?.message}>
                <Input placeholder="Custom meta description…" {...register("seoDesc")} />
              </FormField>
              <div style={{ padding:"16px", background:"var(--gray50)", borderRadius:"var(--radius)", border:"1px solid var(--gray200)" }}>
                <p style={{ fontSize:12, fontWeight:600, color:"var(--gray500)", marginBottom:8 }}>GOOGLE PREVIEW</p>
                <p style={{ fontSize:14, color:"#1a0dab", marginBottom:2 }}>Ajayeswaran Raja — Blog</p>
                <p style={{ fontSize:12, color:"#006621", marginBottom:4 }}>ajayeswaran.com/blog/[slug]</p>
                <p style={{ fontSize:13, color:"#545454" }}>Your SEO description will appear here in search results.</p>
              </div>
            </>
          )}

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className={styles.saveBtn} disabled={saving}>
              {saving ? "Saving…" : editItem ? "Update Post" : "Create Post"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={() => deleteBlog.mutate(deleteId)}
        title="Delete Blog Post" message="Permanently delete this blog post?" />
    </div>
  );
}

function BlogRow({ blog, onEdit, onDelete }) {
  const created = blog.createdAt
    ? (() => { try { return format(toDate(blog.createdAt), "dd MMM yyyy"); } catch { return "—"; } })() : "—";
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tdTitle}>
        <div className={styles.postTitle}>{blog.title}</div>
        {blog.slug && <div className={styles.postSlug}>/blog/{blog.slug}</div>}
      </td>
      <td><span className={styles.categoryBadge}>{blog.category || "—"}</span></td>
      <td><span className={`${styles.statusPill} ${blog.status==="published"?styles.published:styles.draft}`}>{blog.status==="published"?"Published":"Draft"}</span></td>
      <td className={styles.tdMeta}>{blog.readTime ? `${blog.readTime} min` : "—"}</td>
      <td className={styles.tdMeta}>{created}</td>
      <td>
        <div className={styles.rowActions}>
          {blog.status === "published" && blog.slug && (
            <a href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer" className={styles.editBtn} title="View post"><Eye size={13} /></a>
          )}
          <button className={styles.editBtn} onClick={onEdit}><Pencil size={13} /> Edit</button>
          <button className={styles.deleteBtn} onClick={onDelete}><Trash2 size={13} /></button>
        </div>
      </td>
    </tr>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className={styles.empty}>
      <BookOpen size={40} />
      <h3>No blog posts yet</h3>
      <p>Write your first article to share your knowledge.</p>
      <button className={styles.addBtn} onClick={onAdd}><Plus size={14} /> New Post</button>
    </div>
  );
}

const slugify = (t="") => t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
const estimateReadTime = (html="") => Math.max(1, Math.ceil(html.replace(/<[^>]+>/g,"").trim().split(/\s+/).length / 200));

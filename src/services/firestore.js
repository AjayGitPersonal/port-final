// src/services/firestore.js
import {
  collection, addDoc, getDocs, getDoc, doc,
  updateDoc, deleteDoc, query, orderBy, where,
  serverTimestamp, limit
} from "firebase/firestore";
import { db } from "../firebase";

// ─── SESSIONS ────────────────────────────────────────────────
export const getSessions = async () => {
  const q = query(collection(db, "sessions"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addSession = async (data) => {
  return addDoc(collection(db, "sessions"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateSession = async (id, data) => {
  return updateDoc(doc(db, "sessions", id), data);
};

export const deleteSession = async (id) => {
  return deleteDoc(doc(db, "sessions", id));
};

// ─── BLOGS ───────────────────────────────────────────────────
export const getBlogs = async ({ adminView = false } = {}) => {
  let q;
  if (adminView) {
    q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  } else {
    q = query(
      collection(db, "blogs"),
      where("status", "==", "published"),
      orderBy("createdAt", "desc")
    );
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getBlogBySlug = async (slug) => {
  const q = query(collection(db, "blogs"), where("slug", "==", slug), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
};

export const addBlog = async (data) => {
  return addDoc(collection(db, "blogs"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateBlog = async (id, data) => {
  return updateDoc(doc(db, "blogs", id), data);
};

export const deleteBlog = async (id) => {
  return deleteDoc(doc(db, "blogs", id));
};

// ─── CERTIFICATIONS ──────────────────────────────────────────
export const getCertifications = async () => {
  const q = query(collection(db, "certifications"), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addCertification = async (data) => {
  return addDoc(collection(db, "certifications"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateCertification = async (id, data) => {
  return updateDoc(doc(db, "certifications", id), data);
};

export const deleteCertification = async (id) => {
  return deleteDoc(doc(db, "certifications", id));
};

// ─── MESSAGES (Contact Form Inbox) ───────────────────────────
export const saveMessage = async ({ name, email, subject, message }) => {
  return addDoc(collection(db, "messages"), {
    name,
    email,
    subject: subject || "(No subject)",
    message,
    read: false,
    starred: false,
    createdAt: serverTimestamp(),
  });
};

export const getMessages = async () => {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const markMessageRead = async (id, read = true) => {
  return updateDoc(doc(db, "messages", id), { read });
};

export const markMessageStarred = async (id, starred) => {
  return updateDoc(doc(db, "messages", id), { starred });
};

export const deleteMessage = async (id) => {
  return deleteDoc(doc(db, "messages", id));
};

export const getUnreadCount = async () => {
  const q = query(
    collection(db, "messages"),
    where("read", "==", false)
  );
  const snap = await getDocs(q);
  return snap.size;
};

// Utility: normalize Firestore timestamp or ISO/string to JS Date
export const toDate = (ts) => {
  if (!ts) return null;
  try {
    return typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
  } catch (e) {
    return new Date(ts);
  }
};

// Compatibility service objects for legacy callers
export const sessionsService = {
  getAll: getSessions,
  create: addSession,
  update: updateSession,
  delete: deleteSession,
};

export const blogsService = {
  getAll: () => getBlogs({ adminView: true }),
  getById: async (id) => {
    const d = await getDoc(doc(db, "blogs", id));
    if (!d.exists()) return null;
    return { id: d.id, ...d.data() };
  },
  create: addBlog,
  update: updateBlog,
  delete: deleteBlog,
};

export const certsService = {
  getAll: getCertifications,
  create: addCertification,
  update: updateCertification,
  delete: deleteCertification,
};
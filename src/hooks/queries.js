// src/hooks/queries.js
// Centralised TanStack Query hooks — caching, retries, background refresh
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionsService, blogsService, certsService } from "../services/firestore";
import { handleError } from "../utils/errorHandler";

// ── Query keys ──────────────────────────────────────────────
export const KEYS = {
  sessions: ["sessions"],
  blogs:    ["blogs"],
  blog:     (id) => ["blogs", id],
  certs:    ["certifications"],
};

// ── Sessions ────────────────────────────────────────────────
export function useSessionsQuery() {
  return useQuery({
    queryKey: KEYS.sessions,
    queryFn:  sessionsService.getAll,
    staleTime: 1000 * 60 * 2, // 2 min cache
  });
}

export function useCreateSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => sessionsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.sessions });
      toast.success("Session created!");
    },
    onError: (err) => toast.error(handleError(err, { action: "createSession" })),
  });
}

export function useUpdateSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => sessionsService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.sessions });
      toast.success("Session updated!");
    },
    onError: (err) => toast.error(handleError(err, { action: "updateSession" })),
  });
}

export function useDeleteSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => sessionsService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.sessions });
      toast.success("Session deleted.");
    },
    onError: (err) => toast.error(handleError(err, { action: "deleteSession" })),
  });
}

// ── Blogs ───────────────────────────────────────────────────
export function useBlogsQuery() {
  return useQuery({
    queryKey: KEYS.blogs,
    queryFn:  blogsService.getAll,
    staleTime: 1000 * 60 * 2,
  });
}

export function useBlogQuery(id) {
  return useQuery({
    queryKey: KEYS.blog(id),
    queryFn:  () => blogsService.getById(id),
    enabled:  !!id,
  });
}

export function useCreateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => blogsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.blogs });
      toast.success("Blog post created!");
    },
    onError: (err) => toast.error(handleError(err, { action: "createBlog" })),
  });
}

export function useUpdateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => blogsService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.blogs });
      toast.success("Blog post updated!");
    },
    onError: (err) => toast.error(handleError(err, { action: "updateBlog" })),
  });
}

export function useDeleteBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => blogsService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.blogs });
      toast.success("Blog post deleted.");
    },
    onError: (err) => toast.error(handleError(err, { action: "deleteBlog" })),
  });
}

// ── Certifications ──────────────────────────────────────────
export function useCertsQuery() {
  return useQuery({
    queryKey: KEYS.certs,
    queryFn:  certsService.getAll,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateCert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => certsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.certs });
      toast.success("Certification added!");
    },
    onError: (err) => toast.error(handleError(err, { action: "createCert" })),
  });
}

export function useUpdateCert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => certsService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.certs });
      toast.success("Certification updated!");
    },
    onError: (err) => toast.error(handleError(err, { action: "updateCert" })),
  });
}

export function useDeleteCert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => certsService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.certs });
      toast.success("Certification deleted.");
    },
    onError: (err) => toast.error(handleError(err, { action: "deleteCert" })),
  });
}

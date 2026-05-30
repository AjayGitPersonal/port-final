// src/hooks/useBlogs.js
import { useState, useEffect, useCallback } from "react";
import { blogsService } from "../services/firestore";
import toast from "react-hot-toast";

export function useBlogs() {
  const [blogs, setBlogs]   = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const data = await blogsService.getAll();
      setBlogs(data);
    } catch (err) {
      toast.error("Failed to load blog posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const create = async (data) => {
    const id = await blogsService.create(data);
    await fetchAll();
    return id;
  };

  const update = async (id, data) => {
    await blogsService.update(id, data);
    await fetchAll();
  };

  const remove = async (id) => {
    await blogsService.delete(id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return { blogs, loading, create, update, remove, refetch: fetchAll };
}

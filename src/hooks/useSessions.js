// src/hooks/useSessions.js
import { useState, useEffect, useCallback } from "react";
import { sessionsService } from "../services/firestore";
import toast from "react-hot-toast";

export function useSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading]   = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const data = await sessionsService.getAll();
      setSessions(data);
    } catch (err) {
      console.error("Firestore fetch error:", err);
      // Missing env vars → show specific message
      if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        toast.error("Firebase not configured. Check your .env file.");
      } else {
        toast.error("Failed to load sessions: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const create = async (data) => {
    try {
      const id = await sessionsService.create(data);
      await fetchAll();
      return id;
    } catch (err) {
      console.error("Firestore create error:", err);
      if (err.code === "permission-denied") {
        throw new Error("Permission denied — check Firestore rules or login status.");
      }
      if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        throw new Error("Firebase not configured. Fill in your .env file and restart the dev server.");
      }
      throw err;
    }
  };

  const update = async (id, data) => {
    try {
      await sessionsService.update(id, data);
      await fetchAll();
    } catch (err) {
      console.error("Firestore update error:", err);
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await sessionsService.delete(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Firestore delete error:", err);
      throw err;
    }
  };

  return { sessions, loading, create, update, remove, refetch: fetchAll };
}

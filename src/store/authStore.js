// src/store/authStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebase";

const storeDefinition = (set) => ({
  user:    null,
  loading: true,
  error:   null,

  init: () => {
    const unsub = onAuthStateChanged(auth, (user) => {
      set({ user, loading: false, error: null });
    });
    return unsub;
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null });
    } catch (err) {
      set({ error: err.message });
    }
  },

  clearError: () => set({ error: null }),
});

// devtools only in development
const useAuthStore = import.meta.env.DEV
  ? create(devtools(storeDefinition, { name: "AuthStore" }))
  : create(storeDefinition);

// Named export for Dashboard.jsx + default export for AdminLogin.jsx
export { useAuthStore };
export default useAuthStore;

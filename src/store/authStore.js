// src/store/authStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebase";

// Only the admin email may access the dashboard
const ADMIN_EMAIL = "ajayeswaran23@gmail.com";

const storeDefinition = (set) => ({
  user:    null,
  loading: true,
  error:   null,

  // Called once in main.jsx to start the Firebase auth listener
  init: () => {
    const unsub = onAuthStateChanged(auth, (user) => {
      set({ user, loading: false, error: null });
    });
    return unsub; // caller must call this to unsubscribe on unmount
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

  // Helper — is the currently logged-in user the authorised admin?
  isAdmin: (user) => user?.email === ADMIN_EMAIL,
});

// devtools only in development to avoid exposing state in production
const useAuthStore = import.meta.env.DEV
  ? create(devtools(storeDefinition, { name: "AuthStore" }))
  : create(storeDefinition);

export { useAuthStore, ADMIN_EMAIL };
export default useAuthStore;

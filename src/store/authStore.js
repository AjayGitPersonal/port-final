// src/store/authStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebase";

const useAuthStore = create(
  devtools(
    (set, get) => ({
      user:    null,
      loading: true,
      error:   null,

      // Called once in main.jsx to start listening
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
    }),
    { name: "AuthStore" }
  )
);

export { useAuthStore };
export default useAuthStore;

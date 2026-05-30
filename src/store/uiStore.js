// src/store/uiStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useUIStore = create(
  devtools(
    (set) => ({
      // Sidebar active page
      activePage: "dashboard",
      setActivePage: (page) => set({ activePage: page }),

      // Global modal (confirm dialogs etc)
      modal: { open: false, title: "", message: "", onConfirm: null },
      openModal:  (opts) => set({ modal: { open: true, ...opts } }),
      closeModal: ()     => set({ modal: { open: false, title: "", message: "", onConfirm: null } }),

      // Notification badge counts
      messageCount: 0,
      setMessageCount: (n) => set({ messageCount: n }),
    }),
    { name: "UIStore" }
  )
);

export default useUIStore;

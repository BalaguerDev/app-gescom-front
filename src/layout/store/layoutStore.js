import { create } from "zustand";

export const useLayoutStore = create((set) => ({
    isUserModalOpen: false,
    toggleUserModal: () =>
        set((state) => ({ isUserModalOpen: !state.isUserModalOpen })),
}));

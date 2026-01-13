import { create } from 'zustand';

export const useProductStore = create((set) => ({
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
}));

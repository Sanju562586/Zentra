import { create } from 'zustand';

export const useHeaderStore = create((set) => ({
    customContent: null,
    setCustomContent: (content) => set({ customContent: content }),
}));

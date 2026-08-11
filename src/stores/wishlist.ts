import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  ids: string[];
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((x) => x !== id)
            : [...state.ids, id],
        })),
      add: (id) =>
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids : [...state.ids, id],
        })),
      remove: (id) =>
        set((state) => ({ ids: state.ids.filter((x) => x !== id) })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "palmonas-wishlist" },
  ),
);

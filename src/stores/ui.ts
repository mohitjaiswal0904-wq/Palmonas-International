import { create } from "zustand";

type Overlay = "search" | "cart" | "wishlist" | "menu" | "filters" | null;

type UiState = {
  overlay: Overlay;
  open: (o: Exclude<Overlay, null>) => void;
  close: () => void;
  toggle: (o: Exclude<Overlay, null>) => void;
};

export const useUi = create<UiState>((set, get) => ({
  overlay: null,
  open: (o) => set({ overlay: o }),
  close: () => set({ overlay: null }),
  toggle: (o) => set({ overlay: get().overlay === o ? null : o }),
}));

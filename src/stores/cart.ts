import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  key: string; // productId + variant signature
  productId: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  currency: string;
  metalLabel: string;
  stoneLabel?: string;
  size?: string;
  image: string;
  seed: string;
  plate: string;
  quantity: number;
  giftWrap: boolean;
  engraving?: string;
};

type CartState = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "key" | "quantity"> & { quantity?: number }) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  toggleGiftWrap: (key: string) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

const makeKey = (l: { productId: string; metalLabel: string; stoneLabel?: string; size?: string }) =>
  [l.productId, l.metalLabel, l.stoneLabel ?? "", l.size ?? ""].join("::");

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (line) => {
        const key = makeKey(line);
        const quantity = line.quantity ?? 1;
        set((state) => {
          const existing = state.lines.find((l) => l.key === key);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.key === key ? { ...l, quantity: l.quantity + quantity } : l,
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              { ...line, key, quantity, giftWrap: line.giftWrap ?? false },
            ],
          };
        });
      },
      remove: (key) =>
        set((state) => ({ lines: state.lines.filter((l) => l.key !== key) })),
      setQuantity: (key, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((l) => (l.key === key ? { ...l, quantity } : l))
            .filter((l) => l.quantity > 0),
        })),
      toggleGiftWrap: (key) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            l.key === key ? { ...l, giftWrap: !l.giftWrap } : l,
          ),
        })),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: () =>
        get().lines.reduce(
          (sum, l) => sum + l.price * l.quantity + (l.giftWrap ? 15 : 0),
          0,
        ),
    }),
    { name: "palmonas-cart" },
  ),
);

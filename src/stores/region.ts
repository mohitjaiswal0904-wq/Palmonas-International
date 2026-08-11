"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_REGION_ID, regionById } from "@/data";
import type { Region } from "@/types";

type RegionState = {
  regionId: string;
  setRegion: (id: string) => void;
  region: () => Region;
};

export const useRegion = create<RegionState>()(
  persist(
    (set, get) => ({
      regionId: DEFAULT_REGION_ID,
      setRegion: (id) => set({ regionId: id }),
      region: () => regionById(get().regionId),
    }),
    { name: "palmonas-region" },
  ),
);

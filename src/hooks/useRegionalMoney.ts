"use client";

import { useCallback } from "react";
import { regionById } from "@/data/regions";
import { formatRegional } from "@/lib/format";
import { useRegion } from "@/stores/region";
import { useHydrated } from "@/hooks/useHydrated";

/** Formats a USD catalogue amount in the shopper's selected region. */
export function useRegionalMoney() {
  const hydrated = useHydrated();
  const regionId = useRegion((s) => s.regionId);
  const region = regionById(hydrated ? regionId : "us");

  return useCallback(
    (amountUsd: number) => formatRegional(amountUsd, region),
    [region],
  );
}

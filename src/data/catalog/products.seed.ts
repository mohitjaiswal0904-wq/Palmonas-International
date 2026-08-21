/**
 * Product seed barrel — combine collection seed files here.
 *
 * App code should import built products from `@/data`, not these seeds.
 */
export type { MetalId, StoneId, ProductSeed } from "./product-seed.types";
export { RING_SIZES, BAND_SIZES, ONE_SIZE, inrToUsd } from "./product-seed.types";

import { odeToNatureSeeds } from "./seeds/ode-to-nature";
import { nineKtFineGoldSeeds } from "./seeds/nine-kt-fine-gold";
import { essentialSeeds } from "./seeds/essential";
import type { ProductSeed } from "./product-seed.types";

export const productSeeds: ProductSeed[] = [
  ...odeToNatureSeeds,
  ...nineKtFineGoldSeeds,
  ...essentialSeeds,
];

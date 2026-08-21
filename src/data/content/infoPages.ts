/**
 * @deprecated Prefer `@/data` or `./info`.
 * Re-exports kept so existing deep imports keep working.
 */
export type { InfoPage, InfoBlock } from "@/types";
export {
  policyPages,
  aboutPage,
  contactPage,
  sizeGuidePage,
  policyBySlug,
  allPolicySlugs,
} from "./info";

/**
 * Info page content barrel.
 * Prefer `import { … } from "@/data"` in app routes.
 */
export { policyPages } from "./policies";
export { aboutPage } from "./about";
export { contactPage } from "./contact";
export { sizeGuidePage } from "./size-guide";

import { policyPages } from "./policies";

export function policyBySlug(slug: string) {
  return policyPages.find((p) => p.slug === slug);
}

export function allPolicySlugs() {
  return policyPages.map((p) => p.slug);
}

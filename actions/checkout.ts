"use server";

import { siteConfig } from "@/lib/site";

export type CheckoutSource =
  | "hero"
  | "nav"
  | "pricing"
  | "final"
  | "mobile"
  | "footer"
  | "features";

export async function buildCheckoutUrl(source: CheckoutSource) {
  const base = siteConfig.links.checkout;
  if (!base) return "/#pricing";
  try {
    const url = new URL(base);
    url.searchParams.set("utm_source", "landing");
    url.searchParams.set("utm_medium", "cta");
    url.searchParams.set("utm_campaign", "lifetime");
    url.searchParams.set("utm_content", source);
    return url.toString();
  } catch {
    return base;
  }
}

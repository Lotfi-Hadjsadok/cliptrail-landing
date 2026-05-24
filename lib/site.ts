export const siteConfig = {
  name: "ClipTrail",
  tagline: "Every copy. One trail.",
  shortTagline: "Clipboard history, beautifully tracked.",
  description:
    "Clipboard history for Mac. Download free, then unlock the full trail for $9.99 one-time in the app. No subscription.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://cliptrail.app",
  price: 9.99,
  currency: "USD",
  twitter: "@cliptrailapp",
  ogImage: "/opengraph-image",
  links: {
    checkout:
      process.env.NEXT_PUBLIC_POLAR_CHECKOUT_URL ||
      "https://buy.polar.sh/polar_cl_OAK7MkjYffDn1xZI1ff25KXII5Vz4iwzr0Js316G5y7",
    download:
      process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ||
      "https://github.com/Lotfi-Hadjsadok/Cliptrail/releases/latest/download/ClipTrail.dmg",
    support: "mailto:hello@cliptrail.app",
  },
  ga: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
};

export type SiteConfig = typeof siteConfig;

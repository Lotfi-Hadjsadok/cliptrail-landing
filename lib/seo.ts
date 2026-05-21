import type { Metadata } from "next";
import { siteConfig } from "./site";

const keywords = [
  "ClipTrail",
  "clipboard history",
  "clipboard manager mac",
  "macOS clipboard app",
  "clipboard for iPhone",
  "universal clipboard",
  "copy paste history",
  "menubar clipboard",
  "best clipboard manager mac",
  "Mac productivity app",
  "command shift V",
  "clipboard recall",
];

export function buildMetadata(): Metadata {
  const title = `${siteConfig.name}, clipboard history for Mac`;
  const description = siteConfig.description;
  const url = siteConfig.url;

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords,
    applicationName: siteConfig.name,
    authors: [{ name: "ClipTrail" }],
    creator: "ClipTrail",
    publisher: "ClipTrail",
    category: "productivity",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: "/icon", type: "image/png" }],
      apple: [{ url: "/apple-icon", type: "image/png" }],
    },
    other: {
      "apple-mobile-web-app-title": siteConfig.name,
    },
  };
}

export function softwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "macOS",
    image: `${siteConfig.url}/logo.png`,
    offers: {
      "@type": "Offer",
      price: siteConfig.price.toFixed(2),
      priceCurrency: siteConfig.currency,
      url: `${siteConfig.url}/#pricing`,
      availability: "https://schema.org/InStock",
      priceValidUntil: "2099-12-31",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
  };
}

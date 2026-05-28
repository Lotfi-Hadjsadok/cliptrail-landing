export type DownloadSource =
  | "hero"
  | "nav"
  | "pricing"
  | "final"
  | "mobile"
  | "footer"
  | "features";

export type CheckoutSource = DownloadSource;

export type CtaSource = DownloadSource | "hero_secondary";

export type NavSource = "nav" | "footer" | "hero";

export type SectionName =
  | "hero"
  | "social_proof"
  | "features"
  | "how_it_works"
  | "mac_iphone"
  | "pricing"
  | "faq"
  | "final_cta";

type GtagWindow = typeof window & {
  gtag?: (
    command: "event",
    name: string,
    params: Record<string, unknown>,
  ) => void;
};

function gtagEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag !== "function") return;
  w.gtag("event", name, params);
}

export function trackFileDownload(
  source: DownloadSource,
  linkUrl: string,
) {
  gtagEvent("file_download", {
    file_extension: "dmg",
    file_name: "ClipTrail.dmg",
    link_url: linkUrl,
    source,
  });
  trackCtaClick(source, "download");
}

export function trackCtaClick(
  source: string,
  label: string,
  extra?: Record<string, unknown>,
) {
  gtagEvent("cta_click", { source, label, ...extra });
}

export function trackBeginCheckout(
  source: CheckoutSource,
  value: number,
  currency: string,
) {
  gtagEvent("begin_checkout", {
    currency,
    value,
    items: [
      {
        item_id: "cliptrail-lifetime",
        item_name: "ClipTrail Lifetime",
        price: value,
        quantity: 1,
      },
    ],
    source,
  });
  trackCtaClick(source, "checkout");
}

export function trackNavClick(
  source: NavSource,
  destination: string,
  label?: string,
) {
  gtagEvent("nav_click", {
    source,
    destination,
    label: label ?? destination,
  });
}

export function trackFaqExpand(questionIndex: number, question: string) {
  gtagEvent("faq_expand", {
    question_index: questionIndex,
    question,
  });
}

export function trackSectionView(section: SectionName) {
  gtagEvent("section_view", { section });
}

export function trackScrollDepth(percent: number) {
  gtagEvent("scroll_depth", { percent });
}

export function trackOutboundClick(
  linkType: "email" | "page" | "external",
  url: string,
  source: "footer" | "nav",
) {
  gtagEvent("outbound_click", { link_type: linkType, url, source });
}

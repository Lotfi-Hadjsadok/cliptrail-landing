"use client";

import Link from "next/link";
import {
  trackCtaClick,
  trackNavClick,
  trackOutboundClick,
  type NavSource,
} from "@/lib/analytics";

type Props = {
  href: string;
  source: NavSource | "footer";
  label?: string;
  ctaLabel?: string;
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
};

function destinationFromHref(href: string) {
  if (href.startsWith("#")) return href.slice(1);
  if (href.startsWith("mailto:")) return "support";
  return href.replace(/^\//, "");
}

function linkTypeFromHref(href: string): "email" | "page" | "external" {
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("#") || href.startsWith("/")) return "page";
  return "external";
}

export function TrackedLink({
  href,
  source,
  label,
  ctaLabel,
  ariaLabel,
  className,
  children,
}: Props) {
  const destination = destinationFromHref(href);
  const linkType = linkTypeFromHref(href);

  const onClick = () => {
    if (ctaLabel) {
      trackCtaClick(source, ctaLabel);
    }
    if (href.startsWith("#")) {
      trackNavClick(source, destination, label);
      return;
    }
    trackOutboundClick(linkType, href, source === "hero" ? "footer" : source);
  };

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  );
}

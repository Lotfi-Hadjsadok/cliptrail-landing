"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { Wordmark } from "@/components/brand/wordmark";
import { DownloadButton } from "@/components/analytics/download-button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { cn } from "@/lib/utils";

const nav = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_6px_24px_-12px_rgba(13,27,62,0.18)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5">
        <TrackedLink
          href="#top"
          source="nav"
          label="Logo"
          className="flex items-center gap-2"
          aria-label="ClipTrail home"
        >
          <LogoMark size={40} priority />
          <Wordmark size="md" />
        </TrackedLink>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <TrackedLink
              key={item.href}
              href={item.href}
              source="nav"
              label={item.label}
              className="font-display text-sm font-bold text-ct-midnight/75 transition-colors hover:text-ct-punch"
            >
              {item.label}
            </TrackedLink>
          ))}
        </nav>
        <div className="hidden md:block">
          <DownloadButton
            source="nav"
            className="px-4 py-2 text-[13px]"
            withIcon={false}
          >
            Download ClipTrail
          </DownloadButton>
        </div>
      </div>
    </header>
  );
}

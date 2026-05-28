"use client";

import { useEffect } from "react";
import { trackScrollDepth, trackSectionView, type SectionName } from "@/lib/analytics";

const SECTIONS: { id: string; name: SectionName }[] = [
  { id: "top", name: "hero" },
  { id: "social-proof", name: "social_proof" },
  { id: "features", name: "features" },
  { id: "how", name: "how_it_works" },
  { id: "mac-iphone", name: "mac_iphone" },
  { id: "pricing", name: "pricing" },
  { id: "faq", name: "faq" },
  { id: "final", name: "final_cta" },
];

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

export function PageAnalytics() {
  useEffect(() => {
    const seenSections = new Set<SectionName>();
    const seenDepths = new Set<number>();

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const match = SECTIONS.find(({ id }) => entry.target.id === id);
          if (!match || seenSections.has(match.name)) continue;
          seenSections.add(match.name);
          trackSectionView(match.name);
        }
      },
      { threshold: 0.35 },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    }

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !seenDepths.has(milestone)) {
          seenDepths.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}

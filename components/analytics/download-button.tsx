"use client";

import { Download } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export type DownloadSource =
  | "hero"
  | "nav"
  | "pricing"
  | "final"
  | "mobile"
  | "footer"
  | "features";

type GtagWindow = typeof window & {
  gtag?: (
    command: "event",
    name: string,
    params: Record<string, unknown>,
  ) => void;
};

function fireDownloadClick(source: DownloadSource) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag !== "function") return;
  w.gtag("event", "file_download", {
    file_extension: "dmg",
    file_name: "ClipTrail.dmg",
    link_url: siteConfig.links.download,
    source,
  });
  w.gtag("event", "cta_click", { source, label: "download" });
}

type Props = {
  source: DownloadSource;
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  withIcon?: boolean;
  ariaLabel?: string;
};

export function DownloadButton({
  source,
  className,
  children,
  variant = "primary",
  withIcon = true,
  ariaLabel = "Download ClipTrail for Mac",
}: Props) {
  return (
    <a
      href={siteConfig.links.download}
      onClick={() => fireDownloadClick(source)}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px]",
        variant === "primary" ? "ct-cta" : "ct-cta-ghost",
        className,
      )}
    >
      <span>{children}</span>
      {withIcon ? (
        <Download size={18} strokeWidth={2.5} className="shrink-0" />
      ) : null}
    </a>
  );
}

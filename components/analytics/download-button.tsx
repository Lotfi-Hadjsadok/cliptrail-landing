"use client";

import { Download } from "lucide-react";
import { trackFileDownload, type DownloadSource } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export type { DownloadSource } from "@/lib/analytics";

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
      onClick={() =>
        trackFileDownload(source, siteConfig.links.download)
      }
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

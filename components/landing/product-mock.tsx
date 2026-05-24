"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Search,
  Image as ImageIcon,
  X,
  Sparkles,
  Smartphone,
  Globe,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { cn } from "@/lib/utils";

type Phase = "trail" | "search" | "filter" | "iphone" | "paste";

type ClipItem = {
  id: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  title: string;
  time: string;
  category: "url" | "code" | "email" | "phone" | "image" | "text";
  device?: "mac" | "iphone";
  sourceApp?: string;
  sourceUrl?: string;
  mono?: boolean;
};

const BASE_CLIPS: ClipItem[] = [
  {
    id: "1",
    badge: "URL",
    badgeBg: "#BBDEFB",
    badgeColor: "#0D47A1",
    title: "checkout.stripe.com/pay/cs_live_…",
    time: "2s ago",
    category: "url",
    device: "mac",
    sourceApp: "Safari",
    sourceUrl: "stripe.com",
  },
  {
    id: "2",
    badge: "CODE",
    badgeBg: "#B2DFDB",
    badgeColor: "#004D40",
    title: "const trail = clips.filter(Boolean)",
    time: "18s ago",
    category: "code",
    device: "mac",
    sourceApp: "VS Code",
    mono: true,
  },
  {
    id: "3",
    badge: "EMAIL",
    badgeBg: "#E1BEE7",
    badgeColor: "#4A148C",
    title: "alex@cliptrail.app",
    time: "1m ago",
    category: "email",
    device: "mac",
    sourceApp: "Mail",
  },
  {
    id: "4",
    badge: "IMG",
    badgeBg: "#B2EBF2",
    badgeColor: "#006064",
    title: "screenshot pricing page.png",
    time: "3m ago",
    category: "image",
    device: "mac",
    sourceApp: "Preview",
  },
];

const IPHONE_CLIP: ClipItem = {
  id: "iphone",
  badge: "PHONE",
  badgeBg: "#C8E6C9",
  badgeColor: "#1B5E20",
  title: "+1 (415) 555-0199",
  time: "just now",
  category: "phone",
  device: "iphone",
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "url", label: "Links" },
  { id: "code", label: "Code" },
  { id: "image", label: "Images" },
  { id: "email", label: "Emails" },
] as const;

const PHASE_MS: Record<Phase, number> = {
  trail: 2400,
  search: 3200,
  filter: 2600,
  iphone: 2600,
  paste: 3000,
};

const PHASES: Phase[] = ["trail", "search", "filter", "iphone", "paste"];

export function ProductMock() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("trail");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [iphoneArrived, setIphoneArrived] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pasted, setPasted] = useState(false);

  useEffect(() => {
    const idx = PHASES.indexOf(phase);
    const timer = setTimeout(() => {
      setPhase(PHASES[(idx + 1) % PHASES.length]);
    }, PHASE_MS[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "trail") {
      setSearchQuery("");
      setActiveFilter("all");
      setIphoneArrived(false);
      setCopiedId(null);
      setPasted(false);
      return;
    }

    if (phase === "search") {
      setActiveFilter("all");
      setIphoneArrived(false);
      setCopiedId(null);
      setPasted(false);
      const target = "stripe";
      let i = 0;
      setSearchQuery("");
      const interval = setInterval(() => {
        i += 1;
        setSearchQuery(target.slice(0, i));
        if (i >= target.length) clearInterval(interval);
      }, 110);
      return () => clearInterval(interval);
    }

    if (phase === "filter") {
      setSearchQuery("");
      setActiveFilter("url");
      setIphoneArrived(false);
      setCopiedId(null);
      setPasted(false);
      return;
    }

    if (phase === "iphone") {
      setSearchQuery("");
      setActiveFilter("all");
      setCopiedId(null);
      setPasted(false);
      const t = setTimeout(() => setIphoneArrived(true), 400);
      return () => clearTimeout(t);
    }

    if (phase === "paste") {
      setSearchQuery("");
      setActiveFilter("all");
      setIphoneArrived(true);
      setCopiedId("1");
      const t = setTimeout(() => setPasted(true), 900);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const clips = useMemo(() => {
    const list = iphoneArrived ? [IPHONE_CLIP, ...BASE_CLIPS] : BASE_CLIPS;
    return list.filter((clip) => {
      if (activeFilter !== "all" && clip.category !== activeFilter) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        clip.title.toLowerCase().includes(q) ||
        clip.sourceUrl?.toLowerCase().includes(q) ||
        clip.sourceApp?.toLowerCase().includes(q)
      );
    });
  }, [activeFilter, searchQuery, iphoneArrived]);

  const phaseLabel = {
    trail: "Your trail",
    search: "Search",
    filter: "Filter by type",
    iphone: "iPhone copy",
    paste: "Instant paste",
  }[phase];

  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-ct-lemon/30 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 bottom-10 h-32 w-32 rounded-full bg-ct-blueberry/35 blur-3xl"
      />

      <TrailDots />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="ct-floater relative mx-auto flex w-full max-w-[420px] flex-col"
      >
        <div className="ct-fl-header relative z-10 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="h-11 w-11 shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
              <LogoMark size={44} />
            </div>
            <span className="font-display text-[15px] font-black tracking-[-0.02em] text-white">
              ClipTrail
            </span>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white/90">
            <X size={14} strokeWidth={2.5} />
          </div>
        </div>

        <div className="px-3 pt-3">
          <div
            className={cn(
              "ct-search-box flex items-center gap-2 transition-shadow duration-300",
              phase === "search" && "ring-2 ring-ct-punch/25",
            )}
          >
            <Search size={14} className="shrink-0 text-ct-grape" />
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-[12px] font-semibold",
                searchQuery ? "text-ct-midnight" : "text-ct-grape/70",
              )}
            >
              {searchQuery || "Search your trail…"}
              {phase === "search" && !reduce ? (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-px inline-block h-[13px] w-px bg-ct-punch align-middle"
                />
              ) : null}
            </span>
            <span className="ml-auto shrink-0 rounded-md bg-white/70 px-1.5 py-0.5 font-display text-[10px] font-extrabold text-ct-grape">
              ⌘⇧V
            </span>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto px-3 pt-3 [scrollbar-width:none]">
          {FILTERS.map((f) => (
            <motion.span
              key={f.id}
              layout
              className={cn(
                "ct-category-badge shrink-0 transition-colors duration-300",
                activeFilter === f.id ? "ct-chip-on" : "ct-chip-off",
              )}
              animate={
                phase === "filter" && f.id === "url" && !reduce
                  ? { scale: [1, 1.08, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.35 }}
            >
              {f.label}
            </motion.span>
          ))}
        </div>

        <div className="relative min-h-[280px] space-y-1.5 px-3 pb-16 pt-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {clips.map((clip) => (
              <motion.div
                key={clip.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative px-2.5 py-2",
                  copiedId === clip.id || (phase === "paste" && clip.id === "1")
                    ? "ct-item-hi"
                    : "ct-item-plain",
                )}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className="ct-category-badge mt-0.5 shrink-0"
                    style={{
                      background: clip.badgeBg,
                      color: clip.badgeColor,
                    }}
                  >
                    {clip.badge === "IMG" ? (
                      <ImageIcon size={11} strokeWidth={2.5} />
                    ) : (
                      clip.badge
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "truncate text-[12px] font-bold text-ct-midnight",
                        clip.mono && "font-mono text-[11px] font-semibold",
                      )}
                    >
                      {clip.title}
                    </p>
                    <ClipMeta clip={clip} />
                  </div>
                  {copiedId === clip.id ? (
                    <motion.span
                      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="shrink-0 rounded-full bg-ct-spearmint-soft px-2 py-1 font-display text-[9px] font-extrabold tracking-wide text-ct-spearmint-text"
                    >
                      ✓ COPIED
                    </motion.span>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {clips.length === 0 ? (
            <div className="rounded-2xl bg-ct-lavender-light px-4 py-8 text-center text-[12px] font-semibold text-ct-muted">
              No clips match. Try another filter.
            </div>
          ) : null}
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="ct-fl-footer flex items-center justify-between">
            <span className="font-display text-[11px] font-extrabold text-ct-grape">
              {iphoneArrived ? "48 clips" : "47 clips"}
            </span>
            <span className="inline-flex items-center gap-1 font-display text-[10px] font-extrabold text-ct-spearmint-text">
              <Sparkles size={10} strokeWidth={2.5} />
              {phaseLabel}
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {pasted ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            className="pointer-events-none absolute -right-1 top-[38%] flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-[0_18px_40px_-12px_rgba(13,27,62,0.35)] ring-1 ring-ct-midnight/5"
          >
            <span className="ct-kbd-pill text-[11px]">⌘⇧V</span>
            <span className="font-display text-xs font-extrabold text-ct-grape">
              pasted into Safari
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ClipMeta({ clip }: { clip: ClipItem }) {
  return (
    <p className="mt-0.5 flex min-w-0 flex-wrap items-center gap-1 text-[10px] font-semibold leading-none text-ct-dim">
      <span className="shrink-0">{clip.time}</span>
      {clip.device === "iphone" ? (
        <>
          <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-blue-50 px-1.5 py-px font-bold text-blue-500">
            <Smartphone size={8} strokeWidth={2.5} />
            iPhone
          </span>
        </>
      ) : (
        <>
          {clip.sourceApp ? (
            <>
              <span className="max-w-[72px] shrink truncate rounded-full bg-ct-lavender-light px-1.5 py-px text-ct-muted ring-1 ring-ct-lavender-mid/30">
                {clip.sourceApp}
              </span>
            </>
          ) : null}
          {clip.sourceUrl ? (
            <>
              <span className="inline-flex max-w-[96px] min-w-0 shrink items-center gap-1 truncate rounded-full bg-ct-lavender-light py-px pr-1.5 pl-1 text-ct-lavender-text ring-1 ring-ct-lavender-mid/35">
                <Globe size={9} strokeWidth={2.5} className="shrink-0" />
                <span className="truncate">{clip.sourceUrl}</span>
              </span>
            </>
          ) : null}
        </>
      )}
    </p>
  );
}

function TrailDots() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2"
    >
      <div className="flex items-center gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-ct-punch"
            initial={{ opacity: 0.2, scale: 0.7 }}
            animate={
              reduce
                ? { opacity: 0.4 }
                : { opacity: [0.2, 1, 0.2], scale: [0.7, 1.1, 0.7] }
            }
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

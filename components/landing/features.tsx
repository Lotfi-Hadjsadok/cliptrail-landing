"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  History,
  Search,
  Zap,
  Smartphone,
  Lock,
  Tag,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
  tint: string;
  color: string;
};

const FEATURES: Feature[] = [
  {
    icon: History,
    title: "Full history",
    body: "Every copy lands in your trail: text, code, links, images. Nothing slips.",
    tint: "var(--ct-punch-soft)",
    color: "var(--ct-punch)",
  },
  {
    icon: Search,
    title: "Smart search",
    body: "Find that snippet from three hours ago in two keystrokes.",
    tint: "var(--ct-lemon-soft)",
    color: "var(--ct-lemon-text)",
  },
  {
    icon: Zap,
    title: "Instant paste",
    body: "Hit ⌘⇧V, pick a clip, it pastes right where you were typing.",
    tint: "var(--ct-spearmint-soft)",
    color: "var(--ct-spearmint-text)",
  },
  {
    icon: Smartphone,
    title: "Mac + iPhone",
    body: "Copies from your phone show up on your Mac. Same trail, both devices.",
    tint: "var(--ct-blueberry-soft)",
    color: "var(--ct-punch-text)",
  },
  {
    icon: Tag,
    title: "Auto-categories",
    body: "Links, code, images, emails, sorted the moment you copy them.",
    tint: "#FFF3E0",
    color: "#BF360C",
  },
  {
    icon: Lock,
    title: "Local & private",
    body: "Your trail lives on your Mac. Cards and passwords are masked.",
    tint: "#EDE7F6",
    color: "#4527A0",
  },
];

export function Features() {
  const reduce = useReducedMotion();
  return (
    <section id="features" className="relative mx-auto w-full max-w-6xl px-5 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ct-punch">
          What you get
        </p>
        <h2 className="font-display mt-3 text-4xl font-black tracking-[-0.02em] text-ct-midnight md:text-5xl">
          A clipboard with a memory.
        </h2>
        <p className="mt-4 text-lg text-ct-body">
          ClipTrail watches every copy and keeps it tidy, so you can stop tab
          hopping and start trailing.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_2px_0_rgba(13,27,62,0.04),0_20px_40px_-24px_rgba(13,27,62,0.18)] ring-1 ring-ct-midnight/[0.04] transition-transform duration-300 hover:-translate-y-1"
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{ background: f.tint }}
            >
              <f.icon size={20} strokeWidth={2.4} style={{ color: f.color }} />
            </div>
            <h3 className="font-display mt-4 text-xl font-black text-ct-midnight">
              {f.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ct-body">
              {f.body}
            </p>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: f.tint }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

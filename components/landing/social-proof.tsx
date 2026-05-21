"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";

const QUOTES = [
  {
    quote: "Saved 47 clips on my first day. I have no idea how I worked without it.",
    name: "Maya R.",
    role: "Designer · NYC",
  },
  {
    quote: "Hit ⌘⇧V, type two letters, paste. That’s the whole product. It’s perfect.",
    name: "Daniel K.",
    role: "Indie dev",
  },
  {
    quote: "Finally a clipboard app that doesn’t feel like enterprise software.",
    name: "Priya S.",
    role: "PM · remote",
  },
];

export function SocialProof() {
  const reduce = useReducedMotion();
  return (
    <section className="relative mx-auto w-full max-w-6xl px-5 pb-4 pt-2 md:pb-6">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-ct-muted">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              size={16}
              strokeWidth={2.4}
              className="text-ct-lemon"
              fill="var(--ct-lemon)"
            />
          ))}
          <span className="ml-1 font-display font-extrabold text-ct-midnight">
            4.9
          </span>
          <span>from early users</span>
        </div>
        <span className="hidden h-3 w-px bg-ct-midnight/15 md:inline-block" />
        <span>Trusted by people who copy too much</span>
        <span className="hidden h-3 w-px bg-ct-midnight/15 md:inline-block" />
        <span>Built in public · Made for Mac</span>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-white p-6 ring-1 ring-ct-midnight/[0.05]"
          >
            <blockquote className="text-[15px] font-semibold leading-relaxed text-ct-body">
              “{q.quote}”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2 text-xs font-semibold text-ct-muted">
              <span className="font-display font-extrabold text-ct-midnight">
                {q.name}
              </span>
              <span aria-hidden>·</span>
              <span>{q.role}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

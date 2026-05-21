"use client";

import { motion, useReducedMotion } from "motion/react";
import { Copy, Command, MousePointerClick } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Copy,
    title: "Copy anything",
    body: "Code, a link, an email, a screenshot. ClipTrail catches it.",
  },
  {
    n: "02",
    icon: Command,
    title: "Hit ⌘⇧V",
    body: "Your trail appears, sorted and searchable. Type to filter.",
  },
  {
    n: "03",
    icon: MousePointerClick,
    title: "Paste back",
    body: "Pick a clip. It pastes right where you were working.",
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();
  return (
    <section id="how" className="relative mx-auto w-full max-w-6xl px-5 py-20 md:py-24">
      <div className="max-w-2xl">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ct-spearmint-text">
          How it works
        </p>
        <h2 className="font-display mt-3 text-4xl font-black tracking-[-0.02em] text-ct-midnight md:text-5xl">
          Three steps. No tab hunting.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-ct-midnight/[0.04]"
          >
            <span className="font-display text-[64px] font-black leading-none text-ct-lavender">
              {s.n}
            </span>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ct-punch-soft text-ct-punch">
                <s.icon size={20} strokeWidth={2.4} />
              </span>
              <h3 className="font-display text-xl font-black text-ct-midnight">
                {s.title}
              </h3>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-ct-body">
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { Smartphone, Laptop, ArrowRight } from "lucide-react";

export function MacIphone() {
  const reduce = useReducedMotion();
  return (
    <section className="relative mx-auto w-full max-w-6xl px-5 py-20 md:py-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-ct-punch via-[#1976D2] to-ct-grape px-6 py-14 text-white md:px-14 md:py-20"
      >
        <div aria-hidden className="ct-grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay" />

        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-ct-lemon/20 blur-3xl"
        />

        <div className="relative grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-white/80">
              Mac + iPhone
            </p>
            <h2 className="font-display mt-3 text-4xl font-black tracking-[-0.02em] md:text-5xl">
              Your copies, everywhere you work.
            </h2>
            <p className="mt-4 max-w-xl text-lg font-semibold text-white/85">
              Copy a link on your phone, paste it on your Mac seconds later.
              ClipTrail tags every clip by source, so you always know where it
              came from.
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-[15px] font-semibold text-white/85">
              <li>Universal Clipboard, finally browseable</li>
              <li>Source app + browser tab captured automatically</li>
              <li>One trail for both devices</li>
            </ul>
          </div>

          <div className="relative flex items-center justify-center gap-6">
            <DeviceTile
              icon={<Smartphone size={28} strokeWidth={2.3} />}
              label="iPhone"
              sub="copied a link"
            />
            <ArrowRight
              size={28}
              strokeWidth={2.5}
              className="text-white/80 ct-float"
            />
            <DeviceTile
              icon={<Laptop size={28} strokeWidth={2.3} />}
              label="Mac"
              sub="paste anywhere"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function DeviceTile({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex w-[112px] flex-col items-center gap-2 rounded-3xl bg-white/15 px-3 py-4 text-center backdrop-blur-md ring-1 ring-white/20">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white">
        {icon}
      </span>
      <span className="font-display text-sm font-extrabold">{label}</span>
      <span className="text-[11px] font-semibold text-white/75">{sub}</span>
    </div>
  );
}

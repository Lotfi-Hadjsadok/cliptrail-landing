"use client";

import { motion, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/brand/logo-mark";
import { Wordmark } from "@/components/brand/wordmark";
import { DownloadButton } from "@/components/analytics/download-button";

export function FinalCTA() {
  const reduce = useReducedMotion();
  return (
    <section id="final" className="relative mx-auto w-full max-w-6xl px-5 py-20 md:py-28">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[36px] bg-ct-midnight px-6 py-16 text-center text-white md:px-16 md:py-20"
      >
        <div aria-hidden className="ct-grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-ct-punch/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-ct-lemon/30 blur-3xl"
        />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <div className="ct-float flex items-center gap-3">
            <LogoMark size={56} />
            <Wordmark size="lg" invert />
          </div>
          <h2 className="font-display mt-6 text-4xl font-black tracking-[-0.02em] md:text-5xl">
            Stop switching tabs.
            <br />
            <span className="text-ct-lemon">Start trailing.</span>
          </h2>
          <p className="mt-4 max-w-lg text-lg font-semibold text-white/80">
            $9.99 once. Yours forever. Mac &amp; iPhone clipboard history, the
            way it should have always worked.
          </p>
          <div className="mt-8">
            <DownloadButton source="final" className="px-8 py-4 text-[16px]">
              Download ClipTrail
            </DownloadButton>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/55">
            Free download. $9.99 lifetime license in-app. macOS 13+
          </p>
        </div>
      </motion.div>
    </section>
  );
}

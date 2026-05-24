"use client";

import { motion, useReducedMotion } from "motion/react";
import { Apple, Sparkles } from "lucide-react";
import { ProductMock } from "./product-mock";
import { DownloadButton } from "@/components/analytics/download-button";

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      className="ct-canvas relative overflow-hidden pt-10 md:pt-16"
    >
      <div aria-hidden className="ct-grain pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-20 md:grid-cols-[1.05fr_1fr] md:gap-10 md:pb-28 lg:gap-16">
        <div>
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-ct-punch-soft px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.12em] text-ct-punch shadow-[inset_0_0_0_1px_rgba(21,101,192,0.22)]"
          >
            <Sparkles size={12} strokeWidth={2.6} className="text-ct-punch" />
            Lifetime $9.99
          </motion.span>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-5 text-[44px] font-black leading-[1.02] tracking-[-0.03em] text-ct-midnight md:text-[64px] lg:text-[72px]"
          >
            Every copy.
            <br />
            <span className="text-ct-punch">One trail.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-ct-body md:text-xl"
          >
            Mac &amp; iPhone clipboard history. Search, recall, paste. Stop
            switching tabs. Start trailing.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <DownloadButton source="hero" className="px-7 py-4 text-[16px]">
              Download ClipTrail
            </DownloadButton>
            <a
              href="#how"
              className="ct-cta-ghost inline-flex items-center justify-center px-6 py-4 text-[15px]"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-ct-muted"
          >
            <span className="inline-flex items-center gap-1.5">
              <Apple size={14} className="text-ct-midnight" /> macOS menubar app
            </span>
            <span className="hidden h-3 w-px bg-ct-midnight/15 md:inline-block" />
            <span>Free download. Pay in-app when ready.</span>
            <span className="hidden h-3 w-px bg-ct-midnight/15 md:inline-block" />
            <span>Your trail stays on your Mac.</span>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[460px] md:mx-0"
        >
          <ProductMock />
        </motion.div>
      </div>
    </section>
  );
}

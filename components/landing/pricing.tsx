"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { CheckoutButton } from "@/components/analytics/checkout-button";
import { siteConfig } from "@/lib/site";

const INCLUDES = [
  "Unlimited clipboard history",
  "Smart search & auto-categories",
  "⌘⇧V instant paste",
  "Mac + iPhone with Universal Clipboard",
  "Source app & browser tab capture",
  "Local storage. Your trail stays on your Mac",
  "Lifetime updates",
];

export function Pricing() {
  const reduce = useReducedMotion();
  return (
    <section
      id="pricing"
      className="relative mx-auto w-full max-w-6xl px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ct-punch">
          Pricing
        </p>
        <h2 className="font-display mt-3 text-4xl font-black tracking-[-0.02em] text-ct-midnight md:text-5xl">
          Pay once. Trail forever.
        </h2>
        <p className="mt-4 text-lg text-ct-body">
          No subscriptions. No “Pro” tier. Just one fair price for the whole app.
        </p>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-14 max-w-md"
      >
        <div
          aria-hidden
          className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-br from-ct-lemon/35 via-ct-blueberry/30 to-ct-punch/30 blur-2xl"
        />
        <div className="relative overflow-hidden rounded-[32px] bg-white p-8 shadow-[0_30px_60px_-20px_rgba(13,27,62,0.25)] ring-1 ring-ct-midnight/[0.06]">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ct-punch-soft px-3 py-1 font-display text-[10px] font-extrabold uppercase tracking-[0.12em] text-ct-punch">
              <Sparkles size={11} strokeWidth={2.6} className="ct-pulse" />
              Lifetime
            </span>
            <span className="font-display text-xs font-extrabold uppercase tracking-[0.12em] text-ct-muted">
              one-time
            </span>
          </div>

          <div className="mt-6 flex items-end gap-2">
            <span className="font-display text-[72px] font-black leading-none tracking-[-0.04em] text-ct-midnight">
              $9.99
            </span>
            <span className="mb-3 text-sm font-bold text-ct-muted">
              USD, forever
            </span>
          </div>

          <p className="mt-2 text-sm font-semibold text-ct-body">
            Less than two coffees. Cheaper than a month of any subscription
            clipboard app.
          </p>

          <ul className="mt-6 space-y-3">
            {INCLUDES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] font-semibold text-ct-body"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ct-spearmint-soft text-ct-spearmint-text">
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <CheckoutButton
              source="pricing"
              className="w-full px-7 py-4 text-[16px]"
            >
              Get ClipTrail $9.99
            </CheckoutButton>
            <p className="mt-3 text-center text-xs font-semibold text-ct-muted">
              Opens secure checkout. macOS 13+. Instant license.
            </p>
            <p className="mt-2 text-center text-xs font-semibold text-ct-muted">
              Already purchased?{" "}
              <a
                href={siteConfig.links.download}
                className="text-ct-punch underline decoration-ct-punch/30 underline-offset-2 transition-colors hover:text-ct-midnight"
              >
                Download ClipTrail.dmg
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

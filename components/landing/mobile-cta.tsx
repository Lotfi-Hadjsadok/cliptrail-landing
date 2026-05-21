"use client";

import { CheckoutButton } from "@/components/analytics/checkout-button";

export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ct-midnight/10 bg-white/90 px-4 py-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="font-display text-lg font-black text-ct-midnight">
            $9.99
          </p>
          <p className="text-[11px] font-semibold text-ct-muted">
            Lifetime one-time
          </p>
        </div>
        <CheckoutButton
          source="mobile"
          className="px-5 py-3 text-[14px]"
          withArrow={false}
        >
          Get ClipTrail
        </CheckoutButton>
      </div>
    </div>
  );
}

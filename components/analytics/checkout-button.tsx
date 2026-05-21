"use client";

import { useActionState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { buildCheckoutUrl, type CheckoutSource } from "@/actions/checkout";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type GtagWindow = typeof window & {
  gtag?: (
    command: "event",
    name: string,
    params: Record<string, unknown>,
  ) => void;
};

function fireBeginCheckout(source: CheckoutSource) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag !== "function") return;
  w.gtag("event", "begin_checkout", {
    currency: siteConfig.currency,
    value: siteConfig.price,
    items: [
      {
        item_id: "cliptrail-lifetime",
        item_name: "ClipTrail Lifetime",
        price: siteConfig.price,
        quantity: 1,
      },
    ],
    source,
  });
  w.gtag("event", "cta_click", { source, label: "checkout" });
}

type Props = {
  source: CheckoutSource;
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  withArrow?: boolean;
  ariaLabel?: string;
};

type State = { url: string | null };

export function CheckoutButton({
  source,
  className,
  children,
  variant = "primary",
  withArrow = true,
  ariaLabel,
}: Props) {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_prev, formData) => {
      const src = (formData.get("source") as CheckoutSource) || source;
      const url = await buildCheckoutUrl(src);
      return { url };
    },
    { url: null },
  );

  useEffect(() => {
    if (state.url) {
      window.location.href = state.url;
    }
  }, [state.url]);

  return (
    <form action={formAction}>
      <input type="hidden" name="source" value={source} />
      <button
        type="submit"
        onClick={() => fireBeginCheckout(source)}
        disabled={isPending}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px]",
          variant === "primary" ? "ct-cta" : "ct-cta-ghost",
          isPending && "opacity-80",
          className,
        )}
      >
        {isPending ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            <span>{children}</span>
            {withArrow ? (
              <ArrowRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform"
              />
            ) : null}
          </>
        )}
      </button>
    </form>
  );
}

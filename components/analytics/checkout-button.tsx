"use client";

import { useActionState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { buildCheckoutUrl, type CheckoutSource } from "@/actions/checkout";
import { trackBeginCheckout } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

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
        onClick={() =>
          trackBeginCheckout(source, siteConfig.price, siteConfig.currency)
        }
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

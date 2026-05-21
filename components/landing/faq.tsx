"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { faqJsonLd } from "@/lib/seo";

export const FAQ_ITEMS = [
  {
    question: "What does ClipTrail do?",
    answer:
      "ClipTrail is a Mac menubar app that remembers everything you copy: links, code, images, emails, snippets. Hit ⌘⇧V, search your trail, and paste any past clip back into the app you were using.",
  },
  {
    question: "Does it work with iPhone?",
    answer:
      "Yes. If you have Universal Clipboard turned on, copies from your iPhone land in your ClipTrail on Mac, tagged by source so you always know where they came from.",
  },
  {
    question: "Is it really lifetime for $9.99?",
    answer:
      "Yes. One payment, $9.99 USD. No subscription, no upsell, no Pro tier. You get the app and all future updates.",
  },
  {
    question: "Where is my clipboard data stored?",
    answer:
      "Locally on your Mac, in a private SQLite database. ClipTrail does not upload your clipboard to a server. Cards and passwords are auto-detected and masked.",
  },
  {
    question: "What macOS version do I need?",
    answer:
      "ClipTrail is built for macOS 13 (Ventura) and newer. It runs as a tiny menubar app with no dock icon unless you want one.",
  },
  {
    question: "How do I activate my license?",
    answer:
      "After checkout you receive a license key by email. Paste it into ClipTrail’s “Activate license” screen and your trail unlocks instantly.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "If ClipTrail isn’t for you, email hello@cliptrail.app within 14 days and we’ll refund. No scripts, no friction.",
  },
];

export function FAQ() {
  const jsonLd = faqJsonLd(FAQ_ITEMS);

  return (
    <section id="faq" className="relative mx-auto w-full max-w-3xl px-5 py-20 md:py-24">
      <div className="text-center">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ct-spearmint-text">
          FAQ
        </p>
        <h2 className="font-display mt-3 text-4xl font-black tracking-[-0.02em] text-ct-midnight md:text-5xl">
          Quick answers.
        </h2>
      </div>

      <Accordion.Root
        type="single"
        collapsible
        className="mt-10 divide-y divide-ct-midnight/[0.06] overflow-hidden rounded-3xl bg-white ring-1 ring-ct-midnight/[0.05]"
      >
        {FAQ_ITEMS.map((item, i) => (
          <Accordion.Item key={i} value={`item-${i}`}>
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-extrabold text-ct-midnight transition-colors hover:text-ct-punch [&[data-state=open]]:text-ct-punch">
                <span>{item.question}</span>
                <Plus
                  size={18}
                  strokeWidth={2.5}
                  className="shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-[15px] font-medium leading-relaxed text-ct-body data-[state=closed]:animate-faq-up data-[state=open]:animate-faq-down">
              <p className="px-6 pb-5">{item.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}

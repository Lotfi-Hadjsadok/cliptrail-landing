# ClipTrail landing page

Conversion-focused landing for **ClipTrail**, the macOS menubar clipboard
history app. Built with Next.js 16 (App Router), React 19, Tailwind v4,
Motion and Radix.

> Every copy. One trail. $9.99 lifetime, no subscription.

## Stack

- **Next.js 16** App Router (server components, server actions, file-based metadata)
- **Tailwind CSS v4** with ClipTrail design tokens mirrored from the desktop app
- **Motion (`motion/react`)** for hero / scroll animations
- **Radix Accordion** for the FAQ
- **`@next/third-parties`** for Google Analytics 4
- **Polar** as the checkout provider

## Getting started

```bash
cp .env.example .env.local
# fill in your values
npm install
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

| Variable | What it does |
|----------|--------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used in metadata, OG tags, `robots.txt`, sitemap |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (e.g. `G-XXXXXXXXXX`). Empty disables analytics. |
| `NEXT_PUBLIC_POLAR_CHECKOUT_URL` | Polar checkout link for the $9.99 lifetime offer |

Set these in Vercel project settings as well (Production + Preview).

## Conversion events

All purchase CTAs go through [`components/analytics/checkout-button.tsx`](components/analytics/checkout-button.tsx),
which:

1. Fires GA4 `begin_checkout` (with `value: 9.99` and `currency: USD`)
2. Fires a `cta_click` event with the source slot (`hero`, `pricing`, `nav`,
   `final`, `mobile`)
3. Calls the `buildCheckoutUrl` server action which appends UTM params
   (`utm_source=landing`, `utm_medium=cta`, `utm_campaign=lifetime`,
   `utm_content=<source>`)
4. Redirects to the Polar checkout

In **Google Analytics 4 → Admin → Events**, mark `begin_checkout` as a
**Key event** so Google Ads can optimise toward it. The `value` and
`currency` fields make this work with GA4 ecommerce / Google Ads value-based
bidding out of the box.

## SEO

| File | Purpose |
|------|---------|
| [`app/layout.tsx`](app/layout.tsx) | Metadata, JSON-LD (`SoftwareApplication`, `Organization`), GA |
| [`app/robots.ts`](app/robots.ts) | `robots.txt` |
| [`app/sitemap.ts`](app/sitemap.ts) | `sitemap.xml` |
| [`app/opengraph-image.tsx`](app/opengraph-image.tsx) | Dynamic OG / Twitter card |
| [`app/icon.png`](app/icon.png) / [`app/apple-icon.png`](app/apple-icon.png) | Favicons from the real ClipTrail logo |
| [`components/landing/faq.tsx`](components/landing/faq.tsx) | Inline `FAQPage` JSON-LD |

## AI SEO (`llms.txt`)

- [`public/llms.txt`](public/llms.txt): concise machine-readable summary for
  LLM crawlers
- [`public/llms-full.txt`](public/llms-full.txt): extended product facts,
  voice guide and forbidden phrasing for AI answer engines

Linked from the footer under **For AI**.

## Brand assets

- Logo lives at [`public/logo.png`](public/logo.png), copied from the
  ClipTrail desktop app (`assets/logo.png`).
- Brand tokens are mirrored from the app's `src/renderer/styles/globals.css`
  into [`app/globals.css`](app/globals.css).
- Wordmark splits `Clip` (punch blue) / `Trail` (grape blue) in Nunito 900.

## Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel: push to a Vercel-linked repo and set the three env
vars in the project dashboard.

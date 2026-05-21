import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { Wordmark } from "@/components/brand/wordmark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-ct-midnight/5 bg-white/50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <LogoMark size={38} />
            <Wordmark size="md" />
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ct-body">
            Mac &amp; iPhone clipboard history. Search, recall, paste. Built
            for people who copy a lot.
          </p>
        </div>

        <FooterCol title="Product">
          <FooterLink href="#features">Features</FooterLink>
          <FooterLink href="#how">How it works</FooterLink>
          <FooterLink href="#pricing">Pricing</FooterLink>
          <FooterLink href="#faq">FAQ</FooterLink>
        </FooterCol>

        <FooterCol title="Company">
          <FooterLink href="mailto:hello@cliptrail.app">Support</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/terms">Terms</FooterLink>
        </FooterCol>

        <FooterCol title="For AI">
          <FooterLink href="/llms.txt">llms.txt</FooterLink>
          <FooterLink href="/llms-full.txt">llms-full.txt</FooterLink>
          <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
        </FooterCol>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between border-t border-ct-midnight/5 px-5 py-5 text-xs text-ct-muted">
        <p>© {year} ClipTrail. Built for Mac.</p>
        <p className="font-display font-bold">Stop switching tabs. Start trailing.</p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="font-display text-xs font-extrabold uppercase tracking-[0.12em] text-ct-grape">
        {title}
      </h4>
      <ul className="mt-3 space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-ct-body transition-colors hover:text-ct-punch"
      >
        {children}
      </Link>
    </li>
  );
}

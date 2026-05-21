import type { Metadata, Viewport } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { buildMetadata, softwareJsonLd, organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#1565C0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [softwareJsonLd(), organizationJsonLd()];
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${nunitoSans.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-ct-cream text-ct-midnight">
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {siteConfig.ga ? <GoogleAnalytics gaId={siteConfig.ga} /> : null}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Baloo_Bhai_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/content/site";
import { IS_DEV } from "@/lib/utils";
import { hasPublic } from "@/lib/assets";
import { Sprite } from "@/components/ui";
import { PreviewToggle } from "@/components/client";

const baloo = Baloo_Bhai_2({ subsets: ["latin", "gujarati"], weight: "800", variable: "--font-baloo", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-jakarta", display: "swap" });

const TITLE = "Taazu | Amdavad's own electrolyte drink";

function icons(): Metadata["icons"] {
  const b = SITE.brand;
  const icon: { url: string; type?: string; sizes?: string }[] = [];
  if (hasPublic(b.favicon)) icon.push({ url: b.favicon, sizes: "any" });
  if (hasPublic(b.icon)) icon.push({ url: b.icon, type: b.icon.endsWith(".svg") ? "image/svg+xml" : "image/png" });
  const apple = hasPublic(b.appleIcon) ? [{ url: b.appleIcon, sizes: "180x180" }] : [];
  return { icon: icon, apple: apple };
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: { default: TITLE, template: "%s | Taazu" },
  description: SITE.metaDescription,
  applicationName: "Taazu",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Taazu", title: TITLE, description: SITE.metaDescription, locale: "en_IN" },
  twitter: { card: "summary_large_image", title: TITLE, description: SITE.metaDescription },
  icons: icons(),
};

export const viewport: Viewport = { themeColor: "#EA580C", width: "device-width", initialScale: 1 };

function jsonLd() {
  const sameAs = [SITE.social.instagram, SITE.social.youtube, SITE.social.googleBusiness].filter((s) => s !== "");
  const org: Record<string, unknown> = {
    "@type": "Organization",
    name: "Taazu",
    legalName: SITE.legalName,
    url: SITE.siteUrl,
    slogan: "Paani se aage.",
    areaServed: "Ahmedabad, Gujarat, India",
    address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
    contactPoint: { "@type": "ContactPoint", telephone: "+" + SITE.whatsapp, contactType: "sales", availableLanguage: ["English", "Hindi", "Gujarati"] },
  };
  if (hasPublic(SITE.brand.icon)) org.logo = SITE.siteUrl + SITE.brand.icon;
  if (sameAs.length) org.sameAs = sameAs;
  const products: Record<string, unknown>[] = SITE.flavours
    .filter((f) => f.show)
    .map((f) => ({
      "@type": "Product",
      name: "Taazu " + f.name,
      category: "Electrolyte drink",
      description: "A still " + f.name.toLowerCase() + " electrolyte drink made in Ahmedabad.",
      brand: { "@type": "Brand", name: "Taazu" },
    }));
  return { "@context": "https://schema.org", "@graph": [org].concat(products) };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={baloo.variable + " " + jakarta.variable} suppressHydrationWarning>
      <body>
        <Script id="js-flag" strategy="beforeInteractive">{"document.documentElement.classList.add('js');"}</Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
        <Sprite />
        {children}
        {IS_DEV ? <PreviewToggle /> : null}
        {SITE.ga4Id ? (
          <>
            <Script src={"https://www.googletagmanager.com/gtag/js?id=" + SITE.ga4Id} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','" + SITE.ga4Id + "');"}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { event } from "@/config/event";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || event.website;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${event.name} | ${event.dates.display}, ${event.venue.fullLocation}`,
    template: `%s | ${event.shortName}`,
  },
  description: `${event.descriptor}. ${event.dates.display} at ${event.venue.fullLocation}. ${event.brandLines.main}`,
  keywords: [
    "Tanzania construction exhibition",
    "building exhibition Tanzania",
    "construction expo Tanzania",
    "building materials exhibition Tanzania",
    "construction machinery expo Tanzania",
    "Dar es Salaam construction exhibition",
    "Tanzania Buildcon",
    "Tanzania Buildcon International Expo",
  ],
  openGraph: {
    type: "website",
    siteName: event.name,
    title: event.name,
    description: event.descriptor,
    url: siteUrl,
    images: [{ url: "/images/og/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: event.name,
    description: event.descriptor,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: event.name,
    url: siteUrl,
    logo: `${siteUrl}/logos/tanzania-buildcon-logo.png`,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: event.name,
    url: siteUrl,
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-white text-brand-dark"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
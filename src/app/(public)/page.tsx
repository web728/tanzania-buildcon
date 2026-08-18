import type { Metadata } from "next";
import { event } from "@/config/event";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { WhyTanzaniaSection } from "@/components/sections/home/WhyTanzaniaSection";
import { ExhibitionProfileSection } from "@/components/sections/home/ExhibitionProfileSection";
import { WhyExhibitSection } from "@/components/sections/home/WhyExhibitSection";
import { WhoWillYouMeetSection } from "@/components/sections/home/WhoWillYouMeetSection";
import { ExhibitorDirectoryPreviewSection } from "@/components/sections/home/ExhibitorDirectoryPreviewSection";
import { VenueSection } from "@/components/sections/home/VenueSection";
import { PartnersSection } from "@/components/sections/home/PartnersSection";
import { NewsSection } from "@/components/sections/home/NewsSection";
import { FinalCtaSection } from "@/components/sections/home/FinalCtaSection";
import { HeroStatsSection } from "@/components/sections/home/HeroStatsSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: `Tanzania Buildcon International Expo 2027 | Premium Construction & Building Trade Show`,
  },
  description: `Join Tanzania Buildcon International Expo 2027 — East Africa's premier building material, construction technology, heavy equipment, and interior trade show held from ${event.dates.display} at ${event.venue.fullLocation}. Book your exhibition stand today.`,
  keywords: [
    "Tanzania Buildcon 2027",
    "Tanzania Buildcon International Expo 2027",
    "Construction Expo Tanzania 2027",
    "Building Materials Exhibition Dar es Salaam",
    "East Africa Construction Trade Show",
    "Heavy Machinery Trade Fair Africa",
    "Architecture and Design Expo Tanzania",
    "Exhibiting in Tanzania Construction Sector",
  ],
  alternates: {
    canonical: event.website || "/",
  },
  openGraph: {
    title: `Tanzania Buildcon International Expo 2027 | Premier Building Expo`,
    description: `Connect with 200+ global brands, contractors, and decision-makers in Dar es Salaam, Tanzania. Discover the future of construction and infrastructure in East Africa.`,
    url: event.website || "/",
    siteName: "Tanzania Buildcon Expo",
    images: [
      {
        url: `${event.website}/images/og-tanzania-buildcon-2027.jpg`,
        width: 1200,
        height: 630,
        alt: "Tanzania Buildcon International Expo 2027 Exhibition Hall",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Tanzania Buildcon International Expo 2027`,
    description: `East Africa's biggest construction trade event in Dar es Salaam. Explore machinery, interior, building materials & mega projects.`,
    images: [`${event.website}/images/og-tanzania-buildcon-2027.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  const siteUrl = event.website || "https://tanzaniabuildcon.com";

  // Comprehensive Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "@id": `${siteUrl}/#event`,
        name: "Tanzania Buildcon International Expo 2027",
        alternateName: "Tanzania Buildcon 2027",
        description: event.descriptor || "Tanzania Buildcon International Expo 2027 is the leading building materials, architecture, interior design, and heavy machinery exhibition in East Africa.",
        startDate: event.dates.start,
        endDate: event.dates.end,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        url: siteUrl,
        image: [`${siteUrl}/images/og-tanzania-buildcon-2027.jpg`],
        location: {
          "@type": "Place",
          name: event.venue.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: (event.venue as { address?: string }).address || "Diamond Jubilee Hall",
            addressLocality: event.venue.city || "Dar es Salaam",
            addressCountry: event.venue.country || "TZ",
          },
        },
        organizer: event.organisers.map((o) => ({
          "@type": "Organization",
          name: o.name,
          url: o.url || siteUrl,
        })),
        offers: [
          {
            "@type": "Offer",
            name: "Visitor Registration",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/register`,
            validFrom: "2026-01-01",
          },
          {
            "@type": "Offer",
            name: "Exhibitor Booth Space Booking",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/exhibit`,
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: event.name,
        url: siteUrl,
        logo: `${siteUrl}/logos/tanzania-buildcon-logo.png`,
        sameAs: [
          event.social.linkedin,
          event.social.facebook,
          event.social.instagram,
          event.social.twitter,
          event.social.youtube,
        ].filter(Boolean),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="flex flex-col min-h-screen">
        <HeroSection />
        <HeroStatsSection />
        <IntroSection />
        <WhyTanzaniaSection />
        <ExhibitionProfileSection />
        <WhyExhibitSection />
        <WhoWillYouMeetSection />
        <ExhibitorDirectoryPreviewSection />
        <VenueSection />
        <PartnersSection />
        <NewsSection />
        <FinalCtaSection />
      </main>
    </>
  );
}
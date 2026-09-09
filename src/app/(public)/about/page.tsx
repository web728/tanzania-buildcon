import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { AboutClientView } from "@/components/about/AboutClientView";

export const metadata: Metadata = {
  title: "About the Expo | Tanzania Buildcon 2027",
  description: `Tanzania Buildcon International Expo 2027 is the premier international B2B trade exhibition connecting global manufacturers with East Africa's construction buyers, held from ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Connecting Global Manufacturers with East African Construction"
        intro="The definitive international B2B platform connecting building material producers, equipment makers, and technology providers with verified trade buyers across Tanzania."
        image={{
          src: "/images/sectors/crane-machinery.jpg",
          alt: "Tanzania Buildcon International Expo Overview",
        }}
      />

      <AboutClientView />
    </main>
  );
}
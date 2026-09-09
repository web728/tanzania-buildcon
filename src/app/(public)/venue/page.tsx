import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VenueClientView } from "@/components/about/VenueClientView";

export const metadata: Metadata = {
  title: "Venue & Location | Diamond Jubilee Hall, Dar es Salaam",
  description: `${event.venue.fullLocation} hosts Tanzania Buildcon International Expo 2027 from ${event.dates.display}. Explore floor access, venue parameters, and city connectivity.`,
  alternates: { canonical: "/venue" },
};

export default function VenuePage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Official Exhibition Venue"
        intro={`${event.venue.name} · ${event.venue.city}, Tanzania · ${event.dates.display}`}
        image={{
          src: "/images/venue/building-exterior.jpg",
          alt: `${event.venue.name} Exhibition Facility`,
        }}
      />

      <VenueClientView/>
    </main>
  );
}
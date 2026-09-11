import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ContactClientView } from "@/components/sections/ContactClientView";

export const metadata: Metadata = {
  title: "Contact Us | Exhibition Enquiries & Support | Tanzania Buildcon 2027",
  description: `Get in touch with the ${event.name} organizing secretariat for booth bookings, international participation, and visitor assistance.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Direct Communication & Secretariat Desk"
        intro="Connect directly with our international exhibition team in India and Tanzania for booth bookings, delegation partnerships, or visitor enquiries."
        image={{
          src: "/images/venue/building-exterior.jpg",
          alt: "Tanzania Buildcon Secretariat Contact Desk",
        }}
      />

      <ContactClientView />
    </main>
  );
}
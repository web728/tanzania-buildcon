import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { TargetIcon, HandshakeIcon, CompassIcon, LinkIcon } from "@/components/icons/MiscIcons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${event.name} team — exhibitor enquiries, international participation, visitor enquiries and general enquiries.`,
  alternates: { canonical: "/contact" },
};

const CONTACT_AREAS = [
  { ...event.contact.exhibitorEnquiries, icon: TargetIcon },
  { ...event.contact.internationalParticipation, icon: HandshakeIcon },
  { ...event.contact.visitorEnquiries, icon: CompassIcon },
  { ...event.contact.general, icon: LinkIcon },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Get in Touch" intro="Reach the right team for your enquiry." />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_AREAS.map((area) => (
              <div key={area.label} className="rounded-xl border border-brand-border bg-brand-light p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white">
                  <area.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-sm font-bold text-brand-dark">{area.label}</p>
                <p className="mt-2 text-sm text-brand-body">{area.email}</p>
                <p className="text-sm text-brand-body">{area.phone}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-light py-20 sm:py-24">
        <Container className="max-w-2xl">
          <h2 className="text-2xl font-extrabold text-brand-dark sm:text-3xl">Send Us a Message</h2>
          <div className="mt-10">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

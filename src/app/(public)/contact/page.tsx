import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${event.name} team — exhibitor enquiries, international participation, visitor enquiries and general enquiries.`,
  alternates: { canonical: "/contact" },
};

const CONTACT_PERSONS = [
  event.contact.exhibitorEnquiries,
  event.contact.internationalParticipation,
  event.contact.visitorEnquiries,
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Get in Touch" intro="Reach out to our team for any queries." />

      {/* 1. Contact Form (Pehle Upar) */}
      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-2xl">
          <h2 className="text-2xl font-extrabold text-brand-dark sm:text-3xl text-center">
            Send Us a Message
          </h2>
          <div className="mt-8">
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* 2. Contact Details (Form ke Niche) */}
      <section className="bg-brand-light py-16 sm:py-20 border-t border-brand-border">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-brand-dark">For More Details Contact</h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {CONTACT_PERSONS.map((person, index) => (
              <div 
                key={index} 
                className="rounded-xl border border-brand-border bg-white p-6 text-center shadow-sm"
              >
                <p className="text-base font-bold text-brand-dark">{person.name}</p>
                <p className="mt-2 text-sm text-brand-body font-medium">{person.email}</p>
                <p className="mt-1 text-sm text-brand-body">{person.phone}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
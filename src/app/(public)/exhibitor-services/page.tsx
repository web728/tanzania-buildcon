import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Exhibitor Services",
  description:
    "Practical information for international exhibitors at Tanzania Buildcon International Expo — visa guidance, invitation letters, freight, stand construction and on-site services.",
  alternates: { canonical: "/exhibitor-services" },
};

const SERVICES = [
  {
    id: "visa",
    title: "Visa Information",
    body: "International exhibitors and visitors travelling to Tanzania are responsible for confirming their own visa requirements. Immigration rules can change, so please refer to the official Tanzania Immigration Department for current entry requirements before travelling.",
    link: { label: "Tanzania Immigration Department", href: "https://www.immigration.go.tz/" },
  },
  {
    id: "invitation-letter",
    title: "Invitation Letter",
    body: "Confirmed exhibitors who require an official invitation letter to support their visa application can request one, subject to organiser policies and confirmed stand booking.",
    cta: { label: "Request an Invitation Letter", href: "/contact" },
  },
  {
    id: "freight-logistics",
    title: "Freight & Logistics",
    body: "Official freight forwarding and logistics partner details for Tanzania Buildcon International Expo will be published here once confirmed by the organisers.",
    comingSoon: true,
  },
  {
    id: "stand-construction",
    title: "Stand Construction",
    body: "Exhibitors can choose between a Shell Scheme stand (built and branded by the organiser's contractor) or Raw Space (for custom-built stands). Full technical specifications are issued to confirmed exhibitors.",
  },
  {
    id: "hotels",
    title: "Hotels",
    body: "A list of recommended hotels in Dar es Salaam will be published here once confirmed by the organisers.",
    comingSoon: true,
  },
  {
    id: "exhibitor-manual",
    title: "Exhibitor Manual",
    body: "The official Exhibitor Manual — covering move-in/move-out, technical regulations and on-site logistics — will be available for download once published.",
    comingSoon: true,
  },
  {
    id: "on-site-services",
    title: "On-Site Services",
    body: "Details of on-site services available to exhibitors during build-up, show days and breakdown will be published here closer to the event.",
    comingSoon: true,
  },
];

export default function ExhibitorServicesPage() {
  return (
    <>
      <PageHero
        title="Exhibitor Services"
        intro="Practical information for exhibitors preparing for Tanzania Buildcon International Expo — from visa guidance to stand construction."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6">
            {SERVICES.map((service) => (
              <div key={service.id} id={service.id} className="scroll-mt-28 rounded-xl border border-brand-border bg-brand-light p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-extrabold text-brand-dark">{service.title}</h2>
                  {service.comingSoon ? (
                    <span className="rounded-full bg-brand-border px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-body">
                      Coming Soon
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-body">{service.body}</p>
                {service.link ? (
                  <a
                    href={service.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block py-1.5 text-sm font-semibold text-brand-blue hover:underline"
                  >
                    {service.link.label} →
                  </a>
                ) : null}
                {service.cta ? (
                  <div className="mt-4">
                    <Button href={service.cta.href} variant="ghost">
                      {service.cta.label}
                    </Button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button href={event.cta.bookStand} size="lg">
              Book Your Stand
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

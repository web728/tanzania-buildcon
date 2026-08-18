import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { PartnerEnquiryForm } from "@/components/forms/PartnerEnquiryForm";
import { getActivePartners } from "@/lib/data/partners";

// MongoDB-backed — must reflect admin publish/unpublish immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partners",
  description: "Supporting organisations, association partners, industry partners and media partners of Tanzania Buildcon International Expo.",
  alternates: { canonical: "/partners" },
};

const CATEGORIES = ["Supporting Organisation", "Association Partner", "Industry Partner", "Media Partner"] as const;

export default async function PartnersPage() {
  const partners = await getActivePartners();
  const byCategory = CATEGORIES.map((cat) => ({
    category: cat,
    items: partners.filter((p) => p.category === cat),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <PageHero
        title="Industry Partners"
        intro="Organisations supporting Tanzania Buildcon International Expo."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          {byCategory.length === 0 ? (
            <EmptyState
              title="Partner Announcements Coming Soon"
              body="Confirmed industry, association and media partners will be listed here as they are announced."
            />
          ) : (
            <div className="flex flex-col gap-14">
              {byCategory.map((group) => (
                <div key={group.category}>
                  <h2 className="text-lg font-extrabold text-brand-dark">{group.category}s</h2>
                  <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                    {group.items.map((partner) => (
                      <PartnerLogo key={partner._id} partner={partner} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-brand-light py-20 sm:py-24">
        <Container className="max-w-2xl">
          <SectionHeading title="Partnership Enquiry" />
          <div className="mt-10">
            <PartnerEnquiryForm />
          </div>
        </Container>
      </section>
    </>
  );
}

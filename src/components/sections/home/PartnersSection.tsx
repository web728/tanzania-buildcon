import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { SectionMotif } from "@/components/brand/SectionMotif";
import { getActivePartners } from "@/lib/data/partners";

export async function PartnersSection() {
  const partners = await getActivePartners();
  if (!partners || partners.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-slate-50/60 py-20 sm:py-28 border-t border-slate-200/60">
      
      {/* Background Decor */}
      <SectionMotif position="top-right" size="md" opacity={0.04} />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            Official Support & Alliances
          </div>

          <SectionHeading
            title="Industry Partners & Associations"
            intro="Supported by leading trade bodies, government ministries, and construction sector associations."
            align="center"
            className="mt-3 [&>h2]:text-3xl sm:[&>h2]:text-4xl [&>h2]:font-extrabold [&>p]:text-slate-600"
          />
        </div>

        {/* Responsive Grid Layout */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {partners.map((partner) => (
            <PartnerLogo key={partner._id || partner.name} partner={partner} />
          ))}
        </div>

        {/* Partnership Callout Banner */}
        <div className="mt-12 text-center text-xs sm:text-sm text-slate-500">
          Interested in becoming an official media or industry partner?{" "}
          <a href="/contact" className="font-bold text-brand-blue underline decoration-brand-blue/30 underline-offset-4 hover:decoration-brand-blue">
            Partner with us →
          </a>
        </div>

      </Container>
    </section>
  );
}
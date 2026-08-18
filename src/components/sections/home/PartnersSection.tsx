import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { getActivePartners } from "@/lib/data/partners";

export async function PartnersSection() {
  const partners = await getActivePartners();
  if (partners.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading title="Industry Partners" align="center" className="mx-auto" />
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((partner) => (
            <PartnerLogo key={partner._id} partner={partner} />
          ))}
        </div>
      </Container>
    </section>
  );
}

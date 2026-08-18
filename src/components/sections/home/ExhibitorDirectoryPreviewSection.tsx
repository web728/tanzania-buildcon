import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ExhibitorCard } from "@/components/ui/ExhibitorCard";
import { getFeaturedExhibitors } from "@/lib/data/exhibitors";

export async function ExhibitorDirectoryPreviewSection() {
  const exhibitors = await getFeaturedExhibitors();
  if (exhibitors.length === 0) return null;

  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHeading title="Meet the Participating Companies" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {exhibitors.map((exhibitor) => (
            <ExhibitorCard key={exhibitor._id} exhibitor={exhibitor} />
          ))}
        </div>

        <div className="mt-12">
          <Button href="/exhibitors" variant="ghost">
            View All Exhibitors
          </Button>
        </div>
      </Container>
    </section>
  );
}

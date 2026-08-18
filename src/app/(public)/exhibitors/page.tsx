import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { ExhibitorDirectory } from "@/components/sections/ExhibitorDirectory";
import { getPublishedExhibitors } from "@/lib/data/exhibitors";

// MongoDB-backed — must reflect admin publish/unpublish immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Exhibitors",
  description: "Browse confirmed construction suppliers Tanzania and building material suppliers Tanzania trusts, exhibiting at Tanzania Buildcon International Expo, by company, product or country.",
  alternates: { canonical: "/exhibitors" },
};

export default async function ExhibitorsPage() {
  const exhibitors = await getPublishedExhibitors();

  return (
    <>
      <PageHero
        title="Meet the Participating Companies"
        intro="Manufacturers, exporters and suppliers confirmed to exhibit at Tanzania Buildcon International Expo."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          {exhibitors.length === 0 ? (
            <EmptyState
              title="Exhibitor Announcements Coming Soon"
              body="Exhibitor announcements will appear here as participation is confirmed."
            />
          ) : (
            <ExhibitorDirectory exhibitors={exhibitors} />
          )}
        </Container>
      </section>
    </>
  );
}

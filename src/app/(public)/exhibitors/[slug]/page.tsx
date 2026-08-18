import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getExhibitorBySlug } from "@/lib/data/exhibitors";

// MongoDB-backed — must reflect admin publish/unpublish immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exhibitor = await getExhibitorBySlug(slug);
  if (!exhibitor) return { title: "Exhibitor Not Found" };
  return {
    title: exhibitor.companyName,
    description: exhibitor.shortDescription || `${exhibitor.companyName} — exhibiting at Tanzania Buildcon International Expo.`,
    alternates: { canonical: `/exhibitors/${slug}` },
  };
}

export default async function ExhibitorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exhibitor = await getExhibitorBySlug(slug);
  if (!exhibitor) notFound();

  return (
    <section className="bg-white">
      <Breadcrumb items={[{ label: "Exhibitors", href: "/exhibitors" }, { label: exhibitor.companyName }]} />
      <Container className="max-w-4xl py-20 sm:py-24">
        <div className="flex flex-col gap-8 border-b border-brand-border pb-8 sm:flex-row sm:items-center">
          {exhibitor.logoUrl ? (
            <div className="relative h-20 w-40 flex-shrink-0">
              <Image src={exhibitor.logoUrl} alt={exhibitor.companyName} fill className="object-contain object-left" />
            </div>
          ) : null}
          <div>
            <h1 className="text-2xl font-extrabold text-brand-dark sm:text-3xl">{exhibitor.companyName}</h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-brand-blue">
              {exhibitor.category}
            </p>
            <p className="mt-1 text-sm text-brand-body">
              {exhibitor.country}
              {exhibitor.standNumber ? ` · Stand ${exhibitor.standNumber}` : ""}
            </p>
          </div>
        </div>

        {exhibitor.shortDescription ? (
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-brand-body">{exhibitor.shortDescription}</p>
        ) : null}

        {exhibitor.products && exhibitor.products.length > 0 ? (
          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-body">Products</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {exhibitor.products.map((p) => (
                <span key={p} className="rounded-full bg-brand-light px-3 py-1.5 text-xs font-medium text-brand-dark">
                  {p}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-4">
          {exhibitor.website ? (
            <Button href={exhibitor.website} variant="ghost" external>
              Visit Website
            </Button>
          ) : null}
          {exhibitor.brochureUrl ? (
            <Button href={exhibitor.brochureUrl} variant="ghost" external>
              Download Brochure
            </Button>
          ) : null}
          <Button href="/exhibitors" variant="ghost">
            Back to All Exhibitors
          </Button>
        </div>
      </Container>
    </section>
  );
}

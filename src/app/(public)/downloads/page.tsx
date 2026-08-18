import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublishedDownloads } from "@/lib/data/downloads";

// MongoDB-backed — must reflect admin publish/unpublish immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Exhibition brochure, exhibitor application, floor plan and other downloads for Tanzania Buildcon International Expo.",
  alternates: { canonical: "/downloads" },
};

export default async function DownloadsPage() {
  const downloads = await getPublishedDownloads();

  return (
    <>
      <PageHero title="Downloads" intro="Brochure, floor plan, exhibitor manual and other event resources." />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          {downloads.length === 0 ? (
            <EmptyState
              title="Downloads Coming Soon"
              body="The exhibition brochure, floor plan, exhibitor manual and other resources will be published here as they become available."
            />
          ) : (
            <div className="flex flex-col divide-y divide-brand-border rounded-xl border border-brand-border">
              {downloads.map((d) => (
                <a
                  key={d._id}
                  href={d.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 p-6 hover:bg-brand-light"
                >
                  <div>
                    <p className="text-base font-bold text-brand-dark">{d.title}</p>
                    {d.description ? <p className="mt-1 text-sm text-brand-body">{d.description}</p> : null}
                  </div>
                  <span className="flex-shrink-0 text-sm font-semibold text-brand-blue">Download →</span>
                </a>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

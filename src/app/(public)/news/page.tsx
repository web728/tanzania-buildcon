import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { NewsCard } from "@/components/ui/NewsCard";
import { getPublishedNews } from "@/lib/data/news";
import { event } from "@/config/event";

// MongoDB-backed — must reflect admin publish/unpublish immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News",
  description: "Exhibitor news, show updates, industry updates and partner news from Tanzania Buildcon International Expo.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const news = await getPublishedNews();

  return (
    <>
      <PageHero
        title="News & Updates"
        intro="Exhibitor announcements, show updates and industry news for Tanzania Buildcon International Expo."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          {news.length === 0 ? (
            <EmptyState
              title="News Coming Soon"
              body="Show updates, exhibitor announcements and industry news will be published here as the event approaches."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Contact Section */}
      <section className="border-t border-slate-200/80 bg-slate-50/60 py-14 sm:py-16">
        <Container>
          <div className="text-center pb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-blue">
              Media & General Enquiries
            </span>
            <h3 className="mt-1.5 text-xl sm:text-2xl font-extrabold tracking-tight text-brand-dark">
              Contact Our Organising Team
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {event.contactList.map((c) => {
              const isFuturex = c.company === "Futurex Group";

              return (
                <div
                  key={c.email}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                 
                  <p className="mt-3 text-base font-bold text-brand-dark">{c.name}</p>

                  <div className="mt-4 flex flex-col gap-2 text-xs font-semibold text-slate-700">
                    <a
                      href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
                      className="tabular-nums transition-colors hover:text-brand-green"
                    >
                      {c.phone}
                    </a>
                    <a
                      href={`mailto:${c.email}`}
                      className="truncate transition-colors hover:text-brand-blue"
                    >
                      {c.email}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
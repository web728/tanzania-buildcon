import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ExhibitorCard } from "@/components/ui/ExhibitorCard";
import { SectionMotif } from "@/components/brand/SectionMotif";
import { getFeaturedExhibitors } from "@/lib/data/exhibitors";

export async function ExhibitorDirectoryPreviewSection() {
  const exhibitors = await getFeaturedExhibitors();
  if (!exhibitors || exhibitors.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 sm:py-32">
      
      {/* Background Decor Motifs */}
      <SectionMotif position="top-right" size="lg" opacity={0.05} />

      <Container className="relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
              Exhibitor Directory Preview
            </div>

            <SectionHeading
              title="Meet the Participating Companies"
              intro="Discover leading international manufacturers, local suppliers, and technology providers showcasing building solutions at BuildExpo Tanzania."
              className="mt-4 [&>h2]:text-3xl sm:[&>h2]:text-4xl lg:[&>h2]:text-5xl [&>h2]:font-extrabold [&>p]:text-slate-600"
            />
          </div>

          <div className="shrink-0">
            <Button href="/exhibitors" size="md" className="shadow-lg shadow-brand-blue/15">
              Browse Full Directory →
            </Button>
          </div>
        </div>

        {/* Exhibitors Responsive Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {exhibitors.map((exhibitor, index) => (
            <ExhibitorCard
              key={exhibitor._id || exhibitor.slug}
              exhibitor={exhibitor}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Want your company featured in the directory?</h4>
              <p className="text-xs sm:text-sm text-slate-500">Book your stand now to list your brand before trade buyers arrive.</p>
            </div>
          </div>

          <Button href="/book-a-stand" variant="secondary" size="md" className="shrink-0 w-full sm:w-auto">
            Become an Exhibitor
          </Button>
        </div>

      </Container>
    </section>
  );
}
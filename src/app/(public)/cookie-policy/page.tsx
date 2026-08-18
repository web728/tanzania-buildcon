import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${event.website}.`,
  alternates: { canonical: "/cookie-policy" },
};

const COOKIE_TYPES = [
  {
    name: "Essential",
    body: "Required for the website to function — such as remembering your cookie preferences and maintaining secure sessions in the admin area. These cannot be disabled.",
  },
  {
    name: "Analytics",
    body: "Help us understand how visitors use the site (e.g. Google Analytics) so we can improve content and performance. Only loaded with your consent.",
  },
  {
    name: "Marketing",
    body: "Used to measure the effectiveness of marketing campaigns (e.g. Meta Pixel, LinkedIn Insight Tag). Only loaded with your consent.",
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero title="Cookie Policy" />
      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-sm leading-relaxed text-brand-body">
            {event.websiteDisplay} uses cookies to operate correctly and, with your consent, to
            understand site usage and measure marketing performance. You can manage your
            preferences at any time using the cookie banner.
          </p>

          <div className="mt-10 flex flex-col divide-y divide-brand-border rounded-xl border border-brand-border">
            {COOKIE_TYPES.map((c) => (
              <div key={c.name} className="p-6">
                <p className="text-base font-bold text-brand-dark">{c.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-body">{c.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs text-brand-body/70">Last updated: 14 August 2026.</p>
        </Container>
      </section>
    </>
  );
}

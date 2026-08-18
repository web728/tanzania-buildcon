import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { visitorGroupIconMap } from "@/components/icons/MiscIcons";
import { visitorGroups } from "@/data/visitorProfile";

export const metadata: Metadata = {
  title: "Who Should Visit",
  description:
    "Contractors, developers, architects, engineers, importers, distributors and procurement professionals — the trade visitor profile for Tanzania Buildcon International Expo.",
  alternates: { canonical: "/who-should-visit" },
};

export default function WhoShouldVisitPage() {
  return (
    <>
      <PageHero
        title="The People Who Buy, Build, Specify & Source"
        intro={`${event.name} is designed for professionals involved in construction, procurement, project development, distribution and product specification.`}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {visitorGroups.map((group) => {
              const Icon = visitorGroupIconMap[group.slug];
              return (
                <div key={group.slug} className="rounded-xl border border-brand-border bg-brand-light p-7">
                  <div className="flex items-center gap-3">
                    {Icon ? (
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-brand-blue text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                    ) : null}
                    <h2 className="text-lg font-extrabold text-brand-dark">{group.name}</h2>
                  </div>
                  <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {group.roles.map((role) => (
                      <li key={role} className="text-sm text-brand-body">
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <Button href={event.cta.registerVisit} size="lg">
              Register to Visit
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

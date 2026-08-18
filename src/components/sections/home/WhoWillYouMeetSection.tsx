import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { VisitorGroupCard } from "@/components/ui/VisitorGroupCard";
import { SectionMotif } from "@/components/brand/SectionMotif";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { visitorGroups } from "@/data/visitorProfile";

export function WhoWillYouMeetSection() {
  return (
    <section className="relative overflow-hidden bg-brand-light py-24 sm:py-28">
      <SectionMotif position="top-right" size="md" opacity={0.06} />
      <Container className="relative z-10">
        <SectionHeading
          title="The People Who Buy, Build, Specify & Source"
          align="center"
          className="mx-auto"
        />

        <ScrollReveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visitorGroups.map((group) => (
            <VisitorGroupCard key={group.slug} group={group} />
          ))}
        </ScrollReveal>

        <div className="mt-12 text-center">
          <Button href="/who-should-visit" variant="ghost">
            View Trade Visitor Profile
          </Button>
        </div>
      </Container>
    </section>
  );
}

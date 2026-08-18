import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { BookStandForm } from "@/components/forms/BookStandForm";

export const metadata: Metadata = {
  title: "Book a Stand",
  description: `Reserve your exhibition space at ${event.name}, ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/book-a-stand" },
};

export default function BookAStandPage() {
  return (
    <>
      <PageHero
        title="Book Your Stand"
        intro={event.brandLines.exhibitor}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <BookStandForm />
        </Container>
      </section>
    </>
  );
}

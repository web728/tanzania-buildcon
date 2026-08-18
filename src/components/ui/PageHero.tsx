import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeroMotif } from "@/components/brand/PageHeroMotif";

export function PageHero({
  title,
  intro,
  image,
}: {
  title: string;
  intro?: string;
  /** Optional background photograph, blended behind the motif and a dark gradient. */
  image?: { src: string; alt: string };
}) {
  return (
    <section className="relative overflow-hidden bg-brand-dark py-20 text-white sm:py-24">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <PageHeroMotif />
      <Container className="relative z-10">
        <h1 className="max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>
        ) : null}
      </Container>
    </section>
  );
}

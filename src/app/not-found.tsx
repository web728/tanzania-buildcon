import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandMotif } from "@/components/brand/BrandMotif";
import { event } from "@/config/event";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative flex-1 overflow-hidden bg-brand-dark py-32 text-white">
        <div className="pointer-events-none absolute -right-20 top-1/2 h-[520px] w-[520px] -translate-y-1/2">
          <BrandMotif variant="half" position="right" opacity={0.15} className="h-full w-full" />
        </div>
        <Container className="relative z-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-green">404</p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight">
            Page Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/" size="lg">Back to Home</Button>
            <Button href={event.cta.bookStand} variant="outline" size="lg">Book a Stand</Button>
            <Button href={event.cta.registerVisit} variant="outline" size="lg">Register to Visit</Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

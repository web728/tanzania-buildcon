import Image from "next/image";
import Link from "next/link";
import { event } from "@/config/event";
import { footerNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { BrandMotif } from "@/components/brand/BrandMotif";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { OrganiserLogos } from "@/components/ui/OrganiserLogos";

// Icon components mapped for Social links
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  facebook: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
    </svg>
  ),
  instagram: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  twitter: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

const SOCIAL_LINKS = [
  { key: "linkedin", label: "LinkedIn", href: event.social.linkedin },
  { key: "facebook", label: "Facebook", href: event.social.facebook },
  { key: "instagram", label: "Instagram", href: event.social.instagram },
  { key: "twitter", label: "X (Twitter)", href: event.social.twitter },
  { key: "youtube", label: "YouTube", href: event.social.youtube },
].filter((link) => Boolean(link.href));

function FooterColumn({ title, links }: { title: string; links?: { label: string; href: string }[] }) {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex flex-col">
      <h3 className="text-xs font-bold uppercase tracking-widest text-brand-blue">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-block text-sm text-white/70 transition-colors duration-150 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 rounded"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const organiserNames = event.organisers?.map((org) => org.name).join(" & ") || "";

  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white pt-16 pb-12">
      {/* Background Decorative Motif */}
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-[450px] w-[450px] select-none opacity-20">
        <BrandMotif variant="half" position="right" opacity={0.15} rotation={6} className="h-full w-full" />
      </div>

      <Container className="relative z-10">
        {/* Brand Header Section (Prominent Large Logo & Event Info) */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-10 border-b border-white/10 gap-6">
          <div className="max-w-2xl">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src="/logos/Tanzania-Logo.png"
                alt={event.name}
                width={500}
                height={160}
                priority
                className="w-64 sm:w-80 lg:w-96 h-auto object-contain object-left"
              />
            </Link>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/80">{event.descriptor}</p>
          </div>

          {/* Social Links Badge Block */}
          {SOCIAL_LINKS.length > 0 && (
            <div className="flex flex-col gap-3 lg:items-end">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Follow Our Updates</span>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:bg-brand-blue/20 hover:text-white"
                  >
                    {SOCIAL_ICONS[s.key] || s.label[0]}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Grid Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 py-12">
          <FooterColumn title="Event" links={footerNav.event} />
          <FooterColumn title="Exhibit" links={footerNav.exhibit} />
          <FooterColumn title="Visit" links={footerNav.visit} />
          <FooterColumn title="Information" links={footerNav.information} />
          <FooterColumn title="Legal" links={footerNav.legal} />
        </div>

        {/* Organisers Card Banner (Dedicated Prominent Display) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue mb-1">
                Official Event Organisers
              </span>
              <h3 className="text-lg font-bold text-white">{event.name}</h3>
              <p className="mt-1 text-sm text-white/70">
                {event.dates.display} · {event.venue.fullLocation}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-t border-white/10 pt-4 lg:border-t-0 lg:pt-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/50 sm:hidden">
                Jointly Organised By
              </span>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10 inline-flex items-center justify-center">
                <OrganiserLogos onDark boxClassName="h-12 w-36 sm:h-14 sm:w-44" />
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Callout Banner */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3 className="text-base font-bold uppercase tracking-wider text-white">Stay Informed</h3>
              <p className="mt-1 text-sm text-white/70">
                Subscribe for exhibitor announcements, floor plans, and exclusive show updates for {event.shortName}{" "}
                {event.edition}.
              </p>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[380px]">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {event.name}. {organiserNames ? `Jointly organised by ${organiserNames}.` : ""}{" "}
            All rights reserved.
          </p>
          <p>Tanzania Buildcon International Expo</p>
        </div>
      </Container>
    </footer>
  );
}
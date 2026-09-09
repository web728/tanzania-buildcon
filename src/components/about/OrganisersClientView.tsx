"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Exact data and stats directly from Brochure Page 04
const ORGANISERS_DATA = [
  {
    name: "FUTUREX TRADE FAIR & EVENTS PVT. LTD.",
    tagline: "Let's Build the Future Together",
    hq: "New Delhi, India",
    established: "Est. 2011",
    url: "https://www.futurextrade.com/",
    logo: "/logos/futurex-logo.png",
    description:
      "An international exhibition organiser headquartered in New Delhi, India. Operating since 2011, Futurex's portfolio spans 220+ international trade exhibitions across industrial sectors including building, infrastructure, agriculture, and power.",
    pills: ["220+ Expos", "16,500+ Exhibitors", "25,800+ Brands", "950K+ Visitors"],
  },
  {
    name: "EXHIBITIONS & TRADE SERVICES INDIA PVT. LTD.",
    tagline: "ETSIPL • Global Trade Facilitation",
    hq: "Navi Mumbai, India",
    established: "ISO 9001:2015",
    url: "https://www.etsipl.in/",
    logo: "/logos/etsipl-logo.png",
    description:
      "Based out of Navi Mumbai, India, ETSIPL is an ISO 9001:2015 Certified organisation with 12+ years of global expertise in trade fair promotion, operating worldwide partner networks to bridge international suppliers with East Africa.",
    pills: ["12+ Years Track Record", "ISO 9001:2015 Certified", "Global Network", "East Africa Focus"],
  },
];

const CONTACT_DESKS = [
  {
    title: "Exhibition & Stand Enquiries",
    name: event.contact.exhibitorEnquiries.name,
    role: "Head of International Trade Fair Operations",
    phone: event.contact.exhibitorEnquiries.phone,
    email: event.contact.exhibitorEnquiries.email,
  },
  {
    title: "International Participation",
    name: event.contact.internationalParticipation.name,
    role: "ETSIPL Global Representation",
    phone: event.contact.internationalParticipation.phone,
    email: event.contact.internationalParticipation.email,
  },
  {
    title: "Trade Visitor & Delegation Desk",
    name: event.contact.visitorEnquiries.name,
    role: "Visitor Services & B2B Matchmaking",
    phone: event.contact.visitorEnquiries.phone,
    email: event.contact.visitorEnquiries.email,
  },
];

export function OrganisersClientView() {
  return (
    <div className="relative overflow-hidden py-10 sm:py-14 text-brand-dark">
      {/* Background Architectural Vector Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="organisers-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#organisers-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* Top Header: Balanced Titles & CTA */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-5 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/[0.06] px-3.5 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Verified Global Trade Promoters
              </span>
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] leading-tight text-brand-dark">
              International Leadership &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-sky-500 to-brand-green">
                Exhibition Pioneers
              </span>
            </h2>

            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
              {event.name} is delivered jointly by Futurex and ETSIPL, uniting global industrial networks with deep regional trade facilitation.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={event.cta.bookStand}
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(2,163,220,0.25)] transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-[0_6px_22px_rgba(2,163,220,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Exhibition Space →
            </Link>
          </div>
        </div>

        {/* Organiser Profile Cards (Futurex & ETSIPL) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          {ORGANISERS_DATA.map((org, index) => {
            const isFirst = index === 0;
            return (
              <motion.div
                key={org.name}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-brand-blue/40 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Top Header Row: Logo & Visit Link */}
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <a
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block h-11 w-36 sm:h-12 sm:w-40 transition-transform group-hover:scale-[1.02]"
                    >
                      <Image
                        src={org.logo}
                        alt={org.name}
                        fill
                        sizes="180px"
                        className="object-contain object-left"
                      />
                    </a>

                    <a
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600 transition-colors hover:border-brand-blue hover:text-brand-blue hover:bg-white"
                    >
                      <span>Website</span>
                      <span className="text-slate-400 group-hover:text-brand-blue">↗</span>
                    </a>
                  </div>

                  {/* Metadata Chips */}
                  <div className="mt-3.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>{org.hq}</span>
                    <span>&bull;</span>
                    <span className={isFirst ? "text-brand-blue" : "text-brand-green"}>
                      {org.established}
                    </span>
                  </div>

                  <h3 className="mt-1 text-sm sm:text-base font-bold tracking-tight text-brand-dark group-hover:text-brand-blue transition-colors">
                    {org.name}
                  </h3>

                  <p className="mt-2 text-xs leading-[1.65] text-slate-500 font-normal">
                    {org.description}
                  </p>

                  {/* Minimalist Micro Badges Strip (Replaces bulky stats) */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    {org.pills.map((pill) => (
                      <span
                        key={pill}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/70 bg-slate-50/80 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-colors group-hover:border-slate-300"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${isFirst ? "bg-brand-blue" : "bg-brand-green"}`} />
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Micro Footer Indicator */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-brand-blue">
                  <span>Official Joint Secretariat</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Direct Verified Contact Desks */}
        <div className="mt-12 sm:mt-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between pb-4 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Direct Communication Desks
              </span>
              <h3 className="mt-1 text-lg sm:text-2xl font-extrabold tracking-tight text-brand-dark">
                Official Organiser Representation
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Direct contacts for domestic and international participation enquiries.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3.5 md:grid-cols-3">
            {CONTACT_DESKS.map((desk) => {
              const cleanPhone = desk.phone.replace(/[^0-9+]/g, "");
              return (
                <div
                  key={desk.title}
                  className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_8px_rgb(0,0,0,0.02)] transition-all hover:border-brand-blue/40 hover:shadow-md"
                >
                  <div>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-blue">
                      {desk.title}
                    </span>

                    <h4 className="mt-2.5 text-xs sm:text-sm font-bold text-brand-dark">
                      {desk.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-normal">
                      {desk.role}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5 text-xs">
                    <a
                      href={`tel:${cleanPhone}`}
                      className="inline-flex items-center gap-1.5 font-medium text-slate-700 transition-colors hover:text-brand-green"
                    >
                      <svg className="h-3.5 w-3.5 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {desk.phone}
                    </a>

                    <a
                      href={`mailto:${desk.email}`}
                      className="inline-flex items-center gap-1.5 font-medium text-slate-700 transition-colors hover:text-brand-blue"
                    >
                      <svg className="h-3.5 w-3.5 text-brand-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {desk.email}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Booking Action Ribbon */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-brand-blue/20 bg-gradient-to-r from-brand-blue/[0.04] via-white to-brand-green/[0.04] p-4 shadow-sm">
          <div className="flex items-center gap-2.5 text-xs text-slate-600">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
            <span>
              Looking to participate or discuss commercial partnership? Stand allocation is currently active.
            </span>
          </div>

          <Link
            href={event.cta.bookStand}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-blue-dark transition-all duration-200"
          >
            Inquire for Space
          </Link>
        </div>
      </Container>
    </div>
  );
}
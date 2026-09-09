"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import { marketFacts, marketSources } from "@/data/marketFacts";

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

// 4 Strategic Growth Pillars directly from Brochure Page 01
const STRATEGIC_PILLARS = [
  {
    tag: "6.5% Growth Rate",
    title: "Building & Construction Sector Expansion",
    body: "Tanzania's building & construction activity recorded 6.5% growth in Q3 2025 (compared with 3.9% in Q3 2024), driven by high construction activity and local production of cement, iron, and steel.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    tag: "95% Trade Gateway",
    title: "Dar es Salaam Port Dominance",
    body: "Dar es Salaam Port handles approximately 95% of Tanzania's international trade, reinforcing the city's position as the principal commercial, logistics, import, and distribution hub for construction products.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    tag: "Rail & Road Corridors",
    title: "Major Infrastructure Programs",
    body: "Tanzania Railways Corporation is developing the country's Standard Gauge Railway (SGR) network, while continuing road, bridge, and utility projects generate ongoing demand for engineering machinery and systems.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    tag: "Commercial Network",
    title: "High-Volume Specifier Ecosystem",
    body: "Dar es Salaam is home to an extensive network of contractors, developers, importers, distributors, architects, engineers, and procurement professionals, making it the natural meeting point for suppliers.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

// Exact 9 Opportunity Categories from Brochure Page 01 ("Opportunities Across")
const BROCHURE_OPPORTUNITIES = [
  "Residential Development",
  "Commercial Construction",
  "Roads & Infrastructure",
  "Industrial Projects",
  "Hotels & Hospitality",
  "Factories & Warehousing",
  "Water & Utility Projects",
  "Public Infrastructure",
  "Renovation & Interior Projects",
];

export function WhyTanzaniaClientView() {
  return (
    <div className="relative overflow-hidden py-12 sm:py-16 text-brand-dark">
      {/* Background Subtle Architectural Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="market-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#market-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Header Block 1: Verified Market Facts                     */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-6 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/[0.06] px-3.5 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Verified Economic Indicators
              </span>
            </div>

            <h2 className="mt-3.5 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.12] text-brand-dark">
              Key Market Data &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-sky-500 to-brand-green">
                Growth Benchmarks
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
              Official macroeconomic data reflecting steady demand for building materials, earthmoving machinery, and specialized architectural technologies.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={event.cta.bookStand}
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(2,163,220,0.25)] transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-[0_6px_22px_rgba(2,163,220,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Stand Space →
            </Link>
          </div>
        </div>

        {/* Dynamic Facts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {marketFacts.map((fact) => (
            <motion.div key={fact.id} variants={itemVariants}>
              <StatCard fact={fact} />
            </motion.div>
          ))}
        </motion.div>

        {/* ========================================================= */}
        {/* Section 2: 4 Strategic Pillars (Brochure Match)           */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pb-5 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">
                Commercial Foundation
              </span>
              <h3 className="mt-1.5 text-xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
                Why Dar es Salaam &amp; Tanzania?
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md font-normal">
              The country&apos;s established trade logistics and logistics infrastructure make Dar es Salaam the natural commercial meeting point for suppliers.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {STRATEGIC_PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-brand-blue/40 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-dark">
                      {pillar.tag}
                    </span>

                    <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-brand-blue transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="mt-4 text-base font-bold tracking-tight text-brand-dark group-hover:text-brand-blue transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="mt-2 text-xs sm:text-sm leading-[1.7] text-slate-600 font-normal">
                    {pillar.body}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-blue">
                  <span>Brochure Market Review</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* Section 3: Exact 9 Opportunity Categories from Brochure   */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Commercial Prospects
              </span>
              <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-brand-dark">
                Opportunities Across Active Sectors
              </h3>
            </div>
            <span className="text-xs text-slate-400">9 Core Sub-Sectors</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {BROCHURE_OPPORTUNITIES.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all hover:border-brand-blue/40 hover:bg-white hover:text-brand-dark hover:shadow-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                {cat}
              </span>
            ))}
          </div>

          {/* Market Sources Strip */}
          <div className="mt-8 pt-5 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Verified Economic Reference Sources
            </span>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
              {marketSources.map((src) => (
                <span key={src.name} className="inline-flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-brand-blue hover:underline"
                    >
                      {src.name}
                    </a>
                  ) : (
                    <span className="font-medium text-slate-600">{src.name}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Booking Ribbon */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-brand-blue/20 bg-gradient-to-r from-brand-blue/[0.04] via-white to-brand-green/[0.04] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-dark">
                Position your business in East Africa&apos;s growing building market
              </h4>
              <p className="text-[11px] text-slate-500 font-normal">
                Exhibit from 25–27 August 2027 at Diamond Jubilee Hall, Dar es Salaam.
              </p>
            </div>
          </div>

          <Link
            href={event.cta.bookStand}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-blue-dark transition-all duration-200"
          >
            Book a Stand
          </Link>
        </div>
      </Container>
    </div>
  );
}
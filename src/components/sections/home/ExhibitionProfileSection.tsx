"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Grouped officially from Brochure Page 02 ("What's On Display?")
const sectorTabs = [
  {
    id: "structural",
    label: "Structural & Heavy",
    count: "4 Sectors",
    sectors: [
      {
        title: "Building Materials",
        items: "Cement, Concrete Blocks, Gypsum Boards, Roofing & Cladding",
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
        color: "blue",
      },
      {
        title: "Construction Machinery",
        items: "Earthmoving, Excavators, Concrete Batching, Cranes & Scaffolding",
        icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
        color: "green",
      },
      {
        title: "Steel & Structural Metal",
        items: "Reinforcement Steel, Pipes, Tubes, Profiles & Fabricated Units",
        icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
        color: "blue",
      },
      {
        title: "Prefab & Precast",
        items: "Modular Buildings, Precast Concrete, Structural Prefab Systems",
        icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
        color: "green",
      },
    ],
  },
  {
    id: "architectural",
    label: "Doors, Glass & Surfaces",
    count: "4 Sectors",
    sectors: [
      {
        title: "Doors, Windows & Glass",
        items: "Aluminium Profiles, uPVC Systems, Architectural Facades & Hardware",
        icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 12h16M12 4v16",
        color: "blue",
      },
      {
        title: "Tiles, Marble & Stone",
        items: "Ceramic & Porcelain, Granite, Natural Stone & Surface Finishes",
        icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
        color: "green",
      },
      {
        title: "Interiors & Finishing",
        items: "Ceilings, Wall Panels, Decorative Laminates & Wood Products",
        icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
        color: "blue",
      },
      {
        title: "Paints & Chemicals",
        items: "Decorative Paints, Waterproofing, Sealants & Concrete Admixtures",
        icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
        color: "green",
      },
    ],
  },
  {
    id: "mep",
    label: "MEP, Plumbing & Bath",
    count: "4 Sectors",
    sectors: [
      {
        title: "Water & Plumbing Pumps",
        items: "Pipes & Fittings, Water Pumps, Storage Tanks & Treatment Systems",
        icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
        color: "blue",
      },
      {
        title: "Sanitaryware & Bath",
        items: "Faucets, Showers, Bathroom Fixtures & Sanitary Ceramics",
        icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
        color: "green",
      },
      {
        title: "HVAC & Mechanical",
        items: "Air Conditioning, Ventilation, Refrigeration & Building Services",
        icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        color: "blue",
      },
      {
        title: "Hardware & Tools",
        items: "Power Tools, Fasteners, Drilling Equipment & Workshop Gear",
        icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
        color: "green",
      },
    ],
  },
  {
    id: "energy",
    label: "Electrical & Energy",
    count: "3 Sectors",
    sectors: [
      {
        title: "Electrical & Lighting",
        items: "Cables, Transformers, Switchgear, Industrial LED & Panels",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        color: "blue",
      },
      {
        title: "Solar & Energy Solutions",
        items: "Solar PV Panels, Inverters, Backup Power & Clean Energy",
        icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
        color: "green",
      },
      {
        title: "Fire, Safety & Security",
        items: "Fire Protection, Site Safety, Access Control & Surveillance",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        color: "blue",
      },
    ],
  },
];

export function ExhibitionProfileSection() {
  const [activeTab, setActiveTab] = useState(sectorTabs[0].id);
  const currentGroup = sectorTabs.find((t) => t.id === activeTab) || sectorTabs[0];

  return (
    <section className="relative overflow-hidden bg-slate-50/60 py-16 sm:py-24 text-slate-900 border-b border-slate-200/80">
      
      {/* Dynamic Background Ambient Blur */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-full max-w-7xl -translate-x-1/2 bg-gradient-to-b from-brand-blue/10 via-sky-400/5 to-transparent blur-3xl opacity-60" />

      {/* Modern Grid Blueprint Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* Header Bar Layout                                         */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3.5 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                What&apos;s On Display • 15 Industry Sectors
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Products, Machinery &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-sky-600 to-brand-green">
                Materials on Display
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
              Covering the entire building supply chain across 15 official exhibit categories with live product showcases and working machinery displays.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/exhibition-profile"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-sm transition-all duration-300 hover:border-brand-blue hover:text-brand-blue hover:shadow-md active:scale-95"
            >
              All 15 Sectors Page →
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Segment Filter Pills (Interactive Physics)               */}
        {/* ========================================================= */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {sectorTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                    : "bg-white border border-slate-200/90 text-slate-600 hover:border-brand-blue/40 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-lg px-2 py-0.5 text-[10px] font-bold transition-colors ${
                    isActive
                      ? "bg-brand-blue text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* Dynamic Animated Cards Grid                               */}
        {/* ========================================================= */}
        <div className="mt-8 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {currentGroup.sectors.map((sector, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-blue/5 hover:-translate-y-1.5"
                >
                  <div>
                    {/* Header Icon + Number Tag */}
                    <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${
                          sector.color === "blue"
                            ? "bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
                            : "bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white"
                        }`}
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={sector.icon} />
                        </svg>
                      </div>

                      <span className="text-xs font-mono font-bold tracking-wider text-slate-300 group-hover:text-slate-500 transition-colors">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Sector Title & Items */}
                    <h3 className="mt-5 text-base font-bold tracking-tight text-slate-900 group-hover:text-brand-blue transition-colors">
                      {sector.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 font-normal">
                      {sector.items}
                    </p>
                  </div>

                  {/* Micro Footer Indicator */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-blue">
                    <span>Official Exhibit</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================= */}
        {/* Booking Banner Callout                                    */}
        {/* ========================================================= */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3.5 text-xs sm:text-sm font-medium text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-green animate-pulse shrink-0" />
            <span>
              Exhibition floor space allocation is currently open for international manufacturers &amp; suppliers.
            </span>
          </div>

          <Link
            href="/book-stand"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors whitespace-nowrap shrink-0"
          >
            <span>Reserve Your Space</span>
            <span>→</span>
          </Link>
        </div>

      </Container>
    </section>
  );
}
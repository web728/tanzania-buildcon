"use client";

import { motion } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionMotif } from "@/components/brand/SectionMotif";

export function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white py-20 lg:py-28">
      {/* Background Section Motif Graphic */}
      <SectionMotif position="top-right" size="lg" opacity={0.06} />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column - Headline & Highlight Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            {/* Top Accent Sub-badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-ping" />
              Official B2B Trade Gathering
            </div>

            {/* Main Section Heading */}
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              Where East Africa's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-600 to-teal-500">
                Building & Construction
              </span>{" "}
              Industry Meets
            </h2>

            {/* Visual Highlight Quote Box */}
            <div className="mt-8 rounded-2xl border border-brand-blue/15 bg-white/80 p-6 shadow-xl shadow-brand-blue/5 backdrop-blur-sm">
              <p className="text-sm font-semibold leading-relaxed text-brand-dark">
                "Connecting global manufacturers and regional suppliers directly with high-volume buyers, contractors, and project leaders across Tanzania."
              </p>
            </div>
          </motion.div>

          {/* Right Column - Body Content & Key Highlights Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <p className="text-base sm:text-lg leading-relaxed text-slate-700">
              <strong className="font-semibold text-brand-dark">{event.name}</strong> is East Africa's flagship trade exhibition connecting international manufacturers, exporters, and suppliers with top-tier buyers, distributors, architects, and government decision-makers.
            </p>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              Taking place from <span className="font-semibold text-brand-dark">{event.dates.display}</span> at <span className="font-semibold text-brand-dark">{event.venue.fullLocation}</span>, the event creates a dedicated commercial hub to introduce innovations, seal distribution contracts, and launch major projects.
            </p>

            {/* Quick Feature Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-dark">Targeted Networking</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Connect with 10,000+ trade buyers & contractors.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-dark">Market Expansion</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Tap into Tanzania’s booming $8B+ infrastructure boom.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/about" size="md" className="shadow-md shadow-brand-blue/20">
                Explore Event Details
              </Button>
              <Button href={event.cta.bookStand} variant="secondary" size="md">
                Book a Stand
              </Button>
            </div>

          </motion.div>
        </div>
      </Container>
    </section>
  );
}
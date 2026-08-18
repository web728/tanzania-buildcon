"use client";

import { motion } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionMotif } from "@/components/brand/SectionMotif";

export function VenueSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 sm:py-32">
      
      {/* Background Decor Motifs & Blueprint Grid */}
      <SectionMotif position="top-left" size="lg" opacity={0.05} />

      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid-pattern-venue" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#000000" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-venue)" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column: Venue Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue"></span>
              </span>
              Official Event Venue
            </div>

            {/* Venue Heading */}
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-[1.15]">
              {event.venue.name}
            </h2>

            {/* Event Date Badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-1.5 text-sm font-semibold text-slate-700">
              <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {event.dates.display}
            </div>

            {/* Intro Description */}
            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
              {event.name} takes place at <strong className="font-semibold text-slate-800">{event.venue.name}</strong>, a world-class exhibition center situated in the heart of <strong className="font-semibold text-slate-800">{event.venue.city}</strong> — Tanzania&apos;s principal commercial and international trade hub.
            </p>

            {/* Quick Feature Badges Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-200/80 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</h4>
                  <p className="text-sm font-bold text-slate-800">{event.venue.city}, Tanzania</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Facility</h4>
                  <p className="text-sm font-bold text-slate-800">Modern Exhibition Halls</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
           <div className="mt-8 flex flex-wrap items-center gap-4">
  <Button href="/plan-your-visit" size="md" className="shadow-lg shadow-brand-blue/15">
    Plan Your Visit →
  </Button>
  
  <a
    href={`https://maps.google.com/?q=${encodeURIComponent(`${event.venue.name}, ${event.venue.city}`)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 hover:border-slate-300 shadow-sm"
  >
    Open in Google Maps ↗
  </a>
</div>
          </motion.div>

          {/* Right Column: Google Maps iFrame Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2 shadow-xl shadow-slate-200/50"
          >
            <div className="relative overflow-hidden rounded-2xl h-[380px] sm:h-[440px] w-full bg-slate-100">
              <iframe
                title={`Map of ${event.venue.name}, ${event.venue.city}`}
                src={event.venue.mapEmbedUrl}
                className="h-full w-full border-0 transition-opacity duration-300 group-hover:opacity-95"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Overlay Glass Badge on Top Corner */}
              <div className="absolute top-4 left-4 rounded-xl border border-white/40 bg-white/80 p-3 backdrop-blur-md shadow-md">
                <p className="text-xs font-bold text-slate-900">{event.venue.name}</p>
                <p className="text-[11px] font-medium text-slate-500">{event.venue.city}, Tanzania</p>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { BrandMotif } from "@/components/brand/BrandMotif";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32">
      
      {/* Background Radial Gradient & Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/30 via-slate-950/80 to-slate-950" />
      
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[520px] w-[520px] opacity-20">
        <BrandMotif variant="half" position="right" opacity={1} rotation={4} className="h-full w-full" />
      </div>

      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Live Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-300 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400"></span>
            </span>
            Registrations Now Open
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white"
          >
            Build Your Next Business Opportunity in Tanzania
          </motion.h2>

          {/* Event Details Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm sm:text-base font-semibold text-slate-200 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{event.dates.display}</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.venue.fullLocation}</span>
            </div>
          </motion.div>

          {/* Dual Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 grid gap-6 sm:grid-cols-2 text-left"
          >
            {/* Card 1: Exhibitors */}
            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 transition-all duration-300 hover:border-brand-blue/50 hover:bg-white/[0.12] hover:shadow-2xl hover:shadow-brand-blue/20">
              <div>
                <span className="inline-block rounded-lg bg-brand-blue/20 px-3 py-1 text-xs font-bold text-brand-blue uppercase tracking-wider">
                  For Companies
                </span>
                <h3 className="mt-4 text-2xl font-bold text-white">Exhibit at the Trade Show</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Showcase your products to 10,000+ trade buyers, contractors, architects, and government officials across East Africa.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href={event.cta.bookStand}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/30 transition-all hover:bg-blue-600 hover:shadow-brand-blue/50"
                >
                  <span>Book a Stand</span>
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 2: Visitors */}
            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 transition-all duration-300 hover:border-teal-500/50 hover:bg-white/[0.12] hover:shadow-2xl hover:shadow-teal-500/20">
              <div>
                <span className="inline-block rounded-lg bg-teal-500/20 px-3 py-1 text-xs font-bold text-teal-300 uppercase tracking-wider">
                  For Trade Buyers
                </span>
                <h3 className="mt-4 text-2xl font-bold text-white">Register as a Visitor</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Gain complimentary access to the exhibition floor, live technical demos, and B2B matchmaking sessions.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href={event.cta.registerVisit}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-teal-500/40 bg-teal-500/10 px-6 py-3.5 text-sm font-bold text-teal-300 transition-all hover:bg-teal-500 hover:text-slate-950 shadow-lg shadow-teal-500/10"
                >
                  <span>Register to Visit (Free)</span>
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
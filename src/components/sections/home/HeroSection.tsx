"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Countdown } from "@/components/ui/Countdown";
import { BrandMotif } from "@/components/brand/BrandMotif";

export function HeroSection() {
  return (
    <section 
      className="relative flex min-h-[90vh] lg:min-h-screen w-full items-center justify-center overflow-hidden bg-brand-dark text-white"
      aria-label="Hero Banner - Tanzania Buildcon Expo 2027"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/skyline-construction.jpg"
          alt="Tanzania Buildcon Expo 2027"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 scale-105"
          style={{ objectPosition: "75% 50%" }}
        />
        {/* Ambient Glow Effects */}
        <div className="absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-brand-blue/20 blur-[120px] pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-[350px] w-[350px] rounded-full bg-brand-green/15 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark" />
      </div>

      {/* Blueprint Grid Texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Right Side Brand Motif Image Graphic (Desktop & Large Screens) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="pointer-events-none absolute -right-[8%] top-1/2 z-0 hidden h-[600px] w-[600px] -translate-y-1/2 lg:block xl:-right-[2%] xl:h-[720px] xl:w-[720px]"
      >
        <BrandMotif
          variant="full"
          opacity={0.8}
          priority
          className="h-full w-full animate-pulse transition-all duration-1000"
        />
      </motion.div>

      {/* Main Content Container */}
      <Container className="relative z-10 py-16 lg:py-20">
        <div className="max-w-2xl">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">
                {event.descriptor || "East Africa's Premier Construction Trade Show"}
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white"
          >
            Tanzania Buildcon
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-400 to-teal-300">
              International Expo 2027
            </span>
          </motion.h1>

          {/* Event Details Badges (Date, Venue) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-6 flex flex-wrap items-center gap-2.5 text-xs font-semibold text-white/80"
          >
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <svg className="h-4 w-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{event.dates.displayShort}</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <svg className="h-4 w-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{event.venue.name}</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <svg className="h-4 w-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.venue.city}, {event.venue.country}</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button 
              href={event.cta.bookStand} 
              size="md" 
              className="shadow-lg shadow-brand-blue/30 hover:scale-105 transition-transform duration-300"
            >
              Book a Stand
            </Button>
            <Button 
              href={event.cta.registerVisit} 
              variant="secondary" 
              size="md"
              className="border-white/20 bg-white/10 backdrop-blur-md hover:scale-105 transition-transform duration-300 hover:bg-white/20"
            >
              Register to Visit
            </Button>
          </motion.div>

          {/* Live Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md max-w-lg"
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/60">
              Official Exhibition Opening In
            </p>
            <Countdown targetIso={event.dates.countdownTargetIso} />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
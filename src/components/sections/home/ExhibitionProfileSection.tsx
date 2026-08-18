"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SectorCard } from "@/components/ui/SectorCard";
import { SectionMotif } from "@/components/brand/SectionMotif";
import { exhibitionSectors } from "@/data/exhibitionProfile";

export function ExhibitionProfileSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 sm:py-32">
      {/* Background Section Motif & Radial Mesh Grid */}
      <SectionMotif position="top-right" size="lg" opacity={0.05} />
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid-pattern-profile" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#000000" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-profile)" />
        </svg>
      </div>

      <Container className="relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
              15 Comprehensive Product Categories
            </motion.div>

            <SectionHeading
              title="Products. Machinery. Materials. Technologies."
              intro="Fifteen specialized sectors covering the full building and construction supply chain — from raw structural materials and heavy earthmoving gear to interior finishing, building automation, and HVAC energy solutions."
              className="mt-4 [&>h2]:text-3xl sm:[&>h2]:text-4xl lg:[&>h2]:text-5xl [&>h2]:font-extrabold [&>p]:text-slate-600"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="shrink-0"
          >
            <Button href="/exhibition-profile" size="md" className="shadow-lg shadow-brand-blue/15">
              Full Exhibition Profile →
            </Button>
          </motion.div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {exhibitionSectors.map((sector, index) => (
            <SectorCard 
              key={sector.slug || index} 
              name={sector.name} 
              slug={sector.slug} 
              index={index} 
            />
          ))}
        </div>

        {/* Bottom Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Looking to showcase your products?</h4>
              <p className="text-xs sm:text-sm text-slate-500">Reserve your exhibition space early to secure prime hall locations.</p>
            </div>
          </div>

          <Button href="/book-stand" variant="secondary" size="md" className="shrink-0 w-full sm:w-auto">
            Book Exhibition Stand
          </Button>
        </motion.div>

      </Container>
    </section>
  );
}
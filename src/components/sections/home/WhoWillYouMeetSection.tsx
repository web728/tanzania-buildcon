"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { VisitorGroupCard } from "@/components/ui/VisitorGroupCard";
import { SectionMotif } from "@/components/brand/SectionMotif";
import { visitorGroups } from "@/data/visitorProfile";

export function WhoWillYouMeetSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 sm:py-32">
      
      {/* Background Section Motif & Grid Pattern */}
      <SectionMotif position="top-right" size="lg" opacity={0.05} />
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid-pattern-visitor" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#000000" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-visitor)" />
        </svg>
      </div>

      <Container className="relative z-10">
        
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
            Target Audience & Trade Buyers
          </motion.div>

          <SectionHeading
            title="The People Who Buy, Build, Specify & Source"
            intro="Connect directly with structural engineers, project developers, procurement officers, and ministry officials actively procuring materials for East Africa's flagship construction projects."
            align="center"
            className="mt-4 mx-auto [&>h2]:text-3xl sm:[&>h2]:text-4xl lg:[&>h2]:text-5xl [&>h2]:font-extrabold [&>p]:text-slate-600"
          />
        </div>

        {/* Responsive Visitor Groups Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visitorGroups.map((group, index) => (
            <VisitorGroupCard
              key={group.slug || index}
              group={group}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Banner Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Are you planning to attend as a trade visitor?</h4>
              <p className="text-xs sm:text-sm text-slate-500">Explore full visitor eligibility, buyer matchmaking programs, and badge registration.</p>
            </div>
          </div>

          <Button
            href="/who-should-visit"
            variant="secondary"
            size="md"
            className="shrink-0 w-full sm:w-auto"
          >
            View Full Visitor Profile →
          </Button>
        </motion.div>

      </Container>
    </section>
  );
}
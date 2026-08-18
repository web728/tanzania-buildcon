"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SectionMotif } from "@/components/brand/SectionMotif";
import { marketFacts, opportunityCategories, type MarketFact } from "@/data/marketFacts";

// Dynamic Animated Number Counter Component
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Extract raw numeric value and preserve formatting/symbols (e.g., "2,561+ km" or "6.5%")
  const numericMatch = value.match(/[\d,.]+/);
  const cleanNumber = numericMatch ? parseFloat(numericMatch[0].replace(/,/g, "")) : 0;
  
  const prefix = value.split(/[\d,.]+/)[0] || "";
  const suffix = value.split(/[\d,.]+/)[1] || "";

  const spring = useSpring(0, {
    stiffness: 40,
    damping: 18,
    restDelta: 0.01,
  });

  const displayValue = useTransform(spring, (latest) => {
    const formatted = latest % 1 !== 0 
      ? latest.toFixed(1) 
      : Math.floor(latest).toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(cleanNumber);
    }
  }, [isInView, spring, cleanNumber]);

  return (
    <span ref={ref} className="inline-block">
      {isInView ? <motion.span>{displayValue}</motion.span> : `${prefix}0${suffix}`}
    </span>
  );
}

export function WhyTanzaniaSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32 text-white selection:bg-teal-500 selection:text-black">
      
      {/* Background Ambient Glows */}
      <div className="absolute -left-48 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-blue/15 blur-[150px] pointer-events-none" />
      <div className="absolute -right-48 bottom-10 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[150px] pointer-events-none" />
      
      {/* Vector Blueprint Grid Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid-pattern-why" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-why)" />
        </svg>
      </div>

      <SectionMotif position="bottom-left" size="lg" opacity={0.08} rotation={8} />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-teal-300 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400"></span>
            </span>
            Unlocking East Africa's Potential
          </motion.div>

          <SectionHeading
            title="Tanzania — A Construction Market on the Move"
            intro="Sustained economic expansion, port-driven trade routes, and multi-billion-dollar infrastructure investments are fueling unprecedented demand for building materials, heavy machinery, and smart building technologies."
            className="mt-4 text-white font-extrabold [&>h2]:text-white [&>h2]:text-3xl sm:[&>h2]:text-5xl [&>p]:text-slate-300"
          />
        </div>

        {/* Market Facts Grid mapped directly from your MarketFact[] */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {marketFacts.map((fact: MarketFact, index: number) => (
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-teal-400/50 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-teal-500/10"
            >
              <div>
                {/* Header Badge (Period / Verified) */}
                <div className="flex items-center justify-between gap-2">
                  {fact.period ? (
                    <span className="rounded-md border border-teal-500/30 bg-teal-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-300">
                      {fact.period}
                    </span>
                  ) : (
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                      Official Metric
                    </span>
                  )}

                  {/* SVG Chart Icon */}
                  <svg 
                    className="h-5 w-5 text-slate-500 transition-colors duration-300 group-hover:text-teal-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>

                {/* Animated Stat Value */}
                <div className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  <AnimatedCounter value={fact.value} />
                </div>

                {/* Stat Label */}
                <h3 className="mt-2 text-base font-bold text-teal-300">
                  {fact.label}
                </h3>

                {/* Fact Detail */}
                {fact.detail && (
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
                    {fact.detail}
                  </p>
                )}
              </div>

              {/* Verified Source Attribution Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate pr-2 font-medium text-slate-400">
                  Source:{" "}
                  {fact.sourceUrl ? (
                    <a 
                      href={fact.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="underline decoration-slate-600 underline-offset-2 transition-colors hover:text-teal-300"
                    >
                      {fact.sourceName}
                    </a>
                  ) : (
                    fact.sourceName
                  )}
                </span>
                <span className="shrink-0 text-[10px] text-slate-500">
                  Verified {fact.lastVerified}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Opportunity Chips Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-teal-400">
                High-Growth Sectors
              </p>
              <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                Opportunities Across Key Industries
              </h3>
            </div>
            
            <Button 
              href="/why-tanzania" 
              variant="secondary" 
              size="md" 
              className="shrink-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Discover Full Market Report →
            </Button>
          </div>

          {/* Filterable/Interactive Badges */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {opportunityCategories.map((cat: string) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(isSelected ? null : cat)}
                  className={`inline-flex items-center rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-teal-400 bg-teal-500/20 text-white shadow-lg shadow-teal-500/10"
                      : "border-white/10 bg-white/5 text-slate-200 hover:border-teal-400/50 hover:bg-teal-500/10 hover:text-white"
                  }`}
                >
                  <span className={`mr-2 h-1.5 w-1.5 rounded-full ${isSelected ? "bg-teal-300" : "bg-teal-400"}`} />
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
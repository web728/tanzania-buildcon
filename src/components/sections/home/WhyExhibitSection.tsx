"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BenefitCard } from "@/components/ui/BenefitCard";
import { BrandMotif } from "@/components/brand/BrandMotif";

const BENEFITS = [
  {
    title: "Meet New Buyers",
    description: "Connect directly with high-volume buyers actively seeking structural and finishing materials.",
  },
  {
    title: "Find Distributors & Agents",
    description: "Expand your footprint across East Africa by appointing reliable regional distribution partners.",
  },
  {
    title: "Generate Business Enquiries",
    description: "Capture qualified B2B leads and immediate RFQs during 3 high-intensity business days.",
  },
  {
    title: "Introduce Your Brand",
    description: "Establish strong market visibility as Tanzania's construction boom accelerates.",
  },
  {
    title: "Reach Contractors & Developers",
    description: "Present solutions straight to key decision-makers driving mega infrastructure projects.",
  },
  {
    title: "Meet Architects & Engineers",
    description: "Get your building materials and smart tech specified in upcoming architectural blueprints.",
  },
  {
    title: "Showcase Products & Technologies",
    description: "Run live equipment demos and showcase premium building technologies on the exhibition floor.",
  },
  {
    title: "Strengthen Market Presence",
    description: "Position your company alongside industry leaders shaping East Africa's skyline.",
  },
];

export function WhyExhibitSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32 selection:bg-teal-500 selection:text-black">
      {/* Background Image with Dark Gradient Overlays */}
      <Image
        src="/images/sectors/crane-machinery.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover opacity-[0.15]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />

      {/* Ambient Lighting Glows */}
      <div className="absolute -left-48 top-1/3 h-[500px] w-[500px] rounded-full bg-brand-blue/20 blur-[160px] pointer-events-none" />
      <div className="absolute -right-48 bottom-1/4 h-[500px] w-[500px] rounded-full bg-teal-500/15 blur-[160px] pointer-events-none" />

      {/* Brand Motif Element */}
      <div className="pointer-events-none absolute -left-32 top-0 h-full w-[520px] opacity-30">
        <BrandMotif variant="half" position="left" opacity={0.18} rotation={-6} className="h-full w-full" />
      </div>

      <Container className="relative z-10">
        
        {/* Header Block */}
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
            Why Exhibit
          </motion.div>

          <SectionHeading
            title="Take Your Business to the Tanzanian Construction Market"
            intro="Three focused business days to present your products directly to contractors, developers, architects, and high-volume buyers driving Tanzania's infrastructure growth."
            light
            className="mt-4 text-white font-extrabold [&>h2]:text-white [&>h2]:text-3xl sm:[&>h2]:text-5xl [&>p]:text-slate-300"
          />
        </div>

        {/* Responsive Benefits Grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item, index) => (
            <BenefitCard
              key={item.title}
              title={item.title}
              description={item.description}
              light
              index={index}
            />
          ))}
        </div>

        {/* Bottom Call To Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to Expand Your Reach in East Africa?
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Prime booth spaces are limited. Reserve your location early for maximum exposure.
            </p>
          </div>

          <Button
            href="/book-a-stand"
            size="lg"
            className="shrink-0 w-full sm:w-auto bg-gradient-to-r from-teal-400 to-teal-500 text-slate-950 font-bold hover:from-teal-300 hover:to-teal-400 hover:scale-105 shadow-xl shadow-teal-500/20 transition-all duration-300"
          >
            Book Your Stand Now →
          </Button>
        </motion.div>

      </Container>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const stats = [
  { value: "150+", label: "Global Exhibitors" },
  { value: "10,000+", label: "Trade Visitors" },
  { value: "25+", label: "Participating Countries" },
];

export function HeroStatsSection() {
  return (
    <section className="bg-brand-dark/95 border-y border-white/10 py-10 text-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="pt-4 md:pt-0"
            >
              <p className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-teal-300">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/70 font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
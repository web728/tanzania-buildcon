"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { benefitIconMap } from "@/components/icons/MiscIcons";

interface BenefitCardProps {
  title: string;
  description?: string;
  icon?: ReactNode; // Function ki jagah ReactNode use kiya taaki RSC serialization error na aaye
  light?: boolean;
  index?: number;
}

export function BenefitCard({
  title,
  description,
  icon,
  light = true,
  index = 0,
}: BenefitCardProps) {
  // Fallback map lookup if icon isn't passed directly as JSX
  const FallbackIcon = benefitIconMap[title];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <div
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 ${
          light
            ? "border-white/10 bg-white/[0.04] hover:border-teal-400/50 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-teal-500/10"
            : "border-slate-200/80 bg-white hover:border-brand-blue/50 hover:shadow-xl hover:shadow-brand-blue/10"
        }`}
      >
        {/* Glowing Top Corner Accent */}
        <div
          className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${
            isEven ? "from-teal-400/20" : "from-brand-blue/20"
          } to-transparent blur-xl transition-all duration-300 group-hover:scale-150 group-hover:opacity-100`}
        />

        <div>
          {/* Icon Header */}
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-md transition-transform duration-300 group-hover:scale-110 ${
              light
                ? "border-teal-400/30 bg-teal-500/10 text-teal-300 group-hover:border-teal-400 group-hover:bg-teal-400/20"
                : "border-brand-blue/20 bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
            }`}
          >
            {icon ? (
              icon
            ) : FallbackIcon ? (
              <FallbackIcon aria-hidden="true" className="h-6 w-6" />
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>

          {/* Title */}
          <h3
            className={`mt-4 text-base font-bold leading-snug sm:text-lg ${
              light ? "text-white group-hover:text-teal-300" : "text-slate-900 group-hover:text-brand-blue"
            } transition-colors duration-200`}
          >
            {title}
          </h3>

          {/* Optional Description */}
          {description && (
            <p
              className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                light ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-6 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-teal-400/80">
          <span>Exhibitor Advantage</span>
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
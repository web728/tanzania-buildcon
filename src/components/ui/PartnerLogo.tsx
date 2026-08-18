import Image from "next/image";
import type { PartnerSummary } from "@/lib/data/partners";

export function PartnerLogo({ partner }: { partner: PartnerSummary }) {
  const content = (
    <div className="group relative flex h-28 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-blue/10">
      
      {/* Background Hover Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-blue/5 via-transparent to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* External Link Arrow Indicator */}
      {partner.url && (
        <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-400 opacity-0 transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:opacity-100">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </span>
      )}

      {/* Partner Logo */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {partner.logoUrl ? (
          <Image
            src={partner.logoUrl}
            alt={partner.name}
            width={160}
            height={64}
            className="max-h-12 w-auto max-w-[85%] object-contain filter grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <span className="text-center text-xs font-bold text-slate-700 transition-colors group-hover:text-brand-blue">
            {partner.name}
          </span>
        )}
      </div>

      {/* Tooltip Name Label */}
      <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1 text-[10px] font-semibold text-white opacity-0 transition-all duration-200 group-hover:-bottom-9 group-hover:opacity-100 shadow-md">
        {partner.name}
      </div>
    </div>
  );

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={partner.name}
        className="block focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded-2xl"
      >
        {content}
      </a>
    );
  }

  return content;
}
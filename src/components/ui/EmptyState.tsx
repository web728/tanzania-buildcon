import Link from "next/link";
import { event } from "@/config/event";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 text-center shadow-[0_2px_12px_rgb(0,0,0,0.02)]">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-36 w-72 rounded-full bg-brand-blue/[0.06] blur-2xl" />

      {/* Pulse Status Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/[0.06] px-3.5 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
          Active Onboarding Phase
        </span>
      </div>

      <h3 className="mt-4 text-lg sm:text-xl font-bold tracking-tight text-brand-dark">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
        {body}
      </p>

    
    </div>
  );
}
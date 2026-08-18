import type { MarketFact } from "@/data/marketFacts";

export function StatCard({ fact }: { fact: MarketFact }) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-7">
      <p className="text-[clamp(2.25rem,4vw,3.25rem)] font-extrabold leading-none text-brand-blue">
        {fact.value}
      </p>
      <p className="mt-3 text-base font-bold text-brand-dark">{fact.label}</p>
      {fact.detail ? <p className="mt-2 text-sm leading-relaxed text-brand-body">{fact.detail}</p> : null}
      <p className="mt-4 text-xs text-brand-body/70">
        {fact.period ? `${fact.period} · ` : ""}
        Source: {fact.sourceName}
      </p>
    </div>
  );
}

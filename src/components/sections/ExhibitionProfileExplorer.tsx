"use client";

import { useMemo, useState } from "react";
import { exhibitionSectors } from "@/data/exhibitionProfile";
import { sectorIconMap } from "@/components/icons/SectorIcons";

export function ExhibitionProfileExplorer() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return exhibitionSectors;
    return exhibitionSectors
      .map((sector) => {
        const nameMatch = sector.name.toLowerCase().includes(q);
        const subMatches = sector.subcategories.filter((s) => s.toLowerCase().includes(q));
        if (nameMatch) return sector;
        if (subMatches.length > 0) return { ...sector, subcategories: subMatches };
        return null;
      })
      .filter((s): s is (typeof exhibitionSectors)[number] => s !== null);
  }, [query]);

  return (
    <div>
      <div className="sticky top-[64px] z-10 -mx-5 border-b border-brand-border bg-white/95 px-5 py-4 backdrop-blur-sm sm:mx-0 sm:rounded-xl sm:border sm:px-6">
        <label htmlFor="sector-search" className="sr-only">
          Search products or categories
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-body/60"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            id="sector-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, materials or categories…"
            className="w-full rounded-md border border-brand-border bg-white py-3 pl-11 pr-4 text-sm focus:border-brand-blue focus:outline-none"
          />
        </div>
      </div>

      {/* Category quick-jump anchors */}
      <nav aria-label="Category shortcuts" className="mt-6 flex flex-wrap gap-2">
        {exhibitionSectors.map((sector) => (
          <a
            key={sector.slug}
            href={`#${sector.slug}`}
            className="rounded-full border border-brand-border px-3 py-1.5 text-xs font-semibold text-brand-body hover:border-brand-blue hover:text-brand-blue"
          >
            {sector.name}
          </a>
        ))}
      </nav>

      <div className="mt-10 flex flex-col gap-10">
        {filtered.length === 0 ? (
          <p className="text-brand-body">No products matched &quot;{query}&quot;. Try another search term.</p>
        ) : (
          filtered.map((sector) => {
            const Icon = sectorIconMap[sector.slug];
            return (
            <div key={sector.slug} id={sector.slug} className="scroll-mt-40 rounded-xl border border-brand-border bg-white p-7">
              <div className="flex items-center gap-3">
                {Icon ? (
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                    <Icon className="h-5 w-5" />
                  </span>
                ) : null}
                <h2 className="text-xl font-extrabold text-brand-dark">{sector.name}</h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {sector.subcategories.map((sub) => (
                  <span
                    key={sub}
                    className="rounded-full bg-brand-light px-3 py-1.5 text-xs font-medium text-brand-dark"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
            );
          })
        )}
      </div>
    </div>
  );
}

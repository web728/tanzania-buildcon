import Link from "next/link";
import { sectorIconMap } from "@/components/icons/SectorIcons";

export function SectorCard({ name, slug, index }: { name: string; slug: string; index: number }) {
  const Icon = sectorIconMap[slug];
  const accent = index % 2 === 0 ? "text-brand-blue bg-brand-blue/10" : "text-brand-green bg-brand-green/10";

  return (
    <Link
      href={`/exhibition-profile#${slug}`}
      className="group relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-xl border border-brand-border bg-white p-5 transition-[transform,border-color,box-shadow] duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-brand-blue [@media(hover:hover)]:hover:shadow-lg"
    >
      <span
        aria-hidden="true"
        className={`absolute -right-4 -top-4 h-14 w-14 rounded-full ${
          index % 2 === 0 ? "bg-brand-blue/10" : "bg-brand-green/10"
        } transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:scale-125`}
      />
      {Icon ? (
        <span className={`relative flex h-10 w-10 items-center justify-center rounded-lg ${accent}`}>
          <Icon className="h-5 w-5" />
        </span>
      ) : null}
      <span className="relative text-sm font-bold leading-snug text-brand-dark">{name}</span>
      <span className="relative flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand-blue opacity-0 transition-opacity duration-200 ease-out [@media(hover:hover)]:group-hover:opacity-100">
        View products
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
          <path d="M1 5H11M11 5L7 1M11 5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

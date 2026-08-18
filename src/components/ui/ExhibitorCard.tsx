import Image from "next/image";
import Link from "next/link";
import type { ExhibitorSummary } from "@/lib/data/exhibitors";

export function ExhibitorCard({ exhibitor }: { exhibitor: ExhibitorSummary }) {
  return (
    <Link
      href={`/exhibitors/${exhibitor.slug}`}
      className="group flex flex-col rounded-xl border border-brand-border bg-white p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-brand-blue [@media(hover:hover)]:hover:shadow-lg"
    >
      <div className="flex h-16 items-center">
        {exhibitor.logoUrl ? (
          <Image
            src={exhibitor.logoUrl}
            alt={exhibitor.companyName}
            width={160}
            height={64}
            className="h-full w-auto max-w-full object-contain"
          />
        ) : (
          <span className="flex h-full w-full items-center rounded bg-brand-light px-3 text-sm font-bold text-brand-dark">
            {exhibitor.companyName}
          </span>
        )}
      </div>
      <p className="mt-4 text-base font-bold text-brand-dark">{exhibitor.companyName}</p>
      <p className="mt-1 text-sm text-brand-body">
        {exhibitor.country}
        {exhibitor.standNumber ? ` · Stand ${exhibitor.standNumber}` : ""}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-blue">
        {exhibitor.category}
      </p>
    </Link>
  );
}

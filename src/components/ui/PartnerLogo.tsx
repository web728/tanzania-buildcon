import Image from "next/image";
import type { PartnerSummary } from "@/lib/data/partners";

export function PartnerLogo({ partner }: { partner: PartnerSummary }) {
  const content = (
    <div className="flex h-24 items-center justify-center rounded-lg border border-brand-border bg-white p-6 grayscale transition-[filter] duration-200 ease-out [@media(hover:hover)]:hover:grayscale-0">
      <Image
        src={partner.logoUrl}
        alt={partner.name}
        width={160}
        height={64}
        className="h-full w-auto max-w-full object-contain"
      />
    </div>
  );

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer" aria-label={partner.name}>
        {content}
      </a>
    );
  }
  return content;
}

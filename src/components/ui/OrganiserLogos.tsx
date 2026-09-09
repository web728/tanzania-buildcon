import Image from "next/image";
import { event } from "@/config/event";
import { clsx } from "@/lib/utils/clsx";

interface OrganiserLogosProps {
  boxClassName?: string;
  onDark?: boolean;
  showDivider?: boolean;
  className?: string;
}

// Organiser websites mapping
const ORGANISER_WEBSITES: Record<string, string> = {
  "Futurex Trade Fair & Events Pvt. Ltd.": "https://www.futurextrade.com/",
  "ETSIPL": "https://www.etsipl.in/",
};

/**
 * Joint-organiser logo lockup (Futurex & ETSIPL).
 * Renders both brand logos inside visually balanced container bounds with smooth hover interactions.
 */
export function OrganiserLogos({
  boxClassName = "h-10 w-32 sm:h-12 sm:w-36",
  onDark = false,
  showDivider = true,
  className,
}: OrganiserLogosProps) {
  return (
    <div className={clsx("inline-flex items-center justify-center gap-4 sm:gap-6", className)}>
      {event.organisers.map((org, index) => {
        // Fallback link in case mapping key doesn't match exactly
        const websiteUrl =
          ORGANISER_WEBSITES[org.name] ||
          (index === 0 ? "https://www.futurextrade.com/" : "https://www.etsipl.in/");

        return (
          <div key={org.name} className="flex items-center gap-4 sm:gap-6">
            {/* Logo Card Link Container */}
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${org.name}`}
              className={clsx(
                "relative flex shrink-0 items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95",
                boxClassName,
                onDark && "rounded-xl border border-white/10 bg-white/90 p-2.5 shadow-sm backdrop-blur-md hover:bg-white"
              )}
            >
              <Image
                src={org.logo}
                alt={org.name}
                fill
                sizes="(max-width: 640px) 120px, 160px"
                className="object-contain transition-opacity duration-300"
                priority
              />
            </a>

            {/* Vertical Separator Divider */}
            {showDivider && index < event.organisers.length - 1 && (
              <span
                aria-hidden="true"
                className={clsx(
                  "h-7 w-[1px] shrink-0 transition-colors",
                  onDark ? "bg-white/20" : "bg-slate-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
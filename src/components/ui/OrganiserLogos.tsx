import Image from "next/image";
import { event } from "@/config/event";
import { clsx } from "@/lib/utils/clsx";

/**
 * Renders the joint-organiser logo lockup (Futurex, then ETSIPL — in that
 * order, per organiser instruction). Each logo is constrained to an
 * identical bounding box via object-contain so neither is stretched or
 * rendered disproportionately larger than the other, regardless of the
 * very different native aspect ratios of the two source files
 * (Futurex ≈ 4.8:1 wordmark, ETSIPL ≈ 0.87:1 badge mark).
 */
export function OrganiserLogos({
  boxClassName = "h-12 w-36 sm:h-14 sm:w-40",
  onDark = false,
  className,
}: {
  boxClassName?: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-wrap items-center gap-5", className)}>
      {event.organisers.map((org) => (
        <div
          key={org.name}
          className={clsx(
            "relative flex-shrink-0",
            boxClassName,
            onDark && "rounded-md bg-white p-2.5",
          )}
        >
          <Image src={org.logo} alt={org.name} fill sizes="200px" className="object-contain" />
        </div>
      ))}
    </div>
  );
}

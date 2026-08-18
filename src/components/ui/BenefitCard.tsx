import type { IconProps } from "@/components/icons/MiscIcons";
import { benefitIconMap } from "@/components/icons/MiscIcons";

export function BenefitCard({
  title,
  description,
  icon,
  light = false,
}: {
  title: string;
  description?: string;
  /** Overrides the title-keyed lookup in benefitIconMap for titles outside that map. */
  icon?: (props: IconProps) => React.JSX.Element;
  light?: boolean;
}) {
  const Icon = icon ?? benefitIconMap[title];

  return (
    <div className={`border-t pt-5 ${light ? "border-white/15" : "border-brand-border"}`}>
      {Icon ? (
        <Icon
          aria-hidden="true"
          className={`h-6 w-6 ${light ? "text-brand-green" : "text-brand-blue"}`}
        />
      ) : null}
      <p className={`mt-3 text-base font-bold leading-snug ${light ? "text-white" : "text-brand-dark"}`}>
        {title}
      </p>
      {description ? (
        <p className={`mt-2 text-sm leading-relaxed ${light ? "text-white/70" : "text-brand-body"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

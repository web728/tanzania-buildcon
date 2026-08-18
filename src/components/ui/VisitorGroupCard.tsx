import type { VisitorGroup } from "@/data/visitorProfile";
import { visitorGroupIconMap } from "@/components/icons/MiscIcons";

export function VisitorGroupCard({ group }: { group: VisitorGroup }) {
  const Icon = visitorGroupIconMap[group.slug];

  return (
    <div className="rounded-xl border border-brand-border bg-white p-6">
      <div className="flex items-center gap-3">
        {Icon ? (
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
        <p className="text-base font-extrabold text-brand-dark">{group.name}</p>
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
        {group.roles.slice(0, 5).map((role) => (
          <li key={role} className="text-sm text-brand-body">
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
}

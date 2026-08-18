import { Button } from "@/components/ui/Button";

export function SuccessPanel({
  title,
  message,
  referenceId,
  homeLabel = "Back to Home",
}: {
  title: string;
  message: string;
  referenceId: string;
  homeLabel?: string;
}) {
  return (
    <div className="translate-y-0 rounded-2xl border border-brand-green/30 bg-brand-green/5 p-8 text-center opacity-100 transition-[transform,opacity] duration-300 ease-out starting:translate-y-3 starting:opacity-0 sm:p-12">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green">
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
          <path d="M1 9L9 17L23 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h2 className="mt-6 text-2xl font-extrabold text-brand-dark">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-body">{message}</p>
      <div className="mx-auto mt-6 inline-flex flex-col items-center rounded-lg border border-brand-border bg-white px-6 py-4">
        <span className="text-xs font-bold uppercase tracking-wide text-brand-body">Reference ID</span>
        <span className="mt-1 text-xl font-extrabold text-brand-blue">{referenceId}</span>
      </div>
      <div className="mt-8">
        <Button href="/" variant="ghost">
          {homeLabel}
        </Button>
      </div>
    </div>
  );
}

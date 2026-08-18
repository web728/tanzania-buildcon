export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-brand-border bg-brand-light px-8 py-16 text-center">
      <p className="text-lg font-bold text-brand-dark">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-brand-body">{body}</p>
    </div>
  );
}

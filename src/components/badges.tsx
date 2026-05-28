import { Star } from "lucide-react";

export function ImportanceBadge({ value }: { value: 1 | 2 | 3 }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber/25 px-2.5 py-1 text-xs font-bold text-ink">
      <Star size={13} fill="currentColor" aria-hidden />
      重要度 {value}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  children
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      {eyebrow && <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf">{eyebrow}</p>}
      <h2 className="text-xl font-extrabold tracking-normal sm:text-2xl">{title}</h2>
      {children && <p className="max-w-2xl text-sm leading-7 text-muted">{children}</p>}
    </div>
  );
}

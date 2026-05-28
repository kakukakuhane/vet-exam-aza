import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Subject } from "@/data/types";

export function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Link
      href={`/subjects/${subject.slug}`}
      className="block rounded-lg border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className={`mb-4 h-2 w-16 rounded-full ${subject.color}`} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold">{subject.name}</h3>
          <p className="mt-2 text-sm leading-7 text-muted">{subject.description}</p>
        </div>
        <ChevronRight className="mt-1 shrink-0 text-muted" size={18} aria-hidden />
      </div>
      <p className="mt-3 text-xs font-bold text-leaf">{subject.questionCount}問を整理</p>
    </Link>
  );
}

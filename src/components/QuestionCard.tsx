import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Question } from "@/data/types";
import { ImportanceBadge } from "./badges";
import { getQuestionSectionLabel } from "@/lib/questionSections";

export function QuestionCard({ question }: { question: Question }) {
  return (
    <Link
      href={`/questions/${question.slug}`}
      className="block rounded-lg border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-mint px-2.5 py-1 text-xs font-bold text-leaf">
          {question.exam}
        </span>
        <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">
          第{question.examYear}回 {getQuestionSectionLabel(question)}
        </span>
        {question.isRequired && (
          <span className="rounded-full bg-coral/10 px-2.5 py-1 text-xs font-bold text-coral">
            必須
          </span>
        )}
        {question.isImageQuestion && (
          <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold text-ink">
            画像問題
          </span>
        )}
        <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">
          {question.subject}
        </span>
        {question.category && (
          <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">
            {question.category}
          </span>
        )}
        {question.frequency && (
          <span className="rounded-full bg-coral/10 px-2.5 py-1 text-xs font-bold text-coral">
            頻出度 {question.frequency}
          </span>
        )}
        <ImportanceBadge value={question.importance} />
      </div>
      <h3 className="text-base font-extrabold leading-relaxed">{question.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted">{question.body}</p>
      {question.point && (
        <p className="mt-3 rounded-lg bg-mint/45 px-3 py-2 text-xs font-bold leading-6 text-ink">
          Point: {question.point}
        </p>
      )}
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-leaf">
        解説を見る <ChevronRight size={16} aria-hidden />
      </span>
    </Link>
  );
}

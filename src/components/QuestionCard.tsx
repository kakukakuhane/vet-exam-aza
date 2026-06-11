import Link from "next/link";
import { BookOpen, ChevronRight, PlayCircle } from "lucide-react";
import type { Question } from "@/data/types";
import { getQuestionSectionLabel } from "@/lib/questionSections";

function difficultyScore(question: Question) {
  if (question.difficulty === "難") return 8;
  if (question.difficulty === "標準") return 5;
  return 3;
}

export function QuestionCard({ question }: { question: Question }) {
  return (
    <article className="rounded-lg border border-line bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card sm:p-4">
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-paper px-2 py-1 text-[11px] font-bold text-muted">
          第{question.examYear}回
        </span>
        <span className="rounded-full bg-mint px-2 py-1 text-[11px] font-bold text-leaf">
          {getQuestionSectionLabel(question)}
        </span>
        <span className="rounded-full bg-paper px-2 py-1 text-[11px] font-bold text-muted">
          {question.subject}
        </span>
        <span className="rounded-full bg-amber/25 px-2 py-1 text-[11px] font-bold text-ink">
          難易度 {difficultyScore(question)}/10
        </span>
        <span className="rounded-full bg-coral/10 px-2 py-1 text-[11px] font-bold text-coral">
          頻出度 {question.frequency ?? "-"}
        </span>
      </div>
      <h3 className="line-clamp-2 text-sm font-extrabold leading-7 sm:text-base">{question.title}</h3>
      <p className="mt-1 line-clamp-2 text-xs leading-6 text-muted sm:text-sm">{question.body}</p>
      {question.point && (
        <p className="mt-2 line-clamp-2 rounded-lg bg-mint/45 px-3 py-2 text-xs font-bold leading-6 text-ink">
          Point: {question.point}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={`/questions/${question.slug}`}
          className="on-dark inline-flex min-h-10 items-center gap-1.5 rounded-full bg-ink px-3 py-2 text-xs font-extrabold"
        >
          <PlayCircle size={15} aria-hidden />
          問題を解く
        </Link>
        <Link
          href={`/questions/${question.slug}#explanation`}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-2 text-xs font-extrabold text-ink"
        >
          <BookOpen size={15} aria-hidden />
          解説を見る
          <ChevronRight size={14} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

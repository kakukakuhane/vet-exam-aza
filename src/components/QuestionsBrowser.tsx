"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Question, Subject } from "@/data/types";
import {
  countByQuestionSection,
  matchesQuestionSection,
  questionSectionTabs,
  type QuestionSectionFilter
} from "@/lib/questionSections";
import { QuestionCard } from "./QuestionCard";

type QuestionsBrowserProps = {
  questions: Question[];
  subjects: Subject[];
};

export function QuestionsBrowser({ questions, subjects }: QuestionsBrowserProps) {
  const [query, setQuery] = useState("");
  const [subjectSlug, setSubjectSlug] = useState("all");
  const [section, setSection] = useState<QuestionSectionFilter>("all");
  const sectionCounts = useMemo(() => countByQuestionSection(questions), [questions]);

  const visibleQuestions = useMemo(() => {
    const word = query.trim().toLowerCase();
    return questions.filter((question) => {
      const matchesSubject = subjectSlug === "all" || question.subjectSlug === subjectSlug;
      const matchesSection = matchesQuestionSection(question, section);
      const searchable = [
        question.title,
        question.body,
        question.subject,
        question.category,
        question.point,
        question.explanation
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesSubject && matchesSection && (!word || searchable.includes(word));
    });
  }, [query, questions, section, subjectSlug]);
  const hasActiveFilter = query.trim().length > 0 || subjectSlug !== "all" || section !== "all";
  const displayedQuestions = hasActiveFilter ? visibleQuestions : visibleQuestions.slice(0, 24);

  return (
    <div>
      <section className="rounded-lg border border-line bg-white p-4 shadow-card sm:p-5">
        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="問題区分">
          {questionSectionTabs.map((tab) => {
            const active = section === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSection(tab.value)}
                className={`rounded-full border px-3 py-2 text-sm font-extrabold transition ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-paper text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-80">{sectionCounts[tab.value]}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
          <label className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2 focus-within:border-ink">
            <Search size={18} className="shrink-0 text-muted" aria-hidden />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="問題文、解説、ポイントで検索"
              className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
            />
          </label>
          <select
            value={subjectSlug}
            onChange={(event) => setSubjectSlug(event.target.value)}
            className="rounded-lg border border-line bg-paper px-3 py-2 text-sm font-bold outline-none"
            aria-label="カテゴリで絞り込み"
          >
            <option value="all">すべてのカテゴリ</option>
            {subjects.map((subject) => (
              <option key={subject.slug} value={subject.slug}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-3 text-sm font-semibold text-muted">
          {hasActiveFilter
            ? `${visibleQuestions.length}問を表示中`
            : `条件未指定のため${displayedQuestions.length}問だけ表示中。検索やタブで絞り込めます。`}
        </p>
      </section>

      {displayedQuestions.length > 0 ? (
        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedQuestions.map((question) => (
            <QuestionCard key={question.slug} question={question} />
          ))}
        </section>
      ) : (
        <section className="mt-6 rounded-lg border border-dashed border-line bg-white p-6 text-sm font-semibold leading-7 text-muted">
          この条件に一致する問題はまだ登録されていません。必須問題データを追加すると、このタブに表示されます。
        </section>
      )}
    </div>
  );
}

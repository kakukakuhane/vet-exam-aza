"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, PlayCircle } from "lucide-react";
import type { ExamSection, PracticeFilters, Question, ReviewSchedule, Subject, UserAnswer } from "@/data/types";
import { defaultPracticeFilters, filterQuestions, getAvailableExamYears } from "@/lib/practice";
import { QuestionCard } from "./QuestionCard";

const customPracticeStorageKey = "vet-exam-notes:custom-practice-slugs";

type PracticeBuilderProps = {
  questions: Question[];
  subjects: Subject[];
  userAnswers: UserAnswer[];
  reviewSchedules: ReviewSchedule[];
};

const sections: ExamSection[] = ["必須", "A", "B", "C", "D"];

export function PracticeBuilder({
  questions,
  subjects,
  userAnswers,
  reviewSchedules
}: PracticeBuilderProps) {
  const years = useMemo(() => getAvailableExamYears(questions), [questions]);
  const [filters, setFilters] = useState<PracticeFilters>({
    ...defaultPracticeFilters,
    examYears: years,
    sections: ["A"],
    requiredMode: "excludeRequired"
  });
  const [extractedSlugs, setExtractedSlugs] = useState<string[]>(() =>
    filterQuestions(questions, filters, userAnswers, reviewSchedules).map((question) => question.slug)
  );

  const previewQuestions = useMemo(
    () => questions.filter((question) => extractedSlugs.includes(question.slug)),
    [extractedSlugs, questions]
  );

  function toggleNumber(value: number, key: "examYears") {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value]
    }));
  }

  function toggleString(value: string, key: "subjectSlugs") {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value]
    }));
  }

  function toggleSection(section: ExamSection) {
    setFilters((current) => ({
      ...current,
      sections: current.sections.includes(section)
        ? current.sections.filter((item) => item !== section)
        : [...current.sections, section],
      requiredMode:
        section === "必須" && !current.sections.includes(section) ? "all" : current.requiredMode
    }));
  }

  function extractQuestions() {
    const nextQuestions = filterQuestions(questions, filters, userAnswers, reviewSchedules);
    setExtractedSlugs(nextQuestions.map((question) => question.slug));
  }

  function savePractice() {
    window.localStorage.setItem(customPracticeStorageKey, JSON.stringify(extractedSlugs));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="h-fit rounded-lg border border-line bg-white p-4 shadow-card lg:sticky lg:top-24">
        <div className="mb-4 flex items-center gap-2">
          <Filter size={18} className="text-leaf" aria-hidden />
          <h2 className="text-lg font-extrabold">演習条件</h2>
        </div>

        <div className="space-y-5">
          <fieldset>
            <legend className="mb-2 text-sm font-extrabold">年度</legend>
            <div className="flex flex-wrap gap-2">
              {years.map((year) => (
                <label key={year} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={filters.examYears.includes(year)}
                    onChange={() => toggleNumber(year, "examYears")}
                  />
                  第{year}回
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-extrabold">分野</legend>
            <div className="max-h-52 space-y-2 overflow-auto pr-1">
              {subjects.map((subject) => (
                <label key={subject.slug} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={filters.subjectSlugs.includes(subject.slug)}
                    onChange={() => toggleString(subject.slug, "subjectSlugs")}
                  />
                  {subject.name}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-extrabold">問題区分</legend>
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <label key={section} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={filters.sections.includes(section)}
                    onChange={() => toggleSection(section)}
                  />
                  {section}問題
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-2">
            <label className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2 text-sm font-bold">
              必須問題のみ
              <input
                type="checkbox"
                checked={filters.requiredMode === "requiredOnly"}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    requiredMode: event.target.checked ? "requiredOnly" : "all",
                    sections: event.target.checked
                      ? ["必須"]
                      : current.sections.filter((section) => section !== "必須")
                  }))
                }
              />
            </label>
            <label className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2 text-sm font-bold">
              必須問題を除外
              <input
                type="checkbox"
                checked={filters.requiredMode === "excludeRequired"}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    requiredMode: event.target.checked ? "excludeRequired" : "all",
                    sections: event.target.checked
                      ? current.sections.filter((section) => section !== "必須")
                      : current.sections
                  }))
                }
              />
            </label>
            <label className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2 text-sm font-bold">
              画像問題のみ
              <input
                type="checkbox"
                checked={filters.imageMode === "imageOnly"}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    imageMode: event.target.checked ? "imageOnly" : "all"
                  }))
                }
              />
            </label>
            <label className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2 text-sm font-bold">
              間違えた問題のみ
              <input
                type="checkbox"
                checked={Boolean(filters.wrongOnly)}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, wrongOnly: event.target.checked }))
                }
              />
            </label>
            <label className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2 text-sm font-bold">
              苦手問題のみ
              <input
                type="checkbox"
                checked={Boolean(filters.weakOnly)}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, weakOnly: event.target.checked }))
                }
              />
            </label>
          </div>

          <button
            type="button"
            onClick={extractQuestions}
            className="on-dark w-full rounded-full bg-ink px-4 py-3 text-sm font-extrabold"
          >
            抽出する
          </button>
        </div>
      </aside>

      <section>
        <div className="mb-4 rounded-lg border border-line bg-white p-4 shadow-card">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf">Practice Set</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold">{previewQuestions.length}問を抽出</h2>
              <p className="mt-1 text-sm leading-7 text-muted">
                将来はこの条件を保存し、年別演習、必須問題のみ、苦手問題のみの復習に使います。
              </p>
            </div>
            <Link
              href="/training/quiz/custom"
              onClick={savePractice}
              className="on-dark inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-extrabold"
            >
              <PlayCircle size={17} aria-hidden />
              演習開始
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {previewQuestions.slice(0, 12).map((question) => (
            <QuestionCard key={question.slug} question={question} />
          ))}
        </div>
      </section>
    </div>
  );
}

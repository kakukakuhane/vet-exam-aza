"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Filter, PlayCircle, Search } from "lucide-react";
import type { ExamSection, PracticeFilters, Question, ReviewSchedule, Subject, UserAnswer } from "@/data/types";
import { defaultPracticeFilters, filterQuestions, getAvailableExamYears } from "@/lib/practice";

const customPracticeStorageKey = "vet-exam-notes:custom-practice-slugs";

type PracticeBuilderProps = {
  questions: Question[];
  subjects: Subject[];
  userAnswers: UserAnswer[];
  reviewSchedules: ReviewSchedule[];
};

const sections: ExamSection[] = ["必須", "A", "B", "C", "D"];
const questionLimitOptions = [10, 20, 30, 50, 100];

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
  const [keyword, setKeyword] = useState("");
  const [questionLimit, setQuestionLimit] = useState(20);
  const [subjectsOpen, setSubjectsOpen] = useState(false);

  const matchingQuestions = useMemo(() => {
    const word = keyword.trim().toLowerCase();
    const filtered = filterQuestions(questions, filters, userAnswers, reviewSchedules).filter((question) => {
      if (!word) return true;
      return [
        question.questionNumber,
        question.title,
        question.body,
        question.subject,
        question.category,
        question.exam,
        question.point,
        question.explanation,
        ...question.choices.map((choice) => choice.text)
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(word);
    });

    return filtered.slice(0, questionLimit);
  }, [filters, keyword, questionLimit, questions, reviewSchedules, userAnswers]);

  const selectedSubjectNames = useMemo(
    () =>
      subjects
        .filter((subject) => filters.subjectSlugs.includes(subject.slug))
        .map((subject) => subject.name),
    [filters.subjectSlugs, subjects]
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

  function savePractice() {
    window.localStorage.setItem(
      customPracticeStorageKey,
      JSON.stringify(matchingQuestions.map((question) => question.slug))
    );
  }

  return (
    <section className="rounded-lg border border-line bg-white p-4 shadow-card sm:p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Filter size={18} className="text-leaf" aria-hidden />
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf">Practice Builder</p>
          </div>
          <h2 className="text-2xl font-extrabold">演習作成</h2>
          <p className="mt-1 text-sm leading-7 text-muted">
            条件を選んで、すぐに問題演習へ進みます。問題カードの一覧はここには表示しません。
          </p>
        </div>
        <div className="rounded-lg bg-paper px-3 py-2 text-sm font-extrabold text-ink sm:text-right">
          抽出予定 <span className="text-leaf">{matchingQuestions.length}</span> 問
        </div>
      </div>

      <div className="grid gap-5">
        <fieldset>
          <legend className="mb-2 text-sm font-extrabold">年度</legend>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {years.map((year) => {
              const active = filters.examYears.includes(year);
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => toggleNumber(year, "examYears")}
                  className={`rounded-lg border px-3 py-3 text-sm font-extrabold transition ${
                    active ? "border-ink bg-ink text-white" : "border-line bg-paper text-ink hover:border-ink"
                  }`}
                >
                  第{year}回
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-extrabold">問題区分</legend>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
            {sections.map((section) => {
              const active = filters.sections.includes(section);
              return (
                <button
                  key={section}
                  type="button"
                  onClick={() => toggleSection(section)}
                  className={`rounded-lg border px-3 py-3 text-sm font-extrabold transition ${
                    active ? "border-ink bg-ink text-white" : "border-line bg-paper text-ink hover:border-ink"
                  }`}
                >
                  {section === "必須" ? "必須" : `${section}問題`}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <button
            type="button"
            onClick={() => setSubjectsOpen((value) => !value)}
            className="flex w-full items-center justify-between gap-3 rounded-lg border border-line bg-paper px-3 py-3 text-left text-sm font-extrabold"
            aria-expanded={subjectsOpen}
          >
            <span>
              分野
              <span className="ml-2 text-xs text-muted">
                {selectedSubjectNames.length > 0 ? `${selectedSubjectNames.length}件選択中` : "すべて"}
              </span>
            </span>
            <ChevronDown
              size={18}
              className={`shrink-0 transition ${subjectsOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          {selectedSubjectNames.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedSubjectNames.slice(0, 6).map((name) => (
                <span key={name} className="rounded-full bg-mint px-2.5 py-1 text-xs font-bold text-leaf">
                  {name}
                </span>
              ))}
              {selectedSubjectNames.length > 6 && (
                <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">
                  +{selectedSubjectNames.length - 6}
                </span>
              )}
            </div>
          )}
          {subjectsOpen && (
            <div className="mt-3 grid max-h-64 gap-2 overflow-auto rounded-lg border border-line bg-white p-2 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => {
                const active = filters.subjectSlugs.includes(subject.slug);
                return (
                  <button
                    key={subject.slug}
                    type="button"
                    onClick={() => toggleString(subject.slug, "subjectSlugs")}
                    className={`rounded-lg border px-3 py-2 text-left text-sm font-bold transition ${
                      active ? "border-leaf bg-mint text-leaf" : "border-line bg-paper text-ink hover:border-ink"
                    }`}
                  >
                    {subject.name}
                  </button>
                );
              })}
            </div>
          )}
        </fieldset>

        <div className="grid gap-3 md:grid-cols-[1fr_180px]">
          <label className="block">
            <span className="mb-2 block text-sm font-extrabold">キーワード</span>
            <span className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2 focus-within:border-ink">
              <Search size={18} className="shrink-0 text-muted" aria-hidden />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="疾患名、薬剤名、問題番号"
                className="min-w-0 flex-1 bg-transparent py-1 text-base outline-none placeholder:text-muted"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-extrabold">出題数</span>
            <select
              value={questionLimit}
              onChange={(event) => setQuestionLimit(Number(event.target.value))}
              className="h-[46px] w-full rounded-lg border border-line bg-paper px-3 text-sm font-bold outline-none"
            >
              {questionLimitOptions.map((limit) => (
                <option key={limit} value={limit}>
                  {limit}問
                </option>
              ))}
            </select>
          </label>
        </div>

        <details className="rounded-lg border border-line bg-paper px-3 py-2">
          <summary className="cursor-pointer text-sm font-extrabold">詳細条件</summary>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              {
                label: "必須問題のみ",
                checked: filters.requiredMode === "requiredOnly",
                onChange: (checked: boolean) =>
                  setFilters((current) => ({
                    ...current,
                    requiredMode: checked ? "requiredOnly" : "all",
                    sections: checked ? ["必須"] : current.sections.filter((section) => section !== "必須")
                  }))
              },
              {
                label: "必須問題を除外",
                checked: filters.requiredMode === "excludeRequired",
                onChange: (checked: boolean) =>
                  setFilters((current) => ({
                    ...current,
                    requiredMode: checked ? "excludeRequired" : "all",
                    sections: checked ? current.sections.filter((section) => section !== "必須") : current.sections
                  }))
              },
              {
                label: "画像問題のみ",
                checked: filters.imageMode === "imageOnly",
                onChange: (checked: boolean) =>
                  setFilters((current) => ({ ...current, imageMode: checked ? "imageOnly" : "all" }))
              },
              {
                label: "間違えた問題のみ",
                checked: Boolean(filters.wrongOnly),
                onChange: (checked: boolean) =>
                  setFilters((current) => ({ ...current, wrongOnly: checked }))
              },
              {
                label: "苦手問題のみ",
                checked: Boolean(filters.weakOnly),
                onChange: (checked: boolean) =>
                  setFilters((current) => ({ ...current, weakOnly: checked }))
              }
            ].map((item) => (
              <label
                key={item.label}
                className="flex min-h-11 items-center justify-between gap-3 rounded-lg border border-line bg-white px-3 py-2 text-sm font-bold"
              >
                {item.label}
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(event) => item.onChange(event.target.checked)}
                />
              </label>
            ))}
          </div>
        </details>

        <div className="flex flex-col gap-3 rounded-lg border border-line bg-paper p-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-extrabold">この条件で {matchingQuestions.length} 問</p>
            <p className="mt-1 text-xs font-semibold leading-6 text-muted">
              演習開始時に条件を保存し、カスタム演習として出題します。
            </p>
          </div>
          <Link
            href="/training/quiz/custom"
            onClick={savePractice}
            aria-disabled={matchingQuestions.length === 0}
            className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold ${
              matchingQuestions.length === 0
                ? "pointer-events-none border border-line bg-white text-muted"
                : "on-dark bg-ink"
            }`}
          >
            <PlayCircle size={18} aria-hidden />
            演習開始
          </Link>
        </div>
      </div>
    </section>
  );
}

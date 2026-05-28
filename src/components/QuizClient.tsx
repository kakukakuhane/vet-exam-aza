"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bookmark, Check, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import type { Question, ReviewRating } from "@/data/types";
import { calculateNextReview } from "@/lib/review";

type QuizStats = {
  answered: number;
  correct: number;
  bookmarks: string[];
};

const storageKey = "vet-exam-notes:quiz:76-ab";
const customPracticeStorageKey = "vet-exam-notes:custom-practice-slugs";
const initialStats: QuizStats = { answered: 0, correct: 0, bookmarks: [] };

function parseStringArray(value: string | null) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    window.localStorage.removeItem(customPracticeStorageKey);
    return [];
  }
}

function parseQuizStats(value: string | null): QuizStats {
  if (!value) return initialStats;

  try {
    const parsed = JSON.parse(value) as Partial<QuizStats>;
    return {
      answered: typeof parsed.answered === "number" ? parsed.answered : 0,
      correct: typeof parsed.correct === "number" ? parsed.correct : 0,
      bookmarks: Array.isArray(parsed.bookmarks)
        ? parsed.bookmarks.filter((item): item is string => typeof item === "string")
        : []
    };
  } catch {
    window.localStorage.removeItem(storageKey);
    return initialStats;
  }
}

export function QuizClient({
  title,
  questions,
  useCustomSelection = false
}: {
  title: string;
  questions: Question[];
  useCustomSelection?: boolean;
}) {
  const [activeQuestions, setActiveQuestions] = useState(questions);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [stats, setStats] = useState<QuizStats>(initialStats);
  const [reviewMessage, setReviewMessage] = useState<string | null>(null);

  const current = activeQuestions[index];
  const isCorrect = selected ? current.correctChoiceIds.includes(selected) : false;
  const bookmarked = stats.bookmarks.includes(current.slug);

  useEffect(() => {
    if (!useCustomSelection) return;
    const slugs = parseStringArray(window.localStorage.getItem(customPracticeStorageKey));
    if (slugs.length === 0) return;

    const selectedQuestions = questions.filter((question) => slugs.includes(question.slug));
    if (selectedQuestions.length > 0) {
      setActiveQuestions(selectedQuestions);
      setIndex(0);
    }
  }, [questions, useCustomSelection]);

  useEffect(() => {
    setStats(parseQuizStats(window.localStorage.getItem(storageKey)));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(stats));
  }, [stats]);

  const accuracy = useMemo(() => {
    if (stats.answered === 0) return 0;
    return Math.round((stats.correct / stats.answered) * 100);
  }, [stats]);

  function answer(choiceId: string) {
    if (showExplanation) return;
    const correct = current.correctChoiceIds.includes(choiceId);
    setSelected(choiceId);
    setShowExplanation(true);
    setStats((value) => ({
      ...value,
      answered: value.answered + 1,
      correct: value.correct + (correct ? 1 : 0)
    }));
  }

  function move(nextIndex: number) {
    setIndex(nextIndex);
    setSelected(null);
    setShowExplanation(false);
    setReviewMessage(null);
  }

  function toggleBookmark() {
    setStats((value) => {
      const exists = value.bookmarks.includes(current.slug);
      return {
        ...value,
        bookmarks: exists
          ? value.bookmarks.filter((slug) => slug !== current.slug)
          : [...value.bookmarks, current.slug]
      };
    });
  }

  function resetStats() {
    setStats(initialStats);
    setSelected(null);
    setShowExplanation(false);
    setReviewMessage(null);
  }

  function registerReview(rating: ReviewRating) {
    const next = calculateNextReview(rating);
    const label: Record<ReviewRating, string> = {
      unknown: "わからない",
      again: "もう一回",
      hard: "難しい",
      normal: "普通",
      easy: "簡単"
    };
    setReviewMessage(`${label[rating]}として記録しました。次回復習は${next.intervalDays}日後です。`);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-5 rounded-lg border border-line bg-white p-4 shadow-card">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf">Training</p>
        <h1 className="mt-1 text-2xl font-extrabold">{title}</h1>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
          <div className="rounded-lg bg-paper px-2 py-3">
            <p className="font-extrabold">{index + 1} / {activeQuestions.length}</p>
            <p className="text-xs text-muted">進捗</p>
          </div>
          <div className="rounded-lg bg-paper px-2 py-3">
            <p className="font-extrabold">{accuracy}%</p>
            <p className="text-xs text-muted">正答率</p>
          </div>
          <div className="rounded-lg bg-paper px-2 py-3">
            <p className="font-extrabold">{stats.bookmarks.length}</p>
            <p className="text-xs text-muted">保存</p>
          </div>
        </div>
      </div>

      <article className="rounded-lg border border-line bg-white p-4 shadow-card sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-mint px-2.5 py-1 text-xs font-bold text-leaf">
            {current.exam}
          </span>
          <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">
            第{current.examYear}回 {current.section}問題
          </span>
          <button
            type="button"
            onClick={toggleBookmark}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-bold ${
              bookmarked ? "border-amber bg-amber/30" : "border-line bg-white"
            }`}
          >
            <Bookmark size={15} fill={bookmarked ? "currentColor" : "none"} aria-hidden />
            保存
          </button>
        </div>
        <h2 className="text-xl font-extrabold leading-relaxed">{current.title}</h2>
        <p className="mt-3 text-base leading-8 text-ink">{current.body}</p>
        <div className="mt-5 grid gap-2">
          {current.choices.map((choice) => {
            const isSelected = selected === choice.id;
            const isAnswer = showExplanation && current.correctChoiceIds.includes(choice.id);
            return (
              <button
                type="button"
                key={choice.id}
                onClick={() => answer(choice.id)}
                className={`flex items-start gap-3 rounded-lg border px-3 py-3 text-left text-sm font-semibold leading-7 transition ${
                  isAnswer
                    ? "border-leaf bg-mint"
                    : isSelected
                      ? "border-coral bg-coral/10"
                      : "border-line bg-paper hover:border-ink"
                }`}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-extrabold">
                  {choice.id.toUpperCase()}
                </span>
                <span>{choice.text}</span>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-5 rounded-lg border border-line bg-paper p-4">
            <p className={`mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
              isCorrect ? "bg-mint text-leaf" : "bg-coral/15 text-coral"
            }`}>
              <Check size={14} aria-hidden />
              {isCorrect ? "正解" : "不正解"}
            </p>
            <h3 className="text-base font-extrabold">解説</h3>
            <p className="mt-2 text-sm leading-8 text-ink">{current.explanation}</p>
            <div className="mt-4">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-leaf">
                Review
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ["unknown", "わからない"],
                  ["again", "もう一回"],
                  ["hard", "難しい"],
                  ["normal", "普通"],
                  ["easy", "簡単"]
                ].map(([rating, label]) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => registerReview(rating as ReviewRating)}
                    className="rounded-full border border-line bg-white px-3 py-2 text-xs font-extrabold transition hover:border-ink"
                  >
                    {label}
                  </button>
                ))}
              </div>
              {reviewMessage && (
                <p className="mt-3 rounded-lg bg-mint/45 px-3 py-2 text-sm font-bold text-leaf">
                  {reviewMessage}
                </p>
              )}
            </div>
          </div>
        )}
      </article>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => move(Math.max(0, index - 1))}
          disabled={index === 0}
          className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold disabled:opacity-40"
        >
          <ChevronLeft size={16} aria-hidden />
          前へ
        </button>
        <button
          type="button"
          onClick={resetStats}
          className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3 py-2 text-sm font-bold"
        >
          <RotateCcw size={15} aria-hidden />
          記録リセット
        </button>
        {index < activeQuestions.length - 1 ? (
          <button
            type="button"
            onClick={() => move(index + 1)}
            className="on-dark inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-sm font-bold"
          >
            次へ
            <ChevronRight size={16} aria-hidden />
          </button>
        ) : (
          <Link
            href="/"
            className="on-dark inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-sm font-bold"
          >
            完了
          </Link>
        )}
      </div>
    </div>
  );
}

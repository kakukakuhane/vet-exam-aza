import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import {
  mockQuestionAnalytics,
  mockSubjectAnalytics
} from "@/data/mockLearning";
import { getQuestion } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "問題別正答率、わからない数、分野別正答率を確認する管理者向けダッシュボード。"
};

function percent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export default function AdminPage() {
  const lowCorrectQuestions = [...mockQuestionAnalytics].sort((a, b) => a.correctRate - b.correctRate);
  const unknownRanking = [...mockQuestionAnalytics].sort((a, b) => b.unknownCount - a.unknownCount);
  const subjectRanking = [...mockSubjectAnalytics].sort((a, b) => a.correctRate - b.correctRate);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="mb-6 rounded-lg border border-line bg-white p-5 shadow-card">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-mint text-leaf">
            <BarChart3 size={20} aria-hidden />
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf">Admin</p>
            <h1 className="text-3xl font-extrabold leading-tight">管理者ダッシュボード</h1>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
          Phase 1ではモック学習データを使い、捨て問題、頻出問題、合格必須問題の分析に必要な指標の置き場を作っています。
          Supabase連携後は `userAnswers` と `reviewSchedules` から集計します。
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-lg border border-line bg-white p-4 shadow-card">
          <h2 className="text-lg font-extrabold">正答率が低い問題</h2>
          <div className="mt-4 space-y-3">
            {lowCorrectQuestions.map((item) => {
              const question = getQuestion(item.questionSlug);
              return (
                <Link
                  key={item.questionSlug}
                  href={`/questions/${item.questionSlug}`}
                  className="block rounded-lg border border-line p-3 transition hover:border-ink"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-extrabold">{percent(item.correctRate)}</p>
                    <ArrowRight size={15} className="text-muted" aria-hidden />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs font-bold leading-6 text-muted">
                    {question?.title ?? item.questionSlug}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-line bg-white p-4 shadow-card">
          <h2 className="text-lg font-extrabold">わからない数ランキング</h2>
          <div className="mt-4 space-y-3">
            {unknownRanking.map((item) => {
              const question = getQuestion(item.questionSlug);
              return (
                <Link
                  key={item.questionSlug}
                  href={`/questions/${item.questionSlug}`}
                  className="block rounded-lg border border-line p-3 transition hover:border-ink"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-extrabold">{item.unknownCount}件</p>
                    <ArrowRight size={15} className="text-muted" aria-hidden />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs font-bold leading-6 text-muted">
                    {question?.title ?? item.questionSlug}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-line bg-white p-4 shadow-card">
          <h2 className="text-lg font-extrabold">分野別正答率</h2>
          <div className="mt-4 space-y-3">
            {subjectRanking.map((item) => (
              <div key={item.subjectSlug} className="rounded-lg border border-line p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold">{item.subjectName}</p>
                  <p className="text-sm font-extrabold text-leaf">{percent(item.correctRate)}</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-paper">
                  <div
                    className="h-2 rounded-full bg-leaf"
                    style={{ width: `${Math.round(item.correctRate * 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs font-semibold text-muted">
                  苦手率 {percent(item.weakRate)} / {item.attempts}回答
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

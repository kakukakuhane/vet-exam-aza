import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PlayCircle, Video } from "lucide-react";
import { questions } from "@/data/questions";

export const metadata: Metadata = {
  title: "講義動画",
  description: "獣医師国家試験対策の講義動画と関連問題への導線です。"
};

const lecturePlaceholders = [
  {
    title: "必須問題 法規・倫理",
    subject: "獣医関連法規",
    description: "必須問題で落とせない法規、倫理、行政対応を短時間で整理します。",
    relatedSubject: "公衆衛生"
  },
  {
    title: "A問題 基礎科目整理",
    subject: "解剖・生理・薬理",
    description: "文章問題で問われやすい基礎知識を、関連問題と一緒に復習します。",
    relatedSubject: "薬理学"
  },
  {
    title: "B問題 臨床・公衆衛生",
    subject: "臨床・感染症・衛生",
    description: "臨床判断、公衆衛生、感染症の頻出テーマを問題演習へつなげます。",
    relatedSubject: "内科学"
  }
];

export default function LecturesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="mb-6">
        <p className="mb-3 inline-flex rounded-full border border-line bg-white px-3 py-1 text-xs font-extrabold text-leaf">
          Lectures
        </p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">講義動画</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-muted">
          動画は準備中です。先に講義テーマごとの関連問題へ移動できる土台を用意しています。
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {lecturePlaceholders.map((lecture) => {
          const relatedQuestion =
            questions.find((question) => question.subject === lecture.relatedSubject) ?? questions[0];

          return (
            <article key={lecture.title} className="rounded-lg border border-line bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ink text-white">
                  <Video size={20} aria-hidden />
                </span>
                <span className="rounded-full bg-amber/25 px-2.5 py-1 text-xs font-extrabold text-ink">
                  Coming soon
                </span>
              </div>
              <h2 className="mt-4 text-lg font-extrabold leading-7">{lecture.title}</h2>
              <p className="mt-1 text-sm font-bold text-muted">{lecture.subject}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{lecture.description}</p>
              <div className="mt-5 flex flex-col gap-2">
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-extrabold text-muted"
                  disabled
                >
                  <PlayCircle size={16} aria-hidden />
                  動画準備中
                </button>
                <Link
                  href={`/questions/${relatedQuestion.slug}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-extrabold text-ink transition hover:border-ink"
                >
                  関連問題へ
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

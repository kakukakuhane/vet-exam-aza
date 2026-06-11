import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QuestionsBrowser } from "@/components/QuestionsBrowser";
import { questions } from "@/data/questions";
import { subjects } from "@/data/subjects";

export const metadata: Metadata = {
  title: "問題一覧",
  description: "第75/76回獣医師国家試験の必須問題、A問題、B問題を区分別に検索できます。",
  openGraph: {
    title: "問題一覧",
    description: "必須問題、A問題、B問題を独立したタブとカテゴリフィルタで確認できます。",
    type: "website"
  }
};

export default function QuestionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-5 inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden />
        トップへ戻る
      </Link>
      <section className="mb-6">
        <p className="mb-3 inline-flex rounded-full border border-line bg-white px-3 py-1 text-xs font-extrabold text-leaf">
          Question Bank
        </p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">問題一覧</h1>
        <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
          第75/76回獣医師国家試験を、必須問題、A問題、B問題の区分ごとに絞り込めます。
          分野タグやキーワード検索との組み合わせにも対応しています。
        </p>
      </section>
      <QuestionsBrowser questions={questions} subjects={subjects} />
    </div>
  );
}

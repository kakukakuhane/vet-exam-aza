import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { ImportanceBadge } from "@/components/badges";
import { getQuestion } from "@/lib/data";
import { getQuestionSectionLabel } from "@/lib/questionSections";
import { questions } from "@/data/questions";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return questions.map((question) => ({ slug: question.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const question = getQuestion(slug);
  if (!question) return {};

  return {
    title: question.title,
    description: question.body,
    openGraph: {
      title: question.title,
      description: question.body,
      type: "article"
    }
  };
}

export default async function QuestionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const question = getQuestion(slug);
  if (!question) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-5 inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden />
        トップへ戻る
      </Link>

      <article className="rounded-lg border border-line bg-white p-4 shadow-card sm:p-7">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-mint px-2.5 py-1 text-xs font-bold text-leaf">
            {question.exam}
          </span>
          <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">
            第{question.examYear}回 {getQuestionSectionLabel(question)}
          </span>
          {question.isRequired && (
            <span className="rounded-full bg-coral/10 px-2.5 py-1 text-xs font-bold text-coral">
              必須問題
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
          <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">
            難易度 {question.difficulty}
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

        <h1 className="text-2xl font-extrabold leading-relaxed sm:text-3xl">{question.title}</h1>
        <p className="mt-4 rounded-lg bg-paper p-4 text-base leading-8">{question.body}</p>

        <div className="mt-6 grid gap-2">
          {question.choices.map((choice) => {
            const isCorrect = question.correctChoiceIds.includes(choice.id);
            return (
              <div
                key={choice.id}
                className={`flex gap-3 rounded-lg border px-3 py-3 text-sm font-semibold leading-7 ${
                  isCorrect ? "border-leaf bg-mint" : "border-line bg-white"
                }`}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-paper text-xs font-extrabold">
                  {choice.id.toUpperCase()}
                </span>
                <span>{choice.text}</span>
              </div>
            );
          })}
        </div>

        <section className="mt-7 rounded-lg border border-line bg-paper p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-leaf" aria-hidden />
            <h2 className="text-lg font-extrabold">正答と解説</h2>
          </div>
          <p className="mt-3 text-sm font-bold text-leaf">
            正答: {question.correctChoiceIds.map((id) => id.toUpperCase()).join(", ")}
          </p>
          <p className="mt-3 text-base leading-8">{question.explanation}</p>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-extrabold">重要ポイント</h2>
          <ul className="mt-3 grid gap-2">
            {question.point && (
              <li className="rounded-lg bg-amber/25 px-3 py-3 text-sm font-semibold leading-7">
                {question.point}
              </li>
            )}
            {question.keyPoints
              .filter((point) => point !== question.point)
              .map((point) => (
              <li key={point} className="rounded-lg bg-mint/45 px-3 py-3 text-sm font-semibold leading-7">
                {point}
              </li>
            ))}
          </ul>
        </section>
      </article>

      <section className="mt-6 rounded-lg border border-line bg-white p-4">
        <h2 className="text-lg font-extrabold">関連問題</h2>
        <div className="mt-3 grid gap-2">
          {question.related.map((related) => (
            <Link
              href={`/questions/${related.slug}`}
              key={related.slug}
              className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-3 text-sm font-bold transition hover:border-ink"
            >
              {related.title}
              <ChevronRight size={16} aria-hidden />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

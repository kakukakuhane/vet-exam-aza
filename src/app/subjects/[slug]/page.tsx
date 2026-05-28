import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CollapsibleSections } from "@/components/CollapsibleSections";
import { QuestionCard } from "@/components/QuestionCard";
import { SectionTitle } from "@/components/badges";
import { subjectSummaries, subjects } from "@/data/subjects";
import { getQuestionsBySubject, getSubject, getSubjectSummary } from "@/lib/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return subjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubject(slug);
  const summary = getSubjectSummary(slug);
  if (!subject) return {};

  return {
    title: summary?.title ?? `${subject.name} 問題まとめ`,
    description: summary?.description ?? subject.description,
    openGraph: {
      title: summary?.title ?? `${subject.name} 問題まとめ`,
      description: summary?.description ?? subject.description,
      type: "article"
    }
  };
}

export default async function SubjectSummaryPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getSubject(slug);
  const relatedQuestions = getQuestionsBySubject(slug);
  if (!subject) notFound();

  const summary =
    getSubjectSummary(slug) ?? {
      slug,
      title: `${subject.name} 問題まとめ`,
      description: subject.description,
      sections: [
        {
          id: "high-frequency",
          title: "頻出ポイント",
          lead: `${subject.name}の正式データから、演習前に押さえたい要点を確認します。`,
          points: relatedQuestions
            .slice(0, 5)
            .map((question) => question.point ?? question.keyPoints[0] ?? question.title),
          relatedQuestionSlugs: relatedQuestions.slice(0, 5).map((question) => question.slug)
        }
      ]
    };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-5 inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden />
        トップへ戻る
      </Link>

      <section className="rounded-lg border border-line bg-white p-5 shadow-card sm:p-7">
        <p className="mb-3 inline-flex rounded-full bg-mint px-3 py-1 text-xs font-extrabold text-leaf">
          {subject.name}
        </p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{summary.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">{summary.description}</p>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-lg border border-line bg-white p-4 lg:sticky lg:top-24">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-leaf">Index</p>
          <nav className="grid gap-2">
            {summary.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="text-sm font-bold text-muted hover:text-ink">
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
        <div>
          <SectionTitle eyebrow="Summary" title="見出し別まとめ" />
          <CollapsibleSections sections={summary.sections} />
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle eyebrow="Practice" title="この科目の関連問題" />
        <div className="grid gap-4 md:grid-cols-2">
          {relatedQuestions.map((question) => (
            <QuestionCard key={question.slug} question={question} />
          ))}
        </div>
      </section>
    </div>
  );
}

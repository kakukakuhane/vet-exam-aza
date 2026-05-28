import Link from "next/link";
import { ArrowRight, BookMarked, Layers3, PlayCircle } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { QuestionCard } from "@/components/QuestionCard";
import { SearchBox } from "@/components/SearchBox";
import { SectionTitle } from "@/components/badges";
import { SubjectCard } from "@/components/SubjectCard";
import { articles } from "@/data/articles";
import { questions } from "@/data/questions";
import { subjects } from "@/data/subjects";
import { countByQuestionSection } from "@/lib/questionSections";

export default function Home() {
  const latestQuestions = [...questions].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const popularArticles = [...articles].sort((a, b) => b.popularity - a.popularity);
  const sectionCounts = countByQuestionSection(questions);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div>
          <p className="mb-3 inline-flex rounded-full border border-line bg-white px-3 py-1 text-xs font-extrabold text-leaf">
            獣医国家試験対策
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">
            過去問から解説まで、毎日の復習を軽くする学習ハブ。
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            問題、科目まとめ、記事、演習をひとつの導線にまとめました。通学中はスマホで確認し、
            机では関連問題まで深掘りできます。
          </p>
          <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-line bg-white px-4 py-3">
              <p className="text-xs font-bold text-muted">収録試験</p>
              <p className="mt-1 text-sm font-extrabold">第76回 国家試験</p>
            </div>
            <div className="rounded-lg border border-line bg-white px-4 py-3">
              <p className="text-xs font-bold text-muted">区分別収録</p>
              <p className="mt-1 text-sm font-extrabold">
                必須{sectionCounts.required} / A{sectionCounts.A} / B{sectionCounts.B}
              </p>
            </div>
            <div className="rounded-lg border border-line bg-white px-4 py-3">
              <p className="text-xs font-bold text-muted">追加予定</p>
              <p className="mt-1 text-sm font-extrabold">必須・C/D問題</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/training/quiz/basic-67-2"
              className="on-dark inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold"
            >
              <PlayCircle size={18} aria-hidden />
              演習を始める
            </Link>
            <Link
              href="/subjects/bacteriology"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-bold"
            >
              <Layers3 size={18} aria-hidden />
              科目まとめへ
            </Link>
          </div>
        </div>
        <SearchBox questions={questions} subjects={subjects} articles={articles} />
      </section>

      <section className="mt-10">
        <SectionTitle eyebrow="Latest" title="新着問題一覧">
          第76回獣医師国家試験の各区分を、重要度と科目タグつきで素早く確認できます。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latestQuestions.slice(0, 6).map((question) => (
            <QuestionCard key={question.slug} question={question} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle eyebrow="Subjects" title="科目一覧">
          各科目のまとめページから、重要ポイントと関連問題へ進めます。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.slug} subject={subject} />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="on-dark rounded-lg border border-line bg-ink p-5">
          <BookMarked size={26} aria-hidden />
          <h2 className="mt-4 text-2xl font-extrabold">問題演習</h2>
          <p className="on-dark-muted mt-2 text-sm leading-7">
            必須問題、A問題、B問題を独立した区分として扱い、1問ずつ回答して直後に解説を確認できます。
            C/D画像問題の演習にも拡張できる構成です。
          </p>
          <Link
            href="/training/quiz/basic-67-2"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-bold text-ink"
          >
            演習画面を開く
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div>
          <SectionTitle eyebrow="Articles" title="人気記事" />
          <div className="grid gap-4 md:grid-cols-3">
            {popularArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

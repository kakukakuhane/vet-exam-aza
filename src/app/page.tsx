import Link from "next/link";
import { ArrowRight, BookOpenCheck, PlayCircle, Video } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { PracticeBuilder } from "@/components/PracticeBuilder";
import { QuestionCard } from "@/components/QuestionCard";
import { SearchBox } from "@/components/SearchBox";
import { SectionTitle } from "@/components/badges";
import { articles } from "@/data/articles";
import { mockReviewSchedules, mockUserAnswers } from "@/data/mockLearning";
import { questions } from "@/data/questions";
import { subjects } from "@/data/subjects";
import { countByQuestionSection } from "@/lib/questionSections";

export default function Home() {
  const latestQuestions = [...questions].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const popularArticles = [...articles].sort((a, b) => b.popularity - a.popularity);
  const sectionCounts = countByQuestionSection(questions);
  const lecturePlaceholders = [
    {
      title: "解剖学 基礎講義",
      subject: "解剖学",
      related: "関連問題へ"
    },
    {
      title: "薬理学 作用機序まとめ",
      subject: "薬理学",
      related: "関連問題へ"
    },
    {
      title: "公衆衛生 法規対策",
      subject: "公衆衛生",
      related: "関連問題へ"
    }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="mb-3 inline-flex rounded-full border border-line bg-white px-3 py-1 text-xs font-extrabold text-leaf">
            獣医国家試験対策
          </p>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-normal sm:text-5xl">
            条件を選んで、すぐ解く。
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
            年度、問題区分、分野、キーワードを組み合わせて、自分用の演習セットを作成できます。
            まずは演習作成から始めてください。
          </p>
          <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-line bg-white px-4 py-3">
              <p className="text-xs font-bold text-muted">収録試験</p>
              <p className="mt-1 text-sm font-extrabold">第75/76回 国家試験</p>
            </div>
            <div className="rounded-lg border border-line bg-white px-4 py-3">
              <p className="text-xs font-bold text-muted">区分別収録</p>
              <p className="mt-1 text-sm font-extrabold">
                必須{sectionCounts.required} / A{sectionCounts.A} / B{sectionCounts.B}
              </p>
            </div>
            <div className="rounded-lg border border-line bg-white px-4 py-3">
              <p className="text-xs font-bold text-muted">追加予定</p>
              <p className="mt-1 text-sm font-extrabold">C/D画像問題</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/practice"
              className="on-dark inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold"
            >
              <PlayCircle size={18} aria-hidden />
              演習を作成
            </Link>
            <Link
              href="#search"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-bold"
            >
              <BookOpenCheck size={18} aria-hidden />
              検索する
            </Link>
          </div>
        </div>
        <SearchBox questions={questions} subjects={subjects} articles={articles} />
      </section>

      <section className="mt-7" id="practice">
        <PracticeBuilder
          questions={questions}
          subjects={subjects}
          userAnswers={mockUserAnswers}
          reviewSchedules={mockReviewSchedules}
        />
      </section>

      <section className="mt-10">
        <SectionTitle eyebrow="Lectures" title="講義動画">
          将来は講義動画から関連問題へ、問題から関連講義へ移動できるようにします。
        </SectionTitle>
        <div className="grid gap-3 md:grid-cols-3">
          {lecturePlaceholders.map((lecture) => (
            <article key={lecture.title} className="rounded-lg border border-line bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink text-white">
                  <Video size={19} aria-hidden />
                </span>
                <span className="rounded-full bg-amber/25 px-2.5 py-1 text-xs font-extrabold text-ink">
                  Coming soon
                </span>
              </div>
              <h3 className="mt-4 text-base font-extrabold leading-7">{lecture.title}</h3>
              <p className="mt-1 text-sm font-bold text-muted">{lecture.subject}</p>
              <button
                type="button"
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-paper px-3 py-2 text-sm font-extrabold text-muted"
                disabled
              >
                {lecture.related}
                <ArrowRight size={15} aria-hidden />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionTitle eyebrow="Latest" title="新着問題">
            問題カードは最小限に抑えています。まとまった演習は上の演習作成から始められます。
          </SectionTitle>
          <div className="grid gap-3">
            {latestQuestions.slice(0, 3).map((question) => (
              <QuestionCard key={question.slug} question={question} />
            ))}
          </div>
        </div>
        <div>
          <SectionTitle eyebrow="Articles" title="人気記事" />
          <div className="grid gap-3">
            {popularArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

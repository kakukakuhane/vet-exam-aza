import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { getMarkdownArticle, getMarkdownArticleSlugs } from "@/lib/markdown";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getMarkdownArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getMarkdownArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt
    }
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getMarkdownArticle(slug);
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-5 inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden />
        トップへ戻る
      </Link>
      <article className="rounded-lg border border-line bg-white p-5 shadow-card sm:p-8">
        <p className="mb-3 inline-flex rounded-full bg-mint px-3 py-1 text-xs font-extrabold text-leaf">
          {article.category}
        </p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{article.title}</h1>
        <p className="mt-3 text-sm font-semibold text-muted">{article.publishedAt}</p>
        <div className="mt-8">
          <MarkdownRenderer content={article.content} />
        </div>
      </article>
    </div>
  );
}

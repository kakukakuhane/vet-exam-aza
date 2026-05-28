import Link from "next/link";
import { Clock3 } from "lucide-react";
import type { Article } from "@/data/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block rounded-lg border border-line bg-white p-4 transition hover:border-ink"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">
          {article.category}
        </span>
        <span className="flex items-center gap-1 text-xs font-semibold text-muted">
          <Clock3 size={13} aria-hidden />
          {article.readMinutes}分
        </span>
      </div>
      <h3 className="text-base font-extrabold leading-relaxed">{article.title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{article.excerpt}</p>
    </Link>
  );
}

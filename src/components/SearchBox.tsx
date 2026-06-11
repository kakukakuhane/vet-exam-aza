"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Article, Question, Subject } from "@/data/types";
import { getQuestionSectionLabel } from "@/lib/questionSections";

type SearchBoxProps = {
  questions: Question[];
  subjects: Subject[];
  articles: Article[];
};

export function SearchBox({ questions, subjects, articles }: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const word = query.trim().toLowerCase();
    if (!word) return [];

    const questionResults = questions
      .filter((item) =>
        [
          item.questionNumber,
          item.title,
          item.body,
          item.subject,
          item.category,
          item.exam,
          item.point,
          item.explanation,
          ...item.choices.map((choice) => choice.text)
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(word)
      )
      .map((item) => ({
        href: `/questions/${item.slug}`,
        title: item.title,
        label: `${item.questionNumber ?? getQuestionSectionLabel(item)} / ${item.subject}`
      }));

    const subjectResults = subjects
      .filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(word))
      .map((item) => ({ href: `/subjects/${item.slug}`, title: item.name, label: "科目" }));

    const articleResults = articles
      .filter((item) => `${item.title} ${item.excerpt}`.toLowerCase().includes(word))
      .map((item) => ({ href: `/articles/${item.slug}`, title: item.title, label: item.category }));

    return [...questionResults, ...subjectResults, ...articleResults].slice(0, 6);
  }, [articles, query, questions, subjects]);

  return (
    <section id="search" className="rounded-lg border border-line bg-white p-3 shadow-card sm:p-4">
      <label className="mb-2 block text-sm font-bold text-ink" htmlFor="site-search">
        サイト内検索
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2 focus-within:border-ink">
        <Search size={18} className="shrink-0 text-muted" aria-hidden />
        <input
          id="site-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="科目、問題番号、キーワードで検索"
          className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
        />
      </div>
      {results.length > 0 && (
        <div className="mt-3 divide-y divide-line rounded-lg border border-line bg-white">
          {results.map((result) => (
            <Link
              href={result.href}
              key={result.href}
              className="flex items-center justify-between gap-3 px-3 py-2.5 transition hover:bg-mint/60"
            >
              <span className="text-sm font-semibold">{result.title}</span>
              <span className="shrink-0 rounded-full bg-paper px-2 py-1 text-xs font-bold text-muted">
                {result.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { questions } from "@/data/questions";
import { subjectSummaries } from "@/data/subjects";
import { quizSets } from "@/data/training";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date()
    },
    {
      url: `${siteUrl}/questions`,
      lastModified: new Date()
    },
    {
      url: `${siteUrl}/practice`,
      lastModified: new Date()
    },
    {
      url: `${siteUrl}/admin`,
      lastModified: new Date()
    },
    ...questions.map((question) => ({
      url: `${siteUrl}/questions/${question.slug}`,
      lastModified: question.publishedAt
    })),
    ...subjectSummaries.map((subject) => ({
      url: `${siteUrl}/subjects/${subject.slug}`,
      lastModified: new Date()
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: article.publishedAt
    })),
    ...quizSets.map((set) => ({
      url: `${siteUrl}/training/quiz/${set.id}`,
      lastModified: new Date()
    }))
  ];
}

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export type MarkdownArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  content: string;
};

export function getMarkdownArticle(slug: string): MarkdownArticle | null {
  const filePath = path.join(articlesDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  return {
    slug,
    title: String(data.title ?? ""),
    excerpt: String(data.excerpt ?? ""),
    category: String(data.category ?? "記事"),
    publishedAt: String(data.publishedAt ?? ""),
    content
  };
}

export function getMarkdownArticleSlugs() {
  if (!fs.existsSync(articlesDirectory)) return [];
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

import type { Article } from "./types";

export const articles: Article[] = [
  {
    slug: "how-to-review-bacteriology",
    title: "細菌学は比較表から始める",
    excerpt: "グラム染色、毒素、酸素要求性を一枚の表にまとめる復習法。",
    category: "学習法",
    subjectSlug: "bacteriology",
    readMinutes: 4,
    publishedAt: "2026-04-18",
    popularity: 98
  },
  {
    slug: "clinical-signs-memory",
    title: "臨床徴候は病態で覚える",
    excerpt: "丸暗記になりがちな身体検査所見を、循環動態から理解する。",
    category: "解説記事",
    subjectSlug: "small-animal-internal",
    readMinutes: 5,
    publishedAt: "2026-04-12",
    popularity: 86
  },
  {
    slug: "weekly-quiz-routine",
    title: "週末30分の過去問ルーティン",
    excerpt: "演習、解説、再チェックを短時間で回すためのテンプレート。",
    category: "勉強法",
    readMinutes: 3,
    publishedAt: "2026-04-01",
    popularity: 73
  }
];

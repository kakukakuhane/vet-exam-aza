import { articles } from "@/data/articles";
import { questions } from "@/data/questions";
import { subjectSummaries, subjects } from "@/data/subjects";
import { quizSets } from "@/data/training";

export function getQuestion(slug: string) {
  return questions.find((question) => question.slug === slug);
}

export function getSubject(slug: string) {
  return subjects.find((subject) => subject.slug === slug);
}

export function getSubjectSummary(slug: string) {
  return subjectSummaries.find((summary) => summary.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getQuizSet(setId: string) {
  return quizSets.find((set) => set.id === setId);
}

export function getQuestionsBySubject(subjectSlug: string) {
  return questions.filter((question) => question.subjectSlug === subjectSlug);
}

export function getQuestionsForQuiz(setId: string) {
  const set = getQuizSet(setId);
  if (!set) return [];
  if (set.questionSlugs.includes("*")) return questions;
  return set.questionSlugs
    .map((slug) => getQuestion(slug))
    .filter((question): question is NonNullable<typeof question> => question !== undefined);
}

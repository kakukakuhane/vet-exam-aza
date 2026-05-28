import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizClient } from "@/components/QuizClient";
import { quizSets } from "@/data/training";
import { getQuestionsForQuiz, getQuizSet } from "@/lib/data";

type PageProps = {
  params: Promise<{ setId: string }>;
};

export const metadata: Metadata = {
  title: "問題演習",
  description: "1問ずつ回答し、解説と正答率を確認できる演習ページ。"
};

export function generateStaticParams() {
  return quizSets.map((set) => ({ setId: set.id }));
}

export default async function TrainingQuizPage({ params }: PageProps) {
  const { setId } = await params;
  const set = getQuizSet(setId);
  const quizQuestions = getQuestionsForQuiz(setId);
  if (!set || quizQuestions.length === 0) notFound();

  return <QuizClient title={set.title} questions={quizQuestions} useCustomSelection={setId === "custom"} />;
}

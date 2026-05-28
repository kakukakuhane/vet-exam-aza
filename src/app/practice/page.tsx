import type { Metadata } from "next";
import { PracticeBuilder } from "@/components/PracticeBuilder";
import {
  mockReviewSchedules,
  mockUserAnswers
} from "@/data/mockLearning";
import { questions } from "@/data/questions";
import { subjects } from "@/data/subjects";

export const metadata: Metadata = {
  title: "演習を作成",
  description: "年度、分野、問題区分、必須問題、画像問題、苦手条件を組み合わせて演習を作成します。"
};

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="mb-6">
        <p className="mb-3 inline-flex rounded-full border border-line bg-white px-3 py-1 text-xs font-extrabold text-leaf">
          Practice Builder
        </p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">演習を作成</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-muted">
          年度、分野、問題区分、必須問題、画像問題、間違えた問題、苦手問題を組み合わせて、
          自分用の演習セットを作成できます。
        </p>
      </section>
      <PracticeBuilder
        questions={questions}
        subjects={subjects}
        userAnswers={mockUserAnswers}
        reviewSchedules={mockReviewSchedules}
      />
    </div>
  );
}

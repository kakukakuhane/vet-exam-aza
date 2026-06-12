import type { Metadata } from "next";
import { PracticeBuilder } from "@/components/PracticeBuilder";
import { questions } from "@/data/questions";
import { subjects } from "@/data/subjects";

export const metadata: Metadata = {
  title: "演習を作成",
  description: "年度、問題区分、分野を組み合わせて、獣医師国家試験の演習を作成します。"
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
          年度、問題区分、分野を選んで、自分用の演習を作成できます。
          抽出後は同じ条件から1問ずつランダムに出題します。
        </p>
      </section>
      <PracticeBuilder questions={questions} subjects={subjects} />
    </div>
  );
}

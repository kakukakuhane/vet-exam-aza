import type { ExamSection, Question } from "@/data/types";

export type QuestionSectionFilter = "all" | "required" | Exclude<ExamSection, "必須">;

export const questionSectionTabs: { value: QuestionSectionFilter; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "required", label: "必須問題" },
  { value: "A", label: "A問題" },
  { value: "B", label: "B問題" },
  { value: "C", label: "C問題" },
  { value: "D", label: "D問題" }
];

export function isRequiredQuestion(question: Question) {
  return question.isRequired || question.section === "必須";
}

export function matchesQuestionSection(question: Question, section: QuestionSectionFilter) {
  if (section === "all") return true;
  if (section === "required") return isRequiredQuestion(question);
  return question.section === section && !isRequiredQuestion(question);
}

export function getQuestionSectionLabel(question: Question) {
  if (isRequiredQuestion(question)) return "必須問題";
  return `${question.section}問題`;
}

export function countByQuestionSection(questions: Question[]) {
  return Object.fromEntries(
    questionSectionTabs.map((tab) => [
      tab.value,
      questions.filter((question) => matchesQuestionSection(question, tab.value)).length
    ])
  ) as Record<QuestionSectionFilter, number>;
}

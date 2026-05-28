import type { PracticeFilters, Question, ReviewSchedule, UserAnswer } from "@/data/types";
import { isRequiredQuestion } from "./questionSections";

export const defaultPracticeFilters: PracticeFilters = {
  examYears: [],
  subjectSlugs: [],
  sections: [],
  requiredMode: "all",
  imageMode: "all",
  wrongOnly: false,
  weakOnly: false
};

export function filterQuestions(
  questions: Question[],
  filters: PracticeFilters,
  userAnswers: UserAnswer[] = [],
  reviewSchedules: ReviewSchedule[] = []
) {
  const wrongQuestionSlugs = new Set(
    userAnswers.filter((answer) => !answer.isCorrect).map((answer) => answer.questionSlug)
  );
  const weakQuestionSlugs = new Set([
    ...userAnswers
      .filter((answer) => answer.reviewRating === "unknown" || answer.reviewRating === "again")
      .map((answer) => answer.questionSlug),
    ...reviewSchedules
      .filter((schedule) => schedule.lastRating === "unknown" || schedule.lastRating === "again")
      .map((schedule) => schedule.questionSlug)
  ]);

  return questions.filter((question) => {
    const required = isRequiredQuestion(question);
    const yearOk = filters.examYears.length === 0 || filters.examYears.includes(question.examYear);
    const subjectOk =
      filters.subjectSlugs.length === 0 || filters.subjectSlugs.includes(question.subjectSlug);
    const sectionOk =
      filters.sections.length === 0 ||
      filters.sections.some((section) =>
        section === "必須" ? required : question.section === section && !required
      );
    const requiredOk =
      filters.requiredMode === "all" ||
      (filters.requiredMode === "requiredOnly" && required) ||
      (filters.requiredMode === "excludeRequired" && !required);
    const imageOk =
      filters.imageMode === "all" ||
      (filters.imageMode === "imageOnly" && question.isImageQuestion) ||
      (filters.imageMode === "excludeImage" && !question.isImageQuestion);
    const wrongOk = !filters.wrongOnly || wrongQuestionSlugs.has(question.slug);
    const weakOk = !filters.weakOnly || weakQuestionSlugs.has(question.slug);

    return yearOk && subjectOk && sectionOk && requiredOk && imageOk && wrongOk && weakOk;
  });
}

export function getAvailableExamYears(questions: Question[]) {
  return Array.from(new Set(questions.map((question) => question.examYear))).sort((a, b) => b - a);
}

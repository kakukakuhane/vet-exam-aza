import type { Question } from "./types";
import { officialBQuestions } from "./officialBQuestions";
import { officialQuestions } from "./officialQuestions";
import { officialRequiredQuestions } from "./officialRequiredQuestions";

export const questions: Question[] = [
  ...officialRequiredQuestions,
  ...officialQuestions,
  ...officialBQuestions
];

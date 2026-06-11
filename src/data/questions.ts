import type { Question } from "./types";
import { officialA75Questions } from "./officialA75Questions";
import { officialBQuestions } from "./officialBQuestions";
import { officialQuestions } from "./officialQuestions";
import { officialRequired75Questions } from "./officialRequired75Questions";
import { officialRequiredQuestions } from "./officialRequiredQuestions";

export const questions: Question[] = [
  ...officialRequired75Questions,
  ...officialA75Questions,
  ...officialRequiredQuestions,
  ...officialQuestions,
  ...officialBQuestions
];

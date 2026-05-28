export type Subject = {
  slug: string;
  name: string;
  description: string;
  questionCount: number;
  color: string;
};

export type Choice = {
  id: string;
  text: string;
};

export type RelatedQuestion = {
  slug: string;
  title: string;
};

export type ExamSection = "必須" | "A" | "B" | "C" | "D";
export type Difficulty = "易" | "標準" | "難";
export type MembershipPlan = "free" | "premium";
export type SubscriptionStatus = "trialing" | "active" | "past_due" | "canceled";
export type ReviewRating = "unknown" | "again" | "hard" | "normal" | "easy";
export type ExamSessionMode =
  | "year"
  | "subject"
  | "section"
  | "required"
  | "image"
  | "wrong"
  | "weak"
  | "anki"
  | "custom";

export type Question = {
  slug: string;
  sourceId?: number;
  questionNumber?: string;
  category?: string;
  examYear: number;
  section: ExamSection;
  isImageQuestion: boolean;
  isRequired: boolean;
  exam: string;
  subjectSlug: string;
  subject: string;
  title: string;
  body: string;
  choices: Choice[];
  correctChoiceIds: string[];
  difficulty: Difficulty;
  importance: 1 | 2 | 3;
  explanation: string;
  point?: string;
  frequency?: number;
  keyPoints: string[];
  related: RelatedQuestion[];
  publishedAt: string;
};

export type PracticeFilters = {
  examYears: number[];
  subjectSlugs: string[];
  sections: ExamSection[];
  requiredMode: "all" | "requiredOnly" | "excludeRequired";
  imageMode: "all" | "imageOnly" | "excludeImage";
  wrongOnly?: boolean;
  weakOnly?: boolean;
};

export type User = {
  id: string;
  displayName: string;
  email: string;
  plan: MembershipPlan;
  role: "learner" | "admin";
  createdAt: string;
};

export type UserAnswer = {
  id: string;
  userId: string;
  questionSlug: string;
  examSessionId?: string;
  selectedChoiceIds: string[];
  isCorrect: boolean;
  reviewRating?: ReviewRating;
  answeredAt: string;
  elapsedSeconds?: number;
};

export type Bookmark = {
  userId: string;
  questionSlug: string;
  createdAt: string;
};

export type ReviewSchedule = {
  userId: string;
  questionSlug: string;
  easeFactor: number;
  intervalDays: number;
  nextReviewDate: string;
  lastReviewedAt?: string;
  reviewCount: number;
  lastRating?: ReviewRating;
};

export type Subscription = {
  userId: string;
  plan: MembershipPlan;
  status: SubscriptionStatus;
  currentPeriodEnd?: string;
  provider?: "stripe" | "manual";
};

export type ExamSession = {
  id: string;
  userId?: string;
  title: string;
  mode: ExamSessionMode;
  filters: PracticeFilters;
  questionSlugs: string[];
  startedAt: string;
  completedAt?: string;
};

export type QuestionAnalytics = {
  questionSlug: string;
  attempts: number;
  correctRate: number;
  unknownCount: number;
};

export type SubjectAnalytics = {
  subjectSlug: string;
  subjectName: string;
  attempts: number;
  correctRate: number;
  weakRate: number;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  subjectSlug?: string;
  readMinutes: number;
  publishedAt: string;
  popularity: number;
};

export type SummarySection = {
  id: string;
  title: string;
  lead: string;
  points: string[];
  relatedQuestionSlugs: string[];
};

export type SubjectSummary = {
  slug: string;
  title: string;
  description: string;
  sections: SummarySection[];
};

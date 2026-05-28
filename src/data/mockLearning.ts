import type {
  Bookmark,
  ExamSession,
  QuestionAnalytics,
  ReviewSchedule,
  SubjectAnalytics,
  Subscription,
  User,
  UserAnswer
} from "./types";

export const mockUser: User = {
  id: "mock-user-1",
  displayName: "学習中ユーザー",
  email: "student@example.com",
  plan: "premium",
  role: "admin",
  createdAt: "2026-05-01T00:00:00.000Z"
};

export const mockUserAnswers: UserAnswer[] = [
  {
    id: "answer-1",
    userId: mockUser.id,
    questionSlug: "anatomy-1",
    selectedChoiceIds: ["d"],
    isCorrect: true,
    reviewRating: "normal",
    answeredAt: "2026-05-20T10:00:00.000Z",
    elapsedSeconds: 55
  },
  {
    id: "answer-2",
    userId: mockUser.id,
    questionSlug: "physiology-13",
    selectedChoiceIds: ["a"],
    isCorrect: false,
    reviewRating: "unknown",
    answeredAt: "2026-05-20T10:04:00.000Z",
    elapsedSeconds: 70
  },
  {
    id: "answer-3",
    userId: mockUser.id,
    questionSlug: "pharmacology-32",
    selectedChoiceIds: ["e"],
    isCorrect: true,
    reviewRating: "hard",
    answeredAt: "2026-05-20T10:08:00.000Z",
    elapsedSeconds: 92
  },
  {
    id: "answer-4",
    userId: mockUser.id,
    questionSlug: "bacteriology-51",
    selectedChoiceIds: ["c"],
    isCorrect: false,
    reviewRating: "again",
    answeredAt: "2026-05-20T10:12:00.000Z",
    elapsedSeconds: 44
  }
];

export const mockBookmarks: Bookmark[] = [
  {
    userId: mockUser.id,
    questionSlug: "pharmacology-32",
    createdAt: "2026-05-20T10:09:00.000Z"
  }
];

export const mockReviewSchedules: ReviewSchedule[] = [
  {
    userId: mockUser.id,
    questionSlug: "physiology-13",
    easeFactor: 2.15,
    intervalDays: 1,
    nextReviewDate: "2026-05-21T10:04:00.000Z",
    lastReviewedAt: "2026-05-20T10:04:00.000Z",
    reviewCount: 1,
    lastRating: "unknown"
  },
  {
    userId: mockUser.id,
    questionSlug: "bacteriology-51",
    easeFactor: 2.25,
    intervalDays: 1,
    nextReviewDate: "2026-05-21T10:12:00.000Z",
    lastReviewedAt: "2026-05-20T10:12:00.000Z",
    reviewCount: 2,
    lastRating: "again"
  }
];

export const mockSubscription: Subscription = {
  userId: mockUser.id,
  plan: "premium",
  status: "active",
  currentPeriodEnd: "2026-06-20T00:00:00.000Z",
  provider: "stripe"
};

export const mockExamSessions: ExamSession[] = [
  {
    id: "session-76a-weak",
    userId: mockUser.id,
    title: "第76回A問題 苦手復習",
    mode: "weak",
    filters: {
      examYears: [76],
      subjectSlugs: [],
      sections: ["A"],
      requiredMode: "excludeRequired",
      imageMode: "all",
      weakOnly: true
    },
    questionSlugs: ["physiology-13", "bacteriology-51"],
    startedAt: "2026-05-20T10:00:00.000Z"
  }
];

export const mockQuestionAnalytics: QuestionAnalytics[] = [
  { questionSlug: "bacteriology-51", attempts: 42, correctRate: 0.38, unknownCount: 18 },
  { questionSlug: "physiology-13", attempts: 39, correctRate: 0.46, unknownCount: 16 },
  { questionSlug: "pharmacology-32", attempts: 55, correctRate: 0.52, unknownCount: 12 },
  { questionSlug: "anatomy-1", attempts: 61, correctRate: 0.71, unknownCount: 6 }
];

export const mockSubjectAnalytics: SubjectAnalytics[] = [
  { subjectSlug: "bacteriology", subjectName: "細菌学", attempts: 96, correctRate: 0.54, weakRate: 0.31 },
  { subjectSlug: "physiology", subjectName: "生理学", attempts: 88, correctRate: 0.59, weakRate: 0.27 },
  { subjectSlug: "pharmacology", subjectName: "薬理学", attempts: 112, correctRate: 0.63, weakRate: 0.21 },
  { subjectSlug: "anatomy", subjectName: "解剖学", attempts: 120, correctRate: 0.68, weakRate: 0.18 }
];

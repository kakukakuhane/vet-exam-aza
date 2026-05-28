import type { ReviewRating, ReviewSchedule } from "@/data/types";

const ratingIntervals: Record<ReviewRating, number> = {
  unknown: 1,
  again: 1,
  hard: 3,
  normal: 7,
  easy: 30
};

const ratingEaseDelta: Record<ReviewRating, number> = {
  unknown: -0.35,
  again: -0.25,
  hard: -0.1,
  normal: 0,
  easy: 0.15
};

export function calculateNextReview(
  rating: ReviewRating,
  previous?: Pick<ReviewSchedule, "easeFactor" | "intervalDays" | "reviewCount">
) {
  const baseEase = previous?.easeFactor ?? 2.5;
  const easeFactor = Math.max(1.3, Number((baseEase + ratingEaseDelta[rating]).toFixed(2)));
  const intervalDays =
    rating === "unknown" || rating === "again"
      ? ratingIntervals[rating]
      : Math.max(ratingIntervals[rating], Math.round((previous?.intervalDays ?? 1) * easeFactor));
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);

  return {
    easeFactor,
    intervalDays,
    nextReviewDate: nextReviewDate.toISOString(),
    reviewCount: (previous?.reviewCount ?? 0) + 1
  };
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ExamSection = "必須" | "A" | "B" | "C" | "D";
export type MembershipPlan = "free" | "premium";
export type SubscriptionStatus = "trialing" | "active" | "past_due" | "canceled";
export type ContentStatus = "draft" | "published" | "archived";
export type ReviewRating = "unknown" | "again" | "hard" | "normal" | "easy";

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          display_name: string | null;
          email: string | null;
          avatar_url: string | null;
          role: "learner" | "admin";
          plan: MembershipPlan;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          role?: "learner" | "admin";
          plan?: MembershipPlan;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          display_name?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          role?: "learner" | "admin";
          plan?: MembershipPlan;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan: MembershipPlan;
          status: SubscriptionStatus;
          provider: string;
          provider_customer_id: string | null;
          provider_subscription_id: string | null;
          current_period_start: string | null;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          plan?: MembershipPlan;
          status?: SubscriptionStatus;
          provider?: string;
          provider_customer_id?: string | null;
          provider_subscription_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
        };
        Update: {
          plan?: MembershipPlan;
          status?: SubscriptionStatus;
          provider_customer_id?: string | null;
          provider_subscription_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          updated_at?: string;
        };
      };
      exams: {
        Row: {
          id: string;
          exam_year: number;
          title: string;
          held_at: string | null;
          created_at: string;
        };
        Insert: {
          exam_year: number;
          title: string;
          held_at?: string | null;
        };
        Update: {
          exam_year?: number;
          title?: string;
          held_at?: string | null;
        };
      };
      subjects: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          slug: string;
          name: string;
          description?: string | null;
          order_index?: number;
        };
        Update: {
          slug?: string;
          name?: string;
          description?: string | null;
          order_index?: number;
        };
      };
      questions: {
        Row: {
          id: string;
          slug: string;
          exam_id: string | null;
          exam_year: number;
          section: ExamSection;
          question_number: number;
          subject_id: string;
          category_label: string | null;
          title: string;
          body: string;
          correct_choice_ids: string[];
          explanation: string;
          explanation_short: string | null;
          point: string | null;
          key_points: string[];
          frequency: number;
          importance: number;
          difficulty: string;
          is_required: boolean;
          is_image_question: boolean;
          is_premium: boolean;
          status: ContentStatus;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          slug: string;
          exam_id?: string | null;
          exam_year: number;
          section: ExamSection;
          question_number: number;
          subject_id: string;
          category_label?: string | null;
          title: string;
          body: string;
          correct_choice_ids: string[];
          explanation: string;
          explanation_short?: string | null;
          point?: string | null;
          key_points?: string[];
          frequency?: number;
          importance?: number;
          difficulty?: string;
          is_required?: boolean;
          is_image_question?: boolean;
          is_premium?: boolean;
          status?: ContentStatus;
          published_at?: string | null;
        };
        Update: {
          title?: string;
          body?: string;
          correct_choice_ids?: string[];
          explanation?: string;
          point?: string | null;
          frequency?: number;
          importance?: number;
          is_required?: boolean;
          is_image_question?: boolean;
          is_premium?: boolean;
          status?: ContentStatus;
          published_at?: string | null;
        };
      };
      question_choices: {
        Row: {
          id: string;
          question_id: string;
          choice_key: string;
          body: string;
          order_index: number;
        };
        Insert: {
          question_id: string;
          choice_key: string;
          body: string;
          order_index?: number;
        };
        Update: {
          choice_key?: string;
          body?: string;
          order_index?: number;
        };
      };
      userAnswers: {
        Row: {
          id: string;
          user_id: string;
          question_id: string;
          exam_session_id: string | null;
          selected_choice_ids: string[];
          is_correct: boolean;
          review_rating: ReviewRating | null;
          elapsed_seconds: number | null;
          answered_at: string;
        };
        Insert: {
          user_id: string;
          question_id: string;
          exam_session_id?: string | null;
          selected_choice_ids: string[];
          is_correct: boolean;
          review_rating?: ReviewRating | null;
          elapsed_seconds?: number | null;
        };
        Update: {
          selected_choice_ids?: string[];
          is_correct?: boolean;
          review_rating?: ReviewRating | null;
          elapsed_seconds?: number | null;
        };
      };
      bookmarks: {
        Row: {
          user_id: string;
          question_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          question_id: string;
          created_at?: string;
        };
        Update: {
          created_at?: string;
        };
      };
      reviewSchedules: {
        Row: {
          user_id: string;
          question_id: string;
          ease_factor: number;
          interval_days: number;
          next_review_date: string;
          last_reviewed_at: string | null;
          review_count: number;
          last_rating: ReviewRating | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          question_id: string;
          ease_factor?: number;
          interval_days?: number;
          next_review_date?: string;
          last_reviewed_at?: string | null;
          review_count?: number;
          last_rating?: ReviewRating | null;
        };
        Update: {
          ease_factor?: number;
          interval_days?: number;
          next_review_date?: string;
          last_reviewed_at?: string | null;
          review_count?: number;
          last_rating?: ReviewRating | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      question_answer_stats: {
        Row: {
          question_id: string;
          slug: string;
          exam_year: number;
          section: ExamSection;
          subject_id: string;
          attempts: number;
          correct_rate: number;
          unknown_count: number;
          weak_count: number;
        };
      };
      subject_answer_stats: {
        Row: {
          subject_id: string;
          slug: string;
          name: string;
          attempts: number;
          correct_rate: number;
          weak_count: number;
        };
      };
    };
  };
};

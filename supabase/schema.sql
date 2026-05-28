create extension if not exists "pgcrypto";

create type public.membership_plan as enum ('free', 'premium');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'canceled');
create type public.content_status as enum ('draft', 'published', 'archived');
create type public.exam_section as enum ('必須', 'A', 'B', 'C', 'D');
create type public.review_rating as enum ('unknown', 'again', 'hard', 'normal', 'easy');
create type public.exam_session_mode as enum (
  'year',
  'subject',
  'section',
  'required',
  'image',
  'wrong',
  'weak',
  'anki',
  'custom'
);

create table public."users" (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  email text,
  avatar_url text,
  role text not null default 'learner' check (role in ('learner', 'admin')),
  plan public.membership_plan not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public."subscriptions" (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public."users"(id) on delete cascade,
  plan public.membership_plan not null default 'free',
  status public.subscription_status not null default 'trialing',
  provider text not null default 'stripe',
  provider_customer_id text,
  provider_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.exams (
  id uuid primary key default gen_random_uuid(),
  exam_year integer not null unique,
  title text not null,
  held_at date,
  created_at timestamptz not null default now()
);

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  exam_id uuid references public.exams(id) on delete set null,
  exam_year integer not null,
  section public.exam_section not null,
  question_number integer not null,
  subject_id uuid not null references public.subjects(id) on delete restrict,
  category_label text,
  title text not null,
  body text not null,
  correct_choice_ids text[] not null,
  explanation text not null,
  explanation_short text,
  point text,
  key_points text[] not null default '{}',
  frequency integer not null default 1 check (frequency between 1 and 5),
  importance integer not null default 1 check (importance between 1 and 3),
  difficulty text not null default '標準',
  is_required boolean not null default false,
  is_image_question boolean not null default false,
  is_premium boolean not null default false,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (exam_year, section, question_number)
);

create table public.question_choices (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  choice_key text not null,
  body text not null,
  order_index integer not null default 0,
  unique (question_id, choice_key)
);

create table public.question_assets (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  asset_type text not null check (asset_type in ('xray', 'pathology', 'cytology', 'photo', 'chart', 'other')),
  storage_path text not null,
  alt_text text,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.question_relations (
  question_id uuid not null references public.questions(id) on delete cascade,
  related_question_id uuid not null references public.questions(id) on delete cascade,
  relation_type text not null default 'related',
  primary key (question_id, related_question_id)
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  subject_id uuid references public.subjects(id) on delete set null,
  title text not null,
  excerpt text not null,
  body_markdown text not null,
  category text not null default '記事',
  status public.content_status not null default 'draft',
  is_premium boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.exam_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public."users"(id) on delete cascade,
  title text not null,
  mode public.exam_session_mode not null default 'custom',
  filters jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.exam_session_questions (
  exam_session_id uuid not null references public.exam_sessions(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  order_index integer not null default 0,
  primary key (exam_session_id, question_id)
);

create table public."userAnswers" (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public."users"(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  exam_session_id uuid references public.exam_sessions(id) on delete set null,
  selected_choice_ids text[] not null,
  is_correct boolean not null,
  review_rating public.review_rating,
  elapsed_seconds integer,
  answered_at timestamptz not null default now()
);

create table public."bookmarks" (
  user_id uuid not null references public."users"(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create table public."reviewSchedules" (
  user_id uuid not null references public."users"(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  ease_factor numeric(4, 2) not null default 2.50,
  interval_days integer not null default 1,
  next_review_date timestamptz not null default now(),
  last_reviewed_at timestamptz,
  review_count integer not null default 0,
  last_rating public.review_rating,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create view public.question_answer_stats as
select
  q.id as question_id,
  q.slug,
  q.exam_year,
  q.section,
  q.subject_id,
  count(a.id) as attempts,
  coalesce(avg(case when a.is_correct then 1 else 0 end), 0) as correct_rate,
  count(a.id) filter (where a.review_rating = 'unknown') as unknown_count,
  count(a.id) filter (where a.review_rating in ('unknown', 'again', 'hard')) as weak_count
from public.questions q
left join public."userAnswers" a on a.question_id = q.id
group by q.id;

create view public.subject_answer_stats as
select
  s.id as subject_id,
  s.slug,
  s.name,
  count(a.id) as attempts,
  coalesce(avg(case when a.is_correct then 1 else 0 end), 0) as correct_rate,
  count(a.id) filter (where a.review_rating in ('unknown', 'again', 'hard')) as weak_count
from public.subjects s
left join public.questions q on q.subject_id = s.id
left join public."userAnswers" a on a.question_id = q.id
group by s.id;

alter table public."users" enable row level security;
alter table public."subscriptions" enable row level security;
alter table public.exams enable row level security;
alter table public.subjects enable row level security;
alter table public.questions enable row level security;
alter table public.question_choices enable row level security;
alter table public.question_assets enable row level security;
alter table public.question_relations enable row level security;
alter table public.articles enable row level security;
alter table public.exam_sessions enable row level security;
alter table public.exam_session_questions enable row level security;
alter table public."userAnswers" enable row level security;
alter table public."bookmarks" enable row level security;
alter table public."reviewSchedules" enable row level security;

create policy "public exams are readable" on public.exams for select using (true);
create policy "public subjects are readable" on public.subjects for select using (true);

create policy "published free questions are readable" on public.questions
  for select using (status = 'published' and is_premium = false);

create policy "premium users can read premium questions" on public.questions
  for select using (
    status = 'published'
    and (
      is_premium = false
      or exists (
        select 1 from public."users"
        where "users".id = auth.uid() and "users".plan = 'premium'
      )
    )
  );

create policy "published choices are readable" on public.question_choices
  for select using (
    exists (
      select 1 from public.questions q
      where q.id = question_choices.question_id and q.status = 'published'
    )
  );

create policy "published assets are readable" on public.question_assets
  for select using (
    exists (
      select 1 from public.questions q
      where q.id = question_assets.question_id and q.status = 'published'
    )
  );

create policy "published articles are readable" on public.articles
  for select using (status = 'published' and is_premium = false);

create policy "users read own user row" on public."users" for select using (id = auth.uid());
create policy "users update own user row" on public."users" for update using (id = auth.uid());

create policy "users read own subscription" on public."subscriptions"
  for select using (user_id = auth.uid());

create policy "users manage own sessions" on public.exam_sessions
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "users read own session questions" on public.exam_session_questions
  for select using (
    exists (
      select 1 from public.exam_sessions s
      where s.id = exam_session_questions.exam_session_id and s.user_id = auth.uid()
    )
  );

create policy "users read own answers" on public."userAnswers"
  for select using (user_id = auth.uid());
create policy "users insert own answers" on public."userAnswers"
  for insert with check (user_id = auth.uid());

create policy "users manage own bookmarks" on public."bookmarks"
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "users manage own review schedules" on public."reviewSchedules"
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create index questions_exam_idx on public.questions(exam_year, section, question_number);
create index questions_filter_idx on public.questions(exam_year, section, subject_id, is_required, is_image_question);
create index questions_status_idx on public.questions(status, is_premium, published_at desc);
create index question_choices_question_idx on public.question_choices(question_id, order_index);
create index question_assets_question_idx on public.question_assets(question_id, order_index);
create index user_answers_user_question_idx on public."userAnswers"(user_id, question_id, answered_at desc);
create index user_answers_question_idx on public."userAnswers"(question_id, is_correct, review_rating);
create index review_schedules_due_idx on public."reviewSchedules"(user_id, next_review_date);
create index subscriptions_user_status_idx on public."subscriptions"(user_id, status);

"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, Filter, PlayCircle, RotateCcw, Search, XCircle } from "lucide-react";
import type { ExamSection, PracticeFilters, Question, Subject } from "@/data/types";
import { defaultPracticeFilters, filterQuestions, getAvailableExamYears } from "@/lib/practice";

type PracticeBuilderProps = {
  questions: Question[];
  subjects: Subject[];
};

type SelectOption = {
  value: string;
  label: string;
};

const sectionOptions: SelectOption[] = [
  { value: "必須", label: "必須問題" },
  { value: "A", label: "A問題" },
  { value: "B", label: "B問題" }
];

const sectionLabels: Record<string, string> = {
  必須: "必須問題",
  A: "A問題",
  B: "B問題"
};

function MultiSelectDropdown({
  label,
  options,
  selectedValues,
  placeholder,
  onToggle,
  onClear
}: {
  label: string;
  options: SelectOption[];
  selectedValues: string[];
  placeholder: string;
  onToggle: (value: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabels = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label);
  const buttonText =
    selectedLabels.length === 0
      ? placeholder
      : selectedLabels.length <= 2
        ? selectedLabels.join("、")
        : `${selectedLabels.slice(0, 2).join("、")} +${selectedLabels.length - 2}`;

  return (
    <div className="relative">
      <span className="mb-2 block text-sm font-extrabold">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-line bg-paper px-3 py-2 text-left text-sm font-extrabold text-ink transition hover:border-ink"
        aria-expanded={open}
      >
        <span className="min-w-0 truncate">{buttonText}</span>
        <ChevronDown size={17} className={`shrink-0 transition ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 max-h-72 overflow-auto rounded-lg border border-line bg-white p-2 shadow-card">
          <div className="mb-2 flex items-center justify-between gap-2 px-1">
            <span className="text-xs font-bold text-muted">{selectedValues.length}件選択中</span>
            <button
              type="button"
              onClick={onClear}
              className="rounded-full border border-line px-2.5 py-1 text-xs font-bold text-muted transition hover:border-ink hover:text-ink"
            >
              解除
            </button>
          </div>
          <div className="grid gap-1">
            {options.map((option) => {
              const checked = selectedValues.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold transition hover:bg-paper"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(option.value)}
                    className="h-4 w-4 accent-ink"
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function pickRandomQuestion(
  candidates: Question[],
  excludedSlugs: string[] = [],
  previousSlug?: string
) {
  const available = candidates.filter((question) => !excludedSlugs.includes(question.slug));
  if (available.length === 0) return null;
  const withoutImmediateRepeat = available.filter((question) => question.slug !== previousSlug);
  const finalCandidates = withoutImmediateRepeat.length > 0 ? withoutImmediateRepeat : available;
  const index = Math.floor(Math.random() * finalCandidates.length);

  return finalCandidates[index];
}

function makeFilters(
  selectedYears: string[],
  selectedSections: string[],
  selectedSubjects: string[]
): PracticeFilters {
  const sections = selectedSections.filter((value): value is ExamSection =>
    sectionOptions.some((option) => option.value === value)
  );

  return {
    ...defaultPracticeFilters,
    examYears: selectedYears.map(Number),
    subjectSlugs: selectedSubjects,
    sections,
    requiredMode: "all",
    imageMode: "all",
    wrongOnly: false,
    weakOnly: false
  };
}

function isCorrectChoice(question: Question, choiceId: string | null) {
  return Boolean(choiceId && question.correctChoiceIds.includes(choiceId));
}

export function PracticeBuilder({ questions, subjects }: PracticeBuilderProps) {
  const yearOptions = useMemo(
    () =>
      getAvailableExamYears(questions).map((year) => ({
        value: String(year),
        label: `第${year}回`
      })),
    [questions]
  );
  const subjectOptions = useMemo(
    () =>
      subjects.map((subject) => ({
        value: subject.slug,
        label: subject.name
      })),
    [subjects]
  );

  const [selectedYears, setSelectedYears] = useState<string[]>(yearOptions.map((option) => option.value));
  const [selectedSections, setSelectedSections] = useState<string[]>(sectionOptions.map((option) => option.value));
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [extractedQuestions, setExtractedQuestions] = useState<Question[]>([]);
  const [hasExtracted, setHasExtracted] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shownSlugs, setShownSlugs] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const previewCount = useMemo(() => {
    if (selectedYears.length === 0 || selectedSections.length === 0) return 0;
    return filterQuestions(questions, makeFilters(selectedYears, selectedSections, selectedSubjects)).length;
  }, [questions, selectedSections, selectedSubjects, selectedYears]);

  const correctChoiceText = currentQuestion
    ? currentQuestion.choices
        .filter((choice) => currentQuestion.correctChoiceIds.includes(choice.id))
        .map((choice) => choice.text)
        .join(" / ")
    : "";
  const answeredCorrectly = currentQuestion ? isCorrectChoice(currentQuestion, selectedChoiceId) : false;

  function toggleSelected(value: string, selectedValues: string[], setter: (values: string[]) => void) {
    setter(
      selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value]
    );
  }

  function resetAnswerState() {
    setSelectedChoiceId(null);
    setShowExplanation(false);
  }

  function extractQuestions() {
    if (selectedYears.length === 0 || selectedSections.length === 0) {
      setExtractedQuestions([]);
      setHasExtracted(true);
      setIsPracticeMode(false);
      setIsSessionComplete(false);
      setCurrentQuestion(null);
      setMessage("年度と問題区分を1つ以上選択してください。");
      return;
    }

    const filters = makeFilters(selectedYears, selectedSections, selectedSubjects);
    const filtered = filterQuestions(questions, filters);

    setExtractedQuestions(filtered);
    setHasExtracted(true);
    setIsPracticeMode(false);
    setIsSessionComplete(false);
    setCurrentQuestion(null);
    setShownSlugs([]);
    setCorrectCount(0);
    resetAnswerState();
    setMessage(filtered.length > 0 ? null : "条件に一致する問題がありません。条件を広げて再抽出してください。");
  }

  function startPractice() {
    const question = pickRandomQuestion(extractedQuestions);

    setCurrentQuestion(question);
    setShownSlugs(question ? [question.slug] : []);
    setIsPracticeMode(Boolean(question));
    setIsSessionComplete(false);
    setCorrectCount(0);
    resetAnswerState();
    setMessage(question ? null : "条件に一致する問題がありません。条件を広げて再抽出してください。");
  }

  function goToNextQuestion() {
    if (!currentQuestion) return;
    const question = pickRandomQuestion(extractedQuestions, shownSlugs, currentQuestion.slug);

    if (!question) {
      setCurrentQuestion(null);
      setIsPracticeMode(false);
      setIsSessionComplete(true);
      setMessage(null);
      return;
    }

    setCurrentQuestion(question);
    setShownSlugs([...shownSlugs, question.slug]);
    resetAnswerState();
    setMessage(null);
  }

  function answerQuestion(choiceId: string) {
    if (!currentQuestion || showExplanation) return;
    setSelectedChoiceId(choiceId);
    setShowExplanation(true);
    if (isCorrectChoice(currentQuestion, choiceId)) {
      setCorrectCount((count) => count + 1);
    }
  }

  function retrySameConditions() {
    startPractice();
  }

  function changeConditions() {
    setIsPracticeMode(false);
    setIsSessionComplete(false);
    setCurrentQuestion(null);
    setShownSlugs([]);
    setCorrectCount(0);
    resetAnswerState();
    setMessage(null);
  }

  return (
    <section className="rounded-lg border border-line bg-white p-4 shadow-card sm:p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Filter size={18} className="text-leaf" aria-hidden />
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf">Practice Builder</p>
          </div>
          <h2 className="text-2xl font-extrabold">演習作成</h2>
          <p className="mt-1 text-sm leading-7 text-muted">
            年度、問題区分、分野を組み合わせて抽出し、同じ条件からランダムに1問ずつ出題します。
          </p>
        </div>
        <div className="rounded-lg bg-paper px-3 py-2 text-sm font-extrabold text-ink sm:text-right">
          抽出対象 <span className="text-leaf">{previewCount}</span> 問
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <MultiSelectDropdown
          label="年度"
          options={yearOptions}
          selectedValues={selectedYears}
          placeholder="年度を選択"
          onToggle={(value) => toggleSelected(value, selectedYears, setSelectedYears)}
          onClear={() => setSelectedYears([])}
        />
        <MultiSelectDropdown
          label="問題区分"
          options={sectionOptions}
          selectedValues={selectedSections}
          placeholder="問題区分を選択"
          onToggle={(value) => toggleSelected(value, selectedSections, setSelectedSections)}
          onClear={() => setSelectedSections([])}
        />
        <MultiSelectDropdown
          label="分野"
          options={subjectOptions}
          selectedValues={selectedSubjects}
          placeholder="すべての分野"
          onToggle={(value) => toggleSelected(value, selectedSubjects, setSelectedSubjects)}
          onClear={() => setSelectedSubjects([])}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-lg border border-line bg-paper p-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-extrabold">条件に合う問題を抽出</p>
          <p className="mt-1 text-xs font-semibold leading-6 text-muted">
            まず対象問題を抽出し、その後に同じ条件で演習を開始できます。
          </p>
        </div>
        <button
          type="button"
          onClick={extractQuestions}
          className="on-dark inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold"
        >
          <Search size={18} aria-hidden />
          抽出
        </button>
      </div>

      {hasExtracted && extractedQuestions.length > 0 && !isPracticeMode && !isSessionComplete && (
        <div className="mt-4 flex flex-col gap-3 rounded-lg border border-line bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-extrabold">抽出結果: {extractedQuestions.length}問</p>
            <p className="mt-1 text-sm leading-7 text-muted">
              抽出した問題だけを使って、1問ずつランダムに演習します。
            </p>
          </div>
          <button
            type="button"
            onClick={startPractice}
            className="on-dark inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold sm:w-auto"
          >
            <PlayCircle size={18} aria-hidden />
            抽出した問題を解く
          </button>
        </div>
      )}

      {message && (
        <p className="mt-4 rounded-lg border border-amber/60 bg-amber/20 px-3 py-2 text-sm font-bold text-ink">
          {message}
        </p>
      )}

      {isSessionComplete && (
        <div className="mt-5 rounded-lg border border-line bg-white p-5 shadow-sm">
          <p className="text-xl font-extrabold">この条件の問題をすべて解き終わりました</p>
          <p className="mt-2 text-sm font-bold leading-7 text-muted">
            正答数: {correctCount} / {extractedQuestions.length}
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={retrySameConditions}
              className="on-dark inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold"
            >
              <RotateCcw size={17} aria-hidden />
              同じ条件でもう一度演習する
            </button>
            <button
              type="button"
              onClick={changeConditions}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-extrabold text-ink transition hover:border-ink"
            >
              条件を変更する
            </button>
          </div>
        </div>
      )}

      {currentQuestion && (
        <article className="mt-5 rounded-lg border border-line bg-white p-4 shadow-sm sm:p-5">
          <p className="mb-3 text-sm font-extrabold text-leaf">
            {shownSlugs.length}問目 / 全{extractedQuestions.length}問
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-extrabold text-white">
              第{currentQuestion.examYear}回
            </span>
            <span className="rounded-full bg-mint px-2.5 py-1 text-xs font-extrabold text-leaf">
              {sectionLabels[currentQuestion.section] ?? `${currentQuestion.section}問題`}
            </span>
            <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-extrabold text-muted">
              {currentQuestion.subject}
            </span>
            {currentQuestion.questionNumber && (
              <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-extrabold text-muted">
                {currentQuestion.questionNumber}
              </span>
            )}
          </div>

          <h3 className="mt-4 text-lg font-extrabold leading-8">{currentQuestion.title}</h3>
          <p className="mt-3 whitespace-pre-line text-base leading-8 text-ink">{currentQuestion.body}</p>

          <div className="mt-5 grid gap-2">
            {currentQuestion.choices.map((choice) => {
              const selected = selectedChoiceId === choice.id;
              const correct = currentQuestion.correctChoiceIds.includes(choice.id);
              const revealClass = showExplanation
                ? correct
                  ? "border-leaf bg-mint text-leaf"
                  : selected
                    ? "border-red-300 bg-red-50 text-red-700"
                    : "border-line bg-white text-ink"
                : selected
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink hover:border-ink";

              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => answerQuestion(choice.id)}
                  className={`flex min-h-12 w-full items-start gap-3 rounded-lg border px-3 py-3 text-left text-sm font-bold leading-6 transition ${revealClass}`}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-current text-xs">
                    {choice.id}
                  </span>
                  <span>{choice.text}</span>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="mt-5 rounded-lg border border-line bg-paper p-4">
              <div className="flex items-center gap-2">
                {answeredCorrectly ? (
                  <CheckCircle2 size={20} className="text-leaf" aria-hidden />
                ) : (
                  <XCircle size={20} className="text-red-600" aria-hidden />
                )}
                <p className="text-base font-extrabold">
                  {answeredCorrectly ? "正解です" : "不正解です"}
                </p>
              </div>
              <p className="mt-3 text-sm font-bold leading-7">正答: {correctChoiceText}</p>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted">
                {currentQuestion.explanation}
              </p>
              {currentQuestion.point && (
                <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm font-bold leading-7 text-ink">
                  ポイント: {currentQuestion.point}
                </p>
              )}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-muted">
              正答数: {correctCount} / {shownSlugs.length}
            </p>
            {showExplanation && (
              <button
                type="button"
                onClick={goToNextQuestion}
                className="on-dark inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-extrabold"
              >
                次の問題へ
              </button>
            )}
          </div>
        </article>
      )}
    </section>
  );
}

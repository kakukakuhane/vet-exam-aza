"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { SummarySection } from "@/data/types";
import { getQuestion } from "@/lib/data";

export function CollapsibleSections({ sections }: { sections: SummarySection[] }) {
  const [openIds, setOpenIds] = useState(() => new Set(sections.slice(0, 1).map((section) => section.id)));

  function toggle(id: string) {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const isOpen = openIds.has(section.id);
        return (
          <section id={section.id} key={section.id} className="scroll-mt-24 rounded-lg border border-line bg-white">
            <button
              type="button"
              onClick={() => toggle(section.id)}
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
            >
              <span>
                <span className="block text-base font-extrabold">{section.title}</span>
                <span className="mt-1 block text-sm leading-6 text-muted">{section.lead}</span>
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-muted transition ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {isOpen && (
              <div className="border-t border-line px-4 py-4">
                <ul className="space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="rounded-lg bg-mint/45 px-3 py-3 text-sm font-semibold leading-7">
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-leaf">
                    関連問題
                  </p>
                  <div className="grid gap-2">
                    {section.relatedQuestionSlugs.map((slug) => {
                      const question = getQuestion(slug);
                      if (!question) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/questions/${slug}`}
                          className="rounded-lg border border-line px-3 py-2 text-sm font-bold transition hover:border-ink"
                        >
                          {question.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

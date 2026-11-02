"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { NextStepNotice } from "@/components/NextStepNotice";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { primaryButtonClass, primaryButtonIconClass } from "@/components/ui";
import type { QuestionOption } from "@/config/funnel";
import { getStepNav } from "@/lib/navigation";
import { loadProgress, saveProgress } from "@/lib/storage";
import type { AnswerKey, Answers, StepId } from "@/lib/types";
import { useSavedAnswers } from "@/lib/use-saved-answers";

interface AnswerChoicesProps<K extends AnswerKey> {
  stepId: StepId;
  answerKey: K;
  options: QuestionOption<NonNullable<Answers[K]>>[];
  /** id do texto que apresenta a pergunta (nome do grupo para leitores de tela). */
  labelledBy: string;
  cta: string;
  microcopy?: string;
}

/**
 * Opções em cards + botão de avançar.
 * Os cards são rádios nativos (funcionam no teclado e em leitores de tela).
 * O botão só é liberado depois de uma escolha. Cada escolha é salva na hora,
 * apenas neste navegador, junto com as respostas das outras etapas — por
 * isso voltar e avançar nunca apaga nada.
 */
export function AnswerChoices<K extends AnswerKey>({
  stepId,
  answerKey,
  options,
  labelledBy,
  cta,
  microcopy,
}: AnswerChoicesProps<K>) {
  const router = useRouter();
  const ctaRef = useRef<HTMLButtonElement>(null);
  const { next, nextHref } = getStepNav(stepId);

  const savedValue = useSavedAnswers()[answerKey];
  // Ignora respostas antigas que não existem mais entre as opções.
  const saved = options.some((option) => option.id === savedValue)
    ? savedValue
    : null;
  const [picked, setPicked] = useState<Answers[K] | null>(null);
  const [showSoon, setShowSoon] = useState(false);
  const selected = picked ?? saved;

  function persist(value: NonNullable<Answers[K]>, resumeAt: StepId) {
    const progress = loadProgress();
    saveProgress({
      stepId: resumeAt,
      answers: { ...progress?.answers, [answerKey]: value },
      startedTracked: progress?.startedTracked ?? false,
    });
  }

  function choose(id: NonNullable<Answers[K]>) {
    setPicked(id);
    setShowSoon(false);
    persist(id, stepId);
    // No celular, traz o botão para a tela se ele estiver abaixo da dobra.
    requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      ctaRef.current?.scrollIntoView({
        block: "nearest",
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;

    if (next && nextHref) {
      persist(selected, next);
      router.push(nextHref);
    } else {
      // A próxima etapa ainda não foi publicada: fica aqui, com a resposta salva.
      persist(selected, stepId);
      setShowSoon(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <fieldset aria-labelledby={labelledBy} className="flex flex-col gap-3">
        {options.map((option, index) => (
          <label
            key={option.id}
            className="group flex min-h-16 animate-rise cursor-pointer select-none items-center gap-4 rounded-[1.25rem] bg-ivory/[0.035] px-5 py-4 text-left ring-1 ring-inset ring-ivory/10 transition duration-300 ease-out active:scale-[0.985] not-has-checked:hover:bg-ivory/[0.065] not-has-checked:hover:ring-ivory/25 has-checked:bg-ember/[0.13] has-checked:shadow-[0_0_0_4px_rgb(179_32_45/0.12),0_18px_40px_-22px_rgb(179_32_45/0.75)] has-checked:ring-[1.5px] has-checked:ring-ember has-focus-visible:outline-2 has-focus-visible:outline-offset-[3px] has-focus-visible:outline-ivory/70"
            style={{ animationDelay: `${360 + index * 70}ms` }}
          >
            <input
              type="radio"
              name={answerKey}
              value={option.id}
              checked={selected === option.id}
              onChange={() => choose(option.id)}
              className="sr-only"
            />
            <span className="flex-1 text-pretty text-base leading-snug text-ivory/85 transition-colors duration-300 group-has-checked:text-ivory">
              {option.label}
            </span>
            <span
              aria-hidden="true"
              className="grid size-6 shrink-0 place-items-center rounded-full ring-1 ring-inset ring-ivory/20 transition duration-300 group-has-checked:bg-ember group-has-checked:ring-ember"
            >
              <CheckIcon
                strokeWidth={2.4}
                className="size-3.5 scale-50 text-ivory opacity-0 transition duration-300 group-has-checked:scale-100 group-has-checked:opacity-100"
              />
            </span>
          </label>
        ))}
      </fieldset>

      <div
        className="mt-8 animate-rise"
        style={{ animationDelay: `${360 + options.length * 70}ms` }}
      >
        <button
          ref={ctaRef}
          type="submit"
          disabled={!selected}
          className={primaryButtonClass}
        >
          <span>{cta}</span>
          <ArrowRightIcon className={primaryButtonIconClass} />
        </button>

        <NextStepNotice show={showSoon} />

        {microcopy && (
          <p className="mx-auto mt-4 max-w-[34ch] text-center text-[0.8125rem] leading-relaxed text-pretty text-ivory/50">
            {microcopy}
          </p>
        )}
      </div>
    </form>
  );
}

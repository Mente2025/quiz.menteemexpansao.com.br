"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { OfferSection } from "@/components/quiz/OfferSection";
import { QuizShell } from "@/components/quiz/QuizShell";
import { paths, results, withName } from "@/config/quizData";
import { trackOnce } from "@/lib/analytics";
import { cx } from "@/lib/cx";
import {
  firstUnanswered,
  getResult,
  useQuizState,
} from "@/lib/quiz-store";

/**
 * Resultado personalizado (A, B ou C) e, logo abaixo, a oferta — uma única
 * vez. Textos: `results` e `offer` em src/config/quizData.ts.
 */
export function ResultScreen() {
  const router = useRouter();
  const quiz = useQuizState();
  const missing = firstUnanswered(quiz.answers);
  const letter = missing === null ? getResult(quiz.answers) : null;
  const ready = quiz.ready && letter !== null && quiz.name !== "";

  // Sem respostas ou sem nome (link direto, outra aba): volta ao ponto certo.
  useEffect(() => {
    if (!quiz.ready) return;
    if (missing !== null) router.replace(paths.question(missing));
    else if (!quiz.name) router.replace(paths.name);
  }, [quiz.ready, quiz.name, missing, router]);

  useEffect(() => {
    if (ready) trackOnce("result_view");
  }, [ready]);

  if (!ready || !letter) return <QuizShell>{null}</QuizShell>;

  const result = results[letter];

  return (
    <QuizShell>
      <article className="pt-5 sm:pt-2">
        <p className="inline-flex rounded-full border border-ember/20 bg-ember-wash px-3.5 py-1.5 text-[0.8125rem] font-semibold leading-snug text-ember">
          {result.label}
        </p>

        <h1 className="mt-4 text-balance font-display text-[length:clamp(1.625rem,7vw,2.125rem)] font-medium leading-[1.15] tracking-[-0.015em] text-ink">
          {withName(result.title, quiz.name)}
        </h1>

        <div className="mt-5 space-y-4 text-pretty text-[1.0625rem] leading-relaxed text-graphite">
          {result.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          <InfoCard title={result.risk.title}>
            <p>{result.risk.text}</p>
          </InfoCard>
          <InfoCard title={result.help.title}>
            <p>{result.help.text}</p>
          </InfoCard>
          <InfoCard title={result.startingPoint.title} accent>
            <p className="font-semibold text-ink">
              {result.startingPoint.phase}
            </p>
            <p className="mt-1">{result.startingPoint.text}</p>
          </InfoCard>
        </div>

        <p className="mx-auto mt-10 max-w-[30ch] text-balance text-center font-display text-xl leading-snug text-ink">
          {result.transition}
        </p>
      </article>

      <OfferSection letter={letter} name={quiz.name} />
    </QuizShell>
  );
}

function InfoCard({
  title,
  accent,
  children,
}: {
  title: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={cx(
        "rounded-2xl border border-line bg-paper p-5",
        accent && "border-l-[3px] border-l-ember",
      )}
    >
      <h2 className="text-[0.9375rem] font-semibold leading-snug text-ink">
        {title}
      </h2>
      <div className="mt-2 text-pretty leading-relaxed text-graphite">
        {children}
      </div>
    </section>
  );
}

"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { ContinueButton } from "@/components/ContinueButton";
import { HighlightedHeadline } from "@/components/HighlightedHeadline";
import {
  ClosingLines,
  HighlightCard,
  ReflectionParagraphs,
} from "@/components/ReflectionBlocks";
import { getReflection } from "@/lib/reflection";
import type { StepId } from "@/lib/types";
import { useSavedAnswers } from "@/lib/use-saved-answers";

interface ReflectionContentProps {
  stepId: StepId;
  /** Imagem do meio (renderizada no servidor). */
  image: ReactNode;
  closing: string[];
  cta: string;
  microcopy: string;
}

const subscribeNothing = () => () => {};

/**
 * Conteúdo personalizado da etapa 5: título, imagem, texto, pergunta de
 * impacto, fechamento e botão. A versão vem da resposta da etapa 2.
 */
export function ReflectionContent({
  stepId,
  image,
  closing,
  cta,
  microcopy,
}: ReflectionContentProps) {
  const answers = useSavedAnswers();
  const { title, titleHighlight, paragraphs, question } = getReflection(
    answers.comportamento,
  );
  // No servidor ainda não dá para ler as respostas salvas: o conteúdo só
  // aparece no navegador, para nunca piscar a versão errada.
  const ready = useSyncExternalStore(subscribeNothing, () => true, () => false);

  return (
    <div
      key={ready ? "pronto" : "carregando"}
      className={ready ? undefined : "invisible"}
    >
      <h1 className="mt-8 animate-rise text-balance text-center font-display text-[length:clamp(1.625rem,6.9vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ivory [animation-delay:80ms]">
        <HighlightedHeadline text={title} highlight={titleHighlight} />
      </h1>

      {image}

      <ReflectionParagraphs paragraphs={paragraphs} delay={280} />

      {/* Pergunta de impacto */}
      <HighlightCard title={question} delay={380} />

      <ClosingLines lines={closing} delay={460} />

      <div className="mt-10 animate-rise [animation-delay:540ms]">
        <ContinueButton stepId={stepId} cta={cta} />
        <p className="mt-4 text-center text-[0.8125rem] leading-relaxed text-ivory/50">
          {microcopy}
        </p>
      </div>
    </div>
  );
}

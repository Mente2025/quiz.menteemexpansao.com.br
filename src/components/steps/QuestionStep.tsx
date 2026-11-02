import { AnswerChoices } from "@/components/AnswerChoices";
import { HighlightedHeadline } from "@/components/HighlightedHeadline";
import { StepImage } from "@/components/StepImage";
import { StepShell } from "@/components/StepShell";
import type { QuestionStepContent } from "@/config/funnel";
import type { AnswerKey, Answers } from "@/lib/types";

/**
 * Etapa de pergunta: imagem, título, pergunta e opções em cards.
 *
 * Textos e opções: src/config/funnel.ts
 * Imagem e moldura: src/config/images.ts
 * Endereços das etapas: `stepPaths` e `liveSteps` em src/config/funnel.ts
 */
export function QuestionStep<K extends AnswerKey>({
  content,
}: {
  content: QuestionStepContent<K, NonNullable<Answers[K]>>;
}) {
  const {
    id,
    image,
    answerKey,
    headline,
    headlineHighlight,
    support,
    subheadline,
    options,
    cta,
    microcopy,
  } = content;
  const titleId = `${id}-titulo`;
  const promptId = `${id}-pergunta`;

  return (
    <StepShell stepId={id}>
      {image && <StepImage slot={image} />}

      <h1
        id={titleId}
        className="mt-3 animate-rise text-balance text-center font-display text-[length:clamp(1.625rem,6.9vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ivory [animation-delay:160ms]">
        <HighlightedHeadline text={headline} highlight={headlineHighlight} />
      </h1>

      <div className="mx-auto mt-4 max-w-[34ch] animate-rise text-center text-pretty [animation-delay:260ms]">
        {support && (
          <p className="mb-1 text-[0.975rem] leading-relaxed text-ivory/62">
            {support}
          </p>
        )}
        <p
          id={promptId}
          className="text-balance text-[1.0625rem] font-medium leading-relaxed text-ivory/90"
        >
          {subheadline}
        </p>
      </div>

      <AnswerChoices
        stepId={id}
        answerKey={answerKey}
        options={options}
        labelledBy={`${titleId} ${promptId}`}
        cta={cta}
        microcopy={microcopy}
      />
    </StepShell>
  );
}

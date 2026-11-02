import { ContinueButton } from "@/components/ContinueButton";
import { HighlightedHeadline } from "@/components/HighlightedHeadline";
import {
  ClosingLines,
  HighlightCard,
  ReflectionParagraphs,
} from "@/components/ReflectionBlocks";
import { StepImage } from "@/components/StepImage";
import { StepShell } from "@/components/StepShell";
import { practiceStep } from "@/config/funnel";

/**
 * ETAPA 6 — Da reflexão à prática.
 *
 * Textos: `practiceStep` em src/config/funnel.ts
 * Imagem: `practiceTransition` em src/config/images.ts
 */
export function PracticeStep() {
  const {
    id,
    image,
    headline,
    headlineHighlight,
    paragraphs,
    highlightTitle,
    highlightText,
    closing,
    cta,
    microcopy,
  } = practiceStep;

  return (
    <StepShell stepId={id}>
      <h1 className="mt-8 animate-rise text-balance text-center font-display text-[length:clamp(1.625rem,6.9vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ivory [animation-delay:80ms]">
        <HighlightedHeadline text={headline} highlight={headlineHighlight} />
      </h1>

      {image && <StepImage slot={image} delay={180} />}

      <ReflectionParagraphs paragraphs={paragraphs} delay={280} />

      <HighlightCard title={highlightTitle} text={highlightText} delay={380} />

      <ClosingLines lines={closing} delay={460} />

      <div className="mt-10 animate-rise [animation-delay:540ms]">
        <ContinueButton stepId={id} cta={cta} />
        <p className="mt-4 text-center text-[0.8125rem] leading-relaxed text-ivory/50">
          {microcopy}
        </p>
      </div>
    </StepShell>
  );
}

import { ReflectionContent } from "@/components/ReflectionContent";
import { StepImage } from "@/components/StepImage";
import { StepShell } from "@/components/StepShell";
import { resultStep } from "@/config/funnel";

/**
 * ETAPA 5 — Reflexão personalizada.
 *
 * Título, texto e pergunta (uma versão por resposta da etapa 2):
 *   `reflections` em src/config/results.ts
 * Fechamento, botão e microcopy: `resultStep` em src/config/funnel.ts
 * Imagem: `personalizedResult` em src/config/images.ts
 */
export function ReflectionStep() {
  const { id, image, closing, cta, microcopy } = resultStep;

  return (
    <StepShell stepId={id}>
      <ReflectionContent
        stepId={id}
        image={image && <StepImage slot={image} delay={180} />}
        closing={closing}
        cta={cta}
        microcopy={microcopy}
      />
    </StepShell>
  );
}

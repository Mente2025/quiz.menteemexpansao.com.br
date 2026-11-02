import { funnelSettings, stepOrder } from "@/config/funnel";
import { cx } from "@/lib/cx";
import type { StepId } from "@/lib/types";

/**
 * Progresso discreto do quiz: "Etapa X de Y" + um segmento por etapa.
 * O total vem da ordem das etapas em src/config/funnel.ts.
 */
export function StepProgress({
  stepId,
  className,
}: {
  stepId: StepId;
  className?: string;
}) {
  const total = stepOrder.length;
  const current = stepOrder.indexOf(stepId) + 1;
  const label = funnelSettings.labels.stepCounter(current, total);

  return (
    <div className={cx("flex items-center gap-4", className)}>
      {funnelSettings.showStepCounter && (
        <span
          aria-hidden="true"
          className="shrink-0 text-[0.6875rem] font-medium uppercase tabular-nums tracking-[0.2em] text-ivory/55"
        >
          {label}
        </span>
      )}
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-valuetext={label}
        className="flex flex-1 gap-1.5"
      >
        {stepOrder.map((id, index) => (
          <span
            key={id}
            className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-ivory/10"
          >
            {index < current && (
              <span
                className={cx(
                  "absolute inset-0 origin-left rounded-full bg-ember",
                  // Só a etapa atual se preenche; as anteriores já chegam cheias.
                  index === current - 1 && "animate-fill [animation-delay:300ms]",
                )}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

import { funnelSettings } from "@/config/funnel";

/**
 * Aviso exibido no lugar de uma navegação quando a próxima etapa ainda não
 * foi publicada (veja `liveSteps` em src/config/funnel.ts).
 * O elemento existe sempre, para leitores de tela anunciarem o aviso.
 */
export function NextStepNotice({
  show,
  message = funnelSettings.labels.nextStepSoon,
}: {
  show: boolean;
  message?: string;
}) {
  return (
    <p role="status">
      {show && (
        <span className="mx-auto mt-4 block max-w-[34ch] animate-rise text-center text-sm leading-relaxed text-pretty text-ivory/80">
          <span
            aria-hidden="true"
            className="mr-2 inline-block size-1.5 rounded-full bg-ember align-middle"
          />
          {message}
        </span>
      )}
    </p>
  );
}

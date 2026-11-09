import Image from "next/image";
import { HighlightedHeadline } from "@/components/HighlightedHeadline";
import { StartButton } from "@/components/quiz/StartButton";
import { startScreen } from "@/config/quizData";

/**
 * Tela inicial: título, subtítulo, imagem e botão — nessa ordem.
 * Textos e imagem: `startScreen` em src/config/quizData.ts.
 *
 * A tela ocupa exatamente a altura visível do celular: a imagem usa só o
 * espaço que sobra (com limite mínimo e máximo), para o botão nunca ficar
 * abaixo da dobra. A imagem aparece inteira (object-fit: contain), sem cortes.
 */
export function StartScreen() {
  const { title, titleHighlight, subtitle, image, button } = startScreen;

  return (
    <main className="flex flex-1 flex-col bg-paper">
      <div className="mx-auto flex h-viewport min-h-[33rem] w-full max-w-[34rem] flex-col justify-center px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-6">
        <h1 className="shrink-0 text-balance text-center font-display text-[length:clamp(2rem,9vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
          <HighlightedHeadline text={title} highlight={titleHighlight} />
        </h1>

        <p className="mx-auto mt-4 max-w-[34ch] shrink-0 text-pretty text-center text-[1.0625rem] leading-relaxed text-graphite">
          {subtitle}
        </p>

        <div className="mt-5 flex max-h-[24rem] min-h-24 flex-1 basis-0 justify-center">
          {/* Arquivo original, sem recompressão (cores e aparência preservadas). */}
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            unoptimized
            preload
            className="h-full w-auto max-w-full object-contain"
          />
        </div>

        <div className="mt-5 shrink-0">
          <StartButton label={button} />
        </div>
      </div>
    </main>
  );
}

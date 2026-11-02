import { EditableImageSlot } from "@/components/EditableImageSlot";
import { images, type ImageSlot, type ImageSlotName } from "@/config/images";
import { cx } from "@/lib/cx";

/**
 * Imagem principal das etapas. A apresentação vem do campo `frame` em
 * src/config/images.ts:
 * - "none": PNG transparente direto sobre o fundo, com halos suaves atrás
 * - "card": card claro, cantos arredondados, respiro e sombra suave
 * - "photo": a própria imagem vira o card, sem moldura
 * O campo opcional `width` ajusta a largura de cada imagem.
 */
export function StepImage({
  slot,
  delay = 80,
}: {
  slot: ImageSlotName;
  /** Atraso (ms) da animação de entrada. */
  delay?: number;
}) {
  const {
    frame = "card",
    width,
    artInset,
    aspectRatio,
    invert,
    rounded = true,
  } = images[slot] as ImageSlot;
  const style = { width, animationDelay: `${delay}ms` };
  // Traço preto vira traço off-white, sem alterar o arquivo.
  const invertClass = invert ? "invert sepia-15 brightness-96" : undefined;

  if (frame === "none" && artInset) {
    // Arquivo inteiro, sem recorte; o quadro tem o tamanho exato do desenho e
    // o arquivo se estende além dele pelas margens transparentes.
    const [w, h] = aspectRatio.split("/").map(Number);
    const visibleW = 1 - (artInset.left + artInset.right) / 100;
    const visibleH = 1 - (artInset.top + artInset.bottom) / 100;

    return (
      <figure
        className="relative isolate mx-auto mt-9 max-w-full animate-rise"
        style={{ ...style, aspectRatio: `${(w / h) * visibleW} / ${visibleH}` }}
      >
        {/* Halo lilás no alto e brasa vermelha embaixo, bem suaves */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-[14%] -top-[8%] bottom-1/2 -z-10 rounded-full bg-haze/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-[8%] left-[10%] right-[10%] top-[60%] -z-10 rounded-full bg-ember/25 blur-3xl"
        />
        <div
          className="pointer-events-none absolute"
          style={{
            width: `${100 / visibleW}%`,
            height: `${100 / visibleH}%`,
            left: `${-artInset.left / visibleW}%`,
            top: `${-artInset.top / visibleH}%`,
          }}
        >
          <EditableImageSlot
            slot={slot}
            fill
            preload
            sizes="(max-width: 640px) 130vw, 520px"
            className={invertClass}
            fallback={null}
          />
        </div>
      </figure>
    );
  }

  if (frame === "none") {
    return (
      // A própria imagem já tem margens transparentes: o respiro vem dela.
      <figure
        className="relative isolate mx-auto -mb-2 -mt-1 w-[clamp(11rem,29svh,17.5rem)] animate-rise"
        style={style}
      >
        {/* Halo lilás atrás da cabeça e brasa vermelha sob a figura */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[36%] -z-10 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-haze/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[14%] left-1/2 -z-10 h-[16%] w-[75%] -translate-x-1/2 rounded-full bg-ember/30 blur-2xl"
        />
        <EditableImageSlot
          slot={slot}
          preload
          sizes={
            width
              ? "(max-width: 640px) 90vw, 368px"
              : "(max-width: 640px) 60vw, 256px"
          }
          className={invertClass}
          fallback={null}
        />
      </figure>
    );
  }

  if (frame === "photo") {
    return (
      <figure
        className="relative isolate mx-auto mt-8 w-[clamp(12rem,30svh,17rem)] max-w-full animate-rise"
        style={style}
      >
        {/* Brasa vermelha discreta atrás do card */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[8%] -bottom-[6%] top-[35%] -z-10 rounded-full bg-ember opacity-25 blur-3xl"
        />
        <EditableImageSlot
          slot={slot}
          preload
          sizes={
            width
              ? "(max-width: 640px) 92vw, 416px"
              : "(max-width: 640px) 70vw, 272px"
          }
          className={cx(
            "bg-night-soft shadow-[0_36px_70px_-30px_rgb(0_0_0/0.9)]",
            rounded && "rounded-[1.5rem]",
          )}
          fallback={<DarkPlaceholder />}
        />
        {/* Contorno fino: por dentro nos cantos arredondados, por fora nos retos
            (assim nenhuma borda da imagem fica coberta). */}
        <div
          aria-hidden="true"
          className={cx(
            "pointer-events-none absolute inset-0 ring-1",
            rounded
              ? "rounded-[1.5rem] ring-inset ring-ivory/10"
              : "ring-ivory/10",
          )}
        />
      </figure>
    );
  }

  return (
    <figure
      className="relative isolate mx-auto mb-6 mt-8 w-[clamp(12rem,29svh,17rem)] max-w-full animate-rise"
      style={style}
    >
      {/* Brasa vermelha discreta sob o card */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[12%] -bottom-[8%] top-[45%] -z-10 rounded-full bg-ember opacity-25 blur-3xl"
      />
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-white p-[7%] shadow-[0_36px_70px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(245_241_234/0.06)]">
        <EditableImageSlot
          slot={slot}
          preload
          sizes="(max-width: 640px) 60vw, 240px"
          fallback={<PaperPlaceholder />}
        />
        {/* Aquece o branco para o mesmo tom off-white dos textos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ivory mix-blend-multiply"
        />
      </div>
    </figure>
  );
}

/** Aparece no card claro enquanto o arquivo da imagem não existir. */
function PaperPlaceholder() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        className="absolute inset-0 size-full text-night/15"
      >
        <circle cx="50" cy="50" r="14" />
        <circle cx="50" cy="50" r="26" />
        <circle cx="50" cy="50" r="40" />
      </svg>
    </div>
  );
}

/** Aparece nos cards escuros enquanto o arquivo da imagem não existir. */
export function DarkPlaceholder() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-night-soft">
      <div className="absolute -top-[15%] left-1/2 size-[90%] -translate-x-1/2 rounded-full bg-haze/25 blur-3xl" />
      <div className="absolute -bottom-[20%] left-1/2 size-[70%] -translate-x-1/2 rounded-full bg-ember/25 blur-3xl" />
      <svg
        viewBox="0 0 100 125"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.35"
        className="absolute inset-0 size-full text-ivory/15"
      >
        <circle cx="50" cy="56" r="14" />
        <circle cx="50" cy="56" r="24" />
        <circle cx="50" cy="56" r="36" />
        <circle cx="50" cy="56" r="50" />
      </svg>
    </div>
  );
}

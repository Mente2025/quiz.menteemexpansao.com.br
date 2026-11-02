/**
 * Blocos visuais da oferta (etapa 8). Só apresentação: os textos vêm de
 * src/config/offer.ts e de `offerStep` (src/config/funnel.ts).
 */
import type { ReactNode } from "react";
import { LockIcon, PlaceholderGlyph } from "@/components/icons";
import type { OfferItem } from "@/config/offer";
import { cx } from "@/lib/cx";

/** Rótulo pequeno em rosa queimado (FASE 1, BÔNUS 2...). */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-rose",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Título de seção com um traço vermelho acima. */
export function SectionTitle({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <div className="text-center">
      <span
        aria-hidden="true"
        className="mx-auto block h-0.5 w-8 rounded-full bg-ember"
      />
      <h2
        id={id}
        className="mt-5 text-balance font-display text-[length:clamp(1.5rem,6.4vw,2rem)] font-medium leading-[1.15] tracking-[-0.015em] text-ivory"
      >
        {children}
      </h2>
    </div>
  );
}

/** Valor da jornada: rótulo, preço, parcelas e observação. */
export function PriceBlock({
  label,
  price,
  installments,
  note,
  size = "md",
}: {
  label: string;
  price: string;
  installments: string;
  note: string;
  size?: "md" | "lg";
}) {
  // "R$ 47,00" → "R$" menor ao lado de "47,00".
  const [currency, ...amount] = price.split(" ");

  return (
    <div className="text-center">
      <p className="text-[0.9375rem] text-ivory/70">{label}</p>
      <p className="mt-2 flex items-start justify-center gap-1.5 font-display font-medium leading-none tracking-[-0.02em] text-ivory">
        <span className="mt-[0.35em] text-[1.25rem] text-ivory/80">
          {currency}
        </span>
        <span
          className={
            size === "lg"
              ? "text-[length:clamp(3rem,15vw,4rem)]"
              : "text-[length:clamp(2.5rem,12vw,3.25rem)]"
          }
        >
          {amount.join(" ")}
        </span>
      </p>
      <p className="mt-3 text-[1.0625rem] font-medium text-ivory/85">
        {installments}
      </p>
      <p className="mx-auto mt-3 max-w-[30ch] text-[0.8125rem] leading-relaxed text-pretty text-ivory/55">
        {note}
      </p>
    </div>
  );
}

/** As três fases, ligadas por uma linha vertical discreta. */
export function PhaseTimeline({
  phases,
}: {
  phases: { name: string; title: string; text: string }[];
}) {
  return (
    <ol className="relative mt-9 space-y-4">
      <span
        aria-hidden="true"
        className="absolute bottom-12 left-[1.375rem] top-12 w-px bg-linear-to-b from-ember/70 via-ember/35 to-ember/10"
      />
      {phases.map((phase, index) => (
        <li key={phase.name} className="relative flex gap-4">
          <span
            aria-hidden="true"
            className="relative z-10 mt-5 grid size-11 shrink-0 place-items-center rounded-full bg-night font-display text-lg text-ivory ring-1 ring-inset ring-ember/55"
          >
            {index + 1}
          </span>
          <div className="min-w-0 flex-1 rounded-[1.25rem] bg-ivory/[0.04] px-5 py-5 ring-1 ring-inset ring-ivory/10">
            <Eyebrow>Fase {index + 1}</Eyebrow>
            <h3 className="mt-1 font-display text-[1.375rem] leading-tight text-ivory">
              {phase.name}
            </h3>
            <p className="mt-3 font-medium leading-snug text-pretty text-ivory/90">
              {phase.title}
            </p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-ivory/65">
              {phase.text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Cards dos bônus e dos presentes. */
export function ItemCards({
  items,
  label,
  variant = "bonus",
}: {
  items: OfferItem[];
  label: string;
  variant?: "bonus" | "gift";
}) {
  return (
    <ul className="mt-8 space-y-4">
      {items.map((item, index) => (
        <li
          key={item.name}
          className={cx(
            "rounded-[1.25rem] px-5 py-5 ring-1 ring-inset",
            variant === "gift"
              ? "bg-linear-to-br from-rose/[0.12] to-ivory/[0.02] ring-rose/30"
              : "bg-ivory/[0.04] ring-ivory/10",
          )}
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-ember/12 text-rose ring-1 ring-inset ring-ember/35"
            >
              <PlaceholderGlyph icon={item.icon} className="size-5" />
            </span>
            <div className="min-w-0">
              <Eyebrow>
                {label} {index + 1}
              </Eyebrow>
              <h3 className="mt-0.5 font-display text-[1.25rem] leading-snug text-balance text-ivory">
                {item.name}
              </h3>
            </div>
          </div>
          <p className="mt-4 font-medium leading-snug text-pretty text-ivory/90">
            {item.tagline}
          </p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-ivory/65">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** O grande diferencial: a comunidade, com a regra de acesso sempre visível. */
export function CommunityHighlight({
  id,
  badge,
  name,
  headline,
  paragraphs,
  unlock,
  highlight,
}: {
  id: string;
  badge: string;
  name: string;
  headline: string;
  paragraphs: string[];
  unlock: string;
  highlight: string;
}) {
  return (
    <section
      aria-labelledby={id}
      className="relative isolate overflow-hidden rounded-[1.75rem] bg-linear-to-b from-ember/[0.16] via-ivory/[0.04] to-ivory/[0.02] px-6 pb-9 pt-8 text-center shadow-[0_30px_70px_-40px_rgb(0_0_0/0.9)] ring-1 ring-inset ring-ember/35"
    >
      <div
        aria-hidden="true"
        className="absolute -top-28 left-1/2 -z-10 size-64 -translate-x-1/2 rounded-full bg-ember/30 blur-3xl"
      />

      <span className="inline-block rounded-full bg-ember/20 px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-rose ring-1 ring-inset ring-ember/40">
        {badge}
      </span>

      <span
        aria-hidden="true"
        className="mx-auto mt-6 grid size-12 place-items-center rounded-full bg-night/60 text-ivory ring-1 ring-inset ring-ember/45"
      >
        <PlaceholderGlyph icon="circle" className="size-6" />
      </span>

      <h2
        id={id}
        className="mt-5 text-balance text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-ivory/80"
      >
        {name}
      </h2>

      <p className="mx-auto mt-4 max-w-[28ch] text-balance font-display text-[length:clamp(1.3rem,5.6vw,1.55rem)] font-medium leading-[1.25] text-ivory">
        {headline}
      </p>

      <div className="mx-auto mt-6 max-w-[32ch] space-y-3 text-pretty">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-ivory/80">
            {paragraph.replaceAll(name, name.replaceAll(" ", " "))}
          </p>
        ))}
      </div>

      <p className="mt-6 flex items-start gap-3 rounded-2xl bg-night/55 px-4 py-3.5 text-left text-[0.9375rem] leading-relaxed text-ivory/85 ring-1 ring-inset ring-ivory/10">
        <LockIcon
          className="mt-0.5 size-[1.125rem] shrink-0 text-ember"
          strokeWidth={1.8}
        />
        <span>{unlock}</span>
      </p>

      <span
        aria-hidden="true"
        className="mx-auto mt-8 block h-0.5 w-8 rounded-full bg-ember"
      />
      <p className="mx-auto mt-5 max-w-[26ch] text-balance font-display text-[length:clamp(1.25rem,5.4vw,1.45rem)] italic leading-[1.3] text-ivory">
        {highlight}
      </p>
    </section>
  );
}

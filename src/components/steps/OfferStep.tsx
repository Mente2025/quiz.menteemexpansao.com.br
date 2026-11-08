import { CheckoutButton } from "@/components/CheckoutButton";
import { HighlightedHeadline } from "@/components/HighlightedHeadline";
import { MetaViewContent } from "@/components/MetaPixel";
import { OptionalImage } from "@/components/OptionalImage";
import { HighlightCard } from "@/components/ReflectionBlocks";
import { StepImage } from "@/components/StepImage";
import { StepShell } from "@/components/StepShell";
import {
  CommunityHighlight,
  ItemCards,
  PhaseTimeline,
  PriceBlock,
  SectionTitle,
} from "@/components/offer/OfferBlocks";
import { offerStep } from "@/config/funnel";
import { offer, readyGifts } from "@/config/offer";

/**
 * ETAPA 8 — Oferta final.
 *
 * Textos das seções: `offerStep` em src/config/funnel.ts
 * Preço, fases, bônus, presentes, comunidade e link de pagamento
 *   (`CHECKOUT_URL`): src/config/offer.ts
 * Imagens: `offerShowcase` e `offerBonuses` (opcional) em src/config/images.ts
 */
export function OfferStep() {
  const {
    id,
    image,
    headline,
    headlineAccent,
    headlineAccentHighlight,
    intro,
    afterImage,
    phasesTitle,
    phasesClosing,
    firstOffer,
    bonusesTitle,
    bonusesText,
    giftsTitle,
    objection,
    finalOffer,
    comparison,
    cta,
    ctaNote,
    closing,
  } = offerStep;

  return (
    <StepShell stepId={id}>
      <MetaViewContent />

      {/* Abertura */}
      <h1 className="mt-8 animate-rise text-balance text-center font-display [animation-delay:80ms]">
        <span className="block text-[length:clamp(1.3rem,5.6vw,1.65rem)] font-normal leading-[1.25] text-ivory/80">
          {headline}
        </span>
        <span className="mt-3 block text-[length:clamp(1.75rem,7.6vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ivory">
          <HighlightedHeadline
            text={headlineAccent}
            highlight={headlineAccentHighlight}
          />
        </span>
      </h1>

      <div className="mx-auto mt-6 max-w-[34ch] animate-rise space-y-2 text-center text-pretty [animation-delay:180ms]">
        <p className="text-[1.0625rem] leading-relaxed text-ivory/90">
          {intro[0]}
        </p>
        {intro.slice(1).map((line) => (
          <p key={line} className="text-base leading-relaxed text-ivory/70">
            {line}
          </p>
        ))}
      </div>

      {image && <StepImage slot={image} delay={260} />}

      {/* Texto após a imagem */}
      <div className="mx-auto mt-10 max-w-[34ch] text-center text-pretty">
        <p className="text-balance font-display text-[length:clamp(1.3rem,5.6vw,1.55rem)] leading-[1.3] text-ivory">
          {afterImage.lead}
        </p>
        <p className="mt-4 text-base leading-relaxed text-ivory/75">
          {afterImage.body}
        </p>
        <div className="mt-6 space-y-1">
          {afterImage.gentle.map((line, index) => (
            <p
              key={line}
              className={
                index === 0
                  ? "text-base font-medium leading-relaxed text-ivory/90"
                  : "text-base leading-relaxed text-ivory/65"
              }
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* As três fases */}
      <section aria-labelledby={`${id}-fases`} className="mt-16">
        <SectionTitle id={`${id}-fases`}>{phasesTitle}</SectionTitle>
        <PhaseTimeline phases={offer.phases} />
        <p className="mx-auto mt-9 max-w-[30ch] text-balance text-center font-display text-[length:clamp(1.2rem,5.2vw,1.4rem)] italic leading-[1.35] text-ivory/90">
          {phasesClosing}
        </p>
      </section>

      {/* Primeiro bloco de compra */}
      <div className="mt-12">
        <div className="rounded-[1.75rem] bg-linear-to-b from-ivory/[0.07] to-ivory/[0.02] px-6 pb-7 pt-8 ring-1 ring-inset ring-ivory/12">
          <PriceBlock
            label={firstOffer.label}
            price={offer.price.display}
            installments={firstOffer.installments}
            note={firstOffer.note}
          />
        </div>
        <div className="mt-6">
          <CheckoutButton cta={cta} />
        </div>
      </div>

      {/* Bônus */}
      <section aria-labelledby={`${id}-bonus`} className="mt-16">
        <SectionTitle id={`${id}-bonus`}>{bonusesTitle}</SectionTitle>
        <p className="mx-auto mt-4 max-w-[34ch] text-center text-base leading-relaxed text-pretty text-ivory/75">
          {bonusesText}
        </p>
        {/* Só aparece quando public/images/quiz-page-8-bonus.png existir */}
        <OptionalImage slot="offerBonuses" className="mt-8" />
        <ItemCards items={offer.bonuses} label="Bônus" />
      </section>

      {/* Presentes — só os marcados como prontos em src/config/offer.ts */}
      {readyGifts.length > 0 && (
        <section aria-labelledby={`${id}-presentes`} className="mt-16">
          <SectionTitle id={`${id}-presentes`}>
            {readyGifts.length > 1 ? giftsTitle.many : giftsTitle.one}
          </SectionTitle>
          <ItemCards items={readyGifts} label="Presente" variant="gift" />
        </section>
      )}

      {/* Comunidade */}
      <div className="mt-16">
        <CommunityHighlight id={`${id}-comunidade`} {...offer.community} />
      </div>

      {/* Quebra de objeção */}
      <section aria-labelledby={`${id}-objecao`} className="mt-16 text-center">
        <h2
          id={`${id}-objecao`}
          className="mx-auto max-w-[24ch] text-balance font-display text-[length:clamp(1.4rem,6vw,1.75rem)] italic leading-[1.25] text-ivory"
        >
          {objection.title}
        </h2>
        <div className="mx-auto mt-6 max-w-[34ch] space-y-4 text-pretty">
          {objection.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "text-[1.0625rem] font-medium leading-relaxed text-ivory/90"
                  : "text-base leading-relaxed text-ivory/72"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
        <HighlightCard title={objection.highlight} delay={0} />
      </section>

      {/* Oferta final */}
      <section
        aria-labelledby={`${id}-oferta-final`}
        className="relative isolate mt-20"
      >
        <div
          aria-hidden="true"
          className="absolute -top-16 left-1/2 -z-10 h-72 w-[120%] -translate-x-1/2 rounded-full bg-ember/15 blur-3xl"
        />
        <SectionTitle id={`${id}-oferta-final`}>{finalOffer.title}</SectionTitle>
        <p className="mt-3 text-center font-display text-[length:clamp(1.15rem,5vw,1.35rem)] italic text-ivory/80">
          {finalOffer.subtitle}
        </p>

        <div className="mt-8 rounded-[1.75rem] bg-linear-to-b from-ember/[0.14] to-ivory/[0.03] px-6 pb-8 pt-9 shadow-[0_30px_70px_-40px_rgb(179_32_45/0.6)] ring-1 ring-inset ring-ember/35">
          <PriceBlock
            label={finalOffer.label}
            price={offer.price.display}
            installments={finalOffer.installments}
            note={finalOffer.note}
            size="lg"
          />
        </div>

        {/* Comparação com aplicativos de relacionamento */}
        <div className="mt-6 rounded-[1.5rem] bg-ivory/[0.04] px-6 pb-7 pt-7 text-center ring-1 ring-inset ring-ivory/10">
          <p className="mx-auto max-w-[26ch] text-balance font-display text-[length:clamp(1.2rem,5.2vw,1.4rem)] font-medium leading-[1.3] text-ivory">
            {comparison.headline}
          </p>
          <p className="mx-auto mt-4 max-w-[32ch] text-base leading-relaxed text-pretty text-ivory/72">
            {comparison.text}
          </p>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-0.5 w-8 rounded-full bg-ember"
          />
          <p className="mx-auto mt-5 max-w-[28ch] text-balance font-display text-[length:clamp(1.2rem,5.2vw,1.4rem)] italic leading-[1.3] text-ivory">
            {comparison.highlight}
          </p>
          <p className="mx-auto mt-5 max-w-[30ch] text-[0.9375rem] font-medium leading-relaxed text-rose">
            {comparison.closing}
          </p>
        </div>

        {/* Botão final */}
        <div className="mt-8">
          <CheckoutButton cta={cta} />
          <p className="mx-auto mt-4 max-w-[34ch] text-center text-[0.8125rem] leading-relaxed text-pretty text-ivory/55">
            {ctaNote}
          </p>
        </div>
      </section>

      {/* Fechamento */}
      <p className="mx-auto mt-14 max-w-[24ch] text-balance text-center font-display text-[length:clamp(1.4rem,6vw,1.75rem)] italic leading-[1.3] text-ivory">
        {closing}
      </p>
    </StepShell>
  );
}

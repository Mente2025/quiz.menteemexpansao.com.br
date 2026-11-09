"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CheckIcon } from "@/components/icons";
import { CheckoutButton } from "@/components/quiz/CheckoutButton";
import { eyebrowClass } from "@/components/ui";
import {
  offer,
  price,
  withName,
  type RichParagraph,
} from "@/config/quizData";
import { trackOnce } from "@/lib/analytics";
import type { Letter } from "@/lib/scoring";
import { metaProduct, metaTrackOnce } from "@/lib/meta-pixel";

/**
 * Bloco da oferta — igual nos três resultados; só o botão muda.
 * Textos, bônus e preço: `offer` e `price` em src/config/quizData.ts.
 */
export function OfferSection({ letter, name }: { letter: Letter; name: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // offer_view: quando o título da oferta aparece inteiro na tela.
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        trackOnce("offer_view");
        metaTrackOnce("ViewContent", metaProduct);
      },
      { threshold: 1 },
    );
    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  const { sessions, diary, startToday } = offer;

  return (
    <section
      aria-labelledby="oferta-titulo"
      className="mt-12 border-t border-line pt-10"
    >
      <h2
        id="oferta-titulo"
        ref={titleRef}
        className="text-balance font-display text-[length:clamp(1.5rem,6.6vw,2rem)] font-medium leading-[1.18] tracking-[-0.015em] text-ink"
      >
        {withName(offer.title, name)}
      </h2>

      <p className="mt-7 font-display text-[1.375rem] font-semibold tracking-[0.1em] text-ember">
        {offer.productName}
      </p>
      <div className="mt-3 space-y-4 text-pretty text-[1.0625rem] leading-relaxed text-graphite">
        {offer.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <h3 className={`${eyebrowClass} mt-10`}>{offer.includedTitle}</h3>
      <div className="mt-4 space-y-3">
        <Card title={sessions.title}>
          <p>{sessions.text}</p>
          <ol className="mt-4 divide-y divide-line border-t border-line">
            {sessions.phases.map((phase, index) => (
              <li key={phase.title} className="flex gap-3 pt-4 [&:not(:last-child)]:pb-4">
                <span
                  aria-hidden="true"
                  className="mt-px grid size-6 shrink-0 place-items-center rounded-full bg-ember text-xs font-semibold text-white"
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-[0.04em] text-ink">
                    {phase.title}
                  </p>
                  <p className="mt-1">{phase.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>

        <Card title={diary.title}>
          <p className="font-semibold text-ink">{diary.lead}</p>
          {diary.paragraphs.map((paragraph) => (
            <Paragraph key={paragraphKey(paragraph)} value={paragraph} />
          ))}
        </Card>
      </div>

      <h3 className={`${eyebrowClass} mt-10`}>{offer.bonusesTitle}</h3>
      <div className="mt-4 space-y-3">
        {offer.bonuses.map((bonus) => (
          <Card key={bonus.title} title={bonus.title}>
            {bonus.items.map((item) => (
              <Paragraph key={item.strong} value={item} />
            ))}
          </Card>
        ))}
      </div>
      <p className="mt-4 text-pretty text-[0.9375rem] leading-relaxed text-graphite">
        {offer.bonusesNote}
      </p>

      <div className="mt-10 rounded-3xl border-2 border-ember p-6 sm:p-7">
        <h3 className="text-xs font-semibold tracking-[0.14em] text-ember">
          {startToday.title}
        </h3>
        <p className="mt-2 text-balance font-display text-[1.375rem] font-medium leading-snug text-ink">
          {startToday.text}
        </p>

        <p className="mt-6 text-sm font-semibold text-ink">
          {startToday.listTitle}
        </p>
        <ul className="mt-3 space-y-2.5 text-[0.9375rem] leading-relaxed text-graphite">
          {startToday.items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <CheckIcon
                strokeWidth={2.4}
                className="mt-[0.3rem] size-4 shrink-0 text-ember"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 border-t border-line pt-6 text-center">
          <p className="font-display text-[2.5rem] font-medium leading-none tracking-[-0.02em] text-ink">
            {price.display}
          </p>
          <p className="mt-2 text-graphite">{price.note}</p>
        </div>

        <div className="mt-6">
          <CheckoutButton label={offer.buttonByResult[letter]} />
        </div>
        <p className="mt-4 text-pretty text-center text-sm leading-relaxed text-graphite">
          {offer.buttonNote}
        </p>
      </div>

      <p className="mt-10 text-pretty text-center text-[0.8125rem] leading-relaxed text-mist">
        <FooterText text={offer.footer} phone={offer.footerPhone} />
      </p>
    </section>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-paper p-5">
      <h4 className="text-[0.8125rem] font-semibold leading-snug tracking-[0.06em] text-ink">
        {title}
      </h4>
      <div className="mt-3 space-y-3 text-pretty leading-relaxed text-graphite">
        {children}
      </div>
    </section>
  );
}

function Paragraph({ value }: { value: RichParagraph }) {
  if (typeof value === "string") return <p>{value}</p>;
  return (
    <p>
      <strong className="font-semibold text-ink">{value.strong}</strong>{" "}
      {value.text}
    </p>
  );
}

const paragraphKey = (value: RichParagraph) =>
  typeof value === "string" ? value : value.strong;

/** Rodapé com o número do CVV como link de ligação no celular. */
function FooterText({ text, phone }: { text: string; phone: string }) {
  const at = phone ? text.lastIndexOf(phone) : -1;
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <a
        href={`tel:${phone}`}
        className="-mx-1 -my-3 inline-block px-1 py-3 font-semibold text-ink underline decoration-line-strong underline-offset-2"
      >
        {phone}
      </a>
      {text.slice(at + phone.length)}
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { CheckoutButton } from "@/components/quiz/CheckoutButton";
import { DemoSection } from "@/components/quiz/DemoSection";
import { Pieces } from "@/components/quiz/Pieces";
import { finalPage, price, type PageImage } from "@/config/quizData";
import { trackOnce } from "@/lib/analytics";
import { cx } from "@/lib/cx";
import { metaProduct, metaTrackOnce } from "@/lib/meta-pixel";

/**
 * Página final depois do resultado e do bloco 1: blocos 2 a 8 da copy
 * aprovada (conexão, produto, três processos, como funciona, demonstração,
 * surpresa, oferta e fechamento). Igual para os três resultados.
 * Textos: `finalPage` e `price` em src/config/quizData.ts.
 */
export function OfferSection() {
  const productTitleRef = useRef<HTMLHeadingElement>(null);

  // offer_view: quando o título da apresentação do produto aparece inteiro.
  useEffect(() => {
    const title = productTitleRef.current;
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

  const {
    images,
    connection,
    product,
    processes,
    inside,
    surprise,
    offer,
    closing,
  } = finalPage;

  return (
    <>
      {/* Bloco 2 — conexão emocional */}
      <Block title={connection.title} className="border-t border-line pt-12">
        <Pieces pieces={connection.pieces} />
      </Block>

      {/* Imagem 1 — identificação emocional */}
      <PageFigure
        image={images.identification}
        sizes="(max-width: 640px) 68vw, 240px"
        className="mt-10 w-[min(68vw,15rem)] max-w-full"
      />

      {/* Bloco 3 — apresentação do produto */}
      <Block title={product.title} titleRef={productTitleRef} id="oferta-titulo">
        {/* Imagem 2 — o Eu Me Escolho por dentro */}
        <PageFigure
          image={images.product}
          sizes="(max-width: 640px) 86vw, 352px"
          className="mb-7 w-[min(86vw,22rem)] max-w-full"
        />
        <Pieces pieces={product.pieces} />
      </Block>

      {/* Bloco 4 — os três processos */}
      <Block title={processes.title}>
        <Pieces pieces={processes.pieces} />
        <ol className="mt-8 space-y-4">
          {processes.steps.map((step) => (
            <li
              key={step.name}
              className="rounded-3xl border border-line bg-paper p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-ember font-display text-lg font-medium text-white"
                >
                  {step.number}
                </span>
                <h3 className="min-w-0 font-display text-[length:clamp(1.375rem,6.6vw,1.625rem)] font-medium leading-tight text-ember">
                  <span className="sr-only">{step.number}. </span>
                  {step.name}
                </h3>
              </div>
              {/* Imagens 3 a 5 — mesma escala nos três processos */}
              <PageFigure
                image={step.image}
                sizes="(max-width: 640px) 52vw, 192px"
                className="mt-4 w-[min(52vw,12rem)] max-w-full"
              />
              <p className="mt-4 text-pretty text-[1.0625rem] font-semibold leading-snug text-ink">
                {step.tagline}
              </p>
              <Pieces pieces={step.pieces} className="mt-4" />
            </li>
          ))}
        </ol>
      </Block>

      {/* Bloco 5 — como funciona por dentro */}
      <Block title={inside.title}>
        <Pieces pieces={inside.pieces} />
        <div className="mt-6 space-y-3">
          {inside.items.map((item) => (
            <section
              key={item.title}
              className="rounded-2xl border border-line bg-paper p-5"
            >
              <h3 className="font-display text-[1.375rem] font-medium leading-snug text-ink">
                {item.title}
              </h3>
              <Pieces pieces={item.pieces} className="mt-3" />
            </section>
          ))}
        </div>
      </Block>

      {/* Demonstração real: vídeo da plataforma e páginas do diário */}
      <DemoSection />

      {/* Bloco 6 — uma surpresa especial na jornada */}
      <section
        aria-labelledby="surpresa-titulo"
        className="mt-14 rounded-3xl border border-ember/20 bg-ember-wash px-5 py-7 sm:px-7"
      >
        <h2
          id="surpresa-titulo"
          className="text-balance font-display text-[length:clamp(1.5rem,6.6vw,2rem)] font-medium leading-[1.18] tracking-[-0.015em] text-ink"
        >
          {surprise.title}
        </h2>
        <Pieces pieces={surprise.pieces} className="mt-5" />
      </section>

      {/* Bloco 7 — oferta */}
      <Block title={offer.title}>
        <Pieces pieces={offer.pieces} />

        {/* Resumo visual do que ela recebe, logo acima do preço */}
        {offer.image && (
          <PageFigure
            image={offer.image}
            sizes="(max-width: 640px) 92vw, 448px"
            className="mt-8 w-full max-w-[min(100%,28rem)]"
          />
        )}

        <div className="mt-8 rounded-3xl border-2 border-ember bg-paper px-5 py-8 text-center sm:px-8">
          <p className="font-display text-[3rem] font-medium leading-none tracking-[-0.02em] text-ink">
            {price.display}
          </p>
          <p className="mt-2 text-[0.9375rem] font-medium text-graphite">
            {price.note}
          </p>
          <div className="mt-7">
            <CheckoutButton label={offer.button} showArrow={false} />
          </div>
          <p className="mx-auto mt-4 max-w-[36ch] text-pretty text-[0.9375rem] leading-relaxed text-ink">
            {offer.deliveryNote}
          </p>
          {offer.secureNote && (
            <p className="mx-auto mt-3 max-w-[38ch] text-pretty text-[0.8125rem] leading-relaxed text-mist">
              {offer.secureNote}
            </p>
          )}
        </div>
      </Block>

      {/* Bloco 8 — fechamento */}
      <section className="mt-14 text-center">
        <p className="mx-auto max-w-[28ch] text-balance font-display text-[1.375rem] leading-snug text-ink">
          {closing.text}
        </p>
        <div className="mt-7">
          <CheckoutButton label={closing.button} />
        </div>
      </section>

      <p className="mt-12 text-pretty text-center text-[0.8125rem] leading-relaxed text-mist">
        <FooterText text={finalPage.footer} phone={finalPage.footerPhone} />
      </p>
    </>
  );
}

/**
 * Ilustração centralizada, sem fundo nem moldura (PNG/WebP transparente).
 * Largura e largura máxima vêm de `className`; a altura acompanha a
 * proporção do arquivo.
 * O Next.js entrega uma versão otimizada no tamanho certo para cada tela.
 */
function PageFigure({
  image,
  sizes,
  className,
}: {
  image: PageImage;
  sizes: string;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      sizes={sizes}
      className={cx("mx-auto block h-auto", className)}
    />
  );
}

/** Bloco com título (h2) e conteúdo. */
function Block({
  title,
  id,
  titleRef,
  className,
  children,
}: {
  title: string;
  id?: string;
  titleRef?: React.Ref<HTMLHeadingElement>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={cx("mt-14", className)}>
      <h2
        id={id}
        ref={titleRef}
        className="mb-5 text-balance font-display text-[length:clamp(1.5rem,6.6vw,2rem)] font-medium leading-[1.18] tracking-[-0.015em] text-ink"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

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

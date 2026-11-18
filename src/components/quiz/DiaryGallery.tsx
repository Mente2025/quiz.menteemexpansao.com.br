"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  ZoomIcon,
} from "@/components/icons";
import type { DiaryPage } from "@/config/quizData";
import { cx } from "@/lib/cx";

interface GalleryLabels {
  region: string;
  previous: string;
  next: string;
  goTo: (n: number) => string;
  zoom: (caption: string) => string;
  close: string;
  counter: (current: number, total: number) => string;
  tapToZoom: string;
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Carrossel das páginas reais do diário: desliza com o dedo, tem setas,
 * indicador de página e ampliação para leitura. Não avança sozinho.
 */
export function DiaryGallery({
  pages,
  labels,
}: {
  pages: readonly DiaryPage[];
  labels: GalleryLabels;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const total = pages.length;

  // Página atual = a que está mais perto do centro do carrossel.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDistance = Infinity;
        Array.from(track.children).forEach((child, index) => {
          const slide = child as HTMLElement;
          const distance = Math.abs(
            slide.offsetLeft + slide.offsetWidth / 2 - center,
          );
          if (distance < bestDistance) {
            bestDistance = distance;
            best = index;
          }
        });
        setCurrent(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const target = Math.min(Math.max(index, 0), total - 1);
      const slide = track?.children[target] as HTMLElement | undefined;
      if (!track || !slide) return;
      track.scrollTo({
        left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [total],
  );

  function openZoom(index: number) {
    setZoomed(index);
    dialogRef.current?.showModal();
  }

  // Com a ampliação aberta, a página de trás não rola.
  const isZoomOpen = zoomed !== null;
  useEffect(() => {
    if (!isZoomOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isZoomOpen]);

  function closeZoom() {
    dialogRef.current?.close();
  }

  // Ao fechar (botão, Esc ou toque fora): alinha o carrossel na página vista
  // e devolve o foco a ela (navegação por teclado e leitores de tela).
  function handleDialogClose() {
    const viewed = zoomed;
    setZoomed(null);
    if (viewed === null) return;
    goTo(viewed);
    requestAnimationFrame(() => {
      const slide = trackRef.current?.children[viewed] as HTMLElement | undefined;
      slide?.querySelector("button")?.focus({ preventScroll: true });
    });
  }

  const page = zoomed !== null ? pages[zoomed] : null;

  return (
    <div>
      <ul
        ref={trackRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label={labels.region}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(current + 1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(current - 1);
          }
        }}
        className={cx(
          "relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[max(20%,calc(50%-9rem))] py-2 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember [&::-webkit-scrollbar]:hidden",
          // Alguns navegadores pintam o carrossel por cima da ampliação.
          isZoomOpen && "invisible",
        )}
      >
        {pages.map((item, index) => (
          <li
            key={item.src}
            aria-roledescription="slide"
            aria-label={labels.counter(index + 1, total)}
            // Ocupa a área entre as margens: ~60% da tela no celular,
            // no máximo 18rem no computador; as vizinhas aparecem nas bordas.
            className="w-full shrink-0 snap-center"
          >
            <button
              type="button"
              onClick={() => openZoom(index)}
              aria-label={labels.zoom(item.caption)}
              className="group relative block w-full overflow-hidden rounded-xl border border-line shadow-[0_8px_24px_-16px_rgb(31_33_40/0.45)] transition-shadow duration-200 hover:shadow-[0_12px_28px_-14px_rgb(31_33_40/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2"
            >
              <Image
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.alt}
                sizes="(max-width: 640px) 60vw, 288px"
                className="block h-auto w-full"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-2 grid size-8 place-items-center rounded-full bg-paper/90 text-ember shadow-sm"
              >
                <ZoomIcon className="size-4" />
              </span>
            </button>
            <p className="mt-2 text-center text-sm font-medium text-graphite">
              {item.caption}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between gap-3 px-5 sm:px-6">
        <ArrowButton
          label={labels.previous}
          disabled={current === 0}
          onClick={() => goTo(current - 1)}
        >
          <ArrowLeftIcon className="size-5" />
        </ArrowButton>

        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            {pages.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => goTo(index)}
                aria-label={labels.goTo(index + 1)}
                aria-current={index === current ? "true" : undefined}
                className="grid size-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              >
                <span
                  className={cx(
                    "block rounded-full transition-all duration-200",
                    index === current
                      ? "h-2 w-5 bg-ember"
                      : "size-2 bg-line-strong",
                  )}
                />
              </button>
            ))}
          </div>
          <p
            aria-live="polite"
            className="text-xs font-medium tabular-nums text-mist"
          >
            {labels.counter(current + 1, total)} · {labels.tapToZoom}
          </p>
        </div>

        <ArrowButton
          label={labels.next}
          disabled={current === total - 1}
          onClick={() => goTo(current + 1)}
        >
          <ArrowRightIcon className="size-5" />
        </ArrowButton>
      </div>

      {/* Ampliação para leitura (tela branca, fecha com X, Esc ou toque fora). */}
      <dialog
        ref={dialogRef}
        onClose={handleDialogClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeZoom();
        }}
        aria-label={page ? page.caption : labels.region}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-paper p-0 backdrop:bg-paper"
      >
        {page && zoomed !== null && (
          <div
            className="mx-auto flex min-h-full w-full max-w-[34rem] flex-col px-4 pb-6 pt-[max(0.75rem,env(safe-area-inset-top))]"
            onClick={(event) => {
              if (event.target === event.currentTarget) closeZoom();
            }}
          >
            <div className="sticky top-0 z-10 -mx-4 flex items-center justify-between gap-3 bg-paper/95 px-4 py-2">
              <p className="text-sm font-semibold text-ink">
                {page.caption}{" "}
                <span className="font-normal tabular-nums text-mist">
                  · {labels.counter(zoomed + 1, total)}
                </span>
              </p>
              <button
                type="button"
                onClick={closeZoom}
                aria-label={labels.close}
                className="grid size-11 place-items-center rounded-full border border-line bg-paper text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <Image
              key={page.src}
              src={page.src}
              width={page.width}
              height={page.height}
              alt={page.alt}
              sizes="(max-width: 640px) 100vw, 544px"
              className="mt-2 block h-auto w-full rounded-xl border border-line"
            />

            <div className="mt-4 flex items-center justify-between gap-3">
              <ArrowButton
                label={labels.previous}
                disabled={zoomed === 0}
                onClick={() => setZoomed(zoomed - 1)}
              >
                <ArrowLeftIcon className="size-5" />
              </ArrowButton>
              <button
                type="button"
                onClick={closeZoom}
                className="min-h-11 rounded-full px-5 text-sm font-semibold text-ember underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              >
                {labels.close}
              </button>
              <ArrowButton
                label={labels.next}
                disabled={zoomed === total - 1}
                onClick={() => setZoomed(zoomed + 1)}
              >
                <ArrowRightIcon className="size-5" />
              </ArrowButton>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-paper text-ember transition-colors duration-150 hover:border-ember/40 hover:bg-ember-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember disabled:cursor-default disabled:text-line-strong disabled:hover:border-line disabled:hover:bg-paper"
    >
      {children}
    </button>
  );
}

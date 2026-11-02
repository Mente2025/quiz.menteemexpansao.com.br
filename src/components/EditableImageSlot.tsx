"use client";

import Image from "next/image";
import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { images, type ImageSlotName } from "@/config/images";
import { useResolvedImage } from "@/components/ImageManifest";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { cx } from "@/lib/cx";

interface EditableImageSlotProps {
  /** Nome do slot em src/config/images.ts. */
  slot: ImageSlotName;
  /** Classes do quadro (tamanho, cantos, sombra...). */
  className?: string;
  style?: CSSProperties;
  /** Usa a proporção do config (`aspectRatio`). Desligue para controlar via classes. */
  applyAspectRatio?: boolean;
  /** Preenche o elemento pai (que deve ter `position: relative`). */
  fill?: boolean;
  /** Dica de tamanho para o navegador baixar a versão certa da imagem. */
  sizes?: string;
  /** Carrega com prioridade (use só na imagem principal da primeira tela). */
  preload?: boolean;
  /**
   * Conteúdo exibido quando não há imagem (padrão: placeholder do config).
   * `null` não mostra nada — útil para imagens com fundo transparente.
   */
  fallback?: ReactNode;
}

/** `?slots=1` na URL mostra o nome de cada espaço de imagem (ajuda na edição). */
const subscribe = () => () => {};
const readSlotLabels = () =>
  new URLSearchParams(window.location.search).has("slots");

/**
 * Espaço de imagem editável. Mostra a imagem configurada quando o arquivo
 * existe e um placeholder elegante quando não existe (ou falha ao carregar).
 * Nunca exibe ícone de imagem quebrada.
 */
export function EditableImageSlot({
  slot,
  className,
  style,
  applyAspectRatio = true,
  fill = false,
  sizes = "100vw",
  preload = false,
  fallback,
}: EditableImageSlotProps) {
  const config = images[slot];
  const src = useResolvedImage(config.imageSrc);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showLabels = useSyncExternalStore(subscribe, readSlotLabels, () => false);

  if (!config.showImage) return null;

  const isLoaded = src !== null && loadedSrc === src;
  const isFailed = src !== null && failedSrc === src;
  const state = !src ? "placeholder" : isFailed ? "error" : isLoaded ? "loaded" : "loading";

  return (
    <div
      className={cx(
        "isolate overflow-hidden",
        fill ? "absolute inset-0" : "relative",
        className,
      )}
      style={{
        ...(applyAspectRatio && !fill ? { aspectRatio: config.aspectRatio } : null),
        ...style,
      }}
      data-image-slot={slot}
      data-image-state={state}
    >
      {!isLoaded &&
        (fallback !== undefined ? (
          fallback
        ) : (
          <ImagePlaceholder icon={config.placeholder.icon} tone={config.placeholder.tone} />
        ))}

      {src && !isFailed && (
        <Image
          src={src}
          alt={config.imageAlt}
          fill
          sizes={sizes}
          preload={preload}
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
          className={cx(
            "transition-opacity duration-700 motion-reduce:transition-none",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          style={{ objectFit: config.fit, objectPosition: config.focalPoint }}
        />
      )}

      {showLabels && (
        <span className="absolute left-1 top-1 z-10 max-w-[calc(100%-0.5rem)] truncate rounded bg-black/75 px-1.5 py-0.5 font-mono text-[10px] leading-tight text-white">
          {slot} · {src ?? `${config.imageSrc} (não encontrado)`}
        </span>
      )}
    </div>
  );
}

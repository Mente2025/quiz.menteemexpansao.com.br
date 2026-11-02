"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

/** Mapa "caminho em minúsculas" → caminho real dos arquivos em public/images. */
type Manifest = Map<string, string> | null;

const ImageManifestContext = createContext<Manifest>(null);

export function ImageManifestProvider({
  files,
  children,
}: {
  files: string[];
  children: ReactNode;
}) {
  const manifest = useMemo(
    () => new Map(files.map((file) => [file.toLowerCase(), file])),
    [files],
  );
  return (
    <ImageManifestContext.Provider value={manifest}>
      {children}
    </ImageManifestContext.Provider>
  );
}

const EXTENSIONS = [".webp", ".avif", ".png", ".jpg", ".jpeg", ".svg", ".gif"];

/**
 * Descobre o arquivo real para um caminho configurado.
 * Aceita maiúsculas/minúsculas diferentes e outra extensão com o mesmo nome
 * (ex.: configurado "welcome-hero.webp", existente "welcome-hero.jpg").
 * Retorna null quando o arquivo não existe.
 */
export function useResolvedImage(src: string): string | null {
  const manifest = useContext(ImageManifestContext);
  if (!src) return null;
  if (!manifest || /^https?:\/\//.test(src)) return src;

  const exact = manifest.get(src.toLowerCase());
  if (exact) return exact;

  const base = src.toLowerCase().replace(/\.[a-z0-9]+$/, "");
  for (const ext of EXTENSIONS) {
    const match = manifest.get(base + ext);
    if (match) return match;
  }
  return null;
}

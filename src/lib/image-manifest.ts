/**
 * Lista os arquivos existentes em public/images no momento do build (ou a cada
 * recarregamento em `npm run dev`). Assim o site sabe, antes de renderizar,
 * quais imagens existem e mostra o placeholder nas que ainda faltam — sem
 * imagens quebradas e sem requisições para arquivos inexistentes.
 *
 * Uso apenas no servidor (lê o sistema de arquivos).
 */
import fs from "node:fs";
import path from "node:path";

const IMAGE_FILE = /\.(webp|avif|png|jpe?g|gif|svg)$/i;

export function getImageManifest(): string[] {
  const root = path.join(process.cwd(), "public", "images");
  const files: string[] = [];

  const walk = (dir: string, urlPrefix: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const url = `${urlPrefix}/${entry.name}`;
      if (entry.isDirectory()) walk(path.join(dir, entry.name), url);
      else if (IMAGE_FILE.test(entry.name)) files.push(url);
    }
  };

  try {
    walk(root, "/images");
  } catch {
    return [];
  }
  return files.sort();
}

const EXTENSIONS = [".webp", ".avif", ".png", ".jpg", ".jpeg", ".svg", ".gif"];

/**
 * Caminho real de uma imagem configurada, ou null se ela não existir.
 * Aceita maiúsculas/minúsculas diferentes e outra extensão com o mesmo nome
 * (mesma regra de `useResolvedImage`).
 */
export function findImageFile(src: string): string | null {
  const files = new Map(getImageManifest().map((f) => [f.toLowerCase(), f]));
  const exact = files.get(src.toLowerCase());
  if (exact) return exact;
  const base = src.toLowerCase().replace(/\.[a-z0-9]+$/, "");
  for (const ext of EXTENSIONS) {
    const match = files.get(base + ext);
    if (match) return match;
  }
  return null;
}

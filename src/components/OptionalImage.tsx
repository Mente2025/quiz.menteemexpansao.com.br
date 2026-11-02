import Image from "next/image";
import { images, type ImageSlotName } from "@/config/images";
import { cx } from "@/lib/cx";
import { findImageFile } from "@/lib/image-manifest";

/**
 * Imagem que só aparece se o arquivo existir em public/images.
 * Sem o arquivo, não ocupa espaço nenhum (nada de placeholder ou área vazia).
 * A imagem aparece inteira, na proporção do próprio arquivo; o `aspectRatio`
 * do config só reserva o espaço enquanto ela carrega.
 */
export function OptionalImage({
  slot,
  className,
}: {
  slot: ImageSlotName;
  className?: string;
}) {
  const config = images[slot];
  const file = findImageFile(config.imageSrc);
  if (!file) return null;

  const [w, h] = config.aspectRatio.split("/").map(Number);

  return (
    <figure className={cx("mx-auto w-full", className)}>
      <Image
        src={file}
        alt={config.imageAlt}
        width={1600}
        height={Math.round((1600 * h) / w)}
        sizes="(max-width: 640px) 92vw, 416px"
        className="h-auto w-full object-contain"
      />
    </figure>
  );
}

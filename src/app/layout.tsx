import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ImageManifestProvider } from "@/components/ImageManifest";
import { brand } from "@/config/brand";
import { bodyFont, displayFont } from "@/config/fonts";
import { getImageManifest } from "@/lib/image-manifest";
import "./globals.css";

// A imagem de compartilhamento vem de src/app/opengraph-image.png e
// twitter-image.png (o Next.js gera as tags sozinho).
export const metadata: Metadata = {
  // Sem endereço definido, a Vercel usa o domínio de produção automaticamente.
  metadataBase: brand.seo.siteUrl ? new URL(brand.seo.siteUrl) : undefined,
  title: brand.seo.title,
  description: brand.seo.description,
  openGraph: {
    title: brand.seo.title,
    description: brand.seo.description,
    siteName: brand.productName,
    locale: brand.seo.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.seo.title,
    description: brand.seo.description,
  },
};

export const viewport: Viewport = {
  /** Cor da barra do navegador no celular — mesma de --color-night (globals.css). */
  themeColor: "#0d1020",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <ImageManifestProvider files={getImageManifest()}>
          {children}
        </ImageManifestProvider>
        <Analytics />
      </body>
    </html>
  );
}

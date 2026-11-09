import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { FunnelTracker } from "@/components/FunnelTracker";
import { MetaPixelPageViews } from "@/components/MetaPixel";
import { GA4_MEASUREMENT_ID, META_PIXEL_ID } from "@/config/analytics";
import { brand } from "@/config/brand";
import { bodyFont, displayFont } from "@/config/fonts";
import { product, seo } from "@/config/quizData";
import { metaPixelScript } from "@/lib/meta-pixel";
import "./globals.css";

// A imagem de compartilhamento vem de src/app/opengraph-image.png e
// twitter-image.png (o Next.js gera as tags sozinho).
export const metadata: Metadata = {
  // Sem endereço definido, a Vercel usa o domínio de produção automaticamente.
  metadataBase: brand.seo.siteUrl ? new URL(brand.seo.siteUrl) : undefined,
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    siteName: product.name,
    locale: brand.seo.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

/** Código oficial do GA4 (gtag). As trocas de etapa viram page_view sozinhas. */
const ga4Script = (id: string) => `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`;

export const viewport: Viewport = {
  /** Cor da barra do navegador no celular — mesma de --color-paper (globals.css). */
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${displayFont.variable} ${bodyFont.variable} h-full bg-paper antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        {META_PIXEL_ID && (
          <>
            {/* Meta Pixel: vai para o <head> e roda antes de qualquer evento. */}
            <Script id="meta-pixel" strategy="beforeInteractive">
              {metaPixelScript}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
            <MetaPixelPageViews />
          </>
        )}
        {GA4_MEASUREMENT_ID && (
          <>
            {/* Google Analytics 4: só carrega com o ID em src/config/analytics.ts. */}
            <Script id="ga4" strategy="beforeInteractive">
              {ga4Script(GA4_MEASUREMENT_ID)}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
          </>
        )}
        {children}
        {/* UTMs da entrada e histórico das telas — sem nome nem respostas. */}
        <FunnelTracker />
        {/* Vercel Web Analytics: visitas e páginas vistas (só no site publicado). */}
        <Analytics />
      </body>
    </html>
  );
}

/**
 * Configuração técnica de compartilhamento (SEO).
 * Os textos (título e descrição) ficam em `seo` em src/config/quizData.ts.
 * Fontes: src/config/fonts.ts · Cores: src/app/globals.css.
 */
export const brand = {
  seo: {
    /**
     * Endereço final do site (ex.: "https://seudominio.com.br"). Opcional:
     * na Vercel o endereço de produção é usado automaticamente. Pode ser
     * definido pela variável de ambiente NEXT_PUBLIC_SITE_URL.
     *
     * Imagem de compartilhamento (WhatsApp, Instagram, Facebook...):
     * src/app/opengraph-image.png (1200x630).
     */
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
    locale: "pt_BR",
  },
} as const;

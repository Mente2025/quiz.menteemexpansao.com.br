/**
 * IDENTIDADE DA MARCA
 * -------------------
 * Edite aqui nome, cores, logo e textos de compartilhamento (SEO).
 * As cores abaixo viram variáveis CSS e alimentam todas as classes do
 * Tailwind (bg-deep, text-teal, etc.). Basta trocar o valor hexadecimal.
 *
 * Fontes: veja src/config/fonts.ts.
 * Logo: veja o slot "brandLogo" em src/config/images.ts.
 */

export const brand = {
  /** Nome do perfil / marca. Aparece no cabeçalho quando não há logo. */
  name: "Mente em Expansão",
  /** Nome do produto. */
  productName: "Eu Me Escolho",
  /** Usado no rodapé. */
  footerNote: "Mente em Expansão · conteúdo de autoconhecimento",

  colors: {
    /** Azul profundo — textos principais, fundos escuros, botões. */
    deep: "#102733",
    /** Azul — apoio, estados de hover. */
    ocean: "#245A70",
    /** Verde — destaques, barra de progresso, seleção. */
    teal: "#188F81",
    /**
     * Verde em tom mais fechado, usado em textos pequenos e no botão de compra.
     * Mantém contraste acessível (WCAG AA) sobre fundos claros e com texto branco.
     */
    tealStrong: "#127C70",
    /** Verde-claro — fundos suaves, cartões, chips. */
    mint: "#DDF2EC",
    /** Off-white — fundo geral das telas claras. */
    cream: "#F7F5EF",
  },

  seo: {
    /** Título da aba do navegador e do link compartilhado. */
    title: "Por Que Você Vive Histórias Parecidas no Amor?",
    /** Texto que aparece abaixo do título no link compartilhado (copy da etapa 1). */
    description:
      "Talvez existam padrões nos seus relacionamentos que você ainda não conseguiu perceber.",
    /**
     * Endereço final do site (ex.: "https://seudominio.com.br"). Opcional:
     * na Vercel o endereço de produção é usado automaticamente. Pode ser
     * definido pela variável de ambiente NEXT_PUBLIC_SITE_URL.
     *
     * Imagem de compartilhamento (WhatsApp, Instagram, Facebook...):
     * src/app/opengraph-image.png (1200x630), feita com a ilustração da etapa 1.
     */
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
    locale: "pt_BR",
  },
} as const;

export type BrandColors = typeof brand.colors;

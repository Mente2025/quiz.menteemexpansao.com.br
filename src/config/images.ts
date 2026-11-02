/**
 * IMAGENS (todas opcionais)
 * -------------------------
 * O site funciona perfeitamente sem nenhuma imagem: quando um arquivo não
 * existe, aparece automaticamente um placeholder elegante feito em CSS.
 *
 * Para usar uma foto:
 *   1. Coloque o arquivo em public/images/ (ex.: public/images/welcome-hero.webp)
 *   2. Confira se o caminho em `imageSrc` abaixo é o mesmo (sem "public").
 *      Dica: se você salvar com outra extensão (.jpg, .png, .webp, .avif),
 *      o site encontra o arquivo pelo mesmo nome automaticamente.
 *   3. Garanta que `showImage` está `true`.
 *
 * Guia completo: INSTRUCOES-IMAGENS.md (na raiz do projeto).
 */
import type { StepId } from "@/lib/types";

export type PlaceholderIcon =
  | "mirror"
  | "repeat"
  | "pause"
  | "compass"
  | "spark"
  | "path"
  | "book"
  | "audio"
  | "calendar"
  | "notebook"
  | "circle"
  | "waves";

export type PlaceholderTone = "deep" | "ocean" | "teal" | "mint" | "cream";

export interface ImageSlot {
  /** Caminho do arquivo dentro de /public. Ex.: "/images/welcome-hero.webp". */
  imageSrc: string;
  /** Descrição da imagem para leitores de tela. Deixe "" se for só decorativa. */
  imageAlt: string;
  /**
   * Onde a imagem aparece:
   * - "side": ao lado do texto no computador (no celular segue `mobileDisplay`)
   * - "top": acima do texto, em largura total
   * - "bottom": abaixo do texto
   * - "background": atrás do conteúdo, com uma camada de cor por cima
   * - "inline": dentro de um componente (cartões, linha do tempo, oferta)
   */
  imagePosition: "side" | "top" | "bottom" | "background" | "inline";
  /** `false` esconde o espaço da imagem (nem o placeholder aparece). */
  showImage: boolean;
  /** Proporção do quadro (largura/altura). Ex.: "4/5", "1/1", "16/9". */
  aspectRatio: string;
  /** Proporção usada no celular quando `mobileDisplay` é "banner". */
  mobileAspectRatio?: string;
  /**
   * Como aparece no celular (apenas para imagePosition "side"):
   * - "banner": largura total acima do texto
   * - "thumbnail": miniatura discreta acima do título
   * - "hidden": não aparece no celular
   */
  mobileDisplay?: "banner" | "thumbnail" | "hidden";
  /** "cover" preenche o quadro (pode recortar); "contain" mostra a imagem inteira. */
  fit: "cover" | "contain";
  /** Ponto focal do recorte (CSS object-position). Ex.: "center", "top", "50% 30%". */
  focalPoint: string;
  /** Aparência do placeholder enquanto não houver imagem. */
  placeholder: { icon: PlaceholderIcon; tone: PlaceholderTone };
  /**
   * Como a imagem aparece nas etapas de pergunta:
   * - "none": direto sobre o fundo escuro, sem moldura (PNG transparente)
   * - "card": dentro de um card claro com cantos arredondados (imagem com fundo)
   * - "photo": a própria imagem vira o card — cantos arredondados, sem moldura
   */
  frame?: "none" | "card" | "photo";
  /** Largura da imagem nas etapas de pergunta (qualquer valor CSS). Opcional. */
  width?: string;
  /** Só para `frame: "photo"`: `false` mantém os cantos retos (nada é cortado). */
  rounded?: boolean;
  /**
   * Só para `frame: "none"`, quando o arquivo tem margens transparentes em
   * volta do desenho e não deve ser recortado. Informe essas margens em % do
   * arquivo: o site mostra o arquivo inteiro, mas mede e centraliza pelo
   * desenho — as sobras transparentes ficam invisíveis. Nesse caso, `width`
   * é a largura do desenho na tela.
   */
  artInset?: { top: number; right: number; bottom: number; left: number };
  /**
   * Só para `frame: "none"`: mostra a imagem com as cores invertidas, em tom
   * off-white. Para desenhos em traço preto com fundo transparente, que
   * sumiriam no fundo escuro. O arquivo não é alterado.
   */
  invert?: boolean;
}

export const images = {
  /** Logo do cabeçalho. Sem arquivo, aparece o nome da marca em texto. */
  brandLogo: {
    imageSrc: "/images/logo.svg",
    imageAlt: "Mente em Expansão",
    imagePosition: "inline",
    showImage: true,
    aspectRatio: "4/1",
    fit: "contain",
    focalPoint: "left center",
    placeholder: { icon: "spark", tone: "cream" },
  },

  /**
   * Etapa 1 — Abertura. Recomendado: 1080x1350 (4:5, vertical).
   * Para trocar: substitua public/images/quiz-page-1.png mantendo o nome
   * (ou mude o caminho abaixo).
   */
  welcomeHero: {
    imageSrc: "/images/quiz-page-1.png",
    imageAlt:
      "Ilustração de uma pessoa com a mão na cabeça, cercada por silhuetas com rabiscos vermelhos no lugar do rosto.",
    imagePosition: "top",
    showImage: true,
    aspectRatio: "4/5",
    fit: "cover",
    focalPoint: "center",
    placeholder: { icon: "mirror", tone: "deep" },
  },

  /**
   * Etapa 2 — A repetição. PNG com fundo transparente, 1080x1350 (4:5).
   * A imagem fica direto sobre o fundo escuro, sem moldura.
   */
  patternReflection: {
    imageSrc: "/images/quiz-page-2.png",
    imageAlt:
      "Desenho em traço branco de uma pessoa sentada, com a cabeça transformada em um emaranhado de linhas.",
    imagePosition: "top",
    showImage: true,
    aspectRatio: "4/5",
    fit: "contain",
    focalPoint: "center",
    placeholder: { icon: "repeat", tone: "deep" },
    frame: "none",
  },

  /**
   * Etapa 3 — Quando você se deixa de lado. Ilustração com fundo claro,
   * quadrada (recomendado: 1000x1000), exibida dentro de um card.
   */
  choiceMoment: {
    imageSrc: "/images/quiz-page-3.png",
    imageAlt:
      "Desenho de uma pessoa curvada, carregando nos ombros uma bateria com apenas 1% de carga.",
    imagePosition: "top",
    showImage: true,
    aspectRatio: "1/1",
    // "contain" mostra a imagem inteira, mesmo se a proporção mudar.
    fit: "contain",
    focalPoint: "center",
    placeholder: { icon: "pause", tone: "cream" },
    frame: "card",
  },

  /**
   * Etapa 4 — O desejo. PNG com fundo transparente, horizontal (4:3),
   * com uma margem transparente em volta do desenho (mais espaço em cima).
   * Fica direto sobre o fundo escuro, sem moldura.
   */
  desiredFuture: {
    imageSrc: "/images/quiz-page-4.png",
    imageAlt:
      "Ilustração de um casal sentado de costas um para o outro, cada um com um balão de pensamento cheio de linhas emaranhadas.",
    imagePosition: "top",
    showImage: true,
    aspectRatio: "4/3",
    fit: "contain",
    focalPoint: "center",
    placeholder: { icon: "compass", tone: "deep" },
    frame: "none",
    width: "min(100%, clamp(16rem, 40svh, 23rem))",
  },

  /**
   * Etapa 5 — Reflexão. Ilustração vertical (3:4, ex.: 900x1200), exibida
   * inteira como um card de cantos arredondados, sem moldura.
   * Ao trocar por uma imagem de outra proporção, ajuste `aspectRatio`.
   */
  personalizedResult: {
    imageSrc: "/images/quiz-page-5.png",
    imageAlt:
      "Ilustração de uma pessoa diante do espelho; o reflexo aparece como uma silhueta com um ponto de interrogação no rosto.",
    imagePosition: "top",
    showImage: true,
    aspectRatio: "3/4",
    fit: "cover",
    focalPoint: "center",
    placeholder: { icon: "mirror", tone: "deep" },
    frame: "photo",
  },

  /**
   * Etapa 6 — Da reflexão à prática. Arquivo original, sem recorte:
   * 1080x1350 (4:5), desenho em traço preto com fundo transparente, exibido
   * em traço claro (`invert`) direto sobre o fundo escuro.
   * Ao trocar por outro arquivo no mesmo formato, mantenha o nome; se as
   * margens forem diferentes, ajuste `artInset` (ou apague-o para mostrar o
   * arquivo como um bloco inteiro). Para uma imagem colorida, apague `invert`.
   */
  practiceTransition: {
    imageSrc: "/images/quiz-page-6.png",
    imageAlt:
      "Desenho em traço de uma pessoa sentada abraçando os joelhos, com o rosto escondido e um emaranhado de linhas, setas e placas saindo da cabeça.",
    imagePosition: "top",
    showImage: true,
    aspectRatio: "4/5",
    fit: "contain",
    focalPoint: "center",
    placeholder: { icon: "path", tone: "deep" },
    frame: "none",
    invert: true,
    width: "clamp(11rem, 27svh, 15rem)",
    // Desenho medido em (294, 249)–(819, 1088) no arquivo de 1080x1350.
    artInset: { top: 18.44, right: 24.07, bottom: 19.33, left: 27.22 },
  },

  /** Mockup do programa principal. PNG/WebP com fundo transparente. */
  programMockup: {
    imageSrc: "/images/program-mockup.webp",
    imageAlt: "Mockup do programa Eu Me Escolho",
    imagePosition: "inline",
    showImage: true,
    aspectRatio: "4/3",
    fit: "contain",
    focalPoint: "center",
    placeholder: { icon: "book", tone: "deep" },
  },

  /** Bônus 1 — Eu Já Sou Suficiente. PNG/WebP com fundo transparente. */
  bonusAffirmations: {
    imageSrc: "/images/bonus-affirmations.webp",
    imageAlt: "Mockup do bônus Eu Já Sou Suficiente",
    imagePosition: "inline",
    showImage: true,
    aspectRatio: "1/1",
    fit: "contain",
    focalPoint: "center",
    placeholder: { icon: "audio", tone: "mint" },
  },

  /** Bônus 2 — 7 Dias Me Escolhendo. PNG/WebP com fundo transparente. */
  bonusSevenDays: {
    imageSrc: "/images/bonus-seven-days.webp",
    imageAlt: "Mockup do bônus 7 Dias Me Escolhendo",
    imagePosition: "inline",
    showImage: true,
    aspectRatio: "1/1",
    fit: "contain",
    focalPoint: "center",
    placeholder: { icon: "calendar", tone: "mint" },
  },

  /** Bônus 3 — Relações Que Eu Quero Construir. PNG/WebP com fundo transparente. */
  bonusRelationships: {
    imageSrc: "/images/bonus-relationships.webp",
    imageAlt: "Mockup do bônus Relações Que Eu Quero Construir",
    imagePosition: "inline",
    showImage: true,
    aspectRatio: "1/1",
    fit: "contain",
    focalPoint: "center",
    placeholder: { icon: "notebook", tone: "mint" },
  },

  /**
   * Etapa 7 — Apresentação do Eu Me Escolho (mockup do produto).
   * Arquivo original, sem recorte: 1122x1402, com fundo escuro próprio.
   * Exibido inteiro como um card de cantos arredondados. Ao trocar por uma
   * imagem de outra proporção, ajuste `aspectRatio`.
   */
  journeyShowcase: {
    imageSrc: "/images/quiz-page-7.png",
    imageAlt:
      "Mockup do programa Eu Me Escolho: um celular com a tela do programa, um tablet com as fases da jornada e os cards Consciência, Esvaziamento, Transformação e Entre Pessoas Que Se Escolhem.",
    imagePosition: "top",
    showImage: true,
    aspectRatio: "1122/1402",
    fit: "contain",
    focalPoint: "center",
    placeholder: { icon: "book", tone: "deep" },
    frame: "photo",
    width: "min(100%, 26rem)",
  },

  /**
   * Etapa 8 — Oferta. Arquivo original, sem recorte: 1092x1440.
   * Exibido inteiro, com cantos retos. Ao trocar por uma imagem de outra
   * proporção, ajuste `aspectRatio`.
   */
  offerShowcase: {
    imageSrc: "/images/quiz-page-8.png",
    imageAlt:
      "Uma mulher e um homem refletindo enquanto usam o programa Eu Me Escolho, com as capas das fases Consciência, Esvaziamento e Transformação e da comunidade Entre Pessoas Que Se Escolhem.",
    imagePosition: "top",
    showImage: true,
    aspectRatio: "1092/1440",
    fit: "contain",
    focalPoint: "center",
    placeholder: { icon: "book", tone: "deep" },
    frame: "photo",
    rounded: false,
    width: "min(100%, 26rem)",
  },

  /**
   * Etapa 8 — Imagem dos bônus (opcional). Enquanto o arquivo não existir,
   * o espaço não aparece na página. Basta colocar o arquivo em
   * public/images/quiz-page-8-bonus.png: ele aparece inteiro, na proporção
   * do próprio arquivo (`aspectRatio` só reserva o espaço enquanto carrega).
   */
  offerBonuses: {
    imageSrc: "/images/quiz-page-8-bonus.png",
    imageAlt: "Os três bônus do Eu Me Escolho.",
    imagePosition: "inline",
    showImage: true,
    aspectRatio: "4/3",
    fit: "contain",
    focalPoint: "center",
    placeholder: { icon: "book", tone: "deep" },
  },

  /** Comunidade — Círculo Eu Me Escolho. Recomendado: 1600x900 (16:9). */
  communityHero: {
    imageSrc: "/images/community-hero.webp",
    imageAlt: "",
    imagePosition: "inline",
    showImage: true,
    aspectRatio: "16/9",
    fit: "cover",
    focalPoint: "center",
    placeholder: { icon: "circle", tone: "ocean" },
  },

  /** Fundo do topo da oferta (etapa 8). Recomendado: 1080x1350 ou 1600x900. */
  offerBackground: {
    imageSrc: "/images/offer-background.webp",
    imageAlt: "",
    imagePosition: "background",
    showImage: true,
    aspectRatio: "4/5",
    fit: "cover",
    focalPoint: "center",
    placeholder: { icon: "waves", tone: "deep" },
  },
} satisfies Record<string, ImageSlot>;

export type ImageSlotName = keyof typeof images;

/**
 * FUNDO DE CADA ETAPA (opcional)
 * ------------------------------
 * Por padrão, cada etapa usa a cor do tema definido em src/config/funnel.ts
 * ("light" = off-white, "dark" = azul profundo). Para usar uma foto de fundo
 * em uma etapa, coloque o arquivo em public/images/fundos/ e mude `showImage`
 * para `true`. A camada de cor por cima (overlayOpacity, de 0 a 1) garante a
 * leitura do texto: quanto maior, mais suave fica a foto.
 */
export interface StepBackground {
  imageSrc: string;
  showImage: boolean;
  overlayOpacity: number;
  focalPoint: string;
}

const background = (file: string): StepBackground => ({
  imageSrc: `/images/fundos/${file}`,
  showImage: false,
  overlayOpacity: 0.86,
  focalPoint: "center",
});

export const stepBackgrounds: Record<StepId, StepBackground> = {
  espelho: background("etapa-1-espelho.webp"),
  repeticao: background("etapa-2-repeticao.webp"),
  "deixa-de-lado": background("etapa-3-deixa-de-lado.webp"),
  desejo: background("etapa-4-desejo.webp"),
  devolutiva: background("etapa-5-devolutiva.webp"),
  pratica: background("etapa-6-pratica.webp"),
  jornada: background("etapa-7-jornada.webp"),
  oferta: background("etapa-8-oferta.webp"),
  confirmacao: background("etapa-9-confirmacao.webp"),
};

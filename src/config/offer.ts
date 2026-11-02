/**
 * OFERTA (etapa 8)
 * ----------------
 * Link de pagamento, preço, fases, bônus, presentes e comunidade.
 * Os textos de abertura e das seções da página ficam em `offerStep`
 * (src/config/funnel.ts).
 *
 * Regras editoriais: não adicione depoimentos, números, escassez, garantias
 * ou selos que não sejam reais e comprováveis.
 */
import type { PlaceholderIcon } from "@/config/images";

/**
 * LINK DE PAGAMENTO — checkout oficial na Cakto.
 * Todos os botões de compra usam este mesmo link.
 * Precisa ser um link https válido; se não for, o build avisa com um erro
 * em vez de publicar botões que não levam a lugar nenhum.
 */
export const CHECKOUT_URL = "https://pay.cakto.com.br/55ouaik_847100";

export interface OfferItem {
  name: string;
  /** Frase curta que abre o card. */
  tagline: string;
  description: string;
  icon: PlaceholderIcon;
}

export interface OfferGift extends OfferItem {
  /**
   * `true` só quando o material estiver pronto para entrega.
   * Enquanto for `false`, o presente não aparece na página.
   */
  ready: boolean;
}

export const offer = {
  productName: "Eu Me Escolho",

  /**
   * Confira se estes valores são os mesmos configurados na plataforma de
   * pagamento. Se o número de parcelas mudar, ajuste também os textos
   * "cinco vezes" / "cinco parcelas" em `offerStep` (src/config/funnel.ts).
   */
  price: {
    display: "R$ 47,00",
    amount: 47,
    currency: "BRL",
    installments: {
      count: 5,
      value: "R$ 10,81",
      total: "R$ 54,05",
    },
  },

  phases: [
    {
      name: "Consciência",
      title: "Comece a entender por que algumas histórias parecem se repetir.",
      text: "Perceba situações em que você acaba correndo atrás, se culpando ou aceitando coisas que não gostaria.",
    },
    {
      name: "Esvaziamento",
      title: "Olhe para o que você vem carregando.",
      text: "Reflita sobre culpas, medos e cobranças que pesam nas suas escolhas e dificultam colocar suas necessidades em primeiro plano.",
    },
    {
      name: "Transformação",
      title: "Comece a fazer diferente na vida real.",
      text: "Dê os primeiros passos para praticar limites, observar como as pessoas te tratam e fazer escolhas mais conscientes.",
    },
  ],

  bonuses: [
    {
      name: "Eu Já Sou Suficiente",
      tagline: "Para quando você começar a duvidar do seu próprio valor.",
      description:
        "Áudios de afirmações e material de apoio para praticar uma conversa mais gentil com você.",
      icon: "audio",
    },
    {
      name: "7 Dias Me Escolhendo",
      tagline: "Para quando quiser transformar reflexão em atitude.",
      description:
        "Pequenas atividades para começar a se escolher no dia a dia.",
      icon: "calendar",
    },
    {
      name: "Relações Que Eu Quero Construir",
      tagline: "Para lembrar o que realmente importa em uma relação.",
      description:
        "Um material interativo para refletir sobre seus limites, seus valores e o tipo de conexão que deseja construir.",
      icon: "notebook",
    },
  ] satisfies OfferItem[],

  /** Presentes especiais — só aparecem os que estiverem com `ready: true`. */
  gifts: [
    {
      name: "Palavras Para Quem Você Está Se Tornando",
      tagline: "Uma carta para lembrar da pessoa que você decidiu cuidar.",
      description:
        "Uma experiência de escrita para registrar o que deseja construir e lembrar das escolhas que quer fazer por você.",
      icon: "spark",
      ready: false,
    },
    {
      name: "Como Reconhecer Alguém Que Combina Com Você",
      tagline:
        "Porque sentir uma conexão não é o mesmo que viver uma relação que faz bem.",
      description:
        "Um guia para observar respeito, reciprocidade e compatibilidade antes de se envolver cada vez mais.",
      icon: "compass",
      ready: false,
    },
  ] as OfferGift[],

  community: {
    badge: "O grande diferencial",
    name: "Entre Pessoas Que Se Escolhem",
    headline:
      "E se, depois de aprender a cuidar mais de você, pudesse conhecer pessoas que também estão tentando fazer o mesmo?",
    paragraphs: [
      "Pessoas que querem se conhecer melhor.",
      "Que desejam fazer amizades, trocar experiências e construir relações com mais respeito.",
      "Não estamos falando de pessoas perfeitas.",
      "Estamos falando de pessoas que também decidiram aprender.",
      "Essa é a proposta da comunidade Entre Pessoas Que Se Escolhem.",
    ],
    /** Regra de acesso — mantenha clara. Nunca prometa acesso imediato. */
    unlock:
      "Ao concluir o programa principal e todos os bônus incluídos na sua jornada, você desbloqueia o acesso a esse espaço de conexão.",
    highlight: "Porque se escolher não precisa significar caminhar sozinho.",
  },

  checkout: {
    url: CHECKOUT_URL,
    /**
     * `true` repassa os parâmetros utm_* da visita para o link de checkout
     * (útil para atribuir vendas às campanhas). Desligado: o botão leva
     * exatamente ao link acima.
     */
    forwardUtms: false,
    /** `true` abre o checkout em nova aba. Recomendado: `false`. */
    openInNewTab: false,
  },
};

/** Presentes prontos para aparecer na página. */
export const readyGifts = offer.gifts.filter((gift) => gift.ready);

/**
 * ETAPAS DO FUNIL
 * ---------------
 * Todos os textos, botões e opções de cada etapa ficam aqui.
 * Pode editar à vontade os textos entre aspas.
 *
 * Atenção: os `id` das opções (ex.: "me-esforco") são usados pela lógica da
 * devolutiva em src/lib/result-engine.ts. Troque o texto (`label`), não o id.
 *
 * Imagens de cada etapa: src/config/images.ts
 * Preço, bônus e checkout: src/config/offer.ts
 * Textos das devolutivas: src/config/results.ts
 */
import type {
  BehaviorId,
  DesireId,
  ObstacleId,
  StepId,
  StepTheme,
} from "@/lib/types";
import type { ImageSlotName } from "@/config/images";
import { offer } from "@/config/offer";

export const funnelSettings = {
  /**
   * Etapa 9 — confirmação curta antes de ir para o checkout.
   * `false` (padrão): o botão da oferta leva direto ao checkout.
   * `true`: mostra uma tela de confirmação antes.
   */
  enableConfirmationStep: false,
  /** Chave usada para salvar as respostas no navegador (localStorage). */
  storageKey: "eme-quiz-v1",
  /** Mostra "Etapa X de Y" acima da barra de progresso. */
  showStepCounter: true,
  /**
   * Etapas que já têm página publicada. O botão só leva para a próxima etapa
   * se ela estiver nesta lista; se ainda não estiver, a resposta é salva e
   * aparece um aviso de "em breve" — nunca uma página quebrada.
   * Ao criar a página de uma nova etapa, acrescente o id dela aqui.
   */
  liveSteps: [
    "espelho",
    "repeticao",
    "deixa-de-lado",
    "desejo",
    "devolutiva",
    "pratica",
    "jornada",
    "oferta",
  ] as StepId[],
  labels: {
    back: "Voltar",
    nextStepSoon:
      "Sua resposta foi salva. A próxima etapa estará disponível em breve.",
    nextStepSoonNoQuestion:
      "Suas respostas estão salvas. A próxima etapa estará disponível em breve.",
    restart: "Recomeçar",
    restartConfirmTitle: "Recomeçar a experiência?",
    restartConfirmText:
      "Suas respostas salvas neste navegador serão apagadas e você volta para o início.",
    restartConfirmYes: "Sim, recomeçar",
    restartConfirmNo: "Continuar de onde parei",
    stepCounter: (current: number, total: number) =>
      `Etapa ${current} de ${total}`,
    chooseToContinue: "Escolha uma opção para continuar.",
    redoExperience: "Refazer a experiência",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Tipos de cada etapa                                                 */
/* ------------------------------------------------------------------ */

interface BaseStep {
  id: StepId;
  /** "light" = fundo off-white · "dark" = fundo azul profundo. */
  theme: StepTheme;
  /** Pequeno rótulo acima do título. */
  eyebrow: string;
  /** Imagem principal da etapa (veja src/config/images.ts). */
  image?: ImageSlotName;
}

export interface IntroStepContent extends BaseStep {
  headline: string;
  /** Trecho do título em itálico, com traço vermelho. Escreva igual ao `headline`. */
  headlineHighlight?: string;
  support: string;
  complement: string;
  cta: string;
  /** Itens curtos abaixo do botão, separados por pontos vermelhos. */
  microcopy: string[];
}

export interface QuestionOption<T extends string> {
  id: T;
  label: string;
}

export interface QuestionStepContent<
  K extends "comportamento" | "obstaculo" | "desejo",
  T extends string,
> extends BaseStep {
  answerKey: K;
  headline: string;
  /** Trecho do título em itálico, com traço vermelho. Escreva igual ao `headline`. */
  headlineHighlight?: string;
  /** Frase curta entre o título e a pergunta. */
  support?: string;
  /** A pergunta que apresenta as opções. */
  subheadline: string;
  options: QuestionOption<T>[];
  microcopy?: string;
  cta: string;
}

/**
 * Partes fixas da etapa 5. O título, o texto e a pergunta mudam conforme a
 * resposta da etapa 2 e ficam em `reflections` (src/config/results.ts).
 */
export interface ResultStepContent extends BaseStep {
  /** Fechamento, igual para todas as versões. Um item por linha. */
  closing: string[];
  cta: string;
  microcopy: string;
}

export interface PracticeStepContent extends BaseStep {
  headline: string;
  /** Trecho do título em itálico, com traço vermelho. Escreva igual ao `headline`. */
  headlineHighlight?: string;
  /** Texto reflexivo, um item por parágrafo. */
  paragraphs: string[];
  /** Bloco em destaque: título e texto (um item por parágrafo). */
  highlightTitle: string;
  highlightText: string[];
  /** Fechamento, um item por linha. */
  closing: string[];
  cta: string;
  microcopy: string;
}

export interface JourneyStepContent extends BaseStep {
  headline: string;
  /** Trecho do título em itálico, com traço vermelho. Escreva igual ao `headline`. */
  headlineHighlight?: string;
  /** Texto principal, em blocos (um item por parágrafo). */
  story: string[];
  /** Pergunta que vira a conversa — aparece em destaque. */
  pivot: string;
  /** Apresentação do produto. */
  presentation: string[];
  /** Frases curtas sobre o ritmo da jornada. */
  pace: string[];
  /** Frase que leva ao card da comunidade. */
  transition: string;
  community: {
    title: string;
    headline: string;
    paragraphs: string[];
    /** Regra de acesso — aparece com um cadeado. Mantenha clara. */
    unlock: string;
    ending: string;
  };
  /** Frase de destaque que fecha a página. */
  closing: string;
  cta: string;
  microcopy: string;
}

/**
 * Textos da etapa 8. Preço, fases, bônus, presentes, comunidade e link de
 * pagamento ficam em src/config/offer.ts.
 */
export interface OfferStepContent extends BaseStep {
  headline: string;
  /** Segunda linha do título, em destaque. */
  headlineAccent: string;
  /** Trecho da segunda linha com traço vermelho. Escreva igual ao `headlineAccent`. */
  headlineAccentHighlight?: string;
  intro: string[];
  afterImage: { lead: string; body: string; gentle: string[] };
  phasesTitle: string;
  phasesClosing: string;
  firstOffer: { label: string; installments: string; note: string };
  bonusesTitle: string;
  bonusesText: string;
  /** Título dos presentes: com dois prontos e com só um pronto. */
  giftsTitle: { many: string; one: string };
  objection: { title: string; paragraphs: string[]; highlight: string };
  finalOffer: {
    title: string;
    subtitle: string;
    label: string;
    installments: string;
    note: string;
  };
  comparison: {
    headline: string;
    text: string;
    highlight: string;
    closing: string;
  };
  cta: string;
  ctaNote: string;
  closing: string;
}

export interface ConfirmStepContent extends BaseStep {
  headline: string;
  text: string;
  bullets: string[];
  cta: string;
}

/* ------------------------------------------------------------------ */
/* Conteúdo                                                            */
/* ------------------------------------------------------------------ */

export const introStep: IntroStepContent = {
  id: "espelho",
  theme: "dark",
  eyebrow: "O espelho",
  image: "welcomeHero",
  headline:
    "Por que você muda de pessoa, mas continua vivendo dores parecidas?",
  headlineHighlight: "dores parecidas",
  support:
    "Talvez existam padrões nos seus relacionamentos que você ainda não conseguiu perceber.",
  complement:
    "Esta experiência foi criada para ajudar você a olhar para essas repetições e descobrir por onde começar a fazer escolhas diferentes.",
  cta: "Quero entender meus padrões",
  microcopy: [
    "Leva poucos minutos",
    "Gratuito",
    "Sem respostas certas ou erradas",
  ],
};

export const behaviorStep: QuestionStepContent<"comportamento", BehaviorId> = {
  id: "repeticao",
  theme: "dark",
  eyebrow: "A repetição",
  image: "patternReflection",
  answerKey: "comportamento",
  headline: "Quando você sente que pode perder alguém, o que costuma fazer?",
  headlineHighlight: "perder alguém",
  support: "Pensa nas suas últimas experiências.",
  subheadline: "Qual dessas reações mais parece com você?",
  options: [
    { id: "me-esforco", label: "Eu me esforço ainda mais para a pessoa ficar" },
    { id: "silencio", label: "Guardo o que sinto para evitar conflito" },
    { id: "validacao", label: "Fico tentando entender o que fiz de errado" },
    { id: "afasto", label: "Me afasto antes que alguém possa me machucar" },
  ],
  microcopy:
    "Não existe resposta certa ou errada. Escolha a opção que mais combina com você.",
  cta: "Continuar",
};

export const obstacleStep: QuestionStepContent<"obstaculo", ObstacleId> = {
  id: "deixa-de-lado",
  theme: "dark",
  eyebrow: "Quando você se deixa de lado",
  image: "choiceMoment",
  answerKey: "obstaculo",
  headline:
    "Você já quis dizer “não”, mas acabou dizendo “sim” só para não perder alguém?",
  headlineHighlight: "dizendo “sim”",
  subheadline: "Quando isso acontece, o que costuma pesar mais para você?",
  options: [
    { id: "decepcionar", label: "Tenho medo de decepcionar a pessoa" },
    { id: "afastar", label: "Tenho receio de que ela se afaste" },
    { id: "culpa", label: "Me sinto culpado por pensar em mim" },
    { id: "duvida", label: "Às vezes, nem sei o que eu realmente quero" },
  ],
  microcopy:
    "Não precisa se julgar. Apenas escolha a alternativa que mais se aproxima da sua experiência.",
  cta: "Continuar",
};

export const desireStep: QuestionStepContent<"desejo", DesireId> = {
  id: "desejo",
  theme: "dark",
  eyebrow: "O desejo",
  image: "desiredFuture",
  answerKey: "desejo",
  headline:
    "Se você pudesse mudar uma coisa na forma como se relaciona, o que escolheria?",
  headlineHighlight: "mudar uma coisa",
  subheadline:
    "Pensa menos no que os outros deveriam fazer e mais em como você gostaria de se sentir.",
  options: [
    { id: "seguranca", label: "Me sentir seguro para ser quem eu sou" },
    { id: "limites", label: "Conseguir dizer não sem sentir culpa" },
    { id: "autonomia", label: "Não depender tanto da aprovação dos outros" },
    {
      id: "reciprocidade",
      label: "Construir relações em que o cuidado seja recíproco",
    },
  ],
  microcopy: "Escolha o que mais faz sentido para você neste momento.",
  cta: "Descobrir meu próximo passo",
};

export const resultStep: ResultStepContent = {
  id: "devolutiva",
  theme: "dark",
  eyebrow: "Sua devolutiva",
  image: "personalizedResult",
  closing: [
    "Você não precisa responder agora.",
    "Mas talvez essa seja uma pergunta que vale a pena levar para a vida.",
  ],
  cta: "Quero aprender a fazer diferente",
  microcopy: "Uma reflexão a partir das suas respostas.",
};

export const practiceStep: PracticeStepContent = {
  id: "pratica",
  theme: "dark",
  eyebrow: "Da reflexão à prática",
  image: "practiceTransition",
  headline:
    "Você já prometeu para si que não ia mais aceitar certas coisas… mas acabou aceitando de novo?",
  headlineHighlight: "aceitando de novo",
  // ⚠️ RASCUNHO — `paragraphs`, `highlightText` e `closing` são provisórios.
  // Substitua pelos textos aprovados da etapa 6.
  paragraphs: [
    "Isso não acontece porque você não aprende ou porque não quer mudar.",
    "Perceber um padrão é diferente de saber o que fazer quando ele aparece. E, na hora em que o medo ou a culpa chegam, a tendência é voltar para o que já é conhecido.",
  ],
  highlightTitle: "E sabe o que é mais difícil?",
  highlightText: [
    "É que, sem um caminho, cada nova promessa depende só da força de vontade — e ela costuma faltar justamente quando você mais precisa.",
  ],
  closing: [
    "A boa notícia é que dá para aprender a fazer diferente.",
    "Um passo de cada vez.",
  ],
  cta: "Quero saber por onde começar",
  microcopy: "Você não precisa mudar tudo de uma vez.",
};

export const journeyStep: JourneyStepContent = {
  id: "jornada",
  theme: "dark",
  eyebrow: "A jornada e a comunidade",
  image: "journeyShowcase",
  headline: "E se, dessa vez, você começasse a cuidar de você também?",
  headlineHighlight: "cuidar de você",
  story: [
    "Talvez você já tenha passado muito tempo tentando fazer certas relações darem certo.",
    "Tentando entender o outro, agradar, evitar discussões ou fazer de tudo para não perder alguém.",
  ],
  pivot: "Mas quem estava cuidando de você enquanto tudo isso acontecia?",
  presentation: [
    "Foi pensando nisso que criamos o Eu Me Escolho.",
    "Uma jornada para você começar a entender melhor suas escolhas, aprender a colocar limites e parar de deixar suas próprias vontades sempre por último.",
  ],
  pace: ["Sem precisar mudar tudo de uma vez.", "Um passo de cada vez."],
  transition:
    "E tem uma parte dessa jornada que torna tudo ainda mais especial.",
  community: {
    title: "ENTRE PESSOAS QUE SE ESCOLHEM",
    headline:
      "Porque você não precisa continuar se sentindo sozinho nessa caminhada.",
    paragraphs: [
      "Imagine encontrar pessoas que também estão tentando fazer diferente.",
      "Pessoas que querem se conhecer melhor, trocar experiências e construir relações com mais respeito e cuidado.",
      "Esse é o propósito da nossa comunidade.",
    ],
    unlock:
      "Depois de concluir o Eu Me Escolho e os três bônus, você desbloqueia o acesso ao Entre Pessoas Que Se Escolhem.",
    ending:
      "Um espaço para continuar crescendo e conhecer outras pessoas que também decidiram começar por si.",
  },
  closing:
    "Você começa aprendendo a se escolher. E depois pode encontrar pessoas que também estão nesse caminho.",
  cta: "Quero conhecer essa jornada",
  microcopy: "Na próxima etapa, você vai descobrir tudo o que está incluído.",
};

const { installments } = offer.price;
const installmentsLine = `ou ${installments.count}x de ${installments.value}`;

export const offerStep: OfferStepContent = {
  id: "oferta",
  theme: "dark",
  eyebrow: "Seu primeiro passo",
  image: "offerShowcase",
  headline: "Você já tentou tantas vezes não perder alguém...",
  headlineAccent: "E se agora começasse a não perder mais você?",
  headlineAccentHighlight: "não perder mais você",
  intro: [
    "Você não precisa descobrir tudo sozinho.",
    "Existe um caminho para começar a fazer escolhas diferentes, uma de cada vez.",
  ],
  afterImage: {
    lead: "Uma jornada para você parar de se deixar para depois.",
    body: "Um programa para olhar para o que se repete nas suas relações, entender suas escolhas e começar a se colocar na própria vida.",
    gentle: [
      "Você não precisa mudar tudo hoje.",
      "Pode começar com pequenas decisões que também levem em conta o que você sente.",
    ],
  },
  phasesTitle: "O caminho que você vai percorrer",
  phasesClosing:
    "Não é sobre se tornar outra pessoa. É sobre começar a cuidar melhor de quem você já é.",
  firstOffer: {
    label: "A jornada completa por",
    installments: installmentsLine,
    note: `Pagamento único à vista ou parcelado em cinco vezes. Total parcelado: ${installments.total}.`,
  },
  bonusesTitle: "Você não recebe só reflexões.",
  bonusesText:
    "Também terá materiais para aqueles momentos em que sabe que quer agir diferente, mas não sabe muito bem por onde começar.",
  giftsTitle: {
    many: "E ainda preparamos dois presentes especiais.",
    one: "E ainda preparamos um presente especial.",
  },
  objection: {
    title: "“Mas eu já vejo conteúdos assim de graça...”",
    paragraphs: [
      "E esses conteúdos podem ajudar.",
      "Talvez você até já tenha salvado dezenas de publicações que fizeram todo sentido.",
      "Mas existe uma diferença entre ler algo que te emociona por alguns minutos e ter um caminho organizado para colocar aquilo em prática.",
      "O Eu Me Escolho reúne reflexões, etapas e atividades para ajudar você a começar a levar o que aprende para a própria vida.",
    ],
    highlight:
      "Não é sobre consumir mais conteúdo. É sobre começar a fazer algo com o que você aprendeu.",
  },
  finalOffer: {
    title: "Você não precisa mudar tudo hoje.",
    subtitle: "Pode começar dando um passo por você.",
    label: "Seu acesso ao Eu Me Escolho",
    installments: installmentsLine,
    note: `Pagamento único à vista ou parcelado. Total em cinco parcelas: ${installments.total}.`,
  },
  comparison: {
    headline:
      "Você já pensou em pagar por um aplicativo para encontrar alguém?",
    text: "Às vezes, a gente está disposto a investir para conhecer uma pessoa nova, mas esquece de investir em conhecer melhor a si mesmo.",
    highlight:
      "Antes de encontrar alguém que escolha você, que tal começar aprendendo a se escolher?",
    closing: `Por ${installments.count} parcelas de ${installments.value}, você pode começar essa jornada.`,
  },
  cta: "Quero começar a me escolher",
  ctaNote:
    "Você será direcionado à página de pagamento para revisar os dados e concluir sua compra.",
  closing: "Você pode amar alguém sem precisar se deixar para depois.",
};

export const confirmStep: ConfirmStepContent = {
  id: "confirmacao",
  theme: "light",
  eyebrow: "Antes de seguir",
  headline: "Tudo certo para começar a se escolher?",
  text: "Você será levado para a página de pagamento para finalizar sua compra.",
  bullets: [
    "Eu Me Escolho + três bônus.",
    "R$ 47,00 em pagamento único, sem mensalidade do programa.",
    "O Círculo Eu Me Escolho é desbloqueado depois que você concluir o programa e os três bônus.",
  ],
  cta: "Ir para o pagamento",
};

/* ------------------------------------------------------------------ */
/* Ordem das etapas                                                    */
/* ------------------------------------------------------------------ */

const allSteps: StepId[] = [
  "espelho",
  "repeticao",
  "deixa-de-lado",
  "desejo",
  "devolutiva",
  "pratica",
  "jornada",
  "oferta",
  "confirmacao",
];

/** Etapas ativas, na ordem em que aparecem. */
export const stepOrder: StepId[] = allSteps.filter(
  (id) => id !== "confirmacao" || funnelSettings.enableConfirmationStep,
);

/**
 * Endereço de cada etapa no site. Os botões "Continuar" e "Voltar" usam
 * este mapa junto com a ordem acima — não é preciso configurar links à mão.
 */
export const stepPaths: Record<StepId, string> = {
  espelho: "/",
  repeticao: "/etapa-2",
  "deixa-de-lado": "/etapa-3",
  desejo: "/etapa-4",
  devolutiva: "/etapa-5",
  pratica: "/etapa-6",
  jornada: "/etapa-7",
  oferta: "/etapa-8",
  confirmacao: "/confirmacao",
};

export const stepThemes: Record<StepId, StepTheme> = {
  espelho: introStep.theme,
  repeticao: behaviorStep.theme,
  "deixa-de-lado": obstacleStep.theme,
  desejo: desireStep.theme,
  devolutiva: resultStep.theme,
  pratica: practiceStep.theme,
  jornada: journeyStep.theme,
  oferta: offerStep.theme,
  confirmacao: confirmStep.theme,
};

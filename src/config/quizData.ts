/**
 * CONTEÚDO DO QUIZ EU ME ESCOLHO
 * ------------------------------
 * Todos os textos do quiz ficam neste arquivo: tela inicial, perguntas,
 * pontuação, tela de nome, resultados, oferta, bônus, preço, checkout e
 * botões. Os componentes só leem daqui.
 *
 * Como editar:
 * - Troque apenas o que está entre aspas.
 * - `{nome}` é substituído pelo primeiro nome digitado. Mantenha as chaves.
 * - Os `id` das opções são internos: troque o texto (`label`), não o id.
 * - `score` (A, B ou C) é a letra que a opção pontua. Nunca aparece na tela.
 * - `emoji` é só visual (um por opção, antes do texto). Pode trocar à vontade:
 *   não entra na pontuação nem no resultado.
 *
 * Regras editoriais: não prometa cura, recuperação garantida, volta do ex ou
 * novo relacionamento. Não adicione depoimentos, números ou escassez que não
 * sejam reais.
 *
 * Este arquivo não pode importar nada em tempo de execução (só `import type`):
 * os testes automáticos (tests/scoring.test.mjs) o leem direto pelo Node.
 */
import type { Letter } from "../lib/scoring";

export interface QuizOption {
  id: string;
  /** Emoji mostrado antes do texto. Só visual: não pontua e não é lido por leitores de tela. */
  emoji: string;
  label: string;
  /** Letra que esta opção pontua. Sem `score`, a opção não pontua. */
  score?: Letter;
}

export interface QuizQuestion {
  /** Número da pergunta (1 a 10). Também é o endereço: /pergunta/1. */
  number: number;
  text: string;
  options: QuizOption[];
}

export interface ResultBlock {
  title: string;
  text: string;
}

export interface ResultContent {
  /** Nome do resultado (aparece no rótulo). */
  name: string;
  label: string;
  /** Use {nome}. */
  title: string;
  description: string[];
  risk: ResultBlock;
  help: ResultBlock;
  startingPoint: ResultBlock & { phase: string };
  transition: string;
}

/** Parágrafo simples ou com um trecho inicial em negrito. */
export type RichParagraph = string | { strong: string; text: string };

/* ------------------------------------------------------------------ */
/* Checkout e preço                                                    */
/* ------------------------------------------------------------------ */

/**
 * LINK DE PAGAMENTO — checkout oficial na Cakto (todos os botões usam este).
 * Precisa ser um link https válido; se não for, o build avisa com um erro.
 */
export const CHECKOUT_URL = "https://pay.cakto.com.br/55ouaik_847100";

export const checkout = {
  url: CHECKOUT_URL,
  /**
   * `true` repassa para o link da Cakto as UTMs da visita (utm_source,
   * utm_medium, utm_campaign, utm_content, utm_term) e o fbclid do Meta, para
   * atribuir vendas às campanhas. O nome e as respostas nunca vão para o checkout.
   */
  forwardTrackingParams: true,
  /** `true` abre o checkout em nova aba. Recomendado: `false` (mesma aba). */
  openInNewTab: false,
};

/**
 * PREÇO — mostrado no bloco "Comece hoje".
 * Confira se é o mesmo valor configurado na Cakto.
 * `amount` e `currency` são usados só no evento de checkout da Meta.
 */
export const price = {
  display: "R$ 47,00",
  note: "Pagamento único.",
  amount: 47,
  currency: "BRL",
};

/* ------------------------------------------------------------------ */
/* Marca e compartilhamento                                            */
/* ------------------------------------------------------------------ */

export const product = {
  brand: "Mente em Expansão",
  name: "Eu Me Escolho",
};

/** Título da aba e do link compartilhado (WhatsApp, Instagram...). */
export const seo = {
  title: "Em que fase do término você está?",
  description:
    "Responda 10 perguntas e descubra o que está acontecendo com você agora e o que fazer nos próximos 21 dias.",
};

/* ------------------------------------------------------------------ */
/* Tela inicial                                                        */
/* ------------------------------------------------------------------ */

export const startScreen = {
  title: "Em que fase do término você está?",
  /** Trecho do título sublinhado em vermelho. Escreva igual ao `title`. "" desliga. */
  titleHighlight: "fase do término",
  subtitle:
    "Responda 10 perguntas e descubra o que está acontecendo com você agora e o que fazer nos próximos 21 dias.",
  /**
   * Imagem entre o subtítulo e o botão. O arquivo fica em public/images/.
   * Ao trocar o arquivo, atualize `width` e `height` (tamanho real em pixels).
   */
  image: {
    src: "/images/tela-inicial-tres-fases.webp",
    width: 1752,
    height: 897,
    alt: "Três momentos de uma mesma mulher, representando a dor do término, a reflexão e o recomeço.",
  },
  button: "Começar o teste (2 minutos)",
};

/* ------------------------------------------------------------------ */
/* Perguntas e pontuação                                               */
/* ------------------------------------------------------------------ */

export const questions: QuizQuestion[] = [
  {
    number: 1,
    text: "Há quanto tempo o relacionamento terminou?",
    options: [
      {
        id: "menos-de-1-mes",
        emoji: "💔",
        label: "Menos de 1 mês",
        score: "A",
      },
      {
        id: "1-a-3-meses",
        emoji: "🕰️",
        label: "Entre 1 e 3 meses",
        score: "B",
      },
      {
        id: "3-a-6-meses",
        emoji: "🍂",
        label: "Entre 3 e 6 meses",
        score: "C",
      },
      {
        id: "mais-de-6-meses",
        emoji: "🌱",
        label: "Mais de 6 meses",
        score: "C",
      },
      {
        id: "ainda-acabando",
        emoji: "🌫️",
        label: "Ainda não terminou de vez, mas está acabando",
        score: "B",
      },
    ],
  },
  {
    number: 2,
    text: "Quem decidiu terminar?",
    options: [
      {
        id: "outra-pessoa",
        emoji: "💔",
        label: "A outra pessoa",
        score: "A",
      },
      {
        id: "eu",
        emoji: "🚪",
        label: "Eu",
        score: "C",
      },
      {
        id: "os-dois",
        emoji: "🤝",
        label: "Foi uma decisão dos dois",
        score: "C",
      },
      {
        id: "nao-sei",
        emoji: "❓",
        label: "Ainda não sei se acabou mesmo",
        score: "B",
      },
    ],
  },
  {
    number: 3,
    text: "Com que frequência você pensa nessa pessoa?",
    options: [
      {
        id: "o-tempo-todo",
        emoji: "😞",
        label: "O tempo todo, é a primeira coisa quando acordo",
        score: "A",
      },
      {
        id: "varias-vezes",
        emoji: "🌙",
        label: "Várias vezes por dia, principalmente à noite",
        score: "B",
      },
      {
        id: "as-vezes",
        emoji: "💭",
        label: "Às vezes, quando algo me lembra",
        score: "C",
      },
    ],
  },
  {
    number: 4,
    text: "Como está o contato entre vocês hoje?",
    options: [
      {
        id: "bloqueio",
        emoji: "🚫",
        label: "Bloqueei ou fui bloqueada, e isso dói muito",
        score: "A",
      },
      {
        id: "olho-as-redes",
        emoji: "👀",
        label: "Não falamos, mas olho as redes dela/dele",
        score: "B",
      },
      {
        id: "ainda-conversamos",
        emoji: "💬",
        label: "Ainda conversamos ou nos vemos de vez em quando",
        score: "B",
      },
      {
        id: "sem-contato",
        emoji: "🌿",
        label: "Não tenho contato e não sinto necessidade de procurar",
        score: "C",
      },
    ],
  },
  {
    number: 5,
    text: "Num momento difícil, qual é a sua maior vontade?",
    options: [
      {
        id: "mandar-mensagem",
        emoji: "📱",
        label: "Mandar mensagem ou ligar",
        score: "B",
      },
      {
        id: "ficar-na-cama",
        emoji: "🛏️",
        label: "Ficar na cama e não falar com ninguém",
        score: "A",
      },
      {
        id: "me-ocupar",
        emoji: "🏃",
        label: "Me ocupar o tempo todo para não sentir",
        score: "A",
      },
      {
        id: "entender",
        emoji: "🧩",
        label: "Entender por que isso sempre acontece comigo",
        score: "C",
      },
    ],
  },
  {
    number: 6,
    text: "O que mais dói hoje?",
    options: [
      {
        id: "saudade",
        emoji: "🥀",
        label: "A saudade e o vazio",
        score: "A",
      },
      {
        id: "rejeicao",
        emoji: "💔",
        label: "A sensação de ter sido rejeitada ou trocada",
        score: "A",
      },
      {
        id: "deixar-ir",
        emoji: "🔄",
        label: "Não conseguir deixar a pessoa ir de vez",
        score: "B",
      },
      {
        id: "me-anulei",
        emoji: "🪞",
        label: "Perceber o quanto eu aceitei e me anulei",
        score: "C",
      },
    ],
  },
  {
    number: 7,
    text: "Essa história já aconteceu antes com você?",
    options: [
      {
        id: "mesma-historia",
        emoji: "🔁",
        label: "Sim, parece sempre a mesma história com outra pessoa",
        score: "C",
      },
      {
        id: "partes-se-repetem",
        emoji: "🧩",
        label: "Algumas partes se repetem",
        score: "C",
      },
      {
        id: "primeira-vez",
        emoji: "🥺",
        label: "É a primeira vez que sinto isso",
        score: "A",
      },
      {
        id: "nao-sei",
        emoji: "🤔",
        label: "Não sei dizer",
        score: "B",
      },
    ],
  },
  {
    number: 8,
    text: "No relacionamento, você costumava…",
    options: [
      {
        id: "ceder",
        emoji: "🤐",
        label: "Ceder para evitar briga",
        score: "C",
      },
      {
        id: "se-adaptar",
        emoji: "🫥",
        label: "Se adaptar ao que a outra pessoa queria",
        score: "C",
      },
      {
        id: "esperar-mudar",
        emoji: "⏳",
        label: "Esperar que ela/ele mudasse",
        score: "B",
      },
      {
        id: "equilibrada",
        emoji: "⚖️",
        label: "Me sentir equilibrada na maior parte do tempo",
        score: "A",
      },
    ],
  },
  {
    number: 9,
    text: "Se você pudesse mudar uma coisa nos próximos 21 dias, seria…",
    options: [
      {
        id: "parar-a-dor",
        emoji: "❤️‍🩹",
        label: "Parar de sentir essa dor o tempo todo",
        score: "A",
      },
      {
        id: "nao-voltar",
        emoji: "🚫",
        label: "Não voltar atrás nem procurar a pessoa",
        score: "B",
      },
      {
        id: "nao-repetir",
        emoji: "🔍",
        label: "Entender por que eu escolho assim e não repetir",
        score: "C",
      },
      {
        id: "me-sentir-eu",
        emoji: "🌷",
        label: "Voltar a me sentir eu mesma",
        score: "B",
      },
    ],
  },
  {
    // Não pontua: a resposta fica guardada, mas não entra no resultado.
    number: 10,
    text: "Quanto tempo por dia você conseguiria dedicar a você?",
    options: [
      {
        id: "5-minutos",
        emoji: "⏱️",
        label: "5 minutos",
      },
      {
        id: "10-minutos",
        emoji: "🕐",
        label: "10 minutos",
      },
      {
        id: "20-minutos-ou-mais",
        emoji: "🌸",
        label: "20 minutos ou mais",
      },
      {
        id: "rotina-dificil",
        emoji: "🫂",
        label: "Não sei, minha rotina está difícil",
      },
    ],
  },
];

/** Textos de interface das perguntas. */
export const questionScreen = {
  counter: (current: number, total: number) =>
    `PERGUNTA ${current} DE ${total}`,
  /** Lido por leitores de tela no botão de seta. */
  back: "Voltar",
};

/* ------------------------------------------------------------------ */
/* Tela de nome                                                        */
/* ------------------------------------------------------------------ */

export const nameScreen = {
  title: "Antes de ver seu resultado, como podemos te chamar?",
  fieldLabel: "Primeiro nome",
  button: "Ver meu resultado",
  /** Aviso quando o campo é enviado vazio. */
  required: "Digite seu primeiro nome.",
  maxLength: 40,
};

/* ------------------------------------------------------------------ */
/* Resultados                                                          */
/* ------------------------------------------------------------------ */

const transition =
  "Agora, conheça o programa de 21 dias que vai orientar seus próximos passos.";

export const results: Record<Letter, ResultContent> = {
  A: {
    name: "No Meio da Tempestade",
    label: "Seu resultado: No Meio da Tempestade",
    title: "{nome}, a dor do término está ocupando grande parte dos seus dias.",
    description: [
      "Pelas suas respostas, a saudade e o vazio têm pesado na sua rotina. Pensar nessa pessoa, sentir sua falta ou tentar encontrar explicações ainda exige muita energia de você.",
      "Neste momento, o mais importante não é resolver toda a sua história de uma vez. É encontrar maneiras de atravessar um dia de cada vez.",
    ],
    risk: {
      title: "O risco neste momento",
      text: "Agir no impulso, procurar a pessoa em um momento de desespero ou se isolar justamente quando você precisa de apoio.",
    },
    help: {
      title: "O que pode ajudar agora",
      text: "Ter um passo a passo simples para cada dia, pequenas ações que ajudem você a retomar sua rotina e sessões guiadas para fazer uma pausa antes de agir pela saudade.",
    },
    startingPoint: {
      title: "Seu ponto de partida no Eu Me Escolho",
      phase: "Fase 1 — Consciência.",
      text: "O primeiro passo é compreender o que você está sentindo, observar suas reações e começar a cuidar de si sem exigir que tudo esteja resolvido.",
    },
    transition,
  },
  B: {
    name: "Presa no Que Ficou",
    label: "Seu resultado: Presa no Que Ficou",
    title:
      "{nome}, o relacionamento continua ocupando espaço na sua vida, mesmo depois do término.",
    description: [
      "Pelas suas respostas, você segue tentando levar a rotina adiante, mas ainda retorna a essa pessoa em pensamentos, nas redes sociais ou em conversas.",
      "Uma lembrança, uma mensagem ou uma foto é suficiente para trazer de volta a vontade de procurar ou retomar o contato.",
    ],
    risk: {
      title: "O risco neste momento",
      text: "Tomar decisões apenas pela saudade ou permanecer em uma situação indefinida que continua machucando você.",
    },
    help: {
      title: "O que pode ajudar agora",
      text: "Reconhecer os momentos em que surge a vontade de voltar atrás e criar pequenas atitudes para interromper esse movimento antes de agir automaticamente.",
    },
    startingPoint: {
      title: "Seu ponto de partida no Eu Me Escolho",
      phase: "Fase 2 — Esvaziamento.",
      text: "Seu foco é observar o que ainda mantém você ligada a essa história e começar a abrir espaço na rotina para novas decisões.",
    },
    transition,
  },
  C: {
    name: "Pronta para Não Repetir",
    label: "Seu resultado: Pronta para Não Repetir",
    title:
      "{nome}, agora é hora de olhar para o que você não quer viver novamente.",
    description: [
      "Pelas suas respostas, além do término, sua atenção está voltada para os comportamentos que apareceram nessa relação.",
      "Ceder demais, deixar suas vontades em segundo plano ou esperar mudanças que não aconteceram são situações que merecem ser observadas antes de começar uma nova história.",
    ],
    risk: {
      title: "O risco neste momento",
      text: "Entrar em outra relação sem reconhecer seus próprios limites e acabar repetindo escolhas que já trouxeram sofrimento.",
    },
    help: {
      title: "O que pode ajudar agora",
      text: "Identificar os comportamentos que se repetem, reconhecer suas necessidades e colocar por escrito aquilo que você não deseja aceitar novamente.",
    },
    startingPoint: {
      title: "Seu ponto de partida no Eu Me Escolho",
      phase: "Fase 3 — Transformação.",
      text: "Seu foco é reconhecer padrões e definir limites mais conscientes para as próximas relações. Percorrer as fases anteriores também ajuda a revisitar o que ficou dessa história.",
    },
    transition,
  },
};

/* ------------------------------------------------------------------ */
/* Oferta (igual nos três resultados)                                  */
/* ------------------------------------------------------------------ */

export const offer = {
  /** Use {nome}. */
  title:
    "{nome}, você não precisa descobrir sozinha o que fazer a cada dia depois do término.",
  productName: "EU ME ESCOLHO",
  description: [
    "Um programa de 21 dias para atravessar o término com um passo a passo diário, entender o que você está sentindo e começar a fazer escolhas diferentes para não repetir a mesma história.",
    "Em vez de acordar sem saber por onde começar, você terá sessões guiadas e um diário que orienta pequenas atitudes para colocar em prática na vida real.",
    "O objetivo não é exigir que você esteja bem em 21 dias. É oferecer uma direção para esse período, respeitando o seu ritmo.",
  ],

  includedTitle: "O QUE VOCÊ RECEBE AGORA",

  sessions: {
    title: "7 SESSÕES GUIADAS EM 3 FASES",
    text: "São 7 sessões guiadas, para ouvir no celular, com fones, no seu horário. Elas estão organizadas em três fases e podem ser revisitadas durante a jornada.",
    phases: [
      {
        title: "FASE 1 — CONSCIÊNCIA",
        text: "Entender o que está acontecendo com você, reconhecer seus sentimentos e perceber os momentos em que a saudade fala mais alto.",
      },
      {
        title: "FASE 2 — ESVAZIAMENTO",
        text: "Observar o que ainda prende você a essa história e praticar pequenas atitudes para lidar com lembranças, contatos e hábitos que dificultam seguir em frente.",
      },
      {
        title: "FASE 3 — TRANSFORMAÇÃO",
        text: "Reconhecer comportamentos que se repetem nos seus relacionamentos e definir o que você não deseja aceitar novamente.",
      },
    ],
  },

  diary: {
    title: "DIÁRIO DOS 21 DIAS",
    lead: "Um passo a passo para levar o programa para a sua vida real.",
    paragraphs: [
      "Durante 21 dias, você encontra uma pequena ação prática de 2 a 5 minutos e uma pergunta para responder em poucas linhas.",
      "As ações incluem atitudes como arquivar uma conversa, escrever motivos reais do término, passar uma noite sem olhar as redes da pessoa ou guardar objetos que despertam lembranças.",
      {
        strong: "Seu Medidor de Recuperação:",
        text: "nos dias 1, 7, 14 e 21, você registra notas de 0 a 10 sobre quanto pensa na pessoa, a vontade de voltar, sua rotina, sua autoestima e o quanto compreende os comportamentos que se repetem.",
      },
      "Assim, você consegue comparar seus próprios registros e observar o que mudou — e o que ainda precisa de atenção.",
      "No dia 21, você escreve a Carta para o Meu Próximo Relacionamento, com três limites dos quais não deseja mais abrir mão.",
      "O Diário dos 21 Dias está disponível imediatamente após a compra, junto com as sessões guiadas.",
    ] as RichParagraph[],
  },

  bonusesTitle: "E MAIS 3 BÔNUS, LIBERADOS NO 8º DIA",
  bonuses: [
    {
      title: "BÔNUS 1 — PLANO SOS: OS 5 MOMENTOS MAIS DIFÍCEIS",
      items: [
        {
          strong: "O que é:",
          text: "5 sessões curtas, de 3 a 5 minutos, criadas para situações específicas: vontade de mandar mensagem, ver algo nas redes, uma noite em que a cabeça não para, uma data especial ou a vontade de voltar.",
        },
        {
          strong: "Quando usar:",
          text: "quando a saudade apertar e você sentir vontade de agir sem pensar nas consequências.",
        },
        {
          strong: "O que você ganha:",
          text: "um recurso prático para fazer uma pausa, organizar seus pensamentos e considerar sua próxima atitude antes de agir no impulso.",
        },
      ],
    },
    {
      title: "BÔNUS 2 — RAIO-X DO SEU PADRÃO AMOROSO",
      items: [
        {
          strong: "O que é:",
          text: "um teste com perguntas sobre suas atitudes nos relacionamentos, que gera um relatório personalizado com uma descrição dos comportamentos identificados, exemplos de como aparecem no dia a dia e quais sessões priorizar.",
        },
        {
          strong: "Quando usar:",
          text: "quando quiser compreender por que algumas situações se repetem com pessoas diferentes ou reconhecer atitudes que deseja mudar.",
        },
        {
          strong: "O que você ganha:",
          text: "uma leitura organizada das suas respostas para refletir sobre seus comportamentos e direcionar melhor sua jornada, sem funcionar como diagnóstico psicológico.",
        },
      ],
    },
    {
      title: "BÔNUS 3 — SE ELE TE PROCURAR: GUIA DE RESPOSTAS E DECISÕES",
      items: [
        {
          strong: "O que é:",
          text: "um guia com sugestões de respostas para mensagens como “oi, sumida”, “podemos conversar?”, “sinto sua falta” e “tudo bem com você?”, além de orientações para refletir sobre bloquear, silenciar ou manter o contato, lidar com fotos e presentes e estabelecer limites com amigos em comum.",
        },
        {
          strong: "Quando usar:",
          text: "quando a outra pessoa entrar em contato, quando você estiver em dúvida sobre responder ou quando situações do término continuarem aparecendo na sua rotina.",
        },
        {
          strong: "O que você ganha:",
          text: "exemplos de comunicação e critérios práticos para considerar suas opções antes de tomar uma decisão, sem precisar responder pela pressão do momento.",
        },
      ],
    },
  ],
  bonusesNote: "Os três bônus serão liberados no 8º dia após a compra.",

  startToday: {
    title: "COMECE HOJE",
    text: "Uma jornada de 21 dias para dedicar atenção a você, um passo de cada vez.",
    listTitle: "Você recebe:",
    items: [
      "Acesso imediato às 7 sessões guiadas.",
      "Acesso imediato ao Diário dos 21 Dias, com ações práticas, perguntas diárias e Medidor de Recuperação.",
      "Plano SOS: Os 5 Momentos Mais Difíceis — liberado no 8º dia.",
      "Raio-X do Seu Padrão Amoroso — liberado no 8º dia.",
      "Se Ele Te Procurar: Guia de Respostas e Decisões — liberado no 8º dia.",
    ],
  },

  /** Botão de compra: muda conforme o resultado. */
  buttonByResult: {
    A: "Começar pela Fase 1, Consciência",
    B: "Começar pela Fase 2, Esvaziamento",
    C: "Começar pela Fase 3, Transformação",
  } satisfies Record<Letter, string>,

  buttonNote:
    "Compra segura pela Cakto. Você tem 7 dias para exercer seu direito de arrependimento, conforme o Código de Defesa do Consumidor.",

  footer:
    "O Eu Me Escolho é um material de apoio ao desenvolvimento pessoal e não substitui acompanhamento psicológico. Se você estiver passando por um sofrimento muito intenso, procure ajuda profissional. Você também pode ligar gratuitamente para o CVV, no 188.",
  /** Número do rodapé que vira link de ligação no celular. "" desliga. */
  footerPhone: "188",
};

/** Endereço que não existe (ex.: /pergunta/99). */
export const notFoundScreen = {
  title: "Esta página não existe.",
  button: "Ir para o início",
};

/* ------------------------------------------------------------------ */
/* Utilitários                                                         */
/* ------------------------------------------------------------------ */

export const TOTAL_QUESTIONS = questions.length;

/** Endereço de cada tela. */
export const paths = {
  start: "/",
  question: (number: number) => `/pergunta/${number}`,
  name: "/nome",
  result: "/resultado",
};

/** Troca {nome} pelo primeiro nome. */
export function withName(text: string, name: string) {
  return text.replaceAll("{nome}", name);
}

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
}

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
 * PREÇO — único lugar para mudar o valor.
 * Aparece no bloco da oferta e no botão final ("Conhecer minha jornada por...").
 * Precisa ser o MESMO valor configurado no produto da Cakto.
 * `amount` e `currency` vão só no evento de início de checkout da Meta.
 * `note`: use só enquanto o produto da Cakto for de pagamento único
 * (sem assinatura).
 */
export const price = {
  display: "R$ 19,90",
  note: "Pagamento único. Sem mensalidade.",
  amount: 19.9,
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
  },
};

/* ------------------------------------------------------------------ */
/* Página final (igual nos três resultados)                            */
/* ------------------------------------------------------------------ */

/**
 * Peças de texto da página final, na ordem em que aparecem:
 * - "texto"              → parágrafo (trechos entre **asteriscos** ficam em negrito)
 * - { quote: "..." }     → pergunta em destaque
 * - { highlight: "..." } → frase de destaque, na cor da marca
 * - { lines: [...] }     → frases curtas em sequência, com um traço ao lado
 * - { processes: "..." } → os três processos em destaque
 */
export type Piece =
  | string
  | { quote: string }
  | { highlight: string }
  | { lines: string[] }
  | { processes: string };

export interface TextBlock {
  title: string;
  pieces: Piece[];
}

/** Imagem da página final: arquivo em public/images/pagina-final/ (PNG com transparência). */
export interface PageImage {
  src: string;
  /** Tamanho real do arquivo, em pixels. */
  width: number;
  height: number;
  /** Descrição para leitores de tela. */
  alt: string;
}

export interface ProcessStep {
  number: number;
  name: string;
  tagline: string;
  /** Ilustração do processo, acima da descrição. */
  image: PageImage;
  pieces: Piece[];
}

/** Vídeo da plataforma (MP4 H.264, sem áudio) em public/videos/. */
export interface DemoVideo {
  src: string;
  /** Quadro do próprio vídeo usado como capa (em public/videos/). */
  poster: string;
  /** Tamanho real do vídeo, em pixels. */
  width: number;
  height: number;
  /** Descrição para leitores de tela. */
  description: string;
}

/** Página real do Diário dos 21 Dias, exportada do PDF original. */
export interface DiaryPage extends PageImage {
  /** Número da página no PDF original. */
  pdfPage: number;
  /** Legenda curta abaixo da miniatura. */
  caption: string;
}

export interface IncludedItem {
  title: string;
  pieces: Piece[];
}

/**
 * Texto aprovado da página final. Ordem: resultado A/B/C → blocos 1 a 8.
 * Sem depoimentos, contagem regressiva, preço riscado ou escassez.
 */
export const finalPage = {
  /**
   * Imagens dos blocos (as dos três processos ficam em cada processo).
   * Ao trocar um arquivo, atualize `width` e `height`.
   */
  images: {
    /** Depois do bloco 2 (conexão), antes do bloco 3. */
    identification: {
      src: "/images/pagina-final/identificacao-emocional.png",
      width: 1122,
      height: 1402,
      alt: "Mulher sentada no chão olhando o celular, pensativa, com um diário aberto ao lado.",
    },
    /** No bloco 3, logo abaixo do título. */
    product: {
      src: "/images/pagina-final/eu-me-escolho-por-dentro.png",
      width: 1217,
      height: 1293,
      alt: "Capa e páginas do Diário dos 21 Dias e três celulares com as sessões Consciência, Esvaziamento e Transformação.",
    },
  } satisfies Record<string, PageImage>,

  /** Bloco 1 — logo depois do resultado A, B ou C. */
  recognition: [
    "Talvez ninguém perceba o quanto você ainda pensa nessa história.",
    "Você continua fazendo suas coisas. Conversa com as pessoas. Tenta ocupar a cabeça.",
    "Mas basta uma música, uma lembrança ou um momento de silêncio para tudo voltar.",
    "E tem aquela vontade de pegar o celular, abrir a conversa e descobrir se ele também está sentindo sua falta.",
    "Às vezes, você até se pergunta:",
    {
      quote:
        "“Por que é tão difícil seguir em frente, mesmo sabendo de tudo o que aconteceu?”",
    },
    "Se você se reconhece nisso, existe algo que precisa ouvir:",
    {
      highlight: "Você não precisa estar bem hoje para começar a cuidar de si.",
    },
  ] as Piece[],

  /** Bloco 2 — conexão emocional. */
  connection: {
    title: "Você sente falta dele. Mas quem está cuidando de você?",
    pieces: [
      "Talvez você tenha passado tanto tempo tentando fazer esse relacionamento dar certo que, aos poucos, foi deixando suas próprias necessidades para depois.",
      {
        lines: [
          "Engoliu coisas que te machucavam.",
          "Aceitou situações que não queria aceitar.",
          "Deu mais uma chance quando já estava cansada.",
        ],
      },
      "E agora que tudo terminou, ficou uma pergunta difícil:",
      { quote: "“Como eu volto a ser eu depois de tudo isso?”" },
      {
        lines: [
          "A verdade é que ninguém ensina o que fazer com a saudade que aparece de madrugada.",
          "Nem com a vontade de voltar.",
          "Nem com aquele vazio que surge quando você percebe que a pessoa fazia parte de quase todos os seus planos.",
        ],
      },
      "Mas existe uma diferença entre sentir falta de alguém e continuar deixando você mesma para trás.",
      { highlight: "E é sobre essa diferença que queremos conversar." },
    ],
  } satisfies TextBlock,

  /** Bloco 3 — apresentação do produto. */
  product: {
    title: "Foi pensando nesses dias que nasceu o Eu Me Escolho. ❤️",
    pieces: [
      {
        lines: [
          "Não para dizer que você precisa esquecer alguém.",
          "Não para exigir que você seja forte o tempo inteiro.",
          "E muito menos para prometer que toda essa dor vai desaparecer em 21 dias.",
        ],
      },
      "Mas para que você tenha um caminho a seguir nos dias em que não sabe por onde começar.",
      "O Eu Me Escolho é uma jornada guiada de 21 dias, com sessões para ouvir, reflexões para escrever e pequenas ações para colocar em prática.",
      "Um momento do seu dia dedicado a olhar para o que você sente, entender o que viveu e começar a fazer escolhas que também considerem você.",
      "Porque, talvez, você tenha passado muito tempo esperando que alguém te escolhesse.",
      {
        highlight:
          "Agora é hora de começar a olhar para a pessoa que ficou esperando por você esse tempo todo: você mesma.",
      },
    ],
  } satisfies TextBlock,

  /** Bloco 4 — os três processos. */
  processes: {
    title: "Antes de começar de novo, você merece olhar para dentro.",
    pieces: [
      "O Eu Me Escolho foi organizado em três processos que se complementam:",
      { processes: "Esvaziamento. Consciência. Transformação." },
      "Não são três promessas de mudança instantânea.",
      "São três etapas de uma jornada de reflexão e prática para ajudar você a deixar de viver apenas em função do que aconteceu.",
    ] as Piece[],
    steps: [
      {
        number: 1,
        name: "Esvaziamento",
        tagline: "Para os dias em que você sente tudo ao mesmo tempo.",
        image: {
          src: "/images/pagina-final/processo-esvaziamento.png",
          width: 1122,
          height: 1402,
          alt: "Mulher com um diário aberto olhando para o alto, com traços leves saindo das páginas em direção a um coração.",
        },
        pieces: [
          {
            lines: [
              "Você tenta dormir, mas a cabeça não para.",
              "Lembra do que foi dito.",
              "Pensa no que poderia ter feito diferente.",
              "Imagina uma conversa que talvez nunca aconteça.",
              "E, quanto mais tenta não pensar, mais parece que tudo volta.",
            ],
          },
          "Nesta etapa, você encontra sessões guiadas e exercícios de expressão emocional para acolher o que está sentindo e colocar em palavras aquilo que ficou guardado.",
          {
            highlight:
              "Porque você não precisa continuar fingindo que nada te machucou.",
          },
        ],
      },
      {
        number: 2,
        name: "Consciência",
        tagline:
          "Para entender por que algumas histórias continuam prendendo você.",
        image: {
          src: "/images/pagina-final/processo-consciencia.png",
          width: 1122,
          height: 1402,
          alt: "Mulher lendo um diário, pensativa, com linhas emaranhadas ao lado.",
        },
        pieces: [
          {
            lines: [
              "Talvez não tenha sido a primeira vez que você aceitou menos do que gostaria.",
              "Talvez tenha sentido medo de desagradar.",
              "De ser deixada.",
              "De dizer o que precisava e perder a pessoa.",
            ],
          },
          "E talvez, por muito tempo, tenha confundido o esforço para manter alguém por perto com a obrigação de abrir mão de si.",
          "Nesta etapa, você será convidada a olhar para seus comportamentos, necessidades e limites.",
          "Não para se culpar pelo que viveu.",
          {
            highlight:
              "Mas para começar a reconhecer o que você não quer continuar repetindo.",
          },
        ],
      },
      {
        number: 3,
        name: "Transformação",
        tagline: "Para que se escolher deixe de ser apenas uma frase bonita.",
        image: {
          src: "/images/pagina-final/processo-transformacao.png",
          width: 1122,
          height: 1402,
          alt: "Mulher sorrindo com tranquilidade, segurando um diário com um lírio e o celular.",
        },
        pieces: [
          "Porque dizer “agora vou pensar em mim” é uma coisa.",
          {
            lines: [
              "Mas o que fazer quando ele manda mensagem?",
              "Quando a saudade aperta?",
              "Quando você sente vontade de abandonar tudo o que decidiu?",
            ],
          },
          "É nesses momentos que as pequenas escolhas importam.",
          "Nesta etapa, você trabalha atitudes práticas de cuidado consigo, reflexão sobre limites e retomada da própria rotina.",
          {
            lines: [
              "Mesmo que ele não volte.",
              "Mesmo que ele volte.",
              "Mesmo que você ainda sinta saudade.",
            ],
          },
          { highlight: "Sua vida também precisa ter espaço para você." },
        ],
      },
    ] satisfies ProcessStep[],
  },

  /** Bloco 5 — como funciona por dentro. */
  inside: {
    title: "E como você vai colocar tudo isso em prática?",
    pieces: [
      "Imagine reservar alguns minutos do seu dia para parar de pensar apenas no que ele fez, no que ele disse ou no que poderia acontecer.",
      "E começar a fazer uma pergunta diferente:",
      { quote: "“Do que eu preciso hoje?”" },
      "Dentro do Eu Me Escolho, você encontra:",
    ] as Piece[],
    items: [
      {
        title: "7 sessões guiadas",
        pieces: [
          "Conteúdos para ouvir no seu próprio ritmo, organizados nos três processos da jornada.",
          "Você pode escutar com fones, em um momento tranquilo do seu dia, seguindo as reflexões propostas.",
        ],
      },
      {
        title: "Diário dos 21 Dias",
        pieces: [
          "Um espaço para colocar no papel o que está vivendo.",
          "A cada dia, você encontra uma pergunta para refletir e uma pequena ação prática.",
          {
            lines: [
              "Não precisa escrever bonito.",
              "Não precisa ter todas as respostas.",
            ],
          },
          "O diário não é para registrar como você deveria estar se sentindo. É para dar espaço ao que você realmente sente.",
          { highlight: "Um dia de cada vez." },
        ],
      },
    ] satisfies IncludedItem[],
  },

  /**
   * Demonstração do produto — depois do bloco 5 e antes da surpresa.
   * Só material real: gravação da plataforma e páginas do PDF do diário.
   */
  demo: {
    title: "Veja como é começar a se escolher ❤️",
    subtitle: "Um espaço para ouvir, refletir e dar pequenos passos por você.",
    video: {
      label: "Conheça sua jornada por dentro",
      /**
       * Vídeo da plataforma. `null` enquanto a gravação não for enviada:
       * nesse caso o player não aparece.
       */
      file: null as DemoVideo | null,
    },
    diary: {
      title: "Um pequeno passo por dia. Durante 21 dias.",
      subtitle:
        "Explore algumas páginas reais do diário que vai acompanhar sua jornada.",
      /** Páginas reais do PDF "Diário dos 21 Dias — Eu Me Escolho". */
      pages: [
        {
          pdfPage: 1,
          caption: "Capa",
          src: "/images/diario/diario-01-capa.png",
          width: 1223,
          height: 2176,
          alt: "Capa do Diário dos 21 Dias: Eu Me Escolho, Mente em Expansão, um passo por dia.",
        },
        {
          pdfPage: 2,
          caption: "Como usar o diário",
          src: "/images/diario/diario-02-como-usar.png",
          width: 1223,
          height: 2176,
          alt: "Página Como usar este diário: todo dia há uma ação do dia, uma pergunta do dia e uma sessão sugerida.",
        },
        {
          pdfPage: 8,
          caption: "Ação do dia",
          src: "/images/diario/diario-03-acao-do-dia.png",
          width: 1223,
          height: 2176,
          alt: "Dia 2 de 21, Fase 1, Consciência: Tirar da frente dos olhos, com a ação do dia e a pergunta do dia.",
        },
        {
          pdfPage: 19,
          caption: "Pergunta do dia",
          src: "/images/diario/diario-04-pergunta-do-dia.png",
          width: 1223,
          height: 2176,
          alt: "Dia 11 de 21, Fase 2, Esvaziamento: Saudade de quem?, com a ação do dia e a pergunta do dia.",
        },
        {
          pdfPage: 4,
          caption: "Medidor de Recuperação",
          src: "/images/diario/diario-05-medidor.png",
          width: 1223,
          height: 2176,
          alt: "Medidor de Recuperação: notas de 0 a 10 para cinco frases, preenchidas nos dias 1, 7, 14 e 21.",
        },
        {
          pdfPage: 33,
          caption: "Carta do dia 21",
          src: "/images/diario/diario-06-carta-final.png",
          width: 1223,
          height: 2176,
          alt: "Dia 21: Carta para o meu próximo relacionamento, com frases para completar.",
        },
      ] satisfies DiaryPage[],
      /** Textos de interface da galeria. */
      labels: {
        region: "Páginas do Diário dos 21 Dias",
        previous: "Página anterior",
        next: "Próxima página",
        goTo: (n: number) => `Ver página ${n}`,
        zoom: (caption: string) => `Ampliar: ${caption}`,
        close: "Fechar",
        counter: (current: number, total: number) => `${current} de ${total}`,
        tapToZoom: "Toque na página para ampliar",
      },
    },
  },

  /** Bloco 6 — uma surpresa especial na jornada. */
  surprise: {
    title: "E tem algo que eu ainda não te contei… ❤️",
    pieces: [
      "O Eu Me Escolho foi pensado para acompanhar você nos momentos em que decidir se colocar em primeiro lugar parece mais difícil.",
      "Por isso, além dos três processos de **Esvaziamento, Consciência e Transformação**, preparamos uma surpresa especial para quem começa essa jornada.",
      "**Não vou revelar todos os detalhes agora.**",
      "Mas posso adiantar uma coisa:",
      "Ela foi pensada justamente para aqueles momentos em que a saudade aperta, o passado reaparece e você precisa lembrar por que decidiu começar a cuidar de si.",
      "**Porque se escolher não é uma decisão que você toma uma única vez. É uma escolha que você aprende a fazer também nos dias difíceis.** ❤️",
    ],
  } satisfies TextBlock,

  /** Bloco 7 — oferta. O valor vem de `price`. */
  offer: {
    title: "Você passou tanto tempo tentando fazer dar certo com alguém…",
    pieces: [
      "E se agora dedicasse um pouco dessa atenção a você?",
      "Com o **Eu Me Escolho**, você começa uma jornada de 21 dias, organizada em três processos:",
      { processes: "Esvaziamento. Consciência. Transformação." },
      "São 7 sessões guiadas e um diário com pequenas ações para ajudar você a olhar para seus sentimentos, compreender seus padrões e começar a fazer escolhas por si.",
      "E ainda existe **uma surpresa especial preparada para acompanhar sua jornada.** ❤️",
    ] as Piece[],
    /**
     * Imagem do produto completo, logo acima do card de preço (PNG com
     * transparência). `null` esconde a imagem.
     */
    image: {
      src: "/images/pagina-final/eu-me-escolho-oferta-completa.png",
      width: 1168,
      height: 1346,
      alt: "Eu Me Escolho: plataforma com sessões guiadas, Diário dos 21 Dias e três bônus surpresa.",
    } as PageImage | null,
    button: "Quero começar a me escolher ❤️",
    /**
     * Condições reais de entrega, visíveis antes da compra (inclui a
     * liberação no 8º dia). Texto aprovado na etapa anterior.
     */
    deliveryNote:
      "Você terá acesso inicial às sessões guiadas e ao Diário dos 21 Dias. Os três materiais complementares são liberados no oitavo dia após o pagamento.",
    /** Linha de segurança e direito de arrependimento. "" esconde. */
    secureNote:
      "Compra segura pela Cakto. Você tem 7 dias para exercer seu direito de arrependimento, conforme o Código de Defesa do Consumidor.",
  },

  /**
   * Bloco 8 — fechamento (texto aprovado na etapa anterior, mantido até o
   * bloco 8 da nova copy ser definido). O botão usa o mesmo checkout.
   */
  closing: {
    text: "Talvez você ainda pense nele todos os dias. Mas, a partir de hoje, também pode começar a pensar em você.",
    button: `Conhecer minha jornada por ${price.display}`,
  },

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

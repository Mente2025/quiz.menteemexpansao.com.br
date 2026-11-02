/**
 * TEXTOS DAS DEVOLUTIVAS (etapa 5)
 * --------------------------------
 * `reflections` (no fim deste arquivo) é o que a página da etapa 5 mostra:
 * uma versão para cada resposta da etapa 2.
 *
 * Mais abaixo ficam também os textos das quatro áreas e os trechos usados
 * para montar um resumo personalizado. As REGRAS que escolhem a área ficam
 * em src/lib/result-engine.ts.
 *
 * Nos modelos de frase, {desejo} e {comportamento} são substituídos pelos
 * trechos correspondentes às respostas da pessoa. Mantenha as chaves.
 *
 * Cuidado editorial: estas são reflexões orientativas. Evite linguagem de
 * diagnóstico, de cura ou de promessa de resultado.
 */
import type { BehaviorId, DesireId, ObstacleId, ResultKey } from "@/lib/types";

export interface ResultProfile {
  /** Nome da área. */
  title: string;
  /** O que observar (frase curta). */
  focus: string;
  /** Explicação breve, em tom acolhedor. */
  body: string;
  /** Frase personalizada. Use {desejo} e {comportamento}. */
  personalizedTemplate: string;
  /** Pergunta do exercício. */
  exercise: string;
}

export const resultProfiles: Record<ResultKey, ResultProfile> = {
  "limites-sem-culpa": {
    title: "Limites sem culpa",
    focus:
      "Observar os momentos em que você aceita algo para evitar desapontar alguém.",
    body: "Dizer “sim” para manter a paz pode parecer pequeno na hora. Com o tempo, porém, as suas vontades vão ficando para depois. Um limite não afasta as pessoas: mostra onde você também cabe na relação.",
    personalizedTemplate:
      "Se você quer sentir {desejo}, um começo possível é perceber o instante em que {comportamento} aparece — e se perguntar se aquele “sim” é uma escolha ou uma forma de não desapontar alguém.",
    exercise:
      "Se eu não estivesse preocupado com a reação da pessoa, o que escolheria?",
  },
  "autonomia-validacao": {
    title: "Autonomia diante da validação",
    focus:
      "Observar o quanto as reações das outras pessoas influenciam as suas decisões.",
    body: "Buscar a opinião de quem você gosta é natural. O ponto de atenção é quando a aprovação de alguém passa a decidir por você — e a sua própria voz chega por último.",
    personalizedTemplate:
      "Se você quer sentir {desejo}, pode ajudar notar quanto espaço a reação dos outros ocupa nas suas escolhas — especialmente quando {comportamento} aparece.",
    exercise: "Antes de pedir opinião, escreva o que você deseja.",
  },
  "medo-afastamento": {
    title: "Medo de afastamento",
    focus:
      "Distinguir o que está acontecendo de fato das expectativas e dos receios.",
    body: "Quando o receio de perder alguém fala alto, pequenos sinais podem parecer maiores do que são. Separar fatos de suposições ajuda você a responder ao que está acontecendo, e não apenas ao que teme.",
    personalizedTemplate:
      "Se você quer sentir {desejo}, um caminho é separar o que está acontecendo de fato do que você teme que aconteça — principalmente quando {comportamento} aparece.",
    exercise: "O que está acontecendo de fato e o que eu temo que aconteça?",
  },
  "protecao-afastamento": {
    title: "Proteção pelo afastamento",
    focus:
      "Observar quando o distanciamento aparece como uma forma de se defender.",
    body: "Se afastar pode ser uma forma de se proteger — e, às vezes, é mesmo necessário. Em outros momentos, porém, esse movimento pode afastar também conexões que você gostaria de viver.",
    personalizedTemplate:
      "Se você quer sentir {desejo}, vale observar com gentileza o que acontece por dentro logo antes de {comportamento} aparecer.",
    exercise: "Que emoção está presente antes de eu me afastar?",
  },
};

/** Trechos das respostas da etapa 2, usados no resumo e na frase personalizada. */
export const behaviorPhrases: Record<
  BehaviorId,
  { summary: string; noun: string }
> = {
  "me-esforco": {
    summary: "se esforçar ainda mais para a pessoa ficar",
    noun: "o impulso de se esforçar ainda mais",
  },
  silencio: {
    summary: "guardar o que sente para evitar conflito",
    noun: "a vontade de guardar o que sente",
  },
  validacao: {
    summary: "tentar entender o que fez de errado",
    noun: "a busca pelo que você fez de errado",
  },
  afasto: {
    summary: "se afastar antes que alguém possa te machucar",
    noun: "o movimento de se afastar",
  },
};

/** Trechos das respostas da etapa 3. */
export const obstaclePhrases: Record<ObstacleId, string> = {
  decepcionar: "o medo de decepcionar a pessoa",
  afastar: "o receio de que ela se afastasse",
  culpa: "a culpa por pensar em você",
  duvida: "não saber o que você realmente queria",
};

/** Trechos das respostas da etapa 4 e o primeiro passo sugerido para cada desejo. */
export const desirePhrases: Record<
  DesireId,
  { summary: string; firstStep: string }
> = {
  seguranca: {
    summary: "segurança para ser quem você é",
    firstStep:
      "Escolha uma situação pequena desta semana para dizer o que você realmente pensa — mesmo que seja sobre algo simples, como onde jantar.",
  },
  limites: {
    summary: "liberdade para dizer não sem culpa",
    firstStep:
      "Experimente ganhar tempo antes de responder: “Posso te dizer daqui a pouco?”. Esse pequeno intervalo já é um limite.",
  },
  autonomia: {
    summary: "tranquilidade sem depender da aprovação de alguém",
    firstStep:
      "Antes de perguntar o que alguém acha, anote em uma frase o que você acha primeiro.",
  },
  reciprocidade: {
    summary: "confiança para construir relações mais recíprocas",
    firstStep:
      "Em uma relação próxima, observe por alguns dias se o cuidado vai e volta. Só observe, sem se julgar.",
  },
};

/** Modelos das frases do resumo "O que você compartilhou". */
export const summaryTemplates = {
  comportamento:
    "Quando um relacionamento começa a pesar, você costuma {texto}.",
  obstaculo:
    "Na última vez em que quis dizer “não” e disse “sim”, o que mais pesou foi {texto}.",
  desejo: "E o que você mais gostaria de sentir é {texto}.",
};

/** Texto mostrado quando as respostas apontam para mais de uma área. */
export const mixedResultNote =
  "Suas respostas apontam para mais de um movimento — e isso é muito comum. Por isso, esta devolutiva é um ponto de partida para observar, não uma conclusão.";

/* ------------------------------------------------------------------ */
/* Reflexão da etapa 5                                                 */
/* ------------------------------------------------------------------ */

export interface Reflection {
  title: string;
  /** Trecho do título em itálico, com traço vermelho. Escreva igual ao `title`. */
  titleHighlight?: string;
  /** Texto reflexivo, um item por parágrafo. */
  paragraphs: string[];
  /** Pergunta de impacto (aparece em destaque). */
  question: string;
}

/**
 * Uma versão para cada resposta da etapa 2 (os ids são os de `behaviorStep`).
 * O fechamento, o botão e a microcopy são iguais para todas e ficam em
 * `resultStep` (src/config/funnel.ts).
 */
export const reflections: Record<BehaviorId, Reflection> = {
  "me-esforco": {
    title:
      "Você já percebeu o quanto tenta fazer dar certo, mesmo quando isso está te fazendo mal?",
    titleHighlight: "te fazendo mal",
    paragraphs: [
      "Pelo que você contou até aqui, parece que, em alguns momentos, o medo de perder alguém fala mais alto do que aquilo que você realmente quer.",
      "E talvez você tenha se acostumado tanto a tentar não perder os outros que nem percebe quando está deixando suas próprias vontades de lado.",
    ],
    question:
      "Se você não tivesse medo de perder essa pessoa, ainda aceitaria as mesmas coisas?",
  },
  silencio: {
    title:
      "Você já percebeu quantas vezes fica quieto só para não criar problema?",
    titleHighlight: "fica quieto",
    paragraphs: [
      "Pelo que você contou até aqui, parece que, em muitos momentos, você prefere guardar o que sente para evitar conflito.",
      "Só que, aos poucos, isso vai fazendo você engolir coisas que também doem.",
      "E talvez você tenha se acostumado tanto a evitar discussão que esqueceu que o que você sente também precisa ter espaço.",
    ],
    question:
      "Até quando você vai fingir que está tudo bem só para não desagradar alguém?",
  },
  validacao: {
    title:
      "Você já percebeu como, quando algo dá errado, sua primeira reação é achar que a culpa é sua?",
    titleHighlight: "a culpa é sua",
    paragraphs: [
      "Pelo que você contou até aqui, parece que você costuma olhar primeiro para o que fez de errado, mesmo quando a situação não depende só de você.",
      "E talvez tenha passado tanto tempo tentando consertar tudo que acabou esquecendo de olhar para a forma como também está sendo tratado.",
    ],
    question:
      "E se nem tudo que dá errado em uma relação fosse responsabilidade sua?",
  },
  afasto: {
    title:
      "Você já percebeu como às vezes prefere ir embora antes que algo te machuque?",
    titleHighlight: "ir embora",
    paragraphs: [
      "Pelo que você contou até aqui, parece que se afastar virou uma forma de se proteger quando algo começa a mexer demais com você.",
      "E talvez isso aconteça porque ir embora parece mais fácil do que ficar, se abrir e correr o risco de se decepcionar.",
    ],
    question:
      "Será que você realmente quer ir embora… ou só está com medo do que pode acontecer se ficar?",
  },
};

/**
 * Versão usada quando não há uma resposta válida da etapa 2
 * (acesso direto à página, dado antigo ou apagado).
 */
export const fallbackReflection: BehaviorId = "me-esforco";

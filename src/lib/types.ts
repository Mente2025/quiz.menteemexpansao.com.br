/**
 * Tipos compartilhados do funil.
 *
 * Os IDs das respostas são ESTÁVEIS: a lógica da devolutiva depende deles.
 * Você pode mudar livremente os textos das opções em src/config/funnel.ts,
 * mas não altere estes IDs sem atualizar src/lib/result-engine.ts.
 */

/** Etapa 2 — o que costuma acontecer quando a relação começa a pesar. */
export type BehaviorId = "me-esforco" | "silencio" | "validacao" | "afasto";

/** Etapa 3 — o que mais pesa ao dizer "sim" querendo dizer "não". */
export type ObstacleId = "decepcionar" | "afastar" | "culpa" | "duvida";

/** Etapa 4 — o que a pessoa gostaria de sentir. */
export type DesireId = "seguranca" | "limites" | "autonomia" | "reciprocidade";

export interface Answers {
  comportamento?: BehaviorId;
  obstaculo?: ObstacleId;
  desejo?: DesireId;
}

export type AnswerKey = keyof Answers;

/** As quatro áreas possíveis da devolutiva. */
export type ResultKey =
  | "limites-sem-culpa"
  | "autonomia-validacao"
  | "medo-afastamento"
  | "protecao-afastamento";

export type StepId =
  | "espelho"
  | "repeticao"
  | "deixa-de-lado"
  | "desejo"
  | "devolutiva"
  | "pratica"
  | "jornada"
  | "oferta"
  | "confirmacao";

export type StepTheme = "light" | "dark";

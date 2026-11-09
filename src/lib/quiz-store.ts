/**
 * Estado do quiz: respostas e primeiro nome.
 *
 * Fica só neste navegador, na aba atual (sessionStorage — some ao fechar a
 * aba). Nada daqui é enviado para servidores, ferramentas de análise, URL ou
 * checkout. Para ler em um componente, use `useQuizState()`.
 */
import { useSyncExternalStore } from "react";
import { nameScreen, questions } from "@/config/quizData";
import { computeResult } from "@/lib/scoring";

export interface QuizState {
  /** `false` no servidor e no primeiro render, antes de ler o navegador. */
  ready: boolean;
  /** Número da pergunta → id da opção escolhida. */
  answers: Readonly<Record<number, string>>;
  name: string;
}

const KEY = "eme-quiz-v2";
/** Chave da versão anterior do quiz (localStorage) — apagada na primeira visita. */
const LEGACY_KEY = "eme-quiz-v1";
const CHANGE_EVENT = "eme:quiz";

const SERVER_STATE: QuizState = { ready: false, answers: {}, name: "" };

let state: QuizState = { ready: true, answers: {}, name: "" };
let loaded = false;

/** Mantém só respostas que existem no quiz atual. */
function sanitize(raw: unknown): QuizState {
  const clean: QuizState = { ready: true, answers: {}, name: "" };
  if (!raw || typeof raw !== "object") return clean;
  const data = raw as { answers?: Record<string, unknown>; name?: unknown };
  const answers: Record<number, string> = {};
  for (const question of questions) {
    const value = data.answers?.[question.number];
    if (
      typeof value === "string" &&
      question.options.some((option) => option.id === value)
    ) {
      answers[question.number] = value;
    }
  }
  clean.answers = answers;
  if (typeof data.name === "string") clean.name = formatName(data.name);
  return clean;
}

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (raw) state = sanitize(JSON.parse(raw));
  } catch {
    // Armazenamento bloqueado: segue só em memória.
  }
  try {
    window.localStorage.removeItem(LEGACY_KEY);
  } catch {
    // ignorado
  }
}

function write(next: QuizState) {
  state = next;
  try {
    window.sessionStorage.setItem(
      KEY,
      JSON.stringify({ answers: next.answers, name: next.name }),
    );
  } catch {
    // Modo privado ou armazenamento bloqueado: a cópia em memória basta.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

function getSnapshot() {
  load();
  return state;
}

const getServerSnapshot = () => SERVER_STATE;

export function useQuizState(): QuizState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setAnswer(questionNumber: number, optionId: string) {
  load();
  write({ ...state, answers: { ...state.answers, [questionNumber]: optionId } });
}

export function setName(name: string) {
  load();
  write({ ...state, name: formatName(name) });
}

/** Primeiro nome limpo: sem espaços extras, inicial maiúscula, tamanho máximo. */
export function formatName(raw: string) {
  const name = raw.replace(/\s+/g, " ").trim().slice(0, nameScreen.maxLength);
  return name.charAt(0).toLocaleUpperCase("pt-BR") + name.slice(1);
}

/** Primeira pergunta sem resposta (1 a 10), ou `null` se todas foram respondidas. */
export function firstUnanswered(answers: QuizState["answers"]): number | null {
  const missing = questions.find((question) => !answers[question.number]);
  return missing ? missing.number : null;
}

/** Resultado A, B ou C — `null` enquanto faltar resposta que pontua. */
export function getResult(answers: QuizState["answers"]) {
  return computeResult(questions, answers)?.result ?? null;
}

/* ------------------------------------------------------------------ */
/* Histórico das telas (para o botão "voltar" não sair do quiz)        */
/* ------------------------------------------------------------------ */

const visited: string[] = [];

/** Registra cada troca de tela (chamado por FunnelTracker). */
export function recordPath(path: string) {
  if (visited.at(-1) === path) return;
  if (visited.at(-2) === path) {
    visited.pop();
    return;
  }
  visited.push(path);
}

/** `true` quando a tela anterior no histórico do navegador é `path`. */
export function cameFrom(path: string) {
  return visited.at(-2) === path;
}

/**
 * Testes da pontuação do quiz (sem dependências: usa o executor do Node).
 * Rode com: npm test
 *
 * Usam as perguntas reais de src/config/quizData.ts — se alguém trocar a
 * letra de uma opção, estes testes mostram o que mudou.
 */
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { questions, results, offer } from "../src/config/quizData.ts";
import {
  computeResult,
  pickResult,
  tallyScores,
} from "../src/lib/scoring.ts";

/** Id da primeira opção da pergunta `number` que pontua `letter`. */
function optionFor(number, letter) {
  const question = questions.find((q) => q.number === number);
  const option = question.options.find((o) => o.score === letter);
  assert.ok(option, `pergunta ${number} não tem opção ${letter}`);
  return option.id;
}

/**
 * Monta respostas a partir das letras das perguntas 1 a 9, ex.: "AABBCCAAB".
 * A pergunta 10 recebe a primeira opção (não pontua).
 */
function answersFrom(letters, q10 = questions[9].options[0].id) {
  assert.equal(letters.length, 9);
  const answers = {};
  [...letters].forEach((letter, index) => {
    answers[index + 1] = optionFor(index + 1, letter);
  });
  answers[10] = q10;
  return answers;
}

describe("dados do quiz", () => {
  test("tem 10 perguntas numeradas de 1 a 10", () => {
    assert.deepEqual(
      questions.map((q) => q.number),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    );
  });

  test("perguntas 1 a 9: toda opção pontua A, B ou C", () => {
    for (const question of questions.slice(0, 9)) {
      for (const option of question.options) {
        assert.ok(
          ["A", "B", "C"].includes(option.score),
          `pergunta ${question.number}, opção ${option.id}`,
        );
      }
    }
  });

  test("pergunta 10 não pontua", () => {
    assert.ok(questions[9].options.every((o) => o.score === undefined));
  });

  test("ids das opções são únicos dentro de cada pergunta", () => {
    for (const question of questions) {
      const ids = question.options.map((o) => o.id);
      assert.equal(new Set(ids).size, ids.length);
    }
  });

  test("toda opção tem exatamente um emoji, separado do texto", () => {
    const graphemes = new Intl.Segmenter("pt-BR", { granularity: "grapheme" });
    const pictographic = /\p{Extended_Pictographic}/u;
    for (const question of questions) {
      for (const option of question.options) {
        const where = `pergunta ${question.number}, opção ${option.id}`;
        assert.equal(typeof option.emoji, "string", where);
        assert.equal([...graphemes.segment(option.emoji)].length, 1, where);
        assert.match(option.emoji, pictographic, where);
        assert.doesNotMatch(option.label, pictographic, `texto com emoji: ${where}`);
      }
    }
  });

  test("os emojis não afetam a pontuação", () => {
    const semEmoji = questions.map((q) => ({
      ...q,
      options: q.options.map((option) => {
        const copy = { ...option };
        delete copy.emoji;
        return copy;
      }),
    }));
    for (const letters of ["AAAAABBCC", "CAAAACCCB", "ABBBBCCCC", "BBBAAACCC"]) {
      const answers = answersFrom(letters);
      assert.deepEqual(
        computeResult(semEmoji, answers),
        computeResult(questions, answers),
      );
    }
  });

  test("há resultado e botão para A, B e C", () => {
    for (const letter of ["A", "B", "C"]) {
      assert.ok(results[letter].title.includes("{nome}"));
      assert.ok(offer.buttonByResult[letter]);
    }
  });
});

describe("vitória clara", () => {
  test("A vence com maioria de A", () => {
    const r = computeResult(questions, answersFrom("AAAAABBCC"));
    assert.equal(r.result, "A");
    assert.deepEqual(r.scores, { A: 5, B: 2, C: 2 });
    assert.deepEqual(r.tied, ["A"]);
  });

  test("B vence com maioria de B", () => {
    const r = computeResult(questions, answersFrom("BBBBBAACC"));
    assert.equal(r.result, "B");
    assert.deepEqual(r.scores, { A: 2, B: 5, C: 2 });
  });

  test("C vence com maioria de C", () => {
    const r = computeResult(questions, answersFrom("CCCCCAABB"));
    assert.equal(r.result, "C");
    assert.deepEqual(r.scores, { A: 2, B: 2, C: 5 });
  });

  test("vitória clara ignora a pergunta 1 (sem empate, não há desempate)", () => {
    // Pergunta 1 = A, mas C tem 5 pontos.
    const r = computeResult(questions, answersFrom("ACCCCCBBA"));
    assert.deepEqual(r.scores, { A: 2, B: 2, C: 5 });
    assert.equal(r.result, "C");
  });
});

describe("empate decidido pela pergunta 1", () => {
  test("A e C empatados, pergunta 1 = C → C", () => {
    const r = computeResult(questions, answersFrom("CAAAACCCB"));
    assert.deepEqual(r.scores, { A: 4, B: 1, C: 4 });
    assert.deepEqual(r.tied, ["A", "C"]);
    assert.equal(r.result, "C");
  });

  test("A e B empatados, pergunta 1 = B → B (vence a prioridade A)", () => {
    const r = computeResult(questions, answersFrom("BAAAABBBC"));
    assert.deepEqual(r.scores, { A: 4, B: 4, C: 1 });
    assert.equal(r.result, "B");
  });

  test("B e C empatados, pergunta 1 = C → C (vence a prioridade B)", () => {
    const r = computeResult(questions, answersFrom("CBBBBCCCA"));
    assert.deepEqual(r.scores, { A: 1, B: 4, C: 4 });
    assert.equal(r.result, "C");
  });

  test("empate triplo 3/3/3, pergunta 1 = B → B", () => {
    const r = computeResult(questions, answersFrom("BBBAAACCC"));
    assert.deepEqual(r.scores, { A: 3, B: 3, C: 3 });
    assert.deepEqual(r.tied, ["A", "B", "C"]);
    assert.equal(r.result, "B");
  });

  test("empate triplo 3/3/3, pergunta 1 = C → C", () => {
    const r = computeResult(questions, answersFrom("CCCAAABBB"));
    assert.equal(r.result, "C");
  });
});

describe("empate em que a pergunta 1 não participa", () => {
  test("B e C empatados, pergunta 1 = A → B (prioridade A > B > C)", () => {
    const r = computeResult(questions, answersFrom("ABBBBCCCC"));
    assert.deepEqual(r.scores, { A: 1, B: 4, C: 4 });
    assert.deepEqual(r.tied, ["B", "C"]);
    assert.equal(r.result, "B");
  });

  test("A e B empatados, pergunta 1 = C → A", () => {
    const r = computeResult(questions, answersFrom("CAAAABBBB"));
    assert.deepEqual(r.scores, { A: 4, B: 4, C: 1 });
    assert.equal(r.result, "A");
  });

  test("A e C empatados, pergunta 1 = B → A", () => {
    const r = computeResult(questions, answersFrom("BAAAACCCC"));
    assert.deepEqual(r.scores, { A: 4, B: 1, C: 4 });
    assert.equal(r.result, "A");
  });
});

describe("pergunta 10 e respostas incompletas", () => {
  test("a resposta da pergunta 10 não muda o resultado nem os pontos", () => {
    const base = computeResult(questions, answersFrom("CAAAACCCB"));
    for (const option of questions[9].options) {
      const r = computeResult(questions, answersFrom("CAAAACCCB", option.id));
      assert.deepEqual(r, base);
    }
  });

  test("sem resposta na pergunta 10 o resultado continua calculável", () => {
    const answers = answersFrom("AAAAABBCC");
    delete answers[10];
    assert.equal(computeResult(questions, answers).result, "A");
  });

  test("faltando uma pergunta de 1 a 9 → null", () => {
    const answers = answersFrom("AAAAABBCC");
    delete answers[5];
    assert.equal(computeResult(questions, answers), null);
  });

  test("id de opção desconhecido → null", () => {
    const answers = answersFrom("AAAAABBCC");
    answers[3] = "opcao-que-nao-existe";
    assert.equal(computeResult(questions, answers), null);
  });
});

describe("funções auxiliares", () => {
  test("tallyScores soma 1 ponto por resposta", () => {
    assert.deepEqual(tallyScores(questions, answersFrom("ABCABCABC")), {
      A: 3,
      B: 3,
      C: 3,
    });
  });

  test("pickResult: sem letra da pergunta 1 usa A > B > C", () => {
    assert.equal(pickResult({ A: 2, B: 4, C: 4 }, null).result, "B");
  });
});

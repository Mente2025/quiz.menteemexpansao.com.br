import { notFound } from "next/navigation";
import { QuestionScreen } from "@/components/quiz/QuestionScreen";
import { questions } from "@/config/quizData";

/** As 10 perguntas são geradas no build: /pergunta/1 … /pergunta/10. */
export function generateStaticParams() {
  return questions.map((question) => ({ numero: String(question.number) }));
}

/** Uma pergunta por tela. Textos: `questions` em src/config/quizData.ts. */
export default async function PerguntaPage({
  params,
}: PageProps<"/pergunta/[numero]">) {
  const { numero } = await params;
  const number = Number(numero);
  if (!questions.some((question) => String(question.number) === numero)) {
    notFound();
  }
  return <QuestionScreen key={number} number={number} />;
}

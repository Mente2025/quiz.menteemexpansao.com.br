import { QuestionStep } from "@/components/steps/QuestionStep";
import { desireStep } from "@/config/funnel";

/** Etapa 4 — O que você gostaria de mudar na forma como se relaciona. */
export default function Etapa4() {
  return <QuestionStep content={desireStep} />;
}

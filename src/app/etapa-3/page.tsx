import { QuestionStep } from "@/components/steps/QuestionStep";
import { obstacleStep } from "@/config/funnel";

/** Etapa 3 — O que pesa mais quando você diz "sim" querendo dizer "não". */
export default function Etapa3() {
  return <QuestionStep content={obstacleStep} />;
}

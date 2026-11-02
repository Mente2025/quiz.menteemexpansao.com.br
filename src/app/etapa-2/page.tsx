import { QuestionStep } from "@/components/steps/QuestionStep";
import { behaviorStep } from "@/config/funnel";

/** Etapa 2 — Como você reage quando sente que pode perder alguém. */
export default function Etapa2() {
  return <QuestionStep content={behaviorStep} />;
}

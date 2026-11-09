import type { ReactNode } from "react";

/**
 * Moldura de todas as telas: fundo branco de ponta a ponta e uma coluna
 * central confortável no celular e no computador.
 */
export function QuizShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 flex-col bg-paper">
      <div className="mx-auto flex w-full max-w-[34rem] flex-1 flex-col px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pt-8">
        {children}
      </div>
    </main>
  );
}

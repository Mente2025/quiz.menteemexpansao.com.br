/**
 * Classes compartilhadas entre as etapas.
 * Funcionam em <Link> e em <button> (o estado `disabled` só existe no botão).
 */

/** Botão principal: pílula clara com texto escuro. */
export const primaryButtonClass =
  "group flex min-h-[3.625rem] w-full items-center justify-center gap-3 rounded-full bg-sand px-7 py-4 text-center text-[0.98rem] font-semibold tracking-[-0.01em] text-night shadow-[inset_0_1px_0_rgb(255_255_255/0.7),0_14px_34px_-14px_rgb(245_241_234/0.35)] transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-4 focus-visible:ring-offset-night not-disabled:hover:-translate-y-0.5 not-disabled:hover:bg-ivory not-disabled:hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.8),0_20px_44px_-14px_rgb(245_241_234/0.45),0_0_0_6px_rgb(179_32_45/0.14)] not-disabled:active:translate-y-0 not-disabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-ivory/[0.07] disabled:text-ivory/35 disabled:shadow-none";

/** Seta dentro do botão principal (desliza no hover). */
export const primaryButtonIconClass =
  "size-[1.125rem] shrink-0 transition-transform duration-300 ease-out group-not-disabled:group-hover:translate-x-1";

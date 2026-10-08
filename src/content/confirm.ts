/** The one literal that marks a fact Karthikeya must replace before production.
 *  scripts/check-confirm.mjs fails `pnpm build` while any remain in src/. */
export const CONFIRM = "[CONFIRM]";
export type Confirm = typeof CONFIRM;

export function isConfirm(value: unknown): value is Confirm {
  return value === CONFIRM;
}

/** Narrow a maybe-confirmed value; returns undefined when still unconfirmed. */
export function confirmed<T>(value: T | Confirm): T | undefined {
  return isConfirm(value) ? undefined : (value as T);
}

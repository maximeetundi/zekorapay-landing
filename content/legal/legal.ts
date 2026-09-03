import { en, type LocalizedLegal } from "./translations/en";
import { fr } from "./translations/fr";

export type { LegalSection, LocalizedLegal } from "./translations/en";

const TRANSLATIONS: Record<string, LocalizedLegal> = { en, fr };

export function getLegal(locale: string): LocalizedLegal {
  return TRANSLATIONS[locale] ?? en;
}

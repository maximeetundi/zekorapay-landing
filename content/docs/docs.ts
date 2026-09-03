import { docsMeta, type DocMeta } from "./meta";
import { en, type LocalizedDoc } from "./translations/en";
import { fr } from "./translations/fr";

export type { LocalizedDoc, DocSection, DocEndpoint, CodeBlock } from "./translations/fr";
export type { DocMeta } from "./meta";

export interface DocPage extends DocMeta, LocalizedDoc {}

const TRANSLATIONS: Record<string, Record<string, LocalizedDoc>> = { en, fr };

function resolveLocale(locale: string): Record<string, LocalizedDoc> {
  return TRANSLATIONS[locale] ?? en;
}

export function getDocPages(locale: string): DocPage[] {
  const localized = resolveLocale(locale);
  return docsMeta.map((meta) => ({
    ...meta,
    ...(localized[meta.slug] ?? en[meta.slug]),
  }));
}

export function getDocPage(slug: string, locale: string): DocPage | undefined {
  const meta = docsMeta.find((page) => page.slug === slug);
  if (!meta) return undefined;
  const localized = resolveLocale(locale);
  const content = localized[slug] ?? en[slug];
  if (!content) return undefined;
  return { ...meta, ...content };
}

export const docsSlugs: string[] = docsMeta.map((page) => page.slug);

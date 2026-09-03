import { featuresMeta, type FeatureMeta } from "./meta";
import { en, type LocalizedFeature } from "./translations/en";
import { fr } from "./translations/fr";

export type { LocalizedFeature } from "./translations/en";
export type { FeatureMeta } from "./meta";

export interface Feature extends FeatureMeta, LocalizedFeature {}

const TRANSLATIONS: Record<string, Record<string, LocalizedFeature>> = { en, fr };

function resolveLocale(locale: string): Record<string, LocalizedFeature> {
  return TRANSLATIONS[locale] ?? en;
}

export function getFeature(slug: string, locale: string): Feature | undefined {
  const meta = featuresMeta.find((feature) => feature.slug === slug);
  if (!meta) return undefined;
  const localized = resolveLocale(locale);
  const content = localized[meta.key] ?? en[meta.key];
  if (!content) return undefined;
  return { ...meta, ...content };
}

export const featureSlugs: string[] = featuresMeta.map((feature) => feature.slug);

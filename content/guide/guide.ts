import { guideMeta, type GuideMeta } from "./meta";
import { en, type LocalizedGuide } from "./translations/en";
import { fr } from "./translations/fr";

export type { LocalizedGuide, GuideSection, GuideStep } from "./translations/fr";
export type { GuideMeta } from "./meta";

export interface GuideTopic extends GuideMeta, LocalizedGuide {}

const TRANSLATIONS: Record<string, Record<string, LocalizedGuide>> = { en, fr };

function resolveLocale(locale: string): Record<string, LocalizedGuide> {
  return TRANSLATIONS[locale] ?? en;
}

export function getGuideTopics(locale: string): GuideTopic[] {
  const localized = resolveLocale(locale);
  return guideMeta.map((meta) => ({
    ...meta,
    ...(localized[meta.slug] ?? en[meta.slug]),
  }));
}

export function getGuideTopic(slug: string, locale: string): GuideTopic | undefined {
  const meta = guideMeta.find((topic) => topic.slug === slug);
  if (!meta) return undefined;
  const localized = resolveLocale(locale);
  const content = localized[slug] ?? en[slug];
  if (!content) return undefined;
  return { ...meta, ...content };
}

export const guideSlugs: string[] = guideMeta.map((topic) => topic.slug);

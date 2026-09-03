import { blogPostsMeta, type BlogPostMeta } from "./meta";
import { en, type LocalizedBlogPost } from "./translations/en";
import { fr } from "./translations/fr";

export type { LocalizedBlogPost } from "./translations/en";
export type { BlogPostMeta } from "./meta";

export interface BlogPost extends BlogPostMeta, LocalizedBlogPost {}

const TRANSLATIONS: Record<string, Record<string, LocalizedBlogPost>> = { en, fr };

// Un article rédigé dans une langue mais pas encore traduit dans une autre
// retombe sur l'anglais plutôt que de casser la page ou d'afficher un trou —
// couvre le décalage temporaire entre l'ajout d'un article et sa traduction.
function resolveLocale(locale: string): Record<string, LocalizedBlogPost> {
  return TRANSLATIONS[locale] ?? en;
}

export function getBlogPosts(locale: string): BlogPost[] {
  const localized = resolveLocale(locale);
  return blogPostsMeta.map((meta) => ({
    ...meta,
    ...(localized[meta.slug] ?? en[meta.slug]),
  }));
}

export function getBlogPost(slug: string, locale: string): BlogPost | undefined {
  const meta = blogPostsMeta.find((post) => post.slug === slug);
  if (!meta) return undefined;
  const localized = resolveLocale(locale);
  const content = localized[slug] ?? en[slug];
  if (!content) return undefined;
  return { ...meta, ...content };
}

export const blogSlugs: string[] = blogPostsMeta.map((post) => post.slug);
export const blogCategorySlugs: string[] = Array.from(new Set(blogPostsMeta.map((post) => post.categorySlug)));

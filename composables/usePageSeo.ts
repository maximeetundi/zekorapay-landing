// Centralise le canonical + Open Graph/Twitter par page : la version
// précédente (page unique) ne fixait ces balises qu'une fois pour toute
// l'app dans app.vue ; avec plusieurs routes réelles chaque page a besoin
// de sa propre URL canonique et de son propre titre/description partagés.
interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function usePageSeo(options: PageSeoOptions): void {
  const config = useRuntimeConfig();
  const siteUrl = config.public.siteUrl?.replace(/\/$/, "") ?? "";
  const url = siteUrl ? `${siteUrl}${options.path}` : "";
  const image = siteUrl ? `${siteUrl}${options.image ?? "/logo.png"}` : (options.image ?? "/logo.png");

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: "website",
    ogImage: image,
    ...(url ? { ogUrl: url } : {}),
    twitterCard: "summary_large_image",
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: image,
  });

  useHead({
    link: url ? [{ rel: "canonical", href: url }] : [],
  });
}

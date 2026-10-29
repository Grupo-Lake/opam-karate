import type { Metadata } from "next";

export const SITE_URL = "https://karateopam.com.br";
export const SITE_NAME = "OPAM KARATE";

/** Per-page metadata with canonical URL plus matching Open Graph / Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  article,
}: {
  title: string;
  description: string;
  path: string;
  /** Marks the page as a blog article and adds its share image. */
  article?: { publishedTime: string; image: string };
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "pt_BR",
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.publishedTime,
            images: [article.image],
          }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(article ? { images: [article.image] } : {}),
    },
  };
}

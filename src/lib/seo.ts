import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";

export const SITE_URL = "https://v-dmitriev.ru";
export const SITE_NAME = "Вадим Дмитриев";

export const HOME_TITLE = "Вадим Дмитриев — UX/UI дизайнер и Web Designer";
export const HOME_DESCRIPTION =
  "UX/UI дизайнер и Web Designer. Создаю цифровые продукты, сайты и интерфейсы. UX/UI Design, Web Design, Vibe Coding и Tilda.";

const OG_SIZE = { width: 1200, height: 630 } as const;

// Home has no suitable OG image yet — drop a 1200×630 file at public/og/home.jpg and it is picked up.
export function ogImageFor(file: string, alt: string) {
  const exists = existsSync(join(process.cwd(), "public", "og", file));
  return exists ? [{ url: `/og/${file}`, ...OG_SIZE, alt }] : undefined;
}

type PageSeo = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  images?: ReturnType<typeof ogImageFor>;
};

export function pageMetadata({ title, description, path, ogTitle, ogDescription, images }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url: path,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: images?.map((image) => image.url),
    },
  };
}

export function jsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_NAME,
  jobTitle: "UX/UI Designer",
  url: `${SITE_URL}/`,
};

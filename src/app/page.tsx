import type { Metadata } from "next";
import Showcase from "@/components/Showcase";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  PERSON,
  SITE_NAME,
  SITE_URL,
  jsonLd,
  ogImageFor,
  pageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  ogTitle: "Вадим Дмитриев — UX/UI Designer",
  ogDescription: "UX/UI дизайнер и Web Designer. Digital products, websites, interfaces, Vibe Coding.",
  images: ogImageFor("home.jpg", SITE_NAME),
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    PERSON,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "ru",
      publisher: { "@id": PERSON["@id"] },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <Showcase />
    </>
  );
}

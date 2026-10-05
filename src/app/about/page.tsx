import type { Metadata } from "next";
import Showcase from "@/components/Showcase";
import { SITE_NAME, ogImageFor, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Вадим Дмитриев — UX/UI дизайнер",
  description:
    "Вадим Дмитриев — UX/UI дизайнер, создающий современные цифровые продукты, сайты и интерфейсы.",
  path: "/about",
  images: ogImageFor("home.jpg", SITE_NAME),
});

export default function Page() {
  return <Showcase initialPage="about" />;
}

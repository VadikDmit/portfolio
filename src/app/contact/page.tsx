import type { Metadata } from "next";
import Showcase from "@/components/Showcase";

export const metadata: Metadata = {
  title: "Contact",
  description: "Свяжитесь с Вадимом Дмитриевым по поводу нового проекта.",
  // Same screen as the home page with the contact tiles open — keep it out of the index.
  robots: { index: false, follow: true },
};

export default function Page() {
  return <Showcase initialPage="contact" />;
}

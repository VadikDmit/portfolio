import type { Metadata } from "next";
import Showcase from "@/components/Showcase";

export const metadata: Metadata = {
  title: "Contact",
  description: "Свяжитесь с Вадимом Дмитриевым по поводу нового проекта.",
};

export default function Page() {
  return <Showcase initialPage="contact" />;
}

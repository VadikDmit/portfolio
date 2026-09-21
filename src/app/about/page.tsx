import type { Metadata } from "next";
import Showcase from "@/components/Showcase";

export const metadata: Metadata = {
  title: "About",
  description: "UX/UI дизайнер и Vibe Coder Вадим Дмитриев — экспертиза и инструменты.",
};

export default function Page() {
  return <Showcase initialPage="about" />;
}

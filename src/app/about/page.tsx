import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "UX/UI дизайнер и Vibe Coder Вадим Дмитриев — экспертиза и инструменты.",
};

const EXPERTISE = [
  "UX/UI Design",
  "Web Design",
  "Product Design",
  "Responsive Design",
  "Prototyping",
  "Vibe Coding",
  "AI-assisted Development",
];

const TOOLS = [
  "Figma",
  "Claude",
  "ChatGPT",
  "Gemini",
  "Tilda",
  "HTML / CSS / JavaScript",
];

export default function AboutPage() {
  return (
    <section
      style={{
        paddingTop: 140,
        paddingBottom: 100,
        paddingLeft: "var(--page-margin)",
        paddingRight: "var(--page-margin)",
        maxWidth: "var(--max-width)",
        margin: "0 auto",
      }}
    >
      <div className="max-w-3xl">
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-medium tracking-tight">
          Вадим Дмитриев
        </h1>
        <p
          className="mt-4 text-[clamp(1.1rem,2vw,1.5rem)]"
          style={{ color: "var(--color-fg-secondary)" }}
        >
          UX/UI-дизайнер · Vibe Coding
        </p>

        <p className="mt-10 text-[clamp(1.1rem,2vw,1.5rem)] leading-relaxed">
          Создаю современные цифровые продукты, сайты и интерфейсы — от
          UX-концепции и визуального дизайна до готовой реализации.
        </p>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl">
        <div>
          <h2
            className="text-[13px] tracking-wide uppercase mb-6"
            style={{ color: "var(--color-fg-tertiary)" }}
          >
            Expertise
          </h2>
          <ul className="space-y-3">
            {EXPERTISE.map((item) => (
              <li key={item} className="text-[16px]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2
            className="text-[13px] tracking-wide uppercase mb-6"
            style={{ color: "var(--color-fg-tertiary)" }}
          >
            Tools
          </h2>
          <ul className="space-y-3">
            {TOOLS.map((item) => (
              <li key={item} className="text-[16px]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const EXPERTISE = [
  "UX/UI Design",
  "Web Design",
  "Product Design",
  "Responsive Design",
  "Prototyping",
  "Vibe Coding",
  "AI-assisted Development",
];

const TOOLS = ["Figma", "Claude", "ChatGPT", "Gemini", "Tilda", "HTML / CSS / JavaScript"];

const panel = "rounded-[24px] bg-white p-7 md:p-10";
const label = "text-[13px] tracking-wide uppercase";

export function AboutPanels({ className = "" }: { className?: string }) {
  return (
    <div className={`${panel} flex flex-col justify-center gap-10 ${className}`}>
      <div>
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight">
          Вадим Дмитриев
        </h1>
        <p className="mt-6 text-[clamp(1.1rem,1.6vw,1.375rem)] leading-relaxed">
          Создаю современные цифровые продукты, сайты и интерфейсы — от UX-концепции и визуального
          дизайна до готовой реализации.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <h2 className={`${label} mb-6`} style={{ color: "var(--color-fg-tertiary)" }}>
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
          <h2 className={`${label} mb-6`} style={{ color: "var(--color-fg-tertiary)" }}>
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
    </div>
  );
}

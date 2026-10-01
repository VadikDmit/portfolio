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
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe After Effects",
  "Tilda",
  "ChatGPT",
  "Gemini",
  "HTML / CSS / JavaScript",
];

const panel = "rounded-[24px] bg-white p-7 md:p-10";
const label = "text-[13px] tracking-wide uppercase";

export function AboutPanels({ className = "" }: { className?: string }) {
  return (
    <div className={`${panel} flex flex-col justify-center gap-10 ${className}`}>
      <div>
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight">
          Вадим Дмитриев
        </h1>
        <p className="mt-6 text-[clamp(1.1rem,1.6vw,1.375rem)] font-medium leading-relaxed">
          От первой идеи и прототипа — до готового сайта.
        </p>
        <div className="mt-4 space-y-3 text-[clamp(1.1rem,1.6vw,1.375rem)] leading-relaxed">
          <p>8 лет создаю сайты и цифровые продукты, в которых дизайн работает на задачу.</p>
          <p>
            Проектирую интерфейсы, выстраиваю пользовательский опыт и с помощью AI-инструментов
            довожу дизайн до готовой реализации.
          </p>
          <p>
            Работаю самостоятельно или в команде — подключаюсь как на этапе концепции и дизайна,
            так и на этапе реализации.
          </p>
        </div>
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

import CopyEmailLink from "./CopyEmailLink";

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

const SOCIAL_LINKS = [
  { label: "Telegram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "GitHub", href: "#" },
];

const panel = "rounded-[24px] bg-white p-7 md:p-10";
const label = "text-[13px] tracking-wide uppercase";

export function AboutPanels() {
  return (
    <div className="flex flex-col gap-4">
      <div className={panel}>
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight">
          Вадим Дмитриев
        </h1>
        <p className="mt-6 text-[clamp(1.1rem,1.6vw,1.375rem)] leading-relaxed">
          Создаю современные цифровые продукты, сайты и интерфейсы — от UX-концепции и визуального
          дизайна до готовой реализации.
        </p>
      </div>
      <div className={`${panel} grid grid-cols-1 gap-10 sm:grid-cols-2`}>
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

export function ContactPanels() {
  return (
    <div className="flex flex-col gap-4">
      <div className={panel}>
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight">
          Let&rsquo;s work together.
        </h1>
        <div className="mt-10">
          <span className={label} style={{ color: "var(--color-fg-tertiary)" }}>
            Email
          </span>
          <div className="mt-4">
            <CopyEmailLink email="hello@vadimdmitriev.com" />
          </div>
        </div>
      </div>
      <div className={panel}>
        <span className={label} style={{ color: "var(--color-fg-tertiary)" }}>
          Elsewhere
        </span>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                data-cursor="hover"
                className="text-[16px] transition-opacity duration-300 hover:opacity-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

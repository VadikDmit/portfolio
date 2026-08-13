import type { Metadata } from "next";
import CopyEmailLink from "@/components/CopyEmailLink";

export const metadata: Metadata = {
  title: "Contact",
  description: "Свяжитесь с Вадимом Дмитриевым по поводу нового проекта.",
};

const SOCIAL_LINKS = [
  { label: "Telegram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "GitHub", href: "#" },
];

export default function ContactPage() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center"
      style={{
        paddingTop: 140,
        paddingBottom: 100,
        paddingLeft: "var(--page-margin)",
        paddingRight: "var(--page-margin)",
        maxWidth: "var(--max-width)",
        margin: "0 auto",
      }}
    >
      <h1 className="text-[clamp(2.75rem,8vw,6rem)] leading-[0.98] font-medium tracking-tight max-w-3xl">
        Let&rsquo;s work together.
      </h1>

      <div className="mt-16">
        <span
          className="text-[13px] tracking-wide uppercase"
          style={{ color: "var(--color-fg-tertiary)" }}
        >
          Email
        </span>
        <div className="mt-4">
          <CopyEmailLink email="hello@vadimdmitriev.com" />
        </div>
      </div>

      <div className="mt-16">
        <span
          className="text-[13px] tracking-wide uppercase"
          style={{ color: "var(--color-fg-tertiary)" }}
        >
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
    </section>
  );
}

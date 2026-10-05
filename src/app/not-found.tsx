import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страница не найдена",
};

export default function NotFound() {
  return (
    <section
      className="mx-auto flex min-h-[100dvh] items-center max-md:justify-center max-md:text-center"
      style={{
        paddingLeft: "var(--page-margin)",
        paddingRight: "var(--page-margin)",
        maxWidth: "var(--max-width)",
      }}
    >
      <div>
        <h1
          className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight"
          style={{ color: "var(--color-fg)" }}
        >
          404
        </h1>
        <p
          className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight"
          style={{ color: "var(--color-fg-secondary)" }}
        >
          Страница не найдена
        </p>
        <Link
          href="/"
          data-cursor="hover"
          className="mt-12 inline-block rounded-[20px] bg-white px-7 py-5 text-[16px] transition-opacity duration-300 hover:opacity-70"
        >
          Вернуться на главную
        </Link>
      </div>
    </section>
  );
}

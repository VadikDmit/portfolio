"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "24px var(--page-margin)",
        }}
      >
        <Link
          href="/"
          className="pointer-events-auto text-[13px] tracking-wide"
          style={{ color: "var(--color-fg)" }}
        >
          Вадим Дмитриев
        </Link>

        <nav
          aria-label="Основная навигация"
          className="pointer-events-auto flex items-center gap-6 sm:gap-8"
        >
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "text-[13px] tracking-wide transition-opacity duration-300",
                  active ? "opacity-100" : "opacity-50 hover:opacity-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

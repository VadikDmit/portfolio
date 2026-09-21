"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const onShowcase =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname.startsWith("/projects/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none max-md:pointer-events-auto max-md:bg-[var(--color-bg)]">
      <div
        className="flex items-center justify-center md:justify-between"
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "24px var(--page-margin)",
        }}
      >
        <Link
          href="/"
          aria-label="Вадим Дмитриев — на главную"
          onClick={(e) => {
            if (!onShowcase || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            window.dispatchEvent(new Event("showcase:home"));
          }}
          className="pointer-events-auto transition-opacity duration-300 hover:opacity-70"
        >
          <Image src="/logo.svg" alt="Вадим Дмитриев" width={133} height={29} priority />
        </Link>
      </div>
    </header>
  );
}

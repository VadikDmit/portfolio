"use client";

import Image from "next/image";
import Link from "next/link";

export default function Nav() {
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
          aria-label="Вадим Дмитриев — на главную"
          className="pointer-events-auto transition-opacity duration-300 hover:opacity-70"
        >
          <Image src="/logo.svg" alt="Вадим Дмитриев" width={133} height={29} priority />
        </Link>
      </div>
    </header>
  );
}

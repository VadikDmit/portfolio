"use client";

import { useState } from "react";

export default function CopyEmailLink({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable — link text remains selectable manually.
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      data-cursor="hover"
      className="group flex items-center gap-4 text-[clamp(1.5rem,4vw,2.5rem)] tracking-tight"
    >
      <span className="transition-opacity duration-300 group-hover:opacity-60">
        {email}
      </span>
      <span
        className="text-[13px] transition-opacity duration-300"
        style={{
          color: "var(--color-fg-secondary)",
          opacity: copied ? 1 : 0,
        }}
        aria-live="polite"
      >
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

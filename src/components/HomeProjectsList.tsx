"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { useMediaQuery } from "@/lib/useMediaQuery";
import PlaceholderImage from "./PlaceholderImage";

export default function HomeProjectsList({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const showFloatingPreview = useMediaQuery(
    "(hover: hover) and (pointer: fine) and (min-width: 1024px)"
  );

  return (
    <div>
      <ul>
        {projects.map((project) => {
          const isHovered = hovered?.slug === project.slug;
          const isDimmed = hovered !== null && !isHovered;

          return (
            <li
              key={project.slug}
              className="border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <Link
                href={`/projects/${project.slug}`}
                data-cursor="hover"
                onMouseEnter={() => setHovered(project)}
                onMouseLeave={() => setHovered(null)}
                className="group flex items-center justify-between gap-6 py-6 sm:py-7 transition-opacity duration-300"
                style={{ opacity: isDimmed ? 0.35 : 1 }}
              >
                <span className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                  <span
                    className="text-[13px] tabular-nums shrink-0"
                    style={{ color: "var(--color-fg-secondary)" }}
                  >
                    {project.number}
                  </span>
                  <span
                    className="text-[clamp(1.5rem,4vw,3rem)] leading-none font-medium tracking-tight transition-transform duration-500"
                    style={{
                      transform: isHovered ? "translateX(8px)" : "translateX(0)",
                    }}
                  >
                    {project.title}
                  </span>

                  {/* Mobile-only inline thumbnail, no hover dependency */}
                  <span className="sm:hidden shrink-0 w-16 h-20 overflow-hidden rounded-sm">
                    <PlaceholderImage tone={project.tone} label={project.title} />
                  </span>
                </span>

                <span
                  className="hidden sm:block text-[13px] text-right shrink-0 max-w-[200px]"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {project.category}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {showFloatingPreview && (
        <div
          aria-hidden
          className="pointer-events-none fixed top-1/2 z-40 overflow-hidden rounded-sm"
          style={{
            right: "var(--page-margin)",
            translate: "0 -50%",
            width: 300,
            height: 380,
          }}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                key={hovered.slug}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <PlaceholderImage tone={hovered.tone} label={hovered.title} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

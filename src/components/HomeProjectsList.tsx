"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { useMediaQuery } from "@/lib/useMediaQuery";
import PlaceholderImage from "./PlaceholderImage";

const PREVIEW_WIDTH = 280;
const PREVIEW_HEIGHT = 280;

type HomeProjectsListProps = {
  projects: Project[];
  onOpen: (project: Project, from: DOMRect) => void;
};

function MobileCarousel({ projects, onOpen }: HomeProjectsListProps) {
  return (
    <div className="flex flex-col gap-12 md:hidden">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          data-project-row={project.slug}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            const thumb = e.currentTarget.querySelector<HTMLElement>("[data-project-thumb]");
            onOpen(project, (thumb ?? e.currentTarget).getBoundingClientRect());
          }}
          className="block snap-center"
        >
          <div
            data-project-thumb
            className="relative aspect-square w-full overflow-hidden rounded-[24px]"
          >
            <PlaceholderImage tone={project.tone} label={project.title} src={project.cover || undefined} />
          </div>
          <p className="mt-5 text-center text-[clamp(1.25rem,5.5vw,1.75rem)] leading-tight font-medium tracking-tight">
            {project.title}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default function HomeProjectsList({ projects, onOpen }: HomeProjectsListProps) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [previewY, setPreviewY] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const showFloatingPreview = useMediaQuery(
    "(hover: hover) and (pointer: fine) and (min-width: 1024px)"
  );

  const handleRowEnter = (project: Project, e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPreviewY(rect.top + rect.height / 2 - PREVIEW_HEIGHT / 2);
    setHovered(project);
  };

  const handleClick = (project: Project, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();

    const row = e.currentTarget;
    const thumb = row.querySelector<HTMLElement>("[data-project-thumb]");
    let from: DOMRect;
    if (showFloatingPreview && hovered?.slug === project.slug && previewRef.current) {
      from = previewRef.current.getBoundingClientRect();
    } else if (thumb && thumb.offsetParent) {
      from = thumb.getBoundingClientRect();
    } else {
      from = row.getBoundingClientRect();
    }

    setHovered(null);
    onOpen(project, from);
  };

  return (
    <div>
      <ul className="max-md:hidden">
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
                data-project-row={project.slug}
                onMouseEnter={(e) => handleRowEnter(project, e)}
                onMouseLeave={() => setHovered(null)}
                onClick={(e) => handleClick(project, e)}
                className="group flex items-center justify-between gap-6 py-6 sm:py-7 transition-opacity duration-300"
                style={{ opacity: isDimmed ? 0.35 : 1 }}
              >
                <span className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                  <span
                    className="text-[clamp(1.25rem,3.2vw,2.5rem)] leading-none font-medium tracking-tight transition-transform duration-500"
                    style={{
                      transform: isHovered ? "translateX(8px)" : "translateX(0)",
                    }}
                  >
                    {project.title}
                  </span>

                </span>

                <span
                  className="hidden sm:block text-[13px] text-right shrink-0 max-w-[200px]"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {project.listCategory ?? project.category}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <MobileCarousel projects={projects} onOpen={onOpen} />

      {showFloatingPreview && (
        <div
          ref={previewRef}
          data-hover-preview
          aria-hidden
          className="pointer-events-none fixed top-0 z-40 overflow-hidden rounded-[24px] transition-transform duration-500 ease-out"
          style={{
            right: "var(--page-margin)",
            width: PREVIEW_WIDTH,
            height: PREVIEW_HEIGHT,
            transform: `translateY(${previewY}px)`,
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
                <PlaceholderImage tone={hovered.tone} label={hovered.title} src={hovered.cover || undefined} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

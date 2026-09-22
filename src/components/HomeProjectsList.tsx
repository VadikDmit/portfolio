"use client";

import { useEffect, useRef, useState } from "react";
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
  intro?: boolean;
};

const DIM_COLOR = "#e5e5e1";

// Mobile: the project nearest the viewport centre shows its picture; the others are covered by
// a solid light-grey fill and lose their title. Driven directly by scroll position so it stays perfectly smooth.
function MobileCarousel({ projects, onOpen, intro }: HomeProjectsListProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!root.offsetParent) return;
      const center = window.innerHeight / 2;
      root.querySelectorAll<HTMLElement>("[data-project-row]").forEach((row) => {
        const thumb = row.querySelector<HTMLElement>("[data-project-thumb]");
        const cover = row.querySelector<HTMLElement>("[data-project-dim]");
        const title = row.querySelector<HTMLElement>("[data-project-title]");
        if (!thumb || !cover || !title) return;
        const rect = thumb.getBoundingClientRect();
        const dead = rect.height * 0.15;
        const range = rect.height * 0.75;
        const dist = Math.max(0, Math.abs(rect.top + rect.height / 2 - center) - dead);
        const t = Math.max(0, 1 - dist / range);
        const eased = t * t * (3 - 2 * t);
        cover.style.opacity = String(1 - eased);
        title.style.opacity = String(Math.max(0, (eased - 0.2) / 0.8));
        title.style.transform = `translateY(${(1 - eased) * -10}px)`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-24 md:hidden">
      {projects.map((project, i) => (
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
          className={`block snap-center ${intro ? "intro-card" : ""}`}
          style={{ "--i": i } as React.CSSProperties}
        >
          <div
            data-project-thumb
            className="relative aspect-square w-full overflow-hidden rounded-[24px]"
          >
            <PlaceholderImage tone={project.tone} label={project.title} src={project.cover || undefined} />
            <div
              data-project-dim
              aria-hidden
              className="absolute inset-0"
              style={{ background: DIM_COLOR, opacity: i === 0 ? 0 : 1 }}
            />
          </div>
          <p
            data-project-title
            className="mt-5 text-center text-[clamp(1.25rem,5.5vw,1.75rem)] leading-tight font-medium tracking-tight"
            style={{
              opacity: i === 0 ? 1 : 0,
              transition: "opacity 600ms cubic-bezier(0.32, 0, 0, 1), transform 600ms cubic-bezier(0.32, 0, 0, 1)",
            }}
          >
            {project.title}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default function HomeProjectsList({ projects, onOpen, intro }: HomeProjectsListProps) {
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
        {projects.map((project, i) => {
          const isHovered = hovered?.slug === project.slug;
          const isDimmed = hovered !== null && !isHovered;

          return (
            <li
              key={project.slug}
              className={`border-t ${intro ? "intro-row" : ""}`}
              style={{ borderColor: "var(--color-border)", "--i": i } as React.CSSProperties}
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

      <MobileCarousel projects={projects} onOpen={onOpen} intro={intro} />

      {showFloatingPreview && (
        <div
          ref={previewRef}
          data-hover-preview
          aria-hidden
          className="pointer-events-none fixed top-0 z-40 overflow-hidden rounded-[24px] transition-transform duration-500 ease-out"
          style={{
            // Right edge of the centred, max-width content column (not the viewport edge)
            right: "max(var(--page-margin), calc((100vw - var(--max-width)) / 2 + var(--page-margin)))",
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
                <PlaceholderImage
                  tone={hovered.tone}
                  label={hovered.title}
                  src={hovered.cover || undefined}
                  video={hovered.previewVideo}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata: Metadata = {
  title: "Projects",
  description: "Избранные проекты Вадима Дмитриева — UX/UI дизайн и Vibe Coding.",
};

export default function ProjectsPage() {
  return (
    <section
      style={{
        paddingTop: 140,
        paddingBottom: 100,
        paddingLeft: "var(--page-margin)",
        paddingRight: "var(--page-margin)",
        maxWidth: "var(--max-width)",
        margin: "0 auto",
      }}
    >
      <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-none font-medium tracking-tight mb-16 md:mb-24">
        Projects
      </h1>

      <div>
        {projects.map((project, index) => {
          const reversed = index % 2 === 1;

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              data-cursor="hover"
              className="group grid md:grid-cols-2 gap-8 md:gap-16 items-center py-14 md:py-20 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className={`aspect-[4/3] overflow-hidden rounded-[24px] ${
                  reversed ? "md:order-2" : ""
                }`}
              >
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <PlaceholderImage tone={project.tone} label={project.title} />
                </div>
              </div>

              <div className={reversed ? "md:order-1" : ""}>
                <span
                  className="text-[13px] tabular-nums"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {project.number}
                </span>
                <h2 className="mt-3 text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.02] font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                  {project.title}
                </h2>
                <p
                  className="mt-4 text-[14px]"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {project.category}
                </p>
                <p className="mt-2 text-[15px]">{project.description}</p>
                <p
                  className="mt-6 text-[13px] tabular-nums"
                  style={{ color: "var(--color-fg-tertiary)" }}
                >
                  {project.year}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentProject, getProjectBySlug, projects } from "@/lib/projects";
import PlaceholderImage from "@/components/PlaceholderImage";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);

  return (
    <article>
      {/* 01. Hero */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 60,
          paddingLeft: "var(--page-margin)",
          paddingRight: "var(--page-margin)",
          maxWidth: "var(--max-width)",
          margin: "0 auto",
        }}
      >
        <div className="relative aspect-[4/5] sm:aspect-[16/9] w-full overflow-hidden rounded-[24px]">
          <PlaceholderImage tone={project.tone} label={project.title} src={project.cover || undefined} />

          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
            }}
          />

          <div className="absolute left-6 right-6 bottom-6 sm:left-10 sm:right-10 sm:bottom-10 lg:left-[60px] lg:right-[60px] lg:bottom-[60px]">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-6">
              <span
                className="text-[13px]"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {project.category}
              </span>
              <span
                className="text-[13px] tabular-nums"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {project.year}
              </span>
            </div>

            <h1 className="text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.98] font-medium tracking-tight mb-6 text-white">
              {project.title}
            </h1>

            <p
              className="max-w-2xl text-[clamp(1.05rem,2vw,1.35rem)]"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* 02. About + 03. Role */}
      <section
        style={{
          paddingTop: 60,
          paddingBottom: 60,
          paddingLeft: "var(--page-margin)",
          paddingRight: "var(--page-margin)",
          maxWidth: "var(--max-width)",
          margin: "0 auto",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-7">
            <h2
              className="text-[13px] tracking-wide uppercase mb-6"
              style={{ color: "var(--color-fg-tertiary)" }}
            >
              About the project
            </h2>
            <div className="space-y-4">
              {project.about.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[clamp(1.1rem,2vw,1.5rem)] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <h2
              className="text-[13px] tracking-wide uppercase mb-6"
              style={{ color: "var(--color-fg-tertiary)" }}
            >
              My role
            </h2>
            <ul className="space-y-3">
              {project.role.map((item) => (
                <li key={item} className="text-[15px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03b. Users (only for projects with more than one audience) */}
      {project.audiences && (
        <section
          style={{
            paddingTop: 20,
            paddingBottom: 60,
            paddingLeft: "var(--page-margin)",
            paddingRight: "var(--page-margin)",
            maxWidth: "var(--max-width)",
            margin: "0 auto",
          }}
        >
          <h2
            className="text-[13px] tracking-wide uppercase mb-10"
            style={{ color: "var(--color-fg-tertiary)" }}
          >
            Users
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
            {project.audiences.map((audience) => (
              <div
                key={audience.title}
                className="border-t pt-5"
                style={{ borderColor: "var(--color-border)" }}
              >
                <h3 className="text-[19px] font-medium">{audience.title}</h3>
                <p
                  className="mt-2 text-[14px]"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 04. Process */}
      <section
        style={{
          paddingTop: 60,
          paddingBottom: 80,
          paddingLeft: "var(--page-margin)",
          paddingRight: "var(--page-margin)",
          maxWidth: "var(--max-width)",
          margin: "0 auto",
        }}
      >
        <h2
          className="text-[13px] tracking-wide uppercase mb-10"
          style={{ color: "var(--color-fg-tertiary)" }}
        >
          Process
        </h2>

        {project.processParagraphs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              {project.processParagraphs.map((step) => (
                <div
                  key={step.title}
                  className="border-t pt-5 pb-10"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <h3 className="text-[19px] font-medium">{step.title}</h3>
                  <p
                    className="mt-2 text-[15px] leading-relaxed"
                    style={{ color: "var(--color-fg-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <div className="aspect-square w-full overflow-hidden rounded-[24px] md:sticky md:top-32">
                <PlaceholderImage
                  tone={(project.tone + 1) % 6}
                  label={`${project.title} — process`}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {project.process.map((step, index) => (
              <div key={step.title} className="border-t pt-5" style={{ borderColor: "var(--color-border)" }}>
                <span
                  className="text-[13px] tabular-nums"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[19px] font-medium">{step.title}</h3>
                <p className="mt-2 text-[14px]" style={{ color: "var(--color-fg-secondary)" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 05. Design */}
      {!project.hideDesignSection && (
        <section
          style={{
            paddingBottom: 80,
            paddingLeft: "var(--page-margin)",
            paddingRight: "var(--page-margin)",
            maxWidth: "var(--max-width)",
            margin: "0 auto",
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-[24px]">
              <PlaceholderImage tone={(project.tone + 1) % 6} label={`${project.title} — desktop`} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="aspect-[3/4] overflow-hidden rounded-[24px]">
                <PlaceholderImage tone={(project.tone + 2) % 6} label={`${project.title} — mobile`} />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-[24px]">
                <PlaceholderImage tone={(project.tone + 3) % 6} label={`${project.title} — UI detail`} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 06. Result */}
      <section
        style={{
          paddingBottom: 100,
          paddingLeft: "var(--page-margin)",
          paddingRight: "var(--page-margin)",
          maxWidth: "var(--max-width)",
          margin: "0 auto",
        }}
      >
        <h2
          className="text-[13px] tracking-wide uppercase mb-6"
          style={{ color: "var(--color-fg-tertiary)" }}
        >
          Result
        </h2>
        <p className="max-w-2xl text-[clamp(1.1rem,2vw,1.5rem)] leading-relaxed">
          {project.result}
        </p>
      </section>

      {/* 07. Next project */}
      <Link
        href={`/projects/${next.slug}`}
        data-cursor="hover"
        className="group block border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div
          className="flex flex-col items-start gap-3 py-16 md:py-24"
          style={{
            paddingLeft: "var(--page-margin)",
            paddingRight: "var(--page-margin)",
            maxWidth: "var(--max-width)",
            margin: "0 auto",
          }}
        >
          <span className="text-[13px]" style={{ color: "var(--color-fg-secondary)" }}>
            Next project
          </span>
          <span className="text-[clamp(2rem,6vw,4.5rem)] leading-none font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-3">
            {next.title} →
          </span>
        </div>
      </Link>
    </article>
  );
}

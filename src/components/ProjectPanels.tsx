"use client";

import type { ReactNode } from "react";
import { getAdjacentProject, type Project } from "@/lib/projects";
import PlaceholderImage from "./PlaceholderImage";

function Panel({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[24px] bg-white p-7 md:p-10">{children}</section>
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`text-[13px] tracking-wide uppercase ${className}`}
      style={{ color: "var(--color-fg-tertiary)" }}
    >
      {children}
    </h2>
  );
}

const divider = { borderColor: "var(--color-border)" };

export default function ProjectPanels({
  project,
  onNext,
}: {
  project: Project;
  onNext: (project: Project) => void;
}) {
  const next = getAdjacentProject(project.slug);

  return (
    <div className="flex flex-col gap-3 pb-20 md:pb-[110px]">
      <Panel>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px]">
          <span style={{ color: "var(--color-fg-secondary)" }}>{project.category}</span>
          <span className="tabular-nums" style={{ color: "var(--color-fg-tertiary)" }}>
            {project.year}
          </span>
        </div>
        <p
          className="mt-5 text-[clamp(1.1rem,1.6vw,1.35rem)] leading-snug"
          style={{ color: "var(--color-fg-secondary)" }}
        >
          {project.description}
        </p>

        <Label className="mt-10 mb-5">About the project</Label>
        <div className="space-y-3">
          {project.about.map((paragraph, index) => (
            <p key={index} className="text-[16px] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <Label className="mt-10 mb-5">My role</Label>
        <ul className="space-y-2 text-[15px]">
          {project.role.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Panel>

      {project.audiences && (
        <Panel>
          <Label className="mb-6">Users</Label>
          {project.audiences.map((audience) => (
            <div
              key={audience.title}
              className="border-t pt-5 pb-8 last:pb-0"
              style={divider}
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
        </Panel>
      )}

      <Panel>
        <Label className="mb-6">Process</Label>
        {project.processParagraphs
          ? project.processParagraphs.map((step) => (
              <div
                key={step.title}
                className="border-t pt-5 pb-8 last:pb-0"
                style={divider}
              >
                <h3 className="text-[19px] font-medium">{step.title}</h3>
                <p
                  className="mt-2 text-[15px] leading-relaxed"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {step.description}
                </p>
              </div>
            ))
          : project.process.map((step, index) => (
              <div
                key={step.title}
                className="border-t pt-5 pb-8 last:pb-0"
                style={divider}
              >
                <span
                  className="text-[13px] tabular-nums"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[19px] font-medium">{step.title}</h3>
                <p
                  className="mt-2 text-[14px]"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {step.description}
                </p>
              </div>
            ))}
      </Panel>

      {project.processParagraphs && (
        <div className="aspect-square overflow-hidden rounded-[24px]">
          <PlaceholderImage
            tone={(project.tone + 1) % 6}
            label={`${project.title} — process`}
          />
        </div>
      )}

      {!project.hideDesignSection && (
        <>
          <div className="aspect-[16/10] overflow-hidden rounded-[24px]">
            <PlaceholderImage
              tone={(project.tone + 1) % 6}
              label={`${project.title} — desktop`}
              src={project.images[0] || undefined}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] overflow-hidden rounded-[24px]">
              <PlaceholderImage
                tone={(project.tone + 2) % 6}
                label={`${project.title} — mobile`}
                src={project.images[1] || undefined}
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-[24px]">
              <PlaceholderImage
                tone={(project.tone + 3) % 6}
                label={`${project.title} — UI detail`}
                src={project.images[2] || undefined}
              />
            </div>
          </div>
        </>
      )}

      <Panel>
        <Label className="mb-5">Result</Label>
        <p className="text-[17px] leading-relaxed">{project.result}</p>
      </Panel>

      <button
        type="button"
        data-cursor="hover"
        onClick={() => onNext(next)}
        className="group rounded-[24px] bg-white p-7 md:p-10 text-left"
      >
        <span className="text-[13px]" style={{ color: "var(--color-fg-secondary)" }}>
          Next project
        </span>
        <span className="mt-3 block text-[clamp(1.5rem,3vw,2.5rem)] leading-none font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2">
          {next.title} →
        </span>
      </button>
    </div>
  );
}

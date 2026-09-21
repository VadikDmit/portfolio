"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getProjectBySlug, projects, type Project } from "@/lib/projects";
import HomeProjectsList from "./HomeProjectsList";
import PlaceholderImage from "./PlaceholderImage";
import ProjectPanels from "./ProjectPanels";
import { AboutPanels } from "./PagePanels";

type Page = "about" | "contact";
type Rect = { top: number; left: number; width: number; height: number };
type Flight = { project: Project; kind: "open" | "close"; from: Rect; to: Rect | null };

const EMAIL = "mr.dzoker@yandex.ru";
const TELEGRAM_URL = "https://t.me/VadikD";

const OPEN_MS = 750;
const CLOSE_MS = 600;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const toRect = (r: DOMRect): Rect => ({
  top: r.top,
  left: r.left,
  width: r.width,
  height: r.height,
});

const box = (r: Rect) => ({
  top: `${r.top}px`,
  left: `${r.left}px`,
  width: `${r.width}px`,
  height: `${r.height}px`,
});

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const historyDepth = () => (window.history.state?.showcaseDepth as number | undefined) ?? 0;

function closeTarget(slug: string): Rect | null {
  const row = document.querySelector<HTMLElement>(`[data-project-row="${slug}"]`);
  if (!row) return null;
  const rowRect = row.getBoundingClientRect();

  const preview = document.querySelector<HTMLElement>("[data-hover-preview]");
  if (preview) {
    const p = preview.getBoundingClientRect();
    return {
      left: p.left,
      width: p.width,
      height: p.height,
      top: rowRect.top + rowRect.height / 2 - p.height / 2,
    };
  }

  const thumb = row.querySelector<HTMLElement>("[data-project-thumb]");
  return toRect((thumb && thumb.offsetParent ? thumb : row).getBoundingClientRect());
}

function Flyer({ flight, onDone }: { flight: Flight; onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  const { project, kind, from, to } = flight;

  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || !to) return;
    const duration = kind === "open" ? OPEN_MS : CLOSE_MS;

    const move = el.animate([box(from), box(to)], { duration, easing: EASE, fill: "forwards" });
    move.onfinish = () => doneRef.current();

    const fade =
      kind === "close"
        ? el.animate(
            [{ opacity: 1 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }],
            { duration, fill: "forwards" }
          )
        : null;

    return () => {
      move.cancel();
      fade?.cancel();
    };
  }, [from, to, kind]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-[45] overflow-hidden rounded-[24px]"
      style={box(from)}
    >
      <PlaceholderImage tone={project.tone} label={project.title} src={project.cover || undefined} />
    </div>
  );
}

function IconTile({
  href,
  label,
  src,
  sameTab,
}: {
  href: string;
  label: string;
  src: string;
  sameTab?: boolean;
}) {
  const stub = href === "#";
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      data-cursor="hover"
      {...(stub
        ? { onClick: (e: React.MouseEvent) => e.preventDefault() }
        : sameTab
          ? {}
          : { target: "_blank", rel: "noopener noreferrer" })}
      className="block transition-opacity duration-300 hover:opacity-70"
    >
      <Image src={src} alt="" width={72} height={72} className="rounded-[20px]" />
    </a>
  );
}

function PageTile({
  href,
  label,
  src,
  onClick,
}: {
  href: string;
  label: string;
  src: string;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      data-cursor="hover"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onClick();
      }}
      className="block transition-opacity duration-300 hover:opacity-70"
    >
      <Image src={src} alt="" width={72} height={72} className="rounded-[20px]" />
    </a>
  );
}

function TileClose({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Закрыть контакты"
      data-cursor="hover"
      className="grid h-[72px] w-[72px] place-items-center rounded-[20px] bg-white transition-opacity duration-300 hover:opacity-70"
    >
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3 3l10 10M13 3L3 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function CloseButton({ onClick, className }: { onClick: () => void; className: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Закрыть"
      data-cursor="hover"
      className={`h-11 w-11 place-items-center rounded-[14px] bg-white transition-opacity duration-300 hover:opacity-70 ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M3 3l10 10M13 3L3 13"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export default function Showcase({
  initialSlug,
  initialPage,
}: {
  initialSlug?: string;
  initialPage?: Page;
}) {
  const [slug, setSlug] = useState<string | null>(initialSlug ?? null);
  const [page, setPage] = useState<Page | null>(initialPage ?? null);
  const [pageSeen, setPageSeen] = useState(false);
  const pageRef = useRef<Page | null>(initialPage ?? null);
  const [flight, setFlight] = useState<Flight | null>(null);
  const slugRef = useRef<string | null>(initialSlug ?? null);
  const frameRef = useRef<HTMLDivElement>(null);
  const savedScrollRef = useRef(0);

  const project = slug ? getProjectBySlug(slug) : undefined;

  const transition = (next: string | null, from?: DOMRect) => {
    const current = slugRef.current;
    if (next === current) return;
    const animate = !prefersReducedMotion();

    if (current === null && next) {
      const target = getProjectBySlug(next);
      if (!target) return;
      if (from) savedScrollRef.current = window.scrollY;
      if (window.innerWidth < 768 || !from) window.scrollTo(0, 0);
      const fromRect = from && animate ? toRect(from) : null;

      flushSync(() => {
        slugRef.current = next;
        setSlug(next);
        setFlight(fromRect ? { project: target, kind: "open", from: fromRect, to: null } : null);
      });

      if (fromRect && frameRef.current) {
        const to = toRect(frameRef.current.getBoundingClientRect());
        flushSync(() => setFlight({ project: target, kind: "open", from: fromRect, to }));
      } else {
        flushSync(() => setFlight(null));
      }
      return;
    }

    if (current && next === null) {
      const closing = getProjectBySlug(current);
      window.scrollTo(0, 0);
      const fromRect =
        closing && animate && frameRef.current
          ? toRect(frameRef.current.getBoundingClientRect())
          : null;

      flushSync(() => {
        slugRef.current = null;
        setSlug(null);
        setFlight(
          fromRect && closing ? { project: closing, kind: "close", from: fromRect, to: null } : null
        );
      });

      window.scrollTo(0, savedScrollRef.current);

      if (fromRect && closing) {
        const to = closeTarget(closing.slug);
        flushSync(() =>
          setFlight(to ? { project: closing, kind: "close", from: fromRect, to } : null)
        );
      }
      return;
    }

    slugRef.current = next;
    setSlug(next);
    window.scrollTo({ top: 0, behavior: animate ? "smooth" : "auto" });
  };

  const showPage = (next: Page | null) => {
    const current = pageRef.current;
    if (next === current) return;
    if (current === null) savedScrollRef.current = window.scrollY;
    pageRef.current = next;
    setPage(next);
    if (next) setPageSeen(true);
    window.scrollTo(0, next ? 0 : savedScrollRef.current);
  };

  const openPage = (next: Page) => {
    if (flight || pageRef.current === next) return;
    window.history.pushState({ showcaseDepth: historyDepth() + 1 }, "", `/${next}`);
    showPage(next);
  };

  const openFromList = (target: Project, from: DOMRect) => {
    if (flight) return;
    window.history.pushState(
      { showcaseDepth: historyDepth() + 1 },
      "",
      `/projects/${target.slug}`
    );
    transition(target.slug, from);
  };

  const openNext = (target: Project) => {
    window.history.pushState(
      { showcaseDepth: historyDepth() + 1 },
      "",
      `/projects/${target.slug}`
    );
    transition(target.slug);
  };

  const close = () => {
    if (flight) return;
    const depth = historyDepth();
    if (depth > 0) {
      window.history.go(-depth);
    } else {
      window.history.replaceState({}, "", "/");
      showPage(null);
      transition(null);
    }
  };

  const latest = useRef({ transition, close, showPage });
  useEffect(() => {
    latest.current = { transition, close, showPage };
  });

  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname;
      const pageMatch = path.match(/^\/(about|contact)\/?$/);
      if (pageMatch) {
        latest.current.transition(null);
        latest.current.showPage(pageMatch[1] as Page);
        return;
      }
      latest.current.showPage(null);
      if (path === "/") {
        latest.current.transition(null);
        return;
      }
      const match = path.match(/^\/projects\/([^/]+)\/?$/);
      if (match && getProjectBySlug(match[1])) latest.current.transition(match[1]);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (slugRef.current || pageRef.current)) latest.current.close();
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    document.title = project
      ? `${project.title} — Вадим Дмитриев`
      : page
        ? `${page === "about" ? "About" : "Contact"} — Вадим Дмитриев`
        : "Вадим Дмитриев — UX/UI Designer | Vibe Coding";
  }, [project, page]);

  const opening = flight?.kind === "open";
  const closing = flight?.kind === "close";

  return (
    <section
      className="mx-auto pt-[140px] pb-20 md:pt-0 md:pb-0"
      style={{
        paddingLeft: "var(--page-margin)",
        paddingRight: "var(--page-margin)",
        maxWidth: "var(--max-width)",
      }}
    >
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-16 md:gap-y-0">
        {/* Left: intro or project title */}
        <div
          className={`md:col-span-5 md:col-start-1 md:row-span-2 md:row-start-1 md:sticky md:top-1/2 md:-translate-y-1/2 md:self-start ${
            project ? "max-md:order-2" : "max-md:order-1"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project ? project.slug : "intro"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {project ? (
                <>
                  <h1
                    className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight"
                    style={{ color: "var(--color-fg)" }}
                  >
                    {project.title}
                  </h1>
                  <p
                    className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight"
                    style={{ color: "var(--color-fg-secondary)" }}
                  >
                    {project.listCategory ?? project.category}
                  </p>
                  <div className="mt-12 flex items-center gap-2">
                    {project.figmaUrl && (
                      <IconTile href={project.figmaUrl} label="Проект в Figma" src="/icons/figma.svg" />
                    )}
                    {project.siteUrl && (
                      <IconTile href={project.siteUrl} label="Открыть сайт" src="/icons/link.svg" />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h1
                    className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight"
                    style={{ color: "var(--color-fg)" }}
                  >
                    UX/UI-дизайнер
                  </h1>
                  <p
                    className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight"
                    style={{ color: "var(--color-fg-secondary)" }}
                  >
                    Vibe Coding · Tilda
                  </p>
                  <div className="mt-12 flex items-center gap-2">
                    <PageTile href="/about" label="About" src="/icons/user.svg" onClick={() => openPage("about")} />
                    {page === "contact" ? (
                      <>
                        <TileClose onClick={close} />
                        <div className="flex gap-2" style={{ animation: "showcase-fade 400ms both" }}>
                          <IconTile href={`mailto:${EMAIL}`} label="Написать на почту" src="/icons/mail.svg" sameTab />
                          <IconTile href={TELEGRAM_URL} label="Написать в Telegram" src="/icons/telegram_line.svg" />
                        </div>
                      </>
                    ) : (
                      <PageTile href="/contact" label="Contact" src="/icons/chat_1_line.svg" onClick={() => openPage("contact")} />
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Close button (desktop): sits in the empty 6th column, follows scroll */}
        {((project && !opening) || page === "about") && (
          <CloseButton
            onClick={close}
            className="hidden md:grid md:col-start-6 md:row-start-1 md:row-span-2 md:self-start md:justify-self-end md:-mr-11 md:sticky md:top-[100px] md:z-10"
          />
        )}

        {/* Right: list <-> frame, same box */}
        <div
          className={`md:col-span-6 md:col-start-7 md:row-start-1 md:flex md:min-h-screen md:items-center md:py-[110px] ${
            project ? "max-md:order-1" : "max-md:order-2"
          }`}
        >
          <div className="grid w-full [&>*]:col-start-1 [&>*]:row-start-1">
            <div
              className={project || page === "about" ? "max-md:hidden md:invisible" : ""}
              style={
                closing
                  ? { animation: "showcase-fade 500ms 200ms both" }
                  : pageSeen && !project
                    ? { animation: "showcase-fade 500ms both" }
                    : undefined
              }
            >
              <HomeProjectsList projects={projects} onOpen={openFromList} />
            </div>

            {page === "about" && (
              <div className="flex flex-col" style={{ animation: "showcase-fade 400ms both" }}>
                <CloseButton onClick={close} className="mb-4 grid self-start md:hidden" />
                <AboutPanels className="md:flex-1" />
              </div>
            )}
          </div>
        </div>

        {/* Right: project content panels */}
        {project && (
          <div className="max-md:order-3 md:col-span-6 md:col-start-7 md:row-start-2">
            <ProjectPanels project={project} onNext={openNext} />
          </div>
        )}
      </div>

      {flight?.to && <Flyer flight={flight} onDone={() => setFlight(null)} />}
    </section>
  );
}

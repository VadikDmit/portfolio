"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getProjectBySlug, projects, type Project } from "@/lib/projects";
import HomeProjectsList from "./HomeProjectsList";
import PlaceholderImage from "./PlaceholderImage";
import ProjectPanels from "./ProjectPanels";
import { AboutPanels } from "./PagePanels";

type Page = "about";
type Rect = { top: number; left: number; width: number; height: number };
type Flight = { project: Project; kind: "open" | "close"; from: Rect; to: Rect | null };

// The home intro (masked title reveal + rising tiles) plays once per page load.
let introDone = false;
// Intro timings live in globals.css (.intro-*): desktop follows the reference, mobile is a
// centered title that glides up, then logo, tiles and projects appear together.
const introTile = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Reveal({ play, delay = 0, children }: { play: boolean; delay?: number; children: React.ReactNode }) {
  return (
    <span className="-mb-[0.2em] block overflow-hidden pb-[0.2em]">
      <span
        className={play ? "intro-reveal block will-change-transform" : "block"}
        style={play ? ({ "--d": `${delay}ms` } as React.CSSProperties) : undefined}
      >
        {children}
      </span>
    </span>
  );
}

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
  const row = [
    ...document.querySelectorAll<HTMLElement>(`[data-project-row="${slug}"]`),
  ].find((r) => r.offsetParent);
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
      <PlaceholderImage
        tone={project.tone}
        label={project.title}
        src={project.previewVideoBackground || project.cover || undefined}
      />
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

function TileClose({
  onClick,
  label = "Закрыть контакты",
  back,
}: {
  onClick: () => void;
  label?: string;
  back?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-cursor="hover"
      className="grid h-[72px] w-[72px] place-items-center rounded-[20px] bg-black transition-opacity duration-300 hover:opacity-70"
      style={{ animation: "tile-in 600ms var(--ease-out) both" }}
    >
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d={back ? "M10 3L5 8l5 5" : "M3 3l10 10M13 3L3 13"}
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
      className={`h-[72px] w-[72px] place-items-center rounded-[20px] bg-white transition-opacity duration-300 hover:opacity-70 ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
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
  initialPage?: Page | "contact";
}) {
  const [slug, setSlug] = useState<string | null>(initialSlug ?? null);
  const [page, setPage] = useState<Page | null>(initialPage === "about" ? "about" : null);
  const [contact, setContact] = useState(initialPage === "contact");
  const contactRef = useRef(initialPage === "contact");
  const [pageSeen, setPageSeen] = useState(false);
  const [playIntro, setPlayIntro] = useState(() => !introDone && !initialSlug && !initialPage);
  const introTitleRef = useRef<HTMLDivElement>(null);
  // Mobile intro: the title starts centered on screen and glides up to its place.
  useEffect(() => {
    const el = introTitleRef.current;
    if (!playIntro || !el || window.innerWidth >= 768) return;
    const t = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const docCenter = rect.top + window.scrollY + rect.height / 2;
      el.style.setProperty("--intro-shift", `${window.innerHeight / 2 - docCenter}px`);
    }, 60);
    return () => window.clearTimeout(t);
  }, [playIntro]);
  useEffect(() => {
    introDone = true;
    const t = window.setTimeout(() => setPlayIntro(false), 3600);
    return () => window.clearTimeout(t);
  }, []);
  const pageRef = useRef<Page | null>(initialPage === "about" ? "about" : null);
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

      contactRef.current = false;
      setContact(false);
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
    toggleContact(false);
    showPage(next);
  };

  // Contacts only toggle the tile row on the left; the right side and URL stay put.
  const toggleContact = (next: boolean) => {
    contactRef.current = next;
    setContact(next);
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

  const goHome = () => {
    toggleContact(false);
    if (flight) return;
    if (slugRef.current || pageRef.current) close();
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const latest = useRef({ transition, close, showPage, toggleContact, goHome });
  useEffect(() => {
    latest.current = { transition, close, showPage, toggleContact, goHome };
  });

  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname;
      if (/^\/about\/?$/.test(path)) {
        latest.current.transition(null);
        latest.current.showPage("about");
        return;
      }
      latest.current.showPage(null);
      if (path === "/" || /^\/contact\/?$/.test(path)) {
        latest.current.toggleContact(/^\/contact/.test(path));
        latest.current.transition(null);
        return;
      }
      const match = path.match(/^\/projects\/([^/]+)\/?$/);
      if (match && getProjectBySlug(match[1])) latest.current.transition(match[1]);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (contactRef.current) latest.current.toggleContact(false);
      else if (slugRef.current || pageRef.current) latest.current.close();
    };
    const onHome = () => latest.current.goHome();
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    window.addEventListener("showcase:home", onHome);
    return () => {
      window.removeEventListener("showcase:home", onHome);
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

  // Snap scrolling is only for the home project list, not for open project/About screens.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.snap = project || page ? "off" : "on";
    return () => {
      delete root.dataset.snap;
    };
  }, [project, page]);

  useEffect(() => {
    document.title = project
      ? `${project.title} — Вадим Дмитриев`
      : page
        ? "About — Вадим Дмитриев"
        : "Вадим Дмитриев — UX/UI Designer | Vibe Coding";
  }, [project, page]);

  const opening = flight?.kind === "open";
  const closing = flight?.kind === "close";

  const showMobileClose = !contact && project && !opening;

  const renderTiles = () => project ? (
    <>
                    {project.figmaUrl && (
                      <IconTile href={project.figmaUrl} label="Проект в Figma" src="/icons/figma.svg" />
                    )}
                    {project.siteUrl && (
                      <IconTile href={project.siteUrl} label="Открыть сайт" src="/icons/link.svg" />
                    )}
    </>
  ) : (
    <>
                    {page === "about" ? (
                      <>
                        <TileClose back onClick={close} label="Назад" />
                        <div style={{ animation: "tile-in 600ms var(--ease-out) 100ms both" }}>
                          <IconTile href={`mailto:${EMAIL}`} label="Написать на почту" src="/icons/mail.svg" sameTab />
                        </div>
                        <div style={{ animation: "tile-in 600ms var(--ease-out) 200ms both" }}>
                          <IconTile href={TELEGRAM_URL} label="Написать в Telegram" src="/icons/telegram_line.svg" />
                        </div>
                      </>
                    ) : (
                      <>
                    <div className={playIntro ? "intro-tile" : undefined} style={introTile(0)}>
                      <PageTile href="/about" label="About" src="/icons/user.svg" onClick={() => openPage("about")} />
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                      {contact ? (
                        <motion.div
                          key="contact"
                          className="flex items-center gap-2"
                          exit={{ opacity: 0, x: -14, scale: 0.9 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <TileClose onClick={() => toggleContact(false)} />
                          <div style={{ animation: "tile-in 600ms var(--ease-out) 100ms both" }}>
                            <IconTile href={`mailto:${EMAIL}`} label="Написать на почту" src="/icons/mail.svg" sameTab />
                          </div>
                          <div style={{ animation: "tile-in 600ms var(--ease-out) 200ms both" }}>
                            <IconTile href={TELEGRAM_URL} label="Написать в Telegram" src="/icons/telegram_line.svg" />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="chat"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={playIntro ? "intro-tile" : undefined} style={introTile(1)}>
                            <PageTile href="/contact" label="Contact" src="/icons/chat_1_line.svg" onClick={() => toggleContact(true)} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                      </>
                    )}
    </>
  );

  return (
    <section
      className="mx-auto pt-[110px] pb-36 md:pt-0 md:pb-0"
      style={{
        paddingLeft: "var(--page-margin)",
        paddingRight: "var(--page-margin)",
        maxWidth: "var(--max-width)",
      }}
    >
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-16 md:gap-y-0">
        {/* Left: intro or project title */}
        <div
          className={`max-md:text-center md:col-span-5 md:col-start-1 md:row-span-2 md:row-start-1 md:sticky md:top-1/2 md:-translate-y-1/2 md:self-start ${
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
                  <div className="mt-12 hidden items-center gap-2 md:flex">{renderTiles()}</div>
                </>
              ) : (
                <>
                  <div ref={introTitleRef} className={playIntro ? "intro-shift" : undefined}>
                    <h1
                      className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight"
                      style={{ color: "var(--color-fg)" }}
                    >
                      <Reveal play={playIntro} delay={80}>UX/UI-дизайнер</Reveal>
                    </h1>
                    <p
                      className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight"
                      style={{ color: "var(--color-fg-secondary)" }}
                    >
                      <Reveal play={playIntro} delay={170}>
                        Vibe Coding · Tilda
                      </Reveal>
                    </p>
                  </div>
                  <div className="mt-12 hidden items-center gap-2 md:flex">{renderTiles()}</div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Close button (desktop): sits in the empty 6th column, follows scroll */}
        {((project && !opening) || page === "about") && (
          <CloseButton
            onClick={close}
            className="hidden md:grid md:col-start-6 md:row-start-1 md:row-span-2 md:self-start md:justify-self-end md:-mr-14 md:sticky md:top-[100px] md:z-10"
          />
        )}

        {/* Right: list <-> frame, same box */}
        <div
          className={`md:col-span-6 md:col-start-7 md:row-start-1 md:flex md:min-h-screen md:items-center md:py-[110px] ${
            project ? "max-md:order-1" : "max-md:order-2"
          }`}
        >
          <div className="grid w-full grid-cols-[minmax(0,1fr)] [&>*]:col-start-1 [&>*]:row-start-1">
            <div
              className={
                project || page === "about"
                  ? "max-md:hidden md:invisible"
                  : ""
              }
              style={
                closing
                  ? { animation: "showcase-fade 500ms 200ms both" }
                  : pageSeen && !project
                    ? { animation: "showcase-fade 500ms both" }
                    : undefined
              }
            >
              <HomeProjectsList projects={projects} onOpen={openFromList} intro={playIntro && !project && !page} />
            </div>

            {page === "about" && (
              <div className="flex flex-col" style={{ animation: "showcase-fade 400ms both" }}>
                <AboutPanels className="md:flex-1" />
              </div>
            )}

            {project && (
              <div
                ref={frameRef}
                className="relative aspect-square overflow-hidden rounded-[24px]"
                style={{ visibility: opening ? "hidden" : "visible" }}
              >
                <div className="absolute inset-0">
                  <PlaceholderImage
                    tone={project.tone}
                    label={project.title}
                    src={project.cover || undefined}
                    video={project.previewVideo}
                    videoBackground={project.previewVideoBackground}
                  />
                </div>
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

      {/* Mobile: tiles pinned to the bottom, close button on the right */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-center px-5 pb-5 md:hidden [&_button]:shadow-[0_6px_24px_rgba(0,0,0,0.14)] [&_img]:shadow-[0_6px_24px_rgba(0,0,0,0.14)] ${
          showMobileClose ? "justify-between" : "justify-center"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project ? project.slug : "intro"}
            layout="position"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-2"
          >
            {renderTiles()}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {showMobileClose && (
            <motion.div
              key="close"
              layout="position"
              initial={{ opacity: 0, scale: 0.8, x: 16 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto"
            >
              <CloseButton onClick={close} className="grid" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {flight?.to && <Flyer flight={flight} onDone={() => setFlight(null)} />}
    </section>
  );
}

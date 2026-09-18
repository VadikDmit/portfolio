import HomeProjectsList from "@/components/HomeProjectsList";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center"
      style={{
        paddingTop: 140,
        paddingBottom: 80,
        paddingLeft: "var(--page-margin)",
        paddingRight: "var(--page-margin)",
        maxWidth: "var(--max-width)",
        margin: "0 auto",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-32 self-start">
          <h1
            className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-tight"
            style={{ color: "var(--color-fg)" }}
          >
            UX/UI-дизайнер · Vibe Coding
          </h1>
          <p
            className="mt-4 text-[16px]"
            style={{ color: "var(--color-fg-tertiary)" }}
          >
            Digital products, websites &amp; interfaces
          </p>
        </div>

        <div className="md:col-span-6">
          <HomeProjectsList projects={projects} />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import HomeProjectsList from "@/components/HomeProjectsList";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center pt-[140px] pb-[80px] md:py-[110px]"
      style={{
        paddingLeft: "var(--page-margin)",
        paddingRight: "var(--page-margin)",
        maxWidth: "var(--max-width)",
        margin: "0 auto",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-1/2 md:-translate-y-1/2 self-start">
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
            <Image src="/icons/user.svg" alt="" width={72} height={72} className="rounded-[20px]" />
            <Image src="/icons/chat_1_line.svg" alt="" width={72} height={72} className="rounded-[20px]" />
          </div>
        </div>

        <div className="md:col-start-7 md:col-span-6">
          <HomeProjectsList projects={projects} />
        </div>
      </div>
    </section>
  );
}

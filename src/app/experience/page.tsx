import { Reveal } from "@/components/Reveal";
import { TimelineItem } from "@/components/TimelineItem";
import { EXPERIENCES, RESUME_URL } from "@/lib/portfolio-data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "experience" };

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 pb-32 pt-16 md:pt-24">
      <Reveal>
        <h1 className="font-serif text-4xl font-bold tracking-[-0.02em] text-ink">
          Where I've been.
        </h1>
        <p className="mt-4 text-[17px] text-ink-muted">
          A short chronicle of building, shipping, and learning.
        </p>
      </Reveal>
      <div className="mt-16 flex flex-col gap-14">
        {EXPERIENCES.map((experience, index) => (
          <TimelineItem key={experience.id} experience={experience} index={index} />
        ))}
      </div>
      {RESUME_URL && (
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-16 inline-block font-mono text-[13px] tracking-[0.05em] text-ink underline underline-offset-4"
        >
          résumé ↗
        </a>
      )}
    </main>
  );
}

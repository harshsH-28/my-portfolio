import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { PROJECTS } from "@/lib/portfolio-data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "projects" };

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 pb-32 pt-16 md:pt-24">
      <Reveal>
        <h1 className="font-serif text-4xl font-bold tracking-[-0.02em] text-ink">
          Selected work.
        </h1>
        <p className="mt-4 text-[17px] text-ink-muted">
          Recent explorations in interfaces, AI, and systems.
        </p>
      </Reveal>
      <div className="mt-16 flex flex-col gap-4">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </main>
  );
}

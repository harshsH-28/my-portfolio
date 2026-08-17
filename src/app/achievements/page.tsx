import { Chip } from "@/components/Chip";
import { Reveal } from "@/components/Reveal";
import { ACHIEVEMENTS, SKILLS } from "@/lib/portfolio-data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "achievements" };

export default function AchievementsPage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 pb-32 pt-16 md:pt-24">
      <Reveal>
        <h1 className="font-serif text-4xl font-bold tracking-[-0.02em] text-ink">
          Skills &amp; achievements.
        </h1>
        <p className="mt-4 text-[17px] text-ink-muted">
          What I work with, and a few moments worth keeping.
        </p>
      </Reveal>
      <div className="mt-16 flex flex-col gap-8">
        {SKILLS.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.06}>
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-faint">
              {group.category}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-16">
        <h2 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-faint">
          Achievements
        </h2>
        <ul className="mt-2">
          {ACHIEVEMENTS.map((achievement) => (
            <li
              key={achievement.id}
              className="flex flex-col gap-1 border-b border-hairline py-5 last:border-b-0"
            >
              <span className="font-mono text-xs tracking-[0.05em] text-ink-faint">
                {achievement.year}
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink">{achievement.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink-muted">
                {achievement.description}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </main>
  );
}

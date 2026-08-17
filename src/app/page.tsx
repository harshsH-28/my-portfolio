import { DropsFeed } from "@/components/DropsFeed";
import { Reveal } from "@/components/Reveal";
import { BIO, CONTACT_EMAIL, GREETING, SOCIAL_LINKS } from "@/lib/portfolio-data";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[640px] px-6 pb-32 pt-16 md:pt-24">
      <Reveal>
        <h1 className="font-serif text-4xl font-bold tracking-[-0.02em] text-ink md:text-5xl">
          {GREETING}
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-ink-muted">{BIO}</p>
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px] tracking-[0.05em]">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                className="text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink"
              >
                {social.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
      <div className="mt-20">
        <DropsFeed />
      </div>
      <hr className="mt-12 border-hairline" />
      <p className="mt-10 text-[15px] text-ink-muted">
        Interested in working together or just want to say hi?{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-ink underline underline-offset-4"
        >
          let's talk
        </a>
        .
      </p>
    </main>
  );
}

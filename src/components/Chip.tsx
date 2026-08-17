import { cn } from "@/lib/utils";

/** Pill-shaped mono label for tech tags and skills. */
export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-surface-2 px-3 py-1 font-mono text-xs tracking-[0.04em] text-ink-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

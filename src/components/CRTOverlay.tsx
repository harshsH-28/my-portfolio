/**
 * CRTOverlay — fixed scanline / chromatic aberration effect.
 * Pure CSS, pointer-events: none so it never blocks interactions.
 * Server component — no "use client" needed.
 */
export function CRTOverlay() {
  return (
    <div
      aria-hidden="true"
      className="crt-overlay"
    />
  );
}

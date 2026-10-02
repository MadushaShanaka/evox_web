export function GridSpotlight({ interactive }: { interactive: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="hero-grid absolute inset-0" />
      {interactive && <div className="hero-grid-spot absolute inset-0" />}
    </div>
  );
}

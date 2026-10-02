const BADGES = [
  { label: 'React', angle: -75 },
  { label: 'AWS', angle: 90 },
  { label: 'Flutter', angle: 145 },
  { label: 'AI', angle: 248 },
];

const frame =
  'pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 [--orbit-r:130px] sm:h-[360px] sm:w-[360px] sm:[--orbit-r:180px]';

interface OrbitProps {
  paused: boolean;
}

export function OrbitRing({ paused }: OrbitProps) {
  return (
    <div className={frame} aria-hidden>
      <div
        className={`h-full w-full rounded-full border border-dashed border-[#22B8D4]/45 ${paused ? '' : 'orbit-spin motion-loop'}`}
      />
    </div>
  );
}

export function OrbitBadges({ paused }: OrbitProps) {
  return (
    <div className={frame} aria-hidden>
      <div className={`relative h-full w-full ${paused ? '' : 'orbit-spin motion-loop'}`}>
        {BADGES.map((badge) => (
          <div
            key={badge.label}
            className="absolute left-1/2 top-1/2"
            style={{
              transformOrigin: '0 0',
              transform: `rotate(${badge.angle}deg) translateY(calc(var(--orbit-r) * -1))`,
            }}
          >
            <div className={paused ? '' : 'orbit-spin-rev motion-loop'}>
              <div style={{ transform: `rotate(${-badge.angle}deg)` }}>
                <span className="inline-flex -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#22B8D4]/40 bg-[#0C1A24]/95 px-3 py-1 text-[11px] font-semibold text-[#EAF4F8] shadow-lg backdrop-blur">
                  {badge.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

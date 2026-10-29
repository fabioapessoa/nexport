const ORIGIN = { x: 31.7, y: 45.5 };

const CONNECTIONS = [
  { x: 18, y: 22 },
  { x: 48, y: 15 },
  { x: 72, y: 32 },
  { x: 80, y: 58 },
  { x: 58, y: 68 },
];

type PresenceGraphicProps = {
  className?: string;
  eyebrow: string;
  label: string;
  legend: string;
};

export default function PresenceGraphic({ className = "", eyebrow, label, legend }: PresenceGraphicProps) {
  return (
    <div className={`relative aspect-[800/400] overflow-hidden rounded-2xl border border-offwhite/10 bg-ink ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- trusted local SVG; next/image blocks SVG optimization by default */}
      <img
        src="/media/world-trade-map.svg"
        alt="Mapa-múndi con Venezuela destacada"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {CONNECTIONS.map((node, i) => (
          <line
            key={`line-${i}`}
            x1={ORIGIN.x}
            y1={ORIGIN.y}
            x2={node.x}
            y2={node.y}
            stroke="var(--color-gold)"
            strokeWidth="0.18"
            strokeDasharray="0.9 0.6"
            opacity="0.55"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-3" dur="3.2s" repeatCount="indefinite" />
          </line>
        ))}
        {CONNECTIONS.map((node, i) => (
          <circle key={`node-${i}`} cx={node.x} cy={node.y} r="0.9" fill="var(--color-gold)" fillOpacity="0.75" />
        ))}
      </svg>

      <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-offwhite/55 sm:text-xs">
          {eyebrow}
        </p>
        <p className="mt-0.5 text-sm font-semibold uppercase tracking-[0.1em] text-gold">
          {label}
        </p>
      </div>

      <div className="absolute bottom-5 left-5 flex items-center gap-2 sm:bottom-7 sm:left-7">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        <span className="text-[11px] uppercase tracking-[0.14em] text-offwhite/60 sm:text-xs">
          {legend}
        </span>
      </div>
    </div>
  );
}

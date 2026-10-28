const CONNECTIONS = [
  { x: 870, y: 40 },
  { x: 980, y: 560 },
  { x: 850, y: 1000 },
  { x: 520, y: 1020 },
];

const ORIGIN = { x: 620, y: 420 };

export default function PresenceGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[1654/1479] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- trusted local SVG; next/image blocks SVG optimization by default */}
      <img
        src="/media/venezuela-map.svg"
        alt="Mapa de Venezuela"
        className="absolute inset-0 h-full w-full object-contain"
      />

      <svg
        viewBox="0 0 1654 1479"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        fill="none"
      >
        {CONNECTIONS.map((node, i) => (
          <path
            key={`line-${i}`}
            d={`M ${ORIGIN.x} ${ORIGIN.y} Q ${(ORIGIN.x + node.x) / 2} ${
              Math.min(ORIGIN.y, node.y) - 160
            } ${node.x} ${node.y}`}
            stroke="var(--color-gold)"
            strokeOpacity="0.85"
            strokeWidth="6"
            strokeLinecap="round"
          />
        ))}

        {CONNECTIONS.map((node, i) => (
          <g key={`node-${i}`}>
            <circle cx={node.x} cy={node.y} r="46" fill="var(--color-gold)" fillOpacity="0.14" />
            <circle cx={node.x} cy={node.y} r="20" fill="var(--color-gold)" />
            <circle cx={node.x} cy={node.y} r="20" stroke="var(--color-porcelain)" strokeWidth="5" />
          </g>
        ))}

        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="16" fill="var(--color-gold)" />
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r="34"
          stroke="var(--color-gold)"
          strokeWidth="5"
          strokeOpacity="0.55"
        />
      </svg>

      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-display text-lg font-bold uppercase tracking-[0.1em] text-ink sm:text-xl">
        Venezuela
      </p>
    </div>
  );
}

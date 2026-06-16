interface RingChartProps {
  value: number; // 0-100
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
  trackClassName?: string;
  className?: string;
  color?: string; // css color, defaults to primary
}

export function RingChart({
  value,
  size = 120,
  stroke = 10,
  label,
  sublabel,
  className,
  color = "var(--color-primary)",
}: RingChartProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div
      className={className}
      style={{ width: size, height: size, position: "relative", flexShrink: 0 }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={stroke}
          opacity={0.5}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
        {label && <span className="font-display text-xl font-700">{label}</span>}
        {sublabel && (
          <span className="text-[10px] font-600 uppercase tracking-wide text-muted-foreground">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

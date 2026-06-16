import { type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Bilingual } from "@/components/Bilingual";

export function PageHeader({
  breadcrumb,
  title,
  titleUrdu,
  actions,
}: {
  breadcrumb?: string[];
  title: string;
  titleUrdu?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-7 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        {breadcrumb && (
          <p className="mb-1.5 truncate text-xs font-600 uppercase tracking-[0.12em] text-muted-foreground">
            {breadcrumb.join("  ›  ")}
          </p>
        )}
        <h1 className="font-display text-2xl font-700 tracking-tight sm:text-3xl">
          {title}
          {titleUrdu && (
            <span dir="rtl" className="font-urdu ml-2 text-xl text-muted-foreground">
              {titleUrdu}
            </span>
          )}
        </h1>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">{actions}</div>}
    </div>
  );
}

type Tone = "plain" | "cream" | "sage";

export function SectionCard({
  icon: Icon,
  title,
  titleUrdu,
  subtitle,
  tone = "plain",
  action,
  children,
  className,
}: {
  icon?: LucideIcon;
  title?: string;
  titleUrdu?: string;
  subtitle?: string;
  tone?: Tone;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const headerTone =
    tone === "cream"
      ? "bg-cream text-cream-foreground"
      : tone === "sage"
        ? "bg-sage text-sage-foreground"
        : "bg-card text-foreground";
  return (
    <section className={cn("overflow-hidden rounded-3xl bg-card shadow-card ring-1 ring-border/60", className)}>
      {(title || action) && (
        <header className={cn("flex items-start justify-between gap-3 px-5 py-4 sm:px-6", headerTone)}>
          <div className="flex min-w-0 items-start gap-3">
            {Icon && (
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-foreground/5">
                <Icon className="h-4 w-4" />
              </span>
            )}
            <div className="min-w-0">
              {title && (
                <h2 className="font-display text-base font-700 leading-tight sm:text-lg">
                  <Bilingual en={title} ur={titleUrdu} />
                </h2>
              )}
              {subtitle && <p className="mt-0.5 text-xs opacity-70">{subtitle}</p>}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

export function ToggleRow<T extends string>({
  label,
  options,
  value,
  onChange,
  dots,
}: {
  label: string;
  options: T[];
  value: T | null;
  onChange: (v: T) => void;
  dots?: Partial<Record<T, string>>;
}) {
  return (
    <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3">
      <span className="text-sm font-600 text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-600 transition-all",
                active
                  ? "bg-primary-deep text-primary-foreground shadow-soft"
                  : "bg-muted text-foreground/70 hover:bg-secondary",
              )}
            >
              {dots?.[opt] && (
                <span className="h-2 w-2 rounded-full" style={{ background: dots[opt] }} />
              )}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StatTile({
  value,
  label,
  labelUrdu,
  sub,
  accent,
}: {
  value: ReactNode;
  label: string;
  labelUrdu?: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl px-5 py-4 ring-1 ring-border/60",
        accent ? "bg-sage" : "bg-card shadow-soft",
      )}
    >
      <p className="font-display text-2xl font-700 leading-none">{value}</p>
      {sub && <p className="mt-0.5 text-xs font-600 text-primary">{sub}</p>}
      <p className="mt-2 text-xs font-600 text-muted-foreground">
        <Bilingual en={label} ur={labelUrdu} />
      </p>
    </div>
  );
}

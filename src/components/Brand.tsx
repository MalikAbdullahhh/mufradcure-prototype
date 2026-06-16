import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-primary/15 text-primary",
        className,
      )}
    >
      <Leaf className="h-[55%] w-[55%]" strokeWidth={2} />
    </span>
  );
}

export function BrandLockup({
  subtitle,
  subtitleUrdu,
  tone = "light",
}: {
  subtitle?: string;
  subtitleUrdu?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex items-center gap-3">
      <BrandMark
        className={cn(
          "h-10 w-10 shrink-0",
          tone === "dark" && "bg-sidebar-accent/20 text-sidebar-accent-foreground",
        )}
      />
      <div className="min-w-0 leading-tight">
        <p
          className={cn(
            "font-display text-lg font-700 tracking-tight",
            tone === "dark" ? "text-sidebar-foreground" : "text-foreground",
          )}
        >
          MufradCure
        </p>
        {subtitle && (
          <p
            className={cn(
              "truncate text-[11px] font-600 uppercase tracking-[0.14em]",
              tone === "dark" ? "text-sidebar-muted" : "text-muted-foreground",
            )}
          >
            {subtitle}
            {subtitleUrdu && <span className="font-urdu normal-case"> / {subtitleUrdu}</span>}
          </p>
        )}
      </div>
    </div>
  );
}

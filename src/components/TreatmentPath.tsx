import { cn } from "@/lib/utils";
import type { MizaajCode } from "@/lib/mock-data";

/** Forward-only Mizaaj progression 1 → 6 with current/next highlighted. */
export function TreatmentPath({
  current,
  next,
  size = "md",
}: {
  current: MizaajCode;
  next: MizaajCode;
  size?: "sm" | "md";
}) {
  const codes: MizaajCode[] = [1, 2, 3, 4, 5, 6];
  const dot = size === "sm" ? "h-7 w-7 text-xs" : "h-10 w-10 text-sm";
  return (
    <div className="flex items-center justify-between gap-1">
      {codes.map((code, i) => {
        const isCurrent = code === current;
        const isNext = code === next;
        return (
          <div key={code} className="flex flex-1 items-center last:flex-none">
            <span
              className={cn(
                "grid shrink-0 place-items-center rounded-full font-700 transition-colors",
                dot,
                isCurrent && "bg-primary-deep text-primary-foreground ring-2 ring-primary/30",
                isNext && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                !isCurrent && !isNext && "bg-muted text-muted-foreground",
              )}
            >
              {code}
            </span>
            {i < codes.length - 1 && (
              <span
                className={cn(
                  "mx-1 h-0.5 flex-1 rounded-full",
                  code < next ? "bg-primary/60" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

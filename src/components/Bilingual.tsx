import { cn } from "@/lib/utils";

/** Renders an English label with its Urdu translation alongside. */
export function Bilingual({
  en,
  ur,
  className,
  urClassName,
  separator = " / ",
}: {
  en: string;
  ur?: string;
  className?: string;
  urClassName?: string;
  separator?: string;
}) {
  return (
    <span className={className}>
      {en}
      {ur && (
        <>
          <span className="opacity-50">{separator}</span>
          <span dir="rtl" className={cn("font-urdu", urClassName)}>
            {ur}
          </span>
        </>
      )}
    </span>
  );
}

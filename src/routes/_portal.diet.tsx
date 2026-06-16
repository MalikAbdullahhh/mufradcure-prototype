import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sun, Soup, Moon, Pill } from "lucide-react";
import { PageHeader, SectionCard } from "@/components/app-ui";
import { RingChart } from "@/components/RingChart";
import { Bilingual } from "@/components/Bilingual";
import { cn } from "@/lib/utils";
import { dietPlan, medicinePlan } from "@/lib/mock-data";

export const Route = createFileRoute("/_portal/diet")({
  head: () => ({ meta: [{ title: "My Diet & Medicine Plan — MufradCure" }] }),
  component: DietPage,
});

const mealIcons = [Sun, Soup, Moon];

function DietPage() {
  const [done, setDone] = useState<Record<number, boolean>>({ 0: true, 1: false, 2: false });
  const progress = Math.round((Object.values(done).filter(Boolean).length / dietPlan.length) * 100);

  return (
    <div>
      <PageHeader breadcrumb={["Patient Portal", "My Diet Plan"]} title="Diet & Medicine Plan" titleUrdu="خوراک اور دوا" />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <SectionCard title="Current Diet Plan" titleUrdu="موجودہ ڈائٹ پلان" tone="sage">
          <div className="space-y-3">
            {dietPlan.map((meal, i) => {
              const Icon = mealIcons[i];
              return (
                <label
                  key={meal.meal}
                  className="flex cursor-pointer items-center gap-4 rounded-2xl bg-card p-4 ring-1 ring-border/60"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-700">
                        <Bilingual en={meal.meal} ur={meal.mealUrdu} />
                      </p>
                      <span className="text-xs font-600 text-muted-foreground">{meal.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{meal.detail}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={!!done[i]}
                    onChange={(e) => setDone((p) => ({ ...p, [i]: e.target.checked }))}
                    className="h-5 w-5 shrink-0 accent-[color:var(--color-primary)]"
                  />
                </label>
              );
            })}
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Today's Progress" titleUrdu="آج کی پیشرفت">
            <div className="flex flex-col items-center">
              <RingChart value={progress} size={140} stroke={12} label={`${progress}%`} sublabel="Adherence" />
              <p className="mt-3 text-center text-sm text-muted-foreground">
                Keep following your plan for best recovery.
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Medicine Plan" titleUrdu="میڈیسن پلان" tone="cream">
            <div className="space-y-3">
              {medicinePlan.map((m) => (
                <div key={m.name} className="flex items-center gap-3 rounded-xl bg-card p-3.5 ring-1 ring-border/60">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Pill className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-600">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.detail}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-700",
                      m.schedule === "Night" ? "bg-cream text-cream-foreground" : "bg-sage text-sage-foreground",
                    )}
                  >
                    {m.schedule}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

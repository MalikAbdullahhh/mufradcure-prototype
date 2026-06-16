import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Beaker, RefreshCw, Clock, CalendarDays, AlertTriangle } from "lucide-react";
import { PageHeader, SectionCard } from "@/components/app-ui";
import { Bilingual } from "@/components/Bilingual";
import { cn } from "@/lib/utils";
import { medicines, MIZAAJ } from "@/lib/mock-data";

export const Route = createFileRoute("/_portal/medicines")({
  head: () => ({ meta: [{ title: "My Medicines — MufradCure" }] }),
  component: MedicinesPage,
});

function MedicinesPage() {
  const [activeId, setActiveId] = useState(medicines[0].id);
  const med = medicines.find((m) => m.id === activeId)!;

  return (
    <div>
      <PageHeader breadcrumb={["Patient Portal", "My Medicines"]} title="My Medicines" titleUrdu="میری ادویات" />

      <div className="mb-6 flex flex-wrap gap-2">
        {medicines.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveId(m.id)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-700 transition-all",
              m.id === activeId
                ? "bg-primary-deep text-primary-foreground shadow-soft"
                : "bg-card text-muted-foreground ring-1 ring-border/60 hover:bg-muted",
            )}
          >
            {m.name}
          </button>
        ))}
      </div>

      <motion.div
        key={med.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid gap-6 lg:grid-cols-2"
      >
        <div className="space-y-6">
          <SectionCard
            title={med.name}
            titleUrdu={med.urdu}
            subtitle={`Code ${med.code} · ${MIZAAJ[med.code].primary} · ${med.organ}`}
            tone="cream"
          >
            <p className="mb-3 text-sm font-700">Formula / ترکیب</p>
            <div className="grid grid-cols-2 gap-3">
              {med.formula.map((f) => (
                <div key={f.name} className="flex items-center justify-between rounded-xl bg-card px-4 py-3 ring-1 ring-border/60">
                  <span className="text-sm font-600">{f.name}</span>
                  <span className="font-700 text-primary">{f.grams}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Preparation" titleUrdu="تیاری">
            <ol className="space-y-3">
              {med.preparation.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-700 text-primary">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Dosage" titleUrdu="خوراک" tone="sage">
            <div className="grid grid-cols-2 gap-3">
              <Dose icon={Beaker} label="Amount" value={med.amount} />
              <Dose icon={RefreshCw} label="Frequency" value={med.frequency} />
              <Dose icon={Clock} label="Timing" value={med.timing} />
              <Dose icon={CalendarDays} label="Duration" value={med.duration} />
            </div>
          </SectionCard>

          <div className="rounded-3xl bg-rose p-5 ring-1 ring-rose-foreground/20">
            <p className="flex items-center gap-2 font-700 text-rose-foreground">
              <AlertTriangle className="h-4 w-4" /> <Bilingual en="Contraindications" ur="احتیاط" />
            </p>
            <p className="mt-2 text-sm leading-relaxed text-rose-foreground/90">{med.contraindications}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Dose({ icon: Icon, label, value }: { icon: typeof Beaker; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card px-4 py-3 ring-1 ring-border/60">
      <p className="flex items-center gap-1.5 text-[11px] font-700 uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <p className="mt-1 font-700">{value}</p>
    </div>
  );
}

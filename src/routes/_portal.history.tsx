import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Download, Link2, Salad, Activity } from "lucide-react";
import { PageHeader, SectionCard } from "@/components/app-ui";
import { RingChart } from "@/components/RingChart";
import { Bilingual } from "@/components/Bilingual";
import { cn } from "@/lib/utils";
import { sessions, dietRecommend, dietAvoid } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_portal/history")({
  head: () => ({ meta: [{ title: "My Diagnosis History — MufradCure" }] }),
  component: HistoryPage,
});

const statusTone: Record<string, string> = {
  Improved: "bg-sage text-sage-foreground",
  Stable: "bg-cream text-cream-foreground",
  Declined: "bg-rose text-rose-foreground",
};

function HistoryPage() {
  const [selectedId, setSelectedId] = useState(sessions[0].id);
  const [query, setQuery] = useState("");
  const filtered = sessions.filter(
    (s) =>
      s.diagnosis.toLowerCase().includes(query.toLowerCase()) ||
      s.date.toLowerCase().includes(query.toLowerCase()),
  );
  const selected = sessions.find((s) => s.id === selectedId)!;

  return (
    <div>
      <PageHeader
        breadcrumb={["Patient Portal", "My History"]}
        title="My Diagnosis History"
        titleUrdu="میری تشخیص کی تاریخ"
        actions={
          <button
            onClick={() => toast.success("Exporting PDF…")}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-600 text-muted-foreground hover:bg-muted"
          >
            <Download className="h-4 w-4" /> Export PDF
          </button>
        }
      />

      <div className="mb-6 flex items-center gap-2 rounded-2xl bg-card px-4 py-2.5 shadow-soft ring-1 ring-border/60">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by diagnosis, code, or date"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <SectionCard title="Session List" titleUrdu="سیشن لسٹ" subtitle={`${filtered.length} records`}>
          <div className="space-y-3">
            {filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={cn(
                  "w-full rounded-2xl p-4 text-left ring-1 transition-all",
                  s.id === selectedId
                    ? "bg-sage ring-primary/40"
                    : "bg-card ring-border/60 hover:bg-muted/50",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{s.date}</p>
                    <p className="font-700">
                      <Bilingual en={s.diagnosis} ur={s.diagnosisUrdu} />
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="rounded-full bg-muted px-2 py-0.5 font-600">Code {s.fromCode}</span>
                      <span>→</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 font-600">Code {s.toCode}</span>
                      <span className={cn("rounded-full px-2 py-0.5 font-700", statusTone[s.status])}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                  <RingChart value={s.confidence} size={48} stroke={5} label={`${s.confidence}%`} />
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title={`${selected.date} — ${selected.diagnosis}`}
          subtitle="Selected session details from your private history"
          tone="cream"
        >
          <div className="grid grid-cols-3 gap-3">
            <Detail label="Confidence" value={`${selected.confidence}%`} />
            <Detail label="Primary Organ" value={selected.primaryOrgan} />
            <Detail label="Status" value={selected.status} />
          </div>

          <div className="mt-5 rounded-2xl bg-sage p-4">
            <p className="flex items-center gap-2 text-sm font-700 text-sage-foreground">
              <Link2 className="h-4 w-4" /> Prescribed Medicine
            </p>
            <p className="mt-1 font-display text-lg font-700">
              <Bilingual en={selected.medicine} ur={selected.medicineUrdu} />
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-card p-4 ring-1 ring-border/60">
            <p className="flex items-center gap-2 text-sm font-700">
              <Salad className="h-4 w-4 text-primary" /> Diet Plan
            </p>
            <p className="mt-2 text-sm">
              <span className="font-700 text-primary">Recommended:</span>{" "}
              <span className="text-muted-foreground">{dietRecommend.join(", ")}</span>
            </p>
            <p className="mt-1 text-sm">
              <span className="font-700 text-rose-foreground">Avoid:</span>{" "}
              <span className="text-muted-foreground">{dietAvoid.join(", ")}</span>
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-card p-4 ring-1 ring-border/60">
            <p className="flex items-center gap-2 text-sm font-700">
              <Activity className="h-4 w-4 text-primary" /> Organ Status
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary-deep px-3 py-1 text-xs font-700 text-primary-foreground">
                Liver Active
              </span>
              <span className="rounded-full bg-cream px-3 py-1 text-xs font-700 text-cream-foreground">
                Stomach Watch
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-700">Nervous System Stable</span>
            </div>
          </div>
          <p className="mt-4 text-center text-xs italic text-muted-foreground">
            This record is private and visible only to you.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card px-3 py-3 ring-1 ring-border/60">
      <p className="text-[10px] font-700 uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-700">{value}</p>
    </div>
  );
}

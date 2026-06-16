import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Activity, Wind, Droplets, Hash, Plus, UserCheck, BadgeCheck, Stethoscope, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, SectionCard, ToggleRow } from "@/components/app-ui";
import { Bilingual } from "@/components/Bilingual";
import { cn } from "@/lib/utils";
import { patient, MIZAAJ } from "@/lib/mock-data";

export const Route = createFileRoute("/_portal/diagnosis/new")({
  head: () => ({ meta: [{ title: "New Diagnosis — MufradCure" }] }),
  component: NewDiagnosis,
});

interface Symptom {
  id: string;
  name: string;
  severity: number;
}

function severityColor(v: number) {
  if (v >= 8) return "var(--color-destructive)";
  if (v >= 5) return "var(--color-gold)";
  return "var(--color-primary)";
}

function NewDiagnosis() {
  const navigate = useNavigate();
  const m = MIZAAJ[patient.currentCode];

  const [nabz, setNabz] = useState<Record<string, string | null>>({
    Speed: "Normal",
    Strength: "Normal",
    Quality: "Regular",
    Depth: "Superficial",
    Length: "Normal",
    Volume: "Large",
  });
  const [zaban, setZaban] = useState<Record<string, string | null>>({
    Color: "Pink",
    Moisture: "Normal",
    Coating: "Thin",
  });
  const [boul, setBoul] = useState<Record<string, string | null>>({
    Color: "Yellow",
    Clarity: "Clear",
    Quantity: "Normal",
    Smell: "Normal",
    Foam: "No",
  });
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { id: "1", name: "Yellow Urine", severity: 7 },
    { id: "2", name: "Fatigue", severity: 4 },
    { id: "3", name: "Jaundice", severity: 9 },
  ]);
  const [newSymptom, setNewSymptom] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const set = (group: typeof setNabz) => (key: string) => (val: string) =>
    group((p) => ({ ...p, [key]: val }));

  const addSymptom = () => {
    if (!newSymptom.trim()) return;
    setSymptoms((p) => [...p, { id: Date.now().toString(), name: newSymptom.trim(), severity: 5 }]);
    setNewSymptom("");
  };

  const getDiagnosis = () => {
    if (!confirmed) {
      toast.error("Please confirm the entered findings are accurate.");
      return;
    }
    toast.success("Analyzing findings… diagnosis ready.");
    navigate({ to: "/diagnosis/results" });
  };

  return (
    <div className="pb-28">
      <PageHeader
        breadcrumb={["Dashboard", "New Diagnosis", "تشخیص جدید"]}
        title="New Diagnosis"
        actions={
          <button
            onClick={() => {
              setSymptoms([]);
              toast("Form cleared");
            }}
            className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-600 text-muted-foreground hover:bg-muted"
          >
            Clear Form
          </button>
        }
      />

      {/* identity banner */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-sage px-5 py-4 ring-1 ring-border/50">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
            <UserCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="font-700 text-sage-foreground">
              {patient.name} · Code {m.code}
            </p>
            <p className="text-xs text-sage-foreground/70">
              You are submitting this diagnosis for your own record only
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-3 py-1.5 text-xs font-700 text-primary">
          <BadgeCheck className="h-4 w-4" /> Patient identity verified
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Nabz */}
        <SectionCard icon={Activity} title="Nabz / نبض" subtitle="Pulse, rhythm & strength" tone="cream">
          <div className="space-y-4">
            <ToggleRow label="Speed" options={["Fast", "Normal", "Slow"]} value={nabz.Speed as string} onChange={set(setNabz)("Speed")} />
            <ToggleRow label="Strength" options={["Strong", "Normal", "Weak"]} value={nabz.Strength as string} onChange={set(setNabz)("Strength")} />
            <ToggleRow label="Quality" options={["Hard", "Soft", "Regular", "Irreg."]} value={nabz.Quality as string} onChange={set(setNabz)("Quality")} />
            <ToggleRow label="Depth" options={["Superficial", "Deep"]} value={nabz.Depth as string} onChange={set(setNabz)("Depth")} />
            <ToggleRow label="Length" options={["Short", "Normal", "Long"]} value={nabz.Length as string} onChange={set(setNabz)("Length")} />
            <ToggleRow label="Volume" options={["Small", "Normal", "Large"]} value={nabz.Volume as string} onChange={set(setNabz)("Volume")} />
          </div>
        </SectionCard>

        {/* Zaban */}
        <SectionCard icon={Wind} title="Zaban / زبان" subtitle="Tongue colour, moisture & coating" tone="cream">
          <div className="space-y-4">
            <ToggleRow label="Color" options={["Pink", "White-coated", "Yellow-coated", "Red", "Dark"]} value={zaban.Color as string} onChange={set(setZaban)("Color")} />
            <ToggleRow label="Moisture" options={["Wet", "Dry", "Normal"]} value={zaban.Moisture as string} onChange={set(setZaban)("Moisture")} />
            <ToggleRow label="Coating" options={["None", "Thin", "Thick"]} value={zaban.Coating as string} onChange={set(setZaban)("Coating")} />
          </div>
        </SectionCard>

        {/* Boul */}
        <SectionCard icon={Droplets} title="Boul / بول" subtitle="Urine colour & clarity assessment" tone="cream">
          <div className="space-y-4">
            <ToggleRow
              label="Color"
              options={["White", "Yellow", "Dk Yellow", "Red", "Dark"]}
              value={boul.Color as string}
              onChange={set(setBoul)("Color")}
              dots={{
                White: "oklch(0.97 0 0)",
                Yellow: "var(--color-gold)",
                "Dk Yellow": "oklch(0.6 0.13 75)",
                Red: "var(--color-destructive)",
                Dark: "oklch(0.3 0.02 60)",
              }}
            />
            <ToggleRow label="Clarity" options={["Clear", "Cloudy", "Turbid"]} value={boul.Clarity as string} onChange={set(setBoul)("Clarity")} />
            <ToggleRow label="Quantity" options={["Excessive", "Normal", "Reduced", "Absent"]} value={boul.Quantity as string} onChange={set(setBoul)("Quantity")} />
            <ToggleRow label="Smell" options={["Normal", "Foul", "Sweet"]} value={boul.Smell as string} onChange={set(setBoul)("Smell")} />
            <ToggleRow label="Foam" options={["Yes", "No"]} value={boul.Foam as string} onChange={set(setBoul)("Foam")} />
          </div>
        </SectionCard>

        {/* Symptoms */}
        <SectionCard icon={Hash} title="Symptoms / علامات" subtitle="Patient reported symptoms & severity" tone="cream">
          <div className="mb-4 flex gap-2">
            <input
              value={newSymptom}
              onChange={(e) => setNewSymptom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSymptom()}
              placeholder="Add symptom — track only your own"
              className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
            />
            <button
              onClick={addSymptom}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-700 text-primary-foreground"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          <div className="space-y-3">
            {symptoms.length === 0 && (
              <p className="rounded-xl bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
                No symptoms added yet.
              </p>
            )}
            {symptoms.map((s) => (
              <div key={s.id} className="rounded-xl bg-muted/70 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-sm font-600">
                    <span className="h-2 w-2 rounded-full" style={{ background: severityColor(s.severity) }} />
                    {s.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-700">{s.severity}</span>
                    <button
                      onClick={() => setSymptoms((p) => p.filter((x) => x.id !== s.id))}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Remove symptom"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={s.severity}
                  onChange={(e) =>
                    setSymptoms((p) =>
                      p.map((x) => (x.id === s.id ? { ...x, severity: Number(e.target.value) } : x)),
                    )
                  }
                  className="mt-2.5 w-full accent-[color:var(--color-primary)]"
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* confirmation */}
      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-card px-5 py-4 text-sm shadow-soft ring-1 ring-border/60">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--color-primary)]"
        />
        <span className="text-muted-foreground">
          By continuing, you confirm the entered findings are accurate and reviewed.{" "}
          <span dir="rtl" className="font-urdu">
            جاری رکھنے سے آپ تصدیق کرتے ہیں کہ درج کردہ نتائج درست ہیں۔
          </span>
        </span>
      </label>

      {/* sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/85 px-4 py-3 backdrop-blur lg:left-72">
        <div className="mx-auto flex max-w-[1280px] gap-3 lg:px-6">
          <button
            onClick={() => toast.success("Draft saved")}
            className="flex-1 rounded-xl bg-muted px-5 py-3.5 font-700 text-foreground transition-colors hover:bg-secondary sm:flex-none sm:px-10"
          >
            Save Draft
          </button>
          <button
            onClick={getDiagnosis}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-700 text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5",
              "bg-primary-deep",
            )}
          >
            <Stethoscope className="h-5 w-5" />
            <Bilingual en="Get Diagnosis" ur="تشخیص حاصل کریں" />
          </button>
        </div>
      </div>
    </div>
  );
}

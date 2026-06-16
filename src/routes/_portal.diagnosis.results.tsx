import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Save,
  Printer,
  Leaf,
  Route as RouteIcon,
  Stethoscope,
  Pill,
  Salad,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Beaker,
  RefreshCw,
  Clock,
  CalendarDays,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader, SectionCard } from "@/components/app-ui";
import { RingChart } from "@/components/RingChart";
import { Bilingual } from "@/components/Bilingual";
import { MIZAAJ, nextCode, medicines, dietRecommend, dietAvoid } from "@/lib/mock-data";

export const Route = createFileRoute("/_portal/diagnosis/results")({
  head: () => ({ meta: [{ title: "Diagnosis Results — MufradCure" }] }),
  component: Results,
});

function Results() {
  const code = 5 as const;
  const m = MIZAAJ[code];
  const next = nextCode(code);
  const med = medicines[0];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <PageHeader
        breadcrumb={["Dashboard", "New Diagnosis", "Results", "نتائج"]}
        title="Diagnosis Results"
        actions={
          <>
            <button
              onClick={() => toast.success("Saved to your record")}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-700 text-primary-foreground shadow-soft"
            >
              <Save className="h-4 w-4" /> <Bilingual en="Save to My Record" ur="محفوظ کریں" />
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-600 text-muted-foreground hover:bg-muted"
            >
              <Printer className="h-4 w-4" /> Print Report
            </button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mizaaj State */}
        <SectionCard icon={Leaf} title="Mizaaj State" titleUrdu="مزاج حالت" tone="cream">
          <div className="flex flex-col items-center text-center">
            <RingChart value={70} size={150} stroke={12} label={`Code ${code}`} color="var(--color-primary)" />
            <p className="mt-3 font-display text-lg font-700">{m.name}</p>
            <p dir="rtl" className="font-urdu text-muted-foreground">{m.urdu}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-primary-deep px-3 py-1 text-xs font-700 text-primary-foreground">
                Primary: {m.primary}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-sage px-3 py-1 text-xs font-700 text-sage-foreground">
                <TrendingUp className="h-3.5 w-3.5" /> Tehreek
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-xs font-700 text-cream-foreground">
                <TrendingDown className="h-3.5 w-3.5" /> Taskeen
              </span>
            </div>
          </div>
        </SectionCard>

        {/* Treatment Path */}
        <SectionCard icon={RouteIcon} title="Treatment Path" titleUrdu="علاج کا راستہ" tone="sage">
          <div className="flex items-center justify-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-deep font-700 text-primary-foreground">
              {code}
            </span>
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
            <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-gold bg-card font-700 text-gold-foreground">
              {next}
            </span>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs font-700 uppercase tracking-wide text-muted-foreground">Next Mizaaj Code</p>
            <p className="font-display text-xl font-700 text-gold-foreground">Code {next}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The treatment sequence advances from Code {code} to the next Mizaaj state, with the prescription
            aligned to Code {next} activation. Forward-only progression.
          </p>
          <p dir="rtl" className="font-urdu mt-2 text-sm text-muted-foreground">
            علاج کا راستہ اگلے مزاج کوڈ کی طرف بڑھتا ہے، اور نسخہ اسی ترتیب کے مطابق دکھایا گیا ہے۔
          </p>
        </SectionCard>

        {/* Diagnosis */}
        <SectionCard icon={Stethoscope} title="Diagnosis" titleUrdu="تشخیص">
          <div className="flex items-center gap-4">
            <RingChart value={87} size={110} stroke={11} label="87%" color="var(--color-primary)" />
            <div>
              <p className="font-display text-2xl font-700 leading-tight">Hepatitis</p>
              <p className="font-display text-lg font-600 text-muted-foreground">(Yarqaan)</p>
              <p dir="rtl" className="font-urdu text-muted-foreground">یرقان</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <span className="inline-block rounded-full bg-sage px-3 py-1 text-xs font-700 text-sage-foreground">
              High confidence
            </span>
            <p className="text-sm text-muted-foreground">Primary organ: <span className="font-600 text-foreground">Liver</span></p>
            <button className="w-full rounded-xl border border-border bg-muted/60 px-4 py-2.5 text-left text-sm font-600 text-muted-foreground hover:bg-muted">
              Other possibilities ›
            </button>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Prescribed medicine */}
        <SectionCard icon={Pill} title="Prescribed Medicines" titleUrdu="تجویز کردہ دوائیں" tone="cream">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-xl font-700">{med.name}</p>
            <p dir="rtl" className="font-urdu text-muted-foreground">{med.urdu}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <DoseTile icon={Beaker} label="Amount" labelUrdu="مقدار" value={med.amount} />
            <DoseTile icon={RefreshCw} label="Frequency" labelUrdu="تعداد" value={med.frequency} />
            <DoseTile icon={Clock} label="Timing" labelUrdu="وقت" value={med.timing} />
            <DoseTile icon={CalendarDays} label="Duration" labelUrdu="مدت" value={med.duration} />
          </div>
          <Link
            to="/medicines"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-700 text-primary hover:underline"
          >
            View Full Formula <ArrowRight className="h-4 w-4" />
          </Link>
        </SectionCard>

        {/* Diet plan */}
        <SectionCard icon={Salad} title="Diet Plan" titleUrdu="غذائی منصوبہ">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-700 text-primary">✓ Recommended</p>
              <div className="space-y-2">
                {dietRecommend.map((d) => (
                  <div key={d} className="rounded-xl bg-sage px-4 py-2.5 text-sm font-600 text-sage-foreground">
                    {d}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-700 text-rose-foreground">✕ Avoid</p>
              <div className="space-y-2">
                {dietAvoid.map((d) => (
                  <div key={d} className="rounded-xl bg-rose px-4 py-2.5 text-sm font-600 text-rose-foreground">
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <p className="mt-6 rounded-2xl bg-cream px-5 py-4 text-center text-sm text-cream-foreground">
        ⚠ This is an assistive assessment. Always consult a qualified Hakeem before starting any treatment.
      </p>
    </motion.div>
  );
}

function DoseTile({
  icon: Icon,
  label,
  labelUrdu,
  value,
}: {
  icon: typeof Beaker;
  label: string;
  labelUrdu: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-sage/70 px-4 py-3">
      <p className="flex items-center gap-1.5 text-[11px] font-700 uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <p className="mt-1 font-700">{value}</p>
      <p dir="rtl" className="font-urdu text-xs text-muted-foreground">{labelUrdu}</p>
    </div>
  );
}

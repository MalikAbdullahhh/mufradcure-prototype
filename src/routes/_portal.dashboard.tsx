import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Plus, Pill, ArrowUpRight } from "lucide-react";
import { PageHeader, SectionCard, StatTile } from "@/components/app-ui";
import { TreatmentPath } from "@/components/TreatmentPath";
import { Bilingual } from "@/components/Bilingual";
import { cn } from "@/lib/utils";
import { patient, sessions, MIZAAJ, nextCode } from "@/lib/mock-data";

export const Route = createFileRoute("/_portal/dashboard")({
  head: () => ({ meta: [{ title: "Patient Dashboard — MufradCure" }] }),
  component: Dashboard,
});

const statusTone: Record<string, string> = {
  Improved: "bg-sage text-sage-foreground",
  Stable: "bg-cream text-cream-foreground",
  Declined: "bg-rose text-rose-foreground",
};

function Dashboard() {
  const m = MIZAAJ[patient.currentCode];
  return (
    <div>
      <PageHeader
        breadcrumb={["Patient Portal", "Dashboard"]}
        title={`Assalamu Alaikum, ${patient.name}`}
        titleUrdu="خوش آمدید"
        actions={
          <Link
            to="/diagnosis/new"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-700 text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" /> New Diagnosis
          </Link>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        <StatTile value={patient.totalSessions} label="My Total Sessions" labelUrdu="کل سیشنز" />
        <StatTile value={`Code ${m.code}`} sub={m.name} label="Current Mizaaj" labelUrdu="موجودہ مزاج" accent />
        <StatTile value={patient.recoveries} label="Confirmed Recoveries" labelUrdu="تصدیق شدہ صحت یابی" />
        <StatTile value="Ongoing" label="Active Treatment" labelUrdu="جاری علاج" />
      </motion.div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <SectionCard title="Recent Diagnoses" titleUrdu="حالیہ تشخیص" subtitle="Your latest diagnosis sessions">
          <div className="-mx-2 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-left text-xs font-700 uppercase tracking-wide text-muted-foreground">
                  <th className="px-2 pb-3">Date</th>
                  <th className="px-2 pb-3">Diagnosis</th>
                  <th className="px-2 pb-3">Path</th>
                  <th className="px-2 pb-3">Conf.</th>
                  <th className="px-2 pb-3">Status</th>
                  <th className="px-2 pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id} className="border-t border-border/70">
                    <td className="whitespace-nowrap px-2 py-3 text-muted-foreground">{s.date}</td>
                    <td className="px-2 py-3 font-600">
                      <Bilingual en={s.diagnosis} ur={s.diagnosisUrdu} />
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 text-muted-foreground">
                      {s.fromCode} → {s.toCode}
                    </td>
                    <td className="px-2 py-3 font-700">{s.confidence}%</td>
                    <td className="px-2 py-3">
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-700", statusTone[s.status])}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-right">
                      <Link
                        to="/history"
                        className="inline-flex items-center gap-1 text-xs font-700 text-primary hover:underline"
                      >
                        View <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="My Treatment Path" titleUrdu="علاج کا راستہ" tone="sage">
            <TreatmentPath current={patient.currentCode} next={nextCode(patient.currentCode)} />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Current <span className="font-700 text-foreground">Code {patient.currentCode}</span> · Next{" "}
              <span className="font-700 text-primary">Code {nextCode(patient.currentCode)}</span>
            </p>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              Forward-only treatment progression
            </p>
          </SectionCard>

          <SectionCard title="Quick Actions" titleUrdu="فوری اقدامات">
            <div className="space-y-3">
              <Link
                to="/diagnosis/new"
                className="flex items-center gap-3 rounded-xl bg-primary-deep px-4 py-3.5 font-700 text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <Plus className="h-5 w-5" />
                <Bilingual en="New Diagnosis" ur="نئی تشخیص" />
              </Link>
              <Link
                to="/medicines"
                className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3.5 font-700 text-foreground transition-colors hover:bg-secondary"
              >
                <Pill className="h-5 w-5" />
                <Bilingual en="View My Medicines" ur="میری ادویات دیکھیں" />
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

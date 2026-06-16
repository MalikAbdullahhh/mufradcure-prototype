import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { Home, Plus, History, Pill, Salad, Settings, ShieldCheck } from "lucide-react";
import { SidebarLayout, type NavItem } from "@/components/SidebarLayout";
import { patient } from "@/lib/mock-data";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "New Diagnosis", to: "/diagnosis/new", icon: Plus },
  { label: "My History", to: "/history", icon: History },
  { label: "My Medicines", to: "/medicines", icon: Pill },
  { label: "My Diet Plan", to: "/diet", icon: Salad },
  { label: "Settings", to: "/settings", icon: Settings },
];

export const Route = createFileRoute("/_portal")({
  component: PortalLayout,
});

function PortalLayout() {
  return (
    <SidebarLayout
      subtitle="Patient Portal"
      subtitleUrdu="مریض پورٹل"
      nav={nav}
      footer={
        <div className="space-y-3">
          <div className="rounded-2xl bg-sidebar-border/40 p-4">
            <p className="flex items-center gap-1.5 text-xs font-700 uppercase tracking-wide text-sidebar-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> Private patient data
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-sidebar-muted">
              Only your own diagnosis history, medicines, and diet plans are visible here.
            </p>
          </div>
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-2xl bg-sidebar-border/30 p-3 transition-colors hover:bg-sidebar-border/60"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sidebar-accent font-700 text-sidebar-accent-foreground">
              {patient.name.charAt(0)}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-700 text-sidebar-foreground">{patient.name}</p>
              <p className="truncate text-xs text-sidebar-muted">Patient · {patient.id}</p>
            </div>
          </Link>
        </div>
      }
    >
      <Outlet />
    </SidebarLayout>
  );
}

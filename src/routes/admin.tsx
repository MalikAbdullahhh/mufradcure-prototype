import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import {
  LayoutGrid,
  Search,
  BarChart3,
  Activity,
  FlaskConical,
  ClipboardList,
  ScrollText,
  Settings,
  LogOut,
} from "lucide-react";
import { SidebarLayout, type NavItem } from "@/components/SidebarLayout";
import { admin } from "@/lib/mock-data";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutGrid, exact: true },
  { label: "Patient Search", to: "/admin/patients", icon: Search },
  { label: "System Statistics", to: "/admin/statistics", icon: BarChart3 },
  { label: "ML Model Health", to: "/admin/ml-health", icon: Activity },
  { label: "Medicine Mgmt", to: "/admin/medicines", icon: FlaskConical },
  { label: "Disease Records", to: "/admin/diseases", icon: ClipboardList },
  { label: "System Logs", to: "/admin/logs", icon: ScrollText },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <SidebarLayout
      subtitle="Admin Portal"
      subtitleUrdu="ایڈمن پورٹل"
      nav={nav}
      footer={
        <div className="space-y-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-600 text-sidebar-foreground/85 transition-colors hover:bg-sidebar-border/60"
          >
            <LogOut className="h-[18px] w-[18px]" /> Logout
          </Link>
          <div className="flex items-center gap-3 rounded-2xl bg-sidebar-border/30 p-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sidebar-accent font-700 text-sidebar-accent-foreground">
              {admin.name.split(" ")[1]?.charAt(0) ?? "A"}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-700 text-sidebar-foreground">{admin.name}</p>
              <p className="truncate text-xs text-sidebar-muted">{admin.role}</p>
            </div>
          </div>
        </div>
      }
    >
      <Outlet />
    </SidebarLayout>
  );
}

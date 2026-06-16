import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandLockup } from "@/components/Brand";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  exact?: boolean;
}

interface SidebarLayoutProps {
  subtitle: string;
  subtitleUrdu?: string;
  nav: NavItem[];
  footer?: ReactNode;
  children: ReactNode;
}

export function SidebarLayout({ subtitle, subtitleUrdu, nav, footer, children }: SidebarLayoutProps) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const NavLinks = () => (
    <nav className="flex flex-col gap-1.5">
      {nav.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-600 transition-all",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                : "text-sidebar-foreground/85 hover:bg-sidebar-border/60 hover:text-sidebar-foreground",
            )}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  const SidebarBody = () => (
    <div className="flex h-full flex-col gap-6 p-5">
      <BrandLockup subtitle={subtitle} subtitleUrdu={subtitleUrdu} tone="dark" />
      <div className="flex-1 overflow-y-auto">
        <NavLinks />
      </div>
      {footer && <div className="shrink-0">{footer}</div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-app-gradient">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-72 bg-sidebar-gradient lg:block">
        <SidebarBody />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur lg:hidden">
        <BrandLockup subtitle={subtitle} subtitleUrdu={subtitleUrdu} />
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-sidebar-gradient animate-in slide-in-from-left duration-300">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-border/60"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarBody />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}

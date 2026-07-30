import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { LayoutDashboard, Printer, Droplets, Truck, Settings, FileText } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: AppLayout,
});

const NAV = [
  { to: "/", label: "لوحة التحكم", icon: LayoutDashboard, exact: true },
  { to: "/printers", label: "الطابعات", icon: Printer, exact: false },
  { to: "/toners", label: "مخزون الأحبار", icon: Droplets, exact: false },
  { to: "/suppliers", label: "الموردون", icon: Truck, exact: false },
  { to: "/reports", label: "التقارير", icon: FileText, exact: false },
  { to: "/settings", label: "الإعدادات", icon: Settings, exact: false },
] as const;

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="no-print sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3 px-6 py-6">
          <span className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground"><Printer className="size-5" /></span>
          <div><p className="text-sm font-bold leading-tight">إدارة الطابعات</p><p className="text-xs text-sidebar-foreground/60">لوحة التحكم</p></div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => <Link key={item.to} to={item.to} activeOptions={{ exact: item.exact }} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-primary data-[status=active]:text-sidebar-primary-foreground"><item.icon className="size-4" />{item.label}</Link>)}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print flex items-center gap-2 overflow-x-auto border-b bg-card px-4 py-2 lg:hidden">
          {NAV.map((item) => <Link key={item.to} to={item.to} activeOptions={{ exact: item.exact }} className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground">{item.label}</Link>)}
        </header>
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8"><Outlet /></main>
      </div>
    </div>
  );
}

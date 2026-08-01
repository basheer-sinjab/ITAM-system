import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { daysUntil, formatDate } from "@/lib/pms";
import { AlertTriangle, Boxes, ClipboardCheck, KeyRound, Monitor, Sparkles, Wrench } from "lucide-react";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم — PrintersFloss" },
      {
        name: "description",
        content: "نظرة عامة على الأصول والصيانة والمخزون والتراخيص.",
      },
      { property: "og:title", content: "لوحة التحكم — PrintersFloss" },
      { property: "og:description", content: "إحصائيات الأصول والصيانة والمخزون والتراخيص." },
    ],
  }),
  component: Dashboard,
});

function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const [assets, assetMaintenance, inventory, licenses] = await Promise.all([
        supabase.from("assets").select("*"),
        supabase.from("asset_maintenance").select("*").order("maintenance_date", { ascending: false }),
        supabase.from("inventory_items").select("*"),
        supabase.from("licenses").select("*"),
      ]);
      return {
        assets: assets.data ?? [],
        assetMaintenance: assetMaintenance.data ?? [],
        inventory: inventory.data ?? [],
        licenses: licenses.data ?? [],
      };
    },
  });
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  tone?: "primary" | "warning" | "destructive" | "muted" | "success";
}) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    warning: "bg-warning/20 text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive",
    muted: "bg-muted text-muted-foreground",
    success: "bg-success/15 text-success",
  };
  return (
    <div className="surface-panel interactive-card flex items-center gap-4 p-5 hover:interactive-card-hover">
      <span className={`flex size-12 items-center justify-center rounded-2xl ${tones[tone]}`}>
        <Icon className="size-5" strokeWidth={2.2} />
      </span>
      <div>
        <p className="text-3xl font-bold leading-none tracking-tight">{value}</p>
        <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-sidebar px-6 py-7 text-sidebar-foreground shadow-float sm:px-8 sm:py-8">
      <div className="absolute -left-14 -top-16 size-52 rounded-full bg-sidebar-primary/20 blur-3xl" />
      <div className="absolute -bottom-20 right-1/3 size-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-sidebar-foreground/80">
            <Sparkles className="size-3.5 text-sidebar-primary" />
            نظرة تشغيلية مباشرة
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">إدارة أصول تقنية بسيطة وواضحة.</h2>
          <p className="mt-2 max-w-2xl text-sm text-sidebar-foreground/65">تابع الأصول والمخزون والصيانة والتراخيص من مكان واحد.</p>
        </div>
        <Monitor className="size-20 text-sidebar-primary" aria-hidden="true" />
      </div>
    </section>
  );
}

function Dashboard() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) {
    return <p className="text-muted-foreground">جارٍ التحميل…</p>;
  }

  const { assets, assetMaintenance, inventory, licenses } = data;
  const lowStock = inventory.filter((item) => item.quantity <= item.minimum_quantity);
  const expiringLicenses = licenses.filter((license) => {
    const days = daysUntil(license.expiration_date);
    return days !== null && days >= 0 && days <= 30;
  });
  const assetName = (assetId: string) => assets.find((asset) => asset.id === assetId)?.name ?? "—";

  return (
    <div className="mx-auto max-w-7xl space-y-9">
      <header>
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <p className="text-sm text-muted-foreground">نظرة عامة على أصول تقنية المعلومات في الشركة</p>
      </header>

      <DashboardHero />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Link to="/assets" className="block">
          <StatCard label="إجمالي الأصول" value={assets.length} icon={Monitor} />
        </Link>
        <StatCard label="الأصول المعيّنة" value={assets.filter((asset) => asset.assigned_employee_id).length} icon={ClipboardCheck} tone="success" />
        <StatCard label="صيانة مفتوحة" value={assetMaintenance.filter((record) => record.status === "Open").length} icon={Wrench} tone="warning" />
        <StatCard label="عناصر منخفضة" value={lowStock.length} icon={Boxes} tone="destructive" />
        <StatCard label="تراخيص تنتهي قريبًا" value={expiringLicenses.length} icon={KeyRound} tone="warning" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">آخر سجلات الصيانة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assetMaintenance.length === 0 && <p className="text-sm text-muted-foreground">لا توجد سجلات.</p>}
            {assetMaintenance.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-start justify-between gap-3 border-b pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium">
                    {assetName(m.asset_id)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {m.maintenance_type} — {m.problem_description || "بدون وصف"}
                  </p>
                </div>
                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {formatDate(m.maintenance_date)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">تنبيهات المخزون والتراخيص</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStock.length === 0 && expiringLicenses.length === 0 && <p className="text-sm text-muted-foreground">لا توجد تنبيهات.</p>}
            {lowStock.map((item) => <div key={item.id} className="flex items-center justify-between border-b pb-3 text-sm"><span>{item.name}</span><span className="text-destructive">مخزون منخفض: {item.quantity}</span></div>)}
            {expiringLicenses.map((license) => <div key={license.id} className="flex items-center justify-between border-b pb-3 text-sm"><span>{license.license_name}</span><span className="text-warning-foreground">ينتهي: {formatDate(license.expiration_date)}</span></div>)}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

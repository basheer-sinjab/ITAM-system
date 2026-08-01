import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  KeyRound,
  Monitor,
  Package,
  Plus,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";
import { DashboardDeviceScene } from "@/components/DashboardDeviceScene";
import { supabase } from "@/integrations/supabase/client";
import { daysUntil, formatDate } from "@/lib/pms";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({ meta: [{ title: "لوحة التحكم — PrintersFloss" }, { name: "description", content: "نظرة تشغيلية على أصول تقنية المعلومات." }] }),
  component: Dashboard,
});

function Dashboard() {
  const { data, isLoading } = useDashboard();
  if (isLoading || !data) return <p className="text-muted-foreground">جارٍ تحميل لوحة التحكم...</p>;

  const { assets, maintenance, inventory, licenses } = data;
  const assignedAssets = assets.filter((asset: any) => asset.assigned_employee_id).length;
  const openMaintenance = maintenance.filter((record: any) => record.status === "Open").length;
  const lowStock = inventory.filter((item: any) => Number(item.quantity) <= 3);
  const expiringLicenses = licenses.filter((license: any) => {
    const remaining = daysUntil(license.expiration_date);
    return remaining !== null && remaining >= 0 && remaining <= 30;
  });
  const activeAssets = assets.filter((asset: any) => asset.status === "active").length;
  const assetName = (assetId: string) => assets.find((asset: any) => asset.id === assetId)?.name ?? "أصل غير معروف";
  const healthPercent = assets.length ? Math.round((activeAssets / assets.length) * 100) : 100;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="overflow-hidden rounded-lg border bg-sidebar text-sidebar-foreground shadow-float">
        <div className="grid items-center gap-2 px-6 py-6 sm:px-8 lg:grid-cols-[1fr_22rem] lg:py-4">
          <div className="py-2">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-sidebar-foreground/80">
              <Clock3 className="size-3.5" />
              تحديث مباشر للعمليات التقنية
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl">إدارة أصول تقنية</h1>
            <p className="mt-2 max-w-xl text-sm text-sidebar-foreground/75">متابعة واضحة للأجهزة والصيانة والمخزون والتراخيص من نقطة واحدة.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/assets" className="inline-flex items-center gap-2 rounded-md bg-sidebar-primary px-3 py-2 text-sm font-medium text-sidebar-primary-foreground"><Monitor className="size-4" />استعراض الأصول</Link>
              <Link to="/maintenance" className="inline-flex items-center gap-2 rounded-md border border-white/25 px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-white/10"><Wrench className="size-4" />سجل الصيانة</Link>
            </div>
          </div>
          <DashboardDeviceScene />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <DashboardCard to="/assets" icon={Monitor} label="إجمالي الأصول" value={assets.length} detail="عرض جميع الأجهزة" tone="blue" />
        <DashboardCard to="/assets" icon={ClipboardCheck} label="أصول معيّنة" value={assignedAssets} detail="مرتبطة بموظفين" tone="emerald" />
        <DashboardCard to="/maintenance" icon={Wrench} label="صيانة مفتوحة" value={openMaintenance} detail="تحتاج متابعة" tone="amber" />
        <DashboardCard to="/inventory" icon={Package} label="مخزون منخفض" value={lowStock.length} detail="كمية 3 أو أقل" tone="rose" />
        <DashboardCard to="/licenses" icon={KeyRound} label="تراخيص قريبة" value={expiringLicenses.length} detail="تنتهي خلال 30 يوماً" tone="amber" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="surface-panel overflow-hidden">
          <div className="flex items-center justify-between border-b p-5">
            <div className="flex items-center gap-2"><Wrench className="size-5 text-primary" /><div><h2 className="font-semibold">آخر أعمال الصيانة</h2><p className="text-xs text-muted-foreground">السجلات الأحدث على الأصول</p></div></div>
            <Link to="/maintenance" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">عرض الكل<ArrowLeft className="size-4" /></Link>
          </div>
          {maintenance.length ? <div className="divide-y">{maintenance.slice(0, 5).map((record: any) => <Link key={record.id} to="/maintenance" className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/50"><div className="flex min-w-0 items-center gap-3"><span className={`flex size-9 shrink-0 items-center justify-center rounded-md ${record.status === "Open" ? "bg-amber-500/10 text-amber-700" : "bg-emerald-500/10 text-emerald-700"}`}><Wrench className="size-4" /></span><div className="min-w-0"><p className="truncate text-sm font-medium">{assetName(record.asset_id)}</p><p className="truncate text-xs text-muted-foreground">{record.problem_description || record.maintenance_type || "بدون وصف"}</p></div></div><div className="shrink-0 text-left"><span className={record.status === "Open" ? "rounded-md bg-amber-500/10 px-2 py-1 text-xs text-amber-700" : "rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700"}>{record.status === "Open" ? "مفتوحة" : "مغلقة"}</span><p className="mt-1 text-xs text-muted-foreground">{formatDate(record.maintenance_date)}</p></div></Link>)}</div> : <EmptyPanel icon={Wrench} title="لا توجد أعمال صيانة مسجلة" description="ستظهر هنا آخر الأعمال فور إنشاء سجل صيانة." to="/maintenance" action="إضافة سجل صيانة" />}
        </div>

        <div className="surface-panel p-5">
          <div className="flex items-center gap-2"><ShieldCheck className="size-5 text-primary" /><div><h2 className="font-semibold">صحة بيئة التقنية</h2><p className="text-xs text-muted-foreground">مؤشر سريع للأصول النشطة</p></div></div>
          <div className="mt-7 flex items-end justify-between"><div><p className="text-4xl font-bold">{healthPercent}%</p><p className="mt-1 text-sm text-muted-foreground">أصول نشطة</p></div><span className="flex size-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700"><CheckCircle2 className="size-6" /></span></div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${healthPercent}%` }} /></div>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t pt-5"><div><p className="text-lg font-semibold">{activeAssets}</p><p className="text-xs text-muted-foreground">نشطة</p></div><div><p className="text-lg font-semibold">{Math.max(0, assets.length - activeAssets)}</p><p className="text-xs text-muted-foreground">تحتاج مراجعة</p></div></div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="surface-panel overflow-hidden">
          <div className="flex items-center justify-between border-b p-5"><div className="flex items-center gap-2"><AlertTriangle className="size-5 text-amber-700" /><h2 className="font-semibold">تنبيهات تحتاج انتباه</h2></div><span className="rounded-md bg-amber-500/10 px-2 py-1 text-xs text-amber-700">{lowStock.length + expiringLicenses.length} تنبيه</span></div>
          <div className="divide-y">{lowStock.slice(0, 3).map((item: any) => <Link key={item.id} to="/inventory" className="flex items-center justify-between gap-3 p-4 hover:bg-muted/50"><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-md bg-rose-500/10 text-rose-700"><Package className="size-4" /></span><span className="text-sm font-medium">{item.name}</span></div><span className="text-xs text-rose-700">المتوفر: {item.quantity}</span></Link>)}{expiringLicenses.slice(0, 3).map((license: any) => <Link key={license.id} to="/licenses/$id" params={{ id: license.id }} className="flex items-center justify-between gap-3 p-4 hover:bg-muted/50"><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-md bg-amber-500/10 text-amber-700"><KeyRound className="size-4" /></span><span className="text-sm font-medium">{license.license_name}</span></div><span className="text-xs text-amber-700">{formatDate(license.expiration_date)}</span></Link>)}{!lowStock.length && !expiringLicenses.length && <EmptyPanel icon={CheckCircle2} title="لا توجد تنبيهات حالياً" description="المخزون والتراخيص في وضع مستقر." />}</div>
        </div>

        <div className="surface-panel p-5">
          <div className="flex items-center gap-2"><Plus className="size-5 text-primary" /><div><h2 className="font-semibold">إجراءات سريعة</h2><p className="text-xs text-muted-foreground">اختصارات لأكثر العمليات استخداماً</p></div></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <QuickAction to="/assets" icon={Monitor} title="إضافة أصل" description="تسجيل جهاز جديد" />
            <QuickAction to="/maintenance" icon={Wrench} title="سجل صيانة" description="توثيق عمل فني" />
            <QuickAction to="/inventory" icon={Boxes} title="إدارة المخزون" description="المستهلكات وقطع الغيار" />
            <QuickAction to="/people-departments" icon={UserRound} title="الموظفون" description="إدارة الأشخاص والأقسام" />
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardCard({ to, icon: Icon, label, value, detail, tone }: { to: "/assets" | "/maintenance" | "/inventory" | "/licenses"; icon: React.ElementType; label: string; value: number; detail: string; tone: "blue" | "emerald" | "amber" | "rose" }) {
  const tones = { blue: "bg-primary/10 text-primary", emerald: "bg-emerald-500/10 text-emerald-700", amber: "bg-amber-500/10 text-amber-700", rose: "bg-rose-500/10 text-rose-700" };
  return <Link to={to} className="surface-panel interactive-card group block p-4 hover:interactive-card-hover"><div className="flex items-start justify-between"><span className={`flex size-10 items-center justify-center rounded-lg ${tones[tone]}`}><Icon className="size-5" /></span><ArrowLeft className="size-4 text-muted-foreground transition-transform group-hover:-translate-x-1" /></div><p className="mt-5 text-3xl font-bold">{value}</p><p className="mt-1 text-sm font-medium">{label}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></Link>;
}

function QuickAction({ to, icon: Icon, title, description }: { to: "/assets" | "/maintenance" | "/inventory" | "/people-departments"; icon: React.ElementType; title: string; description: string }) {
  return <Link to={to} className="interactive-card flex items-center gap-3 rounded-lg border p-3 hover:interactive-card-hover"><span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon className="size-4" /></span><div><p className="text-sm font-medium">{title}</p><p className="text-xs text-muted-foreground">{description}</p></div></Link>;
}

function EmptyPanel({ icon: Icon, title, description, to, action }: { icon: React.ElementType; title: string; description: string; to?: "/maintenance"; action?: string }) {
  const content = <div className="flex flex-col items-center justify-center gap-2 px-5 py-9 text-center"><span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground"><Icon className="size-5" /></span><p className="text-sm font-medium">{title}</p><p className="max-w-xs text-xs text-muted-foreground">{description}</p>{action && <span className="mt-1 text-xs font-medium text-primary">{action}</span>}</div>;
  return to ? <Link to={to} className="block hover:bg-muted/50">{content}</Link> : content;
}

function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const [assets, maintenance, inventory, licenses] = await Promise.all([
        supabase.from("assets").select("*"),
        supabase.from("asset_maintenance").select("*").order("maintenance_date", { ascending: false }),
        supabase.from("inventory_items").select("*"),
        supabase.from("licenses").select("*"),
      ]);
      return { assets: assets.data ?? [], maintenance: maintenance.data ?? [], inventory: inventory.data ?? [], licenses: licenses.data ?? [] };
    },
  });
}

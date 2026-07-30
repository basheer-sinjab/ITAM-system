import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PrinterImage } from "@/components/PrinterImage";
import {
  PRINTER_STATUS,
  STATUS_CLASS,
  formatDate,
  daysUntil,
  MAINTENANCE_TYPES,
  type PrinterStatus,
} from "@/lib/pms";
import {
  Printer,
  Wrench,
  CircleSlash,
  Archive,
  Droplets,
  AlertTriangle,
  Star,
  ShieldAlert,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم — نظام إدارة الطابعات" },
      {
        name: "description",
        content: "نظرة عامة على حالة الطابعات ومخزون الأحبار وآخر عمليات الصيانة والتنبيهات.",
      },
      { property: "og:title", content: "لوحة التحكم — نظام إدارة الطابعات" },
      { property: "og:description", content: "إحصائيات الطابعات والأحبار والتنبيهات الداخلية." },
    ],
  }),
  component: Dashboard,
});

function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const [printers, toners, maintenance, replacements, settings] = await Promise.all([
        supabase.from("printers").select("*").order("created_at", { ascending: false }),
        supabase.from("toners").select("*").order("name"),
        supabase
          .from("maintenance_records")
          .select("*, printers(name, asset_id)")
          .order("service_date", { ascending: false })
          .limit(5),
        supabase
          .from("toner_replacements")
          .select("*, printers(name, asset_id), toner_replacement_items(*)")
          .order("change_date", { ascending: false })
          .limit(5),
        supabase.from("app_settings").select("*").maybeSingle(),
      ]);
      return {
        printers: printers.data ?? [],
        toners: toners.data ?? [],
        maintenance: maintenance.data ?? [],
        replacements: replacements.data ?? [],
        settings: settings.data,
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
    <div className="surface-panel flex items-center gap-4 p-5">
      <span className={`flex size-11 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-2xl font-bold leading-none">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) {
    return <p className="text-muted-foreground">جارٍ التحميل…</p>;
  }

  const { printers, toners, maintenance, replacements, settings } = data;
  const threshold = settings?.low_stock_threshold ?? 2;
  const warrantyDays = settings?.warranty_alert_days ?? 30;

  const count = (s: PrinterStatus) => printers.filter((p) => p.status === s).length;
  const lowStock = toners.filter((t) => t.quantity > 0 && t.quantity <= Math.max(t.min_quantity, threshold));
  const outOfStock = toners.filter((t) => t.quantity <= 0);
  const favorites = printers.filter((p) => p.is_favorite);

  const expired = printers.filter((p) => {
    const d = daysUntil(p.warranty_expiry);
    return d !== null && d < 0 && p.status !== "retired";
  });
  const expiring = printers.filter((p) => {
    const d = daysUntil(p.warranty_expiry);
    return d !== null && d >= 0 && d <= warrantyDays;
  });

  const alertsOn = settings?.dashboard_alerts_enabled ?? true;
  const alerts = alertsOn
    ? [
        ...outOfStock.map((t) => ({ tone: "destructive", text: `الحبر "${t.name}" نفد من المخزون` })),
        ...lowStock.map((t) => ({
          tone: "warning",
          text: `مخزون الحبر "${t.name}" منخفض (${t.quantity} متبقٍ)`,
        })),
        ...expired.map((p) => ({ tone: "destructive", text: `انتهى ضمان الطابعة ${p.name} (${p.asset_id})` })),
        ...expiring.map((p) => ({
          tone: "warning",
          text: `ضمان الطابعة ${p.name} ينتهي خلال ${daysUntil(p.warranty_expiry)} يومًا`,
        })),
      ]
    : [];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <p className="text-sm text-muted-foreground">نظرة عامة على أصول الطباعة في الشركة</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="إجمالي الطابعات" value={printers.length} icon={Printer} />
        <StatCard label="طابعات نشطة" value={count("active")} icon={Printer} tone="success" />
        <StatCard label="تحت الصيانة" value={count("maintenance")} icon={Wrench} tone="warning" />
        <StatCard label="خارج الخدمة" value={count("out_of_service")} icon={CircleSlash} tone="destructive" />
        <StatCard label="مؤرشفة" value={count("retired")} icon={Archive} tone="muted" />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="أنواع الأحبار" value={toners.length} icon={Droplets} />
        <StatCard label="أحبار منخفضة" value={lowStock.length} icon={AlertTriangle} tone="warning" />
        <StatCard label="أحبار نفدت" value={outOfStock.length} icon={ShieldAlert} tone="destructive" />
      </section>

      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="size-4 text-warning" />
              التنبيهات ({alerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.slice(0, 12).map((a, i) => (
              <div
                key={i}
                className={`rounded-lg border px-3 py-2 text-sm ${
                  a.tone === "destructive"
                    ? "border-destructive/30 bg-destructive/10 text-destructive"
                    : "border-warning/40 bg-warning/15 text-warning-foreground"
                }`}
              >
                {a.text}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {favorites.length > 0 && (
        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Star className="size-4 fill-warning text-warning" />
            الطابعات المفضلة
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {favorites.map((p) => (
              <Link
                key={p.id}
                to="/printers/$id"
                params={{ id: p.id }}
                className="surface-panel overflow-hidden transition-shadow hover:shadow-float"
              >
                <PrinterImage path={p.image_url} alt={p.name} className="h-32 w-full" />
                <div className="space-y-1 p-4">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.model ?? "—"} · {p.asset_id}
                  </p>
                  <Badge variant="outline" className={STATUS_CLASS[p.status as PrinterStatus]}>
                    {PRINTER_STATUS[p.status as PrinterStatus]}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">آخر عمليات الصيانة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {maintenance.length === 0 && <p className="text-sm text-muted-foreground">لا توجد سجلات.</p>}
            {maintenance.map((m) => (
              <div key={m.id} className="flex items-start justify-between gap-3 border-b pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium">
                    {m.printers?.name} <span className="text-muted-foreground">({m.printers?.asset_id})</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {MAINTENANCE_TYPES[m.maintenance_type as keyof typeof MAINTENANCE_TYPES]} —{" "}
                    {m.description || "بدون وصف"}
                  </p>
                </div>
                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {formatDate(m.service_date)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">آخر عمليات تغيير الأحبار</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {replacements.length === 0 && <p className="text-sm text-muted-foreground">لا توجد سجلات.</p>}
            {replacements.map((r) => (
              <div key={r.id} className="flex items-start justify-between gap-3 border-b pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium">
                    {r.printers?.name} <span className="text-muted-foreground">({r.printers?.asset_id})</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(r.toner_replacement_items ?? [])
                      .map((i) => `${i.toner_name} ×${i.quantity}`)
                      .join("، ") || "—"}
                  </p>
                </div>
                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {formatDate(r.change_date)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FileBarChart, Printer, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ManagementHeader } from "@/components/ManagementVisuals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/pms";

export const Route = createFileRoute("/_authenticated/reports")({
  component: ReportsPage,
});
type Kind = "assets" | "maintenance" | "inventory" | "licenses";

const REPORTS: Record<Kind, { label: string; headers: string[] }> = {
  assets: {
    label: "الأصول",
    headers: [
      "رقم الأصل",
      "الاسم",
      "النوع",
      "الحالة",
      "القسم",
      "الموظف",
      "انتهاء الضمان",
    ],
  },
  maintenance: {
    label: "الصيانة",
    headers: ["الأصل", "التاريخ", "النوع", "الحالة", "الفني", "الحل"],
  },
  inventory: {
    label: "المخزون",
    headers: ["العنصر", "النوع", "الكمية", "المكان"],
  },
  licenses: {
    label: "التراخيص",
    headers: ["الترخيص", "المنتج", "المقاعد", "المستخدم", "المتاح", "الانتهاء"],
  },
};

function ReportsPage() {
  const [kind, setKind] = useState<Kind>("assets");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["itam-reports"],
    queryFn: async () => {
      const [
        assets,
        maintenance,
        inventory,
        licenses,
        assignments,
        employees,
        departments,
      ] = await Promise.all([
        supabase.from("assets").select("*").order("name"),
        supabase
          .from("asset_maintenance")
          .select("*")
          .order("maintenance_date", { ascending: false }),
        supabase.from("inventory_items").select("*").order("name"),
        supabase.from("licenses").select("*").order("license_name"),
        supabase.from("license_assignments").select("*"),
        supabase.from("employees").select("*"),
        supabase.from("departments").select("*"),
      ]);
      return {
        assets: assets.data ?? [],
        maintenance: maintenance.data ?? [],
        inventory: inventory.data ?? [],
        licenses: licenses.data ?? [],
        assignments: assignments.data ?? [],
        employees: employees.data ?? [],
        departments: departments.data ?? [],
      };
    },
  });
  const rows = useMemo(() => {
    if (!data) return [];
    const status = (value: string) =>
      (
        ({
          active: "نشط",
          inactive: "غير نشط",
          maintenance: "تحت الصيانة",
          retired: "متقاعد",
          Open: "مفتوحة",
          Closed: "مغلقة",
        }) as Record<string, string>
      )[value] || value;
    const result: Array<Array<string | number>> =
      kind === "assets"
        ? data.assets.map((asset: any) => [
            asset.asset_id,
            asset.name,
            asset.asset_type,
            status(asset.status),
            data.departments.find(
              (item: any) => item.id === asset.department_id,
            )?.name || "—",
            data.employees.find(
              (item: any) => item.id === asset.assigned_employee_id,
            )?.full_name || "—",
            formatDate(asset.warranty_expiry),
          ])
        : kind === "maintenance"
          ? data.maintenance.map((record: any) => [
              data.assets.find((item: any) => item.id === record.asset_id)
                ?.name || "—",
              formatDate(record.maintenance_date),
              record.maintenance_type === "Preventive" ? "وقائية" : "تصحيحية",
              status(record.status),
              record.technician || "—",
              record.resolution || "—",
            ])
          : kind === "inventory"
            ? data.inventory.map((item: any) => [
                item.name,
                (
                  {
                    Consumable: "مستهلكات",
                    Toner: "أحبار",
                    "Spare Part": "قطع وأدوات",
                  } as Record<string, string>
                )[item.category] || item.category,
                item.quantity,
                item.location || "—",
              ])
            : data.licenses.map((license: any) => {
                const used = data.assignments.filter(
                  (item: any) => item.license_id === license.id,
                ).length;
                return [
                  license.license_name,
                  license.product_name || "—",
                  license.seat_count,
                  used,
                  Math.max(0, Number(license.seat_count) - used),
                  formatDate(license.expiration_date),
                ];
              });
    const term = search.trim().toLowerCase();
    return term
      ? result.filter((row) =>
          row.some((value) => String(value).toLowerCase().includes(term)),
        )
      : result;
  }, [data, kind, search]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <ManagementHeader
        icon={FileBarChart}
        title="التقارير"
        description="تقارير موحدة من بيانات النظام الحالية"
        action={
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="ml-2 size-4" />
            طباعة أو حفظ PDF
          </Button>
        }
      />
      <div className="no-print surface-panel flex flex-wrap items-center gap-3 p-4">
        <Select value={kind} onValueChange={(value) => setKind(value as Kind)}>
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(REPORTS).map(([value, report]) => (
              <SelectItem key={value} value={value}>
                {report.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative min-w-64 flex-1">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pr-9"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ابحث داخل التقرير"
          />
        </div>
      </div>
      <section className="surface-panel overflow-hidden">
        <div className="border-b p-5">
          <h2 className="font-semibold">تقرير {REPORTS[kind].label}</h2>
          <p className="text-sm text-muted-foreground">{rows.length} سجل</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {REPORTS[kind].headers.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {row.map((value, cell) => (
                    <TableCell key={cell}>{value || "—"}</TableCell>
                  ))}
                </TableRow>
              ))}
              {!rows.length && (
                <TableRow>
                  <TableCell
                    colSpan={REPORTS[kind].headers.length}
                    className="h-28 text-center text-muted-foreground"
                  >
                    {isLoading ? "جارٍ التحميل…" : "لا توجد بيانات."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CircleDot,
  ClipboardList,
  Monitor,
  Package,
  Pencil,
  Trash2,
  UserCog,
  Wrench,
} from "lucide-react";
import { runWorkflowAction, supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ConfirmButton";
import { MaintenanceForm } from "./maintenance";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/maintenance/$id")({
  component: MaintenanceDetails,
});

const typeLabels: Record<string, string> = {
  Corrective: "تصحيحية",
  Preventive: "وقائية",
  "Toner Replacement": "تغيير حبر",
  "Part Installation": "تركيب قطعة",
  "Part Replacement": "استبدال قطعة",
};

function MaintenanceDetails() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const { data: record, isLoading } = useQuery({
    queryKey: ["maintenance-record", id],
    queryFn: async () =>
      (
        await supabase
          .from("asset_maintenance")
          .select("*")
          .eq("id", id)
          .maybeSingle()
      ).data,
  });
  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => (await supabase.from("assets").select("*")).data ?? [],
  });
  const { data: inventory = [] } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () =>
      (await supabase.from("inventory_items").select("*").order("name")).data ??
      [],
  });
  const { data: technicians = [] } = useQuery({
    queryKey: ["technicians"],
    queryFn: async () =>
      (await supabase.from("technicians").select("*").order("name")).data ?? [],
  });

  if (isLoading) return <p className="text-muted-foreground">جارٍ التحميل…</p>;
  if (!record)
    return <p className="text-muted-foreground">سجل الصيانة غير موجود.</p>;

  const asset = assets.find((item: any) => item.id === record.asset_id);
  const closed = record.status === "Closed";
  const usedItems = Array.isArray(record.used_items) ? record.used_items : [];
  const refresh = () => queryClient.invalidateQueries();
  const remove = async () => {
    try {
      await runWorkflowAction({
        action: "delete-maintenance",
        maintenanceId: record.id,
      });
      await refresh();
      toast.success("تم حذف سجل الصيانة وإرجاع مواده إلى المخزون");
      navigate({ to: "/maintenance" });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "تعذر حذف سجل الصيانة",
      );
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link to="/maintenance">
            <Button variant="ghost" size="icon" aria-label="العودة إلى الصيانة">
              <ArrowRight className="size-5" />
            </Button>
          </Link>
          <div>
            <p className="font-mono text-sm font-bold text-primary">
              {record.reference_number || "MNT-—"}
            </p>
            <h1 className="mt-1 text-2xl font-bold">
              سجل صيانة {asset?.name || "أصل"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              جميع تفاصيل العملية والمواد المستخدمة في مكان واحد
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            <Pencil className="ml-2 size-4" />
            تعديل السجل
          </Button>
          <ConfirmButton
            variant="destructive"
            title="حذف سجل الصيانة"
            description={`سيتم حذف ${record.reference_number || "السجل"} وإرجاع المواد المستخدمة إلى المخزون.`}
            onConfirm={remove}
          >
            <Trash2 className="ml-2 size-4" />
            حذف
          </ConfirmButton>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <InfoCard
          icon={CircleDot}
          label="الحالة"
          value={closed ? "مغلقة" : "مفتوحة"}
          tone={closed ? "emerald" : "amber"}
        />
        <InfoCard
          icon={CalendarDays}
          label="تاريخ الصيانة"
          value={record.maintenance_date || "—"}
        />
        <InfoCard
          icon={Wrench}
          label="نوع الصيانة"
          value={
            typeLabels[record.maintenance_type] ||
            record.maintenance_type ||
            "—"
          }
        />
      </section>

      <section className="surface-panel grid gap-6 p-6 md:grid-cols-2">
        <div className="flex items-start gap-3">
          <Monitor className="mt-1 size-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">الأصل</p>
            {asset ? (
              <Link
                to="/assets/$id"
                params={{ id: asset.id }}
                className="mt-1 block font-semibold text-primary hover:underline"
              >
                {asset.name}
              </Link>
            ) : (
              <p className="mt-1 font-semibold">أصل غير متوفر</p>
            )}
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {asset?.asset_id || asset?.serial_number || "—"}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <UserCog className="mt-1 size-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">الفني المسؤول</p>
            <p className="mt-1 font-semibold">
              {record.technician || "غير محدد"}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <TextPanel title="وصف المشكلة" value={record.problem_description} />
        <TextPanel title="الحل المنفذ" value={record.resolution} />
        <TextPanel title="ملاحظات" value={record.notes} />
      </section>

      <section className="surface-panel overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b p-5">
          <div className="flex items-center gap-2">
            <Package className="size-5 text-primary" />
            <h2 className="font-semibold">مواد وقطع الصيانة</h2>
          </div>
          <span className="text-sm text-muted-foreground">
            {usedItems.length} عنصر
          </span>
        </div>
        {usedItems.length ? (
          <div className="divide-y">
            {usedItems.map((used: any, index: number) => {
              const item = inventory.find(
                (entry: any) => entry.id === (used.id || used.item_id),
              );
              return (
                <div
                  key={`${used.id || used.item_id}-${index}`}
                  className="flex items-center justify-between gap-3 p-5"
                >
                  <div>
                    <p className="font-medium">{item?.name || "عنصر مخزون"}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item?.category || "—"}
                    </p>
                  </div>
                  <span className="rounded-md bg-primary/10 px-3 py-1 font-semibold text-primary">
                    {Number(used.quantity || 0)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="p-8 text-center text-sm text-muted-foreground">
            لم تُستخدم مواد من المخزون في هذا السجل.
          </p>
        )}
      </section>

      {editOpen && (
        <MaintenanceForm
          record={record}
          assets={assets}
          inventory={inventory}
          technicians={technicians}
          close={() => setEditOpen(false)}
          saved={refresh}
        />
      )}
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, tone = "blue" }: any) {
  const tones: Record<string, string> = {
    blue: "bg-primary/10 text-primary",
    emerald: "bg-emerald-500/10 text-emerald-700",
    amber: "bg-amber-500/10 text-amber-700",
  };
  return (
    <div className="surface-panel flex items-center gap-3 p-4">
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}
      >
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 truncate font-semibold">{value}</p>
      </div>
    </div>
  );
}

function TextPanel({ title, value }: { title: string; value?: string | null }) {
  return (
    <section className="surface-panel min-h-36 p-5">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <ClipboardList className="size-4" />
        {title}
      </p>
      <p className="mt-3 whitespace-pre-wrap leading-7">{value || "—"}</p>
    </section>
  );
}

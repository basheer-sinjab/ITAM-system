import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowRight,
  Boxes,
  History,
  MapPin,
  Minus,
  Package,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ConfirmButton";
import { ItemDialog, MovementDialog } from "./inventory";
import { toast } from "sonner";
import { PrinterImage } from "@/components/PrinterImage";

export const Route = createFileRoute("/_authenticated/inventory/$id")({
  component: InventoryItemDetails,
});

const categoryLabels: Record<string, string> = {
  Consumable: "مستهلكات",
  Toner: "أحبار",
  "Spare Part": "قطع وأدوات",
};

const movementLabels: Record<string, string> = {
  add: "إضافة كمية",
  use: "استخدام",
  return: "إرجاع",
  adjust: "تعديل",
};

function InventoryItemDetails() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [movementType, setMovementType] = useState<"add" | "use" | null>(null);
  const { data: item, isLoading } = useQuery({
    queryKey: ["inventory-item", id],
    queryFn: async () =>
      (
        await supabase
          .from("inventory_items")
          .select("*")
          .eq("id", id)
          .maybeSingle()
      ).data,
  });
  const { data: movements = [] } = useQuery({
    queryKey: ["inventory-item-history", id],
    queryFn: async () =>
      (
        await supabase
          .from("inventory_movements")
          .select("*")
          .eq("item_id", id)
          .order("movement_date", { ascending: false })
      ).data ?? [],
  });

  if (isLoading) return <p className="text-muted-foreground">جارٍ التحميل…</p>;
  if (!item)
    return <p className="text-muted-foreground">عنصر المخزون غير موجود.</p>;
  const remove = async () => {
    const result = await supabase
      .from("inventory_items")
      .delete()
      .eq("id", item.id);
    if (result.error) return toast.error(result.error.message);
    queryClient.invalidateQueries();
    toast.success("تم حذف عنصر المخزون");
    navigate({ to: "/inventory" });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Link to="/inventory">
            <Button variant="ghost" size="icon" aria-label="العودة إلى المخزون">
              <ArrowRight className="size-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{item.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              تفاصيل العنصر وسجل حركاته
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setMovementType("add")}>
            <Plus className="ml-2 size-4" />
            زود الكمية
          </Button>
          <Button
            variant="outline"
            disabled={Number(item.quantity) <= 0}
            onClick={() => setMovementType("use")}
          >
            <Minus className="ml-2 size-4" />
            استخدام
          </Button>
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            <Pencil className="ml-2 size-4" />
            تعديل
          </Button>
          <ConfirmButton
            variant="destructive"
            title="حذف عنصر المخزون"
            description={`سيتم حذف ${item.name} وسجل حركاته.`}
            onConfirm={remove}
          >
            <Trash2 className="ml-2 size-4" />
            حذف
          </ConfirmButton>
        </div>
      </header>

      <PrinterImage
        path={item.image_url}
        alt={item.name}
        className="h-64 w-full rounded-xl border"
        fallback={<Package className="size-20 opacity-35" />}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DetailCard
          icon={Package}
          label="النوع"
          value={categoryLabels[item.category] || item.category || "غير محدد"}
        />
        <DetailCard
          icon={Boxes}
          label="الكمية المتاحة"
          value={String(item.quantity ?? 0)}
        />
        <DetailCard
          icon={MapPin}
          label="مكان الحفظ"
          value={item.location || "—"}
        />
        <DetailCard
          icon={History}
          label="عدد الحركات"
          value={String(movements.length)}
        />
      </section>

      {item.color && (
        <section className="surface-panel p-5">
          <p className="text-xs text-muted-foreground">لون الحبر</p>
          <p className="mt-1 font-medium">{item.color}</p>
        </section>
      )}
      {item.notes && (
        <section className="surface-panel p-5">
          <p className="text-xs text-muted-foreground">ملاحظات</p>
          <p className="mt-1">{item.notes}</p>
        </section>
      )}

      <section className="surface-panel overflow-hidden">
        <div className="flex items-center gap-2 border-b p-5">
          <History className="size-5 text-primary" />
          <h2 className="font-semibold">سجل حركة المخزون</h2>
        </div>
        {movements.length ? (
          <div className="divide-y">
            {movements.map((entry: any) => {
              const used = entry.movement_type === "use";
              return (
                <article
                  key={entry.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-5"
                >
                  <div>
                    <p className="font-medium">
                      {movementLabels[entry.movement_type] || "حركة"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {entry.movement_date}
                      {entry.note ? ` · ${entry.note}` : ""}
                    </p>
                  </div>
                  <span
                    className={
                      used
                        ? "font-semibold text-amber-700"
                        : "font-semibold text-primary"
                    }
                  >
                    {used ? "−" : "+"}
                    {entry.quantity}
                  </span>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="p-8 text-center text-sm text-muted-foreground">
            لا توجد حركات مسجلة لهذا العنصر.
          </p>
        )}
      </section>
      {editOpen && (
        <ItemDialog
          item={item}
          initialCategory={item.category}
          close={() => setEditOpen(false)}
          saved={() => queryClient.invalidateQueries()}
        />
      )}
      {movementType && (
        <MovementDialog
          item={item}
          type={movementType}
          close={() => setMovementType(null)}
          saved={() => queryClient.invalidateQueries()}
        />
      )}
    </div>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Package;
  label: string;
  value: string;
}) {
  return (
    <div className="surface-panel flex items-center gap-3 p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 truncate font-semibold">{value}</p>
      </div>
    </div>
  );
}

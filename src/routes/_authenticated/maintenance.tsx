import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CircleDot, Pencil, Plus, Search, Trash2, Wrench } from "lucide-react";
import { runWorkflowAction, supabase } from "@/integrations/supabase/client";
import { ManagementHeader, MetricCard } from "@/components/ManagementVisuals";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ConfirmButton";
import { inventoryAdjustment } from "@/lib/data-rules.mjs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/maintenance")({
  component: Maintenance,
});

const MAINTENANCE_TYPES: Record<string, string> = {
  Corrective: "تصحيحية",
  Preventive: "وقائية",
  "Toner Replacement": "تغيير حبر",
  "Part Installation": "تركيب قطعة",
  "Part Replacement": "استبدال قطعة",
};

function assetLabel(asset: any) {
  return `${asset.name} - ${asset.asset_id || asset.serial_number || asset.id}`;
}

function movementItems(items: any[] = []) {
  return items.map((item) => ({
    item_id: item.item_id || item.id,
    quantity: Number(item.quantity) || 0,
  }));
}

function Maintenance() {
  const qc = useQueryClient();
  const [record, setRecord] = useState<any>();
  const [maintenanceSearch, setMaintenanceSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const { data: records = [] } = useQuery({
    queryKey: ["asset-maintenance"],
    queryFn: async () =>
      (
        await supabase
          .from("asset_maintenance")
          .select("*")
          .order("maintenance_date", { ascending: false })
      ).data ?? [],
  });
  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => (await supabase.from("assets").select("*")).data ?? [],
  });
  const { data: inventory = [] } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () =>
      (await supabase.from("inventory_items").select("*")).data ?? [],
  });
  const { data: technicians = [] } = useQuery({
    queryKey: ["technicians"],
    queryFn: async () =>
      (await supabase.from("technicians").select("*").order("name")).data ?? [],
  });
  const openRecords = records.filter(
    (record: any) => record.status === "Open",
  ).length;
  const visibleRecords = records.filter((maintenanceRecord: any) => {
    const asset = assets.find(
      (item: any) => item.id === maintenanceRecord.asset_id,
    );
    const search = maintenanceSearch.trim().toLowerCase();
    const matchesSearch =
      !search ||
      [
        asset?.name,
        asset?.asset_id,
        maintenanceRecord.technician,
        maintenanceRecord.maintenance_type,
        maintenanceRecord.resolution,
        maintenanceRecord.maintenance_date,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(search),
      );
    const matchesStatus =
      activeStatus === "all" || maintenanceRecord.status === activeStatus;
    return matchesSearch && matchesStatus;
  });
  const removeRecord = async (maintenanceRecord: any) => {
    try {
      await runWorkflowAction({
        action: "delete-maintenance",
        maintenanceId: maintenanceRecord.id,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "تعذر حذف سجل الصيانة",
      );
      return;
    }
    await qc.invalidateQueries();
    toast.success("تم حذف سجل الصيانة");
  };
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <ManagementHeader
        icon={Wrench}
        title="سجلات الصيانة"
        description="الصيانة الوقائية والتصحيحية للأصول"
        action={
          <Button onClick={() => setRecord({})}>
            <Plus className="ml-2 size-4" />
            إضافة سجل
          </Button>
        }
      />
      <section className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          icon={Wrench}
          label="إجمالي السجلات"
          value={records.length}
        />
        <MetricCard
          icon={CircleDot}
          label="صيانة مفتوحة"
          value={openRecords}
          tone="amber"
        />
      </section>
      <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-3 sm:flex-row-reverse sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={maintenanceSearch}
            onChange={(event) => setMaintenanceSearch(event.target.value)}
            placeholder="ابحث في الصيانة أو الجهاز أو الفني"
            className="bg-background pr-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            ["all", "الكل"],
            ["Open", "مفتوحة"],
            ["Closed", "مغلقة"],
          ].map(([value, label]) => (
            <Button
              key={value}
              variant={activeStatus === value ? "default" : "ghost"}
              onClick={() => setActiveStatus(value)}
            >
              {label}
              <span className="mr-2 text-xs opacity-70">
                (
                {value === "all"
                  ? records.length
                  : records.filter((item: any) => item.status === value).length}
                )
              </span>
            </Button>
          ))}
        </div>
      </div>
      <div className="surface-panel overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-right text-muted-foreground">
              {[
                "الأصل",
                "التاريخ",
                "النوع",
                "الحالة",
                "الفني",
                "الحل",
                "التكلفة",
                "",
              ].map((header) => (
                <th key={header} className="p-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRecords.map((maintenanceRecord: any) => (
              <tr
                key={maintenanceRecord.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="p-4">
                  {(() => {
                    const asset = assets.find(
                      (item: any) => item.id === maintenanceRecord.asset_id,
                    );
                    return asset ? (
                      <>
                        <p className="font-medium">{asset.name}</p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {asset.asset_id || asset.serial_number || "—"}
                        </p>
                      </>
                    ) : (
                      "—"
                    );
                  })()}
                </td>
                <td className="p-4">{maintenanceRecord.maintenance_date}</td>
                <td className="p-4">
                  {MAINTENANCE_TYPES[maintenanceRecord.maintenance_type] ||
                    maintenanceRecord.maintenance_type}
                </td>
                <td className="p-4">
                  <span
                    className={
                      maintenanceRecord.status === "Closed"
                        ? "rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700"
                        : "rounded-md bg-amber-500/10 px-2 py-1 text-xs text-amber-700"
                    }
                  >
                    {maintenanceRecord.status === "Closed" ? "مغلقة" : "مفتوحة"}
                  </span>
                </td>
                <td className="p-4">{maintenanceRecord.technician || "—"}</td>
                <td className="max-w-64 p-4">
                  {maintenanceRecord.resolution || "—"}
                </td>
                <td className="p-4">{maintenanceRecord.cost || 0}</td>
                <td className="p-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="تعديل السجل"
                    onClick={(event) => {
                      event.stopPropagation();
                      setRecord(maintenanceRecord);
                    }}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <ConfirmButton
                    size="icon"
                    variant="ghost"
                    aria-label="حذف السجل"
                    title="حذف سجل الصيانة؟"
                    description="سيتم حذف السجل وإرجاع المواد المستخدمة إلى المخزون."
                    onConfirm={() => removeRecord(maintenanceRecord)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </ConfirmButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!visibleRecords.length && (
          <p className="p-8 text-center text-sm text-muted-foreground">
            لا توجد صيانات مطابقة.
          </p>
        )}
      </div>
      {record && (
        <MaintenanceForm
          key={record.id ?? "new"}
          record={record}
          assets={assets}
          inventory={inventory}
          technicians={technicians}
          close={() => setRecord(undefined)}
          saved={() => qc.invalidateQueries()}
        />
      )}
    </div>
  );
}
function MaintenanceForm({
  record,
  assets,
  inventory,
  technicians = [],
  close,
  saved,
}: any) {
  const [inventorySearch, setInventorySearch] = useState("");
  const [form, setForm] = useState<any>({
    asset_id: "",
    maintenance_date: new Date().toISOString().slice(0, 10),
    maintenance_type: "Corrective",
    status: "Closed",
    used_items: [],
    ...record,
  });
  const set = (key: string, value: any) => setForm({ ...form, [key]: value });
  const save = async () => {
    if (!form.asset_id) return toast.error("اختر الأصل");
    const adjustments = inventoryAdjustment(
      movementItems(record.used_items || []),
      movementItems(form.used_items || []),
    );
    const insufficient = adjustments.find((adjustment: any) => {
      const item = inventory.find(
        (entry: any) => entry.id === adjustment.itemId,
      );
      return item && Number(item.quantity) + adjustment.quantityChange < 0;
    });
    if (insufficient)
      return toast.error(
        `الكمية المتوفرة من ${inventory.find((item: any) => item.id === insufficient.itemId)?.name} لا تكفي`,
      );
    const payload = { ...form, cost: Number(form.cost || 0) };
    try {
      await runWorkflowAction({ action: "save-maintenance", record: payload });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "تعذر حفظ سجل الصيانة",
      );
      return;
    }
    saved();
    toast.success(form.id ? "تم تعديل سجل الصيانة" : "تمت إضافة سجل الصيانة");
    close();
  };
  const remove = async () => {
    if (!form.id) return;
    try {
      await runWorkflowAction({
        action: "delete-maintenance",
        maintenanceId: form.id,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "تعذر حذف سجل الصيانة",
      );
      return;
    }
    saved();
    toast.success("تم حذف سجل الصيانة");
    close();
  };
  const normalizedSearch = inventorySearch.trim().toLocaleLowerCase();
  const selectedInventory = inventory.filter((item: any) =>
    form.used_items.some((used: any) => used.id === item.id),
  );
  const matchingInventory = inventory
    .filter((item: any) => {
      if (!normalizedSearch) return false;
      return [item.name, item.category, item.location]
        .filter(Boolean)
        .some((value) =>
          String(value).toLocaleLowerCase().includes(normalizedSearch),
        );
    })
    .filter(
      (item: any) => !form.used_items.some((used: any) => used.id === item.id),
    )
    .slice(0, 8);
  const inventorySearchResults = [...selectedInventory, ...matchingInventory];
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {form.id ? "تعديل سجل الصيانة" : "إضافة سجل صيانة"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>الأصل</Label>
            <Select
              value={form.asset_id}
              onValueChange={(value) => set("asset_id", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {assets.map((asset: any) => (
                  <SelectItem key={asset.id} value={asset.id}>
                    {assetLabel(asset)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {[
            ["تاريخ الصيانة", "maintenance_date"],
            ["التكلفة", "cost"],
          ].map(([label, key]) => (
            <div key={key} className="space-y-2">
              <Label>{label}</Label>
              <Input
                type={
                  key === "maintenance_date"
                    ? "date"
                    : key === "cost"
                      ? "number"
                      : undefined
                }
                value={form[key] || ""}
                onChange={(e) => set(key, e.target.value)}
              />
            </div>
          ))}
          <div className="space-y-2">
            <Label>الفني</Label>
            <Select
              value={form.technician || "__none__"}
              onValueChange={(value) =>
                set("technician", value === "__none__" ? "" : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الفني" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">غير محدد</SelectItem>
                {technicians.map((technician: any) => (
                  <SelectItem key={technician.id} value={technician.name}>
                    {technician.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>نوع الصيانة</Label>
            <Select
              value={form.maintenance_type}
              onValueChange={(value) => set("maintenance_type", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Corrective">تصحيحية</SelectItem>
                <SelectItem value="Preventive">وقائية</SelectItem>
                <SelectItem value="Toner Replacement">تغيير حبر</SelectItem>
                <SelectItem value="Part Installation">تركيب قطعة</SelectItem>
                <SelectItem value="Part Replacement">استبدال قطعة</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>الحالة</Label>
            <Select
              value={form.status}
              onValueChange={(value) => set("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">مفتوحة</SelectItem>
                <SelectItem value="Closed">مغلقة</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>العناصر المستخدمة</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute right-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                className="pr-9"
                placeholder="ابحث باسم الصنف أو التصنيف أو الموقع..."
                value={inventorySearch}
                onChange={(event) => setInventorySearch(event.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              اكتب للبحث في {inventory.length} صنفًا. تظهر أول 8 نتائج مطابقة.
            </p>
            {inventorySearchResults.map((item: any) => (
              <div
                key={item.id}
                className="mb-2 flex items-center gap-2 rounded-md border p-2"
              >
                <span className="flex-1 text-sm">
                  {item.name} ({item.quantity})
                </span>
                <Input
                  className="w-24"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={
                    form.used_items.find((used: any) => used.id === item.id)
                      ?.quantity || ""
                  }
                  onChange={(event) => {
                    const quantity = Number(event.target.value);
                    set("used_items", [
                      ...form.used_items.filter(
                        (used: any) => used.id !== item.id,
                      ),
                      ...(quantity ? [{ id: item.id, quantity }] : []),
                    ]);
                  }}
                />
              </div>
            ))}
            {inventorySearch &&
              matchingInventory.length === 0 &&
              selectedInventory.length === 0 && (
                <p className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
                  لا توجد أصناف مطابقة للبحث.
                </p>
              )}
            {!inventorySearch && selectedInventory.length === 0 && (
              <p className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
                ابدأ بكتابة اسم الصنف لاختياره.
              </p>
            )}
          </div>
          {[
            ["وصف المشكلة", "problem_description"],
            ["الحل", "resolution"],
            ["ملاحظات", "notes"],
          ].map(([label, key]) => (
            <div key={key} className="space-y-2 sm:col-span-2">
              <Label>{label}</Label>
              <Textarea
                value={form[key] || ""}
                onChange={(e) => set(key, e.target.value)}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          {form.id && (
            <ConfirmButton
              variant="outline"
              className="text-destructive"
              title="حذف سجل الصيانة؟"
              description="سيتم حذف السجل وإرجاع المواد المستخدمة إلى المخزون."
              onConfirm={remove}
            >
              <Trash2 className="ml-2 size-4" />
              حذف
            </ConfirmButton>
          )}
          <Button variant="outline" onClick={close}>
            إلغاء
          </Button>
          <Button onClick={save}>حفظ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

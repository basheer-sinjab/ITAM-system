import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AlertTriangle, Boxes, Package, Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ManagementHeader, MetricCard } from "@/components/ManagementVisuals";
import { Button } from "@/components/ui/button";
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
export const Route = createFileRoute("/_authenticated/inventory")({
  component: Inventory,
});
function Inventory() {
  const qc = useQueryClient();
  const [record, setRecord] = useState<any>();
  const { data: items = [] } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () =>
      (await supabase.from("inventory_items").select("*").order("name")).data ??
      [],
  });
  const remove = useMutation({
    mutationFn: (id: string) =>
      supabase.from("inventory_items").delete().eq("id", id),
    onSuccess: () => qc.invalidateQueries(),
  });
  const lowStockItems = items.filter((item: any) => Number(item.quantity) <= 3);
  const totalUnits = items.reduce((total: number, item: any) => total + Number(item.quantity || 0), 0);
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <ManagementHeader
        icon={Package}
        title="المخزون"
        description="المستهلكات وقطع الغيار ومتابعة الحد الأدنى"
        action={<Button onClick={() => setRecord({})}>
          <Plus className="ml-2 size-4" />
          إضافة عنصر
        </Button>}
      />
      <section className="grid gap-3 sm:grid-cols-3">
        <MetricCard icon={Boxes} label="أصناف المخزون" value={items.length} />
        <MetricCard icon={Package} label="إجمالي الوحدات" value={totalUnits} tone="emerald" />
        <MetricCard icon={AlertTriangle} label="مخزون منخفض" value={lowStockItems.length} tone="amber" />
      </section>
      <div className="surface-panel overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b text-right text-muted-foreground">
            <tr>
              {["العنصر", "الفئة", "الكمية", "الحد الأدنى", "الموقع", ""].map(
                (header) => (
                  <th key={header} className="p-4 font-medium">
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id} className="border-b transition-colors hover:bg-muted/40 last:border-0">
                <td className="p-4 font-medium"><div className="flex items-center gap-2"><span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary"><Package className="size-4" /></span>{item.name}</div></td>
                <td className="p-4"><span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{item.category === "Spare Part" ? "قطع غيار" : "مستهلكات"}</span></td>
                <td className="p-4">
                  {Number(item.quantity) <= 3 && (
                    <AlertTriangle className="ml-1 inline size-4 text-amber-600" />
                  )}
                  <span className={Number(item.quantity) <= 3 ? "font-semibold text-amber-700" : "font-medium"}>{item.quantity}</span>
                </td>
                <td className="p-4">{item.minimum_quantity}</td>
                <td className="p-4">{item.location || "—"}</td>
                <td className="p-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setRecord(item)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => remove.mutate(item.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InventoryForm
        key={record?.id ?? (record ? "new" : "closed")}
        record={record}
        close={() => setRecord(undefined)}
      />
    </div>
  );
}
function InventoryForm({ record, close }: any) {
  const qc = useQueryClient();
  const [form, setForm] = useState<any>(record);
  useEffect(() => setForm(record), [record]);
  if (!record) return null;
  const data = form ?? record;
  const set = (key: string, value: any) => setForm({ ...data, [key]: value });
  const save = async () => {
    const payload = {
      ...data,
      quantity: Number(data.quantity || 0),
      minimum_quantity: Number(data.minimum_quantity || 0),
    };
    if (data.id)
      await supabase.from("inventory_items").update(payload).eq("id", data.id);
    else await supabase.from("inventory_items").insert(payload);
    qc.invalidateQueries();
    close();
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.id ? "تعديل عنصر" : "إضافة عنصر"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["اسم العنصر", "name"],
            ["الكمية", "quantity"],
            ["الحد الأدنى", "minimum_quantity"],
            ["الموقع", "location"],
          ].map(([label, key]) => (
            <div key={key} className="space-y-2">
              <Label>{label}</Label>
              <Input
                type={key.includes("quantity") ? "number" : undefined}
                value={data[key] || ""}
                onChange={(e) => set(key, e.target.value)}
              />
            </div>
          ))}
          <div className="space-y-2">
            <Label>الفئة</Label>
            <Select
              value={data.category || "Consumable"}
              onValueChange={(value) => set("category", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Consumable">مستهلكات</SelectItem>
                <SelectItem value="Spare Part">قطع غيار</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>ملاحظات</Label>
            <Textarea
              value={data.notes || ""}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            إلغاء
          </Button>
          <Button onClick={save}>حفظ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

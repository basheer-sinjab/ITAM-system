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
import { toast } from "sonner";
export const Route = createFileRoute("/_authenticated/inventory")({
  component: Inventory,
});
function Inventory() {
  const qc = useQueryClient();
  const [record, setRecord] = useState<any>();
  const [activeCategory, setActiveCategory] = useState("Consumable");
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
  const visibleItems = items.filter((item: any) => item.category === activeCategory);
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <ManagementHeader
        icon={Package}
        title="المخزون"
        description="المستهلكات وقطع الغيار ومتابعة الحد الأدنى"
        action={<Button onClick={() => setRecord({ category: activeCategory, ...(activeCategory === "Toner" ? { color: "B" } : {}) })}>
          <Plus className="ml-2 size-4" />
          إضافة عنصر
        </Button>}
      />
      <section className="grid gap-3 sm:grid-cols-3">
        <MetricCard icon={Boxes} label="أصناف المخزون" value={items.length} />
        <MetricCard icon={Package} label="إجمالي الوحدات" value={totalUnits} tone="emerald" />
        <MetricCard icon={AlertTriangle} label="مخزون منخفض" value={lowStockItems.length} tone="amber" />
      </section>
      <div className="flex flex-wrap gap-2 rounded-lg border bg-muted/30 p-2">
        {[['Consumable', 'مستهلكات'], ['Spare Part', 'قطع غيار'], ['Toner', 'أحبار']].map(([value, label]) => (
          <Button key={value} variant={activeCategory === value ? "default" : "ghost"} onClick={() => setActiveCategory(value)}>
            {label} <span className="mr-2 text-xs opacity-70">({items.filter((item: any) => item.category === value).length})</span>
          </Button>
        ))}
      </div>
      <div className="surface-panel overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b text-right text-muted-foreground">
            <tr>
              {["العنصر", "الفئة", "اللون", "الكمية", "الحد الأدنى", "الموقع", ""].map(
                (header) => (
                  <th key={header} className="p-4 font-medium">
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((item: any) => (
              <tr key={item.id} className="border-b transition-colors hover:bg-muted/40 last:border-0">
                <td className="p-4 font-medium"><div className="flex items-center gap-2"><span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary"><Package className="size-4" /></span>{item.name}</div></td>
                <td className="p-4"><span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{item.category === "Spare Part" ? "قطع غيار" : item.category === "Toner" ? "أحبار" : "مستهلكات"}</span></td>
                <td className="p-4">{item.category === "Toner" && item.color ? <div className="flex items-center gap-2"><ColorDot color={item.color} /><span className="text-xs font-medium">{item.color}</span></div> : <span className="text-muted-foreground">—</span>}</td>
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
                    onClick={() => {
                      if (window.confirm(`هل أنت متأكد من حذف المنتج "${item.name}" من المخزون؟`)) {
                        remove.mutate(item.id);
                      }
                    }}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!visibleItems.length && <p className="p-8 text-center text-sm text-muted-foreground">لا توجد عناصر في هذه الفئة.</p>}
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
    if (!data.name?.trim()) {
      toast.error("يرجى إدخال اسم العنصر");
      return;
    }
    const payload = {
      ...data,
      quantity: Number(data.quantity || 0),
      minimum_quantity: Number(data.minimum_quantity || 0),
    };
    const result = data.id
      ? await supabase.from("inventory_items").update(payload).eq("id", data.id)
      : await supabase.from("inventory_items").insert(payload);
    if (result.error) {
      toast.error(`تعذر حفظ العنصر: ${result.error.message}`);
      return;
    }
    await qc.invalidateQueries({ queryKey: ["inventory"] });
    toast.success(data.id ? "تم تحديث العنصر" : "تمت إضافة العنصر");
    close();
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
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
                min={key.includes("quantity") ? 0 : undefined}
                placeholder={key === "name" ? "مثال: حبر HP 410A" : key === "location" ? "مثال: مستودع تقنية المعلومات" : undefined}
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
                <SelectItem value="Toner">أحبار</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {data.category === "Toner" && (
            <div className="space-y-2">
              <Label>لون الحبر</Label>
              <Select value={data.color || "B"} onValueChange={(value) => set("color", value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[['B', 'black', 'أسود'], ['Y', 'yellow', 'أصفر'], ['M', 'magenta', 'أرجواني'], ['C', 'cyan', 'سماوي']].map(([value, color, label]) => (
                    <SelectItem key={value} value={value}><span className="flex items-center gap-2"><ColorDot color={color} />{value} - {label}</span></SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2 sm:col-span-2">
            <Label>وصف العنصر وملاحظاته</Label>
            <Textarea
              placeholder="أضف تفاصيل تساعد على التعرف على العنصر أو استخدامه..."
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

function ColorDot({ color }: { color: string }) {
  const classes: Record<string, string> = { B: "bg-black", black: "bg-black", Y: "bg-yellow-400", yellow: "bg-yellow-400", M: "bg-fuchsia-600", magenta: "bg-fuchsia-600", C: "bg-cyan-500", cyan: "bg-cyan-500" };
  return <span aria-label={color} className={`inline-block size-3 rounded-full border border-black/20 ${classes[color] ?? "bg-muted"}`} />;
}

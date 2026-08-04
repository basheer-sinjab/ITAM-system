import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Boxes,
  History,
  Minus,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ConfirmButton } from "@/components/ConfirmButton";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/inventory")({
  component: Inventory,
});

const CATEGORIES = [
  { value: "Consumable", label: "مستهلكات" },
  { value: "Toner", label: "أحبار" },
  { value: "Spare Part", label: "قطع وأدوات" },
];
const movementLabel: Record<string, string> = {
  add: "إضافة كمية",
  use: "استخدام",
  return: "إرجاع",
  adjust: "تعديل",
};

function Inventory() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [record, setRecord] = useState<any>();
  const [movement, setMovement] = useState<{
    item: any;
    type: "add" | "use";
  }>();
  const [historyItem, setHistoryItem] = useState<any>();
  const { data: items = [] } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () =>
      (await supabase.from("inventory_items").select("*").order("name")).data ??
      [],
  });
  const { data: movements = [] } = useQuery({
    queryKey: ["inventory-movements"],
    queryFn: async () =>
      (
        await supabase
          .from("inventory_movements")
          .select("*")
          .order("movement_date", { ascending: false })
      ).data ?? [],
  });
  const { data: settings } = useQuery({
    queryKey: ["app-settings"],
    queryFn: async () =>
      (
        await supabase
          .from("app_settings")
          .select("*")
          .eq("id", "default")
          .maybeSingle()
      ).data,
  });
  const threshold = Number(settings?.low_stock_threshold ?? 2);
  const filtered = useMemo(
    () =>
      items.filter((item: any) =>
        [item.name, item.location, categoryName(item.category)].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(search.trim().toLowerCase()),
        ),
      ),
    [items, search],
  );
  const lowStock = items.filter(
    (item: any) => Number(item.quantity) <= threshold,
  );
  const totalUnits = items.reduce(
    (total: number, item: any) => total + Number(item.quantity || 0),
    0,
  );

  const refresh = () => queryClient.invalidateQueries();
  const remove = async (item: any) => {
    const result = await supabase
      .from("inventory_items")
      .delete()
      .eq("id", item.id);
    if (result.error) {
      toast.error(result.error.message);
      return;
    }
    refresh();
    toast.success("تم حذف العنصر من المخزون");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <ManagementHeader
        icon={Package}
        title="المخزون"
        description="متابعة الكميات بطريقة سهلة وواضحة"
        action={
          <Button onClick={() => setRecord({ category: "Consumable" })}>
            <Plus className="ml-2 size-4" />
            إضافة عنصر
          </Button>
        }
      />
      <section className="grid gap-3 sm:grid-cols-3">
        <MetricCard icon={Boxes} label="عدد العناصر" value={items.length} />
        <MetricCard
          icon={Package}
          label="إجمالي الكمية"
          value={totalUnits}
          tone="emerald"
        />
        <MetricCard
          icon={AlertTriangle}
          label="تحتاج انتباه"
          value={lowStock.length}
          tone="amber"
        />
      </section>
      <section className="surface-panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
          <div>
            <h2 className="font-semibold">العناصر والكميات</h2>
            <p className="text-sm text-muted-foreground">
              إذا أخذت شيئًا اضغط «استخدم»، وإذا وصلتك كمية اضغط «زود الكمية».
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pr-9"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث في المخزون"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العنصر</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>الكمية</TableHead>
                <TableHead>المكان</TableHead>
                <TableHead className="text-left">الخيارات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item: any) => {
                const isLow = Number(item.quantity) <= threshold;
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <p className="font-medium">{item.name}</p>
                      {item.notes && (
                        <p className="max-w-xs truncate text-xs text-muted-foreground">
                          {item.notes}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      {categoryName(item.category)}
                      {item.color ? ` - ${item.color}` : ""}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 font-semibold ${isLow ? "bg-amber-500/10 text-amber-700" : "bg-primary/10 text-primary"}`}
                      >
                        <span
                          className={`size-2 rounded-full ${isLow ? "bg-amber-500" : "bg-primary"}`}
                        />
                        {Number(item.quantity)}
                      </span>
                    </TableCell>
                    <TableCell>{item.location || "—"}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap justify-end gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setMovement({ item, type: "add" })}
                        >
                          <Plus className="ml-1 size-3.5" />
                          زود الكمية
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={Number(item.quantity) <= 0}
                          onClick={() => setMovement({ item, type: "use" })}
                        >
                          <Minus className="ml-1 size-3.5" />
                          استخدم
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="سجل الحركة"
                          onClick={() => setHistoryItem(item)}
                        >
                          <History className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="تعديل"
                          onClick={() => setRecord(item)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <ConfirmButton
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          aria-label="حذف"
                          title="حذف العنصر؟"
                          description={`هل تريد حذف ${item.name} وسجل حركته من المخزون؟`}
                          onConfirm={() => remove(item)}
                        >
                          <Trash2 className="size-4" />
                        </ConfirmButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {!filtered.length && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-28 text-center text-muted-foreground"
                  >
                    لا توجد عناصر مطابقة.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
      {record && (
        <ItemDialog
          item={record.id ? record : null}
          initialCategory={record.category}
          close={() => setRecord(undefined)}
          saved={refresh}
        />
      )}
      {movement && (
        <MovementDialog
          {...movement}
          close={() => setMovement(undefined)}
          saved={refresh}
        />
      )}
      {historyItem && (
        <HistoryDialog
          item={historyItem}
          movements={movements.filter(
            (entry: any) => entry.item_id === historyItem.id,
          )}
          close={() => setHistoryItem(undefined)}
        />
      )}
    </div>
  );
}

function ItemDialog({ item, initialCategory, close, saved }: any) {
  const [form, setForm] = useState<any>({
    name: "",
    category: initialCategory || "Consumable",
    quantity: 0,
    location: "",
    notes: "",
    color: "",
  });
  useEffect(() => {
    if (item) setForm({ ...item });
  }, [item]);
  const set = (key: string, value: any) =>
    setForm((current: any) => ({ ...current, [key]: value }));
  const save = async () => {
    if (!form.name?.trim()) return toast.error("اسم العنصر مطلوب");
    const payload = {
      name: form.name.trim(),
      category: form.category,
      color: form.color || null,
      location: form.location || null,
      notes: form.notes || null,
    };
    if (item) {
      const result = await supabase
        .from("inventory_items")
        .update(payload)
        .eq("id", item.id);
      if (result.error) return toast.error(result.error.message);
    } else {
      const result = await supabase.from("inventory_items").insert({
        ...payload,
        quantity: Math.max(0, Number(form.quantity) || 0),
        minimum_quantity: 1,
      });
      if (result.error) return toast.error(result.error.message);
      const created = Array.isArray(result.data) ? result.data[0] : result.data;
      if (created && Number(form.quantity) > 0)
        await supabase.from("inventory_movements").insert({
          item_id: created.id,
          movement_type: "add",
          quantity: Number(form.quantity),
          note: "الكمية الافتتاحية",
        });
    }
    saved();
    close();
    toast.success(item ? "تم تعديل العنصر" : "تمت إضافة العنصر");
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {item ? "تعديل العنصر" : "إضافة عنصر للمخزون"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="اسم العنصر">
            <Input
              value={form.name || ""}
              onChange={(event) => set("name", event.target.value)}
            />
          </Field>
          <Field label="النوع">
            <Select
              value={form.category}
              onValueChange={(value) => set("category", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          {!item && (
            <Field label="الكمية الموجودة الآن">
              <Input
                type="number"
                min="0"
                value={form.quantity}
                onChange={(event) => set("quantity", event.target.value)}
              />
            </Field>
          )}
          {form.category === "Toner" && (
            <Field label="اللون">
              <Input
                value={form.color || ""}
                onChange={(event) => set("color", event.target.value)}
                placeholder="أسود، سماوي…"
              />
            </Field>
          )}
          <Field label="مكان الحفظ">
            <Input
              value={form.location || ""}
              onChange={(event) => set("location", event.target.value)}
            />
          </Field>
          <Field label="ملاحظات" className="sm:col-span-2">
            <Textarea
              value={form.notes || ""}
              onChange={(event) => set("notes", event.target.value)}
            />
          </Field>
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

function MovementDialog({
  item,
  type,
  close,
  saved,
}: {
  item: any;
  type: "add" | "use";
  close: () => void;
  saved: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const save = async () => {
    const amount = Number(quantity);
    if (!Number.isFinite(amount) || amount <= 0)
      return toast.error("أدخل كمية صحيحة");
    if (type === "use" && amount > Number(item.quantity))
      return toast.error(`المتوفر حاليًا ${item.quantity} فقط`);
    const nextQuantity =
      Number(item.quantity) + (type === "add" ? amount : -amount);
    const update = await supabase
      .from("inventory_items")
      .update({ quantity: nextQuantity })
      .eq("id", item.id);
    if (update.error) return toast.error(update.error.message);
    const log = await supabase.from("inventory_movements").insert({
      item_id: item.id,
      movement_type: type,
      quantity: amount,
      note: note.trim() || null,
    });
    if (log.error) return toast.error(log.error.message);
    saved();
    close();
    toast.success(type === "add" ? "تمت زيادة الكمية" : "تم تسجيل الاستخدام");
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "add" ? `زود كمية ${item.name}` : `استخدام ${item.name}`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-3 text-sm">
            الكمية الحالية: <strong>{item.quantity}</strong>
          </div>
          <Field label="الكمية">
            <Input
              autoFocus
              type="number"
              min="1"
              max={type === "use" ? item.quantity : undefined}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </Field>
          <Field label="ملاحظة اختيارية">
            <Input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="مثال: تم استخدامه في صيانة جهاز"
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            إلغاء
          </Button>
          <Button onClick={save}>
            {type === "add" ? "زود الكمية" : "سجل الاستخدام"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function HistoryDialog({ item, movements, close }: any) {
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>سجل {item.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {movements.map((entry: any) => (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium">
                  {movementLabel[entry.movement_type] || "حركة"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.movement_date} {entry.note ? `· ${entry.note}` : ""}
                </p>
              </div>
              <span
                className={
                  entry.movement_type === "use"
                    ? "font-semibold text-amber-700"
                    : "font-semibold text-primary"
                }
              >
                {entry.movement_type === "use" ? "−" : "+"}
                {entry.quantity}
              </span>
            </div>
          ))}
          {!movements.length && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              لا توجد حركة مسجلة لهذا العنصر.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            إغلاق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function categoryName(value: string) {
  return (
    CATEGORIES.find((category) => category.value === value)?.label ||
    value ||
    "غير محدد"
  );
}
function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

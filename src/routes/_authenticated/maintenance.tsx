import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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

export const Route = createFileRoute("/_authenticated/maintenance")({
  component: Maintenance,
});

function assetLabel(asset: any) {
  return `${asset.name} - ${asset.asset_id || asset.serial_number || asset.id}`;
}

function Maintenance() {
  const qc = useQueryClient();
  const [record, setRecord] = useState<any>();
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
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">سجلات الصيانة</h1>
          <p className="text-sm text-muted-foreground">
            الصيانة الوقائية والتصحيحية
          </p>
        </div>
        <Button onClick={() => setRecord({})}>
          <Plus className="ml-2 size-4" />
          إضافة سجل
        </Button>
      </header>
      <div className="surface-panel overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-right text-muted-foreground">
              {["الأصل", "التاريخ", "النوع", "الحالة", "الفني", "الحل", "التكلفة", ""].map(
                (header) => (
                  <th key={header} className="p-4">
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {records.map((maintenanceRecord: any) => (
              <tr
                key={maintenanceRecord.id}
                className="cursor-pointer border-b transition-colors hover:bg-muted/50"
                onClick={() => setRecord(maintenanceRecord)}
              >
                <td className="p-4">
                  {(() => {
                    const asset = assets.find((item: any) => item.id === maintenanceRecord.asset_id);
                    return asset ? <><p className="font-medium">{asset.name}</p><p className="font-mono text-xs text-muted-foreground">{asset.asset_id || asset.serial_number || "—"}</p></> : "—";
                  })()}
                </td>
                <td className="p-4">{maintenanceRecord.maintenance_date}</td>
                <td className="p-4">{maintenanceRecord.maintenance_type === "Preventive" ? "وقائية" : "تصحيحية"}</td>
                <td className="p-4">{maintenanceRecord.status === "Closed" ? "مغلقة" : "مفتوحة"}</td>
                <td className="p-4">{maintenanceRecord.technician || "—"}</td>
                <td className="max-w-64 p-4">{maintenanceRecord.resolution || "—"}</td>
                <td className="p-4">{maintenanceRecord.cost || 0}</td>
                <td className="p-4">
                  <Button size="icon" variant="ghost" aria-label="تعديل السجل" onClick={(event) => { event.stopPropagation(); setRecord(maintenanceRecord); }}><Pencil className="size-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {record && (
        <MaintenanceForm
          key={record.id ?? "new"}
          record={record}
          assets={assets}
          inventory={inventory}
          close={() => setRecord(undefined)}
          saved={() => qc.invalidateQueries()}
        />
      )}
    </div>
  );
}
function MaintenanceForm({ record, assets, inventory, close, saved }: any) {
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
    const payload = { ...form, cost: Number(form.cost || 0) };
    const result = form.id
      ? await supabase.from("asset_maintenance").update(payload).eq("id", form.id)
      : await supabase.from("asset_maintenance").insert(payload);
    if (result.error) return toast.error(result.error.message);
    if (!form.id) {
      for (const used of form.used_items) {
        const item = inventory.find((entry: any) => entry.id === used.id);
        if (item)
          await supabase
            .from("inventory_items")
            .update({
              quantity: Math.max(0, Number(item.quantity) - Number(used.quantity)),
            })
            .eq("id", item.id);
      }
    }
    saved();
    toast.success(form.id ? "تم تعديل سجل الصيانة" : "تمت إضافة سجل الصيانة");
    close();
  };
  const remove = async () => {
    if (!form.id || !confirm("حذف سجل الصيانة؟")) return;
    const result = await supabase.from("asset_maintenance").delete().eq("id", form.id);
    if (result.error) return toast.error(result.error.message);
    saved();
    toast.success("تم حذف سجل الصيانة");
    close();
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{form.id ? "تعديل سجل الصيانة" : "إضافة سجل صيانة"}</DialogTitle>
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
            ["الفني", "technician"],
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
            {inventory.map((item: any) => (
              <div key={item.id} className="mb-2 flex gap-2">
                <span className="flex-1 text-sm">
                  {item.name} ({item.quantity})
                </span>
                <Input
                  className="w-24"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.used_items.find((used: any) => used.id === item.id)?.quantity || ""}
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
          {form.id && <Button variant="outline" className="text-destructive" onClick={remove}><Trash2 className="ml-2 size-4" />حذف</Button>}
          <Button variant="outline" onClick={close}>
            إلغاء
          </Button>
          <Button onClick={save}>حفظ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

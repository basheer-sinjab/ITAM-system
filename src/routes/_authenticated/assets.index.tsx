import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Boxes, Monitor, Plus, Search, UserRound } from "lucide-react";
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
import { PrinterImage } from "@/components/PrinterImage";
import { ASSET_TYPES, uploadPrinterImage } from "@/lib/pms";
import { toast } from "sonner";

const NONE = "__none__";
export const Route = createFileRoute("/_authenticated/assets/")({
  component: AssetsPage,
});

function AssetsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("__all__");
  const [open, setOpen] = useState(false);
  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () =>
      (
        await supabase
          .from("assets")
          .select("*")
          .order("created_at", { ascending: false })
      ).data ?? [],
  });
  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () =>
      (await supabase.from("employees").select("*").order("full_name")).data ??
      [],
  });
  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => (await supabase.from("departments").select("*").order("name")).data ?? [],
  });
  const filtered = assets.filter(
    (asset: any) =>
      (type === "__all__" || asset.asset_type === type) &&
      [asset.name, asset.asset_id, asset.serial_number, asset.model].some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
  );
  const assignedAssets = assets.filter((asset: any) => asset.assigned_employee_id).length;
  const activeAssets = assets.filter((asset: any) => asset.status === "active").length;
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <ManagementHeader
        icon={Monitor}
        title="الأصول"
        description={`${filtered.length} أصل معروض من أصل ${assets.length}`}
        action={<Button className="gap-2" onClick={() => setOpen(true)}>
          <Plus className="size-4" />
          إضافة أصل
        </Button>}
      />
      <section className="grid gap-3 sm:grid-cols-3">
        <MetricCard icon={Boxes} label="إجمالي الأصول" value={assets.length} />
        <MetricCard icon={UserRound} label="أصول معيّنة" value={assignedAssets} tone="emerald" />
        <MetricCard icon={Monitor} label="أصول نشطة" value={activeAssets} tone="amber" />
      </section>
      <div className="surface-panel grid gap-3 p-4 md:grid-cols-2">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pr-9"
            placeholder="بحث بالاسم أو الرقم التسلسلي…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">كل الأنواع</SelectItem>
            {ASSET_TYPES.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((asset: any) => (
          <Link
            key={asset.id}
            to="/assets/$id"
            params={{ id: asset.id }}
            className="surface-panel interactive-card overflow-hidden hover:interactive-card-hover"
          >
            <PrinterImage
              path={asset.image_url}
              alt={asset.name}
              className="h-40 w-full"
            />
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2"><p className="font-semibold">{asset.name}</p><span className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">{asset.asset_type}</span></div>
              <p className="text-sm text-muted-foreground">
                {asset.manufacturer || "الشركة غير محددة"}
              </p>
              <p className="text-xs text-muted-foreground">{asset.assigned_employee_id ? `معين لـ (${employees.find((employee: any) => employee.id === asset.assigned_employee_id)?.full_name ?? "موظف"})` : "غير معين"}</p>
              <p className="text-xs text-muted-foreground">القسم: {departments.find((department: any) => department.id === asset.department_id)?.name ?? "غير محدد"}</p>
              <div className="flex items-center justify-between border-t pt-2 text-xs text-muted-foreground"><span className="font-mono">{asset.asset_id}</span><span className="flex items-center gap-1.5"><span className={`size-2.5 rounded-full ${asset.status === "active" ? "bg-emerald-500" : asset.status === "maintenance" ? "bg-amber-500" : asset.status === "retired" ? "bg-slate-400" : "bg-rose-500"}`} />{asset.status === "active" ? "نشط" : asset.status === "maintenance" ? "صيانة" : asset.status === "retired" ? "متقاعد" : "غير نشط"}</span></div>
            </div>
          </Link>
        ))}
      </div>
      <AssetForm
        open={open}
        onOpenChange={setOpen}
        employees={employees}
        departments={departments}
        onSaved={() => queryClient.invalidateQueries()}
      />
    </div>
  );
}

export function AssetForm({
  open,
  onOpenChange,
  employees,
  departments,
  asset,
  onSaved,
}: any) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<any>({
    name: "",
    asset_type: "Printer",
    manufacturer: "",
    model: "",
    serial_number: "",
    status: "active",
    location: "",
    department_id: NONE,
    assigned_employee_id: NONE,
    notes: "",
  });
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (open) {
      setForm(
        asset
          ? {
              ...asset,
              department_id: asset.department_id || NONE,
              assigned_employee_id: asset.assigned_employee_id || NONE,
            }
          : {
              name: "",
              asset_type: "Printer",
              manufacturer: "",
              model: "",
              serial_number: "",
              status: "active",
              location: "",
              department_id: NONE,
              assigned_employee_id: NONE,
              notes: "",
            },
      );
      setFile(null);
    }
  }, [open, asset]);
  const save = useMutation({
    mutationFn: async () => {
      if (!form.name.trim()) throw new Error("اسم الأصل مطلوب");
      const image_url = file
        ? await uploadPrinterImage(file)
        : (asset?.image_url ?? null);
      const assigned_employee_id =
        form.assigned_employee_id === NONE ? null : form.assigned_employee_id;
      const department_id = form.department_id === NONE ? null : form.department_id;
      const payload = {
        ...form,
        name: form.name.trim(),
        department_id,
        assigned_employee_id,
        image_url,
        asset_id: form.asset_id || undefined,
      };
      if (asset) {
        if (asset.assigned_employee_id !== assigned_employee_id) {
          const current = await supabase
            .from("assignment_history")
            .select("*")
            .eq("asset_id", asset.id)
            .eq("return_date", null)
            .maybeSingle();
          if (current.data)
            await supabase
              .from("assignment_history")
              .update({ return_date: new Date().toISOString().slice(0, 10) })
              .eq("id", current.data.id);
          if (assigned_employee_id)
            await supabase
              .from("assignment_history")
              .insert({
                asset_id: asset.id,
                employee_id: assigned_employee_id,
              });
        }
        const result = await supabase
          .from("assets")
          .update(payload)
          .eq("id", asset.id);
        if (result.error) throw result.error;
      } else {
        const result = await supabase.from("assets").insert(payload);
        if (result.error) throw result.error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSaved?.();
      onOpenChange(false);
      toast.success("تم حفظ الأصل");
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const set = (key: string, value: string) =>
    setForm((current: any) => ({ ...current, [key]: value }));
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{asset ? "تعديل أصل" : "إضافة أصل"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["رقم الأصل (يتولد تلقائياً إن ترك فارغاً)", "asset_id"],
            ["اسم الأصل *", "name"],
            ["الشركة المصنّعة", "manufacturer"],
            ["الموديل", "model"],
            ["الرقم التسلسلي", "serial_number"],
            ["الموقع", "location"],
          ].map(([label, key]) => (
            <div key={key} className="space-y-2">
              <Label>{label}</Label>
              <Input
                value={form[key] || ""}
                onChange={(e) => set(key, e.target.value)}
              />
            </div>
          ))}
          <div className="space-y-2">
            <Label>الحالة</Label>
            <Select value={form.status || "active"} onValueChange={(v) => set("status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="maintenance">تحت الصيانة</SelectItem>
                <SelectItem value="retired">متقاعد</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>نوع الأصل</Label>
            <Select
              value={form.asset_type}
              onValueChange={(v) => set("asset_type", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ASSET_TYPES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>الموظف المعيّن</Label>
            <Select
              value={form.assigned_employee_id}
              onValueChange={(v) => set("assigned_employee_id", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>غير معيّن</SelectItem>
                {employees.map((employee: any) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>القسم</Label>
            <Select value={form.department_id || NONE} onValueChange={(v) => set("department_id", v)}>
              <SelectTrigger><SelectValue placeholder="اختر القسم" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>غير محدد</SelectItem>
                {departments.map((department: any) => <SelectItem key={department.id} value={department.id}>{department.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>الصورة</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>ملاحظات</Label>
            <Textarea
              value={form.notes || ""}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={() => save.mutate()} disabled={save.isPending}>
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

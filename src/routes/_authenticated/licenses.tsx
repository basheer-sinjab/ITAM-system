import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  KeyRound,
  Plus,
  UsersRound,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { PrinterImage } from "@/components/PrinterImage";
import { uploadLicenseImage } from "@/lib/pms";

export const Route = createFileRoute("/_authenticated/licenses")({
  component: Licenses,
});

function Licenses() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [formOpen, setFormOpen] = useState(false);
  const [editingLicense, setEditingLicense] = useState<any>(null);
  const { data: licenses = [] } = useQuery({
    queryKey: ["licenses"],
    queryFn: async () =>
      (await supabase.from("licenses").select("*").order("license_name"))
        .data ?? [],
  });
  const { data: assignments = [] } = useQuery({
    queryKey: ["license-assignments"],
    queryFn: async () =>
      (await supabase.from("license_assignments").select("*")).data ?? [],
  });

  if (pathname !== "/licenses") return <Outlet />;

  const totalSeats = licenses.reduce(
    (total: number, license: any) => total + Number(license.seat_count || 0),
    0,
  );
  const usedSeats = assignments.length;
  const availableSeats = Math.max(0, totalSeats - usedSeats);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-wrap justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <KeyRound className="size-5" />
            </span>
            <h1 className="text-2xl font-bold">التراخيص</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            إدارة المقاعد والتعيينات
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setEditingLicense(null);
              setFormOpen(true);
            }}
          >
            <Plus className="ml-2 size-4" />
            إضافة ترخيص
          </Button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewMetric
          icon={KeyRound}
          label="التراخيص المسجلة"
          value={licenses.length}
          tone="blue"
        />
        <OverviewMetric
          icon={UsersRound}
          label="إجمالي المقاعد"
          value={totalSeats}
          tone="emerald"
        />
        <OverviewMetric
          icon={CheckCircle2}
          label="المقاعد المستخدمة"
          value={usedSeats}
          tone="amber"
        />
        <OverviewMetric
          icon={KeyRound}
          label="المقاعد المتاحة"
          value={availableSeats}
          tone="rose"
        />
      </section>

      <div className="flex items-center justify-between border-b pb-3">
        <div>
          <h2 className="font-semibold">سجل التراخيص</h2>
          <p className="text-sm text-muted-foreground">
            اضغط على أي ترخيص لعرض تفاصيله وتعييناته
          </p>
        </div>
        <span className="text-sm text-muted-foreground">
          {licenses.length} {licenses.length === 1 ? "ترخيص" : "تراخيص"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {licenses.map((license: any) => {
          const used = assignments.filter(
            (item: any) => item.license_id === license.id,
          ).length;
          const seatCount = Number(license.seat_count || 0);
          const available = Math.max(0, seatCount - used);
          const usagePercent = seatCount
            ? Math.min(100, (used / seatCount) * 100)
            : 0;
          const expiration = getExpirationStatus(license.expiration_date);
          return (
            <div
              key={license.id}
              role="link"
              tabIndex={0}
              className="surface-panel interactive-card group cursor-pointer overflow-hidden p-0 hover:interactive-card-hover"
              onClick={() =>
                navigate({ to: "/licenses/$id", params: { id: license.id } })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter")
                  navigate({ to: "/licenses/$id", params: { id: license.id } });
              }}
            >
              <div className="border-b bg-muted/30 p-5">
                <div className="flex items-start justify-between gap-3">
                  <PrinterImage path={license.image_url} alt={license.license_name} className="size-16 shrink-0 rounded-lg" fallback={<KeyRound className="size-7 opacity-60" />} />
                  <ArrowLeft className="mt-1 size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
                </div>
                <div className="mt-4">
                  <h2 className="font-semibold">{license.license_name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {license.product_name || "بدون منتج محدد"}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {license.license_type && (
                    <span className="rounded-md border bg-background px-2 py-1 text-xs text-muted-foreground">
                      {license.license_type}
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${expiration.className}`}
                  >
                    {expiration.icon === "warning" ? (
                      <AlertTriangle className="size-3.5" />
                    ) : (
                      <CalendarClock className="size-3.5" />
                    )}
                    {expiration.label}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <Seat value={seatCount} label="إجمالي" />
                  <Seat value={used} label="مستخدم" />
                  <Seat value={available} label="متاح" />
                </div>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>استخدام المقاعد</span>
                    <span>{Math.round(usagePercent)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  ينتهي: {license.expiration_date || "غير محدد"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {licenses.length === 0 && (
        <div className="surface-panel flex flex-col items-center justify-center gap-3 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <KeyRound className="size-7" />
          </span>
          <div>
            <h2 className="font-semibold">لا توجد تراخيص بعد</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              أضف أول ترخيص لتبدأ متابعة المقاعد والتعيينات.
            </p>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="ml-2 size-4" />
            إضافة ترخيص
          </Button>
        </div>
      )}
      {formOpen && (
        <LicenseForm
          license={editingLicense}
          close={() => {
            setFormOpen(false);
            setEditingLicense(null);
          }}
          saved={() => queryClient.invalidateQueries()}
        />
      )}
    </div>
  );
}

function Seat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <strong>{value}</strong>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}

function OverviewMetric({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof KeyRound;
  label: string;
  value: number;
  tone: "blue" | "emerald" | "amber" | "rose";
}) {
  const tones = {
    blue: "bg-primary/10 text-primary",
    emerald: "bg-emerald-500/10 text-emerald-700",
    amber: "bg-amber-500/10 text-amber-700",
    rose: "bg-rose-500/10 text-rose-700",
  };
  return (
    <div className="surface-panel flex items-center gap-3 p-4">
      <span
        className={`flex size-10 items-center justify-center rounded-lg ${tones[tone]}`}
      >
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

function getExpirationStatus(expirationDate?: string | null) {
  if (!expirationDate)
    return {
      label: "بدون انتهاء محدد",
      className: "bg-muted text-muted-foreground",
      icon: "calendar",
    };
  const daysRemaining = Math.ceil(
    (new Date(`${expirationDate}T00:00:00`).getTime() -
      new Date().setHours(0, 0, 0, 0)) /
      86400000,
  );
  if (daysRemaining < 0)
    return {
      label: "منتهي",
      className: "bg-destructive/10 text-destructive",
      icon: "warning",
    };
  if (daysRemaining <= 30)
    return {
      label: `ينتهي خلال ${daysRemaining} يوم`,
      className: "bg-amber-500/10 text-amber-700",
      icon: "warning",
    };
  return {
    label: "ساري",
    className: "bg-emerald-500/10 text-emerald-700",
    icon: "calendar",
  };
}

function LicenseForm({ license, close, saved }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<any>({
    license_name: license?.license_name ?? "",
    product_name: license?.product_name ?? "",
    license_type: license?.license_type ?? "",
    license_key: license?.license_key ?? "",
    contract_number: license?.contract_number ?? "",
    seat_count: license?.seat_count ?? 1,
    expiration_date: license?.expiration_date ?? "",
    notes: license?.notes ?? "",
    image_url: license?.image_url ?? null,
  });
  const set = (key: string, value: any) => setForm({ ...form, [key]: value });
  const save = async () => {
    if (!form.license_name.trim()) return toast.error("اسم الترخيص مطلوب");
    const image_url = file ? await uploadLicenseImage(file) : form.image_url;
    const payload = {
      ...form,
      image_url,
      license_name: form.license_name.trim(),
      seat_count: Number(form.seat_count || 0),
      expiration_date: form.expiration_date || null,
    };
    const result = license
      ? await supabase.from("licenses").update(payload).eq("id", license.id)
      : await supabase.from("licenses").insert(payload);
    if (result.error) return toast.error(result.error.message);
    saved();
    close();
    toast.success(license ? "تم تعديل الترخيص" : "تمت إضافة الترخيص");
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{license ? "تعديل ترخيص" : "إضافة ترخيص"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="اسم الترخيص">
            <Input
              value={form.license_name}
              onChange={(event) => set("license_name", event.target.value)}
            />
          </Field>
          <Field label="المنتج">
            <Input
              value={form.product_name}
              onChange={(event) => set("product_name", event.target.value)}
            />
          </Field>
          <Field label="نوع الترخيص">
            <Input
              value={form.license_type}
              onChange={(event) => set("license_type", event.target.value)}
            />
          </Field>
          <Field label="عدد المقاعد">
            <Input
              type="number"
              min="0"
              value={form.seat_count}
              onChange={(event) => set("seat_count", event.target.value)}
            />
          </Field>
          <Field label="مفتاح الترخيص">
            <Input
              value={form.license_key}
              onChange={(event) => set("license_key", event.target.value)}
            />
          </Field>
          <Field label="رقم العقد">
            <Input
              value={form.contract_number}
              onChange={(event) => set("contract_number", event.target.value)}
            />
          </Field>
          <Field label="تاريخ الانتهاء">
            <Input
              type="date"
              value={form.expiration_date}
              onChange={(event) => set("expiration_date", event.target.value)}
            />
          </Field>
          <Field label="ملاحظات" className="sm:col-span-2">
            <Textarea
              value={form.notes}
              onChange={(event) => set("notes", event.target.value)}
            />
          </Field>
          <Field label="صورة الترخيص" className="sm:col-span-2">
            <div className="flex items-center gap-4 rounded-lg border border-dashed p-3">
              <PrinterImage
                path={file ? URL.createObjectURL(file) : form.image_url}
                alt="صورة الترخيص"
                className="size-24 rounded-md"
                fallback={<KeyRound className="size-10 opacity-60" />}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
            </div>
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

function AssignmentForm({ licenses, employees, assets, close, saved }: any) {
  const [form, setForm] = useState<any>({
    license_id: "",
    employee_id: "__none__",
    asset_id: "__none__",
    assignment_date: new Date().toISOString().slice(0, 10),
  });
  const save = async () => {
    if (!form.license_id) return toast.error("اختر ترخيصاً");
    const result = await supabase.from("license_assignments").insert({
      ...form,
      employee_id: form.employee_id === "__none__" ? null : form.employee_id,
      asset_id: form.asset_id === "__none__" ? null : form.asset_id,
    });
    if (result.error) return toast.error(result.error.message);
    saved();
    close();
    toast.success("تم تعيين الترخيص");
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعيين ترخيص</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Picker
            label="الترخيص"
            value={form.license_id}
            onChange={(value: string) =>
              setForm({ ...form, license_id: value })
            }
            options={licenses}
            name="license_name"
            required
          />
          <Picker
            label="الموظف"
            value={form.employee_id}
            onChange={(value: string) =>
              setForm({ ...form, employee_id: value })
            }
            options={employees}
            name="full_name"
          />
          <Picker
            label="الأصل"
            value={form.asset_id}
            onChange={(value: string) => setForm({ ...form, asset_id: value })}
            options={assets}
            name="name"
          />
          <Field label="تاريخ التعيين">
            <Input
              type="date"
              value={form.assignment_date}
              onChange={(event) =>
                setForm({ ...form, assignment_date: event.target.value })
              }
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

function Picker({
  label,
  value,
  onChange,
  options,
  name,
  required = false,
}: any) {
  return (
    <Field label={label}>
      <select
        className="flex h-10 w-full rounded-md border bg-background px-3 text-sm"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{required ? "اختر…" : "غير محدد"}</option>
        {!required && <option value="__none__">غير محدد</option>}
        {options.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item[name]}
          </option>
        ))}
      </select>
    </Field>
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

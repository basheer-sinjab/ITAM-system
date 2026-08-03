import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowRight,
  KeyRound,
  Trash2,
  UserRound,
  Monitor,
  Pencil,
  Plus,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ConfirmButton";
import { canAssignLicense } from "@/lib/data-rules.mjs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/licenses/$id")({
  component: LicenseDetails,
});

function LicenseDetails() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const { data: license, isLoading } = useQuery({
    queryKey: ["license", id],
    queryFn: async () =>
      (await supabase.from("licenses").select("*").eq("id", id).maybeSingle())
        .data,
  });
  const { data: assignments = [] } = useQuery({
    queryKey: ["license-assignments", id],
    queryFn: async () =>
      (
        await supabase
          .from("license_assignments")
          .select("*")
          .eq("license_id", id)
          .order("assignment_date", { ascending: false })
      ).data ?? [],
  });
  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () =>
      (await supabase.from("employees").select("*")).data ?? [],
  });
  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => (await supabase.from("assets").select("*")).data ?? [],
  });
  if (isLoading) return <p className="text-muted-foreground">جارٍ التحميل…</p>;
  if (!license)
    return <p className="text-muted-foreground">الترخيص غير موجود.</p>;
  const removeAssignment = async (assignment: any) => {
    const result = await supabase
      .from("license_assignments")
      .delete()
      .eq("id", assignment.id);
    if (result.error) return toast.error(result.error.message);
    queryClient.invalidateQueries();
    toast.success("تمت إزالة تعيين الترخيص");
  };
  const refresh = () => queryClient.invalidateQueries();
  const removeLicense = async () => {
    const assignmentsResult = await supabase
      .from("license_assignments")
      .delete()
      .eq("license_id", license.id);
    if (assignmentsResult.error)
      return toast.error(assignmentsResult.error.message);
    const result = await supabase
      .from("licenses")
      .delete()
      .eq("id", license.id);
    if (result.error) return toast.error(result.error.message);
    refresh();
    toast.success("تم حذف الترخيص");
    navigate({ to: "/licenses" });
  };
  const available = Math.max(
    0,
    Number(license.seat_count) - assignments.length,
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Link to="/licenses">
            <Button
              variant="ghost"
              size="icon"
              aria-label="العودة إلى التراخيص"
            >
              <ArrowRight className="size-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{license.license_name}</h1>
            <p className="text-sm text-muted-foreground">
              {license.product_name || "بدون منتج محدد"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            disabled={!canAssignLicense(license.seat_count, assignments.length)}
            onClick={() => setAssignmentOpen(true)}
          >
            <Plus className="ml-2 size-4" />
            {available ? "تعيين الترخيص" : "لا توجد مقاعد"}
          </Button>
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            <Pencil className="ml-2 size-4" />
            تعديل
          </Button>
          <ConfirmButton
            variant="destructive"
            title="حذف الترخيص؟"
            description={`سيتم حذف ${license.license_name} وجميع تعييناته.`}
            onConfirm={removeLicense}
          >
            <Trash2 className="ml-2 size-4" />
            حذف
          </ConfirmButton>
        </div>
      </header>
      <section className="surface-panel grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <Info label="نوع الترخيص" value={license.license_type} />
        <Info label="تاريخ الانتهاء" value={license.expiration_date} />
        <Info label="إجمالي المقاعد" value={license.seat_count} />
        <Info label="المقاعد المتاحة" value={available} />
        <Info label="مفتاح الترخيص" value={license.license_key} />
        <Info label="رقم العقد" value={license.contract_number} />
      </section>
      {license.notes && (
        <section className="surface-panel p-5">
          <p className="text-xs text-muted-foreground">ملاحظات</p>
          <p className="mt-1">{license.notes}</p>
        </section>
      )}
      <section className="surface-panel overflow-hidden">
        <div className="flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-2">
            <KeyRound className="size-5 text-primary" />
            <h2 className="font-semibold">تعيينات الترخيص</h2>
          </div>
          <span className="text-sm text-muted-foreground">
            {assignments.length} مستخدم
          </span>
        </div>
        {assignments.length === 0 ? (
          <p className="p-5 text-sm text-muted-foreground">
            لا توجد تعيينات لهذا الترخيص.
          </p>
        ) : (
          <div className="divide-y">
            {assignments.map((assignment: any) => (
              <AssignmentRow
                key={assignment.id}
                assignment={assignment}
                employee={employees.find(
                  (employee: any) => employee.id === assignment.employee_id,
                )}
                asset={assets.find(
                  (asset: any) => asset.id === assignment.asset_id,
                )}
                remove={() => removeAssignment(assignment)}
              />
            ))}
          </div>
        )}
      </section>
      {editOpen && (
        <EditLicenseDialog
          license={license}
          close={() => setEditOpen(false)}
          saved={refresh}
        />
      )}
      {assignmentOpen && (
        <AssignLicenseDialog
          license={license}
          employees={employees}
          assets={assets}
          close={() => setAssignmentOpen(false)}
          saved={refresh}
        />
      )}
    </div>
  );

  function AssignmentRow({ assignment, employee, asset, remove }: any) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="space-y-1">
          <p className="flex items-center gap-2 font-medium">
            {employee ? (
              <UserRound className="size-4 text-primary" />
            ) : (
              <Monitor className="size-4 text-primary" />
            )}
            {employee?.full_name || asset?.name || "غير محدد"}
          </p>
          {asset && (
            <p className="text-sm text-muted-foreground">
              الأصل: {asset.asset_id || asset.name}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            تاريخ التعيين: {assignment.assignment_date || "—"}
          </p>
        </div>
        <ConfirmButton
          variant="ghost"
          size="icon"
          aria-label="إزالة التعيين"
          title="إزالة التعيين؟"
          description="سيعود المقعد إلى المقاعد المتاحة في هذا الترخيص."
          confirmLabel="إزالة"
          onConfirm={remove}
        >
          <Trash2 className="size-4 text-destructive" />
        </ConfirmButton>
      </div>
    );
  }

  function EditLicenseDialog({ license, close, saved }: any) {
    const [form, setForm] = useState({
      license_name: license.license_name ?? "",
      product_name: license.product_name ?? "",
      license_type: license.license_type ?? "",
      license_key: license.license_key ?? "",
      contract_number: license.contract_number ?? "",
      seat_count: license.seat_count ?? 1,
      expiration_date: license.expiration_date ?? "",
      notes: license.notes ?? "",
    });
    const set = (key: string, value: any) => setForm({ ...form, [key]: value });
    const save = async () => {
      if (!form.license_name.trim()) return toast.error("اسم الترخيص مطلوب");
      if (Number(form.seat_count) < assignments.length)
        return toast.error(
          `لا يمكن تقليل المقاعد عن ${assignments.length} لأنها مستخدمة حاليًا`,
        );
      const result = await supabase
        .from("licenses")
        .update({
          ...form,
          license_name: form.license_name.trim(),
          seat_count: Number(form.seat_count || 0),
          expiration_date: form.expiration_date || null,
        })
        .eq("id", license.id);
      if (result.error) return toast.error(result.error.message);
      saved();
      close();
      toast.success("تم تعديل الترخيص");
    };
    return (
      <Dialog open onOpenChange={close}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل الترخيص</DialogTitle>
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
                min={assignments.length}
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

  function AssignLicenseDialog({
    license,
    employees,
    assets,
    close,
    saved,
  }: any) {
    const [form, setForm] = useState({
      employee_id: "__none__",
      asset_id: "__none__",
      assignment_date: new Date().toISOString().slice(0, 10),
    });
    const save = async () => {
      if (!canAssignLicense(license.seat_count, assignments.length))
        return toast.error("لا توجد مقاعد متاحة في هذا الترخيص");
      if (form.employee_id === "__none__" && form.asset_id === "__none__")
        return toast.error("اختر موظفًا أو أصلًا للتعيين");
      const duplicate = assignments.some(
        (assignment: any) =>
          (form.employee_id !== "__none__" &&
            assignment.employee_id === form.employee_id) ||
          (form.asset_id !== "__none__" &&
            assignment.asset_id === form.asset_id),
      );
      if (duplicate)
        return toast.error("هذا الموظف أو الأصل لديه الترخيص بالفعل");
      const result = await supabase.from("license_assignments").insert({
        license_id: license.id,
        employee_id: form.employee_id === "__none__" ? null : form.employee_id,
        asset_id: form.asset_id === "__none__" ? null : form.asset_id,
        assignment_date: form.assignment_date,
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
            <DialogTitle>تعيين {license.license_name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="الموظف">
              <select
                className="flex h-10 w-full rounded-md border bg-background px-3 text-sm"
                value={form.employee_id}
                onChange={(event) =>
                  setForm({ ...form, employee_id: event.target.value })
                }
              >
                <option value="__none__">غير محدد</option>
                {employees.map((employee: any) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.full_name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="الأصل">
              <select
                className="flex h-10 w-full rounded-md border bg-background px-3 text-sm"
                value={form.asset_id}
                onChange={(event) =>
                  setForm({ ...form, asset_id: event.target.value })
                }
              >
                <option value="__none__">غير محدد</option>
                {assets.map((asset: any) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name} -{" "}
                    {asset.asset_id || asset.serial_number || asset.id}
                  </option>
                ))}
              </select>
            </Field>
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
  function Info({
    label,
    value,
  }: {
    label: string;
    value?: string | number | null;
  }) {
    return (
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 font-medium">{value || "—"}</p>
      </div>
    );
  }
}
/*
  return <div className="mx-auto max-w-6xl space-y-6"><header className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-start gap-3"><Link to="/licenses"><Button variant="ghost" size="icon" aria-label="العودة إلى التراخيص"><ArrowRight className="size-5" /></Button></Link><div><h1 className="text-2xl font-bold">{license.license_name}</h1><p className="text-sm text-muted-foreground">{license.product_name || "بدون منتج محدد"}</p></div></div><Link to="/licenses"><Button variant="outline">إدارة التراخيص</Button></Link></header><section className="surface-panel grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4"><Info label="نوع الترخيص" value={license.license_type} /><Info label="تاريخ الانتهاء" value={license.expiration_date} /><Info label="إجمالي المقاعد" value={license.seat_count} /><Info label="المقاعد المتاحة" value={available} /></section>{license.notes && <section className="surface-panel p-5"><p className="text-xs text-muted-foreground">ملاحظات</p><p className="mt-1">{license.notes}</p></section>}<section className="surface-panel overflow-hidden"><div className="flex items-center justify-between border-b p-5"><div className="flex items-center gap-2"><KeyRound className="size-5 text-primary" /><h2 className="font-semibold">تعيينات الترخيص</h2></div><span className="text-sm text-muted-foreground">{assignments.length} مستخدم</span></div>{assignments.length === 0 ? <p className="p-5 text-sm text-muted-foreground">لا توجد تعيينات لهذا الترخيص.</p> : <div className="divide-y">{assignments.map((assignment: any) => { const employee = employees.find((item: any) => item.id === assignment.employee_id); const asset = assets.find((item: any) => item.id === assignment.asset_id); return <div key={assignment.id} className="flex flex-wrap items-center justify-between gap-4 p-5"><div className="space-y-1"><p className="flex items-center gap-2 font-medium">{employee ? <UserRound className="size-4 text-primary" /> : <Monitor className="size-4 text-primary" />}{employee?.full_name || asset?.name || "تعيين غير محدد"}</p>{asset && <p className="font-mono text-xs text-muted-foreground">{asset.asset_id || asset.name}</p>}<p className="text-sm text-muted-foreground">تاريخ التعيين: {assignment.assignment_date || "—"}</p></div><Button variant="ghost" size="icon" aria-label="إزالة التعيين" onClick={() => removeAssignment(assignment)}><Trash2 className="size-4 text-destructive" /></Button></div>; })}</div>}</section></div>;
}

*/
function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value || "—"}</p>
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  KeyRound,
  Mail,
  Monitor,
  Pencil,
  Phone,
  Trash2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ConfirmButton } from "@/components/ConfirmButton";
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
import { ScopeColorBadges } from "@/components/ScopeColorBadges";

export const Route = createFileRoute(
  "/_authenticated/people-departments/employee/$id",
)({ component: EmployeeDetails });

function EmployeeDetails() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const { data: employee, isLoading } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () =>
      (await supabase.from("employees").select("*").eq("id", id).maybeSingle())
        .data,
  });
  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: async () =>
      (await supabase.from("departments").select("*").order("name")).data ?? [],
  });
  const { data: branches = [] } = useQuery({
    queryKey: ["branches"],
    queryFn: async () =>
      (await supabase.from("branches").select("*").order("name")).data ?? [],
  });
  const { data: assets = [] } = useQuery({
    queryKey: ["employee-assets", id],
    queryFn: async () =>
      (await supabase.from("assets").select("*").eq("assigned_employee_id", id))
        .data ?? [],
  });
  const { data: assignments = [] } = useQuery({
    queryKey: ["employee-license-assignments", id],
    queryFn: async () =>
      (
        await supabase
          .from("license_assignments")
          .select("*")
          .eq("employee_id", id)
      ).data ?? [],
  });
  const { data: licenses = [] } = useQuery({
    queryKey: ["licenses"],
    queryFn: async () =>
      (await supabase.from("licenses").select("*")).data ?? [],
  });

  if (isLoading) return <p className="text-muted-foreground">جارٍ التحميل…</p>;
  if (!employee)
    return <p className="text-muted-foreground">الموظف غير موجود.</p>;

  const department = departments.find(
    (item: any) => item.id === employee.department_id,
  );
  const branchName =
    branches.find((branch: any) => branch.id === department?.branch_id)?.name ||
    branches.find((branch: any) => branch.name === department?.branch)?.name;
  const departmentLabel = department
    ? `${department.name} - ${branchName || "فرع غير محدد"}`
    : "بدون قسم";
  const branch = branches.find(
    (item: any) =>
      item.id === department?.branch_id ||
      (!department?.branch_id && item.name === department?.branch),
  );
  const assignedLicenses = assignments
    .map((assignment: any) =>
      licenses.find((license: any) => license.id === assignment.license_id),
    )
    .filter(Boolean);
  const remove = async () => {
    const historyResult = await supabase
      .from("assignment_history")
      .update({
        return_date: new Date().toISOString().slice(0, 10),
        return_condition: "good",
        return_notes: "تم إرجاع الأصل عند حذف الموظف",
      })
      .eq("employee_id", id)
      .eq("return_date", null);
    if (historyResult.error) return toast.error(historyResult.error.message);
    const licensesResult = await supabase
      .from("license_assignments")
      .delete()
      .eq("employee_id", id);
    if (licensesResult.error) return toast.error(licensesResult.error.message);
    const assetsResult = await supabase
      .from("assets")
      .update({ assigned_employee_id: null })
      .eq("assigned_employee_id", id);
    if (assetsResult.error) return toast.error(assetsResult.error.message);
    const result = await supabase.from("employees").delete().eq("id", id);
    if (result.error) return toast.error(result.error.message);
    queryClient.invalidateQueries();
    toast.success("تم حذف الموظف");
    navigate({ to: "/people-departments" });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Link to="/people-departments">
            <Button
              variant="ghost"
              size="icon"
              aria-label="العودة إلى الموظفين"
            >
              <ArrowRight className="size-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{employee.full_name}</h1>
            <p className="text-sm text-muted-foreground">{departmentLabel}</p>
            <div className="mt-2">
              <ScopeColorBadges department={department} branch={branch} />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            <Pencil className="ml-2 size-4" />
            تعديل
          </Button>
          <ConfirmButton
            variant="outline"
            className="text-destructive"
            title="حذف الموظف؟"
            description={`سيتم حذف ${employee.full_name} وإلغاء ربط أصوله وتراخيصه.`}
            onConfirm={remove}
          >
            <Trash2 className="ml-2 size-4" />
            حذف
          </ConfirmButton>
        </div>
      </header>
      <section className="surface-panel grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
        <Info label="رقم الموظف" value={employee.employee_number} />
        <Info label="البريد الإلكتروني" value={employee.email} icon={Mail} />
        <Info label="الهاتف" value={employee.phone} icon={Phone} />
        <Info
          label="الحالة"
          value={employee.status === "inactive" ? "غير نشط" : "نشط"}
        />
      </section>
      <section className="grid gap-5 lg:grid-cols-2">
        <List
          title="الأصول المعيّنة"
          icon={Monitor}
          empty="لا توجد أصول معيّنة."
          items={assets.map((asset: any) => (
            <div key={asset.id}>
              <p className="font-medium">{asset.name}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {asset.asset_id || "—"}
              </p>
            </div>
          ))}
        />
        <List
          title="التراخيص المعيّنة"
          icon={KeyRound}
          empty="لا توجد تراخيص معيّنة."
          items={assignedLicenses.map((license: any) => (
            <div key={license.id}>
              <p className="font-medium">{license.license_name}</p>
              <p className="text-xs text-muted-foreground">
                {license.product_name || "—"}
              </p>
            </div>
          ))}
        />
      </section>
      <EmployeeEdit
        open={editOpen}
        onOpenChange={setEditOpen}
        employee={employee}
        departments={departments}
        branches={branches}
        saved={() => queryClient.invalidateQueries()}
      />
    </div>
  );
}

function Info({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: string | null;
  icon?: React.ElementType;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 flex items-center gap-2 font-medium">
        {Icon && <Icon className="size-4 text-primary" />}
        {value || "—"}
      </p>
    </div>
  );
}

function List({
  title,
  icon: Icon,
  empty,
  items,
}: {
  title: string;
  icon: React.ElementType;
  empty: string;
  items: React.ReactNode[];
}) {
  return (
    <section className="surface-panel overflow-hidden">
      <div className="flex items-center gap-2 border-b p-5">
        <Icon className="size-4 text-primary" />
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="divide-y">
        {items.length ? (
          items.map((item, index) => (
            <div key={index} className="p-5">
              {item}
            </div>
          ))
        ) : (
          <p className="p-5 text-sm text-muted-foreground">{empty}</p>
        )}
      </div>
    </section>
  );
}

function EmployeeEdit({
  open,
  onOpenChange,
  employee,
  departments,
  branches,
  saved,
}: any) {
  const [form, setForm] = useState<any>({});
  useEffect(() => {
    if (open)
      setForm({
        ...employee,
        department_id: employee.department_id || "__none__",
      });
  }, [open, employee]);
  const set = (key: string, value: any) => setForm({ ...form, [key]: value });
  const save = async () => {
    if (!form.full_name?.trim()) return toast.error("الاسم الكامل مطلوب");
    const nextDepartmentId =
      form.department_id === "__none__" ? null : form.department_id;
    const departmentChanged =
      (employee.department_id || null) !== (nextDepartmentId || null);
    const result = await supabase
      .from("employees")
      .update({
        ...form,
        employee_number: form.employee_number?.trim() || null,
        full_name: form.full_name.trim(),
        department_id: nextDepartmentId,
      })
      .eq("id", employee.id);
    if (result.error) return toast.error(result.error.message);
    saved();
    onOpenChange(false);
    toast.success(
      departmentChanged
        ? "تم تعديل الموظف ونقل أصوله إلى القسم الجديد"
        : "تم تعديل الموظف",
    );
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل الموظف</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="رقم الموظف">
            <Input
              value={form.employee_number || ""}
              onChange={(event) => set("employee_number", event.target.value)}
            />
          </Field>
          <Field label="الاسم الكامل">
            <Input
              value={form.full_name || ""}
              onChange={(event) => set("full_name", event.target.value)}
            />
          </Field>
          <Field label="البريد الإلكتروني">
            <Input
              value={form.email || ""}
              onChange={(event) => set("email", event.target.value)}
            />
          </Field>
          <Field label="الهاتف">
            <Input
              value={form.phone || ""}
              onChange={(event) => set("phone", event.target.value)}
            />
          </Field>
          <Field label="القسم">
            <Select
              value={form.department_id || "__none__"}
              onValueChange={(value) => set("department_id", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">غير محدد</SelectItem>
                {departments.map((department: any) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name} -{" "}
                    {branches.find(
                      (branch: any) => branch.id === department.branch_id,
                    )?.name ||
                      department.branch ||
                      "فرع غير محدد"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="الحالة">
            <Select
              value={form.status || "active"}
              onValueChange={(value) => set("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="ملاحظات" className="sm:col-span-2">
            <Textarea
              value={form.notes || ""}
              onChange={(event) => set("notes", event.target.value)}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
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

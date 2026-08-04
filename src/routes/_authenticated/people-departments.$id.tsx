import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Mail,
  Monitor,
  Pencil,
  Phone,
  Trash2,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ConfirmButton";
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
import { COLOR_PALETTE, ColorField } from "@/components/ColorField";

export const Route = createFileRoute("/_authenticated/people-departments/$id")({
  component: DepartmentDetails,
});

function DepartmentDetails() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const { data: department, isLoading } = useQuery({
    queryKey: ["department", id],
    queryFn: async () =>
      (
        await supabase
          .from("departments")
          .select("*")
          .eq("id", id)
          .maybeSingle()
      ).data,
  });
  const { data: employees = [] } = useQuery({
    queryKey: ["department-employees", id],
    queryFn: async () =>
      (
        await supabase
          .from("employees")
          .select("*")
          .eq("department_id", id)
          .order("full_name")
      ).data ?? [],
  });
  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => (await supabase.from("assets").select("*")).data ?? [],
  });
  const { data: branches = [] } = useQuery({
    queryKey: ["branches"],
    queryFn: async () =>
      (await supabase.from("branches").select("*").order("name")).data ?? [],
  });
  if (isLoading) return <p className="text-muted-foreground">جارٍ التحميل…</p>;
  if (!department)
    return <p className="text-muted-foreground">القسم غير موجود.</p>;
  const departmentAssets = assets.filter(
    (asset: any) =>
      asset.department_id === id ||
      employees.some(
        (employee: any) => employee.id === asset.assigned_employee_id,
      ),
  );
  const branchName =
    branches.find((branch: any) => branch.id === department.branch_id)?.name ||
    branches.find((branch: any) => branch.name === department.branch)?.name ||
    "فرع غير محدد";
  const remove = async () => {
    const detach = await supabase
      .from("employees")
      .update({ department_id: null })
      .eq("department_id", id);
    if (detach.error) return toast.error(detach.error.message);
    const result = await supabase.from("departments").delete().eq("id", id);
    if (result.error) return toast.error(result.error.message);
    queryClient.invalidateQueries();
    toast.success("تم حذف القسم");
    navigate({ to: "/people-departments", search: { tab: "departments" } });
  };
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Link to="/people-departments" search={{ tab: "departments" }}>
            <Button variant="ghost" size="icon" aria-label="العودة إلى الأقسام">
              <ArrowRight className="size-5" />
            </Button>
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold">{department.name}</h1>
              <span className="rounded-md bg-sky-500/10 px-2 py-1 text-xs font-medium text-sky-700">
                {branchName}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {department.notes || "لا يوجد وصف للقسم."}
            </p>
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
            title="حذف القسم؟"
            description={`سيتم حذف قسم ${department.name} وسيبقى موظفوه بدون قسم.`}
            onConfirm={remove}
          >
            <Trash2 className="ml-2 size-4" />
            حذف
          </ConfirmButton>
        </div>
      </header>
      <section className="grid gap-4 sm:grid-cols-2">
        <Summary icon={Users} value={employees.length} label="موظف في القسم" />
        <Summary
          icon={Monitor}
          value={departmentAssets.length}
          label="أصل معيّن لموظفي القسم"
        />
      </section>
      <section className="surface-panel overflow-hidden">
        <div className="border-b p-5">
          <h2 className="font-semibold">موظفو القسم</h2>
        </div>
        {employees.length === 0 ? (
          <p className="p-5 text-sm text-muted-foreground">
            لا يوجد موظفون في هذا القسم.
          </p>
        ) : (
          <div className="divide-y">
            {employees.map((employee: any) => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                assets={assets.filter(
                  (asset: any) => asset.assigned_employee_id === employee.id,
                )}
              />
            ))}
          </div>
        )}
      </section>
      <DepartmentEdit
        open={editOpen}
        onOpenChange={setEditOpen}
        department={department}
        branches={branches}
        saved={() => queryClient.invalidateQueries()}
      />
    </div>
  );
}

function EmployeeRow({ employee, assets }: { employee: any; assets: any[] }) {
  return (
    <div className="grid gap-4 p-5 lg:grid-cols-3">
      <div>
        <p className="font-medium">{employee.full_name}</p>
        <p className="text-sm text-muted-foreground">
          {employee.status === "inactive" ? "غير نشط" : "نشط"}
        </p>
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <Mail className="size-4" />
          {employee.email || "—"}
        </p>
        <p className="flex items-center gap-2">
          <Phone className="size-4" />
          {employee.phone || "—"}
        </p>
      </div>
      <div>
        <p className="mb-2 flex items-center gap-2 text-sm font-medium">
          <Monitor className="size-4 text-primary" />
          الأصول المعيّنة
        </p>
        {assets.length === 0 ? (
          <p className="text-sm text-muted-foreground">لا توجد أصول معيّنة.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {assets.map((asset) => (
              <li key={asset.id}>
                {asset.name}{" "}
                <span className="font-mono text-xs text-muted-foreground">
                  ({asset.asset_id || "—"})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
function DepartmentEdit({
  open,
  onOpenChange,
  department,
  branches = [],
  saved,
}: any) {
  const [name, setName] = useState("");
  const [branchId, setBranchId] = useState("");
  const [color, setColor] = useState(COLOR_PALETTE[0]);
  const [notes, setNotes] = useState("");
  useEffect(() => {
    if (open) {
      setName(department.name);
      setBranchId(
        department.branch_id ||
          branches.find((branch: any) => branch.name === department.branch)
            ?.id ||
          "",
      );
      setNotes(department.notes || "");
      setColor(department.color || COLOR_PALETTE[0]);
    }
  }, [open, department, branches]);
  const save = async () => {
    if (!name.trim()) return toast.error("اسم القسم مطلوب");
    const result = await supabase
      .from("departments")
      .update({
        name: name.trim(),
        branch_id: branchId || null,
        branch:
          branches.find((branch: any) => branch.id === branchId)?.name || "",
        color,
        notes: notes || null,
      })
      .eq("id", department.id);
    if (result.error) return toast.error(result.error.message);
    saved();
    onOpenChange(false);
    toast.success("تم تعديل القسم");
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل القسم</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Field label="اسم القسم">
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Field>
          <Field label="الفرع">
            <Select
              value={branchId || "__none__"}
              onValueChange={(value) =>
                setBranchId(value === "__none__" ? "" : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الفرع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">فرع غير محدد</SelectItem>
                {branches.map((branch: any) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="الوصف">
            <Textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </Field>
          <Field label="لون القسم">
            <ColorField value={color} onChange={setColor} />
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
function Summary({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
}) {
  return (
    <div className="surface-panel flex items-center gap-4 p-5">
      <Icon className="size-6 text-primary" />
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

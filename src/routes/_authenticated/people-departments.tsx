import {
  createFileRoute,
  Link,
  Outlet,
  useMatchRoute,
} from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Building2, Plus, Search, UsersRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ManagementHeader, MetricCard } from "@/components/ManagementVisuals";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/people-departments")({
  validateSearch: (search: Record<string, unknown>) => ({
    tab: search.tab === "departments" ? "departments" : "employees",
  }),
  component: PeopleDepartmentsRoute,
});

function PeopleDepartmentsRoute() {
  const matchRoute = useMatchRoute();
  const isDepartmentDetail = matchRoute({
    to: "/people-departments/$id",
    fuzzy: false,
  });
  const isEmployeeDetail = matchRoute({
    to: "/people-departments/employee/$id",
    fuzzy: false,
  });
  return isDepartmentDetail || isEmployeeDetail ? (
    <Outlet />
  ) : (
    <PeopleDepartments />
  );
}

function PeopleDepartments() {
  const { tab } = Route.useSearch();
  const queryClient = useQueryClient();
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [newBranch, setNewBranch] = useState("");
  const [newTechnician, setNewTechnician] = useState("");
  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () =>
      (await supabase.from("employees").select("*").order("full_name")).data ??
      [],
  });
  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: async () =>
      (await supabase.from("departments").select("*").order("branch")).data ??
      [],
  });
  const { data: branches = [] } = useQuery({
    queryKey: ["branches"],
    queryFn: async () =>
      (await supabase.from("branches").select("*").order("name")).data ?? [],
  });
  const { data: technicians = [] } = useQuery({
    queryKey: ["technicians"],
    queryFn: async () =>
      (await supabase.from("technicians").select("*").order("name")).data ?? [],
  });
  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => (await supabase.from("assets").select("*")).data ?? [],
  });
  const { data: licenseAssignments = [] } = useQuery({
    queryKey: ["license-assignments"],
    queryFn: async () =>
      (await supabase.from("license_assignments").select("*")).data ?? [],
  });
  const filteredEmployees = employees.filter((employee: any) => {
    const search = employeeSearch.trim().toLowerCase();
    return (
      !search ||
      [
        employee.employee_number,
        employee.full_name,
        employee.email,
        employee.phone,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(search),
      )
    );
  });
  const departmentBranchName = (department: any) =>
    branches.find((branch: any) => branch.id === department.branch_id)?.name ||
    branches.find((branch: any) => branch.name === department.branch)?.name ||
    "";
  const filteredDepartments = departments.filter((department: any) => {
    const search = departmentSearch.trim().toLowerCase();
    return (
      !search ||
      [
        department.name,
        departmentBranchName(department),
        department.notes,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(search),
      )
    );
  });
  const employeeDepartment = (employee: any) =>
    departments.find(
      (department: any) => department.id === employee.department_id,
    );
  const employeeDepartmentLabel = (employee: any) => {
    const department = employeeDepartment(employee);
    return department
      ? `${department.name} - ${departmentBranchName(department) || "فرع غير محدد"}`
      : "قسم غير محدد";
  };
  const groupedEmployees = [...filteredEmployees].sort((a: any, b: any) =>
    String(employeeDepartment(a)?.name ?? "").localeCompare(
      String(employeeDepartment(b)?.name ?? ""),
    ),
  );
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <ManagementHeader
        icon={UsersRound}
        title="الأشخاص والأقسام"
        description="إدارة الموظفين والأقسام والتراخيص المعيّنة"
      />
      <section className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          icon={UsersRound}
          label="الموظفون"
          value={employees.length}
        />
        <MetricCard
          icon={Building2}
          label="الأقسام"
          value={departments.length}
          tone="emerald"
        />
      </section>
      <Tabs defaultValue={tab}>
        <TabsList>
          <TabsTrigger value="employees">الموظفون</TabsTrigger>
          <TabsTrigger value="departments">الأقسام</TabsTrigger>
          <TabsTrigger value="branches">الفروع</TabsTrigger>
          <TabsTrigger value="technicians">الفنيون</TabsTrigger>
        </TabsList>
        <TabsContent value="employees" className="space-y-4">
          <div className="surface-panel flex flex-col gap-3 p-3 sm:flex-row-reverse sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={employeeSearch}
                onChange={(event) => setEmployeeSearch(event.target.value)}
                placeholder="ابحث بالاسم أو الرقم أو بيانات التواصل"
                className="pr-9"
              />
            </div>
            <Button onClick={() => setEmployeeOpen(true)}>
              <Plus className="ml-2 size-4" />
              إضافة موظف
            </Button>
          </div>
          <div className="space-y-3">
            {departments.map((department: any) => {
              const departmentEmployees = groupedEmployees.filter(
                (employee: any) => employee.department_id === department.id,
              );
              return (
                <details
                  key={department.id}
                  open
                  className="surface-panel overflow-hidden group"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between border-b p-4 font-semibold marker:hidden">
                    <span className="flex items-center gap-2">
                      <Building2 className="size-4 text-primary" />
                      {department.name} -{" "}
                      {departmentBranchName(department) || "فرع غير محدد"}
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        {departmentEmployees.length}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground transition-transform group-open:rotate-180">
                      ⌄
                    </span>
                  </summary>
                  <div className="grid gap-4 p-4 md:grid-cols-2">
                    {departmentEmployees.map((employee: any) => (
                      <Link
                        key={employee.id}
                        to="/people-departments/employee/$id"
                        params={{ id: employee.id }}
                        className="surface-panel interactive-card p-5 hover:interactive-card-hover"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <UsersRound className="size-5" />
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs ${employee.status === "active" ? "bg-emerald-500/10 text-emerald-700" : "bg-muted text-muted-foreground"}`}
                          >
                            <span
                              className={`size-2 rounded-full ${employee.status === "active" ? "bg-emerald-500" : "bg-muted-foreground"}`}
                            />
                            {employee.status === "active" ? "نشط" : "غير نشط"}
                          </span>
                        </div>
                        <h2 className="mt-4 font-semibold">
                          {employee.full_name}
                        </h2>
                        {employee.employee_number && (
                          <p className="mt-1 font-mono text-xs text-muted-foreground">
                            {employee.employee_number}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {employee.email || "—"} · {employee.phone || "—"}
                        </p>
                        <p className="mt-2 text-xs font-medium text-primary">
                          {employeeDepartmentLabel(employee)}
                        </p>
                        <p className="mt-3 text-sm">
                          التراخيص:{" "}
                          {
                            licenseAssignments.filter(
                              (assignment: any) =>
                                assignment.employee_id === employee.id,
                            ).length
                          }
                        </p>
                      </Link>
                    ))}
                    {!departmentEmployees.length && (
                      <p className="p-2 text-sm text-muted-foreground">
                        لا يوجد موظفون في هذا القسم.
                      </p>
                    )}
                  </div>
                </details>
              );
            })}
            {groupedEmployees.filter((employee: any) => !employee.department_id)
              .length > 0 && (
              <details open className="surface-panel overflow-hidden group">
                <summary className="flex cursor-pointer list-none items-center justify-between border-b p-4 font-semibold marker:hidden">
                  موظفون بدون قسم
                  <span className="text-xs text-muted-foreground">⌄</span>
                </summary>
                <div className="grid gap-4 p-4 md:grid-cols-2">
                  {groupedEmployees
                    .filter((employee: any) => !employee.department_id)
                    .map((employee: any) => (
                      <Link
                        key={employee.id}
                        to="/people-departments/employee/$id"
                        params={{ id: employee.id }}
                        className="surface-panel interactive-card p-5 hover:interactive-card-hover"
                      >
                        <h2 className="font-semibold">{employee.full_name}</h2>
                        <p className="text-sm text-muted-foreground">
                          {employee.email || "—"} · {employee.phone || "—"}
                        </p>
                      </Link>
                    ))}
                </div>
              </details>
            )}
          </div>
          {filteredEmployees.length === 0 && (
            <p className="text-sm text-muted-foreground">
              لا توجد نتائج مطابقة للبحث.
            </p>
          )}
        </TabsContent>
        <TabsContent value="departments" className="space-y-4">
          <div className="surface-panel flex flex-col gap-3 p-3 sm:flex-row-reverse sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={departmentSearch}
                onChange={(event) => setDepartmentSearch(event.target.value)}
                placeholder="ابحث باسم القسم أو الفرع"
                className="pr-9"
              />
            </div>
            <Button onClick={() => setDepartmentOpen(true)}>
              <Plus className="ml-2 size-4" />
              إضافة قسم
            </Button>
          </div>
          <div className="space-y-4">
            {branches.map((branch: any) => (
              <details
                key={branch.id}
                open
                className="surface-panel overflow-hidden group"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between border-b p-5 marker:hidden">
                  <span className="flex items-center gap-3 text-lg font-semibold">
                    <Building2 className="size-5 text-primary" />
                    {branch.name}
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                      {
                        filteredDepartments.filter(
                          (department: any) =>
                            department.branch_id === branch.id ||
                            (!department.branch_id &&
                              department.branch === branch.name),
                        ).length
                      }{" "}
                      أقسام
                    </span>
                  </span>
                  <span className="text-muted-foreground transition-transform group-open:rotate-180">
                    ⌄
                  </span>
                </summary>
                <div className="grid gap-4 p-4 md:grid-cols-2">
                  {filteredDepartments
                    .filter(
                      (department: any) =>
                        department.branch_id === branch.id ||
                        (!department.branch_id &&
                          department.branch === branch.name),
                    )
                    .map((department: any) => {
                      const people = employees.filter(
                        (employee: any) =>
                          employee.department_id === department.id,
                      );
                      const assetCount = assets.filter((asset: any) =>
                        people.some(
                          (employee: any) =>
                            employee.id === asset.assigned_employee_id,
                        ),
                      ).length;
                      return (
                        <Link
                          key={department.id}
                          to="/people-departments/$id"
                          params={{ id: department.id }}
                          className="surface-panel interactive-card p-5 hover:interactive-card-hover"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700">
                              <Building2 className="size-5" />
                            </div>
                            <span className="rounded-md bg-sky-500/10 px-2 py-1 text-xs font-medium text-sky-700">
                              {departmentBranchName(department) ||
                                "فرع غير محدد"}
                            </span>
                          </div>
                          <h2 className="mt-4 font-semibold">
                            {department.name}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {department.notes || "—"}
                          </p>
                          <p className="mt-3 text-sm">
                            الموظفون: {people.length} · الأصول: {assetCount}
                          </p>
                        </Link>
                      );
                    })}
                </div>
              </details>
            ))}
            {filteredDepartments.filter(
              (department: any) => !departmentBranchName(department),
            ).length > 0 && (
              <details open className="surface-panel overflow-hidden group">
                <summary className="flex cursor-pointer list-none items-center justify-between border-b p-5 marker:hidden">
                  <span className="font-semibold">أقسام بدون فرع</span>
                  <span className="text-muted-foreground">⌄</span>
                </summary>
                <div className="grid gap-4 p-4 md:grid-cols-2">
                  {filteredDepartments
                    .filter(
                      (department: any) => !departmentBranchName(department),
                    )
                    .map((department: any) => {
                      const people = employees.filter(
                        (employee: any) =>
                          employee.department_id === department.id,
                      );
                      return (
                        <Link
                          key={department.id}
                          to="/people-departments/$id"
                          params={{ id: department.id }}
                          className="surface-panel interactive-card p-5 hover:interactive-card-hover"
                        >
                          <h2 className="font-semibold">{department.name}</h2>
                          <p className="mt-3 text-sm">
                            الموظفون: {people.length}
                          </p>
                        </Link>
                      );
                    })}
                </div>
              </details>
            )}
          </div>
        </TabsContent>
        <TabsContent value="branches" className="space-y-4">
          <div className="surface-panel flex flex-col gap-2 p-3 sm:flex-row">
            <Input
              value={newBranch}
              onChange={(event) => setNewBranch(event.target.value)}
              placeholder="اسم الفرع الجديد"
            />
            <Button
              onClick={async () => {
                if (!newBranch.trim()) return toast.error("اسم الفرع مطلوب");
                const result = await supabase
                  .from("branches")
                  .insert({ name: newBranch.trim() });
                if (result.error) return toast.error(result.error.message);
                setNewBranch("");
                queryClient.invalidateQueries({ queryKey: ["branches"] });
                toast.success("تمت إضافة الفرع");
              }}
            >
              <Plus className="ml-2 size-4" />
              إضافة فرع
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch: any) => (
              <div key={branch.id} className="surface-panel p-5">
                <h2 className="font-semibold">{branch.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  الأقسام:{" "}
                  {
                    departments.filter(
                      (department: any) =>
                        department.branch_id === branch.id ||
                        (!department.branch_id &&
                          department.branch === branch.name),
                    ).length
                  }
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="technicians" className="space-y-4">
          <div className="surface-panel flex flex-col gap-2 p-3 sm:flex-row">
            <Input
              value={newTechnician}
              onChange={(event) => setNewTechnician(event.target.value)}
              placeholder="اسم الفني الجديد"
            />
            <Button
              onClick={async () => {
                if (!newTechnician.trim())
                  return toast.error("اسم الفني مطلوب");
                const result = await supabase
                  .from("technicians")
                  .insert({ name: newTechnician.trim() });
                if (result.error) return toast.error(result.error.message);
                setNewTechnician("");
                queryClient.invalidateQueries({ queryKey: ["technicians"] });
                toast.success("تمت إضافة الفني");
              }}
            >
              <Plus className="ml-2 size-4" />
              إضافة فني
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technicians.map((technician: any) => (
              <div
                key={technician.id}
                className="surface-panel flex items-center gap-3 p-4"
              >
                <UsersRound className="size-5 text-primary" />
                <span className="font-medium">{technician.name}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      {employeeOpen && (
        <EmployeeForm
          departments={departments}
          branches={branches}
          close={() => setEmployeeOpen(false)}
          saved={() => queryClient.invalidateQueries()}
        />
      )}
      {departmentOpen && (
        <DepartmentForm
          branches={branches}
          close={() => setDepartmentOpen(false)}
          saved={() => queryClient.invalidateQueries()}
        />
      )}
    </div>
  );
}

function EmployeeForm({ departments, branches = [], close, saved }: any) {
  const [form, setForm] = useState<any>({ status: "active" });
  const set = (key: string, value: any) => setForm({ ...form, [key]: value });
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة موظف</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="رقم الموظف">
            <Input
              value={form.employee_number || ""}
              onChange={(event) => set("employee_number", event.target.value)}
              placeholder="مثال: EMP-001"
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
              onValueChange={(value) =>
                set("department_id", value === "__none__" ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">غير محدد</SelectItem>
                {departments.map((department: any) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name} —{" "}
                    {branches.find(
                      (branch: any) => branch.id === department.branch_id,
                    )?.name ||
                      department.branch ||
                      "غير محدد"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="ملاحظات">
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
          <Button
            onClick={async () => {
              if (!form.full_name?.trim())
                return toast.error("الاسم الكامل مطلوب");
              const result = await supabase
                .from("employees")
                .insert({
                  ...form,
                  full_name: form.full_name.trim(),
                  employee_number: form.employee_number?.trim() || null,
                });
              if (result.error) return toast.error(result.error.message);
              saved();
              close();
              toast.success("تمت إضافة الموظف");
            }}
          >
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function DepartmentForm({ close, saved, branches = [] }: any) {
  const [name, setName] = useState("");
  const [branchId, setBranchId] = useState("");
  const [notes, setNotes] = useState("");
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة قسم</DialogTitle>
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
                {branches.map((item: any) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            إلغاء
          </Button>
          <Button
            onClick={async () => {
              if (!name.trim()) return toast.error("اسم القسم مطلوب");
              const result = await supabase
                .from("departments")
                .insert({
                  name: name.trim(),
                  branch_id: branchId || null,
                  branch:
                    branches.find((item: any) => item.id === branchId)?.name ||
                    "",
                  notes,
                });
              if (result.error) return toast.error(result.error.message);
              saved();
              close();
              toast.success("تمت إضافة القسم");
            }}
          >
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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

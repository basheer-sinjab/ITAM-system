import {
  createFileRoute,
  Link,
  Outlet,
  useMatchRoute,
} from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () =>
      (await supabase.from("employees").select("*").order("full_name")).data ??
      [],
  });
  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: async () =>
      (await supabase.from("departments").select("*").order("name")).data ?? [],
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
    return !search || [employee.full_name, employee.email, employee.phone].some((value) => String(value ?? "").toLowerCase().includes(search));
  });
  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">الأشخاص والأقسام</h1>
        <p className="text-sm text-muted-foreground">
          الموظفون والأقسام والأصول المعيّنة
        </p>
      </header>
      <Tabs defaultValue={tab}>
        <TabsList>
          <TabsTrigger value="employees">الموظفون</TabsTrigger>
          <TabsTrigger value="departments">الأقسام</TabsTrigger>
        </TabsList>
        <TabsContent value="employees" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Input value={employeeSearch} onChange={(event) => setEmployeeSearch(event.target.value)} placeholder="ابحث بالاسم أو البريد أو رقم الهاتف" className="sm:max-w-sm" />
            <Button onClick={() => setEmployeeOpen(true)}>
              <Plus className="ml-2 size-4" />
              إضافة موظف
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredEmployees.map((employee: any) => (
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
                <p className="mt-3 text-sm">
                  الأصول المعيّنة:{" "}
                  {
                    assets.filter(
                      (asset: any) =>
                        asset.assigned_employee_id === employee.id,
                    ).length
                  }{" "}
                  · التراخيص:{" "}
                  {
                    licenseAssignments.filter(
                      (assignment: any) =>
                        assignment.employee_id === employee.id,
                    ).length
                  }
                </p>
              </Link>
            ))}
          </div>
          {filteredEmployees.length === 0 && <p className="text-sm text-muted-foreground">لا توجد نتائج مطابقة للبحث.</p>}
        </TabsContent>
        <TabsContent value="departments" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setDepartmentOpen(true)}>
              <Plus className="ml-2 size-4" />
              إضافة قسم
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {departments.map((department: any) => {
              const people = employees.filter(
                (employee: any) => employee.department_id === department.id,
              );
              const assetCount = assets.filter((asset: any) =>
                people.some(
                  (employee: any) => employee.id === asset.assigned_employee_id,
                ),
              ).length;
              return (
                <Link
                  key={department.id}
                  to="/people-departments/$id"
                  params={{ id: department.id }}
                  className="surface-panel interactive-card p-5 hover:interactive-card-hover"
                >
                  <h2 className="font-semibold">{department.name}</h2>
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
        </TabsContent>
      </Tabs>
      {employeeOpen && (
        <EmployeeForm
          departments={departments}
          close={() => setEmployeeOpen(false)}
          saved={() => queryClient.invalidateQueries()}
        />
      )}
      {departmentOpen && (
        <DepartmentForm
          close={() => setDepartmentOpen(false)}
          saved={() => queryClient.invalidateQueries()}
        />
      )}
    </div>
  );
}

function EmployeeForm({ departments, close, saved }: any) {
  const [form, setForm] = useState<any>({ status: "active" });
  const set = (key: string, value: any) => setForm({ ...form, [key]: value });
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة موظف</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
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
                    {department.name}
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
              await supabase.from("employees").insert(form);
              saved();
              close();
            }}
          >
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function DepartmentForm({ close, saved }: any) {
  const [name, setName] = useState("");
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
              await supabase.from("departments").insert({ name, notes });
              saved();
              close();
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

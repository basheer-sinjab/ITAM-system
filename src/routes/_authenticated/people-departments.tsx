import {
  createFileRoute,
  Link,
  Outlet,
  useMatchRoute,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  ExternalLink,
  KeyRound,
  Monitor,
  Search,
  UsersRound,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ManagementHeader, MetricCard } from "@/components/ManagementVisuals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COLOR_PALETTE } from "@/components/ColorField";

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
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const result = await supabase
        .from("employees")
        .select("*")
        .order("full_name");
      if (result.error) throw result.error;
      return result.data ?? [];
    },
    throwOnError: true,
  });
  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const result = await supabase
        .from("departments")
        .select("*")
        .order("name");
      if (result.error) throw result.error;
      return result.data ?? [];
    },
    throwOnError: true,
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
  const filteredDepartments = departments.filter((department: any) => {
    const search = departmentSearch.trim().toLowerCase();
    return (
      !search ||
      [department.name, department.notes].some((value) =>
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
    return department?.name || "قسم غير محدد";
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
        description="بيانات مباشرة من تطبيق الموظفين والأقسام في Odoo"
      />
      <section className="surface-panel flex flex-wrap items-center justify-between gap-3 border-s-4 border-s-primary p-4">
        <div>
          <p className="font-semibold">
            الموظفون والأقسام مُدارة مركزيًا في Odoo
          </p>
          <p className="text-sm text-muted-foreground">
            اضغط على أي موظف لعرض أصوله وتراخيصه. الإضافة والتعديل تتم من تطبيق
            الموظفين في Odoo وتظهر هنا تلقائيًا.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => window.location.assign("/odoo/employees")}
        >
          <ExternalLink className="ml-2 size-4" />
          فتح تطبيق الموظفين
        </Button>
      </section>
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
            <Button
              variant="outline"
              onClick={() => window.location.assign("/odoo/employees")}
            >
              <ExternalLink className="ml-2 size-4" />
              إدارة الموظفين في Odoo
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
                      <span
                        className="size-3 rounded-full"
                        style={{
                          backgroundColor: department.color || COLOR_PALETTE[0],
                        }}
                      />
                      {department.name}
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
                      <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        departmentLabel={employeeDepartmentLabel(employee)}
                        assetCount={
                          assets.filter(
                            (asset: any) =>
                              asset.assigned_employee_id === employee.id,
                          ).length
                        }
                        licenseCount={
                          licenseAssignments.filter(
                            (assignment: any) =>
                              assignment.employee_id === employee.id,
                          ).length
                        }
                      />
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
                      <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        departmentLabel="قسم غير محدد"
                        assetCount={
                          assets.filter(
                            (asset: any) =>
                              asset.assigned_employee_id === employee.id,
                          ).length
                        }
                        licenseCount={
                          licenseAssignments.filter(
                            (assignment: any) =>
                              assignment.employee_id === employee.id,
                          ).length
                        }
                      />
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
                placeholder="ابحث باسم القسم"
                className="pr-9"
              />
            </div>
            <Button
              variant="outline"
              onClick={() =>
                window.location.assign("/odoo/employees/departments")
              }
            >
              <ExternalLink className="ml-2 size-4" />
              إدارة الأقسام في Odoo
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredDepartments.map((department: any) => {
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
                  search={{ tab: "departments" }}
                  className="surface-panel interactive-card border-t-4 p-5 hover:interactive-card-hover"
                  style={{
                    borderTopColor: department.color || COLOR_PALETTE[0],
                  }}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700">
                    <Building2 className="size-5" />
                  </div>
                  <h2 className="mt-4 font-semibold">{department.name}</h2>
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
        <TabsContent value="technicians" className="space-y-4">
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
    </div>
  );
}

function EmployeeCard({
  employee,
  departmentLabel,
  assetCount,
  licenseCount,
}: {
  employee: any;
  departmentLabel: string;
  assetCount: number;
  licenseCount: number;
}) {
  const active = employee.status !== "inactive";
  return (
    <Link
      to="/people-departments/employee/$id"
      params={{ id: employee.id }}
      search={{ tab: "employees" }}
      className="surface-panel interactive-card group/card p-5 hover:interactive-card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <UsersRound className="size-5" />
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs ${active ? "bg-emerald-500/10 text-emerald-700" : "bg-muted text-muted-foreground"}`}
        >
          <span
            className={`size-2 rounded-full ${active ? "bg-emerald-500" : "bg-muted-foreground"}`}
          />
          {active ? "نشط" : "غير نشط"}
        </span>
      </div>
      <h2 className="mt-4 font-semibold">{employee.full_name}</h2>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        {employee.employee_number || "بدون رقم وظيفي"}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {employee.email || "—"} · {employee.phone || "—"}
      </p>
      <p className="mt-2 text-xs font-medium text-primary">{departmentLabel}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <span className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Monitor className="size-4" />
            الأصول
          </span>
          <strong>{assetCount}</strong>
        </span>
        <span className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <KeyRound className="size-4" />
            التراخيص
          </span>
          <strong>{licenseCount}</strong>
        </span>
      </div>
      <span className="mt-4 flex items-center justify-between border-t pt-3 text-sm font-medium text-primary">
        عرض ملف الموظف
        <ArrowLeft className="size-4 transition-transform group-hover/card:-translate-x-1" />
      </span>
    </Link>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  Monitor,
  Phone,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/people-departments/$id")({
  component: DepartmentDetails,
});

function DepartmentDetails() {
  const { id } = Route.useParams();
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
            <h1 className="text-2xl font-bold">{department.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {department.notes || "لا يوجد وصف للقسم."}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            window.location.assign(`/odoo/employees/departments/${id}`)
          }
        >
          <ExternalLink className="ml-2 size-4" />
          إدارة القسم في Odoo
        </Button>
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

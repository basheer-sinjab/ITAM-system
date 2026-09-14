import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ExternalLink,
  KeyRound,
  Mail,
  Monitor,
  Phone,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScopeColorBadges } from "@/components/ScopeColorBadges";

export const Route = createFileRoute(
  "/_authenticated/people-departments/employee/$id",
)({ component: EmployeeDetails });

function EmployeeDetails() {
  const { id } = Route.useParams();
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
  const departmentLabel = department?.name || "بدون قسم";
  const assignedLicenses = assignments
    .map((assignment: any) => {
      const license = licenses.find(
        (item: any) => item.id === assignment.license_id,
      );
      return license ? { assignment, license } : null;
    })
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Link to="/people-departments" search={{ tab: "employees" }}>
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
              <ScopeColorBadges department={department} />
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => window.location.assign(`/odoo/employees/${id}`)}
        >
          <ExternalLink className="ml-2 size-4" />
          فتح الموظف في Odoo
        </Button>
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
          count={assets.length}
          empty="لا توجد أصول معيّنة."
          items={assets.map((asset: any) => (
            <Link
              key={asset.id}
              to="/assets/$id"
              params={{ id: asset.id }}
              className="group flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{asset.name}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {asset.asset_id || "—"}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {asset.asset_type || "نوع غير محدد"} ·{" "}
                  {asset.location || "مكان غير محدد"}
                </p>
              </div>
              <ChevronLeft className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        />
        <List
          title="التراخيص المعيّنة"
          icon={KeyRound}
          count={assignedLicenses.length}
          empty="لا توجد تراخيص معيّنة."
          items={assignedLicenses.map((item: any) => (
            <Link
              key={item.assignment.id}
              to="/licenses/$id"
              params={{ id: item.license.id }}
              className="group flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {item.license.license_name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.license.product_name || "بدون منتج محدد"}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  تاريخ التعيين: {item.assignment.assignment_date || "—"}
                </p>
              </div>
              <ChevronLeft className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        />
      </section>
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
  count,
  empty,
  items,
}: {
  title: string;
  icon: React.ElementType;
  count: number;
  empty: string;
  items: React.ReactNode[];
}) {
  return (
    <section className="surface-panel overflow-hidden">
      <div className="flex items-center gap-2 border-b p-5">
        <Icon className="size-4 text-primary" />
        <h2 className="font-semibold">{title}</h2>
        <span className="ms-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
          {count}
        </span>
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

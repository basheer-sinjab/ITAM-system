import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  CirclePlus,
  Clock3,
  Pencil,
  Printer,
  RotateCcw,
  Trash2,
  UserCheck,
  UserPlus,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ConfirmButton";
import { PrinterImage } from "@/components/PrinterImage";
import { AssetForm } from "./assets.index";
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
import { formatDate } from "@/lib/pms";
import { ScopeColorBadges } from "@/components/ScopeColorBadges";
import { AssetHardwareTabs } from "@/components/asset/AssetHardwareTabs";

export const Route = createFileRoute("/_authenticated/assets/$id")({
  component: AssetDetails,
});

const STATUS_LABELS: Record<string, string> = {
  active: "نشط",
  inactive: "غير نشط",
  maintenance: "تحت الصيانة",
  retired: "متقاعد",
};
const RETURN_CONDITIONS: Record<string, string> = {
  good: "سليم",
  maintenance: "يحتاج صيانة",
  damaged: "متضرر",
};

function escapeHtml(value: unknown) {
  return String(value ?? "—").replace(
    /[&<>\"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;" })[character] ??
      character,
  );
}

function AssetDetails() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [completedAssignment, setCompletedAssignment] = useState<any>();
  const { data: asset } = useQuery({
    queryKey: ["asset", id],
    queryFn: async () =>
      (await supabase.from("assets").select("*").eq("id", id).maybeSingle())
        .data,
  });
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
  const { data: branches = [] } = useQuery({
    queryKey: ["branches"],
    queryFn: async () =>
      (await supabase.from("branches").select("*").order("name")).data ?? [],
  });
  const { data: history = [] } = useQuery({
    queryKey: ["assignment-history", id],
    queryFn: async () =>
      (
        await supabase
          .from("assignment_history")
          .select("*")
          .eq("asset_id", id)
          .order("assignment_date", { ascending: false })
      ).data ?? [],
  });
  const { data: maintenanceRecords = [] } = useQuery({
    queryKey: ["asset-maintenance", id],
    queryFn: async () =>
      (
        await supabase
          .from("asset_maintenance")
          .select("*")
          .eq("asset_id", id)
          .order("maintenance_date", { ascending: false })
      ).data ?? [],
  });
  const { data: activity = [] } = useQuery({
    queryKey: ["asset-activity", id],
    queryFn: async () =>
      (
        await supabase
          .from("activity_log")
          .select("*")
          .eq("entity_type", "assets")
          .eq("entity_id", id)
          .order("created_at", { ascending: false })
      ).data ?? [],
  });
  const remove = useMutation({
    mutationFn: () => supabase.from("assets").delete().eq("id", id),
    onSuccess: () => navigate({ to: "/assets" }),
  });

  if (!asset) return <p className="text-muted-foreground">جارٍ التحميل…</p>;

  const employee = (employeeId?: string | null) =>
    employees.find((item: any) => item.id === employeeId);
  const currentEmployee = employee(asset.assigned_employee_id);
  const department = departments.find(
    (item: any) => item.id === asset.department_id,
  );
  const branch = branches.find(
    (item: any) =>
      item.id === department?.branch_id ||
      (!department?.branch_id && item.name === department?.branch),
  );
  const currentAssignment =
    history.find(
      (record: any) =>
        !record.return_date &&
        record.employee_id === asset.assigned_employee_id,
    ) || history.find((record: any) => !record.return_date);
  const refresh = async () => queryClient.invalidateQueries();

  const printAssignment = (record: any) => {
    const livePerson = employee(record.employee_id);
    const liveDepartment = departments.find(
      (item: any) => item.id === livePerson?.department_id,
    );
    const person = {
      full_name: record.employee_name || livePerson?.full_name,
      employee_number: record.employee_number || livePerson?.employee_number,
      email: record.employee_email || livePerson?.email,
      phone: record.employee_phone || livePerson?.phone,
    };
    const departmentName = record.department_name || liveDepartment?.name;
    const branchName =
      record.branch_name ||
      branches.find((branch: any) => branch.id === liveDepartment?.branch_id)
        ?.name ||
      liveDepartment?.branch;
    const page = window.open("", "_blank");
    page?.document.write(
      `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>نموذج تسليم أصل - ${escapeHtml(asset.asset_id)}</title><style>@page{size:A4;margin:14mm}*{box-sizing:border-box}body{margin:0;color:#17212b;font-family:Tahoma,Arial,sans-serif;font-size:12px;line-height:1.6}.document{border:1px solid #d6dde3;padding:28px}.header{display:flex;align-items:flex-start;justify-content:space-between;border-bottom:3px solid #0f766e;padding-bottom:18px}.brand{color:#0f766e;font-size:20px;font-weight:700}.subtitle{color:#5b6975;font-size:12px}.document-title{text-align:left}.document-title h1{margin:0;color:#17212b;font-size:22px}.document-number{color:#5b6975;font-family:monospace;margin-top:4px}.notice{background:#eef8f7;border-right:4px solid #0f766e;margin:22px 0;padding:12px 14px}.section{margin-top:22px}.section-title{border-bottom:1px solid #d6dde3;color:#0f766e;font-size:15px;font-weight:700;margin:0 0 10px;padding-bottom:7px}.grid{display:grid;grid-template-columns:repeat(2,1fr);border:1px solid #d6dde3}.field{border-left:1px solid #d6dde3;border-bottom:1px solid #d6dde3;padding:9px 11px;min-height:54px}.field:nth-child(2n){border-left:0}.label{color:#64748b;display:block;font-size:10px;margin-bottom:3px}.value{font-weight:700}.acknowledgement{border:1px solid #d6dde3;background:#fafcfc;margin-top:10px;padding:14px;text-align:justify}.signatures{display:grid;grid-template-columns:repeat(2,1fr);gap:48px;margin-top:52px}.signature{border-top:1px solid #64748b;padding-top:7px;text-align:center}.footer{border-top:1px solid #d6dde3;color:#64748b;font-size:10px;margin-top:30px;padding-top:9px;text-align:center}@media print{.document{border:0;padding:0}}</style></head><body><main class="document"><header class="header"><div><div class="brand">نظام إدارة الأصول التقنية</div><div class="subtitle">إدارة تقنية المعلومات</div></div><div class="document-title"><h1>نموذج تسليم واستلام أصل</h1><div class="document-number">رقم النموذج: ${escapeHtml(record.id)}</div></div></header><div class="notice">يوثق هذا النموذج تسليم الأصل الموضح أدناه إلى الموظف، ويُعد مرجعاً لسجل الأصول والتعيينات.</div><section class="section"><h2 class="section-title">بيانات الموظف</h2><div class="grid"><div class="field"><span class="label">الاسم الكامل</span><span class="value">${escapeHtml(person.full_name)}</span></div><div class="field"><span class="label">رقم الموظف</span><span class="value">${escapeHtml(person.employee_number)}</span></div><div class="field"><span class="label">القسم</span><span class="value">${escapeHtml(departmentName)}</span></div><div class="field"><span class="label">الفرع</span><span class="value">${escapeHtml(branchName)}</span></div><div class="field"><span class="label">البريد الإلكتروني</span><span class="value">${escapeHtml(person.email)}</span></div><div class="field"><span class="label">رقم الهاتف</span><span class="value">${escapeHtml(person.phone)}</span></div></div></section><section class="section"><h2 class="section-title">بيانات الأصل</h2><div class="grid"><div class="field"><span class="label">اسم الأصل</span><span class="value">${escapeHtml(asset.name)}</span></div><div class="field"><span class="label">رقم الأصل</span><span class="value">${escapeHtml(asset.asset_id)}</span></div><div class="field"><span class="label">النوع</span><span class="value">${escapeHtml(asset.asset_type)}</span></div><div class="field"><span class="label">المصنّع والموديل</span><span class="value">${escapeHtml([asset.manufacturer, asset.model].filter(Boolean).join(" - "))}</span></div><div class="field"><span class="label">الرقم التسلسلي</span><span class="value">${escapeHtml(asset.serial_number)}</span></div><div class="field"><span class="label">تاريخ التعيين</span><span class="value">${escapeHtml(formatDate(record.assignment_date))}</span></div></div></section><section class="section"><h2 class="section-title">إقرار الاستلام</h2><div class="acknowledgement">أقر أنا ${escapeHtml(person.full_name)} بأنني استلمت الأصل الموضح أعلاه بحالة صالحة للاستخدام، وأتعهد بالمحافظة عليه واستخدامه لأغراض العمل فقط وإعادته عند الطلب أو عند انتهاء العلاقة الوظيفية. ${record.notes ? `ملاحظات التسليم: ${escapeHtml(record.notes)}` : ""}</div></section><section class="signatures"><div class="signature">توقيع الموظف المستلم<br><br>الاسم: ${escapeHtml(person.full_name)}<br>التاريخ: ________________</div><div class="signature">توقيع ممثل تقنية المعلومات<br><br>الاسم: ________________<br>التاريخ: ________________</div></section><footer class="footer">تم إنشاء هذا النموذج من نظام إدارة الأصول التقنية</footer></main><script>window.print()</script></body></html>`,
    );
    page?.document.close();
  };

  const timeline = buildTimeline(
    asset,
    history,
    maintenanceRecords,
    activity,
    employee,
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link to="/assets">
            <Button variant="ghost" size="icon" aria-label="العودة إلى الأصول">
              <ArrowRight />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{asset.name}</h1>
            <p className="font-mono text-sm text-muted-foreground">
              {asset.asset_id}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentEmployee ? (
            <Button onClick={() => setReturnOpen(true)}>
              <RotateCcw className="ml-2 size-4" />
              إرجاع الأصل
            </Button>
          ) : (
            <Button onClick={() => setCheckoutOpen(true)}>
              <UserPlus className="ml-2 size-4" />
              تسليم الأصل
            </Button>
          )}
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            <Pencil className="ml-2 size-4" />
            تعديل البيانات
          </Button>
          <ConfirmButton
            variant="outline"
            className="text-destructive"
            title="حذف الأصل؟"
            description={`سيتم حذف ${asset.name} وسجلاته المرتبطة نهائيًا.`}
            onConfirm={() => remove.mutate()}
          >
            <Trash2 className="ml-2 size-4" />
            حذف
          </ConfirmButton>
        </div>
      </header>

      {currentEmployee && (
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UserCheck className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">
                الأصل مسلّم حاليًا إلى
              </p>
              <p className="font-semibold">{currentEmployee.full_name}</p>
            </div>
          </div>
          {currentAssignment && (
            <Button
              variant="outline"
              onClick={() => printAssignment(currentAssignment)}
            >
              <Printer className="ml-2 size-4" />
              طباعة نموذج التعيين
            </Button>
          )}
        </section>
      )}

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="surface-panel overflow-hidden">
          <PrinterImage
            path={asset.image_url}
            alt={asset.name}
            className="h-64 w-full"
          />
        </div>
        <dl className="surface-panel grid gap-4 p-6 sm:grid-cols-2 lg:col-span-2">
          {[
            ["النوع", asset.asset_type],
            ["المصنّع", asset.manufacturer],
            ["الموديل", asset.model],
            ["الرقم التسلسلي", asset.serial_number],
            ["الحالة", STATUS_LABELS[asset.status] || asset.status],
            ["القسم", department?.name],
            ["معيّن لـ", currentEmployee?.full_name],
            ["تاريخ الشراء", formatDate(asset.purchase_date)],
            ["انتهاء الضمان", formatDate(asset.warranty_expiry)],
            ["ملاحظات", asset.notes],
          ].map(([label, value]) => (
            <div key={label as string}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd>{value || "—"}</dd>
            </div>
          ))}
        </dl>
      </div>

      {(department || branch) && (
        <section className="surface-panel flex flex-wrap items-center gap-3 p-4">
          <span className="text-sm text-muted-foreground">القسم والفرع:</span>
          <ScopeColorBadges department={department} branch={branch} />
        </section>
      )}

      <AssetHardwareTabs asset={asset} />

      <Timeline events={timeline} printAssignment={printAssignment} />

      <AssetForm
        open={editOpen}
        onOpenChange={setEditOpen}
        asset={asset}
        departments={departments}
        onSaved={refresh}
      />
      {checkoutOpen && (
        <CheckoutDialog
          asset={asset}
          employees={employees}
          departments={departments}
          branches={branches}
          openHistory={history.filter((record: any) => !record.return_date)}
          close={() => setCheckoutOpen(false)}
          saved={async (record: any) => {
            await refresh();
            setCompletedAssignment(record);
          }}
        />
      )}
      {returnOpen && currentEmployee && (
        <ReturnDialog
          asset={asset}
          employee={currentEmployee}
          department={departments.find(
            (item: any) => item.id === currentEmployee.department_id,
          )}
          branch={branches.find(
            (item: any) =>
              item.id ===
              departments.find(
                (department: any) =>
                  department.id === currentEmployee.department_id,
              )?.branch_id,
          )}
          assignment={currentAssignment}
          close={() => setReturnOpen(false)}
          saved={refresh}
        />
      )}
      {completedAssignment && (
        <Dialog
          open
          onOpenChange={(open) => !open && setCompletedAssignment(undefined)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تم تسليم الأصل بنجاح</DialogTitle>
            </DialogHeader>
            <div className="rounded-lg bg-primary/5 p-4 text-sm">
              تم حفظ التعيين في الخط الزمني. اطبع نموذج التسليم الآن أو ارجع له
              في أي وقت من صفحة الأصل.
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCompletedAssignment(undefined)}
              >
                إغلاق
              </Button>
              <Button onClick={() => printAssignment(completedAssignment)}>
                <Printer className="ml-2 size-4" />
                طباعة نموذج التعيين
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function CheckoutDialog({
  asset,
  employees,
  departments,
  branches,
  openHistory,
  close,
  saved,
}: any) {
  const [employeeId, setEmployeeId] = useState("");
  const [assignmentDate, setAssignmentDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const save = async () => {
    const person = employees.find((item: any) => item.id === employeeId);
    if (!person) return toast.error("اختر الموظف المستلم");
    if (!assignmentDate) return toast.error("حدد تاريخ التسليم");
    setSaving(true);
    const department = departments.find(
      (item: any) => item.id === person.department_id,
    );
    const branch =
      branches.find((item: any) => item.id === department?.branch_id)?.name ||
      department?.branch;
    for (const previous of openHistory) {
      await supabase
        .from("assignment_history")
        .update({
          return_date: assignmentDate,
          return_condition: "good",
          return_notes: "إغلاق تلقائي قبل تسليم جديد",
        })
        .eq("id", previous.id);
    }
    const assignment = await supabase.from("assignment_history").insert({
      asset_id: asset.id,
      employee_id: person.id,
      employee_name: person.full_name,
      employee_number: person.employee_number || null,
      employee_email: person.email || null,
      employee_phone: person.phone || null,
      department_name: department?.name || null,
      branch_name: branch || null,
      assignment_date: assignmentDate,
      notes: notes.trim() || null,
    });
    if (assignment.error) {
      setSaving(false);
      return toast.error(assignment.error.message);
    }
    const created = Array.isArray(assignment.data)
      ? assignment.data[0]
      : assignment.data;
    const update = await supabase
      .from("assets")
      .update({
        assigned_employee_id: person.id,
        department_id: person.department_id || asset.department_id || null,
        status: "active",
      })
      .eq("id", asset.id);
    if (update.error) {
      if (created)
        await supabase.from("assignment_history").delete().eq("id", created.id);
      setSaving(false);
      return toast.error(update.error.message);
    }
    toast.success("تم تسليم الأصل وحفظ نموذج التعيين");
    close();
    await saved(created);
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تسليم {asset.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Field label="الموظف المستلم">
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الموظف" />
              </SelectTrigger>
              <SelectContent>
                {employees
                  .filter((person: any) => person.status !== "inactive")
                  .map((person: any) => {
                    const department = departments.find(
                      (item: any) => item.id === person.department_id,
                    );
                    return (
                      <SelectItem key={person.id} value={person.id}>
                        {person.full_name}
                        {department ? ` - ${department.name}` : ""}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </Field>
          <Field label="تاريخ التسليم">
            <Input
              type="date"
              value={assignmentDate}
              onChange={(event) => setAssignmentDate(event.target.value)}
            />
          </Field>
          <Field label="ملاحظات التسليم (اختياري)">
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
          <Button disabled={saving} onClick={save}>
            تسليم وحفظ النموذج
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ReturnDialog({
  asset,
  employee,
  department,
  branch,
  assignment,
  close,
  saved,
}: any) {
  const [returnDate, setReturnDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [condition, setCondition] = useState("good");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (!returnDate) return toast.error("حدد تاريخ الإرجاع");
    if (assignment?.assignment_date && returnDate < assignment.assignment_date)
      return toast.error("تاريخ الإرجاع لا يمكن أن يسبق تاريخ التسليم");
    setSaving(true);
    let record = assignment;
    if (!record) {
      const fallback = await supabase.from("assignment_history").insert({
        asset_id: asset.id,
        employee_id: employee.id,
        employee_name: employee.full_name,
        employee_number: employee.employee_number || null,
        employee_email: employee.email || null,
        employee_phone: employee.phone || null,
        department_name: department?.name || null,
        branch_name: branch?.name || department?.branch || null,
        assignment_date: asset.updated_at?.slice(0, 10) || returnDate,
        notes: "تم إنشاء السجل تلقائيًا عند إرجاع الأصل",
      });
      if (fallback.error) {
        setSaving(false);
        return toast.error(fallback.error.message);
      }
      record = Array.isArray(fallback.data) ? fallback.data[0] : fallback.data;
    }
    const historyUpdate = await supabase
      .from("assignment_history")
      .update({
        return_date: returnDate,
        return_condition: condition,
        return_notes: notes.trim() || null,
      })
      .eq("id", record.id);
    if (historyUpdate.error) {
      setSaving(false);
      return toast.error(historyUpdate.error.message);
    }
    const status =
      condition === "maintenance"
        ? "maintenance"
        : condition === "damaged"
          ? "inactive"
          : "active";
    const assetUpdate = await supabase
      .from("assets")
      .update({ assigned_employee_id: null, status })
      .eq("id", asset.id);
    if (assetUpdate.error) {
      setSaving(false);
      return toast.error(assetUpdate.error.message);
    }
    toast.success("تم إرجاع الأصل وحفظ العملية في الخط الزمني");
    close();
    await saved();
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إرجاع {asset.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-3 text-sm">
            الموظف الحالي: <strong>{employee.full_name}</strong>
          </div>
          <Field label="تاريخ الإرجاع">
            <Input
              type="date"
              min={assignment?.assignment_date || undefined}
              value={returnDate}
              onChange={(event) => setReturnDate(event.target.value)}
            />
          </Field>
          <Field label="حالة الأصل عند الإرجاع">
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="good">سليم</SelectItem>
                <SelectItem value="maintenance">يحتاج صيانة</SelectItem>
                <SelectItem value="damaged">متضرر</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="ملاحظة الإرجاع (اختياري)">
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
          <Button disabled={saving} onClick={save}>
            تأكيد إرجاع الأصل
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function buildTimeline(
  asset: any,
  history: any[],
  maintenance: any[],
  activity: any[],
  employee: (id?: string | null) => any,
) {
  const events: any[] = [
    {
      id: `created-${asset.id}`,
      type: "created",
      date: asset.created_at,
      title: "تمت إضافة الأصل",
      description: `تم تسجيل ${asset.name} برقم ${asset.asset_id}.`,
    },
  ];
  for (const record of history) {
    const personName =
      record.employee_name || employee(record.employee_id)?.full_name || "موظف";
    events.push({
      id: `assignment-${record.id}`,
      type: "assignment",
      date: record.assignment_date,
      title: `تم تسليم الأصل إلى ${personName}`,
      description: record.notes || "تم حفظ نموذج التعيين.",
      record,
    });
    if (record.return_date)
      events.push({
        id: `return-${record.id}`,
        type: "return",
        date: record.return_date,
        title: `تم إرجاع الأصل من ${personName}`,
        description: `${RETURN_CONDITIONS[record.return_condition] || "تم الإرجاع"}${record.return_notes ? ` · ${record.return_notes}` : ""}`,
      });
  }
  for (const record of maintenance)
    events.push({
      id: `maintenance-${record.id}`,
      type: "maintenance",
      date: record.maintenance_date,
      title: `صيانة ${record.maintenance_type === "Preventive" ? "وقائية" : "تصحيحية"}`,
      description:
        record.resolution || record.problem_description || "سجل صيانة للأصل.",
      meta: `${record.status === "Closed" ? "مغلقة" : "مفتوحة"}${record.technician ? ` · ${record.technician}` : ""}`,
    });
  for (const entry of activity) {
    const change = entry.details?.changes?.status;
    if (change)
      events.push({
        id: `status-${entry.id}`,
        type: "status",
        date: entry.created_at,
        title: "تم تغيير حالة الأصل",
        description: `${STATUS_LABELS[change.from] || change.from || "غير محدد"} ← ${STATUS_LABELS[change.to] || change.to || "غير محدد"}`,
      });
    else if (entry.action === "toner_install")
      events.push({
        id: `toner-${entry.id}`,
        type: "toner",
        date: entry.created_at,
        title: "تم تركيب حبر",
        description: `${entry.details?.item_name || "حبر"}${entry.details?.quantity ? ` · الكمية ${entry.details.quantity}` : ""}`,
      });
    else if (entry.action === "toner_undo")
      events.push({
        id: `toner-undo-${entry.id}`,
        type: "undo",
        date: entry.created_at,
        title: "تم التراجع عن تركيب حبر",
        description: entry.details?.item_name || "تمت إعادة الحبر للمخزون.",
      });
    else if (entry.action === "part_install")
      events.push({
        id: `part-${entry.id}`,
        type: "part",
        date: entry.created_at,
        title: entry.details?.replaced_part
          ? "تم استبدال قطعة"
          : "تم تركيب قطعة",
        description: entry.details?.replaced_part
          ? `${entry.details.replaced_part} ← ${entry.details.item_name}`
          : entry.details?.item_name || "قطعة غيار",
      });
    else if (entry.action === "part_undo")
      events.push({
        id: `part-undo-${entry.id}`,
        type: "undo",
        date: entry.created_at,
        title: "تم التراجع عن تركيب قطعة",
        description: entry.details?.item_name || "تمت إعادة القطعة للمخزون.",
      });
  }
  return events.sort(
    (left, right) =>
      new Date(right.date || 0).getTime() - new Date(left.date || 0).getTime(),
  );
}

function Timeline({ events, printAssignment }: any) {
  const icons: Record<string, React.ElementType> = {
    created: CirclePlus,
    assignment: UserCheck,
    return: RotateCcw,
    maintenance: Wrench,
    status: Activity,
    toner: Printer,
    part: Wrench,
    undo: RotateCcw,
  };
  return (
    <section className="surface-panel overflow-hidden">
      <div className="flex items-center gap-2 border-b p-5">
        <Clock3 className="size-5 text-primary" />
        <div>
          <h2 className="font-semibold">الخط الزمني للأصل</h2>
          <p className="text-xs text-muted-foreground">
            التسليم والإرجاع والصيانة وتغيّر الحالة في مكان واحد
          </p>
        </div>
      </div>
      <div className="p-5">
        {events.map((event: any, index: number) => {
          const Icon = icons[event.type] || Activity;
          return (
            <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
              {index < events.length - 1 && (
                <span className="absolute right-[19px] top-10 h-[calc(100%-1.5rem)] w-px bg-border" />
              )}
              <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-background text-primary">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1 rounded-lg border bg-muted/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.description}
                    </p>
                    {event.meta && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {event.meta}
                      </p>
                    )}
                  </div>
                  <time className="shrink-0 text-xs text-muted-foreground">
                    {formatDate(String(event.date || "").slice(0, 10))}
                  </time>
                </div>
                {event.record && (
                  <Button
                    className="mt-3"
                    size="sm"
                    variant="outline"
                    onClick={() => printAssignment(event.record)}
                  >
                    <Printer className="ml-2 size-4" />
                    طباعة نموذج التعيين
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
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

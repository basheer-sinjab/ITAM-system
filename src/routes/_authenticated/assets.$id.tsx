import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Pencil, Printer, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PrinterImage } from "@/components/PrinterImage";
import { AssetForm } from "./assets.index";
import { useState } from "react";
import { formatDate } from "@/lib/pms";

export const Route = createFileRoute("/_authenticated/assets/$id")({
  component: AssetDetails,
});

function escapeHtml(value: unknown) {
  return String(value ?? "—").replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character] ?? character);
}

function AssetDetails() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);
  const { data: asset } = useQuery({
    queryKey: ["asset", id],
    queryFn: async () =>
      (await supabase.from("assets").select("*").eq("id", id).maybeSingle())
        .data,
  });
  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () =>
      (await supabase.from("employees").select("*")).data ?? [],
  });
  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: async () =>
      (await supabase.from("departments").select("*")).data ?? [],
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
  const remove = useMutation({
    mutationFn: () => supabase.from("assets").delete().eq("id", id),
    onSuccess: () => navigate({ to: "/assets" }),
  });
  if (!asset) return <p className="text-muted-foreground">جارٍ التحميل…</p>;
  const employee = (employeeId: string) =>
    employees.find((item: any) => item.id === employeeId);
  const print = (record: any) => {
    const person = employee(record.employee_id);
    const department = departments.find((item: any) => item.id === person?.department_id);
    const page = window.open("", "_blank");
    page?.document.write(
      `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>نموذج تسليم أصل - ${escapeHtml(asset.asset_id)}</title><style>@page{size:A4;margin:14mm}*{box-sizing:border-box}body{margin:0;color:#17212b;font-family:Tahoma,Arial,sans-serif;font-size:12px;line-height:1.6}.document{border:1px solid #d6dde3;padding:28px}.header{display:flex;align-items:flex-start;justify-content:space-between;border-bottom:3px solid #0f766e;padding-bottom:18px}.brand{color:#0f766e;font-size:20px;font-weight:700}.subtitle{color:#5b6975;font-size:12px}.document-title{text-align:left}.document-title h1{margin:0;color:#17212b;font-size:22px}.document-number{color:#5b6975;font-family:monospace;margin-top:4px}.notice{background:#eef8f7;border-right:4px solid #0f766e;margin:22px 0;padding:12px 14px}.section{margin-top:22px}.section-title{border-bottom:1px solid #d6dde3;color:#0f766e;font-size:15px;font-weight:700;margin:0 0 10px;padding-bottom:7px}.grid{display:grid;grid-template-columns:repeat(2,1fr);border:1px solid #d6dde3}.field{border-left:1px solid #d6dde3;border-bottom:1px solid #d6dde3;padding:9px 11px;min-height:54px}.field:nth-child(2n){border-left:0}.field:nth-last-child(-n+2){border-bottom:0}.label{color:#64748b;display:block;font-size:10px;margin-bottom:3px}.value{font-weight:700}.acknowledgement{border:1px solid #d6dde3;background:#fafcfc;margin-top:10px;padding:14px;text-align:justify}.signatures{display:grid;grid-template-columns:repeat(2,1fr);gap:48px;margin-top:52px}.signature{border-top:1px solid #64748b;padding-top:7px;text-align:center}.footer{border-top:1px solid #d6dde3;color:#64748b;font-size:10px;margin-top:30px;padding-top:9px;text-align:center}@media print{.document{border:0;padding:0}}</style></head><body><main class="document"><header class="header"><div><div class="brand">نظام إدارة الأصول التقنية</div><div class="subtitle">إدارة تقنية المعلومات</div></div><div class="document-title"><h1>نموذج تسليم واستلام أصل</h1><div class="document-number">رقم النموذج: ${escapeHtml(record.id)}</div></div></header><div class="notice">يوثق هذا النموذج تسليم الأصل الموضح أدناه إلى الموظف، ويُعد مرجعاً لسجل الأصول والتعيينات.</div><section class="section"><h2 class="section-title">بيانات الموظف</h2><div class="grid"><div class="field"><span class="label">الاسم الكامل</span><span class="value">${escapeHtml(person?.full_name)}</span></div><div class="field"><span class="label">القسم</span><span class="value">${escapeHtml(department?.name)}</span></div><div class="field"><span class="label">البريد الإلكتروني</span><span class="value">${escapeHtml(person?.email)}</span></div><div class="field"><span class="label">رقم الهاتف</span><span class="value">${escapeHtml(person?.phone)}</span></div></div></section><section class="section"><h2 class="section-title">بيانات الأصل</h2><div class="grid"><div class="field"><span class="label">اسم الأصل</span><span class="value">${escapeHtml(asset.name)}</span></div><div class="field"><span class="label">رقم الأصل</span><span class="value">${escapeHtml(asset.asset_id)}</span></div><div class="field"><span class="label">النوع</span><span class="value">${escapeHtml(asset.asset_type)}</span></div><div class="field"><span class="label">المصنّع والموديل</span><span class="value">${escapeHtml([asset.manufacturer, asset.model].filter(Boolean).join(" - "))}</span></div><div class="field"><span class="label">الرقم التسلسلي</span><span class="value">${escapeHtml(asset.serial_number)}</span></div><div class="field"><span class="label">تاريخ التعيين</span><span class="value">${escapeHtml(record.assignment_date)}</span></div></div></section><section class="section"><h2 class="section-title">إقرار الاستلام</h2><div class="acknowledgement">أقر أنا ${escapeHtml(person?.full_name)} بأنني استلمت الأصل الموضح أعلاه بحالة صالحة للاستخدام، وأتعهد بالمحافظة عليه واستخدامه لأغراض العمل فقط وإعادته عند الطلب أو عند انتهاء العلاقة الوظيفية. ${record.notes ? `ملاحظات التسليم: ${escapeHtml(record.notes)}` : ""}</div></section><section class="signatures"><div class="signature">توقيع الموظف المستلم<br><br>الاسم: ${escapeHtml(person?.full_name)}<br>التاريخ: ________________</div><div class="signature">توقيع ممثل تقنية المعلومات<br><br>الاسم: ________________<br>التاريخ: ________________</div></section><footer class="footer">تم إنشاء هذا النموذج من نظام إدارة الأصول التقنية</footer></main><script>window.print()</script></body></html>`,
    );
    page?.document.close();
  };
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link to="/assets">
            <Button variant="ghost" size="icon">
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
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEdit(true)}>
            <Pencil className="ml-2 size-4" />
            تعديل
          </Button>
          <Button
            variant="outline"
            className="text-destructive"
            onClick={() => confirm("حذف الأصل؟") && remove.mutate()}
          >
            <Trash2 className="ml-2 size-4" />
            حذف
          </Button>
        </div>
      </header>
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
            ["الحالة", asset.status],
            ["الموقع", asset.location],
            ["ملاحظات", asset.notes],
          ].map(([label, value]) => (
            <div key={label as string}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd>{value || "—"}</dd>
            </div>
          ))}
        </dl>
      </div>
      <section className="surface-panel overflow-hidden">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="font-semibold">سجل التعيين</h2>
        </div>
        <div className="divide-y">
          {history.length === 0 && (
            <p className="p-5 text-sm text-muted-foreground">
              لا يوجد سجل تعيين.
            </p>
          )}
          {history.map((record: any) => (
            <div
              key={record.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div>
                <p className="font-medium">
                  {employee(record.employee_id)?.full_name || "—"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(record.assignment_date)} إلى{" "}
                  {formatDate(record.return_date)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => print(record)}
                >
                  <Printer className="ml-1 size-4" />
                  طباعة نموذج التعيين
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={async () => {
                    await supabase
                      .from("assignment_history")
                      .delete()
                      .eq("id", record.id);
                    queryClient.invalidateQueries();
                  }}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="surface-panel overflow-hidden">
        <div className="border-b p-5">
          <h2 className="font-semibold">سجل الصيانة</h2>
        </div>
        {maintenanceRecords.length === 0 ? (
          <p className="p-5 text-sm text-muted-foreground">
            لا توجد سجلات صيانة لهذا الأصل.
          </p>
        ) : (
          <div className="divide-y">
            {maintenanceRecords.map((record: any) => (
              <div key={record.id} className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs text-muted-foreground">التاريخ</p>
                  <p className="font-medium">{formatDate(record.maintenance_date)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">النوع والحالة</p>
                  <p className="font-medium">{record.maintenance_type === "Preventive" ? "وقائية" : "تصحيحية"} · {record.status === "Closed" ? "مغلقة" : "مفتوحة"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">الفني</p>
                  <p className="font-medium">{record.technician || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">التكلفة</p>
                  <p className="font-medium">{record.cost || 0}</p>
                </div>
                <div className="space-y-1 text-sm sm:col-span-2 lg:col-span-4">
                  {record.problem_description && <p><span className="text-muted-foreground">المشكلة: </span>{record.problem_description}</p>}
                  <p><span className="text-muted-foreground">الحل: </span>{record.resolution || "—"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <AssetForm
        open={edit}
        onOpenChange={setEdit}
        asset={asset}
        employees={employees}
        onSaved={() => queryClient.invalidateQueries()}
      />
    </div>
  );
}

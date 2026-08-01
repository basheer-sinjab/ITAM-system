import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/licenses")({ component: Licenses });

function Licenses() {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [editingLicense, setEditingLicense] = useState<any>(null);
  const { data: licenses = [] } = useQuery({ queryKey: ["licenses"], queryFn: async () => (await supabase.from("licenses").select("*").order("license_name")).data ?? [] });
  const { data: assignments = [] } = useQuery({ queryKey: ["license-assignments"], queryFn: async () => (await supabase.from("license_assignments").select("*")).data ?? [] });
  const { data: employees = [] } = useQuery({ queryKey: ["employees"], queryFn: async () => (await supabase.from("employees").select("*")).data ?? [] });
  const { data: assets = [] } = useQuery({ queryKey: ["assets"], queryFn: async () => (await supabase.from("assets").select("*")).data ?? [] });

  const remove = async (license: any) => {
    if (!confirm(`حذف الترخيص "${license.license_name}" وكل تعييناته؟`)) return;
    const assignmentsResult = await supabase.from("license_assignments").delete().eq("license_id", license.id);
    if (assignmentsResult.error) return toast.error(assignmentsResult.error.message);
    const result = await supabase.from("licenses").delete().eq("id", license.id);
    if (result.error) return toast.error(result.error.message);
    queryClient.invalidateQueries();
    toast.success("تم حذف الترخيص");
  };

  return <div className="mx-auto max-w-7xl space-y-6"><header className="flex flex-wrap justify-between gap-3"><div><h1 className="text-2xl font-bold">التراخيص</h1><p className="text-sm text-muted-foreground">إدارة المقاعد والتعيينات</p></div><div className="flex gap-2"><Button variant="outline" onClick={() => setAssignmentOpen(true)}>تعيين ترخيص</Button><Button onClick={() => { setEditingLicense(null); setFormOpen(true); }}><Plus className="ml-2 size-4" />إضافة ترخيص</Button></div></header><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{licenses.map((license: any) => { const used = assignments.filter((item: any) => item.license_id === license.id).length; return <div key={license.id} className="surface-panel p-5"><div className="flex items-start justify-between gap-2"><div><h2 className="font-semibold">{license.license_name}</h2><p className="mt-1 text-sm text-muted-foreground">{license.product_name}</p></div><div className="flex gap-1"><Button variant="ghost" size="icon" aria-label="تعديل الترخيص" onClick={() => { setEditingLicense(license); setFormOpen(true); }}><Pencil className="size-4" /></Button><Button variant="ghost" size="icon" aria-label="حذف الترخيص" onClick={() => remove(license)}><Trash2 className="size-4 text-destructive" /></Button></div></div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm"><Seat value={license.seat_count} label="إجمالي" /><Seat value={used} label="مستخدم" /><Seat value={Math.max(0, license.seat_count - used)} label="متاح" /></div><p className="mt-4 text-xs text-muted-foreground">ينتهي: {license.expiration_date || "—"}</p></div>; })}</div>{formOpen && <LicenseForm license={editingLicense} close={() => { setFormOpen(false); setEditingLicense(null); }} saved={() => queryClient.invalidateQueries()} />}{assignmentOpen && <AssignmentForm licenses={licenses} employees={employees} assets={assets} close={() => setAssignmentOpen(false)} saved={() => queryClient.invalidateQueries()} />}</div>;
}

function Seat({ value, label }: { value: number; label: string }) { return <div><strong>{value}</strong><p className="text-muted-foreground">{label}</p></div>; }

function LicenseForm({ license, close, saved }: any) {
  const [form, setForm] = useState<any>({ license_name: license?.license_name ?? "", product_name: license?.product_name ?? "", license_type: license?.license_type ?? "", seat_count: license?.seat_count ?? 1, expiration_date: license?.expiration_date ?? "", notes: license?.notes ?? "" });
  const set = (key: string, value: any) => setForm({ ...form, [key]: value });
  const save = async () => {
    if (!form.license_name.trim()) return toast.error("اسم الترخيص مطلوب");
    const payload = { ...form, license_name: form.license_name.trim(), seat_count: Number(form.seat_count || 0), expiration_date: form.expiration_date || null };
    const result = license ? await supabase.from("licenses").update(payload).eq("id", license.id) : await supabase.from("licenses").insert(payload);
    if (result.error) return toast.error(result.error.message);
    saved(); close(); toast.success(license ? "تم تعديل الترخيص" : "تمت إضافة الترخيص");
  };
  return <Dialog open onOpenChange={close}><DialogContent><DialogHeader><DialogTitle>{license ? "تعديل ترخيص" : "إضافة ترخيص"}</DialogTitle></DialogHeader><div className="grid gap-4 sm:grid-cols-2"><Field label="اسم الترخيص"><Input value={form.license_name} onChange={(event) => set("license_name", event.target.value)} /></Field><Field label="المنتج"><Input value={form.product_name} onChange={(event) => set("product_name", event.target.value)} /></Field><Field label="نوع الترخيص"><Input value={form.license_type} onChange={(event) => set("license_type", event.target.value)} /></Field><Field label="عدد المقاعد"><Input type="number" min="0" value={form.seat_count} onChange={(event) => set("seat_count", event.target.value)} /></Field><Field label="تاريخ الانتهاء"><Input type="date" value={form.expiration_date} onChange={(event) => set("expiration_date", event.target.value)} /></Field><Field label="ملاحظات" className="sm:col-span-2"><Textarea value={form.notes} onChange={(event) => set("notes", event.target.value)} /></Field></div><DialogFooter><Button variant="outline" onClick={close}>إلغاء</Button><Button onClick={save}>حفظ</Button></DialogFooter></DialogContent></Dialog>;
}

function AssignmentForm({ licenses, employees, assets, close, saved }: any) {
  const [form, setForm] = useState<any>({ license_id: "", employee_id: "__none__", asset_id: "__none__", assignment_date: new Date().toISOString().slice(0, 10) });
  const save = async () => { if (!form.license_id) return toast.error("اختر ترخيصاً"); const result = await supabase.from("license_assignments").insert({ ...form, employee_id: form.employee_id === "__none__" ? null : form.employee_id, asset_id: form.asset_id === "__none__" ? null : form.asset_id }); if (result.error) return toast.error(result.error.message); saved(); close(); toast.success("تم تعيين الترخيص"); };
  return <Dialog open onOpenChange={close}><DialogContent><DialogHeader><DialogTitle>تعيين ترخيص</DialogTitle></DialogHeader><div className="grid gap-4"><Picker label="الترخيص" value={form.license_id} onChange={(value) => setForm({ ...form, license_id: value })} options={licenses} name="license_name" required /><Picker label="الموظف" value={form.employee_id} onChange={(value) => setForm({ ...form, employee_id: value })} options={employees} name="full_name" /><Picker label="الأصل" value={form.asset_id} onChange={(value) => setForm({ ...form, asset_id: value })} options={assets} name="name" /><Field label="تاريخ التعيين"><Input type="date" value={form.assignment_date} onChange={(event) => setForm({ ...form, assignment_date: event.target.value })} /></Field></div><DialogFooter><Button variant="outline" onClick={close}>إلغاء</Button><Button onClick={save}>حفظ</Button></DialogFooter></DialogContent></Dialog>;
}

function Picker({ label, value, onChange, options, name, required = false }: any) { return <Field label={label}><select className="flex h-10 w-full rounded-md border bg-background px-3 text-sm" value={value} onChange={(event) => onChange(event.target.value)}><option value="">{required ? "اختر…" : "غير محدد"}</option>{!required && <option value="__none__">غير محدد</option>}{options.map((item: any) => <option key={item.id} value={item.id}>{item[name]}</option>)}</select></Field>; }
function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) { return <div className={`space-y-2 ${className}`}><Label>{label}</Label>{children}</div>; }
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";

type LookupTable = "branches" | "departments" | "responsible_persons" | "parts";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "الإعدادات — نظام إدارة الطابعات" },
      { name: "description", content: "إدارة الفروع والأقسام والأشخاص المسؤولين وقطع الغيار وتنبيهات النظام." },
      { property: "og:title", content: "الإعدادات — نظام إدارة الطابعات" },
      { property: "og:description", content: "ضبط القوائم الأساسية وتنبيهات المخزون والضمان." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">الإعدادات</h1>
        <p className="text-sm text-muted-foreground">القوائم الأساسية وتنبيهات النظام</p>
      </header>

      <Tabs defaultValue="branches">
        <TabsList>
          <TabsTrigger value="branches">الفروع</TabsTrigger>
          <TabsTrigger value="departments">الأقسام</TabsTrigger>
          <TabsTrigger value="persons">الأشخاص المسؤولون</TabsTrigger>
          <TabsTrigger value="parts">قطع الغيار</TabsTrigger>
          <TabsTrigger value="alerts">التنبيهات</TabsTrigger>
        </TabsList>

        <TabsContent value="branches" className="mt-4">
          <LookupManager table="branches" title="الفروع" />
        </TabsContent>
        <TabsContent value="departments" className="mt-4">
          <LookupManager table="departments" title="الأقسام" />
        </TabsContent>
        <TabsContent value="persons" className="mt-4">
          <LookupManager table="responsible_persons" title="الأشخاص المسؤولون" />
        </TabsContent>
        <TabsContent value="parts" className="mt-4">
          <LookupManager table="parts" title="قطع الغيار" />
        </TabsContent>
        <TabsContent value="alerts" className="mt-4">
          <AlertSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LookupManager({ table, title }: { table: LookupTable; title: string }) {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const { data: rows } = useQuery({
    queryKey: [table],
    queryFn: async () => (await supabase.from(table).select("*").order("name")).data ?? [],
  });

  const add = useMutation({
    mutationFn: async () => {
      if (!name.trim()) throw new Error("الاسم مطلوب");
      const { error } = await supabase.from(table).insert({ name: name.trim() });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries();
      setName("");
      toast.success("تمت الإضافة");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from(table).update({ name: editName.trim() }).eq("id", editId!);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries();
      setEditId(null);
      toast.success("تم التعديل");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries();
      toast.success("تم الحذف");
    },
    onError: () => toast.error("لا يمكن الحذف — العنصر مستخدم في سجلات أخرى"),
  });

  return (
    <div className="surface-panel max-w-2xl space-y-4 p-6">
      <h2 className="font-semibold">{title}</h2>
      <div className="flex gap-2">
        <Input
          placeholder={`إضافة إلى ${title}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add.mutate()}
        />
        <Button className="gap-2" onClick={() => add.mutate()}>
          <Plus className="size-4" />
          إضافة
        </Button>
      </div>
      <ul className="divide-y rounded-lg border">
        {(rows ?? []).length === 0 && (
          <li className="p-4 text-center text-sm text-muted-foreground">لا توجد عناصر.</li>
        )}
        {(rows ?? []).map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-2 p-3">
            {editId === r.id ? (
              <>
                <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => update.mutate()}>
                    <Check className="size-4 text-primary" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setEditId(null)}>
                    <X className="size-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span>{r.name}</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditId(r.id);
                      setEditName(r.name);
                    }}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => remove.mutate(r.id)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AlertSettings() {
  const qc = useQueryClient();
  const { data: settings } = useQuery({
    queryKey: ["app_settings"],
    queryFn: async () =>
      (await supabase.from("app_settings").select("*").eq("id", true).maybeSingle()).data,
  });

  const [draft, setDraft] = useState<{
    low_stock_threshold: number;
    warranty_alert_days: number;
    dashboard_alerts_enabled: boolean;
  } | null>(null);

  const current = draft ??
    (settings
      ? {
          low_stock_threshold: settings.low_stock_threshold,
          warranty_alert_days: settings.warranty_alert_days,
          dashboard_alerts_enabled: settings.dashboard_alerts_enabled,
        }
      : { low_stock_threshold: 2, warranty_alert_days: 30, dashboard_alerts_enabled: true });

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("app_settings").upsert({ id: true, ...current });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries();
      toast.success("تم حفظ الإعدادات");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="surface-panel max-w-xl space-y-5 p-6">
      <h2 className="font-semibold">إعدادات التنبيهات</h2>
      <div className="space-y-2">
        <Label>حد التنبيه الافتراضي لنقص الحبر</Label>
        <Input
          type="number"
          min={0}
          value={current.low_stock_threshold}
          onChange={(e) => setDraft({ ...current, low_stock_threshold: Number(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label>التنبيه قبل انتهاء الضمان (أيام)</Label>
        <Input
          type="number"
          min={0}
          value={current.warranty_alert_days}
          onChange={(e) => setDraft({ ...current, warranty_alert_days: Number(e.target.value) })}
        />
      </div>
      <div className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <p className="font-medium">تنبيهات لوحة التحكم</p>
          <p className="text-xs text-muted-foreground">إظهار تنبيهات النقص والضمان داخل النظام</p>
        </div>
        <Switch
          checked={current.dashboard_alerts_enabled}
          onCheckedChange={(v) => setDraft({ ...current, dashboard_alerts_enabled: v })}
        />
      </div>
      <Button onClick={() => save.mutate()} disabled={save.isPending}>
        حفظ الإعدادات
      </Button>
    </div>
  );
}

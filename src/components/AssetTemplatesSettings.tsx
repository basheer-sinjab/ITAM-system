import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Layers3, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ASSET_TYPES } from "@/lib/pms";
import { ConfirmButton } from "@/components/ConfirmButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function AssetTemplatesSettings() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any>();
  const { data: templates = [] } = useQuery({
    queryKey: ["asset-templates"],
    queryFn: async () =>
      (await supabase.from("asset_templates").select("*").order("name")).data ??
      [],
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const result = await supabase
        .from("asset_templates")
        .delete()
        .eq("id", id);
      if (result.error) throw result.error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["asset-templates"] });
      toast.success("تم حذف القالب");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <section className="surface-panel space-y-5 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">قوالب الأجهزة</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            اختر القالب عند إضافة أصل لتعبئة النوع والمصنّع والموديل مباشرة.
          </p>
        </div>
        <Button onClick={() => setEditing({ asset_type: "Desktop PC" })}>
          <Plus className="ml-2 size-4" />
          إضافة قالب
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((template: any) => (
          <article key={template.id} className="rounded-xl border p-4">
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers3 className="size-5" />
              </span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing(template)}
                  aria-label={`تعديل ${template.name}`}
                >
                  <Pencil className="size-4" />
                </Button>
                <ConfirmButton
                  variant="ghost"
                  size="icon"
                  title="حذف القالب؟"
                  description={`سيتم حذف قالب ${template.name} فقط ولن تتأثر الأصول المضافة منه.`}
                  onConfirm={() => remove.mutate(template.id)}
                >
                  <Trash2 className="size-4 text-destructive" />
                </ConfirmButton>
              </div>
            </div>
            <h3 className="mt-3 font-semibold">{template.name}</h3>
            <p className="text-sm text-muted-foreground">
              {[template.manufacturer, template.model]
                .filter(Boolean)
                .join(" — ") || "بدون مصنّع أو موديل"}
            </p>
            <span className="mt-3 inline-flex rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
              {template.asset_type}
            </span>
          </article>
        ))}
        {!templates.length && (
          <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground md:col-span-2 xl:col-span-3">
            أضف أول قالب لجهاز تستخدمه بشكل متكرر.
          </p>
        )}
      </div>
      {editing && (
        <TemplateDialog
          template={editing.id ? editing : undefined}
          initial={editing}
          close={() => setEditing(undefined)}
          saved={() => {
            queryClient.invalidateQueries({ queryKey: ["asset-templates"] });
            setEditing(undefined);
          }}
        />
      )}
    </section>
  );
}

function TemplateDialog({ template, initial, close, saved }: any) {
  const [form, setForm] = useState<any>({
    name: template?.name || "",
    asset_type: template?.asset_type || initial?.asset_type || "Desktop PC",
    manufacturer: template?.manufacturer || "",
    model: template?.model || "",
    notes: template?.notes || "",
  });
  const [saving, setSaving] = useState(false);
  const set = (key: string, value: string) =>
    setForm((current: any) => ({ ...current, [key]: value }));
  const save = async () => {
    if (!form.name.trim()) return toast.error("اسم القالب مطلوب");
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      asset_type: form.asset_type,
      manufacturer: form.manufacturer.trim() || null,
      model: form.model.trim() || null,
      notes: form.notes.trim() || null,
    };
    const result = template
      ? await supabase
          .from("asset_templates")
          .update(payload)
          .eq("id", template.id)
      : await supabase.from("asset_templates").insert(payload);
    setSaving(false);
    if (result.error) return toast.error(result.error.message);
    toast.success(template ? "تم تعديل القالب" : "تمت إضافة القالب");
    saved();
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {template ? "تعديل قالب" : "إضافة قالب جهاز"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="اسم القالب" className="sm:col-span-2">
            <Input
              value={form.name}
              onChange={(event) => set("name", event.target.value)}
              placeholder="مثال: Dell OptiPlex 7010"
            />
          </Field>
          <Field label="نوع الأصل">
            <Select
              value={form.asset_type}
              onValueChange={(value) => set("asset_type", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ASSET_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="الشركة المصنّعة">
            <Input
              value={form.manufacturer}
              onChange={(event) => set("manufacturer", event.target.value)}
            />
          </Field>
          <Field label="الموديل" className="sm:col-span-2">
            <Input
              value={form.model}
              onChange={(event) => set("model", event.target.value)}
            />
          </Field>
          <Field label="ملاحظات" className="sm:col-span-2">
            <Textarea
              value={form.notes}
              onChange={(event) => set("notes", event.target.value)}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            إلغاء
          </Button>
          <Button disabled={saving} onClick={save}>
            حفظ القالب
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children, className = "" }: any) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

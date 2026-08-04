import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Boxes,
  Cpu,
  History,
  MemoryStick,
  PackagePlus,
  Pencil,
  Printer,
  RotateCcw,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { runHardwareAction, supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/pms";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const OLD_PART_ACTIONS: Record<string, string> = {
  damaged: "تالفة",
  return_to_stock: "رجعت للمخزون",
  disposed: "تم التخلص منها",
};

function assetKind(assetType: unknown) {
  const type = String(assetType || "")
    .trim()
    .toLowerCase();
  if (type === "printer" || type.includes("طابعة")) return "printer";
  if (
    type === "desktop pc" ||
    type === "pc" ||
    type === "laptop" ||
    type.includes("notebook") ||
    type.includes("desktop") ||
    type.includes("كمبيوتر مكتبي")
  )
    return "pc";
  return null;
}

export function AssetHardwareTabs({ asset }: { asset: any }) {
  const kind = assetKind(asset.asset_type);
  if (!kind) return null;
  if (kind === "printer")
    return (
      <section className="surface-panel overflow-hidden">
        <Tabs defaultValue="toner" dir="rtl">
          <TabsList className="m-4 mb-0">
            <TabsTrigger value="toner" className="gap-2">
              <Printer className="size-4" />
              الأحبار
            </TabsTrigger>
          </TabsList>
          <TabsContent value="toner" className="m-0 p-4">
            <PrinterTonerPanel asset={asset} />
          </TabsContent>
        </Tabs>
      </section>
    );
  return (
    <section className="surface-panel overflow-hidden">
      <Tabs defaultValue="specs" dir="rtl">
        <TabsList className="m-4 mb-0">
          <TabsTrigger value="specs" className="gap-2">
            <Cpu className="size-4" />
            مواصفات الكمبيوتر
          </TabsTrigger>
          <TabsTrigger value="parts" className="gap-2">
            <Boxes className="size-4" />
            القطع المركبة
          </TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="m-0 p-4">
          <PcSpecsPanel asset={asset} />
        </TabsContent>
        <TabsContent value="parts" className="m-0 p-4">
          <PcPartsPanel asset={asset} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function PcSpecsPanel({ asset }: any) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const { data: specs } = useQuery({
    queryKey: ["pc-specs", asset.id],
    queryFn: async () =>
      (
        await supabase
          .from("pc_specs")
          .select("*")
          .eq("asset_id", asset.id)
          .maybeSingle()
      ).data,
  });
  const fields = [
    ["المعالج", specs?.processor, Cpu],
    ["الذاكرة", specs?.memory, MemoryStick],
    ["التخزين", specs?.storage, Boxes],
    ["كرت الشاشة", specs?.graphics_card, Cpu],
    ["نظام التشغيل", specs?.operating_system, Wrench],
    ["ملاحظات", specs?.notes, History],
  ] as const;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">مواصفات الجهاز</h2>
          <p className="text-sm text-muted-foreground">
            مواصفات مختصرة يتم تحديثها يدويًا عند الحاجة.
          </p>
        </div>
        <Button variant="outline" onClick={() => setEditing(true)}>
          <Pencil className="ml-2 size-4" />
          {specs ? "تعديل المواصفات" : "إضافة المواصفات"}
        </Button>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map(([label, value, Icon]) => (
          <div key={label} className="rounded-lg border bg-muted/20 p-4">
            <dt className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className="size-4 text-primary" />
              {label}
            </dt>
            <dd className="mt-2 font-medium">{value || "—"}</dd>
          </div>
        ))}
      </dl>
      {editing && (
        <PcSpecsDialog
          asset={asset}
          specs={specs}
          close={() => setEditing(false)}
          saved={() => {
            queryClient.invalidateQueries({
              queryKey: ["pc-specs", asset.id],
            });
            setEditing(false);
          }}
        />
      )}
    </div>
  );
}

function PcSpecsDialog({ asset, specs, close, saved }: any) {
  const [form, setForm] = useState<any>({
    processor: specs?.processor || "",
    memory: specs?.memory || "",
    storage: specs?.storage || "",
    graphics_card: specs?.graphics_card || "",
    operating_system: specs?.operating_system || "",
    notes: specs?.notes || "",
  });
  const [saving, setSaving] = useState(false);
  const set = (key: string, value: string) =>
    setForm((current: any) => ({ ...current, [key]: value }));
  const save = async () => {
    setSaving(true);
    const payload = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [
        key,
        String(value || "").trim() || null,
      ]),
    );
    const result = specs
      ? await supabase
          .from("pc_specs")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", specs.id)
      : await supabase.from("pc_specs").insert({
          ...payload,
          asset_id: asset.id,
          updated_at: new Date().toISOString(),
        });
    setSaving(false);
    if (result.error) return toast.error(result.error.message);
    toast.success("تم حفظ مواصفات الكمبيوتر");
    saved();
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>مواصفات {asset.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="المعالج">
            <Input
              value={form.processor}
              onChange={(event) => set("processor", event.target.value)}
              placeholder="مثال: Intel Core i5"
            />
          </Field>
          <Field label="الذاكرة">
            <Input
              value={form.memory}
              onChange={(event) => set("memory", event.target.value)}
              placeholder="مثال: 16 GB"
            />
          </Field>
          <Field label="التخزين">
            <Input
              value={form.storage}
              onChange={(event) => set("storage", event.target.value)}
              placeholder="مثال: SSD 512 GB"
            />
          </Field>
          <Field label="كرت الشاشة">
            <Input
              value={form.graphics_card}
              onChange={(event) => set("graphics_card", event.target.value)}
            />
          </Field>
          <Field label="نظام التشغيل" className="sm:col-span-2">
            <Input
              value={form.operating_system}
              onChange={(event) => set("operating_system", event.target.value)}
              placeholder="مثال: Windows 11 Pro"
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
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PcPartsPanel({ asset }: any) {
  const queryClient = useQueryClient();
  const [installing, setInstalling] = useState<any>();
  const { data: inventory = [] } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () =>
      (await supabase.from("inventory_items").select("*").order("name")).data ??
      [],
  });
  const { data: installations = [] } = useQuery({
    queryKey: ["pc-parts", asset.id],
    queryFn: async () =>
      (
        await supabase
          .from("pc_part_installations")
          .select("*")
          .eq("asset_id", asset.id)
          .order("installed_at", { ascending: false })
      ).data ?? [],
  });
  const active = installations.filter(
    (item: any) => !item.removed_at && !item.undone_at,
  );
  const history = installations.filter(
    (item: any) => item.removed_at || item.undone_at,
  );
  const spareParts = inventory.filter(
    (item: any) => item.category === "Spare Part",
  );
  const refresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["pc-parts", asset.id] }),
      queryClient.invalidateQueries({ queryKey: ["inventory"] }),
      queryClient.invalidateQueries({ queryKey: ["inventory-movements"] }),
      queryClient.invalidateQueries({ queryKey: ["asset-activity", asset.id] }),
    ]);
  };
  const undo = async (installation: any) => {
    try {
      await runHardwareAction({
        action: "undo-part",
        installationId: installation.id,
      });
      await refresh();
      toast.success("تم التراجع وإعادة الكمية للمخزون");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تعذر التراجع");
    }
  };
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">القطع الموجودة داخل الجهاز</h2>
          <p className="text-sm text-muted-foreground">
            التركيب والاستبدال يحدّثان كمية المخزون تلقائيًا.
          </p>
        </div>
        <Button onClick={() => setInstalling({})}>
          <PackagePlus className="ml-2 size-4" />
          تركيب قطعة
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {active.map((installation: any) => (
          <article key={installation.id} className="rounded-xl border p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{installation.part_name}</h3>
                <p className="text-xs text-muted-foreground">
                  رُكبت بتاريخ {formatDate(installation.installed_at)}
                </p>
              </div>
              <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700">
                مركبة
              </span>
            </div>
            {installation.notes && (
              <p className="mt-3 text-sm text-muted-foreground">
                {installation.notes}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInstalling({ oldPart: installation })}
              >
                <Wrench className="ml-2 size-4" />
                استبدال
              </Button>
              <ConfirmButton
                size="sm"
                variant="ghost"
                title="التراجع عن التركيب؟"
                description="ستعود القطعة إلى المخزون، وإذا كانت بديلة فستعود القطعة القديمة إلى الجهاز."
                onConfirm={() => undo(installation)}
              >
                <RotateCcw className="ml-2 size-4" />
                تراجع
              </ConfirmButton>
            </div>
          </article>
        ))}
        {!active.length && (
          <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground md:col-span-2">
            لم يتم تسجيل قطع مركبة في هذا الكمبيوتر بعد.
          </p>
        )}
      </div>
      {history.length > 0 && (
        <div className="space-y-2 border-t pt-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <History className="size-4 text-primary" />
            سجل القطع القديمة
          </h3>
          {history.map((installation: any) => (
            <div
              key={installation.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted/40 p-3 text-sm"
            >
              <span>{installation.part_name}</span>
              <span className="text-xs text-muted-foreground">
                {installation.undone_at
                  ? "تم التراجع عن تركيبها"
                  : OLD_PART_ACTIONS[installation.old_part_action] ||
                    "تمت إزالتها"}
                {installation.removed_at
                  ? ` · ${formatDate(installation.removed_at)}`
                  : ""}
              </span>
            </div>
          ))}
        </div>
      )}
      {installing && (
        <InstallPartDialog
          asset={asset}
          oldPart={installing.oldPart}
          spareParts={spareParts}
          close={() => setInstalling(undefined)}
          saved={async () => {
            setInstalling(undefined);
            await refresh();
          }}
        />
      )}
    </div>
  );
}

function InstallPartDialog({ asset, oldPart, spareParts, close, saved }: any) {
  const [itemId, setItemId] = useState("");
  const [oldPartAction, setOldPartAction] = useState("damaged");
  const [installedAt, setInstalledAt] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (!itemId) return toast.error("اختر قطعة الغيار");
    setSaving(true);
    try {
      await runHardwareAction({
        action: "install-part",
        assetId: asset.id,
        itemId,
        installedAt,
        notes,
        oldInstallationId: oldPart?.id,
        oldPartAction: oldPart ? oldPartAction : undefined,
      });
      toast.success(oldPart ? "تم استبدال القطعة" : "تم تركيب القطعة");
      await saved();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تعذر تركيب القطعة");
    } finally {
      setSaving(false);
    }
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {oldPart
              ? `استبدال ${oldPart.part_name}`
              : "تركيب قطعة في الكمبيوتر"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Field label="قطعة الغيار الجديدة">
            <Select value={itemId} onValueChange={setItemId}>
              <SelectTrigger>
                <SelectValue placeholder="اختر من المخزون" />
              </SelectTrigger>
              <SelectContent>
                {spareParts.map((item: any) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name} — المتوفر {Number(item.quantity)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          {!spareParts.length && (
            <p className="rounded-lg bg-amber-500/10 p-3 text-sm text-amber-800">
              لا توجد قطع غيار في المخزون. أضف القطعة من صفحة المخزون أولًا.
            </p>
          )}
          {oldPart && (
            <Field label="ماذا تم مع القطعة القديمة؟">
              <Select value={oldPartAction} onValueChange={setOldPartAction}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="damaged">تالفة</SelectItem>
                  <SelectItem value="return_to_stock">رجعت للمخزون</SelectItem>
                  <SelectItem value="disposed">تم التخلص منها</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
          <Field label="تاريخ التركيب">
            <Input
              type="date"
              value={installedAt}
              onChange={(event) => setInstalledAt(event.target.value)}
            />
          </Field>
          <Field label="ملاحظة اختيارية">
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
          <Button disabled={saving || !spareParts.length} onClick={save}>
            {oldPart ? "تأكيد الاستبدال" : "تأكيد التركيب"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PrinterTonerPanel({ asset }: any) {
  const queryClient = useQueryClient();
  const [installing, setInstalling] = useState(false);
  const { data: inventory = [] } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () =>
      (await supabase.from("inventory_items").select("*").order("name")).data ??
      [],
  });
  const { data: installations = [] } = useQuery({
    queryKey: ["toner-installations", asset.id],
    queryFn: async () =>
      (
        await supabase
          .from("toner_installations")
          .select("*")
          .eq("asset_id", asset.id)
          .order("installed_at", { ascending: false })
      ).data ?? [],
  });
  const toners = inventory.filter((item: any) => item.category === "Toner");
  const refresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["toner-installations", asset.id],
      }),
      queryClient.invalidateQueries({ queryKey: ["inventory"] }),
      queryClient.invalidateQueries({ queryKey: ["inventory-movements"] }),
      queryClient.invalidateQueries({ queryKey: ["asset-activity", asset.id] }),
    ]);
  };
  const undo = async (installation: any) => {
    try {
      await runHardwareAction({
        action: "undo-toner",
        installationId: installation.id,
      });
      await refresh();
      toast.success("تم التراجع وإعادة الحبر للمخزون");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تعذر التراجع");
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">تركيب الأحبار</h2>
          <p className="text-sm text-muted-foreground">
            اختر الحبر يدويًا وسيتم خصم الكمية وتسجيل التركيب.
          </p>
        </div>
        <Button onClick={() => setInstalling(true)}>
          <PackagePlus className="ml-2 size-4" />
          تركيب حبر
        </Button>
      </div>
      <div className="space-y-2">
        {installations.map((installation: any) => (
          <article
            key={installation.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4"
          >
            <div>
              <h3 className="font-semibold">{installation.toner_name}</h3>
              <p className="text-xs text-muted-foreground">
                الكمية {Number(installation.quantity)} ·{" "}
                {formatDate(installation.installed_at)}
                {installation.notes ? ` · ${installation.notes}` : ""}
              </p>
            </div>
            {installation.undone_at ? (
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                تم التراجع
              </span>
            ) : (
              <ConfirmButton
                size="sm"
                variant="outline"
                title="التراجع عن تركيب الحبر؟"
                description="ستعود الكمية إلى المخزون ويبقى سجل العملية محفوظًا."
                onConfirm={() => undo(installation)}
              >
                <RotateCcw className="ml-2 size-4" />
                تراجع
              </ConfirmButton>
            )}
          </article>
        ))}
        {!installations.length && (
          <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            لم يتم تسجيل تركيب أحبار لهذه الطابعة بعد.
          </p>
        )}
      </div>
      {installing && (
        <InstallTonerDialog
          asset={asset}
          toners={toners}
          close={() => setInstalling(false)}
          saved={async () => {
            setInstalling(false);
            await refresh();
          }}
        />
      )}
    </div>
  );
}

function InstallTonerDialog({ asset, toners, close, saved }: any) {
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [installedAt, setInstalledAt] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (!itemId) return toast.error("اختر الحبر");
    if (!Number.isFinite(quantity) || quantity < 1)
      return toast.error("أدخل كمية صحيحة");
    setSaving(true);
    try {
      await runHardwareAction({
        action: "install-toner",
        assetId: asset.id,
        itemId,
        quantity,
        installedAt,
        notes,
      });
      toast.success("تم تركيب الحبر وخصم الكمية من المخزون");
      await saved();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تعذر تركيب الحبر");
    } finally {
      setSaving(false);
    }
  };
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تركيب حبر في {asset.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Field label="الحبر">
            <Select value={itemId} onValueChange={setItemId}>
              <SelectTrigger>
                <SelectValue placeholder="اختر من المخزون" />
              </SelectTrigger>
              <SelectContent>
                {toners.map((toner: any) => (
                  <SelectItem key={toner.id} value={toner.id}>
                    {toner.name}
                    {toner.color ? ` — ${toner.color}` : ""} — المتوفر{" "}
                    {Number(toner.quantity)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          {!toners.length && (
            <p className="rounded-lg bg-amber-500/10 p-3 text-sm text-amber-800">
              لا توجد أحبار في المخزون. أضف الحبر من صفحة المخزون أولًا.
            </p>
          )}
          <Field label="الكمية">
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </Field>
          <Field label="تاريخ التركيب">
            <Input
              type="date"
              value={installedAt}
              onChange={(event) => setInstalledAt(event.target.value)}
            />
          </Field>
          <Field label="ملاحظة اختيارية">
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
          <Button disabled={saving || !toners.length} onClick={save}>
            تأكيد التركيب
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

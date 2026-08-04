import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Download,
  Upload,
  Settings2,
  FileSpreadsheet,
  History,
} from "lucide-react";
import { toast } from "sonner";
import { createLocalBackup, restoreLocalBackup } from "@/lib/local-backup";
import { ManagementHeader } from "@/components/ManagementVisuals";
import { ConfirmButton } from "@/components/ConfirmButton";
import { downloadCsv, parseCsv } from "@/lib/csv";
import { AssetTemplatesSettings } from "@/components/AssetTemplatesSettings";
import { COLOR_PALETTE, ColorField } from "@/components/ColorField";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type LookupTable = "branches" | "technicians";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "الإعدادات — ITAMFloss" },
      {
        name: "description",
        content: "إدارة الفروع والفنيين والتنبيهات والبيانات المحلية.",
      },
      { property: "og:title", content: "الإعدادات — ITAMFloss" },
      {
        property: "og:description",
        content: "ضبط القوائم الأساسية والتنبيهات والنسخ الاحتياطي.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <ManagementHeader
        icon={Settings2}
        title="الإعدادات"
        description="القوائم الأساسية وتنبيهات النظام والنسخ الاحتياطي"
      />

      <Tabs defaultValue="branches" dir="rtl" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 p-1 sm:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger
            className="h-auto min-h-9 whitespace-normal text-center leading-5"
            value="branches"
          >
            الفروع
          </TabsTrigger>
          <TabsTrigger
            className="h-auto min-h-9 whitespace-normal text-center leading-5"
            value="technicians"
          >
            الفنيون
          </TabsTrigger>
          <TabsTrigger
            className="h-auto min-h-9 whitespace-normal text-center leading-5"
            value="asset-templates"
          >
            قوالب الأجهزة
          </TabsTrigger>
          <TabsTrigger
            className="h-auto min-h-9 whitespace-normal text-center leading-5"
            value="alerts"
          >
            التنبيهات
          </TabsTrigger>
          <TabsTrigger
            className="h-auto min-h-9 whitespace-normal text-center leading-5"
            value="backup"
          >
            النسخ الاحتياطي
          </TabsTrigger>
          <TabsTrigger
            className="h-auto min-h-9 whitespace-normal text-center leading-5"
            value="transfer"
          >
            استيراد وتصدير
          </TabsTrigger>
          <TabsTrigger
            className="h-auto min-h-9 whitespace-normal text-center leading-5"
            value="activity"
          >
            سجل النشاط
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branches" className="mt-4">
          <LookupManager table="branches" title="الفروع" />
        </TabsContent>
        <TabsContent value="technicians" className="mt-4">
          <LookupManager table="technicians" title="الفنيون" />
        </TabsContent>
        <TabsContent value="asset-templates" className="mt-4">
          <AssetTemplatesSettings />
        </TabsContent>
        <TabsContent value="alerts" className="mt-4">
          <AlertSettings />
        </TabsContent>
        <TabsContent value="backup" className="mt-4">
          <BackupSettings />
        </TabsContent>
        <TabsContent value="transfer" className="mt-4">
          <DataTransferSettings />
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <ActivityLog />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BackupSettings() {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [pendingRestore, setPendingRestore] = useState<File>();

  const downloadBackupFile = (backup: string, prefix = "itam-backup") => {
    const url = URL.createObjectURL(
      new Blob([backup], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${prefix}-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadBackup = async () => {
    setIsWorking(true);
    try {
      const backup = await createLocalBackup();
      downloadBackupFile(backup);
      toast.success("تم إنشاء النسخة الاحتياطية مع الصور");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "تعذر إنشاء النسخة الاحتياطية",
      );
    } finally {
      setIsWorking(false);
    }
  };

  const restoreBackup = async (file?: File) => {
    if (!file) return;
    setIsWorking(true);
    try {
      const safetyBackup = await createLocalBackup();
      downloadBackupFile(safetyBackup, "itam-before-restore");
      await restoreLocalBackup(file);
      await queryClient.invalidateQueries();
      toast.success("تمت استعادة البيانات والصور");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "تعذرت استعادة النسخة الاحتياطية",
      );
    } finally {
      setIsWorking(false);
      if (inputRef.current) inputRef.current.value = "";
      setPendingRestore(undefined);
    }
  };

  return (
    <div className="surface-panel max-w-xl space-y-5 p-6">
      <div>
        <h2 className="font-semibold">النسخ الاحتياطي والاستعادة</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          يشمل جميع البيانات وصور الطابعات المحفوظة محليًا.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button className="gap-2" onClick={downloadBackup} disabled={isWorking}>
          <Download className="size-4" />
          تنزيل نسخة احتياطية
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => inputRef.current?.click()}
          disabled={isWorking}
        >
          <Upload className="size-4" />
          استعادة نسخة
        </Button>
        <Input
          ref={inputRef}
          className="hidden"
          type="file"
          accept="application/json,.json"
          onChange={(event) => setPendingRestore(event.target.files?.[0])}
        />
      </div>
      <AlertDialog
        open={Boolean(pendingRestore)}
        onOpenChange={(open) => {
          if (!open && !isWorking) {
            setPendingRestore(undefined);
            if (inputRef.current) inputRef.current.value = "";
          }
        }}
      >
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader className="text-right sm:text-right">
            <AlertDialogTitle>استعادة النسخة الاحتياطية؟</AlertDialogTitle>
            <AlertDialogDescription>
              ستستبدل النسخة المختارة جميع البيانات الحالية. سينزّل النظام أولًا
              نسخة أمان تلقائية من البيانات الحالية.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:flex-row-reverse sm:space-x-0">
            <AlertDialogAction
              disabled={isWorking}
              onClick={(event) => {
                event.preventDefault();
                void restoreBackup(pendingRestore);
              }}
            >
              تأكيد الاستعادة
            </AlertDialogAction>
            <AlertDialogCancel disabled={isWorking}>إلغاء</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function LookupManager({
  table,
  title,
}: {
  table: LookupTable;
  title: string;
}) {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLOR_PALETTE[0]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState(COLOR_PALETTE[0]);

  const { data: rows } = useQuery({
    queryKey: [table],
    queryFn: async () =>
      (await supabase.from(table).select("*").order("name")).data ?? [],
  });

  const add = useMutation({
    mutationFn: async () => {
      if (!name.trim()) throw new Error("الاسم مطلوب");
      const { error } = await supabase.from(table).insert({
        name: name.trim(),
        ...(table === "branches" ? { color } : {}),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries();
      setName("");
      if (table === "branches")
        setColor(
          COLOR_PALETTE[((rows?.length ?? 0) + 1) % COLOR_PALETTE.length],
        );
      toast.success("تمت الإضافة");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from(table)
        .update({
          name: editName.trim(),
          ...(table === "branches" ? { color: editColor } : {}),
        })
        .eq("id", editId!);
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
      {table === "branches" && <ColorField value={color} onChange={setColor} />}
      <ul className="divide-y rounded-lg border">
        {(rows ?? []).length === 0 && (
          <li className="p-4 text-center text-sm text-muted-foreground">
            لا توجد عناصر.
          </li>
        )}
        {(rows ?? []).map((r: any) => (
          <li
            key={r.id}
            className="flex items-center justify-between gap-2 p-3"
          >
            {editId === r.id ? (
              <>
                <div className="flex-1 space-y-2">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  {table === "branches" && (
                    <ColorField value={editColor} onChange={setEditColor} />
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => update.mutate()}
                  >
                    <Check className="size-4 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditId(null)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span className="flex items-center gap-2">
                  {table === "branches" && (
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: r.color || COLOR_PALETTE[0] }}
                    />
                  )}
                  {r.name}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditId(r.id);
                      setEditName(r.name);
                      setEditColor(r.color || COLOR_PALETTE[0]);
                    }}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <ConfirmButton
                    variant="ghost"
                    size="icon"
                    title={`حذف ${r.name}؟`}
                    description="قد يؤثر الحذف على السجلات المرتبطة بهذا العنصر."
                    onConfirm={() => remove.mutate(r.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </ConfirmButton>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

type TransferKind = "assets" | "employees" | "inventory";
const TRANSFER_LABELS: Record<TransferKind, string> = {
  assets: "الأصول",
  employees: "الموظفون",
  inventory: "المخزون",
};

function DataTransferSettings() {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [kind, setKind] = useState<TransferKind>("assets");
  const [working, setWorking] = useState(false);
  const {
    data = {
      assets: [],
      employees: [],
      inventory: [],
      departments: [],
      branches: [],
    },
  } = useQuery({
    queryKey: ["data-transfer"],
    queryFn: async () => {
      const [assets, employees, inventory, departments, branches] =
        await Promise.all([
          supabase.from("assets").select("*"),
          supabase.from("employees").select("*"),
          supabase.from("inventory_items").select("*"),
          supabase.from("departments").select("*"),
          supabase.from("branches").select("*"),
        ]);
      return {
        assets: assets.data ?? [],
        employees: employees.data ?? [],
        inventory: inventory.data ?? [],
        departments: departments.data ?? [],
        branches: branches.data ?? [],
      };
    },
  });
  const departmentLabel = (departmentId: string) => {
    const department = data.departments.find(
      (item: any) => item.id === departmentId,
    );
    if (!department) return "";
    const branch =
      data.branches.find((item: any) => item.id === department.branch_id)
        ?.name ||
      data.branches.find((item: any) => item.name === department.branch)?.name;
    return `${department.name}${branch ? ` - ${branch}` : ""}`;
  };
  const exportRows = () => {
    const date = new Date().toISOString().slice(0, 10);
    if (kind === "assets")
      downloadCsv(
        `assets-${date}.csv`,
        [
          "رقم الأصل",
          "اسم الأصل",
          "النوع",
          "الشركة",
          "الموديل",
          "الرقم التسلسلي",
          "الحالة",
          "القسم",
          "الموظف",
          "تاريخ الشراء",
          "انتهاء الضمان",
          "ملاحظات",
        ],
        data.assets.map((asset: any) => [
          asset.asset_id,
          asset.name,
          asset.asset_type,
          asset.manufacturer,
          asset.model,
          asset.serial_number,
          (
            {
              active: "نشط",
              inactive: "غير نشط",
              maintenance: "تحت الصيانة",
              retired: "متقاعد",
            } as Record<string, string>
          )[asset.status] || asset.status,
          departmentLabel(asset.department_id),
          data.employees.find(
            (item: any) => item.id === asset.assigned_employee_id,
          )?.full_name || "",
          asset.purchase_date,
          asset.warranty_expiry,
          asset.notes,
        ]),
      );
    if (kind === "employees")
      downloadCsv(
        `employees-${date}.csv`,
        [
          "رقم الموظف",
          "الاسم الكامل",
          "البريد الإلكتروني",
          "الهاتف",
          "القسم",
          "الحالة",
          "ملاحظات",
        ],
        data.employees.map((employee: any) => [
          employee.employee_number,
          employee.full_name,
          employee.email,
          employee.phone,
          departmentLabel(employee.department_id),
          employee.status === "inactive" ? "غير نشط" : "نشط",
          employee.notes,
        ]),
      );
    if (kind === "inventory")
      downloadCsv(
        `inventory-${date}.csv`,
        ["اسم العنصر", "النوع", "الكمية", "المكان", "ملاحظات"],
        data.inventory.map((item: any) => [
          item.name,
          (
            {
              Consumable: "مستهلكات",
              Toner: "أحبار",
              "Spare Part": "قطع وأدوات",
            } as Record<string, string>
          )[item.category] || item.category,
          item.quantity,
          item.location,
          item.notes,
        ]),
      );
    toast.success(`تم تصدير ${TRANSFER_LABELS[kind]} بصيغة متوافقة مع Excel`);
  };
  const template = () => {
    if (kind === "assets")
      downloadCsv(
        "assets-template.csv",
        [
          "رقم الأصل",
          "اسم الأصل",
          "النوع",
          "الشركة",
          "الموديل",
          "الرقم التسلسلي",
          "الحالة",
          "القسم",
          "الموظف",
          "تاريخ الشراء",
          "انتهاء الضمان",
          "ملاحظات",
        ],
        [],
      );
    if (kind === "employees")
      downloadCsv(
        "employees-template.csv",
        [
          "رقم الموظف",
          "الاسم الكامل",
          "البريد الإلكتروني",
          "الهاتف",
          "القسم",
          "الحالة",
          "ملاحظات",
        ],
        [],
      );
    if (kind === "inventory")
      downloadCsv(
        "inventory-template.csv",
        ["اسم العنصر", "النوع", "الكمية", "المكان", "ملاحظات"],
        [],
      );
  };
  const resolveDepartment = (label: string) =>
    data.departments.find(
      (department: any) =>
        departmentLabel(department.id) === label || department.name === label,
    )?.id || null;
  const importFile = async (file?: File) => {
    if (!file) return;
    setWorking(true);
    try {
      const rows = parseCsv(await file.text());
      let added = 0;
      let skipped = 0;
      for (const row of rows) {
        let payload: any;
        let table = "";
        if (kind === "assets") {
          if (!row["اسم الأصل"]?.trim()) {
            skipped += 1;
            continue;
          }
          if (
            row["رقم الأصل"] &&
            data.assets.some((item: any) => item.asset_id === row["رقم الأصل"])
          ) {
            skipped += 1;
            continue;
          }
          table = "assets";
          payload = {
            asset_id: row["رقم الأصل"] || undefined,
            name: row["اسم الأصل"],
            asset_type: row["النوع"] || "Other",
            manufacturer: row["الشركة"] || null,
            model: row["الموديل"] || null,
            serial_number: row["الرقم التسلسلي"] || null,
            status:
              (
                {
                  نشط: "active",
                  "غير نشط": "inactive",
                  "تحت الصيانة": "maintenance",
                  متقاعد: "retired",
                } as Record<string, string>
              )[row["الحالة"]] ||
              row["الحالة"] ||
              "active",
            department_id: resolveDepartment(row["القسم"]),
            assigned_employee_id:
              data.employees.find(
                (item: any) => item.full_name === row["الموظف"],
              )?.id || null,
            purchase_date: row["تاريخ الشراء"] || null,
            warranty_expiry: row["انتهاء الضمان"] || null,
            notes: row["ملاحظات"] || null,
          };
        } else if (kind === "employees") {
          if (!row["الاسم الكامل"]?.trim()) {
            skipped += 1;
            continue;
          }
          if (
            row["رقم الموظف"] &&
            data.employees.some(
              (item: any) => item.employee_number === row["رقم الموظف"],
            )
          ) {
            skipped += 1;
            continue;
          }
          table = "employees";
          payload = {
            employee_number: row["رقم الموظف"] || null,
            full_name: row["الاسم الكامل"],
            email: row["البريد الإلكتروني"] || null,
            phone: row["الهاتف"] || null,
            department_id: resolveDepartment(row["القسم"]),
            status:
              (
                { نشط: "active", "غير نشط": "inactive" } as Record<
                  string,
                  string
                >
              )[row["الحالة"]] ||
              row["الحالة"] ||
              "active",
            notes: row["ملاحظات"] || null,
          };
        } else {
          if (
            !row["اسم العنصر"]?.trim() ||
            data.inventory.some((item: any) => item.name === row["اسم العنصر"])
          ) {
            skipped += 1;
            continue;
          }
          table = "inventory_items";
          payload = {
            name: row["اسم العنصر"],
            category:
              (
                {
                  مستهلكات: "Consumable",
                  أحبار: "Toner",
                  "قطع وأدوات": "Spare Part",
                } as Record<string, string>
              )[row["النوع"]] ||
              row["النوع"] ||
              "Consumable",
            quantity: Math.max(0, Number(row["الكمية"]) || 0),
            minimum_quantity: 1,
            location: row["المكان"] || null,
            notes: row["ملاحظات"] || null,
          };
        }
        const result = await supabase.from(table).insert(payload);
        if (result.error) skipped += 1;
        else {
          added += 1;
          if (kind === "inventory" && Number(payload.quantity) > 0) {
            const created = Array.isArray(result.data)
              ? result.data[0]
              : result.data;
            if (created)
              await supabase.from("inventory_movements").insert({
                item_id: created.id,
                movement_type: "add",
                quantity: payload.quantity,
                note: "كمية مستوردة",
              });
          }
        }
      }
      await queryClient.invalidateQueries();
      toast.success(
        `تمت إضافة ${added} سجل${skipped ? `، وتم تجاوز ${skipped}` : ""}`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تعذر قراءة الملف");
    } finally {
      setWorking(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  return (
    <div className="surface-panel max-w-3xl space-y-5 p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileSpreadsheet className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold">استيراد وتصدير Excel</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            نستخدم ملفات CSV التي تفتح مباشرة في Excel، بدون حقول مالية أو
            موردين.
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {(Object.keys(TRANSFER_LABELS) as TransferKind[]).map((value) => (
          <Button
            key={value}
            variant={kind === value ? "default" : "outline"}
            onClick={() => setKind(value)}
          >
            {TRANSFER_LABELS[value]}
          </Button>
        ))}
      </div>
      <div className="rounded-lg border bg-muted/20 p-4">
        <p className="mb-3 text-sm font-medium">
          النوع المحدد: {TRANSFER_LABELS[kind]}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={exportRows}>
            <Download className="ml-2 size-4" />
            تصدير البيانات
          </Button>
          <Button variant="outline" onClick={template}>
            <FileSpreadsheet className="ml-2 size-4" />
            تنزيل نموذج فارغ
          </Button>
          <Button
            variant="outline"
            disabled={working}
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="ml-2 size-4" />
            استيراد ملف
          </Button>
          <Input
            ref={fileRef}
            className="hidden"
            type="file"
            accept=".csv,text/csv"
            onChange={(event) => importFile(event.target.files?.[0])}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        عند الاستيراد، يتجاوز النظام السجلات المكررة أو الصفوف الناقصة ويعرض لك
        ملخصًا واضحًا.
      </p>
    </div>
  );
}

function ActivityLog() {
  const { data: entries = [] } = useQuery({
    queryKey: ["activity-log"],
    queryFn: async () =>
      (
        await supabase
          .from("activity_log")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100)
      ).data ?? [],
  });
  const entities: Record<string, string> = {
    assets: "أصل",
    employees: "موظف",
    departments: "قسم",
    branches: "فرع",
    technicians: "فني",
    inventory_items: "عنصر مخزون",
    inventory_movements: "حركة مخزون",
    asset_maintenance: "صيانة",
    licenses: "ترخيص",
    license_assignments: "تعيين ترخيص",
    app_settings: "إعدادات",
  };
  const actions: Record<string, string> = {
    create: "إضافة",
    update: "تعديل",
    delete: "حذف",
  };
  return (
    <div className="surface-panel max-w-4xl overflow-hidden">
      <div className="flex items-center gap-3 border-b p-5">
        <History className="size-5 text-primary" />
        <div>
          <h2 className="font-semibold">سجل النشاط</h2>
          <p className="text-sm text-muted-foreground">
            آخر 100 عملية تمت داخل النظام
          </p>
        </div>
      </div>
      <div className="max-h-[65vh] divide-y overflow-y-auto">
        {entries.map((entry: any) => (
          <div
            key={entry.id}
            className="flex flex-wrap items-center justify-between gap-3 p-4"
          >
            <div>
              <p className="font-medium">
                {actions[entry.action] || entry.action}{" "}
                {entities[entry.entity_type] || entry.entity_type}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {entry.entity_id || "—"}
              </p>
            </div>
            <time className="text-xs text-muted-foreground">
              {new Date(entry.created_at).toLocaleString("ar-SA")}
            </time>
          </div>
        ))}
        {!entries.length && (
          <p className="p-8 text-center text-sm text-muted-foreground">
            لا توجد عمليات مسجلة بعد.
          </p>
        )}
      </div>
    </div>
  );
}

function AlertSettings() {
  const qc = useQueryClient();
  const { data: settings } = useQuery({
    queryKey: ["app_settings"],
    queryFn: async () =>
      (
        await supabase
          .from("app_settings")
          .select("*")
          .eq("id", "default")
          .maybeSingle()
      ).data,
  });

  const [draft, setDraft] = useState<{
    low_stock_threshold: number;
    warranty_alert_days: number;
    dashboard_alerts_enabled: boolean;
  } | null>(null);

  const current =
    draft ??
    (settings
      ? {
          low_stock_threshold: settings.low_stock_threshold,
          warranty_alert_days: settings.warranty_alert_days,
          dashboard_alerts_enabled: settings.dashboard_alerts_enabled,
        }
      : {
          low_stock_threshold: 2,
          warranty_alert_days: 30,
          dashboard_alerts_enabled: true,
        });

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("app_settings")
        .upsert({ id: "default", ...current });
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
        <Label>نبّهني عندما تصل كمية أي عنصر إلى</Label>
        <Input
          type="number"
          min={0}
          value={current.low_stock_threshold}
          onChange={(e) =>
            setDraft({
              ...current,
              low_stock_threshold: Number(e.target.value),
            })
          }
        />
      </div>
      <div className="space-y-2">
        <Label>التنبيه قبل انتهاء الضمان (أيام)</Label>
        <Input
          type="number"
          min={0}
          value={current.warranty_alert_days}
          onChange={(e) =>
            setDraft({
              ...current,
              warranty_alert_days: Number(e.target.value),
            })
          }
        />
      </div>
      <div className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <p className="font-medium">تنبيهات لوحة التحكم</p>
          <p className="text-xs text-muted-foreground">
            إظهار تنبيهات النقص والضمان داخل النظام
          </p>
        </div>
        <Switch
          checked={current.dashboard_alerts_enabled}
          onCheckedChange={(v) =>
            setDraft({ ...current, dashboard_alerts_enabled: v })
          }
        />
      </div>
      <Button onClick={() => save.mutate()} disabled={save.isPending}>
        حفظ الإعدادات
      </Button>
    </div>
  );
}

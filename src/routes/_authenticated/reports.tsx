import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileBarChart,
  KeyRound,
  Monitor,
  Printer,
  RefreshCw,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ManagementHeader, MetricCard } from "@/components/ManagementVisuals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { downloadCsv } from "@/lib/csv";
import { daysUntil, formatDate, today } from "@/lib/pms";
import { uiText } from "@/lib/ui-localization";

export const Route = createFileRoute("/_authenticated/reports")({
  component: ReportsPage,
});

type Kind = "assets" | "assignments" | "maintenance" | "inventory" | "licenses";
type Direction = "asc" | "desc";
type Tone = "blue" | "emerald" | "amber" | "rose";
type FilterKey =
  | "status"
  | "type"
  | "department"
  | "assignment"
  | "technician"
  | "location"
  | "capacity";

type LocalizedText = { ar: string; en: string };
type ReportMeta = {
  label: LocalizedText;
  description: LocalizedText;
  icon: LucideIcon;
  columns: LocalizedText[];
  statusColumn: number;
  defaultSort: { index: number; direction: Direction };
};
type Filters = Record<FilterKey, string>;
type ReportRow = {
  id: string;
  values: Array<string | number>;
  sortValues: Array<string | number>;
  searchText: string;
  filters: Partial<Filters>;
  date?: string;
  meta: Record<string, string | number | boolean | null | undefined>;
};
type FilterOption = { value: string; label: string };
type RecordId = string | number;
type AssetRecord = {
  id?: RecordId;
  asset_id?: string;
  name?: string;
  asset_type?: string;
  manufacturer?: string;
  model?: string;
  serial_number?: string;
  status?: string;
  location?: string;
  department_id?: RecordId;
  assigned_employee_id?: RecordId;
  warranty_expiry?: string;
  archived_at?: string;
  notes?: string;
};
type EmployeeRecord = {
  id?: RecordId;
  full_name?: string;
  employee_number?: string;
  department_id?: RecordId;
};
type DepartmentRecord = { id?: RecordId; name?: string };
type AssignmentRecord = {
  id?: RecordId;
  asset_id?: RecordId;
  employee_id?: RecordId;
  employee_name?: string;
  employee_number?: string;
  employee_email?: string;
  employee_phone?: string;
  department_name?: string;
  assignment_date?: string;
  return_date?: string;
  return_condition?: string;
  notes?: string;
  return_notes?: string;
  asset_snapshot?: unknown;
};
type MaintenanceRecord = {
  id?: RecordId;
  reference_number?: string;
  asset_id?: RecordId;
  maintenance_date?: string;
  maintenance_type?: string;
  status?: string;
  technician?: string;
  cost?: string | number;
  problem_description?: string;
  resolution?: string;
  notes?: string;
};
type InventoryRecord = {
  id?: RecordId;
  name?: string;
  category?: string;
  color?: string;
  quantity?: string | number;
  minimum_quantity?: string | number;
  location?: string;
  notes?: string;
};
type LicenseRecord = {
  id?: RecordId;
  license_name?: string;
  product_name?: string;
  license_type?: string;
  contract_number?: string;
  seat_count?: string | number;
  expiration_date?: string;
  notes?: string;
};
type LicenseAssignmentRecord = { license_id?: RecordId };
type ReportsData = {
  assets: AssetRecord[];
  assetAssignments: AssignmentRecord[];
  maintenance: MaintenanceRecord[];
  inventory: InventoryRecord[];
  licenses: LicenseRecord[];
  licenseAssignments: LicenseAssignmentRecord[];
  employees: EmployeeRecord[];
  departments: DepartmentRecord[];
};

const localized = (ar: string, en: string): LocalizedText => ({ ar, en });
const tr = (value: LocalizedText) => uiText(value.ar, value.en);
const text = (ar: string, en: string) => uiText(ar, en);
const EMPTY = "—";

const REPORTS: Record<Kind, ReportMeta> = {
  assets: {
    label: localized("الأصول", "Assets"),
    description: localized(
      "حالة الأصول والتعيين والأقسام والضمانات",
      "Asset status, assignments, departments, and warranties",
    ),
    icon: Monitor,
    columns: [
      localized("رقم الأصل", "Asset ID"),
      localized("اسم الأصل", "Asset name"),
      localized("النوع", "Type"),
      localized("الحالة", "Status"),
      localized("القسم", "Department"),
      localized("الموظف", "Employee"),
      localized("الموقع", "Location"),
      localized("انتهاء الضمان", "Warranty expiry"),
    ],
    statusColumn: 3,
    defaultSort: { index: 1, direction: "asc" },
  },
  assignments: {
    label: localized("العهد والتسليمات", "Custody & handovers"),
    description: localized(
      "العهد الحالية والمرتجعة وسجل التسليم للموظفين",
      "Current and returned custody records and employee handovers",
    ),
    icon: ClipboardCheck,
    columns: [
      localized("رقم الأصل", "Asset ID"),
      localized("اسم الأصل", "Asset name"),
      localized("الموظف", "Employee"),
      localized("رقم الموظف", "Employee number"),
      localized("القسم", "Department"),
      localized("تاريخ التسليم", "Handover date"),
      localized("حالة العهدة", "Custody status"),
      localized("تاريخ الإرجاع", "Return date"),
      localized("حالة الإرجاع", "Return condition"),
    ],
    statusColumn: 6,
    defaultSort: { index: 5, direction: "desc" },
  },
  maintenance: {
    label: localized("الصيانة", "Maintenance"),
    description: localized(
      "أعمال الصيانة المفتوحة والمغلقة والتكاليف والفنيون",
      "Open and closed maintenance, costs, and technicians",
    ),
    icon: Wrench,
    columns: [
      localized("المرجع", "Reference"),
      localized("الأصل", "Asset"),
      localized("التاريخ", "Date"),
      localized("النوع", "Type"),
      localized("الحالة", "Status"),
      localized("الفني", "Technician"),
      localized("التكلفة", "Cost"),
      localized("المشكلة", "Problem"),
      localized("الحل", "Resolution"),
    ],
    statusColumn: 4,
    defaultSort: { index: 2, direction: "desc" },
  },
  inventory: {
    label: localized("المخزون", "Inventory"),
    description: localized(
      "الكميات والحد الأدنى وحالات النقص والنفاد",
      "Quantities, minimum levels, low stock, and out-of-stock items",
    ),
    icon: Boxes,
    columns: [
      localized("العنصر", "Item"),
      localized("الفئة", "Category"),
      localized("اللون", "Color"),
      localized("الكمية", "Quantity"),
      localized("الحد الأدنى", "Minimum"),
      localized("حالة المخزون", "Stock status"),
      localized("الموقع", "Location"),
    ],
    statusColumn: 5,
    defaultSort: { index: 0, direction: "asc" },
  },
  licenses: {
    label: localized("التراخيص", "Licenses"),
    description: localized(
      "استخدام المقاعد والسعة المتاحة وتواريخ الانتهاء",
      "Seat usage, available capacity, and expiration dates",
    ),
    icon: KeyRound,
    columns: [
      localized("الترخيص", "License"),
      localized("المنتج", "Product"),
      localized("النوع", "Type"),
      localized("المقاعد", "Seats"),
      localized("المستخدم", "Used"),
      localized("المتاح", "Available"),
      localized("نسبة الاستخدام", "Utilization"),
      localized("تاريخ الانتهاء", "Expiration date"),
      localized("حالة الانتهاء", "Expiration status"),
    ],
    statusColumn: 8,
    defaultSort: { index: 7, direction: "asc" },
  },
};

const INITIAL_FILTERS: Filters = {
  status: "all",
  type: "all",
  department: "all",
  assignment: "all",
  technician: "all",
  location: "all",
  capacity: "all",
};

function stringId(value: unknown) {
  return String(value ?? "");
}

function shown(value: unknown): string {
  return value === null || value === undefined || value === ""
    ? EMPTY
    : String(value);
}

function parseObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object")
    return value as Record<string, unknown>;
  if (typeof value !== "string" || !value.trim()) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function assetTypeLabel(value: unknown) {
  const labels: Record<string, LocalizedText> = {
    Printer: localized("طابعة", "Printer"),
    "Desktop PC": localized("كمبيوتر مكتبي", "Desktop PC"),
    Laptop: localized("لابتوب", "Laptop"),
    Monitor: localized("شاشة", "Monitor"),
    "Mobile Phone": localized("هاتف محمول", "Mobile phone"),
    "Network Device": localized("جهاز شبكة", "Network device"),
    Other: localized("أخرى", "Other"),
  };
  return labels[String(value)] ? tr(labels[String(value)]) : shown(value);
}

function assetStatusLabel(value: unknown) {
  const labels: Record<string, LocalizedText> = {
    active: localized("نشط", "Active"),
    inactive: localized("غير نشط", "Inactive"),
    maintenance: localized("تحت الصيانة", "Under maintenance"),
    out_of_service: localized("خارج الخدمة", "Out of service"),
    retired: localized("متقاعد", "Retired"),
    archived: localized("مؤرشف", "Archived"),
  };
  return labels[String(value)] ? tr(labels[String(value)]) : shown(value);
}

function maintenanceTypeLabel(value: unknown) {
  const labels: Record<string, LocalizedText> = {
    Preventive: localized("وقائية", "Preventive"),
    Corrective: localized("تصحيحية", "Corrective"),
    "Toner Replacement": localized("تغيير حبر", "Toner replacement"),
    "Part Installation": localized("تركيب قطعة", "Part installation"),
    "Part Replacement": localized("استبدال قطعة", "Part replacement"),
  };
  return labels[String(value)] ? tr(labels[String(value)]) : shown(value);
}

function inventoryCategoryLabel(value: unknown) {
  const labels: Record<string, LocalizedText> = {
    Consumable: localized("مستهلكات", "Consumables"),
    Toner: localized("أحبار", "Toner"),
    "Spare Part": localized("قطع وأدوات", "Spare parts"),
  };
  return labels[String(value)] ? tr(labels[String(value)]) : shown(value);
}

function returnConditionLabel(value: unknown) {
  const labels: Record<string, LocalizedText> = {
    good: localized("سليم", "Good"),
    maintenance: localized("يحتاج صيانة", "Needs maintenance"),
    damaged: localized("متضرر", "Damaged"),
  };
  return labels[String(value)] ? tr(labels[String(value)]) : shown(value);
}

function statusLabel(kind: Kind, value: string) {
  if (kind === "assets") return assetStatusLabel(value);
  if (kind === "assignments")
    return value === "current"
      ? text("عهدة حالية", "Current custody")
      : text("تم الإرجاع", "Returned");
  if (kind === "maintenance")
    return value === "Open" ? text("مفتوحة", "Open") : text("مغلقة", "Closed");
  if (kind === "inventory") {
    if (value === "out") return text("نافد", "Out of stock");
    if (value === "low") return text("منخفض", "Low stock");
    return text("متوفر", "Available");
  }
  if (value === "expired") return text("منتهي", "Expired");
  if (value === "expiring") return text("ينتهي قريبًا", "Expiring soon");
  if (value === "no_expiry") return text("بدون تاريخ", "No expiration date");
  return text("ساري", "Active");
}

function statusTone(kind: Kind, value: string) {
  const positive = ["active", "current", "Closed", "available"];
  const warning = ["maintenance", "Open", "low", "expiring"];
  const danger = ["out_of_service", "out", "expired", "damaged"];
  if (positive.includes(value)) return "bg-emerald-500/10 text-emerald-700";
  if (warning.includes(value)) return "bg-amber-500/10 text-amber-700";
  if (danger.includes(value)) return "bg-rose-500/10 text-rose-700";
  if (kind === "licenses" && value === "active")
    return "bg-emerald-500/10 text-emerald-700";
  return "bg-primary/10 text-primary";
}

function stockState(quantity: unknown, minimum: unknown) {
  const available = Number(quantity ?? 0);
  const threshold = Number(minimum ?? 0);
  if (available <= 0) return "out";
  if (available <= threshold) return "low";
  return "available";
}

function expiryState(value: unknown) {
  if (!value) return "no_expiry";
  const remaining = daysUntil(String(value));
  if (remaining === null) return "no_expiry";
  if (remaining < 0) return "expired";
  if (remaining <= 30) return "expiring";
  return "active";
}

function reportCount(kind: Kind, data: ReportsData | undefined) {
  if (!data) return 0;
  if (kind === "assignments") return data.assetAssignments.length;
  return data[kind].length;
}

function dynamicOptions(
  rows: ReportRow[],
  key: FilterKey,
  label: (value: string) => string = (value) => value,
) {
  return Array.from(
    new Set(rows.map((row) => row.filters[key]).filter(Boolean) as string[]),
  )
    .sort((left, right) =>
      label(left).localeCompare(label(right), undefined, { numeric: true }),
    )
    .map((value) => ({ value, label: label(value) }));
}

function statusOptions(kind: Kind): FilterOption[] {
  const values =
    kind === "assets"
      ? [
          "active",
          "inactive",
          "maintenance",
          "out_of_service",
          "retired",
          "archived",
        ]
      : kind === "assignments"
        ? ["current", "returned"]
        : kind === "maintenance"
          ? ["Open", "Closed"]
          : kind === "inventory"
            ? ["available", "low", "out"]
            : ["active", "expiring", "expired", "no_expiry"];
  return values.map((value) => ({ value, label: statusLabel(kind, value) }));
}

function relevantFilterKeys(kind: Kind): FilterKey[] {
  if (kind === "assets") return ["status", "type", "department", "assignment"];
  if (kind === "assignments") return ["status", "type", "department"];
  if (kind === "maintenance") return ["status", "type", "technician"];
  if (kind === "inventory") return ["status", "type", "location"];
  return ["status", "type", "capacity"];
}

function filterTitle(kind: Kind, key: FilterKey) {
  if (key === "status") {
    if (kind === "assignments") return text("حالة العهدة", "Custody status");
    if (kind === "inventory") return text("حالة المخزون", "Stock status");
    if (kind === "licenses") return text("حالة الانتهاء", "Expiration status");
    return text("الحالة", "Status");
  }
  if (key === "type") return text("النوع", "Type");
  if (key === "department") return text("القسم", "Department");
  if (key === "assignment") return text("التعيين", "Assignment");
  if (key === "technician") return text("الفني", "Technician");
  if (key === "location") return text("الموقع", "Location");
  return text("توفر المقاعد", "Seat availability");
}

function dateTitle(kind: Kind) {
  if (kind === "assets") return text("انتهاء الضمان", "Warranty expiry");
  if (kind === "assignments") return text("تاريخ التسليم", "Handover date");
  if (kind === "maintenance") return text("تاريخ الصيانة", "Maintenance date");
  return text("تاريخ الانتهاء", "Expiration date");
}

function dateMatches(value: string | undefined, from: string, to: string) {
  if (!from && !to) return true;
  if (!value) return false;
  const normalized = value.slice(0, 10);
  return (!from || normalized >= from) && (!to || normalized <= to);
}

function buildMetrics(kind: Kind, rows: ReportRow[]) {
  if (kind === "assets") {
    return [
      {
        icon: Monitor,
        label: text("الأصول المطابقة", "Matching assets"),
        value: rows.length,
        tone: "blue" as Tone,
      },
      {
        icon: Users,
        label: text("الأصول المعيّنة", "Assigned assets"),
        value: rows.filter((row) => row.filters.assignment === "assigned")
          .length,
        tone: "emerald" as Tone,
      },
      {
        icon: Wrench,
        label: text("تحت الصيانة", "Under maintenance"),
        value: rows.filter((row) => row.filters.status === "maintenance")
          .length,
        tone: "amber" as Tone,
      },
      {
        icon: AlertTriangle,
        label: text("ضمان ينتهي خلال 30 يومًا", "Warranty expiring in 30 days"),
        value: rows.filter((row) => {
          const days = daysUntil(row.date);
          return days !== null && days >= 0 && days <= 30;
        }).length,
        tone: "rose" as Tone,
      },
    ];
  }
  if (kind === "assignments") {
    return [
      {
        icon: ClipboardCheck,
        label: text("سجلات التسليم", "Handover records"),
        value: rows.length,
        tone: "blue" as Tone,
      },
      {
        icon: CheckCircle2,
        label: text("عهد حالية", "Current custody"),
        value: rows.filter((row) => row.filters.status === "current").length,
        tone: "emerald" as Tone,
      },
      {
        icon: RotateCcw,
        label: text("عهد مرتجعة", "Returned custody"),
        value: rows.filter((row) => row.filters.status === "returned").length,
        tone: "amber" as Tone,
      },
      {
        icon: Users,
        label: text("موظفون مشمولون", "Employees included"),
        value: new Set(
          rows
            .map((row) =>
              String(row.meta.employeeId || row.meta.employeeName || ""),
            )
            .filter(Boolean),
        ).size,
        tone: "blue" as Tone,
      },
    ];
  }
  if (kind === "maintenance") {
    const cost = rows.reduce(
      (total, row) => total + Number(row.meta.cost || 0),
      0,
    );
    return [
      {
        icon: Wrench,
        label: text("سجلات الصيانة", "Maintenance records"),
        value: rows.length,
        tone: "blue" as Tone,
      },
      {
        icon: AlertTriangle,
        label: text("أعمال مفتوحة", "Open work"),
        value: rows.filter((row) => row.filters.status === "Open").length,
        tone: "amber" as Tone,
      },
      {
        icon: CheckCircle2,
        label: text("أعمال مغلقة", "Closed work"),
        value: rows.filter((row) => row.filters.status === "Closed").length,
        tone: "emerald" as Tone,
      },
      {
        icon: FileBarChart,
        label: text("إجمالي التكلفة", "Total cost"),
        value: cost.toLocaleString(text("ar-SA", "en-US"), {
          maximumFractionDigits: 2,
        }),
        tone: "blue" as Tone,
      },
    ];
  }
  if (kind === "inventory") {
    const quantity = rows.reduce(
      (total, row) => total + Number(row.meta.quantity || 0),
      0,
    );
    return [
      {
        icon: Boxes,
        label: text("عناصر المخزون", "Inventory items"),
        value: rows.length,
        tone: "blue" as Tone,
      },
      {
        icon: CheckCircle2,
        label: text("إجمالي الكمية", "Total quantity"),
        value: quantity.toLocaleString(text("ar-SA", "en-US"), {
          maximumFractionDigits: 2,
        }),
        tone: "emerald" as Tone,
      },
      {
        icon: AlertTriangle,
        label: text("مخزون منخفض", "Low stock"),
        value: rows.filter((row) => row.filters.status === "low").length,
        tone: "amber" as Tone,
      },
      {
        icon: XCircle,
        label: text("عناصر نافدة", "Out-of-stock items"),
        value: rows.filter((row) => row.filters.status === "out").length,
        tone: "rose" as Tone,
      },
    ];
  }
  const seats = rows.reduce(
    (total, row) => total + Number(row.meta.seats || 0),
    0,
  );
  const used = rows.reduce(
    (total, row) => total + Number(row.meta.used || 0),
    0,
  );
  return [
    {
      icon: KeyRound,
      label: text("التراخيص المطابقة", "Matching licenses"),
      value: rows.length,
      tone: "blue" as Tone,
    },
    {
      icon: Users,
      label: text("إجمالي المقاعد", "Total seats"),
      value: seats,
      tone: "blue" as Tone,
    },
    {
      icon: CheckCircle2,
      label: text("المقاعد المستخدمة", "Used seats"),
      value: used,
      tone: "emerald" as Tone,
    },
    {
      icon: AlertTriangle,
      label: text("منتهية أو قريبة", "Expired or expiring"),
      value: rows.filter((row) =>
        ["expired", "expiring"].includes(String(row.filters.status)),
      ).length,
      tone: "amber" as Tone,
    },
  ];
}

function ReportsPage() {
  const [kind, setKind] = useState<Kind>("assets");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>({ ...INITIAL_FILTERS });
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState(REPORTS.assets.defaultSort);

  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["itam-reports", "v2"],
    queryFn: async () => {
      const results = await Promise.all([
        supabase.from("assets").select("*").order("name"),
        supabase
          .from("assignment_history")
          .select("*")
          .order("assignment_date", { ascending: false }),
        supabase
          .from("asset_maintenance")
          .select("*")
          .order("maintenance_date", { ascending: false }),
        supabase.from("inventory_items").select("*").order("name"),
        supabase.from("licenses").select("*").order("license_name"),
        supabase.from("license_assignments").select("*"),
        supabase.from("employees").select("*"),
        supabase.from("departments").select("*"),
      ]);
      const failed = results.find((result) => result.error)?.error;
      if (failed) throw new Error(failed.message);
      const [
        assets,
        assetAssignments,
        maintenance,
        inventory,
        licenses,
        licenseAssignments,
        employees,
        departments,
      ] = results;
      return {
        assets: (assets.data ?? []) as AssetRecord[],
        assetAssignments: (assetAssignments.data ?? []) as AssignmentRecord[],
        maintenance: (maintenance.data ?? []) as MaintenanceRecord[],
        inventory: (inventory.data ?? []) as InventoryRecord[],
        licenses: (licenses.data ?? []) as LicenseRecord[],
        licenseAssignments: (licenseAssignments.data ??
          []) as LicenseAssignmentRecord[],
        employees: (employees.data ?? []) as EmployeeRecord[],
        departments: (departments.data ?? []) as DepartmentRecord[],
      } satisfies ReportsData;
    },
  });

  const reportRows = useMemo<ReportRow[]>(() => {
    if (!data) return [] as ReportRow[];
    const assetMap = new Map(
      data.assets.map((item) => [stringId(item.id), item]),
    );
    const employeeMap = new Map(
      data.employees.map((item) => [stringId(item.id), item]),
    );
    const departmentMap = new Map(
      data.departments.map((item) => [stringId(item.id), item]),
    );
    const noDepartment = "__none__";
    const noValue = "__none__";

    if (kind === "assets") {
      return data.assets.map((asset): ReportRow => {
        const department = departmentMap.get(stringId(asset.department_id));
        const employee = employeeMap.get(stringId(asset.assigned_employee_id));
        const status = asset.archived_at
          ? "archived"
          : String(asset.status || "active");
        const type = String(asset.asset_type || "Other");
        const departmentName = String(department?.name || "");
        const employeeName = String(employee?.full_name || "");
        const values = [
          shown(asset.asset_id),
          shown(asset.name),
          assetTypeLabel(type),
          assetStatusLabel(status),
          departmentName || EMPTY,
          employeeName || EMPTY,
          shown(asset.location),
          formatDate(asset.warranty_expiry),
        ];
        return {
          id: stringId(asset.id),
          values,
          sortValues: [
            asset.asset_id || "",
            asset.name || "",
            type,
            status,
            departmentName,
            employeeName,
            asset.location || "",
            asset.warranty_expiry || "",
          ],
          searchText: [
            ...values,
            asset.manufacturer,
            asset.model,
            asset.serial_number,
            asset.notes,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase(),
          filters: {
            status,
            type,
            department: departmentName || noDepartment,
            assignment: employeeName ? "assigned" : "unassigned",
          },
          date: asset.warranty_expiry || undefined,
          meta: { employeeId: asset.assigned_employee_id },
        };
      });
    }

    if (kind === "assignments") {
      return data.assetAssignments.map((record): ReportRow => {
        const snapshot = parseObject(record.asset_snapshot);
        const asset = assetMap.get(stringId(record.asset_id));
        const employee = employeeMap.get(stringId(record.employee_id));
        const department = departmentMap.get(stringId(employee?.department_id));
        const employeeName = String(
          record.employee_name || employee?.full_name || "",
        );
        const departmentName = String(
          record.department_name || department?.name || "",
        );
        const snapshotAssetId = String(
          snapshot.asset_id || asset?.asset_id || "",
        );
        const snapshotAssetName = String(snapshot.name || asset?.name || "");
        const type = String(
          snapshot.asset_type || asset?.asset_type || "Other",
        );
        const status = record.return_date ? "returned" : "current";
        const values = [
          shown(snapshotAssetId),
          shown(snapshotAssetName),
          employeeName || EMPTY,
          shown(record.employee_number || employee?.employee_number),
          departmentName || EMPTY,
          formatDate(record.assignment_date),
          statusLabel("assignments", status),
          formatDate(record.return_date),
          returnConditionLabel(record.return_condition),
        ];
        return {
          id: stringId(record.id),
          values,
          sortValues: [
            snapshotAssetId,
            snapshotAssetName,
            employeeName,
            record.employee_number || "",
            departmentName,
            record.assignment_date || "",
            status,
            record.return_date || "",
            record.return_condition || "",
          ],
          searchText: [
            ...values,
            record.employee_email,
            record.employee_phone,
            record.notes,
            record.return_notes,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase(),
          filters: { status, type, department: departmentName || noDepartment },
          date: record.assignment_date || undefined,
          meta: { employeeId: record.employee_id, employeeName },
        };
      });
    }

    if (kind === "maintenance") {
      return data.maintenance.map((record): ReportRow => {
        const asset = assetMap.get(stringId(record.asset_id));
        const type = String(record.maintenance_type || "Corrective");
        const status = String(record.status || "Closed");
        const technician = String(record.technician || "");
        const cost = Number(record.cost || 0);
        const assetLabel =
          [asset?.asset_id, asset?.name].filter(Boolean).join(" - ") || EMPTY;
        const values = [
          shown(record.reference_number),
          assetLabel,
          formatDate(record.maintenance_date),
          maintenanceTypeLabel(type),
          statusLabel("maintenance", status),
          technician || EMPTY,
          cost.toLocaleString(text("ar-SA", "en-US"), {
            maximumFractionDigits: 2,
          }),
          shown(record.problem_description),
          shown(record.resolution),
        ];
        return {
          id: stringId(record.id),
          values,
          sortValues: [
            record.reference_number || "",
            assetLabel,
            record.maintenance_date || "",
            type,
            status,
            technician,
            cost,
            record.problem_description || "",
            record.resolution || "",
          ],
          searchText: [...values, record.notes, asset?.serial_number]
            .filter(Boolean)
            .join(" ")
            .toLowerCase(),
          filters: { status, type, technician: technician || noValue },
          date: record.maintenance_date || undefined,
          meta: { cost },
        };
      });
    }

    if (kind === "inventory") {
      return data.inventory.map((item): ReportRow => {
        const type = String(item.category || "Consumable");
        const status = stockState(item.quantity, item.minimum_quantity);
        const location = String(item.location || "");
        const quantity = Number(item.quantity || 0);
        const minimum = Number(item.minimum_quantity || 0);
        const values = [
          shown(item.name),
          inventoryCategoryLabel(type),
          shown(item.color),
          quantity,
          minimum,
          statusLabel("inventory", status),
          location || EMPTY,
        ];
        return {
          id: stringId(item.id),
          values,
          sortValues: [
            item.name || "",
            type,
            item.color || "",
            quantity,
            minimum,
            status,
            location,
          ],
          searchText: [...values, item.notes]
            .filter(Boolean)
            .join(" ")
            .toLowerCase(),
          filters: { status, type, location: location || noValue },
          meta: { quantity, minimum },
        };
      });
    }

    return data.licenses.map((license): ReportRow => {
      const type = String(license.license_type || "");
      const seats = Number(license.seat_count || 0);
      const used = data.licenseAssignments.filter(
        (item) => stringId(item.license_id) === stringId(license.id),
      ).length;
      const available = Math.max(0, seats - used);
      const status = expiryState(license.expiration_date);
      const capacity = available > 0 ? "available" : "full";
      const utilization =
        seats > 0 ? `${Math.round((used / seats) * 100)}%` : "0%";
      const values = [
        shown(license.license_name),
        shown(license.product_name),
        shown(type),
        seats,
        used,
        available,
        utilization,
        formatDate(license.expiration_date),
        statusLabel("licenses", status),
      ];
      return {
        id: stringId(license.id),
        values,
        sortValues: [
          license.license_name || "",
          license.product_name || "",
          type,
          seats,
          used,
          available,
          seats ? used / seats : 0,
          license.expiration_date || "",
          status,
        ],
        searchText: [...values, license.contract_number, license.notes]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
        filters: { status, type: type || noValue, capacity },
        date: license.expiration_date || undefined,
        meta: { seats, used, available },
      };
    });
  }, [data, kind]);

  const options = useMemo(() => {
    const all = { value: "all", label: text("الكل", "All") };
    const typeLabel = (value: string) => {
      if (kind === "assets" || kind === "assignments")
        return String(assetTypeLabel(value));
      if (kind === "maintenance") return String(maintenanceTypeLabel(value));
      if (kind === "inventory") return String(inventoryCategoryLabel(value));
      return value === "__none__" ? text("غير محدد", "Unspecified") : value;
    };
    const plainLabel = (value: string) =>
      value === "__none__" ? text("غير محدد", "Unspecified") : value;
    return {
      status: [all, ...statusOptions(kind)],
      type: [all, ...dynamicOptions(reportRows, "type", typeLabel)],
      department: [
        all,
        ...dynamicOptions(reportRows, "department", plainLabel),
      ],
      technician: [
        all,
        ...dynamicOptions(reportRows, "technician", plainLabel),
      ],
      location: [all, ...dynamicOptions(reportRows, "location", plainLabel)],
      assignment: [
        all,
        { value: "assigned", label: text("معيّن لموظف", "Assigned") },
        { value: "unassigned", label: text("غير معيّن", "Unassigned") },
      ],
      capacity: [
        all,
        { value: "available", label: text("توجد مقاعد", "Seats available") },
        { value: "full", label: text("ممتلئ", "Fully allocated") },
      ],
    };
  }, [kind, reportRows]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const keys = relevantFilterKeys(kind);
    return reportRows.filter((row) => {
      if (term && !row.searchText.includes(term)) return false;
      if (!dateMatches(row.date, dateFrom, dateTo)) return false;
      return keys.every(
        (key) => filters[key] === "all" || row.filters[key] === filters[key],
      );
    });
  }, [dateFrom, dateTo, filters, kind, reportRows, search]);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((leftRow, rightRow) => {
      const left = leftRow.sortValues[sort.index] ?? "";
      const right = rightRow.sortValues[sort.index] ?? "";
      let comparison = 0;
      if (typeof left === "number" && typeof right === "number")
        comparison = left - right;
      else
        comparison = String(left).localeCompare(String(right), undefined, {
          numeric: true,
          sensitivity: "base",
        });
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredRows, sort]);

  const metrics = useMemo(
    () => buildMetrics(kind, filteredRows),
    [filteredRows, kind],
  );
  const activeFilterCount =
    Number(Boolean(search.trim())) +
    Number(Boolean(dateFrom)) +
    Number(Boolean(dateTo)) +
    relevantFilterKeys(kind).filter((key) => filters[key] !== "all").length;

  const filterSummary = useMemo(() => {
    const labels: string[] = [];
    if (search.trim())
      labels.push(`${text("بحث", "Search")}: ${search.trim()}`);
    for (const key of relevantFilterKeys(kind)) {
      if (filters[key] === "all") continue;
      const option = options[key].find((item) => item.value === filters[key]);
      labels.push(
        `${filterTitle(kind, key)}: ${option?.label || filters[key]}`,
      );
    }
    if (dateFrom) labels.push(`${text("من", "From")}: ${formatDate(dateFrom)}`);
    if (dateTo) labels.push(`${text("إلى", "To")}: ${formatDate(dateTo)}`);
    return labels.length
      ? labels.join(" • ")
      : text("جميع السجلات", "All records");
  }, [dateFrom, dateTo, filters, kind, options, search]);

  const selectReport = (next: Kind) => {
    setKind(next);
    setSearch("");
    setFilters({ ...INITIAL_FILTERS });
    setDateFrom("");
    setDateTo("");
    setSort({ ...REPORTS[next].defaultSort });
  };

  const clearFilters = () => {
    setSearch("");
    setFilters({ ...INITIAL_FILTERS });
    setDateFrom("");
    setDateTo("");
  };

  const changeSort = (index: number) => {
    setSort((current) =>
      current.index === index
        ? { index, direction: current.direction === "asc" ? "desc" : "asc" }
        : { index, direction: "asc" },
    );
  };

  const exportReport = () => {
    downloadCsv(
      `itam-${kind}-${today()}.csv`,
      REPORTS[kind].columns.map(tr),
      sortedRows.map((row) => row.values),
    );
  };

  if (error) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <ManagementHeader
          icon={FileBarChart}
          title={text("التقارير", "Reports")}
          description={text(
            "تقارير تشغيلية قابلة للفلترة والتصدير من بيانات Odoo الحالية",
            "Filterable and exportable operational reports from current Odoo data",
          )}
        />
        <section className="surface-panel p-8 text-center">
          <AlertTriangle className="mx-auto size-9 text-rose-700" />
          <h2 className="mt-4 font-semibold">
            {text("تعذر تحميل بيانات التقارير", "Could not load report data")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : String(error)}
          </p>
          <Button className="mt-5" onClick={() => void refetch()}>
            <RefreshCw className="me-2 size-4" />
            {text("إعادة المحاولة", "Try again")}
          </Button>
        </section>
      </div>
    );
  }

  return (
    <div className="report-print-root mx-auto max-w-7xl space-y-6">
      <ManagementHeader
        icon={FileBarChart}
        title={text("التقارير", "Reports")}
        description={text(
          "تقارير تشغيلية قابلة للفلترة والتصدير من بيانات Odoo الحالية",
          "Filterable and exportable operational reports from current Odoo data",
        )}
        action={
          <div className="no-print flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => void refetch()}
              disabled={isFetching}
            >
              <RefreshCw
                className={`me-2 size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              {text("تحديث", "Refresh")}
            </Button>
            <Button
              variant="outline"
              onClick={exportReport}
              disabled={!sortedRows.length}
            >
              <Download className="me-2 size-4" />
              {text("تصدير CSV", "Export CSV")}
            </Button>
            <Button
              onClick={() => window.print()}
              disabled={!sortedRows.length}
            >
              <Printer className="me-2 size-4" />
              {text("طباعة أو حفظ PDF", "Print or save PDF")}
            </Button>
          </div>
        }
      />

      <section className="no-print grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {(Object.keys(REPORTS) as Kind[]).map((value) => {
          const report = REPORTS[value];
          const Icon = report.icon;
          const active = kind === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => selectReport(value)}
              className={`surface-panel flex items-center gap-3 border p-4 text-start transition-all ${
                active
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-transparent hover:border-primary/30 hover:bg-muted/30"
              }`}
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-semibold">
                  {tr(report.label)}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {reportCount(value, data).toLocaleString(
                    text("ar-SA", "en-US"),
                  )}{" "}
                  {text("سجل", "records")}
                </span>
              </span>
            </button>
          );
        })}
      </section>

      <section className="no-print surface-panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-primary" />
            <div>
              <h2 className="font-semibold">
                {text("فلاتر التقرير", "Report filters")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {activeFilterCount
                  ? `${activeFilterCount} ${text("فلاتر مطبقة", "active filters")}`
                  : text("لم يتم تطبيق فلاتر", "No filters applied")}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            disabled={!activeFilterCount}
          >
            <RotateCcw className="me-2 size-4" />
            {text("مسح الفلاتر", "Clear filters")}
          </Button>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-2 md:col-span-2">
            <span className="text-xs font-medium text-muted-foreground">
              {text("البحث داخل التقرير", "Search within report")}
            </span>
            <span className="relative block">
              <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="ps-9"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={text(
                  "ابحث بالاسم أو الرقم أو أي قيمة ظاهرة…",
                  "Search by name, number, or any visible value…",
                )}
              />
            </span>
          </label>

          {relevantFilterKeys(kind).map((key) => (
            <FilterSelect
              key={key}
              label={filterTitle(kind, key)}
              value={filters[key]}
              options={options[key]}
              onChange={(value) =>
                setFilters((current) => ({ ...current, [key]: value }))
              }
            />
          ))}

          {kind !== "inventory" && (
            <div className="space-y-2 md:col-span-2 xl:col-span-2">
              <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <FileBarChart className="size-3.5" />
                {dateTitle(kind)}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <span className="text-[11px] text-muted-foreground">
                    {text("من", "From")}
                  </span>
                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(event) => setDateFrom(event.target.value)}
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] text-muted-foreground">
                    {text("إلى", "To")}
                  </span>
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(event) => setDateTo(event.target.value)}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="report-summary-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="report-table-panel surface-panel overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {text("تقرير تشغيلي", "Operational report")}
            </p>
            <h2 className="mt-1 text-xl font-bold">
              {tr(REPORTS[kind].label)}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {tr(REPORTS[kind].description)}
            </p>
          </div>
          <div className="text-start text-xs text-muted-foreground sm:text-end">
            <p className="font-semibold text-foreground">
              {sortedRows.length.toLocaleString(text("ar-SA", "en-US"))}{" "}
              {text("من", "of")}{" "}
              {reportRows.length.toLocaleString(text("ar-SA", "en-US"))}{" "}
              {text("سجل", "records")}
            </p>
            <p className="mt-1">
              {text("تاريخ الإنشاء", "Generated")}:{" "}
              {new Intl.DateTimeFormat(text("ar-SA", "en-US"), {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date())}
            </p>
            <p className="mt-1 max-w-xl">{filterSummary}</p>
          </div>
        </div>
        <div className="report-table-container max-h-[65vh] overflow-auto print:max-h-none print:overflow-visible">
          <Table className="report-table min-w-max">
            <TableHeader className="sticky top-0 z-10">
              <TableRow>
                {REPORTS[kind].columns.map((column, index) => (
                  <TableHead
                    key={column.ar}
                    className="whitespace-nowrap bg-muted/95"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center gap-1.5 py-1 text-start"
                      onClick={() => changeSort(index)}
                    >
                      <span>{tr(column)}</span>
                      <span className="no-print">
                        {sort.index !== index ? (
                          <ArrowUpDown className="size-3.5 opacity-40" />
                        ) : sort.direction === "asc" ? (
                          <ArrowUp className="size-3.5 text-primary" />
                        ) : (
                          <ArrowDown className="size-3.5 text-primary" />
                        )}
                      </span>
                    </button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRows.map((row) => (
                <TableRow key={row.id}>
                  {row.values.map((value, index) => (
                    <TableCell
                      key={`${row.id}-${index}`}
                      className={`align-top ${index >= 7 ? "max-w-[400px] whitespace-normal" : "whitespace-nowrap"}`}
                    >
                      {index === REPORTS[kind].statusColumn ? (
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone(
                            kind,
                            String(row.filters.status || ""),
                          )}`}
                        >
                          {value || EMPTY}
                        </span>
                      ) : (
                        value || EMPTY
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {!sortedRows.length && (
                <TableRow>
                  <TableCell
                    colSpan={REPORTS[kind].columns.length}
                    className="h-40 text-center text-muted-foreground"
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <RefreshCw className="size-4 animate-spin" />
                        {text("جارٍ تحميل التقرير…", "Loading report…")}
                      </span>
                    ) : (
                      <span>
                        {text(
                          "لا توجد نتائج مطابقة للفلاتر الحالية.",
                          "No results match the current filters.",
                        )}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

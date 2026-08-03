import { r as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-Du3ze5ZY.mjs";
import { c as formatDate } from "./pms-DLuiFJ6_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as FileChartColumnIncreasing, _ as Printer, h as Search } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { t as ManagementHeader } from "./ManagementVisuals-DCDYFpP2.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CaS5-f7m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-CIOHOHtW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REPORTS = {
	assets: {
		label: "الأصول",
		headers: [
			"رقم الأصل",
			"الاسم",
			"النوع",
			"الحالة",
			"القسم",
			"الموظف",
			"انتهاء الضمان"
		]
	},
	maintenance: {
		label: "الصيانة",
		headers: [
			"الأصل",
			"التاريخ",
			"النوع",
			"الحالة",
			"الفني",
			"الحل"
		]
	},
	inventory: {
		label: "المخزون",
		headers: [
			"العنصر",
			"النوع",
			"الكمية",
			"المكان"
		]
	},
	licenses: {
		label: "التراخيص",
		headers: [
			"الترخيص",
			"المنتج",
			"المقاعد",
			"المستخدم",
			"المتاح",
			"الانتهاء"
		]
	}
};
function ReportsPage() {
	const [kind, setKind] = (0, import_react.useState)("assets");
	const [search, setSearch] = (0, import_react.useState)("");
	const { data, isLoading } = useQuery({
		queryKey: ["itam-reports"],
		queryFn: async () => {
			const [assets, maintenance, inventory, licenses, assignments, employees, departments] = await Promise.all([
				supabase.from("assets").select("*").order("name"),
				supabase.from("asset_maintenance").select("*").order("maintenance_date", { ascending: false }),
				supabase.from("inventory_items").select("*").order("name"),
				supabase.from("licenses").select("*").order("license_name"),
				supabase.from("license_assignments").select("*"),
				supabase.from("employees").select("*"),
				supabase.from("departments").select("*")
			]);
			return {
				assets: assets.data ?? [],
				maintenance: maintenance.data ?? [],
				inventory: inventory.data ?? [],
				licenses: licenses.data ?? [],
				assignments: assignments.data ?? [],
				employees: employees.data ?? [],
				departments: departments.data ?? []
			};
		}
	});
	const rows = (0, import_react.useMemo)(() => {
		if (!data) return [];
		const status = (value) => ({
			active: "نشط",
			inactive: "غير نشط",
			maintenance: "تحت الصيانة",
			retired: "متقاعد",
			Open: "مفتوحة",
			Closed: "مغلقة"
		})[value] || value;
		const result = kind === "assets" ? data.assets.map((asset) => [
			asset.asset_id,
			asset.name,
			asset.asset_type,
			status(asset.status),
			data.departments.find((item) => item.id === asset.department_id)?.name || "—",
			data.employees.find((item) => item.id === asset.assigned_employee_id)?.full_name || "—",
			formatDate(asset.warranty_expiry)
		]) : kind === "maintenance" ? data.maintenance.map((record) => [
			data.assets.find((item) => item.id === record.asset_id)?.name || "—",
			formatDate(record.maintenance_date),
			record.maintenance_type === "Preventive" ? "وقائية" : "تصحيحية",
			status(record.status),
			record.technician || "—",
			record.resolution || "—"
		]) : kind === "inventory" ? data.inventory.map((item) => [
			item.name,
			{
				Consumable: "مستهلكات",
				Toner: "أحبار",
				"Spare Part": "قطع وأدوات"
			}[item.category] || item.category,
			item.quantity,
			item.location || "—"
		]) : data.licenses.map((license) => {
			const used = data.assignments.filter((item) => item.license_id === license.id).length;
			return [
				license.license_name,
				license.product_name || "—",
				license.seat_count,
				used,
				Math.max(0, Number(license.seat_count) - used),
				formatDate(license.expiration_date)
			];
		});
		const term = search.trim().toLowerCase();
		return term ? result.filter((row) => row.some((value) => String(value).toLowerCase().includes(term))) : result;
	}, [
		data,
		kind,
		search
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagementHeader, {
				icon: FileChartColumnIncreasing,
				title: "التقارير",
				description: "تقارير موحدة من بيانات النظام الحالية",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => window.print(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "ml-2 size-4" }), "طباعة أو حفظ PDF"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print surface-panel flex flex-wrap items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: kind,
					onValueChange: (value) => setKind(value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-52",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.entries(REPORTS).map(([value, report]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value,
						children: report.label
					}, value)) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-64 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "pr-9",
						value: search,
						onChange: (event) => setSearch(event.target.value),
						placeholder: "ابحث داخل التقرير"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-semibold",
						children: ["تقرير ", REPORTS[kind].label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [rows.length, " سجل"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: REPORTS[kind].headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: header }, header)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: row.map((value, cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: value || "—" }, cell)) }, index)), !rows.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: REPORTS[kind].headers.length,
						className: "h-28 text-center text-muted-foreground",
						children: isLoading ? "جارٍ التحميل…" : "لا توجد بيانات."
					}) })] })] })
				})]
			})
		]
	});
}
//#endregion
export { ReportsPage as component };

import { r as __toESM } from "../_runtime.mjs";
import { i as runWorkflowAction } from "./client-MMPsyjyK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { f as Trash2, v as Search } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { t as Label } from "./label-DF0aFIxM.mjs";
import { t as Textarea } from "./textarea-DVSIcTTN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-DU8Jfcwy.mjs";
import { l as ConfirmButton } from "./ConfirmButton-DJ1nXwDY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as inventoryAdjustment } from "./data-rules-CWdMDUU9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/maintenance._id-DM7K72-4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter$1 = () => import("./maintenance-CePSDxNk.mjs");
var Route$1 = createFileRoute("/_authenticated/maintenance")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
function assetLabel(asset) {
	return `${asset.name} - ${asset.asset_id || asset.serial_number || asset.id}`;
}
function movementItems(items = []) {
	return items.map((item) => ({
		item_id: item.item_id || item.id,
		quantity: Number(item.quantity) || 0
	}));
}
function MaintenanceForm({ record, assets, inventory, technicians = [], close, saved }) {
	const [inventorySearch, setInventorySearch] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		asset_id: "",
		maintenance_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		maintenance_type: "Corrective",
		status: "Closed",
		used_items: [],
		...record
	});
	const set = (key, value) => setForm({
		...form,
		[key]: value
	});
	const save = async () => {
		if (!form.asset_id) return toast.error("اختر الأصل");
		const insufficient = inventoryAdjustment(movementItems(record.used_items || []), movementItems(form.used_items || [])).find((adjustment) => {
			const item = inventory.find((entry) => entry.id === adjustment.itemId);
			return item && Number(item.quantity) + adjustment.quantityChange < 0;
		});
		if (insufficient) return toast.error(`الكمية المتوفرة من ${inventory.find((item) => item.id === insufficient.itemId)?.name} لا تكفي`);
		const payload = { ...form };
		delete payload.cost;
		try {
			await runWorkflowAction({
				action: "save-maintenance",
				record: payload
			});
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذر حفظ سجل الصيانة");
			return;
		}
		saved();
		toast.success(form.id ? "تم تعديل سجل الصيانة" : "تمت إضافة سجل الصيانة");
		close();
	};
	const remove = async () => {
		if (!form.id) return;
		try {
			await runWorkflowAction({
				action: "delete-maintenance",
				maintenanceId: form.id
			});
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذر حذف سجل الصيانة");
			return;
		}
		saved();
		toast.success("تم حذف سجل الصيانة");
		close();
	};
	const normalizedSearch = inventorySearch.trim().toLocaleLowerCase();
	const selectedInventory = inventory.filter((item) => form.used_items.some((used) => used.id === item.id));
	const matchingInventory = inventory.filter((item) => {
		if (!normalizedSearch) return false;
		return [
			item.name,
			item.category,
			item.location
		].filter(Boolean).some((value) => String(value).toLocaleLowerCase().includes(normalizedSearch));
	}).filter((item) => !form.used_items.some((used) => used.id === item.id)).slice(0, 8);
	const inventorySearchResults = [...selectedInventory, ...matchingInventory];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] max-w-2xl overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: form.id ? "تعديل سجل الصيانة" : "إضافة سجل صيانة" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "الأصل" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.asset_id,
								onValueChange: (value) => set("asset_id", value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: assets.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: asset.id,
									children: assetLabel(asset)
								}, asset.id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "تاريخ الصيانة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: form.maintenance_date || "",
								onChange: (event) => set("maintenance_date", event.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "الفني" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.technician || "__none__",
								onValueChange: (value) => set("technician", value === "__none__" ? "" : value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "اختر الفني" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "__none__",
									children: "غير محدد"
								}), technicians.map((technician) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: technician.name,
									children: technician.name
								}, technician.id))] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نوع الصيانة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.maintenance_type,
								onValueChange: (value) => set("maintenance_type", value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Corrective",
										children: "تصحيحية"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Preventive",
										children: "وقائية"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Toner Replacement",
										children: "تغيير حبر"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Part Installation",
										children: "تركيب قطعة"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Part Replacement",
										children: "استبدال قطعة"
									})
								] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "الحالة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.status,
								onValueChange: (value) => set("status", value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Open",
									children: "مفتوحة"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Closed",
									children: "مغلقة"
								})] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 sm:col-span-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "العناصر المستخدمة" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute right-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "pr-9",
										placeholder: "ابحث باسم الصنف أو التصنيف أو الموقع...",
										value: inventorySearch,
										onChange: (event) => setInventorySearch(event.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"اكتب للبحث في ",
										inventory.length,
										" صنفًا. تظهر أول 8 نتائج مطابقة."
									]
								}),
								inventorySearchResults.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center gap-2 rounded-md border p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex-1 text-sm",
										children: [
											item.name,
											" (",
											item.quantity,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "w-24",
										type: "number",
										min: "0",
										placeholder: "0",
										value: form.used_items.find((used) => used.id === item.id)?.quantity || "",
										onChange: (event) => {
											const quantity = Number(event.target.value);
											set("used_items", [...form.used_items.filter((used) => used.id !== item.id), ...quantity ? [{
												id: item.id,
												quantity
											}] : []]);
										}
									})]
								}, item.id)),
								inventorySearch && matchingInventory.length === 0 && selectedInventory.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-md border border-dashed p-3 text-sm text-muted-foreground",
									children: "لا توجد أصناف مطابقة للبحث."
								}),
								!inventorySearch && selectedInventory.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-md border border-dashed p-3 text-sm text-muted-foreground",
									children: "ابدأ بكتابة اسم الصنف لاختياره."
								})
							]
						}),
						[
							["وصف المشكلة", "problem_description"],
							["الحل", "resolution"],
							["ملاحظات", "notes"]
						].map(([label, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: form[key] || "",
								onChange: (e) => set(key, e.target.value)
							})]
						}, key))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [
					form.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmButton, {
						variant: "outline",
						className: "text-destructive",
						title: "حذف سجل الصيانة؟",
						description: "سيتم حذف السجل وإرجاع المواد المستخدمة إلى المخزون.",
						onConfirm: remove,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "ml-2 size-4" }), "حذف"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: close,
						children: "إلغاء"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: save,
						children: "حفظ"
					})
				] })
			]
		})
	});
}
var $$splitComponentImporter = () => import("./maintenance._id-DP8bpkE2.mjs");
var Route = createFileRoute("/_authenticated/maintenance/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
export { Route as n, Route$1 as r, MaintenanceForm as t };

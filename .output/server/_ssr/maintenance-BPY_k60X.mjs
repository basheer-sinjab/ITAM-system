import { r as __toESM } from "../_runtime.mjs";
import { i as supabase } from "./utils-CWZASUqA.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as Trash2, h as Pencil, p as Plus } from "../_libs/lucide-react.mjs";
import { n as Input, r as Label, t as Button } from "./label-DrbQyf4b.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Textarea, r as DialogFooter, t as Dialog } from "./textarea-DCYNKPPs.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BmpXLJ8j.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/maintenance-BPY_k60X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function assetLabel(asset) {
	return `${asset.name} - ${asset.asset_id || asset.serial_number || asset.id}`;
}
function Maintenance() {
	const qc = useQueryClient();
	const [record, setRecord] = (0, import_react.useState)();
	const { data: records = [] } = useQuery({
		queryKey: ["asset-maintenance"],
		queryFn: async () => (await supabase.from("asset_maintenance").select("*").order("maintenance_date", { ascending: false })).data ?? []
	});
	const { data: assets = [] } = useQuery({
		queryKey: ["assets"],
		queryFn: async () => (await supabase.from("assets").select("*")).data ?? []
	});
	const { data: inventory = [] } = useQuery({
		queryKey: ["inventory"],
		queryFn: async () => (await supabase.from("inventory_items").select("*")).data ?? []
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: "سجلات الصيانة"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "الصيانة الوقائية والتصحيحية"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setRecord({}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة سجل"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-panel overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b text-right text-muted-foreground",
						children: [
							"الأصل",
							"التاريخ",
							"النوع",
							"الحالة",
							"الفني",
							"الحل",
							"التكلفة",
							""
						].map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-4",
							children: header
						}, header))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: records.map((maintenanceRecord) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "cursor-pointer border-b transition-colors hover:bg-muted/50",
						onClick: () => setRecord(maintenanceRecord),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: (() => {
									const asset = assets.find((item) => item.id === maintenanceRecord.asset_id);
									return asset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: asset.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-muted-foreground",
										children: asset.asset_id || asset.serial_number || "—"
									})] }) : "—";
								})()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: maintenanceRecord.maintenance_date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: maintenanceRecord.maintenance_type === "Preventive" ? "وقائية" : "تصحيحية"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: maintenanceRecord.status === "Closed" ? "مغلقة" : "مفتوحة"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: maintenanceRecord.technician || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "max-w-64 p-4",
								children: maintenanceRecord.resolution || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: maintenanceRecord.cost || 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									"aria-label": "تعديل السجل",
									onClick: (event) => {
										event.stopPropagation();
										setRecord(maintenanceRecord);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
								})
							})
						]
					}, maintenanceRecord.id)) })]
				})
			}),
			record && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaintenanceForm, {
				record,
				assets,
				inventory,
				close: () => setRecord(void 0),
				saved: () => qc.invalidateQueries()
			}, record.id ?? "new")
		]
	});
}
function MaintenanceForm({ record, assets, inventory, close, saved }) {
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
		const payload = {
			...form,
			cost: Number(form.cost || 0)
		};
		const result = form.id ? await supabase.from("asset_maintenance").update(payload).eq("id", form.id) : await supabase.from("asset_maintenance").insert(payload);
		if (result.error) return toast.error(result.error.message);
		if (!form.id) for (const used of form.used_items) {
			const item = inventory.find((entry) => entry.id === used.id);
			if (item) await supabase.from("inventory_items").update({ quantity: Math.max(0, Number(item.quantity) - Number(used.quantity)) }).eq("id", item.id);
		}
		saved();
		toast.success(form.id ? "تم تعديل سجل الصيانة" : "تمت إضافة سجل الصيانة");
		close();
	};
	const remove = async () => {
		if (!form.id || !confirm("حذف سجل الصيانة؟")) return;
		const result = await supabase.from("asset_maintenance").delete().eq("id", form.id);
		if (result.error) return toast.error(result.error.message);
		saved();
		toast.success("تم حذف سجل الصيانة");
		close();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl",
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
						[
							["تاريخ الصيانة", "maintenance_date"],
							["الفني", "technician"],
							["التكلفة", "cost"]
						].map(([label, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: key === "maintenance_date" ? "date" : key === "cost" ? "number" : void 0,
								value: form[key] || "",
								onChange: (e) => set(key, e.target.value)
							})]
						}, key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نوع الصيانة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.maintenance_type,
								onValueChange: (value) => set("maintenance_type", value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Corrective",
									children: "تصحيحية"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Preventive",
									children: "وقائية"
								})] })]
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "العناصر المستخدمة" }), inventory.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex gap-2",
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
							}, item.id))]
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
					form.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "text-destructive",
						onClick: remove,
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
//#endregion
export { Maintenance as component };

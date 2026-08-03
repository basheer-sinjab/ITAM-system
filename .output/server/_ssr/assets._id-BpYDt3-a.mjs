import { r as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-Du3ze5ZY.mjs";
import { d as uploadPrinterImage, t as ASSET_TYPES } from "./pms-DLuiFJ6_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { t as Label } from "./label-DF0aFIxM.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-B8OAifVF.mjs";
import { t as Textarea } from "./textarea-DVSIcTTN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets._id-BpYDt3-a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter$1 = () => import("./assets.index-CXe_PTnr.mjs");
var NONE = "__none__";
var Route$1 = createFileRoute("/_authenticated/assets/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
function AssetForm({ open, onOpenChange, employees, departments = [], asset, onSaved }) {
	const queryClient = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		asset_type: "Printer",
		manufacturer: "",
		model: "",
		serial_number: "",
		status: "active",
		department_id: NONE,
		assigned_employee_id: NONE,
		purchase_date: "",
		warranty_expiry: "",
		notes: ""
	});
	const [file, setFile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (open) {
			setForm(asset ? {
				...asset,
				department_id: asset.department_id || NONE,
				assigned_employee_id: asset.assigned_employee_id || NONE
			} : {
				name: "",
				asset_type: "Printer",
				manufacturer: "",
				model: "",
				serial_number: "",
				status: "active",
				department_id: NONE,
				assigned_employee_id: NONE,
				purchase_date: "",
				warranty_expiry: "",
				notes: ""
			});
			setFile(null);
		}
	}, [open, asset]);
	const save = useMutation({
		mutationFn: async () => {
			if (!form.name.trim()) throw new Error("اسم الأصل مطلوب");
			const image_url = file ? await uploadPrinterImage(file) : asset?.image_url ?? null;
			const assigned_employee_id = form.assigned_employee_id === NONE ? null : form.assigned_employee_id;
			const department_id = form.department_id === NONE ? null : form.department_id;
			const payload = {
				...form,
				name: form.name.trim(),
				department_id,
				assigned_employee_id,
				purchase_date: form.purchase_date || null,
				warranty_expiry: form.warranty_expiry || null,
				image_url,
				asset_id: form.asset_id || void 0
			};
			if (asset) {
				if (asset.assigned_employee_id !== assigned_employee_id) {
					const current = await supabase.from("assignment_history").select("*").eq("asset_id", asset.id).eq("return_date", null).maybeSingle();
					if (current.data) await supabase.from("assignment_history").update({ return_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) }).eq("id", current.data.id);
					if (assigned_employee_id) await supabase.from("assignment_history").insert({
						asset_id: asset.id,
						employee_id: assigned_employee_id
					});
				}
				const result = await supabase.from("assets").update(payload).eq("id", asset.id);
				if (result.error) throw result.error;
			} else {
				const result = await supabase.from("assets").insert(payload);
				if (result.error) throw result.error;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			onSaved?.();
			onOpenChange(false);
			toast.success("تم حفظ الأصل");
		},
		onError: (e) => toast.error(e.message)
	});
	const set = (key, value) => setForm((current) => ({
		...current,
		[key]: value
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] max-w-3xl overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: asset ? "تعديل أصل" : "إضافة أصل" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						[
							["رقم الأصل (يتولد تلقائياً إن ترك فارغاً)", "asset_id"],
							["اسم الأصل *", "name"],
							["الشركة المصنّعة", "manufacturer"],
							["الموديل", "model"],
							["الرقم التسلسلي", "serial_number"]
						].map(([label, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form[key] || "",
								onChange: (e) => set(key, e.target.value)
							})]
						}, key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "الحالة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.status || "active",
								onValueChange: (v) => set("status", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "active",
										children: "نشط"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "inactive",
										children: "غير نشط"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "maintenance",
										children: "تحت الصيانة"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "retired",
										children: "متقاعد"
									})
								] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نوع الأصل" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.asset_type,
								onValueChange: (v) => set("asset_type", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ASSET_TYPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: item,
									children: item
								}, item)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "الموظف المعيّن" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.assigned_employee_id,
								onValueChange: (v) => set("assigned_employee_id", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: NONE,
									children: "غير معيّن"
								}), employees.map((employee) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: employee.id,
									children: employee.full_name
								}, employee.id))] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "القسم" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.department_id || NONE,
								onValueChange: (v) => set("department_id", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "اختر القسم" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: NONE,
									children: "غير محدد"
								}), departments.map((department) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: department.id,
									children: department.name
								}, department.id))] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "تاريخ الشراء" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: form.purchase_date || "",
								onChange: (event) => set("purchase_date", event.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "انتهاء الضمان" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: form.warranty_expiry || "",
								onChange: (event) => set("warranty_expiry", event.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "الصورة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "file",
								accept: "image/*",
								onChange: (e) => setFile(e.target.files?.[0] ?? null)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ملاحظات" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: form.notes || "",
								onChange: (e) => set("notes", e.target.value)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "إلغاء"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => save.mutate(),
					disabled: save.isPending,
					children: "حفظ"
				})] })
			]
		})
	});
}
var $$splitComponentImporter = () => import("./assets._id-DjCDH3Dv.mjs");
var Route = createFileRoute("/_authenticated/assets/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
export { Route as n, Route$1 as r, AssetForm as t };

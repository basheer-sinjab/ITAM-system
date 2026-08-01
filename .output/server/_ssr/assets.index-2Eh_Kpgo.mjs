import { r as __toESM } from "../_runtime.mjs";
import { i as supabase } from "./utils-CWZASUqA.mjs";
import { d as uploadPrinterImage, t as ASSET_TYPES } from "./pms-DLuiFJ6_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as Plus, l as Search } from "../_libs/lucide-react.mjs";
import { n as Input, r as Label, t as Button } from "./label-DrbQyf4b.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Textarea, r as DialogFooter, t as Dialog } from "./dialog-B9nhX6xa.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cjd1r6Fh.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PrinterImage } from "./PrinterImage-BBPVBnou.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets.index-2Eh_Kpgo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NONE = "__none__";
function AssetsPage() {
	const queryClient = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("__all__");
	const [open, setOpen] = (0, import_react.useState)(false);
	const { data: assets = [] } = useQuery({
		queryKey: ["assets"],
		queryFn: async () => (await supabase.from("assets").select("*").order("created_at", { ascending: false })).data ?? []
	});
	const { data: employees = [] } = useQuery({
		queryKey: ["employees"],
		queryFn: async () => (await supabase.from("employees").select("*").order("full_name")).data ?? []
	});
	const filtered = assets.filter((asset) => (type === "__all__" || asset.asset_type === type) && [
		asset.name,
		asset.asset_id,
		asset.serial_number,
		asset.model
	].some((v) => String(v ?? "").toLowerCase().includes(search.toLowerCase())));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: "الأصول"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [filtered.length, " أصل معروض"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-2",
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "إضافة أصل"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel grid gap-3 p-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "pr-9",
						placeholder: "بحث بالاسم أو الرقم التسلسلي…",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: type,
					onValueChange: setType,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "__all__",
						children: "كل الأنواع"
					}), ASSET_TYPES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: item,
						children: item
					}, item))] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-4",
				children: filtered.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/assets/$id",
					params: { id: asset.id },
					className: "surface-panel interactive-card overflow-hidden hover:interactive-card-hover",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrinterImage, {
						path: asset.image_url,
						alt: asset.name,
						className: "h-40 w-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: asset.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									asset.asset_type,
									" · ",
									asset.manufacturer || "—"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted-foreground",
								children: asset.asset_id
							})
						]
					})]
				}, asset.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetForm, {
				open,
				onOpenChange: setOpen,
				employees,
				onSaved: () => queryClient.invalidateQueries()
			})
		]
	});
}
function AssetForm({ open, onOpenChange, employees, asset, onSaved }) {
	const queryClient = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		asset_type: "Printer",
		manufacturer: "",
		model: "",
		serial_number: "",
		status: "active",
		location: "",
		assigned_employee_id: NONE,
		notes: ""
	});
	const [file, setFile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (open) {
			setForm(asset ? {
				...asset,
				assigned_employee_id: asset.assigned_employee_id || NONE
			} : {
				name: "",
				asset_type: "Printer",
				manufacturer: "",
				model: "",
				serial_number: "",
				status: "active",
				location: "",
				assigned_employee_id: NONE,
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
			const payload = {
				...form,
				name: form.name.trim(),
				assigned_employee_id,
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
							["الرقم التسلسلي", "serial_number"],
							["الموقع", "location"],
							["الحالة", "status"]
						].map(([label, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form[key] || "",
								onChange: (e) => set(key, e.target.value)
							})]
						}, key)),
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
//#endregion
export { AssetForm, AssetsPage as component };

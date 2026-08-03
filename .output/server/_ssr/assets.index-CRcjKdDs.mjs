import { r as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-Du3ze5ZY.mjs";
import { d as uploadPrinterImage, t as ASSET_TYPES } from "./pms-DLuiFJ6_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { C as Monitor, H as Boxes, a as UserRound, h as Search, v as Plus } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { t as Label } from "./label-DF0aFIxM.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-B8OAifVF.mjs";
import { t as Textarea } from "./textarea-DVSIcTTN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PrinterImage } from "./PrinterImage-CBPRXgNz.mjs";
import { n as MetricCard, t as ManagementHeader } from "./ManagementVisuals-DCDYFpP2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets.index-CRcjKdDs.js
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
	const { data: departments = [] } = useQuery({
		queryKey: ["departments"],
		queryFn: async () => (await supabase.from("departments").select("*").order("name")).data ?? []
	});
	const filtered = assets.filter((asset) => (type === "__all__" || asset.asset_type === type) && [
		asset.name,
		asset.asset_id,
		asset.serial_number,
		asset.model
	].some((v) => String(v ?? "").toLowerCase().includes(search.toLowerCase())));
	const assignedAssets = assets.filter((asset) => asset.assigned_employee_id).length;
	const activeAssets = assets.filter((asset) => asset.status === "active").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagementHeader, {
				icon: Monitor,
				title: "الأصول",
				description: `${filtered.length} أصل معروض من أصل ${assets.length}`,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-2",
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "إضافة أصل"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: Boxes,
						label: "إجمالي الأصول",
						value: assets.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: UserRound,
						label: "أصول معيّنة",
						value: assignedAssets,
						tone: "emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: Monitor,
						label: "أصول نشطة",
						value: activeAssets,
						tone: "amber"
					})
				]
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
						className: "space-y-2 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: asset.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md bg-primary/10 px-2 py-1 text-xs text-primary",
									children: asset.asset_type
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: asset.manufacturer || "الشركة غير محددة"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: asset.assigned_employee_id ? `معين لـ (${employees.find((employee) => employee.id === asset.assigned_employee_id)?.full_name ?? "موظف"})` : "غير معين"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"القسم:",
									" ",
									departments.find((department) => department.id === asset.department_id)?.name ?? "غير محدد"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-t pt-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: asset.asset_id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2.5 rounded-full ${asset.status === "active" ? "bg-emerald-500" : asset.status === "maintenance" ? "bg-amber-500" : asset.status === "retired" ? "bg-slate-400" : "bg-rose-500"}` }), asset.status === "active" ? "نشط" : asset.status === "maintenance" ? "صيانة" : asset.status === "retired" ? "متقاعد" : "غير نشط"]
								})]
							})
						]
					})]
				}, asset.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetForm, {
				open,
				onOpenChange: setOpen,
				departments,
				onSaved: () => queryClient.invalidateQueries()
			})
		]
	});
}
function AssetForm({ open, onOpenChange, departments = [], asset, onSaved }) {
	const queryClient = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		asset_type: "Printer",
		manufacturer: "",
		model: "",
		serial_number: "",
		status: "active",
		department_id: NONE,
		purchase_date: "",
		warranty_expiry: "",
		notes: ""
	});
	const [file, setFile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (open) {
			setForm(asset ? {
				...asset,
				department_id: asset.department_id || NONE
			} : {
				name: "",
				asset_type: "Printer",
				manufacturer: "",
				model: "",
				serial_number: "",
				status: "active",
				department_id: NONE,
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
			const department_id = form.department_id === NONE ? null : form.department_id;
			const payload = {
				...form,
				name: form.name.trim(),
				department_id,
				purchase_date: form.purchase_date || null,
				warranty_expiry: form.warranty_expiry || null,
				image_url,
				asset_id: form.asset_id || void 0
			};
			if (asset) {
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
//#endregion
export { AssetForm, AssetsPage as component };

import { r as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-Beq9QKFo.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { N as Boxes, _ as Package, c as Trash2, g as Pencil, m as Plus, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as Input, r as Label, t as Button } from "./label-D6rma-RY.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Textarea, r as DialogFooter, t as Dialog } from "./textarea-DLR0hsWQ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-IPXSUyW3.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as MetricCard, t as ManagementHeader } from "./ManagementVisuals-DCDYFpP2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-CIumPL2D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Inventory() {
	const qc = useQueryClient();
	const [record, setRecord] = (0, import_react.useState)();
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("Consumable");
	const { data: items = [] } = useQuery({
		queryKey: ["inventory"],
		queryFn: async () => (await supabase.from("inventory_items").select("*").order("name")).data ?? []
	});
	const remove = useMutation({
		mutationFn: (id) => supabase.from("inventory_items").delete().eq("id", id),
		onSuccess: () => qc.invalidateQueries()
	});
	const lowStockItems = items.filter((item) => Number(item.quantity) <= 3);
	const totalUnits = items.reduce((total, item) => total + Number(item.quantity || 0), 0);
	const visibleItems = items.filter((item) => item.category === activeCategory);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagementHeader, {
				icon: Package,
				title: "المخزون",
				description: "المستهلكات وقطع الغيار ومتابعة الحد الأدنى",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setRecord({
						category: activeCategory,
						...activeCategory === "Toner" ? { color: "B" } : {}
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة عنصر"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: Boxes,
						label: "أصناف المخزون",
						value: items.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: Package,
						label: "إجمالي الوحدات",
						value: totalUnits,
						tone: "emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: TriangleAlert,
						label: "مخزون منخفض",
						value: lowStockItems.length,
						tone: "amber"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 rounded-lg border bg-muted/30 p-2",
				children: [
					["Consumable", "مستهلكات"],
					["Spare Part", "قطع غيار"],
					["Toner", "أحبار"]
				].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: activeCategory === value ? "default" : "ghost",
					onClick: () => setActiveCategory(value),
					children: [
						label,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mr-2 text-xs opacity-70",
							children: [
								"(",
								items.filter((item) => item.category === value).length,
								")"
							]
						})
					]
				}, value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b text-right text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
							"العنصر",
							"الفئة",
							"اللون",
							"الكمية",
							"الحد الأدنى",
							"الموقع",
							""
						].map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-4 font-medium",
							children: header
						}, header)) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visibleItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b transition-colors hover:bg-muted/40 last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4 font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4" })
									}), item.name]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground",
									children: item.category === "Spare Part" ? "قطع غيار" : item.category === "Toner" ? "أحبار" : "مستهلكات"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: item.category === "Toner" && item.color ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorDot, { color: item.color }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium",
										children: item.color
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "—"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "p-4",
								children: [Number(item.quantity) <= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "ml-1 inline size-4 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: Number(item.quantity) <= 3 ? "font-semibold text-amber-700" : "font-medium",
									children: item.quantity
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: item.minimum_quantity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: item.location || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => setRecord(item),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => remove.mutate(item.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
								})]
							})
						]
					}, item.id)) })]
				}), !visibleItems.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "لا توجد عناصر في هذه الفئة."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventoryForm, {
				record,
				close: () => setRecord(void 0)
			}, record?.id ?? (record ? "new" : "closed"))
		]
	});
}
function InventoryForm({ record, close }) {
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(record);
	(0, import_react.useEffect)(() => setForm(record), [record]);
	if (!record) return null;
	const data = form ?? record;
	const set = (key, value) => setForm({
		...data,
		[key]: value
	});
	const save = async () => {
		if (!data.name?.trim()) {
			toast.error("يرجى إدخال اسم العنصر");
			return;
		}
		const payload = {
			...data,
			quantity: Number(data.quantity || 0),
			minimum_quantity: Number(data.minimum_quantity || 0)
		};
		const result = data.id ? await supabase.from("inventory_items").update(payload).eq("id", data.id) : await supabase.from("inventory_items").insert(payload);
		if (result.error) {
			toast.error(`تعذر حفظ العنصر: ${result.error.message}`);
			return;
		}
		await qc.invalidateQueries({ queryKey: ["inventory"] });
		toast.success(data.id ? "تم تحديث العنصر" : "تمت إضافة العنصر");
		close();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: data.id ? "تعديل عنصر" : "إضافة عنصر" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						[
							["اسم العنصر", "name"],
							["الكمية", "quantity"],
							["الحد الأدنى", "minimum_quantity"],
							["الموقع", "location"]
						].map(([label, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: key.includes("quantity") ? "number" : void 0,
								min: key.includes("quantity") ? 0 : void 0,
								placeholder: key === "name" ? "مثال: حبر HP 410A" : key === "location" ? "مثال: مستودع تقنية المعلومات" : void 0,
								value: data[key] || "",
								onChange: (e) => set(key, e.target.value)
							})]
						}, key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "الفئة" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: data.category || "Consumable",
								onValueChange: (value) => set("category", value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Consumable",
										children: "مستهلكات"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Spare Part",
										children: "قطع غيار"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Toner",
										children: "أحبار"
									})
								] })]
							})]
						}),
						data.category === "Toner" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "لون الحبر" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: data.color || "B",
								onValueChange: (value) => set("color", value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
									[
										"B",
										"black",
										"أسود"
									],
									[
										"Y",
										"yellow",
										"أصفر"
									],
									[
										"M",
										"magenta",
										"أرجواني"
									],
									[
										"C",
										"cyan",
										"سماوي"
									]
								].map(([value, color, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorDot, { color }),
											value,
											" - ",
											label
										]
									})
								}, value)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "وصف العنصر وملاحظاته" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								placeholder: "أضف تفاصيل تساعد على التعرف على العنصر أو استخدامه...",
								value: data.notes || "",
								onChange: (e) => set("notes", e.target.value)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: close,
					children: "إلغاء"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: save,
					children: "حفظ"
				})] })
			]
		})
	});
}
function ColorDot({ color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-label": color,
		className: `inline-block size-3 rounded-full border border-black/20 ${{
			B: "bg-black",
			black: "bg-black",
			Y: "bg-yellow-400",
			yellow: "bg-yellow-400",
			M: "bg-fuchsia-600",
			magenta: "bg-fuchsia-600",
			C: "bg-cyan-500",
			cyan: "bg-cyan-500"
		}[color] ?? "bg-muted"}`
	});
}
//#endregion
export { Inventory as component };

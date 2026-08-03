import { r as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-Du3ze5ZY.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { H as Boxes, O as History, b as Pencil, h as Search, l as TriangleAlert, u as Trash2, v as Plus, w as Minus, x as Package } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { t as Label } from "./label-DF0aFIxM.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-B8OAifVF.mjs";
import { t as Textarea } from "./textarea-DVSIcTTN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ConfirmButton } from "./ConfirmButton-BpxDIdWE.mjs";
import { n as MetricCard, t as ManagementHeader } from "./ManagementVisuals-DCDYFpP2.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CaS5-f7m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-CEoW-1hf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	{
		value: "Consumable",
		label: "مستهلكات"
	},
	{
		value: "Toner",
		label: "أحبار"
	},
	{
		value: "Spare Part",
		label: "قطع وأدوات"
	}
];
var movementLabel = {
	add: "إضافة كمية",
	use: "استخدام",
	return: "إرجاع",
	adjust: "تعديل"
};
function Inventory() {
	const queryClient = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [record, setRecord] = (0, import_react.useState)();
	const [movement, setMovement] = (0, import_react.useState)();
	const [historyItem, setHistoryItem] = (0, import_react.useState)();
	const { data: items = [] } = useQuery({
		queryKey: ["inventory"],
		queryFn: async () => (await supabase.from("inventory_items").select("*").order("name")).data ?? []
	});
	const { data: movements = [] } = useQuery({
		queryKey: ["inventory-movements"],
		queryFn: async () => (await supabase.from("inventory_movements").select("*").order("movement_date", { ascending: false })).data ?? []
	});
	const { data: settings } = useQuery({
		queryKey: ["app-settings"],
		queryFn: async () => (await supabase.from("app_settings").select("*").eq("id", "default").maybeSingle()).data
	});
	const threshold = Number(settings?.low_stock_threshold ?? 2);
	const filtered = (0, import_react.useMemo)(() => items.filter((item) => [
		item.name,
		item.location,
		categoryName(item.category)
	].some((value) => String(value || "").toLowerCase().includes(search.trim().toLowerCase()))), [items, search]);
	const lowStock = items.filter((item) => Number(item.quantity) <= threshold);
	const totalUnits = items.reduce((total, item) => total + Number(item.quantity || 0), 0);
	const refresh = () => queryClient.invalidateQueries();
	const remove = async (item) => {
		const result = await supabase.from("inventory_items").delete().eq("id", item.id);
		if (result.error) return toast.error(result.error.message);
		refresh();
		toast.success("تم حذف العنصر من المخزون");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagementHeader, {
				icon: Package,
				title: "المخزون",
				description: "متابعة الكميات بطريقة سهلة وواضحة",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setRecord({ category: "Consumable" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة عنصر"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: Boxes,
						label: "عدد العناصر",
						value: items.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: Package,
						label: "إجمالي الكمية",
						value: totalUnits,
						tone: "emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: TriangleAlert,
						label: "تحتاج انتباه",
						value: lowStock.length,
						tone: "amber"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-b p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "العناصر والكميات"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "إذا أخذت شيئًا اضغط «استخدم»، وإذا وصلتك كمية اضغط «زود الكمية»."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "pr-9",
							value: search,
							onChange: (event) => setSearch(event.target.value),
							placeholder: "ابحث في المخزون"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "العنصر" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "النوع" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "الكمية" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "المكان" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-left",
							children: "الخيارات"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [filtered.map((item) => {
						const isLow = Number(item.quantity) <= threshold;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: item.name
							}), item.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs truncate text-xs text-muted-foreground",
								children: item.notes
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [categoryName(item.category), item.color ? ` - ${item.color}` : ""] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `inline-flex items-center gap-2 rounded-md px-2.5 py-1 font-semibold ${isLow ? "bg-amber-500/10 text-amber-700" : "bg-primary/10 text-primary"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2 rounded-full ${isLow ? "bg-amber-500" : "bg-primary"}` }), Number(item.quantity)]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: item.location || "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap justify-end gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => setMovement({
											item,
											type: "add"
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-1 size-3.5" }), "زود الكمية"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										disabled: Number(item.quantity) <= 0,
										onClick: () => setMovement({
											item,
											type: "use"
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "ml-1 size-3.5" }), "استخدم"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										"aria-label": "سجل الحركة",
										onClick: () => setHistoryItem(item),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										"aria-label": "تعديل",
										onClick: () => setRecord(item),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
										size: "icon",
										variant: "ghost",
										className: "text-destructive",
										"aria-label": "حذف",
										title: "حذف العنصر؟",
										description: `هل تريد حذف ${item.name} وسجل حركته من المخزون؟`,
										onConfirm: () => remove(item),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})
								]
							}) })
						] }, item.id);
					}), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: 5,
						className: "h-28 text-center text-muted-foreground",
						children: "لا توجد عناصر مطابقة."
					}) })] })] })
				})]
			}),
			record && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemDialog, {
				item: record.id ? record : null,
				initialCategory: record.category,
				close: () => setRecord(void 0),
				saved: refresh
			}),
			movement && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovementDialog, {
				...movement,
				close: () => setMovement(void 0),
				saved: refresh
			}),
			historyItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryDialog, {
				item: historyItem,
				movements: movements.filter((entry) => entry.item_id === historyItem.id),
				close: () => setHistoryItem(void 0)
			})
		]
	});
}
function ItemDialog({ item, initialCategory, close, saved }) {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		category: initialCategory || "Consumable",
		quantity: 0,
		location: "",
		notes: "",
		color: ""
	});
	(0, import_react.useEffect)(() => {
		if (item) setForm({ ...item });
	}, [item]);
	const set = (key, value) => setForm((current) => ({
		...current,
		[key]: value
	}));
	const save = async () => {
		if (!form.name?.trim()) return toast.error("اسم العنصر مطلوب");
		const payload = {
			name: form.name.trim(),
			category: form.category,
			color: form.color || null,
			location: form.location || null,
			notes: form.notes || null
		};
		if (item) {
			const result = await supabase.from("inventory_items").update(payload).eq("id", item.id);
			if (result.error) return toast.error(result.error.message);
		} else {
			const result = await supabase.from("inventory_items").insert({
				...payload,
				quantity: Math.max(0, Number(form.quantity) || 0),
				minimum_quantity: 1
			});
			if (result.error) return toast.error(result.error.message);
			const created = Array.isArray(result.data) ? result.data[0] : result.data;
			if (created && Number(form.quantity) > 0) await supabase.from("inventory_movements").insert({
				item_id: created.id,
				movement_type: "add",
				quantity: Number(form.quantity),
				note: "الكمية الافتتاحية"
			});
		}
		saved();
		close();
		toast.success(item ? "تم تعديل العنصر" : "تمت إضافة العنصر");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: item ? "تعديل العنصر" : "إضافة عنصر للمخزون" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "اسم العنصر",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.name || "",
							onChange: (event) => set("name", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "النوع",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.category,
							onValueChange: (value) => set("category", value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: category.value,
								children: category.label
							}, category.value)) })]
						})
					}),
					!item && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الكمية الموجودة الآن",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: "0",
							value: form.quantity,
							onChange: (event) => set("quantity", event.target.value)
						})
					}),
					form.category === "Toner" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "اللون",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.color || "",
							onChange: (event) => set("color", event.target.value),
							placeholder: "أسود، سماوي…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "مكان الحفظ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.location || "",
							onChange: (event) => set("location", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "ملاحظات",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: form.notes || "",
							onChange: (event) => set("notes", event.target.value)
						})
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
		] })
	});
}
function MovementDialog({ item, type, close, saved }) {
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [note, setNote] = (0, import_react.useState)("");
	const save = async () => {
		const amount = Number(quantity);
		if (!Number.isFinite(amount) || amount <= 0) return toast.error("أدخل كمية صحيحة");
		if (type === "use" && amount > Number(item.quantity)) return toast.error(`المتوفر حاليًا ${item.quantity} فقط`);
		const nextQuantity = Number(item.quantity) + (type === "add" ? amount : -amount);
		const update = await supabase.from("inventory_items").update({ quantity: nextQuantity }).eq("id", item.id);
		if (update.error) return toast.error(update.error.message);
		const log = await supabase.from("inventory_movements").insert({
			item_id: item.id,
			movement_type: type,
			quantity: amount,
			note: note.trim() || null
		});
		if (log.error) return toast.error(log.error.message);
		saved();
		close();
		toast.success(type === "add" ? "تمت زيادة الكمية" : "تم تسجيل الاستخدام");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: type === "add" ? `زود كمية ${item.name}` : `استخدام ${item.name}` }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-muted/50 p-3 text-sm",
						children: ["الكمية الحالية: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.quantity })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الكمية",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							autoFocus: true,
							type: "number",
							min: "1",
							max: type === "use" ? item.quantity : void 0,
							value: quantity,
							onChange: (event) => setQuantity(Number(event.target.value))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "ملاحظة اختيارية",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: note,
							onChange: (event) => setNote(event.target.value),
							placeholder: "مثال: تم استخدامه في صيانة جهاز"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: close,
				children: "إلغاء"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				children: type === "add" ? "زود الكمية" : "سجل الاستخدام"
			})] })
		] })
	});
}
function HistoryDialog({ item, movements, close }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[80vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["سجل ", item.name] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [movements.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: movementLabel[entry.movement_type] || "حركة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								entry.movement_date,
								" ",
								entry.note ? `· ${entry.note}` : ""
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: entry.movement_type === "use" ? "font-semibold text-amber-700" : "font-semibold text-primary",
							children: [entry.movement_type === "use" ? "−" : "+", entry.quantity]
						})]
					}, entry.id)), !movements.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "لا توجد حركة مسجلة لهذا العنصر."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: close,
					children: "إغلاق"
				}) })
			]
		})
	});
}
function categoryName(value) {
	return CATEGORIES.find((category) => category.value === value)?.label || value || "غير محدد";
}
function Field({ label, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-2 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { Inventory as component };

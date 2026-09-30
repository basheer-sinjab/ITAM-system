import { r as __toESM } from "../_runtime.mjs";
import { t as IT_WAREHOUSE } from "./ssr.mjs";
import { a as supabase } from "./client-MMPsyjyK.mjs";
import { a as uploadInventoryImage } from "./pms-CVfeknnd.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { E as Package } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { t as Label } from "./label-DF0aFIxM.mjs";
import { t as Textarea } from "./textarea-DVSIcTTN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-DU8Jfcwy.mjs";
import { t as PrinterImage } from "./PrinterImage-C7FnTavC.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory._id-BiYUpPUK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter$1 = () => import("./inventory-BIA9XTqO.mjs");
var Route$1 = createFileRoute("/_authenticated/inventory")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
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
var TONER_COLORS = [
	{
		value: "cyan",
		label: "Cyan",
		swatch: "#06b6d4"
	},
	{
		value: "magenta",
		label: "Magenta",
		swatch: "#d946ef"
	},
	{
		value: "black",
		label: "Black",
		swatch: "#171717"
	},
	{
		value: "yellow",
		label: "Yellow",
		swatch: "#facc15"
	}
];
var TONER_COLOR_VALUES = TONER_COLORS.map((color) => color.value);
function ItemDialog({ item, initialCategory, close, saved }) {
	const [file, setFile] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		category: initialCategory || "Consumable",
		quantity: 0,
		location: IT_WAREHOUSE,
		notes: "",
		color: "",
		image_url: null
	});
	(0, import_react.useEffect)(() => {
		if (item) setForm({
			...item,
			color: TONER_COLOR_VALUES.includes(item.color) ? item.color : ""
		});
	}, [item]);
	const set = (key, value) => setForm((current) => ({
		...current,
		[key]: value
	}));
	const save = async () => {
		if (!form.name?.trim()) return toast.error("اسم العنصر مطلوب");
		if (form.category === "Toner" && !TONER_COLOR_VALUES.includes(form.color)) return toast.error("اختر لون الحبر");
		let image_url = form.image_url || null;
		try {
			if (file) image_url = await uploadInventoryImage(file);
		} catch (error) {
			return toast.error(error instanceof Error ? error.message : "تعذر رفع صورة المنتج");
		}
		const payload = {
			name: form.name.trim(),
			category: form.category,
			color: form.category === "Toner" ? form.color : null,
			location: form.location?.trim() || "المستودع IT",
			notes: form.notes || null,
			image_url
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
							onValueChange: (value) => {
								set("category", value);
								if (value !== "Toner") set("color", "");
							},
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
						label: "لون الحبر",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.color || "",
							onValueChange: (value) => set("color", value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "اختر لون الحبر" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TONER_COLORS.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: color.value,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-3.5 rounded-full border border-black/15",
										style: { backgroundColor: color.swatch }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: color.label })]
								})
							}, color.value)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "مكان الحفظ",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.location || "",
							onChange: (event) => set("location", event.target.value),
							placeholder: IT_WAREHOUSE
						}), !item && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"الموقع الافتراضي هو ",
								"المستودع IT",
								" ويمكنك تغييره."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "ملاحظات",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: form.notes || "",
							onChange: (event) => set("notes", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "صورة المنتج",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 rounded-xl border border-dashed p-4 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrinterImage, {
								path: file ? URL.createObjectURL(file) : form.image_url,
								alt: form.name || "صورة المنتج",
								className: "h-28 w-full rounded-lg sm:w-36",
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-10 opacity-40" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "file",
										accept: "image/*",
										onChange: (event) => setFile(event.target.files?.[0] ?? null)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "الصيغ المدعومة: JPG وPNG وWEBP، بحد أقصى 10 ميغابايت."
									}),
									(file || form.image_url) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "ghost",
										className: "text-destructive",
										onClick: () => {
											setFile(null);
											set("image_url", null);
										},
										children: "إزالة الصورة"
									})
								]
							})]
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
function Field({ label, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-2 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
var $$splitComponentImporter = () => import("./inventory._id-DrUyIm3P.mjs");
var Route = createFileRoute("/_authenticated/inventory/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
export { Route$1 as i, MovementDialog as n, Route as r, ItemDialog as t };

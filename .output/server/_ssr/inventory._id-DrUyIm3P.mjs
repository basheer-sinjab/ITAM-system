import { r as __toESM } from "../_runtime.mjs";
import { a as supabase } from "./client-MMPsyjyK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { E as Package, S as Plus, f as Trash2, j as MapPin, k as Minus, ot as Boxes, st as ArrowRight, w as Pencil, z as History } from "../_libs/lucide-react.mjs";
import { t as Button } from "./input-Dby3FvDq.mjs";
import { t as PrinterImage } from "./PrinterImage-C7FnTavC.mjs";
import { l as ConfirmButton } from "./ConfirmButton-DJ1nXwDY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as MovementDialog, r as Route, t as ItemDialog } from "./inventory._id-BiYUpPUK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory._id-DrUyIm3P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categoryLabels = {
	Consumable: "مستهلكات",
	Toner: "أحبار",
	"Spare Part": "قطع وأدوات"
};
var movementLabels = {
	add: "إضافة كمية",
	use: "استخدام",
	return: "إرجاع",
	adjust: "تعديل"
};
function InventoryItemDetails() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [movementType, setMovementType] = (0, import_react.useState)(null);
	const { data: item, isLoading } = useQuery({
		queryKey: ["inventory-item", id],
		queryFn: async () => (await supabase.from("inventory_items").select("*").eq("id", id).maybeSingle()).data
	});
	const { data: movements = [] } = useQuery({
		queryKey: ["inventory-item-history", id],
		queryFn: async () => (await supabase.from("inventory_movements").select("*").eq("item_id", id).order("movement_date", { ascending: false })).data ?? []
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "جارٍ التحميل…"
	});
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "عنصر المخزون غير موجود."
	});
	const remove = async () => {
		const result = await supabase.from("inventory_items").delete().eq("id", item.id);
		if (result.error) return toast.error(result.error.message);
		queryClient.invalidateQueries();
		toast.success("تم حذف عنصر المخزون");
		navigate({ to: "/inventory" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/inventory",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "العودة إلى المخزون",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "تفاصيل العنصر وسجل حركاته"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setMovementType("add"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "زود الكمية"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							disabled: Number(item.quantity) <= 0,
							onClick: () => setMovementType("use"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "ml-2 size-4" }), "استخدام"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => setEditOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "ml-2 size-4" }), "تعديل"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmButton, {
							variant: "destructive",
							title: "حذف عنصر المخزون",
							description: `سيتم حذف ${item.name} وسجل حركاته.`,
							onConfirm: remove,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "ml-2 size-4" }), "حذف"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrinterImage, {
				path: item.image_url,
				alt: item.name,
				className: "h-64 w-full rounded-xl border",
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-20 opacity-35" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailCard, {
						icon: Package,
						label: "النوع",
						value: categoryLabels[item.category] || item.category || "غير محدد"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailCard, {
						icon: Boxes,
						label: "الكمية المتاحة",
						value: String(item.quantity ?? 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailCard, {
						icon: MapPin,
						label: "مكان الحفظ",
						value: item.location || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailCard, {
						icon: History,
						label: "عدد الحركات",
						value: String(movements.length)
					})
				]
			}),
			item.color && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "لون الحبر"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-medium",
					children: item.color
				})]
			}),
			item.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "ملاحظات"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1",
					children: item.notes
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "سجل حركة المخزون"
					})]
				}), movements.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y",
					children: movements.map((entry) => {
						const used = entry.movement_type === "use";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex flex-wrap items-center justify-between gap-3 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: movementLabels[entry.movement_type] || "حركة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [entry.movement_date, entry.note ? ` · ${entry.note}` : ""]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: used ? "font-semibold text-amber-700" : "font-semibold text-primary",
								children: [used ? "−" : "+", entry.quantity]
							})]
						}, entry.id);
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "لا توجد حركات مسجلة لهذا العنصر."
				})]
			}),
			editOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemDialog, {
				item,
				initialCategory: item.category,
				close: () => setEditOpen(false),
				saved: () => queryClient.invalidateQueries()
			}),
			movementType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovementDialog, {
				item,
				type: movementType,
				close: () => setMovementType(null),
				saved: () => queryClient.invalidateQueries()
			})
		]
	});
}
function DetailCard({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel flex items-center gap-3 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 truncate font-semibold",
				children: value
			})]
		})]
	});
}
//#endregion
export { InventoryItemDetails as component };

import { r as __toESM } from "../_runtime.mjs";
import { a as supabase, i as runWorkflowAction } from "./client-MMPsyjyK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { E as Package, K as ClipboardList, O as Monitor, X as CircleDot, c as UserCog, f as Trash2, n as Wrench, rt as CalendarDays, st as ArrowRight, w as Pencil } from "../_libs/lucide-react.mjs";
import { t as Button } from "./input-Dby3FvDq.mjs";
import { l as ConfirmButton } from "./ConfirmButton-DJ1nXwDY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route, t as MaintenanceForm } from "./maintenance._id-DM7K72-4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/maintenance._id-DP8bpkE2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var typeLabels = {
	Corrective: "تصحيحية",
	Preventive: "وقائية",
	"Toner Replacement": "تغيير حبر",
	"Part Installation": "تركيب قطعة",
	"Part Replacement": "استبدال قطعة"
};
function MaintenanceDetails() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const { data: record, isLoading } = useQuery({
		queryKey: ["maintenance-record", id],
		queryFn: async () => (await supabase.from("asset_maintenance").select("*").eq("id", id).maybeSingle()).data
	});
	const { data: assets = [] } = useQuery({
		queryKey: ["assets"],
		queryFn: async () => (await supabase.from("assets").select("*")).data ?? []
	});
	const { data: inventory = [] } = useQuery({
		queryKey: ["inventory"],
		queryFn: async () => (await supabase.from("inventory_items").select("*").order("name")).data ?? []
	});
	const { data: technicians = [] } = useQuery({
		queryKey: ["technicians"],
		queryFn: async () => (await supabase.from("technicians").select("*").order("name")).data ?? []
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "جارٍ التحميل…"
	});
	if (!record) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "سجل الصيانة غير موجود."
	});
	const asset = assets.find((item) => item.id === record.asset_id);
	const closed = record.status === "Closed";
	const usedItems = Array.isArray(record.used_items) ? record.used_items : [];
	const refresh = () => queryClient.invalidateQueries();
	const remove = async () => {
		try {
			await runWorkflowAction({
				action: "delete-maintenance",
				maintenanceId: record.id
			});
			await refresh();
			toast.success("تم حذف سجل الصيانة وإرجاع مواده إلى المخزون");
			navigate({ to: "/maintenance" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذر حذف سجل الصيانة");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/maintenance",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "العودة إلى الصيانة",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm font-bold text-primary",
							children: record.reference_number || "MNT-—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-1 text-2xl font-bold",
							children: ["سجل صيانة ", asset?.name || "أصل"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "جميع تفاصيل العملية والمواد المستخدمة في مكان واحد"
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => setEditOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "ml-2 size-4" }), "تعديل السجل"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmButton, {
						variant: "destructive",
						title: "حذف سجل الصيانة",
						description: `سيتم حذف ${record.reference_number || "السجل"} وإرجاع المواد المستخدمة إلى المخزون.`,
						onConfirm: remove,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "ml-2 size-4" }), "حذف"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
						icon: CircleDot,
						label: "الحالة",
						value: closed ? "مغلقة" : "مفتوحة",
						tone: closed ? "emerald" : "amber"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
						icon: CalendarDays,
						label: "تاريخ الصيانة",
						value: record.maintenance_date || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
						icon: Wrench,
						label: "نوع الصيانة",
						value: typeLabels[record.maintenance_type] || record.maintenance_type || "—"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel grid gap-6 p-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "mt-1 size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "الأصل"
						}),
						asset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/assets/$id",
							params: { id: asset.id },
							className: "mt-1 block font-semibold text-primary hover:underline",
							children: asset.name
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-semibold",
							children: "أصل غير متوفر"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-xs text-muted-foreground",
							children: asset?.asset_id || asset?.serial_number || "—"
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCog, { className: "mt-1 size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "الفني المسؤول"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-semibold",
						children: record.technician || "غير محدد"
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextPanel, {
						title: "وصف المشكلة",
						value: record.problem_description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextPanel, {
						title: "الحل المنفذ",
						value: record.resolution
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextPanel, {
						title: "ملاحظات",
						value: record.notes
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 border-b p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "مواد وقطع الصيانة"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground",
						children: [usedItems.length, " عنصر"]
					})]
				}), usedItems.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y",
					children: usedItems.map((used, index) => {
						const item = inventory.find((entry) => entry.id === (used.id || used.item_id));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: item?.name || "عنصر مخزون"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: item?.category || "—"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-primary/10 px-3 py-1 font-semibold text-primary",
								children: Number(used.quantity || 0)
							})]
						}, `${used.id || used.item_id}-${index}`);
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "لم تُستخدم مواد من المخزون في هذا السجل."
				})]
			}),
			editOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaintenanceForm, {
				record,
				assets,
				inventory,
				technicians,
				close: () => setEditOpen(false),
				saved: refresh
			})
		]
	});
}
function InfoCard({ icon: Icon, label, value, tone = "blue" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel flex items-center gap-3 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `flex size-10 shrink-0 items-center justify-center rounded-lg ${{
				blue: "bg-primary/10 text-primary",
				emerald: "bg-emerald-500/10 text-emerald-700",
				amber: "bg-amber-500/10 text-amber-700"
			}[tone]}`,
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
function TextPanel({ title, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "surface-panel min-h-36 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-2 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4" }), title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 whitespace-pre-wrap leading-7",
			children: value || "—"
		})]
	});
}
//#endregion
export { MaintenanceDetails as component };

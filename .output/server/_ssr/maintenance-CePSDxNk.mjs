import { r as __toESM } from "../_runtime.mjs";
import { a as supabase, i as runWorkflowAction } from "./client-MMPsyjyK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as useRouterState, p as Outlet, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as Plus, X as CircleDot, Z as CircleCheck, c as UserCog, et as ChevronLeft, f as Trash2, n as Wrench, rt as CalendarDays, v as Search, w as Pencil } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { t as Label } from "./label-DF0aFIxM.mjs";
import { t as Textarea } from "./textarea-DVSIcTTN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-DU8Jfcwy.mjs";
import { l as ConfirmButton } from "./ConfirmButton-DJ1nXwDY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as MetricCard, t as ManagementHeader } from "./ManagementVisuals-DCDYFpP2.mjs";
import { n as inventoryAdjustment } from "./data-rules-CWdMDUU9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/maintenance-CePSDxNk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAINTENANCE_TYPES = {
	Corrective: "تصحيحية",
	Preventive: "وقائية",
	"Toner Replacement": "تغيير حبر",
	"Part Installation": "تركيب قطعة",
	"Part Replacement": "استبدال قطعة"
};
function assetLabel(asset) {
	return `${asset.name} - ${asset.asset_id || asset.serial_number || asset.id}`;
}
function movementItems(items = []) {
	return items.map((item) => ({
		item_id: item.item_id || item.id,
		quantity: Number(item.quantity) || 0
	}));
}
function Maintenance() {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const [record, setRecord] = (0, import_react.useState)();
	const [maintenanceSearch, setMaintenanceSearch] = (0, import_react.useState)("");
	const [activeStatus, setActiveStatus] = (0, import_react.useState)("all");
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
	const { data: technicians = [] } = useQuery({
		queryKey: ["technicians"],
		queryFn: async () => (await supabase.from("technicians").select("*").order("name")).data ?? []
	});
	const openRecords = records.filter((record) => record.status === "Open").length;
	const closedRecords = records.length - openRecords;
	const visibleRecords = records.filter((maintenanceRecord) => {
		const asset = assets.find((item) => item.id === maintenanceRecord.asset_id);
		const search = maintenanceSearch.trim().toLowerCase();
		const matchesSearch = !search || [
			asset?.name,
			asset?.asset_id,
			maintenanceRecord.technician,
			maintenanceRecord.maintenance_type,
			maintenanceRecord.reference_number,
			maintenanceRecord.resolution,
			maintenanceRecord.maintenance_date
		].some((value) => String(value ?? "").toLowerCase().includes(search));
		const matchesStatus = activeStatus === "all" || maintenanceRecord.status === activeStatus;
		return matchesSearch && matchesStatus;
	});
	const removeRecord = async (maintenanceRecord) => {
		try {
			await runWorkflowAction({
				action: "delete-maintenance",
				maintenanceId: maintenanceRecord.id
			});
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذر حذف سجل الصيانة");
			return;
		}
		await qc.invalidateQueries();
		toast.success("تم حذف سجل الصيانة");
	};
	if (pathname !== "/maintenance") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagementHeader, {
				icon: Wrench,
				title: "سجلات الصيانة",
				description: "الصيانة الوقائية والتصحيحية للأصول",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setRecord({}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة سجل"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: Wrench,
						label: "إجمالي السجلات",
						value: records.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: CircleDot,
						label: "صيانة مفتوحة",
						value: openRecords,
						tone: "amber"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: CircleCheck,
						label: "صيانة مغلقة",
						value: closedRecords,
						tone: "emerald"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-lg border bg-muted/30 p-3 sm:flex-row-reverse sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: maintenanceSearch,
						onChange: (event) => setMaintenanceSearch(event.target.value),
						placeholder: "ابحث في الصيانة أو الجهاز أو الفني",
						className: "bg-background pr-9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						["all", "الكل"],
						["Open", "مفتوحة"],
						["Closed", "مغلقة"]
					].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: activeStatus === value ? "default" : "ghost",
						onClick: () => setActiveStatus(value),
						children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mr-2 text-xs opacity-70",
							children: [
								"(",
								value === "all" ? records.length : records.filter((item) => item.status === value).length,
								")"
							]
						})]
					}, value))
				})]
			}),
			visibleRecords.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: visibleRecords.map((maintenanceRecord) => {
					const asset = assets.find((item) => item.id === maintenanceRecord.asset_id);
					const closed = maintenanceRecord.status === "Closed";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						role: "link",
						tabIndex: 0,
						className: "surface-panel interactive-card group cursor-pointer overflow-hidden p-0 hover:interactive-card-hover",
						onClick: () => navigate({
							to: "/maintenance/$id",
							params: { id: maintenanceRecord.id }
						}),
						onKeyDown: (event) => {
							if (event.key === "Enter") navigate({
								to: "/maintenance/$id",
								params: { id: maintenanceRecord.id }
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b bg-muted/25 p-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-sm font-bold text-primary",
										children: maintenanceRecord.reference_number || "MNT-—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 font-semibold",
										children: asset?.name || "أصل غير متوفر"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-xs text-muted-foreground",
										children: asset?.asset_id || asset?.serial_number || "—"
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "mt-1 size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-md px-2.5 py-1 text-xs font-medium ${closed ? "bg-emerald-500/10 text-emerald-700" : "bg-amber-500/10 text-amber-700"}`,
									children: closed ? "مغلقة" : "مفتوحة"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground",
									children: MAINTENANCE_TYPES[maintenanceRecord.maintenance_type] || maintenanceRecord.maintenance_type
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaintenanceMeta, {
									icon: CalendarDays,
									label: "التاريخ",
									value: maintenanceRecord.maintenance_date || "—"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaintenanceMeta, {
									icon: UserCog,
									label: "الفني",
									value: maintenanceRecord.technician || "غير محدد"
								})]
							})]
						})]
					}, maintenanceRecord.id);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel flex flex-col items-center justify-center gap-3 py-14 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-10 text-muted-foreground/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "لا توجد سجلات صيانة مطابقة"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "غيّر البحث أو الحالة، أو أضف سجل صيانة جديدًا."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
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
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visibleRecords.map((maintenanceRecord) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b transition-colors hover:bg-muted/50",
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
								children: MAINTENANCE_TYPES[maintenanceRecord.maintenance_type] || maintenanceRecord.maintenance_type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: maintenanceRecord.status === "Closed" ? "rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700" : "rounded-md bg-amber-500/10 px-2 py-1 text-xs text-amber-700",
									children: maintenanceRecord.status === "Closed" ? "مغلقة" : "مفتوحة"
								})
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									"aria-label": "تعديل السجل",
									onClick: (event) => {
										event.stopPropagation();
										setRecord(maintenanceRecord);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
									size: "icon",
									variant: "ghost",
									"aria-label": "حذف السجل",
									title: "حذف سجل الصيانة؟",
									description: "سيتم حذف السجل وإرجاع المواد المستخدمة إلى المخزون.",
									onConfirm: () => removeRecord(maintenanceRecord),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
								})]
							})
						]
					}, maintenanceRecord.id)) })]
				}), !visibleRecords.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "لا توجد صيانات مطابقة."
				})]
			}),
			record && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaintenanceForm, {
				record,
				assets,
				inventory,
				technicians,
				close: () => setRecord(void 0),
				saved: () => qc.invalidateQueries()
			}, record.id ?? "new")
		]
	});
}
function MaintenanceMeta({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 items-start gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 truncate font-medium",
				children: value
			})]
		})]
	});
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
//#endregion
export { MaintenanceForm, Maintenance as component };

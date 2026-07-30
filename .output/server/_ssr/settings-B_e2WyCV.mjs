import { i as __toESM } from "../_runtime.mjs";
import { n as supabase, t as cn } from "./utils-DyqBgkKx.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { S as Check, a as Trash2, f as Plus, p as Pencil, t as X } from "../_libs/lucide-react.mjs";
import { n as Input, r as Label, t as Button } from "./label-Cn_DzMXP.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DtErF-Ot.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-B_e2WyCV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function SettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: "الإعدادات"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "القوائم الأساسية وتنبيهات النظام"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "branches",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "branches",
						children: "الفروع"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "departments",
						children: "الأقسام"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "persons",
						children: "الأشخاص المسؤولون"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "parts",
						children: "قطع الغيار"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "alerts",
						children: "التنبيهات"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "branches",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookupManager, {
						table: "branches",
						title: "الفروع"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "departments",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookupManager, {
						table: "departments",
						title: "الأقسام"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "persons",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookupManager, {
						table: "responsible_persons",
						title: "الأشخاص المسؤولون"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "parts",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookupManager, {
						table: "parts",
						title: "قطع الغيار"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "alerts",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertSettings, {})
				})
			]
		})]
	});
}
function LookupManager({ table, title }) {
	const qc = useQueryClient();
	const [name, setName] = (0, import_react.useState)("");
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [editName, setEditName] = (0, import_react.useState)("");
	const { data: rows } = useQuery({
		queryKey: [table],
		queryFn: async () => (await supabase.from(table).select("*").order("name")).data ?? []
	});
	const add = useMutation({
		mutationFn: async () => {
			if (!name.trim()) throw new Error("الاسم مطلوب");
			const { error } = await supabase.from(table).insert({ name: name.trim() });
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries();
			setName("");
			toast.success("تمت الإضافة");
		},
		onError: (e) => toast.error(e.message)
	});
	const update = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from(table).update({ name: editName.trim() }).eq("id", editId);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries();
			setEditId(null);
			toast.success("تم التعديل");
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from(table).delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries();
			toast.success("تم الحذف");
		},
		onError: () => toast.error("لا يمكن الحذف — العنصر مستخدم في سجلات أخرى")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel max-w-2xl space-y-4 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: `إضافة إلى ${title}`,
					value: name,
					onChange: (e) => setName(e.target.value),
					onKeyDown: (e) => e.key === "Enter" && add.mutate()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-2",
					onClick: () => add.mutate(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "إضافة"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "divide-y rounded-lg border",
				children: [(rows ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "p-4 text-center text-sm text-muted-foreground",
					children: "لا توجد عناصر."
				}), (rows ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex items-center justify-between gap-2 p-3",
					children: editId === r.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: editName,
						onChange: (e) => setEditName(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => update.mutate(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => setEditId(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => {
								setEditId(r.id);
								setEditName(r.name);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => remove.mutate(r.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
						})]
					})] })
				}, r.id))]
			})
		]
	});
}
function AlertSettings() {
	const qc = useQueryClient();
	const { data: settings } = useQuery({
		queryKey: ["app_settings"],
		queryFn: async () => (await supabase.from("app_settings").select("*").eq("id", true).maybeSingle()).data
	});
	const [draft, setDraft] = (0, import_react.useState)(null);
	const current = draft ?? (settings ? {
		low_stock_threshold: settings.low_stock_threshold,
		warranty_alert_days: settings.warranty_alert_days,
		dashboard_alerts_enabled: settings.dashboard_alerts_enabled
	} : {
		low_stock_threshold: 2,
		warranty_alert_days: 30,
		dashboard_alerts_enabled: true
	});
	const save = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("app_settings").upsert({
				id: true,
				...current
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries();
			toast.success("تم حفظ الإعدادات");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel max-w-xl space-y-5 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: "إعدادات التنبيهات"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "حد التنبيه الافتراضي لنقص الحبر" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					value: current.low_stock_threshold,
					onChange: (e) => setDraft({
						...current,
						low_stock_threshold: Number(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "التنبيه قبل انتهاء الضمان (أيام)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					value: current.warranty_alert_days,
					onChange: (e) => setDraft({
						...current,
						warranty_alert_days: Number(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-lg border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "تنبيهات لوحة التحكم"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "إظهار تنبيهات النقص والضمان داخل النظام"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: current.dashboard_alerts_enabled,
					onCheckedChange: (v) => setDraft({
						...current,
						dashboard_alerts_enabled: v
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => save.mutate(),
				disabled: save.isPending,
				children: "حفظ الإعدادات"
			})
		]
	});
}
//#endregion
export { SettingsPage as component };

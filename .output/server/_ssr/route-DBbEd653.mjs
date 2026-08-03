import { r as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-Du3ze5ZY.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, p as Outlet, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as FileChartColumnIncreasing, C as Monitor, D as KeyRound, E as LayoutDashboard, a as UserRound, h as Search, n as Wrench, p as Settings, r as Users, x as Package } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, t as Dialog } from "./dialog-B8OAifVF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-DBbEd653.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SOURCES = [
	{
		key: "assets",
		table: "assets",
		icon: Monitor,
		title: (item) => item.name,
		subtitle: (item) => item.asset_id || item.serial_number,
		to: (item) => `/assets/${item.id}`
	},
	{
		key: "employees",
		table: "employees",
		icon: UserRound,
		title: (item) => item.full_name,
		subtitle: (item) => item.employee_number || item.email,
		to: (item) => `/people-departments/employee/${item.id}`
	},
	{
		key: "inventory",
		table: "inventory_items",
		icon: Package,
		title: (item) => item.name,
		subtitle: (item) => `الكمية: ${item.quantity}`,
		to: () => "/inventory"
	},
	{
		key: "licenses",
		table: "licenses",
		icon: KeyRound,
		title: (item) => item.license_name,
		subtitle: (item) => item.product_name,
		to: (item) => `/licenses/${item.id}`
	},
	{
		key: "maintenance",
		table: "asset_maintenance",
		icon: Wrench,
		title: (item) => item.problem_description || "سجل صيانة",
		subtitle: (item) => item.maintenance_date,
		to: () => "/maintenance"
	}
];
function GlobalSearch() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const { data = {} } = useQuery({
		queryKey: ["global-search-data"],
		enabled: open,
		queryFn: async () => Object.fromEntries(await Promise.all(SOURCES.map(async (source) => [source.key, (await supabase.from(source.table).select("*")).data ?? []])))
	});
	const results = (0, import_react.useMemo)(() => {
		const term = search.trim().toLowerCase();
		if (term.length < 2) return [];
		return SOURCES.flatMap((source) => (data[source.key] || []).filter((item) => Object.values(item).some((value) => String(value ?? "").toLowerCase().includes(term))).slice(0, 5).map((item) => ({
			source,
			item
		}))).slice(0, 18);
	}, [data, search]);
	const go = (path) => {
		setOpen(false);
		setSearch("");
		navigate({ to: path });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "outline",
		className: "hidden w-72 justify-start gap-2 text-muted-foreground lg:flex",
		onClick: () => setOpen(true),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), "بحث عام في النظام"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "البحث العام" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						className: "pr-9",
						value: search,
						onChange: (event) => setSearch(event.target.value),
						placeholder: "ابحث عن أصل، موظف، ترخيص، صيانة أو عنصر مخزون…"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[55vh] space-y-1 overflow-y-auto",
					children: [
						results.map(({ source, item }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex w-full items-center gap-3 rounded-lg p-3 text-right hover:bg-muted",
							onClick: () => go(source.to(item)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(source.icon, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium",
								children: source.title(item)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted-foreground",
								children: source.subtitle(item) || "—"
							})] })]
						}, `${source.key}-${item.id}`)),
						search.trim().length >= 2 && !results.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-10 text-center text-sm text-muted-foreground",
							children: "لا توجد نتائج مطابقة."
						}),
						search.trim().length < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-10 text-center text-sm text-muted-foreground",
							children: "اكتب حرفين على الأقل للبحث في كل النظام."
						})
					]
				})
			]
		})
	})] });
}
var NAV = [
	{
		to: "/",
		label: "لوحة التحكم",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/assets",
		label: "الأصول",
		icon: Monitor,
		exact: false
	},
	{
		to: "/maintenance",
		label: "الصيانة",
		icon: Wrench,
		exact: false
	},
	{
		to: "/inventory",
		label: "المخزون",
		icon: Package,
		exact: false
	},
	{
		to: "/licenses",
		label: "التراخيص",
		icon: KeyRound,
		exact: false
	},
	{
		to: "/people-departments",
		label: "الموظفون والأقسام",
		icon: Users,
		exact: false
	},
	{
		to: "/reports",
		label: "التقارير",
		icon: FileChartColumnIncreasing,
		exact: true
	}
];
var SECONDARY_NAV = [{
	to: "/settings",
	label: "الإعدادات",
	icon: Settings,
	exact: true
}];
function AppLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "no-print sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-l border-sidebar-border/70 bg-sidebar text-sidebar-foreground lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-6 py-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/printersfloss-logo.png",
						alt: "ITAMFloss",
						className: "size-11 shrink-0 object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-bold leading-tight",
						children: "ITAMFloss"
					}) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 space-y-1 px-4",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						activeOptions: { exact: item.exact },
						className: "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-sidebar-foreground/70 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-primary data-[status=active]:text-sidebar-primary-foreground data-[status=active]:shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-[18px]" }), item.label]
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "border-t border-sidebar-border/70 px-4 py-4",
					children: SECONDARY_NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						activeOptions: { exact: item.exact },
						className: "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-sidebar-foreground/70 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-primary data-[status=active]:text-sidebar-primary-foreground data-[status=active]:shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-[18px]" }), item.label]
					}, item.to))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "no-print flex items-center justify-between gap-4 border-b bg-card px-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex min-w-0 items-center gap-2 overflow-x-auto lg:hidden",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							activeOptions: { exact: item.exact },
							className: "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground",
							children: item.label
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalSearch, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/printersfloss-header-logo.png",
						alt: "ITAMFloss",
						className: "size-10 shrink-0 object-contain"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-5 py-7 lg:px-10 lg:py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { AppLayout as component };

import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Droplets, c as Settings, d as Printer, g as FileText, h as LayoutDashboard, r as Truck } from "../_libs/lucide-react.mjs";
import { d as Outlet, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-DBUvqxx9.js
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/",
		label: "لوحة التحكم",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/printers",
		label: "الطابعات",
		icon: Printer,
		exact: false
	},
	{
		to: "/toners",
		label: "مخزون الأحبار",
		icon: Droplets,
		exact: false
	},
	{
		to: "/suppliers",
		label: "الموردون",
		icon: Truck,
		exact: false
	},
	{
		to: "/reports",
		label: "التقارير",
		icon: FileText,
		exact: false
	},
	{
		to: "/settings",
		label: "الإعدادات",
		icon: Settings,
		exact: false
	}
];
function AppLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "no-print sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-6 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold leading-tight",
					children: "إدارة الطابعات"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-sidebar-foreground/60",
					children: "لوحة التحكم"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 space-y-1 px-3",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					activeOptions: { exact: item.exact },
					className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-primary data-[status=active]:text-sidebar-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
				}, item.to))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "no-print flex items-center gap-2 overflow-x-auto border-b bg-card px-4 py-2 lg:hidden",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					activeOptions: { exact: item.exact },
					className: "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground",
					children: item.label
				}, item.to))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-4 py-6 lg:px-8 lg:py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { AppLayout as component };

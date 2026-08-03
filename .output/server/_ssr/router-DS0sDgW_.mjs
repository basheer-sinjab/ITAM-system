import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, c as HeadContent, d as createRouter, g as createRootRouteWithContext, h as createFileRoute, m as lazyRouteComponent, p as Outlet, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as Route$11, r as Route$1$1 } from "./assets._id-DFmy_CXj.mjs";
import { t as Route$12 } from "./licenses._id-CcZfH59U.mjs";
import { t as Route$13 } from "./people-departments-BcPSZNvT.mjs";
import { t as Route$14 } from "./people-departments._id-DqmKplcE.mjs";
import { t as Route$15 } from "./people-departments.employee._id-PFNEmrm7.mjs";
import { t as Route$16 } from "./printers._id-Dd3PQ7r0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DS0sDgW_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-Deg_lX8A.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "الصفحة غير موجودة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "الصفحة التي تبحث عنها غير متوفرة أو تم نقلها."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "العودة للرئيسية"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "تعذر تحميل الصفحة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "حدث خطأ غير متوقع. يمكنك المحاولة مرة أخرى أو العودة للرئيسية."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "إعادة المحاولة"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "الرئيسية"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "PrintersFloss" },
			{
				name: "description",
				content: "PrintersFloss لإدارة الطابعات والأحبار والصيانة داخل الشركة."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			dir: "rtl"
		})]
	});
}
var $$splitComponentImporter$9 = () => import("./route-DBbEd653.mjs");
var Route$9 = createFileRoute("/_authenticated")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_authenticated-krc6ka81.mjs");
var Route$8 = createFileRoute("/_authenticated/")({
	head: () => ({ meta: [{ title: "لوحة التحكم — PrintersFloss" }, {
		name: "description",
		content: "نظرة تشغيلية على أصول تقنية المعلومات."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./inventory-CEoW-1hf.mjs");
var Route$7 = createFileRoute("/_authenticated/inventory")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./licenses-BnP-9fkd.mjs");
var Route$6 = createFileRoute("/_authenticated/licenses")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./maintenance-Trss_SQ1.mjs");
var Route$5 = createFileRoute("/_authenticated/maintenance")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./reports-CIOHOHtW.mjs");
var Route$4 = createFileRoute("/_authenticated/reports")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./settings-BN2JNYHT.mjs");
var Route$3 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [
		{ title: "الإعدادات — ITAMFloss" },
		{
			name: "description",
			content: "إدارة الفروع والفنيين والتنبيهات والبيانات المحلية."
		},
		{
			property: "og:title",
			content: "الإعدادات — ITAMFloss"
		},
		{
			property: "og:description",
			content: "ضبط القوائم الأساسية والتنبيهات والنسخ الاحتياطي."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./suppliers-DxMTDZ5M.mjs");
var Route$2 = createFileRoute("/_authenticated/suppliers")({
	head: () => ({ meta: [
		{ title: "الموردون — PrintersFloss" },
		{
			name: "description",
			content: "سجل موردي الأحبار وقطع الغيار مع بيانات التواصل."
		},
		{
			property: "og:title",
			content: "الموردون — PrintersFloss"
		},
		{
			property: "og:description",
			content: "إدارة بيانات الموردين وربطهم بالأحبار."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./toners-CZQSUeYD.mjs");
var Route$1 = createFileRoute("/_authenticated/toners")({
	head: () => ({ meta: [
		{ title: "مخزون الأحبار — PrintersFloss" },
		{
			name: "description",
			content: "إدارة أنواع الأحبار والكميات المتوفرة وحد التنبيه وإدخالات المخزون."
		},
		{
			property: "og:title",
			content: "مخزون الأحبار — PrintersFloss"
		},
		{
			property: "og:description",
			content: "تتبع كميات الأحبار وتنبيهات النقص وسجل الإدخالات."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./printers.index-B1XKXQJL.mjs");
var Route = createFileRoute("/_authenticated/printers/")({
	head: () => ({ meta: [
		{ title: "الطابعات — PrintersFloss" },
		{
			name: "description",
			content: "استعرض وابحث وأدر جميع طابعات الشركة مع حالتها وأقسامها."
		},
		{
			property: "og:title",
			content: "الطابعات — PrintersFloss"
		},
		{
			property: "og:description",
			content: "قائمة الطابعات مع البحث والتصفية."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var AuthenticatedRouteRoute = Route$9.update({
	id: "/_authenticated",
	getParentRoute: () => Route$10
});
var AuthenticatedIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedInventoryRoute = Route$7.update({
	id: "/inventory",
	path: "/inventory",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLicensesRoute = Route$6.update({
	id: "/licenses",
	path: "/licenses",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMaintenanceRoute = Route$5.update({
	id: "/maintenance",
	path: "/maintenance",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPeopleDepartmentsRoute = Route$13.update({
	id: "/people-departments",
	path: "/people-departments",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedReportsRoute = Route$4.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$3.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSuppliersRoute = Route$2.update({
	id: "/suppliers",
	path: "/suppliers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTonersRoute = Route$1.update({
	id: "/toners",
	path: "/toners",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAssetsIndexRoute = Route$1$1.update({
	id: "/assets/",
	path: "/assets/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAssetsIdRoute = Route$11.update({
	id: "/assets/$id",
	path: "/assets/$id",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLicensesIdRoute = Route$12.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedLicensesRoute
});
var AuthenticatedPeopleDepartmentsIdRoute = Route$14.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedPeopleDepartmentsRoute
});
var AuthenticatedPrintersIndexRoute = Route.update({
	id: "/printers/",
	path: "/printers/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPrintersIdRoute = Route$16.update({
	id: "/printers/$id",
	path: "/printers/$id",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPeopleDepartmentsEmployeeIdRoute = Route$15.update({
	id: "/employee/$id",
	path: "/employee/$id",
	getParentRoute: () => AuthenticatedPeopleDepartmentsRoute
});
var AuthenticatedLicensesRouteChildren = { AuthenticatedLicensesIdRoute };
var AuthenticatedLicensesRouteWithChildren = AuthenticatedLicensesRoute._addFileChildren(AuthenticatedLicensesRouteChildren);
var AuthenticatedPeopleDepartmentsRouteChildren = {
	AuthenticatedPeopleDepartmentsIdRoute,
	AuthenticatedPeopleDepartmentsEmployeeIdRoute
};
var AuthenticatedRouteRouteChildren = {
	AuthenticatedInventoryRoute,
	AuthenticatedLicensesRoute: AuthenticatedLicensesRouteWithChildren,
	AuthenticatedMaintenanceRoute,
	AuthenticatedPeopleDepartmentsRoute: AuthenticatedPeopleDepartmentsRoute._addFileChildren(AuthenticatedPeopleDepartmentsRouteChildren),
	AuthenticatedReportsRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedSuppliersRoute,
	AuthenticatedTonersRoute,
	AuthenticatedIndexRoute,
	AuthenticatedAssetsIdRoute,
	AuthenticatedPrintersIdRoute,
	AuthenticatedAssetsIndexRoute,
	AuthenticatedPrintersIndexRoute
};
var rootRouteChildren = { AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren) };
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

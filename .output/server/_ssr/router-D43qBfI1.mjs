import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, c as HeadContent, d as createRouter, g as createRootRouteWithContext, h as createFileRoute, m as lazyRouteComponent, p as Outlet, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as Route$7, r as Route$1$1 } from "./assets._id-DNWKbhIJ.mjs";
import { i as Route$1$8, r as Route$9 } from "./inventory._id-BiYUpPUK.mjs";
import { t as Route$8 } from "./licenses._id-CBEfUtr-.mjs";
import { n as Route$11, r as Route$1$10 } from "./maintenance._id-DM7K72-4.mjs";
import { t as Route$12 } from "./people-departments-fJ9_DNAg.mjs";
import { t as Route$10 } from "./people-departments._id-DW7CKsW_.mjs";
import { t as Route$13 } from "./people-departments.employee._id-C40WrCpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D43qBfI1.js
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
var styles_default = "/assets/styles-C9E116A1.css";
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
var Route$6 = createRootRouteWithContext()({
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
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			dir: "rtl"
		})]
	});
}
var $$splitComponentImporter$5 = () => import("./route-DPNg-0BT.mjs");
var Route$5 = createFileRoute("/_authenticated")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./login-DTcC03mL.mjs");
var Route$4 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("../_authenticated-CI2kEk0z.mjs");
var Route$3 = createFileRoute("/_authenticated/")({
	head: () => ({ meta: [{ title: "لوحة التحكم — PrintersFloss" }, {
		name: "description",
		content: "نظرة تشغيلية على أصول تقنية المعلومات."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./licenses-DHRz1DCs.mjs");
var Route$2 = createFileRoute("/_authenticated/licenses")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./reports-CD1vbsvK.mjs");
var Route$1 = createFileRoute("/_authenticated/reports")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./settings-tAe_Q0-D.mjs");
var Route = createFileRoute("/_authenticated/settings")({
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
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var AuthenticatedRouteRoute = Route$5.update({
	id: "/_authenticated",
	getParentRoute: () => Route$6
});
var LoginRoute = Route$4.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$6
});
var AuthenticatedIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedInventoryRoute = Route$1$8.update({
	id: "/inventory",
	path: "/inventory",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLicensesRoute = Route$2.update({
	id: "/licenses",
	path: "/licenses",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMaintenanceRoute = Route$1$10.update({
	id: "/maintenance",
	path: "/maintenance",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPeopleDepartmentsRoute = Route$12.update({
	id: "/people-departments",
	path: "/people-departments",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedReportsRoute = Route$1.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAssetsIndexRoute = Route$1$1.update({
	id: "/assets/",
	path: "/assets/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAssetsIdRoute = Route$7.update({
	id: "/assets/$id",
	path: "/assets/$id",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedInventoryIdRoute = Route$9.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedInventoryRoute
});
var AuthenticatedLicensesIdRoute = Route$8.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedLicensesRoute
});
var AuthenticatedMaintenanceIdRoute = Route$11.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedMaintenanceRoute
});
var AuthenticatedPeopleDepartmentsIdRoute = Route$10.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedPeopleDepartmentsRoute
});
var AuthenticatedPeopleDepartmentsEmployeeIdRoute = Route$13.update({
	id: "/employee/$id",
	path: "/employee/$id",
	getParentRoute: () => AuthenticatedPeopleDepartmentsRoute
});
var AuthenticatedInventoryRouteChildren = { AuthenticatedInventoryIdRoute };
var AuthenticatedInventoryRouteWithChildren = AuthenticatedInventoryRoute._addFileChildren(AuthenticatedInventoryRouteChildren);
var AuthenticatedLicensesRouteChildren = { AuthenticatedLicensesIdRoute };
var AuthenticatedLicensesRouteWithChildren = AuthenticatedLicensesRoute._addFileChildren(AuthenticatedLicensesRouteChildren);
var AuthenticatedMaintenanceRouteChildren = { AuthenticatedMaintenanceIdRoute };
var AuthenticatedMaintenanceRouteWithChildren = AuthenticatedMaintenanceRoute._addFileChildren(AuthenticatedMaintenanceRouteChildren);
var AuthenticatedPeopleDepartmentsRouteChildren = {
	AuthenticatedPeopleDepartmentsIdRoute,
	AuthenticatedPeopleDepartmentsEmployeeIdRoute
};
var AuthenticatedRouteRouteChildren = {
	AuthenticatedInventoryRoute: AuthenticatedInventoryRouteWithChildren,
	AuthenticatedLicensesRoute: AuthenticatedLicensesRouteWithChildren,
	AuthenticatedMaintenanceRoute: AuthenticatedMaintenanceRouteWithChildren,
	AuthenticatedPeopleDepartmentsRoute: AuthenticatedPeopleDepartmentsRoute._addFileChildren(AuthenticatedPeopleDepartmentsRouteChildren),
	AuthenticatedReportsRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedIndexRoute,
	AuthenticatedAssetsIdRoute,
	AuthenticatedAssetsIndexRoute
};
var rootRouteChildren = {
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	LoginRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
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

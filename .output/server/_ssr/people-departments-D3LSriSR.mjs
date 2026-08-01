import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-departments-D3LSriSR.js
var $$splitComponentImporter = () => import("./people-departments-Cuc0JYpJ.mjs");
var Route = createFileRoute("/_authenticated/people-departments")({
	validateSearch: (search) => ({ tab: search.tab === "departments" ? "departments" : "employees" }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

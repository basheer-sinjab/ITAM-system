import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-departments-CjPHOd-Y.js
var $$splitComponentImporter = () => import("./people-departments-Cg2zRT4z.mjs");
var Route = createFileRoute("/_authenticated/people-departments")({
	validateSearch: (search) => ({ tab: search.tab === "departments" ? "departments" : "employees" }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

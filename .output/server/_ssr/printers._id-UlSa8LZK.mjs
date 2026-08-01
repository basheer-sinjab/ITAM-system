import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/printers._id-UlSa8LZK.js
var $$splitComponentImporter = () => import("./printers._id-DORRJ4yw.mjs");
var Route = createFileRoute("/_authenticated/printers/$id")({
	head: () => ({ meta: [
		{ title: "تفاصيل الطابعة — PrintersFloss" },
		{
			name: "description",
			content: "بيانات الطابعة وسجل الأحبار والصيانة والنقل."
		},
		{
			property: "og:title",
			content: "تفاصيل الطابعة — PrintersFloss"
		},
		{
			property: "og:description",
			content: "بيانات الطابعة وسجل الأحبار والصيانة والنقل."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/printers._id-Dq66Jz_6.js
var $$splitComponentImporter = () => import("./printers._id-C_uA-rn0.mjs");
var Route = createFileRoute("/_authenticated/printers/$id")({
	head: () => ({ meta: [
		{ title: "تفاصيل الطابعة — نظام إدارة الطابعات" },
		{
			name: "description",
			content: "بيانات الطابعة وسجل الأحبار والصيانة والنقل ورمز QR."
		},
		{
			property: "og:title",
			content: "تفاصيل الطابعة — نظام إدارة الطابعات"
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

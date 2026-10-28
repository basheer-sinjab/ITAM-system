globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { a as toEventHandler, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"836-YxZNi/cCCqwo3/YGHEkjT1K+ra0\"",
		"mtime": "2026-07-30T14:39:53.521Z",
		"size": 2102,
		"path": "../public/favicon.ico"
	},
	"/printers-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printers-desktop.ico"
	},
	"/assets/arrow-right-DNJwBKfT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-cJv0Zc38qmmtLmGVnGQsCsl3w44\"",
		"mtime": "2026-08-07T17:12:53.222Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DNJwBKfT.js"
	},
	"/assets/arrow-left-C0b-WU-S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-zHqr6yypol1kTrXDw/slHWzSk6o\"",
		"mtime": "2026-08-07T17:12:53.222Z",
		"size": 165,
		"path": "../public/assets/arrow-left-C0b-WU-S.js"
	},
	"/assets/assets.index-Bre90PHE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e42-nqFkZ4XTqMMH1mrrUs4cMhTTDk8\"",
		"mtime": "2026-08-07T17:12:53.226Z",
		"size": 11842,
		"path": "../public/assets/assets.index-Bre90PHE.js"
	},
	"/printersfloss-logo.png": {
		"type": "image/png",
		"etag": "\"10aca-aGgFSVCPARwWXZk3Z37qOnn6598\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 68298,
		"path": "../public/printersfloss-logo.png"
	},
	"/printersfloss-header-logo.png": {
		"type": "image/png",
		"etag": "\"17971-FayePHPhIcKRbNasS0Eze8y8ncU\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 96625,
		"path": "../public/printersfloss-header-logo.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T13:12:02.444Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/printersfloss-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printersfloss-desktop.ico"
	},
	"/assets/chevron-left-clrR8Ap6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-wc0ZwnyihXSD5uB7oS3Vv3mRjN4\"",
		"mtime": "2026-08-07T17:12:53.230Z",
		"size": 130,
		"path": "../public/assets/chevron-left-clrR8Ap6.js"
	},
	"/assets/assets._id-D4da0EeY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c0aa-I13p9XPUmQKtfF05uEMMFkACgvY\"",
		"mtime": "2026-08-07T17:12:53.224Z",
		"size": 49322,
		"path": "../public/assets/assets._id-D4da0EeY.js"
	},
	"/assets/circle-check-CRQN4vvI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-wLjMGqav0OPYKaA4TxBuBdBcegA\"",
		"mtime": "2026-08-07T17:12:53.235Z",
		"size": 178,
		"path": "../public/assets/circle-check-CRQN4vvI.js"
	},
	"/assets/boxes-DZq5QoSg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"353-ase3g6ngpSGF2xeMKVUIe7uQf8M\"",
		"mtime": "2026-08-07T17:12:53.228Z",
		"size": 851,
		"path": "../public/assets/boxes-DZq5QoSg.js"
	},
	"/assets/clock-3-CI6brCI1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-7T3QQEOZX2VgjnnaPu12xh4xcs8\"",
		"mtime": "2026-08-07T17:12:53.238Z",
		"size": 169,
		"path": "../public/assets/clock-3-CI6brCI1.js"
	},
	"/assets/client-6-pJCY_o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6e4b-Ba4DZIs3Q0UFJpaAqWArM6FDzFg\"",
		"mtime": "2026-08-07T17:12:53.237Z",
		"size": 28235,
		"path": "../public/assets/client-6-pJCY_o.js"
	},
	"/assets/Combination-D9q6d9eH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"74c5-CIy3Hh4voAQ7gBoppcbkSKdHEWw\"",
		"mtime": "2026-08-07T17:12:53.166Z",
		"size": 29893,
		"path": "../public/assets/Combination-D9q6d9eH.js"
	},
	"/assets/ColorField-eESJTb4f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c9-1pkAEIPPagCR7ZCWqHUBAwc2mvI\"",
		"mtime": "2026-08-07T17:12:53.166Z",
		"size": 713,
		"path": "../public/assets/ColorField-eESJTb4f.js"
	},
	"/assets/dist-CiyfGpmZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8291-ccs3rBwXODCUAiK51hVXD/xZWGA\"",
		"mtime": "2026-08-07T17:12:53.240Z",
		"size": 33425,
		"path": "../public/assets/dist-CiyfGpmZ.js"
	},
	"/assets/dist-DcKzNEjP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8183-9JJgtVxXIfcap/ogxPS7Sni8zVo\"",
		"mtime": "2026-08-07T17:12:53.249Z",
		"size": 33155,
		"path": "../public/assets/dist-DcKzNEjP.js"
	},
	"/assets/history-Bp4cwO0E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed-T/o1Zbdn0iCWKz4iTZ3VVNm03cU\"",
		"mtime": "2026-08-07T17:12:53.253Z",
		"size": 237,
		"path": "../public/assets/history-Bp4cwO0E.js"
	},
	"/assets/createLucideIcon-Qk0VrUvi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32f1-YcgSnbeHPGUm7KIGejOIRD4fj3Y\"",
		"mtime": "2026-08-07T17:12:53.240Z",
		"size": 13041,
		"path": "../public/assets/createLucideIcon-Qk0VrUvi.js"
	},
	"/assets/dist-FjTAPvgy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106a-iicUa5DThYypZBOwo5uVVS5D3FY\"",
		"mtime": "2026-08-07T17:12:53.251Z",
		"size": 4202,
		"path": "../public/assets/dist-FjTAPvgy.js"
	},
	"/assets/file-chart-column-increasing-BFGmLtI7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-jSx9Td5pKJyFxMZdeDL134Otfto\"",
		"mtime": "2026-08-07T17:12:53.253Z",
		"size": 407,
		"path": "../public/assets/file-chart-column-increasing-BFGmLtI7.js"
	},
	"/assets/inventory-JGc_jP8C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b53-xzosarGKAaZwktTSaUj17u7lV6I\"",
		"mtime": "2026-08-07T17:12:53.253Z",
		"size": 19283,
		"path": "../public/assets/inventory-JGc_jP8C.js"
	},
	"/assets/index-COxy-lb0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53e7a-XwVlJl/aOoenQtfNxbTVatHe+OU\"",
		"mtime": "2026-08-07T17:12:53.166Z",
		"size": 343674,
		"path": "../public/assets/index-COxy-lb0.js"
	},
	"/assets/licenses._id-7OREOj4h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ce0-xHe9UuDaoRbNkSIJ2UKLxdfVmy4\"",
		"mtime": "2026-08-07T17:12:53.261Z",
		"size": 11488,
		"path": "../public/assets/licenses._id-7OREOj4h.js"
	},
	"/assets/inventory._id-DJaGZv7c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15ee-9eCODrA/+jh0CIiIE2w4l+ewSwM\"",
		"mtime": "2026-08-07T17:12:53.257Z",
		"size": 5614,
		"path": "../public/assets/inventory._id-DJaGZv7c.js"
	},
	"/assets/login-AALwRsEv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14e7-qykrgI112IawtBklzOYLgvCNsDY\"",
		"mtime": "2026-08-07T17:12:53.261Z",
		"size": 5351,
		"path": "../public/assets/login-AALwRsEv.js"
	},
	"/assets/maintenance-Rh90FKs3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3850-n3v/rcM+OClLXr3HIgR8g4NPXd8\"",
		"mtime": "2026-08-07T17:12:53.261Z",
		"size": 14416,
		"path": "../public/assets/maintenance-Rh90FKs3.js"
	},
	"/assets/licenses-C_dziBm7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2994-S+2GpqPP+BN+hxg3rvUr3bAW82c\"",
		"mtime": "2026-08-07T17:12:53.259Z",
		"size": 10644,
		"path": "../public/assets/licenses-C_dziBm7.js"
	},
	"/assets/maintenance._id-BBzvXNYb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d28-4SGL629loBFeOug9rlcdQLlDEnI\"",
		"mtime": "2026-08-07T17:12:53.300Z",
		"size": 7464,
		"path": "../public/assets/maintenance._id-BBzvXNYb.js"
	},
	"/assets/ManagementVisuals-Kh2FK-6C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4eb-BDlgS3CCXPnjO9LJ7KB1AhOJyTI\"",
		"mtime": "2026-08-07T17:12:53.166Z",
		"size": 1259,
		"path": "../public/assets/ManagementVisuals-Kh2FK-6C.js"
	},
	"/assets/key-round-Choqrki2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-bqJXqFUZWKioeJY9n7V6VjMtwXE\"",
		"mtime": "2026-08-07T17:12:53.259Z",
		"size": 355,
		"path": "../public/assets/key-round-Choqrki2.js"
	},
	"/assets/link-Dk83dzTz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10fb-jhkqQt0GjAFPz0htLUGQcntLGf0\"",
		"mtime": "2026-08-07T17:12:53.261Z",
		"size": 4347,
		"path": "../public/assets/link-Dk83dzTz.js"
	},
	"/assets/map-pin-3oK7q2ax.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-yPopy05F1YqEBeaGjZMXh2osPIE\"",
		"mtime": "2026-08-07T17:12:53.300Z",
		"size": 259,
		"path": "../public/assets/map-pin-3oK7q2ax.js"
	},
	"/assets/minus-CdePx36u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-rksvn+DvSQevMlUOf72yqASHMGs\"",
		"mtime": "2026-08-07T17:12:53.302Z",
		"size": 117,
		"path": "../public/assets/minus-CdePx36u.js"
	},
	"/assets/monitor-DpS-RQS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-mEurdxWAE2k0rQNjgWw+RGRTKm4\"",
		"mtime": "2026-08-07T17:12:53.302Z",
		"size": 259,
		"path": "../public/assets/monitor-DpS-RQS9.js"
	},
	"/assets/pencil-fHcRKW2b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-CI2NZA4qQfIx+30MtOe3TjIydlg\"",
		"mtime": "2026-08-07T17:12:53.302Z",
		"size": 276,
		"path": "../public/assets/pencil-fHcRKW2b.js"
	},
	"/assets/people-departments.employee._id-AoixPKsH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2170-e86ZZj0SUjSOaEUNtTby03DHCMY\"",
		"mtime": "2026-08-07T17:12:53.302Z",
		"size": 8560,
		"path": "../public/assets/people-departments.employee._id-AoixPKsH.js"
	},
	"/assets/people-departments-Cu7mpZEo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bbe-3tItgBoIErtaXe8U90TtRrgVSE4\"",
		"mtime": "2026-08-07T17:12:53.302Z",
		"size": 15294,
		"path": "../public/assets/people-departments-Cu7mpZEo.js"
	},
	"/assets/pms-BXn1iT47.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f6-e2Pw9X9qotI7SiViQM9cz4u/fEU\"",
		"mtime": "2026-08-07T17:12:53.310Z",
		"size": 1014,
		"path": "../public/assets/pms-BXn1iT47.js"
	},
	"/assets/Match-DZtBWs3U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bde1-VtQeH2aHCoFTeDT2Gr4LIyFhEJM\"",
		"mtime": "2026-08-07T17:12:53.177Z",
		"size": 48609,
		"path": "../public/assets/Match-DZtBWs3U.js"
	},
	"/assets/plus-D3JGa-eM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-gVIPH2490F/00xLVFQU0xwsEu38\"",
		"mtime": "2026-08-07T17:12:53.302Z",
		"size": 153,
		"path": "../public/assets/plus-D3JGa-eM.js"
	},
	"/assets/phone-t3G6-Ozk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-0c836CXU3kmruYydIYK3w6vEPTY\"",
		"mtime": "2026-08-07T17:12:53.302Z",
		"size": 482,
		"path": "../public/assets/phone-t3G6-Ozk.js"
	},
	"/assets/people-departments._id-14bhgHwx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ca1-iYr8D2R7knjChgcpODpZZ879HxM\"",
		"mtime": "2026-08-07T17:12:53.302Z",
		"size": 7329,
		"path": "../public/assets/people-departments._id-14bhgHwx.js"
	},
	"/assets/reports-YIvoQdA9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1249-FAPSdNkYc5V4c3Kzwl1SAQjxwdg\"",
		"mtime": "2026-08-07T17:12:53.310Z",
		"size": 4681,
		"path": "../public/assets/reports-YIvoQdA9.js"
	},
	"/assets/route-CIdT37tr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7272-YxRz+KrNbTCS2KXH0Nhjj5DmYS0\"",
		"mtime": "2026-08-07T17:12:53.310Z",
		"size": 29298,
		"path": "../public/assets/route-CIdT37tr.js"
	},
	"/assets/settings-DQ9z9QDy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a9f-m36jWVy4lBKfDGSBK2o/6nkOAps\"",
		"mtime": "2026-08-07T17:12:53.313Z",
		"size": 31391,
		"path": "../public/assets/settings-DQ9z9QDy.js"
	},
	"/assets/printer-DdY873my.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-RmCSXr6hhLV/6zk9txKQa1s52M4\"",
		"mtime": "2026-08-07T17:12:53.310Z",
		"size": 319,
		"path": "../public/assets/printer-DdY873my.js"
	},
	"/assets/ScopeColorBadges-DwrG1Iwe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-/SS9Y6WxRk0YO6tyMoHY0OeQsBc\"",
		"mtime": "2026-08-07T17:12:53.218Z",
		"size": 703,
		"path": "../public/assets/ScopeColorBadges-DwrG1Iwe.js"
	},
	"/assets/shield-check-BRyfGHB7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-7bIyAgIaSc4NwHVpdeIW1USyzOI\"",
		"mtime": "2026-08-07T17:12:53.313Z",
		"size": 320,
		"path": "../public/assets/shield-check-BRyfGHB7.js"
	},
	"/assets/tabs-CPMjPglP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"deb-qwWWH9Lb73Y5UcEartU5VsZkMFI\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 3563,
		"path": "../public/assets/tabs-CPMjPglP.js"
	},
	"/assets/triangle-alert-CZZ9C9sE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-+poKDnUvoXsqHK2AVNeR4N4qvzk\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-CZZ9C9sE.js"
	},
	"/assets/useNavigate-DHe1FaRo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"333-iMxlU4uLU8KwctdiFDhj2Erha9Y\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 819,
		"path": "../public/assets/useNavigate-DHe1FaRo.js"
	},
	"/assets/table-Bpx8FQj3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"670-RgIk+PH8fnr6mq62CfTKPUl+TG8\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 1648,
		"path": "../public/assets/table-Bpx8FQj3.js"
	},
	"/assets/user-round-DbW_Pjo9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6-suCKeUrK00zDzh5LBN8mZLEN2WM\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 182,
		"path": "../public/assets/user-round-DbW_Pjo9.js"
	},
	"/assets/useRouterState-BioIDsY8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c6-LHQozPewccDxkNtJ+yTJQjk1+XY\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 198,
		"path": "../public/assets/useRouterState-BioIDsY8.js"
	},
	"/assets/styles-C9E116A1.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"18208-Te7pdN/F4RKAH8a1uH92qXnzg9s\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 98824,
		"path": "../public/assets/styles-C9E116A1.css"
	},
	"/assets/useStore-DEQr5G4Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af0-NF7LTfGtTdIf+aFUa0wBOaIzZaU\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 19184,
		"path": "../public/assets/useStore-DEQr5G4Q.js"
	},
	"/assets/user-cog-DaleLo1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b5-MX6255JNSSFObWJRgaYyiJMq9Vw\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 1205,
		"path": "../public/assets/user-cog-DaleLo1g.js"
	},
	"/assets/_authenticated-CYleRzZh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b85-lxMJHh/6ADKp/Uy6ysC46EB7Z6g\"",
		"mtime": "2026-08-07T17:12:53.218Z",
		"size": 19333,
		"path": "../public/assets/_authenticated-CYleRzZh.js"
	},
	"/assets/wrench-BvAAtyPF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-Cw1uwGxI2YCLQ9VdPEtyMXWqNig\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 303,
		"path": "../public/assets/wrench-BvAAtyPF.js"
	},
	"/assets/users-BurfCEqM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-thrX+U46+7JeB2p+ND2DjKleVGE\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 306,
		"path": "../public/assets/users-BurfCEqM.js"
	},
	"/assets/users-round-T_YFhOD-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-3DtO02iZknxF/JDj68j37OlQzVw\"",
		"mtime": "2026-08-07T17:12:53.316Z",
		"size": 253,
		"path": "../public/assets/users-round-T_YFhOD-.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_YI3KeA = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_YI3KeA
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };

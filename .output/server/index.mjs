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
	"/printersfloss-header-logo.png": {
		"type": "image/png",
		"etag": "\"17971-FayePHPhIcKRbNasS0Eze8y8ncU\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 96625,
		"path": "../public/printersfloss-header-logo.png"
	},
	"/assets/arrow-right-DNJwBKfT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-cJv0Zc38qmmtLmGVnGQsCsl3w44\"",
		"mtime": "2026-08-04T13:32:58.708Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DNJwBKfT.js"
	},
	"/printersfloss-logo.png": {
		"type": "image/png",
		"etag": "\"10aca-aGgFSVCPARwWXZk3Z37qOnn6598\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 68298,
		"path": "../public/printersfloss-logo.png"
	},
	"/assets/assets.index-HJYSYMf2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a17-bCUmAxLgxbpFhRGybdQgKQgiRnw\"",
		"mtime": "2026-08-04T13:32:58.708Z",
		"size": 10775,
		"path": "../public/assets/assets.index-HJYSYMf2.js"
	},
	"/printers-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printers-desktop.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T13:12:02.444Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/arrow-left-C0b-WU-S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-zHqr6yypol1kTrXDw/slHWzSk6o\"",
		"mtime": "2026-08-04T13:32:58.707Z",
		"size": 165,
		"path": "../public/assets/arrow-left-C0b-WU-S.js"
	},
	"/assets/circle-check-CRQN4vvI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-wLjMGqav0OPYKaA4TxBuBdBcegA\"",
		"mtime": "2026-08-04T13:32:58.708Z",
		"size": 178,
		"path": "../public/assets/circle-check-CRQN4vvI.js"
	},
	"/assets/client-6-pJCY_o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6e4b-Ba4DZIs3Q0UFJpaAqWArM6FDzFg\"",
		"mtime": "2026-08-04T13:32:58.708Z",
		"size": 28235,
		"path": "../public/assets/client-6-pJCY_o.js"
	},
	"/assets/assets._id-DFJueI7Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3b6-t8k6StQic4HncRYCBE41wPXbgJs\"",
		"mtime": "2026-08-04T13:32:58.708Z",
		"size": 46006,
		"path": "../public/assets/assets._id-DFJueI7Z.js"
	},
	"/assets/boxes-DZq5QoSg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"353-ase3g6ngpSGF2xeMKVUIe7uQf8M\"",
		"mtime": "2026-08-04T13:32:58.708Z",
		"size": 851,
		"path": "../public/assets/boxes-DZq5QoSg.js"
	},
	"/assets/clock-3-CI6brCI1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-7T3QQEOZX2VgjnnaPu12xh4xcs8\"",
		"mtime": "2026-08-04T13:32:58.708Z",
		"size": 169,
		"path": "../public/assets/clock-3-CI6brCI1.js"
	},
	"/assets/ColorField-eESJTb4f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c9-1pkAEIPPagCR7ZCWqHUBAwc2mvI\"",
		"mtime": "2026-08-04T13:32:58.703Z",
		"size": 713,
		"path": "../public/assets/ColorField-eESJTb4f.js"
	},
	"/printersfloss-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printersfloss-desktop.ico"
	},
	"/assets/ConfirmButton-wmUS6vIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118c-ikQsPt1aUvRPK9b5Fb+N7UGft2E\"",
		"mtime": "2026-08-04T13:32:58.704Z",
		"size": 4492,
		"path": "../public/assets/ConfirmButton-wmUS6vIe.js"
	},
	"/assets/dist-DcKzNEjP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8183-9JJgtVxXIfcap/ogxPS7Sni8zVo\"",
		"mtime": "2026-08-04T13:32:58.712Z",
		"size": 33155,
		"path": "../public/assets/dist-DcKzNEjP.js"
	},
	"/assets/dist-CnE25tkc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1060-heWhSF9c8RVLY6WZnNWQgHLF/RU\"",
		"mtime": "2026-08-04T13:32:58.712Z",
		"size": 4192,
		"path": "../public/assets/dist-CnE25tkc.js"
	},
	"/assets/createLucideIcon-Qk0VrUvi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32f1-YcgSnbeHPGUm7KIGejOIRD4fj3Y\"",
		"mtime": "2026-08-04T13:32:58.710Z",
		"size": 13041,
		"path": "../public/assets/createLucideIcon-Qk0VrUvi.js"
	},
	"/assets/file-chart-column-increasing-BFGmLtI7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-jSx9Td5pKJyFxMZdeDL134Otfto\"",
		"mtime": "2026-08-04T13:32:58.713Z",
		"size": 407,
		"path": "../public/assets/file-chart-column-increasing-BFGmLtI7.js"
	},
	"/assets/dist-DiAc9JPe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8287-I34dbB9EN2HVy+mKJXtuCKCt+qI\"",
		"mtime": "2026-08-04T13:32:58.713Z",
		"size": 33415,
		"path": "../public/assets/dist-DiAc9JPe.js"
	},
	"/assets/data-rules-Bu7NkuoK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"151-BxFXma/glkoO8u+MoZ1Fl6bLlFg\"",
		"mtime": "2026-08-04T13:32:58.711Z",
		"size": 337,
		"path": "../public/assets/data-rules-Bu7NkuoK.js"
	},
	"/assets/index-Db95VqSb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4fb21-m8/kfmJ0e8/f07G7nSJEl2z4IiM\"",
		"mtime": "2026-08-04T13:32:58.703Z",
		"size": 326433,
		"path": "../public/assets/index-Db95VqSb.js"
	},
	"/assets/history-Bp4cwO0E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed-T/o1Zbdn0iCWKz4iTZ3VVNm03cU\"",
		"mtime": "2026-08-04T13:32:58.715Z",
		"size": 237,
		"path": "../public/assets/history-Bp4cwO0E.js"
	},
	"/assets/es2015-fnm1cU6v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"74c6-J1ThTawtRgPA/D5awi+DJp5hG8k\"",
		"mtime": "2026-08-04T13:32:58.713Z",
		"size": 29894,
		"path": "../public/assets/es2015-fnm1cU6v.js"
	},
	"/assets/inventory-DJjlMmfJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ca0-7x6KA3W3Cyf/FUTDTHDFEWyXJEI\"",
		"mtime": "2026-08-04T13:32:58.715Z",
		"size": 11424,
		"path": "../public/assets/inventory-DJjlMmfJ.js"
	},
	"/assets/key-round-Choqrki2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-bqJXqFUZWKioeJY9n7V6VjMtwXE\"",
		"mtime": "2026-08-04T13:32:58.716Z",
		"size": 355,
		"path": "../public/assets/key-round-Choqrki2.js"
	},
	"/assets/licenses._id-BClvEVbs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a62-BTPR5pnWPloVyBvA18jHMDwWzHQ\"",
		"mtime": "2026-08-04T13:32:58.717Z",
		"size": 10850,
		"path": "../public/assets/licenses._id-BClvEVbs.js"
	},
	"/assets/link-Dk83dzTz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10fb-jhkqQt0GjAFPz0htLUGQcntLGf0\"",
		"mtime": "2026-08-04T13:32:58.717Z",
		"size": 4347,
		"path": "../public/assets/link-Dk83dzTz.js"
	},
	"/assets/monitor-DpS-RQS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-mEurdxWAE2k0rQNjgWw+RGRTKm4\"",
		"mtime": "2026-08-04T13:32:58.722Z",
		"size": 259,
		"path": "../public/assets/monitor-DpS-RQS9.js"
	},
	"/assets/login-BUX7UgEX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14e2-0NYq4+YsoX4fb4R8Keij96DHWFU\"",
		"mtime": "2026-08-04T13:32:58.719Z",
		"size": 5346,
		"path": "../public/assets/login-BUX7UgEX.js"
	},
	"/assets/maintenance-DL67iM62.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d72-YcDwu25MEkr7olWsvXMfhyCKuEo\"",
		"mtime": "2026-08-04T13:32:58.719Z",
		"size": 11634,
		"path": "../public/assets/maintenance-DL67iM62.js"
	},
	"/assets/ManagementVisuals-Kh2FK-6C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4eb-BDlgS3CCXPnjO9LJ7KB1AhOJyTI\"",
		"mtime": "2026-08-04T13:32:58.704Z",
		"size": 1259,
		"path": "../public/assets/ManagementVisuals-Kh2FK-6C.js"
	},
	"/assets/Match-DZtBWs3U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bde1-VtQeH2aHCoFTeDT2Gr4LIyFhEJM\"",
		"mtime": "2026-08-04T13:32:58.704Z",
		"size": 48609,
		"path": "../public/assets/Match-DZtBWs3U.js"
	},
	"/assets/package-BP5brPu7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-y6kcMBaUpHERgIv08fNGaWaoUoo\"",
		"mtime": "2026-08-04T13:32:58.724Z",
		"size": 372,
		"path": "../public/assets/package-BP5brPu7.js"
	},
	"/assets/people-departments-BSzcyRn1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3be0-BucU1U19b+qe5EjrnnGEhh1l2+8\"",
		"mtime": "2026-08-04T13:32:58.724Z",
		"size": 15328,
		"path": "../public/assets/people-departments-BSzcyRn1.js"
	},
	"/assets/plus-D3JGa-eM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-gVIPH2490F/00xLVFQU0xwsEu38\"",
		"mtime": "2026-08-04T13:32:58.730Z",
		"size": 153,
		"path": "../public/assets/plus-D3JGa-eM.js"
	},
	"/assets/printer-DdY873my.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-RmCSXr6hhLV/6zk9txKQa1s52M4\"",
		"mtime": "2026-08-04T13:32:58.730Z",
		"size": 319,
		"path": "../public/assets/printer-DdY873my.js"
	},
	"/assets/licenses-BKqD4fgU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27bf-eTwjaLYRme42ZMXiFVLGeLJnccE\"",
		"mtime": "2026-08-04T13:32:58.717Z",
		"size": 10175,
		"path": "../public/assets/licenses-BKqD4fgU.js"
	},
	"/assets/people-departments._id-CxNKOlfn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd0-qW0DPbnLUdMJNaSxXv/kkQn5++I\"",
		"mtime": "2026-08-04T13:32:58.726Z",
		"size": 7376,
		"path": "../public/assets/people-departments._id-CxNKOlfn.js"
	},
	"/assets/phone-t3G6-Ozk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-0c836CXU3kmruYydIYK3w6vEPTY\"",
		"mtime": "2026-08-04T13:32:58.728Z",
		"size": 482,
		"path": "../public/assets/phone-t3G6-Ozk.js"
	},
	"/assets/people-departments.employee._id-C6N5u5ne.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"219f-XhHHBfsxEHTEdhs6CPl1Ff+HjCA\"",
		"mtime": "2026-08-04T13:32:58.728Z",
		"size": 8607,
		"path": "../public/assets/people-departments.employee._id-C6N5u5ne.js"
	},
	"/assets/reports-BE0TRY7r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123d-n4EsAYOeLvsQnImpYJbndHtz9tg\"",
		"mtime": "2026-08-04T13:32:58.730Z",
		"size": 4669,
		"path": "../public/assets/reports-BE0TRY7r.js"
	},
	"/assets/route-Dlf2lV-t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"72ae-DEKN9yTkdUwIro1dgqYTUIoTbTU\"",
		"mtime": "2026-08-04T13:32:58.730Z",
		"size": 29358,
		"path": "../public/assets/route-Dlf2lV-t.js"
	},
	"/assets/ScopeColorBadges-DwrG1Iwe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-/SS9Y6WxRk0YO6tyMoHY0OeQsBc\"",
		"mtime": "2026-08-04T13:32:58.704Z",
		"size": 703,
		"path": "../public/assets/ScopeColorBadges-DwrG1Iwe.js"
	},
	"/assets/PrinterImage-DLmEEDfT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"337-GxhjTtd7X/dci5dnWLC9CA0uqRM\"",
		"mtime": "2026-08-04T13:32:58.704Z",
		"size": 823,
		"path": "../public/assets/PrinterImage-DLmEEDfT.js"
	},
	"/assets/shield-check-BRyfGHB7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-7bIyAgIaSc4NwHVpdeIW1USyzOI\"",
		"mtime": "2026-08-04T13:32:58.732Z",
		"size": 320,
		"path": "../public/assets/shield-check-BRyfGHB7.js"
	},
	"/assets/styles-gvYr1oaL.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"179d2-V4VstuZURA6vTe5MxsJ1CEP6UGc\"",
		"mtime": "2026-08-04T13:32:58.739Z",
		"size": 96722,
		"path": "../public/assets/styles-gvYr1oaL.css"
	},
	"/assets/search-DEw924v7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-5HEnljnwVILjUxOgfCWj9/JCC1w\"",
		"mtime": "2026-08-04T13:32:58.730Z",
		"size": 174,
		"path": "../public/assets/search-DEw924v7.js"
	},
	"/assets/settings-D6xoWQ3O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a40-VA/hsL0njX4aLzqp54uEr9UVKZk\"",
		"mtime": "2026-08-04T13:32:58.732Z",
		"size": 31296,
		"path": "../public/assets/settings-D6xoWQ3O.js"
	},
	"/assets/table-Bpx8FQj3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"670-RgIk+PH8fnr6mq62CfTKPUl+TG8\"",
		"mtime": "2026-08-04T13:32:58.732Z",
		"size": 1648,
		"path": "../public/assets/table-Bpx8FQj3.js"
	},
	"/assets/tabs-Dlji7Ul4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de6-EdknXaaNpW9oGaL+dwtZ8s2c52o\"",
		"mtime": "2026-08-04T13:32:58.733Z",
		"size": 3558,
		"path": "../public/assets/tabs-Dlji7Ul4.js"
	},
	"/assets/trash-2-Jcr6fRmZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-09gXCHvnB7dVgNVZvpQCvFNSgpI\"",
		"mtime": "2026-08-04T13:32:58.733Z",
		"size": 328,
		"path": "../public/assets/trash-2-Jcr6fRmZ.js"
	},
	"/assets/useNavigate-DHe1FaRo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"333-iMxlU4uLU8KwctdiFDhj2Erha9Y\"",
		"mtime": "2026-08-04T13:32:58.736Z",
		"size": 819,
		"path": "../public/assets/useNavigate-DHe1FaRo.js"
	},
	"/assets/triangle-alert-CZZ9C9sE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-+poKDnUvoXsqHK2AVNeR4N4qvzk\"",
		"mtime": "2026-08-04T13:32:58.735Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-CZZ9C9sE.js"
	},
	"/assets/user-round-DbW_Pjo9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6-suCKeUrK00zDzh5LBN8mZLEN2WM\"",
		"mtime": "2026-08-04T13:32:58.736Z",
		"size": 182,
		"path": "../public/assets/user-round-DbW_Pjo9.js"
	},
	"/assets/users-BurfCEqM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-thrX+U46+7JeB2p+ND2DjKleVGE\"",
		"mtime": "2026-08-04T13:32:58.738Z",
		"size": 306,
		"path": "../public/assets/users-BurfCEqM.js"
	},
	"/assets/useStore-DEQr5G4Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af0-NF7LTfGtTdIf+aFUa0wBOaIzZaU\"",
		"mtime": "2026-08-04T13:32:58.736Z",
		"size": 19184,
		"path": "../public/assets/useStore-DEQr5G4Q.js"
	},
	"/assets/users-round-T_YFhOD-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-3DtO02iZknxF/JDj68j37OlQzVw\"",
		"mtime": "2026-08-04T13:32:58.739Z",
		"size": 253,
		"path": "../public/assets/users-round-T_YFhOD-.js"
	},
	"/assets/wrench-BvAAtyPF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-Cw1uwGxI2YCLQ9VdPEtyMXWqNig\"",
		"mtime": "2026-08-04T13:32:58.739Z",
		"size": 303,
		"path": "../public/assets/wrench-BvAAtyPF.js"
	},
	"/assets/_authenticated-kHYTR9-f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b89-DbNG6WBJH5RmsKxEFk25jiWM99k\"",
		"mtime": "2026-08-04T13:32:58.707Z",
		"size": 19337,
		"path": "../public/assets/_authenticated-kHYTR9-f.js"
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

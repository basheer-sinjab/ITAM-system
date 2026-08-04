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
	"/printersfloss-header-logo.png": {
		"type": "image/png",
		"etag": "\"17971-FayePHPhIcKRbNasS0Eze8y8ncU\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 96625,
		"path": "../public/printersfloss-header-logo.png"
	},
	"/printersfloss-logo.png": {
		"type": "image/png",
		"etag": "\"10aca-aGgFSVCPARwWXZk3Z37qOnn6598\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 68298,
		"path": "../public/printersfloss-logo.png"
	},
	"/assets/circle-check-D7_KrlMJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-A0El/RArX9vhCNZKeYM0VlNLdiA\"",
		"mtime": "2026-08-04T11:44:11.907Z",
		"size": 290,
		"path": "../public/assets/circle-check-D7_KrlMJ.js"
	},
	"/assets/assets.index-1pjGVsFO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2786-bKCfoAxTlge0+9pC3f0fJuxv8Q4\"",
		"mtime": "2026-08-04T11:44:11.907Z",
		"size": 10118,
		"path": "../public/assets/assets.index-1pjGVsFO.js"
	},
	"/assets/arrow-right-DNJwBKfT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-cJv0Zc38qmmtLmGVnGQsCsl3w44\"",
		"mtime": "2026-08-04T11:44:11.907Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DNJwBKfT.js"
	},
	"/assets/clock-3-CI6brCI1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-7T3QQEOZX2VgjnnaPu12xh4xcs8\"",
		"mtime": "2026-08-04T11:44:11.909Z",
		"size": 169,
		"path": "../public/assets/clock-3-CI6brCI1.js"
	},
	"/assets/ConfirmButton-77hKS8oX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118c-3SOkSkoBctJ4e8/2Nei15d6/caM\"",
		"mtime": "2026-08-04T11:44:11.901Z",
		"size": 4492,
		"path": "../public/assets/ConfirmButton-77hKS8oX.js"
	},
	"/assets/ColorField-eESJTb4f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c9-1pkAEIPPagCR7ZCWqHUBAwc2mvI\"",
		"mtime": "2026-08-04T11:44:11.901Z",
		"size": 713,
		"path": "../public/assets/ColorField-eESJTb4f.js"
	},
	"/assets/assets._id-CPZ1LkV1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a032-Uvm45Lmyb6IT6Zj6fgzGMuDmgZQ\"",
		"mtime": "2026-08-04T11:44:11.907Z",
		"size": 41010,
		"path": "../public/assets/assets._id-CPZ1LkV1.js"
	},
	"/assets/client-49ddjaUF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d84-M1j5u53qF7S7j9D4ySq1YJK1zc8\"",
		"mtime": "2026-08-04T11:44:11.909Z",
		"size": 28036,
		"path": "../public/assets/client-49ddjaUF.js"
	},
	"/assets/dist-DcKzNEjP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8183-9JJgtVxXIfcap/ogxPS7Sni8zVo\"",
		"mtime": "2026-08-04T11:44:11.911Z",
		"size": 33155,
		"path": "../public/assets/dist-DcKzNEjP.js"
	},
	"/assets/boxes-DZq5QoSg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"353-ase3g6ngpSGF2xeMKVUIe7uQf8M\"",
		"mtime": "2026-08-04T11:44:11.907Z",
		"size": 851,
		"path": "../public/assets/boxes-DZq5QoSg.js"
	},
	"/assets/file-chart-column-increasing-BFGmLtI7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-jSx9Td5pKJyFxMZdeDL134Otfto\"",
		"mtime": "2026-08-04T11:44:11.912Z",
		"size": 407,
		"path": "../public/assets/file-chart-column-increasing-BFGmLtI7.js"
	},
	"/assets/es2015-fnm1cU6v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"74c6-J1ThTawtRgPA/D5awi+DJp5hG8k\"",
		"mtime": "2026-08-04T11:44:11.911Z",
		"size": 29894,
		"path": "../public/assets/es2015-fnm1cU6v.js"
	},
	"/assets/history-Bp4cwO0E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed-T/o1Zbdn0iCWKz4iTZ3VVNm03cU\"",
		"mtime": "2026-08-04T11:44:11.912Z",
		"size": 237,
		"path": "../public/assets/history-Bp4cwO0E.js"
	},
	"/assets/inventory-BqNC0riJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bce-eDIncrmyBnOnMezi4H7RVsXkVw4\"",
		"mtime": "2026-08-04T11:44:11.912Z",
		"size": 11214,
		"path": "../public/assets/inventory-BqNC0riJ.js"
	},
	"/assets/createLucideIcon-Qk0VrUvi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32f1-YcgSnbeHPGUm7KIGejOIRD4fj3Y\"",
		"mtime": "2026-08-04T11:44:11.909Z",
		"size": 13041,
		"path": "../public/assets/createLucideIcon-Qk0VrUvi.js"
	},
	"/assets/data-rules-Bu7NkuoK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"151-BxFXma/glkoO8u+MoZ1Fl6bLlFg\"",
		"mtime": "2026-08-04T11:44:11.909Z",
		"size": 337,
		"path": "../public/assets/data-rules-Bu7NkuoK.js"
	},
	"/assets/index-Dd679TjE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57b5e-DdA1KZrmaG1q1dEOCQlervGVIgU\"",
		"mtime": "2026-08-04T11:44:11.901Z",
		"size": 359262,
		"path": "../public/assets/index-Dd679TjE.js"
	},
	"/assets/key-round-Choqrki2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-bqJXqFUZWKioeJY9n7V6VjMtwXE\"",
		"mtime": "2026-08-04T11:44:11.915Z",
		"size": 355,
		"path": "../public/assets/key-round-Choqrki2.js"
	},
	"/assets/licenses-B3YpJ7D4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"279e-hdkojuHQ6sNyeYlb0b+mdoVMxcM\"",
		"mtime": "2026-08-04T11:44:11.916Z",
		"size": 10142,
		"path": "../public/assets/licenses-B3YpJ7D4.js"
	},
	"/assets/maintenance-CpjRx01f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d77-oo1O7J9dj92baxcdf+fmmH4Ax1o\"",
		"mtime": "2026-08-04T11:44:11.921Z",
		"size": 11639,
		"path": "../public/assets/maintenance-CpjRx01f.js"
	},
	"/assets/link-Dk83dzTz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10fb-jhkqQt0GjAFPz0htLUGQcntLGf0\"",
		"mtime": "2026-08-04T11:44:11.918Z",
		"size": 4347,
		"path": "../public/assets/link-Dk83dzTz.js"
	},
	"/assets/login-BuBFR3JZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7c-QqmouNj5u96gMl9G2b7MVUosr8A\"",
		"mtime": "2026-08-04T11:44:11.918Z",
		"size": 3196,
		"path": "../public/assets/login-BuBFR3JZ.js"
	},
	"/assets/licenses._id-DqoG8qgz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a62-RtWQtkIwG5gCViQgZ7cS6BcPqLM\"",
		"mtime": "2026-08-04T11:44:11.917Z",
		"size": 10850,
		"path": "../public/assets/licenses._id-DqoG8qgz.js"
	},
	"/assets/Match-DZtBWs3U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bde1-VtQeH2aHCoFTeDT2Gr4LIyFhEJM\"",
		"mtime": "2026-08-04T11:44:11.901Z",
		"size": 48609,
		"path": "../public/assets/Match-DZtBWs3U.js"
	},
	"/assets/monitor-DpS-RQS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-mEurdxWAE2k0rQNjgWw+RGRTKm4\"",
		"mtime": "2026-08-04T11:44:11.921Z",
		"size": 259,
		"path": "../public/assets/monitor-DpS-RQS9.js"
	},
	"/assets/ManagementVisuals-Kh2FK-6C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4eb-BDlgS3CCXPnjO9LJ7KB1AhOJyTI\"",
		"mtime": "2026-08-04T11:44:11.901Z",
		"size": 1259,
		"path": "../public/assets/ManagementVisuals-Kh2FK-6C.js"
	},
	"/assets/package-BP5brPu7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-y6kcMBaUpHERgIv08fNGaWaoUoo\"",
		"mtime": "2026-08-04T11:44:11.921Z",
		"size": 372,
		"path": "../public/assets/package-BP5brPu7.js"
	},
	"/assets/people-departments-ZWHgpaJ9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bdb-Tv0uV+hp3pVLSBURr46i6W1L7B4\"",
		"mtime": "2026-08-04T11:44:11.921Z",
		"size": 15323,
		"path": "../public/assets/people-departments-ZWHgpaJ9.js"
	},
	"/assets/people-departments.employee._id-DRhv_br5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a4-qrDgD7PcZwdLPz7BceKwPPSBqlU\"",
		"mtime": "2026-08-04T11:44:11.921Z",
		"size": 8612,
		"path": "../public/assets/people-departments.employee._id-DRhv_br5.js"
	},
	"/assets/people-departments._id-BEKgjWif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd5-1i5a+3akmN+Mwy0kXbTgVxXsTIs\"",
		"mtime": "2026-08-04T11:44:11.921Z",
		"size": 7381,
		"path": "../public/assets/people-departments._id-BEKgjWif.js"
	},
	"/assets/phone-t3G6-Ozk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-0c836CXU3kmruYydIYK3w6vEPTY\"",
		"mtime": "2026-08-04T11:44:11.921Z",
		"size": 482,
		"path": "../public/assets/phone-t3G6-Ozk.js"
	},
	"/assets/plus-D3JGa-eM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-gVIPH2490F/00xLVFQU0xwsEu38\"",
		"mtime": "2026-08-04T11:44:11.921Z",
		"size": 153,
		"path": "../public/assets/plus-D3JGa-eM.js"
	},
	"/assets/settings-FlbP5sJc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a24-mMIa50UYsrAtUg7LS7Q/k/tAbqE\"",
		"mtime": "2026-08-04T11:44:11.927Z",
		"size": 31268,
		"path": "../public/assets/settings-FlbP5sJc.js"
	},
	"/assets/printer-DdY873my.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-RmCSXr6hhLV/6zk9txKQa1s52M4\"",
		"mtime": "2026-08-04T11:44:11.921Z",
		"size": 319,
		"path": "../public/assets/printer-DdY873my.js"
	},
	"/assets/reports-CoNBenWE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123d-qQx5f3pBH8Z5FZ64+d6BfWihas0\"",
		"mtime": "2026-08-04T11:44:11.921Z",
		"size": 4669,
		"path": "../public/assets/reports-CoNBenWE.js"
	},
	"/assets/search-DEw924v7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-5HEnljnwVILjUxOgfCWj9/JCC1w\"",
		"mtime": "2026-08-04T11:44:11.927Z",
		"size": 174,
		"path": "../public/assets/search-DEw924v7.js"
	},
	"/assets/route-BmfL4kID.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f0b-/+2p7ApCmyaZn+MMYPIzolR+Ws4\"",
		"mtime": "2026-08-04T11:44:11.921Z",
		"size": 7947,
		"path": "../public/assets/route-BmfL4kID.js"
	},
	"/assets/PrinterImage-DjpdF1tf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-Vos1oxtEPClT/m6Fz78mFjLnNQU\"",
		"mtime": "2026-08-04T11:44:11.901Z",
		"size": 620,
		"path": "../public/assets/PrinterImage-DjpdF1tf.js"
	},
	"/assets/ScopeColorBadges-DwrG1Iwe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-/SS9Y6WxRk0YO6tyMoHY0OeQsBc\"",
		"mtime": "2026-08-04T11:44:11.901Z",
		"size": 703,
		"path": "../public/assets/ScopeColorBadges-DwrG1Iwe.js"
	},
	"/assets/shield-check-BRyfGHB7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-7bIyAgIaSc4NwHVpdeIW1USyzOI\"",
		"mtime": "2026-08-04T11:44:11.927Z",
		"size": 320,
		"path": "../public/assets/shield-check-BRyfGHB7.js"
	},
	"/assets/styles-1fnkbsyK.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16815-IFq35U5c2JEVaH4MYG36wQJnsNI\"",
		"mtime": "2026-08-04T11:44:11.933Z",
		"size": 92181,
		"path": "../public/assets/styles-1fnkbsyK.css"
	},
	"/assets/table-Bpx8FQj3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"670-RgIk+PH8fnr6mq62CfTKPUl+TG8\"",
		"mtime": "2026-08-04T11:44:11.929Z",
		"size": 1648,
		"path": "../public/assets/table-Bpx8FQj3.js"
	},
	"/assets/tabs-DRgb1e1U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d38-Ai0f7w/Hv07N/UyF9ShsAX5xbpI\"",
		"mtime": "2026-08-04T11:44:11.929Z",
		"size": 7480,
		"path": "../public/assets/tabs-DRgb1e1U.js"
	},
	"/assets/trash-2-Jcr6fRmZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-09gXCHvnB7dVgNVZvpQCvFNSgpI\"",
		"mtime": "2026-08-04T11:44:11.929Z",
		"size": 328,
		"path": "../public/assets/trash-2-Jcr6fRmZ.js"
	},
	"/assets/triangle-alert-CZZ9C9sE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-+poKDnUvoXsqHK2AVNeR4N4qvzk\"",
		"mtime": "2026-08-04T11:44:11.930Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-CZZ9C9sE.js"
	},
	"/assets/user-round-DbW_Pjo9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6-suCKeUrK00zDzh5LBN8mZLEN2WM\"",
		"mtime": "2026-08-04T11:44:11.930Z",
		"size": 182,
		"path": "../public/assets/user-round-DbW_Pjo9.js"
	},
	"/assets/useNavigate-DHe1FaRo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"333-iMxlU4uLU8KwctdiFDhj2Erha9Y\"",
		"mtime": "2026-08-04T11:44:11.930Z",
		"size": 819,
		"path": "../public/assets/useNavigate-DHe1FaRo.js"
	},
	"/assets/useStore-DEQr5G4Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af0-NF7LTfGtTdIf+aFUa0wBOaIzZaU\"",
		"mtime": "2026-08-04T11:44:11.930Z",
		"size": 19184,
		"path": "../public/assets/useStore-DEQr5G4Q.js"
	},
	"/assets/users-BurfCEqM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-thrX+U46+7JeB2p+ND2DjKleVGE\"",
		"mtime": "2026-08-04T11:44:11.930Z",
		"size": 306,
		"path": "../public/assets/users-BurfCEqM.js"
	},
	"/assets/wrench-BvAAtyPF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-Cw1uwGxI2YCLQ9VdPEtyMXWqNig\"",
		"mtime": "2026-08-04T11:44:11.933Z",
		"size": 303,
		"path": "../public/assets/wrench-BvAAtyPF.js"
	},
	"/assets/_authenticated-CXvO_JNY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b63-SjP+Qrn88xbmT+AsuMn1HnWNWJE\"",
		"mtime": "2026-08-04T11:44:11.907Z",
		"size": 19299,
		"path": "../public/assets/_authenticated-CXvO_JNY.js"
	},
	"/assets/users-round-T_YFhOD-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-3DtO02iZknxF/JDj68j37OlQzVw\"",
		"mtime": "2026-08-04T11:44:11.933Z",
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

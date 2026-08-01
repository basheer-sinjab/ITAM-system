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
	"/printersfloss-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printersfloss-desktop.ico"
	},
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
	"/printersfloss-logo.png": {
		"type": "image/png",
		"etag": "\"10aca-aGgFSVCPARwWXZk3Z37qOnn6598\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 68298,
		"path": "../public/printersfloss-logo.png"
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
		"mtime": "2026-08-01T20:33:03.192Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DNJwBKfT.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T13:12:02.444Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/assets.index-ChRXBkP5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ba9-AbO7tLPZL0TPVz0+txVZwlGB93M\"",
		"mtime": "2026-08-01T20:33:03.207Z",
		"size": 7081,
		"path": "../public/assets/assets.index-ChRXBkP5.js"
	},
	"/assets/badge-DDLUF7PO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30a-REOGWXNBEzWT4UlctP+7aDxaqIE\"",
		"mtime": "2026-08-01T20:33:03.208Z",
		"size": 778,
		"path": "../public/assets/badge-DDLUF7PO.js"
	},
	"/assets/assets._id-DpUEqGdm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2afc-pkKzKHWX6Fe8Uk8K1EtGKObAEFc\"",
		"mtime": "2026-08-01T20:33:03.206Z",
		"size": 11004,
		"path": "../public/assets/assets._id-DpUEqGdm.js"
	},
	"/assets/boxes-DZq5QoSg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"353-ase3g6ngpSGF2xeMKVUIe7uQf8M\"",
		"mtime": "2026-08-01T20:33:03.210Z",
		"size": 851,
		"path": "../public/assets/boxes-DZq5QoSg.js"
	},
	"/assets/circle-check-D7_KrlMJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-A0El/RArX9vhCNZKeYM0VlNLdiA\"",
		"mtime": "2026-08-01T20:33:03.210Z",
		"size": 290,
		"path": "../public/assets/circle-check-D7_KrlMJ.js"
	},
	"/assets/createLucideIcon-Qk0VrUvi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32f1-YcgSnbeHPGUm7KIGejOIRD4fj3Y\"",
		"mtime": "2026-08-01T20:33:03.212Z",
		"size": 13041,
		"path": "../public/assets/createLucideIcon-Qk0VrUvi.js"
	},
	"/assets/client-IP22RIIS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a46-NbvTq942nuF3T47KZtcR1hU3bhA\"",
		"mtime": "2026-08-01T20:33:03.210Z",
		"size": 19014,
		"path": "../public/assets/client-IP22RIIS.js"
	},
	"/assets/DateInput-C60nmZyw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"377-vDrvHaLSjWbKVda282Ap4RqCAKw\"",
		"mtime": "2026-08-01T20:33:03.148Z",
		"size": 887,
		"path": "../public/assets/DateInput-C60nmZyw.js"
	},
	"/assets/inventory-Bh_PZGpB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c7-MRDqY3W/AfaWWwDjJj7K3KGjoRM\"",
		"mtime": "2026-08-01T20:33:03.214Z",
		"size": 5063,
		"path": "../public/assets/inventory-Bh_PZGpB.js"
	},
	"/assets/index-C21-fqTg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"548d1-hGjpg5FPWzWb5uKn+f+OewPySvA\"",
		"mtime": "2026-08-01T20:33:03.146Z",
		"size": 346321,
		"path": "../public/assets/index-C21-fqTg.js"
	},
	"/assets/dist-DhtPlH96.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ed5-uCrJc073W7so1uBq/vRqHe5VsLg\"",
		"mtime": "2026-08-01T20:33:03.214Z",
		"size": 7893,
		"path": "../public/assets/dist-DhtPlH96.js"
	},
	"/assets/licenses-BV2o76Wp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2688-NU6qkCfCsrwrdG219USmM1cjo2Q\"",
		"mtime": "2026-08-01T20:33:03.218Z",
		"size": 9864,
		"path": "../public/assets/licenses-BV2o76Wp.js"
	},
	"/assets/key-round-Choqrki2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-bqJXqFUZWKioeJY9n7V6VjMtwXE\"",
		"mtime": "2026-08-01T20:33:03.216Z",
		"size": 355,
		"path": "../public/assets/key-round-Choqrki2.js"
	},
	"/assets/licenses._id-IkNFJowH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2530-DDBZ/LF0wdkHQRhA/ba3PGUGyDk\"",
		"mtime": "2026-08-01T20:33:03.220Z",
		"size": 9520,
		"path": "../public/assets/licenses._id-IkNFJowH.js"
	},
	"/assets/Match-DRxvtcu4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bde2-afpZMBPN8O0jhWbRSF8LIEhQIrU\"",
		"mtime": "2026-08-01T20:33:03.148Z",
		"size": 48610,
		"path": "../public/assets/Match-DRxvtcu4.js"
	},
	"/assets/maintenance-ne3Zr16D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c6f-eKYuSAQmnnHPCuy9G6mMy+U+DHM\"",
		"mtime": "2026-08-01T20:33:03.226Z",
		"size": 7279,
		"path": "../public/assets/maintenance-ne3Zr16D.js"
	},
	"/assets/ManagementVisuals-Kh2FK-6C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4eb-BDlgS3CCXPnjO9LJ7KB1AhOJyTI\"",
		"mtime": "2026-08-01T20:33:03.148Z",
		"size": 1259,
		"path": "../public/assets/ManagementVisuals-Kh2FK-6C.js"
	},
	"/assets/link-Dk83dzTz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10fb-jhkqQt0GjAFPz0htLUGQcntLGf0\"",
		"mtime": "2026-08-01T20:33:03.224Z",
		"size": 4347,
		"path": "../public/assets/link-Dk83dzTz.js"
	},
	"/assets/matchContext-uniO04wV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a1-E4AD8lvE/ROJdnVOeWparwJuuFI\"",
		"mtime": "2026-08-01T20:33:03.242Z",
		"size": 673,
		"path": "../public/assets/matchContext-uniO04wV.js"
	},
	"/assets/monitor-DpS-RQS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-mEurdxWAE2k0rQNjgWw+RGRTKm4\"",
		"mtime": "2026-08-01T20:33:03.242Z",
		"size": 259,
		"path": "../public/assets/monitor-DpS-RQS9.js"
	},
	"/assets/package-BP5brPu7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-y6kcMBaUpHERgIv08fNGaWaoUoo\"",
		"mtime": "2026-08-01T20:33:03.244Z",
		"size": 372,
		"path": "../public/assets/package-BP5brPu7.js"
	},
	"/assets/people-departments-DwA0SGqg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2008-KqlhTJHZb0kFJoZ2oM2NAiL8Wyw\"",
		"mtime": "2026-08-01T20:33:03.244Z",
		"size": 8200,
		"path": "../public/assets/people-departments-DwA0SGqg.js"
	},
	"/assets/people-departments.employee._id-CJbf60DB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2d-rtZC7JKbcOl/sH1Pb1dzWMSY6x0\"",
		"mtime": "2026-08-01T20:33:03.246Z",
		"size": 7213,
		"path": "../public/assets/people-departments.employee._id-CJbf60DB.js"
	},
	"/assets/phone-t3G6-Ozk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-0c836CXU3kmruYydIYK3w6vEPTY\"",
		"mtime": "2026-08-01T20:33:03.247Z",
		"size": 482,
		"path": "../public/assets/phone-t3G6-Ozk.js"
	},
	"/assets/plus-D3JGa-eM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-gVIPH2490F/00xLVFQU0xwsEu38\"",
		"mtime": "2026-08-01T20:33:03.247Z",
		"size": 153,
		"path": "../public/assets/plus-D3JGa-eM.js"
	},
	"/assets/PrinterFormDialog-CEC9q5im.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a16-s4WEFwbqBQMhVQQf6uBKMdY1saQ\"",
		"mtime": "2026-08-01T20:33:03.148Z",
		"size": 6678,
		"path": "../public/assets/PrinterFormDialog-CEC9q5im.js"
	},
	"/assets/people-departments._id-Bg7Ob78O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19ad-hGaJ1ujBj7to5Kokf8GMxoE+FBU\"",
		"mtime": "2026-08-01T20:33:03.245Z",
		"size": 6573,
		"path": "../public/assets/people-departments._id-Bg7Ob78O.js"
	},
	"/assets/PrinterImage-CKTvgme7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"348-lxtS9zyj5nWRPre+viyDjqmEHBY\"",
		"mtime": "2026-08-01T20:33:03.192Z",
		"size": 840,
		"path": "../public/assets/PrinterImage-CKTvgme7.js"
	},
	"/assets/printers._id-DmvcCL-R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ea0-aD3BbPdEgiyQNZ3+P8T4nzxUAhQ\"",
		"mtime": "2026-08-01T20:33:03.249Z",
		"size": 20128,
		"path": "../public/assets/printers._id-DmvcCL-R.js"
	},
	"/assets/printers.index-Bqy6jTeL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1444-FG9/CLMPgB1yiu1L4q4yY0mMPcI\"",
		"mtime": "2026-08-01T20:33:03.251Z",
		"size": 5188,
		"path": "../public/assets/printers.index-Bqy6jTeL.js"
	},
	"/assets/reports-DPD8G7GG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15f1-lfi05XdepdjO8hN6YLdy8XYXPzY\"",
		"mtime": "2026-08-01T20:33:03.251Z",
		"size": 5617,
		"path": "../public/assets/reports-DPD8G7GG.js"
	},
	"/assets/search-DEw924v7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-5HEnljnwVILjUxOgfCWj9/JCC1w\"",
		"mtime": "2026-08-01T20:33:03.255Z",
		"size": 174,
		"path": "../public/assets/search-DEw924v7.js"
	},
	"/assets/settings-B7Y1Sqtr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3831-t6vguR9Gex6156CU2fZqSoAW4Vo\"",
		"mtime": "2026-08-01T20:33:03.255Z",
		"size": 14385,
		"path": "../public/assets/settings-B7Y1Sqtr.js"
	},
	"/assets/star-JBFCAXDA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-qFVa6u4fOBXOrz1NGlxhCo8hxeM\"",
		"mtime": "2026-08-01T20:33:03.255Z",
		"size": 472,
		"path": "../public/assets/star-JBFCAXDA.js"
	},
	"/assets/styles-Cuwcro6u.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15e42-blunNdQXa6V0zkVnrdMsLAmW4Og\"",
		"mtime": "2026-08-01T20:33:03.269Z",
		"size": 89666,
		"path": "../public/assets/styles-Cuwcro6u.css"
	},
	"/assets/route-CGSDwlsC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b25-eKNJvMNq3vvTJniO1KQlC5kS9Jc\"",
		"mtime": "2026-08-01T20:33:03.253Z",
		"size": 2853,
		"path": "../public/assets/route-CGSDwlsC.js"
	},
	"/assets/table-IIw2L0A5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66d-8NVUVSmKSQI0L/kIJU4GTLViQ+U\"",
		"mtime": "2026-08-01T20:33:03.260Z",
		"size": 1645,
		"path": "../public/assets/table-IIw2L0A5.js"
	},
	"/assets/suppliers-CBsJ42Rt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1388-Gf9n9Bf0H7tNWN7jxprBEMoScDM\"",
		"mtime": "2026-08-01T20:33:03.258Z",
		"size": 5e3,
		"path": "../public/assets/suppliers-CBsJ42Rt.js"
	},
	"/assets/tabs-DWFmCTsq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d17-qTX5AlOQ1SXUURxz2vatkOaH1O4\"",
		"mtime": "2026-08-01T20:33:03.260Z",
		"size": 7447,
		"path": "../public/assets/tabs-DWFmCTsq.js"
	},
	"/assets/textarea-D77YRpMt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7140-HhczrT00LQeHdcHVgseMIxR01/k\"",
		"mtime": "2026-08-01T20:33:03.262Z",
		"size": 28992,
		"path": "../public/assets/textarea-D77YRpMt.js"
	},
	"/assets/triangle-alert-CZZ9C9sE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-+poKDnUvoXsqHK2AVNeR4N4qvzk\"",
		"mtime": "2026-08-01T20:33:03.264Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-CZZ9C9sE.js"
	},
	"/assets/trash-2-DgkP6Fh4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-hs6N6+iveJcHtBWvwns01vAMGvs\"",
		"mtime": "2026-08-01T20:33:03.264Z",
		"size": 551,
		"path": "../public/assets/trash-2-DgkP6Fh4.js"
	},
	"/assets/toners-f-ZCabue.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"260b-aFOTK4XRE/EEbFK4uAjbuqRrgvI\"",
		"mtime": "2026-08-01T20:33:03.262Z",
		"size": 9739,
		"path": "../public/assets/toners-f-ZCabue.js"
	},
	"/assets/useQuery-aEJk7YzA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"225a-Fvxz7bSbncO11TJRAkE6dCgvukU\"",
		"mtime": "2026-08-01T20:33:03.264Z",
		"size": 8794,
		"path": "../public/assets/useQuery-aEJk7YzA.js"
	},
	"/assets/user-round-DbW_Pjo9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6-suCKeUrK00zDzh5LBN8mZLEN2WM\"",
		"mtime": "2026-08-01T20:33:03.266Z",
		"size": 182,
		"path": "../public/assets/user-round-DbW_Pjo9.js"
	},
	"/assets/users-round-T_YFhOD-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-3DtO02iZknxF/JDj68j37OlQzVw\"",
		"mtime": "2026-08-01T20:33:03.266Z",
		"size": 253,
		"path": "../public/assets/users-round-T_YFhOD-.js"
	},
	"/assets/users-BurfCEqM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-thrX+U46+7JeB2p+ND2DjKleVGE\"",
		"mtime": "2026-08-01T20:33:03.266Z",
		"size": 306,
		"path": "../public/assets/users-BurfCEqM.js"
	},
	"/assets/useStore-DEQr5G4Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af0-NF7LTfGtTdIf+aFUa0wBOaIzZaU\"",
		"mtime": "2026-08-01T20:33:03.264Z",
		"size": 19184,
		"path": "../public/assets/useStore-DEQr5G4Q.js"
	},
	"/assets/wrench-BvAAtyPF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-Cw1uwGxI2YCLQ9VdPEtyMXWqNig\"",
		"mtime": "2026-08-01T20:33:03.268Z",
		"size": 303,
		"path": "../public/assets/wrench-BvAAtyPF.js"
	},
	"/assets/x-Ou_h5HDa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a13b-20WVxCO/rSTZKaJplpaBC8LECTA\"",
		"mtime": "2026-08-01T20:33:03.268Z",
		"size": 41275,
		"path": "../public/assets/x-Ou_h5HDa.js"
	},
	"/assets/_authenticated-gGp2MAhg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82895-0+asNbEFpriaNR0bZD9E4tBrZaI\"",
		"mtime": "2026-08-01T20:33:03.192Z",
		"size": 534677,
		"path": "../public/assets/_authenticated-gGp2MAhg.js"
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

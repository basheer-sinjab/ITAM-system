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
	"/printersfloss-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printersfloss-desktop.ico"
	},
	"/printers-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printers-desktop.ico"
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
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T13:12:02.444Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/arrow-right-DNJwBKfT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-cJv0Zc38qmmtLmGVnGQsCsl3w44\"",
		"mtime": "2026-08-03T14:46:42.017Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DNJwBKfT.js"
	},
	"/assets/assets.index-n_3kcyl1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bae-Tl4/8lkhn5w3GCFl2N+WJSsw7EM\"",
		"mtime": "2026-08-03T14:46:42.018Z",
		"size": 7086,
		"path": "../public/assets/assets.index-n_3kcyl1.js"
	},
	"/assets/assets._id-DBGriPee.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2afc-i2IN/OeMs0fdZmM8QLtCZwxTUt8\"",
		"mtime": "2026-08-03T14:46:42.017Z",
		"size": 11004,
		"path": "../public/assets/assets._id-DBGriPee.js"
	},
	"/assets/badge-CqJecQYX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30a-6ht8sVs/w6h6Z0z5L9Ryrj0cd+Y\"",
		"mtime": "2026-08-03T14:46:42.018Z",
		"size": 778,
		"path": "../public/assets/badge-CqJecQYX.js"
	},
	"/assets/boxes-DZq5QoSg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"353-ase3g6ngpSGF2xeMKVUIe7uQf8M\"",
		"mtime": "2026-08-03T14:46:42.018Z",
		"size": 851,
		"path": "../public/assets/boxes-DZq5QoSg.js"
	},
	"/assets/circle-check-D7_KrlMJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-A0El/RArX9vhCNZKeYM0VlNLdiA\"",
		"mtime": "2026-08-03T14:46:42.019Z",
		"size": 290,
		"path": "../public/assets/circle-check-D7_KrlMJ.js"
	},
	"/assets/client-IP22RIIS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a46-NbvTq942nuF3T47KZtcR1hU3bhA\"",
		"mtime": "2026-08-03T14:46:42.019Z",
		"size": 19014,
		"path": "../public/assets/client-IP22RIIS.js"
	},
	"/assets/DateInput-cAQ-6ttD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"377-Si/8KNb/IXc0PFOkpH1mG0CaqPA\"",
		"mtime": "2026-08-03T14:46:42.012Z",
		"size": 887,
		"path": "../public/assets/DateInput-cAQ-6ttD.js"
	},
	"/assets/dist-BHjoVWje.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ed5-48spE1XW+YRLYOH1G5XLqaOKYH4\"",
		"mtime": "2026-08-03T14:46:42.020Z",
		"size": 7893,
		"path": "../public/assets/dist-BHjoVWje.js"
	},
	"/assets/inventory-sFGrI_q4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d7e-2r/WFZm7qpEUQnLWEz49c8DWPGE\"",
		"mtime": "2026-08-03T14:46:42.020Z",
		"size": 7550,
		"path": "../public/assets/inventory-sFGrI_q4.js"
	},
	"/assets/key-round-Choqrki2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-bqJXqFUZWKioeJY9n7V6VjMtwXE\"",
		"mtime": "2026-08-03T14:46:42.021Z",
		"size": 355,
		"path": "../public/assets/key-round-Choqrki2.js"
	},
	"/assets/licenses-D8xvDjaX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2688-IEr7gr24WzCSYcvkzeHLZxjezjs\"",
		"mtime": "2026-08-03T14:46:42.021Z",
		"size": 9864,
		"path": "../public/assets/licenses-D8xvDjaX.js"
	},
	"/assets/link-Dk83dzTz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10fb-jhkqQt0GjAFPz0htLUGQcntLGf0\"",
		"mtime": "2026-08-03T14:46:42.022Z",
		"size": 4347,
		"path": "../public/assets/link-Dk83dzTz.js"
	},
	"/assets/maintenance-Ch4zu5fn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"236d-sHsbGgi5APUegD1XWVROr7EH3xU\"",
		"mtime": "2026-08-03T14:46:42.022Z",
		"size": 9069,
		"path": "../public/assets/maintenance-Ch4zu5fn.js"
	},
	"/assets/licenses._id-CUetCGw7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2530-o10fJonfF1IoRqVe3csKT69wS8c\"",
		"mtime": "2026-08-03T14:46:42.021Z",
		"size": 9520,
		"path": "../public/assets/licenses._id-CUetCGw7.js"
	},
	"/assets/ManagementVisuals-Kh2FK-6C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4eb-BDlgS3CCXPnjO9LJ7KB1AhOJyTI\"",
		"mtime": "2026-08-03T14:46:42.012Z",
		"size": 1259,
		"path": "../public/assets/ManagementVisuals-Kh2FK-6C.js"
	},
	"/assets/createLucideIcon-Qk0VrUvi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32f1-YcgSnbeHPGUm7KIGejOIRD4fj3Y\"",
		"mtime": "2026-08-03T14:46:42.019Z",
		"size": 13041,
		"path": "../public/assets/createLucideIcon-Qk0VrUvi.js"
	},
	"/assets/Match-DRxvtcu4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bde2-afpZMBPN8O0jhWbRSF8LIEhQIrU\"",
		"mtime": "2026-08-03T14:46:42.013Z",
		"size": 48610,
		"path": "../public/assets/Match-DRxvtcu4.js"
	},
	"/assets/index-RqvlM8Hz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c98c-gZjy5WSif+qqZ8sj2FxLRwTEpOQ\"",
		"mtime": "2026-08-03T14:46:42.012Z",
		"size": 313740,
		"path": "../public/assets/index-RqvlM8Hz.js"
	},
	"/assets/monitor-DpS-RQS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-mEurdxWAE2k0rQNjgWw+RGRTKm4\"",
		"mtime": "2026-08-03T14:46:42.023Z",
		"size": 259,
		"path": "../public/assets/monitor-DpS-RQS9.js"
	},
	"/assets/matchContext-uniO04wV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a1-E4AD8lvE/ROJdnVOeWparwJuuFI\"",
		"mtime": "2026-08-03T14:46:42.022Z",
		"size": 673,
		"path": "../public/assets/matchContext-uniO04wV.js"
	},
	"/assets/people-departments._id-DqeudQ5X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a57-kqgAmrYXiUG2Rxc3msfjEmhtP/U\"",
		"mtime": "2026-08-03T14:46:42.024Z",
		"size": 6743,
		"path": "../public/assets/people-departments._id-DqeudQ5X.js"
	},
	"/assets/package-BP5brPu7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-y6kcMBaUpHERgIv08fNGaWaoUoo\"",
		"mtime": "2026-08-03T14:46:42.023Z",
		"size": 372,
		"path": "../public/assets/package-BP5brPu7.js"
	},
	"/assets/people-departments.employee._id-DUa3Jl7V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2d-lzAx/RhF2oec3W6E9zYKnlRx6NY\"",
		"mtime": "2026-08-03T14:46:42.024Z",
		"size": 7213,
		"path": "../public/assets/people-departments.employee._id-DUa3Jl7V.js"
	},
	"/assets/people-departments-BHFvHTLk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37df-W91/uWExOri5zfeKAZ5pB2ZauZs\"",
		"mtime": "2026-08-03T14:46:42.023Z",
		"size": 14303,
		"path": "../public/assets/people-departments-BHFvHTLk.js"
	},
	"/assets/phone-t3G6-Ozk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-0c836CXU3kmruYydIYK3w6vEPTY\"",
		"mtime": "2026-08-03T14:46:42.025Z",
		"size": 482,
		"path": "../public/assets/phone-t3G6-Ozk.js"
	},
	"/assets/plus-D3JGa-eM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-gVIPH2490F/00xLVFQU0xwsEu38\"",
		"mtime": "2026-08-03T14:46:42.026Z",
		"size": 153,
		"path": "../public/assets/plus-D3JGa-eM.js"
	},
	"/assets/PrinterImage-JrMx3AEs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"348-8WE8hvzDzqIKax/V1NrBhmAXQC0\"",
		"mtime": "2026-08-03T14:46:42.015Z",
		"size": 840,
		"path": "../public/assets/PrinterImage-JrMx3AEs.js"
	},
	"/assets/PrinterFormDialog-D_ALA9Hd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a16-cNz0/vL9B1k2hwIVxHIG/P9s1aI\"",
		"mtime": "2026-08-03T14:46:42.013Z",
		"size": 6678,
		"path": "../public/assets/PrinterFormDialog-D_ALA9Hd.js"
	},
	"/assets/reports-CqsLeEir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15f1-EXT6eke8pdRhFsUzKf8XIt+zvcg\"",
		"mtime": "2026-08-03T14:46:42.029Z",
		"size": 5617,
		"path": "../public/assets/reports-CqsLeEir.js"
	},
	"/assets/printers._id-C4u84iyd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ea0-YdaMOy1m4yWL1rYVIp2lFcxuI4k\"",
		"mtime": "2026-08-03T14:46:42.026Z",
		"size": 20128,
		"path": "../public/assets/printers._id-C4u84iyd.js"
	},
	"/assets/printers.index-DWoaKCX-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1444-lcXwwyDPVVQ0vmhV6So0zL+pyV0\"",
		"mtime": "2026-08-03T14:46:42.028Z",
		"size": 5188,
		"path": "../public/assets/printers.index-DWoaKCX-.js"
	},
	"/assets/settings-D4iM7mOz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"382c-EhXmsP9wyBIBhbQJcUILRZY1SnM\"",
		"mtime": "2026-08-03T14:46:42.031Z",
		"size": 14380,
		"path": "../public/assets/settings-D4iM7mOz.js"
	},
	"/assets/star-JBFCAXDA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-qFVa6u4fOBXOrz1NGlxhCo8hxeM\"",
		"mtime": "2026-08-03T14:46:42.031Z",
		"size": 472,
		"path": "../public/assets/star-JBFCAXDA.js"
	},
	"/assets/tabs-BQw3BVMb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d17-ftBW3dZejJmJL6/UrqVejPdikuY\"",
		"mtime": "2026-08-03T14:46:42.032Z",
		"size": 7447,
		"path": "../public/assets/tabs-BQw3BVMb.js"
	},
	"/assets/route-CGSDwlsC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b25-eKNJvMNq3vvTJniO1KQlC5kS9Jc\"",
		"mtime": "2026-08-03T14:46:42.030Z",
		"size": 2853,
		"path": "../public/assets/route-CGSDwlsC.js"
	},
	"/assets/textarea-DaRF-7o7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7140-BweonNXZqIsxe0H4Z1IHftGHGQA\"",
		"mtime": "2026-08-03T14:46:42.033Z",
		"size": 28992,
		"path": "../public/assets/textarea-DaRF-7o7.js"
	},
	"/assets/search-DEw924v7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-5HEnljnwVILjUxOgfCWj9/JCC1w\"",
		"mtime": "2026-08-03T14:46:42.030Z",
		"size": 174,
		"path": "../public/assets/search-DEw924v7.js"
	},
	"/assets/suppliers-BgcI6txJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1388-2g5UZeUEkYzKLP2Kk4MQuQ54OvE\"",
		"mtime": "2026-08-03T14:46:42.032Z",
		"size": 5e3,
		"path": "../public/assets/suppliers-BgcI6txJ.js"
	},
	"/assets/toners-D0L7xiSN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"260b-T1ZnK22qN+HxNySHcGi8vH1cAvE\"",
		"mtime": "2026-08-03T14:46:42.033Z",
		"size": 9739,
		"path": "../public/assets/toners-D0L7xiSN.js"
	},
	"/assets/triangle-alert-CZZ9C9sE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-+poKDnUvoXsqHK2AVNeR4N4qvzk\"",
		"mtime": "2026-08-03T14:46:42.035Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-CZZ9C9sE.js"
	},
	"/assets/trash-2-DgkP6Fh4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-hs6N6+iveJcHtBWvwns01vAMGvs\"",
		"mtime": "2026-08-03T14:46:42.034Z",
		"size": 551,
		"path": "../public/assets/trash-2-DgkP6Fh4.js"
	},
	"/assets/styles-CqCftUA3.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"161a6-ZPlwhR3rIB36lPXhUchMwUB24tU\"",
		"mtime": "2026-08-03T14:46:42.039Z",
		"size": 90534,
		"path": "../public/assets/styles-CqCftUA3.css"
	},
	"/assets/table-DOmxKxLs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66d-iaacAoDhQCjotkEubTfmMtAJzOM\"",
		"mtime": "2026-08-03T14:46:42.032Z",
		"size": 1645,
		"path": "../public/assets/table-DOmxKxLs.js"
	},
	"/assets/user-round-DbW_Pjo9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6-suCKeUrK00zDzh5LBN8mZLEN2WM\"",
		"mtime": "2026-08-03T14:46:42.037Z",
		"size": 182,
		"path": "../public/assets/user-round-DbW_Pjo9.js"
	},
	"/assets/useQuery-aEJk7YzA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"225a-Fvxz7bSbncO11TJRAkE6dCgvukU\"",
		"mtime": "2026-08-03T14:46:42.036Z",
		"size": 8794,
		"path": "../public/assets/useQuery-aEJk7YzA.js"
	},
	"/assets/users-round-T_YFhOD-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-3DtO02iZknxF/JDj68j37OlQzVw\"",
		"mtime": "2026-08-03T14:46:42.038Z",
		"size": 253,
		"path": "../public/assets/users-round-T_YFhOD-.js"
	},
	"/assets/wrench-BvAAtyPF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-Cw1uwGxI2YCLQ9VdPEtyMXWqNig\"",
		"mtime": "2026-08-03T14:46:42.038Z",
		"size": 303,
		"path": "../public/assets/wrench-BvAAtyPF.js"
	},
	"/assets/useStore-DEQr5G4Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af0-NF7LTfGtTdIf+aFUa0wBOaIzZaU\"",
		"mtime": "2026-08-03T14:46:42.037Z",
		"size": 19184,
		"path": "../public/assets/useStore-DEQr5G4Q.js"
	},
	"/assets/users-BurfCEqM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-thrX+U46+7JeB2p+ND2DjKleVGE\"",
		"mtime": "2026-08-03T14:46:42.038Z",
		"size": 306,
		"path": "../public/assets/users-BurfCEqM.js"
	},
	"/assets/x-CoLmycYM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1208a-/A0AoOJy+G7Gwm2uaGl78JHoVYg\"",
		"mtime": "2026-08-03T14:46:42.039Z",
		"size": 73866,
		"path": "../public/assets/x-CoLmycYM.js"
	},
	"/assets/_authenticated-C7wP8L-O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82946-3SDmFu7rY5C53HBJByBPLPYiqsE\"",
		"mtime": "2026-08-03T14:46:42.016Z",
		"size": 534854,
		"path": "../public/assets/_authenticated-C7wP8L-O.js"
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

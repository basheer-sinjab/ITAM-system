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
	"/printersfloss-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printersfloss-desktop.ico"
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
		"mtime": "2026-08-01T20:05:00.191Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DNJwBKfT.js"
	},
	"/assets/badge-DGsKcmkA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32b-6dyLlQ3JJwTsA8kgYm6X38m/BDI\"",
		"mtime": "2026-08-01T20:05:00.193Z",
		"size": 811,
		"path": "../public/assets/badge-DGsKcmkA.js"
	},
	"/assets/createLucideIcon-Qk0VrUvi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32f1-YcgSnbeHPGUm7KIGejOIRD4fj3Y\"",
		"mtime": "2026-08-01T20:05:00.193Z",
		"size": 13041,
		"path": "../public/assets/createLucideIcon-Qk0VrUvi.js"
	},
	"/assets/DateInput-nlTFoMjD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"377-OTiYyTagYoqVNfi6MhFFobM+aPs\"",
		"mtime": "2026-08-01T20:05:00.146Z",
		"size": 887,
		"path": "../public/assets/DateInput-nlTFoMjD.js"
	},
	"/assets/assets._id-DCAa5B-F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2afb-urUuhLOgDCJRg9JLG+9JqrfOY5I\"",
		"mtime": "2026-08-01T20:05:00.193Z",
		"size": 11003,
		"path": "../public/assets/assets._id-DCAa5B-F.js"
	},
	"/assets/assets.index-bPtDCsnx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b8-diI5CazAhdqQq+TfOcw2UqxdQts\"",
		"mtime": "2026-08-01T20:05:00.193Z",
		"size": 6328,
		"path": "../public/assets/assets.index-bPtDCsnx.js"
	},
	"/assets/dist-C5KdG6FI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ed5-Bx19I8fktV3+ikUCpSrtMP0udQI\"",
		"mtime": "2026-08-01T20:05:00.193Z",
		"size": 7893,
		"path": "../public/assets/dist-C5KdG6FI.js"
	},
	"/assets/key-round-Choqrki2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-bqJXqFUZWKioeJY9n7V6VjMtwXE\"",
		"mtime": "2026-08-01T20:05:00.196Z",
		"size": 355,
		"path": "../public/assets/key-round-Choqrki2.js"
	},
	"/assets/inventory-Gzpa4HKk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1053-RdDjgCVwj4wKM8r1hXkft8VJSVU\"",
		"mtime": "2026-08-01T20:05:00.195Z",
		"size": 4179,
		"path": "../public/assets/inventory-Gzpa4HKk.js"
	},
	"/assets/licenses._id-CY5IM3uj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2574-Zps6Mx6S+IqaLss2XCQclUpt5kc\"",
		"mtime": "2026-08-01T20:05:00.196Z",
		"size": 9588,
		"path": "../public/assets/licenses._id-CY5IM3uj.js"
	},
	"/assets/link-Dk83dzTz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10fb-jhkqQt0GjAFPz0htLUGQcntLGf0\"",
		"mtime": "2026-08-01T20:05:00.197Z",
		"size": 4347,
		"path": "../public/assets/link-Dk83dzTz.js"
	},
	"/assets/maintenance-SexKFE3M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a72-vzF9gfUhNykEZYqOUvzCZH6jGn8\"",
		"mtime": "2026-08-01T20:05:00.197Z",
		"size": 6770,
		"path": "../public/assets/maintenance-SexKFE3M.js"
	},
	"/assets/Match-DRxvtcu4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bde2-afpZMBPN8O0jhWbRSF8LIEhQIrU\"",
		"mtime": "2026-08-01T20:05:00.146Z",
		"size": 48610,
		"path": "../public/assets/Match-DRxvtcu4.js"
	},
	"/assets/matchContext-uniO04wV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a1-E4AD8lvE/ROJdnVOeWparwJuuFI\"",
		"mtime": "2026-08-01T20:05:00.197Z",
		"size": 673,
		"path": "../public/assets/matchContext-uniO04wV.js"
	},
	"/assets/monitor-DpS-RQS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-mEurdxWAE2k0rQNjgWw+RGRTKm4\"",
		"mtime": "2026-08-01T20:05:00.197Z",
		"size": 259,
		"path": "../public/assets/monitor-DpS-RQS9.js"
	},
	"/assets/people-departments.employee._id-b1qKFCqJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2c-pcBHUriZfUh7K3gN2Y/pBKsIipw\"",
		"mtime": "2026-08-01T20:05:00.199Z",
		"size": 7212,
		"path": "../public/assets/people-departments.employee._id-b1qKFCqJ.js"
	},
	"/assets/licenses-U1wXAF6l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27af-Rq6m6h5UzoIyxUga68GJdy3+8CA\"",
		"mtime": "2026-08-01T20:05:00.196Z",
		"size": 10159,
		"path": "../public/assets/licenses-U1wXAF6l.js"
	},
	"/assets/people-departments-BzjqBWsh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c1-JR69o2pdlDd8ANqfFZcs+SyQwws\"",
		"mtime": "2026-08-01T20:05:00.197Z",
		"size": 6337,
		"path": "../public/assets/people-departments-BzjqBWsh.js"
	},
	"/assets/index-CzIi8sdk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"548a2-i2JTElKvrjidiir4XcMwHQTT0f4\"",
		"mtime": "2026-08-01T20:05:00.143Z",
		"size": 346274,
		"path": "../public/assets/index-CzIi8sdk.js"
	},
	"/assets/people-departments._id-0T5eXDJs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"180a-4N2f940HlX2i6guUyPj7DAMnUNo\"",
		"mtime": "2026-08-01T20:05:00.197Z",
		"size": 6154,
		"path": "../public/assets/people-departments._id-0T5eXDJs.js"
	},
	"/assets/phone-t3G6-Ozk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-0c836CXU3kmruYydIYK3w6vEPTY\"",
		"mtime": "2026-08-01T20:05:00.199Z",
		"size": 482,
		"path": "../public/assets/phone-t3G6-Ozk.js"
	},
	"/assets/plus-D3JGa-eM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-gVIPH2490F/00xLVFQU0xwsEu38\"",
		"mtime": "2026-08-01T20:05:00.199Z",
		"size": 153,
		"path": "../public/assets/plus-D3JGa-eM.js"
	},
	"/assets/PrinterFormDialog-s3zHMaXe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a15-jagHj9zYssxmGNFEFKkFxuqTUOk\"",
		"mtime": "2026-08-01T20:05:00.146Z",
		"size": 6677,
		"path": "../public/assets/PrinterFormDialog-s3zHMaXe.js"
	},
	"/assets/printers.index-DTTbwcFs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1443-x6yp3SRq+NwknVMrCuFM6cX/SUI\"",
		"mtime": "2026-08-01T20:05:00.199Z",
		"size": 5187,
		"path": "../public/assets/printers.index-DTTbwcFs.js"
	},
	"/assets/printers._id-BUJo3HJO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e9f-ZesuRiO+BQqmeWhLaT7SzswlBp0\"",
		"mtime": "2026-08-01T20:05:00.199Z",
		"size": 20127,
		"path": "../public/assets/printers._id-BUJo3HJO.js"
	},
	"/assets/reports-BGYcnj49.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15f5-mFKDfSdQGmr29yDpnYh74nYsEDY\"",
		"mtime": "2026-08-01T20:05:00.199Z",
		"size": 5621,
		"path": "../public/assets/reports-BGYcnj49.js"
	},
	"/assets/search-DEw924v7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-5HEnljnwVILjUxOgfCWj9/JCC1w\"",
		"mtime": "2026-08-01T20:05:00.201Z",
		"size": 174,
		"path": "../public/assets/search-DEw924v7.js"
	},
	"/assets/PrinterImage-CirEYVzS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34c-B9qQTJCM84C9I8ygygg1y+Fv3vI\"",
		"mtime": "2026-08-01T20:05:00.146Z",
		"size": 844,
		"path": "../public/assets/PrinterImage-CirEYVzS.js"
	},
	"/assets/star-JBFCAXDA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-qFVa6u4fOBXOrz1NGlxhCo8hxeM\"",
		"mtime": "2026-08-01T20:05:00.202Z",
		"size": 472,
		"path": "../public/assets/star-JBFCAXDA.js"
	},
	"/assets/route-BbCKM-TC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c3a-kjjpVN6EaK+BkHySsn41Wvc0US0\"",
		"mtime": "2026-08-01T20:05:00.199Z",
		"size": 3130,
		"path": "../public/assets/route-BbCKM-TC.js"
	},
	"/assets/settings-BjzWNvmW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3795-9tdP2fZPB/lKTSwjuItc8sdO6yA\"",
		"mtime": "2026-08-01T20:05:00.202Z",
		"size": 14229,
		"path": "../public/assets/settings-BjzWNvmW.js"
	},
	"/assets/styles-CTP-a8Mv.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15a3c-vAWUh+Qk9aaYyERDFLgQGXP0pag\"",
		"mtime": "2026-08-01T20:05:00.210Z",
		"size": 88636,
		"path": "../public/assets/styles-CTP-a8Mv.css"
	},
	"/assets/suppliers-DzRZ8QaD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1387-ImuRIvMzc0PYAgAYSoBNVaZ0Bms\"",
		"mtime": "2026-08-01T20:05:00.202Z",
		"size": 4999,
		"path": "../public/assets/suppliers-DzRZ8QaD.js"
	},
	"/assets/table-ICPg9wHq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"671-CwevBfyhFiYmS4Rna+7SIuQM/Xs\"",
		"mtime": "2026-08-01T20:05:00.202Z",
		"size": 1649,
		"path": "../public/assets/table-ICPg9wHq.js"
	},
	"/assets/tabs-YcV6qVWL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d38-ereypPk6+3+RJmrXq2ryhrdIWrU\"",
		"mtime": "2026-08-01T20:05:00.202Z",
		"size": 7480,
		"path": "../public/assets/tabs-YcV6qVWL.js"
	},
	"/assets/textarea-DNrY7ZMt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7161-WYvcric3tEiEiKcaCDG8pKdlHAE\"",
		"mtime": "2026-08-01T20:05:00.202Z",
		"size": 29025,
		"path": "../public/assets/textarea-DNrY7ZMt.js"
	},
	"/assets/toners-DgGXuo1t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"260a-+YSTPjO1IqBF7aeSJfQRb4z/z7o\"",
		"mtime": "2026-08-01T20:05:00.202Z",
		"size": 9738,
		"path": "../public/assets/toners-DgGXuo1t.js"
	},
	"/assets/trash-2-DgkP6Fh4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-hs6N6+iveJcHtBWvwns01vAMGvs\"",
		"mtime": "2026-08-01T20:05:00.202Z",
		"size": 551,
		"path": "../public/assets/trash-2-DgkP6Fh4.js"
	},
	"/assets/triangle-alert-CZZ9C9sE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-+poKDnUvoXsqHK2AVNeR4N4qvzk\"",
		"mtime": "2026-08-01T20:05:00.204Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-CZZ9C9sE.js"
	},
	"/assets/users-BurfCEqM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-thrX+U46+7JeB2p+ND2DjKleVGE\"",
		"mtime": "2026-08-01T20:05:00.204Z",
		"size": 306,
		"path": "../public/assets/users-BurfCEqM.js"
	},
	"/assets/useQuery-KZBhHHfn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2254-Kv8Uf6Nhzpoeaz1xAHvwjTHGQ68\"",
		"mtime": "2026-08-01T20:05:00.204Z",
		"size": 8788,
		"path": "../public/assets/useQuery-KZBhHHfn.js"
	},
	"/assets/utils-gIWbD9L3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b558-PHu+WoUWjm7dgO+UhEBTzK6wrxE\"",
		"mtime": "2026-08-01T20:05:00.207Z",
		"size": 46424,
		"path": "../public/assets/utils-gIWbD9L3.js"
	},
	"/assets/useStore-DEQr5G4Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af0-NF7LTfGtTdIf+aFUa0wBOaIzZaU\"",
		"mtime": "2026-08-01T20:05:00.204Z",
		"size": 19184,
		"path": "../public/assets/useStore-DEQr5G4Q.js"
	},
	"/assets/wrench-BvAAtyPF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-Cw1uwGxI2YCLQ9VdPEtyMXWqNig\"",
		"mtime": "2026-08-01T20:05:00.208Z",
		"size": 303,
		"path": "../public/assets/wrench-BvAAtyPF.js"
	},
	"/assets/x-EF3sPXS6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"363e-IKnKXoBVbmlvRbgmTHu/f6rRkGw\"",
		"mtime": "2026-08-01T20:05:00.210Z",
		"size": 13886,
		"path": "../public/assets/x-EF3sPXS6.js"
	},
	"/assets/_authenticated-RxkXCxFZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fed-5dwmMjmye/gb8fo/5bWtAgLIuig\"",
		"mtime": "2026-08-01T20:05:00.190Z",
		"size": 8173,
		"path": "../public/assets/_authenticated-RxkXCxFZ.js"
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

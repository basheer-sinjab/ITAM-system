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
		"mtime": "2026-08-01T19:49:18.600Z",
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
	"/assets/assets._id-B7cLcslt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2afb-1LwAfIhnI+b9vWxuMY4wAPMgkjU\"",
		"mtime": "2026-08-01T19:49:18.600Z",
		"size": 11003,
		"path": "../public/assets/assets._id-B7cLcslt.js"
	},
	"/assets/assets.index-DmLoslVj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b6-1zuDRLHROuW/W8vaV3EwfluAy00\"",
		"mtime": "2026-08-01T19:49:18.603Z",
		"size": 6326,
		"path": "../public/assets/assets.index-DmLoslVj.js"
	},
	"/assets/badge-qaHHX5s8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32b-VBqmRXavwJVMzPp8pLcII6jO1oo\"",
		"mtime": "2026-08-01T19:49:18.605Z",
		"size": 811,
		"path": "../public/assets/badge-qaHHX5s8.js"
	},
	"/assets/createLucideIcon-Qk0VrUvi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32f1-YcgSnbeHPGUm7KIGejOIRD4fj3Y\"",
		"mtime": "2026-08-01T19:49:18.606Z",
		"size": 13041,
		"path": "../public/assets/createLucideIcon-Qk0VrUvi.js"
	},
	"/assets/dialog-DS6Ac9w0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7164-tm6UL1QTFzVtTf+gbWIy/ylfTxw\"",
		"mtime": "2026-08-01T19:49:18.607Z",
		"size": 29028,
		"path": "../public/assets/dialog-DS6Ac9w0.js"
	},
	"/assets/index-aDAchk7p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"564ff-Q/AoEe/m/sWJ/Owdhcy7Qz0Y4eo\"",
		"mtime": "2026-08-01T19:49:18.544Z",
		"size": 353535,
		"path": "../public/assets/index-aDAchk7p.js"
	},
	"/assets/DateInput-DY43iCRU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"377-BD0eHxPzjeF992N7H50V0WfuP34\"",
		"mtime": "2026-08-01T19:49:18.544Z",
		"size": 887,
		"path": "../public/assets/DateInput-DY43iCRU.js"
	},
	"/assets/key-round-Choqrki2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-bqJXqFUZWKioeJY9n7V6VjMtwXE\"",
		"mtime": "2026-08-01T19:49:18.609Z",
		"size": 355,
		"path": "../public/assets/key-round-Choqrki2.js"
	},
	"/assets/licenses-i8LwIJPN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d5a-idroGumD8lntCJewS1XCVZV9DmU\"",
		"mtime": "2026-08-01T19:49:18.609Z",
		"size": 7514,
		"path": "../public/assets/licenses-i8LwIJPN.js"
	},
	"/assets/inventory-mryqT3uv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ef-3ZkK8BDjN6gOjaDnGa9Zcf/KII4\"",
		"mtime": "2026-08-01T19:49:18.607Z",
		"size": 4335,
		"path": "../public/assets/inventory-mryqT3uv.js"
	},
	"/assets/link-CWAOiTup.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b24-3CifcNZX1Lbi72M/YRMUftfhVJc\"",
		"mtime": "2026-08-01T19:49:18.611Z",
		"size": 23332,
		"path": "../public/assets/link-CWAOiTup.js"
	},
	"/assets/maintenance-Cr8sDUbd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6b-kcpC0Fa9IRyCyhiPxndQajr0bn8\"",
		"mtime": "2026-08-01T19:49:18.611Z",
		"size": 6763,
		"path": "../public/assets/maintenance-Cr8sDUbd.js"
	},
	"/assets/Match-1AAqewC7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bdde-KqI4AtmLyGPHhy9Ti4E1GVYyyxk\"",
		"mtime": "2026-08-01T19:49:18.544Z",
		"size": 48606,
		"path": "../public/assets/Match-1AAqewC7.js"
	},
	"/assets/matchContext-uniO04wV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a1-E4AD8lvE/ROJdnVOeWparwJuuFI\"",
		"mtime": "2026-08-01T19:49:18.612Z",
		"size": 673,
		"path": "../public/assets/matchContext-uniO04wV.js"
	},
	"/assets/monitor-DpS-RQS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-mEurdxWAE2k0rQNjgWw+RGRTKm4\"",
		"mtime": "2026-08-01T19:49:18.614Z",
		"size": 259,
		"path": "../public/assets/monitor-DpS-RQS9.js"
	},
	"/assets/people-departments.employee._id-CeYjidXq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2a-3/pzRTkdmsMHBCuS8oI74rs6XEE\"",
		"mtime": "2026-08-01T19:49:18.618Z",
		"size": 7210,
		"path": "../public/assets/people-departments.employee._id-CeYjidXq.js"
	},
	"/assets/people-departments-DpQktdbC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b5-d0RMN5vvaRsw1wNWJ5AkVtNR8iA\"",
		"mtime": "2026-08-01T19:49:18.616Z",
		"size": 6325,
		"path": "../public/assets/people-departments-DpQktdbC.js"
	},
	"/assets/people-departments._id-gbpqlQXd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1808-14CEmYIz+lFYUvHlOLXk5XWNMAQ\"",
		"mtime": "2026-08-01T19:49:18.616Z",
		"size": 6152,
		"path": "../public/assets/people-departments._id-gbpqlQXd.js"
	},
	"/assets/phone-t3G6-Ozk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-0c836CXU3kmruYydIYK3w6vEPTY\"",
		"mtime": "2026-08-01T19:49:18.621Z",
		"size": 482,
		"path": "../public/assets/phone-t3G6-Ozk.js"
	},
	"/assets/plus-D3JGa-eM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-gVIPH2490F/00xLVFQU0xwsEu38\"",
		"mtime": "2026-08-01T19:49:18.621Z",
		"size": 153,
		"path": "../public/assets/plus-D3JGa-eM.js"
	},
	"/assets/PrinterFormDialog-D_ZP6BSI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a13-vTyCoSnm3tB5R5HvuTkUtD/huDM\"",
		"mtime": "2026-08-01T19:49:18.544Z",
		"size": 6675,
		"path": "../public/assets/PrinterFormDialog-D_ZP6BSI.js"
	},
	"/assets/PrinterImage-B0ycCdkc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34c-iP8zeLuZR1byZ3DvrRKD3OcprIo\"",
		"mtime": "2026-08-01T19:49:18.544Z",
		"size": 844,
		"path": "../public/assets/PrinterImage-B0ycCdkc.js"
	},
	"/assets/printers.index-B8Dl1K8D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1443-9k9O4n5mdTNYOwvtc3RSdYE6n6g\"",
		"mtime": "2026-08-01T19:49:18.625Z",
		"size": 5187,
		"path": "../public/assets/printers.index-B8Dl1K8D.js"
	},
	"/assets/printers._id-j1wjPeaC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e9d-VqFpDdm1Hw3eZNGVg2AhznoSMLk\"",
		"mtime": "2026-08-01T19:49:18.621Z",
		"size": 20125,
		"path": "../public/assets/printers._id-j1wjPeaC.js"
	},
	"/assets/search-DEw924v7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-5HEnljnwVILjUxOgfCWj9/JCC1w\"",
		"mtime": "2026-08-01T19:49:18.645Z",
		"size": 174,
		"path": "../public/assets/search-DEw924v7.js"
	},
	"/assets/star-JBFCAXDA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-qFVa6u4fOBXOrz1NGlxhCo8hxeM\"",
		"mtime": "2026-08-01T19:49:18.648Z",
		"size": 472,
		"path": "../public/assets/star-JBFCAXDA.js"
	},
	"/assets/table-ICPg9wHq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"671-CwevBfyhFiYmS4Rna+7SIuQM/Xs\"",
		"mtime": "2026-08-01T19:49:18.650Z",
		"size": 1649,
		"path": "../public/assets/table-ICPg9wHq.js"
	},
	"/assets/settings-bLOXeUWR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3775-8vCnti9p+TezVJZr8qcPS4e0blg\"",
		"mtime": "2026-08-01T19:49:18.645Z",
		"size": 14197,
		"path": "../public/assets/settings-bLOXeUWR.js"
	},
	"/assets/suppliers-e6VeHOKr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1385-TkraMTuQsgg/Vugm37fOOHKUAVc\"",
		"mtime": "2026-08-01T19:49:18.650Z",
		"size": 4997,
		"path": "../public/assets/suppliers-e6VeHOKr.js"
	},
	"/assets/tabs-BYzJL8x7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d39-MitmHxCnCu6iArjTffEzPw2tW9s\"",
		"mtime": "2026-08-01T19:49:18.652Z",
		"size": 7481,
		"path": "../public/assets/tabs-BYzJL8x7.js"
	},
	"/assets/toners-BEuPzLmq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2608-rDsS7AK7Ia7/66HoXxqBX6vPcwM\"",
		"mtime": "2026-08-01T19:49:18.652Z",
		"size": 9736,
		"path": "../public/assets/toners-BEuPzLmq.js"
	},
	"/assets/route-COkoeDGr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c3f-XUDO/ty95MUfOe1GVGV9lJJDEGI\"",
		"mtime": "2026-08-01T19:49:18.645Z",
		"size": 3135,
		"path": "../public/assets/route-COkoeDGr.js"
	},
	"/assets/useQuery-KZBhHHfn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2254-Kv8Uf6Nhzpoeaz1xAHvwjTHGQ68\"",
		"mtime": "2026-08-01T19:49:18.654Z",
		"size": 8788,
		"path": "../public/assets/useQuery-KZBhHHfn.js"
	},
	"/assets/reports-D35Zwms2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15fa-3kCexRAMp31Tl3UdK9khfNUR+jk\"",
		"mtime": "2026-08-01T19:49:18.644Z",
		"size": 5626,
		"path": "../public/assets/reports-D35Zwms2.js"
	},
	"/assets/styles-D0t90aCp.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15449-/kG6yuYqKGHyWMomYAmXVHBoBcE\"",
		"mtime": "2026-08-01T19:49:18.658Z",
		"size": 87113,
		"path": "../public/assets/styles-D0t90aCp.css"
	},
	"/assets/trash-2-DgkP6Fh4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-hs6N6+iveJcHtBWvwns01vAMGvs\"",
		"mtime": "2026-08-01T19:49:18.654Z",
		"size": 551,
		"path": "../public/assets/trash-2-DgkP6Fh4.js"
	},
	"/assets/users-BurfCEqM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-thrX+U46+7JeB2p+ND2DjKleVGE\"",
		"mtime": "2026-08-01T19:49:18.654Z",
		"size": 306,
		"path": "../public/assets/users-BurfCEqM.js"
	},
	"/assets/wrench-BvAAtyPF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-Cw1uwGxI2YCLQ9VdPEtyMXWqNig\"",
		"mtime": "2026-08-01T19:49:18.657Z",
		"size": 303,
		"path": "../public/assets/wrench-BvAAtyPF.js"
	},
	"/assets/utils-gIWbD9L3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b558-PHu+WoUWjm7dgO+UhEBTzK6wrxE\"",
		"mtime": "2026-08-01T19:49:18.656Z",
		"size": 46424,
		"path": "../public/assets/utils-gIWbD9L3.js"
	},
	"/assets/_authenticated-CkvSpfhJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fe8-Vkmo3aMafRiVaOkbLAYyB9rq3Zw\"",
		"mtime": "2026-08-01T19:49:18.600Z",
		"size": 8168,
		"path": "../public/assets/_authenticated-CkvSpfhJ.js"
	},
	"/assets/x-Bjj8_kH4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"363e-B7HL2BcuvcjuqRNCPnjYp+cnceM\"",
		"mtime": "2026-08-01T19:49:18.658Z",
		"size": 13886,
		"path": "../public/assets/x-Bjj8_kH4.js"
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

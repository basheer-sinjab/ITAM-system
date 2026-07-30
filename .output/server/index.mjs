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
	"/printers-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"a07e-6WKNoMmP6j5IbThbGXfCLNjfFjU\"",
		"mtime": "2026-07-30T18:35:39.317Z",
		"size": 41086,
		"path": "../public/printers-desktop.ico"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"836-YxZNi/cCCqwo3/YGHEkjT1K+ra0\"",
		"mtime": "2026-07-30T14:39:53.521Z",
		"size": 2102,
		"path": "../public/favicon.ico"
	},
	"/assets/createLucideIcon-Dhi9XBT_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-urCVHxiPQyx61bhikDR8SqJWdJk\"",
		"mtime": "2026-07-30T18:49:17.320Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-Dhi9XBT_.js"
	},
	"/assets/badge-BQ6wz9AH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe-W9STpyWYFWjQHNFEhFLXW646Xwk\"",
		"mtime": "2026-07-30T18:49:17.303Z",
		"size": 766,
		"path": "../public/assets/badge-BQ6wz9AH.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T13:12:02.444Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/dist-Bik0rj4E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a051-ANq1qsgtg40s68qTd9/8kfxN1Tk\"",
		"mtime": "2026-07-30T18:49:17.320Z",
		"size": 41041,
		"path": "../public/assets/dist-Bik0rj4E.js"
	},
	"/assets/dist-CZXoql1Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f0a-Tf7QUyYPUWFjrrCS33AdDtS3Gos\"",
		"mtime": "2026-07-30T18:49:17.321Z",
		"size": 7946,
		"path": "../public/assets/dist-CZXoql1Z.js"
	},
	"/assets/droplets-BIJtxTMT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-hBytZimv1zQBXAzev29SLQXylXo\"",
		"mtime": "2026-07-30T18:49:17.321Z",
		"size": 373,
		"path": "../public/assets/droplets-BIJtxTMT.js"
	},
	"/assets/jsx-runtime-yLamxOIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e87-z0S8yY8pXkwJwDchZ9crwsTHOZs\"",
		"mtime": "2026-07-30T18:49:17.321Z",
		"size": 11911,
		"path": "../public/assets/jsx-runtime-yLamxOIm.js"
	},
	"/assets/index-CzWrTaOd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55c1a-dZwCKKG3gWu5Lb+C83hgiDPp4IM\"",
		"mtime": "2026-07-30T18:49:17.301Z",
		"size": 351258,
		"path": "../public/assets/index-CzWrTaOd.js"
	},
	"/assets/pms-C-HmxCJs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"73e-+pQXkXNTvuW1IYV+ZdpvaZUM2K4\"",
		"mtime": "2026-07-30T18:49:17.325Z",
		"size": 1854,
		"path": "../public/assets/pms-C-HmxCJs.js"
	},
	"/assets/label-CO-kBigv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3cb1-plx67hrsd+qH/LYGhqev5Kn+cRs\"",
		"mtime": "2026-07-30T18:49:17.323Z",
		"size": 15537,
		"path": "../public/assets/label-CO-kBigv.js"
	},
	"/assets/plus-CehALaYj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-8VIM7re4rNXVORE8GDJg6XWW0Sk\"",
		"mtime": "2026-07-30T18:49:17.323Z",
		"size": 153,
		"path": "../public/assets/plus-CehALaYj.js"
	},
	"/assets/link-BIZAheVM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1a-b50/SbMKngzGLBqDu4ga5+rnY6g\"",
		"mtime": "2026-07-30T18:49:17.323Z",
		"size": 23322,
		"path": "../public/assets/link-BIZAheVM.js"
	},
	"/assets/printer-BcJd8laj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-O+wo4oONTTfJriTdz/Xd86rqZ7Y\"",
		"mtime": "2026-07-30T18:49:17.325Z",
		"size": 319,
		"path": "../public/assets/printer-BcJd8laj.js"
	},
	"/assets/PrinterFormDialog-BtmxfYQq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a0b-ji+pMAlm0TKPnnrHb4uF8/p7NEg\"",
		"mtime": "2026-07-30T18:49:17.301Z",
		"size": 6667,
		"path": "../public/assets/PrinterFormDialog-BtmxfYQq.js"
	},
	"/assets/printers.index-DKhxxANH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1442-j+B2XoVy5UuO/5jPJG8GZhEIffQ\"",
		"mtime": "2026-07-30T18:49:17.325Z",
		"size": 5186,
		"path": "../public/assets/printers.index-DKhxxANH.js"
	},
	"/assets/printers._id-DYaimFnc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f00-kRZd6shZmFZOdTowFBdZDlYG3t0\"",
		"mtime": "2026-07-30T18:49:17.325Z",
		"size": 20224,
		"path": "../public/assets/printers._id-DYaimFnc.js"
	},
	"/assets/reports-CikmktAO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15ca-ecRL4dx1DWcxbb7M5+XYfo47ujQ\"",
		"mtime": "2026-07-30T18:49:17.325Z",
		"size": 5578,
		"path": "../public/assets/reports-CikmktAO.js"
	},
	"/assets/route-DRVFS3Fq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea9-nGPqj7/qu4wssr3JNk8SVWEtwTU\"",
		"mtime": "2026-07-30T18:49:17.325Z",
		"size": 3753,
		"path": "../public/assets/route-DRVFS3Fq.js"
	},
	"/assets/PrinterImage-D7ICDUAu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"234-tS3/u2sUEhHelYKdh0r0kvPRbOM\"",
		"mtime": "2026-07-30T18:49:17.301Z",
		"size": 564,
		"path": "../public/assets/PrinterImage-D7ICDUAu.js"
	},
	"/assets/star-vnF-n8hL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-Xf6il3N/5znw1NJkGfcgU//729g\"",
		"mtime": "2026-07-30T18:49:17.327Z",
		"size": 472,
		"path": "../public/assets/star-vnF-n8hL.js"
	},
	"/assets/search-CFiVXvWR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-Y8bFoXePwpH24YkEW7xbruRQWzY\"",
		"mtime": "2026-07-30T18:49:17.327Z",
		"size": 174,
		"path": "../public/assets/search-CFiVXvWR.js"
	},
	"/assets/settings-BOfnbRLR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3788-FbwVwadG1OFOalIy1v7MF/vYoMg\"",
		"mtime": "2026-07-30T18:49:17.327Z",
		"size": 14216,
		"path": "../public/assets/settings-BOfnbRLR.js"
	},
	"/assets/select-CuMtOBV7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be0b-Wykmx52+007fSGFp/CJa8l+MQN4\"",
		"mtime": "2026-07-30T18:49:17.327Z",
		"size": 48651,
		"path": "../public/assets/select-CuMtOBV7.js"
	},
	"/assets/suppliers-C-t5kfIu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1361-2aNmVR2w1hu2NiWmz8x00F5uTpw\"",
		"mtime": "2026-07-30T18:49:17.327Z",
		"size": 4961,
		"path": "../public/assets/suppliers-C-t5kfIu.js"
	},
	"/assets/styles-DiCUmBNp.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1562a-gOiqK7I+UjBYjYZiCj7NY/W4wPs\"",
		"mtime": "2026-07-30T18:49:17.332Z",
		"size": 87594,
		"path": "../public/assets/styles-DiCUmBNp.css"
	},
	"/assets/table-zrvUNXJV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66b-79PdoVtRwzLJQI2eXLi/E9LFYOg\"",
		"mtime": "2026-07-30T18:49:17.327Z",
		"size": 1643,
		"path": "../public/assets/table-zrvUNXJV.js"
	},
	"/assets/tabs-DOvs42Fs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d36-WXazgLuUq4P5N08twjw4tm93aCc\"",
		"mtime": "2026-07-30T18:49:17.327Z",
		"size": 7478,
		"path": "../public/assets/tabs-DOvs42Fs.js"
	},
	"/assets/textarea-Dulp64HZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"715f-BIjIzzbKHUe6A0K77bHOA7Pl8jk\"",
		"mtime": "2026-07-30T18:49:17.329Z",
		"size": 29023,
		"path": "../public/assets/textarea-Dulp64HZ.js"
	},
	"/assets/trash-2-2vApe132.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-05kxgnInQeYH6juhCLBRvZ1JbX4\"",
		"mtime": "2026-07-30T18:49:17.330Z",
		"size": 551,
		"path": "../public/assets/trash-2-2vApe132.js"
	},
	"/assets/toners--X_HICqB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"262c-YoCAtOug0jX85f4Prt4itQdfcdc\"",
		"mtime": "2026-07-30T18:49:17.330Z",
		"size": 9772,
		"path": "../public/assets/toners--X_HICqB.js"
	},
	"/assets/_authenticated-CCnrODzM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ea9-zC+n4Dse/+fjzsoh3CuoBE+Pmh8\"",
		"mtime": "2026-07-30T18:49:17.301Z",
		"size": 11945,
		"path": "../public/assets/_authenticated-CCnrODzM.js"
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
var _lazy_R6Zbh0 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_R6Zbh0
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

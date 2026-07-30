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
		"mtime": "2026-07-30T21:22:17.317Z",
		"size": 167661,
		"path": "../public/printers-desktop.ico"
	},
	"/printersfloss-logo.png": {
		"type": "image/png",
		"etag": "\"10aca-aGgFSVCPARwWXZk3Z37qOnn6598\"",
		"mtime": "2026-07-30T20:12:14.411Z",
		"size": 68298,
		"path": "../public/printersfloss-logo.png"
	},
	"/printersfloss-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-07-30T21:22:17.317Z",
		"size": 167661,
		"path": "../public/printersfloss-desktop.ico"
	},
	"/assets/dist-liaPGRb7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f0a-nnxb4hr5cs8NdpcZubYRRXZ4nZ0\"",
		"mtime": "2026-07-30T21:39:34.684Z",
		"size": 7946,
		"path": "../public/assets/dist-liaPGRb7.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T13:12:02.444Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/printersfloss-header-logo.png": {
		"type": "image/png",
		"etag": "\"17971-FayePHPhIcKRbNasS0Eze8y8ncU\"",
		"mtime": "2026-07-30T20:12:14.411Z",
		"size": 96625,
		"path": "../public/printersfloss-header-logo.png"
	},
	"/assets/badge-CxfX_mUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe-mkW/lumlNdS3ju/yg2/dHEY3ADg\"",
		"mtime": "2026-07-30T21:39:34.678Z",
		"size": 766,
		"path": "../public/assets/badge-CxfX_mUi.js"
	},
	"/assets/createLucideIcon-Dhi9XBT_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-urCVHxiPQyx61bhikDR8SqJWdJk\"",
		"mtime": "2026-07-30T21:39:34.681Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-Dhi9XBT_.js"
	},
	"/assets/droplets-BIJtxTMT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-hBytZimv1zQBXAzev29SLQXylXo\"",
		"mtime": "2026-07-30T21:39:34.684Z",
		"size": 373,
		"path": "../public/assets/droplets-BIJtxTMT.js"
	},
	"/assets/index-DrMrQkKj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55ab9-3HS8hiRLhKtS1T5pvxo+eKzMLAg\"",
		"mtime": "2026-07-30T21:39:34.673Z",
		"size": 350905,
		"path": "../public/assets/index-DrMrQkKj.js"
	},
	"/assets/dist-OlJwtQee.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a051-uE1GIfw7gRTcoLCQtlH1Eb3KDpg\"",
		"mtime": "2026-07-30T21:39:34.681Z",
		"size": 41041,
		"path": "../public/assets/dist-OlJwtQee.js"
	},
	"/assets/label-ybCxwJBP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3cb1-J25GAg1qQZD+P1ltLVRIpu2vD6E\"",
		"mtime": "2026-07-30T21:39:34.686Z",
		"size": 15537,
		"path": "../public/assets/label-ybCxwJBP.js"
	},
	"/assets/plus-CehALaYj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-8VIM7re4rNXVORE8GDJg6XWW0Sk\"",
		"mtime": "2026-07-30T21:39:34.688Z",
		"size": 153,
		"path": "../public/assets/plus-CehALaYj.js"
	},
	"/assets/link-BIZAheVM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1a-b50/SbMKngzGLBqDu4ga5+rnY6g\"",
		"mtime": "2026-07-30T21:39:34.688Z",
		"size": 23322,
		"path": "../public/assets/link-BIZAheVM.js"
	},
	"/assets/jsx-runtime-yLamxOIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e87-z0S8yY8pXkwJwDchZ9crwsTHOZs\"",
		"mtime": "2026-07-30T21:39:34.686Z",
		"size": 11911,
		"path": "../public/assets/jsx-runtime-yLamxOIm.js"
	},
	"/assets/printer-BcJd8laj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-O+wo4oONTTfJriTdz/Xd86rqZ7Y\"",
		"mtime": "2026-07-30T21:39:34.688Z",
		"size": 319,
		"path": "../public/assets/printer-BcJd8laj.js"
	},
	"/assets/pms-C-HmxCJs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"73e-+pQXkXNTvuW1IYV+ZdpvaZUM2K4\"",
		"mtime": "2026-07-30T21:39:34.688Z",
		"size": 1854,
		"path": "../public/assets/pms-C-HmxCJs.js"
	},
	"/assets/PrinterImage-qnGQWqyp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"234-FBVEmc3T5ReapUJQRiV3Q6qgonI\"",
		"mtime": "2026-07-30T21:39:34.678Z",
		"size": 564,
		"path": "../public/assets/PrinterImage-qnGQWqyp.js"
	},
	"/assets/PrinterFormDialog-BgHYavUo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a0b-UKooIIDvP0oS95NE6IpDiCfKmQU\"",
		"mtime": "2026-07-30T21:39:34.673Z",
		"size": 6667,
		"path": "../public/assets/PrinterFormDialog-BgHYavUo.js"
	},
	"/assets/reports-DGlGwK8r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15ca-ISO9Zfw5P73QCURDCeMWHWU2Jrs\"",
		"mtime": "2026-07-30T21:39:34.693Z",
		"size": 5578,
		"path": "../public/assets/reports-DGlGwK8r.js"
	},
	"/assets/printers._id-BHWWQIz8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f00-ut7kTKk5bPnWpuA43v7Cu2Dvspc\"",
		"mtime": "2026-07-30T21:39:34.693Z",
		"size": 20224,
		"path": "../public/assets/printers._id-BHWWQIz8.js"
	},
	"/assets/route-CB5OSj1H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f12-dhDwdPL0uOenywhYIIQVEWNzNaI\"",
		"mtime": "2026-07-30T21:39:34.693Z",
		"size": 3858,
		"path": "../public/assets/route-CB5OSj1H.js"
	},
	"/assets/search-CFiVXvWR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-Y8bFoXePwpH24YkEW7xbruRQWzY\"",
		"mtime": "2026-07-30T21:39:34.697Z",
		"size": 174,
		"path": "../public/assets/search-CFiVXvWR.js"
	},
	"/assets/printers.index-BtufzGNf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1442-QyA91/AoqdyZTPAmDFQrr5JNjLY\"",
		"mtime": "2026-07-30T21:39:34.693Z",
		"size": 5186,
		"path": "../public/assets/printers.index-BtufzGNf.js"
	},
	"/assets/select-EPS86IVM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be0b-/Z72EcCcuyYkAXkiPUiC6X0ykpo\"",
		"mtime": "2026-07-30T21:39:34.697Z",
		"size": 48651,
		"path": "../public/assets/select-EPS86IVM.js"
	},
	"/assets/star-vnF-n8hL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-Xf6il3N/5znw1NJkGfcgU//729g\"",
		"mtime": "2026-07-30T21:39:34.701Z",
		"size": 472,
		"path": "../public/assets/star-vnF-n8hL.js"
	},
	"/assets/styles-CCMNex--.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15225-MbKCZtqBpMvZZ2onTI2pZ8Mv4bg\"",
		"mtime": "2026-07-30T21:39:34.707Z",
		"size": 86565,
		"path": "../public/assets/styles-CCMNex--.css"
	},
	"/assets/tabs-BxnQeYie.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d36-sXRHhNKMcQ6SX4DH+8mdxA/yBWk\"",
		"mtime": "2026-07-30T21:39:34.705Z",
		"size": 7478,
		"path": "../public/assets/tabs-BxnQeYie.js"
	},
	"/assets/table-DYbpQnKo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66b-oIBsnZcjSC69CA3ooMLBsbk/s4Y\"",
		"mtime": "2026-07-30T21:39:34.703Z",
		"size": 1643,
		"path": "../public/assets/table-DYbpQnKo.js"
	},
	"/assets/toners-BYzQz7yQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"262c-1e0lclhYZ5pzY5K10emrTrMg1Qs\"",
		"mtime": "2026-07-30T21:39:34.707Z",
		"size": 9772,
		"path": "../public/assets/toners-BYzQz7yQ.js"
	},
	"/assets/textarea-BAr8zdL0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"715f-pDmaEGb/b5znsbAamjwBeK3/9A8\"",
		"mtime": "2026-07-30T21:39:34.705Z",
		"size": 29023,
		"path": "../public/assets/textarea-BAr8zdL0.js"
	},
	"/assets/suppliers-BtSwCi95.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1361-CWD28ZPbIuf2iKuRKDkZI6Olnrw\"",
		"mtime": "2026-07-30T21:39:34.703Z",
		"size": 4961,
		"path": "../public/assets/suppliers-BtSwCi95.js"
	},
	"/assets/settings-DNf-Ft37.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3788-wM2voFB5xVk9DOLuntHgHm/tknQ\"",
		"mtime": "2026-07-30T21:39:34.697Z",
		"size": 14216,
		"path": "../public/assets/settings-DNf-Ft37.js"
	},
	"/assets/trash-2-2vApe132.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-05kxgnInQeYH6juhCLBRvZ1JbX4\"",
		"mtime": "2026-07-30T21:39:34.707Z",
		"size": 551,
		"path": "../public/assets/trash-2-2vApe132.js"
	},
	"/assets/_authenticated-2aKWKa2K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cdd-Ot+W/JSqNlbpmYAOwjFFLgzqvsM\"",
		"mtime": "2026-07-30T21:39:34.678Z",
		"size": 11485,
		"path": "../public/assets/_authenticated-2aKWKa2K.js"
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

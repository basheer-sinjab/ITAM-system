globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx+unenv.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
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
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T13:12:02.444Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-30T13:11:52.369Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/createLucideIcon-Dhi9XBT_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-urCVHxiPQyx61bhikDR8SqJWdJk\"",
		"mtime": "2026-07-30T14:32:34.170Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-Dhi9XBT_.js"
	},
	"/assets/dist-D07JuMXB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f0a-InKvXp+mE2F8VHLQ4mnuUzOv6CY\"",
		"mtime": "2026-07-30T14:32:34.172Z",
		"size": 7946,
		"path": "../public/assets/dist-D07JuMXB.js"
	},
	"/assets/badge-DtPWW1yw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe-70bxtRbrUUSgf9f9ljsVGxLYcz0\"",
		"mtime": "2026-07-30T14:32:34.170Z",
		"size": 766,
		"path": "../public/assets/badge-DtPWW1yw.js"
	},
	"/assets/dist-6O84p_uW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0f9-jKIUB5uhFL29d/oozA9xy0w2hKg\"",
		"mtime": "2026-07-30T14:32:34.172Z",
		"size": 41209,
		"path": "../public/assets/dist-6O84p_uW.js"
	},
	"/assets/jsx-runtime-yLamxOIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e87-z0S8yY8pXkwJwDchZ9crwsTHOZs\"",
		"mtime": "2026-07-30T14:32:34.174Z",
		"size": 11911,
		"path": "../public/assets/jsx-runtime-yLamxOIm.js"
	},
	"/assets/link-BIZAheVM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1a-b50/SbMKngzGLBqDu4ga5+rnY6g\"",
		"mtime": "2026-07-30T14:32:34.174Z",
		"size": 23322,
		"path": "../public/assets/link-BIZAheVM.js"
	},
	"/assets/droplets-BIJtxTMT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-hBytZimv1zQBXAzev29SLQXylXo\"",
		"mtime": "2026-07-30T14:32:34.174Z",
		"size": 373,
		"path": "../public/assets/droplets-BIJtxTMT.js"
	},
	"/assets/plus-CehALaYj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-8VIM7re4rNXVORE8GDJg6XWW0Sk\"",
		"mtime": "2026-07-30T14:32:34.177Z",
		"size": 153,
		"path": "../public/assets/plus-CehALaYj.js"
	},
	"/assets/PrinterFormDialog-CFR1N-o1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"185e-DUTQik5zhBC8GFhRPOf2ljwZX5E\"",
		"mtime": "2026-07-30T14:32:34.164Z",
		"size": 6238,
		"path": "../public/assets/PrinterFormDialog-CFR1N-o1.js"
	},
	"/assets/printer-BcJd8laj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-O+wo4oONTTfJriTdz/Xd86rqZ7Y\"",
		"mtime": "2026-07-30T14:32:34.177Z",
		"size": 319,
		"path": "../public/assets/printer-BcJd8laj.js"
	},
	"/assets/label-D366lUKq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3cb1-pTtx5b8zPlVNDZIovw6MY/uk6O8\"",
		"mtime": "2026-07-30T14:32:34.174Z",
		"size": 15537,
		"path": "../public/assets/label-D366lUKq.js"
	},
	"/assets/index-Cjmvt0kH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55c38-8SSo5cPBg0xOB6rbIIIR4du8tME\"",
		"mtime": "2026-07-30T14:32:34.164Z",
		"size": 351288,
		"path": "../public/assets/index-Cjmvt0kH.js"
	},
	"/assets/pms-DUn8y3ED.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"619-Py3G5X3J//7jxAQe8Yo+xFxpNyI\"",
		"mtime": "2026-07-30T14:32:34.177Z",
		"size": 1561,
		"path": "../public/assets/pms-DUn8y3ED.js"
	},
	"/assets/PrinterImage-fnHc-8R3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"400-gXeuLTBUdi5YYifC1wOqdv7RqYQ\"",
		"mtime": "2026-07-30T14:32:34.168Z",
		"size": 1024,
		"path": "../public/assets/PrinterImage-fnHc-8R3.js"
	},
	"/assets/reports-D_R3bCTO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179c-q4P2xEbvD1naNA89/1WU+biAVBQ\"",
		"mtime": "2026-07-30T14:32:34.180Z",
		"size": 6044,
		"path": "../public/assets/reports-D_R3bCTO.js"
	},
	"/assets/printers._id-iU4o2WWu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"512a-dcd89MlVdV1xB+6Goseck+zb12I\"",
		"mtime": "2026-07-30T14:32:34.177Z",
		"size": 20778,
		"path": "../public/assets/printers._id-iU4o2WWu.js"
	},
	"/assets/search-CFiVXvWR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-Y8bFoXePwpH24YkEW7xbruRQWzY\"",
		"mtime": "2026-07-30T14:32:34.182Z",
		"size": 174,
		"path": "../public/assets/search-CFiVXvWR.js"
	},
	"/assets/QrCodeBox-GF8dpRIS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5fe8-UYCuPuXPgzU94gWL5e0oUlj8m1M\"",
		"mtime": "2026-07-30T14:32:34.168Z",
		"size": 24552,
		"path": "../public/assets/QrCodeBox-GF8dpRIS.js"
	},
	"/assets/route-DHQrbS54.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f21-CxHbt2X6AMxqKyKPoBbxo0oCdjs\"",
		"mtime": "2026-07-30T14:32:34.180Z",
		"size": 3873,
		"path": "../public/assets/route-DHQrbS54.js"
	},
	"/assets/select-nPA2C16z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"baf5-ZYG05h+BUtzAohcl6JaBFfPcY7s\"",
		"mtime": "2026-07-30T14:32:34.182Z",
		"size": 47861,
		"path": "../public/assets/select-nPA2C16z.js"
	},
	"/assets/styles-Ccay2YTy.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1564f-zvxhzchkPjzLkh9/Ef1YzModyhk\"",
		"mtime": "2026-07-30T14:32:34.186Z",
		"size": 87631,
		"path": "../public/assets/styles-Ccay2YTy.css"
	},
	"/assets/settings-CRuUVqOz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27a3-8JFRMiW8ZLAvxGWjtKID0b0INFY\"",
		"mtime": "2026-07-30T14:32:34.184Z",
		"size": 10147,
		"path": "../public/assets/settings-CRuUVqOz.js"
	},
	"/assets/printers.index-BR4zbFsn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5bd97-TeoGyfkDe0L5gpgm+qM1nqs+RaM\"",
		"mtime": "2026-07-30T14:32:34.177Z",
		"size": 376215,
		"path": "../public/assets/printers.index-BR4zbFsn.js"
	},
	"/assets/suppliers-DQdkdLe2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1361-Wm6cHG+QRY1htuT5hOFJ6cwQUe4\"",
		"mtime": "2026-07-30T14:32:34.184Z",
		"size": 4961,
		"path": "../public/assets/suppliers-DQdkdLe2.js"
	},
	"/assets/tabs-BEsfCWC8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d36-9a9xzX6ueK2JlcVsGJTT3f7Y44o\"",
		"mtime": "2026-07-30T14:32:34.186Z",
		"size": 7478,
		"path": "../public/assets/tabs-BEsfCWC8.js"
	},
	"/assets/table-DYNnihZq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66b-u4RVLV3JInSkuW2xBbM5Kytjif4\"",
		"mtime": "2026-07-30T14:32:34.184Z",
		"size": 1643,
		"path": "../public/assets/table-DYNnihZq.js"
	},
	"/assets/textarea-BeiNWo3Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"715f-Mh9nPMSteYmoPiCuCj1rRCaBKKE\"",
		"mtime": "2026-07-30T14:32:34.186Z",
		"size": 29023,
		"path": "../public/assets/textarea-BeiNWo3Q.js"
	},
	"/assets/trash-2-2vApe132.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-05kxgnInQeYH6juhCLBRvZ1JbX4\"",
		"mtime": "2026-07-30T14:32:34.186Z",
		"size": 551,
		"path": "../public/assets/trash-2-2vApe132.js"
	},
	"/assets/_authenticated-B5LPZWcV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e89-sPBHKLH8mc/ptrrDQYO0j1XZmrM\"",
		"mtime": "2026-07-30T14:32:34.168Z",
		"size": 11913,
		"path": "../public/assets/_authenticated-B5LPZWcV.js"
	},
	"/assets/toners-BXYYx8uQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2642-OmuCg66W+2RnMGYR2d/webX2WU0\"",
		"mtime": "2026-07-30T14:32:34.186Z",
		"size": 9794,
		"path": "../public/assets/toners-BXYYx8uQ.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
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
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
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
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
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
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
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
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };

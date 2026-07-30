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
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-30T13:11:52.369Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/badge-JcO7ckoV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe-nOVZVypJI1haIxvf271aeaEi+5Y\"",
		"mtime": "2026-07-30T14:06:34.478Z",
		"size": 766,
		"path": "../public/assets/badge-JcO7ckoV.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T13:12:02.444Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/createLucideIcon-Dhi9XBT_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-urCVHxiPQyx61bhikDR8SqJWdJk\"",
		"mtime": "2026-07-30T14:06:34.482Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-Dhi9XBT_.js"
	},
	"/assets/dist-BuwR9t3R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0f9-E3rUpXrvMwhmdQh7UVz/ruRn5N4\"",
		"mtime": "2026-07-30T14:06:34.484Z",
		"size": 41209,
		"path": "../public/assets/dist-BuwR9t3R.js"
	},
	"/assets/dist-CTZIP9qz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f0a-7OaQ80MDHDiIo08JNt6S3eeBGKU\"",
		"mtime": "2026-07-30T14:06:34.486Z",
		"size": 7946,
		"path": "../public/assets/dist-CTZIP9qz.js"
	},
	"/assets/jsx-runtime-yLamxOIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e87-z0S8yY8pXkwJwDchZ9crwsTHOZs\"",
		"mtime": "2026-07-30T14:06:34.488Z",
		"size": 11911,
		"path": "../public/assets/jsx-runtime-yLamxOIm.js"
	},
	"/assets/droplets-BIJtxTMT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-hBytZimv1zQBXAzev29SLQXylXo\"",
		"mtime": "2026-07-30T14:06:34.486Z",
		"size": 373,
		"path": "../public/assets/droplets-BIJtxTMT.js"
	},
	"/assets/label-DOeA9-U2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c31-ycufFVE0jSTRsB8oafhknnSilZU\"",
		"mtime": "2026-07-30T14:06:34.490Z",
		"size": 15409,
		"path": "../public/assets/label-DOeA9-U2.js"
	},
	"/assets/pms-BuW-Y02J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"619-vnGbaOFUYQHLwvlGKoU1k+dvsk8\"",
		"mtime": "2026-07-30T14:06:34.497Z",
		"size": 1561,
		"path": "../public/assets/pms-BuW-Y02J.js"
	},
	"/assets/plus-CehALaYj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-8VIM7re4rNXVORE8GDJg6XWW0Sk\"",
		"mtime": "2026-07-30T14:06:34.495Z",
		"size": 153,
		"path": "../public/assets/plus-CehALaYj.js"
	},
	"/assets/PrinterFormDialog-D6HRtYPr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"185e-OikcAbRtzruoG044FNydcLSl4xk\"",
		"mtime": "2026-07-30T14:06:34.466Z",
		"size": 6238,
		"path": "../public/assets/PrinterFormDialog-D6HRtYPr.js"
	},
	"/assets/PrinterImage-CuqX77At.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"400-E8h6uRhDmf5gcTlfMnWYIUt0uV0\"",
		"mtime": "2026-07-30T14:06:34.468Z",
		"size": 1024,
		"path": "../public/assets/PrinterImage-CuqX77At.js"
	},
	"/assets/link-BIZAheVM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1a-b50/SbMKngzGLBqDu4ga5+rnY6g\"",
		"mtime": "2026-07-30T14:06:34.494Z",
		"size": 23322,
		"path": "../public/assets/link-BIZAheVM.js"
	},
	"/assets/printer-BcJd8laj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-O+wo4oONTTfJriTdz/Xd86rqZ7Y\"",
		"mtime": "2026-07-30T14:06:34.497Z",
		"size": 319,
		"path": "../public/assets/printer-BcJd8laj.js"
	},
	"/assets/printers._id-mpRic778.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"512a-SXEyqlPfcbLYURNLX7LyyIbB9cg\"",
		"mtime": "2026-07-30T14:06:34.497Z",
		"size": 20778,
		"path": "../public/assets/printers._id-mpRic778.js"
	},
	"/assets/QrCodeBox-CCz3cLaz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5fe8-4f0/ITntdOOqDpQOtNH4prttjaI\"",
		"mtime": "2026-07-30T14:06:34.470Z",
		"size": 24552,
		"path": "../public/assets/QrCodeBox-CCz3cLaz.js"
	},
	"/assets/route-ByoF4wNv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eab-welDKDhV5YAMR1RkJ75e2Z/wB8s\"",
		"mtime": "2026-07-30T14:06:34.506Z",
		"size": 3755,
		"path": "../public/assets/route-ByoF4wNv.js"
	},
	"/assets/reports-CImJKcjf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179c-V7m896G1KYPVRqNnP/5WUlPV8sY\"",
		"mtime": "2026-07-30T14:06:34.504Z",
		"size": 6044,
		"path": "../public/assets/reports-CImJKcjf.js"
	},
	"/assets/search-CFiVXvWR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-Y8bFoXePwpH24YkEW7xbruRQWzY\"",
		"mtime": "2026-07-30T14:06:34.506Z",
		"size": 174,
		"path": "../public/assets/search-CFiVXvWR.js"
	},
	"/assets/index-BBqh1bb2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55c00-nAvhwfMVNNmn1EgeUqexEhm20RE\"",
		"mtime": "2026-07-30T14:06:34.464Z",
		"size": 351232,
		"path": "../public/assets/index-BBqh1bb2.js"
	},
	"/assets/settings-1J0SW02v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27a3-hvEH0RWGrkhh7cb2ti2PqAY8GJk\"",
		"mtime": "2026-07-30T14:06:34.510Z",
		"size": 10147,
		"path": "../public/assets/settings-1J0SW02v.js"
	},
	"/assets/styles-DHZBvb8u.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13807-aQXo4x+q9Bk78K/ScTmgPULuJWs\"",
		"mtime": "2026-07-30T14:06:34.518Z",
		"size": 79879,
		"path": "../public/assets/styles-DHZBvb8u.css"
	},
	"/assets/select-tEV1heJJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"baf5-T7v/VlvSOQI4VkGbGO0KdvYhLiA\"",
		"mtime": "2026-07-30T14:06:34.508Z",
		"size": 47861,
		"path": "../public/assets/select-tEV1heJJ.js"
	},
	"/assets/printers.index-ZYZrw0l7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5bd7e-rUZ/ELkmbLAs4j6YumT48SPDR3E\"",
		"mtime": "2026-07-30T14:06:34.502Z",
		"size": 376190,
		"path": "../public/assets/printers.index-ZYZrw0l7.js"
	},
	"/assets/suppliers-BrQSmmuo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1361-Lg0zJETwPxbXPFPxTpxxOu2t/kM\"",
		"mtime": "2026-07-30T14:06:34.510Z",
		"size": 4961,
		"path": "../public/assets/suppliers-BrQSmmuo.js"
	},
	"/assets/table-DnxZBk-v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66b-xmtzD3tPiEM53WD3jchxlc6Rj7A\"",
		"mtime": "2026-07-30T14:06:34.512Z",
		"size": 1643,
		"path": "../public/assets/table-DnxZBk-v.js"
	},
	"/assets/tabs-BQkDEgmY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d36-wP+Xhm51SC+7BPXCIJ0Xa0ct9TE\"",
		"mtime": "2026-07-30T14:06:34.512Z",
		"size": 7478,
		"path": "../public/assets/tabs-BQkDEgmY.js"
	},
	"/assets/textarea-CzLcaZIO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"715f-YFn3LVHv6CBH1nZRSU2V1WA1g90\"",
		"mtime": "2026-07-30T14:06:34.514Z",
		"size": 29023,
		"path": "../public/assets/textarea-CzLcaZIO.js"
	},
	"/assets/toners-Cste_QtV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2642-nNoEcs+U5nc10JiexKGy5Or8uV0\"",
		"mtime": "2026-07-30T14:06:34.514Z",
		"size": 9794,
		"path": "../public/assets/toners-Cste_QtV.js"
	},
	"/assets/trash-2-2vApe132.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-05kxgnInQeYH6juhCLBRvZ1JbX4\"",
		"mtime": "2026-07-30T14:06:34.516Z",
		"size": 551,
		"path": "../public/assets/trash-2-2vApe132.js"
	},
	"/assets/_authenticated-DUnZDeqm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23b0-Tgxy9Faw79WEP1ELGFZlyAgPXnY\"",
		"mtime": "2026-07-30T14:06:34.470Z",
		"size": 9136,
		"path": "../public/assets/_authenticated-DUnZDeqm.js"
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

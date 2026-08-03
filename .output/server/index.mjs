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
	"/printersfloss-header-logo.png": {
		"type": "image/png",
		"etag": "\"17971-FayePHPhIcKRbNasS0Eze8y8ncU\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 96625,
		"path": "../public/printersfloss-header-logo.png"
	},
	"/assets/arrow-right-DAEJhZzY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-LeAO4HLh35DzHhkI+F1RARHQWbY\"",
		"mtime": "2026-08-03T20:59:11.682Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DAEJhZzY.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T13:12:02.444Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/assets._id-CPXF5UsF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5253-20qEIMKF2B4vD2/WP/yOx5RnvSE\"",
		"mtime": "2026-08-03T20:59:11.685Z",
		"size": 21075,
		"path": "../public/assets/assets._id-CPXF5UsF.js"
	},
	"/printers-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printers-desktop.ico"
	},
	"/assets/assets.index-Dhmq4z0A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2093-afaqqNcjcZUwD7j4PUC2iC16i6U\"",
		"mtime": "2026-08-03T20:59:11.687Z",
		"size": 8339,
		"path": "../public/assets/assets.index-Dhmq4z0A.js"
	},
	"/assets/clock-3-D2cWu0X8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-8BIM5Jd0HVHsrJVK5GehKvrvJLI\"",
		"mtime": "2026-08-03T20:59:11.691Z",
		"size": 169,
		"path": "../public/assets/clock-3-D2cWu0X8.js"
	},
	"/assets/boxes--n-qqcDf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"353-CAXblkHMrYL8Pelx80PAaFq/uqM\"",
		"mtime": "2026-08-03T20:59:11.689Z",
		"size": 851,
		"path": "../public/assets/boxes--n-qqcDf.js"
	},
	"/assets/ConfirmButton-B5Siv3MW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104b-35rDEQKeN5heAQFuWnE2rUXXVAY\"",
		"mtime": "2026-08-03T20:59:11.673Z",
		"size": 4171,
		"path": "../public/assets/ConfirmButton-B5Siv3MW.js"
	},
	"/assets/circle-check-5f1sgB6R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-1mcQtqLBwEgJUkOrgSEUCpQKXp0\"",
		"mtime": "2026-08-03T20:59:11.691Z",
		"size": 290,
		"path": "../public/assets/circle-check-5f1sgB6R.js"
	},
	"/assets/createLucideIcon-_JN9-1Rk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d89-7LAEne/FbmGyZFaHyLyNopKrGtM\"",
		"mtime": "2026-08-03T20:59:11.693Z",
		"size": 32137,
		"path": "../public/assets/createLucideIcon-_JN9-1Rk.js"
	},
	"/assets/DateInput-DqBWF7wP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"619-enhHaCdJtbUeeVHXGSJ4kkIKBTw\"",
		"mtime": "2026-08-03T20:59:11.675Z",
		"size": 1561,
		"path": "../public/assets/DateInput-DqBWF7wP.js"
	},
	"/assets/dist-377g20WB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee4-A3VntGfD+ek2SS6Ebrni8rpGVB0\"",
		"mtime": "2026-08-03T20:59:11.694Z",
		"size": 7908,
		"path": "../public/assets/dist-377g20WB.js"
	},
	"/assets/es2015-DR4_OM6_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f686-SW7dh6YdslX74VMU7AO/h2GCrLs\"",
		"mtime": "2026-08-03T20:59:11.696Z",
		"size": 63110,
		"path": "../public/assets/es2015-DR4_OM6_.js"
	},
	"/assets/history-kNlxHOhg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed-6waXtlraTbuuLqY9P9dVTEhDM34\"",
		"mtime": "2026-08-03T20:59:11.698Z",
		"size": 237,
		"path": "../public/assets/history-kNlxHOhg.js"
	},
	"/assets/file-chart-column-increasing-DWxxotqY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-Y5LDeCRAPANiRC5pDXUieVL1hc8\"",
		"mtime": "2026-08-03T20:59:11.698Z",
		"size": 407,
		"path": "../public/assets/file-chart-column-increasing-DWxxotqY.js"
	},
	"/assets/data-rules-Bu7NkuoK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"151-BxFXma/glkoO8u+MoZ1Fl6bLlFg\"",
		"mtime": "2026-08-03T20:59:11.694Z",
		"size": 337,
		"path": "../public/assets/data-rules-Bu7NkuoK.js"
	},
	"/assets/key-round-DO_yOuS-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-j2zUh88mywuFW6XtM5gFkfmRZCw\"",
		"mtime": "2026-08-03T20:59:11.704Z",
		"size": 355,
		"path": "../public/assets/key-round-DO_yOuS-.js"
	},
	"/assets/index-Bbz29YiQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55441-ml2SVRyAb4l3USuCUSeGQUSAJck\"",
		"mtime": "2026-08-03T20:59:11.671Z",
		"size": 349249,
		"path": "../public/assets/index-Bbz29YiQ.js"
	},
	"/assets/inventory-DcYzQcz9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bd1-2pQqA5wfCFRrzSK/Tpu+iDfV6bg\"",
		"mtime": "2026-08-03T20:59:11.701Z",
		"size": 11217,
		"path": "../public/assets/inventory-DcYzQcz9.js"
	},
	"/assets/licenses-CbJpn5Y_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27a2-OitMkNlijUrw6oMS71X5n+P5ZPg\"",
		"mtime": "2026-08-03T20:59:11.706Z",
		"size": 10146,
		"path": "../public/assets/licenses-CbJpn5Y_.js"
	},
	"/assets/licenses._id-B2n6iWeh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a6e-WRMVOxm5rpCxS6rWfw1Zfgbkj7c\"",
		"mtime": "2026-08-03T20:59:11.706Z",
		"size": 10862,
		"path": "../public/assets/licenses._id-B2n6iWeh.js"
	},
	"/assets/link-CG4vVmVT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1100-EcKj3NO1/tFB1V8xJMTXMi2zTTo\"",
		"mtime": "2026-08-03T20:59:11.708Z",
		"size": 4352,
		"path": "../public/assets/link-CG4vVmVT.js"
	},
	"/assets/ManagementVisuals-CI-UG4Ii.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4eb-zg1PR9fhCDUUkM/DABkCWIWRNP0\"",
		"mtime": "2026-08-03T20:59:11.675Z",
		"size": 1259,
		"path": "../public/assets/ManagementVisuals-CI-UG4Ii.js"
	},
	"/assets/maintenance-CWJokmQV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe8-CzfHpxGDLo5WUAIkO1syuz9fBgI\"",
		"mtime": "2026-08-03T20:59:11.710Z",
		"size": 12264,
		"path": "../public/assets/maintenance-CWJokmQV.js"
	},
	"/assets/Match-BETYzDhS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bde1-KM3a1aQvmacO1JyMNQejg6K771g\"",
		"mtime": "2026-08-03T20:59:11.677Z",
		"size": 48609,
		"path": "../public/assets/Match-BETYzDhS.js"
	},
	"/assets/monitor-C9BGuK18.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-Q76uM3enyG1pEH0XI60NU3thpXk\"",
		"mtime": "2026-08-03T20:59:11.711Z",
		"size": 259,
		"path": "../public/assets/monitor-C9BGuK18.js"
	},
	"/assets/people-departments.employee._id-C9LHMblb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"202b-gHZlgnzfEvDDB7Ir98SxdbwFj0E\"",
		"mtime": "2026-08-03T20:59:11.757Z",
		"size": 8235,
		"path": "../public/assets/people-departments.employee._id-C9LHMblb.js"
	},
	"/assets/package-Bw5df7YG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-+csYxOkcQARdIzeluJz8l9TuWN4\"",
		"mtime": "2026-08-03T20:59:11.711Z",
		"size": 372,
		"path": "../public/assets/package-Bw5df7YG.js"
	},
	"/assets/people-departments-DG0FzqpR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3de5-vh/sam8hEkbPLICySHr9hYxbPuA\"",
		"mtime": "2026-08-03T20:59:11.713Z",
		"size": 15845,
		"path": "../public/assets/people-departments-DG0FzqpR.js"
	},
	"/assets/phone-6aX-Hmt5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-IVLbxbkBImBHLGJCKz98PypG8GE\"",
		"mtime": "2026-08-03T20:59:11.758Z",
		"size": 482,
		"path": "../public/assets/phone-6aX-Hmt5.js"
	},
	"/assets/people-departments._id-BPSYATy6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1b-055Xk2Q5kWcFQuO/zbCVSedNOjU\"",
		"mtime": "2026-08-03T20:59:11.715Z",
		"size": 7195,
		"path": "../public/assets/people-departments._id-BPSYATy6.js"
	},
	"/assets/plus-CWoXvATm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-8G0pH6KkkMrSLMe3ADkpztCCwHY\"",
		"mtime": "2026-08-03T20:59:11.759Z",
		"size": 153,
		"path": "../public/assets/plus-CWoXvATm.js"
	},
	"/assets/printer-UeEQhnjv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-/zDzT7R/+i6AkVAZMMat4c/f3O0\"",
		"mtime": "2026-08-03T20:59:11.761Z",
		"size": 319,
		"path": "../public/assets/printer-UeEQhnjv.js"
	},
	"/assets/PrinterFormDialog-CZz6MAc0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b75-sr7iovwXQT0DEkDviTdR4nBjH7Y\"",
		"mtime": "2026-08-03T20:59:11.680Z",
		"size": 7029,
		"path": "../public/assets/PrinterFormDialog-CZz6MAc0.js"
	},
	"/assets/PrinterImage-CH5Ts8Is.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26b-JvWGoRLdNTsaS90LiuR6ChYjfZQ\"",
		"mtime": "2026-08-03T20:59:11.680Z",
		"size": 619,
		"path": "../public/assets/PrinterImage-CH5Ts8Is.js"
	},
	"/assets/printers._id-D9d1hPiY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ed5-eAk+uDJePwOZRrjDkv3silbUvZc\"",
		"mtime": "2026-08-03T20:59:11.761Z",
		"size": 20181,
		"path": "../public/assets/printers._id-D9d1hPiY.js"
	},
	"/assets/printers.index-Cov6tzZN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140b-T0UpSXRlRqxXY33FXqK+LW79lHU\"",
		"mtime": "2026-08-03T20:59:11.763Z",
		"size": 5131,
		"path": "../public/assets/printers.index-Cov6tzZN.js"
	},
	"/assets/reports-TdOnu_Nb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1235-a18AfBKa1sjZCbWVpDkUaPKD/rg\"",
		"mtime": "2026-08-03T20:59:11.765Z",
		"size": 4661,
		"path": "../public/assets/reports-TdOnu_Nb.js"
	},
	"/assets/route-M85Txyk7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c43-NFZORibtqEVIfC025ZJLYCyOcL4\"",
		"mtime": "2026-08-03T20:59:11.765Z",
		"size": 7235,
		"path": "../public/assets/route-M85Txyk7.js"
	},
	"/assets/search-01p58f3b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-WayfKY/GewWt3WNMMoecpkpGOoM\"",
		"mtime": "2026-08-03T20:59:11.772Z",
		"size": 174,
		"path": "../public/assets/search-01p58f3b.js"
	},
	"/assets/settings-yx94ljip.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5eb0-LOIG0XvE3Vezq7Yfw//Jpo8JRYE\"",
		"mtime": "2026-08-03T20:59:11.774Z",
		"size": 24240,
		"path": "../public/assets/settings-yx94ljip.js"
	},
	"/assets/styles-Deg_lX8A.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16924-gJiq+NDPMt9229+BOldFAtwsah0\"",
		"mtime": "2026-08-03T20:59:11.797Z",
		"size": 92452,
		"path": "../public/assets/styles-Deg_lX8A.css"
	},
	"/assets/table-hhYsXjAY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"672-uNh/3H/i8r6KdsenEjeks1HgRA8\"",
		"mtime": "2026-08-03T20:59:11.776Z",
		"size": 1650,
		"path": "../public/assets/table-hhYsXjAY.js"
	},
	"/assets/suppliers-DRLKzQqB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1347-2FPKH1VKgxM1yr5UXUY/hbtIMr8\"",
		"mtime": "2026-08-03T20:59:11.776Z",
		"size": 4935,
		"path": "../public/assets/suppliers-DRLKzQqB.js"
	},
	"/assets/tabs-ByAI6yNJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1c-VLzftovVbBYwWsJMJKwPB4LKli0\"",
		"mtime": "2026-08-03T20:59:11.778Z",
		"size": 7452,
		"path": "../public/assets/tabs-ByAI6yNJ.js"
	},
	"/assets/toners-BRxtTAG6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25a9-Bv4sFBxytSSdZa8F2+TjtdnHUNE\"",
		"mtime": "2026-08-03T20:59:11.780Z",
		"size": 9641,
		"path": "../public/assets/toners-BRxtTAG6.js"
	},
	"/assets/triangle-alert-DiTUdzCr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-ut6zxu2O/k3tUhkEmVHJ3RJHnCo\"",
		"mtime": "2026-08-03T20:59:11.782Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-DiTUdzCr.js"
	},
	"/assets/trash-2-BJun65R3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-3GtnF1x4pCUDXn9fJSzzPiBjw6U\"",
		"mtime": "2026-08-03T20:59:11.780Z",
		"size": 551,
		"path": "../public/assets/trash-2-BJun65R3.js"
	},
	"/assets/useNavigate-BJP7mHEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"333-j2xjdnwcezYigh0w3dZBq0DUiqE\"",
		"mtime": "2026-08-03T20:59:11.785Z",
		"size": 819,
		"path": "../public/assets/useNavigate-BJP7mHEG.js"
	},
	"/assets/user-round-B5x9vg7V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6-BnNq37lhsp6q91jbfFLCNQRrZ5M\"",
		"mtime": "2026-08-03T20:59:11.791Z",
		"size": 182,
		"path": "../public/assets/user-round-B5x9vg7V.js"
	},
	"/assets/useQuery-Dx4ha4Jj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2238-nVd83VKTzCrQomT0n4iZqMdk+ec\"",
		"mtime": "2026-08-03T20:59:11.789Z",
		"size": 8760,
		"path": "../public/assets/useQuery-Dx4ha4Jj.js"
	},
	"/assets/useStore-CFiixifm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af5-2wfT/bMTF53EL2+QU9Bjos6xUw0\"",
		"mtime": "2026-08-03T20:59:11.789Z",
		"size": 19189,
		"path": "../public/assets/useStore-CFiixifm.js"
	},
	"/assets/users-BPAS9evN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-v+AvR63cexpjodcbKCurfyiWHsk\"",
		"mtime": "2026-08-03T20:59:11.791Z",
		"size": 306,
		"path": "../public/assets/users-BPAS9evN.js"
	},
	"/assets/users-round-DpJQ-Ade.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-JKprnXmi9ecxMNMXWDPAo2dGTGg\"",
		"mtime": "2026-08-03T20:59:11.793Z",
		"size": 253,
		"path": "../public/assets/users-round-DpJQ-Ade.js"
	},
	"/assets/wrench-BmjG_4cM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-uoaqaCgVByt3cYLqGrhhVVPXyas\"",
		"mtime": "2026-08-03T20:59:11.793Z",
		"size": 303,
		"path": "../public/assets/wrench-BmjG_4cM.js"
	},
	"/assets/x-DDvTBOpl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f2-KoYGSIE0HjNaoPDRzKvymBnyPdQ\"",
		"mtime": "2026-08-03T20:59:11.795Z",
		"size": 4850,
		"path": "../public/assets/x-DDvTBOpl.js"
	},
	"/assets/_authenticated-QmCR6fHV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c1c-1vdqhNQ9nJxrTG60224NJP3bp+c\"",
		"mtime": "2026-08-03T20:59:11.682Z",
		"size": 19484,
		"path": "../public/assets/_authenticated-QmCR6fHV.js"
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

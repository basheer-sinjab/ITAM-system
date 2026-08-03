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
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T13:12:02.444Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/arrow-right-DAEJhZzY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-LeAO4HLh35DzHhkI+F1RARHQWbY\"",
		"mtime": "2026-08-03T20:30:44.877Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DAEJhZzY.js"
	},
	"/assets/boxes--n-qqcDf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"353-CAXblkHMrYL8Pelx80PAaFq/uqM\"",
		"mtime": "2026-08-03T20:30:44.879Z",
		"size": 851,
		"path": "../public/assets/boxes--n-qqcDf.js"
	},
	"/assets/assets._id-BccRZMnm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cef-SvvkcFAO69xhPlO/9keb1MoBaRU\"",
		"mtime": "2026-08-03T20:30:44.878Z",
		"size": 11503,
		"path": "../public/assets/assets._id-BccRZMnm.js"
	},
	"/assets/assets.index-B8UYfsKM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"242f-ogxdnJejODHdE/NcwGyy1FQ8FnA\"",
		"mtime": "2026-08-03T20:30:44.879Z",
		"size": 9263,
		"path": "../public/assets/assets.index-B8UYfsKM.js"
	},
	"/assets/circle-check-5f1sgB6R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-1mcQtqLBwEgJUkOrgSEUCpQKXp0\"",
		"mtime": "2026-08-03T20:30:44.879Z",
		"size": 290,
		"path": "../public/assets/circle-check-5f1sgB6R.js"
	},
	"/assets/DateInput-DqBWF7wP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"619-enhHaCdJtbUeeVHXGSJ4kkIKBTw\"",
		"mtime": "2026-08-03T20:30:44.870Z",
		"size": 1561,
		"path": "../public/assets/DateInput-DqBWF7wP.js"
	},
	"/assets/createLucideIcon-_JN9-1Rk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d89-7LAEne/FbmGyZFaHyLyNopKrGtM\"",
		"mtime": "2026-08-03T20:30:44.881Z",
		"size": 32137,
		"path": "../public/assets/createLucideIcon-_JN9-1Rk.js"
	},
	"/assets/dist-377g20WB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee4-A3VntGfD+ek2SS6Ebrni8rpGVB0\"",
		"mtime": "2026-08-03T20:30:44.881Z",
		"size": 7908,
		"path": "../public/assets/dist-377g20WB.js"
	},
	"/assets/data-rules-Bu7NkuoK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"151-BxFXma/glkoO8u+MoZ1Fl6bLlFg\"",
		"mtime": "2026-08-03T20:30:44.881Z",
		"size": 337,
		"path": "../public/assets/data-rules-Bu7NkuoK.js"
	},
	"/assets/file-chart-column-increasing-DWxxotqY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-Y5LDeCRAPANiRC5pDXUieVL1hc8\"",
		"mtime": "2026-08-03T20:30:44.881Z",
		"size": 407,
		"path": "../public/assets/file-chart-column-increasing-DWxxotqY.js"
	},
	"/assets/es2015-DR4_OM6_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f686-SW7dh6YdslX74VMU7AO/h2GCrLs\"",
		"mtime": "2026-08-03T20:30:44.881Z",
		"size": 63110,
		"path": "../public/assets/es2015-DR4_OM6_.js"
	},
	"/assets/ConfirmButton-B5Siv3MW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104b-35rDEQKeN5heAQFuWnE2rUXXVAY\"",
		"mtime": "2026-08-03T20:30:44.870Z",
		"size": 4171,
		"path": "../public/assets/ConfirmButton-B5Siv3MW.js"
	},
	"/assets/history-kNlxHOhg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed-6waXtlraTbuuLqY9P9dVTEhDM34\"",
		"mtime": "2026-08-03T20:30:44.881Z",
		"size": 237,
		"path": "../public/assets/history-kNlxHOhg.js"
	},
	"/printers-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printers-desktop.ico"
	},
	"/assets/index-D0NaDPi5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"557b7-Kkb6W/2C7LnKdAOjVoFgp+ulnr0\"",
		"mtime": "2026-08-03T20:30:44.870Z",
		"size": 350135,
		"path": "../public/assets/index-D0NaDPi5.js"
	},
	"/assets/inventory-B_A0-LLR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bd1-2CntMVuSsxwf3bv1tfnp8b+7Q5U\"",
		"mtime": "2026-08-03T20:30:44.881Z",
		"size": 11217,
		"path": "../public/assets/inventory-B_A0-LLR.js"
	},
	"/assets/licenses-sVTxdjTw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27a2-v/IBdXBdjEi3Y0+qtfnifq61r1o\"",
		"mtime": "2026-08-03T20:30:44.884Z",
		"size": 10146,
		"path": "../public/assets/licenses-sVTxdjTw.js"
	},
	"/assets/key-round-DO_yOuS-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-j2zUh88mywuFW6XtM5gFkfmRZCw\"",
		"mtime": "2026-08-03T20:30:44.883Z",
		"size": 355,
		"path": "../public/assets/key-round-DO_yOuS-.js"
	},
	"/assets/link-CG4vVmVT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1100-EcKj3NO1/tFB1V8xJMTXMi2zTTo\"",
		"mtime": "2026-08-03T20:30:44.884Z",
		"size": 4352,
		"path": "../public/assets/link-CG4vVmVT.js"
	},
	"/assets/licenses._id-byb0bmwM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a6e-/NSdLX5dlCbGygAVl4JVgSGoIeI\"",
		"mtime": "2026-08-03T20:30:44.884Z",
		"size": 10862,
		"path": "../public/assets/licenses._id-byb0bmwM.js"
	},
	"/assets/ManagementVisuals-CI-UG4Ii.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4eb-zg1PR9fhCDUUkM/DABkCWIWRNP0\"",
		"mtime": "2026-08-03T20:30:44.870Z",
		"size": 1259,
		"path": "../public/assets/ManagementVisuals-CI-UG4Ii.js"
	},
	"/assets/maintenance-ChFixuD9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe8-qigUVmjC8eIIINsIKvBPDqbTZzw\"",
		"mtime": "2026-08-03T20:30:44.884Z",
		"size": 12264,
		"path": "../public/assets/maintenance-ChFixuD9.js"
	},
	"/assets/monitor-C9BGuK18.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-Q76uM3enyG1pEH0XI60NU3thpXk\"",
		"mtime": "2026-08-03T20:30:44.884Z",
		"size": 259,
		"path": "../public/assets/monitor-C9BGuK18.js"
	},
	"/assets/Match-BETYzDhS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bde1-KM3a1aQvmacO1JyMNQejg6K771g\"",
		"mtime": "2026-08-03T20:30:44.870Z",
		"size": 48609,
		"path": "../public/assets/Match-BETYzDhS.js"
	},
	"/assets/people-departments-BROuO6Qt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3de5-ASMkef5R+VO7EOYHkqjXVFjgyPk\"",
		"mtime": "2026-08-03T20:30:44.886Z",
		"size": 15845,
		"path": "../public/assets/people-departments-BROuO6Qt.js"
	},
	"/assets/people-departments._id-BVhz7Flg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1b-m1lYjAPwZkIugp0CHBUdBKYWZvg\"",
		"mtime": "2026-08-03T20:30:44.887Z",
		"size": 7195,
		"path": "../public/assets/people-departments._id-BVhz7Flg.js"
	},
	"/assets/package-Bw5df7YG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-+csYxOkcQARdIzeluJz8l9TuWN4\"",
		"mtime": "2026-08-03T20:30:44.886Z",
		"size": 372,
		"path": "../public/assets/package-Bw5df7YG.js"
	},
	"/assets/people-departments.employee._id-ULJKQPQ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f14-0cRULStlVCoXhwXQtiLr+ECx3+M\"",
		"mtime": "2026-08-03T20:30:44.887Z",
		"size": 7956,
		"path": "../public/assets/people-departments.employee._id-ULJKQPQ-.js"
	},
	"/assets/printer-UeEQhnjv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-/zDzT7R/+i6AkVAZMMat4c/f3O0\"",
		"mtime": "2026-08-03T20:30:44.888Z",
		"size": 319,
		"path": "../public/assets/printer-UeEQhnjv.js"
	},
	"/assets/PrinterImage-B5TQVM50.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26b-hzMPfiPbO/STVfdEglPGQNy0hdg\"",
		"mtime": "2026-08-03T20:30:44.876Z",
		"size": 619,
		"path": "../public/assets/PrinterImage-B5TQVM50.js"
	},
	"/assets/plus-CWoXvATm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-8G0pH6KkkMrSLMe3ADkpztCCwHY\"",
		"mtime": "2026-08-03T20:30:44.888Z",
		"size": 153,
		"path": "../public/assets/plus-CWoXvATm.js"
	},
	"/assets/printers._id-CEobyAPy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ed5-aYeMWt33RiWS13XR8ugezXZRgQs\"",
		"mtime": "2026-08-03T20:30:44.888Z",
		"size": 20181,
		"path": "../public/assets/printers._id-CEobyAPy.js"
	},
	"/assets/phone-6aX-Hmt5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-IVLbxbkBImBHLGJCKz98PypG8GE\"",
		"mtime": "2026-08-03T20:30:44.888Z",
		"size": 482,
		"path": "../public/assets/phone-6aX-Hmt5.js"
	},
	"/assets/PrinterFormDialog-B4OoOawS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b75-2hBS7znK0wiCJ1uDaHwGqffmjww\"",
		"mtime": "2026-08-03T20:30:44.876Z",
		"size": 7029,
		"path": "../public/assets/PrinterFormDialog-B4OoOawS.js"
	},
	"/assets/reports-oUdX-bHc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1235-a5nnXREsN4mTIg7u+/mTl99UleU\"",
		"mtime": "2026-08-03T20:30:44.890Z",
		"size": 4661,
		"path": "../public/assets/reports-oUdX-bHc.js"
	},
	"/assets/route-BJe-VCB7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c43-XXCdgHlm1vdLa0WfvBkTrxUnz0M\"",
		"mtime": "2026-08-03T20:30:44.890Z",
		"size": 7235,
		"path": "../public/assets/route-BJe-VCB7.js"
	},
	"/assets/printers.index-CR9WXi-8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140b-PQA1S/D8HrSngL+UPvXF4KPOBQg\"",
		"mtime": "2026-08-03T20:30:44.888Z",
		"size": 5131,
		"path": "../public/assets/printers.index-CR9WXi-8.js"
	},
	"/assets/settings-BKCsqSfJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5eb0-DkleXNPUyOwyIKLXzLFuvXDiQ2w\"",
		"mtime": "2026-08-03T20:30:44.890Z",
		"size": 24240,
		"path": "../public/assets/settings-BKCsqSfJ.js"
	},
	"/assets/search-01p58f3b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-WayfKY/GewWt3WNMMoecpkpGOoM\"",
		"mtime": "2026-08-03T20:30:44.890Z",
		"size": 174,
		"path": "../public/assets/search-01p58f3b.js"
	},
	"/assets/styles-DRck04AW.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16718-CBqc1E83Ex86i2IQBAVnYonvLQU\"",
		"mtime": "2026-08-03T20:30:44.899Z",
		"size": 91928,
		"path": "../public/assets/styles-DRck04AW.css"
	},
	"/assets/suppliers-D1yTyfZZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1347-pAOWfyn2plNyVJA6AA+K0TlSVN4\"",
		"mtime": "2026-08-03T20:30:44.890Z",
		"size": 4935,
		"path": "../public/assets/suppliers-D1yTyfZZ.js"
	},
	"/assets/table-hhYsXjAY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"672-uNh/3H/i8r6KdsenEjeks1HgRA8\"",
		"mtime": "2026-08-03T20:30:44.890Z",
		"size": 1650,
		"path": "../public/assets/table-hhYsXjAY.js"
	},
	"/assets/toners-1W006Y13.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25a9-ukZAMG4x2RUnQcqZrTXCqo3c/KE\"",
		"mtime": "2026-08-03T20:30:44.890Z",
		"size": 9641,
		"path": "../public/assets/toners-1W006Y13.js"
	},
	"/assets/tabs-ByAI6yNJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1c-VLzftovVbBYwWsJMJKwPB4LKli0\"",
		"mtime": "2026-08-03T20:30:44.890Z",
		"size": 7452,
		"path": "../public/assets/tabs-ByAI6yNJ.js"
	},
	"/assets/trash-2-BJun65R3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-3GtnF1x4pCUDXn9fJSzzPiBjw6U\"",
		"mtime": "2026-08-03T20:30:44.890Z",
		"size": 551,
		"path": "../public/assets/trash-2-BJun65R3.js"
	},
	"/assets/useNavigate-BJP7mHEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"333-j2xjdnwcezYigh0w3dZBq0DUiqE\"",
		"mtime": "2026-08-03T20:30:44.894Z",
		"size": 819,
		"path": "../public/assets/useNavigate-BJP7mHEG.js"
	},
	"/assets/triangle-alert-DiTUdzCr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-ut6zxu2O/k3tUhkEmVHJ3RJHnCo\"",
		"mtime": "2026-08-03T20:30:44.890Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-DiTUdzCr.js"
	},
	"/assets/users-BPAS9evN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-v+AvR63cexpjodcbKCurfyiWHsk\"",
		"mtime": "2026-08-03T20:30:44.898Z",
		"size": 306,
		"path": "../public/assets/users-BPAS9evN.js"
	},
	"/assets/useQuery-Dx4ha4Jj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2238-nVd83VKTzCrQomT0n4iZqMdk+ec\"",
		"mtime": "2026-08-03T20:30:44.895Z",
		"size": 8760,
		"path": "../public/assets/useQuery-Dx4ha4Jj.js"
	},
	"/assets/useStore-CFiixifm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af5-2wfT/bMTF53EL2+QU9Bjos6xUw0\"",
		"mtime": "2026-08-03T20:30:44.896Z",
		"size": 19189,
		"path": "../public/assets/useStore-CFiixifm.js"
	},
	"/assets/users-round-DpJQ-Ade.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-JKprnXmi9ecxMNMXWDPAo2dGTGg\"",
		"mtime": "2026-08-03T20:30:44.898Z",
		"size": 253,
		"path": "../public/assets/users-round-DpJQ-Ade.js"
	},
	"/assets/user-round-B5x9vg7V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6-BnNq37lhsp6q91jbfFLCNQRrZ5M\"",
		"mtime": "2026-08-03T20:30:44.896Z",
		"size": 182,
		"path": "../public/assets/user-round-B5x9vg7V.js"
	},
	"/assets/x-DDvTBOpl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f2-KoYGSIE0HjNaoPDRzKvymBnyPdQ\"",
		"mtime": "2026-08-03T20:30:44.899Z",
		"size": 4850,
		"path": "../public/assets/x-DDvTBOpl.js"
	},
	"/assets/wrench-BmjG_4cM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-uoaqaCgVByt3cYLqGrhhVVPXyas\"",
		"mtime": "2026-08-03T20:30:44.899Z",
		"size": 303,
		"path": "../public/assets/wrench-BmjG_4cM.js"
	},
	"/assets/_authenticated-CjdDFuVT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c5a-IBeXHxZiQGkjTTIMNcA3cwvxxic\"",
		"mtime": "2026-08-03T20:30:44.876Z",
		"size": 19546,
		"path": "../public/assets/_authenticated-CjdDFuVT.js"
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

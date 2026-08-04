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
	"/printersfloss-header-logo.png": {
		"type": "image/png",
		"etag": "\"17971-FayePHPhIcKRbNasS0Eze8y8ncU\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 96625,
		"path": "../public/printersfloss-header-logo.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T13:12:02.444Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/printersfloss-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printersfloss-desktop.ico"
	},
	"/assets/assets._id-C5qC12CF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"990e-/0UZFhJtty6e9cPaZZg2JzZEYpI\"",
		"mtime": "2026-08-03T21:46:18.980Z",
		"size": 39182,
		"path": "../public/assets/assets._id-C5qC12CF.js"
	},
	"/assets/assets.index-gTqyEbju.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25ad-YOkAS101tI95qFWHoMJBr9a09Ec\"",
		"mtime": "2026-08-03T21:46:18.983Z",
		"size": 9645,
		"path": "../public/assets/assets.index-gTqyEbju.js"
	},
	"/assets/arrow-right-CoSLkLYf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-BTbBfsaaSGbbvhrjxs16YDzKrgo\"",
		"mtime": "2026-08-03T21:46:18.979Z",
		"size": 165,
		"path": "../public/assets/arrow-right-CoSLkLYf.js"
	},
	"/assets/boxes-CyT1c5-X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"353-foa6fUgVr10A2kpSthISt7xfIf0\"",
		"mtime": "2026-08-03T21:46:18.985Z",
		"size": 851,
		"path": "../public/assets/boxes-CyT1c5-X.js"
	},
	"/printers-desktop.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"28eed-kTypUIX4vt3poSSPrUIwVdGIf40\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 167661,
		"path": "../public/printers-desktop.ico"
	},
	"/printersfloss-logo.png": {
		"type": "image/png",
		"etag": "\"10aca-aGgFSVCPARwWXZk3Z37qOnn6598\"",
		"mtime": "2026-08-01T19:30:24.842Z",
		"size": 68298,
		"path": "../public/printersfloss-logo.png"
	},
	"/assets/ColorField-DTG4uNjU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cb-/wOrnPRZumLNwQozIv0JOJExZLg\"",
		"mtime": "2026-08-03T21:46:18.930Z",
		"size": 715,
		"path": "../public/assets/ColorField-DTG4uNjU.js"
	},
	"/assets/circle-check-CQHs8IcC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-wAlcdny7W3R0vCEDsb2gezpqHQA\"",
		"mtime": "2026-08-03T21:46:18.985Z",
		"size": 290,
		"path": "../public/assets/circle-check-CQHs8IcC.js"
	},
	"/assets/clock-3-BUsqYxOe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-l/f4QsvnU94s9EMJoVMY8Fmtrg0\"",
		"mtime": "2026-08-03T21:46:18.987Z",
		"size": 169,
		"path": "../public/assets/clock-3-BUsqYxOe.js"
	},
	"/assets/ConfirmButton-BAuwW17Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104f-MKS09i/zMxIL6JCHiLsQ65ukt9s\"",
		"mtime": "2026-08-03T21:46:18.930Z",
		"size": 4175,
		"path": "../public/assets/ConfirmButton-BAuwW17Q.js"
	},
	"/assets/DateInput-B75Nynvc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"619-Uuvc03Off4N3bXPF3ixGVsAyTPQ\"",
		"mtime": "2026-08-03T21:46:18.930Z",
		"size": 1561,
		"path": "../public/assets/DateInput-B75Nynvc.js"
	},
	"/assets/data-rules-Bu7NkuoK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"151-BxFXma/glkoO8u+MoZ1Fl6bLlFg\"",
		"mtime": "2026-08-03T21:46:18.988Z",
		"size": 337,
		"path": "../public/assets/data-rules-Bu7NkuoK.js"
	},
	"/assets/file-chart-column-increasing-B0bcyUc_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-VpCoCv3NZSKdqLkswV/fOiKlKI4\"",
		"mtime": "2026-08-03T21:46:18.990Z",
		"size": 407,
		"path": "../public/assets/file-chart-column-increasing-B0bcyUc_.js"
	},
	"/assets/createLucideIcon-DWbIy6sZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0f5-mpuWWksLJOmvh/rNux86ncby70I\"",
		"mtime": "2026-08-03T21:46:18.988Z",
		"size": 41205,
		"path": "../public/assets/createLucideIcon-DWbIy6sZ.js"
	},
	"/assets/history-ZjBhTJl7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed-iXA8Te2Z/0Apclz+egQmtxK8XGQ\"",
		"mtime": "2026-08-03T21:46:18.992Z",
		"size": 237,
		"path": "../public/assets/history-ZjBhTJl7.js"
	},
	"/assets/es2015-poVvnKx7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f686-SBBuKqukg7IA0uc5PTgGEBqUhhQ\"",
		"mtime": "2026-08-03T21:46:18.990Z",
		"size": 63110,
		"path": "../public/assets/es2015-poVvnKx7.js"
	},
	"/assets/key-round-CfBXY0BI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-w5+ERzPx9PVTRxcKBfhQQJK2OV0\"",
		"mtime": "2026-08-03T21:46:18.992Z",
		"size": 355,
		"path": "../public/assets/key-round-CfBXY0BI.js"
	},
	"/assets/inventory-fVwgQtKf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bad-EFlNdYHOdvYfcF2mY0Gz1H/KFY8\"",
		"mtime": "2026-08-03T21:46:18.992Z",
		"size": 11181,
		"path": "../public/assets/inventory-fVwgQtKf.js"
	},
	"/assets/index-BmFX399m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"588ac-em0/7qMmAtkn2OgEARqrd2X/ah0\"",
		"mtime": "2026-08-03T21:46:18.930Z",
		"size": 362668,
		"path": "../public/assets/index-BmFX399m.js"
	},
	"/assets/licenses-D4yIL_WR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2783-zDvq9tk3/XRfx/w0PdtoGa3Wv7Q\"",
		"mtime": "2026-08-03T21:46:18.994Z",
		"size": 10115,
		"path": "../public/assets/licenses-D4yIL_WR.js"
	},
	"/assets/licenses._id-BCE8Q2Vp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a4a-nW17RUQvr3SUlIoeUvyD0CAKXSI\"",
		"mtime": "2026-08-03T21:46:18.995Z",
		"size": 10826,
		"path": "../public/assets/licenses._id-BCE8Q2Vp.js"
	},
	"/assets/link-BoKzk_7J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1100-FV/6DsqhnefgxmJr805gBVp7FKk\"",
		"mtime": "2026-08-03T21:46:18.997Z",
		"size": 4352,
		"path": "../public/assets/link-BoKzk_7J.js"
	},
	"/assets/maintenance-oBPnRN9q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fc4-IxMzIiYIRdi7qKIBPTab3PpuEDY\"",
		"mtime": "2026-08-03T21:46:18.997Z",
		"size": 12228,
		"path": "../public/assets/maintenance-oBPnRN9q.js"
	},
	"/assets/ManagementVisuals-9b8TxxfP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4eb-EyZMxCvtW5xfxemagDCCRU8Grug\"",
		"mtime": "2026-08-03T21:46:18.930Z",
		"size": 1259,
		"path": "../public/assets/ManagementVisuals-9b8TxxfP.js"
	},
	"/assets/package-Cxo2hsKu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-4f2dQaW5c2xPwg2k5FWQQgx3i8M\"",
		"mtime": "2026-08-03T21:46:19.000Z",
		"size": 372,
		"path": "../public/assets/package-Cxo2hsKu.js"
	},
	"/assets/monitor-BCGW3rIC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-Dpas/XoWOs3Rj8tud0gq0WWxGZg\"",
		"mtime": "2026-08-03T21:46:18.998Z",
		"size": 259,
		"path": "../public/assets/monitor-BCGW3rIC.js"
	},
	"/assets/Match-BPux-P-X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bde1-En0hv9cTf5az1T/ijXiidTAlvkc\"",
		"mtime": "2026-08-03T21:46:18.975Z",
		"size": 48609,
		"path": "../public/assets/Match-BPux-P-X.js"
	},
	"/assets/package-plus-DFafqDMd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c8-CU+3EMNGrpMjdGae0FNP9y+cmDQ\"",
		"mtime": "2026-08-03T21:46:19.000Z",
		"size": 456,
		"path": "../public/assets/package-plus-DFafqDMd.js"
	},
	"/assets/people-departments.employee._id-D3BwvA90.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"214e-6Onzh5z6wR8tCGNjVm4a38xLopM\"",
		"mtime": "2026-08-03T21:46:19.097Z",
		"size": 8526,
		"path": "../public/assets/people-departments.employee._id-D3BwvA90.js"
	},
	"/assets/people-departments-CoqXHIAX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4072-qnsknS0EfTPw7L5661Q4WEahycI\"",
		"mtime": "2026-08-03T21:46:19.097Z",
		"size": 16498,
		"path": "../public/assets/people-departments-CoqXHIAX.js"
	},
	"/assets/people-departments._id-D27fplGW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cb3-53831gwPFXCx70zp3GHSEWTYgSo\"",
		"mtime": "2026-08-03T21:46:19.097Z",
		"size": 7347,
		"path": "../public/assets/people-departments._id-D27fplGW.js"
	},
	"/assets/plus-Cq_aBu7e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-20uQSwYwJn07naVGIGmLkpTmoI8\"",
		"mtime": "2026-08-03T21:46:19.097Z",
		"size": 153,
		"path": "../public/assets/plus-Cq_aBu7e.js"
	},
	"/assets/printer-B2fK0vWy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-JFpTq5UgT2GxM9H2Aa5TXR5G78U\"",
		"mtime": "2026-08-03T21:46:19.097Z",
		"size": 319,
		"path": "../public/assets/printer-B2fK0vWy.js"
	},
	"/assets/phone-DahM4Kdc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-ZHOQtJqmbeJo8COuyiSh4FiUib8\"",
		"mtime": "2026-08-03T21:46:19.097Z",
		"size": 482,
		"path": "../public/assets/phone-DahM4Kdc.js"
	},
	"/assets/PrinterImage-DNSYVUNf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24c-nQqJGBABieM87E8F5bZNBrj21wU\"",
		"mtime": "2026-08-03T21:46:18.975Z",
		"size": 588,
		"path": "../public/assets/PrinterImage-DNSYVUNf.js"
	},
	"/assets/PrinterFormDialog-Bvhacoa9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b51-V+TcD7XAIgYg7Dg+YQ6NNdUcX/Q\"",
		"mtime": "2026-08-03T21:46:18.975Z",
		"size": 6993,
		"path": "../public/assets/PrinterFormDialog-Bvhacoa9.js"
	},
	"/assets/printers.index-CxHDZ-KZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e7-QQxLdIBQNNFCz9ZjbfSP8MdRZMI\"",
		"mtime": "2026-08-03T21:46:19.103Z",
		"size": 5095,
		"path": "../public/assets/printers.index-CxHDZ-KZ.js"
	},
	"/assets/route-DGi9k6ul.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1f-caSoSeLnFXTfls6i+Y3/PpkCrVw\"",
		"mtime": "2026-08-03T21:46:19.103Z",
		"size": 7199,
		"path": "../public/assets/route-DGi9k6ul.js"
	},
	"/assets/reports-BU25OKh6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1211-CsDB016BT8F6IrtZqleUtoFILNk\"",
		"mtime": "2026-08-03T21:46:19.103Z",
		"size": 4625,
		"path": "../public/assets/reports-BU25OKh6.js"
	},
	"/assets/printers._id-BY3tvaZa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e94-mVASvt0GE80XVO6okZq4OY7vaPg\"",
		"mtime": "2026-08-03T21:46:19.103Z",
		"size": 20116,
		"path": "../public/assets/printers._id-BY3tvaZa.js"
	},
	"/assets/search-9cFwiF44.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-0TzX5k7npyiRG89OeoJbmU88ugQ\"",
		"mtime": "2026-08-03T21:46:19.103Z",
		"size": 174,
		"path": "../public/assets/search-9cFwiF44.js"
	},
	"/assets/ScopeColorBadges-Db-JeD9G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-qrncNhpSq6zy7INlNdyofFZg9io\"",
		"mtime": "2026-08-03T21:46:18.975Z",
		"size": 703,
		"path": "../public/assets/ScopeColorBadges-Db-JeD9G.js"
	},
	"/assets/styles-c_DfKdXh.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16bd8-nt+qCh+uSDfAf8hxZ39NrNtBoIc\"",
		"mtime": "2026-08-03T21:46:19.125Z",
		"size": 93144,
		"path": "../public/assets/styles-c_DfKdXh.css"
	},
	"/assets/settings-D4buagsl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75bd-bTCV+1IZbKueBMN2+j0hmFh4Hes\"",
		"mtime": "2026-08-03T21:46:19.103Z",
		"size": 30141,
		"path": "../public/assets/settings-D4buagsl.js"
	},
	"/assets/suppliers-JakvqXNR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1323-Cy+2G1mx+qfb+Dginr//e2tXhqE\"",
		"mtime": "2026-08-03T21:46:19.103Z",
		"size": 4899,
		"path": "../public/assets/suppliers-JakvqXNR.js"
	},
	"/assets/table-CrgemzTx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"672-b9Hb1mwqJocdKL9N343cjwuKrCw\"",
		"mtime": "2026-08-03T21:46:19.103Z",
		"size": 1650,
		"path": "../public/assets/table-CrgemzTx.js"
	},
	"/assets/toners-Dj0ihTv5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2426-D96enOz/Geez95g5WO7uMNnwIM0\"",
		"mtime": "2026-08-03T21:46:19.113Z",
		"size": 9254,
		"path": "../public/assets/toners-Dj0ihTv5.js"
	},
	"/assets/trash-2-CCO0K6q-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-dWY6119KpA179qEijfAG9Cd3KyE\"",
		"mtime": "2026-08-03T21:46:19.116Z",
		"size": 551,
		"path": "../public/assets/trash-2-CCO0K6q-.js"
	},
	"/assets/tabs-C2IsoWAm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1d-QNCMLXGohvscpSl4SOKy5mpbBvw\"",
		"mtime": "2026-08-03T21:46:19.109Z",
		"size": 7453,
		"path": "../public/assets/tabs-C2IsoWAm.js"
	},
	"/assets/triangle-alert-B9j1sgpY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-uGvNhVMEYZ0MCUZORThC2UTgMkM\"",
		"mtime": "2026-08-03T21:46:19.116Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-B9j1sgpY.js"
	},
	"/assets/useNavigate-BDQS-Gzb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"333-PMAxDhrcdH2vPhT0II0bo4d9lUM\"",
		"mtime": "2026-08-03T21:46:19.118Z",
		"size": 819,
		"path": "../public/assets/useNavigate-BDQS-Gzb.js"
	},
	"/assets/users-BDP8xhQ6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-LHdOrVNzTZRs8MO+X8zrmHFeCcs\"",
		"mtime": "2026-08-03T21:46:19.122Z",
		"size": 306,
		"path": "../public/assets/users-BDP8xhQ6.js"
	},
	"/assets/user-round-D8ZE09a1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6-QXpczEU04NbX5DkQOPvkgXS+8ZU\"",
		"mtime": "2026-08-03T21:46:19.120Z",
		"size": 182,
		"path": "../public/assets/user-round-D8ZE09a1.js"
	},
	"/assets/users-round-D7Re6SLO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-MXIu+sVPnvsSFBuAwucqn4zPawg\"",
		"mtime": "2026-08-03T21:46:19.123Z",
		"size": 253,
		"path": "../public/assets/users-round-D7Re6SLO.js"
	},
	"/assets/useStore-ClQKmfQf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af5-pE829slH7M3ZfO0C2ytVp7lZOZ4\"",
		"mtime": "2026-08-03T21:46:19.120Z",
		"size": 19189,
		"path": "../public/assets/useStore-ClQKmfQf.js"
	},
	"/assets/wrench-OBIxM4A3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-2mtDL/1k+e6DdBCG6k48MxiQIXs\"",
		"mtime": "2026-08-03T21:46:19.124Z",
		"size": 303,
		"path": "../public/assets/wrench-OBIxM4A3.js"
	},
	"/assets/_authenticated-C10Lsl3r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bf8-UdXu08gYcDyx5DWaBA+YJUuDp7w\"",
		"mtime": "2026-08-03T21:46:18.977Z",
		"size": 19448,
		"path": "../public/assets/_authenticated-C10Lsl3r.js"
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

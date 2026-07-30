import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Download } from "../_libs/lucide-react.mjs";
import { t as Button } from "./label-S2lCEF3z.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/QrCodeBox-Ba7f_eVB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function QrCodeBox({ value, size = 180 }) {
	const [src, setSrc] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		import_lib.toDataURL(value, {
			width: size * 2,
			margin: 1
		}).then((url) => {
			if (active) setSrc(url);
		});
		return () => {
			active = false;
		};
	}, [value, size]);
	if (!src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			width: size,
			height: size
		},
		className: "rounded-lg bg-secondary"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: `رمز QR للطابعة ${value}`,
				width: size,
				height: size,
				className: "rounded-lg border bg-card p-2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-sm text-muted-foreground",
				dir: "ltr",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				className: "no-print gap-2",
				onClick: () => {
					const a = document.createElement("a");
					a.href = src;
					a.download = `${value}.png`;
					a.click();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "تحميل الرمز"]
			})
		]
	});
}
//#endregion
export { QrCodeBox as t };

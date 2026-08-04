import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Input } from "./input-Dby3FvDq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ColorField-DnyooLbp.js
var import_jsx_runtime = require_jsx_runtime();
var COLOR_PALETTE = [
	"#2563eb",
	"#0f766e",
	"#7c3aed",
	"#c2410c",
	"#be123c",
	"#0369a1",
	"#4d7c0f",
	"#a21caf"
];
function ColorField({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "color",
			className: "h-10 w-16 cursor-pointer p-1",
			value: value || COLOR_PALETTE[0],
			onChange: (event) => onChange(event.target.value)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5",
			children: COLOR_PALETTE.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: `size-6 rounded-full border-2 ${value === color ? "border-foreground" : "border-background"}`,
				style: { backgroundColor: color },
				onClick: () => onChange(color),
				"aria-label": `اختيار اللون ${color}`
			}, color))
		})]
	});
}
//#endregion
export { ColorField as n, COLOR_PALETTE as t };

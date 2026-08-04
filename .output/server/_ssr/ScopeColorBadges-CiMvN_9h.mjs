import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ScopeColorBadges-CiMvN_9h.js
var import_jsx_runtime = require_jsx_runtime();
function alphaColor(color, alpha) {
	return /^#[0-9a-f]{6}$/i.test(color || "") ? `${color}${alpha}` : void 0;
}
function ScopeBadge({ label, color }) {
	const resolved = color || "#2563eb";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium",
		style: {
			borderColor: alphaColor(resolved, "55"),
			backgroundColor: alphaColor(resolved, "12"),
			color: resolved
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-2 rounded-full",
			style: { backgroundColor: resolved }
		}), label]
	});
}
function ScopeColorBadges({ department, branch }) {
	if (!department && !branch) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex flex-wrap gap-1.5",
		children: [department && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeBadge, {
			label: department.name,
			color: department.color || "#2563eb"
		}), branch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeBadge, {
			label: branch.name,
			color: branch.color || "#0f766e"
		})]
	});
}
//#endregion
export { ScopeColorBadges as t };

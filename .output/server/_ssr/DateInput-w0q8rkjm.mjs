import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as cn, n as Input } from "./input-Dby3FvDq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DateInput-w0q8rkjm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function toDisplayDate(value) {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
	return match ? `${match[3]}/${match[2]}/${match[1]}` : "";
}
function toStorageDate(value) {
	const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
	if (!match) return null;
	const year = Number(match[3]);
	const month = Number(match[2]);
	const day = Number(match[1]);
	const date = new Date(year, month - 1, day);
	if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
	return `${match[3]}-${match[2]}-${match[1]}`;
}
function formatTypedDate(value) {
	const digits = value.replace(/\D/g, "").slice(0, 8);
	return [
		digits.slice(0, 2),
		digits.slice(2, 4),
		digits.slice(4, 8)
	].filter(Boolean).join("/");
}
function DateInput({ value, onChange, ...props }) {
	const [displayValue, setDisplayValue] = (0, import_react.useState)(() => toDisplayDate(value));
	(0, import_react.useEffect)(() => setDisplayValue(toDisplayDate(value)), [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		...props,
		dir: "ltr",
		lang: "en-GB",
		inputMode: "numeric",
		maxLength: 10,
		placeholder: "DD/MM/YYYY",
		value: displayValue,
		onChange: (event) => {
			const next = formatTypedDate(event.target.value);
			setDisplayValue(next);
			const storageDate = toStorageDate(next);
			if (storageDate || !next) onChange(storageDate ?? "");
		}
	});
}
//#endregion
export { DateInput as n, Badge as t };

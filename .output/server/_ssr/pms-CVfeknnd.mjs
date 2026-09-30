//#region node_modules/.nitro/vite/services/ssr/assets/pms-CVfeknnd.js
var ASSET_TYPES = [
	"Printer",
	"Desktop PC",
	"Laptop",
	"Monitor",
	"Mobile Phone",
	"Network Device",
	"Other"
];
function formatDate(value) {
	if (!value) return "—";
	const datePart = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
	if (datePart) return `${datePart[3]}/${datePart[2]}/${datePart[1]}`;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "—";
	return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}
function daysUntil(date) {
	if (!date) return null;
	const datePart = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);
	const target = datePart ? new Date(Number(datePart[1]), Number(datePart[2]) - 1, Number(datePart[3])) : new Date(date);
	if (Number.isNaN(target.getTime())) return null;
	const diff = target.getTime() - (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
	return Math.round(diff / 864e5);
}
async function resolveImage(path) {
	return path ?? null;
}
async function uploadPrinterImage(file) {
	const formData = new FormData();
	formData.append("image", file);
	const response = await fetch("/api/printer-images", {
		method: "POST",
		headers: { "x-itam-request": "1" },
		body: formData
	});
	const body = await response.json();
	if (!response.ok) throw new Error(body.message ?? "تعذر رفع الصورة");
	return body.path;
}
async function uploadLicenseImage(file) {
	return uploadPrinterImage(file);
}
async function uploadInventoryImage(file) {
	return uploadPrinterImage(file);
}
//#endregion
export { uploadInventoryImage as a, resolveImage as i, daysUntil as n, uploadLicenseImage as o, formatDate as r, uploadPrinterImage as s, ASSET_TYPES as t };

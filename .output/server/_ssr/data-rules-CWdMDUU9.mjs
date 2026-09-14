//#region node_modules/.nitro/vite/services/ssr/assets/data-rules-CWdMDUU9.js
function canAssignLicense(seatCount, assignmentsCount) {
	return Number(assignmentsCount) < Math.max(0, Number(seatCount) || 0);
}
function inventoryAdjustment(previousItems = [], nextItems = []) {
	const quantities = /* @__PURE__ */ new Map();
	for (const item of previousItems) quantities.set(item.item_id, Number(item.quantity) || 0);
	for (const item of nextItems) quantities.set(item.item_id, (quantities.get(item.item_id) || 0) - (Number(item.quantity) || 0));
	return [...quantities].map(([itemId, quantityChange]) => ({
		itemId,
		quantityChange
	})).filter((item) => item.quantityChange !== 0);
}
//#endregion
export { inventoryAdjustment as n, canAssignLicense as t };

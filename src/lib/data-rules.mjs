export function canAssignLicense(seatCount, assignmentsCount) {
  return Number(assignmentsCount) < Math.max(0, Number(seatCount) || 0);
}

export function inventoryAdjustment(previousItems = [], nextItems = []) {
  const quantities = new Map();
  for (const item of previousItems)
    quantities.set(item.item_id, Number(item.quantity) || 0);
  for (const item of nextItems)
    quantities.set(
      item.item_id,
      (quantities.get(item.item_id) || 0) - (Number(item.quantity) || 0),
    );
  return [...quantities]
    .map(([itemId, quantityChange]) => ({ itemId, quantityChange }))
    .filter((item) => item.quantityChange !== 0);
}

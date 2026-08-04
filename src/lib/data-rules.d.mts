export type InventoryUsage = {
  item_id: string;
  quantity: number;
};

export type InventoryAdjustment = {
  itemId: string;
  quantityChange: number;
};

export function canAssignLicense(
  seatCount: number | string,
  assignmentsCount: number | string,
): boolean;

export function inventoryAdjustment(
  previousItems?: InventoryUsage[],
  nextItems?: InventoryUsage[],
): InventoryAdjustment[];

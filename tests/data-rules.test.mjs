import test from "node:test";
import assert from "node:assert/strict";
import {
  canAssignLicense,
  inventoryAdjustment,
} from "../src/lib/data-rules.mjs";

test("لا يسمح بتجاوز عدد مقاعد الترخيص", () => {
  assert.equal(canAssignLicense(3, 2), true);
  assert.equal(canAssignLicense(3, 3), false);
  assert.equal(canAssignLicense(0, 0), false);
});

test("تحسب فروقات مواد الصيانة عند التعديل", () => {
  assert.deepEqual(
    inventoryAdjustment(
      [
        { item_id: "toner", quantity: 3 },
        { item_id: "paper", quantity: 1 },
      ],
      [
        { item_id: "toner", quantity: 1 },
        { item_id: "cable", quantity: 2 },
      ],
    ),
    [
      { itemId: "toner", quantityChange: 2 },
      { itemId: "paper", quantityChange: 1 },
      { itemId: "cable", quantityChange: -2 },
    ],
  );
});

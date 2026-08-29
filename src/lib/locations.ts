import { odooRuntime } from "./odoo-runtime";

export const IT_WAREHOUSE = odooRuntime() ? "IT Warehouse" : "المستودع IT";

export function employeeAssetLocation(
  departmentName?: unknown,
  branchName?: unknown,
  employeeName?: unknown,
) {
  const scope = [departmentName, branchName]
    .map((value) => String(value ?? "").trim())
    .filter(Boolean);
  if (scope.length) return scope.join(" - ");
  const employee = String(employeeName ?? "").trim();
  if (!employee) return IT_WAREHOUSE;
  return odooRuntime() ? `With ${employee}` : `لدى ${employee}`;
}

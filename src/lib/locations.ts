export const IT_WAREHOUSE = "المستودع IT";

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
  return employee ? `لدى ${employee}` : IT_WAREHOUSE;
}

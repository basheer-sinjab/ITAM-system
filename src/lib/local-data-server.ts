import { mkdir } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import { dirname, join } from "node:path";

type Row = Record<string, unknown>;
type Query = {
  table: string;
  operation: "select" | "insert" | "update" | "delete" | "upsert";
  payload?: Row | Row[];
  filters?: Array<[string, unknown]>;
  ordering?: [string, boolean];
  take?: number;
  one?: boolean;
};
type Entity = { columns: string[]; sql: string; indexes?: string[] };

const DATABASE_PATH = join(
  process.env.INIT_CWD ?? process.cwd(),
  "data",
  "itam.db",
);
const ENTITIES: Record<string, Entity> = {
  branches: {
    columns: ["id", "name", "notes", "created_at"],
    sql: "CREATE TABLE IF NOT EXISTS branches (id TEXT PRIMARY KEY, name TEXT NOT NULL, notes TEXT, created_at TEXT NOT NULL)",
  },
  technicians: {
    columns: ["id", "name", "created_at"],
    sql: "CREATE TABLE IF NOT EXISTS technicians (id TEXT PRIMARY KEY, name TEXT NOT NULL, created_at TEXT NOT NULL)",
  },
  departments: {
    columns: ["id", "name", "branch", "branch_id", "notes", "created_at"],
    sql: "CREATE TABLE IF NOT EXISTS departments (id TEXT PRIMARY KEY, name TEXT NOT NULL, branch TEXT NOT NULL DEFAULT '', branch_id TEXT REFERENCES branches(id) ON DELETE SET NULL, notes TEXT, created_at TEXT NOT NULL, UNIQUE(name, branch_id))",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_departments_branch_id_name ON departments(branch_id, name)",
    ],
  },
  employees: {
    columns: [
      "id",
      "employee_number",
      "full_name",
      "email",
      "phone",
      "department_id",
      "status",
      "notes",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS employees (id TEXT PRIMARY KEY, employee_number TEXT UNIQUE, full_name TEXT NOT NULL, email TEXT, phone TEXT, department_id TEXT REFERENCES departments(id) ON DELETE SET NULL, status TEXT NOT NULL DEFAULT 'active', notes TEXT, created_at TEXT NOT NULL)",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department_id)",
      "CREATE INDEX IF NOT EXISTS idx_employees_name ON employees(full_name)",
      "CREATE UNIQUE INDEX IF NOT EXISTS idx_employees_number ON employees(employee_number) WHERE employee_number IS NOT NULL AND employee_number <> ''",
    ],
  },
  assets: {
    columns: [
      "id",
      "asset_id",
      "name",
      "asset_type",
      "manufacturer",
      "model",
      "serial_number",
      "status",
      "location",
      "department_id",
      "assigned_employee_id",
      "purchase_date",
      "warranty_expiry",
      "image_url",
      "notes",
      "created_at",
      "updated_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS assets (id TEXT PRIMARY KEY, asset_id TEXT NOT NULL UNIQUE, name TEXT NOT NULL, asset_type TEXT NOT NULL, manufacturer TEXT, model TEXT, serial_number TEXT UNIQUE, status TEXT NOT NULL DEFAULT 'active', location TEXT, department_id TEXT REFERENCES departments(id) ON DELETE SET NULL, assigned_employee_id TEXT REFERENCES employees(id) ON DELETE SET NULL, purchase_date TEXT, warranty_expiry TEXT, image_url TEXT, notes TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_assets_employee ON assets(assigned_employee_id)",
      "CREATE INDEX IF NOT EXISTS idx_assets_department ON assets(department_id)",
      "CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status)",
      "CREATE INDEX IF NOT EXISTS idx_assets_warranty ON assets(warranty_expiry)",
    ],
  },
  assignment_history: {
    columns: [
      "id",
      "asset_id",
      "employee_id",
      "employee_name",
      "employee_number",
      "employee_email",
      "employee_phone",
      "department_name",
      "branch_name",
      "assignment_date",
      "return_date",
      "return_condition",
      "notes",
      "return_notes",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS assignment_history (id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id) ON DELETE CASCADE, employee_id TEXT REFERENCES employees(id) ON DELETE SET NULL, employee_name TEXT, employee_number TEXT, employee_email TEXT, employee_phone TEXT, department_name TEXT, branch_name TEXT, assignment_date TEXT NOT NULL, return_date TEXT, return_condition TEXT, notes TEXT, return_notes TEXT, created_at TEXT NOT NULL)",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_assignment_asset ON assignment_history(asset_id)",
      "CREATE INDEX IF NOT EXISTS idx_assignment_employee ON assignment_history(employee_id)",
    ],
  },
  inventory_items: {
    columns: [
      "id",
      "name",
      "category",
      "color",
      "quantity",
      "minimum_quantity",
      "location",
      "notes",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS inventory_items (id TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'Consumable', color TEXT, quantity REAL NOT NULL DEFAULT 0 CHECK(quantity >= 0), minimum_quantity REAL NOT NULL DEFAULT 1 CHECK(minimum_quantity >= 0), location TEXT, notes TEXT, created_at TEXT NOT NULL)",
  },
  asset_maintenance: {
    columns: [
      "id",
      "asset_id",
      "maintenance_date",
      "maintenance_type",
      "status",
      "technician",
      "cost",
      "problem_description",
      "resolution",
      "notes",
      "used_items",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS asset_maintenance (id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id) ON DELETE CASCADE, maintenance_date TEXT NOT NULL, maintenance_type TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Closed' CHECK(status IN ('Open','Closed')), technician TEXT, cost REAL NOT NULL DEFAULT 0 CHECK(cost >= 0), problem_description TEXT, resolution TEXT, notes TEXT, used_items TEXT NOT NULL DEFAULT '[]', created_at TEXT NOT NULL)",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_maintenance_asset_date ON asset_maintenance(asset_id, maintenance_date DESC)",
      "CREATE INDEX IF NOT EXISTS idx_maintenance_status ON asset_maintenance(status)",
    ],
  },
  inventory_movements: {
    columns: [
      "id",
      "item_id",
      "movement_date",
      "movement_type",
      "quantity",
      "note",
      "maintenance_id",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS inventory_movements (id TEXT PRIMARY KEY, item_id TEXT NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE, movement_date TEXT NOT NULL, movement_type TEXT NOT NULL CHECK(movement_type IN ('add','use','return','adjust')), quantity REAL NOT NULL CHECK(quantity >= 0), note TEXT, maintenance_id TEXT REFERENCES asset_maintenance(id) ON DELETE SET NULL, created_at TEXT NOT NULL)",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_inventory_movements_item_date ON inventory_movements(item_id, movement_date DESC)",
      "CREATE INDEX IF NOT EXISTS idx_inventory_movements_maintenance ON inventory_movements(maintenance_id)",
    ],
  },
  licenses: {
    columns: [
      "id",
      "license_name",
      "product_name",
      "license_type",
      "license_key",
      "contract_number",
      "seat_count",
      "expiration_date",
      "notes",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS licenses (id TEXT PRIMARY KEY, license_name TEXT NOT NULL, product_name TEXT, license_type TEXT, license_key TEXT, contract_number TEXT, seat_count INTEGER NOT NULL DEFAULT 1 CHECK(seat_count >= 0), expiration_date TEXT, notes TEXT, created_at TEXT NOT NULL)",
  },
  license_assignments: {
    columns: [
      "id",
      "license_id",
      "employee_id",
      "asset_id",
      "assignment_date",
      "notes",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS license_assignments (id TEXT PRIMARY KEY, license_id TEXT NOT NULL REFERENCES licenses(id) ON DELETE CASCADE, employee_id TEXT REFERENCES employees(id) ON DELETE SET NULL, asset_id TEXT REFERENCES assets(id) ON DELETE SET NULL, assignment_date TEXT NOT NULL, notes TEXT, created_at TEXT NOT NULL, CHECK(employee_id IS NOT NULL OR asset_id IS NOT NULL))",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_license_assignment_license ON license_assignments(license_id)",
      "CREATE INDEX IF NOT EXISTS idx_license_assignment_employee ON license_assignments(employee_id)",
      "CREATE INDEX IF NOT EXISTS idx_license_assignment_asset ON license_assignments(asset_id)",
    ],
  },
  activity_log: {
    columns: [
      "id",
      "entity_type",
      "entity_id",
      "action",
      "details",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS activity_log (id TEXT PRIMARY KEY, entity_type TEXT NOT NULL, entity_id TEXT, action TEXT NOT NULL, details TEXT, created_at TEXT NOT NULL)",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_activity_log_created ON activity_log(created_at DESC)",
      "CREATE INDEX IF NOT EXISTS idx_activity_log_entity ON activity_log(entity_type, entity_id)",
    ],
  },
  app_settings: {
    columns: [
      "id",
      "low_stock_threshold",
      "dashboard_alerts_enabled",
      "warranty_alert_days",
      "updated_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS app_settings (id TEXT PRIMARY KEY, low_stock_threshold REAL NOT NULL DEFAULT 2, dashboard_alerts_enabled INTEGER NOT NULL DEFAULT 1, warranty_alert_days INTEGER NOT NULL DEFAULT 30, updated_at TEXT NOT NULL)",
  },
};
let ready: Promise<DatabaseSync> | undefined;
function definition(table: string) {
  const value = ENTITIES[table];
  if (!value) throw new Error("جدول ITAM غير صالح");
  return value;
}
function migrateDepartments(database: DatabaseSync) {
  const columns = database
    .prepare("PRAGMA table_info(departments)")
    .all() as Array<{ name: string }>;
  if (!columns.length || columns.some((column) => column.name === "branch"))
    return;
  database.exec("PRAGMA foreign_keys = OFF");
  database.exec(
    "CREATE TABLE departments_next (id TEXT PRIMARY KEY, name TEXT NOT NULL, branch TEXT NOT NULL DEFAULT '', notes TEXT, created_at TEXT NOT NULL, UNIQUE(name, branch))",
  );
  database.exec(
    "INSERT INTO departments_next (id, name, branch, notes, created_at) SELECT id, name, '', notes, created_at FROM departments",
  );
  database.exec("DROP TABLE departments");
  database.exec("ALTER TABLE departments_next RENAME TO departments");
  database.exec("PRAGMA foreign_keys = ON");
}
function migrateInventory(database: DatabaseSync) {
  const columns = database
    .prepare("PRAGMA table_info(inventory_items)")
    .all() as Array<{ name: string }>;
  if (columns.length && !columns.some((column) => column.name === "color")) {
    database.exec("ALTER TABLE inventory_items ADD COLUMN color TEXT");
  }
}
function migrateAssets(database: DatabaseSync) {
  const columns = database.prepare("PRAGMA table_info(assets)").all() as Array<{
    name: string;
  }>;
  if (
    columns.length &&
    !columns.some((column) => column.name === "department_id")
  ) {
    database.exec(
      "ALTER TABLE assets ADD COLUMN department_id TEXT REFERENCES departments(id) ON DELETE SET NULL",
    );
  }
  if (
    columns.length &&
    !columns.some((column) => column.name === "purchase_date")
  )
    database.exec("ALTER TABLE assets ADD COLUMN purchase_date TEXT");
  if (
    columns.length &&
    !columns.some((column) => column.name === "warranty_expiry")
  )
    database.exec("ALTER TABLE assets ADD COLUMN warranty_expiry TEXT");
}
function migrateSystemFields(database: DatabaseSync) {
  const departmentColumns = database
    .prepare("PRAGMA table_info(departments)")
    .all() as Array<{ name: string }>;
  if (
    departmentColumns.length &&
    !departmentColumns.some((column) => column.name === "branch_id")
  )
    database.exec(
      "ALTER TABLE departments ADD COLUMN branch_id TEXT REFERENCES branches(id) ON DELETE SET NULL",
    );
  database.exec(
    "UPDATE departments SET branch_id = (SELECT id FROM branches WHERE branches.name = departments.branch LIMIT 1) WHERE branch_id IS NULL AND branch <> ''",
  );

  const employeeColumns = database
    .prepare("PRAGMA table_info(employees)")
    .all() as Array<{ name: string }>;
  if (
    employeeColumns.length &&
    !employeeColumns.some((column) => column.name === "employee_number")
  )
    database.exec("ALTER TABLE employees ADD COLUMN employee_number TEXT");

  const licenseColumns = database
    .prepare("PRAGMA table_info(licenses)")
    .all() as Array<{ name: string }>;
  if (
    licenseColumns.length &&
    !licenseColumns.some((column) => column.name === "license_key")
  )
    database.exec("ALTER TABLE licenses ADD COLUMN license_key TEXT");
  if (
    licenseColumns.length &&
    !licenseColumns.some((column) => column.name === "contract_number")
  )
    database.exec("ALTER TABLE licenses ADD COLUMN contract_number TEXT");

  const assignmentColumns = database
    .prepare("PRAGMA table_info(assignment_history)")
    .all() as Array<{ name: string }>;
  for (const column of [
    "employee_name",
    "employee_number",
    "employee_email",
    "employee_phone",
    "department_name",
    "branch_name",
    "return_condition",
    "return_notes",
  ]) {
    if (!assignmentColumns.some((entry) => entry.name === column))
      database.exec(`ALTER TABLE assignment_history ADD COLUMN ${column} TEXT`);
  }
  database.exec(
    "UPDATE assignment_history SET employee_name = COALESCE(employee_name, (SELECT full_name FROM employees WHERE employees.id = assignment_history.employee_id)), employee_number = COALESCE(employee_number, (SELECT employee_number FROM employees WHERE employees.id = assignment_history.employee_id)), employee_email = COALESCE(employee_email, (SELECT email FROM employees WHERE employees.id = assignment_history.employee_id)), employee_phone = COALESCE(employee_phone, (SELECT phone FROM employees WHERE employees.id = assignment_history.employee_id)), department_name = COALESCE(department_name, (SELECT departments.name FROM employees JOIN departments ON departments.id = employees.department_id WHERE employees.id = assignment_history.employee_id)), branch_name = COALESCE(branch_name, (SELECT COALESCE(branches.name, departments.branch) FROM employees JOIN departments ON departments.id = employees.department_id LEFT JOIN branches ON branches.id = departments.branch_id WHERE employees.id = assignment_history.employee_id))",
  );
}
async function db() {
  if (!ready)
    ready = mkdir(dirname(DATABASE_PATH), { recursive: true }).then(() => {
      const database = new DatabaseSync(DATABASE_PATH);
      migrateDepartments(database);
      database.exec("PRAGMA foreign_keys = ON");
      for (const entity of Object.values(ENTITIES)) database.exec(entity.sql);
      migrateInventory(database);
      migrateAssets(database);
      migrateSystemFields(database);
      database.exec(
        "INSERT OR IGNORE INTO app_settings (id, low_stock_threshold, dashboard_alerts_enabled, warranty_alert_days, updated_at) VALUES ('default', 2, 1, 30, datetime('now'))",
      );
      for (const entity of Object.values(ENTITIES))
        entity.indexes?.forEach((index) => database.exec(index));
      return database;
    });
  return ready;
}
function hydrate(row: Row) {
  if (typeof row.used_items === "string")
    row.used_items = JSON.parse(row.used_items || "[]");
  if (typeof row.details === "string") {
    try {
      row.details = JSON.parse(row.details || "{}");
    } catch {
      row.details = {};
    }
  }
  if (row.dashboard_alerts_enabled !== undefined)
    row.dashboard_alerts_enabled = Boolean(row.dashboard_alerts_enabled);
  return row;
}
async function rows(table: string) {
  definition(table);
  return (await db())
    .prepare(`SELECT * FROM ${table}`)
    .all()
    .map((row) => hydrate(row as Row));
}
function match(row: Row, filters: Array<[string, unknown]>) {
  return filters.every(([field, value]) => row[field] === value);
}
function value(column: string, row: Row) {
  if (column === "used_items" || column === "details")
    return JSON.stringify(row[column] ?? (column === "used_items" ? [] : {}));
  if (column === "dashboard_alerts_enabled") return row[column] ? 1 : 0;
  return row[column] ?? null;
}
function save(
  database: DatabaseSync,
  table: string,
  row: Row,
  upsert: boolean,
) {
  const { columns } = definition(table);
  if (!row.id) throw new Error("معرّف السجل مطلوب");
  const placeholders = columns.map(() => "?").join(",");
  const updates = columns
    .filter((column) => column !== "id")
    .map((column) => `${column}=excluded.${column}`)
    .join(",");
  database
    .prepare(
      `${upsert ? "INSERT" : "INSERT"} INTO ${table} (${columns.join(",")}) VALUES (${placeholders})${upsert ? ` ON CONFLICT(id) DO UPDATE SET ${updates}` : ""}`,
    )
    .run(...columns.map((column) => value(column, row)));
}
function logActivity(
  database: DatabaseSync,
  table: string,
  entityId: unknown,
  action: string,
  details: unknown,
) {
  if (table === "activity_log") return;
  database
    .prepare(
      "INSERT INTO activity_log (id, entity_type, entity_id, action, details, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    )
    .run(
      crypto.randomUUID(),
      table,
      entityId ? String(entityId) : null,
      action,
      JSON.stringify(details ?? {}),
      new Date().toISOString(),
    );
}
async function run(query: Query) {
  const database = await db();
  const filters = query.filters ?? [];
  let result = await rows(query.table);
  if (query.operation === "insert" || query.operation === "upsert") {
    const values = Array.isArray(query.payload)
      ? query.payload
      : [query.payload];
    if (!values.every(Boolean)) throw new Error("بيانات السجل مطلوبة");
    database.exec("BEGIN");
    try {
      for (const row of values as Row[]) {
        if (query.table === "license_assignments") {
          const license = database
            .prepare("SELECT seat_count FROM licenses WHERE id = ?")
            .get(String(row.license_id)) as { seat_count?: number } | undefined;
          const assigned = database
            .prepare(
              "SELECT COUNT(*) AS count FROM license_assignments WHERE license_id = ?",
            )
            .get(String(row.license_id)) as { count: number };
          if (
            !license ||
            Number(assigned.count) >= Number(license.seat_count || 0)
          )
            throw new Error("لا توجد مقاعد متاحة في هذا الترخيص");
        }
        save(database, query.table, row, query.operation === "upsert");
        logActivity(
          database,
          query.table,
          row.id,
          query.operation === "upsert" ? "update" : "create",
          { current: row },
        );
      }
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    result = values as Row[];
  } else if (query.operation === "update") {
    if (!query.payload || Array.isArray(query.payload))
      throw new Error("بيانات التحديث مطلوبة");
    const previousRows = result.filter((row) => match(row, filters));
    result = previousRows.map((row) => ({ ...row, ...query.payload }));
    database.exec("BEGIN");
    try {
      result.forEach((row, index) => {
        if (
          query.table === "licenses" &&
          (query.payload as Row).seat_count !== undefined
        ) {
          const assigned = database
            .prepare(
              "SELECT COUNT(*) AS count FROM license_assignments WHERE license_id = ?",
            )
            .get(String(row.id)) as { count: number };
          if (Number(row.seat_count || 0) < Number(assigned.count))
            throw new Error(
              `لا يمكن تقليل المقاعد عن ${assigned.count} لأنها مستخدمة حاليًا`,
            );
        }
        save(database, query.table, row, true);
        const previous = previousRows[index];
        const changes = Object.fromEntries(
          Object.keys(query.payload as Row)
            .filter((key) => previous[key] !== row[key])
            .map((key) => [
              key,
              { from: previous[key] ?? null, to: row[key] ?? null },
            ]),
        );
        if (Object.keys(changes).length)
          logActivity(database, query.table, row.id, "update", { changes });
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  } else if (query.operation === "delete") {
    result = result.filter((row) => match(row, filters));
    database.exec("BEGIN");
    try {
      const statement = database.prepare(
        `DELETE FROM ${query.table} WHERE id = ?`,
      );
      for (const row of result) {
        logActivity(database, query.table, row.id, "delete", { previous: row });
        statement.run(String(row.id));
      }
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  } else {
    result = result.filter((row) => match(row, filters));
    if (query.ordering) {
      const [field, ascending] = query.ordering;
      result.sort(
        (left, right) =>
          String(left[field] ?? "").localeCompare(String(right[field] ?? "")) *
          (ascending ? 1 : -1),
      );
    }
    if (query.take) result = result.slice(0, query.take);
  }
  return query.one ? (result[0] ?? null) : result;
}
async function exportData() {
  return Object.fromEntries(
    await Promise.all(
      Object.keys(ENTITIES).map(async (table) => [table, await rows(table)]),
    ),
  );
}
async function restore(data: Record<string, Row[]>) {
  const database = await db();
  const optionalTables = new Set(["inventory_movements", "activity_log"]);
  for (const table of Object.keys(ENTITIES)) {
    if (data[table] === undefined && optionalTables.has(table))
      data[table] = [];
    if (!Array.isArray(data[table]))
      throw new Error("تحتوي النسخة الاحتياطية على بيانات غير صالحة");
  }
  database.exec("BEGIN");
  try {
    for (const table of Object.keys(ENTITIES).reverse())
      database.exec(`DELETE FROM ${table}`);
    for (const table of Object.keys(ENTITIES))
      for (const row of data[table]) save(database, table, row, false);
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}
export async function handleLocalDataRequest(request: Request) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/local-data")) return null;
  try {
    if (url.pathname === "/api/local-data/status" && request.method === "GET") {
      const database = await db();
      return Response.json({
        hasData: Object.keys(ENTITIES).some(
          (table) =>
            database.prepare(`SELECT 1 FROM ${table} LIMIT 1`).get() !==
            undefined,
        ),
        normalized: true,
      });
    }
    if (url.pathname === "/api/local-data/query" && request.method === "POST")
      return Response.json({
        data: await run((await request.json()) as Query),
        error: null,
      });
    if (url.pathname === "/api/local-data/export" && request.method === "GET")
      return Response.json({ data: await exportData() });
    if (
      url.pathname === "/api/local-data/restore" &&
      request.method === "POST"
    ) {
      await restore((await request.json()) as Record<string, Row[]>);
      return Response.json({ ok: true });
    }
    return new Response("Not found", { status: 404 });
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "تعذر الوصول إلى قاعدة البيانات",
      },
      { status: 400 },
    );
  }
}

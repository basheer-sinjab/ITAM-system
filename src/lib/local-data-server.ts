import { mkdir } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import { dirname, join } from "node:path";
import { readJsonBody } from "./local-request-security";

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
    columns: ["id", "name", "color", "notes", "created_at"],
    sql: "CREATE TABLE IF NOT EXISTS branches (id TEXT PRIMARY KEY, name TEXT NOT NULL, color TEXT, notes TEXT, created_at TEXT NOT NULL)",
  },
  technicians: {
    columns: ["id", "name", "created_at"],
    sql: "CREATE TABLE IF NOT EXISTS technicians (id TEXT PRIMARY KEY, name TEXT NOT NULL, created_at TEXT NOT NULL)",
  },
  departments: {
    columns: [
      "id",
      "name",
      "branch",
      "branch_id",
      "color",
      "notes",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS departments (id TEXT PRIMARY KEY, name TEXT NOT NULL, branch TEXT NOT NULL DEFAULT '', branch_id TEXT REFERENCES branches(id) ON DELETE SET NULL, color TEXT, notes TEXT, created_at TEXT NOT NULL, UNIQUE(name, branch_id))",
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
      "archived_at",
      "created_at",
      "updated_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS assets (id TEXT PRIMARY KEY, asset_id TEXT NOT NULL UNIQUE, name TEXT NOT NULL, asset_type TEXT NOT NULL, manufacturer TEXT, model TEXT, serial_number TEXT UNIQUE, status TEXT NOT NULL DEFAULT 'active', location TEXT, department_id TEXT REFERENCES departments(id) ON DELETE SET NULL, assigned_employee_id TEXT REFERENCES employees(id) ON DELETE SET NULL, purchase_date TEXT, warranty_expiry TEXT, image_url TEXT, notes TEXT, archived_at TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_assets_employee ON assets(assigned_employee_id)",
      "CREATE INDEX IF NOT EXISTS idx_assets_department ON assets(department_id)",
      "CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status)",
      "CREATE INDEX IF NOT EXISTS idx_assets_warranty ON assets(warranty_expiry)",
    ],
  },
  asset_templates: {
    columns: [
      "id",
      "name",
      "asset_type",
      "manufacturer",
      "model",
      "notes",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS asset_templates (id TEXT PRIMARY KEY, name TEXT NOT NULL, asset_type TEXT NOT NULL, manufacturer TEXT, model TEXT, notes TEXT, created_at TEXT NOT NULL)",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_asset_templates_type_name ON asset_templates(asset_type, name)",
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
      "source_type",
      "source_id",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS asset_maintenance (id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id) ON DELETE CASCADE, maintenance_date TEXT NOT NULL, maintenance_type TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Closed' CHECK(status IN ('Open','Closed')), technician TEXT, cost REAL NOT NULL DEFAULT 0 CHECK(cost >= 0), problem_description TEXT, resolution TEXT, notes TEXT, used_items TEXT NOT NULL DEFAULT '[]', source_type TEXT, source_id TEXT, created_at TEXT NOT NULL)",
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
  pc_specs: {
    columns: [
      "id",
      "asset_id",
      "processor",
      "memory",
      "storage",
      "graphics_card",
      "operating_system",
      "notes",
      "created_at",
      "updated_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS pc_specs (id TEXT PRIMARY KEY, asset_id TEXT NOT NULL UNIQUE REFERENCES assets(id) ON DELETE CASCADE, processor TEXT, memory TEXT, storage TEXT, graphics_card TEXT, operating_system TEXT, notes TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_pc_specs_asset ON pc_specs(asset_id)",
    ],
  },
  pc_part_installations: {
    columns: [
      "id",
      "asset_id",
      "inventory_item_id",
      "part_name",
      "installed_at",
      "removed_at",
      "old_part_action",
      "replacement_of_id",
      "notes",
      "undone_at",
      "maintenance_id",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS pc_part_installations (id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id) ON DELETE CASCADE, inventory_item_id TEXT REFERENCES inventory_items(id) ON DELETE SET NULL, part_name TEXT NOT NULL, installed_at TEXT NOT NULL, removed_at TEXT, old_part_action TEXT, replacement_of_id TEXT, notes TEXT, undone_at TEXT, maintenance_id TEXT REFERENCES asset_maintenance(id) ON DELETE SET NULL, created_at TEXT NOT NULL)",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_pc_parts_asset ON pc_part_installations(asset_id, installed_at DESC)",
      "CREATE INDEX IF NOT EXISTS idx_pc_parts_inventory ON pc_part_installations(inventory_item_id)",
    ],
  },
  toner_installations: {
    columns: [
      "id",
      "asset_id",
      "inventory_item_id",
      "toner_name",
      "quantity",
      "installed_at",
      "notes",
      "undone_at",
      "maintenance_id",
      "created_at",
    ],
    sql: "CREATE TABLE IF NOT EXISTS toner_installations (id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id) ON DELETE CASCADE, inventory_item_id TEXT REFERENCES inventory_items(id) ON DELETE SET NULL, toner_name TEXT NOT NULL, quantity REAL NOT NULL DEFAULT 1 CHECK(quantity > 0), installed_at TEXT NOT NULL, notes TEXT, undone_at TEXT, maintenance_id TEXT REFERENCES asset_maintenance(id) ON DELETE SET NULL, created_at TEXT NOT NULL)",
    indexes: [
      "CREATE INDEX IF NOT EXISTS idx_toner_installations_asset ON toner_installations(asset_id, installed_at DESC)",
      "CREATE INDEX IF NOT EXISTS idx_toner_installations_inventory ON toner_installations(inventory_item_id)",
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
function migrateColors(database: DatabaseSync) {
  const palette = [
    "#2563eb",
    "#0f766e",
    "#7c3aed",
    "#c2410c",
    "#be123c",
    "#0369a1",
    "#4d7c0f",
    "#a21caf",
  ];
  for (const table of ["branches", "departments"]) {
    const columns = database
      .prepare(`PRAGMA table_info(${table})`)
      .all() as Array<{ name: string }>;
    if (columns.length && !columns.some((column) => column.name === "color"))
      database.exec(`ALTER TABLE ${table} ADD COLUMN color TEXT`);
    const rows = database
      .prepare(`SELECT id, color FROM ${table} ORDER BY created_at, name`)
      .all() as Array<{ id: string; color?: string | null }>;
    const update = database.prepare(
      `UPDATE ${table} SET color = ? WHERE id = ?`,
    );
    rows.forEach((row, index) => {
      if (!row.color)
        update.run(
          palette[(index + (table === "departments" ? 2 : 0)) % palette.length],
          row.id,
        );
    });
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
  if (
    columns.length &&
    !columns.some((column) => column.name === "archived_at")
  )
    database.exec("ALTER TABLE assets ADD COLUMN archived_at TEXT");
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

  const maintenanceColumns = database
    .prepare("PRAGMA table_info(asset_maintenance)")
    .all() as Array<{ name: string }>;
  for (const column of ["source_type", "source_id"])
    if (!maintenanceColumns.some((entry) => entry.name === column))
      database.exec(`ALTER TABLE asset_maintenance ADD COLUMN ${column} TEXT`);

  for (const table of ["pc_part_installations", "toner_installations"]) {
    const installationColumns = database
      .prepare(`PRAGMA table_info(${table})`)
      .all() as Array<{ name: string }>;
    if (!installationColumns.some((entry) => entry.name === "maintenance_id"))
      database.exec(
        `ALTER TABLE ${table} ADD COLUMN maintenance_id TEXT REFERENCES asset_maintenance(id) ON DELETE SET NULL`,
      );
  }
}
function seedAssetTemplates(database: DatabaseSync) {
  const assets = database
    .prepare(
      "SELECT MIN(name) AS name, asset_type, manufacturer, model FROM assets WHERE COALESCE(trim(manufacturer), '') <> '' OR COALESCE(trim(model), '') <> '' GROUP BY asset_type, manufacturer, model",
    )
    .all() as Array<{
    name: string;
    asset_type: string;
    manufacturer?: string | null;
    model?: string | null;
  }>;
  const insert = database.prepare(
    "INSERT INTO asset_templates (id, name, asset_type, manufacturer, model, notes, created_at) VALUES (?, ?, ?, ?, ?, NULL, ?)",
  );
  for (const asset of assets)
    insert.run(
      crypto.randomUUID(),
      asset.name,
      asset.asset_type,
      asset.manufacturer ?? null,
      asset.model ?? null,
      new Date().toISOString(),
    );
}
export async function getLocalDatabase() {
  if (!ready)
    ready = mkdir(dirname(DATABASE_PATH), { recursive: true }).then(() => {
      const database = new DatabaseSync(DATABASE_PATH);
      const shouldSeedAssetTemplates = !database
        .prepare(
          "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'asset_templates'",
        )
        .get();
      migrateDepartments(database);
      database.exec("PRAGMA foreign_keys = ON");
      for (const entity of Object.values(ENTITIES)) database.exec(entity.sql);
      migrateInventory(database);
      migrateAssets(database);
      migrateSystemFields(database);
      migrateColors(database);
      database.exec(
        "INSERT OR IGNORE INTO app_settings (id, low_stock_threshold, dashboard_alerts_enabled, warranty_alert_days, updated_at) VALUES ('default', 2, 1, 30, datetime('now'))",
      );
      database.exec(
        "CREATE TABLE IF NOT EXISTS admin_account (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, password_salt TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
      );
      database.exec(
        "CREATE TABLE IF NOT EXISTS admin_sessions (token_hash TEXT PRIMARY KEY, expires_at TEXT NOT NULL, created_at TEXT NOT NULL)",
      );
      database.exec(
        "CREATE INDEX IF NOT EXISTS idx_admin_sessions_expiry ON admin_sessions(expires_at)",
      );
      for (const entity of Object.values(ENTITIES))
        entity.indexes?.forEach((index) => database.exec(index));
      if (shouldSeedAssetTemplates) seedAssetTemplates(database);
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
  return (await getLocalDatabase())
    .prepare(`SELECT * FROM ${table}`)
    .all()
    .map((row) => hydrate(row as Row));
}
function match(row: Row, filters: Array<[string, unknown]>) {
  return filters.every(([field, value]) => row[field] === value);
}
type SqlInputValue = null | number | bigint | string | NodeJS.ArrayBufferView;

function value(column: string, row: Row): SqlInputValue {
  if (column === "used_items" || column === "details")
    return JSON.stringify(row[column] ?? (column === "used_items" ? [] : {}));
  if (column === "dashboard_alerts_enabled") return row[column] ? 1 : 0;
  return (row[column] ?? null) as SqlInputValue;
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
function normalizedSerial(serial: unknown) {
  return typeof serial === "string" && serial.trim() ? serial.trim() : null;
}
function assertUniqueSerial(database: DatabaseSync, row: Row) {
  const serial = normalizedSerial(row.serial_number);
  row.serial_number = serial;
  if (!serial) return;
  const duplicate = database
    .prepare(
      "SELECT id, asset_id FROM assets WHERE lower(trim(serial_number)) = lower(trim(?)) AND id <> ? LIMIT 1",
    )
    .get(serial, String(row.id ?? "")) as
    { id: string; asset_id: string } | undefined;
  if (duplicate)
    throw new Error(
      `الرقم التسلسلي مستخدم مسبقًا في الأصل ${duplicate.asset_id}`,
    );
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
  definition(query.table);
  if (
    !["select", "insert", "update", "delete", "upsert"].includes(
      query.operation,
    )
  )
    throw new Error("عملية البيانات غير مدعومة");
  const database = await getLocalDatabase();
  const filters = query.filters ?? [];
  if (
    (query.operation === "update" || query.operation === "delete") &&
    filters.length === 0
  )
    throw new Error("تم رفض العملية لأنها لا تحدد السجلات المطلوبة");
  if (query.table === "activity_log" && query.operation !== "select")
    throw new Error("سجل النشاط للقراءة فقط");
  if (query.table === "asset_maintenance" && query.operation !== "select")
    throw new Error("يجب حفظ الصيانة من خلال مسار الصيانة الآمن");
  if (query.table === "assets" && query.operation === "delete")
    throw new Error("لا يمكن حذف الأصل نهائيًا؛ استخدم الأرشفة");
  let result = await rows(query.table);
  if (query.operation === "insert" || query.operation === "upsert") {
    const values = Array.isArray(query.payload)
      ? query.payload
      : [query.payload];
    if (!values.every(Boolean)) throw new Error("بيانات السجل مطلوبة");
    database.exec("BEGIN");
    try {
      for (const row of values as Row[]) {
        if (query.table === "assets") assertUniqueSerial(database, row);
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
        if (query.table === "assets") assertUniqueSerial(database, row);
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
        if (
          query.table === "employees" &&
          Object.prototype.hasOwnProperty.call(
            query.payload as Row,
            "department_id",
          ) &&
          previous.department_id !== row.department_id
        ) {
          const assignedAssets = database
            .prepare("SELECT * FROM assets WHERE assigned_employee_id = ?")
            .all(String(row.id)) as Row[];
          for (const assignedAsset of assignedAssets) {
            const previousDepartment = assignedAsset.department_id ?? null;
            assignedAsset.department_id = row.department_id ?? null;
            save(database, "assets", assignedAsset, true);
            if (previousDepartment !== assignedAsset.department_id)
              logActivity(database, "assets", assignedAsset.id, "update", {
                changes: {
                  department_id: {
                    from: previousDepartment,
                    to: assignedAsset.department_id,
                  },
                },
                reason: "employee_department_transfer",
              });
          }
        }
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
  const database = await getLocalDatabase();
  const optionalTables = new Set([
    "inventory_movements",
    "activity_log",
    "asset_templates",
    "pc_specs",
    "pc_part_installations",
    "toner_installations",
  ]);
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
type HardwareAction =
  | {
      action: "install-toner";
      assetId: string;
      itemId: string;
      quantity?: number;
      installedAt?: string;
      notes?: string;
    }
  | { action: "undo-toner"; installationId: string }
  | {
      action: "install-part";
      assetId: string;
      itemId: string;
      installedAt?: string;
      notes?: string;
      oldInstallationId?: string;
      oldPartAction?: "damaged" | "return_to_stock" | "disposed";
    }
  | { action: "undo-part"; installationId: string };

function recordFor(
  database: DatabaseSync,
  table: string,
  id: string,
): Row | undefined {
  const record = database
    .prepare(`SELECT * FROM ${table} WHERE id = ?`)
    .get(id) as Row | undefined;
  return record ? hydrate(record) : undefined;
}
function isAssetType(asset: Row, expected: "printer" | "pc") {
  const type = String(asset.asset_type ?? "")
    .trim()
    .toLowerCase();
  if (expected === "printer")
    return type === "printer" || type.includes("طابعة");
  return (
    type === "desktop pc" ||
    type === "pc" ||
    type === "laptop" ||
    type.includes("notebook") ||
    type.includes("desktop") ||
    type.includes("كمبيوتر مكتبي")
  );
}
function addInventoryMovement(
  database: DatabaseSync,
  itemId: string,
  movementType: "use" | "return",
  quantity: number,
  movementDate: string,
  note: string,
  maintenanceId: string | null = null,
) {
  database
    .prepare(
      "INSERT INTO inventory_movements (id, item_id, movement_date, movement_type, quantity, note, maintenance_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .run(
      crypto.randomUUID(),
      itemId,
      movementDate,
      movementType,
      quantity,
      note,
      maintenanceId,
      new Date().toISOString(),
    );
}

function createHardwareMaintenance(
  database: DatabaseSync,
  input: {
    id: string;
    assetId: string;
    date: string;
    itemId: string;
    quantity: number;
    sourceType: "toner_installation" | "part_installation";
    sourceId: string;
    itemName: string;
    notes?: string;
    replacement?: boolean;
    createdAt: string;
  },
) {
  const isToner = input.sourceType === "toner_installation";
  const action = isToner
    ? `تغيير حبر ${input.itemName}`
    : input.replacement
      ? `استبدال قطعة ${input.itemName}`
      : `تركيب قطعة ${input.itemName}`;
  save(
    database,
    "asset_maintenance",
    {
      id: input.id,
      asset_id: input.assetId,
      maintenance_date: input.date,
      maintenance_type: isToner
        ? "Toner Replacement"
        : input.replacement
          ? "Part Replacement"
          : "Part Installation",
      status: "Closed",
      technician: null,
      cost: 0,
      problem_description: action,
      resolution: `تم ${action}`,
      notes: input.notes?.trim() || null,
      used_items: [{ id: input.itemId, quantity: input.quantity }],
      source_type: input.sourceType,
      source_id: input.sourceId,
      created_at: input.createdAt,
    },
    false,
  );
  logActivity(database, "asset_maintenance", input.id, "create", {
    source: input.sourceType,
    asset_id: input.assetId,
    item_name: input.itemName,
    quantity: input.quantity,
  });
}

function markLinkedMaintenanceUndone(
  database: DatabaseSync,
  maintenanceId: unknown,
  note: string,
) {
  if (!maintenanceId) return;
  const maintenance = recordFor(
    database,
    "asset_maintenance",
    String(maintenanceId),
  );
  if (!maintenance) return;
  const resolution = [maintenance.resolution, note].filter(Boolean).join(" — ");
  database
    .prepare(
      "UPDATE asset_maintenance SET used_items = '[]', source_type = COALESCE(source_type, 'hardware') || '_undone', resolution = ? WHERE id = ?",
    )
    .run(resolution, String(maintenanceId));
  logActivity(database, "asset_maintenance", maintenanceId, "update", {
    reason: "hardware_undo",
    note,
  });
}
function takeFromInventory(
  database: DatabaseSync,
  itemId: string,
  quantity: number,
  itemName: string,
) {
  const result = database
    .prepare(
      "UPDATE inventory_items SET quantity = quantity - ? WHERE id = ? AND quantity >= ?",
    )
    .run(quantity, itemId, quantity);
  if (!result.changes)
    throw new Error(`الكمية المتوفرة من ${itemName} لا تكفي`);
}
async function runHardwareAction(request: HardwareAction) {
  const database = await getLocalDatabase();
  const now = new Date().toISOString();
  const today = now.slice(0, 10);
  database.exec("BEGIN");
  try {
    if (request.action === "install-toner") {
      const asset = recordFor(database, "assets", request.assetId);
      const item = recordFor(database, "inventory_items", request.itemId);
      if (!asset || !isAssetType(asset, "printer"))
        throw new Error("تركيب الحبر متاح لأصول الطابعات فقط");
      if (!item || item.category !== "Toner")
        throw new Error("اختر حبرًا من المخزون");
      const quantity = Math.max(1, Number(request.quantity) || 1);
      const installedAt = request.installedAt || today;
      const installationId = crypto.randomUUID();
      const maintenanceId = crypto.randomUUID();
      createHardwareMaintenance(database, {
        id: maintenanceId,
        assetId: String(asset.id),
        date: installedAt,
        itemId: String(item.id),
        quantity,
        sourceType: "toner_installation",
        sourceId: installationId,
        itemName: String(item.name),
        notes: request.notes,
        createdAt: now,
      });
      takeFromInventory(database, String(item.id), quantity, String(item.name));
      const installation: Row = {
        id: installationId,
        asset_id: asset.id,
        inventory_item_id: item.id,
        toner_name: item.name,
        quantity,
        installed_at: installedAt,
        notes: request.notes?.trim() || null,
        undone_at: null,
        maintenance_id: maintenanceId,
        created_at: now,
      };
      save(database, "toner_installations", installation, false);
      addInventoryMovement(
        database,
        String(item.id),
        "use",
        quantity,
        installedAt,
        `تركيب حبر في ${asset.name}`,
        maintenanceId,
      );
      logActivity(database, "assets", asset.id, "toner_install", {
        installation_id: installation.id,
        item_name: item.name,
        quantity,
      });
      database.exec("COMMIT");
      return installation;
    }

    if (request.action === "undo-toner") {
      const installation = recordFor(
        database,
        "toner_installations",
        request.installationId,
      );
      if (!installation || installation.undone_at)
        throw new Error("عملية تركيب الحبر غير متاحة للتراجع");
      if (!installation.inventory_item_id)
        throw new Error("عنصر الحبر الأصلي غير موجود في المخزون");
      database
        .prepare(
          "UPDATE inventory_items SET quantity = quantity + ? WHERE id = ?",
        )
        .run(
          Number(installation.quantity),
          String(installation.inventory_item_id),
        );
      database
        .prepare("UPDATE toner_installations SET undone_at = ? WHERE id = ?")
        .run(now, String(installation.id));
      addInventoryMovement(
        database,
        String(installation.inventory_item_id),
        "return",
        Number(installation.quantity),
        today,
        `تراجع عن تركيب حبر ${installation.toner_name}`,
        installation.maintenance_id
          ? String(installation.maintenance_id)
          : null,
      );
      markLinkedMaintenanceUndone(
        database,
        installation.maintenance_id,
        `تم التراجع عن تركيب حبر ${installation.toner_name}`,
      );
      logActivity(database, "assets", installation.asset_id, "toner_undo", {
        installation_id: installation.id,
        item_name: installation.toner_name,
      });
      database.exec("COMMIT");
      return { ...installation, undone_at: now };
    }

    if (request.action === "install-part") {
      const asset = recordFor(database, "assets", request.assetId);
      const item = recordFor(database, "inventory_items", request.itemId);
      if (!asset || !isAssetType(asset, "pc"))
        throw new Error(
          "تركيب القطع متاح لأصول الكمبيوتر المكتبي واللابتوب فقط",
        );
      if (!item || item.category !== "Spare Part")
        throw new Error("اختر قطعة غيار من المخزون");
      const installedAt = request.installedAt || today;
      const installationId = crypto.randomUUID();
      const maintenanceId = crypto.randomUUID();
      let oldPart: Row | undefined;
      if (request.oldInstallationId) {
        oldPart = recordFor(
          database,
          "pc_part_installations",
          request.oldInstallationId,
        );
        if (
          !oldPart ||
          oldPart.asset_id !== asset.id ||
          oldPart.removed_at ||
          oldPart.undone_at
        )
          throw new Error("القطعة القديمة غير متاحة للاستبدال");
        if (
          !request.oldPartAction ||
          !["damaged", "return_to_stock", "disposed"].includes(
            request.oldPartAction,
          )
        )
          throw new Error("حدد ما تم مع القطعة القديمة");
        createHardwareMaintenance(database, {
          id: maintenanceId,
          assetId: String(asset.id),
          date: installedAt,
          itemId: String(item.id),
          quantity: 1,
          sourceType: "part_installation",
          sourceId: installationId,
          itemName: String(item.name),
          notes: request.notes,
          replacement: true,
          createdAt: now,
        });
        if (
          request.oldPartAction === "return_to_stock" &&
          oldPart.inventory_item_id
        ) {
          database
            .prepare(
              "UPDATE inventory_items SET quantity = quantity + 1 WHERE id = ?",
            )
            .run(String(oldPart.inventory_item_id));
          addInventoryMovement(
            database,
            String(oldPart.inventory_item_id),
            "return",
            1,
            installedAt,
            `إرجاع قطعة ${oldPart.part_name} بعد استبدالها`,
            maintenanceId,
          );
        }
        database
          .prepare(
            "UPDATE pc_part_installations SET removed_at = ?, old_part_action = ? WHERE id = ?",
          )
          .run(installedAt, request.oldPartAction, String(oldPart.id));
      }
      if (!oldPart)
        createHardwareMaintenance(database, {
          id: maintenanceId,
          assetId: String(asset.id),
          date: installedAt,
          itemId: String(item.id),
          quantity: 1,
          sourceType: "part_installation",
          sourceId: installationId,
          itemName: String(item.name),
          notes: request.notes,
          createdAt: now,
        });
      takeFromInventory(database, String(item.id), 1, String(item.name));
      const installation: Row = {
        id: installationId,
        asset_id: asset.id,
        inventory_item_id: item.id,
        part_name: item.name,
        installed_at: installedAt,
        removed_at: null,
        old_part_action: null,
        replacement_of_id: oldPart?.id ?? null,
        notes: request.notes?.trim() || null,
        undone_at: null,
        maintenance_id: maintenanceId,
        created_at: now,
      };
      save(database, "pc_part_installations", installation, false);
      addInventoryMovement(
        database,
        String(item.id),
        "use",
        1,
        installedAt,
        oldPart
          ? `تركيب ${item.name} بدل ${oldPart.part_name} في ${asset.name}`
          : `تركيب ${item.name} في ${asset.name}`,
        maintenanceId,
      );
      logActivity(database, "assets", asset.id, "part_install", {
        installation_id: installation.id,
        item_name: item.name,
        replaced_part: oldPart?.part_name ?? null,
        old_part_action: request.oldPartAction ?? null,
      });
      database.exec("COMMIT");
      return installation;
    }

    const installation = recordFor(
      database,
      "pc_part_installations",
      request.installationId,
    );
    if (!installation || installation.undone_at || installation.removed_at)
      throw new Error("عملية تركيب القطعة غير متاحة للتراجع");
    if (!installation.inventory_item_id)
      throw new Error("قطعة الغيار الأصلية غير موجودة في المخزون");
    database
      .prepare(
        "UPDATE inventory_items SET quantity = quantity + 1 WHERE id = ?",
      )
      .run(String(installation.inventory_item_id));
    addInventoryMovement(
      database,
      String(installation.inventory_item_id),
      "return",
      1,
      today,
      `تراجع عن تركيب ${installation.part_name}`,
      installation.maintenance_id ? String(installation.maintenance_id) : null,
    );
    if (installation.replacement_of_id) {
      const oldPart = recordFor(
        database,
        "pc_part_installations",
        String(installation.replacement_of_id),
      );
      if (!oldPart) throw new Error("تعذر العثور على القطعة القديمة");
      if (
        oldPart.old_part_action === "return_to_stock" &&
        oldPart.inventory_item_id
      ) {
        takeFromInventory(
          database,
          String(oldPart.inventory_item_id),
          1,
          String(oldPart.part_name),
        );
        addInventoryMovement(
          database,
          String(oldPart.inventory_item_id),
          "use",
          1,
          today,
          `إعادة تركيب ${oldPart.part_name} بعد التراجع عن الاستبدال`,
          installation.maintenance_id
            ? String(installation.maintenance_id)
            : null,
        );
      }
      database
        .prepare(
          "UPDATE pc_part_installations SET removed_at = NULL, old_part_action = NULL WHERE id = ?",
        )
        .run(String(oldPart.id));
    }
    database
      .prepare(
        "UPDATE pc_part_installations SET removed_at = ?, undone_at = ? WHERE id = ?",
      )
      .run(today, now, String(installation.id));
    markLinkedMaintenanceUndone(
      database,
      installation.maintenance_id,
      `تم التراجع عن تركيب ${installation.part_name}`,
    );
    logActivity(database, "assets", installation.asset_id, "part_undo", {
      installation_id: installation.id,
      item_name: installation.part_name,
    });
    database.exec("COMMIT");
    return { ...installation, removed_at: today, undone_at: now };
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

type WorkflowAction =
  | { action: "archive-asset"; assetId: string }
  | { action: "restore-asset"; assetId: string }
  | { action: "save-maintenance"; record: Row }
  | { action: "delete-maintenance"; maintenanceId: string };

type UsedItem = { id: string; quantity: number };

function normalizedUsedItems(value: unknown): UsedItem[] {
  if (!Array.isArray(value)) return [];
  const quantities = new Map<string, number>();
  for (const entry of value) {
    if (!entry || typeof entry !== "object")
      throw new Error("بيانات المواد المستخدمة غير صالحة");
    const item = entry as Record<string, unknown>;
    const id = String(item.id ?? item.item_id ?? "").trim();
    const quantity = Number(item.quantity);
    if (!id || !Number.isFinite(quantity) || quantity <= 0)
      throw new Error("كمية المادة المستخدمة غير صالحة");
    quantities.set(id, (quantities.get(id) ?? 0) + quantity);
  }
  return [...quantities].map(([id, quantity]) => ({ id, quantity }));
}

function usedItemMap(items: UsedItem[]) {
  return new Map(items.map((item) => [item.id, item.quantity]));
}

function usedItemsEqual(left: UsedItem[], right: UsedItem[]) {
  const a = usedItemMap(left);
  const b = usedItemMap(right);
  return (
    a.size === b.size &&
    [...a].every(([id, quantity]) => b.get(id) === quantity)
  );
}

function reconcileMaintenanceInventory(
  database: DatabaseSync,
  previous: UsedItem[],
  next: UsedItem[],
  date: string,
  maintenanceId: string,
) {
  const before = usedItemMap(previous);
  const after = usedItemMap(next);
  const itemIds = new Set([...before.keys(), ...after.keys()]);
  for (const itemId of itemIds) {
    const change = (after.get(itemId) ?? 0) - (before.get(itemId) ?? 0);
    if (!change) continue;
    const item = recordFor(database, "inventory_items", itemId);
    if (!item) throw new Error("أحد عناصر المخزون المستخدمة غير موجود");
    if (change > 0)
      takeFromInventory(database, itemId, change, String(item.name));
    else
      database
        .prepare(
          "UPDATE inventory_items SET quantity = quantity + ? WHERE id = ?",
        )
        .run(Math.abs(change), itemId);
    addInventoryMovement(
      database,
      itemId,
      change > 0 ? "use" : "return",
      Math.abs(change),
      date,
      change > 0 ? "استخدام في سجل صيانة" : "إرجاع بعد تعديل أو حذف سجل صيانة",
      maintenanceId,
    );
  }
}

function syncHardwareFromMaintenance(
  database: DatabaseSync,
  maintenance: Row,
  previousItems: UsedItem[],
  nextItems: UsedItem[],
  now: string,
) {
  const asset = recordFor(database, "assets", String(maintenance.asset_id));
  if (!asset) throw new Error("الأصل المرتبط بالصيانة غير موجود");
  const date = String(maintenance.maintenance_date);
  const notes = maintenance.notes ? String(maintenance.notes) : null;
  const nextMap = usedItemMap(nextItems);
  const inventory = new Map<string, Row>();
  for (const item of nextItems) {
    const record = recordFor(database, "inventory_items", item.id);
    if (!record) throw new Error("أحد عناصر المخزون المستخدمة غير موجود");
    inventory.set(item.id, record);
  }

  if (isAssetType(asset, "printer")) {
    const target = new Map(
      [...nextMap].filter(([id]) => inventory.get(id)?.category === "Toner"),
    );
    const linked = database
      .prepare(
        "SELECT * FROM toner_installations WHERE maintenance_id = ? AND undone_at IS NULL ORDER BY created_at",
      )
      .all(String(maintenance.id)) as Row[];
    const retained = new Set<string>();
    for (const installation of linked) {
      const itemId = String(installation.inventory_item_id ?? "");
      const quantity = target.get(itemId);
      if (quantity !== undefined && !retained.has(itemId)) {
        database
          .prepare(
            "UPDATE toner_installations SET quantity = ?, installed_at = ?, notes = ? WHERE id = ?",
          )
          .run(quantity, date, notes, String(installation.id));
        retained.add(itemId);
      } else {
        database
          .prepare("UPDATE toner_installations SET undone_at = ? WHERE id = ?")
          .run(now, String(installation.id));
        logActivity(database, "assets", asset.id, "toner_undo", {
          installation_id: installation.id,
          source: "maintenance",
        });
      }
    }
    for (const [itemId, quantity] of target) {
      if (retained.has(itemId)) continue;
      const item = inventory.get(itemId)!;
      const installationId = crypto.randomUUID();
      save(
        database,
        "toner_installations",
        {
          id: installationId,
          asset_id: asset.id,
          inventory_item_id: item.id,
          toner_name: item.name,
          quantity,
          installed_at: date,
          notes,
          undone_at: null,
          maintenance_id: maintenance.id,
          created_at: now,
        },
        false,
      );
      logActivity(database, "assets", asset.id, "toner_install", {
        installation_id: installationId,
        item_name: item.name,
        quantity,
        source: "maintenance",
      });
    }
  }

  if (isAssetType(asset, "pc")) {
    const target = new Map(
      [...nextMap].filter(
        ([id]) => inventory.get(id)?.category === "Spare Part",
      ),
    );
    for (const [itemId, quantity] of target)
      if (!Number.isInteger(quantity))
        throw new Error(
          `كمية قطعة ${inventory.get(itemId)?.name ?? itemId} يجب أن تكون رقمًا صحيحًا`,
        );
    const linked = database
      .prepare(
        "SELECT * FROM pc_part_installations WHERE maintenance_id = ? AND undone_at IS NULL ORDER BY created_at",
      )
      .all(String(maintenance.id)) as Row[];
    const itemIds = new Set([
      ...target.keys(),
      ...linked.map((item) => String(item.inventory_item_id ?? "")),
    ]);
    for (const itemId of itemIds) {
      if (!itemId) continue;
      const installations = linked.filter(
        (item) => String(item.inventory_item_id ?? "") === itemId,
      );
      const removed = installations.filter((item) => item.removed_at);
      const active = installations.filter((item) => !item.removed_at);
      const wanted = target.get(itemId) ?? 0;
      if (wanted < removed.length)
        throw new Error(
          "لا يمكن إزالة قطعة من سجل صيانة بعد استبدالها؛ يبقى السجل محفوظًا للتاريخ",
        );
      const keepActive = Math.max(0, wanted - removed.length);
      const removedByEdit = active.slice(keepActive);
      if (removedByEdit.some((item) => item.replacement_of_id))
        throw new Error(
          "للتراجع عن قطعة بديلة استخدم زر التراجع من صفحة الأصل حتى تعود القطعة القديمة بطريقة صحيحة",
        );
      for (const installation of removedByEdit) {
        database
          .prepare(
            "UPDATE pc_part_installations SET removed_at = ?, undone_at = ? WHERE id = ?",
          )
          .run(date, now, String(installation.id));
        logActivity(database, "assets", asset.id, "part_undo", {
          installation_id: installation.id,
          source: "maintenance",
        });
      }
      const missing = keepActive - Math.min(active.length, keepActive);
      for (let index = 0; index < missing; index += 1) {
        const item = inventory.get(itemId);
        if (!item) throw new Error("قطعة الغيار غير موجودة في المخزون");
        const installationId = crypto.randomUUID();
        save(
          database,
          "pc_part_installations",
          {
            id: installationId,
            asset_id: asset.id,
            inventory_item_id: item.id,
            part_name: item.name,
            installed_at: date,
            removed_at: null,
            old_part_action: null,
            replacement_of_id: null,
            notes,
            undone_at: null,
            maintenance_id: maintenance.id,
            created_at: now,
          },
          false,
        );
        logActivity(database, "assets", asset.id, "part_install", {
          installation_id: installationId,
          item_name: item.name,
          source: "maintenance",
        });
      }
    }
  }

  if (!usedItemsEqual(previousItems, nextItems))
    logActivity(database, "asset_maintenance", maintenance.id, "sync", {
      previous: previousItems,
      current: nextItems,
    });
}

async function runWorkflowAction(request: WorkflowAction) {
  const database = await getLocalDatabase();
  const now = new Date().toISOString();
  const today = now.slice(0, 10);
  database.exec("BEGIN IMMEDIATE");
  try {
    if (request.action === "archive-asset") {
      const asset = recordFor(database, "assets", request.assetId);
      if (!asset) throw new Error("الأصل غير موجود");
      if (!asset.archived_at) {
        database
          .prepare(
            "UPDATE assignment_history SET return_date = ?, return_condition = COALESCE(return_condition, 'good'), return_notes = COALESCE(return_notes, 'إغلاق تلقائي عند أرشفة الأصل') WHERE asset_id = ? AND return_date IS NULL",
          )
          .run(today, request.assetId);
        database
          .prepare(
            "UPDATE assets SET archived_at = ?, assigned_employee_id = NULL, status = 'inactive', updated_at = ? WHERE id = ?",
          )
          .run(now, now, request.assetId);
        logActivity(database, "assets", request.assetId, "archive", {
          previous_status: asset.status,
        });
      }
      database.exec("COMMIT");
      return { ...asset, archived_at: asset.archived_at || now };
    }

    if (request.action === "restore-asset") {
      const asset = recordFor(database, "assets", request.assetId);
      if (!asset) throw new Error("الأصل غير موجود");
      database
        .prepare(
          "UPDATE assets SET archived_at = NULL, status = 'active', updated_at = ? WHERE id = ?",
        )
        .run(now, request.assetId);
      logActivity(database, "assets", request.assetId, "restore", {});
      database.exec("COMMIT");
      return { ...asset, archived_at: null, status: "active" };
    }

    if (request.action === "save-maintenance") {
      const input = request.record;
      const id = String(input.id ?? crypto.randomUUID());
      const previous = recordFor(database, "asset_maintenance", id);
      const asset = recordFor(database, "assets", String(input.asset_id ?? ""));
      if (!asset || asset.archived_at)
        throw new Error("اختر أصلًا موجودًا وغير مؤرشف");
      if (previous && previous.asset_id !== input.asset_id) {
        const linked = database
          .prepare(
            "SELECT 1 FROM toner_installations WHERE maintenance_id = ? UNION SELECT 1 FROM pc_part_installations WHERE maintenance_id = ? LIMIT 1",
          )
          .get(id, id);
        if (linked)
          throw new Error("لا يمكن تغيير الأصل بعد ربط الصيانة بحبر أو قطعة");
      }
      const date = String(input.maintenance_date ?? today);
      const status = input.status === "Open" ? "Open" : "Closed";
      const cost = Math.max(0, Number(input.cost) || 0);
      const previousItems = normalizedUsedItems(previous?.used_items ?? []);
      const nextItems = normalizedUsedItems(input.used_items ?? []);
      const maintenance: Row = {
        ...previous,
        ...input,
        id,
        asset_id: asset.id,
        maintenance_date: date,
        maintenance_type: String(input.maintenance_type || "Corrective"),
        status,
        technician: input.technician || null,
        cost,
        problem_description: input.problem_description || null,
        resolution: input.resolution || null,
        notes: input.notes || null,
        used_items: nextItems,
        source_type:
          previous?.source_type ?? input.source_type ?? "maintenance",
        source_id: previous?.source_id ?? input.source_id ?? null,
        created_at: previous?.created_at ?? now,
      };
      save(database, "asset_maintenance", maintenance, Boolean(previous));
      reconcileMaintenanceInventory(
        database,
        previousItems,
        nextItems,
        date,
        id,
      );
      syncHardwareFromMaintenance(
        database,
        maintenance,
        previousItems,
        nextItems,
        now,
      );
      logActivity(
        database,
        "asset_maintenance",
        id,
        previous ? "update" : "create",
        { current: maintenance },
      );
      database.exec("COMMIT");
      return maintenance;
    }

    const maintenance = recordFor(
      database,
      "asset_maintenance",
      request.maintenanceId,
    );
    if (!maintenance) throw new Error("سجل الصيانة غير موجود");
    const previousItems = normalizedUsedItems(maintenance.used_items ?? []);
    syncHardwareFromMaintenance(database, maintenance, previousItems, [], now);
    reconcileMaintenanceInventory(
      database,
      previousItems,
      [],
      today,
      String(maintenance.id),
    );
    logActivity(database, "asset_maintenance", maintenance.id, "delete", {
      previous: maintenance,
    });
    database
      .prepare("DELETE FROM asset_maintenance WHERE id = ?")
      .run(String(maintenance.id));
    database.exec("COMMIT");
    return maintenance;
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
      const database = await getLocalDatabase();
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
        data: await run(await readJsonBody<Query>(request)),
        error: null,
      });
    if (
      url.pathname === "/api/local-data/hardware" &&
      request.method === "POST"
    )
      return Response.json({
        data: await runHardwareAction(
          await readJsonBody<HardwareAction>(request),
        ),
        error: null,
      });
    if (
      url.pathname === "/api/local-data/workflow" &&
      request.method === "POST"
    )
      return Response.json({
        data: await runWorkflowAction(
          await readJsonBody<WorkflowAction>(request),
        ),
        error: null,
      });
    if (url.pathname === "/api/local-data/export" && request.method === "GET")
      return Response.json({ data: await exportData() });
    if (
      url.pathname === "/api/local-data/restore" &&
      request.method === "POST"
    ) {
      await restore(
        await readJsonBody<Record<string, Row[]>>(request, 50_000_000),
      );
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

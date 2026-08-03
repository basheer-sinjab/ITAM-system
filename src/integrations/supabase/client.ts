/**
 * Local data adapter.
 *
 * The UI was originally generated against Supabase.  This small compatibility
 * layer keeps that UI intact while storing records in the local SQLite file.
 * Printer image files are kept separately in uploads/printers.
 */
type Row = Record<string, any>;
type Result = { data: any; error: Error | null };

const TABLES = [
  "branches", "technicians", "departments", "employees", "assets", "assignment_history", "inventory_items",
  "asset_maintenance", "licenses", "license_assignments", "app_settings",
] as const;
type TableName = (typeof TABLES)[number];
const now = () => new Date().toISOString();
const uuid = () => crypto.randomUUID();
const ASSET_PREFIXES: Record<string, string> = {
  Printer: "PR",
  "Desktop PC": "PC",
  Laptop: "LT",
  Monitor: "MT",
  "Mobile Phone": "PH",
  "Network Device": "NW",
  Other: "OT",
};

async function api<T>(path: string, init?: RequestInit) {
  const response = await fetch(`/api/local-data${path}`, init);
  const body = await response.json();
  if (!response.ok) throw new Error(body.message ?? "تعذر الوصول إلى قاعدة البيانات");
  return body as T;
}

function defaults(table: string, value: Row): Row {
  const base = { id: uuid(), created_at: now(), ...value };
  if (table === "assets") return { ...base, asset_type: value.asset_type ?? "Printer", status: value.status ?? "active", updated_at: now() };
  if (table === "employees") return { status: "active", ...base };
  if (table === "assignment_history") return { assignment_date: new Date().toISOString().slice(0, 10), return_date: null, ...base };
  if (table === "inventory_items") return { category: "Consumable", quantity: 0, minimum_quantity: 1, ...base };
  if (table === "asset_maintenance") return { maintenance_date: new Date().toISOString().slice(0, 10), maintenance_type: "Corrective", status: "Closed", used_items: [], cost: 0, ...base };
  if (table === "licenses") return { seat_count: 1, ...base };
  if (table === "license_assignments") return { assignment_date: new Date().toISOString().slice(0, 10), ...base };
  if (table === "app_settings") return { id: "default", low_stock_threshold: 2, dashboard_alerts_enabled: true, warranty_alert_days: 30, updated_at: now(), ...value };
  return base;
}

function nextAssetId(assetType: string | undefined, assets: Row[]) {
  const prefix = ASSET_PREFIXES[assetType ?? ""] ?? "OT";
  const expression = new RegExp(`^${prefix}-(\\d+)$`);
  const highest = assets.reduce((maximum, asset) => {
    const match = expression.exec(String(asset.asset_id ?? ""));
    return match ? Math.max(maximum, Number(match[1])) : maximum;
  }, 0);
  return `${prefix}-${String(highest + 1).padStart(3, "0")}`;
}

async function applyInsertDefaults(table: string, payload: Row | Row[]) {
  const values = Array.isArray(payload) ? payload : [payload];
  if (table !== "assets") return values.map((value) => defaults(table, value));

  const knownAssets = await getRows("assets");
  const prepared: Row[] = [];
  for (const value of values) {
    const asset = defaults(table, value);
    asset.asset_id ||= nextAssetId(asset.asset_type, [...knownAssets, ...prepared]);
    prepared.push(asset);
  }
  return prepared;
}

class Query {
  private filters: Array<[string, any]> = [];
  private ordering?: [string, boolean]; private take?: number; private one = false; private selectText = "*";
  constructor(private table: string, private operation: "select" | "insert" | "update" | "delete" | "upsert" = "select", private payload?: Row | Row[]) {}
  select(text = "*") { this.selectText = text; return this; }
  eq(field: string, value: any) { this.filters.push([field, value]); return this; }
  order(field: string, options?: { ascending?: boolean }) { this.ordering = [field, options?.ascending !== false]; return this; }
  limit(value: number) { this.take = value; return this; }
  single() { this.one = true; return this; }
  maybeSingle() { this.one = true; return this; }
  async execute(): Promise<Result> {
    try {
      const payload = this.operation === "insert"
        ? await applyInsertDefaults(this.table, this.payload!)
        : this.operation === "upsert"
          ? (await applyInsertDefaults(this.table, this.payload!))[0]
          : this.payload;
      const response = await api<{ data: Row[] | Row | null }>("/query", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          table: this.table,
          operation: this.operation,
          payload,
          filters: this.filters,
          ordering: this.ordering,
          take: this.take,
          one: this.one,
        }),
      });
      let rows = response.data === null ? [] : Array.isArray(response.data) ? response.data : [response.data];
      if (this.operation === "select") {
        rows = await this.expand(rows);
        if (this.selectText !== "*" && !this.selectText.includes("(")) {
          const fields = this.selectText.split(",").map((x) => x.trim()); rows = rows.map((r) => Object.fromEntries(fields.map((f) => [f, r[f]])));
        }
      }
      return { data: this.one ? (rows[0] ?? null) : rows, error: null };
    } catch (error) { return { data: null, error: error instanceof Error ? error : new Error(String(error)) }; }
  }
  private async expand(rows: Row[]) {
    if (this.table === "toner_replacements" && this.selectText.includes("toner_replacement_items")) {
      const items = await getRows("toner_replacement_items"); rows = rows.map((r) => ({ ...r, toner_replacement_items: items.filter((i) => i.replacement_id === r.id) }));
    }
    if ((this.table === "toner_replacements" || this.table === "maintenance_records") && this.selectText.includes("printers(")) {
      const printers = await getRows("printers"); rows = rows.map((r) => ({ ...r, printers: printers.find((p) => p.id === r.printer_id) ?? null }));
    }
    return rows;
  }
  then<TResult1 = Result, TResult2 = never>(ok?: ((value: Result) => TResult1 | PromiseLike<TResult1>) | null, fail?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null) { return this.execute().then(ok, fail); }
}

export const supabase: any = {
  from(table: string) { return { select: (text?: string) => new Query(table).select(text), insert: (value: Row | Row[]) => new Query(table, "insert", value), update: (value: Row) => new Query(table, "update", value), delete: () => new Query(table, "delete"), upsert: (value: Row) => new Query(table, "upsert", value) }; },
};

async function getRows(table: string) {
  const response = await api<{ data: Row[] }>("/query", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ table, operation: "select" }),
  });
  return response.data;
}

export async function exportLocalData(): Promise<Record<TableName, Row[]>> {
  return (await api<{ data: Record<TableName, Row[]> }>("/export")).data;
}

export async function restoreLocalData(data: Record<string, Row[]>) {
  await api("/restore", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
}

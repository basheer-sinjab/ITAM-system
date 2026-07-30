import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-DyqBgkKx.js
var DATABASE = "printers-manager-local";
var TABLES = [
	"branches",
	"departments",
	"responsible_persons",
	"parts",
	"suppliers",
	"toners",
	"toner_stock_entries",
	"printers",
	"toner_replacements",
	"toner_replacement_items",
	"maintenance_records",
	"printer_transfers",
	"app_settings"
];
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var uuid = () => crypto.randomUUID();
function openDb() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DATABASE, 1);
		request.onupgradeneeded = () => {
			const db = request.result;
			for (const table of TABLES) if (!db.objectStoreNames.contains(table)) db.createObjectStore(table, { keyPath: "id" });
			if (!db.objectStoreNames.contains("files")) db.createObjectStore("files", { keyPath: "id" });
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}
async function all(table) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const request = db.transaction(table, "readonly").objectStore(table).getAll();
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}
async function put(table, value) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const request = db.transaction(table, "readwrite").objectStore(table).put(value);
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}
async function remove(table, id) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const request = db.transaction(table, "readwrite").objectStore(table).delete(id);
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}
function defaults(table, value) {
	const base = {
		id: uuid(),
		created_at: now(),
		...value
	};
	if (table === "printers") return {
		status: "active",
		is_favorite: false,
		asset_id: `PRN-${String(Date.now()).slice(-4)}`,
		updated_at: now(),
		...base
	};
	if (table === "toners") return {
		color: "black",
		quantity: 0,
		min_quantity: 1,
		updated_at: now(),
		...base
	};
	if (table === "maintenance_records") return {
		service_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		maintenance_type: "repair",
		replaced_parts: [],
		...base
	};
	if (table === "toner_replacements") return {
		change_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		...base
	};
	if (table === "toner_replacement_items") return {
		quantity: 1,
		...base
	};
	if (table === "toner_stock_entries") return {
		entry_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		...base
	};
	if (table === "printer_transfers") return {
		transfer_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		...base
	};
	if (table === "app_settings") return {
		id: true,
		low_stock_threshold: 2,
		dashboard_alerts_enabled: true,
		warranty_alert_days: 30,
		updated_at: now(),
		...value
	};
	return base;
}
var Query = class {
	table;
	operation;
	payload;
	filters = [];
	ordering;
	take;
	one = false;
	selectText = "*";
	constructor(table, operation = "select", payload) {
		this.table = table;
		this.operation = operation;
		this.payload = payload;
	}
	select(text = "*") {
		this.selectText = text;
		return this;
	}
	eq(field, value) {
		this.filters.push([field, value]);
		return this;
	}
	order(field, options) {
		this.ordering = [field, options?.ascending !== false];
		return this;
	}
	limit(value) {
		this.take = value;
		return this;
	}
	single() {
		this.one = true;
		return this;
	}
	maybeSingle() {
		this.one = true;
		return this;
	}
	async execute() {
		try {
			let rows = await all(this.table);
			const matches = (r) => this.filters.every(([k, v]) => r[k] === v);
			if (this.operation === "insert") {
				const inserted = (Array.isArray(this.payload) ? this.payload : [this.payload]).map((item) => defaults(this.table, item));
				for (const row of inserted) await put(this.table, row);
				rows = inserted;
			} else if (this.operation === "upsert") {
				const item = defaults(this.table, this.payload);
				await put(this.table, item);
				rows = [item];
			} else if (this.operation === "update") {
				rows = rows.filter(matches).map((row) => ({
					...row,
					...this.payload,
					updated_at: this.table === "printers" || this.table === "toners" ? now() : row.updated_at
				}));
				for (const row of rows) await put(this.table, row);
			} else if (this.operation === "delete") {
				rows = rows.filter(matches);
				for (const row of rows) await remove(this.table, row.id);
			} else rows = rows.filter(matches);
			if (this.operation === "select") {
				if (this.ordering) {
					const [key, asc] = this.ordering;
					rows.sort((a, b) => String(a[key] ?? "").localeCompare(String(b[key] ?? "")) * (asc ? 1 : -1));
				}
				if (this.take) rows = rows.slice(0, this.take);
				rows = await this.expand(rows);
				if (this.selectText !== "*" && !this.selectText.includes("(")) {
					const fields = this.selectText.split(",").map((x) => x.trim());
					rows = rows.map((r) => Object.fromEntries(fields.map((f) => [f, r[f]])));
				}
			}
			return {
				data: this.one ? rows[0] ?? null : rows,
				error: null
			};
		} catch (error) {
			return {
				data: null,
				error: error instanceof Error ? error : new Error(String(error))
			};
		}
	}
	async expand(rows) {
		if (this.table === "toner_replacements" && this.selectText.includes("toner_replacement_items")) {
			const items = await all("toner_replacement_items");
			rows = rows.map((r) => ({
				...r,
				toner_replacement_items: items.filter((i) => i.replacement_id === r.id)
			}));
		}
		if ((this.table === "toner_replacements" || this.table === "maintenance_records") && this.selectText.includes("printers(")) {
			const printers = await all("printers");
			rows = rows.map((r) => ({
				...r,
				printers: printers.find((p) => p.id === r.printer_id) ?? null
			}));
		}
		return rows;
	}
	then(ok, fail) {
		return this.execute().then(ok, fail);
	}
};
var supabase = {
	from(table) {
		return {
			select: (text) => new Query(table).select(text),
			insert: (value) => new Query(table, "insert", value),
			update: (value) => new Query(table, "update", value),
			delete: () => new Query(table, "delete"),
			upsert: (value) => new Query(table, "upsert", value)
		};
	},
	storage: { from: () => ({
		async upload(_path, file) {
			const id = uuid();
			await put("files", {
				id,
				file
			});
			return {
				data: { path: id },
				error: null
			};
		},
		async createSignedUrl(path) {
			const file = (await all("files")).find((x) => x.id === path)?.file;
			return {
				data: file ? { signedUrl: URL.createObjectURL(file) } : null,
				error: file ? null : /* @__PURE__ */ new Error("الصورة غير موجودة")
			};
		}
	}) }
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { supabase as n, cn as t };

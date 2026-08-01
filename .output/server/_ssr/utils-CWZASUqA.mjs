import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-CWZASUqA.js
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var uuid = () => crypto.randomUUID();
var ASSET_PREFIXES = {
	Printer: "PR",
	"Desktop PC": "PC",
	Laptop: "LT",
	Monitor: "MT",
	"Mobile Phone": "PH",
	"Network Device": "NW",
	Other: "OT"
};
async function api(path, init) {
	const response = await fetch(`/api/local-data${path}`, init);
	const body = await response.json();
	if (!response.ok) throw new Error(body.message ?? "تعذر الوصول إلى قاعدة البيانات");
	return body;
}
function defaults(table, value) {
	const base = {
		id: uuid(),
		created_at: now(),
		...value
	};
	if (table === "assets") return {
		...base,
		asset_type: value.asset_type ?? "Printer",
		status: value.status ?? "active",
		updated_at: now()
	};
	if (table === "employees") return {
		status: "active",
		...base
	};
	if (table === "assignment_history") return {
		assignment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		return_date: null,
		...base
	};
	if (table === "inventory_items") return {
		category: "Consumable",
		quantity: 0,
		minimum_quantity: 1,
		...base
	};
	if (table === "asset_maintenance") return {
		maintenance_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		maintenance_type: "Corrective",
		status: "Closed",
		used_items: [],
		cost: 0,
		...base
	};
	if (table === "licenses") return {
		seat_count: 1,
		...base
	};
	if (table === "license_assignments") return {
		assignment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		...base
	};
	if (table === "app_settings") return {
		id: "default",
		low_stock_threshold: 2,
		dashboard_alerts_enabled: true,
		warranty_alert_days: 30,
		updated_at: now(),
		...value
	};
	return base;
}
function nextAssetId(assetType, assets) {
	const prefix = ASSET_PREFIXES[assetType ?? ""] ?? "OT";
	const expression = new RegExp(`^${prefix}-(\\d+)$`);
	const highest = assets.reduce((maximum, asset) => {
		const match = expression.exec(String(asset.asset_id ?? ""));
		return match ? Math.max(maximum, Number(match[1])) : maximum;
	}, 0);
	return `${prefix}-${String(highest + 1).padStart(3, "0")}`;
}
async function applyInsertDefaults(table, payload) {
	const values = Array.isArray(payload) ? payload : [payload];
	if (table !== "assets") return values.map((value) => defaults(table, value));
	const knownAssets = await getRows("assets");
	const prepared = [];
	for (const value of values) {
		const asset = defaults(table, value);
		asset.asset_id ||= nextAssetId(asset.asset_type, [...knownAssets, ...prepared]);
		prepared.push(asset);
	}
	return prepared;
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
			const payload = this.operation === "insert" ? await applyInsertDefaults(this.table, this.payload) : this.operation === "upsert" ? (await applyInsertDefaults(this.table, this.payload))[0] : this.payload;
			const response = await api("/query", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					table: this.table,
					operation: this.operation,
					payload,
					filters: this.filters,
					ordering: this.ordering,
					take: this.take,
					one: this.one
				})
			});
			let rows = response.data === null ? [] : Array.isArray(response.data) ? response.data : [response.data];
			if (this.operation === "select") {
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
			const items = await getRows("toner_replacement_items");
			rows = rows.map((r) => ({
				...r,
				toner_replacement_items: items.filter((i) => i.replacement_id === r.id)
			}));
		}
		if ((this.table === "toner_replacements" || this.table === "maintenance_records") && this.selectText.includes("printers(")) {
			const printers = await getRows("printers");
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
var supabase = { from(table) {
	return {
		select: (text) => new Query(table).select(text),
		insert: (value) => new Query(table, "insert", value),
		update: (value) => new Query(table, "update", value),
		delete: () => new Query(table, "delete"),
		upsert: (value) => new Query(table, "upsert", value)
	};
} };
async function getRows(table) {
	return (await api("/query", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			table,
			operation: "select"
		})
	})).data;
}
async function exportLocalData() {
	return (await api("/export")).data;
}
async function restoreLocalData(data) {
	await api("/restore", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(data)
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { supabase as i, exportLocalData as n, restoreLocalData as r, cn as t };

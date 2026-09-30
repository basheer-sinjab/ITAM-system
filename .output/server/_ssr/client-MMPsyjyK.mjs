import "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-MMPsyjyK.js
/**
* Local data adapter.
*
* The UI was originally generated against Supabase.  This small compatibility
* layer keeps that UI intact while storing records in the local SQLite file.
* Printer image files are kept separately in uploads/printers.
*/
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
	const headers = new Headers(init?.headers);
	headers.set("x-itam-request", "1");
	const response = await fetch(`/api/local-data${path}`, {
		...init,
		headers
	});
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
		location: value.location?.trim() || "المستودع IT",
		archived_at: value.archived_at ?? null,
		updated_at: now()
	};
	if (table === "employees") return {
		status: "active",
		...base
	};
	if (table === "assignment_history") return {
		assignment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		return_date: null,
		asset_snapshot: null,
		...base
	};
	if (table === "asset_templates") return {
		asset_type: "Desktop PC",
		...base
	};
	if (table === "inventory_items") return {
		...base,
		category: value.category ?? "Consumable",
		quantity: value.quantity ?? 0,
		minimum_quantity: value.minimum_quantity ?? 1,
		location: value.location?.trim() || "المستودع IT"
	};
	if (table === "inventory_movements") return {
		movement_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		movement_type: "adjust",
		quantity: 0,
		...base
	};
	if (table === "asset_maintenance") return {
		maintenance_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		maintenance_type: "Corrective",
		status: "Closed",
		used_items: [],
		cost: 0,
		source_type: null,
		source_id: null,
		...base
	};
	if (table === "pc_specs") return {
		updated_at: now(),
		...base
	};
	if (table === "pc_part_installations") return {
		installed_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		removed_at: null,
		old_part_action: null,
		replacement_of_id: null,
		undone_at: null,
		maintenance_id: null,
		...base
	};
	if (table === "toner_installations") return {
		quantity: 1,
		installed_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		undone_at: null,
		maintenance_id: null,
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
async function runHardwareAction(payload) {
	return (await api("/hardware", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(payload)
	})).data;
}
async function runWorkflowAction(payload) {
	return (await api("/workflow", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(payload)
	})).data;
}
//#endregion
export { supabase as a, runWorkflowAction as i, restoreLocalData as n, runHardwareAction as r, exportLocalData as t };

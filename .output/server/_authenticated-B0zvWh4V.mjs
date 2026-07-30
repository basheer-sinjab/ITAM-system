import { i as __toESM } from "./_runtime.mjs";
import { n as supabase, t as cn } from "./_ssr/utils-DyqBgkKx.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { t as Badge } from "./_ssr/badge-DRz0O_TY.mjs";
import { a as daysUntil, n as PRINTER_STATUS, o as formatDate, r as STATUS_CLASS, t as MAINTENANCE_TYPES } from "./_ssr/pms-OlFSYXzg.mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { T as Archive, _ as Droplets, d as Printer, i as TriangleAlert, n as Wrench, o as Star, s as ShieldAlert, y as CircleSlash } from "./_libs/lucide-react.mjs";
import { t as PrinterImage } from "./_ssr/PrinterImage-qEu_VgKX.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-B0zvWh4V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
function useDashboard() {
	return useQuery({
		queryKey: ["dashboard"],
		queryFn: async () => {
			const [printers, toners, maintenance, replacements, settings] = await Promise.all([
				supabase.from("printers").select("*").order("created_at", { ascending: false }),
				supabase.from("toners").select("*").order("name"),
				supabase.from("maintenance_records").select("*, printers(name, asset_id)").order("service_date", { ascending: false }).limit(5),
				supabase.from("toner_replacements").select("*, printers(name, asset_id), toner_replacement_items(*)").order("change_date", { ascending: false }).limit(5),
				supabase.from("app_settings").select("*").maybeSingle()
			]);
			return {
				printers: printers.data ?? [],
				toners: toners.data ?? [],
				maintenance: maintenance.data ?? [],
				replacements: replacements.data ?? [],
				settings: settings.data
			};
		}
	});
}
function StatCard({ label, value, icon: Icon, tone = "primary" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel flex items-center gap-4 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `flex size-11 items-center justify-center rounded-xl ${{
				primary: "bg-primary/10 text-primary",
				warning: "bg-warning/20 text-warning-foreground",
				destructive: "bg-destructive/10 text-destructive",
				muted: "bg-muted text-muted-foreground",
				success: "bg-success/15 text-success"
			}[tone]}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-2xl font-bold leading-none",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: label
		})] })]
	});
}
function Dashboard() {
	const { data, isLoading } = useDashboard();
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "جارٍ التحميل…"
	});
	const { printers, toners, maintenance, replacements, settings } = data;
	const threshold = settings?.low_stock_threshold ?? 2;
	const warrantyDays = settings?.warranty_alert_days ?? 30;
	const count = (s) => printers.filter((p) => p.status === s).length;
	const lowStock = toners.filter((t) => t.quantity > 0 && t.quantity <= Math.max(t.min_quantity, threshold));
	const outOfStock = toners.filter((t) => t.quantity <= 0);
	const favorites = printers.filter((p) => p.is_favorite);
	const expired = printers.filter((p) => {
		const d = daysUntil(p.warranty_expiry);
		return d !== null && d < 0 && p.status !== "retired";
	});
	const expiring = printers.filter((p) => {
		const d = daysUntil(p.warranty_expiry);
		return d !== null && d >= 0 && d <= warrantyDays;
	});
	const alerts = settings?.dashboard_alerts_enabled ?? true ? [
		...outOfStock.map((t) => ({
			tone: "destructive",
			text: `الحبر "${t.name}" نفد من المخزون`
		})),
		...lowStock.map((t) => ({
			tone: "warning",
			text: `مخزون الحبر "${t.name}" منخفض (${t.quantity} متبقٍ)`
		})),
		...expired.map((p) => ({
			tone: "destructive",
			text: `انتهى ضمان الطابعة ${p.name} (${p.asset_id})`
		})),
		...expiring.map((p) => ({
			tone: "warning",
			text: `ضمان الطابعة ${p.name} ينتهي خلال ${daysUntil(p.warranty_expiry)} يومًا`
		}))
	] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "لوحة التحكم"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "نظرة عامة على أصول الطباعة في الشركة"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "إجمالي الطابعات",
						value: printers.length,
						icon: Printer
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "طابعات نشطة",
						value: count("active"),
						icon: Printer,
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "تحت الصيانة",
						value: count("maintenance"),
						icon: Wrench,
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "خارج الخدمة",
						value: count("out_of_service"),
						icon: CircleSlash,
						tone: "destructive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "مؤرشفة",
						value: count("retired"),
						icon: Archive,
						tone: "muted"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "أنواع الأحبار",
						value: toners.length,
						icon: Droplets
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "أحبار منخفضة",
						value: lowStock.length,
						icon: TriangleAlert,
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "أحبار نفدت",
						value: outOfStock.length,
						icon: ShieldAlert,
						tone: "destructive"
					})
				]
			}),
			alerts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "flex items-center gap-2 text-base",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-warning" }),
					"التنبيهات (",
					alerts.length,
					")"
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-2",
				children: alerts.slice(0, 12).map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `rounded-lg border px-3 py-2 text-sm ${a.tone === "destructive" ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-warning/40 bg-warning/15 text-warning-foreground"}`,
					children: a.text
				}, i))
			})] }),
			favorites.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-lg font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-warning text-warning" }), "الطابعات المفضلة"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
					children: favorites.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/printers/$id",
						params: { id: p.id },
						className: "surface-panel overflow-hidden transition-shadow hover:shadow-float",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrinterImage, {
							path: p.image_url,
							alt: p.name,
							className: "h-32 w-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										p.model ?? "—",
										" · ",
										p.asset_id
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: STATUS_CLASS[p.status],
									children: PRINTER_STATUS[p.status]
								})
							]
						})]
					}, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "آخر عمليات الصيانة"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [maintenance.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "لا توجد سجلات."
					}), maintenance.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b pb-3 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium",
							children: [
								m.printers?.name,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										"(",
										m.printers?.asset_id,
										")"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								MAINTENANCE_TYPES[m.maintenance_type],
								" —",
								" ",
								m.description || "بدون وصف"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whitespace-nowrap text-xs text-muted-foreground",
							children: formatDate(m.service_date)
						})]
					}, m.id))]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "آخر عمليات تغيير الأحبار"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [replacements.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "لا توجد سجلات."
					}), replacements.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b pb-3 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium",
							children: [
								r.printers?.name,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										"(",
										r.printers?.asset_id,
										")"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: (r.toner_replacement_items ?? []).map((i) => `${i.toner_name} ×${i.quantity}`).join("، ") || "—"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whitespace-nowrap text-xs text-muted-foreground",
							children: formatDate(r.change_date)
						})]
					}, r.id))]
				})] })]
			})
		]
	});
}
//#endregion
export { Dashboard as component };

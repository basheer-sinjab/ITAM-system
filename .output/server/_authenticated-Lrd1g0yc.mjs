import { r as __toESM } from "./_runtime.mjs";
import { i as supabase, t as cn } from "./_ssr/utils-CWZASUqA.mjs";
import { c as formatDate, o as daysUntil } from "./_ssr/pms-DLuiFJ6_.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { T as Boxes, c as Sparkles, g as Monitor, n as Wrench, x as ClipboardCheck, y as KeyRound } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-Lrd1g0yc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-2xl border border-border/80 bg-card text-card-foreground shadow-card", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6 pb-4", className),
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
			const [assets, assetMaintenance, inventory, licenses] = await Promise.all([
				supabase.from("assets").select("*"),
				supabase.from("asset_maintenance").select("*").order("maintenance_date", { ascending: false }),
				supabase.from("inventory_items").select("*"),
				supabase.from("licenses").select("*")
			]);
			return {
				assets: assets.data ?? [],
				assetMaintenance: assetMaintenance.data ?? [],
				inventory: inventory.data ?? [],
				licenses: licenses.data ?? []
			};
		}
	});
}
function StatCard({ label, value, icon: Icon, tone = "primary" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel interactive-card flex items-center gap-4 p-5 hover:interactive-card-hover",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `flex size-12 items-center justify-center rounded-2xl ${{
				primary: "bg-primary/10 text-primary",
				warning: "bg-warning/20 text-warning-foreground",
				destructive: "bg-destructive/10 text-destructive",
				muted: "bg-muted text-muted-foreground",
				success: "bg-success/15 text-success"
			}[tone]}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-5",
				strokeWidth: 2.2
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-3xl font-bold leading-none tracking-tight",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-sm text-muted-foreground",
			children: label
		})] })]
	});
}
function DashboardHero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden rounded-3xl bg-sidebar px-6 py-7 text-sidebar-foreground shadow-float sm:px-8 sm:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-14 -top-16 size-52 rounded-full bg-sidebar-primary/20 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-20 right-1/3 size-56 rounded-full bg-primary/20 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-sidebar-foreground/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-sidebar-primary" }), "نظرة تشغيلية مباشرة"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold tracking-tight sm:text-3xl",
						children: "إدارة أصول تقنية بسيطة وواضحة."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-sidebar-foreground/65",
						children: "تابع الأصول والمخزون والصيانة والتراخيص من مكان واحد."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
					className: "size-20 text-sidebar-primary",
					"aria-hidden": "true"
				})]
			})
		]
	});
}
function Dashboard() {
	const { data, isLoading } = useDashboard();
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "جارٍ التحميل…"
	});
	const { assets, assetMaintenance, inventory, licenses } = data;
	const lowStock = inventory.filter((item) => item.quantity <= item.minimum_quantity);
	const expiringLicenses = licenses.filter((license) => {
		const days = daysUntil(license.expiration_date);
		return days !== null && days >= 0 && days <= 30;
	});
	const assetName = (assetId) => assets.find((asset) => asset.id === assetId)?.name ?? "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-9",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "لوحة التحكم"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "نظرة عامة على أصول تقنية المعلومات في الشركة"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/assets",
						className: "block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "إجمالي الأصول",
							value: assets.length,
							icon: Monitor
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "الأصول المعيّنة",
						value: assets.filter((asset) => asset.assigned_employee_id).length,
						icon: ClipboardCheck,
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "صيانة مفتوحة",
						value: assetMaintenance.filter((record) => record.status === "Open").length,
						icon: Wrench,
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "عناصر منخفضة",
						value: lowStock.length,
						icon: Boxes,
						tone: "destructive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "تراخيص تنتهي قريبًا",
						value: expiringLicenses.length,
						icon: KeyRound,
						tone: "warning"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "آخر سجلات الصيانة"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [assetMaintenance.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "لا توجد سجلات."
					}), assetMaintenance.slice(0, 5).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b pb-3 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: assetName(m.asset_id)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								m.maintenance_type,
								" — ",
								m.problem_description || "بدون وصف"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whitespace-nowrap text-xs text-muted-foreground",
							children: formatDate(m.maintenance_date)
						})]
					}, m.id))]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "تنبيهات المخزون والتراخيص"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [
						lowStock.length === 0 && expiringLicenses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "لا توجد تنبيهات."
						}),
						lowStock.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b pb-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-destructive",
								children: ["مخزون منخفض: ", item.quantity]
							})]
						}, item.id)),
						expiringLicenses.map((license) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b pb-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: license.license_name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-warning-foreground",
								children: ["ينتهي: ", formatDate(license.expiration_date)]
							})]
						}, license.id))
					]
				})] })]
			})
		]
	});
}
//#endregion
export { Dashboard as component };

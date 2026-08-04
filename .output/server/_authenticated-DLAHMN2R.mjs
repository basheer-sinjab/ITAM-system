import { i as supabase } from "./_ssr/client-BB7Jq0Kf.mjs";
import { c as formatDate, o as daysUntil } from "./_ssr/pms-DLuiFJ6_.mjs";
import { _ as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { C as Monitor, F as Clock3, G as Boxes, I as ClipboardCheck, a as UserRound, f as ShieldCheck, k as KeyRound, l as TriangleAlert, n as Wrench, q as ArrowLeft, v as Plus, x as Package, z as CircleCheck } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-DLAHMN2R.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardDeviceScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dashboard-device-scene",
		role: "img",
		"aria-label": "رسم متحرك ثنائي الأبعاد لشاشة وكمبيوتر وطابعة متصلة لاسلكيًا",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 620 330",
			"aria-hidden": "true",
			focusable: "false",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "itam-glass",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#fff",
							stopOpacity: "0.26"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#fff",
							stopOpacity: "0.07"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "itam-screen",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#f8fdff"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#bcecff"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
						id: "itam-glow",
						x: "-100%",
						y: "-100%",
						width: "300%",
						height: "300%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
							stdDeviation: "4",
							result: "blur"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
						id: "itam-paper-clip",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "464",
							y: "209",
							width: "102",
							height: "84",
							rx: "3"
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "device-scene__ambient",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "310",
							cy: "157",
							r: "145"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "310",
							cy: "157",
							r: "112"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "91",
							cy: "61",
							r: "4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "568",
							cy: "79",
							r: "3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "415",
							cy: "35",
							r: "5"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					className: "device-scene__shadow",
					cx: "310",
					cy: "289",
					rx: "255",
					ry: "20"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "device-scene__connections",
					fill: "none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						className: "connection-line",
						d: "M294 160C323 139 344 139 366 158"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						className: "connection-line connection-line--printer",
						d: "M402 165C438 141 467 149 483 174"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "device-scene__monitor",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "device-frame",
							x: "42",
							y: "65",
							width: "258",
							height: "158",
							rx: "18"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "monitor-screen",
							x: "58",
							y: "81",
							width: "226",
							height: "126",
							rx: "10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "monitor-ui",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "76",
									y: "98",
									width: "67",
									height: "10",
									rx: "5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									className: "monitor-ui__soft",
									x: "76",
									y: "116",
									width: "103",
									height: "6",
									rx: "3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									className: "monitor-ui__card",
									x: "76",
									y: "139",
									width: "56",
									height: "44",
									rx: "7"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									className: "monitor-ui__card",
									x: "141",
									y: "139",
									width: "56",
									height: "44",
									rx: "7"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									className: "monitor-ui__card",
									x: "206",
									y: "139",
									width: "60",
									height: "44",
									rx: "7"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									className: "monitor-ui__chart",
									d: "M85 171l12-13 10 6 15-18"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									className: "monitor-ui__chart monitor-ui__chart--two",
									d: "M150 171l11-8 9 3 17-18"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									className: "monitor-ui__chart monitor-ui__chart--three",
									d: "M215 171l12-15 10 7 18-17"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							className: "device-led",
							cx: "171",
							cy: "215",
							r: "3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							className: "monitor-neck",
							d: "M155 223v31h32v-31"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "monitor-base",
							x: "119",
							y: "251",
							width: "104",
							height: "12",
							rx: "6"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "device-scene__tower",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "device-frame",
							x: "325",
							y: "104",
							width: "83",
							height: "159",
							rx: "17"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "tower-vent",
							x: "342",
							y: "125",
							width: "49",
							height: "7",
							rx: "3.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "tower-vent tower-vent--short",
							x: "342",
							y: "141",
							width: "31",
							height: "7",
							rx: "3.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							className: "tower-button",
							cx: "367",
							cy: "231",
							r: "12"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							className: "device-led",
							cx: "367",
							cy: "231",
							r: "4"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "device-scene__wifi",
					fill: "none",
					strokeLinecap: "round",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							className: "wifi-wave wifi-wave--outer",
							d: "M331 79c20-19 52-19 72 0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							className: "wifi-wave wifi-wave--middle",
							d: "M341 90c14-13 38-13 52 0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							className: "wifi-wave wifi-wave--inner",
							d: "M352 101c8-7 22-7 30 0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							className: "wifi-core",
							cx: "367",
							cy: "111",
							r: "4"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "device-scene__printer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "printer-input-paper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M468 131h91l-7 53h-77z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M481 147h63M480 158h50" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "printer-lid",
							x: "446",
							y: "164",
							width: "137",
							height: "31",
							rx: "10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "device-frame printer-frame",
							x: "426",
							y: "184",
							width: "177",
							height: "79",
							rx: "17"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "printer-control",
							x: "551",
							y: "198",
							width: "30",
							height: "14",
							rx: "5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							className: "device-led printer-led",
							cx: "573",
							cy: "205",
							r: "3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "printer-slot",
							x: "450",
							y: "215",
							width: "128",
							height: "10",
							rx: "5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							clipPath: "url(#itam-paper-clip)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								className: "printer-output-paper",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "464",
									y: "207",
									width: "102",
									height: "70",
									rx: "4"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M478 225h74M478 237h60M478 249h68" })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							className: "printer-tray",
							d: "M451 254h128l-9 26H460z"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "device-scene__packets",
					fill: "currentColor",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						className: "data-packet data-packet--monitor",
						r: "4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateMotion", {
							dur: "2.8s",
							repeatCount: "indefinite",
							path: "M366 158C342 139 319 139 294 160"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						className: "data-packet data-packet--printer",
						r: "4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateMotion", {
							dur: "3.2s",
							begin: ".7s",
							repeatCount: "indefinite",
							path: "M402 165C438 141 467 149 483 174"
						})
					})]
				})
			]
		})
	});
}
function Dashboard() {
	const { data, isLoading } = useDashboard();
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "جارٍ تحميل لوحة التحكم..."
	});
	const { assets, maintenance, inventory, licenses, settings } = data;
	const assignedAssets = assets.filter((asset) => asset.assigned_employee_id).length;
	const openMaintenance = maintenance.filter((record) => record.status === "Open").length;
	const lowStockThreshold = Number(settings?.low_stock_threshold ?? 2);
	const warrantyAlertDays = Number(settings?.warranty_alert_days ?? 30);
	const alertsEnabled = settings?.dashboard_alerts_enabled !== false;
	const lowStock = inventory.filter((item) => Number(item.quantity) <= lowStockThreshold);
	const expiringLicenses = licenses.filter((license) => {
		const remaining = daysUntil(license.expiration_date);
		return remaining !== null && remaining >= 0 && remaining <= 30;
	});
	const expiringWarranties = assets.filter((asset) => {
		const remaining = daysUntil(asset.warranty_expiry);
		return remaining !== null && remaining >= 0 && remaining <= warrantyAlertDays;
	});
	const activeAssets = assets.filter((asset) => asset.status === "active").length;
	const assetInfo = (assetId) => assets.find((asset) => asset.id === assetId);
	const healthPercent = assets.length ? Math.round(activeAssets / assets.length * 100) : 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "overflow-hidden rounded-lg border bg-sidebar text-sidebar-foreground shadow-float",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-2 px-6 py-6 sm:px-8 lg:grid-cols-[1fr_22rem] lg:py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-sidebar-foreground/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3.5" }), "تحديث مباشر للعمليات التقنية"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-bold sm:text-4xl",
								children: "إدارة أصول تقنية"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm text-sidebar-foreground/75",
								children: "متابعة واضحة للأجهزة والصيانة والمخزون والتراخيص من نقطة واحدة."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/assets",
									className: "inline-flex items-center gap-2 rounded-md bg-sidebar-primary px-3 py-2 text-sm font-medium text-sidebar-primary-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "size-4" }), "استعراض الأصول"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/maintenance",
									className: "inline-flex items-center gap-2 rounded-md border border-white/25 px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-4" }), "سجل الصيانة"]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardDeviceScene, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						to: "/assets",
						icon: Monitor,
						label: "إجمالي الأصول",
						value: assets.length,
						detail: "عرض جميع الأجهزة",
						tone: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						to: "/assets",
						icon: ClipboardCheck,
						label: "أصول معيّنة",
						value: assignedAssets,
						detail: "مرتبطة بموظفين",
						tone: "emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						to: "/maintenance",
						icon: Wrench,
						label: "صيانة مفتوحة",
						value: openMaintenance,
						detail: "تحتاج متابعة",
						tone: "amber"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						to: "/inventory",
						icon: Package,
						label: "مخزون منخفض",
						value: lowStock.length,
						detail: `كمية ${lowStockThreshold} أو أقل`,
						tone: "rose"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						to: "/licenses",
						icon: KeyRound,
						label: "تراخيص قريبة",
						value: expiringLicenses.length,
						detail: "تنتهي خلال 30 يوماً",
						tone: "amber"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-[1.35fr_0.85fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold",
								children: "آخر أعمال الصيانة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "السجلات الأحدث على الأصول"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/maintenance",
							className: "inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline",
							children: ["عرض الكل", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })]
						})]
					}), maintenance.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						children: maintenance.slice(0, 5).map((record) => {
							const asset = assetInfo(record.asset_id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/maintenance",
								className: "flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `flex size-9 shrink-0 items-center justify-center rounded-md ${record.status === "Open" ? "bg-amber-500/10 text-amber-700" : "bg-emerald-500/10 text-emerald-700"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-sm font-medium",
											children: [asset?.name ?? "أصل غير معروف", asset?.asset_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mr-2 font-mono text-xs text-muted-foreground",
												children: [
													"(",
													asset.asset_id,
													")"
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs text-muted-foreground",
											children: record.resolution || record.maintenance_type || "بدون حل"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "shrink-0 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: record.status === "Open" ? "rounded-md bg-amber-500/10 px-2 py-1 text-xs text-amber-700" : "rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700",
										children: record.status === "Open" ? "مفتوحة" : "مغلقة"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: formatDate(record.maintenance_date)
									})]
								})]
							}, record.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyPanel, {
						icon: Wrench,
						title: "لا توجد أعمال صيانة مسجلة",
						description: "ستظهر هنا آخر الأعمال فور إنشاء سجل صيانة.",
						to: "/maintenance",
						action: "إضافة سجل صيانة"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold",
								children: "صحة بيئة التقنية"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "مؤشر سريع للأصول النشطة"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex items-end justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-4xl font-bold",
								children: [healthPercent, "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "أصول نشطة"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-6" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 h-2 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-emerald-500",
								style: { width: `${healthPercent}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-2 gap-3 border-t pt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-semibold",
								children: activeAssets
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "نشطة"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-semibold",
								children: Math.max(0, assets.length - activeAssets)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "تحتاج مراجعة"
							})] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5 text-amber-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold",
								children: "تنبيهات تحتاج انتباه"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-md bg-amber-500/10 px-2 py-1 text-xs text-amber-700",
							children: [
								alertsEnabled ? lowStock.length + expiringLicenses.length + expiringWarranties.length : 0,
								" ",
								"تنبيه"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						children: !alertsEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyPanel, {
							icon: CircleCheck,
							title: "التنبيهات متوقفة",
							description: "يمكن تشغيلها من إعدادات التنبيهات."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							lowStock.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/inventory",
								className: "flex items-center justify-between gap-3 p-4 hover:bg-muted/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-8 items-center justify-center rounded-md bg-rose-500/10 text-rose-700",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: item.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-rose-700",
									children: ["المتوفر: ", item.quantity]
								})]
							}, item.id)),
							expiringLicenses.slice(0, 3).map((license) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/licenses/$id",
								params: { id: license.id },
								className: "flex items-center justify-between gap-3 p-4 hover:bg-muted/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-8 items-center justify-center rounded-md bg-amber-500/10 text-amber-700",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: license.license_name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-amber-700",
									children: formatDate(license.expiration_date)
								})]
							}, license.id)),
							expiringWarranties.slice(0, 3).map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/assets/$id",
								params: { id: asset.id },
								className: "flex items-center justify-between gap-3 p-4 hover:bg-muted/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-medium",
										children: ["ضمان ", asset.name]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-primary",
									children: formatDate(asset.warranty_expiry)
								})]
							}, asset.id)),
							!lowStock.length && !expiringLicenses.length && !expiringWarranties.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyPanel, {
								icon: CircleCheck,
								title: "لا توجد تنبيهات حالياً",
								description: "المخزون والتراخيص والضمانات في وضع مستقر."
							})
						] })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "إجراءات سريعة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "اختصارات لأكثر العمليات استخداماً"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
								to: "/assets",
								icon: Monitor,
								title: "إضافة أصل",
								description: "تسجيل جهاز جديد"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
								to: "/maintenance",
								icon: Wrench,
								title: "سجل صيانة",
								description: "توثيق عمل فني"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
								to: "/inventory",
								icon: Boxes,
								title: "إدارة المخزون",
								description: "الكميات والاستخدام"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
								to: "/people-departments",
								icon: UserRound,
								title: "الموظفون",
								description: "إدارة الأشخاص والأقسام"
							})
						]
					})]
				})]
			})
		]
	});
}
function DashboardCard({ to, icon: Icon, label, value, detail, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "surface-panel interactive-card group block p-4 hover:interactive-card-hover",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `flex size-10 items-center justify-center rounded-lg ${{
						blue: "bg-primary/10 text-primary",
						emerald: "bg-emerald-500/10 text-emerald-700",
						amber: "bg-amber-500/10 text-amber-700",
						rose: "bg-rose-500/10 text-rose-700"
					}[tone]}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 text-muted-foreground transition-transform group-hover:-translate-x-1" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-3xl font-bold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: detail
			})
		]
	});
}
function QuickAction({ to, icon: Icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "interactive-card flex items-center gap-3 rounded-lg border p-3 hover:interactive-card-hover",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: description
		})] })]
	});
}
function EmptyPanel({ icon: Icon, title, description, to, action }) {
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-2 px-5 py-9 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-xs text-xs text-muted-foreground",
				children: description
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 text-xs font-medium text-primary",
				children: action
			})
		]
	});
	return to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: "block hover:bg-muted/50",
		children: content
	}) : content;
}
function useDashboard() {
	return useQuery({
		queryKey: ["dashboard"],
		queryFn: async () => {
			const [assets, maintenance, inventory, licenses, settings] = await Promise.all([
				supabase.from("assets").select("*"),
				supabase.from("asset_maintenance").select("*").order("maintenance_date", { ascending: false }),
				supabase.from("inventory_items").select("*"),
				supabase.from("licenses").select("*"),
				supabase.from("app_settings").select("*").eq("id", "default").maybeSingle()
			]);
			return {
				assets: assets.data ?? [],
				maintenance: maintenance.data ?? [],
				inventory: inventory.data ?? [],
				licenses: licenses.data ?? [],
				settings: settings.data
			};
		}
	});
}
//#endregion
export { Dashboard as component };

import { r as __toESM } from "./_runtime.mjs";
import { r as supabase } from "./_ssr/client-Beq9QKFo.mjs";
import { c as formatDate, o as daysUntil } from "./_ssr/pms-DLuiFJ6_.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { D as CircleCheck, F as ArrowLeft, N as Boxes, S as KeyRound, T as ClipboardCheck, _ as Package, a as UserRound, m as Plus, n as Wrench, s as TriangleAlert, u as ShieldCheck, w as Clock3, y as Monitor } from "./_libs/lucide-react.mjs";
import { a as Group, c as MeshBasicMaterial, d as PlaneGeometry, f as PointLight, i as DirectionalLight, l as MeshStandardMaterial, m as SphereGeometry, n as BoxGeometry, o as HemisphereLight, p as Scene, r as CircleGeometry, s as Mesh, t as WebGLRenderer, u as PerspectiveCamera } from "./_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-YZfzol9B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardDeviceScene() {
	const containerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const container = containerRef.current;
		if (!container) return;
		const scene = new Scene();
		const camera = new PerspectiveCamera(35, 1, .1, 100);
		camera.position.set(0, 1.45, 9.8);
		camera.lookAt(0, .4, 0);
		const renderer = new WebGLRenderer({
			alpha: true,
			antialias: true
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0, 0);
		container.appendChild(renderer.domElement);
		const root = new Group();
		root.rotation.set(-.12, -.38, .04);
		root.scale.setScalar(.9);
		scene.add(root);
		const darkMaterial = new MeshStandardMaterial({
			color: 1060163,
			roughness: .42,
			metalness: .32
		});
		const trimMaterial = new MeshStandardMaterial({
			color: 9163506,
			roughness: .25,
			metalness: .6
		});
		const screenMaterial = new MeshStandardMaterial({
			color: 3323111,
			emissive: 746384,
			emissiveIntensity: .9,
			roughness: .2
		});
		const paperMaterial = new MeshStandardMaterial({
			color: 16055295,
			roughness: .8
		});
		const monitor = new Group();
		monitor.position.set(-1.55, .65, .1);
		const display = new Mesh(new BoxGeometry(2.5, 1.55, .16), darkMaterial);
		const screen = new Mesh(new PlaneGeometry(2.2, 1.28), screenMaterial);
		screen.position.z = .1;
		const stand = new Mesh(new BoxGeometry(.22, .78, .22), trimMaterial);
		stand.position.y = -1.06;
		const base = new Mesh(new BoxGeometry(1.32, .12, .7), darkMaterial);
		base.position.y = -1.42;
		monitor.add(display, screen, stand, base);
		root.add(monitor);
		const computer = new Group();
		computer.position.set(1.38, .22, -.35);
		const tower = new Mesh(new BoxGeometry(1.18, 2.45, .92), darkMaterial);
		const towerTrim = new Mesh(new BoxGeometry(.16, 1.78, .06), trimMaterial);
		towerTrim.position.set(-.35, 0, .49);
		const indicator = new Mesh(new SphereGeometry(.08, 18, 18), screenMaterial);
		indicator.position.set(.35, .72, .49);
		computer.add(tower, towerTrim, indicator);
		root.add(computer);
		const printer = new Group();
		printer.position.set(.05, -1.45, .55);
		const printerBody = new Mesh(new BoxGeometry(2.55, .94, 1.5), darkMaterial);
		const printerTop = new Mesh(new BoxGeometry(2.08, .18, 1.18), trimMaterial);
		printerTop.position.y = .53;
		const paper = new Mesh(new BoxGeometry(1.34, .7, .06), paperMaterial);
		paper.position.set(-.2, .79, .08);
		paper.rotation.x = -.2;
		printer.add(printerBody, printerTop, paper);
		root.add(printer);
		const floor = new Mesh(new CircleGeometry(3.6, 48), new MeshBasicMaterial({
			color: 5487848,
			transparent: true,
			opacity: .16
		}));
		floor.rotation.x = -Math.PI / 2;
		floor.position.y = -2.08;
		root.add(floor);
		scene.add(new HemisphereLight(14349567, 10830, 2.4));
		const keyLight = new DirectionalLight(16777215, 3.5);
		keyLight.position.set(-3, 5, 4);
		scene.add(keyLight);
		const rimLight = new PointLight(4311028, 12, 10);
		rimLight.position.set(3, 2, 3);
		scene.add(rimLight);
		const resize = () => {
			const { width, height } = container.getBoundingClientRect();
			renderer.setSize(width, height, false);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};
		const observer = new ResizeObserver(resize);
		observer.observe(container);
		resize();
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let animationFrame = 0;
		const animationStartedAt = performance.now();
		const render = () => {
			const elapsed = (performance.now() - animationStartedAt) / 1e3;
			if (!reducedMotion) {
				root.rotation.y = -.38 + Math.sin(elapsed * .46) * .16;
				root.position.y = Math.sin(elapsed * .9) * .12;
				paper.position.y = .79 + Math.sin(elapsed * 1.1) * .07;
				indicator.scale.setScalar(.9 + Math.sin(elapsed * 2) * .12);
			}
			renderer.render(scene, camera);
			animationFrame = requestAnimationFrame(render);
		};
		render();
		return () => {
			cancelAnimationFrame(animationFrame);
			observer.disconnect();
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: "h-[15rem] w-full min-w-0 sm:h-[17rem]",
		"aria-label": "مشهد ثلاثي الأبعاد لأجهزة تقنية المعلومات",
		role: "img"
	});
}
function Dashboard() {
	const { data, isLoading } = useDashboard();
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "جارٍ تحميل لوحة التحكم..."
	});
	const { assets, maintenance, inventory, licenses } = data;
	const assignedAssets = assets.filter((asset) => asset.assigned_employee_id).length;
	const openMaintenance = maintenance.filter((record) => record.status === "Open").length;
	const lowStock = inventory.filter((item) => Number(item.quantity) <= 3);
	const expiringLicenses = licenses.filter((license) => {
		const remaining = daysUntil(license.expiration_date);
		return remaining !== null && remaining >= 0 && remaining <= 30;
	});
	const activeAssets = assets.filter((asset) => asset.status === "active").length;
	const assetName = (assetId) => assets.find((asset) => asset.id === assetId)?.name ?? "أصل غير معروف";
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
						detail: "كمية 3 أو أقل",
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
						children: maintenance.slice(0, 5).map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/maintenance",
							className: "flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `flex size-9 shrink-0 items-center justify-center rounded-md ${record.status === "Open" ? "bg-amber-500/10 text-amber-700" : "bg-emerald-500/10 text-emerald-700"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: assetName(record.asset_id)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: record.problem_description || record.maintenance_type || "بدون وصف"
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
						}, record.id))
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
							children: [lowStock.length + expiringLicenses.length, " تنبيه"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y",
						children: [
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
							!lowStock.length && !expiringLicenses.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyPanel, {
								icon: CircleCheck,
								title: "لا توجد تنبيهات حالياً",
								description: "المخزون والتراخيص في وضع مستقر."
							})
						]
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
								description: "المستهلكات وقطع الغيار"
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
			const [assets, maintenance, inventory, licenses] = await Promise.all([
				supabase.from("assets").select("*"),
				supabase.from("asset_maintenance").select("*").order("maintenance_date", { ascending: false }),
				supabase.from("inventory_items").select("*"),
				supabase.from("licenses").select("*")
			]);
			return {
				assets: assets.data ?? [],
				maintenance: maintenance.data ?? [],
				inventory: inventory.data ?? [],
				licenses: licenses.data ?? []
			};
		}
	});
}
//#endregion
export { Dashboard as component };

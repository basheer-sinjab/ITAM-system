import { r as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-Beq9QKFo.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as useRouterState, p as Outlet, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { D as CircleCheck, F as ArrowLeft, S as KeyRound, i as UsersRound, j as CalendarClock, m as Plus, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as Input, r as Label, t as Button } from "./label-D6rma-RY.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Textarea, r as DialogFooter, t as Dialog } from "./textarea-DLR0hsWQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/licenses-DsnAkpSX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Licenses() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editingLicense, setEditingLicense] = (0, import_react.useState)(null);
	const { data: licenses = [] } = useQuery({
		queryKey: ["licenses"],
		queryFn: async () => (await supabase.from("licenses").select("*").order("license_name")).data ?? []
	});
	const { data: assignments = [] } = useQuery({
		queryKey: ["license-assignments"],
		queryFn: async () => (await supabase.from("license_assignments").select("*")).data ?? []
	});
	if (pathname !== "/licenses") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	const totalSeats = licenses.reduce((total, license) => total + Number(license.seat_count || 0), 0);
	const usedSeats = assignments.length;
	const availableSeats = Math.max(0, totalSeats - usedSeats);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: "التراخيص"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "إدارة المقاعد والتعيينات"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							setEditingLicense(null);
							setFormOpen(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة ترخيص"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewMetric, {
						icon: KeyRound,
						label: "التراخيص المسجلة",
						value: licenses.length,
						tone: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewMetric, {
						icon: UsersRound,
						label: "إجمالي المقاعد",
						value: totalSeats,
						tone: "emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewMetric, {
						icon: CircleCheck,
						label: "المقاعد المستخدمة",
						value: usedSeats,
						tone: "amber"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewMetric, {
						icon: KeyRound,
						label: "المقاعد المتاحة",
						value: availableSeats,
						tone: "rose"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "سجل التراخيص"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "اضغط على أي ترخيص لعرض تفاصيله وتعييناته"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted-foreground",
					children: [
						licenses.length,
						" ",
						licenses.length === 1 ? "ترخيص" : "تراخيص"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: licenses.map((license) => {
					const used = assignments.filter((item) => item.license_id === license.id).length;
					const seatCount = Number(license.seat_count || 0);
					const available = Math.max(0, seatCount - used);
					const usagePercent = seatCount ? Math.min(100, used / seatCount * 100) : 0;
					const expiration = getExpirationStatus(license.expiration_date);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "link",
						tabIndex: 0,
						className: "surface-panel interactive-card group cursor-pointer overflow-hidden p-0 hover:interactive-card-hover",
						onClick: () => navigate({
							to: "/licenses/$id",
							params: { id: license.id }
						}),
						onKeyDown: (event) => {
							if (event.key === "Enter") navigate({
								to: "/licenses/$id",
								params: { id: license.id }
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b bg-muted/30 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mt-1 size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-semibold",
										children: license.license_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: license.product_name || "بدون منتج محدد"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [license.license_type && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border bg-background px-2 py-1 text-xs text-muted-foreground",
										children: license.license_type
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${expiration.className}`,
										children: [expiration.icon === "warning" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3.5" }), expiration.label]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2 text-center text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
											value: seatCount,
											label: "إجمالي"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
											value: used,
											label: "مستخدم"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
											value: available,
											label: "متاح"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center justify-between text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "استخدام المقاعد" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round(usagePercent), "%"] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 overflow-hidden rounded-full bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: usagePercent >= 100 ? "h-full bg-destructive" : "h-full bg-primary",
											style: { width: `${usagePercent}%` }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 text-xs text-muted-foreground",
									children: ["ينتهي: ", license.expiration_date || "غير محدد"]
								})
							]
						})]
					}, license.id);
				})
			}),
			licenses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel flex flex-col items-center justify-center gap-3 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-14 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "لا توجد تراخيص بعد"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "أضف أول ترخيص لتبدأ متابعة المقاعد والتعيينات."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => setFormOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة ترخيص"]
					})
				]
			}),
			formOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LicenseForm, {
				license: editingLicense,
				close: () => {
					setFormOpen(false);
					setEditingLicense(null);
				},
				saved: () => queryClient.invalidateQueries()
			})
		]
	});
}
function Seat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: label
	})] });
}
function OverviewMetric({ icon: Icon, label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel flex items-center gap-3 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `flex size-10 items-center justify-center rounded-lg ${{
				blue: "bg-primary/10 text-primary",
				emerald: "bg-emerald-500/10 text-emerald-700",
				amber: "bg-amber-500/10 text-amber-700",
				rose: "bg-rose-500/10 text-rose-700"
			}[tone]}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xl font-semibold",
			children: value
		})] })]
	});
}
function getExpirationStatus(expirationDate) {
	if (!expirationDate) return {
		label: "بدون انتهاء محدد",
		className: "bg-muted text-muted-foreground",
		icon: "calendar"
	};
	const daysRemaining = Math.ceil(((/* @__PURE__ */ new Date(`${expirationDate}T00:00:00`)).getTime() - (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)) / 864e5);
	if (daysRemaining < 0) return {
		label: "منتهي",
		className: "bg-destructive/10 text-destructive",
		icon: "warning"
	};
	if (daysRemaining <= 30) return {
		label: `ينتهي خلال ${daysRemaining} يوم`,
		className: "bg-amber-500/10 text-amber-700",
		icon: "warning"
	};
	return {
		label: "ساري",
		className: "bg-emerald-500/10 text-emerald-700",
		icon: "calendar"
	};
}
function LicenseForm({ license, close, saved }) {
	const [form, setForm] = (0, import_react.useState)({
		license_name: license?.license_name ?? "",
		product_name: license?.product_name ?? "",
		license_type: license?.license_type ?? "",
		seat_count: license?.seat_count ?? 1,
		expiration_date: license?.expiration_date ?? "",
		notes: license?.notes ?? ""
	});
	const set = (key, value) => setForm({
		...form,
		[key]: value
	});
	const save = async () => {
		if (!form.license_name.trim()) return toast.error("اسم الترخيص مطلوب");
		const payload = {
			...form,
			license_name: form.license_name.trim(),
			seat_count: Number(form.seat_count || 0),
			expiration_date: form.expiration_date || null
		};
		const result = license ? await supabase.from("licenses").update(payload).eq("id", license.id) : await supabase.from("licenses").insert(payload);
		if (result.error) return toast.error(result.error.message);
		saved();
		close();
		toast.success(license ? "تم تعديل الترخيص" : "تمت إضافة الترخيص");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: license ? "تعديل ترخيص" : "إضافة ترخيص" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "اسم الترخيص",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.license_name,
							onChange: (event) => set("license_name", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "المنتج",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.product_name,
							onChange: (event) => set("product_name", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "نوع الترخيص",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.license_type,
							onChange: (event) => set("license_type", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "عدد المقاعد",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: "0",
							value: form.seat_count,
							onChange: (event) => set("seat_count", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "تاريخ الانتهاء",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: form.expiration_date,
							onChange: (event) => set("expiration_date", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "ملاحظات",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: form.notes,
							onChange: (event) => set("notes", event.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: close,
				children: "إلغاء"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				children: "حفظ"
			})] })
		] })
	});
}
function Field({ label, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-2 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { Licenses as component };

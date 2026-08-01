import { r as __toESM } from "../_runtime.mjs";
import { i as supabase } from "./utils-CWZASUqA.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as Plus, o as Trash2, p as Pencil } from "../_libs/lucide-react.mjs";
import { n as Input, r as Label, t as Button } from "./label-DrbQyf4b.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Textarea, r as DialogFooter, t as Dialog } from "./dialog-B9nhX6xa.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/licenses-4yXWW-Xk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Licenses() {
	const queryClient = useQueryClient();
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [assignmentOpen, setAssignmentOpen] = (0, import_react.useState)(false);
	const [editingLicense, setEditingLicense] = (0, import_react.useState)(null);
	const { data: licenses = [] } = useQuery({
		queryKey: ["licenses"],
		queryFn: async () => (await supabase.from("licenses").select("*").order("license_name")).data ?? []
	});
	const { data: assignments = [] } = useQuery({
		queryKey: ["license-assignments"],
		queryFn: async () => (await supabase.from("license_assignments").select("*")).data ?? []
	});
	const { data: employees = [] } = useQuery({
		queryKey: ["employees"],
		queryFn: async () => (await supabase.from("employees").select("*")).data ?? []
	});
	const { data: assets = [] } = useQuery({
		queryKey: ["assets"],
		queryFn: async () => (await supabase.from("assets").select("*")).data ?? []
	});
	const remove = async (license) => {
		if (!confirm(`حذف الترخيص "${license.license_name}" وكل تعييناته؟`)) return;
		const assignmentsResult = await supabase.from("license_assignments").delete().eq("license_id", license.id);
		if (assignmentsResult.error) return toast.error(assignmentsResult.error.message);
		const result = await supabase.from("licenses").delete().eq("id", license.id);
		if (result.error) return toast.error(result.error.message);
		queryClient.invalidateQueries();
		toast.success("تم حذف الترخيص");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: "التراخيص"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "إدارة المقاعد والتعيينات"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setAssignmentOpen(true),
						children: "تعيين ترخيص"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							setEditingLicense(null);
							setFormOpen(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة ترخيص"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: licenses.map((license) => {
					const used = assignments.filter((item) => item.license_id === license.id).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold",
									children: license.license_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: license.product_name
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										"aria-label": "تعديل الترخيص",
										onClick: () => {
											setEditingLicense(license);
											setFormOpen(true);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										"aria-label": "حذف الترخيص",
										onClick: () => remove(license),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid grid-cols-3 gap-2 text-center text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
										value: license.seat_count,
										label: "إجمالي"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
										value: used,
										label: "مستخدم"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
										value: Math.max(0, license.seat_count - used),
										label: "متاح"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-xs text-muted-foreground",
								children: ["ينتهي: ", license.expiration_date || "—"]
							})
						]
					}, license.id);
				})
			}),
			formOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LicenseForm, {
				license: editingLicense,
				close: () => {
					setFormOpen(false);
					setEditingLicense(null);
				},
				saved: () => queryClient.invalidateQueries()
			}),
			assignmentOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignmentForm, {
				licenses,
				employees,
				assets,
				close: () => setAssignmentOpen(false),
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
function AssignmentForm({ licenses, employees, assets, close, saved }) {
	const [form, setForm] = (0, import_react.useState)({
		license_id: "",
		employee_id: "__none__",
		asset_id: "__none__",
		assignment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	});
	const save = async () => {
		if (!form.license_id) return toast.error("اختر ترخيصاً");
		const result = await supabase.from("license_assignments").insert({
			...form,
			employee_id: form.employee_id === "__none__" ? null : form.employee_id,
			asset_id: form.asset_id === "__none__" ? null : form.asset_id
		});
		if (result.error) return toast.error(result.error.message);
		saved();
		close();
		toast.success("تم تعيين الترخيص");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "تعيين ترخيص" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, {
						label: "الترخيص",
						value: form.license_id,
						onChange: (value) => setForm({
							...form,
							license_id: value
						}),
						options: licenses,
						name: "license_name",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, {
						label: "الموظف",
						value: form.employee_id,
						onChange: (value) => setForm({
							...form,
							employee_id: value
						}),
						options: employees,
						name: "full_name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, {
						label: "الأصل",
						value: form.asset_id,
						onChange: (value) => setForm({
							...form,
							asset_id: value
						}),
						options: assets,
						name: "name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "تاريخ التعيين",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: form.assignment_date,
							onChange: (event) => setForm({
								...form,
								assignment_date: event.target.value
							})
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
function Picker({ label, value, onChange, options, name, required = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			className: "flex h-10 w-full rounded-md border bg-background px-3 text-sm",
			value,
			onChange: (event) => onChange(event.target.value),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: required ? "اختر…" : "غير محدد"
				}),
				!required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "__none__",
					children: "غير محدد"
				}),
				options.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: item.id,
					children: item[name]
				}, item.id))
			]
		})
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

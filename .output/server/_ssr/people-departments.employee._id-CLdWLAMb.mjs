import { r as __toESM } from "../_runtime.mjs";
import { i as supabase } from "./utils-CWZASUqA.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as ArrowRight, c as Trash2, h as Pencil, m as Phone, v as Monitor, x as KeyRound, y as Mail } from "../_libs/lucide-react.mjs";
import { n as Input, r as Label, t as Button } from "./label-DrbQyf4b.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Textarea, r as DialogFooter, t as Dialog } from "./textarea-DCYNKPPs.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BmpXLJ8j.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./people-departments.employee._id-DD2TgslS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-departments.employee._id-CLdWLAMb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmployeeDetails() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const { data: employee, isLoading } = useQuery({
		queryKey: ["employee", id],
		queryFn: async () => (await supabase.from("employees").select("*").eq("id", id).maybeSingle()).data
	});
	const { data: departments = [] } = useQuery({
		queryKey: ["departments"],
		queryFn: async () => (await supabase.from("departments").select("*").order("name")).data ?? []
	});
	const { data: assets = [] } = useQuery({
		queryKey: ["employee-assets", id],
		queryFn: async () => (await supabase.from("assets").select("*").eq("assigned_employee_id", id)).data ?? []
	});
	const { data: assignments = [] } = useQuery({
		queryKey: ["employee-license-assignments", id],
		queryFn: async () => (await supabase.from("license_assignments").select("*").eq("employee_id", id)).data ?? []
	});
	const { data: licenses = [] } = useQuery({
		queryKey: ["licenses"],
		queryFn: async () => (await supabase.from("licenses").select("*")).data ?? []
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "جارٍ التحميل…"
	});
	if (!employee) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "الموظف غير موجود."
	});
	const department = departments.find((item) => item.id === employee.department_id);
	const assignedLicenses = assignments.map((assignment) => licenses.find((license) => license.id === assignment.license_id)).filter(Boolean);
	const remove = async () => {
		if (!confirm(`حذف الموظف "${employee.full_name}"؟`)) return;
		const licensesResult = await supabase.from("license_assignments").delete().eq("employee_id", id);
		if (licensesResult.error) return toast.error(licensesResult.error.message);
		const assetsResult = await supabase.from("assets").update({ assigned_employee_id: null }).eq("assigned_employee_id", id);
		if (assetsResult.error) return toast.error(assetsResult.error.message);
		const result = await supabase.from("employees").delete().eq("id", id);
		if (result.error) return toast.error(result.error.message);
		queryClient.invalidateQueries();
		toast.success("تم حذف الموظف");
		navigate({ to: "/people-departments" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/people-departments",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "العودة إلى الموظفين",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: employee.full_name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: department?.name || "بدون قسم"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => setEditOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "ml-2 size-4" }), "تعديل"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "text-destructive",
						onClick: remove,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "ml-2 size-4" }), "حذف"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "البريد الإلكتروني",
						value: employee.email,
						icon: Mail
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "الهاتف",
						value: employee.phone,
						icon: Phone
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "الحالة",
						value: employee.status === "inactive" ? "غير نشط" : "نشط"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-5 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					title: "الأصول المعيّنة",
					icon: Monitor,
					empty: "لا توجد أصول معيّنة.",
					items: assets.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: asset.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted-foreground",
						children: asset.asset_id || "—"
					})] }, asset.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					title: "التراخيص المعيّنة",
					icon: KeyRound,
					empty: "لا توجد تراخيص معيّنة.",
					items: assignedLicenses.map((license) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: license.license_name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: license.product_name || "—"
					})] }, license.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeEdit, {
				open: editOpen,
				onOpenChange: setEditOpen,
				employee,
				departments,
				saved: () => queryClient.invalidateQueries()
			})
		]
	});
}
function Info({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-1 flex items-center gap-2 font-medium",
		children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" }), value || "—"]
	})] });
}
function List({ title, icon: Icon, empty, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "surface-panel overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y",
			children: items.length ? items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-5",
				children: item
			}, index)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-5 text-sm text-muted-foreground",
				children: empty
			})
		})]
	});
}
function EmployeeEdit({ open, onOpenChange, employee, departments, saved }) {
	const [form, setForm] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (open) setForm({
			...employee,
			department_id: employee.department_id || "__none__"
		});
	}, [open, employee]);
	const set = (key, value) => setForm({
		...form,
		[key]: value
	});
	const save = async () => {
		if (!form.full_name?.trim()) return toast.error("الاسم الكامل مطلوب");
		const result = await supabase.from("employees").update({
			...form,
			full_name: form.full_name.trim(),
			department_id: form.department_id === "__none__" ? null : form.department_id
		}).eq("id", employee.id);
		if (result.error) return toast.error(result.error.message);
		saved();
		onOpenChange(false);
		toast.success("تم تعديل الموظف");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "تعديل الموظف" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الاسم الكامل",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.full_name || "",
							onChange: (event) => set("full_name", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "البريد الإلكتروني",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.email || "",
							onChange: (event) => set("email", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الهاتف",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.phone || "",
							onChange: (event) => set("phone", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "القسم",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.department_id || "__none__",
							onValueChange: (value) => set("department_id", value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "__none__",
								children: "غير محدد"
							}), departments.map((department) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: department.id,
								children: department.name
							}, department.id))] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الحالة",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.status || "active",
							onValueChange: (value) => set("status", value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "active",
								children: "نشط"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "inactive",
								children: "غير نشط"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "ملاحظات",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: form.notes || "",
							onChange: (event) => set("notes", event.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "إلغاء"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				children: "حفظ"
			})] })
		] })
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { EmployeeDetails as component };

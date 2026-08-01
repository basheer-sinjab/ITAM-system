import { r as __toESM } from "../_runtime.mjs";
import { i as supabase } from "./utils-DCYC_DH6.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useMatchRoute, f as Outlet, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as Plus } from "../_libs/lucide-react.mjs";
import { n as Input, r as Label, t as Button } from "./label-BsUCxb4w.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Textarea, r as DialogFooter, t as Dialog } from "./dialog-CEiH-9U3.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CZqaC0wd.mjs";
import { t as Route } from "./people-departments-wtpfpKnZ.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CqcntiJb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-departments-DRcnkPYw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PeopleDepartmentsRoute() {
	const matchRoute = useMatchRoute();
	const isDepartmentDetail = matchRoute({
		to: "/people-departments/$id",
		fuzzy: false
	});
	const isEmployeeDetail = matchRoute({
		to: "/people-departments/employee/$id",
		fuzzy: false
	});
	return isDepartmentDetail || isEmployeeDetail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeopleDepartments, {});
}
function PeopleDepartments() {
	const { tab } = Route.useSearch();
	const queryClient = useQueryClient();
	const [employeeOpen, setEmployeeOpen] = (0, import_react.useState)(false);
	const [departmentOpen, setDepartmentOpen] = (0, import_react.useState)(false);
	const [employeeSearch, setEmployeeSearch] = (0, import_react.useState)("");
	const { data: employees = [] } = useQuery({
		queryKey: ["employees"],
		queryFn: async () => (await supabase.from("employees").select("*").order("full_name")).data ?? []
	});
	const { data: departments = [] } = useQuery({
		queryKey: ["departments"],
		queryFn: async () => (await supabase.from("departments").select("*").order("name")).data ?? []
	});
	const { data: assets = [] } = useQuery({
		queryKey: ["assets"],
		queryFn: async () => (await supabase.from("assets").select("*")).data ?? []
	});
	const { data: licenseAssignments = [] } = useQuery({
		queryKey: ["license-assignments"],
		queryFn: async () => (await supabase.from("license_assignments").select("*")).data ?? []
	});
	const filteredEmployees = employees.filter((employee) => {
		const search = employeeSearch.trim().toLowerCase();
		return !search || [
			employee.full_name,
			employee.email,
			employee.phone
		].some((value) => String(value ?? "").toLowerCase().includes(search));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: "الأشخاص والأقسام"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "الموظفون والأقسام والأصول المعيّنة"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: tab,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "employees",
						children: "الموظفون"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "departments",
						children: "الأقسام"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "employees",
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: employeeSearch,
									onChange: (event) => setEmployeeSearch(event.target.value),
									placeholder: "ابحث بالاسم أو البريد أو رقم الهاتف",
									className: "sm:max-w-sm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => setEmployeeOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة موظف"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: filteredEmployees.map((employee) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/people-departments/employee/$id",
									params: { id: employee.id },
									className: "surface-panel interactive-card p-5 hover:interactive-card-hover",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-semibold",
											children: employee.full_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted-foreground",
											children: [
												employee.email || "—",
												" · ",
												employee.phone || "—"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-sm",
											children: [
												"الأصول المعيّنة:",
												" ",
												assets.filter((asset) => asset.assigned_employee_id === employee.id).length,
												" ",
												"· التراخيص:",
												" ",
												licenseAssignments.filter((assignment) => assignment.employee_id === employee.id).length
											]
										})
									]
								}, employee.id))
							}),
							filteredEmployees.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "لا توجد نتائج مطابقة للبحث."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "departments",
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setDepartmentOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة قسم"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: departments.map((department) => {
								const people = employees.filter((employee) => employee.department_id === department.id);
								const assetCount = assets.filter((asset) => people.some((employee) => employee.id === asset.assigned_employee_id)).length;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/people-departments/$id",
									params: { id: department.id },
									className: "surface-panel interactive-card p-5 hover:interactive-card-hover",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-semibold",
											children: department.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: department.notes || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-sm",
											children: [
												"الموظفون: ",
												people.length,
												" · الأصول: ",
												assetCount
											]
										})
									]
								}, department.id);
							})
						})]
					})
				]
			}),
			employeeOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeForm, {
				departments,
				close: () => setEmployeeOpen(false),
				saved: () => queryClient.invalidateQueries()
			}),
			departmentOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepartmentForm, {
				close: () => setDepartmentOpen(false),
				saved: () => queryClient.invalidateQueries()
			})
		]
	});
}
function EmployeeForm({ departments, close, saved }) {
	const [form, setForm] = (0, import_react.useState)({ status: "active" });
	const set = (key, value) => setForm({
		...form,
		[key]: value
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "إضافة موظف" }) }),
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
							onValueChange: (value) => set("department_id", value === "__none__" ? null : value),
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
				onClick: close,
				children: "إلغاء"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: async () => {
					await supabase.from("employees").insert(form);
					saved();
					close();
				},
				children: "حفظ"
			})] })
		] })
	});
}
function DepartmentForm({ close, saved }) {
	const [name, setName] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "إضافة قسم" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "اسم القسم",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (event) => setName(event.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "الوصف",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: notes,
						onChange: (event) => setNotes(event.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: close,
				children: "إلغاء"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: async () => {
					await supabase.from("departments").insert({
						name,
						notes
					});
					saved();
					close();
				},
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
export { PeopleDepartmentsRoute as component };

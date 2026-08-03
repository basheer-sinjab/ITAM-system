import { r as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-Du3ze5ZY.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, f as useMatchRoute, p as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { V as Building2, h as Search, i as UsersRound, v as Plus } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { t as Label } from "./label-DF0aFIxM.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-B8OAifVF.mjs";
import { t as Textarea } from "./textarea-DVSIcTTN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as MetricCard, t as ManagementHeader } from "./ManagementVisuals-DCDYFpP2.mjs";
import { t as Route } from "./people-departments-BcPSZNvT.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DgS9yNPl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-departments-D6Anw7XJ.js
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
	const [departmentSearch, setDepartmentSearch] = (0, import_react.useState)("");
	const [newBranch, setNewBranch] = (0, import_react.useState)("");
	const [newTechnician, setNewTechnician] = (0, import_react.useState)("");
	const { data: employees = [] } = useQuery({
		queryKey: ["employees"],
		queryFn: async () => (await supabase.from("employees").select("*").order("full_name")).data ?? []
	});
	const { data: departments = [] } = useQuery({
		queryKey: ["departments"],
		queryFn: async () => (await supabase.from("departments").select("*").order("branch")).data ?? []
	});
	const { data: branches = [] } = useQuery({
		queryKey: ["branches"],
		queryFn: async () => (await supabase.from("branches").select("*").order("name")).data ?? []
	});
	const { data: technicians = [] } = useQuery({
		queryKey: ["technicians"],
		queryFn: async () => (await supabase.from("technicians").select("*").order("name")).data ?? []
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
			employee.employee_number,
			employee.full_name,
			employee.email,
			employee.phone
		].some((value) => String(value ?? "").toLowerCase().includes(search));
	});
	const departmentBranchName = (department) => branches.find((branch) => branch.id === department.branch_id)?.name || branches.find((branch) => branch.name === department.branch)?.name || "";
	const filteredDepartments = departments.filter((department) => {
		const search = departmentSearch.trim().toLowerCase();
		return !search || [
			department.name,
			departmentBranchName(department),
			department.notes
		].some((value) => String(value ?? "").toLowerCase().includes(search));
	});
	const employeeDepartment = (employee) => departments.find((department) => department.id === employee.department_id);
	const employeeDepartmentLabel = (employee) => {
		const department = employeeDepartment(employee);
		return department ? `${department.name} - ${departmentBranchName(department) || "فرع غير محدد"}` : "قسم غير محدد";
	};
	const groupedEmployees = [...filteredEmployees].sort((a, b) => String(employeeDepartment(a)?.name ?? "").localeCompare(String(employeeDepartment(b)?.name ?? "")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagementHeader, {
				icon: UsersRound,
				title: "الأشخاص والأقسام",
				description: "إدارة الموظفين والأقسام والتراخيص المعيّنة"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					icon: UsersRound,
					label: "الموظفون",
					value: employees.length
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					icon: Building2,
					label: "الأقسام",
					value: departments.length,
					tone: "emerald"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: tab,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "employees",
							children: "الموظفون"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "departments",
							children: "الأقسام"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "branches",
							children: "الفروع"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "technicians",
							children: "الفنيون"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "employees",
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-panel flex flex-col gap-3 p-3 sm:flex-row-reverse sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full sm:max-w-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: employeeSearch,
										onChange: (event) => setEmployeeSearch(event.target.value),
										placeholder: "ابحث بالاسم أو الرقم أو بيانات التواصل",
										className: "pr-9"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => setEmployeeOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة موظف"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [departments.map((department) => {
									const departmentEmployees = groupedEmployees.filter((employee) => employee.department_id === department.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
										open: true,
										className: "surface-panel overflow-hidden group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
											className: "flex cursor-pointer list-none items-center justify-between border-b p-4 font-semibold marker:hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 text-primary" }),
													department.name,
													" -",
													" ",
													departmentBranchName(department) || "فرع غير محدد",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary",
														children: departmentEmployees.length
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground transition-transform group-open:rotate-180",
												children: "⌄"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-4 p-4 md:grid-cols-2",
											children: [departmentEmployees.map((employee) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/people-departments/employee/$id",
												params: { id: employee.id },
												className: "surface-panel interactive-card p-5 hover:interactive-card-hover",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-start justify-between gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { className: "size-5" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: `inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs ${employee.status === "active" ? "bg-emerald-500/10 text-emerald-700" : "bg-muted text-muted-foreground"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2 rounded-full ${employee.status === "active" ? "bg-emerald-500" : "bg-muted-foreground"}` }), employee.status === "active" ? "نشط" : "غير نشط"]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
														className: "mt-4 font-semibold",
														children: employee.full_name
													}),
													employee.employee_number && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 font-mono text-xs text-muted-foreground",
														children: employee.employee_number
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-sm text-muted-foreground",
														children: [
															employee.email || "—",
															" · ",
															employee.phone || "—"
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-2 text-xs font-medium text-primary",
														children: employeeDepartmentLabel(employee)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-3 text-sm",
														children: [
															"التراخيص:",
															" ",
															licenseAssignments.filter((assignment) => assignment.employee_id === employee.id).length
														]
													})
												]
											}, employee.id)), !departmentEmployees.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "p-2 text-sm text-muted-foreground",
												children: "لا يوجد موظفون في هذا القسم."
											})]
										})]
									}, department.id);
								}), groupedEmployees.filter((employee) => !employee.department_id).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
									open: true,
									className: "surface-panel overflow-hidden group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
										className: "flex cursor-pointer list-none items-center justify-between border-b p-4 font-semibold marker:hidden",
										children: ["موظفون بدون قسم", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "⌄"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-4 p-4 md:grid-cols-2",
										children: groupedEmployees.filter((employee) => !employee.department_id).map((employee) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/people-departments/employee/$id",
											params: { id: employee.id },
											className: "surface-panel interactive-card p-5 hover:interactive-card-hover",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "font-semibold",
												children: employee.full_name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-muted-foreground",
												children: [
													employee.email || "—",
													" · ",
													employee.phone || "—"
												]
											})]
										}, employee.id))
									})]
								})]
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-panel flex flex-col gap-3 p-3 sm:flex-row-reverse sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full sm:max-w-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: departmentSearch,
									onChange: (event) => setDepartmentSearch(event.target.value),
									placeholder: "ابحث باسم القسم أو الفرع",
									className: "pr-9"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setDepartmentOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة قسم"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [branches.map((branch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								open: true,
								className: "surface-panel overflow-hidden group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex cursor-pointer list-none items-center justify-between border-b p-5 marker:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-3 text-lg font-semibold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5 text-primary" }),
											branch.name,
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary",
												children: [
													filteredDepartments.filter((department) => department.branch_id === branch.id || !department.branch_id && department.branch === branch.name).length,
													" ",
													"أقسام"
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground transition-transform group-open:rotate-180",
										children: "⌄"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-4 p-4 md:grid-cols-2",
									children: filteredDepartments.filter((department) => department.branch_id === branch.id || !department.branch_id && department.branch === branch.name).map((department) => {
										const people = employees.filter((employee) => employee.department_id === department.id);
										const assetCount = assets.filter((asset) => people.some((employee) => employee.id === asset.assigned_employee_id)).length;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/people-departments/$id",
											params: { id: department.id },
											className: "surface-panel interactive-card p-5 hover:interactive-card-hover",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-start justify-between gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-md bg-sky-500/10 px-2 py-1 text-xs font-medium text-sky-700",
														children: departmentBranchName(department) || "فرع غير محدد"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "mt-4 font-semibold",
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
							}, branch.id)), filteredDepartments.filter((department) => !departmentBranchName(department)).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								open: true,
								className: "surface-panel overflow-hidden group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex cursor-pointer list-none items-center justify-between border-b p-5 marker:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "أقسام بدون فرع"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "⌄"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-4 p-4 md:grid-cols-2",
									children: filteredDepartments.filter((department) => !departmentBranchName(department)).map((department) => {
										const people = employees.filter((employee) => employee.department_id === department.id);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/people-departments/$id",
											params: { id: department.id },
											className: "surface-panel interactive-card p-5 hover:interactive-card-hover",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "font-semibold",
												children: department.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-3 text-sm",
												children: ["الموظفون: ", people.length]
											})]
										}, department.id);
									})
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "branches",
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-panel flex flex-col gap-2 p-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: newBranch,
								onChange: (event) => setNewBranch(event.target.value),
								placeholder: "اسم الفرع الجديد"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: async () => {
									if (!newBranch.trim()) return toast.error("اسم الفرع مطلوب");
									const result = await supabase.from("branches").insert({ name: newBranch.trim() });
									if (result.error) return toast.error(result.error.message);
									setNewBranch("");
									queryClient.invalidateQueries({ queryKey: ["branches"] });
									toast.success("تمت إضافة الفرع");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة فرع"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: branches.map((branch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-panel p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold",
									children: branch.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: [
										"الأقسام:",
										" ",
										departments.filter((department) => department.branch_id === branch.id || !department.branch_id && department.branch === branch.name).length
									]
								})]
							}, branch.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "technicians",
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-panel flex flex-col gap-2 p-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: newTechnician,
								onChange: (event) => setNewTechnician(event.target.value),
								placeholder: "اسم الفني الجديد"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: async () => {
									if (!newTechnician.trim()) return toast.error("اسم الفني مطلوب");
									const result = await supabase.from("technicians").insert({ name: newTechnician.trim() });
									if (result.error) return toast.error(result.error.message);
									setNewTechnician("");
									queryClient.invalidateQueries({ queryKey: ["technicians"] });
									toast.success("تمت إضافة الفني");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة فني"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
							children: technicians.map((technician) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-panel flex items-center gap-3 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: technician.name
								})]
							}, technician.id))
						})]
					})
				]
			}),
			employeeOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeForm, {
				departments,
				branches,
				close: () => setEmployeeOpen(false),
				saved: () => queryClient.invalidateQueries()
			}),
			departmentOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepartmentForm, {
				branches,
				close: () => setDepartmentOpen(false),
				saved: () => queryClient.invalidateQueries()
			})
		]
	});
}
function EmployeeForm({ departments, branches = [], close, saved }) {
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
						label: "رقم الموظف",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.employee_number || "",
							onChange: (event) => set("employee_number", event.target.value),
							placeholder: "مثال: EMP-001"
						})
					}),
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
							}), departments.map((department) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: department.id,
								children: [
									department.name,
									" —",
									" ",
									branches.find((branch) => branch.id === department.branch_id)?.name || department.branch || "غير محدد"
								]
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
					if (!form.full_name?.trim()) return toast.error("الاسم الكامل مطلوب");
					const result = await supabase.from("employees").insert({
						...form,
						full_name: form.full_name.trim(),
						employee_number: form.employee_number?.trim() || null
					});
					if (result.error) return toast.error(result.error.message);
					saved();
					close();
					toast.success("تمت إضافة الموظف");
				},
				children: "حفظ"
			})] })
		] })
	});
}
function DepartmentForm({ close, saved, branches = [] }) {
	const [name, setName] = (0, import_react.useState)("");
	const [branchId, setBranchId] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "إضافة قسم" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "اسم القسم",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (event) => setName(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الفرع",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: branchId || "__none__",
							onValueChange: (value) => setBranchId(value === "__none__" ? "" : value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "اختر الفرع" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "__none__",
								children: "فرع غير محدد"
							}), branches.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: item.id,
								children: item.name
							}, item.id))] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الوصف",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: notes,
							onChange: (event) => setNotes(event.target.value)
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
					if (!name.trim()) return toast.error("اسم القسم مطلوب");
					const result = await supabase.from("departments").insert({
						name: name.trim(),
						branch_id: branchId || null,
						branch: branches.find((item) => item.id === branchId)?.name || "",
						notes
					});
					if (result.error) return toast.error(result.error.message);
					saved();
					close();
					toast.success("تمت إضافة القسم");
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

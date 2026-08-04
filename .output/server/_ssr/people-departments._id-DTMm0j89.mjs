import { r as __toESM } from "../_runtime.mjs";
import { i as supabase } from "./client-BB7Jq0Kf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as Monitor, E as Mail, K as ArrowRight, b as Pencil, r as Users, u as Trash2, y as Phone } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { n as Textarea, t as Label } from "./textarea-CbTTIeBt.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-B8OAifVF.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ConfirmButton } from "./ConfirmButton-BpxDIdWE.mjs";
import { n as ColorField, t as COLOR_PALETTE } from "./ColorField-DnyooLbp.mjs";
import { t as Route } from "./people-departments._id-DK0Szhmd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-departments._id-DTMm0j89.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DepartmentDetails() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const { data: department, isLoading } = useQuery({
		queryKey: ["department", id],
		queryFn: async () => (await supabase.from("departments").select("*").eq("id", id).maybeSingle()).data
	});
	const { data: employees = [] } = useQuery({
		queryKey: ["department-employees", id],
		queryFn: async () => (await supabase.from("employees").select("*").eq("department_id", id).order("full_name")).data ?? []
	});
	const { data: assets = [] } = useQuery({
		queryKey: ["assets"],
		queryFn: async () => (await supabase.from("assets").select("*")).data ?? []
	});
	const { data: branches = [] } = useQuery({
		queryKey: ["branches"],
		queryFn: async () => (await supabase.from("branches").select("*").order("name")).data ?? []
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "جارٍ التحميل…"
	});
	if (!department) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "القسم غير موجود."
	});
	const departmentAssets = assets.filter((asset) => asset.department_id === id || employees.some((employee) => employee.id === asset.assigned_employee_id));
	const branchName = branches.find((branch) => branch.id === department.branch_id)?.name || branches.find((branch) => branch.name === department.branch)?.name || "فرع غير محدد";
	const remove = async () => {
		const detach = await supabase.from("employees").update({ department_id: null }).eq("department_id", id);
		if (detach.error) return toast.error(detach.error.message);
		const result = await supabase.from("departments").delete().eq("id", id);
		if (result.error) return toast.error(result.error.message);
		queryClient.invalidateQueries();
		toast.success("تم حذف القسم");
		navigate({
			to: "/people-departments",
			search: { tab: "departments" }
		});
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
						search: { tab: "departments" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "العودة إلى الأقسام",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: department.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-md bg-sky-500/10 px-2 py-1 text-xs font-medium text-sky-700",
							children: branchName
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: department.notes || "لا يوجد وصف للقسم."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => setEditOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "ml-2 size-4" }), "تعديل"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmButton, {
						variant: "outline",
						className: "text-destructive",
						title: "حذف القسم؟",
						description: `سيتم حذف قسم ${department.name} وسيبقى موظفوه بدون قسم.`,
						onConfirm: remove,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "ml-2 size-4" }), "حذف"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
					icon: Users,
					value: employees.length,
					label: "موظف في القسم"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
					icon: Monitor,
					value: departmentAssets.length,
					label: "أصل معيّن لموظفي القسم"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "موظفو القسم"
					})
				}), employees.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-5 text-sm text-muted-foreground",
					children: "لا يوجد موظفون في هذا القسم."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y",
					children: employees.map((employee) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeRow, {
						employee,
						assets: assets.filter((asset) => asset.assigned_employee_id === employee.id)
					}, employee.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepartmentEdit, {
				open: editOpen,
				onOpenChange: setEditOpen,
				department,
				branches,
				saved: () => queryClient.invalidateQueries()
			})
		]
	});
}
function EmployeeRow({ employee, assets }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 p-5 lg:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: employee.full_name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: employee.status === "inactive" ? "غير نشط" : "نشط"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), employee.email || "—"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), employee.phone || "—"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-2 flex items-center gap-2 text-sm font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "size-4 text-primary" }), "الأصول المعيّنة"]
			}), assets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "لا توجد أصول معيّنة."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-sm",
				children: assets.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					asset.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: [
							"(",
							asset.asset_id || "—",
							")"
						]
					})
				] }, asset.id))
			})] })
		]
	});
}
function DepartmentEdit({ open, onOpenChange, department, branches = [], saved }) {
	const [name, setName] = (0, import_react.useState)("");
	const [branchId, setBranchId] = (0, import_react.useState)("");
	const [color, setColor] = (0, import_react.useState)(COLOR_PALETTE[0]);
	const [notes, setNotes] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (open) {
			setName(department.name);
			setBranchId(department.branch_id || branches.find((branch) => branch.name === department.branch)?.id || "");
			setNotes(department.notes || "");
			setColor(department.color || COLOR_PALETTE[0]);
		}
	}, [
		open,
		department,
		branches
	]);
	const save = async () => {
		if (!name.trim()) return toast.error("اسم القسم مطلوب");
		const result = await supabase.from("departments").update({
			name: name.trim(),
			branch_id: branchId || null,
			branch: branches.find((branch) => branch.id === branchId)?.name || "",
			color,
			notes: notes || null
		}).eq("id", department.id);
		if (result.error) return toast.error(result.error.message);
		saved();
		onOpenChange(false);
		toast.success("تم تعديل القسم");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "تعديل القسم" }) }),
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
							}), branches.map((branch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: branch.id,
								children: branch.name
							}, branch.id))] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الوصف",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: notes,
							onChange: (event) => setNotes(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "لون القسم",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							value: color,
							onChange: setColor
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
function Summary({ icon: Icon, value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel flex items-center gap-4 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-2xl font-bold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: label
		})] })]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { DepartmentDetails as component };

import { r as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-Du3ze5ZY.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as Monitor, D as KeyRound, U as ArrowRight, a as UserRound, b as Pencil, u as Trash2, v as Plus } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { t as Label } from "./label-DF0aFIxM.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-B8OAifVF.mjs";
import { t as Textarea } from "./textarea-DVSIcTTN.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ConfirmButton } from "./ConfirmButton-BpxDIdWE.mjs";
import { t as Route } from "./licenses._id-CcZfH59U.mjs";
import { t as canAssignLicense } from "./data-rules-CWdMDUU9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/licenses._id-DcOnA8wm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LicenseDetails() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [assignmentOpen, setAssignmentOpen] = (0, import_react.useState)(false);
	const { data: license, isLoading } = useQuery({
		queryKey: ["license", id],
		queryFn: async () => (await supabase.from("licenses").select("*").eq("id", id).maybeSingle()).data
	});
	const { data: assignments = [] } = useQuery({
		queryKey: ["license-assignments", id],
		queryFn: async () => (await supabase.from("license_assignments").select("*").eq("license_id", id).order("assignment_date", { ascending: false })).data ?? []
	});
	const { data: employees = [] } = useQuery({
		queryKey: ["employees"],
		queryFn: async () => (await supabase.from("employees").select("*")).data ?? []
	});
	const { data: assets = [] } = useQuery({
		queryKey: ["assets"],
		queryFn: async () => (await supabase.from("assets").select("*")).data ?? []
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "جارٍ التحميل…"
	});
	if (!license) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "الترخيص غير موجود."
	});
	const removeAssignment = async (assignment) => {
		const result = await supabase.from("license_assignments").delete().eq("id", assignment.id);
		if (result.error) return toast.error(result.error.message);
		queryClient.invalidateQueries();
		toast.success("تمت إزالة تعيين الترخيص");
	};
	const refresh = () => queryClient.invalidateQueries();
	const removeLicense = async () => {
		const assignmentsResult = await supabase.from("license_assignments").delete().eq("license_id", license.id);
		if (assignmentsResult.error) return toast.error(assignmentsResult.error.message);
		const result = await supabase.from("licenses").delete().eq("id", license.id);
		if (result.error) return toast.error(result.error.message);
		refresh();
		toast.success("تم حذف الترخيص");
		navigate({ to: "/licenses" });
	};
	const available = Math.max(0, Number(license.seat_count) - assignments.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/licenses",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "العودة إلى التراخيص",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: license.license_name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: license.product_name || "بدون منتج محدد"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							disabled: !canAssignLicense(license.seat_count, assignments.length),
							onClick: () => setAssignmentOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), available ? "تعيين الترخيص" : "لا توجد مقاعد"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => setEditOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "ml-2 size-4" }), "تعديل"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmButton, {
							variant: "destructive",
							title: "حذف الترخيص؟",
							description: `سيتم حذف ${license.license_name} وجميع تعييناته.`,
							onConfirm: removeLicense,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "ml-2 size-4" }), "حذف"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "نوع الترخيص",
						value: license.license_type
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "تاريخ الانتهاء",
						value: license.expiration_date
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "إجمالي المقاعد",
						value: license.seat_count
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "المقاعد المتاحة",
						value: available
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "مفتاح الترخيص",
						value: license.license_key
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "رقم العقد",
						value: license.contract_number
					})
				]
			}),
			license.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "ملاحظات"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1",
					children: license.notes
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "تعيينات الترخيص"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground",
						children: [assignments.length, " مستخدم"]
					})]
				}), assignments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-5 text-sm text-muted-foreground",
					children: "لا توجد تعيينات لهذا الترخيص."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y",
					children: assignments.map((assignment) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignmentRow, {
						assignment,
						employee: employees.find((employee) => employee.id === assignment.employee_id),
						asset: assets.find((asset) => asset.id === assignment.asset_id),
						remove: () => removeAssignment(assignment)
					}, assignment.id))
				})]
			}),
			editOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditLicenseDialog, {
				license,
				close: () => setEditOpen(false),
				saved: refresh
			}),
			assignmentOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignLicenseDialog, {
				license,
				employees,
				assets,
				close: () => setAssignmentOpen(false),
				saved: refresh
			})
		]
	});
	function AssignmentRow({ assignment, employee, asset, remove }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 font-medium",
						children: [employee ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "size-4 text-primary" }), employee?.full_name || asset?.name || "غير محدد"]
					}),
					asset && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: ["الأصل: ", asset.asset_id || asset.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: ["تاريخ التعيين: ", assignment.assignment_date || "—"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
				variant: "ghost",
				size: "icon",
				"aria-label": "إزالة التعيين",
				title: "إزالة التعيين؟",
				description: "سيعود المقعد إلى المقاعد المتاحة في هذا الترخيص.",
				confirmLabel: "إزالة",
				onConfirm: remove,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
			})]
		});
	}
	function EditLicenseDialog({ license, close, saved }) {
		const [form, setForm] = (0, import_react.useState)({
			license_name: license.license_name ?? "",
			product_name: license.product_name ?? "",
			license_type: license.license_type ?? "",
			license_key: license.license_key ?? "",
			contract_number: license.contract_number ?? "",
			seat_count: license.seat_count ?? 1,
			expiration_date: license.expiration_date ?? "",
			notes: license.notes ?? ""
		});
		const set = (key, value) => setForm({
			...form,
			[key]: value
		});
		const save = async () => {
			if (!form.license_name.trim()) return toast.error("اسم الترخيص مطلوب");
			if (Number(form.seat_count) < assignments.length) return toast.error(`لا يمكن تقليل المقاعد عن ${assignments.length} لأنها مستخدمة حاليًا`);
			const result = await supabase.from("licenses").update({
				...form,
				license_name: form.license_name.trim(),
				seat_count: Number(form.seat_count || 0),
				expiration_date: form.expiration_date || null
			}).eq("id", license.id);
			if (result.error) return toast.error(result.error.message);
			saved();
			close();
			toast.success("تم تعديل الترخيص");
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: true,
			onOpenChange: close,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "تعديل الترخيص" }) }),
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
								min: assignments.length,
								value: form.seat_count,
								onChange: (event) => set("seat_count", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "مفتاح الترخيص",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.license_key,
								onChange: (event) => set("license_key", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "رقم العقد",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.contract_number,
								onChange: (event) => set("contract_number", event.target.value)
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
	function AssignLicenseDialog({ license, employees, assets, close, saved }) {
		const [form, setForm] = (0, import_react.useState)({
			employee_id: "__none__",
			asset_id: "__none__",
			assignment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		});
		const save = async () => {
			if (!canAssignLicense(license.seat_count, assignments.length)) return toast.error("لا توجد مقاعد متاحة في هذا الترخيص");
			if (form.employee_id === "__none__" && form.asset_id === "__none__") return toast.error("اختر موظفًا أو أصلًا للتعيين");
			if (assignments.some((assignment) => form.employee_id !== "__none__" && assignment.employee_id === form.employee_id || form.asset_id !== "__none__" && assignment.asset_id === form.asset_id)) return toast.error("هذا الموظف أو الأصل لديه الترخيص بالفعل");
			const result = await supabase.from("license_assignments").insert({
				license_id: license.id,
				employee_id: form.employee_id === "__none__" ? null : form.employee_id,
				asset_id: form.asset_id === "__none__" ? null : form.asset_id,
				assignment_date: form.assignment_date
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["تعيين ", license.license_name] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "الموظف",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "flex h-10 w-full rounded-md border bg-background px-3 text-sm",
								value: form.employee_id,
								onChange: (event) => setForm({
									...form,
									employee_id: event.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "__none__",
									children: "غير محدد"
								}), employees.map((employee) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: employee.id,
									children: employee.full_name
								}, employee.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "الأصل",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "flex h-10 w-full rounded-md border bg-background px-3 text-sm",
								value: form.asset_id,
								onChange: (event) => setForm({
									...form,
									asset_id: event.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "__none__",
									children: "غير محدد"
								}), assets.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: asset.id,
									children: [
										asset.name,
										" -",
										" ",
										asset.asset_id || asset.serial_number || asset.id
									]
								}, asset.id))]
							})
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
	function Field({ label, children, className = "" }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `space-y-2 ${className}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
		});
	}
	function Info({ label, value }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-medium",
			children: value || "—"
		})] });
	}
}
//#endregion
export { LicenseDetails as component };

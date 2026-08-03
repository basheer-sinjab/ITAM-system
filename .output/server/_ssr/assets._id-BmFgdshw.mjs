import { r as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-Du3ze5ZY.mjs";
import { c as formatDate } from "./pms-DLuiFJ6_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { K as Activity, M as Clock3, P as CirclePlus, U as ArrowRight, _ as Printer, b as Pencil, g as RotateCcw, n as Wrench, o as UserPlus, s as UserCheck, u as Trash2 } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { t as Label } from "./label-DF0aFIxM.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-B8OAifVF.mjs";
import { t as Textarea } from "./textarea-DVSIcTTN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route, t as AssetForm } from "./assets._id-DFmy_CXj.mjs";
import { t as ConfirmButton } from "./ConfirmButton-BpxDIdWE.mjs";
import { t as PrinterImage } from "./PrinterImage-CBPRXgNz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets._id-BmFgdshw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_LABELS = {
	active: "نشط",
	inactive: "غير نشط",
	maintenance: "تحت الصيانة",
	retired: "متقاعد"
};
var RETURN_CONDITIONS = {
	good: "سليم",
	maintenance: "يحتاج صيانة",
	damaged: "متضرر"
};
function escapeHtml(value) {
	return String(value ?? "—").replace(/[&<>\"]/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;"
	})[character] ?? character);
}
function AssetDetails() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [checkoutOpen, setCheckoutOpen] = (0, import_react.useState)(false);
	const [returnOpen, setReturnOpen] = (0, import_react.useState)(false);
	const [completedAssignment, setCompletedAssignment] = (0, import_react.useState)();
	const { data: asset } = useQuery({
		queryKey: ["asset", id],
		queryFn: async () => (await supabase.from("assets").select("*").eq("id", id).maybeSingle()).data
	});
	const { data: employees = [] } = useQuery({
		queryKey: ["employees"],
		queryFn: async () => (await supabase.from("employees").select("*").order("full_name")).data ?? []
	});
	const { data: departments = [] } = useQuery({
		queryKey: ["departments"],
		queryFn: async () => (await supabase.from("departments").select("*").order("name")).data ?? []
	});
	const { data: branches = [] } = useQuery({
		queryKey: ["branches"],
		queryFn: async () => (await supabase.from("branches").select("*").order("name")).data ?? []
	});
	const { data: history = [] } = useQuery({
		queryKey: ["assignment-history", id],
		queryFn: async () => (await supabase.from("assignment_history").select("*").eq("asset_id", id).order("assignment_date", { ascending: false })).data ?? []
	});
	const { data: maintenanceRecords = [] } = useQuery({
		queryKey: ["asset-maintenance", id],
		queryFn: async () => (await supabase.from("asset_maintenance").select("*").eq("asset_id", id).order("maintenance_date", { ascending: false })).data ?? []
	});
	const { data: activity = [] } = useQuery({
		queryKey: ["asset-activity", id],
		queryFn: async () => (await supabase.from("activity_log").select("*").eq("entity_type", "assets").eq("entity_id", id).order("created_at", { ascending: false })).data ?? []
	});
	const remove = useMutation({
		mutationFn: () => supabase.from("assets").delete().eq("id", id),
		onSuccess: () => navigate({ to: "/assets" })
	});
	if (!asset) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "جارٍ التحميل…"
	});
	const employee = (employeeId) => employees.find((item) => item.id === employeeId);
	const currentEmployee = employee(asset.assigned_employee_id);
	const department = departments.find((item) => item.id === asset.department_id);
	const currentAssignment = history.find((record) => !record.return_date && record.employee_id === asset.assigned_employee_id) || history.find((record) => !record.return_date);
	const refresh = async () => queryClient.invalidateQueries();
	const printAssignment = (record) => {
		const livePerson = employee(record.employee_id);
		const liveDepartment = departments.find((item) => item.id === livePerson?.department_id);
		const person = {
			full_name: record.employee_name || livePerson?.full_name,
			employee_number: record.employee_number || livePerson?.employee_number,
			email: record.employee_email || livePerson?.email,
			phone: record.employee_phone || livePerson?.phone
		};
		const departmentName = record.department_name || liveDepartment?.name;
		const branchName = record.branch_name || branches.find((branch) => branch.id === liveDepartment?.branch_id)?.name || liveDepartment?.branch;
		const page = window.open("", "_blank");
		page?.document.write(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>نموذج تسليم أصل - ${escapeHtml(asset.asset_id)}</title><style>@page{size:A4;margin:14mm}*{box-sizing:border-box}body{margin:0;color:#17212b;font-family:Tahoma,Arial,sans-serif;font-size:12px;line-height:1.6}.document{border:1px solid #d6dde3;padding:28px}.header{display:flex;align-items:flex-start;justify-content:space-between;border-bottom:3px solid #0f766e;padding-bottom:18px}.brand{color:#0f766e;font-size:20px;font-weight:700}.subtitle{color:#5b6975;font-size:12px}.document-title{text-align:left}.document-title h1{margin:0;color:#17212b;font-size:22px}.document-number{color:#5b6975;font-family:monospace;margin-top:4px}.notice{background:#eef8f7;border-right:4px solid #0f766e;margin:22px 0;padding:12px 14px}.section{margin-top:22px}.section-title{border-bottom:1px solid #d6dde3;color:#0f766e;font-size:15px;font-weight:700;margin:0 0 10px;padding-bottom:7px}.grid{display:grid;grid-template-columns:repeat(2,1fr);border:1px solid #d6dde3}.field{border-left:1px solid #d6dde3;border-bottom:1px solid #d6dde3;padding:9px 11px;min-height:54px}.field:nth-child(2n){border-left:0}.label{color:#64748b;display:block;font-size:10px;margin-bottom:3px}.value{font-weight:700}.acknowledgement{border:1px solid #d6dde3;background:#fafcfc;margin-top:10px;padding:14px;text-align:justify}.signatures{display:grid;grid-template-columns:repeat(2,1fr);gap:48px;margin-top:52px}.signature{border-top:1px solid #64748b;padding-top:7px;text-align:center}.footer{border-top:1px solid #d6dde3;color:#64748b;font-size:10px;margin-top:30px;padding-top:9px;text-align:center}@media print{.document{border:0;padding:0}}</style></head><body><main class="document"><header class="header"><div><div class="brand">نظام إدارة الأصول التقنية</div><div class="subtitle">إدارة تقنية المعلومات</div></div><div class="document-title"><h1>نموذج تسليم واستلام أصل</h1><div class="document-number">رقم النموذج: ${escapeHtml(record.id)}</div></div></header><div class="notice">يوثق هذا النموذج تسليم الأصل الموضح أدناه إلى الموظف، ويُعد مرجعاً لسجل الأصول والتعيينات.</div><section class="section"><h2 class="section-title">بيانات الموظف</h2><div class="grid"><div class="field"><span class="label">الاسم الكامل</span><span class="value">${escapeHtml(person.full_name)}</span></div><div class="field"><span class="label">رقم الموظف</span><span class="value">${escapeHtml(person.employee_number)}</span></div><div class="field"><span class="label">القسم</span><span class="value">${escapeHtml(departmentName)}</span></div><div class="field"><span class="label">الفرع</span><span class="value">${escapeHtml(branchName)}</span></div><div class="field"><span class="label">البريد الإلكتروني</span><span class="value">${escapeHtml(person.email)}</span></div><div class="field"><span class="label">رقم الهاتف</span><span class="value">${escapeHtml(person.phone)}</span></div></div></section><section class="section"><h2 class="section-title">بيانات الأصل</h2><div class="grid"><div class="field"><span class="label">اسم الأصل</span><span class="value">${escapeHtml(asset.name)}</span></div><div class="field"><span class="label">رقم الأصل</span><span class="value">${escapeHtml(asset.asset_id)}</span></div><div class="field"><span class="label">النوع</span><span class="value">${escapeHtml(asset.asset_type)}</span></div><div class="field"><span class="label">المصنّع والموديل</span><span class="value">${escapeHtml([asset.manufacturer, asset.model].filter(Boolean).join(" - "))}</span></div><div class="field"><span class="label">الرقم التسلسلي</span><span class="value">${escapeHtml(asset.serial_number)}</span></div><div class="field"><span class="label">تاريخ التعيين</span><span class="value">${escapeHtml(formatDate(record.assignment_date))}</span></div></div></section><section class="section"><h2 class="section-title">إقرار الاستلام</h2><div class="acknowledgement">أقر أنا ${escapeHtml(person.full_name)} بأنني استلمت الأصل الموضح أعلاه بحالة صالحة للاستخدام، وأتعهد بالمحافظة عليه واستخدامه لأغراض العمل فقط وإعادته عند الطلب أو عند انتهاء العلاقة الوظيفية. ${record.notes ? `ملاحظات التسليم: ${escapeHtml(record.notes)}` : ""}</div></section><section class="signatures"><div class="signature">توقيع الموظف المستلم<br><br>الاسم: ${escapeHtml(person.full_name)}<br>التاريخ: ________________</div><div class="signature">توقيع ممثل تقنية المعلومات<br><br>الاسم: ________________<br>التاريخ: ________________</div></section><footer class="footer">تم إنشاء هذا النموذج من نظام إدارة الأصول التقنية</footer></main><script>window.print()<\/script></body></html>`);
		page?.document.close();
	};
	const timeline = buildTimeline(asset, history, maintenanceRecords, activity, employee);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/assets",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "العودة إلى الأصول",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: asset.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm text-muted-foreground",
						children: asset.asset_id
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						currentEmployee ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setReturnOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "ml-2 size-4" }), "إرجاع الأصل"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setCheckoutOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "ml-2 size-4" }), "تسليم الأصل"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => setEditOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "ml-2 size-4" }), "تعديل البيانات"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmButton, {
							variant: "outline",
							className: "text-destructive",
							title: "حذف الأصل؟",
							description: `سيتم حذف ${asset.name} وسجلاته المرتبطة نهائيًا.`,
							onConfirm: () => remove.mutate(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "ml-2 size-4" }), "حذف"]
						})
					]
				})]
			}),
			currentEmployee && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "الأصل مسلّم حاليًا إلى"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: currentEmployee.full_name
					})] })]
				}), currentAssignment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => printAssignment(currentAssignment),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "ml-2 size-4" }), "طباعة نموذج التعيين"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-panel overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrinterImage, {
						path: asset.image_url,
						alt: asset.name,
						className: "h-64 w-full"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "surface-panel grid gap-4 p-6 sm:grid-cols-2 lg:col-span-2",
					children: [
						["النوع", asset.asset_type],
						["المصنّع", asset.manufacturer],
						["الموديل", asset.model],
						["الرقم التسلسلي", asset.serial_number],
						["الحالة", STATUS_LABELS[asset.status] || asset.status],
						["القسم", department?.name],
						["معيّن لـ", currentEmployee?.full_name],
						["تاريخ الشراء", formatDate(asset.purchase_date)],
						["انتهاء الضمان", formatDate(asset.warranty_expiry)],
						["ملاحظات", asset.notes]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value || "—" })] }, label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, {
				events: timeline,
				printAssignment
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetForm, {
				open: editOpen,
				onOpenChange: setEditOpen,
				asset,
				departments,
				onSaved: refresh
			}),
			checkoutOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutDialog, {
				asset,
				employees,
				departments,
				branches,
				openHistory: history.filter((record) => !record.return_date),
				close: () => setCheckoutOpen(false),
				saved: async (record) => {
					await refresh();
					setCompletedAssignment(record);
				}
			}),
			returnOpen && currentEmployee && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReturnDialog, {
				asset,
				employee: currentEmployee,
				department: departments.find((item) => item.id === currentEmployee.department_id),
				branch: branches.find((item) => item.id === departments.find((department) => department.id === currentEmployee.department_id)?.branch_id),
				assignment: currentAssignment,
				close: () => setReturnOpen(false),
				saved: refresh
			}),
			completedAssignment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: true,
				onOpenChange: (open) => !open && setCompletedAssignment(void 0),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "تم تسليم الأصل بنجاح" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg bg-primary/5 p-4 text-sm",
						children: "تم حفظ التعيين في الخط الزمني. اطبع نموذج التسليم الآن أو ارجع له في أي وقت من صفحة الأصل."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setCompletedAssignment(void 0),
						children: "إغلاق"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => printAssignment(completedAssignment),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "ml-2 size-4" }), "طباعة نموذج التعيين"]
					})] })
				] })
			})
		]
	});
}
function CheckoutDialog({ asset, employees, departments, branches, openHistory, close, saved }) {
	const [employeeId, setEmployeeId] = (0, import_react.useState)("");
	const [assignmentDate, setAssignmentDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [notes, setNotes] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async () => {
		const person = employees.find((item) => item.id === employeeId);
		if (!person) return toast.error("اختر الموظف المستلم");
		if (!assignmentDate) return toast.error("حدد تاريخ التسليم");
		setSaving(true);
		const department = departments.find((item) => item.id === person.department_id);
		const branch = branches.find((item) => item.id === department?.branch_id)?.name || department?.branch;
		for (const previous of openHistory) await supabase.from("assignment_history").update({
			return_date: assignmentDate,
			return_condition: "good",
			return_notes: "إغلاق تلقائي قبل تسليم جديد"
		}).eq("id", previous.id);
		const assignment = await supabase.from("assignment_history").insert({
			asset_id: asset.id,
			employee_id: person.id,
			employee_name: person.full_name,
			employee_number: person.employee_number || null,
			employee_email: person.email || null,
			employee_phone: person.phone || null,
			department_name: department?.name || null,
			branch_name: branch || null,
			assignment_date: assignmentDate,
			notes: notes.trim() || null
		});
		if (assignment.error) {
			setSaving(false);
			return toast.error(assignment.error.message);
		}
		const created = Array.isArray(assignment.data) ? assignment.data[0] : assignment.data;
		const update = await supabase.from("assets").update({
			assigned_employee_id: person.id,
			department_id: person.department_id || asset.department_id || null,
			status: "active"
		}).eq("id", asset.id);
		if (update.error) {
			if (created) await supabase.from("assignment_history").delete().eq("id", created.id);
			setSaving(false);
			return toast.error(update.error.message);
		}
		toast.success("تم تسليم الأصل وحفظ نموذج التعيين");
		close();
		await saved(created);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["تسليم ", asset.name] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الموظف المستلم",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: employeeId,
							onValueChange: setEmployeeId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "اختر الموظف" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: employees.filter((person) => person.status !== "inactive").map((person) => {
								const department = departments.find((item) => item.id === person.department_id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: person.id,
									children: [person.full_name, department ? ` - ${department.name}` : ""]
								}, person.id);
							}) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "تاريخ التسليم",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: assignmentDate,
							onChange: (event) => setAssignmentDate(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "ملاحظات التسليم (اختياري)",
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
				disabled: saving,
				onClick: save,
				children: "تسليم وحفظ النموذج"
			})] })
		] })
	});
}
function ReturnDialog({ asset, employee, department, branch, assignment, close, saved }) {
	const [returnDate, setReturnDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [condition, setCondition] = (0, import_react.useState)("good");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async () => {
		if (!returnDate) return toast.error("حدد تاريخ الإرجاع");
		if (assignment?.assignment_date && returnDate < assignment.assignment_date) return toast.error("تاريخ الإرجاع لا يمكن أن يسبق تاريخ التسليم");
		setSaving(true);
		let record = assignment;
		if (!record) {
			const fallback = await supabase.from("assignment_history").insert({
				asset_id: asset.id,
				employee_id: employee.id,
				employee_name: employee.full_name,
				employee_number: employee.employee_number || null,
				employee_email: employee.email || null,
				employee_phone: employee.phone || null,
				department_name: department?.name || null,
				branch_name: branch?.name || department?.branch || null,
				assignment_date: asset.updated_at?.slice(0, 10) || returnDate,
				notes: "تم إنشاء السجل تلقائيًا عند إرجاع الأصل"
			});
			if (fallback.error) {
				setSaving(false);
				return toast.error(fallback.error.message);
			}
			record = Array.isArray(fallback.data) ? fallback.data[0] : fallback.data;
		}
		const historyUpdate = await supabase.from("assignment_history").update({
			return_date: returnDate,
			return_condition: condition,
			return_notes: notes.trim() || null
		}).eq("id", record.id);
		if (historyUpdate.error) {
			setSaving(false);
			return toast.error(historyUpdate.error.message);
		}
		const status = condition === "maintenance" ? "maintenance" : condition === "damaged" ? "inactive" : "active";
		const assetUpdate = await supabase.from("assets").update({
			assigned_employee_id: null,
			status
		}).eq("id", asset.id);
		if (assetUpdate.error) {
			setSaving(false);
			return toast.error(assetUpdate.error.message);
		}
		toast.success("تم إرجاع الأصل وحفظ العملية في الخط الزمني");
		close();
		await saved();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["إرجاع ", asset.name] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-muted/50 p-3 text-sm",
						children: ["الموظف الحالي: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: employee.full_name })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "تاريخ الإرجاع",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							min: assignment?.assignment_date || void 0,
							value: returnDate,
							onChange: (event) => setReturnDate(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "حالة الأصل عند الإرجاع",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: condition,
							onValueChange: setCondition,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "good",
									children: "سليم"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "maintenance",
									children: "يحتاج صيانة"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "damaged",
									children: "متضرر"
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "ملاحظة الإرجاع (اختياري)",
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
				disabled: saving,
				onClick: save,
				children: "تأكيد إرجاع الأصل"
			})] })
		] })
	});
}
function buildTimeline(asset, history, maintenance, activity, employee) {
	const events = [{
		id: `created-${asset.id}`,
		type: "created",
		date: asset.created_at,
		title: "تمت إضافة الأصل",
		description: `تم تسجيل ${asset.name} برقم ${asset.asset_id}.`
	}];
	for (const record of history) {
		const personName = record.employee_name || employee(record.employee_id)?.full_name || "موظف";
		events.push({
			id: `assignment-${record.id}`,
			type: "assignment",
			date: record.assignment_date,
			title: `تم تسليم الأصل إلى ${personName}`,
			description: record.notes || "تم حفظ نموذج التعيين.",
			record
		});
		if (record.return_date) events.push({
			id: `return-${record.id}`,
			type: "return",
			date: record.return_date,
			title: `تم إرجاع الأصل من ${personName}`,
			description: `${RETURN_CONDITIONS[record.return_condition] || "تم الإرجاع"}${record.return_notes ? ` · ${record.return_notes}` : ""}`
		});
	}
	for (const record of maintenance) events.push({
		id: `maintenance-${record.id}`,
		type: "maintenance",
		date: record.maintenance_date,
		title: `صيانة ${record.maintenance_type === "Preventive" ? "وقائية" : "تصحيحية"}`,
		description: record.resolution || record.problem_description || "سجل صيانة للأصل.",
		meta: `${record.status === "Closed" ? "مغلقة" : "مفتوحة"}${record.technician ? ` · ${record.technician}` : ""}`
	});
	for (const entry of activity) {
		const change = entry.details?.changes?.status;
		if (change) events.push({
			id: `status-${entry.id}`,
			type: "status",
			date: entry.created_at,
			title: "تم تغيير حالة الأصل",
			description: `${STATUS_LABELS[change.from] || change.from || "غير محدد"} ← ${STATUS_LABELS[change.to] || change.to || "غير محدد"}`
		});
	}
	return events.sort((left, right) => new Date(right.date || 0).getTime() - new Date(left.date || 0).getTime());
}
function Timeline({ events, printAssignment }) {
	const icons = {
		created: CirclePlus,
		assignment: UserCheck,
		return: RotateCcw,
		maintenance: Wrench,
		status: Activity
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "surface-panel overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: "الخط الزمني للأصل"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "التسليم والإرجاع والصيانة وتغيّر الحالة في مكان واحد"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-5",
			children: events.map((event, index) => {
				const Icon = icons[event.type] || Activity;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex gap-4 pb-6 last:pb-0",
					children: [
						index < events.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-[19px] top-10 h-[calc(100%-1.5rem)] w-px bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-background text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 rounded-lg border bg-muted/20 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-medium",
										children: event.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: event.description
									}),
									event.meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: event.meta
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "shrink-0 text-xs text-muted-foreground",
									children: formatDate(String(event.date || "").slice(0, 10))
								})]
							}), event.record && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "mt-3",
								size: "sm",
								variant: "outline",
								onClick: () => printAssignment(event.record),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "ml-2 size-4" }), "طباعة نموذج التعيين"]
							})]
						})
					]
				}, event.id);
			})
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { AssetDetails as component };

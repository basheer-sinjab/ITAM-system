import { r as __toESM } from "../_runtime.mjs";
import { i as supabase } from "./utils-CWZASUqA.mjs";
import { c as formatDate } from "./pms-DLuiFJ6_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { E as ArrowRight, o as Trash2, p as Pencil, u as Printer } from "../_libs/lucide-react.mjs";
import { t as Button } from "./label-DrbQyf4b.mjs";
import { n as Route, t as AssetForm } from "./assets._id-DUBbD3EY.mjs";
import { t as PrinterImage } from "./PrinterImage-BBPVBnou.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets._id-C8wEieh9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function escapeHtml(value) {
	return String(value ?? "—").replace(/[&<>"]/g, (character) => ({
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
	const [edit, setEdit] = (0, import_react.useState)(false);
	const { data: asset } = useQuery({
		queryKey: ["asset", id],
		queryFn: async () => (await supabase.from("assets").select("*").eq("id", id).maybeSingle()).data
	});
	const { data: employees = [] } = useQuery({
		queryKey: ["employees"],
		queryFn: async () => (await supabase.from("employees").select("*")).data ?? []
	});
	const { data: departments = [] } = useQuery({
		queryKey: ["departments"],
		queryFn: async () => (await supabase.from("departments").select("*")).data ?? []
	});
	const { data: history = [] } = useQuery({
		queryKey: ["assignment-history", id],
		queryFn: async () => (await supabase.from("assignment_history").select("*").eq("asset_id", id).order("assignment_date", { ascending: false })).data ?? []
	});
	const { data: maintenanceRecords = [] } = useQuery({
		queryKey: ["asset-maintenance", id],
		queryFn: async () => (await supabase.from("asset_maintenance").select("*").eq("asset_id", id).order("maintenance_date", { ascending: false })).data ?? []
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
	const print = (record) => {
		const person = employee(record.employee_id);
		const department = departments.find((item) => item.id === person?.department_id);
		const page = window.open("", "_blank");
		page?.document.write(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>نموذج تسليم أصل - ${escapeHtml(asset.asset_id)}</title><style>@page{size:A4;margin:14mm}*{box-sizing:border-box}body{margin:0;color:#17212b;font-family:Tahoma,Arial,sans-serif;font-size:12px;line-height:1.6}.document{border:1px solid #d6dde3;padding:28px}.header{display:flex;align-items:flex-start;justify-content:space-between;border-bottom:3px solid #0f766e;padding-bottom:18px}.brand{color:#0f766e;font-size:20px;font-weight:700}.subtitle{color:#5b6975;font-size:12px}.document-title{text-align:left}.document-title h1{margin:0;color:#17212b;font-size:22px}.document-number{color:#5b6975;font-family:monospace;margin-top:4px}.notice{background:#eef8f7;border-right:4px solid #0f766e;margin:22px 0;padding:12px 14px}.section{margin-top:22px}.section-title{border-bottom:1px solid #d6dde3;color:#0f766e;font-size:15px;font-weight:700;margin:0 0 10px;padding-bottom:7px}.grid{display:grid;grid-template-columns:repeat(2,1fr);border:1px solid #d6dde3}.field{border-left:1px solid #d6dde3;border-bottom:1px solid #d6dde3;padding:9px 11px;min-height:54px}.field:nth-child(2n){border-left:0}.field:nth-last-child(-n+2){border-bottom:0}.label{color:#64748b;display:block;font-size:10px;margin-bottom:3px}.value{font-weight:700}.acknowledgement{border:1px solid #d6dde3;background:#fafcfc;margin-top:10px;padding:14px;text-align:justify}.signatures{display:grid;grid-template-columns:repeat(2,1fr);gap:48px;margin-top:52px}.signature{border-top:1px solid #64748b;padding-top:7px;text-align:center}.footer{border-top:1px solid #d6dde3;color:#64748b;font-size:10px;margin-top:30px;padding-top:9px;text-align:center}@media print{.document{border:0;padding:0}}</style></head><body><main class="document"><header class="header"><div><div class="brand">نظام إدارة الأصول التقنية</div><div class="subtitle">إدارة تقنية المعلومات</div></div><div class="document-title"><h1>نموذج تسليم واستلام أصل</h1><div class="document-number">رقم النموذج: ${escapeHtml(record.id)}</div></div></header><div class="notice">يوثق هذا النموذج تسليم الأصل الموضح أدناه إلى الموظف، ويُعد مرجعاً لسجل الأصول والتعيينات.</div><section class="section"><h2 class="section-title">بيانات الموظف</h2><div class="grid"><div class="field"><span class="label">الاسم الكامل</span><span class="value">${escapeHtml(person?.full_name)}</span></div><div class="field"><span class="label">القسم</span><span class="value">${escapeHtml(department?.name)}</span></div><div class="field"><span class="label">البريد الإلكتروني</span><span class="value">${escapeHtml(person?.email)}</span></div><div class="field"><span class="label">رقم الهاتف</span><span class="value">${escapeHtml(person?.phone)}</span></div></div></section><section class="section"><h2 class="section-title">بيانات الأصل</h2><div class="grid"><div class="field"><span class="label">اسم الأصل</span><span class="value">${escapeHtml(asset.name)}</span></div><div class="field"><span class="label">رقم الأصل</span><span class="value">${escapeHtml(asset.asset_id)}</span></div><div class="field"><span class="label">النوع</span><span class="value">${escapeHtml(asset.asset_type)}</span></div><div class="field"><span class="label">المصنّع والموديل</span><span class="value">${escapeHtml([asset.manufacturer, asset.model].filter(Boolean).join(" - "))}</span></div><div class="field"><span class="label">الرقم التسلسلي</span><span class="value">${escapeHtml(asset.serial_number)}</span></div><div class="field"><span class="label">تاريخ التعيين</span><span class="value">${escapeHtml(record.assignment_date)}</span></div></div></section><section class="section"><h2 class="section-title">إقرار الاستلام</h2><div class="acknowledgement">أقر أنا ${escapeHtml(person?.full_name)} بأنني استلمت الأصل الموضح أعلاه بحالة صالحة للاستخدام، وأتعهد بالمحافظة عليه واستخدامه لأغراض العمل فقط وإعادته عند الطلب أو عند انتهاء العلاقة الوظيفية. ${record.notes ? `ملاحظات التسليم: ${escapeHtml(record.notes)}` : ""}</div></section><section class="signatures"><div class="signature">توقيع الموظف المستلم<br><br>الاسم: ${escapeHtml(person?.full_name)}<br>التاريخ: ________________</div><div class="signature">توقيع ممثل تقنية المعلومات<br><br>الاسم: ________________<br>التاريخ: ________________</div></section><footer class="footer">تم إنشاء هذا النموذج من نظام إدارة الأصول التقنية</footer></main><script>window.print()<\/script></body></html>`);
		page?.document.close();
	};
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
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => setEdit(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "ml-2 size-4" }), "تعديل"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "text-destructive",
						onClick: () => confirm("حذف الأصل؟") && remove.mutate(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "ml-2 size-4" }), "حذف"]
					})]
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
						["الحالة", asset.status],
						["الموقع", asset.location],
						["ملاحظات", asset.notes]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value || "—" })] }, label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between border-b p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "سجل التعيين"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y",
					children: [history.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-5 text-sm text-muted-foreground",
						children: "لا يوجد سجل تعيين."
					}), history.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: employee(record.employee_id)?.full_name || "—"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								formatDate(record.assignment_date),
								" إلى",
								" ",
								formatDate(record.return_date)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => print(record),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "ml-1 size-4" }), "طباعة نموذج التعيين"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: async () => {
									await supabase.from("assignment_history").delete().eq("id", record.id);
									queryClient.invalidateQueries();
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
							})]
						})]
					}, record.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "سجل الصيانة"
					})
				}), maintenanceRecords.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-5 text-sm text-muted-foreground",
					children: "لا توجد سجلات صيانة لهذا الأصل."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y",
					children: maintenanceRecords.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "التاريخ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: formatDate(record.maintenance_date)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "النوع والحالة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [
									record.maintenance_type === "Preventive" ? "وقائية" : "تصحيحية",
									" · ",
									record.status === "Closed" ? "مغلقة" : "مفتوحة"
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "الفني"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: record.technician || "—"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "التكلفة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: record.cost || 0
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-sm sm:col-span-2 lg:col-span-4",
								children: [record.problem_description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "المشكلة: "
								}), record.problem_description] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "الحل: "
								}), record.resolution || "—"] })]
							})
						]
					}, record.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetForm, {
				open: edit,
				onOpenChange: setEdit,
				asset,
				employees,
				onSaved: () => queryClient.invalidateQueries()
			})
		]
	});
}
//#endregion
export { AssetDetails as component };

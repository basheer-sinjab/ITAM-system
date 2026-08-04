import { r as __toESM } from "../_runtime.mjs";
import { i as supabase, n as restoreLocalData, t as exportLocalData } from "./client-BB7Jq0Kf.mjs";
import { t as ASSET_TYPES } from "./pms-DLuiFJ6_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { A as History, H as Check, N as Download, O as Layers, b as Pencil, c as Upload, j as FileSpreadsheet, m as Settings2, t as X, u as Trash2, v as Plus } from "../_libs/lucide-react.mjs";
import { i as cn, n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { n as Textarea, t as Label } from "./textarea-CbTTIeBt.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-B8OAifVF.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ConfirmButton } from "./ConfirmButton-BpxDIdWE.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DgS9yNPl.mjs";
import { t as ManagementHeader } from "./ManagementVisuals-DCDYFpP2.mjs";
import { n as ColorField, t as COLOR_PALETTE } from "./ColorField-DnyooLbp.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CpMy0FMJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function blobToDataUrl(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(blob);
	});
}
async function createLocalBackup() {
	const data = await exportLocalData();
	const imagePaths = [...new Set((data.assets ?? []).map((asset) => asset.image_url).filter((path) => typeof path === "string" && path.startsWith("/uploads/printers/")))];
	const images = await Promise.all(imagePaths.map(async (path) => {
		const response = await fetch(path);
		if (!response.ok) throw new Error(`تعذر تضمين الصورة ${path} في النسخة الاحتياطية`);
		const blob = await response.blob();
		return {
			path,
			type: blob.type,
			dataUrl: await blobToDataUrl(blob)
		};
	}));
	return JSON.stringify({
		version: 1,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		data,
		images
	});
}
async function restoreLocalBackup(file) {
	let backup;
	try {
		backup = JSON.parse(await file.text());
	} catch {
		throw new Error("ملف النسخة الاحتياطية غير صالح");
	}
	if (backup.version !== 1 || !backup.data || !Array.isArray(backup.images)) throw new Error("تنسيق النسخة الاحتياطية غير مدعوم");
	for (const image of backup.images) {
		if (typeof image.path !== "string" || typeof image.dataUrl !== "string") throw new Error("تحتوي النسخة الاحتياطية على صورة غير صالحة");
		const formData = new FormData();
		formData.append("image", await (await fetch(image.dataUrl)).blob(), "backup-image");
		formData.append("path", image.path);
		const response = await fetch("/api/printer-images/restore", {
			method: "POST",
			body: formData
		});
		if (!response.ok) throw new Error((await response.json()).message ?? "تعذر استعادة الصور");
	}
	await restoreLocalData(backup.data);
}
function downloadCsv(filename, headers, rows) {
	const escape = (value) => `"${String(value ?? "").replace(/"/g, "\"\"")}"`;
	const csv = [headers, ...rows].map((row) => row.map(escape).join(",")).join("\r\n");
	const url = URL.createObjectURL(new Blob(["﻿", csv], { type: "text/csv;charset=utf-8" }));
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}
function parseCsv(text) {
	const rows = [];
	let row = [];
	let value = "";
	let quoted = false;
	const source = text.replace(/^\ufeff/, "");
	for (let index = 0; index < source.length; index += 1) {
		const character = source[index];
		if (character === "\"") if (quoted && source[index + 1] === "\"") {
			value += "\"";
			index += 1;
		} else quoted = !quoted;
		else if (character === "," && !quoted) {
			row.push(value.trim());
			value = "";
		} else if ((character === "\n" || character === "\r") && !quoted) {
			if (character === "\r" && source[index + 1] === "\n") index += 1;
			row.push(value.trim());
			value = "";
			if (row.some(Boolean)) rows.push(row);
			row = [];
		} else value += character;
	}
	row.push(value.trim());
	if (row.some(Boolean)) rows.push(row);
	if (!rows.length) return [];
	const headers = rows[0];
	return rows.slice(1).map((cells) => Object.fromEntries(headers.map((header, index) => [header.trim(), cells[index]?.trim() ?? ""])));
}
function AssetTemplatesSettings() {
	const queryClient = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)();
	const { data: templates = [] } = useQuery({
		queryKey: ["asset-templates"],
		queryFn: async () => (await supabase.from("asset_templates").select("*").order("name")).data ?? []
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const result = await supabase.from("asset_templates").delete().eq("id", id);
			if (result.error) throw result.error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["asset-templates"] });
			toast.success("تم حذف القالب");
		},
		onError: (error) => toast.error(error.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "surface-panel space-y-5 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "قوالب الأجهزة"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "اختر القالب عند إضافة أصل لتعبئة النوع والمصنّع والموديل مباشرة."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setEditing({ asset_type: "Desktop PC" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-2 size-4" }), "إضافة قالب"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3",
				children: [templates.map((template) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => setEditing(template),
									"aria-label": `تعديل ${template.name}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
									variant: "ghost",
									size: "icon",
									title: "حذف القالب؟",
									description: `سيتم حذف قالب ${template.name} فقط ولن تتأثر الأصول المضافة منه.`,
									onConfirm: () => remove.mutate(template.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-semibold",
							children: template.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: [template.manufacturer, template.model].filter(Boolean).join(" — ") || "بدون مصنّع أو موديل"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-3 inline-flex rounded-md bg-primary/10 px-2 py-1 text-xs text-primary",
							children: template.asset_type
						})
					]
				}, template.id)), !templates.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground md:col-span-2 xl:col-span-3",
					children: "أضف أول قالب لجهاز تستخدمه بشكل متكرر."
				})]
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateDialog, {
				template: editing.id ? editing : void 0,
				initial: editing,
				close: () => setEditing(void 0),
				saved: () => {
					queryClient.invalidateQueries({ queryKey: ["asset-templates"] });
					setEditing(void 0);
				}
			})
		]
	});
}
function TemplateDialog({ template, initial, close, saved }) {
	const [form, setForm] = (0, import_react.useState)({
		name: template?.name || "",
		asset_type: template?.asset_type || initial?.asset_type || "Desktop PC",
		manufacturer: template?.manufacturer || "",
		model: template?.model || "",
		notes: template?.notes || ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const set = (key, value) => setForm((current) => ({
		...current,
		[key]: value
	}));
	const save = async () => {
		if (!form.name.trim()) return toast.error("اسم القالب مطلوب");
		setSaving(true);
		const payload = {
			name: form.name.trim(),
			asset_type: form.asset_type,
			manufacturer: form.manufacturer.trim() || null,
			model: form.model.trim() || null,
			notes: form.notes.trim() || null
		};
		const result = template ? await supabase.from("asset_templates").update(payload).eq("id", template.id) : await supabase.from("asset_templates").insert(payload);
		setSaving(false);
		if (result.error) return toast.error(result.error.message);
		toast.success(template ? "تم تعديل القالب" : "تمت إضافة القالب");
		saved();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: template ? "تعديل قالب" : "إضافة قالب جهاز" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "اسم القالب",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.name,
							onChange: (event) => set("name", event.target.value),
							placeholder: "مثال: Dell OptiPlex 7010"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "نوع الأصل",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.asset_type,
							onValueChange: (value) => set("asset_type", value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ASSET_TYPES.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: type,
								children: type
							}, type)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الشركة المصنّعة",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.manufacturer,
							onChange: (event) => set("manufacturer", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الموديل",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.model,
							onChange: (event) => set("model", event.target.value)
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
				disabled: saving,
				onClick: save,
				children: "حفظ القالب"
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
function SettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagementHeader, {
			icon: Settings2,
			title: "الإعدادات",
			description: "القوائم الأساسية وتنبيهات النظام والنسخ الاحتياطي"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "branches",
			dir: "rtl",
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "grid h-auto w-full grid-cols-2 gap-1 p-1 sm:grid-cols-4 lg:grid-cols-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							className: "h-auto min-h-9 whitespace-normal text-center leading-5",
							value: "branches",
							children: "الفروع"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							className: "h-auto min-h-9 whitespace-normal text-center leading-5",
							value: "technicians",
							children: "الفنيون"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							className: "h-auto min-h-9 whitespace-normal text-center leading-5",
							value: "asset-templates",
							children: "قوالب الأجهزة"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							className: "h-auto min-h-9 whitespace-normal text-center leading-5",
							value: "alerts",
							children: "التنبيهات"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							className: "h-auto min-h-9 whitespace-normal text-center leading-5",
							value: "backup",
							children: "النسخ الاحتياطي"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							className: "h-auto min-h-9 whitespace-normal text-center leading-5",
							value: "transfer",
							children: "استيراد وتصدير"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							className: "h-auto min-h-9 whitespace-normal text-center leading-5",
							value: "activity",
							children: "سجل النشاط"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "branches",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookupManager, {
						table: "branches",
						title: "الفروع"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "technicians",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookupManager, {
						table: "technicians",
						title: "الفنيون"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "asset-templates",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetTemplatesSettings, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "alerts",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertSettings, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "backup",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackupSettings, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "transfer",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTransferSettings, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "activity",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityLog, {})
				})
			]
		})]
	});
}
function BackupSettings() {
	const queryClient = useQueryClient();
	const inputRef = (0, import_react.useRef)(null);
	const [isWorking, setIsWorking] = (0, import_react.useState)(false);
	const downloadBackup = async () => {
		setIsWorking(true);
		try {
			const backup = await createLocalBackup();
			const url = URL.createObjectURL(new Blob([backup], { type: "application/json" }));
			const link = document.createElement("a");
			link.href = url;
			link.download = `printers-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
			link.click();
			URL.revokeObjectURL(url);
			toast.success("تم إنشاء النسخة الاحتياطية مع الصور");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذر إنشاء النسخة الاحتياطية");
		} finally {
			setIsWorking(false);
		}
	};
	const restoreBackup = async (file) => {
		if (!file) return;
		setIsWorking(true);
		try {
			await restoreLocalBackup(file);
			await queryClient.invalidateQueries();
			toast.success("تمت استعادة البيانات والصور");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذرت استعادة النسخة الاحتياطية");
		} finally {
			setIsWorking(false);
			if (inputRef.current) inputRef.current.value = "";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel max-w-xl space-y-5 p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-semibold",
			children: "النسخ الاحتياطي والاستعادة"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "يشمل جميع البيانات وصور الطابعات المحفوظة محليًا."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-2",
					onClick: downloadBackup,
					disabled: isWorking,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "تنزيل نسخة احتياطية"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "gap-2",
					onClick: () => inputRef.current?.click(),
					disabled: isWorking,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "استعادة نسخة"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					ref: inputRef,
					className: "hidden",
					type: "file",
					accept: "application/json,.json",
					onChange: (event) => restoreBackup(event.target.files?.[0])
				})
			]
		})]
	});
}
function LookupManager({ table, title }) {
	const qc = useQueryClient();
	const [name, setName] = (0, import_react.useState)("");
	const [color, setColor] = (0, import_react.useState)(COLOR_PALETTE[0]);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [editName, setEditName] = (0, import_react.useState)("");
	const [editColor, setEditColor] = (0, import_react.useState)(COLOR_PALETTE[0]);
	const { data: rows } = useQuery({
		queryKey: [table],
		queryFn: async () => (await supabase.from(table).select("*").order("name")).data ?? []
	});
	const add = useMutation({
		mutationFn: async () => {
			if (!name.trim()) throw new Error("الاسم مطلوب");
			const { error } = await supabase.from(table).insert({
				name: name.trim(),
				...table === "branches" ? { color } : {}
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries();
			setName("");
			if (table === "branches") setColor(COLOR_PALETTE[((rows?.length ?? 0) + 1) % COLOR_PALETTE.length]);
			toast.success("تمت الإضافة");
		},
		onError: (e) => toast.error(e.message)
	});
	const update = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from(table).update({
				name: editName.trim(),
				...table === "branches" ? { color: editColor } : {}
			}).eq("id", editId);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries();
			setEditId(null);
			toast.success("تم التعديل");
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from(table).delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries();
			toast.success("تم الحذف");
		},
		onError: () => toast.error("لا يمكن الحذف — العنصر مستخدم في سجلات أخرى")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel max-w-2xl space-y-4 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: `إضافة إلى ${title}`,
					value: name,
					onChange: (e) => setName(e.target.value),
					onKeyDown: (e) => e.key === "Enter" && add.mutate()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-2",
					onClick: () => add.mutate(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "إضافة"]
				})]
			}),
			table === "branches" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
				value: color,
				onChange: setColor
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "divide-y rounded-lg border",
				children: [(rows ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "p-4 text-center text-sm text-muted-foreground",
					children: "لا توجد عناصر."
				}), (rows ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex items-center justify-between gap-2 p-3",
					children: editId === r.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: editName,
							onChange: (e) => setEditName(e.target.value)
						}), table === "branches" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							value: editColor,
							onChange: setEditColor
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => update.mutate(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => setEditId(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [table === "branches" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-3 rounded-full",
							style: { backgroundColor: r.color || COLOR_PALETTE[0] }
						}), r.name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => {
								setEditId(r.id);
								setEditName(r.name);
								setEditColor(r.color || COLOR_PALETTE[0]);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
							variant: "ghost",
							size: "icon",
							title: `حذف ${r.name}؟`,
							description: "قد يؤثر الحذف على السجلات المرتبطة بهذا العنصر.",
							onConfirm: () => remove.mutate(r.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
						})]
					})] })
				}, r.id))]
			})
		]
	});
}
var TRANSFER_LABELS = {
	assets: "الأصول",
	employees: "الموظفون",
	inventory: "المخزون"
};
function DataTransferSettings() {
	const queryClient = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
	const [kind, setKind] = (0, import_react.useState)("assets");
	const [working, setWorking] = (0, import_react.useState)(false);
	const { data = {
		assets: [],
		employees: [],
		inventory: [],
		departments: [],
		branches: []
	} } = useQuery({
		queryKey: ["data-transfer"],
		queryFn: async () => {
			const [assets, employees, inventory, departments, branches] = await Promise.all([
				supabase.from("assets").select("*"),
				supabase.from("employees").select("*"),
				supabase.from("inventory_items").select("*"),
				supabase.from("departments").select("*"),
				supabase.from("branches").select("*")
			]);
			return {
				assets: assets.data ?? [],
				employees: employees.data ?? [],
				inventory: inventory.data ?? [],
				departments: departments.data ?? [],
				branches: branches.data ?? []
			};
		}
	});
	const departmentLabel = (departmentId) => {
		const department = data.departments.find((item) => item.id === departmentId);
		if (!department) return "";
		const branch = data.branches.find((item) => item.id === department.branch_id)?.name || data.branches.find((item) => item.name === department.branch)?.name;
		return `${department.name}${branch ? ` - ${branch}` : ""}`;
	};
	const exportRows = () => {
		const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		if (kind === "assets") downloadCsv(`assets-${date}.csv`, [
			"رقم الأصل",
			"اسم الأصل",
			"النوع",
			"الشركة",
			"الموديل",
			"الرقم التسلسلي",
			"الحالة",
			"القسم",
			"الموظف",
			"تاريخ الشراء",
			"انتهاء الضمان",
			"ملاحظات"
		], data.assets.map((asset) => [
			asset.asset_id,
			asset.name,
			asset.asset_type,
			asset.manufacturer,
			asset.model,
			asset.serial_number,
			{
				active: "نشط",
				inactive: "غير نشط",
				maintenance: "تحت الصيانة",
				retired: "متقاعد"
			}[asset.status] || asset.status,
			departmentLabel(asset.department_id),
			data.employees.find((item) => item.id === asset.assigned_employee_id)?.full_name || "",
			asset.purchase_date,
			asset.warranty_expiry,
			asset.notes
		]));
		if (kind === "employees") downloadCsv(`employees-${date}.csv`, [
			"رقم الموظف",
			"الاسم الكامل",
			"البريد الإلكتروني",
			"الهاتف",
			"القسم",
			"الحالة",
			"ملاحظات"
		], data.employees.map((employee) => [
			employee.employee_number,
			employee.full_name,
			employee.email,
			employee.phone,
			departmentLabel(employee.department_id),
			employee.status === "inactive" ? "غير نشط" : "نشط",
			employee.notes
		]));
		if (kind === "inventory") downloadCsv(`inventory-${date}.csv`, [
			"اسم العنصر",
			"النوع",
			"الكمية",
			"المكان",
			"ملاحظات"
		], data.inventory.map((item) => [
			item.name,
			{
				Consumable: "مستهلكات",
				Toner: "أحبار",
				"Spare Part": "قطع وأدوات"
			}[item.category] || item.category,
			item.quantity,
			item.location,
			item.notes
		]));
		toast.success(`تم تصدير ${TRANSFER_LABELS[kind]} بصيغة متوافقة مع Excel`);
	};
	const template = () => {
		if (kind === "assets") downloadCsv("assets-template.csv", [
			"رقم الأصل",
			"اسم الأصل",
			"النوع",
			"الشركة",
			"الموديل",
			"الرقم التسلسلي",
			"الحالة",
			"القسم",
			"الموظف",
			"تاريخ الشراء",
			"انتهاء الضمان",
			"ملاحظات"
		], []);
		if (kind === "employees") downloadCsv("employees-template.csv", [
			"رقم الموظف",
			"الاسم الكامل",
			"البريد الإلكتروني",
			"الهاتف",
			"القسم",
			"الحالة",
			"ملاحظات"
		], []);
		if (kind === "inventory") downloadCsv("inventory-template.csv", [
			"اسم العنصر",
			"النوع",
			"الكمية",
			"المكان",
			"ملاحظات"
		], []);
	};
	const resolveDepartment = (label) => data.departments.find((department) => departmentLabel(department.id) === label || department.name === label)?.id || null;
	const importFile = async (file) => {
		if (!file) return;
		setWorking(true);
		try {
			const rows = parseCsv(await file.text());
			let added = 0;
			let skipped = 0;
			for (const row of rows) {
				let payload;
				let table = "";
				if (kind === "assets") {
					if (!row["اسم الأصل"]?.trim()) {
						skipped += 1;
						continue;
					}
					if (row["رقم الأصل"] && data.assets.some((item) => item.asset_id === row["رقم الأصل"])) {
						skipped += 1;
						continue;
					}
					table = "assets";
					payload = {
						asset_id: row["رقم الأصل"] || void 0,
						name: row["اسم الأصل"],
						asset_type: row["النوع"] || "Other",
						manufacturer: row["الشركة"] || null,
						model: row["الموديل"] || null,
						serial_number: row["الرقم التسلسلي"] || null,
						status: {
							نشط: "active",
							"غير نشط": "inactive",
							"تحت الصيانة": "maintenance",
							متقاعد: "retired"
						}[row["الحالة"]] || row["الحالة"] || "active",
						department_id: resolveDepartment(row["القسم"]),
						assigned_employee_id: data.employees.find((item) => item.full_name === row["الموظف"])?.id || null,
						purchase_date: row["تاريخ الشراء"] || null,
						warranty_expiry: row["انتهاء الضمان"] || null,
						notes: row["ملاحظات"] || null
					};
				} else if (kind === "employees") {
					if (!row["الاسم الكامل"]?.trim()) {
						skipped += 1;
						continue;
					}
					if (row["رقم الموظف"] && data.employees.some((item) => item.employee_number === row["رقم الموظف"])) {
						skipped += 1;
						continue;
					}
					table = "employees";
					payload = {
						employee_number: row["رقم الموظف"] || null,
						full_name: row["الاسم الكامل"],
						email: row["البريد الإلكتروني"] || null,
						phone: row["الهاتف"] || null,
						department_id: resolveDepartment(row["القسم"]),
						status: {
							نشط: "active",
							"غير نشط": "inactive"
						}[row["الحالة"]] || row["الحالة"] || "active",
						notes: row["ملاحظات"] || null
					};
				} else {
					if (!row["اسم العنصر"]?.trim() || data.inventory.some((item) => item.name === row["اسم العنصر"])) {
						skipped += 1;
						continue;
					}
					table = "inventory_items";
					payload = {
						name: row["اسم العنصر"],
						category: {
							مستهلكات: "Consumable",
							أحبار: "Toner",
							"قطع وأدوات": "Spare Part"
						}[row["النوع"]] || row["النوع"] || "Consumable",
						quantity: Math.max(0, Number(row["الكمية"]) || 0),
						minimum_quantity: 1,
						location: row["المكان"] || null,
						notes: row["ملاحظات"] || null
					};
				}
				const result = await supabase.from(table).insert(payload);
				if (result.error) skipped += 1;
				else {
					added += 1;
					if (kind === "inventory" && Number(payload.quantity) > 0) {
						const created = Array.isArray(result.data) ? result.data[0] : result.data;
						if (created) await supabase.from("inventory_movements").insert({
							item_id: created.id,
							movement_type: "add",
							quantity: payload.quantity,
							note: "كمية مستوردة"
						});
					}
				}
			}
			await queryClient.invalidateQueries();
			toast.success(`تمت إضافة ${added} سجل${skipped ? `، وتم تجاوز ${skipped}` : ""}`);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذر قراءة الملف");
		} finally {
			setWorking(false);
			if (fileRef.current) fileRef.current.value = "";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel max-w-3xl space-y-5 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "استيراد وتصدير Excel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "نستخدم ملفات CSV التي تفتح مباشرة في Excel، بدون حقول مالية أو موردين."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: Object.keys(TRANSFER_LABELS).map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: kind === value ? "default" : "outline",
					onClick: () => setKind(value),
					children: TRANSFER_LABELS[value]
				}, value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border bg-muted/20 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 text-sm font-medium",
					children: ["النوع المحدد: ", TRANSFER_LABELS[kind]]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: exportRows,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "ml-2 size-4" }), "تصدير البيانات"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: template,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "ml-2 size-4" }), "تنزيل نموذج فارغ"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							disabled: working,
							onClick: () => fileRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "ml-2 size-4" }), "استيراد ملف"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							ref: fileRef,
							className: "hidden",
							type: "file",
							accept: ".csv,text/csv",
							onChange: (event) => importFile(event.target.files?.[0])
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "عند الاستيراد، يتجاوز النظام السجلات المكررة أو الصفوف الناقصة ويعرض لك ملخصًا واضحًا."
			})
		]
	});
}
function ActivityLog() {
	const { data: entries = [] } = useQuery({
		queryKey: ["activity-log"],
		queryFn: async () => (await supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(100)).data ?? []
	});
	const entities = {
		assets: "أصل",
		employees: "موظف",
		departments: "قسم",
		branches: "فرع",
		technicians: "فني",
		inventory_items: "عنصر مخزون",
		inventory_movements: "حركة مخزون",
		asset_maintenance: "صيانة",
		licenses: "ترخيص",
		license_assignments: "تعيين ترخيص",
		app_settings: "إعدادات"
	};
	const actions = {
		create: "إضافة",
		update: "تعديل",
		delete: "حذف"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel max-w-4xl overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 border-b p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: "سجل النشاط"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "آخر 100 عملية تمت داخل النظام"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[65vh] divide-y overflow-y-auto",
			children: [entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-medium",
					children: [
						actions[entry.action] || entry.action,
						" ",
						entities[entry.entity_type] || entry.entity_type
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-muted-foreground",
					children: entry.entity_id || "—"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
					className: "text-xs text-muted-foreground",
					children: new Date(entry.created_at).toLocaleString("ar-SA")
				})]
			}, entry.id)), !entries.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-8 text-center text-sm text-muted-foreground",
				children: "لا توجد عمليات مسجلة بعد."
			})]
		})]
	});
}
function AlertSettings() {
	const qc = useQueryClient();
	const { data: settings } = useQuery({
		queryKey: ["app_settings"],
		queryFn: async () => (await supabase.from("app_settings").select("*").eq("id", "default").maybeSingle()).data
	});
	const [draft, setDraft] = (0, import_react.useState)(null);
	const current = draft ?? (settings ? {
		low_stock_threshold: settings.low_stock_threshold,
		warranty_alert_days: settings.warranty_alert_days,
		dashboard_alerts_enabled: settings.dashboard_alerts_enabled
	} : {
		low_stock_threshold: 2,
		warranty_alert_days: 30,
		dashboard_alerts_enabled: true
	});
	const save = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("app_settings").upsert({
				id: "default",
				...current
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries();
			toast.success("تم حفظ الإعدادات");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel max-w-xl space-y-5 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: "إعدادات التنبيهات"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نبّهني عندما تصل كمية أي عنصر إلى" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					value: current.low_stock_threshold,
					onChange: (e) => setDraft({
						...current,
						low_stock_threshold: Number(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "التنبيه قبل انتهاء الضمان (أيام)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					value: current.warranty_alert_days,
					onChange: (e) => setDraft({
						...current,
						warranty_alert_days: Number(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-lg border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "تنبيهات لوحة التحكم"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "إظهار تنبيهات النقص والضمان داخل النظام"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: current.dashboard_alerts_enabled,
					onCheckedChange: (v) => setDraft({
						...current,
						dashboard_alerts_enabled: v
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => save.mutate(),
				disabled: save.isPending,
				children: "حفظ الإعدادات"
			})
		]
	});
}
//#endregion
export { SettingsPage as component };

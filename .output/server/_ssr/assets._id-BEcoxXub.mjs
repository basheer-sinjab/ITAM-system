import { r as __toESM } from "../_runtime.mjs";
import { t as IT_WAREHOUSE } from "./ssr.mjs";
import { a as supabase, i as runWorkflowAction, r as runHardwareAction } from "./client-MMPsyjyK.mjs";
import { r as formatDate$1 } from "./pms-CVfeknnd.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { A as MemoryStick, D as PackagePlus, G as Clock3, W as Cpu, b as RotateCcw, dt as Activity, f as Trash2, j as MapPin, l as UserCheck, lt as Archive, n as Wrench, ot as Boxes, r as Warehouse, s as UserPlus, st as ArrowRight, ut as ArchiveRestore, w as Pencil, x as Printer, z as History } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { t as Label } from "./label-DF0aFIxM.mjs";
import { t as Textarea } from "./textarea-DVSIcTTN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DL8gVTZ5.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-DU8Jfcwy.mjs";
import { t as PrinterImage } from "./PrinterImage-C7FnTavC.mjs";
import { l as ConfirmButton } from "./ConfirmButton-DJ1nXwDY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route, t as AssetForm } from "./assets._id-DNWKbhIJ.mjs";
import { t as ScopeColorBadges } from "./ScopeColorBadges-CiMvN_9h.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DgS9yNPl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets._id-BEcoxXub.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OLD_PART_ACTIONS = {
	damaged: "تالفة",
	return_to_stock: "رجعت للمخزون",
	disposed: "تم التخلص منها"
};
function assetKind(assetType) {
	const type = String(assetType || "").trim().toLowerCase();
	if (type === "printer" || type.includes("طابعة")) return "printer";
	if (type === "desktop pc" || type === "pc" || type === "laptop" || type.includes("notebook") || type.includes("desktop") || type.includes("كمبيوتر مكتبي")) return "pc";
	return null;
}
function AssetHardwareTabs({ asset }) {
	const kind = assetKind(asset.asset_type);
	if (!kind) return null;
	if (kind === "printer") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "surface-panel overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "toner",
			dir: "rtl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
				className: "m-4 mb-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: "toner",
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "الأحبار"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "toner",
				className: "m-0 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrinterTonerPanel, { asset })
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "surface-panel overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "specs",
			dir: "rtl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "m-4 mb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "specs",
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-4" }), "مواصفات الكمبيوتر"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "parts",
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "size-4" }), "القطع المركبة"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "specs",
					className: "m-0 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PcSpecsPanel, { asset })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "parts",
					className: "m-0 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PcPartsPanel, { asset })
				})
			]
		})
	});
}
function PcSpecsPanel({ asset }) {
	const queryClient = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const { data: specs } = useQuery({
		queryKey: ["pc-specs", asset.id],
		queryFn: async () => (await supabase.from("pc_specs").select("*").eq("asset_id", asset.id).maybeSingle()).data
	});
	const fields = [
		[
			"المعالج",
			specs?.processor,
			Cpu
		],
		[
			"الذاكرة",
			specs?.memory,
			MemoryStick
		],
		[
			"التخزين",
			specs?.storage,
			Boxes
		],
		[
			"كرت الشاشة",
			specs?.graphics_card,
			Cpu
		],
		[
			"نظام التشغيل",
			specs?.operating_system,
			Wrench
		],
		[
			"ملاحظات",
			specs?.notes,
			History
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "مواصفات الجهاز"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "مواصفات مختصرة يتم تحديثها يدويًا عند الحاجة."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => setEditing(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "ml-2 size-4" }), specs ? "تعديل المواصفات" : "إضافة المواصفات"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: fields.map(([label, value, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-muted/20 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" }), label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-2 font-medium",
						children: value || "—"
					})]
				}, label))
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PcSpecsDialog, {
				asset,
				specs,
				close: () => setEditing(false),
				saved: () => {
					queryClient.invalidateQueries({ queryKey: ["pc-specs", asset.id] });
					setEditing(false);
				}
			})
		]
	});
}
function PcSpecsDialog({ asset, specs, close, saved }) {
	const [form, setForm] = (0, import_react.useState)({
		processor: specs?.processor || "",
		memory: specs?.memory || "",
		storage: specs?.storage || "",
		graphics_card: specs?.graphics_card || "",
		operating_system: specs?.operating_system || "",
		notes: specs?.notes || ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const set = (key, value) => setForm((current) => ({
		...current,
		[key]: value
	}));
	const save = async () => {
		setSaving(true);
		const payload = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, String(value || "").trim() || null]));
		const result = specs ? await supabase.from("pc_specs").update({
			...payload,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", specs.id) : await supabase.from("pc_specs").insert({
			...payload,
			asset_id: asset.id,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		setSaving(false);
		if (result.error) return toast.error(result.error.message);
		toast.success("تم حفظ مواصفات الكمبيوتر");
		saved();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["مواصفات ", asset.name] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "المعالج",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.processor,
							onChange: (event) => set("processor", event.target.value),
							placeholder: "مثال: Intel Core i5"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "الذاكرة",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.memory,
							onChange: (event) => set("memory", event.target.value),
							placeholder: "مثال: 16 GB"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "التخزين",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.storage,
							onChange: (event) => set("storage", event.target.value),
							placeholder: "مثال: SSD 512 GB"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "كرت الشاشة",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.graphics_card,
							onChange: (event) => set("graphics_card", event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "نظام التشغيل",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.operating_system,
							onChange: (event) => set("operating_system", event.target.value),
							placeholder: "مثال: Windows 11 Pro"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
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
				children: "حفظ"
			})] })
		] })
	});
}
function PcPartsPanel({ asset }) {
	const queryClient = useQueryClient();
	const [installing, setInstalling] = (0, import_react.useState)();
	const { data: inventory = [] } = useQuery({
		queryKey: ["inventory"],
		queryFn: async () => (await supabase.from("inventory_items").select("*").order("name")).data ?? []
	});
	const { data: installations = [] } = useQuery({
		queryKey: ["pc-parts", asset.id],
		queryFn: async () => (await supabase.from("pc_part_installations").select("*").eq("asset_id", asset.id).order("installed_at", { ascending: false })).data ?? []
	});
	const active = installations.filter((item) => !item.removed_at && !item.undone_at);
	const history = installations.filter((item) => item.removed_at || item.undone_at);
	const spareParts = inventory.filter((item) => item.category === "Spare Part");
	const refresh = async () => {
		await Promise.all([
			queryClient.invalidateQueries({ queryKey: ["pc-parts", asset.id] }),
			queryClient.invalidateQueries({ queryKey: ["inventory"] }),
			queryClient.invalidateQueries({ queryKey: ["inventory-movements"] }),
			queryClient.invalidateQueries({ queryKey: ["asset-activity", asset.id] }),
			queryClient.invalidateQueries({ queryKey: ["asset-maintenance", asset.id] })
		]);
	};
	const undo = async (installation) => {
		try {
			await runHardwareAction({
				action: "undo-part",
				installationId: installation.id
			});
			await refresh();
			toast.success("تم التراجع وإعادة الكمية للمخزون");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذر التراجع");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "القطع الموجودة داخل الجهاز"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "التركيب والاستبدال يحدّثان كمية المخزون تلقائيًا."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setInstalling({}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagePlus, { className: "ml-2 size-4" }), "تركيب قطعة"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [active.map((installation) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: installation.part_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["رُكبت بتاريخ ", formatDate$1(installation.installed_at)]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700",
								children: "مركبة"
							})]
						}),
						installation.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: installation.notes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setInstalling({ oldPart: installation }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "ml-2 size-4" }), "استبدال"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmButton, {
								size: "sm",
								variant: "ghost",
								title: "التراجع عن التركيب؟",
								description: "ستعود القطعة إلى المخزون، وإذا كانت بديلة فستعود القطعة القديمة إلى الجهاز.",
								onConfirm: () => undo(installation),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "ml-2 size-4" }), "تراجع"]
							})]
						})
					]
				}, installation.id)), !active.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground md:col-span-2",
					children: "لم يتم تسجيل قطع مركبة في هذا الكمبيوتر بعد."
				})]
			}),
			history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 border-t pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 text-primary" }), "سجل القطع القديمة"]
				}), history.map((installation) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted/40 p-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: installation.part_name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground",
						children: [installation.undone_at ? "تم التراجع عن تركيبها" : OLD_PART_ACTIONS[installation.old_part_action] || "تمت إزالتها", installation.removed_at ? ` · ${formatDate$1(installation.removed_at)}` : ""]
					})]
				}, installation.id))]
			}),
			installing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallPartDialog, {
				asset,
				oldPart: installing.oldPart,
				spareParts,
				close: () => setInstalling(void 0),
				saved: async () => {
					setInstalling(void 0);
					await refresh();
				}
			})
		]
	});
}
function InstallPartDialog({ asset, oldPart, spareParts, close, saved }) {
	const [itemId, setItemId] = (0, import_react.useState)("");
	const [oldPartAction, setOldPartAction] = (0, import_react.useState)("damaged");
	const [installedAt, setInstalledAt] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [notes, setNotes] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async () => {
		if (!itemId) return toast.error("اختر قطعة الغيار");
		setSaving(true);
		try {
			await runHardwareAction({
				action: "install-part",
				assetId: asset.id,
				itemId,
				installedAt,
				notes,
				oldInstallationId: oldPart?.id,
				oldPartAction: oldPart ? oldPartAction : void 0
			});
			toast.success(oldPart ? "تم استبدال القطعة" : "تم تركيب القطعة");
			await saved();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذر تركيب القطعة");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: oldPart ? `استبدال ${oldPart.part_name}` : "تركيب قطعة في الكمبيوتر" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "قطعة الغيار الجديدة",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: itemId,
							onValueChange: setItemId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "اختر من المخزون" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: spareParts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: item.id,
								children: [
									item.name,
									" — المتوفر ",
									Number(item.quantity)
								]
							}, item.id)) })]
						})
					}),
					!spareParts.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-lg bg-amber-500/10 p-3 text-sm text-amber-800",
						children: "لا توجد قطع غيار في المخزون. أضف القطعة من صفحة المخزون أولًا."
					}),
					oldPart && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "ماذا تم مع القطعة القديمة؟",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: oldPartAction,
							onValueChange: setOldPartAction,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "damaged",
									children: "تالفة"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "return_to_stock",
									children: "رجعت للمخزون"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "disposed",
									children: "تم التخلص منها"
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "تاريخ التركيب",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: installedAt,
							onChange: (event) => setInstalledAt(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "ملاحظة اختيارية",
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
				disabled: saving || !spareParts.length,
				onClick: save,
				children: oldPart ? "تأكيد الاستبدال" : "تأكيد التركيب"
			})] })
		] })
	});
}
function PrinterTonerPanel({ asset }) {
	const queryClient = useQueryClient();
	const [installing, setInstalling] = (0, import_react.useState)(false);
	const { data: inventory = [] } = useQuery({
		queryKey: ["inventory"],
		queryFn: async () => (await supabase.from("inventory_items").select("*").order("name")).data ?? []
	});
	const { data: installations = [] } = useQuery({
		queryKey: ["toner-installations", asset.id],
		queryFn: async () => (await supabase.from("toner_installations").select("*").eq("asset_id", asset.id).order("installed_at", { ascending: false })).data ?? []
	});
	const toners = inventory.filter((item) => item.category === "Toner");
	const refresh = async () => {
		await Promise.all([
			queryClient.invalidateQueries({ queryKey: ["toner-installations", asset.id] }),
			queryClient.invalidateQueries({ queryKey: ["inventory"] }),
			queryClient.invalidateQueries({ queryKey: ["inventory-movements"] }),
			queryClient.invalidateQueries({ queryKey: ["asset-activity", asset.id] }),
			queryClient.invalidateQueries({ queryKey: ["asset-maintenance", asset.id] })
		]);
	};
	const undo = async (installation) => {
		try {
			await runHardwareAction({
				action: "undo-toner",
				installationId: installation.id
			});
			await refresh();
			toast.success("تم التراجع وإعادة الحبر للمخزون");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذر التراجع");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "تركيب الأحبار"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "اختر الحبر يدويًا وسيتم خصم الكمية وتسجيل التركيب."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setInstalling(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagePlus, { className: "ml-2 size-4" }), "تركيب حبر"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [installations.map((installation) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: installation.toner_name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"الكمية ",
							Number(installation.quantity),
							" ·",
							" ",
							formatDate$1(installation.installed_at),
							installation.notes ? ` · ${installation.notes}` : ""
						]
					})] }), installation.undone_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground",
						children: "تم التراجع"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmButton, {
						size: "sm",
						variant: "outline",
						title: "التراجع عن تركيب الحبر؟",
						description: "ستعود الكمية إلى المخزون ويبقى سجل العملية محفوظًا.",
						onConfirm: () => undo(installation),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "ml-2 size-4" }), "تراجع"]
					})]
				}, installation.id)), !installations.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground",
					children: "لم يتم تسجيل تركيب أحبار لهذه الطابعة بعد."
				})]
			}),
			installing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallTonerDialog, {
				asset,
				toners,
				close: () => setInstalling(false),
				saved: async () => {
					setInstalling(false);
					await refresh();
				}
			})
		]
	});
}
function InstallTonerDialog({ asset, toners, close, saved }) {
	const [itemId, setItemId] = (0, import_react.useState)("");
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [installedAt, setInstalledAt] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [notes, setNotes] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async () => {
		if (!itemId) return toast.error("اختر الحبر");
		if (!Number.isFinite(quantity) || quantity < 1) return toast.error("أدخل كمية صحيحة");
		setSaving(true);
		try {
			await runHardwareAction({
				action: "install-toner",
				assetId: asset.id,
				itemId,
				quantity,
				installedAt,
				notes
			});
			toast.success("تم تركيب الحبر وخصم الكمية من المخزون");
			await saved();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذر تركيب الحبر");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["تركيب حبر في ", asset.name] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "الحبر",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: itemId,
							onValueChange: setItemId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "اختر من المخزون" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: toners.map((toner) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: toner.id,
								children: [
									toner.name,
									toner.color ? ` — ${toner.color}` : "",
									" — المتوفر",
									" ",
									Number(toner.quantity)
								]
							}, toner.id)) })]
						})
					}),
					!toners.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-lg bg-amber-500/10 p-3 text-sm text-amber-800",
						children: "لا توجد أحبار في المخزون. أضف الحبر من صفحة المخزون أولًا."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "الكمية",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: "1",
							value: quantity,
							onChange: (event) => setQuantity(Number(event.target.value))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "تاريخ التركيب",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: installedAt,
							onChange: (event) => setInstalledAt(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "ملاحظة اختيارية",
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
				disabled: saving || !toners.length,
				onClick: save,
				children: "تأكيد التركيب"
			})] })
		] })
	});
}
function Field$1({ label, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-2 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function escapeHtml(value, fallback = "—") {
	return (String(value ?? "").trim() || fallback).replace(/[&<>"]/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;"
	})[character] ?? character);
}
function formatDate(value) {
	const text = String(value ?? "").trim();
	if (!text) return "—";
	const date = /* @__PURE__ */ new Date(`${text.slice(0, 10)}T12:00:00`);
	if (Number.isNaN(date.getTime())) return escapeHtml(text);
	return new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
		year: "numeric",
		month: "long",
		day: "numeric"
	}).format(date);
}
function field(label, value, wide = false) {
	return `<div class="info-card${wide ? " info-card--wide" : ""}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}
function isComputer(assetType) {
	const type = String(assetType ?? "").trim().toLowerCase();
	return type === "desktop pc" || type === "pc" || type === "laptop" || type.includes("notebook") || type.includes("desktop") || type.includes("كمبيوتر") || type.includes("لابتوب");
}
function buildAssignmentDocument({ asset, record, person, departmentName, branchName, specs, logoUrl }) {
	const reference = String(record.id ?? "").replaceAll("-", "").slice(0, 10).toUpperCase();
	const destination = [departmentName, branchName].filter(Boolean).join(" - ");
	const sourceLocation = asset.source_location || "المستودع IT";
	const assignmentLocation = asset.delivery_location || destination || `لدى ${person.full_name || "الموظف"}`;
	const assetFields = [
		field("اسم الأصل", asset.name),
		field("رقم الأصل", asset.asset_id),
		field("نوع الجهاز", asset.asset_type),
		field("الشركة المصنّعة", asset.manufacturer),
		field("الموديل", asset.model),
		field("الرقم التسلسلي", asset.serial_number)
	].join("");
	const employeeFields = [
		field("اسم الموظف", person.full_name),
		field("الرقم الوظيفي", person.employee_number),
		field("القسم", departmentName),
		field("الفرع", branchName),
		field("البريد الإلكتروني", person.email),
		field("رقم التواصل", person.phone)
	].join("");
	const specsSection = isComputer(asset.asset_type) ? `<section class="section"><div class="section-heading"><span class="section-number">03</span><div><h2>المواصفات التقنية</h2><p>المواصفات المسجلة للجهاز وقت التسليم</p></div></div><div class="spec-grid">${[
		field("المعالج", specs?.processor),
		field("الذاكرة", specs?.memory),
		field("التخزين", specs?.storage),
		field("كرت الشاشة", specs?.graphics_card),
		field("نظام التشغيل", specs?.operating_system, true)
	].join("")}</div>${specs?.notes ? `<div class="spec-note"><span>ملاحظات المواصفات</span><strong>${escapeHtml(specs.notes)}</strong></div>` : ""}</section>` : "";
	const acknowledgementNumber = isComputer(asset.asset_type) ? "04" : "03";
	const notes = String(record.notes ?? "").trim();
	return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>نموذج تسليم ${escapeHtml(asset.asset_id)}</title>
  <style>
    @page{size:A4;margin:0}
    :root{--blue:#0b5cab;--blue-2:#2563eb;--ink:#14213d;--muted:#64748b;--line:#dbe4ef;--soft:#f4f8fd}
    *{box-sizing:border-box}
    body{margin:0;background:#e8eef6;color:var(--ink);font-family:Tahoma,"Segoe UI",Arial,sans-serif;font-size:10.5px;line-height:1.55;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .toolbar{display:flex;justify-content:center;padding:14px}
    .toolbar button{border:0;border-radius:10px;background:var(--blue);color:white;cursor:pointer;font:700 13px Tahoma;padding:10px 24px}
    .sheet{position:relative;width:210mm;min-height:277mm;margin:0 auto 24px;overflow:hidden;background:white;border-radius:18px;box-shadow:0 20px 55px rgba(15,42,75,.16);padding:16mm 15mm 11mm}
    .sheet:before{content:"";position:absolute;inset:0 0 auto;height:7px;background:linear-gradient(90deg,var(--blue),#38bdf8)}
    .header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-bottom:14px;border-bottom:1px solid var(--line)}
    .brand{display:flex;align-items:center;gap:11px}
    .logo{display:grid;width:48px;height:48px;place-items:center;border:1px solid #d8e6f6;border-radius:14px;background:#f8fbff}
    .logo img{width:35px;height:35px;object-fit:contain}
    .brand strong{display:block;color:var(--blue);font-size:15px}
    .brand span{display:block;margin-top:2px;color:var(--muted);font-size:9.5px}
    .document-badge{text-align:left}
    .document-badge span{display:inline-flex;border-radius:999px;background:#e8f2ff;color:var(--blue);font-weight:700;padding:5px 10px}
    .document-badge small{display:block;margin-top:5px;color:var(--muted);font-family:Consolas,monospace;letter-spacing:.4px}
    .hero{display:grid;grid-template-columns:1.4fr .8fr;gap:14px;margin:16px 0}
    .hero-main{border-radius:16px;background:linear-gradient(135deg,#0b5cab,#1d72c9);color:white;padding:17px 19px}
    .hero-main p{margin:0 0 4px;opacity:.78;font-size:9px;font-weight:700;letter-spacing:.5px}
    .hero-main h1{margin:0;font-size:23px;line-height:1.35}
    .hero-main div{margin-top:7px;opacity:.85;font-size:10px}
    .hero-meta{display:grid;gap:8px}
    .meta-card{display:flex;align-items:center;justify-content:space-between;border:1px solid var(--line);border-radius:12px;background:var(--soft);padding:9px 11px}
    .meta-card span{color:var(--muted);font-size:9px}
    .meta-card strong{font-size:10px}
    .route{display:flex;align-items:center;justify-content:center;gap:9px;border:1px solid #bfdbfe;border-radius:12px;background:#eff6ff;color:#174b7d;padding:9px 12px;font-weight:700}
    .route i{font-style:normal;color:#60a5fa;font-size:16px}
    .section{margin-top:13px;break-inside:avoid}
    .section-heading{display:flex;align-items:center;gap:9px;margin-bottom:8px}
    .section-number{display:grid;width:28px;height:28px;place-items:center;border-radius:8px;background:var(--blue);color:white;font:700 9px Consolas,monospace}
    .section-heading h2{margin:0;font-size:13px}
    .section-heading p{margin:1px 0 0;color:var(--muted);font-size:8.5px}
    .info-grid,.spec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
    .info-card{min-height:49px;border:1px solid var(--line);border-radius:10px;padding:8px 10px;background:white}
    .info-card--wide{grid-column:span 2}
    .info-card span,.spec-note span{display:block;margin-bottom:3px;color:var(--muted);font-size:8px}
    .info-card strong,.spec-note strong{display:block;font-size:10px;overflow-wrap:anywhere}
    .spec-grid .info-card{background:#f8fbff;border-color:#d8e6f6}
    .spec-note{margin-top:7px;border-right:3px solid #60a5fa;border-radius:8px;background:#f8fbff;padding:7px 10px}
    .acknowledgement{border:1px solid #bfdbfe;border-radius:12px;background:#eff6ff;padding:11px 13px;text-align:justify}
    .acknowledgement strong{color:var(--blue)}
    .delivery-notes{margin-top:7px;border-radius:9px;background:white;padding:7px 9px}
    .signatures{display:grid;grid-template-columns:repeat(2,1fr);gap:28px;margin-top:18px;break-inside:avoid}
    .signature{position:relative;min-height:76px;border:1px dashed #9fb1c5;border-radius:12px;padding:10px 12px}
    .signature strong{display:block;color:var(--blue);font-size:10px}
    .signature span{display:block;margin-top:5px;color:var(--muted);font-size:9px}
    .signature-line{position:absolute;right:12px;left:12px;bottom:13px;border-top:1px solid #9fb1c5;padding-top:4px;text-align:center;color:var(--muted);font-size:8px}
    .footer{display:flex;align-items:center;justify-content:space-between;margin-top:16px;border-top:1px solid var(--line);padding-top:7px;color:var(--muted);font-size:8px}
    .footer strong{color:var(--blue)}
    @media print{
      html,body{width:210mm;min-height:297mm;background:white;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      *,*:before,*:after{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .toolbar{display:none}
      .sheet{display:flex;flex-direction:column;width:210mm;min-height:297mm;margin:0;overflow:visible;border-radius:0;box-shadow:none;padding:14mm 15mm 10mm}
      .sheet:before{top:0;right:0;left:0;height:7px}
      .header{padding-bottom:16px}
      .hero{margin:20px 0}
      .section{margin-top:18px;break-inside:avoid}
      .info-card{min-height:55px;padding:10px 11px}
      .acknowledgement{padding:14px 16px}
      .signatures{gap:36px;margin-top:auto;min-height:44mm;padding-top:18mm}
      .signature{min-height:88px;padding:12px 14px}
      .footer{margin-top:12mm;padding-top:9px}
    }
  </style>
</head>
<body>
  <div class="toolbar"><button onclick="window.print()">طباعة النموذج</button></div>
  <main class="sheet">
    <header class="header">
      <div class="brand"><div class="logo"><img src="${escapeHtml(logoUrl, "")}" alt="شعار النظام"></div><div><strong>إدارة تقنية المعلومات</strong><span>نظام إدارة الأصول التقنية</span></div></div>
      <div class="document-badge"><span>نموذج موثّق</span><small>REF: ${escapeHtml(reference || asset.asset_id)}</small></div>
    </header>
    <section class="hero">
      <div class="hero-main"><p>ASSET HANDOVER FORM</p><h1>نموذج تسليم واستلام أصل</h1><div>توثيق تسليم العهدة التقنية للموظف المستلم</div></div>
      <div class="hero-meta"><div class="meta-card"><span>تاريخ التسليم</span><strong>${formatDate(record.assignment_date)}</strong></div><div class="meta-card"><span>رقم الأصل</span><strong>${escapeHtml(asset.asset_id)}</strong></div></div>
    </section>
    <div class="route"><span>${escapeHtml(sourceLocation)}</span><i>←</i><span>${escapeHtml(person.full_name)}</span><i>·</i><span>${escapeHtml(assignmentLocation)}</span></div>
    <section class="section"><div class="section-heading"><span class="section-number">01</span><div><h2>بيانات الموظف المستلم</h2><p>معلومات صاحب العهدة وقت التسليم</p></div></div><div class="info-grid">${employeeFields}</div></section>
    <section class="section"><div class="section-heading"><span class="section-number">02</span><div><h2>بيانات الأصل</h2><p>بيانات التعريف الأساسية للجهاز</p></div></div><div class="info-grid">${assetFields}</div></section>
    ${specsSection}
    <section class="section"><div class="section-heading"><span class="section-number">${acknowledgementNumber}</span><div><h2>إقرار الاستلام والمحافظة على العهدة</h2><p>إقرار الموظف باستلام الجهاز الموضح أعلاه</p></div></div><div class="acknowledgement">أقر أنا <strong>${escapeHtml(person.full_name)}</strong> باستلام الأصل الموضح في هذا النموذج بحالة صالحة للاستخدام، وأتعهد بالمحافظة عليه واستخدامه لأغراض العمل، وعدم تسليمه للغير، وإعادته إلى إدارة تقنية المعلومات عند الطلب أو عند انتهاء الحاجة إليه.${notes ? `<div class="delivery-notes"><strong>ملاحظات التسليم:</strong> ${escapeHtml(notes)}</div>` : ""}</div></section>
    <section class="signatures"><div class="signature"><strong>الموظف المستلم</strong><span>الاسم: ${escapeHtml(person.full_name)}</span><div class="signature-line">التوقيع والتاريخ</div></div><div class="signature"><strong>ممثل إدارة تقنية المعلومات</strong><span>الاسم: ______________________________</span><div class="signature-line">التوقيع والتاريخ</div></div></section>
    <footer class="footer"><span>تم إنشاء النموذج آليًا بواسطة <strong>نظام إدارة الأصول التقنية</strong></span><span>مصدر الأصل: ${escapeHtml(sourceLocation)}</span></footer>
  </main>
  <script>window.addEventListener("load",()=>setTimeout(()=>window.print(),250));<\/script>
</body>
</html>`;
}
var STATUS_LABELS = {
	active: "نشط",
	inactive: "غير نشط",
	maintenance: "تحت الصيانة",
	retired: "متقاعد",
	archived: "مؤرشف"
};
var RETURN_CONDITIONS = {
	good: "سليم",
	maintenance: "يحتاج صيانة",
	damaged: "متضرر"
};
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
	const { data: pcSpecs } = useQuery({
		queryKey: ["pc-specs", id],
		queryFn: async () => (await supabase.from("pc_specs").select("*").eq("asset_id", id).maybeSingle()).data
	});
	const archiveMutation = useMutation({
		mutationFn: (action) => runWorkflowAction({
			action,
			assetId: id
		}),
		onSuccess: async (_, action) => {
			await queryClient.invalidateQueries();
			toast.success(action === "archive-asset" ? "تمت أرشفة الأصل مع الاحتفاظ بسجلاته" : "تمت استعادة الأصل من الأرشيف");
			if (action === "archive-asset") navigate({ to: "/assets" });
		},
		onError: (error) => toast.error(error.message)
	});
	const deleteMutation = useMutation({
		mutationFn: () => runWorkflowAction({
			action: "delete-asset",
			assetId: id
		}),
		onSuccess: async () => {
			await queryClient.invalidateQueries();
			toast.success("تم حذف الأصل وسجل الخط الزمني نهائيًا");
			navigate({ to: "/assets" });
		},
		onError: (error) => toast.error(error.message)
	});
	if (!asset) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "جارٍ التحميل…"
	});
	const employee = (employeeId) => employees.find((item) => item.id === employeeId);
	const currentEmployee = employee(asset.assigned_employee_id);
	const department = departments.find((item) => item.id === asset.department_id);
	const branch = branches.find((item) => item.id === department?.branch_id || !department?.branch_id && item.name === department?.branch);
	const departmentLabel = [branch?.name || department?.branch, department?.name].filter(Boolean).join(" - ");
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
		const snapshot = record.asset_snapshot || {};
		const page = window.open("", "_blank");
		if (!page) return toast.error("اسمح بفتح نافذة الطباعة من المتصفح");
		page.document.write(buildAssignmentDocument({
			asset: {
				...asset,
				...snapshot
			},
			record,
			person,
			departmentName,
			branchName,
			specs: snapshot.specs || pcSpecs,
			logoUrl: new URL("/printersfloss-header-logo.png", window.location.origin).href
		}));
		page.document.close();
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
						!asset.archived_at && (currentEmployee ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setReturnOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "ml-2 size-4" }), "إرجاع الأصل"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setCheckoutOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "ml-2 size-4" }), "تسليم الأصل"]
						})),
						!asset.archived_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => setEditOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "ml-2 size-4" }), "تعديل البيانات"]
						}),
						asset.archived_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => archiveMutation.mutate("restore-asset"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, { className: "ml-2 size-4" }), "استعادة من الأرشيف"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmButton, {
							variant: "destructive",
							disabled: deleteMutation.isPending,
							title: "حذف الأصل نهائيًا؟",
							description: `سيتم حذف ${asset.name} وجميع سجلاته المرتبطة، بما فيها الخط الزمني والتعيينات والصيانة. لا يمكن التراجع عن هذا الإجراء.`,
							confirmLabel: "حذف نهائي",
							onConfirm: () => deleteMutation.mutateAsync().then(() => void 0),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "ml-2 size-4" }), "حذف الأصل"]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmButton, {
							variant: "outline",
							title: "أرشفة الأصل؟",
							description: `سيتم إيقاف ${asset.name} وإغلاق تعيينه الحالي مع الاحتفاظ بنماذج التسليم والصيانة.`,
							confirmLabel: "تأكيد الأرشفة",
							onConfirm: () => archiveMutation.mutateAsync("archive-asset").then(() => void 0),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "ml-2 size-4" }), "أرشفة"]
						})
					]
				})]
			}),
			asset.archived_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-slate-300 bg-slate-100 p-4 text-sm text-slate-700",
				children: [
					"هذا الأصل مؤرشف منذ ",
					formatDate$1(asset.archived_at),
					". سجلات التسليم والصيانة محفوظة للرجوع إليها."
				]
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "ml-2 size-4" }), "طباعة نموذج التسليم"]
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
						["الحالة", asset.archived_at ? STATUS_LABELS.archived : STATUS_LABELS[asset.status] || asset.status],
						["القسم", departmentLabel],
						["معيّن لـ", currentEmployee?.full_name],
						["تاريخ الشراء", formatDate$1(asset.purchase_date)],
						["انتهاء الضمان", formatDate$1(asset.warranty_expiry)],
						["ملاحظات", asset.notes]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value || "—" })] }, label))
				})]
			}),
			(department || branch) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel flex flex-wrap items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted-foreground",
					children: "القسم والفرع:"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeColorBadges, {
					department,
					branch
				})]
			}),
			!asset.archived_at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetHardwareTabs, { asset }),
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
				close: () => setCheckoutOpen(false),
				saved: async (record) => {
					await refresh();
					setCompletedAssignment(record);
				}
			}),
			returnOpen && currentEmployee && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReturnDialog, {
				asset,
				employee: currentEmployee,
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "ml-2 size-4" }), "طباعة نموذج التسليم"]
					})] })
				] })
			})
		]
	});
}
function CheckoutDialog({ asset, employees, departments, close, saved }) {
	const NO_DEPARTMENT = "__none__";
	const [employeeId, setEmployeeId] = (0, import_react.useState)("");
	const [departmentId, setDepartmentId] = (0, import_react.useState)(NO_DEPARTMENT);
	const [assignmentDate, setAssignmentDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [notes, setNotes] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async () => {
		const person = employees.find((item) => item.id === employeeId);
		if (!person) return toast.error("اختر الموظف المستلم");
		if (!assignmentDate) return toast.error("حدد تاريخ التسليم");
		setSaving(true);
		try {
			const created = await runWorkflowAction({
				action: "assign-asset",
				assetId: asset.id,
				employeeId: person.id,
				departmentId: departmentId === NO_DEPARTMENT ? void 0 : departmentId,
				assignmentDate,
				notes: notes.trim() || void 0
			});
			setSaving(false);
			toast.success("تم تسليم الأصل وحفظ نموذج التسليم");
			close();
			await saved(created);
		} catch (error) {
			setSaving(false);
			toast.error(error instanceof Error ? error.message : "تعذر تسليم الأصل");
		}
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
							onValueChange: (value) => {
								setEmployeeId(value);
								const selected = employees.find((item) => item.id === value);
								setDepartmentId(selected?.department_id || NO_DEPARTMENT);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "اختر الموظف" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: employees.filter((person) => person.status !== "inactive").map((person) => {
								const department = departments.find((item) => item.id === person.department_id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: person.id,
									children: [person.full_name, department ? ` - ${department.name}` : ""]
								}, person.id);
							}) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "القسم",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: departmentId,
							onValueChange: setDepartmentId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "اختر القسم" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: NO_DEPARTMENT,
								children: "غير محدد"
							}), departments.map((department) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: department.id,
								children: department.name
							}, department.id))] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "يُحدد تلقائيًا من قسم الموظف ويمكن تغييره قبل الحفظ."
						})]
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
function ReturnDialog({ asset, employee, assignment, close, saved }) {
	const [returnDate, setReturnDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [condition, setCondition] = (0, import_react.useState)("good");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async () => {
		if (!returnDate) return toast.error("حدد تاريخ الإرجاع");
		if (assignment?.assignment_date && returnDate < assignment.assignment_date) return toast.error("تاريخ الإرجاع لا يمكن أن يسبق تاريخ التسليم");
		setSaving(true);
		try {
			await runWorkflowAction({
				action: "return-asset",
				assetId: asset.id,
				returnDate,
				condition,
				notes: notes.trim() || void 0
			});
			setSaving(false);
			toast.success(`تم إرجاع الأصل إلى ${IT_WAREHOUSE}`);
			close();
			await saved();
		} catch (error) {
			setSaving(false);
			toast.error(error instanceof Error ? error.message : "تعذر إرجاع الأصل");
		}
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
	const creationLocation = activity.find((entry) => entry.action === "create")?.details?.current?.location || "المستودع IT";
	const events = [{
		id: `created-${asset.id}`,
		type: "created",
		date: asset.created_at,
		title: `تم استلام الأصل في ${creationLocation}`,
		description: `تم تسجيل ${asset.name} برقم ${asset.asset_id} وإضافته إلى عهدة ${creationLocation}.`
	}];
	const assignmentActivityIds = new Set(activity.filter((entry) => entry.action === "assignment").map((entry) => String(entry.details?.assignment_id || "")).filter(Boolean));
	const returnActivityIds = new Set(activity.filter((entry) => entry.action === "return").map((entry) => String(entry.details?.assignment_id || "")).filter(Boolean));
	for (const record of history) {
		const personName = record.employee_name || employee(record.employee_id)?.full_name || "موظف";
		if (!assignmentActivityIds.has(String(record.id))) events.push({
			id: `assignment-${record.id}`,
			type: "assignment",
			date: record.assignment_date,
			title: `تم تسليم الأصل إلى ${personName}`,
			description: `${record.asset_snapshot?.source_location || "المستودع IT"} ← ${record.asset_snapshot?.delivery_location || [record.department_name, record.branch_name].filter(Boolean).join(" - ") || personName}${record.notes ? ` · ${record.notes}` : ""}`,
			record
		});
		if (record.return_date && !returnActivityIds.has(String(record.id))) events.push({
			id: `return-${record.id}`,
			type: "return",
			date: record.return_date,
			title: `تم إرجاع الأصل من ${personName}`,
			description: `${RETURN_CONDITIONS[record.return_condition] || "تم الإرجاع"} · أُعيد إلى ${IT_WAREHOUSE}${record.return_notes ? ` · ${record.return_notes}` : ""}`
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
		const locationChange = entry.details?.changes?.location;
		if (change) events.push({
			id: `status-${entry.id}`,
			type: "status",
			date: entry.created_at,
			title: "تم تغيير حالة الأصل",
			description: `${STATUS_LABELS[change.from] || change.from || "غير محدد"} ← ${STATUS_LABELS[change.to] || change.to || "غير محدد"}`
		});
		else if (locationChange) events.push({
			id: `location-${entry.id}`,
			type: "location",
			date: entry.created_at,
			title: "تم تحديث موقع الأصل",
			description: `${locationChange.from || "المستودع IT"} ← ${locationChange.to || "المستودع IT"}`
		});
		else if (entry.action === "assignment") {
			const details = entry.details || {};
			const assignmentId = String(details.assignment_id || "");
			const record = history.find((item) => String(item.id) === assignmentId);
			const personName = details.employee_name || record?.employee_name || "موظف";
			const fromLocation = details.from_location || record?.asset_snapshot?.source_location || "المستودع IT";
			const toLocation = details.to_location || record?.asset_snapshot?.delivery_location || personName;
			events.push({
				id: `activity-assignment-${entry.id}`,
				type: "assignment",
				date: entry.created_at,
				title: `تم تسليم الأصل إلى ${personName}`,
				description: `من ${fromLocation} إلى ${toLocation}${record?.notes ? ` · ${record.notes}` : ""}`,
				record
			});
		} else if (entry.action === "return") {
			const details = entry.details || {};
			const assignmentId = String(details.assignment_id || "");
			const record = history.find((item) => String(item.id) === assignmentId);
			const personName = details.employee_name || record?.employee_name || "الموظف";
			const fromLocation = details.from_location || personName;
			const toLocation = details.to_location || "المستودع IT";
			const condition = details.condition || record?.return_condition;
			const notes = details.notes || record?.return_notes;
			events.push({
				id: `activity-return-${entry.id}`,
				type: "return",
				date: entry.created_at,
				title: `تم إرجاع الأصل من ${personName}`,
				description: `${RETURN_CONDITIONS[condition] || "تم الإرجاع"} · من ${fromLocation} إلى ${toLocation}${notes ? ` · ${notes}` : ""}`
			});
		} else if (entry.action === "toner_install") events.push({
			id: `toner-${entry.id}`,
			type: "toner",
			date: entry.created_at,
			title: "تم تركيب حبر",
			description: `${entry.details?.item_name || "حبر"}${entry.details?.quantity ? ` · الكمية ${entry.details.quantity}` : ""}`
		});
		else if (entry.action === "toner_undo") events.push({
			id: `toner-undo-${entry.id}`,
			type: "undo",
			date: entry.created_at,
			title: "تم التراجع عن تركيب حبر",
			description: entry.details?.item_name || "تمت إعادة الحبر للمخزون."
		});
		else if (entry.action === "part_install") events.push({
			id: `part-${entry.id}`,
			type: "part",
			date: entry.created_at,
			title: entry.details?.replaced_part ? "تم استبدال قطعة" : "تم تركيب قطعة",
			description: entry.details?.replaced_part ? `${entry.details.replaced_part} ← ${entry.details.item_name}` : entry.details?.item_name || "قطعة غيار"
		});
		else if (entry.action === "part_undo") events.push({
			id: `part-undo-${entry.id}`,
			type: "undo",
			date: entry.created_at,
			title: "تم التراجع عن تركيب قطعة",
			description: entry.details?.item_name || "تمت إعادة القطعة للمخزون."
		});
	}
	return events.sort((left, right) => new Date(right.date || 0).getTime() - new Date(left.date || 0).getTime());
}
function Timeline({ events, printAssignment }) {
	const icons = {
		created: Warehouse,
		assignment: UserCheck,
		return: RotateCcw,
		location: MapPin,
		maintenance: Wrench,
		status: Activity,
		toner: Printer,
		part: Wrench,
		undo: RotateCcw
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
									children: formatDate$1(String(event.date || "").slice(0, 10))
								})]
							}), event.record && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "mt-3",
								size: "sm",
								variant: "outline",
								onClick: () => printAssignment(event.record),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "ml-2 size-4" }), "طباعة نموذج التسليم"]
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

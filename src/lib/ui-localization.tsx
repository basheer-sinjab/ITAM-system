import { useEffect } from "react";
import { isArabicLanguage, odooRuntime } from "./odoo-runtime";

const ARABIC_TO_ENGLISH: Record<string, string> = {
  "لوحة التحكم": "Dashboard",
  الأصول: "Assets",
  الصيانة: "Maintenance",
  المخزون: "Inventory",
  التراخيص: "Licenses",
  "الموظفون والأقسام": "Employees & Departments",
  التقارير: "Reports",
  الإعدادات: "Settings",
  الحساب: "Account",
  "تسجيل الخروج": "Sign out",
  "البحث العام": "Global search",
  "بحث عام في النظام": "Search the entire system",
  "ابحث عن أصل، موظف، ترخيص، صيانة أو عنصر مخزون…":
    "Search for an asset, employee, license, maintenance record, or inventory item…",
  "اكتب حرفين على الأقل للبحث في كل النظام.":
    "Enter at least two characters to search the entire system.",
  "لا توجد نتائج مطابقة للبحث.": "No results match your search.",
  "لا توجد نتائج مطابقة.": "No matching results.",
  "اكتب للبحث في": "Type to search in",
  "صنفًا. تظهر أول 8 نتائج مطابقة.":
    "records. The first 8 matching results are shown.",
  "لوحة التحكم — PrintersFloss": "Dashboard — ITAMFloss",
  "الإعدادات — ITAMFloss": "Settings — ITAMFloss",
  "نظرة تشغيلية على أصول تقنية المعلومات.":
    "An operational overview of your IT assets.",
  "متابعة واضحة للأجهزة والصيانة والمخزون والتراخيص من نقطة واحدة.":
    "Track devices, maintenance, inventory, and licenses in one place.",
  "إجمالي الأصول": "Total assets",
  "أصول نشطة": "Active assets",
  "تحت الصيانة": "Under maintenance",
  "مخزون منخفض": "Low stock",
  "تراخيص قريبة": "Licenses expiring soon",
  "صحة بيئة التقنية": "IT environment health",
  "المخزون والتراخيص والضمانات في وضع مستقر.":
    "Inventory, licenses, and warranties are in a stable state.",
  "تحتاج انتباه": "Needs attention",
  "تحتاج متابعة": "Needs follow-up",
  "تحتاج مراجعة": "Needs review",
  "تنبيهات تحتاج انتباه": "Alerts requiring attention",
  "لا توجد تنبيهات حالياً": "There are currently no alerts.",
  "يمكن تشغيلها من إعدادات التنبيهات.":
    "They can be enabled in alert settings.",
  "تنتهي خلال 30 يوماً": "Expires within 30 days",
  "ينتهي خلال": "Expires in",
  "ينتهي:": "Expires:",
  يوم: "days",
  "أو أقل": "or less",
  "إجراءات سريعة": "Quick actions",
  "اختصارات لأكثر العمليات استخداماً":
    "Shortcuts for the most common operations",
  "إضافة أصل": "Add asset",
  "إضافة عنصر للمخزون": "Add inventory item",
  "إضافة سجل صيانة": "Add maintenance record",
  "إضافة ترخيص": "Add license",
  "استعراض الأصول": "Browse assets",
  "آخر أعمال الصيانة": "Recent maintenance",
  "ستظهر هنا آخر الأعمال فور إنشاء سجل صيانة.":
    "Recent work will appear here after a maintenance record is created.",
  "لا توجد أعمال صيانة مسجلة": "No maintenance work has been recorded.",
  "آخر 100 عملية تمت داخل النظام": "Latest 100 operations in the system",
  "سجل النشاط": "Activity log",
  "إجمالي السجلات": "Total records",
  "تحديث مباشر للعمليات التقنية": "Live technical operations update",
  "جاري التحميل…": "Loading…",
  "جارٍ التحميل…": "Loading…",
  "جارٍ تحميل لوحة التحكم...": "Loading dashboard…",

  "إدارة أصول تقنية": "IT asset management",
  "التسليم والإرجاع والصيانة وتغيّر الحالة في مكان واحد":
    "Assignments, returns, maintenance, and status changes in one place",
  "تسجيل جهاز جديد": "Register a new device",
  "بحث بالاسم أو الرقم التسلسلي…": "Search by name or serial number…",
  الكل: "All",
  الأرشيف: "Archive",
  مؤرشف: "Archived",
  مؤرشفة: "Archived",
  نشط: "Active",
  نشطة: "Active",
  "غير نشط": "Inactive",
  "خارج الخدمة": "Out of service",
  متقاعد: "Retired",
  "عرض الكل": "View all",
  "عرض جميع الأجهزة": "View all devices",
  "لا توجد بيانات.": "No data.",
  "لا توجد أصول معيّنة.": "No assigned assets.",
  "غيّر البحث أو الحالة، أو أضف سجل صيانة جديدًا.":
    "Change the search or status, or add a new maintenance record.",
  "اسم الأصل": "Asset name",
  "اسم الأصل *": "Asset name *",
  "اسم الأصل مطلوب": "Asset name is required.",
  "رقم الأصل": "Asset ID",
  "رقم الأصل (يتولد تلقائياً إن ترك فارغاً)":
    "Asset ID (generated automatically when left blank)",
  "نوع الأصل": "Asset type",
  "نوع الجهاز": "Device type",
  "الشركة المصنّعة": "Manufacturer",
  المصنّع: "Manufacturer",
  الموديل: "Model",
  "الرقم التسلسلي": "Serial number",
  "حالة الأصل": "Asset status",
  المكان: "Location",
  "مكان الحفظ": "Storage location",
  "تاريخ الشراء": "Purchase date",
  "انتهاء الضمان": "Warranty expiry",
  ضمان: "Warranty",
  ملاحظات: "Notes",
  "ملاحظة اختيارية": "Optional note",
  "بدون مصنّع أو موديل": "No manufacturer or model",
  "غير محدد": "Not specified",
  "قسم غير محدد": "No department specified",
  "بدون قسم": "No department",
  "أصل غير متوفر": "Asset unavailable",
  "أصل غير معروف": "Unknown asset",
  "أصل غير موجود": "Asset not found.",
  "الأصل غير موجود": "Asset not found.",
  "الأصل غير موجود أو مؤرشف": "Asset not found or archived.",
  "الأصل مسلّم حاليًا إلى": "Asset currently assigned to",
  "الموظف الحالي:": "Current employee:",
  "هذا الأصل مؤرشف منذ": "This asset has been archived since",
  حفظ: "Save",
  "تم حفظ الأصل": "Asset saved.",
  "تعديل أصل": "Edit asset",
  إضافة: "Add",
  تعديل: "Edit",
  حذف: "Delete",
  إزالة: "Remove",
  إغلاق: "Close",
  إلغاء: "Cancel",
  تراجع: "Undo",
  تأكيد: "Confirm",
  تم: "Done",
  العودة: "Back",
  الرئيسية: "Home",
  "العودة للرئيسية": "Back to home",
  "إعادة المحاولة": "Try again",
  "تعذر تحميل الصفحة": "Unable to load the page",
  "حدث خطأ غير متوقع. يمكنك المحاولة مرة أخرى أو العودة للرئيسية.":
    "An unexpected error occurred. Try again or return to the home page.",
  "الصفحة غير موجودة": "Page not found",
  "الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.":
    "The page you are looking for is unavailable or has moved.",
  "حذف الأصل": "Delete asset",
  "حذف الأصل نهائيًا؟": "Delete this asset permanently?",
  "حذف نهائي": "Delete permanently",
  "يجب أرشفة الأصل قبل حذفه نهائيًا":
    "The asset must be archived before permanent deletion.",
  أرشفة: "Archive",
  "أرشفة الأصل؟": "Archive this asset?",
  "تأكيد الأرشفة": "Confirm archive",
  "تمت أرشفة الأصل مع الاحتفاظ بسجلاته":
    "The asset was archived and its history was retained.",
  "استعادة من الأرشيف": "Restore from archive",
  "تمت استعادة الأصل من الأرشيف": "The asset was restored from archive.",
  "تأكيد الاستعادة": "Confirm restore",
  تسليم: "Assign",
  "تسليم الأصل": "Assign asset",
  "تسليم وحفظ النموذج": "Assign and save form",
  "اختر الموظف المستلم": "Select the receiving employee",
  "اختر الموظف": "Select employee",
  "اختر القسم": "Select department",
  "تاريخ التسليم": "Assignment date",
  "حدد تاريخ التسليم": "Select assignment date",
  "ملاحظات التسليم (اختياري)": "Assignment notes (optional)",
  "تم تسليم الأصل بنجاح": "Asset assigned successfully.",
  "تم تسليم الأصل وحفظ نموذج التسليم":
    "The asset was assigned and the handover form was saved.",
  "طباعة نموذج التسليم": "Print handover form",
  "طباعة أو حفظ PDF": "Print or save as PDF",
  "اسمح بفتح نافذة الطباعة من المتصفح":
    "Allow the browser to open the print window.",
  إرجاع: "Return",
  "إرجاع الأصل": "Return asset",
  "تأكيد إرجاع الأصل": "Confirm asset return",
  "تاريخ الإرجاع": "Return date",
  "حدد تاريخ الإرجاع": "Select return date",
  "حالة الأصل عند الإرجاع": "Asset condition on return",
  "حدد حالة الأصل عند الإرجاع": "Select the asset condition on return",
  "ملاحظة الإرجاع (اختياري)": "Return note (optional)",
  سليم: "Good",
  "يحتاج صيانة": "Needs maintenance",
  متضرر: "Damaged",
  تالفة: "Damaged",
  "تم الإرجاع": "Returned",
  "تعذر إرجاع الأصل": "Unable to return the asset.",
  "الأصل غير مسلّم إلى موظف حاليًا":
    "The asset is not currently assigned to an employee.",
  "تاريخ الإرجاع لا يمكن أن يسبق تاريخ التسليم":
    "The return date cannot be earlier than the assignment date.",
  سجل: "Record",
  "سجل الصيانة": "Maintenance history",
  "سجلات الصيانة": "Maintenance records",
  "سجل الحركة": "Movement history",
  "سجل التراخيص": "License history",
  مواصفات: "Specifications",
  "مواصفات الجهاز": "Device specifications",
  "مواصفات الكمبيوتر": "Computer specifications",
  "إضافة المواصفات": "Add specifications",
  "تعديل المواصفات": "Edit specifications",
  "تم حفظ مواصفات الكمبيوتر": "Computer specifications saved.",
  المعالج: "Processor",
  الذاكرة: "Memory",
  التخزين: "Storage",
  "كرت الشاشة": "Graphics card",
  "نظام التشغيل": "Operating system",
  "مثال: Intel Core i5": "Example: Intel Core i5",
  "مثال: 16 GB": "Example: 16 GB",
  "مثال: SSD 512 GB": "Example: SSD 512 GB",
  "مثال: Windows 11 Pro": "Example: Windows 11 Pro",

  "إدارة المخزون": "Inventory management",
  "متابعة الكميات بطريقة سهلة وواضحة": "Track quantities simply and clearly",
  "إذا أخذت شيئًا اضغط «استخدم»، وإذا وصلتك كمية اضغط «زود الكمية».":
    "Use “Consume” when stock is taken, and “Add quantity” when stock arrives.",
  "ابحث في المخزون": "Search inventory",
  "ابحث بالاسم أو النوع أو الموقع": "Search by name, type, or location",
  "لا توجد عناصر.": "No inventory items.",
  "لا توجد عناصر مطابقة": "No matching items.",
  "لا توجد عناصر مطابقة.": "No matching items.",
  "جرّب تغيير عبارة البحث أو أضف عنصرًا جديدًا.":
    "Change the search term or add a new item.",
  "اسم العنصر": "Item name",
  "اسم العنصر مطلوب": "Item name is required.",
  العنصر: "Item",
  عنصر: "Item",
  "عنصر مخزون": "Inventory item",
  "عناصر المخزون": "Inventory items",
  "تفاصيل العنصر وسجل حركاته": "Item details and movement history",
  التصنيف: "Category",
  أحبار: "Toners",
  حبر: "Toner",
  "قطع وأدوات": "Parts & tools",
  "قطعة غيار": "Spare part",
  المستهلكات: "Consumables",
  مستهلكات: "Consumables",
  "لون الحبر": "Toner color",
  "اختر لون الحبر": "Select toner color",
  "اختيار اللون": "Choose color",
  أسود: "Black",
  أصفر: "Yellow",
  أرجواني: "Magenta",
  سماوي: "Cyan",
  أخرى: "Other",
  الكمية: "Quantity",
  "إجمالي الكمية": "Total quantity",
  "الكمية الحالية:": "Current quantity:",
  "الكمية الموجودة الآن": "Current on-hand quantity",
  "الكمية المتاحة": "Available quantity",
  "الكمية المتوفرة من": "Available quantity of",
  "المتوفر:": "Available:",
  المتاح: "Available",
  متاح: "Available",
  متوفر: "Available",
  "الحد الأدنى": "Minimum quantity",
  "كمية منخفضة": "Low quantity",
  "الموقع الافتراضي هو": "The default location is",
  "ويمكنك تغييره.": "and you can change it.",
  "زود الكمية": "Add quantity",
  "زود كمية": "Add quantity",
  "إضافة كمية": "Add quantity",
  استخدم: "Consume",
  استخدام: "Consume",
  "سجل الاستخدام": "Record usage",
  "تم تسجيل الاستخدام": "Usage recorded.",
  "تمت زيادة الكمية": "Quantity increased.",
  "حركة مخزون": "Inventory movement",
  "سجل حركة المخزون": "Inventory movement history",
  "عدد الحركات": "Movement count",
  "لا توجد حركة مسجلة لهذا العنصر.":
    "No movement has been recorded for this item.",
  "لا توجد حركات مسجلة لهذا العنصر.":
    "No movements have been recorded for this item.",
  "قد يؤثر الحذف على السجلات المرتبطة بهذا العنصر.":
    "Deletion may affect records linked to this item.",
  "حذف العنصر؟": "Delete this item?",
  "حذف عنصر المخزون": "Delete inventory item",
  "تم حذف العنصر من المخزون": "The inventory item was deleted.",
  "لا يمكن الحذف — العنصر مستخدم في سجلات أخرى":
    "Cannot delete — this item is used by other records.",
  "صورة المنتج": "Product image",
  "إزالة الصورة": "Remove image",
  "لم يتم اختيار صورة": "No image selected",
  "يجب اختيار صورة لا يتجاوز حجمها 10 ميغابايت":
    "Select an image no larger than 10 MB.",

  "إدارة المقاعد والتعيينات": "Manage seats and assignments",
  "اضغط على أي ترخيص لعرض تفاصيله وتعييناته":
    "Select a license to view its details and assignments.",
  "لا توجد تراخيص بعد": "No licenses yet",
  "أضف أول ترخيص لتبدأ متابعة المقاعد والتعيينات.":
    "Add your first license to start tracking seats and assignments.",
  "اسم الترخيص": "License name",
  "اسم الترخيص مطلوب": "License name is required.",
  الترخيص: "License",
  ترخيص: "License",
  المنتج: "Product",
  "بدون منتج محدد": "No product specified",
  "نوع الترخيص": "License type",
  "مفتاح الترخيص": "License key",
  "رقم العقد": "Contract number",
  "عدد المقاعد": "Seat count",
  "إجمالي المقاعد": "Total seats",
  المقاعد: "Seats",
  "المقاعد المتاحة": "Available seats",
  "المقاعد المستخدمة": "Used seats",
  "استخدام المقاعد": "Seat usage",
  "تاريخ الانتهاء": "Expiration date",
  "بدون انتهاء محدد": "No expiration date",
  ساري: "Valid",
  منتهي: "Expired",
  "صورة الترخيص": "License image",
  "تعديل الترخيص": "Edit license",
  "تعديل ترخيص": "Edit license",
  "تمت إضافة الترخيص": "License added.",
  "تم تعديل الترخيص": "License updated.",
  "حذف الترخيص؟": "Delete this license?",
  "تم حذف الترخيص": "License deleted.",
  "تعيين الترخيص": "Assign license",
  "تعيين ترخيص": "Assign license",
  "تعيينات الترخيص": "License assignments",
  "اختر ترخيصاً": "Select a license",
  "اختر موظفًا أو أصلًا للتعيين":
    "Select an employee or asset for the assignment.",
  "تم تعيين الترخيص": "License assigned.",
  "إزالة التعيين": "Remove assignment",
  "إزالة التعيين؟": "Remove this assignment?",
  "تمت إزالة تعيين الترخيص": "License assignment removed.",
  "لا توجد تعيينات لهذا الترخيص.": "This license has no assignments.",
  "لا توجد تراخيص معيّنة.": "No assigned licenses.",
  "لا توجد مقاعد": "No seats",
  "لا توجد مقاعد متاحة في هذا الترخيص":
    "No seats are available for this license.",
  "سيعود المقعد إلى المقاعد المتاحة في هذا الترخيص.":
    "The seat will return to this license's available seats.",

  "توثيق عمل فني": "Document technical work",
  "جميع تفاصيل العملية والمواد المستخدمة في مكان واحد":
    "All work details and used materials in one place",
  "ابحث في الصيانة أو الجهاز أو الفني":
    "Search maintenance, device, or technician",
  "لا توجد سجلات صيانة مطابقة": "No matching maintenance records.",
  "لا توجد صيانات مطابقة.": "No matching maintenance records.",
  "سجل صيانة": "Maintenance record",
  "سجل صيانة للأصل.": "Maintenance record for the asset.",
  "تعديل سجل الصيانة": "Edit maintenance record",
  "تعديل السجل": "Edit record",
  "حذف سجل الصيانة": "Delete maintenance record",
  "حذف سجل الصيانة؟": "Delete this maintenance record?",
  "سيتم حذف السجل وإرجاع المواد المستخدمة إلى المخزون.":
    "The record will be deleted and used materials returned to inventory.",
  "تمت إضافة سجل الصيانة": "Maintenance record added.",
  "تم تعديل سجل الصيانة": "Maintenance record updated.",
  "تم حذف سجل الصيانة وإرجاع مواده إلى المخزون":
    "Maintenance record deleted and its materials returned to inventory.",
  "نوع الصيانة": "Maintenance type",
  تصحيحية: "Corrective",
  إصلاح: "Repair",
  "استبدال قطعة": "Part replacement",
  تنظيف: "Cleaning",
  "صيانة وقائية": "Preventive maintenance",
  وقائية: "Preventive",
  "إعداد / تهيئة": "Setup / configuration",
  "تاريخ الصيانة": "Maintenance date",
  الفني: "Technician",
  "اختر الفني": "Select technician",
  التكلفة: "Cost",
  "وصف المشكلة": "Problem description",
  الحل: "Resolution",
  "بدون حل": "No resolution",
  مفتوحة: "Open",
  مغلقة: "Closed",
  "صيانة مفتوحة": "Open maintenance",
  "صيانة مغلقة": "Closed maintenance",
  "مواد وقطع الصيانة": "Maintenance materials and parts",
  "اختر من المخزون": "Select from inventory",
  "ابدأ بكتابة اسم الصنف لاختياره.": "Start typing an item name to select it.",
  "لم تُستخدم مواد من المخزون في هذا السجل.":
    "No inventory materials were used in this record.",
  "استخدام في سجل صيانة": "Use in maintenance record",
  "إرجاع بعد تعديل أو حذف سجل صيانة":
    "Returned after updating or deleting a maintenance record",
  "لا يمكن تغيير الأصل بعد ربط الصيانة بحبر أو قطعة":
    "The asset cannot be changed after toner or a part is linked to maintenance.",
  "الأصل المرتبط بالصيانة غير موجود":
    "The asset linked to maintenance was not found.",
  "سجل الصيانة غير موجود": "Maintenance record not found.",
  "سجل الصيانة غير موجود.": "Maintenance record not found.",

  "تركيب الأحبار": "Toner installations",
  "تركيب حبر": "Install toner",
  "تغيير حبر": "Replace toner",
  "اختر الحبر": "Select toner",
  "اختر حبرًا من المخزون": "Select toner from inventory",
  "اختر الحبر يدويًا وسيتم خصم الكمية وتسجيل التركيب.":
    "Select toner from inventory; its quantity will be deducted and the installation recorded.",
  "لا توجد أحبار في المخزون. أضف الحبر من صفحة المخزون أولًا.":
    "No toner is available. Add toner from the inventory page first.",
  "تأكيد التركيب": "Confirm installation",
  "تم تركيب الحبر وخصم الكمية من المخزون":
    "Toner installed and deducted from inventory.",
  "تعذر تركيب الحبر": "Unable to install toner.",
  "تراجع عن تركيب حبر": "Undo toner installation",
  "التراجع عن تركيب الحبر؟": "Undo this toner installation?",
  "ستعود الكمية إلى المخزون ويبقى سجل العملية محفوظًا.":
    "The quantity will return to inventory and the operation history will remain.",
  "تم التراجع وإعادة الحبر للمخزون":
    "Installation undone and toner returned to inventory.",
  "لم يتم تسجيل تركيب أحبار لهذه الطابعة بعد.":
    "No toner installations have been recorded for this printer.",
  "تركيب قطعة": "Install part",
  "تركيب قطعة في الكمبيوتر": "Install a computer part",
  "اختر قطعة الغيار": "Select spare part",
  "اختر قطعة غيار من المخزون": "Select a spare part from inventory",
  "قطعة الغيار الجديدة": "New spare part",
  "سجل القطع القديمة": "Previous parts history",
  "ماذا تم مع القطعة القديمة؟": "What happened to the old part?",
  "حدد ما تم مع القطعة القديمة": "Select what happened to the old part",
  "رجعت للمخزون": "Returned to inventory",
  "تم التخلص منها": "Disposed",
  "بعد استبدالها": "After replacement",
  "تأكيد الاستبدال": "Confirm replacement",
  "تم تركيب القطعة": "Part installed.",
  "تم استبدال القطعة": "Part replaced.",
  "تعذر تركيب القطعة": "Unable to install the part.",
  "تراجع عن تركيب": "Undo installation",
  "التراجع عن التركيب؟": "Undo this installation?",
  "ستعود القطعة إلى المخزون، وإذا كانت بديلة فستعود القطعة القديمة إلى الجهاز.":
    "The part will return to inventory; if it was a replacement, the previous part will be restored.",
  "تم التراجع وإعادة الكمية للمخزون":
    "Installation undone and quantity returned to inventory.",
  "لم يتم تسجيل قطع مركبة في هذا الكمبيوتر بعد.":
    "No installed parts have been recorded for this computer.",
  "التركيب والاستبدال يحدّثان كمية المخزون تلقائيًا.":
    "Installation and replacement update inventory automatically.",

  "إدارة الأشخاص والأقسام": "People & department management",
  "إدارة الموظفين والأقسام والتراخيص المعيّنة":
    "Manage employees, departments, and assigned licenses",
  "بيانات مباشرة من تطبيق الموظفين والأقسام في Odoo":
    "Live data from Odoo Employees and Departments",
  "الموظفون والأقسام مُدارة مركزيًا في Odoo":
    "Employees and departments are managed centrally in Odoo",
  "أي إضافة أو تعديل في تطبيق الموظفين يظهر هنا تلقائيًا.":
    "Any change in the Employees app appears here automatically.",
  "اضغط على أي موظف لعرض أصوله وتراخيصه. الإضافة والتعديل تتم من تطبيق الموظفين في Odoo وتظهر هنا تلقائيًا.":
    "Select any employee to view assigned assets and licenses. Create and edit employees in Odoo; changes appear here automatically.",
  "فتح تطبيق الموظفين": "Open Employees app",
  "إدارة الموظفين في Odoo": "Manage employees in Odoo",
  "إدارة الأقسام في Odoo": "Manage departments in Odoo",
  "إدارة الموظف في Odoo": "Manage employee in Odoo",
  "فتح الموظف في Odoo": "Open employee in Odoo",
  "إدارة القسم في Odoo": "Manage department in Odoo",
  الموظفون: "Employees",
  الموظف: "Employee",
  موظف: "Employee",
  "موظفو القسم": "Department employees",
  "موظف في القسم": "Employee in department",
  "موظفون بدون قسم": "Employees without a department",
  "لا يوجد موظفون في هذا القسم.": "This department has no employees.",
  "الاسم الكامل": "Full name",
  "الاسم الكامل مطلوب": "Full name is required.",
  "اسم الموظف": "Employee name",
  "رقم الموظف": "Employee number",
  "الرقم الوظيفي": "Employee number",
  "بدون رقم وظيفي": "No employee number",
  "عرض ملف الموظف": "View employee profile",
  "مثال: EMP-001": "Example: EMP-001",
  "البريد الإلكتروني": "Email",
  "رقم الهاتف": "Phone number",
  "رقم التواصل": "Contact number",
  الحالة: "Status",
  "إضافة موظف": "Add employee",
  "تعديل الموظف": "Edit employee",
  "تمت إضافة الموظف": "Employee added.",
  "تم تعديل الموظف": "Employee updated.",
  "تم تعديل الموظف ونقل أصوله إلى القسم الجديد":
    "Employee updated and assigned assets moved to the new department.",
  "حذف الموظف؟": "Delete this employee?",
  "تم حذف الموظف": "Employee deleted.",
  "وإلغاء ربط أصوله وتراخيصه.": "and unlink their assets and licenses.",
  الأقسام: "Departments",
  أقسام: "Departments",
  القسم: "Department",
  قسم: "Department",
  "اسم القسم": "Department name",
  "اسم القسم مطلوب": "Department name is required.",
  "لون القسم": "Department color",
  "وصف القسم": "Department description",
  "لا يوجد وصف للقسم.": "No department description.",
  "إضافة قسم": "Add department",
  "تعديل القسم": "Edit department",
  "تمت إضافة القسم": "Department added.",
  "تم تعديل القسم": "Department updated.",
  "حذف القسم؟": "Delete this department?",
  "تم حذف القسم": "Department deleted.",
  "وسيبقى موظفوه بدون قسم.": "Its employees will remain without a department.",
  الفنيون: "Technicians",
  فني: "Technician",
  "الأصول الحالية": "Current assets",
  "الأصول المعيّنة": "Assigned assets",
  "أصول معيّنة": "Assigned assets",
  "التراخيص المعيّنة": "Assigned licenses",
  "نوع غير محدد": "Unspecified type",
  "مكان غير محدد": "Unspecified location",
  "تاريخ التعيين:": "Assignment date:",

  "تقارير موحدة من بيانات النظام الحالية":
    "Unified reports from current system data",
  "ابحث داخل التقرير": "Search within the report",
  تقرير: "Report",
  إجمالي: "Total",
  "عدد العناصر": "Item count",
  عرض: "View",
  "تصدير البيانات": "Export data",
  "استيراد وتصدير": "Import & export",
  "استيراد وتصدير Excel": "Excel import & export",
  "استيراد ملف": "Import file",
  "بصيغة متوافقة مع Excel": "in an Excel-compatible format",
  "نستخدم ملفات CSV التي تفتح مباشرة في Excel، بدون حقول مالية أو موردين.":
    "We use CSV files that open directly in Excel, without financial or vendor fields.",
  "عند الاستيراد، يتجاوز النظام السجلات المكررة أو الصفوف الناقصة ويعرض لك ملخصًا واضحًا.":
    "During import, duplicate or incomplete rows are skipped and a clear summary is shown.",
  "قائمة الموظفين للعرض والتصدير فقط؛ الإضافة والتعديل تتم من تطبيق الموظفين في Odoo.":
    "The employee list is read-only and exportable; manage records in Odoo Employees.",
  "تنزيل نموذج فارغ": "Download blank template",

  "ضبط القوائم الأساسية والتنبيهات والنسخ الاحتياطي.":
    "Configure master lists, alerts, and backups.",
  "إدارة الفنيين والتنبيهات والبيانات المحلية.":
    "Manage technicians, alerts, and local data.",
  "القوائم الأساسية وتنبيهات النظام والنسخ الاحتياطي":
    "Master lists, system alerts, and backups",
  التنبيهات: "Alerts",
  "إعدادات التنبيهات": "Alert settings",
  "تنبيهات لوحة التحكم": "Dashboard alerts",
  "إظهار تنبيهات النقص والضمان داخل النظام":
    "Show stock and warranty alerts in the system",
  "التنبيه قبل انتهاء الضمان (أيام)": "Warranty expiry alert (days)",
  "نبّهني عندما تصل كمية أي عنصر إلى":
    "Alert me when an item's quantity reaches",
  "حفظ الإعدادات": "Save settings",
  "تم حفظ الإعدادات": "Settings saved.",
  "قوالب الأجهزة": "Device templates",
  "إضافة قالب جهاز": "Add device template",
  "إضافة قالب": "Add template",
  "اسم القالب": "Template name",
  "اسم القالب مطلوب": "Template name is required.",
  "قالب الجهاز (اختياري)": "Device template (optional)",
  "بدون قالب": "No template",
  "ابدأ من قالب محفوظ": "Start from a saved template",
  "اختر القالب عند إضافة أصل لتعبئة النوع والمصنّع والموديل مباشرة.":
    "Choose a template when adding an asset to fill in type, manufacturer, and model.",
  "أضف أول قالب لجهاز تستخدمه بشكل متكرر.":
    "Add your first template for a device you use frequently.",
  "يمكنك إدارة القوالب من الإعدادات ← قوالب الأجهزة.":
    "Manage templates from Settings → Device templates.",
  "حفظ القالب": "Save template",
  "تمت إضافة القالب": "Template added.",
  "تم تعديل القالب": "Template updated.",
  "حذف القالب؟": "Delete this template?",
  "سيتم حذف قالب": "Template will be deleted:",
  "فقط ولن تتأثر الأصول المضافة منه.":
    "Only the template will be deleted; assets created from it are unaffected.",
  "تم حذف القالب": "Template deleted.",
  "النسخ الاحتياطي": "Backup",
  "النسخ الاحتياطي والاستعادة": "Backup & restore",
  "تنزيل نسخة احتياطية": "Download backup",
  "استعادة نسخة": "Restore backup",
  "يشمل جميع البيانات وصور الطابعات المحفوظة محليًا.":
    "Includes all data and stored images.",
  "تم إنشاء النسخة الاحتياطية مع الصور": "Backup created with images.",
  "تعذر إنشاء النسخة الاحتياطية": "Unable to create the backup.",
  "استعادة النسخة الاحتياطية؟": "Restore this backup?",
  "ستستبدل النسخة المختارة جميع البيانات الحالية. سينزّل النظام أولًا نسخة أمان تلقائية من البيانات الحالية.":
    "The selected backup will replace all current data. A safety backup of the current data will be downloaded first.",
  "تمت استعادة البيانات والصور": "Data and images restored.",
  "تعذرت استعادة النسخة الاحتياطية": "Unable to restore the backup.",
  "ملف النسخة الاحتياطية غير صالح": "The backup file is invalid.",
  "تنسيق النسخة الاحتياطية غير مدعوم": "The backup format is not supported.",
  "حجم ملف النسخة الاحتياطية أكبر من 200 ميغابايت":
    "The backup file is larger than 200 MB.",

  "تسجيل الدخول": "Sign in",
  "إعداد الحساب": "Account setup",
  "أدخل بيانات حسابك للوصول إلى النظام":
    "Enter your account details to access the system",
  "أنشئ كلمة المرور للدخول إلى النظام لأول مرة":
    "Create a password to access the system for the first time",
  "اسم المستخدم": "Username",
  "كلمة المرور": "Password",
  "تأكيد كلمة المرور": "Confirm password",
  دخول: "Sign in",
  "إنشاء الحساب": "Create account",
  "جارٍ الدخول...": "Signing in…",
  "جارٍ تجهيز شاشة الدخول...": "Preparing sign-in…",
  "تعذر تسجيل الدخول": "Unable to sign in.",
  "تعذر التحقق من حالة تسجيل الدخول": "Unable to verify the sign-in status.",
  "اسم المستخدم أو كلمة المرور غير صحيحة":
    "The username or password is incorrect.",
  "كلمة المرور يجب أن تكون بين 8 و128 حرفًا":
    "The password must be between 8 and 128 characters.",
  "تأكيد كلمة المرور غير مطابق": "The passwords do not match.",

  "تمت الإضافة": "Added.",
  "تم التعديل": "Updated.",
  "تم الحذف": "Deleted.",
  "تعذر الوصول إلى قاعدة البيانات": "Unable to access the database.",
  "تعذر رفع الصورة": "Unable to upload the image.",
  "تعذر حذف الصورة القديمة": "Unable to delete the previous image.",
  "صيغة الصورة غير مدعومة": "Unsupported image format.",
  "حجم الطلب أكبر من المسموح": "The request is too large.",
  تنبيه: "Alert",
};

const ENGLISH_TO_ARABIC: Record<string, string> = {
  "IT Warehouse": "المستودع IT",
  Printer: "طابعة",
  "Desktop PC": "كمبيوتر مكتبي",
  Laptop: "لابتوب",
  Monitor: "شاشة",
  "Mobile Phone": "هاتف محمول",
  "Network Device": "جهاز شبكة",
  Other: "أخرى",
  Active: "نشط",
  Inactive: "غير نشط",
  "Under Maintenance": "تحت الصيانة",
  "Out of Service": "خارج الخدمة",
  Retired: "متقاعد",
  Toner: "حبر",
  "Spare Part": "قطعة غيار",
  Consumable: "مستهلكات",
  Black: "أسود",
  Yellow: "أصفر",
  Magenta: "أرجواني",
  Cyan: "سماوي",
  Open: "مفتوحة",
  Closed: "مغلقة",
  Add: "إضافة",
  Use: "استخدام",
  Return: "إرجاع",
  Adjust: "تسوية",
  Good: "سليم",
  Damaged: "متضرر",
  "Returned to Stock": "رجعت للمخزون",
  Disposed: "تم التخلص منها",
};

const ENGLISH_PATTERNS: Array<[RegExp, (...matches: string[]) => string]> = [
  [
    /^ينتهي خلال (\d+) يوم(?:اً|ًا)?$/u,
    (_all, days) => `Expires in ${days} days`,
  ],
  [/^متبقي (\d+) يوم(?:اً|ًا)?$/u, (_all, days) => `${days} days remaining`],
  [
    /^تم عرض (\d+) من أصل (\d+)$/u,
    (_all, shown, total) => `Showing ${shown} of ${total}`,
  ],
  [/^(\d+) أصل$/u, (_all, count) => `${count} assets`],
  [/^(\d+) عنصر$/u, (_all, count) => `${count} items`],
  [/^(\d+) موظف$/u, (_all, count) => `${count} employees`],
  [/^(\d+) قسم$/u, (_all, count) => `${count} departments`],
  [/^(\d+) ترخيص$/u, (_all, count) => `${count} licenses`],
  [/^معيّن لـ (.+)$/u, (_all, value) => `Assigned to ${value}`],
  [/^لدى (.+)$/u, (_all, value) => `With ${value}`],
  [
    /^المتوفر حاليًا:? (.+)$/u,
    (_all, value) => `Currently available: ${value}`,
  ],
  [/^تم إرجاع الأصل إلى (.+)$/u, (_all, value) => `Asset returned to ${value}`],
  [/^تم تسليم الأصل إلى (.+)$/u, (_all, value) => `Asset assigned to ${value}`],
  [/^تم تسجيل (.+)$/u, (_all, value) => `${value} recorded`],
  [/^حذف (.+)؟$/u, (_all, value) => `Delete ${value}?`],
];

const ARABIC_PATTERNS: Array<[RegExp, (...matches: string[]) => string]> = [
  [/^With (.+)$/u, (_all, value) => `لدى ${value}`],
];

export function uiText(arabic: string, english: string) {
  return isArabicLanguage() ? arabic : english;
}

export function localizeUiValue(value: string) {
  const leading = value.match(/^\s*/u)?.[0] ?? "";
  const trailing = value.match(/\s*$/u)?.[0] ?? "";
  const content = value.trim();
  if (!content) return value;

  if (isArabicLanguage()) {
    const translated = ENGLISH_TO_ARABIC[content];
    if (translated) return `${leading}${translated}${trailing}`;
    for (const [pattern, translate] of ARABIC_PATTERNS) {
      const match = content.match(pattern);
      if (match) return `${leading}${translate(...match)}${trailing}`;
    }
    return value;
  }

  const exact = ARABIC_TO_ENGLISH[content];
  if (exact) return `${leading}${exact}${trailing}`;
  for (const [pattern, translate] of ENGLISH_PATTERNS) {
    const match = content.match(pattern);
    if (match) return `${leading}${translate(...match)}${trailing}`;
  }
  return value;
}

const ATTRIBUTES = ["alt", "aria-label", "placeholder", "title"] as const;

function localizeElement(element: Element) {
  if (element.closest("[data-itam-no-translate]")) return;
  for (const attribute of ATTRIBUTES) {
    const current = element.getAttribute(attribute);
    if (current === null) continue;
    const localized = localizeUiValue(current);
    if (localized !== current) element.setAttribute(attribute, localized);
  }
}

function localizeNode(node: Node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const parent = node.parentElement;
    if (!parent || parent.closest("script, style, [data-itam-no-translate]"))
      return;
    const current = node.nodeValue ?? "";
    const localized = localizeUiValue(current);
    if (localized !== current) node.nodeValue = localized;
    return;
  }
  if (!(node instanceof Element)) return;
  localizeElement(node);
  const walker = document.createTreeWalker(
    node,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
  );
  while (walker.nextNode()) {
    const current = walker.currentNode;
    if (current.nodeType === Node.TEXT_NODE) localizeNode(current);
    else if (current instanceof Element) localizeElement(current);
  }
}

export function OdooUiLocalizer() {
  useEffect(() => {
    if (!odooRuntime()) return;
    document.documentElement.lang = isArabicLanguage() ? "ar" : "en";
    document.documentElement.dir = isArabicLanguage() ? "rtl" : "ltr";
    document.title = "ITAMFloss";
    localizeNode(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") localizeNode(mutation.target);
        else if (mutation.type === "attributes") {
          if (mutation.target instanceof Element)
            localizeElement(mutation.target);
        } else {
          for (const node of mutation.addedNodes) localizeNode(node);
        }
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...ATTRIBUTES],
    });
    return () => observer.disconnect();
  }, []);

  return null;
}

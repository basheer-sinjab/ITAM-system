import { IT_WAREHOUSE } from "./locations";
import { isArabicLanguage, odooRuntime } from "./odoo-runtime";
import { localizeUiValue, uiText } from "./ui-localization";

type RowValue = string | number | boolean | null | undefined | Row;
interface Row {
  [key: string]: RowValue;
}

type AssignmentDocumentInput = {
  asset: Row;
  record: Row;
  person: Row;
  departmentName?: string | null;
  specs?: Row | null;
  logoUrl: string;
};

function escapeHtml(value: unknown, fallback = "—") {
  const text = String(value ?? "").trim() || fallback;
  return text.replace(
    /[&<>"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character] ??
      character,
  );
}

function formatDate(value: unknown) {
  const text = String(value ?? "").trim();
  if (!text) return "—";
  const date = new Date(`${text.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return escapeHtml(text);
  return new Intl.DateTimeFormat(
    isArabicLanguage() ? "ar-SA-u-ca-gregory" : "en-GB",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ).format(date);
}

function field(
  label: string,
  value: unknown,
  wide = false,
  leftToRight = false,
) {
  return `<div class="info-card${wide ? " info-card--wide" : ""}${leftToRight ? " info-card--ltr" : ""}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function isComputer(assetType: unknown) {
  const type = String(assetType ?? "")
    .trim()
    .toLowerCase();
  return (
    type === "desktop pc" ||
    type === "pc" ||
    type === "laptop" ||
    type.includes("notebook") ||
    type.includes("desktop") ||
    type.includes("كمبيوتر") ||
    type.includes("لابتوب")
  );
}

export function buildAssignmentDocument({
  asset,
  record,
  person,
  departmentName,
  specs,
  logoUrl,
}: AssignmentDocumentInput) {
  const arabic = isArabicLanguage();
  const t = uiText;
  const representativeName = odooRuntime()?.username?.trim() || "";
  const reference = String(record.id ?? "")
    .replaceAll("-", "")
    .slice(0, 10)
    .toUpperCase();
  const rawSourceLocation = String(
    asset.source_location || IT_WAREHOUSE,
  ).trim();
  const sourceLocation = ["IT Warehouse", "المستودع IT"].includes(
    rawSourceLocation,
  )
    ? "IT Warehouse"
    : localizeUiValue(rawSourceLocation);
  const assetFields = [
    field(t("اسم الأصل", "Asset name"), asset.name),
    field(t("رقم الأصل", "Asset ID"), asset.asset_id),
    field(
      t("نوع الجهاز", "Device type"),
      localizeUiValue(String(asset.asset_type || "")),
    ),
    field(t("الشركة المصنّعة", "Manufacturer"), asset.manufacturer),
    field(t("الموديل", "Model"), asset.model),
    field(t("الرقم التسلسلي", "Serial number"), asset.serial_number),
  ].join("");
  const employeeFields = [
    field(t("اسم الموظف", "Employee name"), person.full_name, true),
    field(t("الرقم الوظيفي", "Employee number"), person.employee_number),
    field(t("القسم", "Department"), departmentName),
    field(t("البريد الإلكتروني", "Email"), person.email),
    field(t("رقم التواصل", "Contact number"), person.phone, false, true),
  ].join("");
  const specsSection = isComputer(asset.asset_type)
    ? `<section class="section"><div class="section-heading"><h2>${t("المواصفات التقنية", "Technical specifications")}</h2><p>${t("المواصفات المسجلة للجهاز وقت التسليم", "Specifications recorded at the time of handover")}</p></div><div class="spec-grid">${[
        field(t("المعالج", "Processor"), specs?.processor),
        field(t("الذاكرة", "Memory"), specs?.memory),
        field(t("التخزين", "Storage"), specs?.storage),
        field(t("كرت الشاشة", "Graphics card"), specs?.graphics_card),
        field(
          t("نظام التشغيل", "Operating system"),
          specs?.operating_system,
          true,
        ),
      ].join(
        "",
      )}</div>${specs?.notes ? `<div class="spec-note"><span>${t("ملاحظات المواصفات", "Specification notes")}</span><strong>${escapeHtml(specs.notes)}</strong></div>` : ""}</section>`
    : "";
  const notes = String(record.notes ?? "").trim();

  return `<!doctype html>
<html lang="${arabic ? "ar" : "en"}" dir="${arabic ? "rtl" : "ltr"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${t("نموذج تسليم", "Asset handover")} ${escapeHtml(asset.asset_id)}</title>
  <style>
    @page{size:A4;margin:0}
    :root{--accent:#315d80;--accent-soft:#eef4f8;--ink:#18232d;--muted:#66727d;--line:#cbd4dc;--panel:#f7f9fb}
    *{box-sizing:border-box}
    body{margin:0;background:#edf1f4;color:var(--ink);font-family:Tahoma,"Segoe UI",Arial,sans-serif;font-size:11.5px;line-height:1.6;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .toolbar{display:flex;justify-content:center;padding:14px}
    .toolbar button{border:0;border-radius:8px;background:var(--accent);color:#fff;cursor:pointer;font:700 12px Tahoma;padding:9px 24px;box-shadow:0 3px 10px rgba(49,93,128,.18)}
    .sheet{width:210mm;min-height:297mm;margin:0 auto 24px;background:#fff;border-radius:12px;box-shadow:0 12px 36px rgba(24,35,45,.14);padding:13mm 14mm 10mm}
    .header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-bottom:9px;border-bottom:2px solid var(--accent)}
    .logo{display:grid;width:44px;height:44px;place-items:center;border:1px solid var(--line);border-radius:9px;background:#fff}
    .logo img{width:34px;height:34px;object-fit:contain}
    .header-department{text-align:${arabic ? "left" : "right"}}
    .header-department strong{display:block;color:var(--accent);font-size:13.5px}
    .header-department span{display:block;margin-top:2px;color:var(--muted);font-size:9.5px}
    .title-block{text-align:center;padding:12px 0 10px;border-bottom:1px solid var(--line)}
    .title-block h1{margin:0;color:var(--accent);font-size:21px;line-height:1.35}
    .title-block span{display:block;margin-top:3px;color:var(--muted);font-size:9.5px}
    .control-table{display:grid;grid-template-columns:repeat(3,1fr);margin-top:11px;overflow:hidden;border:1px solid var(--line);border-radius:8px}
    .control-item{display:grid;grid-template-columns:auto 1fr;align-items:stretch;min-height:35px;border-${arabic ? "left" : "right"}:1px solid var(--line)}
    .control-item:last-child{border-${arabic ? "left" : "right"}:0}
    .control-item span{display:flex;align-items:center;border-${arabic ? "left" : "right"}:1px solid var(--line);background:var(--panel);padding:5px 7px;color:var(--muted);font-size:8.8px}
    .control-item strong{display:flex;align-items:center;padding:5px 7px;font-size:10px;overflow-wrap:anywhere}
    .intro{margin:10px 0 0;text-align:justify;font-size:10px}
    .section{margin-top:11px;break-inside:avoid}
    .section-heading{display:flex;align-items:baseline;justify-content:space-between;gap:14px;margin-bottom:0;border:1px solid var(--line);border-${arabic ? "right" : "left"}:3px solid var(--accent);border-radius:7px 7px 0 0;background:var(--panel);padding:5px 7px}
    .section-heading h2{margin:0;color:var(--accent);font-size:12.5px}
    .section-heading p{margin:0;color:var(--muted);font-size:8.5px}
    .info-grid,.spec-grid{display:grid;grid-template-columns:repeat(2,1fr);overflow:hidden;border-${arabic ? "right" : "left"}:1px solid var(--line);border-radius:0 0 7px 7px}
    .info-card{display:grid;grid-template-columns:36% 64%;min-height:37px;border-${arabic ? "left" : "right"}:1px solid var(--line);border-bottom:1px solid var(--line)}
    .info-card--wide{grid-column:span 2;grid-template-columns:18% 82%}
    .info-card span{display:flex;align-items:center;border-${arabic ? "left" : "right"}:1px solid var(--line);background:var(--panel);padding:6px 8px;color:var(--muted);font-size:8.8px}
    .info-card strong{display:flex;align-items:center;padding:6px 8px;font-size:10.3px;overflow-wrap:anywhere}
    .info-card--ltr strong{direction:ltr;unicode-bidi:embed;justify-content:flex-start;text-align:left}
    .spec-note{display:grid;grid-template-columns:18% 1fr;border:1px solid var(--line);border-top:0;border-radius:0 0 7px 7px}
    .spec-note span{border-${arabic ? "left" : "right"}:1px solid var(--line);background:var(--panel);padding:6px 8px;color:var(--muted);font-size:8.8px}
    .spec-note strong{padding:6px 8px;font-size:10px}
    .acknowledgement{border:1px solid var(--line);border-top:0;border-radius:0 0 7px 7px;background:var(--accent-soft);padding:9px 11px;text-align:justify;line-height:1.8}
    .acknowledgement>strong{color:var(--accent)}
    .delivery-notes{margin-top:7px;border-top:1px solid var(--line);padding-top:6px}
    .signatures{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:13px;break-inside:avoid}
    .signature{min-height:90px;overflow:hidden;border:1px solid var(--line);border-radius:8px;background:#fff}
    .signature strong{display:block;border-bottom:1px solid var(--line);background:var(--panel);color:var(--accent);padding:5px 8px;text-align:center;font-size:10px}
    .signature span{display:block;padding:7px 9px;color:var(--muted);font-size:9px}
    .signature-line{margin:22px 12px 0;border-top:1px solid var(--line);padding-top:4px;text-align:center;color:var(--muted);font-size:8.5px}
    .footer{display:flex;align-items:flex-end;justify-content:flex-start;margin-top:12px;border-top:1px solid var(--line);padding-top:6px;color:var(--muted);font-size:8.5px}
    @media print{
      html,body{width:210mm;min-height:297mm;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .toolbar{display:none}
      .sheet{display:flex;flex-direction:column;width:210mm;min-height:297mm;margin:0;box-shadow:none;padding:13mm 14mm 10mm}
      .section{break-inside:avoid}
      .signatures{margin-top:auto}
      .footer{margin-top:9mm}
    }
  </style>
</head>
<body>
  <div class="toolbar"><button id="itam-print-button" type="button">${t("طباعة النموذج", "Print form")}</button></div>
  <main class="sheet">
    <header class="header">
      <div class="logo"><img src="${escapeHtml(logoUrl, "")}" alt="${t("شعار النظام", "System logo")}"></div>
      <div class="header-department"><strong>${t("إدارة تقنية المعلومات", "Information Technology")}</strong><span>${t("نظام إدارة الأصول التقنية", "IT Asset Management System")}</span></div>
    </header>
    <section class="title-block"><h1>${t("نموذج استلام وتسليم أصل تقني", "IT Asset Receipt and Handover Form")}</h1><span>${t("وثيقة استلام ومسؤولية عهدة", "Asset receipt and custody record")}</span></section>
    <section class="control-table"><div class="control-item"><span>${t("مرجع النموذج", "Reference")}</span><strong>${escapeHtml(reference || asset.asset_id)}</strong></div><div class="control-item"><span>${t("تاريخ التسليم", "Handover date")}</span><strong>${formatDate(record.assignment_date)}</strong></div><div class="control-item"><span>${t("رقم الأصل", "Asset ID")}</span><strong>${escapeHtml(asset.asset_id)}</strong></div></section>
    <p class="intro">${t("يوثق هذا النموذج تسليم الأصل التقني الموضح أدناه إلى الموظف المستلم، ويُعد جزءًا من سجل العهد والأصول لدى إدارة تقنية المعلومات.", "This form documents the handover of the IT asset described below to the receiving employee and forms part of the Information Technology asset custody register.")}</p>
    <section class="section"><div class="section-heading"><h2>${t("بيانات الموظف المستلم", "Receiving employee details")}</h2><p>${t("بيانات صاحب العهدة وقت التسليم", "Custodian details at handover")}</p></div><div class="info-grid">${employeeFields}</div></section>
    <section class="section"><div class="section-heading"><h2>${t("بيانات الأصل", "Asset details")}</h2><p>${t("بيانات التعريف الأساسية للجهاز", "Asset identification details")}</p></div><div class="info-grid">${assetFields}</div></section>
    ${specsSection}
    <section class="section"><div class="section-heading"><h2>${t("إقرار الاستلام والمحافظة على العهدة", "Receipt and custody acknowledgement")}</h2><p>${t("إقرار الموظف ومسؤوليته عن الأصل", "Employee custody acknowledgement")}</p></div><div class="acknowledgement">${t("أقر أنا", "I,")} <strong>${escapeHtml(person.full_name)}</strong> ${t("باستلام الأصل الموضح في هذا النموذج بحالة صالحة للاستخدام، وأتعهد بالمحافظة عليه واستخدامه لأغراض العمل، وعدم تسليمه للغير، وإعادته إلى إدارة تقنية المعلومات عند الطلب أو عند انتهاء الحاجة إليه.", "acknowledge receipt of the asset described in this form in usable condition. I agree to safeguard it, use it for work purposes, not transfer it to others, and return it to Information Technology when requested or when it is no longer needed.")}${notes ? `<div class="delivery-notes"><strong>${t("ملاحظات التسليم:", "Handover notes:")}</strong> ${escapeHtml(notes)}</div>` : ""}</div></section>
    <section class="signatures"><div class="signature"><strong>${t("الموظف المستلم", "Receiving employee")}</strong><span>${t("الاسم:", "Name:")} ${escapeHtml(person.full_name)}</span><div class="signature-line">${t("التوقيع والتاريخ", "Signature and date")}</div></div><div class="signature"><strong>${t("إدارة تقنية المعلومات", "Information Technology")}</strong><span>${t("الاسم:", "Name:")} ${escapeHtml(representativeName)}</span><div class="signature-line">${t("التوقيع والتاريخ", "Signature and date")}</div></div></section>
    <footer class="footer"><span>${t("مصدر الأصل:", "Asset source:")} ${escapeHtml(sourceLocation)}</span></footer>
  </main>
</body>
</html>`;
}

import { IT_WAREHOUSE } from "./locations";

type RowValue = string | number | boolean | null | undefined | Row;
interface Row {
  [key: string]: RowValue;
}

type AssignmentDocumentInput = {
  asset: Row;
  record: Row;
  person: Row;
  departmentName?: string | null;
  branchName?: string | null;
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
  return new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function field(label: string, value: unknown, wide = false) {
  return `<div class="info-card${wide ? " info-card--wide" : ""}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
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
  branchName,
  specs,
  logoUrl,
}: AssignmentDocumentInput) {
  const reference = String(record.id ?? "")
    .replaceAll("-", "")
    .slice(0, 10)
    .toUpperCase();
  const destination = [departmentName, branchName].filter(Boolean).join(" - ");
  const sourceLocation = asset.source_location || IT_WAREHOUSE;
  const assignmentLocation =
    asset.delivery_location ||
    destination ||
    `لدى ${person.full_name || "الموظف"}`;
  const assetFields = [
    field("اسم الأصل", asset.name),
    field("رقم الأصل", asset.asset_id),
    field("نوع الجهاز", asset.asset_type),
    field("الشركة المصنّعة", asset.manufacturer),
    field("الموديل", asset.model),
    field("الرقم التسلسلي", asset.serial_number),
  ].join("");
  const employeeFields = [
    field("اسم الموظف", person.full_name),
    field("الرقم الوظيفي", person.employee_number),
    field("القسم", departmentName),
    field("الفرع", branchName),
    field("البريد الإلكتروني", person.email),
    field("رقم التواصل", person.phone),
  ].join("");
  const specsSection = isComputer(asset.asset_type)
    ? `<section class="section"><div class="section-heading"><span class="section-number">03</span><div><h2>المواصفات التقنية</h2><p>المواصفات المسجلة للجهاز وقت التسليم</p></div></div><div class="spec-grid">${[
        field("المعالج", specs?.processor),
        field("الذاكرة", specs?.memory),
        field("التخزين", specs?.storage),
        field("كرت الشاشة", specs?.graphics_card),
        field("نظام التشغيل", specs?.operating_system, true),
      ].join(
        "",
      )}</div>${specs?.notes ? `<div class="spec-note"><span>ملاحظات المواصفات</span><strong>${escapeHtml(specs.notes)}</strong></div>` : ""}</section>`
    : "";
  const acknowledgementNumber = isComputer(asset.asset_type) ? "04" : "03";
  const notes = String(record.notes ?? "").trim();

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>نموذج تسليم ${escapeHtml(asset.asset_id)}</title>
  <style>
    @page{size:A4;margin:9mm}
    :root{--blue:#0b5cab;--blue-2:#2563eb;--ink:#14213d;--muted:#64748b;--line:#dbe4ef;--soft:#f4f8fd}
    *{box-sizing:border-box}
    body{margin:0;background:#e8eef6;color:var(--ink);font-family:Tahoma,"Segoe UI",Arial,sans-serif;font-size:10.5px;line-height:1.55}
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
    @media print{body{background:white}.toolbar{display:none}.sheet{width:auto;min-height:auto;margin:0;border-radius:0;box-shadow:none;padding:0}.sheet:before{top:-9mm;right:-9mm;left:-9mm}.section{break-inside:avoid}}
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
  <script>window.addEventListener("load",()=>setTimeout(()=>window.print(),250));</script>
</body>
</html>`;
}

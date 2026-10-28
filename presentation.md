# ITAMFloss — Presentation Brief

## Purpose of this document

Use this document as the source brief for creating a polished presentation about **ITAMFloss**.
The presentation should explain the current product clearly to people evaluating, purchasing,
deploying, or integrating the project into an Odoo environment.

This is a product explanation, not an aggressive sales pitch. Focus on what the product is,
how it works, what it currently includes, and why its Odoo-native architecture matters.

## Language and audience

- The final presentation must be written and presented in **Arabic**.
- Keep product and technical names in English where appropriate: **ITAMFloss, Odoo 18,
  PostgreSQL, Odoo.sh, On-premise, ITAM, HR, PDF, Excel**.
- Use clear Modern Standard Arabic. Avoid overly technical language unless the slide is
  specifically about architecture or deployment.
- The audience may include company owners, IT managers, Odoo decision-makers, system
  administrators, and people evaluating the product for purchase.
- Explain the product neutrally and confidently. Do not claim features, integrations,
  certifications, performance numbers, or security guarantees that are not stated in this
  document.

## Visual identity and design direction

The presentation must use the same visual identity as the ITAMFloss application:

- Primary color: deep Odoo-style blue, approximately `#00549D`.
- Supporting colors: white, black, very light neutral backgrounds, soft borders, and restrained
  green/orange/red status accents.
- Use the existing ITAMFloss logo and application icon if available. Do not replace the brand
  with a new logo or unrelated visual system.
- Keep the visual language clean, modern, professional, and spacious.
- Use rounded cards, subtle borders, restrained shadows, simple line icons, and clear hierarchy.
- Use the existing Arabic-friendly visual feel and typography direction. Arabic text must remain
  highly legible, with comfortable line height and right-to-left layout.
- Avoid loud gradients, excessive decoration, crowded slides, generic stock photography, and
  unrelated corporate imagery.
- Use diagrams, UI-style cards, process flows, and product screenshots/mockups where they make
  the explanation clearer.

## Animation direction

Include polished, purposeful animations inside the presentation:

- Use smooth fade, rise, slide, and scale transitions for section entrances.
- Animate process flows in sequence: register asset → assign asset → maintain asset → report.
- Use subtle number or status reveals for dashboards and operational summaries.
- Use gentle card stagger animations when introducing product modules.
- Use a clean timeline animation when explaining asset history.
- Keep animations short, smooth, and professional. They should clarify the story, not distract
  from Arabic text or make the presentation feel like an advertisement.
- Respect reduced-motion preferences if the presentation format supports them.
- Do not use bouncing, spinning, flashing, or excessive parallax effects.

## Product definition

ITAMFloss is an **IT Asset Management application built as an installable module inside Odoo
18**. It gives an organization a dedicated interface for managing technology assets,
assignments, maintenance, inventory-related hardware operations, software licenses, employees,
departments, reports, and official handover documents.

The application preserves a modern React-based user interface while connecting to Odoo through
authenticated controllers, the Odoo ORM, and the PostgreSQL database used by Odoo.

The central idea to communicate is:

> ITAMFloss turns Odoo into a focused, structured IT asset management workspace while keeping
> the organization’s Odoo employees, departments, users, and database as the operational source
> of truth.

## Core value proposition

Explain that ITAMFloss helps organizations:

- Maintain one organized register of technology assets.
- Know where each asset is and who currently holds it.
- Document handover and return operations with official printable forms.
- Follow the full history of an asset through a chronological timeline.
- Record maintenance work and the responsible technician.
- Track toner and spare-part usage against inventory.
- Track software licenses and their assignments.
- Produce filtered operational reports.
- Work in Arabic or English according to the active Odoo user language.
- Deploy on Odoo.sh or on-premise infrastructure.

## Current product modules and capabilities

### 1. Asset register

Show the asset register as the foundation of the application.

Current capabilities include:

- Create and manage IT assets.
- Store asset name, asset number, type, manufacturer, model, serial number, status, location,
  purchase date, warranty expiry, notes, and image.
- Support common technology categories such as laptops, desktop computers, monitors, printers,
  and other IT equipment.
- Use asset templates to speed up recurring asset creation.
- Archive assets while retaining their operational history.
- Open a dedicated detail page for each asset.

### 2. Native Odoo employees and departments

Make this integration a prominent part of the story.

- Employees are read from Odoo’s native `hr.employee` records.
- Departments are read from Odoo’s native `hr.department` records.
- Employees and departments are not duplicated inside a separate ITAM directory.
- Employees and departments are managed from Odoo’s Employees application.
- Asset assignments and license assignments point to the existing Odoo HR records.
- Existing Odoo user relationships can be used as the organization’s identity context.

### 3. Asset handover and return

Explain the workflow visually:

1. Select an asset.
2. Select the Odoo employee receiving it.
3. Select or confirm the assignment date and details.
4. Save the assignment.
5. Generate and store the official handover document.
6. Return the asset later with its return date, condition, and notes.

Current capabilities include:

- Handover records linked to the asset and employee.
- Return records linked to the original handover.
- Current asset holder and assignment state.
- Employee details in the handover workflow.
- IT representative information based on the active Odoo user.
- Printable Arabic handover document with a formal A4 layout.
- Stored handover PDF attachment connected to the assignment record.
- Confirmation before deleting or cancelling an assignment record.
- Cancelling an incorrect active handover restores the asset’s previous state and removes the
  related handover document and timeline records.

### 4. Asset timeline

Present the timeline as the asset’s operational history.

It can show:

- Asset creation and registration.
- Handovers and returns.
- Maintenance activity.
- Status changes.
- Location changes.
- Toner installation and reversal.
- Spare-part installation, replacement, and reversal.

The timeline is ordered using the actual operation date first, followed by the operation’s
execution time and a stable tie-breaker. This makes historical events remain in their correct
chronological position even when records are entered later or backdated.

### 5. Maintenance management

Current capabilities include:

- Create preventive or corrective maintenance records.
- Record maintenance date, status, technician, cost, problem description, resolution, notes,
  and used inventory materials.
- Automatically identify the active Odoo user as the technician when a maintenance record is
  created.
- Link maintenance work to a specific asset.
- Track open and closed maintenance work.
- Reconcile used maintenance materials with inventory.
- Delete maintenance records with confirmation and return used materials to inventory.

### 6. Printer toner management

For printer assets, the application currently supports:

- Select toner items from IT inventory.
- Record installed quantity and installation date.
- Decrease inventory when toner is installed.
- Reverse an installation and return the quantity to inventory.
- Delete an installation with confirmation.
- Remove linked maintenance and timeline records when an installation is deleted.
- Prevent duplicate inventory restoration when a previously reversed installation is deleted.

### 7. Computer spare-part management

For desktop and laptop assets, the application currently supports:

- Record installed spare parts.
- Select spare parts from IT inventory.
- Reduce inventory when a part is installed.
- Replace an existing part.
- Record what happened to the old part: damaged, returned to stock, or disposed.
- Reverse a replacement and restore the previous part relationship.
- Delete a part installation with confirmation.
- Restore inventory and remove linked maintenance/timeline records when deletion is valid.

### 8. Hardware specifications

For computers, the application can store:

- Processor.
- Memory.
- Storage.
- Graphics card.
- Operating system.
- Notes.

For monitors, the application can store:

- Screen size.
- Display technology.
- Notes.

These specifications can be managed from the asset’s own page and can support more useful
asset documents and reports.

### 9. Inventory

The IT inventory area supports operational tracking for:

- Toners.
- Spare parts.
- Consumables and maintenance-related items.
- Quantity on hand.
- Stock movements such as use, return, add, and adjustment.
- Low-stock visibility and inventory-related reporting.

Inventory changes caused by toner, spare-part, and maintenance operations are reconciled with
the related operational records.

### 10. Software licenses

Current license capabilities include:

- Register software licenses.
- Store product and license information.
- Store license type, license key, contract number, seat count, expiry date, notes, and image.
- Assign licenses to Odoo employees or assets.
- Track available and assigned seats.
- Enforce the available seat limit.
- View license assignments from employee and license pages.

### 11. Reports

The reports area is designed for operational visibility rather than static data display.

Current report areas include:

- Assets.
- Custody and handovers.
- Maintenance.
- Inventory.
- Licenses.

Current reporting features include:

- Search within the selected report.
- Filters relevant to the report type.
- Status and assignment summaries.
- Operational counts and summary cards.
- Filtered result tables.
- Report-oriented views for assets, handovers, maintenance, inventory, and licenses.

### 12. Settings and data operations

Current settings and operational tools include:

- ITAM configuration settings.
- Technicians and lookup data used by the application.
- Backup and restore for application operational data.
- Excel import/export tools where supported by the current interface.
- Alert settings for low stock and warranty-related notifications.
- Activity log visibility for operational changes.

## Technical architecture

Explain the architecture with a simple diagram:

```text
Arabic/English React Interface
            ↓
Authenticated Odoo HTTP Controllers
            ↓
Odoo ORM and ITAMFloss Business Services
            ↓
Odoo PostgreSQL Database
            ↘
     Native Odoo HR Records
```

Technical points to mention:

- Installable Odoo 18 module named `itam_floss`.
- Compatible with Odoo 18 Community and Enterprise environments, subject to the target
  deployment’s normal Odoo configuration.
- Uses Odoo’s authenticated session and active user context.
- Uses Odoo ORM models rather than a separate application database.
- Stores ITAM operational data in the Odoo PostgreSQL database.
- Uses native `hr.employee` and `hr.department` records for people and departments.
- Includes compiled frontend assets inside the module package.
- Does not require Node.js on the Odoo deployment server to run the compiled interface.
- Has no Supabase dependency.
- Supports Odoo.sh and on-premise deployment patterns.
- Supports Arabic RTL and English LTR according to the active Odoo language.

## Data ownership and boundaries

Be precise about what is stored and who manages it:

- ITAMFloss owns operational records for assets, assignments, maintenance, inventory,
  installations, licenses, images, and activity history.
- Odoo Employees owns employee and department master records.
- The application does not import data from the original standalone application.
- Production installation ships without production demo records.
- Optional Odoo demo records are available for demonstration databases when enabled.
- Uploaded asset images are stored through the Odoo module’s image model and are included in
  normal database/filestore backup procedures.

## Deployment story

Show two deployment paths:

### Odoo.sh

- Keep the `itam_floss` module folder in the Git repository.
- Push the branch to the Odoo.sh project.
- Update the Apps list in the target database.
- Install or upgrade ITAMFloss.

### On-premise

- Copy the `itam_floss` folder into a custom addons directory.
- Add the custom addons directory to `addons_path`.
- Restart Odoo.
- Update the Apps list.
- Install or upgrade ITAMFloss.

The package contains the compiled frontend assets, so the target Odoo server does not need the
source project’s frontend development toolchain just to run the module.

## User journey to demonstrate

Use one coherent example throughout the presentation:

1. An IT administrator opens ITAMFloss inside Odoo.
2. They register a new laptop with its serial number and technical specifications.
3. They select an employee already managed in Odoo HR.
4. They hand over the laptop and print the official Arabic form.
5. The asset timeline records the handover.
6. A maintenance event is added later and the active Odoo user is recorded as technician.
7. A spare part is installed and inventory is updated.
8. The laptop is returned, the condition is recorded, and the timeline remains complete.
9. The IT manager filters a report to review assignments, maintenance, or inventory status.

## Suggested presentation structure

Create approximately 10–12 Arabic slides:

1. Cover: ITAMFloss — إدارة الأصول التقنية داخل Odoo.
2. The operational challenge: scattered asset, handover, maintenance, and license information.
3. The solution: one ITAM workspace inside the organization’s Odoo database.
4. How it fits into Odoo: native employees, departments, users, ORM, and PostgreSQL.
5. Asset register and asset details.
6. Handover, return, official PDF, and asset timeline.
7. Maintenance, toner, spare parts, and inventory reconciliation.
8. Software licenses and technical specifications.
9. Reports, filters, and operational visibility.
10. Deployment: Odoo.sh and on-premise.
11. A complete user journey from registration to return.
12. Closing summary: the current product capabilities and its role inside Odoo.

## Slide-writing rules

- One main idea per slide.
- Use short Arabic headings and concise supporting text.
- Prefer diagrams, cards, timelines, and UI snapshots over long paragraphs.
- Explain technical terms on first use.
- Keep the difference clear between current functionality and possible future work; this brief
  describes current functionality only.
- Do not invent customer names, deployment counts, revenue, performance benchmarks, compliance
  certifications, integrations, or roadmap commitments.
- Do not describe the product as an Odoo core module; describe it as an installable custom Odoo
  application/module.

## Final quality checklist

Before delivering the presentation, verify that:

- All visible slide text is Arabic.
- The ITAMFloss name and Odoo 18 context are clear from the beginning.
- The existing logo, blue/white/black identity, and application visual language are preserved.
- Animations are smooth, purposeful, and readable in RTL.
- The asset-to-handover-to-maintenance-to-report story is easy to follow.
- The PostgreSQL/Odoo-native architecture is explained accurately.
- Odoo.sh and on-premise deployment are both mentioned.
- No Supabase dependency is implied.
- No unsupported future features are presented as available today.
- The result feels like a professional product presentation, not a generic template.

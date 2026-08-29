import base64

from jinja2 import Environment as JinjaEnvironment, StrictUndefined

from odoo import api, fields, models, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools import file_open


IT_WAREHOUSE = "IT Warehouse"
ASSET_TYPE_SELECTION = [
    ("Printer", "Printer"),
    ("Desktop PC", "Desktop PC"),
    ("Laptop", "Laptop"),
    ("Monitor", "Monitor"),
    ("Mobile Phone", "Mobile Phone"),
    ("Network Device", "Network Device"),
    ("Other", "Other"),
]


class ITAMTechnician(models.Model):
    _name = "itam.technician"
    _description = "ITAM Technician"
    _order = "name"

    name = fields.Char(required=True, index=True)


class HrEmployee(models.Model):
    _inherit = "hr.employee"

    itam_asset_ids = fields.One2many(
        "itam.asset", "assigned_employee_id", string="Assigned IT Assets"
    )

    def write(self, values):
        previous_departments = {record.id: record.department_id for record in self}
        result = super().write(values)
        if "department_id" in values:
            for employee in self:
                if previous_departments[employee.id] != employee.department_id:
                    employee.itam_asset_ids.write(
                        {
                            "department_id": employee.department_id.id or False,
                            "location": employee._itam_asset_location(),
                        }
                    )
        return result

    def _itam_asset_location(self):
        self.ensure_one()
        department = self.department_id
        scope = [department.name] if department else []
        scope = [part for part in scope if part]
        return " - ".join(scope) if scope else _("With %s", self.name)


class ITAMAsset(models.Model):
    _name = "itam.asset"
    _description = "IT Asset"
    _order = "create_date desc, id desc"

    asset_id = fields.Char(required=True, copy=False, readonly=False, index=True)
    name = fields.Char(required=True, index=True)
    asset_type = fields.Selection(
        ASSET_TYPE_SELECTION,
        required=True,
        default="Printer",
        index=True,
    )
    manufacturer = fields.Char(index=True)
    model = fields.Char(index=True)
    serial_number = fields.Char(index=True)
    status = fields.Selection(
        [
            ("active", "Active"),
            ("inactive", "Inactive"),
            ("maintenance", "Under Maintenance"),
            ("out_of_service", "Out of Service"),
            ("retired", "Retired"),
        ],
        required=True,
        default="active",
        index=True,
    )
    location = fields.Char(required=True, default=IT_WAREHOUSE)
    department_id = fields.Many2one(
        "hr.department", ondelete="set null", index=True
    )
    assigned_employee_id = fields.Many2one(
        "hr.employee", ondelete="set null", index=True
    )
    purchase_date = fields.Date()
    warranty_expiry = fields.Date(index=True)
    image_url = fields.Char()
    notes = fields.Text()
    archived_at = fields.Datetime(index=True)
    active = fields.Boolean(default=True, index=True)

    assignment_ids = fields.One2many("itam.assignment", "asset_id")
    maintenance_ids = fields.One2many("itam.maintenance", "asset_id")
    pc_spec_ids = fields.One2many("itam.pc.spec", "asset_id")

    _sql_constraints = [
        ("itam_asset_code_unique", "unique(asset_id)", "The asset ID must be unique."),
        (
            "itam_asset_serial_unique",
            "unique(serial_number)",
            "The serial number is already assigned to another asset.",
        ),
    ]

    @api.model_create_multi
    def create(self, values_list):
        for values in values_list:
            if not values.get("asset_id"):
                asset_type = values.get("asset_type") or "Other"
                sequence_code = {
                    "Printer": "itam.asset.printer",
                    "Desktop PC": "itam.asset.desktop",
                    "Laptop": "itam.asset.laptop",
                    "Monitor": "itam.asset.monitor",
                    "Mobile Phone": "itam.asset.phone",
                    "Network Device": "itam.asset.network",
                    "Other": "itam.asset.other",
                }.get(asset_type, "itam.asset.other")
                values["asset_id"] = (
                    self.env["ir.sequence"].next_by_code(sequence_code) or _("New")
                )
            values["location"] = (values.get("location") or "").strip() or IT_WAREHOUSE
            if values.get("archived_at"):
                values["active"] = False
        return super().create(values_list)

    def write(self, values):
        if "location" in values:
            values["location"] = (values.get("location") or "").strip() or IT_WAREHOUSE
        return super().write(values)

    def unlink(self):
        handover_attachments = self.assignment_ids.mapped("handover_attachment_id")
        result = super().unlink()
        handover_attachments.exists().unlink()
        return result


class ITAMAssetTemplate(models.Model):
    _name = "itam.asset.template"
    _description = "IT Asset Template"
    _order = "asset_type, name"

    name = fields.Char(required=True)
    asset_type = fields.Selection(
        selection=ASSET_TYPE_SELECTION,
        required=True,
        default="Desktop PC",
    )
    manufacturer = fields.Char()
    model = fields.Char()
    notes = fields.Text()


class ITAMAssignment(models.Model):
    _name = "itam.assignment"
    _description = "IT Asset Assignment History"
    _order = "assignment_date desc, create_date desc"

    asset_id = fields.Many2one(
        "itam.asset", required=True, ondelete="cascade", index=True
    )
    employee_id = fields.Many2one(
        "hr.employee", ondelete="set null", index=True
    )
    employee_name = fields.Char()
    employee_number = fields.Char()
    employee_email = fields.Char()
    employee_phone = fields.Char()
    department_name = fields.Char()
    assignment_date = fields.Date(required=True, default=fields.Date.context_today)
    return_date = fields.Date()
    return_condition = fields.Selection(
        [("good", "Good"), ("maintenance", "Maintenance"), ("damaged", "Damaged")]
    )
    notes = fields.Text()
    return_notes = fields.Text()
    asset_snapshot = fields.Json(default=dict)
    handover_by_user_id = fields.Many2one(
        "res.users",
        string="IT Handover User",
        readonly=True,
        copy=False,
        ondelete="set null",
    )
    handover_by_name = fields.Char(
        string="IT Department Representative",
        readonly=True,
        copy=False,
    )
    handover_generated_at = fields.Datetime(
        string="Handover Form Generated At",
        readonly=True,
        copy=False,
    )
    handover_attachment_id = fields.Many2one(
        "ir.attachment",
        string="Stored Handover Form",
        readonly=True,
        copy=False,
        ondelete="set null",
    )

    @api.model_create_multi
    def create(self, values_list):
        for values in values_list:
            values.setdefault("handover_by_user_id", self.env.user.id)
            values.setdefault("handover_by_name", self.env.user.name)
        return super().create(values_list)

    def _ensure_handover_pdf(self):
        """Create the immutable handover PDF once, then always reuse it."""
        self.ensure_one()
        attachment = self.handover_attachment_id.exists()
        if attachment:
            return attachment

        signer = self.handover_by_user_id or self.create_uid or self.env.user
        audit_values = {}
        if not self.handover_by_user_id:
            audit_values["handover_by_user_id"] = signer.id
        if not self.handover_by_name:
            audit_values["handover_by_name"] = signer.name
        if not self.handover_generated_at:
            audit_values["handover_generated_at"] = fields.Datetime.now()
        if audit_values:
            self.write(audit_values)

        pdf_content, output_format = (
            self.env["ir.actions.report"]
            .with_context(
                force_report_rendering=True,
                report_pdf_no_attachment=True,
            )
            ._render_qweb_pdf(
                "itam_floss.action_report_itam_assignment_handover",
                res_ids=self.ids,
            )
        )
        if output_format != "pdf" or not pdf_content.startswith(b"%PDF-"):
            raise UserError(_("Odoo could not generate the handover PDF."))

        asset_code = (self.asset_snapshot or {}).get("asset_id") or self.asset_id.asset_id
        attachment = self.env["ir.attachment"].create(
            {
                "name": "ITAM-Handover-%s-%s.pdf"
                % (asset_code or "Asset", self.id),
                "type": "binary",
                "datas": base64.b64encode(pdf_content),
                "mimetype": "application/pdf",
                "res_model": self._name,
                "res_id": self.id,
            }
        )
        self.handover_attachment_id = attachment
        return attachment

    def _handover_logo_data_uri(self):
        self.ensure_one()
        with file_open(
            "itam_floss/static/app/printersfloss-header-logo.png", "rb"
        ) as logo_file:
            encoded_logo = base64.b64encode(logo_file.read()).decode("ascii")
        return "data:image/png;base64,%s" % encoded_logo

    def _handover_font_data_uri(self, filename):
        self.ensure_one()
        with file_open(
            "itam_floss/static/src/fonts/%s" % filename, "rb"
        ) as font_file:
            encoded_font = base64.b64encode(font_file.read()).decode("ascii")
        return "data:font/ttf;base64,%s" % encoded_font

    def _handover_html_context(self):
        self.ensure_one()
        lang_code = self.env.context.get("lang") or self.env.user.lang or "en_US"
        is_ar = lang_code.startswith("ar")
        snapshot = self.asset_snapshot or {}
        specifications = snapshot.get("specs") or {}
        source_location = snapshot.get("source_location") or IT_WAREHOUSE
        if source_location in {IT_WAREHOUSE, "المستودع IT"}:
            source_location = IT_WAREHOUSE

        manufacturer = snapshot.get("manufacturer") or self.asset_id.manufacturer
        model_name = snapshot.get("model") or self.asset_id.model
        manufacturer_model = " - ".join(
            value for value in (manufacturer, model_name) if value
        ) or "-"

        spec_values = {
            "processor": specifications.get("processor") or "-",
            "memory": specifications.get("memory") or "-",
            "storage": specifications.get("storage") or "-",
            "graphics_card": specifications.get("graphics_card") or "-",
            "operating_system": specifications.get("operating_system") or "-",
            "screen_size": specifications.get("screen_size") or "-",
            "display_technology": specifications.get("display_technology") or "-",
            "notes": specifications.get("notes") or "-",
        }
        asset_type = (
            snapshot.get("asset_type") or self.asset_id.asset_type or ""
        ).strip().lower()
        show_computer_specs = asset_type in {"desktop pc", "pc", "laptop"} or any(
            keyword in asset_type
            for keyword in (
                "notebook",
                "desktop",
                "laptop",
                "حاسب",
                "كمبيوتر",
                "لابتوب",
            )
        )
        show_monitor_size = not show_computer_specs and any(
            keyword in asset_type for keyword in ("monitor", "screen", "شاشة")
        )
        generated_at = self.handover_generated_at or fields.Datetime.now()
        local_generated_at = fields.Datetime.context_timestamp(self, generated_at)

        return {
            "is_ar": is_ar,
            "language": "ar" if is_ar else "en",
            "direction": "rtl" if is_ar else "ltr",
            "reference": "ITAM-ASG-%06d" % self.id,
            "logo_data_uri": self._handover_logo_data_uri(),
            "font_regular_data_uri": self._handover_font_data_uri(
                "Tajawal-Regular.ttf"
            ),
            "font_bold_data_uri": self._handover_font_data_uri(
                "Tajawal-Bold.ttf"
            ),
            "handover_date": self.assignment_date.strftime("%d / %m / %Y"),
            "generated_at": local_generated_at.strftime("%d / %m / %Y - %H:%M"),
            "source_location": source_location,
            "employee": {
                "name": self.employee_name or self.employee_id.name or "-",
                "number": self.employee_number or "-",
                "department": self.department_name or "-",
                "phone": self.employee_phone or "-",
                "email": self.employee_email or "-",
            },
            "asset": {
                "name": snapshot.get("name") or self.asset_id.name or "-",
                "id": snapshot.get("asset_id") or self.asset_id.asset_id or "-",
                "type": snapshot.get("asset_type") or self.asset_id.asset_type or "-",
                "manufacturer_model": manufacturer_model,
                "serial_number": snapshot.get("serial_number")
                or self.asset_id.serial_number
                or "-",
                "delivery_location": snapshot.get("delivery_location")
                or self.department_name
                or "-",
            },
            "specifications": spec_values,
            "has_specifications": any(value != "-" for value in spec_values.values()),
            "show_computer_specs": show_computer_specs,
            "show_monitor_size": show_monitor_size,
            "handover_notes": self.notes or "",
            "representative_name": self.handover_by_name or "-",
        }

    def _render_handover_html(self):
        self.ensure_one()
        with file_open(
            "itam_floss/report/itam_assignment_report.html", "r"
        ) as template_file:
            template_source = template_file.read()
        template = JinjaEnvironment(
            autoescape=True,
            undefined=StrictUndefined,
            trim_blocks=True,
            lstrip_blocks=True,
        ).from_string(template_source)
        return template.render(**self._handover_html_context())

    def unlink(self):
        handover_attachments = self.mapped("handover_attachment_id")
        result = super().unlink()
        handover_attachments.exists().unlink()
        return result


class IrActionsReport(models.Model):
    _inherit = "ir.actions.report"

    @api.model
    def _render_qweb_pdf(self, report_ref, res_ids=None, data=None):
        report = self._get_report(report_ref)
        if report.report_name == "itam_floss.report_itam_assignment_handover":
            record_ids = [res_ids] if isinstance(res_ids, int) else (res_ids or [])
            assignments = self.env[report.model].browse(record_ids).exists()
            if assignments:
                html_bodies = [
                    assignment._render_handover_html()
                    for assignment in assignments
                ]
                pdf_content = report._run_wkhtmltopdf(
                    html_bodies,
                    report_ref=report,
                )
                return pdf_content, "pdf"
        return super()._render_qweb_pdf(report_ref, res_ids=res_ids, data=data)


class ITAMInventoryItem(models.Model):
    _name = "itam.inventory.item"
    _description = "ITAM Inventory Item"
    _order = "name"

    name = fields.Char(required=True, index=True)
    category = fields.Selection(
        [
            ("Toner", "Toner"),
            ("Spare Part", "Spare Part"),
            ("Consumable", "Consumable"),
        ],
        required=True,
        default="Consumable",
        index=True,
    )
    color = fields.Selection(
        [
            ("black", "Black"),
            ("yellow", "Yellow"),
            ("magenta", "Magenta"),
            ("cyan", "Cyan"),
        ]
    )
    quantity = fields.Float(required=True, default=0)
    minimum_quantity = fields.Float(required=True, default=1)
    location = fields.Char(required=True, default=IT_WAREHOUSE)
    image_url = fields.Char()
    notes = fields.Text()

    _sql_constraints = [
        ("itam_inventory_quantity_nonnegative", "CHECK(quantity >= 0)", "Quantity cannot be negative."),
        (
            "itam_inventory_minimum_nonnegative",
            "CHECK(minimum_quantity >= 0)",
            "Minimum quantity cannot be negative.",
        ),
    ]

    @api.constrains("category", "color")
    def _check_toner_color(self):
        for record in self:
            if record.category == "Toner" and record.color not in {
                "black",
                "yellow",
                "magenta",
                "cyan",
            }:
                raise ValidationError(_("A toner color is required."))

    @api.model_create_multi
    def create(self, values_list):
        for values in values_list:
            values["location"] = (values.get("location") or "").strip() or IT_WAREHOUSE
        return super().create(values_list)

    def write(self, values):
        if "location" in values:
            values["location"] = (values.get("location") or "").strip() or IT_WAREHOUSE
        return super().write(values)


class ITAMMaintenance(models.Model):
    _name = "itam.maintenance"
    _description = "ITAM Maintenance"
    _order = "maintenance_date desc, create_date desc"

    reference_number = fields.Char(required=True, copy=False, readonly=True, index=True)
    asset_id = fields.Many2one(
        "itam.asset", required=True, ondelete="cascade", index=True
    )
    maintenance_date = fields.Date(required=True, default=fields.Date.context_today)
    maintenance_type = fields.Char(required=True, default="Corrective")
    status = fields.Selection(
        [("Open", "Open"), ("Closed", "Closed")],
        required=True,
        default="Closed",
        index=True,
    )
    technician = fields.Char(default=lambda self: self.env.user.name)
    cost = fields.Float(default=0)
    problem_description = fields.Text()
    resolution = fields.Text()
    notes = fields.Text()
    used_items = fields.Json(default=list)
    source_type = fields.Char()
    source_id = fields.Char()

    _sql_constraints = [
        (
            "itam_maintenance_reference_unique",
            "unique(reference_number)",
            "The maintenance reference must be unique.",
        ),
        ("itam_maintenance_cost_nonnegative", "CHECK(cost >= 0)", "Cost cannot be negative."),
    ]

    @api.model_create_multi
    def create(self, values_list):
        for values in values_list:
            if not values.get("reference_number"):
                values["reference_number"] = (
                    self.env["ir.sequence"].next_by_code("itam.maintenance")
                    or _("New")
                )
        return super().create(values_list)


class ITAMInventoryMovement(models.Model):
    _name = "itam.inventory.movement"
    _description = "ITAM Inventory Movement"
    _order = "movement_date desc, create_date desc"

    item_id = fields.Many2one(
        "itam.inventory.item", required=True, ondelete="cascade", index=True
    )
    movement_date = fields.Date(required=True, default=fields.Date.context_today)
    movement_type = fields.Selection(
        [("add", "Add"), ("use", "Use"), ("return", "Return"), ("adjust", "Adjust")],
        required=True,
        default="adjust",
    )
    quantity = fields.Float(required=True, default=0)
    note = fields.Text()
    maintenance_id = fields.Many2one(
        "itam.maintenance", ondelete="set null", index=True
    )

    _sql_constraints = [
        ("quantity_nonnegative", "CHECK(quantity >= 0)", "Quantity cannot be negative.")
    ]


class ITAMPCSpec(models.Model):
    _name = "itam.pc.spec"
    _description = "ITAM PC Specifications"

    asset_id = fields.Many2one(
        "itam.asset", required=True, ondelete="cascade", index=True
    )
    processor = fields.Char()
    memory = fields.Char()
    storage = fields.Char()
    graphics_card = fields.Char()
    operating_system = fields.Char()
    screen_size = fields.Char()
    display_technology = fields.Char()
    notes = fields.Text()

    _sql_constraints = [
        ("itam_pc_spec_asset_unique", "unique(asset_id)", "Specifications already exist for this asset.")
    ]


class ITAMPCPartInstallation(models.Model):
    _name = "itam.pc.part.installation"
    _description = "ITAM PC Part Installation"
    _order = "installed_at desc, create_date desc"

    asset_id = fields.Many2one(
        "itam.asset", required=True, ondelete="cascade", index=True
    )
    inventory_item_id = fields.Many2one(
        "itam.inventory.item", ondelete="set null", index=True
    )
    part_name = fields.Char(required=True)
    installed_at = fields.Date(required=True, default=fields.Date.context_today)
    removed_at = fields.Date()
    old_part_action = fields.Selection(
        [
            ("damaged", "Damaged"),
            ("return_to_stock", "Returned to Stock"),
            ("disposed", "Disposed"),
        ]
    )
    replacement_of_id = fields.Many2one(
        "itam.pc.part.installation", ondelete="set null"
    )
    notes = fields.Text()
    undone_at = fields.Datetime()
    maintenance_id = fields.Many2one(
        "itam.maintenance", ondelete="set null", index=True
    )


class ITAMTonerInstallation(models.Model):
    _name = "itam.toner.installation"
    _description = "ITAM Toner Installation"
    _order = "installed_at desc, create_date desc"

    asset_id = fields.Many2one(
        "itam.asset", required=True, ondelete="cascade", index=True
    )
    inventory_item_id = fields.Many2one(
        "itam.inventory.item", ondelete="set null", index=True
    )
    toner_name = fields.Char(required=True)
    quantity = fields.Float(required=True, default=1)
    installed_at = fields.Date(required=True, default=fields.Date.context_today)
    notes = fields.Text()
    undone_at = fields.Datetime()
    maintenance_id = fields.Many2one(
        "itam.maintenance", ondelete="set null", index=True
    )

    _sql_constraints = [
        ("quantity_positive", "CHECK(quantity > 0)", "Quantity must be greater than zero.")
    ]


class ITAMLicense(models.Model):
    _name = "itam.license"
    _description = "ITAM Software License"
    _order = "license_name"

    license_name = fields.Char(required=True, index=True)
    product_name = fields.Char(index=True)
    license_type = fields.Char()
    license_key = fields.Char()
    contract_number = fields.Char()
    seat_count = fields.Integer(required=True, default=1)
    expiration_date = fields.Date(index=True)
    notes = fields.Text()
    image_url = fields.Char()
    assignment_ids = fields.One2many("itam.license.assignment", "license_id")

    _sql_constraints = [
        ("itam_license_seat_count_nonnegative", "CHECK(seat_count >= 0)", "Seat count cannot be negative.")
    ]

    @api.constrains("seat_count")
    def _check_assigned_seats(self):
        for record in self:
            if record.seat_count < len(record.assignment_ids):
                raise ValidationError(
                    _(
                        "Seat count cannot be lower than the number of current assignments (%s).",
                        len(record.assignment_ids),
                    )
                )


class ITAMLicenseAssignment(models.Model):
    _name = "itam.license.assignment"
    _description = "ITAM License Assignment"
    _order = "assignment_date desc, create_date desc"

    license_id = fields.Many2one(
        "itam.license", required=True, ondelete="cascade", index=True
    )
    employee_id = fields.Many2one(
        "hr.employee", ondelete="set null", index=True
    )
    asset_id = fields.Many2one("itam.asset", ondelete="set null", index=True)
    assignment_date = fields.Date(required=True, default=fields.Date.context_today)
    notes = fields.Text()

    @api.constrains("license_id", "employee_id", "asset_id")
    def _check_assignment(self):
        for record in self:
            if not record.employee_id and not record.asset_id:
                raise ValidationError(_("Select an employee or an asset."))
            assignment_count = self.search_count(
                [("license_id", "=", record.license_id.id)]
            )
            if assignment_count > record.license_id.seat_count:
                raise ValidationError(_("No license seats are available."))


class ITAMActivityLog(models.Model):
    _name = "itam.activity.log"
    _description = "ITAM Activity Log"
    _order = "create_date desc, id desc"

    entity_type = fields.Char(required=True, index=True)
    entity_id = fields.Char(index=True)
    action = fields.Char(required=True, index=True)
    details = fields.Json(default=dict)


class ITAMSettings(models.Model):
    _name = "itam.settings"
    _description = "ITAM Settings"

    name = fields.Char(required=True, default="default")
    low_stock_threshold = fields.Float(required=True, default=2)
    dashboard_alerts_enabled = fields.Boolean(default=True)
    warranty_alert_days = fields.Integer(required=True, default=30)

    _sql_constraints = [
        ("itam_settings_name_unique", "unique(name)", "Only one settings record is allowed.")
    ]


class ITAMImage(models.Model):
    _name = "itam.image"
    _description = "ITAM Image"
    _order = "create_date desc"

    name = fields.Char(required=True)
    mimetype = fields.Char(required=True)
    data = fields.Binary(required=True, attachment=False)

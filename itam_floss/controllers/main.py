import base64
import json
import logging
import mimetypes
import os
import re
from dataclasses import dataclass
from datetime import date, datetime
from html import escape

from odoo import fields, http, _
from odoo.exceptions import AccessError, UserError, ValidationError
from odoo.http import request
from odoo.tools import file_path


_logger = logging.getLogger(__name__)
MAX_IMAGE_SIZE = 10 * 1024 * 1024
IMAGE_PATH = re.compile(r"^/itam_floss/image/(\d+)$")
ALLOWED_IMAGE_TYPES = {
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/webp",
}


@dataclass(frozen=True)
class TableSpec:
    model: str
    fields: tuple[str, ...]
    relations: dict[str, str]
    field_map: dict[str, str] | None = None
    read_only: bool = False


TABLES = {
    "technicians": TableSpec("itam.technician", ("name",), {}),
    "departments": TableSpec(
        "hr.department",
        ("name", "color", "notes"),
        {},
        {"notes": "note"},
        True,
    ),
    "employees": TableSpec(
        "hr.employee",
        (
            "employee_number",
            "full_name",
            "email",
            "phone",
            "department_id",
            "status",
            "notes",
        ),
        {"department_id": "departments"},
        {
            "employee_number": "identification_id",
            "full_name": "name",
            "email": "work_email",
            "phone": "work_phone",
            "status": "active",
        },
        True,
    ),
    "assets": TableSpec(
        "itam.asset",
        (
            "asset_id",
            "name",
            "asset_type",
            "manufacturer",
            "model",
            "serial_number",
            "status",
            "location",
            "department_id",
            "assigned_employee_id",
            "purchase_date",
            "warranty_expiry",
            "image_url",
            "notes",
            "archived_at",
        ),
        {
            "department_id": "departments",
            "assigned_employee_id": "employees",
        },
    ),
    "asset_templates": TableSpec(
        "itam.asset.template",
        ("name", "asset_type", "manufacturer", "model", "notes"),
        {},
    ),
    "assignment_history": TableSpec(
        "itam.assignment",
        (
            "asset_id",
            "employee_id",
            "employee_name",
            "employee_number",
            "employee_email",
            "employee_phone",
            "department_name",
            "assignment_date",
            "return_date",
            "return_condition",
            "notes",
            "return_notes",
            "asset_snapshot",
            "handover_by_name",
            "handover_generated_at",
        ),
        {"asset_id": "assets", "employee_id": "employees"},
    ),
    "inventory_items": TableSpec(
        "itam.inventory.item",
        (
            "name",
            "category",
            "color",
            "quantity",
            "minimum_quantity",
            "location",
            "image_url",
            "notes",
        ),
        {},
    ),
    "asset_maintenance": TableSpec(
        "itam.maintenance",
        (
            "reference_number",
            "asset_id",
            "maintenance_date",
            "maintenance_type",
            "status",
            "technician",
            "cost",
            "problem_description",
            "resolution",
            "notes",
            "used_items",
            "source_type",
            "source_id",
        ),
        {"asset_id": "assets"},
    ),
    "inventory_movements": TableSpec(
        "itam.inventory.movement",
        (
            "item_id",
            "movement_date",
            "movement_type",
            "quantity",
            "note",
            "maintenance_id",
        ),
        {
            "item_id": "inventory_items",
            "maintenance_id": "asset_maintenance",
        },
    ),
    "pc_specs": TableSpec(
        "itam.pc.spec",
        (
            "asset_id",
            "processor",
            "memory",
            "storage",
            "graphics_card",
            "operating_system",
            "screen_size",
            "display_technology",
            "notes",
        ),
        {"asset_id": "assets"},
    ),
    "pc_part_installations": TableSpec(
        "itam.pc.part.installation",
        (
            "asset_id",
            "inventory_item_id",
            "part_name",
            "installed_at",
            "removed_at",
            "old_part_action",
            "replacement_of_id",
            "notes",
            "undone_at",
            "maintenance_id",
        ),
        {
            "asset_id": "assets",
            "inventory_item_id": "inventory_items",
            "replacement_of_id": "pc_part_installations",
            "maintenance_id": "asset_maintenance",
        },
    ),
    "toner_installations": TableSpec(
        "itam.toner.installation",
        (
            "asset_id",
            "inventory_item_id",
            "toner_name",
            "quantity",
            "installed_at",
            "notes",
            "undone_at",
            "maintenance_id",
        ),
        {
            "asset_id": "assets",
            "inventory_item_id": "inventory_items",
            "maintenance_id": "asset_maintenance",
        },
    ),
    "licenses": TableSpec(
        "itam.license",
        (
            "license_name",
            "product_name",
            "license_type",
            "license_key",
            "contract_number",
            "seat_count",
            "expiration_date",
            "notes",
            "image_url",
        ),
        {},
    ),
    "license_assignments": TableSpec(
        "itam.license.assignment",
        (
            "license_id",
            "employee_id",
            "asset_id",
            "assignment_date",
            "notes",
        ),
        {
            "license_id": "licenses",
            "employee_id": "employees",
            "asset_id": "assets",
        },
    ),
    "activity_log": TableSpec(
        "itam.activity.log", ("entity_type", "entity_id", "action", "details"), {}
    ),
    "app_settings": TableSpec(
        "itam.settings",
        (
            "low_stock_threshold",
            "dashboard_alerts_enabled",
            "warranty_alert_days",
        ),
        {},
    ),
}

RESTORE_ORDER = [
    "technicians",
    "departments",
    "employees",
    "assets",
    "asset_templates",
    "assignment_history",
    "inventory_items",
    "asset_maintenance",
    "inventory_movements",
    "pc_specs",
    "pc_part_installations",
    "toner_installations",
    "licenses",
    "license_assignments",
    "activity_log",
    "app_settings",
]

EXTERNAL_REFERENCE_TABLES = {"departments", "employees"}
DEPARTMENT_COLORS = (
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#14b8a6",
    "#6366f1",
    "#f97316",
    "#ec4899",
    "#64748b",
)


class ITAMFlossController(http.Controller):
    def _json_response(self, payload, status=200):
        return request.make_response(
            json.dumps(payload, ensure_ascii=False, default=self._json_default),
            headers=[
                ("Content-Type", "application/json; charset=utf-8"),
                ("Cache-Control", "no-store"),
                ("X-Content-Type-Options", "nosniff"),
            ],
            status=status,
        )

    def _json_default(self, value):
        if isinstance(value, (date, datetime)):
            return str(value)
        raise TypeError("Value is not JSON serializable")

    def _payload(self):
        payload = request.httprequest.get_json(silent=True)
        if not isinstance(payload, dict):
            raise ValidationError(_("A JSON object is required."))
        return payload

    def _check_csrf(self):
        provided = request.httprequest.headers.get("X-ITAM-CSRF-Token", "")
        if not request.validate_csrf(provided):
            raise AccessError(_("The security token is invalid or expired. Reload the page."))

    def _endpoint(self, callback, mutation=True):
        try:
            if mutation:
                self._check_csrf()
            with request.env.cr.savepoint():
                return callback()
        except AccessError as error:
            return self._json_response({"message": str(error)}, status=403)
        except (UserError, ValidationError, ValueError) as error:
            return self._json_response({"message": str(error)}, status=400)
        except Exception as error:  # pragma: no cover - logged for production diagnosis
            _logger.exception("Unhandled ITAMFloss request failure")
            return self._json_response(
                {"message": _("The ITAM operation could not be completed: %s", str(error))},
                status=500,
            )

    def _spec(self, table):
        spec = TABLES.get(table)
        if not spec:
            raise ValidationError(_("Unsupported ITAM table."))
        return spec

    def _model(self, spec):
        return request.env[spec.model].with_context(active_test=False)

    def _actual_field(self, spec, field_name):
        return (spec.field_map or {}).get(field_name, field_name)

    def _field_value(self, record, field_name):
        field = record._fields[field_name]
        value = record[field_name]
        if field.type == "many2one":
            return str(value.id) if value else None
        if field.type == "date":
            return fields.Date.to_string(value) if value else None
        if field.type == "datetime":
            return "%sZ" % fields.Datetime.to_string(value).replace(" ", "T") if value else None
        if field.type in {"one2many", "many2many"}:
            return [str(item.id) for item in value]
        if field.type == "boolean":
            return bool(value)
        return value if value is not False else None

    def _serialize(self, table, record):
        if isinstance(record, dict):
            return {
                key: str(value)
                if (key == "id" or key.endswith("_id")) and value
                else value
                for key, value in record.items()
            }
        spec = self._spec(table)
        values = {
            "id": "default" if table == "app_settings" else str(record.id),
            "created_at": "%sZ"
            % fields.Datetime.to_string(record.create_date).replace(" ", "T"),
        }
        if "write_date" in record._fields:
            values["updated_at"] = "%sZ" % fields.Datetime.to_string(
                record.write_date
            ).replace(" ", "T")
        for field_name in spec.fields:
            actual_field = self._actual_field(spec, field_name)
            if table == "employees" and field_name == "status":
                values[field_name] = "active" if record.active else "inactive"
            elif table == "employees" and field_name == "phone":
                values[field_name] = record.work_phone or record.mobile_phone or None
            elif table == "departments" and field_name == "color":
                color_index = int(record.color or 0)
                values[field_name] = (
                    DEPARTMENT_COLORS[color_index % len(DEPARTMENT_COLORS)]
                    if color_index
                    else None
                )
            else:
                values[field_name] = self._field_value(record, actual_field)
        return values

    def _convert_relation(self, value):
        if value in (None, False, "", "null"):
            return False
        try:
            return int(value)
        except (TypeError, ValueError) as error:
            raise ValidationError(_("Invalid related record identifier.")) from error

    def _prepare_values(self, table, payload):
        if not isinstance(payload, dict):
            raise ValidationError(_("Record data must be an object."))
        spec = self._spec(table)
        model = self._model(spec)
        values = {}
        for field_name in spec.fields:
            if field_name not in payload:
                continue
            value = payload[field_name]
            actual_field = self._actual_field(spec, field_name)
            field = model._fields[actual_field]
            if table == "employees" and field_name == "status":
                value = value != "inactive"
            if field.type == "many2one":
                value = self._convert_relation(value)
            elif field.type in {"date", "datetime", "selection"} and value in (
                None,
                "",
            ):
                value = False
            elif field.type == "json" and value is None:
                value = [] if field_name == "used_items" else {}
            values[actual_field] = value
        return values

    def _domain(self, table, filters):
        spec = self._spec(table)
        model = self._model(spec)
        domain = []
        for item in filters or []:
            if not isinstance(item, (list, tuple)) or len(item) != 2:
                raise ValidationError(_("Invalid query filter."))
            field_name, value = item
            if field_name == "id":
                if table == "app_settings" and value == "default":
                    continue
                value = self._convert_relation(value)
            elif field_name not in spec.fields:
                raise ValidationError(_("Unsupported query field: %s", field_name))
            else:
                actual_field = self._actual_field(spec, field_name)
                if table == "employees" and field_name == "status":
                    value = value != "inactive"
                if model._fields[actual_field].type == "many2one":
                    value = self._convert_relation(value)
                elif value is None:
                    value = False
                field_name = actual_field
            domain.append((field_name, "=", value))
        return domain

    def _ensure_settings(self):
        settings = request.env.ref("itam_floss.itam_settings_default", raise_if_not_found=False)
        if settings and settings.exists():
            return settings
        return request.env["itam.settings"].search([], limit=1) or request.env[
            "itam.settings"
        ].create({"name": "default"})

    def _log_query_change(self, table, record, action, details):
        if table == "activity_log":
            return
        request.env["itam.activity.log"].create(
            {
                "entity_type": table,
                "entity_id": str(record.id),
                "action": action,
                "details": details,
            }
        )

    def _query(self, query):
        table = query.get("table")
        operation = query.get("operation")
        spec = self._spec(table)
        model = self._model(spec)
        if operation not in {"select", "insert", "update", "delete", "upsert"}:
            raise ValidationError(_("Unsupported data operation."))
        if spec.read_only and operation != "select":
            raise AccessError(
                _("Employees and departments are managed from the Odoo Employees app.")
            )
        if table == "activity_log" and operation != "select":
            raise AccessError(_("The activity log is read-only."))
        if table == "asset_maintenance" and operation != "select":
            raise AccessError(_("Use the maintenance workflow to change maintenance records."))
        if table == "assets" and operation == "delete":
            raise AccessError(_("Archive assets before deleting them through the asset workflow."))

        domain = self._domain(table, query.get("filters"))
        one = bool(query.get("one"))
        if operation in {"update", "delete"} and not domain:
            raise ValidationError(_("Update and delete operations require a filter."))

        if operation == "select":
            if table == "app_settings":
                records = self._ensure_settings()
            else:
                order = ""
                ordering = query.get("ordering")
                if ordering:
                    field_name, ascending = ordering
                    if field_name == "created_at":
                        field_name = "create_date"
                    elif field_name == "updated_at":
                        field_name = "write_date"
                    elif field_name != "id" and field_name not in spec.fields:
                        raise ValidationError(_("Unsupported ordering field."))
                    elif field_name != "id":
                        field_name = self._actual_field(spec, field_name)
                    order = "%s %s" % (field_name, "asc" if ascending else "desc")
                limit = int(query.get("take") or 0) or None
                records = model.search(domain, order=order, limit=limit)
            data = [self._serialize(table, record) for record in records]
            return (data[0] if data else None) if one else data

        if operation in {"insert", "upsert"}:
            raw_values = query.get("payload")
            values_list = raw_values if isinstance(raw_values, list) else [raw_values]
            if not values_list or any(not isinstance(item, dict) for item in values_list):
                raise ValidationError(_("Record data is required."))
            created = []
            for raw in values_list:
                values = self._prepare_values(table, raw)
                if operation == "upsert" and table == "app_settings":
                    record = self._ensure_settings()
                    previous = self._serialize(table, record)
                    record.write(values)
                    self._log_query_change(
                        table, record, "update", {"previous": previous, "current": values}
                    )
                else:
                    record = model.create(values)
                    self._log_query_change(table, record, "create", {"current": values})
                created.append(record)
            data = [self._serialize(table, record) for record in created]
            return (data[0] if data else None) if one else data

        records = model.search(domain)
        if operation == "update":
            values = self._prepare_values(table, query.get("payload"))
            result = []
            for record in records:
                previous = self._serialize(table, record)
                record.write(values)
                self._log_query_change(
                    table,
                    record,
                    "update",
                    {"previous": previous, "current": values},
                )
                result.append(record)
            data = [self._serialize(table, record) for record in result]
            return (data[0] if data else None) if one else data

        data = [self._serialize(table, record) for record in records]
        for record in records:
            self._log_query_change(
                table,
                record,
                "delete",
                {"previous": self._serialize(table, record)},
            )
        records.unlink()
        return (data[0] if data else None) if one else data

    def _export(self):
        result = {}
        for table, spec in TABLES.items():
            records = (
                self._ensure_settings()
                if table == "app_settings"
                else self._model(spec).search([])
            )
            result[table] = [self._serialize(table, record) for record in records]
        return result

    def _map_external_references(self, data, id_maps):
        department_model = self._model(TABLES["departments"])
        for raw in data.get("departments", []):
            old_id = raw.get("id")
            if old_id in (None, False, ""):
                continue
            record = department_model.browse(self._convert_relation(old_id)).exists()
            if record and raw.get("name") and record.name != raw["name"]:
                record = department_model.browse()
            if not record and raw.get("name"):
                record = department_model.search(
                    [("name", "=", str(raw["name"]).strip())], limit=1
                )
            if record:
                id_maps["departments"][str(old_id)] = record.id

        employee_model = self._model(TABLES["employees"])
        for raw in data.get("employees", []):
            old_id = raw.get("id")
            if old_id in (None, False, ""):
                continue
            record = employee_model.browse(self._convert_relation(old_id)).exists()
            expected_name = str(raw.get("full_name") or "").strip()
            if record and expected_name and record.name != expected_name:
                record = employee_model.browse()
            if not record and raw.get("employee_number"):
                record = employee_model.search(
                    [
                        (
                            "identification_id",
                            "=",
                            str(raw["employee_number"]).strip(),
                        )
                    ],
                    limit=1,
                )
            if not record and raw.get("email"):
                record = employee_model.search(
                    [("work_email", "=ilike", str(raw["email"]).strip())],
                    limit=1,
                )
            if not record and expected_name:
                record = employee_model.search([("name", "=", expected_name)], limit=1)
            if record:
                id_maps["employees"][str(old_id)] = record.id

    def _restore(self, data):
        if not isinstance(data, dict):
            raise ValidationError(_("Invalid backup data."))
        for table in TABLES:
            if table not in data:
                data[table] = []
            if not isinstance(data[table], list):
                raise ValidationError(_("Invalid backup table: %s", table))

        for table in reversed(RESTORE_ORDER):
            if table == "app_settings" or table in EXTERNAL_REFERENCE_TABLES:
                continue
            self._model(TABLES[table]).search([]).unlink()

        id_maps = {table: {} for table in TABLES}
        self._map_external_references(data, id_maps)
        deferred_relations = []
        deferred_sources = []
        for table in RESTORE_ORDER:
            if table in EXTERNAL_REFERENCE_TABLES:
                continue
            model = self._model(TABLES[table])
            for raw in data[table]:
                if not isinstance(raw, dict):
                    raise ValidationError(_("Invalid backup record."))
                translated = dict(raw)
                for relation_field, relation_table in TABLES[table].relations.items():
                    old_relation = raw.get(relation_field)
                    if old_relation in (None, False, ""):
                        translated[relation_field] = False
                    else:
                        mapped_relation = id_maps[relation_table].get(str(old_relation))
                        if mapped_relation:
                            translated[relation_field] = mapped_relation
                        elif relation_table == table:
                            translated[relation_field] = False
                        else:
                            raise ValidationError(
                                _(
                                    "The backup contains a missing relation in %s.%s.",
                                    table,
                                    relation_field,
                                )
                            )

                if table == "asset_maintenance":
                    remapped_items = []
                    for item in raw.get("used_items") or []:
                        if not isinstance(item, dict):
                            raise ValidationError(
                                _("Invalid maintenance inventory data in the backup.")
                            )
                        old_item_id = item.get("id") or item.get("item_id")
                        new_item_id = id_maps["inventory_items"].get(str(old_item_id))
                        if not new_item_id:
                            raise ValidationError(
                                _("The backup references a missing inventory item.")
                            )
                        remapped_items.append(
                            {
                                **item,
                                "id": str(new_item_id),
                                "item_id": str(new_item_id),
                            }
                        )
                    translated["used_items"] = remapped_items

                if table == "app_settings":
                    translated.pop("id", None)
                    translated.setdefault("name", "default")
                values = self._prepare_values(table, translated)
                if table == "app_settings":
                    values["name"] = "default"
                    record = self._ensure_settings()
                    record.write(values)
                else:
                    record = model.create(values)

                old_id = raw.get("id")
                if old_id not in (None, False, ""):
                    id_maps[table][str(old_id)] = record.id

                for relation_field, relation_table in TABLES[table].relations.items():
                    old_relation = raw.get(relation_field)
                    if (
                        old_relation not in (None, False, "")
                        and relation_table == table
                        and not id_maps[relation_table].get(str(old_relation))
                    ):
                        deferred_relations.append(
                            (record, relation_field, relation_table, str(old_relation))
                        )

                if table == "asset_maintenance" and raw.get("source_id"):
                    deferred_sources.append(
                        (record, raw.get("source_type"), str(raw["source_id"]))
                    )

        for record, relation_field, relation_table, old_relation in deferred_relations:
            mapped_relation = id_maps[relation_table].get(old_relation)
            if not mapped_relation:
                raise ValidationError(
                    _(
                        "The backup contains a missing relation in %s.",
                        relation_field,
                    )
                )
            record.write({relation_field: mapped_relation})

        source_tables = {
            "toner_installation": "toner_installations",
            "toner_installation_undone": "toner_installations",
            "part_installation": "pc_part_installations",
            "part_installation_undone": "pc_part_installations",
        }
        for maintenance, source_type, old_source_id in deferred_sources:
            source_table = source_tables.get(source_type)
            if source_table and id_maps[source_table].get(old_source_id):
                maintenance.source_id = str(id_maps[source_table][old_source_id])

        for activity in self._model(TABLES["activity_log"]).search([]):
            entity_map = id_maps.get(activity.entity_type)
            if entity_map and activity.entity_id in entity_map:
                activity.entity_id = str(entity_map[activity.entity_id])

        self._sync_sequences_after_restore()
        return True

    def _sync_sequences_after_restore(self):
        sequence_specs = [
            ("itam.asset", "asset_id", "itam.asset.printer", "PR-"),
            ("itam.asset", "asset_id", "itam.asset.desktop", "PC-"),
            ("itam.asset", "asset_id", "itam.asset.laptop", "LT-"),
            ("itam.asset", "asset_id", "itam.asset.monitor", "MT-"),
            ("itam.asset", "asset_id", "itam.asset.phone", "PH-"),
            ("itam.asset", "asset_id", "itam.asset.network", "NW-"),
            ("itam.asset", "asset_id", "itam.asset.other", "OT-"),
            ("itam.maintenance", "reference_number", "itam.maintenance", "MNT-"),
        ]
        for model_name, field_name, sequence_code, prefix in sequence_specs:
            highest = 0
            records = request.env[model_name].with_context(active_test=False).search(
                [(field_name, "like", "%s%%" % prefix)]
            )
            pattern = re.compile(r"^%s(\d+)$" % re.escape(prefix))
            for value in records.mapped(field_name):
                match = pattern.match(value or "")
                if match:
                    highest = max(highest, int(match.group(1)))
            sequence = request.env["ir.sequence"].search(
                [("code", "=", sequence_code)], limit=1
            )
            if sequence and sequence.number_next_actual <= highest:
                sequence.number_next_actual = highest + 1

    @http.route(
        ["/itam_floss/app", "/itam_floss/app/<path:subpath>"],
        type="http",
        auth="user",
        methods=["GET"],
        csrf=False,
    )
    def app(self, subpath=None, **_kwargs):
        if subpath:
            static_root = os.path.realpath(file_path("itam_floss/static/app"))
            requested_path = os.path.realpath(os.path.join(static_root, subpath))
            try:
                inside_static_root = os.path.commonpath(
                    [static_root, requested_path]
                ) == static_root
            except ValueError:
                inside_static_root = False
            if inside_static_root and os.path.isfile(requested_path):
                mimetype = mimetypes.guess_type(requested_path)[0]
                with open(requested_path, "rb") as asset_file:
                    return request.make_response(
                        asset_file.read(),
                        headers=[
                            (
                                "Content-Type",
                                mimetype or "application/octet-stream",
                            ),
                            ("Cache-Control", "public, max-age=31536000"),
                            ("X-Content-Type-Options", "nosniff"),
                        ],
                    )
        try:
            index_path = file_path("itam_floss/static/app/odoo-index.html")
        except FileNotFoundError:
            return request.make_response(
                _("ITAMFloss web assets are missing. Rebuild the module assets."),
                status=503,
            )
        with open(index_path, "r", encoding="utf-8") as index_file:
            html = index_file.read()
        config = {
            "apiBase": "/itam_floss/api",
            "appBase": "/itam_floss/app",
            "csrfToken": request.csrf_token(),
            "language": request.env.lang or "en_US",
            "username": request.env.user.name,
        }
        config_json = json.dumps(config, ensure_ascii=False).replace("<", "\\u003c")
        is_arabic = config["language"].lower().startswith("ar")
        html = html.replace(
            '<html lang="ar" dir="rtl">',
            '<html lang="%s" dir="%s">'
            % ("ar" if is_arabic else "en", "rtl" if is_arabic else "ltr"),
        )
        html = html.replace(
            '<div id="itam-root"></div>',
            '<div id="itam-root" data-itam-config="%s"></div>'
            % escape(config_json, quote=True),
        )
        return request.make_response(
            html,
            headers=[
                ("Content-Type", "text/html; charset=utf-8"),
                ("Cache-Control", "no-store"),
                ("X-Content-Type-Options", "nosniff"),
                ("X-Frame-Options", "SAMEORIGIN"),
                ("Referrer-Policy", "same-origin"),
                (
                    "Content-Security-Policy",
                    "default-src 'self'; base-uri 'self'; connect-src 'self'; "
                    "font-src 'self' data:; frame-ancestors 'self'; "
                    "img-src 'self' data: blob:; object-src 'none'; "
                    "script-src 'self'; style-src 'self' 'unsafe-inline'",
                ),
            ],
        )

    @http.route(
        "/itam_floss/api/auth/status",
        type="http",
        auth="user",
        methods=["GET"],
        csrf=False,
    )
    def auth_status(self, **_kwargs):
        return self._json_response(
            {
                "configured": True,
                "authenticated": True,
                "username": request.env.user.name,
            }
        )

    @http.route(
        "/itam_floss/api/auth/logout",
        type="http",
        auth="user",
        methods=["POST"],
        csrf=False,
    )
    def auth_logout(self, **_kwargs):
        def execute():
            request.session.logout(keep_db=True)
            return self._json_response({"ok": True})

        return self._endpoint(execute)

    @http.route(
        "/itam_floss/api/local-data/status",
        type="http",
        auth="user",
        methods=["GET"],
        csrf=False,
    )
    def data_status(self, **_kwargs):
        has_data = any(
            self._model(spec).search_count([], limit=1)
            for table, spec in TABLES.items()
            if table != "app_settings"
        )
        return self._json_response({"hasData": bool(has_data), "normalized": True})

    @http.route(
        "/itam_floss/api/local-data/query",
        type="http",
        auth="user",
        methods=["POST"],
        csrf=False,
    )
    def data_query(self, **_kwargs):
        return self._endpoint(
            lambda: self._json_response(
                {"data": self._query(self._payload()), "error": None}
            )
        )

    @http.route(
        "/itam_floss/api/local-data/hardware",
        type="http",
        auth="user",
        methods=["POST"],
        csrf=False,
    )
    def hardware(self, **_kwargs):
        def execute():
            payload = self._payload()
            result = request.env["itam.floss.service"].run_hardware(payload)
            if payload.get("action") in {"delete-toner", "delete-part"}:
                return self._json_response(
                    {
                        "data": {"id": str(payload.get("installationId") or "")},
                        "error": None,
                    }
                )
            table = (
                "toner_installations"
                if "toner" in payload.get("action", "")
                else "pc_part_installations"
            )
            return self._json_response(
                {"data": self._serialize(table, result), "error": None}
            )

        return self._endpoint(execute)

    @http.route(
        "/itam_floss/api/local-data/workflow",
        type="http",
        auth="user",
        methods=["POST"],
        csrf=False,
    )
    def workflow(self, **_kwargs):
        def execute():
            payload = self._payload()
            result = request.env["itam.floss.service"].run_workflow(payload)
            action = payload.get("action", "")
            if "maintenance" in action:
                table = "asset_maintenance"
            elif action in {"assign-asset", "return-asset"}:
                table = "assignment_history"
            else:
                table = "assets"
            return self._json_response(
                {"data": self._serialize(table, result), "error": None}
            )

        return self._endpoint(execute)

    @http.route(
        "/itam_floss/api/local-data/export",
        type="http",
        auth="user",
        methods=["GET"],
        csrf=False,
    )
    def export_data(self, **_kwargs):
        return self._endpoint(
            lambda: self._json_response({"data": self._export()}), mutation=False
        )

    @http.route(
        "/itam_floss/api/local-data/restore",
        type="http",
        auth="user",
        methods=["POST"],
        csrf=False,
    )
    def restore_data(self, **_kwargs):
        return self._endpoint(
            lambda: self._json_response({"ok": self._restore(self._payload())})
        )

    @http.route(
        "/itam_floss/api/printer-images",
        type="http",
        auth="user",
        methods=["POST", "DELETE"],
        csrf=False,
    )
    def images(self, **_kwargs):
        def execute():
            if request.httprequest.method == "DELETE":
                path = request.httprequest.args.get("path", "")
                match = IMAGE_PATH.match(path)
                if not match:
                    raise ValidationError(_("Invalid image path."))
                image = request.env["itam.image"].browse(int(match.group(1)))
                if image.exists():
                    image.unlink()
                return request.make_response("", status=204)

            upload = request.httprequest.files.get("image")
            if not upload:
                raise ValidationError(_("Select an image to upload."))
            content = upload.read(MAX_IMAGE_SIZE + 1)
            if len(content) > MAX_IMAGE_SIZE:
                raise ValidationError(_("The image must not exceed 10 MB."))
            mimetype = upload.mimetype or mimetypes.guess_type(upload.filename or "")[0]
            if mimetype not in ALLOWED_IMAGE_TYPES:
                raise ValidationError(_("The uploaded file is not a supported image."))
            image = request.env["itam.image"].create(
                {
                    "name": upload.filename or "itam-image",
                    "data": base64.b64encode(content),
                    "mimetype": mimetype,
                }
            )
            return self._json_response(
                {"path": "/itam_floss/image/%s" % image.id}, status=201
            )

        return self._endpoint(execute)

    @http.route(
        "/itam_floss/api/printer-images/restore",
        type="http",
        auth="user",
        methods=["POST"],
        csrf=False,
    )
    def restore_image(self, **_kwargs):
        return self.images()

    @http.route(
        "/itam_floss/assignment/<int:assignment_id>/handover.pdf",
        type="http",
        auth="user",
        methods=["GET"],
        csrf=False,
    )
    def assignment_handover_pdf(self, assignment_id, **_kwargs):
        assignment = request.env["itam.assignment"].browse(assignment_id).exists()
        if not assignment:
            return request.not_found()
        try:
            attachment = assignment._ensure_handover_pdf()
            content = base64.b64decode(attachment.datas or b"")
        except AccessError:
            return request.make_response(_("Access denied."), status=403)
        except (UserError, ValidationError) as error:
            return request.make_response(str(error), status=400)

        asset_code = (assignment.asset_snapshot or {}).get(
            "asset_id"
        ) or assignment.asset_id.asset_id
        safe_code = re.sub(r"[^A-Za-z0-9._-]+", "-", asset_code or "Asset")
        filename = "ITAM-Handover-%s-%s.pdf" % (safe_code, assignment.id)
        return request.make_response(
            content,
            headers=[
                ("Content-Type", "application/pdf"),
                ("Content-Length", str(len(content))),
                ("Cache-Control", "private, no-store"),
                ("X-Content-Type-Options", "nosniff"),
                ("Content-Disposition", 'inline; filename="%s"' % filename),
            ],
        )

    @http.route(
        "/itam_floss/image/<int:attachment_id>",
        type="http",
        auth="user",
        methods=["GET"],
        csrf=False,
    )
    def image(self, attachment_id, **_kwargs):
        image = request.env["itam.image"].browse(attachment_id)
        if not image.exists():
            return request.not_found()
        content = base64.b64decode(image.data or b"")
        return request.make_response(
            content,
            headers=[
                ("Content-Type", image.mimetype or "application/octet-stream"),
                ("Content-Length", str(len(content))),
                ("Cache-Control", "private, max-age=3600"),
                ("X-Content-Type-Options", "nosniff"),
                ("Content-Disposition", 'inline; filename="itam-image"'),
            ],
        )

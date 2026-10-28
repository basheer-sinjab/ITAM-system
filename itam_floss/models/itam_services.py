from collections import defaultdict

from odoo import fields, models, _
from odoo.exceptions import UserError, ValidationError

from .itam_models import IT_WAREHOUSE


class ITAMFlossService(models.AbstractModel):
    _name = "itam.floss.service"
    _description = "ITAMFloss Business Service"

    def _record(self, model_name, record_id, required=True):
        try:
            numeric_id = int(record_id)
        except (TypeError, ValueError):
            numeric_id = 0
        record = self.env[model_name].with_context(active_test=False).browse(numeric_id)
        if required and not record.exists():
            raise UserError(_("The requested record does not exist."))
        return record.exists()

    def _log(self, entity_type, entity_id, action, details=None):
        return self.env["itam.activity.log"].create(
            {
                "entity_type": entity_type,
                "entity_id": str(entity_id) if entity_id else False,
                "action": action,
                "details": details or {},
            }
        )

    def _asset_kind(self, asset):
        asset_type = (asset.asset_type or "").strip().lower()
        if asset_type == "printer":
            return "printer"
        if asset_type in {"desktop pc", "pc", "laptop"}:
            return "pc"
        return "other"

    def _location(self, employee, department=None):
        department = department or employee.department_id
        if department:
            return department.name
        return _("With %s", employee.name) if employee else IT_WAREHOUSE

    def _inventory_movement(
        self,
        item,
        movement_type,
        quantity,
        movement_date,
        note,
        maintenance=False,
    ):
        return self.env["itam.inventory.movement"].create(
            {
                "item_id": item.id,
                "movement_type": movement_type,
                "quantity": quantity,
                "movement_date": movement_date,
                "note": note,
                "maintenance_id": maintenance.id if maintenance else False,
            }
        )

    def _take_inventory(self, item, quantity):
        quantity = float(quantity or 0)
        if quantity <= 0:
            raise ValidationError(_("Quantity must be greater than zero."))
        if item.quantity < quantity:
            raise UserError(
                _("The available quantity of %s is not sufficient.", item.name)
            )
        item.write({"quantity": item.quantity - quantity})

    def _return_inventory(self, item, quantity):
        quantity = float(quantity or 0)
        if quantity <= 0:
            raise ValidationError(_("Quantity must be greater than zero."))
        item.write({"quantity": item.quantity + quantity})

    def _hardware_maintenance(
        self,
        asset,
        item,
        quantity,
        date,
        source_type,
        source_id,
        notes=None,
        replacement=False,
    ):
        is_toner = source_type == "toner_installation"
        if is_toner:
            maintenance_type = "Toner Replacement"
            description = _("Toner replacement: %s", item.name)
        elif replacement:
            maintenance_type = "Part Replacement"
            description = _("Part replacement: %s", item.name)
        else:
            maintenance_type = "Part Installation"
            description = _("Part installation: %s", item.name)
        maintenance = self.env["itam.maintenance"].create(
            {
                "asset_id": asset.id,
                "maintenance_date": date,
                "maintenance_type": maintenance_type,
                "status": "Closed",
                "cost": 0,
                "problem_description": description,
                "resolution": _("Completed: %s", description),
                "notes": notes or False,
                "used_items": [{"id": str(item.id), "quantity": quantity}],
                "source_type": source_type,
                "source_id": str(source_id),
            }
        )
        self._log(
            "asset_maintenance",
            maintenance.id,
            "create",
            {
                "source": source_type,
                "asset_id": str(asset.id),
                "item_name": item.name,
                "quantity": quantity,
            },
        )
        return maintenance

    def _mark_maintenance_undone(self, maintenance, note):
        if not maintenance:
            return
        resolution = " — ".join(part for part in [maintenance.resolution, note] if part)
        maintenance.write(
            {
                "used_items": [],
                "source_type": "%s_undone" % (maintenance.source_type or "hardware"),
                "resolution": resolution,
            }
        )
        self._log(
            "asset_maintenance",
            maintenance.id,
            "update",
            {"reason": "hardware_undo", "note": note},
        )

    def _delete_hardware_records(self, installation, activity_actions):
        asset = installation.asset_id
        installation_id = str(installation.id)
        maintenance = installation.maintenance_id
        asset_activity = self.env["itam.activity.log"].search(
            [
                ("entity_type", "=", "assets"),
                ("entity_id", "=", str(asset.id)),
                ("action", "in", activity_actions),
            ]
        )
        asset_activity.filtered(
            lambda entry: str((entry.details or {}).get("installation_id") or "")
            == installation_id
        ).unlink()
        if maintenance:
            self.env["itam.activity.log"].search(
                [
                    ("entity_type", "=", "asset_maintenance"),
                    ("entity_id", "=", str(maintenance.id)),
                ]
            ).unlink()
            self.env["itam.inventory.movement"].search(
                [("maintenance_id", "=", maintenance.id)]
            ).unlink()
        installation.unlink()
        maintenance.exists().unlink()
        return asset

    def run_hardware(self, payload):
        action = payload.get("action")
        today = fields.Date.context_today(self)
        now = fields.Datetime.now()

        if action == "install-toner":
            asset = self._record("itam.asset", payload.get("assetId"))
            item = self._record("itam.inventory.item", payload.get("itemId"))
            if self._asset_kind(asset) != "printer":
                raise UserError(_("Toner can only be installed on printer assets."))
            if item.category != "Toner":
                raise UserError(_("Select a toner inventory item."))
            quantity = max(1.0, float(payload.get("quantity") or 1))
            installed_at = fields.Date.to_date(payload.get("installedAt") or today)
            installation = self.env["itam.toner.installation"].create(
                {
                    "asset_id": asset.id,
                    "inventory_item_id": item.id,
                    "toner_name": item.name,
                    "quantity": quantity,
                    "installed_at": installed_at,
                    "notes": (payload.get("notes") or "").strip() or False,
                }
            )
            maintenance = self._hardware_maintenance(
                asset,
                item,
                quantity,
                installed_at,
                "toner_installation",
                installation.id,
                payload.get("notes"),
            )
            installation.maintenance_id = maintenance
            self._take_inventory(item, quantity)
            self._inventory_movement(
                item,
                "use",
                quantity,
                installed_at,
                _("Toner installed on %s", asset.name),
                maintenance,
            )
            self._log(
                "assets",
                asset.id,
                "toner_install",
                {
                    "installation_id": str(installation.id),
                    "item_name": item.name,
                    "quantity": quantity,
                    "event_date": fields.Date.to_string(installed_at),
                },
            )
            return installation

        if action == "undo-toner":
            installation = self._record(
                "itam.toner.installation", payload.get("installationId")
            )
            if installation.undone_at:
                raise UserError(_("This toner installation was already undone."))
            item = installation.inventory_item_id
            if not item:
                raise UserError(_("The original toner item no longer exists."))
            self._return_inventory(item, installation.quantity)
            installation.undone_at = now
            self._inventory_movement(
                item,
                "return",
                installation.quantity,
                today,
                _("Undo toner installation: %s", installation.toner_name),
                installation.maintenance_id,
            )
            self._mark_maintenance_undone(
                installation.maintenance_id,
                _("Toner installation was undone: %s", installation.toner_name),
            )
            self._log(
                "assets",
                installation.asset_id.id,
                "toner_undo",
                {
                    "installation_id": str(installation.id),
                    "item_name": installation.toner_name,
                    "event_date": fields.Date.to_string(today),
                },
            )
            return installation

        if action == "delete-toner":
            installation = self._record(
                "itam.toner.installation", payload.get("installationId")
            )
            if not installation.undone_at and installation.inventory_item_id:
                self._return_inventory(
                    installation.inventory_item_id, installation.quantity
                )
            return self._delete_hardware_records(
                installation, ["toner_install", "toner_undo"]
            )

        if action == "install-part":
            asset = self._record("itam.asset", payload.get("assetId"))
            item = self._record("itam.inventory.item", payload.get("itemId"))
            if self._asset_kind(asset) != "pc":
                raise UserError(_("Parts can only be installed on desktop or laptop assets."))
            if item.category != "Spare Part":
                raise UserError(_("Select a spare part inventory item."))
            installed_at = fields.Date.to_date(payload.get("installedAt") or today)
            old_installation = False
            old_action = payload.get("oldPartAction")
            if payload.get("oldInstallationId"):
                old_installation = self._record(
                    "itam.pc.part.installation", payload.get("oldInstallationId")
                )
                if (
                    old_installation.asset_id != asset
                    or old_installation.removed_at
                    or old_installation.undone_at
                ):
                    raise UserError(_("The selected old part cannot be replaced."))
                if old_action not in {"damaged", "return_to_stock", "disposed"}:
                    raise ValidationError(_("Select what happened to the old part."))

            installation = self.env["itam.pc.part.installation"].create(
                {
                    "asset_id": asset.id,
                    "inventory_item_id": item.id,
                    "part_name": item.name,
                    "installed_at": installed_at,
                    "replacement_of_id": old_installation.id if old_installation else False,
                    "notes": (payload.get("notes") or "").strip() or False,
                }
            )
            maintenance = self._hardware_maintenance(
                asset,
                item,
                1,
                installed_at,
                "part_installation",
                installation.id,
                payload.get("notes"),
                bool(old_installation),
            )
            installation.maintenance_id = maintenance
            if old_installation:
                if old_action == "return_to_stock" and old_installation.inventory_item_id:
                    self._return_inventory(old_installation.inventory_item_id, 1)
                    self._inventory_movement(
                        old_installation.inventory_item_id,
                        "return",
                        1,
                        installed_at,
                        _("Part returned after replacement: %s", old_installation.part_name),
                        maintenance,
                    )
                old_installation.write(
                    {"removed_at": installed_at, "old_part_action": old_action}
                )
            self._take_inventory(item, 1)
            self._inventory_movement(
                item,
                "use",
                1,
                installed_at,
                _("Part installed on %s", asset.name),
                maintenance,
            )
            self._log(
                "assets",
                asset.id,
                "part_install",
                {
                    "installation_id": str(installation.id),
                    "item_name": item.name,
                    "replaced_part": old_installation.part_name if old_installation else None,
                    "old_part_action": old_action,
                    "event_date": fields.Date.to_string(installed_at),
                },
            )
            return installation

        if action == "undo-part":
            installation = self._record(
                "itam.pc.part.installation", payload.get("installationId")
            )
            if installation.undone_at or installation.removed_at:
                raise UserError(_("This part installation cannot be undone."))
            item = installation.inventory_item_id
            if not item:
                raise UserError(_("The original inventory item no longer exists."))
            self._return_inventory(item, 1)
            self._inventory_movement(
                item,
                "return",
                1,
                today,
                _("Undo part installation: %s", installation.part_name),
                installation.maintenance_id,
            )
            old_installation = installation.replacement_of_id
            if old_installation:
                if (
                    old_installation.old_part_action == "return_to_stock"
                    and old_installation.inventory_item_id
                ):
                    self._take_inventory(old_installation.inventory_item_id, 1)
                    self._inventory_movement(
                        old_installation.inventory_item_id,
                        "use",
                        1,
                        today,
                        _("Old part reinstalled: %s", old_installation.part_name),
                        installation.maintenance_id,
                    )
                old_installation.write(
                    {"removed_at": False, "old_part_action": False}
                )
            installation.write({"removed_at": today, "undone_at": now})
            self._mark_maintenance_undone(
                installation.maintenance_id,
                _("Part installation was undone: %s", installation.part_name),
            )
            self._log(
                "assets",
                installation.asset_id.id,
                "part_undo",
                {
                    "installation_id": str(installation.id),
                    "item_name": installation.part_name,
                    "event_date": fields.Date.to_string(today),
                },
            )
            return installation

        if action == "delete-part":
            installation = self._record(
                "itam.pc.part.installation", payload.get("installationId")
            )
            if installation.removed_at and not installation.undone_at:
                raise UserError(
                    _("Delete or undo the replacement part before deleting this record.")
                )
            if not installation.undone_at:
                if installation.inventory_item_id:
                    self._return_inventory(installation.inventory_item_id, 1)
                old_installation = installation.replacement_of_id
                if old_installation:
                    if (
                        old_installation.old_part_action == "return_to_stock"
                        and old_installation.inventory_item_id
                    ):
                        self._take_inventory(old_installation.inventory_item_id, 1)
                    old_installation.write(
                        {"removed_at": False, "old_part_action": False}
                    )
            return self._delete_hardware_records(
                installation, ["part_install", "part_undo"]
            )

        raise ValidationError(_("Unsupported hardware action."))

    def _snapshot(self, asset, source_location, delivery_location):
        specs = self.env["itam.pc.spec"].search([("asset_id", "=", asset.id)], limit=1)
        spec_values = None
        if specs:
            spec_values = {
                "processor": specs.processor or None,
                "memory": specs.memory or None,
                "storage": specs.storage or None,
                "graphics_card": specs.graphics_card or None,
                "operating_system": specs.operating_system or None,
                "screen_size": specs.screen_size or None,
                "display_technology": specs.display_technology or None,
                "notes": specs.notes or None,
            }
        return {
            "name": asset.name,
            "asset_id": asset.asset_id,
            "asset_type": asset.asset_type,
            "manufacturer": asset.manufacturer or None,
            "model": asset.model or None,
            "serial_number": asset.serial_number or None,
            "source_location": source_location,
            "source_status": asset.status or "active",
            "source_employee_id": asset.assigned_employee_id.id or None,
            "source_department_id": asset.department_id.id or None,
            "delivery_location": delivery_location,
            "specs": spec_values,
        }

    def _normalize_used_items(self, values):
        quantities = defaultdict(float)
        for entry in values or []:
            if not isinstance(entry, dict):
                raise ValidationError(_("Invalid maintenance inventory data."))
            item_id = str(entry.get("id") or entry.get("item_id") or "").strip()
            quantity = float(entry.get("quantity") or 0)
            if not item_id or quantity <= 0:
                raise ValidationError(_("Invalid maintenance inventory quantity."))
            quantities[item_id] += quantity
        return [
            {"id": item_id, "quantity": quantity}
            for item_id, quantity in quantities.items()
        ]

    def _reconcile_maintenance_inventory(self, maintenance, previous, current):
        before = {item["id"]: float(item["quantity"]) for item in previous}
        after = {item["id"]: float(item["quantity"]) for item in current}
        date = maintenance.maintenance_date
        for item_id in set(before) | set(after):
            change = after.get(item_id, 0) - before.get(item_id, 0)
            if not change:
                continue
            item = self._record("itam.inventory.item", item_id)
            if change > 0:
                self._take_inventory(item, change)
                movement_type = "use"
                note = _("Used in maintenance record")
            else:
                self._return_inventory(item, abs(change))
                movement_type = "return"
                note = _("Returned after maintenance record update")
            self._inventory_movement(
                item,
                movement_type,
                abs(change),
                date,
                note,
                maintenance,
            )

    def _sync_maintenance_hardware(self, maintenance, current):
        asset = maintenance.asset_id
        desired = {int(item["id"]): float(item["quantity"]) for item in current}
        inventory = self.env["itam.inventory.item"].browse(list(desired)).exists()
        inventory_by_id = {item.id: item for item in inventory}
        now = fields.Datetime.now()

        if self._asset_kind(asset) == "printer":
            target = {
                item_id: quantity
                for item_id, quantity in desired.items()
                if inventory_by_id.get(item_id) and inventory_by_id[item_id].category == "Toner"
            }
            linked = self.env["itam.toner.installation"].search(
                [("maintenance_id", "=", maintenance.id), ("undone_at", "=", False)]
            )
            handled = set()
            for installation in linked:
                item_id = installation.inventory_item_id.id
                if item_id in target and item_id not in handled:
                    installation.write(
                        {
                            "quantity": target[item_id],
                            "installed_at": maintenance.maintenance_date,
                            "notes": maintenance.notes,
                        }
                    )
                    handled.add(item_id)
                else:
                    installation.undone_at = now
            for item_id, quantity in target.items():
                if item_id in handled:
                    continue
                item = inventory_by_id[item_id]
                self.env["itam.toner.installation"].create(
                    {
                        "asset_id": asset.id,
                        "inventory_item_id": item.id,
                        "toner_name": item.name,
                        "quantity": quantity,
                        "installed_at": maintenance.maintenance_date,
                        "notes": maintenance.notes,
                        "maintenance_id": maintenance.id,
                    }
                )

        if self._asset_kind(asset) == "pc":
            invalid_quantities = [
                inventory_by_id[item_id].name
                for item_id, quantity in desired.items()
                if inventory_by_id.get(item_id)
                and inventory_by_id[item_id].category == "Spare Part"
                and not float(quantity).is_integer()
            ]
            if invalid_quantities:
                raise ValidationError(
                    _(
                        "Spare-part quantities must be whole numbers: %s",
                        ", ".join(invalid_quantities),
                    )
                )
            target = {
                item_id: int(quantity)
                for item_id, quantity in desired.items()
                if inventory_by_id.get(item_id)
                and inventory_by_id[item_id].category == "Spare Part"
                and float(quantity).is_integer()
            }
            linked = self.env["itam.pc.part.installation"].search(
                [
                    ("maintenance_id", "=", maintenance.id),
                    ("undone_at", "=", False),
                    ("removed_at", "=", False),
                ]
            )
            by_item = defaultdict(list)
            for installation in linked:
                by_item[installation.inventory_item_id.id].append(installation)
            for item_id in set(target) | set(by_item):
                wanted = target.get(item_id, 0)
                existing = by_item.get(item_id, [])
                for installation in existing[wanted:]:
                    if installation.replacement_of_id:
                        raise UserError(
                            _("Undo replacement parts from the asset page before removing them from maintenance.")
                        )
                    installation.write(
                        {"removed_at": maintenance.maintenance_date, "undone_at": now}
                    )
                item = inventory_by_id.get(item_id)
                for _index in range(max(0, wanted - len(existing))):
                    self.env["itam.pc.part.installation"].create(
                        {
                            "asset_id": asset.id,
                            "inventory_item_id": item.id,
                            "part_name": item.name,
                            "installed_at": maintenance.maintenance_date,
                            "notes": maintenance.notes,
                            "maintenance_id": maintenance.id,
                        }
                    )

    def run_workflow(self, payload):
        action = payload.get("action")
        today = fields.Date.context_today(self)
        now = fields.Datetime.now()

        if action == "assign-asset":
            asset = self._record("itam.asset", payload.get("assetId"))
            employee = self._record("hr.employee", payload.get("employeeId"))
            if asset.archived_at or not asset.active:
                raise UserError(_("Archived assets cannot be assigned."))
            if not employee.active:
                raise UserError(_("The selected employee is inactive."))
            assignment_date = fields.Date.to_date(payload.get("assignmentDate") or today)
            open_assignments = self.env["itam.assignment"].search(
                [("asset_id", "=", asset.id), ("return_date", "=", False)]
            )
            if open_assignments and any(
                record.assignment_date > assignment_date for record in open_assignments
            ):
                raise ValidationError(
                    _("Assignment date cannot be earlier than the current assignment.")
                )
            open_assignments.write(
                {
                    "return_date": assignment_date,
                    "return_condition": "good",
                    "return_notes": _("Automatically closed before a new assignment"),
                }
            )
            department = employee.department_id
            if payload.get("departmentId"):
                department = self._record("hr.department", payload.get("departmentId"))
            source_location = asset.location or IT_WAREHOUSE
            destination = self._location(employee, department)
            assignment = self.env["itam.assignment"].create(
                {
                    "asset_id": asset.id,
                    "employee_id": employee.id,
                    "employee_name": employee.name,
                    "employee_number": employee.identification_id,
                    "employee_email": employee.work_email,
                    "employee_phone": employee.work_phone or employee.mobile_phone,
                    "department_name": department.name if department else False,
                    "assignment_date": assignment_date,
                    "notes": (payload.get("notes") or "").strip() or False,
                    "asset_snapshot": self._snapshot(asset, source_location, destination),
                }
            )
            asset.write(
                {
                    "assigned_employee_id": employee.id,
                    "department_id": department.id if department else False,
                    "location": destination,
                    "status": "active",
                }
            )
            assignment._ensure_handover_pdf()
            self._log(
                "assets",
                asset.id,
                "assignment",
                {
                    "assignment_id": str(assignment.id),
                    "employee_name": employee.name,
                    "from_location": source_location,
                    "to_location": destination,
                    "event_date": fields.Date.to_string(assignment_date),
                },
            )
            return assignment

        if action == "return-asset":
            asset = self._record("itam.asset", payload.get("assetId"))
            if not asset.assigned_employee_id:
                raise UserError(_("This asset is not currently assigned."))
            return_date = fields.Date.to_date(payload.get("returnDate") or today)
            condition = payload.get("condition")
            if condition not in {"good", "maintenance", "damaged"}:
                raise ValidationError(_("Select a valid return condition."))
            assignment = self.env["itam.assignment"].search(
                [
                    ("asset_id", "=", asset.id),
                    ("return_date", "=", False),
                ],
                order="assignment_date desc, id desc",
                limit=1,
            )
            if assignment and assignment.assignment_date > return_date:
                raise ValidationError(
                    _("Return date cannot be earlier than assignment date.")
                )
            if not assignment:
                employee = asset.assigned_employee_id
                assignment = self.env["itam.assignment"].create(
                    {
                        "asset_id": asset.id,
                        "employee_id": employee.id,
                        "employee_name": employee.name,
                        "employee_number": employee.identification_id,
                        "employee_email": employee.work_email,
                        "employee_phone": employee.work_phone or employee.mobile_phone,
                        "assignment_date": return_date,
                        "notes": _("Automatically created when the asset was returned"),
                        "asset_snapshot": self._snapshot(
                            asset, IT_WAREHOUSE, asset.location or IT_WAREHOUSE
                        ),
                    }
                )
            employee_name = assignment.employee_name or asset.assigned_employee_id.name
            assignment.write(
                {
                    "return_date": return_date,
                    "return_condition": condition,
                    "return_notes": (payload.get("notes") or "").strip() or False,
                }
            )
            status = {
                "good": "active",
                "maintenance": "maintenance",
                "damaged": "inactive",
            }[condition]
            source_location = asset.location
            asset.write(
                {
                    "assigned_employee_id": False,
                    "location": IT_WAREHOUSE,
                    "status": status,
                }
            )
            self._log(
                "assets",
                asset.id,
                "return",
                {
                    "assignment_id": str(assignment.id),
                    "employee_name": employee_name,
                    "from_location": source_location,
                    "to_location": IT_WAREHOUSE,
                    "condition": condition,
                    "event_date": fields.Date.to_string(return_date),
                },
            )
            return assignment

        if action == "delete-assignment-history":
            assignment = self._record(
                "itam.assignment", payload.get("assignmentId")
            )
            asset = assignment.asset_id
            requested_asset_id = payload.get("assetId")
            if requested_asset_id and str(asset.id) != str(requested_asset_id):
                raise ValidationError(
                    _("The assignment does not belong to the selected asset.")
                )
            if (
                not assignment.return_date
                and asset.assigned_employee_id == assignment.employee_id
            ):
                snapshot = assignment.asset_snapshot or {}
                asset.write(
                    {
                        "assigned_employee_id": snapshot.get("source_employee_id")
                        or False,
                        "department_id": snapshot.get("source_department_id")
                        or False,
                        "location": snapshot.get("source_location")
                        or IT_WAREHOUSE,
                        "status": snapshot.get("source_status") or "active",
                    }
                )

            assignment_id = str(assignment.id)
            related_activity = self.env["itam.activity.log"].search(
                [
                    ("entity_type", "=", "assets"),
                    ("entity_id", "=", str(asset.id)),
                    ("action", "in", ["assignment", "return"]),
                ]
            )
            related_activity.filtered(
                lambda entry: str((entry.details or {}).get("assignment_id") or "")
                == assignment_id
            ).unlink()
            assignment.unlink()
            return asset

        if action == "archive-asset":
            asset = self._record("itam.asset", payload.get("assetId"))
            if not asset.archived_at:
                self.env["itam.assignment"].search(
                    [("asset_id", "=", asset.id), ("return_date", "=", False)]
                ).write(
                    {
                        "return_date": today,
                        "return_condition": "good",
                        "return_notes": _("Automatically closed when the asset was archived"),
                    }
                )
                previous_status = asset.status
                asset.write(
                    {
                        "archived_at": now,
                        "active": False,
                        "assigned_employee_id": False,
                        "location": IT_WAREHOUSE,
                        "status": "inactive",
                    }
                )
                self._log(
                    "assets",
                    asset.id,
                    "archive",
                    {"previous_status": previous_status},
                )
            return asset

        if action == "restore-asset":
            asset = self._record("itam.asset", payload.get("assetId"))
            asset.write(
                {
                    "archived_at": False,
                    "active": True,
                    "status": "active",
                    "location": IT_WAREHOUSE,
                }
            )
            self._log("assets", asset.id, "restore", {})
            return asset

        if action == "delete-asset":
            asset = self._record("itam.asset", payload.get("assetId"))
            if not asset.archived_at:
                raise UserError(_("Archive the asset before deleting it permanently."))
            asset_id = asset.id
            self.env["itam.activity.log"].search(
                [("entity_type", "=", "assets"), ("entity_id", "=", str(asset_id))]
            ).unlink()
            asset.unlink()
            return {"id": str(asset_id)}

        if action == "save-maintenance":
            values = payload.get("record") or {}
            maintenance = self._record(
                "itam.maintenance", values.get("id"), required=False
            )
            asset = self._record("itam.asset", values.get("asset_id"))
            if asset.archived_at:
                raise UserError(_("Maintenance cannot be added to an archived asset."))
            if maintenance and maintenance.asset_id != asset:
                linked_count = self.env["itam.toner.installation"].search_count(
                    [("maintenance_id", "=", maintenance.id)]
                ) + self.env["itam.pc.part.installation"].search_count(
                    [("maintenance_id", "=", maintenance.id)]
                )
                if linked_count:
                    raise UserError(
                        _("The asset cannot be changed after hardware is linked to maintenance.")
                    )
            previous_items = self._normalize_used_items(
                maintenance.used_items if maintenance else []
            )
            current_items = self._normalize_used_items(values.get("used_items") or [])
            write_values = {
                "asset_id": asset.id,
                "maintenance_date": fields.Date.to_date(
                    values.get("maintenance_date") or today
                ),
                "maintenance_type": values.get("maintenance_type") or "Corrective",
                "status": "Open" if values.get("status") == "Open" else "Closed",
                "technician": (
                    maintenance.technician if maintenance else self.env.user.name
                )
                or self.env.user.name,
                "cost": max(0, float(values.get("cost") or 0)),
                "problem_description": values.get("problem_description") or False,
                "resolution": values.get("resolution") or False,
                "notes": values.get("notes") or False,
                "used_items": current_items,
            }
            if maintenance:
                maintenance.write(write_values)
                log_action = "update"
            else:
                write_values.update(
                    {
                        "source_type": values.get("source_type") or "maintenance",
                        "source_id": values.get("source_id") or False,
                    }
                )
                maintenance = self.env["itam.maintenance"].create(write_values)
                log_action = "create"
            self._reconcile_maintenance_inventory(
                maintenance, previous_items, current_items
            )
            self._sync_maintenance_hardware(maintenance, current_items)
            self._log(
                "asset_maintenance",
                maintenance.id,
                log_action,
                {"asset_id": str(asset.id)},
            )
            return maintenance

        if action == "delete-maintenance":
            maintenance = self._record(
                "itam.maintenance", payload.get("maintenanceId")
            )
            previous_items = self._normalize_used_items(maintenance.used_items or [])
            self._reconcile_maintenance_inventory(maintenance, previous_items, [])
            now_value = fields.Datetime.now()
            self.env["itam.toner.installation"].search(
                [("maintenance_id", "=", maintenance.id), ("undone_at", "=", False)]
            ).write({"undone_at": now_value})
            self.env["itam.pc.part.installation"].search(
                [("maintenance_id", "=", maintenance.id), ("undone_at", "=", False)]
            ).write({"removed_at": today, "undone_at": now_value})
            result = maintenance
            self._log(
                "asset_maintenance",
                maintenance.id,
                "delete",
                {"asset_id": str(maintenance.asset_id.id)},
            )
            result_values = {
                "id": result.id,
                "asset_id": result.asset_id.id,
                "reference_number": result.reference_number,
            }
            maintenance.unlink()
            return result_values

        raise ValidationError(_("Unsupported workflow action."))

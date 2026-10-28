import base64

from odoo.exceptions import ValidationError
from odoo.tests import TransactionCase


class TestITAMFloss(TransactionCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.department = cls.env["hr.department"].create({"name": "IT"})
        cls.employee = cls.env["hr.employee"].create(
            {
                "identification_id": "EMP-TEST-001",
                "name": "Test Employee",
                "department_id": cls.department.id,
            }
        )
        cls.printer = cls.env["itam.asset"].create(
            {
                "asset_id": "TEST-PRINTER-001",
                "name": "Test Printer",
                "asset_type": "Printer",
            }
        )
        cls.desktop = cls.env["itam.asset"].create(
            {
                "asset_id": "TEST-DESKTOP-001",
                "name": "Test Desktop",
                "asset_type": "Desktop PC",
            }
        )
        cls.service = cls.env["itam.floss.service"]

    def test_asset_sequence_is_generated(self):
        asset = self.env["itam.asset"].create(
            {"name": "Sequenced Laptop", "asset_type": "Laptop"}
        )
        self.assertRegex(asset.asset_id, r"^LT-\d{4,}$")

    def test_handover_asset_details_follow_device_type(self):
        self.env["itam.pc.spec"].create(
            {
                "asset_id": self.desktop.id,
                "processor": "Intel Core i7",
                "memory": "32 GB",
                "storage": "1 TB NVMe SSD",
                "operating_system": "Windows 11 Enterprise",
                "graphics_card": "Intel Arc Graphics",
            }
        )
        desktop_assignment = self.env["itam.assignment"].create(
            {
                "asset_id": self.desktop.id,
                "employee_id": self.employee.id,
                "assignment_date": "2026-01-09",
                "asset_snapshot": self.service._snapshot(
                    self.desktop, "IT Warehouse", self.department.name
                ),
            }
        )
        desktop_context = desktop_assignment._handover_html_context()
        self.assertTrue(desktop_context["show_computer_specs"])
        self.assertFalse(desktop_context["show_monitor_size"])
        self.assertEqual(desktop_context["specifications"]["memory"], "32 GB")
        desktop_html = desktop_assignment.with_context(
            lang="en_US"
        )._render_handover_html()
        self.assertIn("PROCESSOR", desktop_html)
        self.assertIn("Intel Arc Graphics", desktop_html)
        self.assertNotIn("DELIVERY LOCATION", desktop_html)

        monitor = self.env["itam.asset"].create(
            {
                "asset_id": "TEST-MONITOR-001",
                "name": "Test Monitor",
                "asset_type": "Monitor",
            }
        )
        self.env["itam.pc.spec"].create(
            {
                "asset_id": monitor.id,
                "screen_size": "27 inch",
                "display_technology": "IPS Black",
            }
        )
        monitor_assignment = self.env["itam.assignment"].create(
            {
                "asset_id": monitor.id,
                "employee_id": self.employee.id,
                "assignment_date": "2026-01-09",
                "asset_snapshot": self.service._snapshot(
                    monitor, "IT Warehouse", self.department.name
                ),
            }
        )
        monitor_context = monitor_assignment._handover_html_context()
        self.assertFalse(monitor_context["show_computer_specs"])
        self.assertTrue(monitor_context["show_monitor_size"])
        self.assertEqual(
            monitor_context["specifications"]["screen_size"], "27 inch"
        )
        self.assertEqual(
            monitor_context["specifications"]["display_technology"], "IPS Black"
        )
        monitor_html = monitor_assignment.with_context(
            lang="en_US"
        )._render_handover_html()
        self.assertIn("SCREEN SIZE", monitor_html)
        self.assertNotIn("PROCESSOR", monitor_html)

        printer_assignment = self.env["itam.assignment"].create(
            {
                "asset_id": self.printer.id,
                "employee_id": self.employee.id,
                "assignment_date": "2026-01-09",
                "asset_snapshot": self.service._snapshot(
                    self.printer, "IT Warehouse", self.department.name
                ),
            }
        )
        printer_context = printer_assignment._handover_html_context()
        self.assertFalse(printer_context["show_computer_specs"])
        self.assertFalse(printer_context["show_monitor_size"])
        printer_html = printer_assignment.with_context(
            lang="en_US"
        )._render_handover_html()
        self.assertNotIn("PROCESSOR", printer_html)
        self.assertNotIn("SCREEN SIZE", printer_html)

    def test_assign_and_return_asset(self):
        assignment = self.service.run_workflow(
            {
                "action": "assign-asset",
                "assetId": self.printer.id,
                "employeeId": self.employee.id,
                "assignmentDate": "2026-01-10",
                "notes": "Issued for work",
            }
        )
        self.assertEqual(self.printer.assigned_employee_id, self.employee)
        self.assertEqual(self.printer.department_id, self.department)
        self.assertEqual(assignment.employee_name, self.employee.name)
        self.assertFalse(assignment.return_date)
        self.assertEqual(assignment.handover_by_user_id, self.env.user)
        self.assertEqual(assignment.handover_by_name, self.env.user.name)
        self.assertTrue(assignment.handover_generated_at)
        self.assertTrue(assignment.handover_attachment_id)
        self.assertEqual(
            assignment.handover_attachment_id.mimetype,
            "application/pdf",
        )
        self.assertTrue(
            base64.b64decode(assignment.handover_attachment_id.datas).startswith(
                b"%PDF-"
            )
        )
        self.assertEqual(
            assignment._ensure_handover_pdf(),
            assignment.handover_attachment_id,
        )
        assignment_activity = self.env["itam.activity.log"].search(
            [
                ("entity_type", "=", "assets"),
                ("entity_id", "=", str(self.printer.id)),
                ("action", "=", "assignment"),
            ],
            order="id desc",
            limit=1,
        )
        self.assertEqual(assignment_activity.details["event_date"], "2026-01-10")

        returned = self.service.run_workflow(
            {
                "action": "return-asset",
                "assetId": self.printer.id,
                "returnDate": "2026-01-11",
                "condition": "good",
            }
        )
        self.assertEqual(returned, assignment)
        self.assertFalse(self.printer.assigned_employee_id)
        self.assertEqual(self.printer.location, "IT Warehouse")
        self.assertEqual(str(assignment.return_date), "2026-01-11")
        return_activity = self.env["itam.activity.log"].search(
            [
                ("entity_type", "=", "assets"),
                ("entity_id", "=", str(self.printer.id)),
                ("action", "=", "return"),
            ],
            order="id desc",
            limit=1,
        )
        self.assertEqual(return_activity.details["event_date"], "2026-01-11")

    def test_delete_returned_and_current_assignment_history(self):
        assignment = self.service.run_workflow(
            {
                "action": "assign-asset",
                "assetId": self.printer.id,
                "employeeId": self.employee.id,
                "assignmentDate": "2026-02-01",
            }
        )
        self.service.run_workflow(
            {
                "action": "return-asset",
                "assetId": self.printer.id,
                "returnDate": "2026-02-02",
                "condition": "good",
            }
        )
        attachment = assignment.handover_attachment_id
        related_activity = self.env["itam.activity.log"].search(
            [
                ("entity_type", "=", "assets"),
                ("entity_id", "=", str(self.printer.id)),
                ("action", "in", ["assignment", "return"]),
            ]
        ).filtered(
            lambda entry: str((entry.details or {}).get("assignment_id") or "")
            == str(assignment.id)
        )
        self.assertEqual(len(related_activity), 2)

        result = self.service.run_workflow(
            {
                "action": "delete-assignment-history",
                "assetId": self.printer.id,
                "assignmentId": assignment.id,
            }
        )
        self.assertEqual(result, self.printer)
        self.assertFalse(assignment.exists())
        self.assertFalse(attachment.exists())
        self.assertFalse(related_activity.exists())
        self.assertFalse(self.printer.assigned_employee_id)
        self.assertEqual(self.printer.location, "IT Warehouse")

        current_assignment = self.service.run_workflow(
            {
                "action": "assign-asset",
                "assetId": self.desktop.id,
                "employeeId": self.employee.id,
                "assignmentDate": "2026-02-03",
            }
        )
        current_attachment = current_assignment.handover_attachment_id
        self.assertEqual(self.desktop.assigned_employee_id, self.employee)

        self.service.run_workflow(
            {
                "action": "delete-assignment-history",
                "assetId": self.desktop.id,
                "assignmentId": current_assignment.id,
            }
        )
        self.assertFalse(current_assignment.exists())
        self.assertFalse(current_attachment.exists())
        self.assertFalse(self.desktop.assigned_employee_id)
        self.assertFalse(self.desktop.department_id)
        self.assertEqual(self.desktop.location, "IT Warehouse")
        self.assertEqual(self.desktop.status, "active")

    def test_toner_install_and_undo_reconciles_inventory(self):
        toner = self.env["itam.inventory.item"].create(
            {
                "name": "Black Toner",
                "category": "Toner",
                "color": "black",
                "quantity": 5,
            }
        )
        installation = self.service.run_hardware(
            {
                "action": "install-toner",
                "assetId": self.printer.id,
                "itemId": toner.id,
                "quantity": 2,
                "installedAt": "2026-01-12",
            }
        )
        self.assertEqual(toner.quantity, 3)
        self.assertTrue(installation.maintenance_id)
        self.assertEqual(installation.maintenance_id.used_items[0]["quantity"], 2.0)
        toner_activity = self.env["itam.activity.log"].search(
            [
                ("entity_type", "=", "assets"),
                ("entity_id", "=", str(self.printer.id)),
                ("action", "=", "toner_install"),
            ],
            order="id desc",
            limit=1,
        )
        self.assertEqual(toner_activity.details["event_date"], "2026-01-12")
        maintenance = installation.maintenance_id

        self.service.run_hardware(
            {"action": "undo-toner", "installationId": installation.id}
        )
        self.assertEqual(toner.quantity, 5)
        self.assertTrue(installation.undone_at)
        self.assertFalse(installation.maintenance_id.used_items)

        self.service.run_hardware(
            {"action": "delete-toner", "installationId": installation.id}
        )
        self.assertEqual(toner.quantity, 5)
        self.assertFalse(installation.exists())
        self.assertFalse(maintenance.exists())
        self.assertFalse(
            self.env["itam.inventory.movement"].search(
                [("maintenance_id", "=", maintenance.id)]
            )
        )

        active_installation = self.service.run_hardware(
            {
                "action": "install-toner",
                "assetId": self.printer.id,
                "itemId": toner.id,
                "quantity": 1,
                "installedAt": "2026-01-13",
            }
        )
        self.assertEqual(toner.quantity, 4)
        self.service.run_hardware(
            {"action": "delete-toner", "installationId": active_installation.id}
        )
        self.assertEqual(toner.quantity, 5)
        self.assertFalse(active_installation.exists())

    def test_part_replacement_and_undo_restore_previous_part(self):
        old_part = self.env["itam.inventory.item"].create(
            {
                "name": "Old Memory",
                "category": "Spare Part",
                "quantity": 0,
            }
        )
        new_part = self.env["itam.inventory.item"].create(
            {
                "name": "New Memory",
                "category": "Spare Part",
                "quantity": 2,
            }
        )
        old_installation = self.env["itam.pc.part.installation"].create(
            {
                "asset_id": self.desktop.id,
                "inventory_item_id": old_part.id,
                "part_name": old_part.name,
                "installed_at": "2025-12-01",
            }
        )

        replacement = self.service.run_hardware(
            {
                "action": "install-part",
                "assetId": self.desktop.id,
                "itemId": new_part.id,
                "oldInstallationId": old_installation.id,
                "oldPartAction": "return_to_stock",
                "installedAt": "2026-01-13",
            }
        )
        self.assertEqual(new_part.quantity, 1)
        self.assertEqual(old_part.quantity, 1)
        self.assertTrue(old_installation.removed_at)
        self.assertEqual(replacement.replacement_of_id, old_installation)
        part_activity = self.env["itam.activity.log"].search(
            [
                ("entity_type", "=", "assets"),
                ("entity_id", "=", str(self.desktop.id)),
                ("action", "=", "part_install"),
            ],
            order="id desc",
            limit=1,
        )
        self.assertEqual(part_activity.details["event_date"], "2026-01-13")

        self.service.run_hardware(
            {"action": "undo-part", "installationId": replacement.id}
        )
        self.assertEqual(new_part.quantity, 2)
        self.assertEqual(old_part.quantity, 0)
        self.assertFalse(old_installation.removed_at)
        self.assertTrue(replacement.undone_at)
        replacement_maintenance = replacement.maintenance_id

        self.service.run_hardware(
            {"action": "delete-part", "installationId": replacement.id}
        )
        self.assertFalse(replacement.exists())
        self.assertFalse(replacement_maintenance.exists())
        self.assertFalse(old_installation.removed_at)

        simple_installation = self.service.run_hardware(
            {
                "action": "install-part",
                "assetId": self.desktop.id,
                "itemId": new_part.id,
                "installedAt": "2026-01-14",
            }
        )
        self.assertEqual(new_part.quantity, 1)
        self.service.run_hardware(
            {"action": "delete-part", "installationId": simple_installation.id}
        )
        self.assertEqual(new_part.quantity, 2)
        self.assertFalse(simple_installation.exists())

    def test_maintenance_inventory_is_reconciled(self):
        item = self.env["itam.inventory.item"].create(
            {
                "name": "Cleaning Kit",
                "category": "Consumable",
                "quantity": 10,
            }
        )
        maintenance = self.service.run_workflow(
            {
                "action": "save-maintenance",
                "record": {
                    "asset_id": self.printer.id,
                    "maintenance_date": "2026-01-14",
                    "maintenance_type": "Preventive",
                    "status": "Closed",
                    "technician": "Spoofed Technician",
                    "used_items": [{"id": str(item.id), "quantity": 2}],
                },
            }
        )
        self.assertEqual(item.quantity, 8)
        self.assertEqual(maintenance.technician, self.env.user.name)

        self.service.run_workflow(
            {
                "action": "save-maintenance",
                "record": {
                    "id": maintenance.id,
                    "asset_id": self.printer.id,
                    "maintenance_date": "2026-01-14",
                    "maintenance_type": "Preventive",
                    "status": "Closed",
                    "technician": "Different Technician",
                    "used_items": [{"id": str(item.id), "quantity": 3}],
                },
            }
        )
        self.assertEqual(item.quantity, 7)
        self.assertEqual(maintenance.technician, self.env.user.name)

        self.service.run_workflow(
            {"action": "delete-maintenance", "maintenanceId": maintenance.id}
        )
        self.assertEqual(item.quantity, 10)
        self.assertFalse(maintenance.exists())

    def test_license_seat_limit_is_enforced(self):
        license_record = self.env["itam.license"].create(
            {"license_name": "Test License", "seat_count": 1}
        )
        self.env["itam.license.assignment"].create(
            {
                "license_id": license_record.id,
                "employee_id": self.employee.id,
            }
        )
        with self.assertRaises(ValidationError):
            self.env["itam.license.assignment"].create(
                {
                    "license_id": license_record.id,
                    "asset_id": self.printer.id,
                }
            )

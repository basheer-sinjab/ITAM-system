from odoo import SUPERUSER_ID, api


def migrate(cr, version):
    cr.execute(
        "ALTER TABLE hr_department DROP COLUMN IF EXISTS itam_branch_id"
    )
    cr.execute(
        "ALTER TABLE itam_assignment DROP COLUMN IF EXISTS branch_name"
    )
    cr.execute("DROP TABLE IF EXISTS itam_branch CASCADE")
    cr.execute(
        """
        DELETE FROM ir_model_data
         WHERE module = 'itam_floss'
           AND name = 'demo_branch_riyadh'
        """
    )

    env = api.Environment(cr, SUPERUSER_ID, {})
    assets = env["itam.asset"].with_context(active_test=False).search(
        [("assigned_employee_id", "!=", False)]
    )
    for asset in assets:
        employee = asset.assigned_employee_id
        asset.location = employee.department_id.name or employee.name

    assignments = env["itam.assignment"].search(
        [("employee_id", "!=", False)]
    )
    for assignment in assignments:
        department = assignment.employee_id.department_id
        snapshot = dict(assignment.asset_snapshot or {})
        if department and snapshot.get("delivery_location"):
            snapshot["delivery_location"] = department.name
            assignment.asset_snapshot = snapshot

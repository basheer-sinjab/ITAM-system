"""Run through `odoo shell` to load ITAMFloss HR demo records once."""

from odoo.tools.convert import convert_file


if env.ref("itam_floss.demo_employee_ahmed", raise_if_not_found=False):
    print("ITAMFloss HR demo data is already loaded.")
else:
    convert_file(
        env,
        "itam_floss",
        "demo/itam_demo.xml",
        {},
        mode="init",
        noupdate=True,
        kind="demo",
    )
    env.cr.commit()
    print("ITAMFloss HR demo data loaded successfully.")

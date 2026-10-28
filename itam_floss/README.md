# ITAMFloss for Odoo 18

ITAMFloss is an installable Odoo 18 application that keeps the existing React
interface while using authenticated Odoo controllers, the Odoo ORM, and the
Odoo PostgreSQL database. It has no Supabase dependency and ships without demo
records in production databases. Optional Odoo demo records are included for
demonstration databases.

## Compatibility

- Odoo 18 Community and Enterprise
- Odoo.sh and on-premise deployments
- PostgreSQL through the Odoo ORM
- Native `hr.employee`, `hr.department`, and related Odoo user accounts
- Arabic (RTL) and English (LTR), following the active Odoo user language

## Installation

1. Copy `itam_floss` into an Odoo custom addons directory.
2. Add that directory to `addons_path`.
3. Restart Odoo and update the Apps list.
4. Install **ITAMFloss**.
5. Open the ITAMFloss tile while signed in as an Odoo administrator.

The application currently grants access to members of Odoo's Settings/System
group. More granular ITAM roles can be added in a later release.

### Odoo.sh

Keep the `itam_floss` folder at the root of the Git repository, push the branch
to Odoo.sh, update the Apps list for the build, and install **ITAMFloss**. The
compiled frontend is included, so the Odoo.sh build does not need to run npm.

## Frontend build

Run `npm run build:odoo` from the source repository. The compiled browser files
are written to `itam_floss/static/app` and must be committed with the module so
Odoo.sh and on-premise installations do not need Node.js.

For local on-premise testing, start Docker Desktop and run:

```powershell
docker compose -f compose.odoo.yml up -d
```

Then open `http://localhost:8069`, create a database, update the Apps list, and
install ITAMFloss. Enable Odoo demo data when you want the bundled sample
departments and employees.

To run the automated Odoo installation and business-workflow tests against an
empty database, use the Odoo CLI with `--test-tags=/itam_floss`.

## Data and integrations

ITAMFloss creates its own operational models and tables for assets, inventory,
maintenance, and licenses. Employees and departments are read directly from
Odoo's `hr.employee` and `hr.department`; they are created and maintained only
from Odoo Employees. Asset and license assignments point to those native HR
records, including their existing `res.users` relationship. It does not import
data from the standalone application.

Uploaded PNG, JPEG, GIF, and WebP images are stored in PostgreSQL through the
ITAMFloss image model. Backup and restore include operational records and
uploaded images, while HR master records remain managed by Odoo.

## License

Odoo Proprietary License v1.0 (OPL-1). Copyright Basheer.

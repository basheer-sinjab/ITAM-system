
CREATE TYPE public.printer_status AS ENUM ('active','maintenance','out_of_service','retired');
CREATE TYPE public.toner_color AS ENUM ('black','cyan','magenta','yellow','other');
CREATE TYPE public.maintenance_type AS ENUM ('repair','part_replacement','cleaning','preventive','setup','other');

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

-- Settings lookup tables
CREATE TABLE public.branches (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, notes text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.departments (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, notes text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.responsible_persons (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, notes text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.parts (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, notes text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.suppliers (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, contact_person text, phone text, email text, notes text, created_at timestamptz NOT NULL DEFAULT now());

CREATE TABLE public.toners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text,
  color public.toner_color NOT NULL DEFAULT 'black',
  supplier_id uuid REFERENCES public.suppliers(id) ON DELETE SET NULL,
  quantity integer NOT NULL DEFAULT 0,
  min_quantity integer NOT NULL DEFAULT 1,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER toners_updated BEFORE UPDATE ON public.toners FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.toner_stock_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  toner_id uuid NOT NULL REFERENCES public.toners(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  entry_date date NOT NULL DEFAULT current_date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE SEQUENCE public.printer_asset_seq START 1;
CREATE OR REPLACE FUNCTION public.next_asset_id() RETURNS text LANGUAGE sql VOLATILE SET search_path = public AS $$
  SELECT 'PRN-' || lpad(nextval('public.printer_asset_seq')::text, 4, '0');
$$;

CREATE TABLE public.printers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id text NOT NULL UNIQUE DEFAULT public.next_asset_id(),
  name text NOT NULL,
  manufacturer text,
  model text,
  printer_type text,
  serial_number text,
  ip_address text,
  mac_address text,
  branch_id uuid REFERENCES public.branches(id) ON DELETE SET NULL,
  department_id uuid REFERENCES public.departments(id) ON DELETE SET NULL,
  responsible_person_id uuid REFERENCES public.responsible_persons(id) ON DELETE SET NULL,
  status public.printer_status NOT NULL DEFAULT 'active',
  purchase_date date,
  warranty_expiry date,
  notes text,
  image_url text,
  is_favorite boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER printers_updated BEFORE UPDATE ON public.printers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.toner_replacements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  printer_id uuid NOT NULL REFERENCES public.printers(id) ON DELETE CASCADE,
  change_date date NOT NULL DEFAULT current_date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.toner_replacement_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  replacement_id uuid NOT NULL REFERENCES public.toner_replacements(id) ON DELETE CASCADE,
  toner_id uuid REFERENCES public.toners(id) ON DELETE SET NULL,
  toner_name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.maintenance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  printer_id uuid NOT NULL REFERENCES public.printers(id) ON DELETE CASCADE,
  service_date date NOT NULL DEFAULT current_date,
  maintenance_type public.maintenance_type NOT NULL DEFAULT 'repair',
  description text,
  replaced_parts text[] NOT NULL DEFAULT '{}',
  technician text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.printer_transfers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  printer_id uuid NOT NULL REFERENCES public.printers(id) ON DELETE CASCADE,
  transfer_date date NOT NULL DEFAULT current_date,
  old_department text,
  new_department text,
  old_person text,
  new_person text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.app_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  low_stock_threshold integer NOT NULL DEFAULT 2,
  dashboard_alerts_enabled boolean NOT NULL DEFAULT true,
  warranty_alert_days integer NOT NULL DEFAULT 30,
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.app_settings (id) VALUES (true);

-- Grants + RLS
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['branches','departments','responsible_persons','parts','suppliers','toners','toner_stock_entries','printers','toner_replacements','toner_replacement_items','maintenance_records','printer_transfers','app_settings']
  LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "auth_all_%1$s" ON public.%1$I FOR ALL TO authenticated USING (true) WITH CHECK (true)', t);
  END LOOP;
END $$;

GRANT USAGE, SELECT ON SEQUENCE public.printer_asset_seq TO authenticated, service_role;

-- Seed common parts
INSERT INTO public.parts (name) VALUES ('درام (Drum)'),('فيوزر (Fuser)'),('بكرة السحب (Pickup Roller)'),('لوحة الفورماتر (Formatter Board)');

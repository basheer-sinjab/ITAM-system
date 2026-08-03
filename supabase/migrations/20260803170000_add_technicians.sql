CREATE TABLE IF NOT EXISTS public.technicians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth_all_technicians" ON public.technicians
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.technicians TO authenticated;

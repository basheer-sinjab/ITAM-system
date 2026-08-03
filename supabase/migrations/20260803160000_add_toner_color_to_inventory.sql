ALTER TABLE public.inventory_items
  ADD COLUMN IF NOT EXISTS color text;

ALTER TABLE public.inventory_items
  ADD CONSTRAINT inventory_items_toner_color_check
  CHECK (category <> 'Toner' OR color IN ('B', 'Y', 'M', 'C'));

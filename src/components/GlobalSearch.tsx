import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  KeyRound,
  Monitor,
  Package,
  Search,
  UserRound,
  Wrench,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const SOURCES = [
  {
    key: "assets",
    table: "assets",
    icon: Monitor,
    title: (item: any) => item.name,
    subtitle: (item: any) => item.asset_id || item.serial_number,
    to: (item: any) => `/assets/${item.id}`,
  },
  {
    key: "employees",
    table: "employees",
    icon: UserRound,
    title: (item: any) => item.full_name,
    subtitle: (item: any) => item.employee_number || item.email,
    to: (item: any) => `/people-departments/employee/${item.id}`,
  },
  {
    key: "inventory",
    table: "inventory_items",
    icon: Package,
    title: (item: any) => item.name,
    subtitle: (item: any) => `الكمية: ${item.quantity}`,
    to: () => "/inventory",
  },
  {
    key: "licenses",
    table: "licenses",
    icon: KeyRound,
    title: (item: any) => item.license_name,
    subtitle: (item: any) => item.product_name,
    to: (item: any) => `/licenses/${item.id}`,
  },
  {
    key: "maintenance",
    table: "asset_maintenance",
    icon: Wrench,
    title: (item: any) => item.problem_description || "سجل صيانة",
    subtitle: (item: any) => item.maintenance_date,
    to: () => "/maintenance",
  },
] as const;

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data = {} } = useQuery({
    queryKey: ["global-search-data"],
    enabled: open,
    queryFn: async () =>
      Object.fromEntries(
        await Promise.all(
          SOURCES.map(async (source) => [
            source.key,
            (await supabase.from(source.table).select("*")).data ?? [],
          ]),
        ),
      ),
  });
  const results = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (term.length < 2) return [];
    return SOURCES.flatMap((source) =>
      ((data as any)[source.key] || [])
        .filter((item: any) =>
          Object.values(item).some((value) =>
            String(value ?? "")
              .toLowerCase()
              .includes(term),
          ),
        )
        .slice(0, 5)
        .map((item: any) => ({ source, item })),
    ).slice(0, 18);
  }, [data, search]);
  const go = (path: string) => {
    setOpen(false);
    setSearch("");
    navigate({ to: path as any });
  };
  return (
    <>
      <Button
        variant="outline"
        className="hidden w-72 justify-start gap-2 text-muted-foreground lg:flex"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        بحث عام في النظام
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>البحث العام</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              className="pr-9"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث عن أصل، موظف، ترخيص، صيانة أو عنصر مخزون…"
            />
          </div>
          <div className="max-h-[55vh] space-y-1 overflow-y-auto">
            {results.map(({ source, item }) => (
              <button
                key={`${source.key}-${item.id}`}
                className="flex w-full items-center gap-3 rounded-lg p-3 text-right hover:bg-muted"
                onClick={() => go(source.to(item))}
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <source.icon className="size-4" />
                </span>
                <span>
                  <span className="block font-medium">
                    {source.title(item)}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {source.subtitle(item) || "—"}
                  </span>
                </span>
              </button>
            ))}
            {search.trim().length >= 2 && !results.length && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                لا توجد نتائج مطابقة.
              </p>
            )}
            {search.trim().length < 2 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                اكتب حرفين على الأقل للبحث في كل النظام.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { supabase } from "@/integrations/supabase/client";

export const PRINTER_STATUS = {
  active: "نشطة",
  maintenance: "تحت الصيانة",
  out_of_service: "خارج الخدمة",
  retired: "مؤرشفة",
} as const;
export type PrinterStatus = keyof typeof PRINTER_STATUS;

export const STATUS_CLASS: Record<PrinterStatus, string> = {
  active: "bg-success/15 text-success border-success/30",
  maintenance: "bg-warning/20 text-warning-foreground border-warning/40",
  out_of_service: "bg-destructive/15 text-destructive border-destructive/30",
  retired: "bg-muted text-muted-foreground border-border",
};

export const TONER_COLORS = {
  black: "أسود",
  cyan: "سماوي",
  magenta: "أرجواني",
  yellow: "أصفر",
  other: "أخرى",
} as const;
export type TonerColor = keyof typeof TONER_COLORS;

export const TONER_SWATCH: Record<TonerColor, string> = {
  black: "bg-toner-black",
  cyan: "bg-toner-cyan",
  magenta: "bg-toner-magenta",
  yellow: "bg-toner-yellow",
  other: "bg-toner-other",
};

export const MAINTENANCE_TYPES = {
  repair: "إصلاح",
  part_replacement: "استبدال قطعة",
  cleaning: "تنظيف",
  preventive: "صيانة وقائية",
  setup: "إعداد / تهيئة",
  other: "أخرى",
} as const;
export type MaintenanceType = keyof typeof MAINTENANCE_TYPES;

export function formatDate(value?: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    numberingSystem: "latn",
  }).format(d);
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function daysUntil(date?: string | null) {
  if (!date) return null;
  const diff = new Date(date).getTime() - new Date().setHours(0, 0, 0, 0);
  return Math.round(diff / 86400000);
}

/** Signed URL cache for the private printer-images bucket. */
const urlCache = new Map<string, string>();
export async function resolveImage(path?: string | null) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (urlCache.has(path)) return urlCache.get(path)!;
  const { data } = await supabase.storage.from("printer-images").createSignedUrl(path, 60 * 60 * 8);
  if (data?.signedUrl) {
    urlCache.set(path, data.signedUrl);
    return data.signedUrl;
  }
  return null;
}

export async function uploadPrinterImage(file: File) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("printer-images").upload(path, file);
  if (error) throw error;
  return path;
}

export function must<T>(res: { data: T; error: { message: string } | null }): T {
  if (res.error) throw new Error(res.error.message);
  return res.data;
}

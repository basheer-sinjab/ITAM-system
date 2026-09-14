import { Input } from "@/components/ui/input";

export const COLOR_PALETTE = [
  "#2563eb",
  "#0f766e",
  "#7c3aed",
  "#c2410c",
  "#be123c",
  "#0369a1",
  "#4d7c0f",
  "#a21caf",
];

export function ColorField({ value, onChange }: any) {
  return (
    <div className="flex items-center gap-3">
      <Input
        type="color"
        className="h-10 w-16 cursor-pointer p-1"
        value={value || COLOR_PALETTE[0]}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="flex flex-wrap gap-1.5">
        {COLOR_PALETTE.map((color) => (
          <button
            key={color}
            type="button"
            className={`size-6 rounded-full border-2 ${value === color ? "border-foreground" : "border-background"}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            aria-label={`اختيار اللون ${color}`}
          />
        ))}
      </div>
    </div>
  );
}

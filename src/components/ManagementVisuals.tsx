import type { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function ManagementHeader({
  icon: Icon,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Icon className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {action}
    </header>
  );
}

type MetricCardProps = {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  tone?: "blue" | "emerald" | "amber" | "rose";
};

export function MetricCard({
  icon: Icon,
  label,
  value,
  tone = "blue",
}: MetricCardProps) {
  const tones = {
    blue: "bg-primary/10 text-primary",
    emerald: "bg-emerald-500/10 text-emerald-700",
    amber: "bg-amber-500/10 text-amber-700",
    rose: "bg-rose-500/10 text-rose-700",
  };

  return (
    <div className="surface-panel flex items-center gap-3 p-4">
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}
      >
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
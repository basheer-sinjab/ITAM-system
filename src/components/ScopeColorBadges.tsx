function alphaColor(color: string | null | undefined, alpha: string) {
  return /^#[0-9a-f]{6}$/i.test(color || "") ? `${color}${alpha}` : undefined;
}

function ScopeBadge({
  label,
  color,
}: {
  label: string;
  color?: string | null;
}) {
  const resolved = color || "#2563eb";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium"
      style={{
        borderColor: alphaColor(resolved, "55"),
        backgroundColor: alphaColor(resolved, "12"),
        color: resolved,
      }}
    >
      <span
        className="size-2 rounded-full"
        style={{ backgroundColor: resolved }}
      />
      {label}
    </span>
  );
}

export function ScopeColorBadges({ department, branch }: any) {
  if (!department && !branch) return null;
  return (
    <span className="flex flex-wrap gap-1.5">
      {department && (
        <ScopeBadge
          label={department.name}
          color={department.color || "#2563eb"}
        />
      )}
      {branch && (
        <ScopeBadge label={branch.name} color={branch.color || "#0f766e"} />
      )}
    </span>
  );
}

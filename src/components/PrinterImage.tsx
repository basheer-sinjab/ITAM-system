import { useQuery } from "@tanstack/react-query";
import { Printer as PrinterIcon } from "lucide-react";
import { resolveImage } from "@/lib/pms";
import { cn } from "@/lib/utils";

export function PrinterImage({
  path,
  alt,
  className,
}: {
  path?: string | null;
  alt: string;
  className?: string;
}) {
  const { data } = useQuery({
    queryKey: ["img", path],
    queryFn: () => resolveImage(path),
    enabled: !!path,
    staleTime: 1000 * 60 * 30,
  });

  if (!path || !data) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-secondary text-muted-foreground",
          className,
        )}
      >
        <PrinterIcon className="size-10 opacity-40" />
      </div>
    );
  }

  return <img src={data} alt={alt} loading="lazy" className={cn("object-cover", className)} />;
}

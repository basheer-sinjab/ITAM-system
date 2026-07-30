import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function QrCodeBox({ value, size = 180 }: { value: string; size?: number }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(value, { width: size * 2, margin: 1 }).then((url) => {
      if (active) setSrc(url);
    });
    return () => {
      active = false;
    };
  }, [value, size]);

  if (!src) return <div style={{ width: size, height: size }} className="rounded-lg bg-secondary" />;

  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src={src}
        alt={`رمز QR للطابعة ${value}`}
        width={size}
        height={size}
        className="rounded-lg border bg-card p-2"
      />
      <p className="font-mono text-sm text-muted-foreground" dir="ltr">
        {value}
      </p>
      <Button
        variant="outline"
        size="sm"
        className="no-print gap-2"
        onClick={() => {
          const a = document.createElement("a");
          a.href = src;
          a.download = `${value}.png`;
          a.click();
        }}
      >
        <Download className="size-4" />
        تحميل الرمز
      </Button>
    </div>
  );
}

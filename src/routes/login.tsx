import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const [configured, setConfigured] = useState<boolean>();
  const [username, setUsername] = useState("Basheer");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [working, setWorking] = useState(false);

  useEffect(() => {
    fetch("/api/auth/status", { cache: "no-store" })
      .then((response) => response.json())
      .then((state) => {
        if (state.authenticated) window.location.replace("/");
        else setConfigured(Boolean(state.configured));
      })
      .catch(() => toast.error("تعذر التحقق من حالة تسجيل الدخول"));
  }, []);

  const submit = async () => {
    setWorking(true);
    try {
      const response = await fetch(
        configured ? "/api/auth/login" : "/api/auth/setup",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-itam-request": "1",
          },
          body: JSON.stringify(
            configured ? { username, password } : { password, confirmPassword },
          ),
        },
      );
      const body = await response.json();
      if (!response.ok) throw new Error(body.message || "تعذر تسجيل الدخول");
      window.location.replace("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تعذر تسجيل الدخول");
    } finally {
      setWorking(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-5">
      <section className="w-full max-w-md rounded-2xl border bg-card p-7 shadow-xl">
        <div className="mb-7 flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            {configured ? (
              <LockKeyhole className="size-6" />
            ) : (
              <ShieldCheck className="size-6" />
            )}
          </span>
          <div>
            <h1 className="text-xl font-bold">
              {configured ? "تسجيل دخول المدير" : "إعداد حساب المدير"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {configured
                ? "أدخل بيانات المدير للوصول إلى النظام."
                : "أنشئ كلمة مرور لحماية النظام على هذا الجهاز."}
            </p>
          </div>
        </div>

        {configured === undefined ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            جارٍ التحميل…
          </p>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              void submit();
            }}
          >
            {configured && (
              <div className="space-y-2">
                <Label>اسم المستخدم</Label>
                <Input
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label>كلمة المرور</Label>
              <Input
                autoFocus
                type="password"
                minLength={8}
                maxLength={128}
                autoComplete={configured ? "current-password" : "new-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {!configured && (
              <div className="space-y-2">
                <Label>تأكيد كلمة المرور</Label>
                <Input
                  type="password"
                  minLength={8}
                  maxLength={128}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            )}
            <Button className="w-full" type="submit" disabled={working}>
              {working
                ? "جارٍ الحفظ…"
                : configured
                  ? "دخول"
                  : "إنشاء الحساب والدخول"}
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}

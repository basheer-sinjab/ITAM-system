import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
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
        else {
          setConfigured(Boolean(state.configured));
          if (state.username) setUsername(state.username);
        }
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
            configured
              ? { username: username.trim(), password }
              : { password, confirmPassword },
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-5 py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 size-[30rem] rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/80" />
      </div>

      <section className="relative w-full max-w-[400px] text-center">
        <div className="mx-auto mb-5 flex size-24 items-center justify-center rounded-full border-8 border-white bg-primary shadow-xl shadow-primary/20">
          {configured ? (
            <UserRound
              className="size-11 text-primary-foreground"
              strokeWidth={1.7}
            />
          ) : (
            <ShieldCheck
              className="size-11 text-primary-foreground"
              strokeWidth={1.7}
            />
          )}
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {configured ? "تسجيل الدخول" : "إعداد الحساب"}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {configured
            ? "أدخل بيانات حسابك للوصول إلى النظام"
            : "أنشئ كلمة المرور للدخول إلى النظام لأول مرة"}
        </p>

        {configured === undefined ? (
          <div className="mt-8 rounded-3xl border border-white/80 bg-white/90 p-8 shadow-2xl shadow-slate-300/40 backdrop-blur">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <LockKeyhole className="size-4" />
              جارٍ تجهيز شاشة الدخول...
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-white/80 bg-white/90 p-7 text-right shadow-2xl shadow-slate-300/40 backdrop-blur">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                void submit();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="login-username" className="sr-only">
                  اسم المستخدم
                </Label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="login-username"
                    autoFocus={configured}
                    autoComplete="username"
                    placeholder="اسم المستخدم"
                    value={username}
                    readOnly={!configured}
                    onChange={(event) => setUsername(event.target.value)}
                    className="h-12 rounded-xl border-slate-200 bg-white pr-11 text-base shadow-none focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="sr-only">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="login-password"
                    autoFocus={!configured}
                    type="password"
                    minLength={8}
                    maxLength={128}
                    autoComplete={
                      configured ? "current-password" : "new-password"
                    }
                    placeholder="كلمة المرور"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 rounded-xl border-slate-200 bg-white pr-11 text-base shadow-none focus-visible:ring-primary"
                  />
                </div>
              </div>

              {!configured && (
                <div className="space-y-2">
                  <Label htmlFor="login-confirm-password" className="sr-only">
                    تأكيد كلمة المرور
                  </Label>
                  <Input
                    id="login-confirm-password"
                    type="password"
                    minLength={8}
                    maxLength={128}
                    autoComplete="new-password"
                    placeholder="تأكيد كلمة المرور"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="h-12 rounded-xl border-slate-200 bg-white text-base shadow-none focus-visible:ring-primary"
                  />
                </div>
              )}

              <Button
                className="h-12 w-full rounded-xl text-base shadow-lg shadow-primary/20"
                type="submit"
                disabled={working}
              >
                <span>
                  {working
                    ? "جارٍ الدخول..."
                    : configured
                      ? "دخول"
                      : "إنشاء الحساب"}
                </span>
                <ArrowLeft className="size-5" />
              </Button>
            </form>
          </div>
        )}

        <p className="mt-6 text-xs font-medium tracking-wide text-slate-400">
          ITAMFloss
        </p>
      </section>
    </main>
  );
}

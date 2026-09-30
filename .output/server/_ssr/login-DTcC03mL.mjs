import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { P as LockKeyhole, ct as ArrowLeft, m as ShieldCheck, o as UserRound } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-Dby3FvDq.mjs";
import { t as Label } from "./label-DF0aFIxM.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DTcC03mL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const [configured, setConfigured] = (0, import_react.useState)();
	const [username, setUsername] = (0, import_react.useState)("Basheer");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [working, setWorking] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		fetch("/api/auth/status", { cache: "no-store" }).then((response) => response.json()).then((state) => {
			if (state.authenticated) window.location.replace("/");
			else {
				setConfigured(Boolean(state.configured));
				if (state.username) setUsername(state.username);
			}
		}).catch(() => toast.error("تعذر التحقق من حالة تسجيل الدخول"));
	}, []);
	const submit = async () => {
		setWorking(true);
		try {
			const response = await fetch(configured ? "/api/auth/login" : "/api/auth/setup", {
				method: "POST",
				headers: {
					"content-type": "application/json",
					"x-itam-request": "1"
				},
				body: JSON.stringify(configured ? {
					username: username.trim(),
					password
				} : {
					password,
					confirmPassword
				})
			});
			const body = await response.json();
			if (!response.ok) throw new Error(body.message || "تعذر تسجيل الدخول");
			window.location.replace("/");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "تعذر تسجيل الدخول");
		} finally {
			setWorking(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-5 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-40 -left-32 size-[30rem] rounded-full bg-sky-200/50 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-1/2 h-px bg-white/80" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative w-full max-w-[400px] text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-5 flex size-24 items-center justify-center rounded-full border-8 border-white bg-primary shadow-xl shadow-primary/20",
					children: configured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
						className: "size-11 text-primary-foreground",
						strokeWidth: 1.7
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
						className: "size-11 text-primary-foreground",
						strokeWidth: 1.7
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight text-slate-900",
					children: configured ? "تسجيل الدخول" : "إعداد الحساب"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-slate-500",
					children: configured ? "أدخل بيانات حسابك للوصول إلى النظام" : "أنشئ كلمة المرور للدخول إلى النظام لأول مرة"
				}),
				configured === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 rounded-3xl border border-white/80 bg-white/90 p-8 shadow-2xl shadow-slate-300/40 backdrop-blur",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2 text-sm text-slate-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-4" }), "جارٍ تجهيز شاشة الدخول..."]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 rounded-3xl border border-white/80 bg-white/90 p-7 text-right shadow-2xl shadow-slate-300/40 backdrop-blur",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-4",
						onSubmit: (event) => {
							event.preventDefault();
							submit();
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "login-username",
									className: "sr-only",
									children: "اسم المستخدم"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "login-username",
										autoFocus: configured,
										autoComplete: "username",
										placeholder: "اسم المستخدم",
										value: username,
										readOnly: !configured,
										onChange: (event) => setUsername(event.target.value),
										className: "h-12 rounded-xl border-slate-200 bg-white pr-11 text-base shadow-none focus-visible:ring-primary"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "login-password",
									className: "sr-only",
									children: "كلمة المرور"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "login-password",
										autoFocus: !configured,
										type: "password",
										minLength: 8,
										maxLength: 128,
										autoComplete: configured ? "current-password" : "new-password",
										placeholder: "كلمة المرور",
										value: password,
										onChange: (event) => setPassword(event.target.value),
										className: "h-12 rounded-xl border-slate-200 bg-white pr-11 text-base shadow-none focus-visible:ring-primary"
									})]
								})]
							}),
							!configured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "login-confirm-password",
									className: "sr-only",
									children: "تأكيد كلمة المرور"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "login-confirm-password",
									type: "password",
									minLength: 8,
									maxLength: 128,
									autoComplete: "new-password",
									placeholder: "تأكيد كلمة المرور",
									value: confirmPassword,
									onChange: (event) => setConfirmPassword(event.target.value),
									className: "h-12 rounded-xl border-slate-200 bg-white text-base shadow-none focus-visible:ring-primary"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "h-12 w-full rounded-xl text-base shadow-lg shadow-primary/20",
								type: "submit",
								disabled: working,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: working ? "جارٍ الدخول..." : configured ? "دخول" : "إنشاء الحساب" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs font-medium tracking-wide text-slate-400",
					children: "ITAMFloss"
				})
			]
		})]
	});
}
//#endregion
export { LoginPage as component };

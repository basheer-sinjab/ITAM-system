export type ITAMOdooRuntime = {
  apiBase: string;
  appBase: string;
  csrfToken: string;
  language: string;
  username: string;
};

declare global {
  interface Window {
    __ITAM_ODOO__?: ITAMOdooRuntime;
  }
}

let cachedRuntime: ITAMOdooRuntime | undefined;

export function odooRuntime() {
  if (typeof window === "undefined") return undefined;
  if (window.__ITAM_ODOO__) return window.__ITAM_ODOO__;
  if (cachedRuntime) return cachedRuntime;

  const encoded = document
    .getElementById("itam-root")
    ?.getAttribute("data-itam-config");
  if (!encoded) return undefined;
  try {
    cachedRuntime = JSON.parse(encoded) as ITAMOdooRuntime;
    window.__ITAM_ODOO__ = cachedRuntime;
    return cachedRuntime;
  } catch {
    return undefined;
  }
}

export function isArabicLanguage() {
  return (odooRuntime()?.language ?? "ar").toLowerCase().startsWith("ar");
}

export function languageDirection() {
  return isArabicLanguage() ? "rtl" : "ltr";
}

export function runtimePath(path: string) {
  const runtime = odooRuntime();
  if (!runtime) return path;
  if (path.startsWith("/api/")) return `${runtime.apiBase}${path.slice(4)}`;
  return path;
}

export function runtimeHeaders(headers?: HeadersInit) {
  const result = new Headers(headers);
  const token = odooRuntime()?.csrfToken;
  if (token) result.set("x-itam-csrf-token", token);
  return result;
}

export function appPath(path = "/") {
  const base = odooRuntime()?.appBase;
  if (!base) return path;
  const suffix = path === "/" ? "" : `/${path.replace(/^\/+/, "")}`;
  return `${base}${suffix}`;
}

export function staticAsset(path: string) {
  if (!odooRuntime()) return path;
  return `${odooRuntime()?.appBase}/assets/${path.replace(/^\/+/, "")}`;
}

export function loginPath() {
  const runtime = odooRuntime();
  return runtime
    ? `/web/login?redirect=${encodeURIComponent(runtime.appBase)}`
    : "/login";
}

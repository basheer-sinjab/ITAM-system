import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { authState, handleLocalAuthRequest } from "./lib/local-auth-server";
import { handleLocalDataRequest } from "./lib/local-data-server";
import { handleLocalImageRequest } from "./lib/local-image-server";
import { validateLocalMutation } from "./lib/local-request-security";

type ServerEntry = {
  fetch: (
    request: Request,
    env: unknown,
    ctx: unknown,
  ) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(
  response: Response,
): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(
    consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`),
  );
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as {
      unhandled?: unknown;
      message?: unknown;
    };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function protectedPage(pathname: string) {
  if (/\.[a-z0-9]+$/i.test(pathname)) return false;
  return (
    pathname === "/" ||
    [
      "/assets",
      "/maintenance",
      "/inventory",
      "/licenses",
      "/people-departments",
      "/reports",
      "/settings",
    ].some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  );
}

function withSecurityHeaders(response: Response) {
  const headers = new Headers(response.headers);
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-frame-options", "DENY");
  headers.set("referrer-policy", "same-origin");
  headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  if (headers.get("content-type")?.includes("application/json"))
    headers.set("cache-control", "no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const authResponse = await handleLocalAuthRequest(request);
      if (authResponse) return withSecurityHeaders(authResponse);

      const protectsData =
        url.pathname.startsWith("/api/local-data") ||
        url.pathname.startsWith("/api/printer-images") ||
        url.pathname.startsWith("/uploads/printers/");
      const protectsPage = protectedPage(url.pathname);
      if (protectsData || protectsPage) {
        const auth = await authState(request);
        if (!auth.authenticated) {
          if (protectsData)
            return withSecurityHeaders(
              Response.json(
                { message: "يجب تسجيل الدخول أولًا" },
                { status: 401 },
              ),
            );
          const loginUrl = new URL("/login", request.url);
          loginUrl.searchParams.set("next", url.pathname);
          return withSecurityHeaders(Response.redirect(loginUrl, 302));
        }
      }

      if (url.pathname === "/login" && (await authState(request)).authenticated)
        return withSecurityHeaders(
          Response.redirect(new URL("/", request.url), 302),
        );

      if (
        url.pathname.startsWith("/api/local-data") ||
        url.pathname.startsWith("/api/printer-images")
      ) {
        const unsafe = validateLocalMutation(request);
        if (unsafe) return withSecurityHeaders(unsafe);
      }

      const dataResponse = await handleLocalDataRequest(request);
      if (dataResponse) return withSecurityHeaders(dataResponse);
      const imageResponse = await handleLocalImageRequest(request);
      if (imageResponse) return withSecurityHeaders(imageResponse);
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withSecurityHeaders(
        await normalizeCatastrophicSsrResponse(response),
      );
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};

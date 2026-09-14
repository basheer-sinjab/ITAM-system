import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.ITAM_SMOKE_PORT || 8099);
const appDirectory = join(
  process.cwd(),
  "itam_floss",
  "static",
  "app",
);
const indexPath = join(appDirectory, "odoo-index.html");
const csrfToken = "smoke-test-token";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
};

function json(response, body, status = 200) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(body));
}

async function body(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function sendApp(response) {
  const config = JSON.stringify({
    apiBase: "/itam_floss/api",
    appBase: "/itam_floss/app",
    csrfToken,
    language: "ar_001",
    username: "Basheer",
  });
  const escaped = config
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  const html = readFileSync(indexPath, "utf8").replace(
    '<div id="itam-root"></div>',
    `<div id="itam-root" data-itam-config="${escaped}"></div>`,
  );
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  response.end(html);
}

function sendStatic(pathname, response) {
  const relative = pathname.slice("/itam_floss/static/app/".length);
  const filePath = normalize(join(appDirectory, relative));
  if (!filePath.startsWith(normalize(appDirectory)) || !existsSync(filePath)) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, {
    "content-type": mimeTypes[extname(filePath)] || "application/octet-stream",
    "content-length": statSync(filePath).size,
  });
  createReadStream(filePath).pipe(response);
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
  if (url.pathname.startsWith("/itam_floss/static/app/")) {
    sendStatic(url.pathname, response);
    return;
  }
  if (
    url.pathname === "/itam_floss/app" ||
    url.pathname.startsWith("/itam_floss/app/")
  ) {
    sendApp(response);
    return;
  }
  if (url.pathname === "/itam_floss/api/auth/status") {
    json(response, {
      configured: true,
      authenticated: true,
      username: "Basheer",
    });
    return;
  }
  if (url.pathname === "/itam_floss/api/local-data/query") {
    const query = await body(request);
    if (query.table === "app_settings") {
      json(response, {
        data: query.one
          ? {
              id: "default",
              low_stock_threshold: 2,
              dashboard_alerts_enabled: true,
              warranty_alert_days: 30,
            }
          : [],
        error: null,
      });
      return;
    }
    json(response, { data: query.one ? null : [], error: null });
    return;
  }
  if (url.pathname === "/itam_floss/api/local-data/export") {
    json(response, { data: {} });
    return;
  }
    json(response, { message: "Smoke endpoint not implemented" }, 404);
  } catch (error) {
    json(
      response,
      { message: error instanceof Error ? error.message : String(error) },
      400,
    );
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`ITAMFloss smoke server: http://127.0.0.1:${port}/itam_floss/app`);
});

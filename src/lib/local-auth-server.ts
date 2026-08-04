import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { getLocalDatabase } from "./local-data-server";
import { readJsonBody, validateLocalMutation } from "./local-request-security";

const COOKIE_NAME = "itam_session";
const SESSION_DAYS = 7;
const DEFAULT_USERNAME = "Basheer";

function cookieValue(request: Request, name: string) {
  const cookie = request.headers.get("cookie") ?? "";
  for (const part of cookie.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return null;
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function passwordHash(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

function passwordIsValid(password: string) {
  return password.length >= 8 && password.length <= 128;
}

function sessionCookie(request: Request, token: string, maxAge: number) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

export async function authState(request: Request) {
  const database = await getLocalDatabase();
  const now = new Date().toISOString();
  database.prepare("DELETE FROM admin_sessions WHERE expires_at <= ?").run(now);
  const configured = Boolean(
    database.prepare("SELECT 1 FROM admin_account WHERE id = 'admin'").get(),
  );
  const token = cookieValue(request, COOKIE_NAME);
  const authenticated = Boolean(
    token &&
    database
      .prepare(
        "SELECT 1 FROM admin_sessions WHERE token_hash = ? AND expires_at > ?",
      )
      .get(tokenHash(token), now),
  );
  return { configured, authenticated };
}

async function createSession(request: Request) {
  const database = await getLocalDatabase();
  const token = randomBytes(32).toString("base64url");
  const createdAt = new Date();
  const expiresAt = new Date(
    createdAt.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  );
  database
    .prepare(
      "INSERT INTO admin_sessions (token_hash, expires_at, created_at) VALUES (?, ?, ?)",
    )
    .run(tokenHash(token), expiresAt.toISOString(), createdAt.toISOString());
  return sessionCookie(
    request,
    token,
    Math.floor((expiresAt.getTime() - createdAt.getTime()) / 1000),
  );
}

export async function handleLocalAuthRequest(request: Request) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/auth")) return null;

  if (url.pathname === "/api/auth/status" && request.method === "GET")
    return Response.json(await authState(request), {
      headers: { "cache-control": "no-store" },
    });

  const unsafe = validateLocalMutation(request);
  if (unsafe) return unsafe;

  try {
    if (url.pathname === "/api/auth/setup" && request.method === "POST") {
      const { password, confirmPassword } = await readJsonBody<{
        password?: string;
        confirmPassword?: string;
      }>(request, 10_000);
      if (!password || !passwordIsValid(password))
        throw new Error("كلمة المرور يجب أن تكون بين 8 و128 حرفًا");
      if (password !== confirmPassword)
        throw new Error("تأكيد كلمة المرور غير مطابق");
      const database = await getLocalDatabase();
      database.exec("BEGIN IMMEDIATE");
      try {
        if (database.prepare("SELECT 1 FROM admin_account LIMIT 1").get())
          throw new Error("تم إعداد حساب المدير مسبقًا");
        const now = new Date().toISOString();
        const salt = randomBytes(16).toString("hex");
        database
          .prepare(
            "INSERT INTO admin_account (id, username, password_hash, password_salt, created_at, updated_at) VALUES ('admin', ?, ?, ?, ?, ?)",
          )
          .run(
            DEFAULT_USERNAME,
            passwordHash(password, salt),
            salt,
            now,
            now,
          );
        database.exec("COMMIT");
      } catch (error) {
        database.exec("ROLLBACK");
        throw error;
      }
      return Response.json(
        { ok: true },
        { headers: { "set-cookie": await createSession(request) } },
      );
    }

    if (url.pathname === "/api/auth/login" && request.method === "POST") {
      const { username, password } = await readJsonBody<{
        username?: string;
        password?: string;
      }>(request, 10_000);
      const database = await getLocalDatabase();
      const account = database
        .prepare(
          "SELECT username, password_hash, password_salt FROM admin_account WHERE username = ?",
        )
        .get(String(username ?? "")) as
        | { username: string; password_hash: string; password_salt: string }
        | undefined;
      const supplied = passwordIsValid(String(password ?? ""))
        ? passwordHash(String(password), account?.password_salt ?? "missing")
        : "";
      const valid = Boolean(
        account &&
        supplied.length === account.password_hash.length &&
        timingSafeEqual(
          Buffer.from(supplied),
          Buffer.from(account.password_hash),
        ),
      );
      if (!valid) throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة");
      return Response.json(
        { ok: true },
        { headers: { "set-cookie": await createSession(request) } },
      );
    }

    if (url.pathname === "/api/auth/logout" && request.method === "POST") {
      const token = cookieValue(request, COOKIE_NAME);
      if (token)
        (await getLocalDatabase())
          .prepare("DELETE FROM admin_sessions WHERE token_hash = ?")
          .run(tokenHash(token));
      return Response.json(
        { ok: true },
        { headers: { "set-cookie": sessionCookie(request, "", 0) } },
      );
    }
  } catch (error) {
    return Response.json(
      {
        message: error instanceof Error ? error.message : "تعذر تسجيل الدخول",
      },
      { status: 400 },
    );
  }

  return new Response("Not found", { status: 404 });
}

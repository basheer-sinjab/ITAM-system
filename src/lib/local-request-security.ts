const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function validateLocalMutation(request: Request) {
  if (!MUTATING_METHODS.has(request.method.toUpperCase())) return null;
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin)
    return Response.json(
      { message: "تم رفض الطلب لأنه صادر من موقع غير موثوق" },
      { status: 403 },
    );
  if (request.headers.get("x-itam-request") !== "1")
    return Response.json({ message: "طلب التعديل غير موثوق" }, { status: 403 });
  return null;
}

export async function readJsonBody<T>(request: Request, maxBytes = 2_000_000) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json"))
    throw new Error("صيغة الطلب غير مدعومة");
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > maxBytes) throw new Error("حجم الطلب أكبر من المسموح");
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > maxBytes)
    throw new Error("حجم الطلب أكبر من المسموح");
  return JSON.parse(text) as T;
}

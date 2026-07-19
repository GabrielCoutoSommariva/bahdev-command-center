import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://www.bahdev.com.br",
  "https://bahdev.com.br",
  "https://bahdev-command-center.onrender.com",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
]);

const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin && allowedOrigins.has(origin) ? origin : "https://www.bahdev.com.br",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  Vary: "Origin",
});

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  if (request.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  const client = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authorization } } },
  );

  const { data: hasAccess, error: adminError } = await client.rpc("has_blog_admin_access");
  if (adminError || !hasAccess) {
    return new Response(JSON.stringify({ error: "forbidden" }), {
      status: 403,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  const deployHook = Deno.env.get("RENDER_DEPLOY_HOOK_URL");
  if (!deployHook) {
    return new Response(JSON.stringify({ error: "deploy_hook_not_configured" }), {
      status: 503,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  const deployResponse = await fetch(deployHook, { method: "POST" });
  if (!deployResponse.ok) {
    return new Response(JSON.stringify({ error: "render_rejected_deploy" }), {
      status: 502,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...headers, "Content-Type": "application/json" },
  });
});

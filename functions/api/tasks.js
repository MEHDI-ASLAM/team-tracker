// Cloudflare Pages Function: shared storage using a KV namespace bound as TASKS
const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "content-type": "application/json" } });

export async function onRequestGet({ env }) {
  if (!env.TASKS) return json({ error: "KV not bound" }, 501);
  const { keys } = await env.TASKS.list({ prefix: "task:" });
  const tasks = (await Promise.all(keys.map(k => env.TASKS.get(k.name, "json")))).filter(Boolean);
  return json(tasks);
}
export async function onRequestPost({ env, request }) {
  if (!env.TASKS) return json({ error: "KV not bound" }, 501);
  const t = await request.json();
  if (!t || !t.id) return json({ error: "bad task" }, 400);
  t.updated = Date.now();
  await env.TASKS.put("task:" + t.id, JSON.stringify(t));
  return json(t);
}
export async function onRequestDelete({ env, request }) {
  if (!env.TASKS) return json({ error: "KV not bound" }, 501);
  const id = new URL(request.url).searchParams.get("id");
  if (id) await env.TASKS.delete("task:" + id);
  return json({ ok: true });
}

// Password gate for the whole site while it is in review.
// Runs on Vercel before any page or file is served, so nothing is sent to anyone
// without the password. The one exception is /guide, which is public. Set GATE_PASSWORD in Vercel to change the word; it
// defaults to "contorno2026". To open the site to everyone, delete this file.

export const config = { matcher: ['/((?!favicon\\.ico).*)'] };

const COOKIE = 'contorno_gate';
const word = () => (process.env.GATE_PASSWORD || 'contorno2026').trim().toLowerCase();

async function token() {
  const data = new TextEncoder().encode(`contorno-gate:${word()}`);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function hasCookie(request, value) {
  const raw = request.headers.get('cookie') || '';
  return raw.split(';').some((c) => c.trim() === `${COOKIE}=${value}`);
}

function page(error) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>contorno</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100svh;display:grid;place-items:center;background:#F5F0E8;color:#2A2A2A;font-family:"DM Sans",system-ui,sans-serif}
  main{width:min(360px,86vw);text-align:center}
  h1{font-weight:500;font-size:22px;letter-spacing:.18em;text-transform:uppercase;margin:0 0 10px}
  p{margin:0 0 26px;font-size:14px;line-height:1.5;opacity:.75}
  form{display:grid;gap:12px}
  input{font:inherit;font-size:16px;padding:13px 14px;border:1px solid rgba(42,42,42,.25);border-radius:4px;background:#fff;color:inherit;text-align:center}
  input:focus-visible{outline:2px solid #2A2A2A;outline-offset:2px}
  button{font:inherit;font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:14px;border:0;border-radius:4px;background:#2A2A2A;color:#F5F0E8;cursor:pointer}
  .err{color:#C0583A;font-size:13px;margin:0 0 12px;opacity:1}
</style></head><body><main>
<h1>contorno</h1>
<p>this site is private until launch. enter the password to continue.</p>
${error ? '<p class="err" role="alert">that is not the password. try again.</p>' : ''}
<form method="post"><input type="password" name="word" autocomplete="off" aria-label="password" autofocus required><button type="submit">enter</button></form>
</main></body></html>`;
  return new Response(html, {
    status: error ? 401 : 200,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' },
  });
}

export default async function middleware(request) {
  // The Puerto Guide is public so it can be shared. Its page and the shared styles stay open.
  const path = new URL(request.url).pathname;
  if (path === '/guide' || path === '/guide/' || path.startsWith('/_astro/')) {
    return new Response(null, { headers: { 'x-middleware-next': '1' } });
  }
  const expected = await token();
  if (hasCookie(request, expected)) {
    return new Response(null, { headers: { 'x-middleware-next': '1' } });
  }
  if (request.method === 'POST') {
    let given = '';
    try { given = String((await request.formData()).get('word') || ''); } catch (e) { /* fall through */ }
    if (given.trim().toLowerCase() === word()) {
      const url = new URL(request.url);
      return new Response(null, {
        status: 303,
        headers: {
          location: url.pathname,
          'set-cookie': `${COOKIE}=${expected}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`,
          'cache-control': 'no-store',
        },
      });
    }
    return page(true);
  }
  return page(false);
}

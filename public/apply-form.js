// Residency application, one page. Sends the answers to /api/apply and keeps a draft in the browser.
(function () {
  var form = document.getElementById('ap-form');
  if (!form) return;
  var KEY = 'contorno-apply-draft';
  var opened = Date.now();
  var mainErr = document.getElementById('ap-err');
  var send = document.getElementById('ap-send');
  var names = ['name', 'email', 'based', 'instagram', 'portfolio', 'make', 'pieces', 'now', 'sentence', 'why', 'idea', 'unlock', 'notes', 'heard'];
  var required = ['name', 'email', 'based', 'portfolio', 'make', 'pieces', 'why'];

  function store(fn) { try { return fn(window.localStorage); } catch (e) { return null; } }
  var saved = store(function (s) { return JSON.parse(s.getItem(KEY) || 'null'); });
  if (saved && typeof saved === 'object') {
    names.forEach(function (k) { if (saved[k] && form.elements[k]) form.elements[k].value = saved[k]; });
  }
  form.addEventListener('input', function (e) {
    var t = e.target;
    if (t.classList) t.classList.remove('bad');
    var box = form.querySelector('[data-err="' + t.name + '"]');
    if (box) box.textContent = '';
    var draft = {};
    names.forEach(function (k) { draft[k] = form.elements[k].value; });
    store(function (s) { s.setItem(KEY, JSON.stringify(draft)); });
  });

  function check(k, v) {
    v = (v || '').trim();
    if (required.indexOf(k) > -1 && !v) return 'This one is required.';
    if (k === 'email' && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return 'Please enter a valid email address.';
    if (k === 'portfolio' && v && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}/.test(v)) return 'Please enter a link to your portfolio or website.';
    return '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    mainErr.textContent = '';
    var payload = { elapsed: Math.round((Date.now() - opened) / 1000), company: form.elements.company.value || '' };
    var first = null;
    names.forEach(function (k) {
      var el = form.elements[k];
      payload[k] = el.value.trim();
      var msg = check(k, el.value);
      var box = form.querySelector('[data-err="' + k + '"]');
      if (box) box.textContent = msg;
      el.classList.toggle('bad', !!msg);
      if (msg && !first) first = el;
    });
    if (first) { mainErr.textContent = 'Please fill in the questions marked above.'; first.focus(); return; }
    send.disabled = true; send.textContent = 'Sending...';
    fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) { if (!res.ok) throw res.j; thanks(payload); })
      .catch(function (j) {
        send.disabled = false; send.textContent = 'Send application';
        var fallback = !j || j.error === 'send_failed' || j.error === 'not_configured' || !j.error;
        mainErr.textContent = fallback ? 'We could not send your application just now. Your answers are saved here. Please try again in a minute, or email hello@contornocollective.com.' : j.error;
      });
  });

  function thanks(p) {
    store(function (s) { s.removeItem(KEY); });
    var first = (p.name || '').trim().split(/\s+/)[0] || 'there';
    document.getElementById('ap-thanks-h').textContent = 'Thank you, ' + first;
    document.getElementById('ap-thanks-p').textContent = 'Your application is in. We read every one, and we will write to ' + p.email + '.';
    form.hidden = true;
    document.getElementById('ap-thanks').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
})();

// Residency application form. Sends the answers to /api/apply.
// Keeps a draft in the browser so a refresh does not lose the answers.
(function () {
  var form = document.getElementById('rs-form');
  if (!form) return;
  var error = document.getElementById('rs-error');
  var send = document.getElementById('rs-send');
  var opened = Date.now();
  var KEY = 'contorno-apply-draft';
  var required = ['name', 'email', 'based', 'portfolio', 'make', 'pieces', 'why'];

  function store(fn) { try { return fn(window.localStorage); } catch (e) { return null; } }

  // Restore and save the draft.
  var saved = store(function (s) { return JSON.parse(s.getItem(KEY) || 'null'); });
  if (saved) Object.keys(saved).forEach(function (k) { if (form.elements[k] && k !== 'company') form.elements[k].value = saved[k]; });
  form.addEventListener('input', function (e) {
    e.target.classList.remove('bad');
    var data = {};
    [].slice.call(form.elements).forEach(function (el) { if (el.name && el.name !== 'company' && el.value) data[el.name] = el.value; });
    store(function (s) { s.setItem(KEY, JSON.stringify(data)); });
  });

  function showError(msg) { error.textContent = msg; error.hidden = !msg; if (msg) error.scrollIntoView({ block: 'center', behavior: 'smooth' }); }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); showError('');
    var missing = 0;
    required.forEach(function (k) { var el = form.elements[k]; var bad = !el.value.trim(); el.classList.toggle('bad', bad); missing += bad ? 1 : 0; });
    var em = form.elements.email;
    if (em.value.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value.trim())) { em.classList.add('bad'); showError('Please enter a valid email.'); return; }
    if (missing) { showError('Please fill in the fields marked with a star.'); return; }

    var payload = { elapsed: Math.round((Date.now() - opened) / 1000) };
    [].slice.call(form.elements).forEach(function (el) { if (el.name) payload[el.name] = el.value; });

    send.disabled = true; send.textContent = 'Sending...';
    fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok) throw res.j;
        store(function (s) { s.removeItem(KEY); });
        var first = (payload.name || '').trim().split(/\s+/)[0] || 'there';
        document.getElementById('rs-thanks-title').textContent = 'Thank you, ' + first;
        document.getElementById('rs-thanks-text').textContent = 'Your application is in. We read every one, and we will write to ' + payload.email.trim() + '.';
        form.hidden = true; document.getElementById('rs-thanks').hidden = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(function (j) {
        send.disabled = false; send.textContent = 'Send application';
        if (j && j.field && form.elements[j.field]) form.elements[j.field].classList.add('bad');
        var fallback = (j && (j.error === 'send_failed' || j.error === 'not_configured' || !j.error));
        showError(fallback
          ? 'We could not send your application just now. Your answers are saved here. Please try again in a minute, or email hello@contornocollective.com.'
          : j.error);
      });
  });
})();

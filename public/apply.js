// Residency application, one question at a time like a Typeform, built into the page.
// Sends the answers to /api/apply. Keeps a draft in the browser so a refresh does not lose them.
(function () {
  var root = document.getElementById('ap');
  if (!root) return;
  var stage = document.getElementById('ap-stage');
  var fill = document.getElementById('ap-fill');
  var foot = document.getElementById('ap-foot');
  var backBtn = document.getElementById('ap-back');
  var count = document.getElementById('ap-count');
  var KEY = 'contorno-apply-draft';
  var opened = Date.now();

  // Same questions as before. kind: short | long | email | url | links
  var Q = [
    { k: 'name', req: true, kind: 'short', q: 'Your name', ph: 'First and last name' },
    { k: 'email', req: true, kind: 'email', q: 'Your email address', help: 'This is where we will write to you.', ph: 'name@example.com' },
    { k: 'based', req: true, kind: 'short', q: 'Where you are based right now', ph: 'City, country' },
    { k: 'instagram', kind: 'short', q: 'Your Instagram handle', ph: '@' },
    { k: 'portfolio', req: true, kind: 'url', q: 'Your portfolio or website', ph: 'https://' },
    { k: 'make', req: true, kind: 'long', q: 'What you make', help: 'Medium, subject, the way you work.' },
    { k: 'pieces', req: true, kind: 'long', q: 'Links to 3 to 5 pieces you are proud of', help: 'One link per line. Recent work or work from a few years back, your choice.', ph: 'https://' },
    { k: 'now', kind: 'long', q: 'What you are making right now', help: 'The thing that is pulling you in at the moment.' },
    { k: 'sentence', kind: 'short', q: 'How a friend would describe your work in one sentence' },
    { k: 'why', req: true, kind: 'long', q: 'Why Puerto Escondido, and why now' },
    { k: 'idea', kind: 'long', q: 'A rough idea for the piece you would leave behind', help: 'Residents leave one piece that lives at Contorno. Describe what you might make for a space like this. It is a rough idea and it can change.' },
    { k: 'unlock', kind: 'long', q: 'What a month here would unlock for you' },
    { k: 'notes', kind: 'long', q: 'Anything we should know', help: 'Dietary needs, accessibility, traveling with a partner, working hours.' },
    { k: 'heard', kind: 'short', q: 'How you heard about the residency' },
  ];
  var total = Q.length;
  var answers = {};
  var step = -1; // -1 welcome, 0..total-1 questions, total review, total+1 thanks

  function store(fn) { try { return fn(window.localStorage); } catch (e) { return null; } }
  var saved = store(function (s) { return JSON.parse(s.getItem(KEY) || 'null'); });
  if (saved && typeof saved === 'object') answers = saved;
  function save() { store(function (s) { s.setItem(KEY, JSON.stringify(answers)); }); }

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function show(node) { stage.innerHTML = ''; node.classList.add('ap-step'); stage.appendChild(node); }
  function progress() { fill.style.width = Math.max(0, Math.min(100, ((step + 1) / (total + 1)) * 100)) + '%'; }

  function welcome() {
    step = -1; progress(); foot.hidden = true;
    var w = el('div', 'ap-welcome');
    w.appendChild(el('h2', null, 'A month in Puerto Escondido'));
    w.appendChild(el('p', null, 'The application has ' + total + ' short questions and takes about ten minutes. We read every one.'));
    var acts = el('div', 'ap-actions');
    var go = el('button', 'ap-ok', (Object.keys(answers).length ? 'Continue' : 'Start')); go.type = 'button';
    go.addEventListener('click', function () { ask(0); });
    acts.appendChild(go); acts.appendChild(el('span', 'ap-hint', 'Press Enter'));
    w.appendChild(acts); show(w); go.focus();
    keyNext = function () { ask(0); };
  }

  var keyNext = null;
  function valid(q, v) {
    v = (v || '').trim();
    if (q.req && !v) return 'This one is required.';
    if (q.kind === 'email' && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return 'Please enter a valid email address.';
    if (q.kind === 'url' && v && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}/.test(v)) return 'Please enter a link to your portfolio or website.';
    return '';
  }

  function ask(i) {
    step = i; progress(); foot.hidden = false; backBtn.hidden = false;
    count.textContent = (i + 1) + ' of ' + total;
    var q = Q[i];
    var wrap = el('div');
    wrap.appendChild(el('p', 'ap-num', (i + 1) + (q.req ? ' *' : '')));
    wrap.appendChild(el('h2', 'ap-q', q.q));
    if (q.help) wrap.appendChild(el('p', 'ap-help', q.help));
    var long = q.kind === 'long';
    var field = el(long ? 'textarea' : 'input', 'ap-field');
    if (long) field.rows = 3; else { field.type = q.kind === 'email' ? 'email' : 'text'; if (q.kind === 'url') field.setAttribute('inputmode', 'url'); }
    if (q.ph) field.placeholder = q.ph;
    field.value = answers[q.k] || '';
    field.setAttribute('aria-label', q.q);
    wrap.appendChild(field);
    var err = el('p', 'ap-err'); err.setAttribute('role', 'alert'); wrap.appendChild(err);

    var acts = el('div', 'ap-actions');
    var ok = el('button', 'ap-ok', i === total - 1 ? 'Review' : 'OK'); ok.type = 'button';
    acts.appendChild(ok);
    acts.appendChild(el('span', 'ap-hint', long ? 'Press Cmd or Ctrl + Enter' : 'Press Enter'));
    if (!q.req) { var skip = el('button', 'ap-skip', 'Skip'); skip.type = 'button'; skip.addEventListener('click', function () { answers[q.k] = field.value; save(); advance(); }); acts.appendChild(skip); }
    wrap.appendChild(acts);

    function next() {
      var msg = valid(q, field.value);
      if (msg) { err.textContent = msg; field.classList.add('bad'); field.focus(); return; }
      answers[q.k] = field.value.trim(); save(); advance();
    }
    ok.addEventListener('click', next);
    field.addEventListener('input', function () { field.classList.remove('bad'); err.textContent = ''; answers[q.k] = field.value; save(); });
    keyNext = function (e) {
      if (long && !(e.metaKey || e.ctrlKey)) return false;
      next(); return true;
    };
    show(wrap); field.focus();
  }

  function advance() { if (step + 1 < total) ask(step + 1); else review(); }
  backBtn.addEventListener('click', function () {
    if (step > 0 && step <= total) ask(step - 1);
    else if (step === total) ask(total - 1);
    else welcome();
  });

  function review() {
    step = total; progress(); foot.hidden = false; backBtn.hidden = false; count.textContent = 'Review';
    var wrap = el('div');
    wrap.appendChild(el('p', 'ap-num', 'Almost done'));
    wrap.appendChild(el('h2', 'ap-q', 'Review your answers'));
    wrap.appendChild(el('p', 'ap-help', 'Check everything and edit anything you want to change, then send it.'));
    var ul = el('ul', 'ap-review');
    Q.forEach(function (q, i) {
      var li = document.createElement('li');
      var d = document.createElement('div');
      d.appendChild(el('b', null, q.q));
      d.appendChild(el('span', null, (answers[q.k] || '').trim() || 'Left blank'));
      var b = el('button', null, 'Edit'); b.type = 'button'; b.addEventListener('click', function () { ask(i); });
      li.appendChild(d); li.appendChild(b); ul.appendChild(li);
    });
    wrap.appendChild(ul);
    var err = el('p', 'ap-err'); err.setAttribute('role', 'alert'); wrap.appendChild(err);
    var acts = el('div', 'ap-actions');
    var send = el('button', 'ap-ok', 'Send application'); send.type = 'button';
    acts.appendChild(send); wrap.appendChild(acts);
    show(wrap);
    keyNext = null;

    // The hidden trap field is never shown to people. Bots tend to fill it in.
    send.addEventListener('click', function () {
      var payload = { elapsed: Math.round((Date.now() - opened) / 1000), company: '' };
      Q.forEach(function (q) { payload[q.k] = (answers[q.k] || '').trim(); });
      for (var i = 0; i < Q.length; i++) { var m = valid(Q[i], payload[Q[i].k]); if (m) { err.textContent = 'Please go back to "' + Q[i].q + '": ' + m; return; } }
      send.disabled = true; send.textContent = 'Sending...'; err.textContent = '';
      fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) { if (!res.ok) throw res.j; thanks(payload); })
        .catch(function (j) {
          send.disabled = false; send.textContent = 'Send application';
          var fallback = !j || j.error === 'send_failed' || j.error === 'not_configured' || !j.error;
          err.textContent = fallback ? 'We could not send your application just now. Your answers are saved here. Please try again in a minute, or email hello@contornocollective.com.' : j.error;
        });
    });
  }

  function thanks(p) {
    step = total + 1; fill.style.width = '100%'; foot.hidden = true; keyNext = null;
    store(function (s) { s.removeItem(KEY); });
    var first = (p.name || '').trim().split(/\s+/)[0] || 'there';
    var w = el('div', 'ap-thanks');
    w.appendChild(el('p', 'ap-num', 'Application received'));
    w.appendChild(el('h2', null, 'Thank you, ' + first));
    w.appendChild(el('p', null, 'Your application is in. We read every one, and we will write to ' + p.email + '.'));
    show(w); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' || !keyNext) return;
    var t = e.target;
    if (t && (t.tagName === 'BUTTON')) return; // buttons handle Enter themselves
    if (keyNext(e) !== false) e.preventDefault();
  });

  welcome();
})();

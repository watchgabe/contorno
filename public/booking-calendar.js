// Live availability calendar for the unit pages.
// Reads /api/availability for blocked nights and /api/quote for the price.
// If the API is unavailable the calendar still works and the guest is sent to
// the booking page, which checks availability itself.
(function () {
  var form = document.getElementById('bk');
  if (!form) return;
  var room = form.dataset.room, prop = form.dataset.prop;
  var $ = function (id) { return document.getElementById(id); };
  var cal = $('bk-cal'), monthsEl = $('bk-months'), sum = $('bk-sum'), go = $('bk-go');
  var inT = $('bk-in-t'), outT = $('bk-out-t'), inH = $('bk-in'), outH = $('bk-out'), adults = $('bk-adults');
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var off = {}, apiOk = true, start = null, end = null, view, quoteSeq = 0;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); }
  function parse(s) { var p = s.split('-'); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])); }
  function addDays(s, n) { var d = parse(s); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
  var now = new Date(), today = iso(now.getFullYear(), now.getMonth(), now.getDate());
  view = { y: now.getFullYear(), m: now.getMonth() };

  function pretty(s) { var d = parse(s); return MONTHS[d.getUTCMonth()].slice(0, 3) + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear(); }
  function nightsFree(a, b) { // every night from a up to (not including) b is free
    for (var d = a; d < b; d = addDays(d, 1)) if (off[d] || d < today) return false;
    return true;
  }

  function render() {
    monthsEl.innerHTML = '';
    for (var k = 0; k < 1; k++) {
      var y = view.y, m = view.m + k; if (m > 11) { m -= 12; y++; }
      var first = new Date(Date.UTC(y, m, 1)), lead = (first.getUTCDay() + 6) % 7, days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
      var box = document.createElement('div'); box.className = 'bu-month';
      var h = '<p class="bu-month-t">' + MONTHS[m] + ' ' + y + '</p><div class="bu-grid">';
      ['M','T','W','T','F','S','S'].forEach(function (w) { h += '<span class="bu-dow">' + w + '</span>'; });
      for (var i = 0; i < lead; i++) h += '<span></span>';
      for (var d = 1; d <= days; d++) {
        var s = iso(y, m, d), cls = 'bu-day', dis = false;
        if (s < today) { cls += ' past'; dis = true; }
        else if (!start || (start && end)) { if (off[s]) { cls += ' off'; dis = true; } }
        else if (s > start) { if (!nightsFree(start, s)) { cls += ' off'; dis = true; } }
        else if (s <= start) { if (off[s]) { cls += ' off'; dis = true; } }
        if (start && s === start) cls += ' edge';
        if (end && s === end) cls += ' edge';
        if (start && end && s > start && s < end) cls += ' mid';
        h += '<button type="button" class="' + cls + '" data-d="' + s + '"' + (dis ? ' disabled' : '') + '>' + d + '</button>';
      }
      box.innerHTML = h + '</div>'; monthsEl.appendChild(box);
    }
    $('bk-prev').disabled = view.y === now.getFullYear() && view.m === now.getMonth();
  }

  function openCal(open) {
    cal.hidden = !open;
    $('bk-open-in').setAttribute('aria-expanded', String(open));
    $('bk-open-out').setAttribute('aria-expanded', String(open));
    if (open) render();
  }
  $('bk-open-in').addEventListener('click', function () { openCal(cal.hidden); });
  $('bk-open-out').addEventListener('click', function () { openCal(cal.hidden); });
  $('bk-prev').addEventListener('click', function () { view.m--; if (view.m < 0) { view.m = 11; view.y--; } render(); });
  $('bk-next').addEventListener('click', function () { view.m++; if (view.m > 11) { view.m = 0; view.y++; } render(); });

  monthsEl.addEventListener('click', function (e) {
    var b = e.target.closest('.bu-day'); if (!b || b.disabled) return;
    var s = b.dataset.d;
    if (!start || (start && end) || s <= start) { start = s; end = null; }
    else { end = s; }
    inT.textContent = start ? pretty(start) : 'Add date';
    outT.textContent = end ? pretty(end) : 'Add date';
    inH.value = start || ''; outH.value = end || '';
    if (start && end) { openCal(false); quote(); }
    else { render(); sum.textContent = 'Now choose your check out date.'; go.disabled = true; }
  });
  adults.addEventListener('change', function () { if (start && end) quote(); });

  function fmt(n) { return new Intl.NumberFormat('en-US').format(Math.round(n)); }
  function checkoutUrl(nights) {
    var u = function (s) { var d = parse(s); return d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate(); };
    return 'https://book.prestigebookingchannel.com/booking.php?propid=' + encodeURIComponent(prop) + '&page=book3' +
      '&checkin_hide=' + u(start) + '&checkout_hide=' + u(end) + '&numnight=' + nights +
      '&numadult=' + encodeURIComponent(adults.value) + '&lang=en&br1-' + encodeURIComponent(room) + '=Reservar';
  }
  var big = document.querySelector('.bu-price .big');
  function quote() {
    var seq = ++quoteSeq, nights = Math.round((parse(end) - parse(start)) / 86400000);
    go.disabled = true; sum.textContent = 'Checking availability...';
    fetch('/api/quote?room=' + room + '&arrival=' + start + '&departure=' + end + '&adults=' + adults.value)
      .then(function (r) { if (!r.ok) throw new Error('x'); return r.json(); })
      .then(function (q) {
        if (seq !== quoteSeq) return;
        if (!q.available) { sum.textContent = 'These dates are not available. Please try other dates.'; return; }
        sum.textContent = nights + (nights === 1 ? ' night' : ' nights') + ', MXN ' + fmt(q.total) + ' in total (about MXN ' + fmt(q.perNight) + ' a night).';
        if (big) big.textContent = 'MXN ' + fmt(q.total);
        go.dataset.href = checkoutUrl(nights); go.disabled = false;
      })
      .catch(function () {
        if (seq !== quoteSeq) return;
        sum.textContent = 'We could not load the price just now. Reserve to see it on the booking page.';
        go.dataset.href = checkoutUrl(nights); go.disabled = false;
      });
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (go.dataset.href && !go.disabled) window.open(go.dataset.href, '_blank', 'noopener');
  });

  // Load blocked nights.
  fetch('/api/availability?room=' + room + '&days=420')
    .then(function (r) { if (!r.ok) throw new Error('x'); return r.json(); })
    .then(function (j) { (j.unavailable || []).forEach(function (d) { off[d] = 1; }); if (!cal.hidden) render(); })
    .catch(function () {
      apiOk = false;
      sum.textContent = 'Live availability is not loading. You can still pick dates and the booking page will check them.';
    });
})();

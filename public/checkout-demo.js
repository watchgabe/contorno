// Demo checkout for the Contorno unit pages.
// Real: price and availability come from the booking system (/api/quote).
// Simulated: the Stripe charge, the hold and the booking in Prestige, the Airbnb update and the email.
// The payment rules below are placeholders until Hōm and Nick confirm them.
(function () {
  var root = document.getElementById('co');
  if (!root) return;
  var $ = function (id) { return document.getElementById(id); };

  // Placeholder payment policy (modeled on Hōm's other houses).
  var POLICY = {
    depositPct: 0.5,      // share of the total paid at booking
    balanceDaysBefore: 14, // the rest is charged this many days before arrival
    securityHold: 5000,   // MXN, held the day before arrival
    securityDaysBefore: 1,
  };

  var units = JSON.parse(root.dataset.units || '{}');
  var q = new URLSearchParams(window.location.search);
  var unit = units[q.get('unit')];
  var inD = q.get('in'), outD = q.get('out');
  var adults = Math.max(1, parseInt(q.get('adults'), 10) || 2);
  var re = /^\d{4}-\d{2}-\d{2}$/;
  if (!unit || !re.test(inD || '') || !re.test(outD || '') || outD <= inD) {
    $('co-empty').hidden = false;
    return;
  }
  $('co-grid').hidden = false;

  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  function parse(s) { var p = s.split('-'); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])); }
  function iso(d) { return d.toISOString().slice(0, 10); }
  function addDays(s, n) { var d = parse(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); }
  function pretty(s) { var d = parse(s); return MONTHS[d.getUTCMonth()].slice(0, 3) + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear(); }
  function mxn(n) { return 'MXN ' + new Intl.NumberFormat('en-US').format(Math.round(n)); }
  var now = new Date(), today = iso(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));
  var nights = Math.round((parse(outD) - parse(inD)) / 86400000);
  var daysUntil = Math.round((parse(inD) - parse(today)) / 86400000);

  // Summary
  $('co-photo').src = unit.photo; $('co-photo').alt = unit.name;
  $('co-unit').textContent = unit.name;
  $('co-in').textContent = pretty(inD);
  $('co-out').textContent = pretty(outD);
  $('co-guests').textContent = adults + (adults === 1 ? ' guest' : ' guests');
  $('co-back').href = '/' + (q.get('unit') === 'penthouse' ? 'penthouse' : 'homes/' + q.get('unit'));
  $('co-policy').textContent = Math.round(POLICY.depositPct * 100) + '% at booking, the balance ' + POLICY.balanceDaysBefore + ' days before arrival, and a ' + mxn(POLICY.securityHold) + ' security hold the day before.';

  var total = null, schedule = null;

  function buildSchedule(t) {
    var payAll = daysUntil <= POLICY.balanceDaysBefore;
    var due = payAll ? t : Math.round(t * POLICY.depositPct);
    var s = { dueNow: due, balance: t - due, balanceDate: payAll ? null : addDays(inD, -POLICY.balanceDaysBefore), securityDate: daysUntil > POLICY.securityDaysBefore ? addDays(inD, -POLICY.securityDaysBefore) : inD, payAll: payAll };
    return s;
  }
  function renderSchedule() {
    var ul = $('co-sched'); ul.innerHTML = '';
    function li(a, small, b) { var el = document.createElement('li'); el.innerHTML = '<span>' + a + (small ? '<small>' + small + '</small>' : '') + '</span><b>' + b + '</b>'; ul.appendChild(el); }
    li(schedule.payAll ? 'Due today' : 'Deposit due today', schedule.payAll ? 'Arrival is within ' + POLICY.balanceDaysBefore + ' days, so the full amount is charged now' : Math.round(POLICY.depositPct * 100) + '% of the total', mxn(schedule.dueNow));
    if (!schedule.payAll) li('Balance', 'Charged to the same card on ' + pretty(schedule.balanceDate), mxn(schedule.balance));
    li('Security hold', 'Held on ' + pretty(schedule.securityDate) + ', released after check out if there is no damage', mxn(POLICY.securityHold));
    $('co-pay').textContent = 'Pay ' + mxn(schedule.dueNow) + ' now';
  }

  var pay = $('co-pay'); pay.disabled = true;
  function loadQuote() {
    return fetch('/api/quote?room=' + unit.room + '&arrival=' + inD + '&departure=' + outD + '&adults=' + adults)
      .then(function (r) { if (!r.ok) throw new Error('quote'); return r.json(); });
  }
  loadQuote().then(function (j) {
    if (!j.available) {
      $('co-price').textContent = 'These dates are no longer available.';
      showError('These dates are no longer available. Please go back and choose other dates.');
      return;
    }
    total = j.total; schedule = buildSchedule(total);
    $('co-price').innerHTML = mxn(total) + '<small>' + nights + (nights === 1 ? ' night' : ' nights') + ', about ' + mxn(j.perNight) + ' a night. Taxes and cleaning fee: to confirm.</small>';
    renderSchedule(); pay.disabled = false;
  }).catch(function () {
    $('co-price').textContent = 'The price could not be loaded.';
    showError('We could not load the price. Please try again in a moment.');
  });

  // Card field formatting
  var num = $('cc-num'), exp = $('cc-exp'), cvc = $('cc-cvc');
  num.addEventListener('input', function () { var d = num.value.replace(/\D/g, '').slice(0, 19); num.value = d.replace(/(.{4})/g, '$1 ').trim(); });
  exp.addEventListener('input', function () { var d = exp.value.replace(/\D/g, '').slice(0, 4); exp.value = d.length > 2 ? d.slice(0, 2) + ' / ' + d.slice(2) : d; });
  cvc.addEventListener('input', function () { cvc.value = cvc.value.replace(/\D/g, '').slice(0, 4); });
  [].slice.call(document.querySelectorAll('[data-fill]')).forEach(function (b) {
    b.addEventListener('click', function () {
      num.value = b.dataset.fill; exp.value = '12 / 34'; cvc.value = '123';
      num.dispatchEvent(new Event('input'));
    });
  });
  function luhn(d) { var s = 0, alt = false; for (var i = d.length - 1; i >= 0; i--) { var n = +d[i]; if (alt) { n *= 2; if (n > 9) n -= 9; } s += n; alt = !alt; } return d.length >= 12 && s % 10 === 0; }

  function showError(msg) { var e = $('co-error'); e.textContent = msg; e.hidden = !msg; if (msg) e.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
  function mark(el, bad) { el.classList.toggle('bad', !!bad); }

  var form = $('co-form'), work = $('co-work'), steps = $('co-steps');
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  function validate() {
    var bad = 0;
    ['first', 'last', 'country'].forEach(function (n) { var el = form.elements[n]; var v = !el.value.trim(); mark(el, v); bad += v; });
    var em = form.elements.email, emBad = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value.trim()); mark(em, emBad); bad += emBad;
    var digits = num.value.replace(/\D/g, ''), nBad = !luhn(digits); mark(num, nBad); bad += nBad;
    var m = exp.value.replace(/\D/g, ''), eBad = !(m.length === 4 && +m.slice(0, 2) >= 1 && +m.slice(0, 2) <= 12); mark(exp, eBad); bad += eBad;
    var cBad = cvc.value.length < 3; mark(cvc, cBad); bad += cBad;
    if (bad) return 'Please check the highlighted fields.';
    if (!$('co-agree').checked) return 'Please accept the house rules and cancellation policy to continue.';
    return '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); showError('');
    if (!schedule) { showError('The price is not loaded yet.'); return; }
    var err = validate(); if (err) { showError(err); return; }
    run(num.value.replace(/\D/g, ''));
  });

  function setSteps(list) {
    steps.innerHTML = '';
    list.forEach(function (s) { var li = document.createElement('li'); li.dataset.key = s.key; li.innerHTML = '<span class="dot"></span><span>' + s.label + '<small></small></span>'; steps.appendChild(li); });
  }
  function state(key, cls, note) { var li = steps.querySelector('[data-key="' + key + '"]'); if (!li) return; li.className = cls; li.querySelector('.dot').textContent = cls === 'ok' ? '✓' : cls === 'fail' ? '!' : ''; if (note !== undefined) li.querySelector('small').textContent = note; }

  function run(digits) {
    form.hidden = true; work.hidden = false; window.scrollTo({ top: 0, behavior: 'smooth' });
    var declined = digits === '4000000000000002';
    setSteps([
      { key: 'check', label: 'Checking your dates with the booking system' },
      { key: 'hold', label: 'Holding the dates so nobody else can book them' },
      { key: 'charge', label: 'Charging the deposit with Stripe' },
      { key: 'confirm', label: 'Confirming the booking and recording the payment' },
      { key: 'airbnb', label: 'Closing the dates on Airbnb' },
      { key: 'email', label: 'Sending your confirmation email' },
    ]);
    var ref = 'CT-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    state('check', 'run');
    loadQuote().then(function (j) {
      if (!j.available) throw { dates: true };
      return sleep(500).then(function () { state('check', 'ok', 'Still available at ' + mxn(j.total)); state('hold', 'run'); return sleep(900); });
    }).then(function () {
      state('hold', 'ok', 'Simulated. A real hold would be created in Prestige'); state('charge', 'run'); return sleep(1100);
    }).then(function () {
      if (declined) throw { card: true };
      state('charge', 'ok', 'Simulated. ' + mxn(schedule.dueNow) + ' charged to the test card'); state('confirm', 'run'); return sleep(800);
    }).then(function () {
      state('confirm', 'ok', 'Simulated. The booking becomes confirmed and paid in Prestige'); state('airbnb', 'run'); return sleep(700);
    }).then(function () {
      state('airbnb', 'ok', 'Simulated. Prestige closes the dates on Airbnb within minutes'); state('email', 'run'); return sleep(600);
    }).then(function () {
      state('email', 'ok', 'Simulated'); return sleep(500);
    }).then(function () { done(ref); }).catch(function (err) {
      if (err && err.card) {
        state('charge', 'fail', 'The card was declined');
        var li = document.createElement('li'); li.className = 'ok'; li.dataset.key = 'release';
        li.innerHTML = '<span class="dot">✓</span><span>Releasing the held dates<small>Simulated. The dates are open again for other guests</small></span>';
        steps.appendChild(li);
        ['confirm', 'airbnb', 'email'].forEach(function (k) { state(k, 'skip'); });
        sleep(1600).then(function () {
          work.hidden = true; form.hidden = false;
          showError('Your card was declined and you were not charged. Please try another card.');
        });
      } else if (err && err.dates) {
        state('check', 'fail', 'Someone else just booked these dates');
        sleep(1600).then(function () { work.hidden = true; form.hidden = false; showError('Those dates were just taken. Please go back and choose other dates.'); });
      } else {
        state('check', 'fail', 'We could not reach the booking system');
        sleep(1600).then(function () { work.hidden = true; form.hidden = false; showError('Something went wrong and you were not charged. Please try again.'); });
      }
    });
  }

  function done(ref) {
    work.hidden = true; $('co-done').hidden = false; $('co-h1').hidden = true; $('co-back').hidden = true; window.scrollTo({ top: 0, behavior: 'smooth' });
    var first = form.elements.first.value.trim();
    $('co-done-title').textContent = 'You are booked, ' + first;
    $('co-ref').textContent = ref;
    var rows = '<table><tbody>' +
      '<tr><td>' + unit.name + '<br><small>' + pretty(inD) + ' to ' + pretty(outD) + ', ' + nights + (nights === 1 ? ' night' : ' nights') + ', ' + adults + (adults === 1 ? ' guest' : ' guests') + '</small></td><td>' + mxn(total) + '</td></tr>' +
      '<tr><td>Paid today (test)</td><td>' + mxn(schedule.dueNow) + '</td></tr>' +
      (schedule.balance ? '<tr><td>Balance, charged ' + pretty(schedule.balanceDate) + '</td><td>' + mxn(schedule.balance) + '</td></tr>' : '') +
      '<tr><td>Security hold, placed ' + pretty(schedule.securityDate) + '</td><td>' + mxn(POLICY.securityHold) + '</td></tr>' +
      '</tbody></table>';
    $('co-done-summary').innerHTML = rows;
    var next = $('co-next'); next.innerHTML = '';
    [
      'A confirmation email goes to ' + form.elements.email.value.trim() + ' with these details.',
      schedule.balance ? 'On ' + pretty(schedule.balanceDate) + ' the balance of ' + mxn(schedule.balance) + ' is charged to the same card.' : 'Your stay is paid in full.',
      'The day before arrival we place a ' + mxn(POLICY.securityHold) + ' security hold and release it after check out.',
      'Check in is after 4 pm [to confirm]. We send arrival details a few days before.',
    ].forEach(function (t) { var li = document.createElement('li'); li.textContent = t; next.appendChild(li); });
  }
})();

/* Arabic translations (French is the source text in index.html) */
const AR = {
  title: 'فورج أثلتيك كلوب | قاعة رياضة وتدريب',
  n1: 'الاشتراكات', n2: 'الجدول', n3: 'التسجيل', n4: 'اتصل بنا', nb: 'انضم الآن',
  h_e: 'قاعة رياضة وتدريب', h_h: 'أقوى كل يوم.',
  h_l: 'معدات حديثة ومدربون معتمدون وحصص جماعية لجميع المستويات. سجّل عبر الإنترنت في دقيقة واحدة.',
  h_b1: 'ابدأ الآن', h_b2: 'شاهد الجدول',
  s1: 'عضوًا نشطًا', s2: 'حصة أسبوعيًا', s3: 'مدربًا معتمدًا',
  p_e: 'الاشتراكات', p_h: 'اختر الصيغة التي تناسبك', b_m: 'شهري', b_y: 'سنوي (شهران مجانًا)',
  pl1: 'الأساسية', pl2: 'الأداء', pl3: 'النخبة', pop: 'الأكثر طلبًا', pm: '/الشهر',
  a1: 'دخول إلى القاعة', a2: 'غرف تبديل الملابس والاستحمام', a3: 'حصتان جماعيتان أسبوعيًا',
  b1: 'دخول غير محدود إلى القاعة', b2: 'حصص جماعية غير محدودة', b3: 'حصة تدريب شخصي شهريًا',
  c1: 'كل مزايا صيغة الأداء', c2: 'تدريب شخصي مخصص', c3: 'متابعة غذائية',
  choose: 'اختر هذه الصيغة',
  sc_e: 'الجدول', sc_h: 'احجز مكانك بنقرة واحدة',
  j_e: 'التسجيل', j_h: 'انضم إلى النادي',
  j_l: 'اترك لنا بياناتك وسنتصل بك لإتمام التسجيل. الحصة التجريبية الأولى مجانية.',
  f_name: 'الاسم الكامل', f_phone: 'الهاتف', f_plan: 'الصيغة', f_goal: 'الهدف',
  g1: 'إنقاص الوزن', g2: 'بناء العضلات', g3: 'تحسين لياقتي البدنية', f_go: 'انضم إلى النادي',
  'ph:name': 'اسمك',
  d_e: 'فضاء التسيير الخاص بك', d_h: 'سيّر أعضاءك وحصصك بكل سهولة',
  d_p: 'تابع الاشتراكات ودخول اليوم وامتلاء الحصص، مع تذكيرات قبل انتهاء كل اشتراك.',
  m1: 'لوحة التحكم', m2: 'الأعضاء', m3: 'الحصص', m4: 'المدفوعات', m5: 'الإعدادات', d_hi: 'مرحبًا، فورج',
  k1: 'أعضاء نشطون', k2: 'دخول اليوم', k3: 'حجوزات الحصص', k4: 'اشتراكات للتجديد',
  ch_t: 'الحضور خلال آخر 7 أيام', tb_t: 'آخر الأعضاء',
  th1: 'العضو', th2: 'الصيغة', th3: 'ينتهي', th4: 'الحالة',
  p1: 'وليد ب.', p2: 'مريم س.', p3: 'سمير ت.', p4: 'هشام ع.',
  s_ac: 'نشط', s_rn: 'للتجديد', s_ex: 'منتهٍ',
  d_c: 'معاينة للواجهة. نسختك تُصمَّم حسب احتياجاتك.',
  ft1: 'فورج أثلتيك كلوب، [العنوان]، [المدينة]', ft2: '[الهاتف] · [إنستغرام]', ft3: 'مفتوح من 6:00 إلى 22:00'
};
const M = {
  fr: { coach: 'Coach', spots: 'places', full: 'Complet', book: 'Réserver', booked: 'Réservé', mo: 'paiement mensuel', yr: 'paiement annuel',
    ok: (n, p, b) => `Bienvenue chez Forge, ${n}. Votre demande pour la formule ${p} (${b}) est enregistrée. Nous vous appelons très vite pour finaliser l’inscription.` },
  ar: { coach: 'المدرب', spots: 'أماكن', full: 'مكتمل', book: 'احجز', booked: 'تم الحجز', mo: 'دفع شهري', yr: 'دفع سنوي',
    ok: (n, p, b) => `مرحبًا بك في فورج يا ${n}. تم تسجيل طلبك للصيغة «${p}» (${b}). سنتصل بك قريبًا لإتمام التسجيل.` }
};

/* ---------- Shared: language, navigation, scroll effects ---------- */
const $ = id => document.getElementById(id);
const hooks = [];
let lang = 'fr';
const DAYS = { fr: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'], ar: ['إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت', 'أحد'] };
const fmt = n => n.toLocaleString(lang === 'ar' ? 'en-US' : 'fr-FR');
const cur = () => lang === 'ar' ? 'دج' : 'DA';
const t = k => M[lang][k];

// Keep the French source text so switching back is lossless
const src = {};
document.querySelectorAll('[data-i]').forEach(el => src[el.dataset.i] = el.innerHTML);
document.querySelectorAll('[data-ph]').forEach(el => src['ph:' + el.dataset.ph] = el.placeholder);

function setLang(l) {
  lang = l;
  const ar = l === 'ar';
  document.documentElement.lang = l;
  document.documentElement.dir = ar ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i]').forEach(el => el.innerHTML = (ar && AR[el.dataset.i]) || src[el.dataset.i]);
  document.querySelectorAll('[data-ph]').forEach(el => el.placeholder = (ar && AR['ph:' + el.dataset.ph]) || src['ph:' + el.dataset.ph]);
  document.querySelectorAll('[data-d]').forEach(el => el.textContent = DAYS[l][el.dataset.d]);
  document.querySelectorAll('[data-cur]').forEach(el => el.textContent = cur());
  $('sw').dataset.l = l;
  $('sw').setAttribute('aria-checked', ar);
  try { localStorage.setItem('lang', l); } catch (e) {}
  hooks.forEach(fn => fn());
}
$('sw').onclick = () => setLang(lang === 'fr' ? 'ar' : 'fr');

const nav = $('nav'), menu = $('menu');
addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 40), { passive: true });
$('burger').onclick = () => menu.classList.toggle('open');
menu.onclick = e => { if (e.target.tagName === 'A') menu.classList.remove('open'); };

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const co = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  co.unobserve(e.target);
  const to = +e.target.dataset.count, t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / 1400, 1);
    e.target.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}), { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(el => co.observe(el));

/* ---------- Gym: plans, schedule, join form ---------- */
const CL = { CrossFit: ['CrossFit', 'كروس فيت'], Boxe: ['Boxe', 'ملاكمة'], Yoga: ['Yoga', 'يوغا'], Spinning: ['Spinning', 'سبينينغ'], HIIT: ['HIIT', 'هيت'], Musculation: ['Musculation', 'كمال الأجسام'], Mobilité: ['Mobilité', 'مرونة'] };
const CO = { Karim: ['Karim', 'كريم'], Yacine: ['Yacine', 'ياسين'], Amira: ['Amira', 'أميرة'], Lina: ['Lina', 'لينة'] };
const D = [
  [['06:30', 'CrossFit', 'Karim', 8], ['18:00', 'Boxe', 'Yacine', 5], ['19:30', 'Spinning', 'Amira', 0]],
  [['07:00', 'Yoga', 'Lina', 6], ['18:00', 'HIIT', 'Karim', 7], ['19:30', 'Mobilité', 'Lina', 4]],
  [['06:30', 'Musculation', 'Yacine', 9], ['18:30', 'Boxe', 'Yacine', 3], ['20:00', 'CrossFit', 'Karim', 6]],
  [['07:00', 'Spinning', 'Amira', 8], ['18:00', 'Yoga', 'Lina', 5], ['19:30', 'HIIT', 'Karim', 2]],
  [['06:30', 'CrossFit', 'Karim', 7], ['17:30', 'Mobilité', 'Lina', 8], ['19:00', 'Boxe', 'Yacine', 4]],
  [['09:00', 'HIIT', 'Karim', 10], ['10:30', 'Yoga', 'Lina', 8], ['12:00', 'Spinning', 'Amira', 6]]
];
let day = 0, mode = 'm';
const booked = {};
const nm = (o, k) => o[k][lang === 'ar' ? 1 : 0];

const prices = () => document.querySelectorAll('[data-m]').forEach(el => el.textContent = fmt(+el.dataset[mode]));
const marquee = () => {
  const n = Object.keys(CL).map(k => nm(CL, k));
  $('track').innerHTML = [...n, ...n].map(x => `<span>${x}</span>`).join('');
};
const rows = () => {
  $('rows').innerHTML = D[day].map((c, i) => {
    const b = booked[day + '-' + i], left = c[3] - (b ? 1 : 0);
    return `<div class="row"><time>${c[0]}</time><div><b>${nm(CL, c[1])}</b><small>${t('coach')} ${nm(CO, c[2])} · ${left > 0 ? left + ' ' + t('spots') : t('full')}</small></div>` +
      `<button class="btn btn-sm${b ? '' : ' ghost'}" data-n="${i}" ${left <= 0 && !b ? 'disabled' : ''}>${b ? t('booked') : t('book')}</button></div>`;
  }).join('');
};
hooks.push(prices, marquee, rows, () => $('msg').style.display = 'none');

$('rows').onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  const k = day + '-' + b.dataset.n; booked[k] = !booked[k]; rows();
};
$('tabs').onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  day = +b.dataset.day;
  [...$('tabs').children].forEach(x => x.classList.toggle('on', x === b)); rows();
};
$('tog').onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  mode = b.dataset.b;
  [...$('tog').children].forEach(x => x.classList.toggle('on', x === b)); prices();
};
document.querySelectorAll('.pick').forEach(b => b.onclick = () => {
  $('plan').selectedIndex = +b.dataset.plan;
  $('join').scrollIntoView({ behavior: 'smooth' });
});
$('form').addEventListener('submit', e => {
  e.preventDefault();
  const m = $('msg'); m.style.display = 'block';
  m.textContent = M[lang].ok($('name').value, $('plan').selectedOptions[0].textContent, t(mode === 'm' ? 'mo' : 'yr'));
  m.scrollIntoView({ behavior: 'smooth', block: 'center' });
  e.target.reset();
});

/* ---------- Start ---------- */
let saved = 'fr';
try { saved = localStorage.getItem('lang') || 'fr'; } catch (e) {}
setLang(saved);

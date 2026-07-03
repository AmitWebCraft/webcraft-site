/* ===== SPLASH CONS — appear one by one ===== */
const conItems = document.querySelectorAll('.con-item');
conItems.forEach((item, i) => {
    setTimeout(() => item.classList.add('visible'), 600 + i * 650);
});
// Show CTA after all cons are visible
setTimeout(() => {
    const cta = document.getElementById('splash-cta');
    if (cta) cta.style.opacity = '1';
}, 600 + conItems.length * 650 + 400);

/* ===== SCROLL REVEAL — called after all content is injected ===== */
function initReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-scale, .reveal-rotate').forEach(el => obs.observe(el));
}

/* ===== TEMPLATES ===== */
const templates = [
    {
        id: 'corporate',
        name: 'Corporate Pro',
        category: 'business',
        categoryLabel: 'עסקי',
        description: 'מושלם לחברות, עורכי דין, רואי חשבון ויועצים',
        primary: '#6366f1',
        secondary: 'rgba(99,102,241,0.15)',
        accent: '#818cf8'
    },
    {
        id: 'restaurant',
        name: 'Food & Love',
        category: 'food',
        categoryLabel: 'מסעדה',
        description: 'מסעדות, בתי קפה, קייטרינג ואוכל',
        primary: '#f59e0b',
        secondary: 'rgba(245,158,11,0.12)',
        accent: '#fcd34d'
    },
    {
        id: 'fashion',
        name: 'Elegant Dark',
        category: 'shop',
        categoryLabel: 'אופנה',
        description: 'חנויות אופנה, תכשיטים ומותגי יוקרה',
        primary: '#e2e8f0',
        secondary: 'rgba(226,232,240,0.06)',
        accent: '#d4af37'
    },
    {
        id: 'portfolio',
        name: 'Creative Portfolio',
        category: 'portfolio',
        categoryLabel: 'פורטפוליו',
        description: 'מעצבים, צלמים, אמנים ויוצרים',
        primary: '#a855f7',
        secondary: 'rgba(168,85,247,0.15)',
        accent: '#c084fc'
    },
    {
        id: 'shop',
        name: 'Shop Modern',
        category: 'shop',
        categoryLabel: 'חנות',
        description: 'חנויות אונליין, מוצרים ושירותים',
        primary: '#10b981',
        secondary: 'rgba(16,185,129,0.12)',
        accent: '#34d399'
    },
    {
        id: 'medical',
        name: 'Health & Care',
        category: 'business',
        categoryLabel: 'רפואי',
        description: 'רופאים, קלינאים, מרפאות ובריאות',
        primary: '#22d3ee',
        secondary: 'rgba(34,211,238,0.1)',
        accent: '#67e8f9'
    }
];

function miniPreview(t) {
    return `
    <div style="height:200px;background:rgba(5,5,15,0.8);overflow:hidden;position:relative;border-bottom:1px solid rgba(255,255,255,0.06)">
        <div style="background:${t.secondary};position:absolute;inset:0;"></div>
        <!-- mini navbar -->
        <div style="position:relative;z-index:1;background:rgba(255,255,255,0.04);height:26px;display:flex;align-items:center;padding:0 10px;gap:5px;border-bottom:1px solid rgba(255,255,255,0.06)">
            <div style="width:28px;height:5px;background:${t.primary};border-radius:3px;opacity:0.9;"></div>
            <div style="flex:1;"></div>
            <div style="width:16px;height:4px;background:rgba(255,255,255,0.25);border-radius:2px;"></div>
            <div style="width:16px;height:4px;background:rgba(255,255,255,0.25);border-radius:2px;"></div>
            <div style="width:16px;height:4px;background:rgba(255,255,255,0.25);border-radius:2px;"></div>
        </div>
        <!-- hero -->
        <div style="position:relative;z-index:1;height:86px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;padding:10px;">
            <div style="width:100px;height:7px;background:${t.accent};border-radius:4px;opacity:0.9;"></div>
            <div style="width:70px;height:5px;background:rgba(255,255,255,0.3);border-radius:3px;"></div>
            <div style="width:50px;height:18px;background:${t.primary};border-radius:9px;opacity:0.9;margin-top:3px;"></div>
        </div>
        <!-- cards row -->
        <div style="position:relative;z-index:1;padding:8px 10px;display:flex;gap:6px;">
            <div style="flex:1;height:34px;background:${t.primary};border-radius:6px;opacity:0.12;"></div>
            <div style="flex:1;height:34px;background:${t.primary};border-radius:6px;opacity:0.12;"></div>
            <div style="flex:1;height:34px;background:${t.primary};border-radius:6px;opacity:0.12;"></div>
        </div>
        <!-- lines -->
        <div style="position:relative;z-index:1;padding:0 10px;display:flex;flex-direction:column;gap:4px;">
            <div style="width:60%;height:4px;background:${t.accent};border-radius:2px;opacity:0.2;"></div>
            <div style="width:40%;height:3px;background:${t.accent};border-radius:2px;opacity:0.12;"></div>
        </div>
    </div>`;
}

function renderTemplates(filter) {
    const grid = document.getElementById('templates-grid');
    const list = filter === 'all' ? templates : templates.filter(t => t.category === filter);

    grid.innerHTML = list.map((t, i) => `
        <div class="tilt template-card rounded-2xl overflow-hidden cursor-pointer"
             style="animation-delay:${i * 0.07}s">
            ${miniPreview(t)}
            <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-bold text-ink text-lg">${t.name}</h3>
                    <span class="text-xs px-3 py-1 rounded-full font-semibold"
                          style="background:${t.secondary};color:${t.accent};border:1px solid ${t.primary}22">
                        ${t.categoryLabel}
                    </span>
                </div>
                <p class="text-sm mb-4" style="color:var(--muted)">${t.description}</p>
                <a href="order.html?template=${t.id}"
                   class="block text-center py-2.5 rounded-xl font-semibold text-white transition-opacity hover:opacity-80"
                   style="background:${t.primary};">
                    בחר תבנית זו
                </a>
            </div>
        </div>
    `).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTemplates(btn.dataset.filter);
    });
});

/* ===== FAQ ===== */
const faqs = [
    { q: 'כמה זמן לוקח לקבל את האתר?', a: 'בדרך כלל 5 ימי עסקים מרגע קבלת כל החומרים (לוגו, טקסטים, תמונות). נדריך אתכם בתהליך.' },
    { q: 'מה צריך לשלוח לכם?', a: 'לוגו (אם יש), תוכן לעמודים, תמונות, וכל מידע שרוצים שיופיע באתר. ניתן גם בלי לוגו — נעזור.' },
    { q: 'האם האתר יהיה מותאם למובייל?', a: 'בהחלט! כל האתרים שלנו מותאמים לחלוטין למובייל, טאבלט ומחשב שולחני.' },
    { q: 'מה ההבדל בין "אתר סטארטר" ל"אתר + תמיכה"?', a: 'ב"אתר סטארטר" אתה מקבל את האתר עם תמיכה ל-30 יום ראשונים. ב"אתר + תמיכה" אנחנו מטפלים בכל בעיה טכנית, ניטור שעתי ועדכונים שוטפים לאורך זמן.' },
    { q: 'מה כוללת ההתחייבות ל-6 חודשים בחבילת התמיכה?', a: 'התחייבות של 6 חודשים מינימום למנוי התמיכה (₪350/חודש), מה שמאפשר לנו לספק שירות שוטף ויציב. לאחר 6 חודשים ניתן לבטל בכל עת.' },
    { q: 'מה כולל "ניטור שעתי"?', a: 'מערכות אוטומטיות בודקות כל שעה שהאתר שלך פעיל ועובד. אם משהו משתבש — אנחנו מקבלים התראה ומטפלים לפני שאתה בכלל שם לב.' },
    { q: 'אילו שפות תומכות האתרים?', a: 'אנחנו בונים בעברית (RTL) כברירת מחדל, וניתן להוסיף עמודים באנגלית לפי דרישה.' },
];

document.getElementById('faq-list').innerHTML = faqs.map((f, i) => `
    <div class="faq-item reveal rounded-2xl overflow-hidden" style="transition-delay:${i*0.05}s">
        <button class="w-full text-right p-6 flex items-center justify-between font-semibold hover:opacity-70 transition"
                style="color:var(--ink)"
                onclick="toggleFaq(${i})">
            <span>${f.q}</span>
            <i class="fa-solid fa-chevron-down faq-icon text-sm flex-shrink-0 mr-3 opacity-50" id="faq-icon-${i}"></i>
        </button>
        <div class="hidden px-6 pb-6 leading-relaxed text-sm" id="faq-ans-${i}"
             style="color:var(--muted)">${f.a}</div>
    </div>
`).join('');

function toggleFaq(i) {
    const ans  = document.getElementById(`faq-ans-${i}`);
    const icon = document.getElementById(`faq-icon-${i}`);
    ans.classList.toggle('hidden');
    icon.classList.toggle('open');
}

/* ===== INIT — reveal observer AFTER all content is in DOM ===== */
renderTemplates('all');

initReveal(); // must be called after FAQ + templates are in the DOM

/* Anchor links scroll smoothly via CSS (html { scroll-behavior: smooth }) —
   no JS needed, and this way the URL hash updates normally on click. */

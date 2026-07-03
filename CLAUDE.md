# WebCraft - פלטפורמת מכירת אתרים

## מה הפרויקט
פלטפורמה לבניית ומכירת אתרים. לקוחות ישראלים בוחרים תבנית, ממלאים פרטים, ומשלמים אונליין.
השפה: עברית RTL. הבעלים: ביגינר ב-JS/HTML/CSS.

## מבנה קבצים
כל "עמוד" הוא קובץ HTML נפרד (לא עמוד גלילה רציף אחד) — ניווט בין דפים רגיל.
```
OnlineWeb/
├── index.html          ← דף הבית (landing page) — רקע spotlight blobs בסקשן הראשון
├── order.html          ← טופס הזמנה — רקע beams (קרני אור אנימטיביות)
├── privacy.html         ← מדיניות פרטיות
├── terms.html           ← תקנון ותנאי שימוש
├── admin/
│   └── index.html      ← פאנל ניהול (כתובת: /admin/) — עצמאי, עיצוב בהיר משלו
├── css/
│   └── style.css       ← עיצוב מותאם (RTL, כפתורים, אנימציות, טוקני צבע כהים)
├── js/
│   ├── beams.js         ← רקע קנבס אנימציה (קרני אור) — בשימוש ב-order.html
│   ├── effects.js       ← tilt/magnetic/parallax/spotlight (cursor glow) + מעברי דף (fade)
│   ├── main.js          ← תבניות, FAQ, פילטרים, reveal-on-scroll
│   ├── order.js         ← לוגיקת דף הזמנה (ולידציה, שמירה, template מ-URL param)
│   └── admin.js         ← לוגיקת פאנל ניהול (login, הזמנות, סטטוסים)
└── CLAUDE.md            ← המסמך הזה
```

## Tech Stack
- **HTML/CSS/JS** — Vanilla, ללא פריימוורק, ללא build step
- **Tailwind CSS** — via CDN (אין צורך ב-npm)
- **Font Awesome 6.5** — אייקונים via CDN
- **Google Fonts** — Rubik (טקסט רגיל) + Secular One (כותרות, class="font-display")
- **LocalStorage** — שמירת הזמנות (זמני, לפני Firebase)
- **עיצוב: כהה (dark theme)** — טוקני צבע ב-`:root` ב-css/style.css (`--bg`, `--ink`, `--primary` וכו')

## רקעים אנימטיביים
- **index.html (splash):** `.spotlight-bg` + 3× `.spotlight-blob` — שלושה כתמי זוהר גדולים
  ומטושטשים שזזים/מסתובבים ב-CSS keyframes בלבד (ללא JS) — פורט וניל-JS/CSS של קומפוננטת
  React (framer-motion) שהמשתמש סיפק.
- **order.html:** `<canvas id="beams-canvas">` + js/beams.js — קרני אור עולות אנימטיביות,
  פורט וניל-JS/Canvas של קומפוננטת React אחרת. חשוב: הבלור מוחל פעם אחת דרך CSS
  (`canvas.style.filter`), לא בכל frame דרך `ctx.filter` — זה יקר מדי ותוקע את הדף.
  האנימציה משתמשת ב-IntersectionObserver (או visibilitychange אם אין `<section>` עוטף)
  כדי להשהות כשלא נראה על המסך.
- אין יותר "נקודות צפות" (`.particle`) או "ריבועים מסתובבים" (`.shape-3d`) — הוסרו לבקשת
  המשתמש. אל תוסיף אותם בחזרה בלי לבדוק קודם.
- `.orb` ו-`.aurora` (בועות מטושטשות + גרדיאנט מסתובב) עדיין קיימים ובשימוש בכמה sections.

## פאנל ניהול Admin
- **כתובת:** `/admin/` (קובץ: `admin/index.html`)
- **סיסמה:** `webcraft2024` — שנה בקובץ `js/admin.js` שורה 2
- **יכולות:** צפייה בהזמנות, פילטור לפי סטטוס, עדכון סטטוס (ממתין/בעבודה/הושלם)
- **סטטיסטיקות:** ספירת הזמנות + הכנסות משוערות
- עצמאי לגמרי — עיצוב בהיר משלו, לא משתמש בטוקני הצבע של index.html

## תבניות קיימות (6)
| ID | שם | קטגוריה | צבע |
|---|---|---|---|
| corporate | Corporate Pro | business | כחול |
| restaurant | Food & Love | food | כתום |
| fashion | Elegant Dark | shop | שחור/זהב |
| portfolio | Creative Portfolio | portfolio | סגול |
| shop | Shop Modern | shop | ירוק |
| medical | Health & Care | business | כחול בהיר |

## שמות משתנים חשובים
- `wc_orders` — מפתח LocalStorage לשמירת הזמנות
- `ADMIN_PASSWORD` — בראש `js/admin.js`
- `templateNames` — מיפוי id → שם ב-`js/order.js`

## URL Parameters
- `order.html?template=corporate` — בחירת תבנית מראש (כפתור "בחר תבנית זו" בגלריה מקשר לכאן)
- `order.html?plan=pro` — בחירת חבילה מראש
- שניהם יחד: `order.html?template=restaurant&plan=basic`

## TODO — אינטגרציות נדרשות לפני לאנץ'
- [ ] **Stripe** — החלף את `showSuccess()` ב-`js/order.js` בקישור Stripe Payment Link אמיתי
- [ ] **Firebase Firestore** — להחליף LocalStorage לשמירה אמיתית בענן
- [ ] **EmailJS / SendGrid** — שליחת מייל אוטומטי ללקוח ולמנהל עם קבלת הזמנה
- [ ] **Firebase Auth** — להחליף סיסמה קשיחה ב-login אמיתי

## פריסה (Deployment) — Netlify
האתר מחובר ל-GitHub (`AmitWebCraft/webcraft-site`) עם auto-deploy דרך Netlify.
`git push origin main` מפרסם אוטומטית תוך דקה ל-webcraftil.com.

## הערות עיצוב
- כל הדפים RTL (`dir="rtl"`, `lang="he"`)
- גופנים: Rubik לטקסט רגיל, Secular One (`font-display`) לכותרות גדולות
- Tailwind config מוגדר inline בכל קובץ HTML
- מעברי דף (fade) בין דפים מנוהלים ב-js/effects.js על `<body>` (opacity בלבד —
  לעולם לא transform על body, כי זה הופך אותו ל-containing block של position:fixed ושובר ניווט;
  ה-slide הנוסף חי על `.page-fade`, wrapper רגיל שאינו עוטף אלמנטים עם position:fixed)
- `.reveal` / `.reveal-scale` / `.reveal-rotate` — אנימציות כניסה בגלילה (IntersectionObserver ב-main.js)
- אנחור לינקים (`#templates` וכו') עובד דרך CSS `scroll-behavior: smooth` בלבד —
  אל תוסיף JS click handler עם `preventDefault()` לזה, זה שובר עדכון ה-hash ב-URL

## שינויים נפוצים
**לשנות שם העסק:** חפש `WebCraft` ב-HTML ושנה לשם שלך
**לשנות מחיר:** חפש `1,499` ו-`199` ב-HTML ו-JS (כרגע: "צרו קשר לקבלת מחיר", אין מחיר קבוע מוצג)
**להוסיף תבנית:** הוסף אובייקט למערך `templates` ב-`js/main.js`
**לשנות סיסמת אדמין:** שנה `ADMIN_PASSWORD` בשורה 2 של `js/admin.js`

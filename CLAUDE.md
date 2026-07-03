# WebCraft - פלטפורמת מכירת אתרים

## מה הפרויקט
פלטפורמה לבניית ומכירת אתרים. לקוחות ישראלים בוחרים תבנית, ממלאים פרטים, ומשלמים אונליין.
השפה: עברית RTL. הבעלים: ביגינר ב-JS/HTML/CSS.

## מבנה קבצים
האתר הוא עמוד גלילה רציף אחד — index.html מכיל את כל הדפים כסקשנים (לא ניווט בין דפים).
```
OnlineWeb/
├── index.html          ← כל האתר: נחיתה, תבניות, מחיר, טופס הזמנה, מדיניות פרטיות, תקנון
├── order.html           ← stub הפניה ל-index.html#order (לקישורים ישנים)
├── privacy.html         ← stub הפניה ל-index.html#privacy
├── terms.html           ← stub הפניה ל-index.html#terms
├── admin/
│   └── index.html      ← פאנל ניהול (כתובת: /admin/) — עצמאי, לא חלק מהעמוד הרציף
├── css/
│   └── style.css       ← עיצוב מותאם (RTL, כפתורים, אנימציות, כל הטוקנים של הצבעים)
├── js/
│   ├── beams.js         ← רקע קנבס אנימציה (קרני אור) בסקשן הראשון
│   ├── effects.js       ← tilt/magnetic/parallax/spotlight + מעברי דף (fade)
│   ├── main.js          ← תבניות, FAQ, פילטרים, reveal-on-scroll
│   ├── order.js         ← טופס הזמנה (submitOrder, selectTemplate, resetOrderFlow)
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

## מבנה העמוד הרציף (index.html)
כל "עמוד" לשעבר הוא כעת section עם anchor id, וניווט הוא קישורי `#anchor` בלבד (לא href לדף נפרד):
- Splash (רקע קרני אור אנימטיבי, `#beams-canvas`)
- `#hero`, `#how`, `#templates`, `#pricing`, `#faq-section` — תוכן שיווקי
- `#order` — טופס ההזמנה (היה order.html)
- `#privacy` — מדיניות פרטיות (היה privacy.html)
- `#terms` — תקנון ותנאי שימוש (היה terms.html)
- Footer יחיד בסוף כל הדף

כפתור "בחר תבנית זו" בגלריה קורא ל-`selectTemplate(id)` (ב-js/order.js) שממלא את "תבנית נבחרת"
בסיידבר של ההזמנה ומגלגל ל-`#order` — אין יותר `order.html?template=X` בניווט פנימי (אך ה-stub
עדיין תומך בזה לקישורים ישנים/חיצוניים).

## פאנל ניהול Admin
- **כתובת:** `/admin/` (קובץ: `admin/index.html`)
- **סיסמה:** `webcraft2024` — שנה בקובץ `js/admin.js` שורה 2
- **יכולות:** צפייה בהזמנות, פילטור לפי סטטוס, עדכון סטטוס (ממתין/בעבודה/הושלם)
- **סטטיסטיקות:** ספירת הזמנות + הכנסות משוערות
- עצמאי לגמרי מהעמוד הרציף — עיצוב בהיר משלו, לא משתמש בטוקני הצבע של index.html

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

## URL Parameters (נתמך דרך order.html stub → index.html)
- `order.html?template=corporate` — מפנה ל-`index.html?template=corporate#order` וממלא תבנית
- `order.html?plan=pro` — מפנה עם `plan=pro`, בוחר חבילה כברירת מחדל

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
- רקע כהה עם: orbs (בועות מטושטשות), aurora (גרדיאנט מסתובב), particles (נקודות צפות),
  shape-3d (ריבועים מסתובבים) — כל section יכול לקבל שילוב משלו
- מעברי דף (fade) בין ניווט חיצוני מנוהלים ב-js/effects.js על `<body>` (opacity בלבד —
  לעולם לא transform על body, כי זה הופך אותו ל-containing block של position:fixed ושובר ניווט)
- `.reveal` / `.reveal-scale` / `.reveal-rotate` — אנימציות כניסה בגלילה (IntersectionObserver ב-main.js)
- **ביצועים:** js/beams.js משתמש ב-IntersectionObserver כדי להשהות את לולאת האנימציה כשה-section
  לא נראה על המסך — אל תוסיף `ctx.filter` בלולאת ציור קנבס רציפה, זה יקר מאוד; blur דרך CSS על
  ה-canvas עצמו (GPU-composited) הרבה יותר זול

## שינויים נפוצים
**לשנות שם העסק:** חפש `WebCraft` ב-HTML ושנה לשם שלך
**לשנות מחיר:** חפש `1,499` ו-`199` ב-HTML ו-JS (כרגע: "צרו קשר לקבלת מחיר", אין מחיר קבוע מוצג)
**להוסיף תבנית:** הוסף אובייקט למערך `templates` ב-`js/main.js`
**לשנות סיסמת אדמין:** שנה `ADMIN_PASSWORD` בשורה 2 של `js/admin.js`
**להוסיף section חדש לעמוד הרציף:** הוסף `<section id="...">` בתוך `.page-fade` ב-index.html,
עם קישור ניווט `#...` בניוב-בר או בפוטר

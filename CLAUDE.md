# WebCraft - פלטפורמת מכירת אתרים

## מה הפרויקט
פלטפורמה לבניית ומכירת אתרים. לקוחות ישראלים בוחרים תבנית, ממלאים פרטים, ומשלמים אונליין.
השפה: עברית RTL. הבעלים: ביגינר ב-JS/HTML/CSS.

## מבנה קבצים
```
OnlineWeb/
├── index.html          ← דף הבית (landing page)
├── order.html          ← טופס הזמנה
├── admin/
│   └── index.html      ← פאנל ניהול (כתובת: /admin/)
├── css/
│   └── style.css       ← עיצוב מותאם (RTL, כפתורים, אנימציות)
├── js/
│   ├── main.js         ← לוגיקת דף הבית (תבניות, FAQ, פילטרים)
│   ├── order.js        ← לוגיקת דף הזמנה (ולידציה, שמירה)
│   └── admin.js        ← לוגיקת פאנל ניהול (login, הזמנות, סטטוסים)
└── CLAUDE.md           ← המסמך הזה
```

## Tech Stack
- **HTML/CSS/JS** — Vanilla, ללא פריימוורק
- **Tailwind CSS** — via CDN (אין צורך ב-npm)
- **Font Awesome 6.5** — אייקונים via CDN
- **Google Fonts: Heebo** — גופן עברי
- **LocalStorage** — שמירת הזמנות (זמני, לפני Firebase)

## חבילות מחיר
| חבילה | מחיר | מה כלול |
|---|---|---|
| אתר בלבד | ₪1,499 חד-פעמי | עיצוב, 5 עמודים, מובייל, SEO |
| אתר + תמיכה | ₪1,499 + ₪199/חודש | הכל + תמיכה, תיקונים, גיבויים |

## פאנל ניהול Admin
- **כתובת:** `/admin/` (קובץ: `admin/index.html`)
- **סיסמה:** `webcraft2024` — שנה בקובץ `js/admin.js` שורה 2
- **יכולות:** צפייה בהזמנות, פילטור לפי סטטוס, עדכון סטטוס (ממתין/בעבודה/הושלם)
- **סטטיסטיקות:** ספירת הזמנות + הכנסות משוערות

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
- `order.html?template=corporate` — בחירת תבנית מראש
- `order.html?plan=pro` — בחירת חבילה מראש
- שניהם יחד: `order.html?template=restaurant&plan=basic`

## TODO — אינטגרציות נדרשות לפני לאנץ'
- [ ] **Stripe** — החלף את `showSuccess()` ב-`js/order.js` בקישור Stripe Payment Link אמיתי
- [ ] **Firebase Firestore** — להחליף LocalStorage לשמירה אמיתית בענן
- [ ] **EmailJS / SendGrid** — שליחת מייל אוטומטי ללקוח ולמנהל עם קבלת הזמנה
- [ ] **Firebase Auth** — להחליף סיסמה קשיחה ב-login אמיתי
- [ ] **דומיין** — רכוש דומיין (webcraft.co.il) ועלה ל-Vercel/Netlify

## פריסה (Deployment) — Vercel (חינמי)
1. צור חשבון ב-vercel.com
2. גרור את תיקיית `OnlineWeb` לדשבורד של Vercel
3. האתר יהיה חי תוך דקה

## הערות עיצוב
- כל הדפים RTL (`dir="rtl"`, `lang="he"`)
- גופן Heebo (תומך עברית מצוין)
- Tailwind config מוגדר inline בכל קובץ HTML
- אנימציית `fadeInUp` על כרטיסי תבניות בעת פילטרינג
- Sticky sidebar בפאנל ניהול (position: fixed, width: 240px)

## שינויים נפוצים
**לשנות שם העסק:** חפש `WebCraft` ב-HTML ושנה לשם שלך  
**לשנות מחיר:** חפש `1,499` ו-`199` ב-HTML ו-JS  
**להוסיף תבנית:** הוסף אובייקט למערך `templates` ב-`js/main.js`  
**לשנות סיסמת אדמין:** שנה `ADMIN_PASSWORD` בשורה 2 של `js/admin.js`

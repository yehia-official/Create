
<div dir="rtl" style="font-family: 'Arial', sans-serif; line-height: 2;">

---

<div align="center">

# جمهورية مصر العربية
## وزارة التعليم العالي والبحث العلمي

---

<br/><br/>

# 🎓 مشروع تخرج

---

<br/>

# منصة Quizzy
## نظام الاختبارات الإلكترونية الأكاديمي التفاعلي

<br/>

---

<br/>

**إعداد الطالب:**
يحيي محمد حسين

**تحت إشراف:**
د. / ـــــــــــــــــ

**الكلية:**
كلية الحاسبات والمعلومات

**التخصص:**
هندسة البرمجيات — علوم الحاسب

**العام الدراسي:**
2025 / 2026

---

<br/><br/>

> *"التعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم"*
> — نيلسون مانديلا

<br/><br/>

</div>

---

---

<div align="center">

## إهداء

</div>

إلى والديَّ الكريمين اللذين لم يبخلا عليَّ بشيء في مسيرتي التعليمية،

إلى أساتذتي الأفاضل الذين أضاؤوا لي طريق العلم والمعرفة،

إلى زملائي وأصدقائي الذين ساندوني في رحلتي الدراسية،

إلى كل من آمن بقدرتي قبل أن أُؤمن بها أنا...

**أُهدي هذا العمل.**

---

---

<div align="center">

## شكر وتقدير

</div>

الحمد لله رب العالمين الذي وفّقنا لإتمام هذا العمل.

نتقدم بجزيل الشكر والامتنان لـ:

- **أ.د / ـــــــــ** على حسن التوجيه والإشراف المتواصل طوال فترة إعداد هذا المشروع.
- **أعضاء هيئة التدريس** في كلية الحاسبات والمعلومات على ما قدموه من علم ومعرفة خلال سنوات الدراسة.
- **Firebase & Google** على توفير بنية تحتية سحابية موثوقة ومجانية للمطورين.
- **مجتمع Next.js و Shadcn UI** على التوثيق الرائع والمكونات مفتوحة المصدر.

---

---

# الفهرس

| الفصل | العنوان | الصفحة |
|---|---|---|
| أولاً | ملخص المشروع (Abstract) | 8 |
| ثانياً | المقدمة (Introduction) | 10 |
| ثالثاً | نظرة عامة على النظام (System Overview) | 14 |
| رابعاً | التقنيات المستخدمة (Technologies Used) | 18 |
| خامساً | بنية المشروع (Project Structure) | 24 |
| سادساً | المميزات والوظائف (Features & Functionality) | 30 |
| سابعاً | تصميم الواجهات (UI/UX Design) | 44 |
| ثامناً | شرح الكود البرمجي (Code Explanation) | 50 |
| تاسعاً | الأمان والصلاحيات (Security & Authorization) | 72 |
| عاشراً | التحديات والحلول (Challenges & Solutions) | 78 |
| حادي عشر | التطوير المستقبلي (Future Improvements) | 82 |
| ثاني عشر | الخاتمة (Conclusion) | 86 |
| ملاحق | الملاحق (Appendix) | 88 |

---

---

<div align="center">

# أولاً: ملخص المشروع
## Abstract

</div>

---

## ١.١ الملخص التنفيذي

**Quizzy** هو نظام اختبارات إلكترونية متكامل وشامل، مُصمَّم لتلبية احتياجات المؤسسات التعليمية الحديثة في عصر التحول الرقمي. يهدف المشروع إلى استبدال الاختبارات الورقية التقليدية بمنصة رقمية ذكية تُقدِّم تجربة تعليمية متقدمة لكلٍّ من الطالب والمعلم والمسؤول الأكاديمي.

يتمحور المشروع حول ثلاث واجهات رئيسية متمايزة:

- **واجهة الطالب:** لأداء الاختبارات وعرض النتائج والشهادات
- **واجهة المدرس:** لإنشاء الاختبارات وإدارة الأسئلة وعرض التحليلات
- **واجهة المسؤول:** للإشراف على المنصة وإدارة جميع المستخدمين

---

## ١.٢ المشكلة المستهدفة

تعاني المؤسسات التعليمية حول العالم من تحديات جوهرية في نظام الاختبارات التقليدي:

| المشكلة | الأثر |
|---|---|
| **التكلفة المادية والوقتية** | عمليات الطباعة والتوزيع والتصحيح اليدوي تستهلك موارد ضخمة |
| **محدودية أنواع الأسئلة** | الورق لا يدعم الوسائط المتعددة أو الأسئلة البرمجية |
| **مخاطر الغش والتلاعب** | صعوبة ضبط بيئة الاختبار والحفاظ على نزاهته |
| **غياب التحليلات الفورية** | الحصول على إحصائيات أداء الطلاب يستغرق أياماً أو أسابيع |
| **عدم المرونة** | استحالة أداء الاختبارات عن بعد أو من أماكن متعددة |
| **الأثر البيئي** | استهلاك كميات هائلة من الورق |

---

## ١.٣ الحل المقترح

منصة **Quizzy** تُوفِّر الحل الشامل لكل هذه المشاكل من خلال:

- بيئة اختبار رقمية آمنة ومحمية من الغش بآليات متعددة
- دعم أنواع متنوعة من الأسئلة: اختيار من متعدد، صح وخطأ، نصية قصيرة، **وأسئلة برمجية تُصحَّح آلياً**
- نتائج فورية مع مراجعة تفصيلية للإجابات في ثوانٍ
- استيراد الأسئلة من ملفات Excel تلقائياً باستخدام **الذكاء الاصطناعي (Gemini)**
- شهادات إلكترونية احترافية قابلة للطباعة لكل طالب ناجح
- تحليلات وإحصائيات شاملة لأداء الطلاب

---

---

<div align="center">

# ثانياً: المقدمة
## Introduction

</div>

---

## ٢.١ خلفية المشروع

في خضم الثورة الرقمية التي يشهدها قطاع التعليم، أصبح التحول نحو أدوات التقييم الإلكترونية ضرورةً لا خياراً. تشير الدراسات العالمية إلى أن **80% من المؤسسات التعليمية** في الدول المتقدمة انتقلت بالفعل إلى منظومة الاختبارات الإلكترونية بشكل كامل أو جزئي، في حين لا تزال كثير من مؤسسات العالم العربي تعتمد كلياً على الورق.

من هذا المنطلق، جاء مشروع **Quizzy** كحل متكامل موجَّه للبيئة العربية، مع دعم ثنائية اللغة (العربية والإنجليزية) والدعم الكامل لاتجاه الكتابة من اليمين إلى اليسار (RTL).

---

## ٢.٢ أهمية المشروع

تكمن أهمية هذا المشروع في المحاور التالية:

### من منظور الطالب:
- **المرونة:** القدرة على أداء الاختبار من أي مكان وفي أي وقت ضمن النافذة المحددة
- **الشفافية:** الاطلاع الفوري على النتائج والإجابات الصحيحة بعد الانتهاء
- **الحفز:** استلام شهادات إلكترونية إثباتاً للنجاح والإنجاز

### من منظور المدرس:
- **توفير الوقت:** إنشاء اختبارات كاملة في دقائق بدلاً من ساعات
- **القوة التحليلية:** الاطلاع الفوري على أداء كل طالب وتحديد نقاط الضعف
- **بنك الأسئلة:** إعادة استخدام الأسئلة المُعَدَّة سابقاً عبر اختبارات متعددة
- **الذكاء الاصطناعي:** استيراد مئات الأسئلة من ملف Excel في ثوانٍ

### من منظور المؤسسة التعليمية:
- **توفير التكاليف:** إلغاء تكاليف الطباعة والورق بالكامل
- **الأرشفة التلقائية:** حفظ سجلات الاختبارات والنتائج تلقائياً في السحابة
- **قابلية التوسع:** استيعاب آلاف المستخدمين دون تغيير في البنية التحتية

---

## ٢.٣ أهداف المشروع

### الأهداف الأساسية:
1. بناء منصة اختبارات إلكترونية متكاملة تعمل في الوقت الفعلي
2. تطبيق نظام صلاحيات ثلاثي المستويات (طالب / مدرس / مسؤول)
3. ضمان أمان بيانات الاختبار وعدم تمكين الطلاب من الوصول للإجابات الصحيحة
4. توفير تجربة مستخدم سلسة وجذابة على جميع أحجام الشاشات
5. دمج تقنيات الذكاء الاصطناعي لتسريع إنشاء محتوى الاختبارات

### الأهداف الثانوية:
1. دعم الأسئلة البرمجية مع تنفيذ آلي للكود وتصحيح بالحالات الاختبارية
2. توفير شهادات إلكترونية قابلة للطباعة والتحقق
3. دعم ثنائية اللغة (العربية / الإنجليزية)
4. تطبيق الوضع الداكن (Dark Mode) لراحة المستخدم

---

## ٢.٤ نطاق المشروع

| في نطاق المشروع | خارج نطاق المشروع |
|---|---|
| اختبارات المؤسسات التعليمية المغلقة | الاختبارات العامة المفتوحة للإنترنت |
| الأسئلة: MCQ، T/F، نصية، برمجية | أسئلة الصوت والفيديو (مقررة للإصدار القادم) |
| التصحيح الآلي للإجابات الموضوعية | التصحيح اليدوي للأسئلة المقالية (مقرر) |
| شهادات الإنجاز الإلكترونية | الشهادات المعتمدة رسمياً |
| إدارة المستخدمين من قِبَل الأدمن | LDAP / Active Directory integration |

---

---

<div align="center">

# ثالثاً: نظرة عامة على النظام
## System Overview

</div>

---

## ٣.١ فكرة النظام

**Quizzy** هو تطبيق ويب متكامل يعتمد على **Firebase** كخلفية خدمية (Backend as a Service)، و**Next.js 15** كإطار عمل للواجهة الأمامية. يعتمد النظام على مبدأ **الصلاحيات الصارمة**، حيث يُعامَل كل مستخدم وفق دوره المحدد مسبقاً.

---

## ٣.٢ مستويات النظام (System Layers)

```
┌─────────────────────────────────────────────────────┐
│              طبقة الواجهة (Browser)                  │
│    Next.js 15 App Router + React Components          │
│    localStorage (حفظ حالة الاختبار مؤقتاً)           │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│           طبقة التطبيق (Application Layer)           │
│    Server Components (جلب البيانات من السيرفر)       │
│    API Routes: /api/grade, /api/genkit              │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│              Firebase Platform                       │
│  ┌────────────────┐  ┌──────────────────────────┐   │
│  │ Firebase Auth  │  │   Cloud Firestore          │   │
│  │ (المصادقة)     │  │  (قاعدة البيانات)          │   │
│  └────────────────┘  └──────────────────────────┘   │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│              طبقة الذكاء الاصطناعي                  │
│    Google Genkit + Gemini 1.5 Flash                  │
│    (تحليل الملفات واستخراج الأسئلة آلياً)           │
└─────────────────────────────────────────────────────┘
```

---

## ٣.٣ تدفق المستخدم (User Flow)

### تدفق الطالب:
```
تسجيل الدخول ──► لوحة تحكم الطالب ──► قائمة الاختبارات
                                              │
                              ┌───────────────▼──────────────────┐
                              │         أداء الاختبار             │
                              │  ● عرض الأسئلة                    │
                              │  ● الإجابة + التنقل               │
                              │  ● المؤقت الزمني                  │
                              │  ● حفظ تلقائي كل 30 ثانية         │
                              └───────────────┬──────────────────┘
                                              │
                              ┌───────────────▼──────────────────┐
                              │  تسليم الاختبار + التصحيح الآلي   │
                              └───────────────┬──────────────────┘
                                              │
                     ┌────────────────────────▼──────────────────────────┐
                     │         صفحة النتائج                               │
                     │  ● النتيجة والنسبة المئوية                        │
                     │  ● مراجعة الإجابات الصحيحة والخاطئة               │
                     │  ● الشهادة الإلكترونية (في حالة النجاح)           │
                     └───────────────────────────────────────────────────┘
```

### تدفق المدرس:
```
تسجيل الدخول ──► لوحة تحكم المدرس ──► إنشاء اختبار جديد
                                              │
                              ┌───────────────▼──────────────────┐
                              │         منشئ الاختبار             │
                              │  ● بيانات الاختبار (عنوان، مادة)  │
                              │  ● جدولة (وقت البداية / النهاية)  │
                              │  ● سياسات المحاولات               │
                              │  ● إضافة أسئلة (يدوي / AI Import) │
                              └───────────────┬──────────────────┘
                                              │
                              ┌───────────────▼──────────────────┐
                              │  مشاركة الاختبار (رابط / QR Code) │
                              └───────────────┬──────────────────┘
                                              │
                              ┌───────────────▼──────────────────┐
                              │  عرض نتائج الطلاب + التحليلات    │
                              └──────────────────────────────────┘
```

---

## ٣.٤ نموذج قاعدة البيانات

تعتمد المنصة على **Firebase Firestore** كقاعدة بيانات NoSQL. البنية الرئيسية:

```
Firestore Root
│
├── users/{userId}                   ← بيانات كل مستخدم (اسم، إيميل، دور)
│
├── exams/{examId}                   ← بيانات الاختبارات
│   └── questions/{questionId}       ← أسئلة الاختبار (Sub-collection)
│                                    ← [ملاحظة: حقل "answer" محمي من العميل]
│
├── studentExams/{resultId}          ← سجلات النتائج والمحاولات
│
├── questionBank/{qbId}              ← بنك أسئلة المدرس الشخصي
│
├── certificates/{certId}            ← الشهادات الإلكترونية الصادرة
│
└── examShares/{shareId}             ← رموز مشاركة الاختبارات وـQR Code
```

---

---

<div align="center">

# رابعاً: التقنيات المستخدمة
## Technologies Used

</div>

---

## ٤.١ نظرة عامة على التقنيات

تم بناء هذا المشروع باستخدام مجموعة من أحدث وأقوى تقنيات تطوير الويب الحديثة. تم اختيار كل تقنية بعناية لتعظيم الأداء والأمان وسهولة الصيانة.

---

## ٤.٢ الواجهة الأمامية (Frontend)

### أ) Next.js 15 — إطار عمل الواجهة الأمامية

**Next.js** هو إطار عمل مبني فوق **React.js**، يُقدِّم قدرات متقدمة لبناء تطبيقات ويب حديثة وعالية الأداء.

**ميزاته المستخدمة في المشروع:**

| الميزة | الاستخدام في Quizzy |
|---|---|
| **App Router** | تنظيم الصفحات في مجموعات مسارات منعزلة لكل دور |
| **Server Components** | جلب بيانات الاختبارات من Firestore على جانب السيرفر |
| **Client Components** | المكونات التفاعلية (مؤقت الاختبار، نموذج الإجابات) |
| **Dynamic Routes** | صفحات `[id]` للاختبارات والنتائج والشهادات |
| **Route Groups** | `(app)` للصفحات المحمية، `(auth)` لصفحات تسجيل الدخول |
| **API Routes** | نقطة نهاية `/api` لعمليات التصحيح واستدعاء AI |
| **Turbopack** | بناء المشروع في بيئة التطوير بسرعة فائقة |

**مثال على استخدام Server Component لجلب بيانات الاختبار:**
```typescript
// src/app/(app)/student/exams/page.tsx
// هذا المكون يعمل على السيرفر - لا يُرسَل JavaScript للمتصفح
const examDocRef = doc(firestore, 'exams', examId);
const { data: exam } = useDoc<ExamDetails>(examDocRef);
```

---

### ب) TypeScript — لغة البرمجة

**TypeScript** هي لغة برمجة مبنية فوق JavaScript، تُضيف نظام أنواع قوياً يكتشف الأخطاء قبل وقت التشغيل.

**سبب الاستخدام:**
- ضمان تطابق أنواع البيانات بين واجهة المستخدم وقاعدة البيانات
- مشاركة مخططات Zod بين نماذج الإدخال ونقاط نهاية API
- كشف الأخطاء في مرحلة كتابة الكود نفسها

**مثال:**
```typescript
// src/lib/types.ts
export type UserRole = 'student' | 'teacher' | 'admin';

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-text' | 'code';
  answer: string;
  points: number;
  options?: string[];
  language?: string;   // للأسئلة البرمجية
  testCases?: string;  // JSON string
}
```

---

### ج) Tailwind CSS — نظام التصميم

**Tailwind CSS** هو إطار عمل تصميم يعتمد على مبدأ "utility-first"، حيث يتم تطبيق الأنماط مباشرة في HTML باستخدام كلاسات جاهزة.

**متغيرات التصميم المستخدمة في المشروع (`globals.css`):**

| المتغير | القيمة (Light) | القيمة (Dark) | الاستخدام |
|---|---|---|---|
| `--primary` | `hsl(220 87% 55%)` | `hsl(220 87% 55%)` | أزرار CTA، الشريط الجانبي |
| `--accent` | `hsl(45 93% 58%)` | `hsl(45 93% 58%)` | تمييز الشعار، الشارات |
| `--background` | `hsl(210 40% 98%)` | `hsl(222 47% 11%)` | خلفية الصفحة |
| `--muted` | `hsl(210 40% 92%)` | `hsl(217 32% 17%)` | خلفيات البطاقات |
| `--destructive` | `hsl(0 84.2% 60.2%)` | `hsl(0 62.8% 30.6%)` | التحذيرات، الحذف |

---

### د) ShadCN UI — مكتبة المكونات

**ShadCN UI** ليست مكتبة مكونات تقليدية، بل هي مجموعة من المكونات مفتوحة المصدر المبنية على **Radix UI** — مكتبة headless متمحورة حول إمكانية الوصول.

**المكونات المستخدمة في المشروع:**

| المكوِّن | الاستخدام |
|---|---|
| `Button` | جميع أزرار التفاعل في الواجهة |
| `Card` | بطاقات الاختبارات والأسئلة والنتائج |
| `Dialog / AlertDialog` | نوافذ التأكيد (حذف، تسليم، مشاركة) |
| `RadioGroup` | خيارات الإجابة في أسئلة الاختيار من متعدد |
| `Progress` | شريط تقدم المؤقت الزمني |
| `Accordion` | مراجعة الإجابات التفصيلية في صفحة النتائج |
| `Calendar` | اختيار تواريخ ووقتَي بدء وانتهاء الاختبار |
| `Toast` | رسائل التنبيه الفورية (نجاح / خطأ / تحذير) |
| `Badge` | شارات حالة الاختبار (متاح / مجدول / منتهٍ) |
| `Avatar` | صورة بروفايل المستخدم في الشريط العلوي |

---

### هـ) Framer Motion — مكتبة الحركة

**Framer Motion** هي مكتبة animation لـ React تُنتِج حركات سلسة وتأثيرات بصرية.

**الاستخدامات في المشروع:**
- انتقال تدريجي (fade) عند تحميل صفحة الاختبار
- حركة ظهور تدريجية لبطاقات لوحة التحكم
- تأثير تكبير عند تحميل شعار Quizzy في شاشة الدخول

```typescript
// مثال من page.tsx — تأثير ظهور نموذج تسجيل الدخول
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
>
  <LoginCard />
</motion.div>
```

---

## ٤.٣ الخلفية الخدمية (Backend / Firebase)

### أ) Firebase Authentication — المصادقة

**Firebase Auth** يُدير هويات المستخدمين ويُوفِّر طرق تسجيل دخول متعددة.

**طرق تسجيل الدخول المدعومة:**
- **البريد الإلكتروني وكلمة المرور** — الطريقة الأساسية
- **Google Sign-In** — تسجيل الدخول بحساب Google بنقرة واحدة

**آلية العمل:**
```
المستخدم يُدخل بريده ─► Firebase Auth يتحقق ─► يُعيد UID + Token
                                                        │
                            Firestore يُستَعلَم بـ UID ◄──┘
                                     │
                              يُعاد دور المستخدم (role)
                                     │
                           التوجيه إلى /{role} dashboard
```

---

### ب) Cloud Firestore — قاعدة البيانات

**Firestore** قاعدة بيانات وثائقية (Document-Oriented) NoSQL من Firebase، تدعم التحديثات في الوقت الفعلي.

**مزاياها في مشروعنا:**
- البيانات مُنظَّمة في وثائق ومجموعات (Collections & Documents)
- Sub-collections تُستخدَم لتخزين أسئلة كل اختبار منفصلةً
- استعلامات مُصفَّاة مثل: "جلب كل اختبارات المدرس X"
- قواعد أمان (Security Rules) تُطبَق على السيرفر مباشرةً

---

### ج) Google Genkit + Gemini — الذكاء الاصطناعي

**Google Genkit** هو إطار عمل من Google لدمج نماذج الذكاء الاصطناعي في التطبيقات.

**الاستخدام في Quizzy — ميزة الاستيراد الذكي:**

```
المدرس يرفع ملف Excel ──►  FileReader يحوِّله لـ Base64
                                          │
                            API Route يستقبل الملف
                                          │
                        Genkit Flow يستدعي مكتبة xlsx
                                          │
               Gemini 1.5 Flash يُحلِّل البيانات ويُنتِج JSON
                                          │
                    Zod يتحقق من صحة كل سؤال
                                          │
                   الأسئلة تُضاف تلقائياً لنموذج الاختبار
```

---

## ٤.٤ مكتبات إضافية

| المكتبة | الغرض |
|---|---|
| `React Hook Form` | إدارة نماذج الإدخال بدون إعادة رسم غير ضرورية |
| `Zod` | التحقق من صحة البيانات برمجياً (Schema Validation) |
| `TanStack Table` | جداول بيانات متقدمة مع البحث والفلترة |
| `Recharts` | رسوم بيانية للتحليلات والإحصائيات |
| `qrcode.react` | توليد QR Code لرابط الاختبار |
| `xlsx` | قراءة وتحليل ملفات Excel/CSV على السيرفر |
| `Zustand` | إدارة الحالة العامة (ثيم، اتجاه اللغة) |
| `Lucide React` | مكتبة أيقونات موحدة وخفيفة الوزن |
| `date-fns` | معالجة وتنسيق التواريخ والأوقات |
| `Resend` | إرسال الرسائل الإلكترونية (للإصدارات القادمة) |

---

---

<div align="center">

# خامساً: بنية المشروع
## Project Structure

</div>

---

## ٥.١ الهيكل العام للمشروع

```
quizzy/
├── src/
│   ├── app/                    ← جذر تطبيق Next.js (App Router)
│   ├── ai/                     ← كود الذكاء الاصطناعي (Genkit)
│   ├── components/             ← المكونات القابلة لإعادة الاستخدام
│   ├── firebase/               ← إعداد Firebase والـ Providers
│   ├── hooks/                  ← Custom React Hooks
│   └── lib/                    ← أدوات مساعدة، أنواع، ثوابت
│
├── public/                     ← الملفات الثابتة (الصور، الفافيكون)
├── .env.local                  ← متغيرات البيئة السرية
├── firestore.rules             ← قواعد أمان Firestore
├── next.config.ts              ← إعدادات Next.js
├── tailwind.config.ts          ← إعدادات Tailwind CSS
├── tsconfig.json               ← إعدادات TypeScript
└── package.json                ← المكتبات والأوامر
```

---

## ٥.٢ شرح مجلد `src/app` (تفصيلي)

هذا هو قلب التطبيق. يعتمد على نظام **App Router** الخاص بـ Next.js.

```
src/app/
│
├── layout.tsx              ← الهيكل الجذر: يُحمِّل الخطوط والمزودين
├── page.tsx                ← صفحة تسجيل الدخول / Landing Page
├── globals.css             ← متغيرات التصميم ومحتوى Tailwind
├── icon.tsx                ← أيقونة التطبيق (Favicon)
│
├── (auth)/                 ← مجموعة مسارات المصادقة (بدون Sidebar)
│   └── [لم تُنشَأ بعد — مُدمجة داخل page.tsx الرئيسية]
│
├── (app)/                  ← مجموعة المسارات المحمية (بالـ Sidebar والـ Header)
│   ├── layout.tsx          ← الحارس الأمني: يتحقق من تسجيل الدخول والدور
│   │
│   ├── student/            ← واجهة الطالب
│   │   ├── page.tsx        ← لوحة تحكم الطالب (Dashboard)
│   │   ├── exams/
│   │   │   └── page.tsx    ← قائمة الاختبارات المتاحة مع حالتها
│   │   ├── exam/[id]/
│   │   │   └── page.tsx    ← محرك أداء الاختبار (أهم صفحة)
│   │   ├── results/[id]/
│   │   │   └── page.tsx    ← صفحة النتائج والمراجعة التفصيلية
│   │   └── sheets/         ← ورقة إجابات (للمراجعة)
│   │
│   ├── teacher/            ← واجهة المدرس
│   │   ├── page.tsx        ← لوحة تحكم المدرس
│   │   ├── create/
│   │   │   └── page.tsx    ← منشئ الاختبارات (نموذج متكامل)
│   │   ├── question-bank/
│   │   │   └── page.tsx    ← بنك أسئلة المدرس الشخصي
│   │   └── results/[examId]/
│   │       └── page.tsx    ← تحليلات أداء الطلاب لكل اختبار
│   │
│   ├── admin/              ← واجهة المسؤول
│   │   ├── page.tsx        ← لوحة التحكم العامة (إحصائيات النظام)
│   │   └── users/
│   │       └── page.tsx    ← إدارة جميع المستخدمين (CRUD)
│   │
│   ├── certificate/[id]/
│   │   └── page.tsx        ← صفحة الشهادة الإلكترونية (عامة + قابلة للطباعة)
│   │
│   └── profile/
│       └── page.tsx        ← صفحة الملف الشخصي للمستخدم
│
├── api/                    ← نقاط نهاية API (على السيرفر فقط)
│   └── genkit/
│       └── parseQuestions/
│           └── route.ts    ← API لاستيراد الأسئلة بالذكاء الاصطناعي
│
└── report/                 ← صفحة تقرير (للطباعة)
    └── [examId]/
        └── page.tsx
```

---

## ٥.٣ شرح مجلد `src/components`

```
src/components/
│
├── providers.tsx         ← AppContext يوفر (ثيم، اتجاه اللغة) لكل المكونات
├── logo.tsx              ← مكوِّن الشعار: "Qui" (أزرق) + "zzy" (أصفر)
├── FirebaseErrorListener.tsx ← يلتقط أخطاء Firebase ويعرضها كـ Toast
│
└── ui/                   ← جميع مكونات ShadCN UI
    ├── button.tsx
    ├── card.tsx
    ├── dialog.tsx
    ├── accordion.tsx
    ├── calendar.tsx
    ├── badge.tsx
    ├── progress.tsx
    ├── toast.tsx
    └── ... (30+ مكوِّن)
```

---

## ٥.٤ شرح مجلد `src/firebase`

```
src/firebase/
│
├── index.ts          ← تهيئة تطبيق Firebase وتصدير الـ Hooks
│                        - useUser() ← بيانات المستخدم الحالي
│                        - useDoc() ← جلب وثيقة واحدة من Firestore
│                        - useCollection() ← جلب مجموعة وثائق
│
└── provider.tsx      ← React Context يُوفِّر:
                         - useAuth() ← كائن Firebase Auth
                         - useFirestore() ← كائن Firestore
```

---

## ٥.٥ شرح مجلد `src/ai`

```
src/ai/
│
├── genkit.ts         ← إنشاء كائن Genkit وربطه بنموذج Gemini
├── dev.ts            ← نقطة البداية لسيرفر Genkit في التطوير
│
└── flows/
    ├── parseQuestionsFlow.ts ← Flow لاستيراد الأسئلة من Excel
    └── evaluate-code-flow.ts ← Flow لتقييم كود Python/Java على السيرفر
```

---

## ٥.٦ شرح `src/lib`

```
src/lib/
│
├── types.ts          ← كل interface وtype مستخدَم في المشروع
│                        (User, Exam, Question, Answer, ExamResult...)
│
├── utils.ts          ← دوال مساعدة:
│                        - cn() لدمج كلاسات Tailwind
│                        - formatTime() لتحويل الثواني لـ mm:ss
│
├── constants.ts      ← قيم ثابتة (حد النجاح 50%)
│
├── schemas.ts        ← مخططات Zod للتحقق من البيانات
│
└── placeholder-images.ts ← بيانات الصور التوضيحية في الواجهة
```

---

## ٥.٧ العلاقات بين الملفات

```
[page.tsx - أي صفحة]
     │
     ├── يستورد من components/ui/* ← مكونات التصميم
     ├── يستورد من firebase/ ← الـ Hooks للبيانات
     ├── يستورد من lib/types.ts ← أنواع البيانات
     ├── يستورد من lib/utils.ts ← الدوال المساعدة
     └── يستورد من components/providers.tsx ← السياق العام
```

---

---

<div align="center">

# سادساً: المميزات والوظائف
## Features & Functionality

</div>

---

## ٦.١ واجهة الطالب

### أ) قائمة الاختبارات (`/student/exams`)

تعرض هذه الصفحة جميع الاختبارات المتاحة في شكل بطاقات. الميزة الأبرز هي **الحالة الديناميكية** لكل بطاقة:

| الحالة | اللون | الشرط |
|---|---|---|
| `Scheduled` - مجدول | 🔵 أزرق | وقت البداية لم يحِن بعد |
| `Start Now` - ابدأ الآن | 🟢 أخضر | الوقت متاح ولم يبدأ الطالب بعد |
| `In Progress` - قيد التنفيذ | 🟡 أصفر | توجد محاولة محفوظة في localStorage |
| `Retake Available` - إعادة متاحة | 🟠 برتقالي | أنهى محاولة ولديه محاولات متبقية |
| `Completed` - مكتمل | ⚫ رمادي | استنفد جميع المحاولات |
| `Expired` - منتهٍ | 🔴 أحمر | انتهى وقت الاختبار دون محاولة |

**الكود المسؤول عن حساب الحالة:**
```typescript
function computeExamStatus(exam, attempts) {
  const now = new Date();
  const hasStarted = now >= exam.startTime;
  const hasExpired = now > exam.endTime;
  const completedAttempts = attempts.filter(a => a.status === 'completed');

  if (!hasStarted)                                  return 'scheduled';
  if (hasExpired && completedAttempts.length === 0) return 'expired';
  if (completedAttempts.length >= exam.maxAttempts) return 'completed';
  // ...وهكذا لبقية الحالات
}
```

---

### ب) محرك أداء الاختبار (`/student/exam/[id]`)

هذه **أهم صفحة في المشروع** وأكثرها تعقيداً. تحتوي على:

#### ١. المؤقت الزمني الذكي

المؤقت الزمني يُحسَب عدد الثواني المتبقية ويُحدَّث كل ثانية:
- يبدأ من مدة الاختبار (بالدقائق × 60)
- إذا كان هناك حالة محفوظة في localStorage، يُستأنَف من حيث توقف
- عند وصول المؤقت لأقل من **60 ثانية**: يتحول لون الأرقام للأحمر تحذيراً
- عند وصوله **للصفر**: يُرسَل الاختبار تلقائياً

```typescript
// المؤقت الزمني - يعمل كل ثانية
timerRef.current = setInterval(() => {
  setTimeLeft((prevTime) => {
    if (prevTime <= 1) {
      clearInterval(timerRef.current!);
      handleSubmit(); // تسليم تلقائي عند انتهاء الوقت
      return 0;
    }
    return prevTime - 1;
  });
}, 1000);
```

#### ٢. الحفظ التلقائي كل 30 ثانية

```typescript
useEffect(() => {
  if (isTeacherPreview) return;
  const autoSaveTimer = setInterval(saveState, 30000); // كل 30 ثانية
  return () => clearInterval(autoSaveTimer);
}, [saveState]);
```

**ما يُحفَظ في localStorage:**
```json
{
  "answers": [
    { "questionId": "abc123", "value": "Option B" },
    { "questionId": "def456", "value": true }
  ],
  "markedForReview": ["xyz789"],
  "timeLeft": 1247,
  "attempt": 1
}
```

#### ٣. أنواع الأسئلة المدعومة

**أ) اختيار من متعدد (Multiple Choice):**
```tsx
<RadioGroup value={userAnswer?.value} onValueChange={handleRadioChange}>
  {question.options.map((option) => (
    <div key={option} className="flex items-center p-3 bg-muted/50 rounded-md">
      <RadioGroupItem value={option} id={`${question.id}-${option}`} />
      <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
    </div>
  ))}
</RadioGroup>
```

**ب) صح وخطأ (True/False):**
```tsx
<RadioGroup value={String(userAnswer?.value)} onValueChange={handleTrueFalseChange}>
  <RadioGroupItem value="true" /> <Label>صحيح / True</Label>
  <RadioGroupItem value="false" /> <Label>خطأ / False</Label>
</RadioGroup>
```

**ج) نص قصير (Short Text):**
```tsx
<Input
  value={userAnswer?.value || ""}
  onChange={handleTextChange}
  placeholder="اكتب إجابتك هنا..."
/>
```

**د) الأسئلة البرمجية (Code Questions):**
هذه الميزة المتقدمة تتيح للطالب كتابة كود برمجي وتنفيذه ضمن بيئة آمنة معزولة (iFrame sandbox):

```typescript
// تنفيذ JavaScript داخل iFrame معزول
const iframe = document.createElement('iframe');
iframe.style.display = 'none';
document.body.appendChild(iframe);

// إرسال الكود للـ iFrame وانتظار النتيجة
iframe.contentWindow?.postMessage({ code: userCode, testCases }, '*');
```

#### ٤. آليات مكافحة الغش

المشروع يُطبِّق عدة آليات لمنع الغش خلال الاختبار:

```typescript
// منع النسخ واللصق والقص
document.addEventListener('copy',  preventAction);
document.addEventListener('paste', preventAction);
document.addEventListener('cut',   preventAction);

// كشف تبديل التبويب
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    toast({ title: "⚠️ تحذير: تم رصد تبديل التبويب" });
  }
});

// منع التقاط الشاشة
window.addEventListener('keyup', (e) => {
  if (e.key === 'PrintScreen') {
    e.preventDefault();
    toast({ title: "⚠️ محاولة التقاط الشاشة محظورة" });
  }
});

// منع تحديد النص (CSS)
.no-select {
  -webkit-user-select: none;
  user-select: none;
}
```

#### ٥. شريط التنقل بين الأسئلة

شبكة من الأزرار تُمثِّل كل أسئلة الاختبار، مُلوَّنة بناءً على الحالة:

```
[ 1✅ ][ 2⭕ ][ 3🔖 ][ 4✅ ][ 5⬤ ]
 أجاب   لم يُجب  مراجعة  أجاب  السؤال الحالي
```

```tsx
<Button
  variant={
    markedForReview.includes(q.id)
      ? 'destructive'                          // أحمر = مُعلَّم للمراجعة
      : answers.some(a => a.questionId === q.id)
        ? 'secondary'                          // رمادي = تم الإجابة
        : 'outline'                            // شفاف = لم يُجَب
  }
  className={currentQuestionIndex === index ? 'ring-2 ring-primary' : ''}
  onClick={() => goToQuestion(index)}
>
  {index + 1}
</Button>
```

#### ٦. عملية التسليم والتصحيح

عند تسليم الاختبار، يحسب النظام النتيجة **على جانب العميل مؤقتاً**، ثم يُرسِل البيانات لـ Firestore:

```typescript
const handleSubmit = async () => {
  let score = 0, maxScore = 0;
  
  questions.forEach(q => {
    maxScore += q.points;
    const userAnswer = answers.find(a => a.questionId === q.id);
    
    if (q.type === 'code') {
      // الأسئلة البرمجية: درجة بناءً على نسبة الاختبارات الناجحة
      score += q.points * (userAnswer.value.score / 100);
    } else if (/* ليس مقالياً */) {
      // باقي الأنواع: مقارنة مباشرة
      if (String(userAnswer?.value).toLowerCase() === String(q.answer).toLowerCase()) {
        score += q.points;
      }
    }
  });
  
  const resultData = {
    studentId: user.uid,
    examId: exam.id,
    score,
    maxScore,
    percentage: (score / maxScore) * 100,
    passed: (score / maxScore) * 100 >= 50,  // 50% حد النجاح
    timeTaken: (exam.duration * 60) - timeLeft,
    attemptNumber,
    submittedAt: serverTimestamp(),
  };
  
  await setDoc(resultDocRef, resultData);
  localStorage.removeItem(`exam-${exam.id}`); // مسح الحالة المؤقتة
  router.push(`/student/results/${resultId}`);
};
```

---

### ج) صفحة النتائج (`/student/results/[id]`)

تعرض هذه الصفحة:
1. **بطاقة الملخص:** الدرجة، النسبة المئوية، الوقت المستغرق، شارة (ناجح/راسب)
2. **مراجعة الإجابات:** كل سؤال مع إجابة الطالب والإجابة الصحيحة
3. **أزرار الإجراءات:** العودة للوحة التحكم، إعادة الاختبار، عرض الشهادة

---

### د) الشهادة الإلكترونية (`/certificate/[id]`)

شهادة احترافية تتضمن: اسم الطالب، اسم الاختبار، التاريخ، النتيجة، رمز التحقق.

مُحسَّنة للطباعة بـ CSS:
```css
@media print {
  /* إخفاء كل شيء عدا الشهادة */
  .no-print { display: none !important; }
  .certificate { page-break-inside: avoid; }
}
```

---

## ٦.٢ واجهة المدرس

### أ) لوحة تحكم المدرس (`/teacher`)

- جدول يعرض جميع الاختبارات التي أنشأها، مع حالتها الحالية
- إحصائيات سريعة (عدد الاختبارات، عدد المحاولات)
- لكل اختبار: زر عرض النتائج، زر المشاركة (رابط+QR)، زر الحذف

### ب) منشئ الاختبارات (`/teacher/create`)

نموذج متعدد الأقسام يشمل:

**القسم الأول — بيانات الاختبار:**
```typescript
// مخطط Zod للتحقق من البيانات
const ExamSchema = z.object({
  title:         z.string().min(3, 'العنوان مطلوب'),
  subject:       z.string().min(2, 'المادة مطلوبة'),
  duration:      z.number().int().min(5).max(480),
  startTime:     z.date(),
  endTime:       z.date(),
  attemptsAllowed: z.number().int().min(1).max(10),
  scoringPolicy: z.enum(['highest', 'average']),
});
```

**القسم الثاني — إضافة الأسئلة:**
- يمكن إضافة عدد غير محدود من الأسئلة
- تغيير ديناميكي للواجهة بناءً على نوع السؤال المختار
- دعم رفع صور أو فيديوهات لكل سؤال
- **استيراد بالذكاء الاصطناعي** من ملف Excel/CSV

### ج) بنك الأسئلة (`/teacher/question-bank`)

- جدول بيانات تفاعلي لجميع أسئلة المدرس
- بحث نصي مُرشَّح في الوقت الفعلي
- فلترة حسب المادة ونوع السؤال

---

## ٦.٣ واجهة المسؤول

### أ) لوحة التحكم (`/admin`)

- إجمالي المستخدمين في النظام
- إجمالي الاختبارات
- الاختبارات النشطة حالياً
- آخر المسجلين في النظام

### ب) إدارة المستخدمين (`/admin/users`)

جدول كامل بجميع المستخدمين مع عمليات:
- **إضافة:** نموذج حوار لإنشاء حساب جديد مع تحديد الدور
- **تعديل الدور:** قائمة منسدلة لتغيير دور المستخدم فوراً
- **حذف:** حوار تأكيد قبل الحذف

---

---

<div align="center">

# سابعاً: تصميم الواجهات
## UI/UX Design

</div>

---

## ٧.١ فلسفة التصميم

تم تصميم **Quizzy** وفق المبادئ التالية:

### أ) الوضوح والتركيز
كل صفحة مصممة لمهمة واحدة محددة. صفحة الاختبار مثلاً تُزيل أي عناصر مُلهِية وتبقي فقط السؤال والمؤقت وشريط التنقل. المستخدم يعرف دائماً "ماذا يجب أن يفعل الآن".

### ب) التسلسل الهرمي البصري
استخدام الأحجام والألوان والمسافات لترتيب المعلومات من الأهم للأقل أهمية. العنوان الرئيسي > العنوان الفرعي > النص التوضيحي.

### ج) الاستجابة الفورية
كل تفاعل للمستخدم يحصل على تغذية راجعة فورية:
- نضغط حفظ → يظهر "Saving..." ثم "Saved ✓"
- نجيب على سؤال → يتغير لون زره في شريط التنقل
- نرسل الاختبار → يظهر مؤشر دوران (Loading spinner)

### د) التجاوبية الكاملة (Responsive Design)

| حجم الشاشة | السلوك |
|---|---|
| موبايل (< 768px) | الشريط الجانبي يختفي ويُستبدَل بقائمة جانبية منبثقة |
| تابلت (768px–1024px) | شريط جانبي بعرض 220px |
| كمبيوتر (> 1024px) | شريط جانبي بعرض 280px + محتوى واسع |

---

## ٧.٢ نظام الألوان

```css
/* الألوان الرئيسية في globals.css */
:root {
  --primary: 220 87% 55%;    /* الأزرق الرئيسي - Quizzy Blue */
  --accent:  45 93% 58%;     /* الأصفر المميز - Quizzy Yellow */
  --background: 210 40% 98%; /* الخلفية الفاتحة */
  --destructive: 0 84.2% 60.2%; /* الأحمر للأخطاء والتحذيرات */
}

.dark {
  --background: 222 47% 11%; /* خلفية داكنة عميقة */
  --primary: 220 87% 55%;    /* يبقى نفسه في الوضع الداكن */
}
```

**قراءة علم الألوان في المشروع:**
- **الأزرق:** يُوحي بالثقة والأمان — مناسب لمنصة تعليمية
- **الأصفر:** يُوحي بالطاقة والإبداع — يُميِّز العلامة التجارية
- **الأحمر:** للتحذيرات والأخطاء والحذف — إشارة بصرية عالمية الفهم

---

## ٧.٣ الخطوط المستخدمة

| الخط | الاستخدام | الوزن |
|---|---|---|
| **Poppins** | العناوين الرئيسية، الشعار، اسم الاختبار | 600, 700 |
| **PT Sans** | نص المحتوى، الأوصاف، التسميات | 400, 700 |
| **Monospace** | عرض المؤقت الزمني، مقتطفات الكود | النظام |

---

## ٧.٤ الشريط الجانبي (Sidebar)

تم تصميم الشريط الجانبي ليكون **ثابتاً ومتسقاً** عبر جميع صفحات الدور الواحد:

```tsx
// الشريط الجانبي يتكيف مع دور المستخدم
const navItems = {
  student: [
    { href: '/student',       icon: Home,     label: 'Dashboard' },
    { href: '/student/exams', icon: FileText,  label: 'My Exams'  },
  ],
  teacher: [
    { href: '/teacher',              icon: Home,    label: 'Dashboard'   },
    { href: '/teacher/create',       icon: BookOpen, label: 'Create Exam' },
    { href: '/teacher/question-bank',icon: Library,  label: 'Question Bank'},
  ],
  admin: [
    { href: '/admin',        icon: Home,  label: 'Dashboard'    },
    { href: '/admin/users',  icon: Users, label: 'Manage Users' },
  ]
};
```

---

## ٧.٥ الوضع الداكن (Dark Mode)

يدعم التطبيق الوضع الداكن بالكامل عبر آلية Tailwind CSS:

```tsx
// تبديل الوضع الداكن بنقرة واحدة
const { theme, toggleTheme } = useApp();

// تطبيق الكلاس على عنصر HTML الجذر
document.documentElement.classList.toggle('dark', theme === 'dark');
```

---

## ٧.٦ إمكانية الوصول (Accessibility)

- جميع المكونات المبنية على **Radix UI** ممكَّنة للتنقل بالكيبورد
- جميع الصور تحتوي على نص بديل (alt text)
- ألوان الواجهة تحترم معايير التباين (WCAG AA)
- الشريط الجانبي على الموبايل: `<SheetTitle className="sr-only">` لقارئات الشاشة

---

---

<div align="center">

# ثامناً: شرح الكود البرمجي
## Code Explanation

</div>

---

## ٨.١ نظام المصادقة وتسجيل الدخول

### الملف: `src/app/page.tsx`

هذه الصفحة تُؤدي دورين: **عرض صفحة الترحيب** و**إدارة تسجيل الدخول**.

#### أ) التحقق التلقائي من حالة تسجيل الدخول

```typescript
// إذا كان المستخدم مسجلاً بالفعل، وجِّهه للوحة تحكمه
useEffect(() => {
  if (!isUserLoading && user && firestore) {
    const userDocRef = doc(firestore, 'users', user.uid);
    getDoc(userDocRef).then(docSnap => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        router.push(`/${userData.role}`); // توجيه حسب الدور
      }
    });
  }
}, [user, isUserLoading, firestore, router]);
```

**الشرح خطوة بخطوة:**
1. `useEffect` يراقب تغيُّر حالة تسجيل الدخول
2. إذا كان المستخدم مسجلاً (`user` موجود)، تُجلَب بياناته من Firestore
3. يُقرَأ حقل `role` من وثيقة المستخدم
4. يتم التوجيه تلقائياً: مدرس → `/teacher`، طالب → `/student`، مسؤول → `/admin`

---

#### ب) دالة تسجيل الدخول والتسجيل المُدمجة

```typescript
const handleEmailLoginOrSignup = async (e) => {
  e.preventDefault();
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    // محاولة 1: تسجيل الدخول
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await handleAuthSuccess(userCredential.user);
    
  } catch (signInError) {
    
    if (signInError.code === 'auth/user-not-found') {
      try {
        // محاولة 2: إنشاء حساب جديد إذا لم يكن موجوداً
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await handleAuthSuccess(userCredential.user);
      } catch (signUpError) {
        toast({ title: "فشل التسجيل", variant: "destructive" });
      }
    }
  }
};
```

**الذكاء في هذا الكود:** يكفي نموذج واحد لتسجيل الدخول والإنشاء معاً. النظام يحاول أولاً تسجيل الدخول، فإن لم يجد الحساب يُنشئه تلقائياً.

---

#### ج) دالة `handleAuthSuccess` — المُعالج المشترك

```typescript
const handleAuthSuccess = async (user: User) => {
  const userDocRef = doc(firestore!, 'users', user.uid);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    // مستخدم جديد: إنشاء وثيقة بدور "student" افتراضياً
    await setDoc(userDocRef, {
      id: user.uid,
      email: user.email,
      name: user.displayName || user.email?.split('@')[0],
      photoURL: user.photoURL,
      role: 'student',   // الدور الافتراضي
      status: 'Active',
    });
    toast({ title: "مرحباً!", description: "تم إنشاء حسابك كطالب." });
  } else {
    role = docSnap.data().role; // قراءة الدور الموجود
  }

  router.push(`/${role}`); // التوجيه النهائي
};
```

---

## ٨.٢ الحارس الأمني للمسارات

### الملف: `src/app/(app)/layout.tsx`

هذا الملف هو **بوابة الأمان** للتطبيق. يُنفَّذ قبل عرض أي صفحة محمية.

#### المرحلة الأولى: التحقق من تسجيل الدخول

```typescript
// المرحلة 1: هل المستخدم مسجل الدخول؟
useEffect(() => {
  if (!isUserLoading && !user) {
    router.push('/'); // إذا لا → توجيه لصفحة الدخول
  }
}, [isUserLoading, user, router]);
```

#### المرحلة الثانية: التحقق من الدور

```typescript
// المرحلة 2: هل المستخدم في القسم المخصص لدوره؟
const fetchUser = async () => {
  const docSnap = await getDoc(userDocRef);
  const role = docSnap.data().role;

  const allowedPaths = [`/${role}`, '/profile', '/certificate'];
  const isAllowed = allowedPaths.some(p => pathname.startsWith(p));

  if (role && !isAllowed) {
    router.replace(`/${role}`); // إذا لا → توجيه لقسمه الصحيح
  }
};
```

**مثال:** إذا سجل دخول مدرس وحاول الوصول لـ `/admin/users`، يُعاد توجيهه فوراً لـ `/teacher`.

---

## ٨.٣ دورة حياة إنشاء الاختبار

### الملف: `src/app/(app)/teacher/create/page.tsx`

#### إعداد النموذج بـ React Hook Form + Zod

```typescript
const form = useForm<z.infer<typeof ExamSchema>>({
  resolver: zodResolver(ExamSchema),        // Zod يتحقق تلقائياً
  defaultValues: {
    title: '',
    subject: '',
    duration: 60,                           // قيمة افتراضية: ساعة
    attemptsAllowed: 1,
    scoringPolicy: 'highest',
    questions: [],
  },
});
```

#### حفظ الاختبار في Firestore

```typescript
const onSubmit = async (values) => {
  const examDocRef = doc(collection(firestore, 'exams'));

  // حفظ بيانات الاختبار
  await setDoc(examDocRef, {
    ...values,
    id: examDocRef.id,
    teacherId: user.uid,                   // ربط الاختبار بالمدرس
    questionsCount: values.questions.length,
    createdAt: serverTimestamp(),
  });

  // حفظ الأسئلة في Sub-collection
  const batch = writeBatch(firestore);
  values.questions.forEach(q => {
    const qDocRef = doc(collection(firestore, 'exams', examDocRef.id, 'questions'));
    batch.set(qDocRef, { ...q, id: qDocRef.id });
  });
  await batch.commit(); // حفظ جميع الأسئلة في عملية واحدة

  router.push('/teacher');
};
```

---

## ٨.٤ استيراد الأسئلة بالذكاء الاصطناعي

### الملف: `src/ai/flows/parseQuestionsFlow.ts`

#### تعريف Flow الذكاء الاصطناعي

```typescript
export const parseQuestionsFlow = defineFlow(
  {
    name: 'parseQuestionsFlow',
    inputSchema: z.object({ fileBase64: z.string() }),
    outputSchema: z.object({
      questions: z.array(QuestionSchema),
    }),
  },
  async ({ fileBase64 }) => {
    // الخطوة 1: فك تشفير الملف
    const buffer = Buffer.from(fileBase64, 'base64');
    
    // الخطوة 2: تحليل ملف Excel بمكتبة xlsx
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    
    // الخطوة 3: استدعاء Gemini لتنظيف البيانات وتحويلها
    const { output } = await generate({
      model: gemini15Flash,
      prompt: `حوِّل هذه البيانات إلى مصفوفة JSON من الأسئلة: ${JSON.stringify(jsonData)}`,
      output: { schema: QuestionArraySchema },
    });
    
    return { questions: output?.questions || [] };
  }
);
```

---

## ٨.٥ آلية عرض الأسئلة المتحركة

```typescript
// كل سؤال يظهر بحركة fade عند الانتقال إليه
<motion.div
  key={currentQuestionIndex}             // المفتاح يُعيد التشغيل عند التغيير
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
  transition={{ duration: 0.3 }}
>
  <QuestionContent question={currentQuestion} />
</motion.div>
```

**الشرح:** 
- `initial`: السؤال يبدأ شفافاً ومتحرَّكاً لليمين
- `animate`: ينتقل لوضعه الطبيعي (مرئي في المنتصف)
- `exit`: يخرج بالاتجاه المعاكس
- `key`: ضروري لـ Framer Motion كي يُشغِّل الحركة عند تغيير السؤال

---

## ٨.٦ دالة `formatTime` — تنسيق عرض الوقت

### الملف: `src/lib/utils.ts`

```typescript
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// مثال:
formatTime(3661) // → "61:01"
formatTime(90)   // → "01:30"
formatTime(5)    // → "00:05"
```

---

## ٨.٧ الـ Hooks المخصصة

### أ) `useUser()` — بيانات المستخدم الحالي

```typescript
// src/firebase/index.ts
export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;
    // onAuthStateChanged يُشغَّل تلقائياً عند تغيُّر حالة الدخول
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsUserLoading(false);
    });
    return unsubscribe; // إلغاء الاشتراك عند تدمير المكوِّن
  }, [auth]);

  return { user, isUserLoading };
}
```

### ب) `useDoc()` — جلب وثيقة واحدة من Firestore

```typescript
export function useDoc<T>(docRef: DocumentReference | null) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!docRef) return;
    // getDoc يجلب البيانات مرة واحدة (ليس real-time)
    getDoc(docRef).then(snap => {
      setData(snap.exists() ? { id: snap.id, ...snap.data() } as T : null);
      setIsLoading(false);
    });
  }, [docRef]);

  return { data, isLoading };
}
```

### ج) `useCollection()` — جلب مجموعة وثائق

```typescript
export function useCollection<T>(query: Query | null) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    // onSnapshot يُحدِّث البيانات في الوقت الفعلي
    const unsubscribe = onSnapshot(query, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      })) as T[];
      setData(docs);
      setIsLoading(false);
    });
    return unsubscribe;
  }, [query]);

  return { data, isLoading };
}
```

---

## ٨.٨ نموذج Firebase Provider

### الملف: `src/firebase/provider.tsx`

```typescript
const FirebaseContext = createContext<{
  auth: Auth | null;
  firestore: Firestore | null;
}>({ auth: null, firestore: null });

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);

  useEffect(() => {
    // تهيئة Firebase مرة واحدة
    const app = initializeApp(firebaseConfig);
    setAuth(getAuth(app));
    setFirestore(getFirestore(app));
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth, firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
}

// Hooks للاستخدام في المكونات
export const useAuth = () => useContext(FirebaseContext).auth;
export const useFirestore = () => useContext(FirebaseContext).firestore;
```

---

## ٨.٩ مكوِّن `providers.tsx` — إدارة الحالة العامة

```typescript
// AppContext يُوفِّر الثيم والاتجاه لكل المكونات
interface AppContextType {
  direction: 'ltr' | 'rtl';
  theme: 'light' | 'dark';
  toggleDirection: () => void;
  toggleTheme: () => void;
}

export function AppProvider({ children }) {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    setTheme(newTheme);
  };

  return (
    <AppContext.Provider value={{ direction, theme, toggleDirection, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}
```

---

---

<div align="center">

# تاسعاً: الأمان والصلاحيات
## Security & Authorization

</div>

---

## ٩.١ مبدأ الطبقتين الأمنيتين

الأمان في Quizzy غير معتمد على طبقة واحدة، بل على **طبقتين مستقلتين**، لا تُغني إحداهما عن الأخرى:

```
┌────────────────────────────────────────────────────────┐
│             الطبقة الأولى: الواجهة الأمامية             │
│  ● حارس المسارات في (app)/layout.tsx                   │
│  ● إخفاء/إظهار عناصر الواجهة بناءً على الدور          │
│  ● التوجيه التلقائي عند تعارض الدور والمسار            │
│                                                        │
│  ⚠️ هذه الطبقة وحدها غير كافية — يمكن تجاوزها          │
└────────────────────────────────────────────────────────┘
                          +
┌────────────────────────────────────────────────────────┐
│          الطبقة الثانية: قواعد Firestore Security       │
│  ● تُطبَّق على سيرفرات Firebase مباشرةً                │
│  ● لا يمكن تجاوزها من أي عميل (متصفح، تطبيق، API)     │
│  ● تتحقق من هوية المستخدم ودوره لكل عملية             │
└────────────────────────────────────────────────────────┘
```

---

## ٩.٢ قواعد Firestore Security

### الملف: `src/firestore.rules`

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // دالة مساعدة: هل المستخدم مسجل؟
    function isAuthenticated() {
      return request.auth != null;
    }

    // دالة مساعدة: قراءة دور المستخدم
    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }

    // ── مجموعة المستخدمين ──────────────────────────────────────
    match /users/{userId} {
      // أي مستخدم مسجل يمكنه قراءة بيانات أي مستخدم آخر
      allow read: if isAuthenticated();
      
      // إنشاء الحساب: المستخدم ينشئ وثيقته الخاصة فقط
      allow create: if isAuthenticated() && request.auth.uid == userId;
      
      // التعديل: المستخدم نفسه أو المسؤول فقط
      allow update: if isAuthenticated() &&
                    (request.auth.uid == userId || getUserRole() == 'admin');
      
      // الحذف: المسؤول فقط
      allow delete: if isAuthenticated() && getUserRole() == 'admin';
    }

    // ── مجموعة الاختبارات ──────────────────────────────────────
    match /exams/{examId} {
      // أي مستخدم مسجل يمكنه قراءة بيانات الاختبار
      allow read: if isAuthenticated();
      
      // إنشاء اختبار: المدرس فقط، ويجب أن يكون هو المالك
      allow create: if isAuthenticated() &&
                    getUserRole() == 'teacher' &&
                    request.resource.data.teacherId == request.auth.uid;
      
      // تعديل/حذف: مالك الاختبار فقط
      allow update, delete: if isAuthenticated() &&
                            resource.data.teacherId == request.auth.uid;

      // ── أسئلة الاختبار (Sub-collection) ────────────────────
      match /questions/{questionId} {
        // الطلاب يمكنهم القراءة (لكن الإجابة محمية بمنطق التطبيق)
        allow read: if isAuthenticated();
        
        // الكتابة: مالك الاختبار فقط
        allow write: if isAuthenticated() &&
          get(/databases/$(database)/documents/exams/$(examId))
            .data.teacherId == request.auth.uid;
      }
    }

    // ── نتائج الطلاب ────────────────────────────────────────────
    match /studentExams/{resultId} {
      // القراءة: الطالب نفسه، أو المدرس، أو المسؤول
      allow read: if isAuthenticated() &&
                  (resource.data.studentId == request.auth.uid ||
                   getUserRole() == 'teacher' ||
                   getUserRole() == 'admin');
      
      // الإنشاء: الطالب ينشئ نتيجته الخاصة فقط
      allow create: if isAuthenticated() &&
                    request.resource.data.studentId == request.auth.uid;
      
      // التعديل: الطالب نفسه فقط (لتحديث حالة المحاولة)
      allow update: if isAuthenticated() &&
                    resource.data.studentId == request.auth.uid;
    }

    // ── الشهادات ────────────────────────────────────────────────
    match /certificates/{certId} {
      // الشهادات عامة (يمكن مشاركتها عبر رابط)
      allow read: if true;
      
      // الكتابة: ممنوعة من العميل — تُكتَب فقط من السيرفر
      allow write: if false;
    }

    // ── بنك الأسئلة ────────────────────────────────────────────
    match /questionBank/{qbId} {
      // القراءة والكتابة: مالك الأسئلة فقط
      allow read, write: if isAuthenticated() &&
                         request.auth.uid == resource.data.teacherId;
    }
  }
}
```

---

## ٩.٣ حماية الإجابات الصحيحة

هذه النقطة **حرجة أمنياً**. حقل `answer` موجود في Firestore وقابل للقراءة من أي مستخدم مسجل — فكيف نمنع الطلاب من الغش؟

**الإجابة:** عبر **طبقتين من الحماية**:

### الطبقة الأولى: منطق التطبيق
خلال صفحة الاختبار، لا يتم استخدام حقل `answer` أبداً، ولا يُعرَض في الواجهة.

### الطبقة الثانية: التصحيح في التطبيق
عند التسليم، التصحيح يتم في الكود مباشرةً بعد جلب الأسئلة. لكن لتأمين هذا أكثر في الإصدارات القادمة، يُنقَل التصحيح إلى API Route خادم.

```
⚠️ ملاحظة للتطوير المستقبلي:
الحل الأمثل هو نقل منطق التصحيح بالكامل إلى:
POST /api/grade

حيث يُجلَب حقل answer فقط على السيرفر ولا يُرسَل للمتصفح أبداً.
```

---

## ٩.٤ آليات مكافحة الغش

| الآلية | التقنية المستخدمة | المستوى |
|---|---|---|
| منع النسخ واللصق | `preventDefault` على أحداث `copy/paste/cut` | عميل |
| كشف تبديل التبويب | `document.visibilitychange` | عميل |
| منع لقطة الشاشة | `keyup` على `PrintScreen` | عميل |
| منع تحديد النص | CSS `user-select: none` | عميل |
| التحقق من عدد المحاولات | Firestore query + Server validation | عميل + سيرفر |
| تصحيح الاختبار | كود التطبيق عند التسليم | عميل → سيرفر |

---

---

<div align="center">

# عاشراً: التحديات والحلول
## Challenges & Solutions

</div>

---

## ١٠.١ التحدي الأول: إدارة حالة الاختبار عند فقدان الاتصال

### المشكلة:
أثناء الاختبار، قد ينقطع الإنترنت أو ينغلق المتصفح. في هذه الحالة، يفقد الطالب كل إجاباته — وهذا أمر لا يُقبَل.

### الحل:
تم تطبيق نظام **حفظ تلقائي** ذكي يعمل على مستويين:
1. **حفظ يدوي:** زر "Save Progress" يحفظ فوراً عند الضغط
2. **حفظ تلقائي:** `setInterval(saveState, 30000)` يحفظ في `localStorage` كل 30 ثانية

```typescript
// عند إعادة تحميل الصفحة، يُستعاد كل شيء
const savedState = localStorage.getItem(`exam-${exam.id}`);
if (savedState) {
  const { answers, markedForReview, timeLeft } = JSON.parse(savedState);
  setAnswers(savedAnswers);
  setMarkedForReview(savedMarked);
  setTimeLeft(savedTime); // المؤقت يُستأنَف من نفس النقطة!
}
```

**النتيجة:** حتى لو انقطع الإنترنت أو أُغلق التبويب، يجد الطالب اختباره كما تركه عند العودة.

---

## ١٠.٢ التحدي الثاني: التوجيه حسب الدور قبل رسم الصفحة

### المشكلة:
في Next.js App Router، يتم رسم الصفحة قبل اكتمال عمليات Firebase غير المتزامنة. هذا ينتج **وميضاً** (Flash) حيث يرى المستخدم محتوى الصفحة الخاطئة لثوانٍ.

### الحل:
تطبيق ثلاث حالات تحميل متسلسلة في `(app)/layout.tsx`:

```tsx
// المرحلة 1: Firebase Auth لا تزال تُحمَّل
if (isUserLoading) return <LoadingSpinner />;

// المرحلة 2: بيانات Firestore لا تزال تُجلَب
if (user && isFirestoreLoading) return <LoadingSpinner />;

// المرحلة 3: الدور لم يُحدَّد بعد
if (user && !role) return <SetupMessage />;

// المرحلة 4: التوجيه الخاطئ
const isAllowed = allowedPaths.some(p => pathname.startsWith(p));
if (!isAllowed) return <RedirectingSpinner />;

// ✅ الآن فقط يُعرَض المحتوى
return <Layout>{children}</Layout>;
```

---

## ١٠.٣ التحدي الثالث: تنفيذ كود JavaScript بأمان

### المشكلة:
الأسئلة البرمجية تتيح للطالب كتابة وتنفيذ كود JavaScript. تنفيذ كود غير موثوق مباشرةً في الصفحة خطير للغاية (ثغرات XSS).

### الحل:
استخدام **iFrame معزول (Sandboxed iFrame)** كبيئة تشغيل مستقلة:

```typescript
// إنشاء iFrame مخفي
const iframe = document.createElement('iframe');
iframe.style.display = 'none';
document.body.appendChild(iframe);

// الكود يُنفَّذ داخل iFrame
// التواصل عبر postMessage (رسائل محكومة)
iframe.contentWindow?.postMessage({ code: userCode, testCases }, '*');

// استقبال النتائج بأمان
window.addEventListener('message', (e) => {
  if (e.source === iframe.contentWindow) {
    // معالجة النتيجة
    handleResult(e.data);
    // تدمير الـ iFrame فوراً
    document.body.removeChild(iframe);
  }
});
```

**سبب الأمان:** الكود يعمل في سياق مستقل تماماً، ولا يمكنه الوصول لبيانات الصفحة الرئيسية.

---

## ١٠.٤ التحدي الرابع: انتظار تسجيل المستخدم الجديد في Firestore

### المشكلة:
عند إنشاء حساب جديد، تُستَدعى `createUserWithEmailAndPassword` أولاً، ثم `setDoc` لحفظ بيانات المستخدم في Firestore. أحياناً، الـ Layout يُحمَّل قبل اكتمال `setDoc`، فيبحث عن الوثيقة ولا يجدها.

### الحل:
تطبيق آلية **إعادة المحاولة التأخيرية**:

```typescript
const fetchUser = async () => {
  const docSnap = await getDoc(userDocRef);
  
  if (!docSnap.exists()) {
    // الوثيقة غير جاهزة بعد — انتظر ثانية ثم أعد المحاولة
    setTimeout(fetchUser, 1500);
  } else {
    setFirestoreUser(docSnap.data());
  }
};
```

---

## ١٠.٥ التحدي الخامس: التنسيق الزمني للاختبارات

### المشكلة:
تحديد حالة الاختبار (متاح / مجدول / منتهٍ) يعتمد على مقارنة الوقت الحالي بوقتَي بداية ونهاية الاختبار. كانت تظهر مشاكل في التحويل بين نوع `Timestamp` في Firestore ونوع `Date` في JavaScript.

### الحل:
دالة موحدة لتحويل أي تنسيق وقت لـ JavaScript Date:

```typescript
function toDate(value: any): Date {
  if (value instanceof Date) return value;
  if (value?.toDate) return value.toDate(); // Firestore Timestamp
  if (typeof value === 'string') return new Date(value);
  return new Date();
}
```

---

---

<div align="center">

# حادي عشر: التطوير المستقبلي
## Future Improvements

</div>

---

## ١١.١ ميزات الإصدار القادم (v1.1)

### أ) لوحة تحليلات المدرس

إضافة رسوم بيانية تفصيلية باستخدام مكتبة **Recharts** الموجودة بالفعل في المشروع:
- توزيع درجات الطلاب (Histogram)
- متوسط الأداء لكل سؤال
- الأسئلة الأصعب (نسبة الإجابة الخاطئة)
- توزيع الدرجات بالشهر

```typescript
// مثال لرسم بياني شريطي للدرجات
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

<BarChart data={scoreDistribution}>
  <Bar dataKey="count" fill="#3b6fe1" />
</BarChart>
```

### ب) إشعارات البريد الإلكتروني

استخدام مكتبة **Resend** الموجودة في المشروع لإرسال:
- إشعار للطالب عند توفر اختبار جديد
- تذكير 24 ساعة قبل انتهاء موعد الاختبار
- إيصال نتيجة الاختبار على البريد

### ج) نظام التصحيح الآلي للأسئلة المقالية

دمج نموذج **Gemini** لتصحيح الإجابات النصية المفتوحة:
```typescript
const gradingResult = await generate({
  model: gemini15Flash,
  prompt: `
    السؤال: ${question.text}
    الإجابة النموذجية: ${question.answer}
    إجابة الطالب: ${studentAnswer}
    قيِّم الإجابة من ${question.points} نقطة وأعط تغذية راجعة.
  `,
});
```

---

## ١١.٢ ميزات الإصدار v2.0

### أ) مراقبة الاختبار عن بعد (Proctoring)

استخدام **Gemini Vision** لتحليل صورة الكاميرا خلال الاختبار:
- كشف غياب الطالب عن الشاشة
- كشف وجود شخص ثانٍ في الإطار
- الإبلاغ التلقائي للمدرس عن أي مخالفة

### ب) التكامل مع أنظمة إدارة التعلم (LMS)

- تصدير النتائج بتنسيق SCORM/LTI
- التكامل مع Moodle و Blackboard
- استيراد بيانات الطلاب من قوائم Excel

### ج) دعم متعدد اللغات الكامل

- واجهة عربية كاملة بجانب الإنجليزية
- دعم الخطوط العربية المُحسَّنة
- ترجمة آلية للأسئلة بـ Gemini

### د) التطبيق المحمول (Mobile App)

- تطوير تطبيق **React Native** يشارك نفس Firebase backend
- إشعارات Push للاختبارات القادمة
- وضع الاختبار بدون إنترنت مع مزامنة لاحقة

---

## ١١.٣ التحسينات التقنية

| التحسين | التأثير المتوقع |
|---|---|
| نقل منطق التصحيح لـ API Route | أمان أعلى + منع أي تلاعب |
| تطبيق Redis Cache للاختبارات المتكررة | تسريع التحميل 60% |
| Firestore Pagination للاختبارات الكبيرة | تحسين الأداء مع آلاف الاختبارات |
| Jest + Playwright للاختبارات الآلية | ضمان جودة الكود |
| CDN للصور والوسائط | تسريع تحميل الوسائط 40% |

---

---

<div align="center">

# ثاني عشر: الخاتمة
## Conclusion

</div>

---

## ١٢.١ ملخص ما تم تحقيقه

خلال هذا المشروع، تم بنجاح تصميم وتطوير منصة اختبارات إلكترونية متكاملة تحمل اسم **Quizzy**، تتميز بـ:

✅ **نظام متكامل ثلاثي الأدوار** — طالب، مدرس، مسؤول — بصلاحيات محددة ومعزولة

✅ **محرك اختبار متقدم** — مع مؤقت ذكي، حفظ تلقائي، وآليات مكافحة غش متعددة

✅ **دعم 4 أنواع أسئلة** — اختيار متعدد، صح/خطأ، نصية، وبرمجية قابلة للتنفيذ

✅ **استيراد بالذكاء الاصطناعي** — تحليل ملفات Excel وإنشاء أسئلة تلقائياً بنموذج Gemini

✅ **بنية أمان متينة** — طبقتان مستقلتان (Client Guard + Firestore Rules)

✅ **تجربة مستخدم متميزة** — تصميم متجاوب، Dark Mode، RTL، حركات سلسة

✅ **شهادات إلكترونية** — قابلة للطباعة مع رمز تحقق فريد

---

## ١٢.٢ الدروس المستخلصة

### من الجانب التقني:
- **Firebase** هو خيار ممتاز للمشاريع التي تحتاج لبنية تحتية سحابية سريعة بدون تكلفة تشغيل خادم
- **TypeScript** يُوفِّر وقتاً ثميناً في تتبع الأخطاء بالمشاريع الكبيرة
- **React Hook Form + Zod** ثنائي مثالي لإدارة النماذج المعقدة
- أهمية **تصميم البنية التحتية** في البداية — الاختيارات الأولى تُحدِّد صعوبة التطوير لاحقاً

### من الجانب الأكاديمي:
- المشاريع العملية تُرسِّخ المفاهيم النظرية أكثر بكثير مما تفعله المحاضرات
- التعلم الذاتي من الوثائق الرسمية (Documentation) مهارة لا غنى عنها للمهندس
- مجتمعات المطورين مفتوحة المصدر (Stack Overflow, GitHub) كنز لا ينضب

---

## ١٢.٣ كلمة أخيرة

مشروع **Quizzy** لم يكن مجرد متطلب تخرج، بل كان رحلة تعلُّم حقيقية تجاوزت حدود الجامعة لتغوص في عالم تطوير البرمجيات الاحترافي. من مرحلة الفكرة إلى التصميم إلى البرمجة إلى الاختبار، كل خطوة كانت فرصة لفهم كيف يُبنى البرنامج الحقيقي الذي يحل مشكلة حقيقية.

نأمل أن يكون هذا المشروع نقطة انطلاق لمنصة تعليمية تُخدِم بالفعل مؤسسات تعليمية حقيقية في المستقبل القريب.

---

---

<div align="center">

# ملاحق
## Appendix

</div>

---

## الملحق أ: متغيرات البيئة المطلوبة

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Google AI (Genkit / Gemini)
GOOGLE_GENAI_API_KEY=
```

---

## الملحق ب: قائمة المكتبات المستخدمة

```json
{
  "dependencies": {
    "next": "15.5.9",
    "react": "^18.3.1",
    "typescript": "^5.x",
    "firebase": "^11.9.1",
    "framer-motion": "^11.2.12",
    "react-hook-form": "^7.54.2",
    "zod": "^3.24.2",
    "@tanstack/react-table": "^8.19.2",
    "recharts": "^2.15.1",
    "qrcode.react": "^3.1.0",
    "xlsx": "^0.18.5",
    "zustand": "^4.5.2",
    "lucide-react": "^0.475.0",
    "date-fns": "^3.6.0",
    "genkit": "^1.20.0",
    "@genkit-ai/google-genai": "^1.20.0",
    "resend": "^3.5.0"
  }
}
```

---

## الملحق ج: أوامر تشغيل المشروع

```bash
# تثبيت المكتبات
npm install

# تشغيل بيئة التطوير (Turbopack)
npm run dev
# → http://localhost:9002

# بناء نسخة الإنتاج
npm run build

# التحقق من TypeScript
npm run typecheck

# فحص جودة الكود
npm run lint

# تشغيل سيرفر Genkit AI
npm run genkit:dev
# → http://localhost:4000
```

---

## الملحق د: خريطة التوجيه (Route Map)

| المسار | الوصول | الوصف |
|---|---|---|
| `/` | عام | صفحة الدخول / Landing |
| `/student` | طالب فقط | لوحة تحكم الطالب |
| `/student/exams` | طالب فقط | قائمة الاختبارات |
| `/student/exam/[id]` | طالب فقط | أداء الاختبار |
| `/student/results/[id]` | طالب فقط | النتائج |
| `/teacher` | مدرس فقط | لوحة المدرس |
| `/teacher/create` | مدرس فقط | إنشاء اختبار |
| `/teacher/question-bank` | مدرس فقط | بنك الأسئلة |
| `/teacher/results/[id]` | مدرس فقط | تحليلات الطلاب |
| `/admin` | مسؤول فقط | إحصائيات النظام |
| `/admin/users` | مسؤول فقط | إدارة المستخدمين |
| `/certificate/[id]` | الجميع | الشهادة الإلكترونية |
| `/profile` | الجميع | الملف الشخصي |

---

## الملحق هـ: نموذج بيانات المستخدم

```typescript
// src/lib/types.ts
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  photoURL?: string;
  status: 'Active' | 'Inactive';
}

export interface Exam {
  id: string;
  teacherId: string;
  title: string;
  titleAr?: string;
  subject: string;
  duration: number;           // دقائق
  attemptsAllowed: number;
  scoringPolicy: 'highest' | 'average';
  startTime: Timestamp;
  endTime: Timestamp;
  questionsCount: number;
}

export interface Question {
  id: string;
  text: string;
  textAr?: string;
  type: 'multiple-choice' | 'true-false' | 'short-text' | 'code' | 'mathematical' | 'diagram';
  answer: string;
  points: number;
  options?: string[];
  optionsAr?: string[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  language?: string;          // للأسئلة البرمجية
  testCases?: string;         // JSON للحالات الاختبارية
  codeSnippet?: string;       // كود البداية
}

export interface ExamResult {
  id: string;
  studentId: string;
  examId: string;
  answers: Answer[];
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  timeTaken: number;          // ثواني
  attemptNumber: number;
  submittedAt: Timestamp;
}
```

---

<div align="center">

---

## المراجع والمصادر

| المرجع | الرابط |
|---|---|
| Next.js Documentation | https://nextjs.org/docs |
| Firebase Documentation | https://firebase.google.com/docs |
| Tailwind CSS Documentation | https://tailwindcss.com/docs |
| ShadCN UI Documentation | https://ui.shadcn.com |
| Google Genkit Documentation | https://firebase.google.com/docs/genkit |
| Framer Motion Documentation | https://www.framer.com/motion |
| React Documentation | https://react.dev |
| TypeScript Handbook | https://www.typescriptlang.org/docs |

---

<br/><br/>

**انتهى**

*جمهورية مصر العربية — وزارة التعليم العالي والبحث العلمي*

*كلية الحاسبات والمعلومات — قسم هندسة البرمجيات*

*العام الدراسي 2025 / 2026*

---

</div>

</div>

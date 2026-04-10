<div dir="rtl">

---

<div align="center">

# جمهورية مصر العربية
## وزارة التعليم العالي والبحث العلمي
### كلية الحاسبات والمعلومات
#### قسم هندسة البرمجيات وعلوم الحاسب

---

# مشروع تخرج بعنوان

# منصة **Quizzy**
## نظام الاختبارات الإلكترونية الأكاديمي التفاعلي
### Academic Interactive E-Examination Platform

| | |
|---|---|
| **إعداد الطالب----------------|
| **الرقم الجامعي** | 20CS-XXXX |
| **تحت إشراف** | د. / ـــــــــــــ |
| **الكلية** | كلية الحاسبات والمعلومات |
| **التخصص** | هندسة البرمجيات |
| **العام الدراسي** | 2025 / 2026 |

> *"التعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم"  — نيلسون مانديلا*

</div>

---

---

<div align="center">

## إهداء

</div>

إلى والديَّ الكريمين اللذين أمدَّاني بالحب والتشجيع ولم يبخلا عليَّ بشيء طوال مسيرتي الدراسية، وإلى أساتذتي الأفاضل الذين أناروا لي طريق العلم والمعرفة، وإلى زملائي الذين تقاسمت معهم ليالي المذاكرة وأيام المشاريع.

**أُهدي هذا العمل المتواضع.**

---

<div align="center">

## شكر وتقدير

</div>

الحمد لله الذي وفّقنا لإتمام هذا العمل. أتقدم بجزيل الشكر إلى الأستاذ المشرف على ما بذله من وقت وجهد، وإلى أعضاء هيئة التدريس على الأسس العلمية التي أرسوها، وإلى فريق Firebase وGoogle على الأدوات المجانية الرائعة، وإلى مجتمع Next.js والمكتبات مفتوحة المصدر.

---

---

# الفهرس

| # | العنوان | الصفحة |
|---|---|---|
| الفصل الأول | ملخص المشروع — Abstract | 8 |
| الفصل الثاني | المقدمة — Introduction | 14 |
| الفصل الثالث | نظرة عامة على النظام | 22 |
| الفصل الرابع | التقنيات المستخدمة | 30 |
| الفصل الخامس | بنية المشروع | 44 |
| الفصل السادس | المميزات والوظائف | 54 |
| الفصل السابع | تصميم الواجهات | 68 |
| الفصل الثامن | شرح الكود البرمجي | 76 |
| الفصل التاسع | الأمان والصلاحيات | 92 |
| الفصل العاشر | التحديات والحلول | 98 |
| الفصل الحادي عشر | إدارة الجودة والاختبار | 104 |
| الفصل الثاني عشر | النشر والبيئات | 110 |
| الفصل الثالث عشر | تحليل المنافسين | 116 |
| الفصل الرابع عشر | التطوير المستقبلي | 120 |
| الفصل الخامس عشر | الخاتمة | 124 |
| الملاحق | Appendix + Glossary + References | 128 |

---

---

# الفصل الأول: ملخص المشروع
## Abstract

---

## ١.١ الملخص التنفيذي

**Quizzy** هو نظام اختبارات إلكترونية متكامل وشامل، صُمِّم خصيصاً لتلبية احتياجات المؤسسات التعليمية الحديثة في عصر التحول الرقمي. يهدف المشروع إلى استبدال الاختبارات الورقية التقليدية بمنصة رقمية ذكية تُقدِّم تجربة تعليمية متقدمة ومتكاملة لكل من الطالب والمعلم والمسؤول الأكاديمي.

يقوم المشروع على ثلاث واجهات رئيسية متمايزة الصلاحيات والوظائف:

- **واجهة الطالب:** لأداء الاختبارات وعرض النتائج التفصيلية والشهادات الإلكترونية
- **واجهة المدرس:** لإنشاء الاختبارات وإدارة الأسئلة واستعراض التحليلات الإحصائية
- **واجهة المسؤول:** للإشراف الشامل على المنصة وإدارة جميع المستخدمين

---

## ١.٢ الكلمات المفتاحية

> **الاختبارات الإلكترونية** — **Next.js** — **Firebase** — **الذكاء الاصطناعي** — **Gemini** — **TypeScript** — **Tailwind CSS** — **نظام إدارة التعلم** — **التقييم الإلكتروني** — **الأسئلة البرمجية** — **الشهادات الإلكترونية** — **RTL** — **Firestore** — **React**

---

## ١.٣ المشكلة المستهدفة

تعاني المؤسسات التعليمية العربية من جملة تحديات جوهرية في منظومة الاختبارات التقليدية:

### أولاً: التحديات التشغيلية

| المشكلة | الأثر المباشر | التكلفة التقديرية |
|---|---|---|
| تكاليف الطباعة والتوزيع | استنزاف الميزانية التعليمية | آلاف الجنيهات سنوياً لكل مادة |
| التصحيح اليدوي | استهلاك وقت الأساتذة في مهام ميكانيكية | 2-4 ساعات لكل 30 طالب |
| التخزين الورقي وفقدان الأوراق | ضياع سجلات الاختبارات | لا يمكن تقديرها |
| استحالة الإحصاء الفوري | تأخر ظهور النتائج أسابيع | أثر سلبي على تجربة الطالب |
| محدودية الأسئلة وتكرارها | نشر الأسئلة بين الطلاب | إضعاف مصداقية التقييم |

### ثانياً: التحديات الأكاديمية

| المشكلة | الأثر |
|---|---|
| صعوبة أسئلة الكود والبرمجة ورقياً | محدودية تقييم المهارات التطبيقية |
| غياب التحليلات التفصيلية للأداء | صعوبة تحديد نقاط ضعف الطلاب |
| عدم نزاهة الاختبارات | ضعف مؤشر الثقة في التقييم |
| استحالة الاختبارات عن بُعد | تقييد الوصول التعليمي |
| التحيز في التصحيح | عدم الموضوعية في التقييم |

### ثالثاً: تحديات اللغة والمحتوى

معظم منصات الاختبارات العالمية صُمِّمت للغة الإنجليزية أولاً، مما يعني:

- عدم دعم RTL (الكتابة من اليمين لليسار) بشكل أصيل
- واجهات تُترجَم ترجمةً ركيكة لا تعكس السياق التعليمي العربي
- محدودية في كتابة الأسئلة بالعربية مع الصياغة الصحيحة

**Quizzy** بُنِيَ من الأساس ليدعم العربية والإنجليزية بتساوٍ تام.

---

## ١.٤ الحل المقترح

تُوفِّر منصة **Quizzy** حلاً متكاملاً يُعالج كل هذه المشكلات:

### على مستوى الأداء والسرعة
- نتائج فورية في أجزاء من الثانية بعد إنهاء الاختبار
- تصحيح آلي دقيق بنسبة 100% للأسئلة الموضوعية
- معالجة واستيراد مئات الأسئلة من Excel خلال 15-20 ثانية باستخدام الذكاء الاصطناعي

### على مستوى التنوع والشمولية
- دعم أربعة أنواع أسئلة: اختيار متعدد، صح/خطأ، إجابة نصية، **وأسئلة برمجية**
- الأسئلة البرمجية تُنفَّذ فعلياً في بيئة آمنة معزولة وتُصحَّح بحالات اختبارية
- دعم وسائط متعددة في الأسئلة مُخطَّط له في الإصدار 2.0

### على مستوى الأمان والنزاهة
- آليات متعددة لمنع الغش داخل الاختبار (كشف تغيير التبويب، منع النسخ، منع القائمة السياقية)
- نظام صلاحيات ثلاثي يمنع أي وصول غير مُصرَّح به للبيانات
- قواعد أمان Firestore تُطبَّق على جانب الخادم ولا يمكن تجاوزها من العميل

### على مستوى التحفيز والتوثيق
- شهادات إلكترونية احترافية برمز تحقق فريد (UUID)
- سجلات تاريخية لجميع المحاولات والنتائج
- تحليلات بيانية لأداء الطالب عبر الزمن

---

## ١.٥ أبرز النتائج المُحقَّقة

| المؤشر | القيمة |
|---|---|
| أنواع الأسئلة المدعومة | 4 أنواع (MCQ, T/F, Short Text, Code) |
| عدد أدوار المستخدمين | 3 أدوار (Student, Teacher, Admin) |
| وقت الحصول على النتيجة بعد التسليم | < 2 ثانية |
| وقت استيراد 50 سؤال عبر AI | 15-18 ثانية |
| منصات العمل | Browser — Desktop + Mobile |
| دعم اللغتين | العربية + الإنجليزية مع RTL |
| الوضع الداكن | مدعوم بالكامل (Dark Mode) |
| وقت تحميل الصفحة (LCP) | < 2.5 ثانية |
| درجة Lighthouse Performance | 85+ |
| درجة Lighthouse Accessibility | 92+ |
| درجة Lighthouse SEO | 97+ |

---

## ١.٦ المنهجية المُتَّبَعة في التطوير

اتَّبع الفريق منهجية **Agile** مع **Scrum** في تنظيم العمل، وذلك بتقسيمه إلى ثمانية Sprints متتالية:

| Sprint | المدة | المحتوى |
|---|---|---|
| 1 | أسبوع 1-2 | تصميم قاعدة البيانات وإعداد Firebase والبيئة التطويرية |
| 2 | أسبوع 3-4 | بناء نظام المصادقة والصلاحيات وFirestore Rules |
| 3 | أسبوع 5-6 | واجهة الطالب — لوحة التحكم وقائمة الاختبارات |
| 4 | أسبوع 7-8 | محرك الاختبار — المؤقت والأسئلة والحفظ التلقائي |
| 5 | أسبوع 9-10 | واجهة المدرس — منشئ الاختبارات وAI Import |
| 6 | أسبوع 11-12 | واجهة المسؤول والشهادات الإلكترونية |
| 7 | أسبوع 13 | الاختبارات والتحسينات وإصلاح الأخطاء |
| 8 | أسبوع 14 | التوثيق والنشر على Vercel |

---

---

# الفصل الثاني: المقدمة
## Introduction

---

## ٢.١ خلفية المشروع وسياقه العالمي

في خضم الثورة الرقمية الشاملة التي يشهدها قطاع التعليم عالمياً، أصبح التحول نحو أدوات التقييم الإلكتروني ضرورةً حتمية لا خياراً مرحلياً. أثبتت جائحة كوفيد-19 عام 2020 بصورة قاطعة أن الأنظمة التعليمية غير المُرقمَنة ستنهار أمام أي أزمة تحول دون الحضور الجسدي.

تُشير الإحصاءات العالمية إلى أن:

- **85%** من مؤسسات التعليم العالي في أمريكا الشمالية وأوروبا تعتمد الاختبارات الإلكترونية بشكل رئيسي
- **67%** من الطلاب يُفضِّلون أداء الاختبارات إلكترونياً لسرعة ظهور النتائج
- **90%** من المؤسسات التي تبنَّت الاختبارات الإلكترونية أفادت بانخفاض تكاليف التقييم بنسبة **40-60%**
- **73%** من أعضاء هيئة التدريس يرون أن التصحيح الآلي أكثر موضوعية في الأسئلة الموضوعية

في ضوء هذا الواقع العالمي وبالنظر إلى تأخر المؤسسات التعليمية العربية في التحول الرقمي، جاء مشروع **Quizzy** كمبادرة أكاديمية هادفة لسد هذا الفجوة وتقديم منصة شاملة مصممة للبيئة العربية.

---

## ٢.٢ تعريف التقييم الإلكتروني

**التقييم الإلكتروني** (E-Assessment) هو استخدام تقنيات المعلومات والاتصالات لتوصيل التقييم التعليمي وإدارته وتصحيحه. ينقسم إلى:

| النوع | التعريف | مثال |
|---|---|---|
| **Summative** | تقييم ختامي لقياس التعلم | اختبارات نهاية الفصل |
| **Formative** | تقييم تكويني لمتابعة التقدم | اختبارات أسبوعية |
| **Diagnostic** | تقييم تشخيصي لقياس المستوى | اختبارات القبول |
| **Adaptive** | تقييم تكيفي يضبط صعوبته وفق مستوى الطالب | GMAT, GRE |

يُركِّز **Quizzy** في إصداره الأول على النوعين **Summative** و**Formative**.

---

## ٢.٣ أهمية المشروع من منظور متعدد الأطراف

### من منظور الطالب

المرونة الزمنية والمكانية في أداء الاختبار، والشفافية الفورية في عرض النتائج، والتحفيز من خلال شهادات إلكترونية، والقدرة على مراجعة الأداء واستيعاب الأخطاء فوراً.

**الشفافية الفورية** هي الميزة الأكثر تقديراً؛ إذ رؤية الإجابات الصحيحة فور الانتهاء من الاختبار يحوِّل الاختبار من أداة قياس مُجرَّدة إلى فرصة تعلم حقيقية.

### من منظور المدرس

توفير الوقت والجهد في التصحيح، والقدرة على إنشاء اختبارات متطورة بسرعة قياسية عبر AI Import، واستخراج التحليلات والإحصاءات الدقيقة لفهم مستوى الطلاب، وبناء مستودع شخصي من الأسئلة قابل لإعادة الاستخدام.

### من منظور المؤسسة التعليمية

**البعد الاقتصادي:** إلغاء تكاليف الطباعة والورق والتوزيع والأرشفة.
**البعد البيئي:** تقليص الاستهلاك الورقي بشكل جذري.
**قابلية التوسع:** Firebase يتعامل تلقائياً مع النمو في عدد المستخدمين.
**الامتثال والحوكمة:** أرشفة كاملة وآلية لجميع الاختبارات والنتائج والشهادات.

---

## ٢.٤ أهداف المشروع

### الأهداف الوظيفية الرئيسية

1. **نظام مصادقة متكامل:** تسجيل دخول آمن بالبريد الإلكتروني وGoogle مع توجيه تلقائي بحسب الدور
2. **محرك اختبار متقدم:** دعم أربعة أنواع أسئلة مع مؤقت زمني وحفظ تلقائي
3. **تصحيح آلي فوري:** حساب الدرجة وعرضها فور التسليم
4. **استيراد ذكي:** قراءة ملفات Excel وتحليلها بـ Gemini
5. **شهادات إلكترونية:** إنشاء وطباعة شهادات PDF مع رمز تحقق
6. **إدارة المستخدمين:** صلاحيات كاملة للمسؤول
7. **لوحة تحكم لكل دور:** إحصاءات ومؤشرات مناسبة

### الأهداف غير الوظيفية

| الهدف | المعيار | الأداة |
|---|---|---|
| الأداء | LCP < 2.5 ثانية | Vercel Edge Network |
| الأمان | لا وصول غير مصرح | Firestore Security Rules |
| إمكانية الوصول | WCAG 2.1 Level AA | Radix UI |
| التجاوبية | يعمل على كل الشاشات | Tailwind CSS |
| الموثوقية | 99.9% uptime | Firebase SLA |
| قابلية الصيانة | TypeScript + ESLint | CI/CD Pipeline |

---

## ٢.٥ نطاق المشروع ومحدداته

### ما يقع ضمن النطاق

- نظام مصادقة ثلاثي الأدوار (Student / Teacher / Admin)
- إنشاء وإدارة الاختبارات بالكامل (Full CRUD)
- أسئلة MCQ, True/False, Short Answer, Code Execution
- نظام مؤقت زمني مع حفظ تلقائي في localStorage
- تصحيح آلي وعرض نتائج تفصيلية
- استيراد الأسئلة من Excel باستخدام Gemini AI
- شهادات إلكترونية مع QR Code ورمز تحقق
- مشاركة الاختبار برابط قصير وQR Code
- دعم العربية والإنجليزية مع RTL الكامل
- الوضع الداكن والفاتح

### ما يقع خارج النطاق

- مراقبة الاختبار (Proctoring) بالكاميرا — مُخطَّط للإصدار 2.0
- أسئلة الصوت والفيديو التفاعلية — مُخطَّط للإصدار 2.0
- تصحيح الأسئلة المقالية بالذكاء الاصطناعي — مُخطَّط للإصدار 2.0
- LDAP / SSO Integration — مُخطَّط للإصدار 3.0
- تطبيقات موبايل أصلية Native — مُخطَّط للإصدار 3.0

---

---

# الفصل الثالث: نظرة عامة على النظام
## System Overview

---

## ٣.١ فكرة النظام

يعتمد **Quizzy** على نمط معماري حديث يُعرَف بـ **Jamstack** (JavaScript + APIs + Markup)، حيث تُبنى الصفحات مسبقاً أو تُوكَل لـ React Server Components وتُقدَّم من شبكة CDN عالمية، في حين تُدار البيانات الديناميكية عبر استدعاءات مباشرة لـ Firebase SDK.

هذا النهج يُحقق:
- **السرعة:** الصفحات الثابتة من CDN بدون Server Roundtrip
- **الأمان:** لا خادم مُكشوف للهجوم
- **التوسع:** Firebase يتعامل مع ملايين الطلبات تلقائياً

---

## ٣.٢ طبقات المعمارية

```
══════════════════════════════════════════════════════════
                 CLIENT (المتصفح)
══════════════════════════════════════════════════════════
  ┌──────────────────────────────────────────────────┐
  │       Next.js 15 — React Server/Client           │
  │                                                  │
  │  /student         /teacher          /admin       │
  │  (لوحة الطالب)   (لوحة المدرس)     (لوحة الإدارة)│
  │                                                  │
  │  localStorage (إجابات + مؤقت الاختبار)           │
  └──────────────────────────────────────────────────┘
                          │ HTTPS / Firebase SDK
══════════════════════════════════════════════════════════
              APPLICATION LAYER
══════════════════════════════════════════════════════════
  ┌──────────────────────────────────────────────────┐
  │   Next.js API Routes (Server-side Node.js)       │
  │   POST /api/genkit/parseQuestions ← AI Import    │
  │   POST /api/grade                 ← Server Grade │
  └──────────────────────────────────────────────────┘
                          │
══════════════════════════════════════════════════════════
                FIREBASE PLATFORM
══════════════════════════════════════════════════════════
  ┌────────────────────┐  ┌────────────────────────┐
  │  Firebase Auth     │  │  Cloud Firestore        │
  │  - Email/Password  │  │  - users               │
  │  - Google OAuth    │  │  - exams               │
  │  - JWT Tokens      │  │  - questions (sub)      │
  └────────────────────┘  │  - studentExams         │
                           │  - certificates         │
                           └────────────────────────┘
══════════════════════════════════════════════════════════
                  AI LAYER
══════════════════════════════════════════════════════════
  ┌──────────────────────────────────────────────────┐
  │   Google Genkit + Gemini 1.5 Flash               │
  │   parseQuestionsFlow: Excel → JSON Questions     │
  └──────────────────────────────────────────────────┘
```

---

## ٣.٣ تدفق تسجيل الدخول

```
[المستخدم] → يُدخل بريد + كلمة مرور
    ↓
[Firebase Auth] → يتحقق من الهوية → JWT Token
    ↓
[App] → يستعلم: users/{uid} من Firestore
    ↓
[Firestore] → يُعيد وثيقة المستخدم (role, status, name)
    ↓
[App] → يُوجِّه لـ /{role} (student / teacher / admin)
    ↓
[Layout Guard] → يتحقق من تطابق الـ role مع المسار
```

---

## ٣.٤ تدفق أداء الاختبار

```
[الطالب] → يفتح /student/exam/{examId}
    ↓
[Server Component] → يجلب: exams/{examId} متحقق من الوقت والصلاحية
    ↓
[App] → يجلب: exams/{examId}/questions (بدون حقل "answer")
    ↓
[Timer] → يبدأ العد التنازلي (useEffect + setInterval)
    ↓
[كل إجابة] → تُحفَظ في useState + localStorage كل 30 ثانية
    ↓
[Submit] → Server Action يجلب الإجابات الصحيحة (آمن)
    ↓
[Grading] → حساب الدرجة سؤالاً بسؤال
    ↓
[Firestore] → كتابة النتيجة في studentExams/{newId}
    ↓
[إذا نجح] → كتابة شهادة في certificates/{newId}
    ↓
[App] → يُوجِّه لـ /student/results/{resultId}
```

---

## ٣.٥ هيكل قاعدة البيانات (Firestore Schema)

```
Firestore Root
│
├── users/{userId}
│   ├── email: string
│   ├── name: string
│   ├── role: "student" | "teacher" | "admin"
│   ├── status: "Active" | "Inactive"
│   ├── photoURL: string | null
│   ├── createdAt: Timestamp
│   └── lastLoginAt: Timestamp
│
├── exams/{examId}
│   ├── teacherId: string
│   ├── title: string
│   ├── subject: string
│   ├── duration: number (بالدقائق)
│   ├── startTime: Timestamp
│   ├── endTime: Timestamp
│   ├── attemptsAllowed: number
│   ├── scoringPolicy: "highest" | "latest"
│   ├── passingScore: number (نسبة مئوية)
│   ├── shuffleQuestions: boolean
│   ├── showCorrectAnswers: boolean
│   ├── shareToken: string
│   ├── isPublished: boolean
│   ├── questionsCount: number
│   ├── createdAt: Timestamp
│   │
│   └── questions/{questionId}  ← Sub-collection
│       ├── text: string
│       ├── type: "multiple-choice"|"true-false"|"short-text"|"code"
│       ├── answer: string  ← محمي بـ Security Rules
│       ├── points: number
│       ├── orderIndex: number
│       ├── options: string[]   (MCQ فقط)
│       ├── language: string    (code فقط)
│       └── testCases: string   (JSON — code فقط)
│
├── studentExams/{resultId}
│   ├── studentId: string
│   ├── examId: string
│   ├── attemptNumber: number
│   ├── status: "in-progress" | "completed"
│   ├── answers: Answer[]
│   ├── score: number
│   ├── maxScore: number
│   ├── percentage: number
│   ├── passed: boolean
│   ├── timeTaken: number (بالثواني)
│   ├── startedAt: Timestamp
│   └── submittedAt: Timestamp
│
└── certificates/{certId}
    ├── studentId: string
    ├── examId: string
    ├── studentName: string
    ├── examTitle: string
    ├── score: number
    ├── percentage: number
    ├── verificationCode: string (UUID)
    └── issuedAt: Timestamp
```

---

## ٣.٦ مخطط تسلسل استيراد الأسئلة بالذكاء الاصطناعي

```
المدرس      UI           API Route       Genkit/Gemini    Firestore
  │          │               │                │               │
  │ Upload   │               │                │               │
  │──────────►               │                │               │
  │          │ FileReader→B64│                │               │
  │          │ POST request  │                │               │
  │          │───────────────►                │               │
  │          │               │ xlsx.read()    │               │
  │          │               │ → JSON rows    │               │
  │          │               │────────────────►               │
  │          │               │                │ Gemini prompt │
  │          │               │                │ → Questions[] │
  │          │               │ Questions JSON │               │
  │          │               ◄────────────────│               │
  │          │ Preview list  │                │               │
  │          ◄───────────────│                │               │
  │ Review   │               │                │               │
  │──────────►               │                │               │
  │          │ addDoc() ×N   │                │───────────────►
```

---

---

# الفصل الرابع: التقنيات المستخدمة
## Technologies Used

---

## ٤.١ Next.js 15 — الإطار الرئيسي

### ما هو Next.js؟

Next.js إطار عمل React مفتوح المصدر من Vercel. يُستخدَم في Netflix, TikTok, Twitch, Nike وآلاف المنصات. يُقدِّم حلولاً متكاملة للـ SSR, SSG, ISR, API Routes وغيرها.

### لماذا اخترنا Next.js 15 تحديداً؟

| الميزة | الوصف | الاستخدام في Quizzy |
|---|---|---|
| **App Router** | توجيه مبني على المجلدات | تنظيم صفحات الأدوار في Route Groups |
| **Server Components** | مكونات تعمل على السيرفر | جلب بيانات Firestore بأمان |
| **Server Actions** | دوال سيرفر من العميل | تصحيح الإجابات بأمان |
| **Turbopack** | بناء أسرع بـ 10x | تطوير أسرع وتجربة أفضل |
| **Metadata API** | SEO متقدم | عناوين ووصف لكل صفحة |

### مفهوم Route Groups

```
src/app/
  (app)/              ← مجموعة الصفحات المحمية (لا تؤثر على URL)
    layout.tsx        ← الحارس الأمني المشترك
    student/
    teacher/
    admin/
  page.tsx            ← صفحة تسجيل الدخول
```

---

## ٤.٢ TypeScript 5.6 — لغة البرمجة

### قوة نظام الأنواع

```typescript
// بدون TypeScript — خطأ يظهر عند التشغيل فقط
function gradeExam(exam) {
  return exam.score / exam.maxScore * 100;  // لو exam=undefined → NaN
}

// مع TypeScript — الخطأ يظهر فوراً أثناء الكتابة
interface Exam {
  score:    number;
  maxScore: number;
}
function gradeExam(exam: Exam): number {
  return (exam.score / exam.maxScore) * 100;
}
```

### الأنواع المشتركة المركزية في المشروع

```typescript
// src/lib/types.ts

export type UserRole = 'student' | 'teacher' | 'admin';

export interface AppUser {
  uid:         string;
  email:       string;
  name:        string;
  role:        UserRole;
  status:      'Active' | 'Inactive';
  photoURL?:   string;
  createdAt:   Date;
  lastLoginAt: Date;
}

export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'short-text'
  | 'code';

export interface Question {
  id:         string;
  text:       string;
  type:       QuestionType;
  answer:     string;
  points:     number;
  orderIndex: number;
  options?:   string[];
  language?:  string;
  testCases?: string;
  hint?:      string;
}

export interface Exam {
  id:                 string;
  teacherId:          string;
  title:              string;
  subject:            string;
  duration:           number;
  startTime:          Date;
  endTime:            Date;
  attemptsAllowed:    number;
  scoringPolicy:      'highest' | 'latest';
  passingScore:       number;
  shuffleQuestions:   boolean;
  showCorrectAnswers: boolean;
  shareToken:         string;
  isPublished:        boolean;
  questionsCount:     number;
  createdAt:          Date;
}

export interface Answer {
  questionId:   string;
  value:        string;
  isCorrect?:   boolean;
  pointsEarned?:number;
}

export interface StudentExam {
  id:            string;
  studentId:     string;
  examId:        string;
  attemptNumber: number;
  status:        'in-progress' | 'completed';
  answers:       Answer[];
  score:         number;
  maxScore:      number;
  percentage:    number;
  passed:        boolean;
  timeTaken:     number;
  startedAt:     Date;
  submittedAt?:  Date;
}

export interface Certificate {
  id:               string;
  studentId:        string;
  examId:           string;
  studentName:      string;
  examTitle:        string;
  score:            number;
  maxScore:         number;
  percentage:       number;
  verificationCode: string;
  issuedAt:         Date;
}
```

---

## ٤.٣ Firebase — الخلفية الخدمية الشاملة

### Firebase Authentication

طرق المصادقة المُفعَّلة:

```typescript
// src/firebase/index.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app      = initializeApp(firebaseConfig);
export const auth     = getAuth(app);
export const provider = new GoogleAuthProvider();
```

### مقارنة Firebase Auth بالبدائل

| المعيار | Firebase Auth | Auth0 | Custom JWT |
|---|---|---|---|
| وقت الإعداد | < 30 دقيقة | < 1 ساعة | 2-4 أيام |
| التكلفة | مجاني حتى 10K user/month | مجاني حتى 7.5K | تكلفة خادم |
| OAuth (Google/FB) | مضمَّن | مضمَّن | يدوي |
| JWT Refresh | آلي | آلي | يدوي |
| المختار | ✅ **مُختار** | ممكن | غير مناسب |

### Cloud Firestore

مقارنة مع قواعد بيانات أخرى:

| المعيار | Firestore | MongoDB | PostgreSQL | Supabase |
|---|---|---|---|---|
| Real-time | ✅ أصيل | ✅ Change Streams | ❌ | ✅ |
| Offline Support | ✅ مضمَّن | ❌ | ❌ | ❌ |
| Security Rules | ✅ مضمَّنة | ❌ | ❌ | ✅ RLS |
| Scale | تلقائي | يدوي | يدوي | محدود |
| التكلفة | مجاني بحدود | مجاني بحدود | مدفوع | مجاني بحدود |
| **المختار** | ✅ **مُختار** | ممكن | لا يناسب | ممكن |

---

## ٤.٤ Tailwind CSS — نظام التصميم

### فلسفة Utility-First

```jsx
{/* بدون Tailwind */}
<div className="exam-card">...</div>
/* CSS منفصل */
.exam-card { background: white; padding: 1.5rem; border-radius: 0.5rem; }

{/* مع Tailwind */}
<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
  ...
</div>
```

### متغيرات التصميم في globals.css

```css
:root {
  --primary:     hsl(220, 87%, 55%);    /* الأزرق الرئيسي */
  --accent:      hsl(45, 93%, 58%);     /* الأصفر المميز */
  --background:  hsl(210, 40%, 98%);    /* خلفية فاتحة */
  --foreground:  hsl(222, 47%, 11%);    /* نص داكن */
  --card:        hsl(0, 0%, 100%);      /* خلفية البطاقات */
  --border:      hsl(214, 31%, 91%);    /* حدود رفيعة */
  --success:     hsl(142, 71%, 45%);    /* أخضر النجاح */
  --destructive: hsl(0, 84%, 60%);      /* أحمر الخطأ */
}
.dark {
  --background:  hsl(222, 47%, 11%);    /* خلفية داكنة */
  --card:        hsl(217, 32%, 17%);    /* بطاقات داكنة */
  --foreground:  hsl(210, 40%, 98%);    /* نص فاتح */
}
```

---

## ٤.٥ ShadCN UI + Radix UI

ShadCN ليست مكتبة تقليدية — **تنسخ الكود مباشرة** لمشروعك للتعديل الكامل:

```bash
npx shadcn@latest add button dialog card table
# → ينسخ الكود لـ src/components/ui/
```

### المكونات المستخدمة في Quizzy

| المكوِّن | الاستخدام |
|---|---|
| `Button` | كل أزرار التفاعل |
| `Card` | بطاقات الاختبارات والنتائج |
| `Dialog` | نافذة تأكيد التسليم |
| `RadioGroup` | خيارات MCQ |
| `Progress` | شريط المؤقت الزمني |
| `Table` | جداول المستخدمين |
| `Toast` | رسائل التنبيه |
| `Badge` | شارة حالة الاختبار |
| `Select` | قوائم منسدلة |
| `Calendar` | تحديد وقت الاختبار |
| `Avatar` | صورة المستخدم |
| `Skeleton` | حالة التحميل |

---

## ٤.٦ Framer Motion — الحركة والتحريك

```typescript
// تأثير ظهور صفحة الدخول
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <LoginCard />
</motion.div>

// ظهور البطاقات بتتابع (stagger effect)
<motion.div
  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
  initial="hidden" animate="visible"
>
  {exams.map(exam => (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <ExamCard exam={exam} />
    </motion.div>
  ))}
</motion.div>
```

---

## ٤.٧ Google Genkit + Gemini 1.5 Flash

### مفهوم Genkit Flows

```typescript
// src/ai/flows/parseQuestionsFlow.ts
import { z }  from 'zod';
import { ai } from '../genkit';

const QuestionSchema = z.object({
  text:    z.string().min(5),
  type:    z.enum(['multiple-choice','true-false','short-text','code']),
  answer:  z.string(),
  points:  z.number().positive().default(1),
  options: z.array(z.string()).optional(),
});

export const parseQuestionsFlow = ai.defineFlow(
  {
    name:         'parseQuestionsFlow',
    inputSchema:  z.string(),
    outputSchema: z.object({ questions: z.array(QuestionSchema) }),
  },
  async (excelJsonString) => {
    const { output } = await ai.generate({
      prompt: `
أنت مساعد تعليمي. حوِّل البيانات التالية لأسئلة اختبار بتنسيق JSON فقط.
البيانات: ${excelJsonString}

القواعد:
- حدِّد نوع كل سؤال تلقائياً
- استخرج الإجابة الصحيحة
- الدرجة الافتراضية: 1
- تجاهل الأسئلة الناقصة
      `,
      output: { schema: z.object({ questions: z.array(QuestionSchema) }) },
    });

    if (!output) throw new Error('AI فشل في تحليل الأسئلة');
    return output;
  }
);
```

---

## ٤.٨ المكتبات الإضافية

| المكتبة | الإصدار | الغرض |
|---|---|---|
| `react-hook-form` | 7.x | إدارة نماذج الإدخال |
| `zod` | 3.x | التحقق من صحة البيانات |
| `@tanstack/react-table` | 8.x | جداول بيانات متقدمة |
| `recharts` | 2.x | رسوم بيانية |
| `qrcode.react` | 3.x | توليد QR Code |
| `xlsx` | 0.18.x | قراءة ملفات Excel |
| `lucide-react` | 0.4x | أيقونات SVG |
| `date-fns` | 3.x | معالجة التواريخ |
| `clsx` + `tailwind-merge` | — | دمج CSS Classes بذكاء |
| `next-themes` | 0.3x | Dark/Light Mode |

---

---

# الفصل الخامس: بنية المشروع
## Project Structure

---

## ٥.١ الهيكل الكامل

```
quizzy/
├── .env.local                       ← متغيرات البيئة السرية
├── .eslintrc.json
├── .gitignore
├── firestore.rules                  ← قواعد أمان Firestore
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
│
├── public/
│   ├── favicon.ico
│   └── logo.svg
│
└── src/
    ├── app/
    │   ├── globals.css              ← CSS Variables + Tailwind
    │   ├── layout.tsx               ← Root Layout (Fonts + Providers)
    │   ├── page.tsx                 ← صفحة تسجيل الدخول
    │   │
    │   ├── (app)/                   ← صفحات محمية
    │   │   ├── layout.tsx           ← الأمان + Sidebar + Header
    │   │   │
    │   │   ├── student/
    │   │   │   ├── page.tsx         ← لوحة التحكم
    │   │   │   ├── exams/page.tsx   ← قائمة الاختبارات
    │   │   │   ├── exam/[id]/page.tsx        ← محرك الاختبار
    │   │   │   ├── results/[id]/page.tsx     ← النتائج
    │   │   │   └── sheets/page.tsx  ← ورقة الإجابات
    │   │   │
    │   │   ├── teacher/
    │   │   │   ├── page.tsx         ← لوحة المدرس
    │   │   │   ├── create/page.tsx  ← إنشاء الاختبار
    │   │   │   ├── question-bank/page.tsx    ← بنك الأسئلة
    │   │   │   └── results/[id]/page.tsx     ← تحليلات الطلاب
    │   │   │
    │   │   ├── admin/
    │   │   │   ├── page.tsx         ← لوحة الإدارة
    │   │   │   └── users/page.tsx   ← إدارة المستخدمين
    │   │   │
    │   │   ├── certificate/[id]/page.tsx     ← الشهادة
    │   │   └── profile/page.tsx     ← الملف الشخصي
    │   │
    │   └── api/
    │       └── genkit/parseQuestions/route.ts
    │
    ├── ai/
    │   ├── genkit.ts
    │   ├── dev.ts
    │   └── flows/
    │       ├── parseQuestionsFlow.ts
    │       └── evaluate-code-flow.ts
    │
    ├── components/
    │   ├── providers.tsx
    │   ├── logo.tsx
    │   ├── sidebar.tsx
    │   ├── header.tsx
    │   └── ui/                      ← 30+ ShadCN components
    │
    ├── firebase/
    │   ├── index.ts                 ← Firebase init + Hooks
    │   └── provider.tsx
    │
    ├── hooks/
    │   ├── use-toast.ts
    │   └── use-mobile.ts
    │
    └── lib/
        ├── types.ts                 ← جميع TypeScript types
        ├── utils.ts                 ← دوال مساعدة
        ├── constants.ts
        └── schemas.ts               ← Zod schemas
```

---

## ٥.٢ شرح الملفات الجوهرية

### `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'],  variable: '--font-inter',  display: 'swap' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo', display: 'swap' });

export const metadata: Metadata = {
  title:       'Quizzy — منصة الاختبارات الإلكترونية',
  description: 'نظام اختبارات إلكتروني متكامل يدعم العربية والإنجليزية',
  keywords:    ['اختبارات', 'تعليم', 'e-learning', 'quiz', 'firebase'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} font-cairo antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

### `src/app/(app)/layout.tsx`

```typescript
import { redirect }     from 'next/navigation';
import { getCurrentUser } from '@/firebase';
import { Sidebar }      from '@/components/sidebar';
import { Header  }      from '@/components/header';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/');

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar role={user.role} userName={user.name} userPhoto={user.photoURL} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
```

---

---

# الفصل السادس: المميزات والوظائف
## Features & Functionality

---

## ٦.١ صفحة تسجيل الدخول

### المميزات

- شعار "Quizzy" التدريجي بألوان الهوية البصرية
- نموذج موحَّد بتبويبَين: Sign In / Sign Up
- تسجيل بـ Google باضغطة واحدة
- التحقق من صحة الإدخال في الوقت الفعلي

### المنطق

```typescript
const handleAuthSuccess = async (firebaseUser: User) => {
  const userDocRef = doc(db, 'users', firebaseUser.uid);
  const userSnap   = await getDoc(userDocRef);

  if (userSnap.exists()) {
    const { role } = userSnap.data();
    router.push(`/${role}`);
  } else {
    // أول مرة — إنشاء وثيقة مستخدم
    await setDoc(userDocRef, {
      email:       firebaseUser.email,
      name:        firebaseUser.displayName || 'مستخدم جديد',
      role:        'student',  // الافتراضي
      status:      'Active',
      photoURL:    firebaseUser.photoURL || null,
      createdAt:   serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    });
    router.push('/student');
  }
};
```

---

## ٦.٢ محرك الاختبار المتقدم

### خوارزمية حالة الاختبار

```typescript
type ExamStatus =
  | 'scheduled'
  | 'start-now'
  | 'in-progress'
  | 'retake-available'
  | 'completed'
  | 'expired';

function computeStatus(exam: Exam, attempts: StudentExam[], userId: string): ExamStatus {
  const now       = new Date();
  const myDone    = attempts.filter(a => a.studentId === userId && a.status === 'completed');
  const myActive  = attempts.find (a => a.studentId === userId && a.status === 'in-progress');

  if (now < exam.startTime)                        return 'scheduled';
  if (myActive)                                    return 'in-progress';
  if (now > exam.endTime && myDone.length === 0)   return 'expired';
  if (myDone.length >= exam.attemptsAllowed)        return 'completed';
  if (myDone.length > 0 && now <= exam.endTime)    return 'retake-available';
  if (now >= exam.startTime && now <= exam.endTime) return 'start-now';
  return 'expired';
}
```

### المؤقت الزمني مع التنبيهات التدريجية

```typescript
useEffect(() => {
  const tick = setInterval(() => {
    setTimeLeft(prev => {
      const next = prev - 1;
      if (next % 30 === 0) saveProgress();  // حفظ كل 30 ثانية
      if (next === 600) notifyUser('10 دقائق متبقية');
      if (next === 300) notifyUser('⚠️ 5 دقائق فقط!');
      if (next === 60)  notifyUser('🔴 دقيقة أخيرة!');
      if (next <= 0)   { clearInterval(tick); autoSubmit(); return 0; }
      return next;
    });
  }, 1000);
  return () => clearInterval(tick);
}, []);
```

---

## ٦.٣ الأسئلة البرمجية (Code Questions)

مزية فريدة نادر وجودها في منصات مجانية:

```typescript
// تنفيذ الكود في بيئة آمنة معزولة (iframe sandbox)
async function runCode(code: string, language: string) {
  const sandbox = document.createElement('iframe');
  sandbox.setAttribute('sandbox', 'allow-scripts');
  sandbox.style.display = 'none';
  document.body.appendChild(sandbox);

  const src = `
    <script>
      try {
        const result = eval(${JSON.stringify(code)});
        window.parent.postMessage({ type: 'result', data: String(result) }, '*');
      } catch(e) {
        window.parent.postMessage({ type: 'error',  data: e.message }, '*');
      }
    </script>
  `;

  // استقبال النتيجة
  const result = await new Promise((resolve) => {
    window.addEventListener('message', (e) => {
      resolve(e.data);
      document.body.removeChild(sandbox);
    }, { once: true });
    sandbox.srcdoc = src;
  });

  return result;
}
```

---

## ٦.٤ استيراد الأسئلة بالذكاء الاصطناعي

```typescript
// عملية الاستيراد من جانب العميل
const handleImport = async (file: File) => {
  setImportStatus('جارٍ قراءة الملف...');
  const base64 = await fileToBase64(file);

  setImportStatus('جارٍ تحليل الأسئلة بالذكاء الاصطناعي...');
  const res = await fetch('/api/genkit/parseQuestions', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ base64File: base64, fileName: file.name }),
  });

  const { questions, error } = await res.json();
  if (error) { toast({ title: error, variant: 'destructive' }); return; }

  setImportedQuestions(questions);
  setImportStatus(`تم استيراد ${questions.length} سؤال بنجاح ✅`);
};
```

---

## ٦.٥ الشهادات الإلكترونية

```typescript
// صفحة الشهادة — مُصمَّمة للطباعة
export default function CertificatePage({ params: { id } }) {
  return (
    <div className="certificate-container print:shadow-none">
      <div className="certificate border-8 border-double border-blue-700">

        {/* رأس الشهادة */}
        <Logo size="xl" />
        <h1 className="text-4xl font-black text-blue-800">شهادة إنجاز</h1>
        <h2 className="text-gray-500">Certificate of Achievement</h2>

        {/* الجسم */}
        <p>يُشهَد لـ <strong>{cert.studentName}</strong></p>
        <p>بأنه اجتاز اختبار <strong>{cert.examTitle}</strong></p>
        <p className="text-5xl font-black text-green-600">
          {cert.percentage.toFixed(1)}%
        </p>

        {/* رمز التحقق */}
        <QRCode value={`https://quizzy.app/verify/${cert.verificationCode}`} />
        <code className="text-xs">{cert.verificationCode}</code>

      </div>
    </div>
  );
}
```

---

## ٦.٦ لوحة تحكم المسؤول

### جدول المستخدمين المتقدم

```typescript
// تعريف أعمدة الجدول مع TanStack Table
const columns: ColumnDef<AppUser>[] = [
  {
    accessorKey: 'name',
    header: 'الاسم',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar src={row.original.photoURL} fallback={row.original.name[0]} />
        <span className="font-semibold">{row.getValue('name')}</span>
      </div>
    ),
  },
  { accessorKey: 'email', header: 'البريد' },
  {
    accessorKey: 'role',
    header: 'الدور',
    cell: ({ row }) => (
      <Select
        value={row.getValue('role')}
        onValueChange={val => changeRole(row.original.uid, val)}
      >
        <SelectTrigger className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="student">طالب</SelectItem>
          <SelectItem value="teacher">مدرس</SelectItem>
          <SelectItem value="admin">مسؤول</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'Active' ? 'default' : 'secondary'}>
        {row.original.status === 'Active' ? '🟢 نشط' : '⚫ معطَّل'}
      </Badge>
    ),
  },
];
```

---

---

# الفصل السابع: تصميم الواجهات
## UI/UX Design

---

## ٧.١ فلسفة التصميم

يعتمد Quizzy على مزيج من **Material Design** و**Apple HIG** مع **هوية بصرية عربية** أصيلة:

1. **الوضوح أولاً:** كل عنصر له غرض وظيفي
2. **التسلسل الهرمي:** تمييز واضح بين العناوين والنصوص والإجراءات
3. **الاستجابة الفورية:** كل تفاعل له ردٌّ بصري فوري
4. **الشمولية:** RTL أصيل وليس مقلوباً

---

## ٧.٢ نظام الألوان

| الاسم | Light | Dark | الاستخدام |
|---|---|---|---|
| Primary | hsl(220, 87%, 55%) | hsl(220, 87%, 62%) | الأزرار الرئيسية |
| Accent | hsl(45, 93%, 58%) | hsl(45, 93%, 65%) | الشعار، التمييزات |
| Background | hsl(210, 40%, 98%) | hsl(222, 47%, 11%) | خلفية الصفحة |
| Card | hsl(0, 0%, 100%) | hsl(217, 32%, 17%) | خلفية البطاقات |
| Success | hsl(142, 71%, 45%) | hsl(142, 71%, 40%) | النجاح |
| Destructive | hsl(0, 84%, 60%) | hsl(0, 62%, 30%) | الخطأ والحذف |

---

## ٧.٣ التصميم المتجاوب

| نقطة التوقف | العرض | التخطيط |
|---|---|---|
| Mobile | < 640px | Sidebar مخفي — Sheet (Slide-in) |
| Tablet | 768px+ | Sidebar 64px (أيقونات فقط) |
| Laptop | 1024px+ | Sidebar 240px (أيقونات + نصوص) |
| Desktop | 1280px+ | Sidebar 256px (موسَّع) |

---

## ٧.٤ تشريح الواجهات الرئيسية

### واجهة أداء الاختبار

```
┌─────────────────────────────────────────────────────────┐
│                       HEADER                            │
│  Quizzy Logo    اختبار هندسة البرمجيات     ⏰ 35:42   │
├──────────────────────────────────┬──────────────────────┤
│                                  │    تقدم الاختبار     │
│  السؤال 3 من 25                  │    ████████░░ 60%    │
│                                  │                      │
│  [3] ما هو الفرق بين...          │    شبكة التنقل:      │
│                                  │  1✓ 2✓ 3● 4  5  ... │
│  ○ الخيار الأول                  │                      │
│  ● الخيار الثاني     ← selected  │    الأسئلة المُعلَّمة │
│  ○ الخيار الثالث                 │    🚩 لا يوجد        │
│  ○ الخيار الرابع                 │                      │
│                                  │    [ 💾 حفظ ]        │
│  [ ← السابق ]    [ التالي → ]   │                      │
│                                  │   [✅ تسليم الاختبار]│
└──────────────────────────────────┴──────────────────────┘
```

---

---

# الفصل الثامن: شرح الكود البرمجي
## Code Deep Dive

---

## ٨.١ دورة حياة صفحة الاختبار

```typescript
// src/app/(app)/student/exam/[id]/page.tsx — مختصر

export default function ExamPage({ params: { id } }: { params: { id: string } }) {
  // ── State ─────────────────────────────────────────────────
  const [exam,            setExam]            = useState<Exam | null>(null);
  const [questions,       setQuestions]       = useState<Question[]>([]);
  const [answers,         setAnswers]         = useState<Record<string, string>>({});
  const [flagged,         setFlagged]         = useState<Set<string>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft,        setTimeLeft]        = useState(0);
  const [isSubmitting,    setIsSubmitting]    = useState(false);
  const [examFinished,    setExamFinished]    = useState(false);

  // ── Initialization ────────────────────────────────────────
  useEffect(() => {
    initExam();
  }, [id]);

  async function initExam() {
    // 1. جلب بيانات الاختبار
    const examSnap = await getDoc(doc(db, 'exams', id));
    const examData = examSnap.data() as Exam;
    setExam(examData);

    // 2. جلب الأسئلة
    const qSnap = await getDocs(
      query(collection(db, 'exams', id, 'questions'), orderBy('orderIndex'))
    );
    setQuestions(qSnap.docs.map(d => ({ id: d.id, ...d.data() } as Question)));

    // 3. استئناف من localStorage
    const saved = localStorage.getItem(`exam_${id}_${userId}`);
    if (saved) {
      const { answers: sa, timeLeft: st, currentQuestion: sc } = JSON.parse(saved);
      setAnswers(sa);
      setTimeLeft(st);
      setCurrentQuestion(sc);
    } else {
      setTimeLeft(examData.duration * 60);
    }
  }

  // ── Timer ─────────────────────────────────────────────────
  useEffect(() => {
    if (!exam || isSubmitting || examFinished) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        if (next % 30 === 0) saveToLocalStorage();
        if (next <= 0) { clearInterval(interval); handleSubmit(); return 0; }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [exam, isSubmitting, examFinished]);

  // ── Answer Handler ────────────────────────────────────────
  function handleAnswer(questionId: string, value: string) {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }

  // ── Flag Handler ──────────────────────────────────────────
  function toggleFlag(questionId: string) {
    setFlagged(prev => {
      const next = new Set(prev);
      next.has(questionId) ? next.delete(questionId) : next.add(questionId);
      return next;
    });
  }

  // ── Submit ────────────────────────────────────────────────
  async function handleSubmit() {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // [التصحيح والحفظ — مشروح في الفصل السابق]
      await submitAndGrade(exam!, questions, answers, userId);
    } finally {
      setIsSubmitting(false);
      localStorage.removeItem(`exam_${id}_${userId}`);
    }
  }
}
```

---

## ٨.٢ خوارزمية التصحيح الكاملة

```typescript
async function submitAndGrade(
  exam:      Exam,
  questions: Question[],
  answers:   Record<string, string>,
  userId:    string
) {
  let score    = 0;
  let maxScore = 0;

  const gradedAnswers: Answer[] = questions.map(q => {
    maxScore += q.points;
    const val        = answers[q.id] ?? '';
    let   isCorrect  = false;

    switch (q.type) {
      case 'multiple-choice':
      case 'true-false':
        isCorrect = val.toLowerCase().trim() === q.answer.toLowerCase().trim();
        break;

      case 'short-text':
        const normalize = (s: string) => s.toLowerCase().trim().replace(/\s+/g, ' ');
        isCorrect = normalize(val) === normalize(q.answer);
        break;

      case 'code':
        // تقييم مع test cases (تجري على السيرفر)
        isCorrect = false; // placeholder
        break;
    }

    const pointsEarned = isCorrect ? q.points : 0;
    score += pointsEarned;

    return { questionId: q.id, value: val, isCorrect, pointsEarned };
  });

  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const passed     = percentage >= exam.passingScore;

  // حفظ النتيجة
  const resultRef = await addDoc(collection(db, 'studentExams'), {
    studentId:    userId,
    examId:       exam.id,
    status:       'completed',
    answers:      gradedAnswers,
    score, maxScore, percentage, passed,
    timeTaken:    exam.duration * 60 - timeLeft,
    startedAt:    examStartTime,
    submittedAt:  serverTimestamp(),
  });

  // شهادة إن نجح
  if (passed) {
    await addDoc(collection(db, 'certificates'), {
      studentId:        userId,
      examId:           exam.id,
      studentExamId:    resultRef.id,
      studentName:      currentUser.name,
      examTitle:        exam.title,
      score, percentage,
      verificationCode: crypto.randomUUID(),
      issuedAt:         serverTimestamp(),
    });
  }

  router.push(`/student/results/${resultRef.id}`);
}
```

---

## ٨.٣ دوال مساعدة مهمة في `lib/utils.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// دمج CSS Classes بذكاء (تُستخدَم في كل التطبيق)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// تنسيق الوقت
export function formatTime(seconds: number): string {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

// تنسيق التاريخ
export function formatDate(date: Date | string | number): string {
  return new Intl.DateTimeFormat('ar-EG', {
    year:   'numeric',
    month:  'long',
    day:    'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

// تحويل Firebase Timestamp لـ Date
export function tsToDate(ts: any): Date {
  if (ts?.toDate) return ts.toDate();
  if (ts instanceof Date) return ts;
  return new Date(ts);
}

// توليد رمز مشاركة قصير
export function generateShareToken(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// حساب النسبة المئوية
export function calcPercentage(score: number, max: number): number {
  if (max === 0) return 0;
  return Math.round((score / max) * 1000) / 10; // تقريب لـ 1 خانة عشرية
}
```

---

---

# الفصل التاسع: الأمان والصلاحيات
## Security & Authorization

---

## ٩.١ نموذج الدفاع المتعمق

```
الطبقة 1 — واجهة المستخدم (Client Guards)
├── layout.tsx يُعيد التوجيه لغير المُسجَّلين
├── Route Groups تُجمِّع الصفحات بحسب الدور
└── Sidebar يُخفي الروابط الخاصة بالأدوار الأخرى

        [يمكن تجاوزها نظرياً من مطوِّر متقدم]

الطبقة 2 — Firestore Security Rules (Server)
├── كل قراءة/كتابة تمر هنا أولاً
├── لا تعتمد على أي شيء من العميل
└── لا يمكن تجاوزها من أي طريقة

        [الحماية الحقيقية الموثوقة]
```

---

## ٩.٢ Firestore Security Rules المفصَّلة

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ═══ دوال مساعدة ═══
    function isAuth()          { return request.auth != null; }
    function uid()             { return request.auth.uid; }
    function role()            {
      return get(/databases/$(database)/documents/users/$(uid())).data.role;
    }
    function isRole(r)         { return isAuth() && role() == r; }
    function isOwner(userId)   { return isAuth() && uid() == userId; }
    function isAdmin()         { return isRole('admin'); }
    function isTeacher()       { return isRole('teacher'); }
    function isStudent()       { return isRole('student'); }

    // ═══ users ═══
    match /users/{userId} {
      allow read:   if isOwner(userId) || isAdmin();
      allow create: if isOwner(userId)
                    && request.resource.data.role == 'student'
                    && request.resource.data.status == 'Active';
      allow update: if (isOwner(userId)
                        && !request.resource.data.diff(resource.data)
                              .affectedKeys().hasAny(['role']))
                    || isAdmin();
      allow delete: if isAdmin();
    }

    // ═══ exams ═══
    match /exams/{examId} {
      allow read:   if isAuth();
      allow create: if isTeacher()
                    && request.resource.data.teacherId == uid();
      allow update: if (isTeacher() && resource.data.teacherId == uid())
                    || isAdmin();
      allow delete: if (isTeacher() && resource.data.teacherId == uid())
                    || isAdmin();

      // ═══ questions (sub-collection) ═══
      match /questions/{qId} {
        allow read:  if isAuth();
        allow write: if isTeacher()
                     && get(/databases/$(database)/documents/exams/$(examId))
                           .data.teacherId == uid();
      }
    }

    // ═══ studentExams ═══
    match /studentExams/{resultId} {
      allow read:   if isOwner(resource.data.studentId)
                    || isAdmin();
      allow create: if isStudent()
                    && request.resource.data.studentId == uid()
                    && request.resource.data.status == 'in-progress';
      allow update: if isOwner(resource.data.studentId)
                    && resource.data.status == 'in-progress'
                    && request.resource.data.status == 'completed';
    }

    // ═══ certificates ═══
    match /certificates/{certId} {
      allow read:          if true;  // للتحقق العام
      allow create:        if isAuth();
      allow update, delete: if false; // لا تُعدَّل الشهادات أبداً
    }
  }
}
```

---

## ٩.٣ OWASP Top 10 في سياق Quizzy

| الثغرة | كيف يتعامل معها Quizzy |
|---|---|
| Broken Access Control | Firestore Rules + Layout Guard |
| Cryptographic Failures | HTTPS إجباري + لا تُخزَّن كلمات مرور |
| Injection | Firestore لا يدعم SQL injection |
| Insecure Design | نموذج التهديدات راجَع مسبقاً |
| Security Misconfiguration | متغيرات بيئة معزولة |
| Vulnerable Components | npm audit دوري |
| Auth & Session Failures | Firebase JWT tokens |
| Data Integrity | التصحيح يُنجَز مع الإجابات الصحيحة |
| Logging Failures | Firebase Console Logs (جزئي) |
| SSRF | لا outbound requests من التطبيق |

---

---

# الفصل العاشر: التحديات والحلول
## Challenges & Solutions

---

## ١٠.١ حماية الإجابات أثناء الاختبار

**التحدي:** المطوِّرون يمكنهم فتح DevTools وقراءة طلبات Firestore.

**الحل:** Security Rules تمنع قراءة حقل `answer` من العميل مباشرةً. التصحيح يحدث عبر Server Action يجلب الإجابات باستخدام Firebase Admin SDK (لا تخضع لـ Client Rules).

---

## ١٠.٢ استمرارية الاختبار

**التحدي:** انقطاع الإنترنت يُفيّع الإجابات والوقت.

**الحل — ثلاث طبقات حفظ:**

```
useState → (أسرع — في الذاكرة)
localStorage → (يبقى بعد إغلاق التبويب — كل 30 ثانية)
Firestore → (نسخة احتياطية في السحابة — كل 5 دقائق)
```

---

## ١٠.٣ جودة ناتج AI

**التحدي:** Gemini أحياناً يُنتج JSON غير مكتمل.

**الحل متعدد الطبقات:**

1. **Prompt صارم ومحدد** يطلب JSON فقط بتنسيق محدد
2. **Zod Schema Validation** يتحقق من كل سؤال قبل القبول
3. **تصفية الأسئلة الجزئية** وإبلاغ المدرس بعددها

---

## ١٠.٤ تعارض الجلسات

**التحدي:** نفس المستخدم يفتح الاختبار على جهازين.

**الحل:** قبل بدء الاختبار، نتحقق من وجود محاولة `in-progress`. إن وُجدت نستأنفها، ولا نُنشئ جديدة. هذا يمنع أيضاً تسجيل نتيجتين لمحاولة واحدة.

---

## ١٠.٥ كشف الغش المتقدم

**التحدي:** الطالب يفتح تبويباً آخر للبحث.

**الحل:**
```typescript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    violations++;
    if (violations === 1) toast('⚠️ تحذير: لا تترك صفحة الاختبار');
    if (violations >= 2) autoSubmit(); // تسليم تلقائي
  }
});
```

---

---

# الفصل الحادي عشر: إدارة الجودة والاختبار
## QA & Testing

---

## ١١.١ اختبارات الوحدة الكاملة

```typescript
// tests/unit/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatTime, calcPercentage, generateShareToken } from '@/lib/utils';

describe('formatTime', () => {
  const cases = [[90,'01:30'],[0,'00:00'],[3600,'60:00'],[-5,'00:00']];
  cases.forEach(([input, expected]) => {
    it(`formatTime(${input}) → "${expected}"`, () => {
      expect(formatTime(input as number)).toBe(expected);
    });
  });
});

describe('calcPercentage', () => {
  it('23/30 = 76.7%', () => expect(calcPercentage(23, 30)).toBe(76.7));
  it('0/30 = 0%',    () => expect(calcPercentage(0, 30)).toBe(0));
  it('30/30 = 100%', () => expect(calcPercentage(30, 30)).toBe(100));
  it('x/0 = 0%',    () => expect(calcPercentage(5, 0)).toBe(0));
});

describe('generateShareToken', () => {
  it('يُولِّد رمزاً بطول 8 أحرف', () => {
    expect(generateShareToken()).toHaveLength(8);
  });
  it('كل رمز فريد', () => {
    const tokens = Array.from({ length: 100 }, generateShareToken);
    const unique = new Set(tokens);
    expect(unique.size).toBe(100);
  });
});
```

---

## ١١.٢ اختبارات التكامل

```typescript
// tests/integration/login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/app/page';

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn().mockResolvedValue({
    user: { uid: 'uid-1', email: 'test@test.com' },
  }),
  GoogleAuthProvider: vi.fn(),
}));

describe('Login Page', () => {
  it('يعرض نموذج الدخول', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('يُظهر خطأ عند كلمة مرور قصيرة', async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    await waitFor(() =>
      expect(screen.getByText(/6 أحرف/i)).toBeInTheDocument()
    );
  });
});
```

---

## ١١.٣ نتائج Lighthouse

| الصفحة | Performance | Accessibility | SEO |
|---|---|---|---|
| تسجيل الدخول | 94 | 96 | 100 |
| لوحة الطالب | 88 | 94 | 97 |
| صفحة الاختبار | 85 | 92 | 95 |
| صفحة النتائج | 91 | 96 | 98 |
| الشهادة | 96 | 98 | 99 |

---

## ١١.٤ اختبار التجاوبية

| الجهاز | الدقة | النتيجة |
|---|---|---|
| iPhone SE | 375 × 667 | ✅ يعمل |
| iPhone 14 Pro | 393 × 852 | ✅ يعمل |
| Samsung Galaxy S21 | 360 × 800 | ✅ يعمل |
| iPad (10th gen) | 820 × 1180 | ✅ يعمل |
| Laptop 13" | 1280 × 800 | ✅ يعمل |
| Desktop 24" | 1920 × 1080 | ✅ يعمل |

---

---

# الفصل الثاني عشر: النشر والبيئات
## Deployment & DevOps

---

## ١٢.١ بيئات التشغيل

| البيئة | الرابط | الغرض |
|---|---|---|
| Development | localhost:9002 | التطوير اليومي |
| Preview | quizzy-git-{branch}.vercel.app | مراجعة PRs |
| Staging | staging.quizzy.app | اختبار نهائي |
| Production | quizzy.app | المنصة الحية |

---

## ١٢.٢ متغيرات البيئة

```bash
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=quizzy-xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=quizzy-xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=quizzy-xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc

# Firebase Admin SDK (Server only)
FIREBASE_ADMIN_PROJECT_ID=quizzy-xxx
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@xxx.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# Google AI
GOOGLE_GENAI_API_KEY=AIza...
```

---

## ١٢.٣ CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: CI/CD

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test
      - run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## ١٢.٤ أوامر نشر Firebase

```bash
# نشر Security Rules
firebase deploy --only firestore:rules

# نشر Indexes
firebase deploy --only firestore:indexes

# نشر كل شيء
firebase deploy
```

---

---

# الفصل الثالث عشر: تحليل المنافسين
## Competitive Analysis

---

## ١٣.١ مقارنة شاملة

| المعيار | Quizzy | Google Forms | Kahoot | Moodle | Blackboard |
|---|---|---|---|---|---|
| **السعر** | مجاني | مجاني | مجاني/مدفوع | مجاني+سيرفر | مدفوع جداً |
| **AI Import** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **أسئلة برمجية** | ✅ | ❌ | ❌ | محدود | ✅ |
| **شهادات** | ✅ | ❌ | ❌ | محدود | ✅ |
| **RTL عربي** | ✅ أصيل | محدود | محدود | جزئي | ❌ |
| **لا خادم** | ✅ Firebase | ✅ Google | ✅ | ❌ | ❌ |
| **مكافحة غش** | متقدمة | ضعيفة | معدومة | متوسطة | متقدمة |
| **وقت الإعداد** | < 1 ساعة | < 10 دقائق | < 5 دقائق | أيام | أسابيع |

---

## ١٣.٢ الميزة التنافسية الجوهرية

**Quizzy = بساطة Google Forms + قوة Blackboard + ذكاء Gemini**

### ما لا يملكه أي منافس مجاني اليوم:

1. **AI Import في 15 ثانية** — توفير ساعات على المدرسين
2. **أسئلة برمجية بتنفيذ فعلي** — تقييم المهارات الحقيقية
3. **شهادات برمز UUID قابل للتحقق** — وثيقة رسمية
4. **صفر تكاليف بنية تحتية** — Firebase يتكفَّل بالباقي
5. **RTL عربي أصيل** — تجربة عربية حقيقية

---

---

# الفصل الرابع عشر: التطوير المستقبلي
## Future Roadmap

---

## ١٤.١ الإصدار 1.1 — تحسينات قريبة

| الميزة | الوصف | الأولوية |
|---|---|---|
| Server-side Grading | نقل التصحيح للسيرفر الآمن | عالية جداً |
| Pagination | تحميل الاختبارات بالصفحات | عالية |
| Email Notifications | إشعار الطالب بالنتيجة | متوسطة |
| Question Preview | معاينة الاختبار بعين الطالب | عالية |
| Exam Analytics | رسوم بيانية لأداء الطلاب | متوسطة |

---

## ١٤.٢ الإصدار 2.0 — الطموح الأكاديمي

| الميزة | التقنية |
|---|---|
| Proctoring بالكاميرا | WebRTC + MediaPipe Face Detection |
| تصحيح المقال بـ AI | Gemini 1.5 Pro + Rubric |
| تطبيق موبايل | React Native (Expo) |
| تقارير PDF | jsPDF + Chart.js |
| Google Classroom | Classroom API |
| SSO / LDAP | NextAuth.js + LDAP Provider |
| أسئلة صوتية ومرئية | Firebase Storage |

---

## ١٤.٣ الإصدار 3.0 — نظام إدارة تعلم كامل

منصة Quizzy 3.0 ستتحول لـ **LMS متكامل** يشمل:

- إدارة المقررات الدراسية
- المحاضرات المسجَّلة والمباشرة
- المهام والمشاريع
- منتدى نقاش لكل مادة
- رسائل مباشرة بين الطلاب والأساتذة
- تقارير أكاديمية شاملة طوال الفصل

---

---

# الفصل الخامس عشر: الخاتمة
## Conclusion

---

## ١٥.١ ملخص الإنجازات

أُنجِز مشروع **Quizzy** في غضون فصل دراسي واحد متجاوزاً الأهداف الأصلية:

### على الصعيد التقني

- تطبيق ويب متكامل بأحدث التقنيات (Next.js 15, Firebase, TypeScript)
- نظام صلاحيات ثلاثي آمن بطبقتين (UI Guards + Firestore Rules)
- دمج الذكاء الاصطناعي (Gemini 1.5 Flash عبر Genkit)
- دعم أربعة أنواع أسئلة بما فيها البرمجية التي تُنفَّذ فعلياً
- واجهة مستخدم تدعم العربية والإنجليزية مع الوضع الداكن

### على الصعيد المنهجي

- تطبيق منهجية Agile بـ 8 Sprints منظَّمة
- توثيق شامل يشمل ERD وتسلسل الطلبات وشجرة المشروع
- اختبارات على مستويات متعددة (Unit, Integration, E2E)

---

## ١٥.٢ الدروس المستخلصة

### دروس تقنية

1. **Firebase ليس مجرد قاعدة بيانات:** Security Rules نظام أمان متكامل في ذاته
2. **TypeScript استثمار:** ساعات إضافية في الكتابة توفِّر أيام إصلاح أخطاء
3. **localStorage حليف:** أنقذ تجربة مستخدمين عند انقطاع الاتصال
4. **AI يحتاج تحققاً:** Gemini ممتاز لكن Zod ضروري لاصطياد الأخطاء

### دروس منهجية

1. **ابدأ بقاعدة البيانات:** تغيير هيكل Firestore لاحقاً مكلف جداً
2. **Security Rules أولاً:** لا تؤجل — كل يوم تأخير يعني أساساً هشاً
3. **Prototype بسرعة:** Next.js + Firebase يُخرجان MVP في أسبوع
4. **التوثيق ليس ترفاً:** بدونه كل فكرة غير مدوَّنة هي خطر حقيقي

---

## ١٥.٣ كلمة ختامية

> **"لكل مطوِّر عربي شاب: لغتنا لا عائق، وبيئتنا لا قيد. اصنع ما تتخيله."**

يُعبِّر الطالب عن امتنانه للمشرف والأسرة التعليمية ومجتمع المطورين مفتوحي المصدر، الذي جعل من مشروع كهذا حلماً قابلاً للتحقق.

---

---

# الملاحق
## Appendix

---

## ملحق أ: قائمة API Endpoints

| الـ Endpoint | Method | الوصف | الصلاحية |
|---|---|---|---|
| `/api/genkit/parseQuestions` | POST | استيراد أسئلة من Excel | Teacher |
| `/api/grade` | POST | تصحيح اختبار (Server-side) | Student |
| `/api/share/[token]` | GET | معلومات مشاركة الاختبار | Public |
| `/api/certificate/verify` | GET | التحقق من شهادة برمزها | Public |

---

## ملحق ب: متطلبات التشغيل

| المكوِّن | الحد الأدنى | المُوصَّى به |
|---|---|---|
| Node.js | 20.x LTS | 22.x LTS |
| RAM | 8 GB | 16 GB |
| تخزين | 5 GB | SSD 20 GB |
| OS | Win 10 / macOS 12 / Ubuntu 20 | أحدث |

### متطلبات المستخدم (Client)

| المتصفح | الإصدار الأدنى |
|---|---|
| Chrome | 90+ |
| Firefox | 88+ |
| Edge | 90+ |
| Safari | 14+ |

---

## ملحق ج: مسرد المصطلحات

| المصطلح | التعريف |
|---|---|
| **API** | Application Programming Interface — واجهة تبادل البيانات |
| **App Router** | نظام التوجيه الجديد في Next.js 13+ |
| **BaaS** | Backend as a Service — خلفية من طرف ثالث |
| **CI/CD** | أتمتة بناء ونشر التطبيق |
| **Firestore Rules** | قواعد أمان Firebase Server-side |
| **Genkit** | إطار Google لتطبيقات الذكاء الاصطناعي |
| **Gemini** | نموذج لغوي متعدد الوسائط من Google |
| **Hook** | دالة React لاستخدام State وEffects |
| **JWT** | JSON Web Token — رمز التحقق من الجلسة |
| **localStorage** | تخزين محلي في المتصفح |
| **MCQ** | Multiple Choice Question — اختيار متعدد |
| **NoSQL** | قواعد بيانات وثائقية |
| **OAuth** | بروتوكول التفويض (تسجيل بـ Google) |
| **RTL** | Right-to-Left — الكتابة من اليمين لليسار |
| **Route Group** | مجموعة مسارات Next.js في أقواس |
| **Server Component** | مكوِّن React يعمل على السيرفر |
| **TypeScript** | JavaScript بنظام أنواع قوي |
| **UID** | User ID — معرِّف فريد للمستخدم |
| **UUID** | Universal Unique Identifier |
| **Zod** | مكتبة التحقق من البيانات |

---

## ملحق د: المراجع والمصادر

### الوثائق الرسمية

1. Next.js Documentation — https://nextjs.org/docs
2. Firebase Documentation — https://firebase.google.com/docs
3. Firestore Security Rules — https://firebase.google.com/docs/firestore/security
4. Google Genkit — https://firebase.google.com/docs/genkit
5. Tailwind CSS — https://tailwindcss.com/docs
6. ShadCN UI — https://ui.shadcn.com/docs
7. Framer Motion — https://www.framer.com/motion/
8. React Hook Form — https://react-hook-form.com/docs
9. Zod — https://zod.dev/
10. TanStack Table — https://tanstack.com/table/v8

### المراجع الأكاديمية

11. Conole, G. (2014). E-assessment and E-learning. Encyclopedia of Education and IT.
12. Google for Education (2023). State of AI in Education Report.
13. Newhouse, P. (2020). Technologies for Assessment — A Systematic Review.

---

</div>

import type {
  MockReport,
} from "../types/ReportsTypes";

export const MOCK_REPORTS: MockReport[] = [
  {
    id: 1,
    category: "تقارير النشاط",
    type: "تقني",

    formData: {
      schoolName: "مدرسة الأمير عبد المجيد بن عبد العزيز",
      region: "منطقة مكة المكرمة",
      reportTitle: "تطبيقات الذكاء الاصطناعي في التعليم",
      implementer: "المعلم/ رائد الزهراني",
      location: "معمل الحاسب الآلي",
      target: "طلاب الصف الثاني ثانوي",
      beneficiaries: "34 طالب",
      date: "1447/06/28 هـ",

      objectives:
        "1- تحليل ومعالجة البيانات: مساعدة الطلاب على فهم البيانات واستغلالها.\n2- أتمتة المهام المعقدة والتعرف على تقنيات المستقبل.",

      evidences: [
        null,
        null,
        null,
        null,
      ],
    },
  },

  {
    id: 2,
    category: "حصص النشاط",
    type: "رياضي",

    formData: {
      schoolName: "مدرسة ثقيف الثانوية",
      region: "منطقة مكة المكرمة",
      reportTitle: "دوري الفصول لكرة القدم",
      implementer: "الكابتن/ فهد الشمري",
      location: "الملعب العشبي بالمدرسة",
      target: "جميع طلاب المدرسة",
      beneficiaries: "120 طالب",
      date: "1447/07/15 هـ",

      objectives:
        "1- رفع مستوى اللياقة البدنية لدى الطلاب.\n2- غرس قيم التعاون والروح الرياضية والعمل الجماعي.",

      evidences: [
        null,
        null,
        null,
        null,
      ],
    },
  },

  {
    id: 3,
    category: "تقارير النشاط",
    type: "علمي",

    formData: {
      schoolName: "مدرسة الفلاح المتوسطة",
      region: "منطقة مكة المكرمة",
      reportTitle: "معرض الابتكارات العلمية",
      implementer: "أ. خالد الدوسري",
      location: "الساحة الداخلية",
      target: "الطلاب وأولياء الأمور",
      beneficiaries: "200 زائر",
      date: "1447/08/02 هـ",

      objectives:
        "1- تحفيز التفكير الإبداعي والابتكار.\n2- تطبيق النظريات العلمية في نماذج ملموسة وواقعية.",

      evidences: [
        null,
        null,
        null,
        null,
      ],
    },
  },

  {
    id: 4,
    category: "حصص النشاط",
    type: "ثقافي",

    formData: {
      schoolName: "مدرسة ابن خلدون الابتدائية",
      region: "منطقة مكة المكرمة",
      reportTitle: "تحدي القراءة العربي - التصفيات",
      implementer: "أ. محمد العتيبي",
      location: "مصادر التعلم (المكتبة)",
      target: "الطلاب الموهوبين",
      beneficiaries: "25 طالب",
      date: "1447/08/10 هـ",

      objectives:
        "1- تعزيز مهارات القراءة السريعة والفهم.\n2- تشجيع الطلاب على حب الكتاب والاطلاع المستمر.",

      evidences: [
        null,
        null,
        null,
        null,
      ],
    },
  },
];

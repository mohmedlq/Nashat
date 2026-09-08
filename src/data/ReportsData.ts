import type { MockReport } from "../types/ReportsTypes";

interface MockReportContext {
  schoolName: string;
  teacherName: string;
  managerName: string;
  region: string;
}

export const createMockReports = ({
  schoolName,
  teacherName,
  managerName,
  region,
}: MockReportContext): MockReport[] => [
  /* =========================
     تقارير النشاط
  ========================= */

  {
    id: 94820184712,
    category: "تقارير النشاط",
    type: "وطني",

    formData: {
      schoolName,
      region,
      reportTitle: "اليوم الوطني السعودي",
      implementer: teacherName,
      location: "مسرح المدرسة",
      target: "جميع طلاب المدرسة",
      beneficiaries: "350 طالب",
      date: " ",

      objectives:
        "1- تعزيز قيم الانتماء الوطني والاعتزاز بالهوية السعودية.\n2- تعريف الطلاب بتاريخ المملكة ومنجزاتها الوطنية.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 71049285019,
    category: "تقارير النشاط",
    type: "وطني",

    formData: {
      schoolName,
      region,
      reportTitle: "يوم التأسيس السعودي",
      implementer: teacherName,
      location: "الساحة الداخلية",
      target: "جميع طلاب المدرسة",
      beneficiaries: "300 طالب",
      date: "",

      objectives:
        "1- التعريف بتاريخ تأسيس الدولة السعودية ومراحل تطورها.\n2- تعزيز الاعتزاز بالإرث التاريخي والثقافي للمملكة.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 18492048102,
    category: "تقارير النشاط",
    type: "بيئي",

    formData: {
      schoolName,
      region,
      reportTitle: "يوم السعودية الخضراء",
      implementer: teacherName,
      location: "حديقة المدرسة",
      target: "طلاب المرحلة الثانوية",
      beneficiaries: "180 طالب",
      date: "",

      objectives:
        "1- رفع الوعي بأهمية المحافظة على البيئة وزيادة المساحات الخضراء.\n2- تشجيع الطلاب على المشاركة في المبادرات البيئية والتشجير.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 84029184029,
    category: "تقارير النشاط",
    type: "وطني",

    formData: {
      schoolName,
      region,
      reportTitle: "يوم العلم السعودي",
      implementer: managerName,
      location: "ساحة المدرسة",
      target: "جميع طلاب المدرسة",
      beneficiaries: "300 طالب",
      date: "",

      objectives:
        "1- تعزيز مكانة العلم السعودي باعتباره رمزًا للسيادة والوحدة الوطنية.\n2- تعريف الطلاب بدلالات العلم السعودي وقيمته الوطنية.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 63920194827,
    category: "تقارير النشاط",
    type: "صحي",

    formData: {
      schoolName,
      region,
      reportTitle: "يوم الصحة العالمي",
      implementer: teacherName,
      location: "مسرح المدرسة",
      target: "جميع المراحل الدراسية",
      beneficiaries: "250 طالب",
      date: "",

      objectives:
        "1- رفع مستوى الوعي الصحي لدى الطلاب وتعزيز السلوكيات الصحية.\n2- تشجيع الطلاب على اتباع نمط حياة صحي والاهتمام بالوقاية.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 31572840691,
    category: "تقارير النشاط",
    type: "تعليمي",

    formData: {
      schoolName,
      region,
      reportTitle: "اليوم العالمي للتعليم",
      implementer: teacherName,
      location: "قاعة الأنشطة",
      target: "طلاب المرحلة الثانوية",
      beneficiaries: "220 طالب",
      date: "",

      objectives:
        "1- إبراز أهمية التعليم في بناء الفرد والمجتمع.\n2- تحفيز الطلاب على التعلم المستمر وتطوير مهاراتهم العلمية والمعرفية.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 52719463820,
    category: "تقارير النشاط",
    type: "ثقافي",

    formData: {
      schoolName,
      region,
      reportTitle: "يوم اللغة العربية العالمي",
      implementer: teacherName,
      location: "مركز مصادر التعلم",
      target: "طلاب المدرسة",
      beneficiaries: "175 طالب",
      date: "",

      objectives:
        "1- تعزيز مكانة اللغة العربية والاعتزاز بها.\n2- تنمية مهارات الطلاب اللغوية وتشجيعهم على القراءة والكتابة باللغة العربية.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 68140392715,
    category: "تقارير النشاط",
    type: "اجتماعي",

    formData: {
      schoolName,
      region,
      reportTitle: "يوم التسامح العالمي",
      implementer: teacherName,
      location: "مسرح المدرسة",
      target: "جميع طلاب المدرسة",
      beneficiaries: "280 طالب",
      date: "",

      objectives:
        "1- نشر ثقافة التسامح والاحترام بين الطلاب.\n2- تعزيز الحوار الإيجابي وقبول الاختلاف والتعايش مع الآخرين.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 79351620487,
    category: "تقارير النشاط",
    type: "اجتماعي",

    formData: {
      schoolName,
      region,
      reportTitle: "اليوم العالمي للطفل",
      implementer: teacherName,
      location: "ساحة المدرسة",
      target: "طلاب المرحلة الابتدائية",
      beneficiaries: "160 طالب",
      date: "",

      objectives:
        "1- التعريف بحقوق الطفل وأهمية توفير بيئة تعليمية آمنة ومحفزة.\n2- تعزيز قيم الرعاية والاحترام وحماية الأطفال.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 42681937502,
    category: "تقارير النشاط",
    type: "مجتمعي",

    formData: {
      schoolName,
      region,
      reportTitle: "اليوم العالمي لذوي الإعاقة",
      implementer: teacherName,
      location: "قاعة المدرسة",
      target: "طلاب المدرسة",
      beneficiaries: "240 طالب",
      date: "",

      objectives:
        "1- تعزيز الوعي بحقوق الأشخاص ذوي الإعاقة ودعم دمجهم في المجتمع.\n2- نشر ثقافة الاحترام والمساواة وتكافؤ الفرص بين جميع أفراد المجتمع.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 53827190463,
    category: "تقارير النشاط",
    type: "تعليمي",

    formData: {
      schoolName,
      region,
      reportTitle: "يوم المعلم العالمي",
      implementer: teacherName,
      location: "مسرح المدرسة",
      target: "طلاب ومعلمو المدرسة",
      beneficiaries: "190 طالب ومعلم",
      date: "",

      objectives:
        "1- تقدير جهود المعلمين ودورهم في بناء الأجيال.\n2- تعزيز احترام الطلاب للمعلم وإبراز أثره في العملية التعليمية.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 60491827351,
    category: "تقارير النشاط",
    type: "اجتماعي",

    formData: {
      schoolName,
      region,
      reportTitle: "اليوم الدولي للأسرة",
      implementer: teacherName,
      location: "قاعة الأنشطة",
      target: "الطلاب وأولياء الأمور",
      beneficiaries: "210 مستفيد",
      date: "",

      objectives:
        "1- تعزيز أهمية الأسرة ودورها في بناء شخصية الأبناء.\n2- تشجيع التواصل الإيجابي والتعاون بين الأسرة والمدرسة.",

      evidences: [null, null, null, null],
    },
  },

  /* =========================
     حصص النشاط
  ========================= */

  {
    id: 38291048572,
    category: "حصص النشاط",
    type: "رياضي",

    formData: {
      schoolName,
      region,
      reportTitle: "دوري الفصول لكرة القدم",
      implementer: teacherName,
      location: "الملعب العشبي بالمدرسة",
      target: "جميع طلاب المدرسة",
      beneficiaries: "120 طالب",
      date: "",

      objectives:
        "1- رفع مستوى اللياقة البدنية لدى الطلاب.\n2- غرس قيم التعاون والروح الرياضية والعمل الجماعي.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 52918402938,
    category: "حصص النشاط",
    type: "ثقافي",

    formData: {
      schoolName,
      region,
      reportTitle: "تحدي القراءة العربي - التصفيات",
      implementer: teacherName,
      location: "مصادر التعلم (المكتبة)",
      target: "الطلاب الموهوبين",
      beneficiaries: "25 طالب",
      date: "",

      objectives:
        "1- تعزيز مهارات القراءة السريعة والفهم.\n2- تشجيع الطلاب على حب الكتاب والاطلاع المستمر.",

      evidences: [null, null, null, null],
    },
  },

  {
    id: 876554,
    category: "حصص النشاط",
    type: "صحي",

    formData: {
      schoolName,
      region,
      reportTitle: "برنامج التوعية بالصحة والتغذية السليمة",
      implementer: teacherName,
      location: "مسرح المدرسة",
      target: "جميع المراحل الدراسية",
      beneficiaries: "150 طالب",
      date: "",

      objectives:
        "1- رفع الوعي بأهمية الغذاء المتوازن والنشاط البدني.\n2- الوقاية من الأمراض المزمنة واتباع نمط حياة صحي.",

      evidences: [null, null, null, null],
    },
  },
];
import React, { useMemo, useState } from 'react';
import { type ReportFormData } from '../../types/ReportsTypes';
import Report from '../../Pages/Reports/Report';

const CATEGORY_FILTERS = ['الكل', 'تقارير النشاط', 'حصص النشاط'];

const TYPE_ICONS: Record<string, string> = {
  علمي: '🔬',
  رياضي: '⚽',
  ثقافي: '📚',
  اجتماعي: '🤝',
  تقني: '💻',
};

const getTypeIcon = (type: string) => TYPE_ICONS[type] ?? '📄';

interface MockReport {
  id: number;
  category: string;
  type: string;
  formData: Partial<ReportFormData>;
}

const MOCK_REPORTS: MockReport[] = [
  {
    id: 1,
    category: 'تقارير النشاط',
    type: 'تقني',
    formData: {
      schoolName: 'مدرسة الأمير عبد المجيد بن عبد العزيز',
      reportTitle: 'تطبيقات الذكاء الاصطناعي في التعليم',
      implementer: 'المعلم/ رائد الزهراني',
      location: 'معمل الحاسب الآلي',
      target: 'طلاب الصف الثاني ثانوي',
      beneficiaries: '34 طالب',
      date: '1447/06/28 هـ',
      objectives:
        '1- تحليل ومعالجة البيانات: مساعدة الطلاب على فهم البيانات واستغلالها.\n2- أتمتة المهام المعقدة والتعرف على تقنيات المستقبل.',
      evidences: [null, null, null, null],
    },
  },
  {
    id: 2,
    category: 'حصص النشاط',
    type: 'رياضي',
    formData: {
      schoolName: 'مدرسة ثقيف الثانوية',
      reportTitle: 'دوري الفصول لكرة القدم',
      implementer: 'الكابتن/ فهد الشمري',
      location: 'الملعب العشبي بالمدرسة',
      target: 'جميع طلاب المدرسة',
      beneficiaries: '120 طالب',
      date: '1447/07/15 هـ',
      objectives:
        '1- رفع مستوى اللياقة البدنية لدى الطلاب.\n2- غرس قيم التعاون والروح الرياضية والعمل الجماعي.',
      evidences: [null, null, null, null],
    },
  },
  {
    id: 3,
    category: 'تقارير النشاط',
    type: 'علمي',
    formData: {
      schoolName: 'مدرسة الفلاح المتوسطة',
      reportTitle: 'معرض الابتكارات العلمية',
      implementer: 'أ. خالد الدوسري',
      location: 'الساحة الداخلية',
      target: 'الطلاب وأولياء الأمور',
      beneficiaries: '200 زائر',
      date: '1447/08/02 هـ',
      objectives:
        '1- تحفيز التفكير الإبداعي والابتكار.\n2- تطبيق النظريات العلمية في نماذج ملموسة وواقعية.',
      evidences: [null, null, null, null],
    },
  },
  {
    id: 4,
    category: 'حصص النشاط',
    type: 'ثقافي',
    formData: {
      schoolName: 'مدرسة ابن خلدون الابتدائية',
      reportTitle: 'تحدي القراءة العربي - التصفيات',
      implementer: 'أ. محمد العتيبي',
      location: 'مصادر التعلم (المكتبة)',
      target: 'الطلاب الموهوبين',
      beneficiaries: '25 طالب',
      date: '1447/08/10 هـ',
      objectives:
        '1- تعزيز مهارات القراءة السريعة والفهم.\n2- تشجيع الطلاب على حب الكتاب والاطلاع المستمر.',
      evidences: [null, null, null, null],
    },
  },
];

interface ReportsPageProps {
  onBack?: () => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ onBack }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORY_FILTERS[0]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const selectedReport = useMemo(() => MOCK_REPORTS.find((r) => r.id === selectedId), [selectedId]);

  const filteredReports = useMemo(
    () => (activeCategory === 'الكل' ? MOCK_REPORTS : MOCK_REPORTS.filter((r) => r.category === activeCategory)),
    [activeCategory]
  );

  if (isCreatingNew) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsCreatingNew(false)}
          className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full bg-[#15213A] px-5 py-3 text-sm font-bold text-[#D9AE55] shadow-lg backdrop-blur-sm transition-transform hover:scale-105 hover:bg-[#0D1526] print:hidden"
        >
          <span className="text-xl leading-none">→</span>
          العودة للقائمة
        </button>
        <Report />
      </div>
    );
  }

  if (selectedReport) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full bg-[#15213A] px-5 py-3 text-sm font-bold text-[#D9AE55] shadow-lg backdrop-blur-sm transition-transform hover:scale-105 hover:bg-[#0D1526] print:hidden"
        >
          <span className="text-xl leading-none">→</span>
          العودة للقائمة
        </button>
        <Report />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen w-full overflow-x-hidden bg-[#F7F4EA] font-sans antialiased text-[#1B2233] selection:bg-[#D9AE55]/30 selection:text-[#15213A]">
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24">

        {/* Navigation Bar */}
        <div className="mb-10 flex items-center justify-between border-b border-[#E4DFC9] pb-6">
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex cursor-pointer items-center gap-2 text-sm font-bold tracking-wide text-[#5B6478] transition-colors hover:text-[#15213A]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#E4DFC9] text-lg leading-none transition-transform group-hover:translate-x-1">
              →
            </span>
            العودة للرئيسية
          </button>

          <span className="font-mono text-xs font-semibold text-[#9AA0AF]">
            سجل التقارير ({filteredReports.length})
          </span>
        </div>

        {/* Header */}
        <header className="mb-10">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#B8862E]">
            فهرس التقارير المدرسية
          </span>

          <h1 className="mb-3 font-serif text-3xl font-extrabold leading-snug tracking-tight text-[#15213A] sm:text-4xl">
            إدارة النماذج والتقارير
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-[#5B6478] sm:text-base">
            تصفح القوالب الجاهزة لتقارير الأنشطة وحصص النشاط. اختر التقرير المناسب للتعديل عليه واعتماده وطباعته مباشرة.
          </p>
        </header>

        {/* زر تقرير جديد */}
        <div className="mb-10">
          <button
            type="button"
            onClick={() => setIsCreatingNew(true)}
            className="group flex w-full items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[#B8862E]/50 bg-white px-6 py-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B8862E] hover:bg-[#FBF3DF]/40 hover:shadow-md sm:py-7"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#15213A] text-3xl font-light leading-none text-[#D9AE55] shadow-md transition-transform duration-200 group-hover:scale-110">
              +
            </span>

            <span className="flex flex-col items-start">
              <span className="font-serif text-lg font-extrabold text-[#15213A] sm:text-xl">تقرير جديد</span>
              <span className="mt-1 text-xs font-medium text-[#7A8194] sm:text-sm">إنشاء تقرير نشاط جديد</span>
            </span>
          </button>
        </div>

        {/* Categories */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {CATEGORY_FILTERS.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 cursor-pointer rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#15213A] text-[#D9AE55] shadow-sm'
                    : 'border border-[#E4DFC9] bg-white text-[#5B6478] hover:bg-[#FBF9F0] hover:text-[#15213A]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Reports Grid */}
        {filteredReports.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#E4DFC9] bg-white py-16 text-center text-[#5B6478]">
            <p className="text-sm font-medium">لا توجد تقارير متاحة لهذا التصنيف حاليًا.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
            {filteredReports.map((report) => {
              const preview = report.formData.objectives?.split('\n')[0] ?? 'لا توجد نبذة متاحة';

              return (
                <button
                  type="button"
                  key={report.id}
                  onClick={() => setSelectedId(report.id)}
                  className="group flex cursor-pointer flex-col justify-between rounded-xl border border-[#E4DFC9] bg-white p-6 text-right transition-all duration-200 hover:border-[#B8862E]/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#B8862E]/30"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#E4DFC9] bg-[#F7F4EA] text-xl shadow-sm">
                        {getTypeIcon(report.type)}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="rounded bg-[#F0EEE3] px-2 py-1 text-xs font-medium text-[#5B6478]">
                          {report.type}
                        </span>
                        <span className="rounded border border-[#E9D5A4] bg-[#FBF3DF] px-2 py-1 text-xs font-medium text-[#8B681F]">
                          {report.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="mb-2 font-serif text-base font-bold leading-snug text-[#15213A] transition-colors group-hover:text-[#8B681F]">
                      {report.formData.reportTitle}
                    </h3>

                    <p className="mb-6 line-clamp-2 text-xs leading-relaxed text-[#5B6478]">
                      الهدف: {preview}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#EEE8D6] pt-4 text-xs font-bold text-[#15213A] transition-colors group-hover:text-[#8B681F]">
                    <span>تعديل وطباعة التقرير</span>
                    <span className="text-base transition-transform duration-200 group-hover:-translate-x-1">←</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ReportsPage;
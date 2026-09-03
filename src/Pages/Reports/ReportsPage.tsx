import React, {
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  FileText,
  Plus,
  ClipboardList,
} from "lucide-react";

import type { ReportFormData } from "../../types/ReportsTypes";
import Report from "../../Pages/Reports/Report";

const CATEGORY_FILTERS = [
  "الكل",
  "تقارير النشاط",
  "حصص النشاط",
];

interface MockReport {
  id: number;
  category: string;
  type: string;
  formData: Partial<ReportFormData>;
}

const MOCK_REPORTS: MockReport[] = [
  {
    id: 1,
    category: "تقارير النشاط",
    type: "تقني",
    formData: {
      schoolName:
        "مدرسة الأمير عبد المجيد بن عبد العزيز",
      reportTitle:
        "تطبيقات الذكاء الاصطناعي في التعليم",
      implementer:
        "المعلم/ رائد الزهراني",
      location:
        "معمل الحاسب الآلي",
      target:
        "طلاب الصف الثاني ثانوي",
      beneficiaries:
        "34 طالب",
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
      schoolName:
        "مدرسة ثقيف الثانوية",
      reportTitle:
        "دوري الفصول لكرة القدم",
      implementer:
        "الكابتن/ فهد الشمري",
      location:
        "الملعب العشبي بالمدرسة",
      target:
        "جميع طلاب المدرسة",
      beneficiaries:
        "120 طالب",
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
      schoolName:
        "مدرسة الفلاح المتوسطة",
      reportTitle:
        "معرض الابتكارات العلمية",
      implementer:
        "أ. خالد الدوسري",
      location:
        "الساحة الداخلية",
      target:
        "الطلاب وأولياء الأمور",
      beneficiaries:
        "200 زائر",
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
      schoolName:
        "مدرسة ابن خلدون الابتدائية",
      reportTitle:
        "تحدي القراءة العربي - التصفيات",
      implementer:
        "أ. محمد العتيبي",
      location:
        "مصادر التعلم (المكتبة)",
      target:
        "الطلاب الموهوبين",
      beneficiaries:
        "25 طالب",
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

interface ReportsPageProps {
  onBack?: () => void;
}

const ReportsPage: React.FC<
  ReportsPageProps
> = ({ onBack }) => {
  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  const [isCreatingNew, setIsCreatingNew] =
    useState(false);

  const [activeCategory, setActiveCategory] =
    useState(CATEGORY_FILTERS[0]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const selectedReport =
    useMemo(
      () =>
        MOCK_REPORTS.find(
          (report) =>
            report.id === selectedId
        ),
      [selectedId]
    );

  const filteredReports =
    useMemo(
      () =>
        activeCategory === "الكل"
          ? MOCK_REPORTS
          : MOCK_REPORTS.filter(
              (report) =>
                report.category ===
                activeCategory
            ),
      [activeCategory]
    );

  /* =========================================================
     New Report
  ========================================================= */

  if (isCreatingNew) {
    return (
      <div
        dir="rtl"
        className="
          relative
          min-h-screen
          bg-[#111714]
        "
      >
        <button
          type="button"
          onClick={() =>
            setIsCreatingNew(false)
          }
          className="
            fixed
            right-4
            top-4
            z-50
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-[#3A463F]
            bg-[#171E1A]
            px-4
            py-2.5
            text-xs
            font-bold
            text-[#C8D0CA]
            shadow-xl
            transition-all
            duration-200
            hover:border-[#4A574F]
            hover:bg-[#202923]
            hover:text-[#E4E8E5]
            print:hidden
          "
        >
          <ArrowLeft
            size={14}
            className="rotate-180"
          />

          العودة للقائمة
        </button>

        <Report />
      </div>
    );
  }

  /* =========================================================
     Selected Report
  ========================================================= */

  if (selectedReport) {
    return (
      <div
        dir="rtl"
        className="
          relative
          min-h-screen
          bg-[#111714]
        "
      >
        <button
          type="button"
          onClick={() =>
            setSelectedId(null)
          }
          className="
            fixed
            right-4
            top-4
            z-50
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-[#3A463F]
            bg-[#171E1A]
            px-4
            py-2.5
            text-xs
            font-bold
            text-[#C8D0CA]
            shadow-xl
            transition-all
            duration-200
            hover:border-[#4A574F]
            hover:bg-[#202923]
            hover:text-[#E4E8E5]
            print:hidden
          "
        >
          <ArrowLeft
            size={14}
            className="rotate-180"
          />

          العودة للقائمة
        </button>

        <Report />
      </div>
    );
  }

  /* =========================================================
     Main
  ========================================================= */

  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#111714]
        font-sans
        antialiased
        text-[#E5E9E5]
        selection:bg-[#B39A63]/20
        selection:text-[#E5E9E5]
      "
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,0.012) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255,255,255,0.012) 1px,
            transparent 1px
          )
        `,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Ambient background */}

      <div
        className="
          pointer-events-none
          fixed
          inset-x-0
          top-0
          h-72
          bg-[radial-gradient(circle_at_50%_-20%,rgba(145,163,148,0.09),transparent_65%)]
        "
      />

      <main
        className="
          relative
          mx-auto
          max-w-6xl
          px-5
          pb-16
          pt-8
          sm:px-8
          sm:pb-20
          sm:pt-12
        "
      >
        {/* =====================================================
            Navigation
        ===================================================== */}

        <div
          className="
            mb-10
            flex
            items-center
            justify-between
            border-b
            border-[#29332D]
            pb-6
          "
        >
          <button
            type="button"
            onClick={handleBack}
            className="
              group
              inline-flex
              cursor-pointer
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#89938C]
              transition-colors
              hover:text-[#D8DED9]
            "
          >
            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-[#303A34]
                bg-[#171E1A]
                text-[#89938C]
                transition-all
                duration-200
                group-hover:-translate-x-0.5
                group-hover:border-[#4A574F]
                group-hover:bg-[#202923]
                group-hover:text-[#D8DED9]
              "
            >
              <ArrowLeft
                size={14}
                className="rotate-180"
              />
            </span>

            العودة للرئيسية
          </button>

          <span
            className="
              rounded-md
              border
              border-[#29332D]
              bg-[#151B18]
              px-2.5
              py-1.5
              font-mono
              text-[10px]
              font-semibold
              text-[#68756D]
            "
          >
            سجل التقارير ·{" "}
            {filteredReports.length}
          </span>
        </div>

        {/* =====================================================
            Header
        ===================================================== */}

        <header className="mb-10">
          <div
            className="
              mb-3
              flex
              items-center
              gap-2
              text-[10px]
              font-bold
              tracking-[0.12em]
              text-[#B39A63]
            "
          >
            <ClipboardList
              size={13}
              strokeWidth={1.7}
            />

            فهرس التقارير المدرسية
          </div>

          <h1
            className="
              mb-3
              text-3xl
              font-bold
              leading-snug
              tracking-tight
              text-[#E7EAE6]
              sm:text-4xl
            "
          >
            إدارة النماذج والتقارير
          </h1>

          <p
            className="
              max-w-xl
              text-sm
              leading-7
              text-[#7F8A82]
              sm:text-base
            "
          >
            تصفح القوالب الجاهزة لتقارير
            الأنشطة وحصص النشاط، أو أنشئ
            تقريرًا جديدًا وعدّله واطبعه
            مباشرة.
          </p>
        </header>

        {/* =====================================================
            New Report
        ===================================================== */}

        <div className="mb-10">
          <button
            type="button"
            onClick={() =>
              setIsCreatingNew(true)
            }
            className="
              group
              flex
              w-full
              cursor-pointer
              items-center
              justify-center
              gap-4
              rounded-2xl
              border
              border-[#3A463F]
              bg-[#171E1A]
              px-6
              py-6
              text-center
              shadow-[0_10px_35px_rgba(0,0,0,0.10)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#4A574F]
              hover:bg-[#1A221E]
              hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)]
              sm:py-7
            "
          >
            <span
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[#354039]
                bg-[#202923]
                text-[#B39A63]
                transition-all
                duration-300
                group-hover:border-[#4A574F]
                group-hover:bg-[#29352E]
              "
            >
              <Plus
                size={21}
                strokeWidth={1.7}
              />
            </span>

            <span
              className="
                flex
                flex-col
                items-start
              "
            >
              <span
                className="
                  text-base
                  font-bold
                  text-[#E1E6E2]
                  sm:text-lg
                "
              >
                تقرير جديد
              </span>

              <span
                className="
                  mt-1
                  text-xs
                  font-medium
                  text-[#68756D]
                "
              >
                إنشاء تقرير نشاط جديد
              </span>
            </span>

            <ArrowLeft
              size={15}
              className="
                mr-auto
                hidden
                text-[#68756D]
                transition-transform
                duration-200
                group-hover:-translate-x-1
                sm:block
              "
            />
          </button>
        </div>

        {/* =====================================================
            Categories
        ===================================================== */}

        <div
          className="
            mb-8
            flex
            gap-2
            overflow-x-auto
            pb-2
          "
        >
          {CATEGORY_FILTERS.map(
            (category) => {
              const isActive =
                activeCategory ===
                category;

              return (
                <button
                  type="button"
                  key={category}
                  onClick={() =>
                    setActiveCategory(
                      category
                    )
                  }
                  className={`
                    shrink-0
                    cursor-pointer
                    rounded-lg
                    border
                    px-5
                    py-2.5
                    text-xs
                    font-bold
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "border-[#3A463F] bg-[#202923] text-[#D5DDD7] shadow-sm"
                        : "border-[#303A34] bg-[#171E1A] text-[#78847C] hover:border-[#46534B] hover:bg-[#1A221E] hover:text-[#C7CEC9]"
                    }
                  `}
                >
                  {category}
                </button>
              );
            }
          )}
        </div>

        {/* =====================================================
            Empty
        ===================================================== */}

        {filteredReports.length ===
        0 ? (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-[#354039]
              bg-[#151B18]
              py-20
              text-center
            "
          >
            <div
              className="
                mx-auto
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-[#303A34]
                bg-[#1A211D]
                text-[#68756D]
              "
            >
              <FileText
                size={18}
                strokeWidth={1.6}
              />
            </div>

            <p
              className="
                text-sm
                font-semibold
                text-[#89938C]
              "
            >
              لا توجد تقارير متاحة
              لهذا التصنيف حاليًا.
            </p>
          </div>
        ) : (
          /* ===================================================
             Reports Grid
          =================================================== */

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              sm:gap-5
              md:grid-cols-3
            "
          >
            {filteredReports.map(
              (report) => {
                const preview =
                  report.formData.objectives
                    ?.split("\n")[0] ??
                  "لا توجد نبذة متاحة";

                return (
                  <button
                    type="button"
                    key={report.id}
                    onClick={() =>
                      setSelectedId(
                        report.id
                      )
                    }
                    className="
                      group
                      flex
                      min-h-[330px]
                      cursor-pointer
                      flex-col
                      justify-between
                      rounded-2xl
                      border
                      border-[#303A34]
                      bg-[#171E1A]
                      p-6
                      text-right
                      shadow-[0_8px_30px_rgba(0,0,0,0.10)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#46534B]
                      hover:bg-[#1A221E]
                      hover:shadow-[0_15px_40px_rgba(0,0,0,0.16)]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#91A394]/20
                    "
                  >
                    <div>
                      {/* Top */}

                      <div
                        className="
                          mb-6
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >
                        <span
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-[#354039]
                            bg-[#202923]
                            text-[#B39A63]
                          "
                        >
                          <FileText
                            size={18}
                            strokeWidth={1.6}
                          />
                        </span>

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                          "
                        >
                          <span
                            className="
                              rounded-md
                              border
                              border-[#354039]
                              bg-[#202923]
                              px-2
                              py-1
                              text-[9px]
                              font-semibold
                              text-[#899A8F]
                            "
                          >
                            {report.type}
                          </span>

                          <span
                            className="
                              rounded-md
                              border
                              border-[#3A4038]
                              bg-[#1A211D]
                              px-2
                              py-1
                              text-[9px]
                              font-semibold
                              text-[#A99A76]
                            "
                          >
                            {report.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}

                      <h3
                        className="
                          mb-3
                          text-base
                          font-bold
                          leading-7
                          text-[#E1E6E2]
                          transition-colors
                          group-hover:text-[#C9D2CC]
                        "
                      >
                        {
                          report.formData
                            .reportTitle
                        }
                      </h3>

                      <p
                        className="
                          mb-6
                          line-clamp-3
                          text-xs
                          leading-7
                          text-[#7D8981]
                        "
                      >
                        الهدف:{" "}
                        {preview}
                      </p>
                    </div>

                    {/* Footer */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        border-t
                        border-[#29332D]
                        pt-4
                        text-xs
                        font-bold
                        text-[#89978E]
                        transition-colors
                        group-hover:text-[#C5CEC8]
                      "
                    >
                      <span>
                        تعديل وطباعة التقرير
                      </span>

                      <span
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-[#303A34]
                          transition-all
                          duration-200
                          group-hover:border-[#4A574F]
                          group-hover:bg-[#202923]
                        "
                      >
                        <ArrowLeft
                          size={13}
                        />
                      </span>
                    </div>
                  </button>
                );
              }
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ReportsPage;
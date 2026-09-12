import React, { useRef, useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ClipboardList,
  School,
  UserRound,
  MapPin,
  FileText,
  Printer,
  FileDown,
  ImageDown,
  Loader2,
} from "lucide-react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { useUser } from "../../context/Context";

import {
  ActivityPlan,
  type PlanRow,
} from "../../Components/Activity-Plan/ActivityPlan";

/* =========================================================
   Types
========================================================= */

interface ActivityPlanData {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  sessions: number;
  type: string;
  description: string;
  rows: PlanRow[];
}

interface ActivityPlanDetailProps {
  plan: ActivityPlanData;
  onBack: () => void;
}

interface InfoInputProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
}

/* =========================================================
   Info Input
========================================================= */

const InfoInput: React.FC<InfoInputProps> = ({
  icon,
  label,
  value,
  onChange,
  editable = false,
}) => {
  return (
    <div className="rounded-xl border border-[#303A34] bg-[#151B18] p-4">
      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold text-[#68756D]">
        <span className="text-[#B39A63]">
          {icon}
        </span>

        {label}
      </div>

      {editable ? (
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="
            w-full
            bg-transparent
            text-xs
            font-bold
            text-[#C5CEC8]
            outline-none
            placeholder:text-[#59665E]
          "
        />
      ) : (
        <p className="text-xs font-bold text-[#C5CEC8]">
          {value || "غير محدد"}
        </p>
      )}
    </div>
  );
};

/* =========================================================
   Detail
========================================================= */

const ActivityPlanDetail: React.FC<ActivityPlanDetailProps> = ({
  plan,
  onBack,
}) => {
  const {
    managerName,
    schoolName,
    teacherName,
    region,
  } = useUser();

  const [schoolData, setSchoolData] = useState({
    schoolName: schoolName || "",
    region: region || "",
    managerName: managerName || "",
    teacherName: teacherName || "",
  });

  const [showPlan, setShowPlan] = useState(false);

  /* =====================================================
     EXPORT
  ===================================================== */

  const planPrintRef = useRef<HTMLDivElement>(null);

  const [exporting, setExporting] = useState<
    "pdf" | "png" | null
  >(null);

  /* =====================================================
     UPDATE FIELD
  ===================================================== */

  const updateField = (
    field: keyof typeof schoolData,
    value: string
  ) => {
    setSchoolData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =====================================================
     FILE NAME
  ===================================================== */

  const getFileName = () => {
    const cleanTitle = plan.title
      .trim()
      .replace(/[\\/:*?"<>|]/g, "")
      .replace(/\s+/g, "-");

    return cleanTitle || "خطة-النشاط";
  };

  /* =====================================================
     PRINT
  ===================================================== */

  const handlePrint = () => {
    window.print();
  };

  /* =====================================================
     DOWNLOAD PNG
  ===================================================== */

  const handleDownloadPng = async () => {
    if (!planPrintRef.current || exporting) {
      return;
    }

    try {
      setExporting("png");

      const element = planPrintRef.current;

      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");

      link.href = image;
      link.download = `${getFileName()}.png`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("PNG export failed:", error);
    } finally {
      setExporting(null);
    }
  };

  /* =====================================================
     DOWNLOAD PDF
  ===================================================== */

  const handleDownloadPdf = async () => {
    if (!planPrintRef.current || exporting) {
      return;
    }

    try {
      setExporting("pdf");

      const element = planPrintRef.current;

      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageWidth = 210;
      const pageHeight = 297;

      const imageWidth = pageWidth;

      const imageHeight =
        (canvas.height * imageWidth) / canvas.width;

      let remainingHeight = imageHeight;
      let position = 0;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imageWidth,
        imageHeight,
        undefined,
        "FAST"
      );

      remainingHeight -= pageHeight;

      while (remainingHeight > 0) {
        position -= pageHeight;

        pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          imageWidth,
          imageHeight,
          undefined,
          "FAST"
        );

        remainingHeight -= pageHeight;
      }

      pdf.save(`${getFileName()}.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
    } finally {
      setExporting(null);
    }
  };

  /* =====================================================
     PRINT STYLES
  ===================================================== */

  const printStyles = `
    @media print {

      @page {
        size: A4;
        margin: 0;
      }

      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
      }

      body * {
        visibility: hidden !important;
      }

      .activity-plan-print-root,
      .activity-plan-print-root * {
        visibility: visible !important;
      }

      .activity-plan-print-root {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 210mm !important;
        max-width: 210mm !important;
        background: white !important;
        box-shadow: none !important;
      }

      .activity-plan-toolbar {
        display: none !important;
      }
    }
  `;

  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        bg-[#111714]
        font-sans
        text-[#E5E9E5]
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
      <style>{printStyles}</style>

      {/* =====================================================
          AMBIENT
      ===================================================== */}

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

      <main className="relative mx-auto max-w-5xl px-5 pb-16 pt-8 sm:px-8 sm:pt-12">

        {/* =====================================================
            NAVIGATION
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
            onClick={onBack}
            className="
              group
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#89938C]
              transition
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
                transition
                group-hover:border-[#4A574F]
                group-hover:bg-[#202923]
              "
            >
              <ArrowLeft
                size={14}
                className="rotate-180"
              />
            </span>

            العودة للخطط
          </button>

          <span
            className="
              rounded-md
              border
              border-[#29332D]
              bg-[#151B18]
              px-2.5
              py-1.5
              text-[10px]
              font-semibold
              text-[#68756D]
            "
          >
            خطة النشاط
          </span>
        </div>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold text-[#B39A63]">
            <ClipboardList size={13} />
            تفاصيل النشاط
          </div>

          <h1 className="mb-3 text-3xl font-bold tracking-tight text-[#E7EAE6] sm:text-4xl">
            {plan.title}
          </h1>

          <p className="max-w-2xl text-sm leading-7 text-[#7F8A82] sm:text-base">
            {plan.description}
          </p>
        </header>

        {/* =====================================================
            SCHOOL INFORMATION
        ===================================================== */}

        <section
          className="
            mb-5
            rounded-2xl
            border
            border-[#303A34]
            bg-[#171E1A]
            p-5
          "
        >
          <SectionHeader
            icon={<School size={17} />}
            title="بيانات المدرسة"
            description="يمكنك تعديل البيانات التي ستظهر في الخطة."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoInput
              icon={<School size={15} />}
              label="اسم المدرسة"
              value={schoolData.schoolName}
              onChange={(value) =>
                updateField("schoolName", value)
              }
              editable
            />

            <InfoInput
              icon={<MapPin size={15} />}
              label="المنطقة"
              value={schoolData.region}
              onChange={(value) =>
                updateField("region", value)
              }
              editable
            />

            <InfoInput
              icon={<UserRound size={15} />}
              label="مدير المدرسة"
              value={schoolData.managerName}
              onChange={(value) =>
                updateField("managerName", value)
              }
              editable
            />

            <InfoInput
              icon={<UserRound size={15} />}
              label="المنفذ"
              value={schoolData.teacherName}
              onChange={(value) =>
                updateField("teacherName", value)
              }
              editable
            />
          </div>
        </section>

        {/* =====================================================
            ACTIVITY INFORMATION
        ===================================================== */}

        <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoInput
            icon={<CalendarDays size={16} />}
            label="البداية"
            value={plan.startDate}
          />

          <InfoInput
            icon={<CalendarDays size={16} />}
            label="النهاية"
            value={plan.endDate}
          />

          <InfoInput
            icon={<Clock3 size={16} />}
            label="عدد الحصص"
            value={`${plan.sessions} حصص`}
          />
        </section>

        {/* =====================================================
            PLAN PREVIEW BUTTON
        ===================================================== */}

        <section
          className="
            mb-5
            rounded-2xl
            border
            border-[#303A34]
            bg-[#171E1A]
            p-5
          "
        >
          <SectionHeader
            icon={<FileText size={17} />}
            title="الخطة الرسمية"
            description="اعرض نموذج خطة النشاط بالبيانات المحددة أعلاه."
          />

          <button
            type="button"
            onClick={() => setShowPlan(true)}
            className="
              flex
              w-full
              cursor-pointer
              items-center
              justify-between
              rounded-xl
              border
              border-[#354039]
              bg-[#202923]
              px-4
              py-4
              text-sm
              font-bold
              text-[#C5CEC8]
              transition-all
              hover:border-[#4A574F]
              hover:bg-[#252F29]
              hover:text-[#E0E5E1]
            "
          >
            <span>
              استعراض نموذج الخطة
            </span>

            <ArrowLeft size={16} />
          </button>
        </section>

        {/* =====================================================
            PLAN CONTENT
        ===================================================== */}

        <section
          className="
            rounded-2xl
            border
            border-[#303A34]
            bg-[#171E1A]
            p-5
          "
        >
          <SectionHeader
            icon={<ClipboardList size={17} />}
            title="تفاصيل الخطة"
            description="البيانات الموجودة داخل نموذج خطة النشاط."
          />

          <div
            className="
              rounded-xl
              border
              border-dashed
              border-[#354039]
              bg-[#151B18]
              px-5
              py-8
            "
          >
            <div className="space-y-3 text-xs text-[#89978E]">
              <div className="flex justify-between gap-4">
                <span>نوع النشاط</span>

                <span className="font-bold text-[#C5CEC8]">
                  {plan.type}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>عدد بنود الخطة</span>

                <span className="font-bold text-[#C5CEC8]">
                  {plan.rows.length}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FULL PLAN PREVIEW
      ===================================================== */}

      {showPlan && (
        <div
          className="
            fixed
            inset-0
            z-50
            overflow-auto
            bg-black/80
            p-3
            sm:p-5
            md:p-8
          "
        >
          {/* =================================================
              TOOLBAR
          ================================================= */}

          <div
            className="
              activity-plan-toolbar
              mx-auto
              mb-5
              flex
              max-w-[900px]
              flex-col
              gap-3
              rounded-xl
              border
              border-[#303A34]
              bg-[#171E1A]
              p-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* TITLE */}

            <div className="flex items-center gap-3 px-2">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-[#354039]
                  bg-[#202923]
                  text-[#B39A63]
                "
              >
                <FileText size={16} />
              </div>

              <div>
                <p className="text-xs font-bold text-[#DDE3DE]">
                  معاينة خطة النشاط
                </p>

                <p className="mt-0.5 text-[10px] text-[#68756D]">
                  {plan.title}
                </p>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="flex flex-wrap items-center gap-2">
              {/* PRINT */}


              {/* PDF */}

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={exporting !== null}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-[#405047]
                  bg-[#243029]
                  px-3
                  py-2.5
                  text-xs
                  font-bold
                  text-[#DCE2DD]
                  transition
                  hover:border-[#53625A]
                  hover:bg-[#2B372F]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {exporting === "pdf" ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <FileDown size={15} />
                )}

                <span>
                  {exporting === "pdf"
                    ? "جاري التحميل..."
                    : "تحميل PDF"}
                </span>
              </button>

              {/* PNG */}

              <button
                type="button"
                onClick={handleDownloadPng}
                disabled={exporting !== null}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-[#405047]
                  bg-[#243029]
                  px-3
                  py-2.5
                  text-xs
                  font-bold
                  text-[#DCE2DD]
                  transition
                  hover:border-[#53625A]
                  hover:bg-[#2B372F]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {exporting === "png" ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <ImageDown size={15} />
                )}

                <span>
                  {exporting === "png"
                    ? "جاري التحميل..."
                    : "تحميل PNG"}
                </span>
              </button>

              {/* CLOSE */}

              <button
                type="button"
                onClick={() => setShowPlan(false)}
                disabled={exporting !== null}
                className="
                  rounded-lg
                  border
                  border-[#354039]
                  bg-transparent
                  px-3
                  py-2.5
                  text-xs
                  font-bold
                  text-[#89938C]
                  transition
                  hover:bg-[#202923]
                  hover:text-[#DDE3DE]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                إغلاق
              </button>
            </div>
          </div>

          {/* =================================================
              ACTUAL PLAN
          ================================================= */}

          <div
            ref={planPrintRef}
            className="
              activity-plan-print-root
              mx-auto
              w-fit
              bg-white
              shadow-2xl
            "
          >
            <ActivityPlan
              title="خطة الأنشطة الطلابية"
              stage={`المرحلة الثانوية - مجال ${plan.type}`}
              semester="الفصل الدراسي الأول ١٤٤٨هـ"
              schoolName={schoolData.schoolName}
              region={schoolData.region}
              teacherName={schoolData.teacherName}
              managerName={schoolData.managerName}
              rows={plan.rows}
            />
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   Section Header
========================================================= */

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-a
          border
          border-[#354039]
          bg-[#202923]
          text-[#B39A63]
        "
      >
        {icon}
      </div>

      <div>
        <h2 className="text-sm font-bold text-[#DDE3DE]">
          {title}
        </h2>

        <p className="mt-1 text-xs text-[#6F7B73]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ActivityPlanDetail;

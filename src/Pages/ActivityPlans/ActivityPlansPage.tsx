import React, { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  Mic2,
  ClipboardList,
  BookOpen,
  Plane,
} from "lucide-react";
import ActivityPlanDetail from "./ActivityPlanDetail";

import {
  nationalDaysPlanRows,
  citizenshipPlanRows,
  cultureAndArtsPlanRows,
  sportsAndHealthPlanRows,
  scienceAndTechnologyPlanRows,
  scoutingPlanRows,
  extracurricularPlanRows,
} from "../../data/activityPlansData";

import type { PlanRow } from "../../Components/Activity-Plan/ActivityPlan";


interface ActivityPlan {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  sessions: number;
  type: string;
  description: string;
    rows: PlanRow[]; // مهم جدًا
}

interface ActivityPlansPageProps {
  onBack?: () => void;
}

const ACTIVITY_PLANS: ActivityPlan[] = [
  {
    id: 1,
    title: "المواطنة والحياة",
    startDate: "1448/3/10",
    endDate: "1448/7/22",
    sessions: 18,
    type: "المواطنة والحياة",
    description: "خطة تهدف إلى تعزيز قيم المواطنة والانتماء والمسؤولية.",
    rows: citizenshipPlanRows,
  },

  {
    id: 2,
    title: "الثقافة والفنون",
    startDate: "1448/3/10",
    endDate: "1448/7/22",
    sessions: 18,
    type: "الثقافة والفنون",
    description: "خطة للأنشطة الثقافية والفنية والإبداعية.",
    rows: cultureAndArtsPlanRows,
  },

  {
    id: 3,
    title: "الرياضة والصحة",
    startDate: "1448/3/10",
    endDate: "1448/7/22",
    sessions: 18,
    type: "الرياضة والصحة",
    description: "خطة تهتم بالصحة والنشاط البدني واللياقة.",
    rows: sportsAndHealthPlanRows,
  },

  {
    id: 4,
    title: "العلوم والتقنية",
    startDate: "1448/3/10",
    endDate: "1448/7/22",
    sessions: 18,
    type: "العلوم والتقنية",
    description: "خطة للأنشطة العلمية والتقنية والابتكار.",
    rows: scienceAndTechnologyPlanRows,
  },

  {
    id: 5,
    title: "النشاط الكشفي",
    startDate: "1448/3/10",
    endDate: "1448/7/22",
    sessions: 18,
    type: "النشاط الكشفي",
    description: "خطة للأنشطة الكشفية والمهارات والمبادرات.",
    rows: scoutingPlanRows,
  },

  {
    id: 6,
    title: "الأنشطة اللاصفية",
    startDate: "1448/3/10",
    endDate: "1448/7/22",
    sessions: 18,
    type: "الأنشطة اللاصفية",
    description: "خطة للأنشطة الطلابية المتنوعة خارج الحصص الدراسية.",
    rows: extracurricularPlanRows,
  },

  {
    id: 7,
    title: "الأيام والمناسبات",
    startDate: "1448/3/10",
    endDate: "1448/7/22",
    sessions: 18,
    type: "الأيام والمناسبات",
    description: "خطة تتضمن أهم الأيام والمناسبات والفعاليات المدرسية.",
    rows: nationalDaysPlanRows,
  },
];
const ActivityPlansPage: React.FC<ActivityPlansPageProps> = ({
  onBack,
}) => {
  const [selectedPlan, setSelectedPlan] =
    useState<ActivityPlan | null>(null);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  if (selectedPlan) {
  return (
    <ActivityPlanDetail
      plan={selectedPlan}
      onBack={() => setSelectedPlan(null)}
    />
  );
}

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
            الخطط · {ACTIVITY_PLANS.length}
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

            خطط الأنشطة الطلابية
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
            خطط الأنشطة
          </h1>

          <p
            className="
              max-w-2xl
              text-sm
              leading-7
              text-[#7F8A82]
              sm:text-base
            "
          >
            استعرض خطط الأنشطة الطلابية، وتعرف
            على مدتها وعدد حصصها، ثم افتح الخطة
            أو أنشئ تقريرًا أو إذاعة مرتبطة بها.
          </p>
        </header>

        {/* =====================================================
            Grid
        ===================================================== */}

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
          {ACTIVITY_PLANS.map((plan) => (
            <article
              key={plan.id}
              className="
                group
                flex
                min-h-[390px]
                flex-col
                rounded-2xl
                border
                border-[#303A34]
                bg-[#171E1A]
                p-5
                text-right
                shadow-[0_8px_30px_rgba(0,0,0,0.10)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#46534B]
                hover:bg-[#1A221E]
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.16)]
              "
            >
              {/* Top */}

              <div
                className="
                  mb-5
                  flex
                  items-start
                  justify-between
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#354039]
                    bg-[#202923]
                    text-[#B39A63]
                  "
                >
                  <ClipboardList
                    size={18}
                    strokeWidth={1.6}
                  />
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    justify-end
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
                    {plan.type}
                  </span>

                 
                </div>
              </div>

              {/* Main content */}

              <div className="flex-1">
                <h3
                  className="
                    mb-2
                    text-base
                    font-bold
                    leading-7
                    text-[#E1E6E2]
                    transition-colors
                    group-hover:text-[#C9D2CC]
                  "
                >
                  {plan.title}
                </h3>

                <p
                  className="
                    mb-5
                    line-clamp-3
                    text-xs
                    leading-6
                    text-[#7D8981]
                  "
                >
                  {plan.description}
                </p>

                {/* Dates */}

                <div
                  className="
                    mb-3
                    rounded-xl
                    border
                    border-[#29332D]
                    bg-[#151B18]
                    p-3
                  "
                >
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      font-bold
                      text-[#68756D]
                    "
                  >
                    <CalendarDays size={13} />

                    مدة النشاط
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-2
                      text-xs
                      font-semibold
                      text-[#BFC7C1]
                    "
                  >
                    <span>
                      {plan.startDate}
                    </span>

                    <ArrowLeft
                      size={12}
                      className="shrink-0 text-[#59665E]"
                    />

                    <span>
                      {plan.endDate}
                    </span>
                  </div>
                </div>

                {/* Sessions */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-[#29332D]
                    bg-[#151B18]
                    px-3
                    py-2.5
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      font-bold
                      text-[#68756D]
                    "
                  >
                    <Clock3 size={13} />

                    عدد الحصص
                  </div>

                  <span
                    className="
                      text-xs
                      font-bold
                      text-[#B9C3BC]
                    "
                  >
                    {plan.sessions} حصص
                  </span>
                </div>
              </div>

              {/* Actions */}

              <div
                className="
                  mt-5
                  border-t
                  border-[#29332D]
                  pt-4
                "
              >
                {/* View */}

                <button
                  type="button"
                  onClick={() =>
                    setSelectedPlan(plan)
                  }
                  className="
                    mb-2.5
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-[#354039]
                    bg-[#202923]
                    px-3.5
                    py-3
                    text-xs
                    font-bold
                    text-[#C5CEC8]
                    transition-all
                    hover:border-[#4A574F]
                    hover:bg-[#252F29]
                    hover:text-[#E0E5E1]
                  "
                >
                  <span>
                    استعراض الخطة
                  </span>

                  <ArrowLeft
                    size={14}
                  />
                </button>

                {/* Secondary actions */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-2
                  "
                >
                  <button
                    type="button"
                    className="
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      gap-1.5
                      rounded-xl
                      border
                      border-[#303A34]
                      bg-[#171E1A]
                      px-2
                      py-2.5
                      text-[10px]
                      font-bold
                      text-[#89978E]
                      transition-all
                      hover:border-[#46534B]
                      hover:bg-[#202923]
                      hover:text-[#C5CEC8]
                    "
                  >
                    <FileText
                      size={13}
                    />

                    عمل تقرير
                  </button>

                  <button
                    type="button"
                    className="
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      gap-1.5
                      rounded-xl
                      border
                      border-[#303A34]
                      bg-[#171E1A]
                      px-2
                      py-2.5
                      text-[10px]
                      font-bold
                      text-[#89978E]
                      transition-all
                      hover:border-[#46534B]
                      hover:bg-[#202923]
                      hover:text-[#C5CEC8]
                    "
                  >
                    <Mic2
                      size={13}
                    />

                    عمل إذاعة
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

interface InfoBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  icon,
  label,
  value,
}) => {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#303A34]
        bg-[#171E1A]
        p-4
      "
    >
      <div
        className="
          mb-2
          flex
          items-center
          gap-2
          text-[10px]
          font-bold
          text-[#68756D]
        "
      >
        <span className="text-[#B39A63]">
          {icon}
        </span>

        {label}
      </div>

      <p
        className="
          text-xs
          font-bold
          text-[#C5CEC8]
        "
      >
        {value}
      </p>
    </div>
  );
};

export default ActivityPlansPage;

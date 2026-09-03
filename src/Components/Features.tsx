import React from "react";
import {
  Sparkles,
  Layers3,
  FileDown,
  SlidersHorizontal,
  BookOpen,
  Clock3,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "إنشاء ذكي",
    description:
      "حوّل فكرة بسيطة إلى محتوى مدرسي منظم دون الحاجة إلى كتابة كل شيء من الصفر.",
  },
  {
    icon: SlidersHorizontal,
    title: "محتوى يناسب احتياجك",
    description:
      "اختر نوع المحتوى والمرحلة الدراسية، ثم عدّل الناتج بالطريقة التي تناسبك.",
  },
  {
    icon: Layers3,
    title: "محتوى منظم",
    description:
      "الإذاعات والتقارير تُبنى في أقسام واضحة تجعل استخدامها وتعديلها أسهل.",
  },
  {
    icon: FileDown,
    title: "جاهز للاستخدام",
    description:
      "بعد إنشاء المحتوى يمكنك الانتقال مباشرة إلى صفحة العرض والتنسيق والطباعة.",
  },
  {
    icon: BookOpen,
    title: "نماذج جاهزة",
    description:
      "ابدأ من نموذج موجود بدل كتابة الفكرة من البداية، ثم عدّله حسب احتياجك.",
  },
  {
    icon: Clock3,
    title: "يوفر وقتك",
    description:
      "اختصر خطوات التحضير المتكررة وركز على المحتوى بدل الأعمال الروتينية.",
  },
];

const Features: React.FC = () => {
  return (
    <section dir="rtl">

      <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.12em] text-[#4D806F]">
            لماذا المساعد المدرسي؟
          </p>

          <h2 className="text-3xl font-bold tracking-[-0.035em] text-[#17231F] sm:text-4xl">
            أدوات بسيطة،
            <br className="sm:hidden" />
            <span className="text-[#285C4D]"> لعمل يومي أسهل.</span>
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-[#74817B]">
          صممنا الأدوات حول المهام التي تتكرر في البيئة المدرسية،
          بحيث يكون الوصول إلى النتيجة أسرع وأوضح.
        </p>

      </div>

      <div className="grid overflow-hidden rounded-2xl border border-[#DDE6E2] bg-white sm:grid-cols-2 lg:grid-cols-3">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className={[
                "group relative p-7 transition-colors hover:bg-[#FAFCFB] sm:p-8",
                index % 3 !== 2 ? "lg:border-l border-[#E4EBE7]" : "",
                index < 3 ? "lg:border-b border-[#E4EBE7]" : "",
                index % 2 === 0 ? "sm:border-l border-[#E4EBE7] lg:border-l-0" : "",
                index < 4 ? "sm:border-b border-[#E4EBE7] lg:border-b-0" : "",
              ].join(" ")}
            >

              <div className="mb-12 flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF5F1] text-[#285C4D] transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <span className="font-mono text-[10px] font-bold text-[#B0BCB6]">
                  0{index + 1}
                </span>

              </div>

              <h3 className="text-base font-bold text-[#24332D]">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#74817B]">
                {feature.description}
              </p>

            </article>
          );
        })}

      </div>
    </section>
  );
};

export default Features;

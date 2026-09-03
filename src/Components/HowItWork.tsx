import React from "react";
import {
  ArrowLeft,
  FileCheck2,
  PencilLine,
  WandSparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PencilLine,
    title: "اكتب فكرتك",
    description:
      "حدد الموضوع الذي تريد العمل عليه، حتى لو كانت فكرتك مجرد سطر واحد.",
  },
  {
    number: "02",
    icon: WandSparkles,
    title: "أنشئ المحتوى",
    description:
      "حوّل فكرتك إلى محتوى منظم يناسب النشاط والبيئة المدرسية.",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "عدّل واستخدم",
    description:
      "راجع المحتوى وعدّله كما تريد، ثم احفظه أو اطبعه عندما يصبح جاهزًا.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-[#29332D] py-24"
    >
      <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="mb-3 text-xs font-bold text-[#B39A63]">
            طريقة العمل
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#E7EAE6] sm:text-4xl">
            من الفكرة إلى المحتوى.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-[#89938C]">
          صممنا التجربة بحيث تكون قصيرة وواضحة، بدون خطوات كثيرة أو واجهات
          معقدة.
        </p>
      </div>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-[#303A34] bg-[#303A34] md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <article
              key={step.number}
              className="group relative bg-[#171E1A] p-7 transition hover:bg-[#1A221E] sm:p-9"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-mono text-xs text-[#58645C]">
                  {step.number}
                </span>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#354039] bg-[#202923] text-[#91A394] transition group-hover:border-[#4A574F]">
                  <Icon size={18} />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#E1E6E1]">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#87918A]">
                {step.description}
              </p>

              <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-[#68766D]">
                {step.number !== "03" ? "التالي" : "جاهز للاستخدام"}
                <ArrowLeft size={13} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
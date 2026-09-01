import React from "react";

const levels = [
  {
    number: "01",
    title: "المرحلة الابتدائية",
    grades: "الصفوف 1 — 6",
    desc: "لغة واضحة وبسيطة، موضوعات قريبة من عالم الطالب، وفقرات قصيرة تحافظ على الانتباه.",
  },
  {
    number: "02",
    title: "المرحلة المتوسطة",
    grades: "الصفوف 7 — 9",
    desc: "محتوى أكثر نضجًا يوازن بين القيم والمهارات والموضوعات التي تهم الطالب في هذه المرحلة.",
  },
  {
    number: "03",
    title: "المرحلة الثانوية",
    grades: "الصفوف 10 — 12",
    desc: "طرح أعمق ولغة أكثر رسمية تناسب النقاشات والقضايا المعاصرة واهتمامات الطلاب.",
  },
];

const SchoolLevels: React.FC = () => {
  return (
    <section dir="rtl" className="py-24 sm:py-28">
      <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.15em] text-[#9a7327]">
            مصمم للتعليم
          </p>

          <h2 className="text-3xl font-bold tracking-[-0.035em] text-[#1b211d] sm:text-4xl">
            المحتوى يتغير مع
            <br className="sm:hidden" /> المرحلة.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-[#70766f]">
          لا نستخدم نفس الأسلوب لكل الطلاب. المولّد يغيّر مستوى اللغة
          وعمق الموضوع وطريقة العرض وفق المرحلة الدراسية.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-[#deded8] bg-white md:grid-cols-3">
        {levels.map((level, index) => (
          <article
            key={level.number}
            className={`group relative p-7 sm:p-9 ${
              index !== levels.length - 1
                ? "border-b border-[#deded8] md:border-b-0 md:border-l"
                : ""
            }`}
          >
            <div className="mb-16 flex items-start justify-between">
              <span className="font-mono text-xs font-bold text-[#a1a69f]">
                {level.number}
              </span>

              <span className="rounded-full border border-[#e2e4df] px-3 py-1 text-[10px] font-semibold text-[#7c827b]">
                {level.grades}
              </span>
            </div>

            <div className="mb-5 h-px w-8 bg-[#c9932c] transition-all duration-300 group-hover:w-16" />

            <h3 className="text-lg font-bold text-[#202620]">
              {level.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#717770]">
              {level.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SchoolLevels;
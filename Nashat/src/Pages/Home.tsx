import React from "react";
import AIGenerator from "../Components/MiniAIGenerator";
import SchoolLevels from "../Components/SchoolLevels";
import RandomBroadcasts from "../Components/RandomBroadcasts";

const Home: React.FC = () => {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fbfbf8] text-[#1a1f1b]"
    >
      

      {/* ---------------------------------------------------------- */}
      {/* Main                                                        */}
      {/* ---------------------------------------------------------- */}

      <main className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Hero */}

        <section className="pb-16 pt-12 sm:pb-20 sm:pt-16">
          <div className="mb-8 flex items-center gap-3 text-[11px] font-bold text-[#8b681f]">
            <span className="h-px w-8 bg-[#c9932c]" />
            أدوات صممت للبيئة التعليمية
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.08] tracking-[-0.055em] text-[#1b211d] sm:text-6xl lg:text-7xl">
              وقت أقل في التحضير.
              <br />
              <span className="text-[#8b681f]">
                محتوى أفضل.
              </span>
            </h1>

            <p className="max-w-sm text-sm leading-7 text-[#717770] lg:pb-2">
              أدوات ذكية تساعد المعلمين ورواد النشاط على إنشاء
              الإذاعات والتقارير والمحتوى المدرسي دون البدء من
              الصفر.
            </p>
          </div>
        </section>

        {/* Generator */}

        <section id="generator">
          <AIGenerator />
        </section>

        {/* Levels */}

        <section id="levels">
          <SchoolLevels />
        </section>

        {/* Library */}

        <section id="library">
          <RandomBroadcasts />
        </section>

        {/* Final CTA */}

        <section className="pb-24 sm:pb-32">
          <div className="relative overflow-hidden rounded-[28px] bg-[#202821] px-7 py-12 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute right-1/2 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9932c]/10 blur-3xl" />

            <p className="relative text-xs font-bold tracking-[0.18em] text-[#c9932c]">
              ابدأ من هنا
            </p>

            <h2 className="relative mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl">
              فكرة واحدة تكفي لتبدأ.
            </h2>

            <p className="relative mx-auto mt-4 max-w-lg text-sm leading-7 text-[#b8c0b8]">
              اكتب الموضوع الذي يدور في بالك، ودع المساعد يحوله
              إلى محتوى جاهز للاستخدام.
            </p>

            <a
              href="#generator"
              className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-[#c9932c] px-6 py-3 text-sm font-bold text-[#202821] transition-all hover:-translate-y-0.5 hover:bg-[#d5a443]"
            >
              جرّب المولّد
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 12h13" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>
          </div>
        </section>
      </main>

     
    
    </div>
  );
};

export default Home;
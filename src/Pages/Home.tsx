import React from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  FileText,
  Lightbulb,
  Mic2,
  Sparkles,
} from "lucide-react";

import AIGenerator from "../Components/MiniAIGenerator";
import HowItWorks from "../Components/HowItWork";
import RandomBroadcasts from "../Components/RandomBroadcasts";
import Footer from "../Components/Footer";
import Background from "../Components/Background";
import { FaGithub } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";

// ✅ استيراد جميع الصور هنا
import Dvld from "../assets/Dvld.png";
import NashatImg from "../assets/nashat.png"; // تأكد من اسم الصورة وامتدادها
import TrainingImg from "../assets/training.png"; // تأكد من اسم الصورة وامتدادها

const Home: React.FC = () => {
  return (
    <div
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#111714] text-[#E7E9E5]"
    >
      <Background />

      <main className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* ================= HERO ================= */}
        <section className="relative flex min-h-[760px] items-center py-24 lg:min-h-[820px]">
          {/* Soft spotlight */}
          <div className="pointer-events-none absolute left-1/2 top-[-120px] -translate-x-1/2">
            <div className="relative h-[560px] w-[560px]">
              <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full bg-[#B39A63]/60 blur-[2px]" />

              <div
                className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse at top, rgba(179,154,99,0.13), rgba(179,154,99,0.035) 38%, transparent 70%)",
                }}
              />

              <div
                className="absolute left-1/2 top-0 h-[520px] w-[340px] -translate-x-1/2 opacity-30"
                style={{
                  clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
                  background:
                    "linear-gradient(to bottom, rgba(179,154,99,0.18), transparent)",
                }}
              />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-5xl text-center">
            {/* Small label */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#344039] bg-[#171E1A]/80 px-4 py-2 text-xs font-medium text-[#AEB7B0] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B39A63]" />
              منصة واحدة لأعمال النشاط المدرسي
            </div>

            {/* Heading */}
            <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.15] tracking-[-0.04em] text-[#EEF0EC] sm:text-6xl lg:text-7xl">
              اصنع محتواك المدرسي
              <span className="mt-2 block text-[#8FA495]">بطريقة سهلة.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#98A19B] sm:text-lg">
              أنشئ الإذاعات والتقارير والمحتوى المدرسي، عدّلها كما تريد، واحصل
              على نسخة جاهزة للطباعة — كل ذلك من مكان واحد.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#generator"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#DCE3DD] px-6 text-sm font-bold text-[#18211C] transition hover:bg-white"
              >
                ابدأ بإنشاء محتوى
                <ArrowLeft
                  size={17}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </a>

              <a
                href="#library"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#354039] bg-[#171E1A] px-6 text-sm font-semibold text-[#D4D9D5] transition hover:border-[#4A574F] hover:bg-[#1B241F]"
              >
                <BookOpen size={17} />
                تصفح المكتبة
              </a>
            </div>

            {/* Trust points */}
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 border-y border-[#29332D] sm:grid-cols-4">
              {[
                {
                  icon: Check,
                  text: "سهل الاستخدام",
                },
                {
                  icon: FileText,
                  text: "جاهز للطباعة",
                },
                {
                  icon: Mic2,
                  text: "إذاعات مدرسية",
                },
                {
                  icon: Lightbulb,
                  text: "أفكار جاهزة",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.text}
                    className="flex items-center justify-center gap-2 border-[#29332D] px-3 py-4 text-xs text-[#929C95] sm:border-l last:sm:border-l-0"
                  >
                    <Icon size={14} className="text-[#829A89]" />
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= GENERATOR ================= */}
        <section id="generator" className="scroll-mt-20 py-20">
          <div className="mb-10">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#B39A63]">
              <Sparkles size={14} />
              ابدأ من هنا
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#E8EBE7] sm:text-4xl">
              لا تبدأ من صفحة فارغة.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#8F9992]">
              اكتب فكرتك ببساطة، واترك المنصة تساعدك في إعداد المحتوى.
            </p>
          </div>

          <AIGenerator />
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <HowItWorks />

        {/* ================= LIBRARY ================= */}
        <section id="library" className="scroll-mt-20 py-24">
          <RandomBroadcasts />
        </section>

        {/* ================= PERSONAL CTA ================= */}
        <section className="relative overflow-hidden border-t border-[#29332D] py-24">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B39A63]/[0.025] blur-3xl" />

            <div className="absolute right-[-100px] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-[#29332D]/40" />
            <div className="absolute left-[-100px] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-[#29332D]/40" />
          </div>

          <div className="relative mx-auto max-w-4xl">
            <div className="rounded-3xl border border-[#303A34] bg-[#171E1A] px-6 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:px-10 sm:py-14">
              {/* Small label */}
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#3A463F] bg-[#202923] px-4 py-2 text-xs font-semibold text-[#B39A63]">
                  <Sparkles size={14} />
                  عندك فكرة لمشروع؟
                </div>
              </div>

              {/* Heading */}
              <div className="text-center">
                <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight text-[#E8EBE7] sm:text-4xl lg:text-5xl">
                  عندك فكرة وتبغى تحولها
                  <span className="mt-2 block text-[#91A394]">
                    إلى مشروع حقيقي؟
                  </span>
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#929C95] sm:text-base">
                  إذا أعجبتك فكرة المنصة وتبغى شيء مشابه لمدرستك، مشروعك، أو عندك
                  فكرة خاصة في بالك — تواصل معي، ونقدر نحول فكرتك إلى موقع أو نظام
                  متكامل يناسب احتياجك.
                </p>
              </div>

              {/* Contact buttons */}
              <div className="mt-10 mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/966577117504"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#DCE3DD] px-6 text-sm font-bold text-[#18211C] transition hover:bg-white sm:w-auto"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#18211C]/10">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path d="M20.52 3.48A11.84 11.84 0 0 0 12.04 0C5.49 0 .16 5.33.16 11.88c0 2.09.55 4.13 1.59 5.93L.05 24l6.34-1.66a11.87 11.87 0 0 0 5.65 1.44h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.41-8.42ZM12.05 21.76h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.76.99 1-3.66-.23-.38a9.86 9.86 0 0 1-1.51-5.24c0-5.44 4.43-9.87 9.88-9.87 2.63 0 5.1 1.03 6.96 2.89a9.84 9.84 0 0 1 2.9 6.98c0 5.44-4.43 9.88-9.84 9.88Zm5.42-7.4c-.3-.15-1.77-.87-2.05-.97-.28-.1-.49-.15-.7.15-.21.3-.8.97-.98 1.17-.18.21-.36.23-.66.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.67-2.06-.18-.3-.02-.46.13-.61.13-.13.3-.34.44-.51.15-.18.2-.3.3-.49.1-.21.05-.38-.03-.53-.08-.15-.7-1.69-.96-2.32-.25-.61-.51-.53-.7-.54h-.59c-.21 0-.54.08-.82.38-.28.3-1.07 1.04-1.07 2.54s1.1 2.95 1.25 3.15c.15.21 2.16 3.3 5.23 4.63.73.32 1.3.51 1.74.65.73.23 1.4.2 1.93.12.59-.09 1.77-.72 2.02-1.42.25-.69.25-1.28.18-1.41-.08-.13-.28-.2-.59-.36Z" />
                    </svg>
                  </span>
                  تواصل معي عبر واتساب
                  <ArrowLeft
                    size={16}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </a>

                {/* Email */}
                <a
                  href="mailto:mohmedisa630@gmail.com"
                  className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#3A463F] bg-[#202923] px-6 text-sm font-semibold text-[#D4D9D5] transition hover:border-[#B39A63]/50 hover:bg-[#29352E] sm:w-auto"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#171E1A] text-[#B39A63]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  راسلني عبر البريد
                </a>
              </div>

              {/* ================= PROJECTS ================= */}
              <section className="relative overflow-hidden border-t border-[#29332D] py-24">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B39A63]/[0.02] blur-3xl" />
                </div>

                <div className="relative">
                  {/* Section Header */}
                  <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#B39A63]">
                        <Sparkles size={14} />
                        من أعمالي
                      </div>

                      <h2 className="text-3xl font-bold tracking-tight text-[#E8EBE7] sm:text-4xl">
                        مشاريع أعمل عليها
                      </h2>

                      <p className="mt-3 max-w-xl text-sm leading-7 text-[#8F9992]">
                        بعض المشاريع والتجارب التي عملت عليها في تطوير الويب
                        وبناء الأنظمة.
                      </p>
                    </div>

                    <a
                      href="https://github.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#9AAA9E] transition hover:text-[#B39A63]"
                    >
                      شاهد جميع المشاريع
                      <ArrowLeft
                        size={15}
                        className="transition-transform duration-200 group-hover:-translate-x-1"
                      />
                    </a>
                  </div>

                  {/* Projects */}
                  <div className="grid gap-5 md:grid-cols-2">
                    {[
                      {
                        name: "نَشَاط | Nashat",
                        description:
                          "منصة لإدارة وتسهيل أعمال النشاط المدرسي، تشمل الإذاعات والتقارير والمحتوى المدرسي.",
                        image: NashatImg, // ✅ الصورة مضافة هنا
                        github: "https://github.com/mohmedlq/Nashat",
                        badge: "React · TypeScript ·AspCore.net · RestfulApi ",
                      },
                      {
                        name: "Training Center-Backend",
                        description:
                          "الواجهة الخلفية لمشروع ادارة الكورسات والطلاب والمعلمين",
                        image: TrainingImg, // ✅ الصورة مضافة هنا
                        github: "https://github.com/mohmedlq/TrainingCenter-Backend",
                        badge: "ASP.NET Core · 3-Tier architecture · Sql-Server · EF",
                      },
                      {
                        name: "DVLD",
                        description:
                          "تطبيقات دائرة الرخص وادارة السائقين التطبيق واجهتين  واجهة للعميل و الموظفين امكانية اصدار الرخص وتجديدها  والعديد من الامور الاخرى .",
                        image: Dvld, // ✅ كما كانت
                        github: "https://github.com/mohmedlq/Drivers-Vehicles-Licensing-System",
                        badge: ".NET · 3-Tier architecture · Sql-Server · ADO.NET",
                      },
                    ].map((project) => (
                      <article
                        key={project.name}
                        className="group overflow-hidden rounded-2xl border border-[#303A34] bg-[#171E1A] transition-all duration-300 hover:-translate-y-1 hover:border-[#46534B] hover:bg-[#1A221E]"
                      >
                        {/* Project Image */}
                        <div className="relative aspect-[16/9] overflow-hidden border-b border-[#29332D] bg-[#111714]">
                          {/* ✅ التأكد من عرض الصورة بشكل صحيح */}
                          <img
                            src={project.image}
                            alt={project.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111714]/50 to-transparent" />

                          {/* Project Badge */}
                          <span className="absolute right-4 top-4 rounded-md border border-[#3A463F] bg-[#171E1A]/90 px-2.5 py-1.5 text-[10px] font-semibold text-[#AAB4AC] backdrop-blur-sm">
                            {project.badge}
                          </span>
                        </div>

                        {/* Project Content */}
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-bold text-[#E3E7E3] transition-colors group-hover:text-[#B7C2BA]">
                                {project.name}
                              </h3>

                              <p className="mt-2 text-sm leading-7 text-[#7F8A82]">
                                {project.description}
                              </p>
                            </div>

                            {/* GitHub */}
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`GitHub - ${project.name}`}
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#354039] bg-[#202923] text-[#AAB4AC] transition-all duration-200 hover:border-[#4A574F] hover:bg-[#29352E] hover:text-[#E5E9E5]"
                            >
                              <FaGithub />
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
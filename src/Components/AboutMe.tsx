import React from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpLeft,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Code2,
  Database,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Mail,
  Map,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Users,
  Wrench,
} from "lucide-react";

import Dvld from "../assets/Dvld.png";
import NashatImg from "../assets/nashat.png";
import TrainingImg from "../assets/training.png";

export default function AboutMe() {
  const skills = [
    {
      icon: Server,
      title: "Backend Development",
      label: "CORE FIELD",
      description:
        "أبني الأنظمة من الخلفية، بدايةً من تصميم الـ APIs ومنطق الأعمال، وصولًا إلى التعامل مع قواعد البيانات وتنظيم المشروع.",
      technologies: [
        "C#",
        "ASP.NET Core",
        "REST APIs",
        "EF Core",
        "ADO.NET",
      ],
    },
    {
      icon: Globe2,
      title: "Frontend Development",
      label: "EXPANDING",
      description:
        "أتوسع في بناء الواجهات الحديثة وربطها بالأنظمة الخلفية لبناء تجربة متكاملة بدل التعامل مع الـ Frontend كجزء منفصل.",
      technologies: [
        "React",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
      ],
    },
    {
      icon: Database,
      title: "Databases",
      label: "FOUNDATION",
      description:
        "أتعامل مع البيانات كجزء أساسي من تصميم النظام، من بناء العلاقات والاستعلامات إلى ربطها بطبقة التطبيق.",
      technologies: [
        "SQL Server",
        "SQL",
        "Entity Framework",
        "Relational Databases",
      ],
    },
    {
      icon: Layers3,
      title: "Software Architecture",
      label: "MINDSET",
      description:
        "أهتم بأن يكون للكود مكان واضح ومسؤولية واضحة، مع التركيز على قابلية الصيانة وفصل أجزاء النظام.",
      technologies: [
        "3-Tier Architecture",
        "OOP",
        "SOLID",
        "Clean Code",
      ],
    },
  ];

  const projects = [
    {
      name: "نَشَاط | Nashat",
      type: "Web Platform",
      image: NashatImg,
      description:
        "منصة ويب لإدارة وتسهيل أعمال النشاط المدرسي، تجمع إنشاء التقارير والإذاعات والمحتوى المدرسي في تجربة واحدة.",
      story:
        "بدأ المشروع من مشكلة عملية في إعداد المحتوى المدرسي. الفكرة ليست مجرد إنشاء نموذج، بل تحويل خطوات متكررة إلى تجربة رقمية أبسط وأسرع.",
      role: "Full Stack Development",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "ASP.NET Core",
        "REST API",
      ],
      github: "https://github.com/mohmedlq/Nashat",
      featured: true,
    },
    {
      name: "Training Center",
      type: "Management System",
      image: TrainingImg,
      description:
        "نظام لإدارة مركز تدريبي يشمل الطلاب والمعلمين والدورات والبيانات المرتبطة بها من خلال REST API.",
      story:
        "المشروع ركز على بناء Backend منظم والتعامل مع العلاقات بين البيانات، مع تصميم API يمكن للواجهة الأمامية الاعتماد عليه.",
      role: "Backend Development",
      technologies: [
        "C#",
        "ASP.NET Core",
        "EF Core",
        "SQL Server",
        "REST API",
      ],
      github:
        "https://github.com/mohmedlq/TrainingCenter-Backend",
      featured: true,
    },
    {
      name: "DVLD",
      type: "Desktop Management System",
      image: Dvld,
      description:
        "نظام متكامل لإدارة السائقين والمركبات والرخص وعمليات الإصدار والتجديد والإدارة.",
      story:
        "من المشاريع التي ركزت فيها على تحويل متطلبات واقعية إلى نظام مترابط، مع الاهتمام بمنطق الأعمال والبيانات وتدفق العمليات.",
      role: "Backend & System Development",
      technologies: [
        ".NET",
        "C#",
        "ADO.NET",
        "SQL Server",
        "OOP",
      ],
      github:
        "https://github.com/mohmedlq/Drivers-Vehicles-Licensing-System",
      featured: true,
    },
    {
      name: "مشروع قادم",
      type: "Coming Next",
      image: null,
      description:
        "مساحة لمشروع جديد يتم بناؤه حاليًا.",
      story:
        "هذه المساحة مخصصة لأحد المشاريع القادمة التي سأضيفها إلى معرض أعمالي.",
      role: "In Progress",
      technologies: ["Coming Soon"],
      github: "",
      featured: false,
    },
    {
      name: "مشروع قادم",
      type: "Coming Next",
      image: null,
      description:
        "مساحة مفتوحة لمشروع جديد.",
      story:
        "مشروع آخر سيضاف هنا مع اكتمال بنائه.",
      role: "In Progress",
      technologies: ["Coming Soon"],
      github: "",
      featured: false,
    },
  ];

  const journey = [
    {
      number: "01",
      title: "بدأت من الأساسيات",
      description:
        "تعلمت البرمجة من أساسياتها، وركزت على التفكير المنطقي و OOP وبناء الأنظمة بدل الاكتفاء بكتابة الأكواد.",
      icon: Code2,
    },
    {
      number: "02",
      title: "دخلت عالم الـ Backend",
      description:
        "انتقلت إلى C# و .NET وبناء REST APIs وقواعد البيانات، وبدأت أتعامل مع المشاريع كنظم مترابطة.",
      icon: Server,
    },
    {
      number: "03",
      title: "بدأت أبني منتجات",
      description:
        "مع المشاريع العملية، أصبحت أهتم بالمشكلة التي يحلها النظام وتجربة المستخدم، وليس بالكود وحده.",
      icon: Rocket,
    },
    {
      number: "04",
      title: "الخطوة القادمة: Full Stack",
      description:
        "أعمل حاليًا على تطوير مهارات React و TypeScript وربطها بخبرتي في الـ Backend لبناء منتجات كاملة.",
      icon: BrainCircuit,
    },
  ];

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#111714] text-[#E7E9E5]"
    >
      {/* =========================================================
          GLOBAL BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-[#B39A63]/[0.035] blur-[120px]" />
        <div className="absolute -left-40 top-[35%] h-[500px] w-[500px] rounded-full bg-[#91A394]/[0.035] blur-[140px]" />
        <div className="absolute right-[30%] top-[65%] h-[400px] w-[400px] rounded-full bg-[#B39A63]/[0.025] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#AEB8B0 1px, transparent 1px), linear-gradient(90deg, #AEB8B0 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <main className="relative z-10">
        {/* =========================================================
            NAV
        ========================================================= */}
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#39453E] bg-[#171E1A]">
              <span className="font-['Noto_Kufi_Arabic',sans-serif] text-sm font-bold text-[#C9B27B]">
                M
              </span>
            </div>

            <div>
              <p className="font-['Cairo',sans-serif] text-sm font-semibold text-[#E1E5E1]">
                MOHMED
              </p>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#68746C]">
                Software Developer
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-7 text-sm text-[#808B84] sm:flex">
            <a
              href="#about"
              className="transition-colors hover:text-[#D8C18E]"
            >
              عني
            </a>

            <a
              href="#skills"
              className="transition-colors hover:text-[#D8C18E]"
            >
              المهارات
            </a>

            <a
              href="#projects"
              className="transition-colors hover:text-[#D8C18E]"
            >
              المشاريع
            </a>

            <a
              href="#contact"
              className="transition-colors hover:text-[#D8C18E]"
            >
              تواصل
            </a>
          </div>
        </nav>

        {/* =========================================================
            HERO
        ========================================================= */}
        <section className="mx-auto max-w-7xl px-5 pb-24 pt-14 sm:px-8 sm:pb-32 sm:pt-20 lg:px-10 lg:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#344039] bg-[#171E1A]/70 px-4 py-2 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B39A63]" />
                <span className="font-['Cairo',sans-serif] text-xs font-medium text-[#A5AEA8]">
                  Backend Developer · Growing into Full Stack
                </span>
              </div>

              <h1 className="max-w-4xl font-['Noto_Kufi_Arabic',sans-serif] text-4xl font-bold leading-[1.55] tracking-tight text-[#EDF0EC] sm:text-5xl lg:text-6xl">
                أبني الأنظمة من الداخل،
                <br />
                <span className="text-[#C8AF73]">
                  وأتوسع لأبني التجربة كاملة.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl font-['IBM_Plex_Sans_Arabic',sans-serif] text-base leading-8 text-[#929C95] sm:text-lg">
                أنا محمد، مطور برمجيات أركز حاليًا على تطوير الـ Backend
                باستخدام .NET، وأبني طريقي نحو تطوير منتجات Full Stack تجمع
                بين النظام الجيد والتجربة البسيطة.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-3 rounded-xl bg-[#B39A63] px-5 py-3 font-['Cairo',sans-serif] text-sm font-bold text-[#161A17] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C5AD77]"
                >
                  استكشف مشاريعي
                  <ArrowLeft
                    size={16}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </a>

                <a
                  href="https://github.com/mohmedlq"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#354039] bg-[#171E1A]/70 px-5 py-3 font-['Cairo',sans-serif] text-sm font-semibold text-[#B4BDB7] transition-all hover:border-[#4A574F] hover:bg-[#1A221E] hover:text-[#E0E4E0]"
                >
                  <Github size={17} />
                  GitHub
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-[#69756D]">
                <span className="flex items-center gap-2">
                  <Map size={13} />
                  Software Engineering
                </span>

                <span className="h-1 w-1 rounded-full bg-[#4B574F]" />

                <span className="flex items-center gap-2">
                  <Terminal size={13} />
                  C# · .NET
                </span>

                <span className="h-1 w-1 rounded-full bg-[#4B574F]" />

                <span className="flex items-center gap-2">
                  <Globe2 size={13} />
                  React · TypeScript
                </span>
              </div>
            </div>

            {/* HERO PROFILE CARD */}
            <div className="relative mx-auto w-full max-w-md lg:mr-auto lg:ml-0">
              <div className="absolute -inset-4 rounded-[2rem] bg-[#B39A63]/[0.025] blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-[#303A34] bg-[#171E1A]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-7">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#B39A63]/[0.05] blur-3xl" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#4A554E] bg-[#202923]">
                      <span className="font-['Noto_Kufi_Arabic',sans-serif] text-2xl font-bold text-[#C8AF73]">
                        م
                      </span>
                    </div>

                    <h2 className="font-['Noto_Kufi_Arabic',sans-serif] text-xl font-bold text-[#E5E9E5]">
                      محمد
                    </h2>

                    <p className="mt-1 font-['Cairo',sans-serif] text-sm text-[#87928A]">
                      Software Developer
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#344039] bg-[#1A221E] px-3 py-2 text-left">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#66736A]">
                      Current Focus
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#B8C0BA]">
                      Backend → Full Stack
                    </p>
                  </div>
                </div>

                <div className="my-7 h-px bg-[#2C362F]" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-['Cairo',sans-serif] text-xs text-[#707C74]">
                      Core
                    </span>
                    <span className="font-mono text-xs text-[#B8C0BA]">
                      ASP.NET Core
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-['Cairo',sans-serif] text-xs text-[#707C74]">
                      Frontend
                    </span>
                    <span className="font-mono text-xs text-[#B8C0BA]">
                      React + TypeScript
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-['Cairo',sans-serif] text-xs text-[#707C74]">
                      Data
                    </span>
                    <span className="font-mono text-xs text-[#B8C0BA]">
                      SQL Server
                    </span>
                  </div>
                </div>

                <div className="mt-7 rounded-xl border border-[#303A34] bg-[#131915] p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-[#B39A63]" />
                    <span className="font-['Cairo',sans-serif] text-xs font-semibold text-[#AEB7B1]">
                      What I care about
                    </span>
                  </div>

                  <p className="mt-2 font-['IBM_Plex_Sans_Arabic',sans-serif] text-xs leading-6 text-[#77837B]">
                    بناء أنظمة مفهومة، قابلة للتطوير، وتحل مشكلة حقيقية بدل
                    إضافة التعقيد لمجرد التعقيد.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <a
              href="#about"
              className="group flex flex-col items-center gap-3 text-[#657169] transition-colors hover:text-[#A7B0AA]"
            >
              <span className="font-['Cairo',sans-serif] text-[10px] uppercase tracking-[0.2em]">
                Scroll to explore
              </span>
              <ArrowDown
                size={15}
                className="animate-bounce"
              />
            </a>
          </div>
        </section>

        {/* =========================================================
            ABOUT / STORY
        ========================================================= */}
        <section
          id="about"
          className="border-y border-[#29332D] bg-[#141A16]/50"
        >
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B39A63]">
                  01 — ABOUT ME
                </span>

                <h2 className="mt-5 font-['Noto_Kufi_Arabic',sans-serif] text-3xl font-bold leading-[1.7] text-[#E5E9E5] sm:text-4xl">
                  البرمجة بالنسبة لي
                  <br />
                  <span className="text-[#9CA79F]">
                    رحلة بناء وفهم.
                  </span>
                </h2>
              </div>

              <div className="max-w-3xl">
                <p className="font-['IBM_Plex_Sans_Arabic',sans-serif] text-lg leading-9 text-[#A4ADA7]">
                  بدأت من أساسيات البرمجة، ثم انتقلت تدريجيًا إلى بناء
                  الأنظمة والتعامل مع قواعد البيانات والـ APIs. مع الوقت،
                  أصبحت أهتم أكثر بكيفية تصميم النظام ككل، وليس فقط بكيفية
                  جعل الكود يعمل.
                </p>

                <p className="mt-6 font-['IBM_Plex_Sans_Arabic',sans-serif] text-base leading-8 text-[#7F8A82]">
                  حاليًا، تركيزي الأساسي هو الـ Backend باستخدام C# و ASP.NET
                  Core، وبالتوازي أتوسع في React و TypeScript حتى أتمكن من
                  الانتقال من بناء أجزاء النظام إلى بناء المنتج كاملًا.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#303A34] bg-[#171E1A] p-5">
                    <Server size={18} className="text-[#B39A63]" />
                    <p className="mt-4 font-['Cairo',sans-serif] text-sm font-bold text-[#D4DAD5]">
                      Backend First
                    </p>
                    <p className="mt-2 text-xs leading-6 text-[#727E76]">
                      نقطة انطلاقي الأساسية في بناء الأنظمة.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#303A34] bg-[#171E1A] p-5">
                    <Wrench size={18} className="text-[#B39A63]" />
                    <p className="mt-4 font-['Cairo',sans-serif] text-sm font-bold text-[#D4DAD5]">
                      Practical
                    </p>
                    <p className="mt-2 text-xs leading-6 text-[#727E76]">
                      أتعلم من بناء مشاريع فعلية.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#303A34] bg-[#171E1A] p-5">
                    <BrainCircuit size={18} className="text-[#B39A63]" />
                    <p className="mt-4 font-['Cairo',sans-serif] text-sm font-bold text-[#D4DAD5]">
                      Always Learning
                    </p>
                    <p className="mt-2 text-xs leading-6 text-[#727E76]">
                      كل مشروع يفتح لي سؤالًا جديدًا.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            JOURNEY
        ========================================================= */}
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
          <div className="mb-14">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B39A63]">
              02 — THE JOURNEY
            </span>

            <h2 className="mt-5 max-w-2xl font-['Noto_Kufi_Arabic',sans-serif] text-3xl font-bold leading-[1.7] text-[#E5E9E5] sm:text-4xl">
              من كتابة أول كود
              <br />
              <span className="text-[#89958D]">
                إلى بناء أنظمة كاملة.
              </span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {journey.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group relative overflow-hidden rounded-2xl border border-[#303A34] bg-[#171E1A] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#46534B] hover:bg-[#1A221E]"
                >
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#B39A63]/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="flex gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#354039] bg-[#202923]">
                      <Icon size={18} className="text-[#B39A63]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-[#626E66]">
                          {item.number}
                        </span>

                        <h3 className="font-['Noto_Kufi_Arabic',sans-serif] text-base font-bold text-[#DCE1DD]">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-3 font-['IBM_Plex_Sans_Arabic',sans-serif] text-sm leading-7 text-[#7D8981]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            SKILLS
        ========================================================= */}
        <section
          id="skills"
          className="border-y border-[#29332D] bg-[#141A16]/45"
        >
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B39A63]">
                  03 — SKILLS & TECHNOLOGIES
                </span>

                <h2 className="mt-5 font-['Noto_Kufi_Arabic',sans-serif] text-3xl font-bold text-[#E5E9E5] sm:text-4xl">
                  الأدوات التي أبني بها.
                </h2>
              </div>

              <p className="max-w-lg font-['IBM_Plex_Sans_Arabic',sans-serif] text-sm leading-7 text-[#78847C]">
                تركيزي الحالي في الـ Backend، مع بناء أساس قوي في الـ Frontend
                للوصول تدريجيًا إلى تطوير Full Stack.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {skills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <div
                    key={skill.title}
                    className="group rounded-2xl border border-[#303A34] bg-[#171E1A] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#46534B] hover:bg-[#1A221E] sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#39453E] bg-[#202923]">
                        <Icon
                          size={20}
                          className="text-[#B39A63]"
                        />
                      </div>

                      <span className="rounded-full border border-[#303A34] px-3 py-1 font-mono text-[9px] tracking-widest text-[#657168]">
                        {skill.label}
                      </span>
                    </div>

                    <h3 className="mt-6 font-['Noto_Kufi_Arabic',sans-serif] text-lg font-bold text-[#DCE2DD]">
                      {skill.title}
                    </h3>

                    <p className="mt-3 font-['IBM_Plex_Sans_Arabic',sans-serif] text-sm leading-7 text-[#7F8B83]">
                      {skill.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {skill.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-lg border border-[#303A34] bg-[#131915] px-3 py-1.5 font-mono text-[10px] text-[#8E9992]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* STACK STRIP */}
            <div className="mt-5 rounded-2xl border border-[#303A34] bg-[#171E1A] p-6">
              <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
                {[
                  "C#",
                  ".NET",
                  "ASP.NET Core",
                  "REST API",
                  "SQL Server",
                  "EF Core",
                  "React",
                  "TypeScript",
                  "JavaScript",
                  "Tailwind CSS",
                ].map((item, index, arr) => (
                  <React.Fragment key={item}>
                    <span className="font-mono text-xs text-[#78847C] transition-colors hover:text-[#C8AF73]">
                      {item}
                    </span>

                    {index < arr.length - 1 && (
                      <span className="hidden h-1 w-1 rounded-full bg-[#3B463F] sm:block" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PROJECTS
        ========================================================= */}
        <section
          id="projects"
          className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"
        >
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B39A63]">
                04 — SELECTED WORK
              </span>

              <h2 className="mt-5 font-['Noto_Kufi_Arabic',sans-serif] text-3xl font-bold text-[#E5E9E5] sm:text-4xl">
                مشاريع بنيتها.
              </h2>

              <p className="mt-4 max-w-xl font-['IBM_Plex_Sans_Arabic',sans-serif] text-sm leading-7 text-[#7F8A82]">
                كل مشروع هنا يمثل مرحلة مختلفة في رحلتي، من بناء الأنظمة
                وإدارة البيانات إلى تطوير منتجات تجمع بين الـ Backend
                والـ Frontend.
              </p>
            </div>

            <a
              href="https://github.com/mohmedlq"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit items-center gap-2 text-sm text-[#929D95] transition-colors hover:text-[#C8AF73]"
            >
              <Github size={16} />
              <span>شاهد جميع المشاريع</span>
              <ArrowUpLeft
                size={15}
                className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          <div className="mt-14 space-y-5">
            {projects.map((project, index) => (
              <article
                key={`${project.name}-${index}`}
                className={`group overflow-hidden rounded-3xl border border-[#303A34] bg-[#171E1A] transition-all duration-300 hover:border-[#46534B] ${
                  project.featured
                    ? "lg:grid lg:grid-cols-[0.9fr_1.1fr]"
                    : "lg:grid lg:grid-cols-[0.65fr_1.35fr]"
                }`}
              >
                {/* IMAGE */}
                <div className="relative min-h-[240px] overflow-hidden border-b border-[#303A34] bg-[#131915] lg:min-h-[330px] lg:border-b-0 lg:border-l">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.name}
                        className="absolute inset-0 h-full w-full object-cover object-center opacity-80 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-95"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#111714] via-[#111714]/20 to-transparent" />

                      <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-[#111714]/70 px-3 py-1.5 backdrop-blur">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#B9C1BB]">
                          {project.type}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 opacity-30">
                        <div
                          className="h-full w-full"
                          style={{
                            backgroundImage:
                              "linear-gradient(#657168 1px, transparent 1px), linear-gradient(90deg, #657168 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                          }}
                        />
                      </div>

                      <div className="relative text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#3B463F] bg-[#1A221E]">
                          <Rocket
                            size={20}
                            className="text-[#B39A63]"
                          />
                        </div>

                        <p className="mt-4 font-['Cairo',sans-serif] text-xs font-semibold text-[#8C9790]">
                          مشروع قادم
                        </p>

                        <p className="mt-1 font-mono text-[9px] text-[#5E6A62]">
                          COMING SOON
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-9">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10px] text-[#626E66]">
                        0{index + 1}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-[#4B574F]" />

                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#6E7A72]">
                        {project.role}
                      </span>
                    </div>

                    <h3 className="mt-5 font-['Noto_Kufi_Arabic',sans-serif] text-2xl font-bold text-[#E2E7E2] sm:text-3xl">
                      {project.name}
                    </h3>

                    <p className="mt-4 font-['IBM_Plex_Sans_Arabic',sans-serif] text-base leading-8 text-[#A0AAA3]">
                      {project.description}
                    </p>

                    <div className="mt-5 border-r border-[#3B463F] pr-4">
                      <p className="font-['IBM_Plex_Sans_Arabic',sans-serif] text-sm leading-7 text-[#707C74]">
                        {project.story}
                      </p>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-lg border border-[#303A34] bg-[#131915] px-3 py-1.5 font-mono text-[10px] text-[#87928B]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.github ? (
                    <div className="mt-8 flex items-center justify-between border-t border-[#2C362F] pt-5">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5F6B63]">
                        View source
                      </span>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#9BA59F] transition-all hover:bg-[#202923] hover:text-[#D1BB83]"
                      >
                        <Github size={15} />
                        GitHub
                        <ExternalLink
                          size={12}
                          className="transition-transform group-hover/link:-translate-y-0.5"
                        />
                      </a>
                    </div>
                  ) : (
                    <div className="mt-8 border-t border-[#2C362F] pt-5">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5F6B63]">
                        More work coming soon
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =========================================================
            BEYOND CODE
        ========================================================= */}
        <section className="border-y border-[#29332D] bg-[#141A16]/50">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B39A63]">
                  05 — BEYOND CODE
                </span>

                <h2 className="mt-5 font-['Noto_Kufi_Arabic',sans-serif] text-3xl font-bold leading-[1.7] text-[#E5E9E5] sm:text-4xl">
                  البناء لا يحدث
                  <br />
                  <span className="text-[#89958D]">
                    داخل المحرر فقط.
                  </span>
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#303A34] bg-[#171E1A] p-6">
                  <Users size={20} className="text-[#B39A63]" />

                  <h3 className="mt-5 font-['Noto_Kufi_Arabic',sans-serif] text-base font-bold text-[#DCE2DD]">
                    مشاركة المعرفة
                  </h3>

                  <p className="mt-3 font-['IBM_Plex_Sans_Arabic',sans-serif] text-sm leading-7 text-[#78847C]">
                    ساهمت في تأسيس نادي برمجة وتعليم مجموعة من الطلاب، وكانت
                    تجربة مختلفة عن التعلم الفردي؛ لأن شرح الفكرة لشخص آخر
                    يجبرك على فهمها بشكل أعمق.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#303A34] bg-[#171E1A] p-6">
                  <BookOpen size={20} className="text-[#B39A63]" />

                  <h3 className="mt-5 font-['Noto_Kufi_Arabic',sans-serif] text-base font-bold text-[#DCE2DD]">
                    التعلم بالممارسة
                  </h3>

                  <p className="mt-3 font-['IBM_Plex_Sans_Arabic',sans-serif] text-sm leading-7 text-[#78847C]">
                    أفضل طريقة أتعلم بها هي أخذ فكرة وتحويلها إلى مشروع،
                    ثم مواجهة المشاكل الحقيقية التي تظهر أثناء البناء.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#303A34] bg-[#171E1A] p-6 sm:col-span-2">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#39453E] bg-[#202923]">
                        <BrainCircuit
                          size={19}
                          className="text-[#B39A63]"
                        />
                      </div>

                      <div>
                        <h3 className="font-['Noto_Kufi_Arabic',sans-serif] text-base font-bold text-[#DCE2DD]">
                          ما أتعلمه الآن
                        </h3>

                        <p className="mt-2 max-w-2xl font-['IBM_Plex_Sans_Arabic',sans-serif] text-sm leading-7 text-[#78847C]">
                          React و TypeScript، تصميم الأنظمة، دمج تقنيات
                          الذكاء الاصطناعي، وتحسين طريقة التفكير في المنتج
                          ككل.
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      {[
                        "React",
                        "TypeScript",
                        "AI",
                        "System Design",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-[#354039] bg-[#131915] px-3 py-2 font-mono text-[10px] text-[#88938B]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            CONTACT
        ========================================================= */}
        <section
          id="contact"
          className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-[#3A463F] bg-[#171E1A] p-8 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#B39A63]/[0.05] blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#91A394]/[0.04] blur-[100px]" />

            <div className="relative flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B39A63]">
                  06 — LET'S CONNECT
                </span>

                <h2 className="mt-5 max-w-2xl font-['Noto_Kufi_Arabic',sans-serif] text-3xl font-bold leading-[1.7] text-[#E7EBE7] sm:text-4xl">
                  فكرة، مشروع، أو حتى
                  <br />
                  <span className="text-[#C8AF73]">
                    مجرد نقاش تقني.
                  </span>
                </h2>

                <p className="mt-5 max-w-xl font-['IBM_Plex_Sans_Arabic',sans-serif] text-sm leading-8 text-[#7D8981]">
                  إذا كنت تريد التعرف أكثر على مشاريعي أو مناقشة فكرة أو
                  فرصة، يسعدني التواصل.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:your-email@example.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#B39A63] px-5 py-3 font-['Cairo',sans-serif] text-sm font-bold text-[#161A17] transition-all hover:bg-[#C5AD77]"
                >
                  <Mail size={16} />
                  تواصل معي
                </a>

                <a
                  href="https://github.com/mohmedlq"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#3A463F] bg-[#202923] px-5 py-3 font-['Cairo',sans-serif] text-sm font-semibold text-[#AEB7B1] transition-all hover:bg-[#29352E] hover:text-[#E0E5E0]"
                >
                  <Github size={16} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FOOTER
        ========================================================= */}
        <footer className="border-t border-[#29332D]">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
            <p className="font-mono text-[10px] tracking-widest text-[#5F6B63]">
              © {new Date().getFullYear()} MOHMED
            </p>

            <p className="font-['Cairo',sans-serif] text-[10px] text-[#5F6B63]">
              Built with curiosity, code &amp; coffee.
            </p>

            <a
              href="#"
              className="group flex items-center gap-2 font-mono text-[10px] text-[#69756D] transition-colors hover:text-[#B39A63]"
            >
              BACK TO TOP
              <ArrowUpRight
                size={12}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
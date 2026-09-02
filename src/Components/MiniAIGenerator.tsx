import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type GeneratorMode = "broadcast" | "report";

const SealIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 2 20 6v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4Z" />
    <path d="M9 12l2 2 4-4.5" />
  </svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5V21" />
    <path d="M8.5 21h7" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6" />
    <path d="M9 17h5" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 12h13" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const AIGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<GeneratorMode>("broadcast");
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;
    navigate("/generator", { state: { prompt: cleanPrompt, mode, autoSend: true } });
  };

  const examples =
    mode === "broadcast"
      ? ["إذاعة عن أهمية القراءة", "إذاعة عن بر الوالدين", "إذاعة عن المحافظة على الوقت"]
      : ["تقرير عن حملة القراءة", "تقرير عن اليوم الوطني", "تقرير عن النشاط الرياضي"];

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden rounded-2xl border border-[#E4DFC9] bg-[#F7F4EA]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(21,33,58,0.05) 28px)",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#B8862E]/[0.06] blur-3xl" />
        <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#B8862E] via-[#E4DFC9] to-transparent" />
      </div>

      <div className="relative grid lg:grid-cols-[1fr_1.25fr]">
        <div className="flex flex-col justify-between border-b border-[#E4DFC9] bg-[#F7F4EA] p-7 sm:p-10 lg:border-b-0 lg:border-l lg:p-12">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 border-b-2 border-[#B8862E] pb-2 text-xs font-bold tracking-wide text-[#7A5A1E]">
              <SealIcon />
              المساعد المدرسي · نسخة أكاديمية
            </div>

            <h1 className="max-w-xl font-serif text-4xl font-bold leading-[1.2] tracking-[-0.02em] text-[#15213A] sm:text-5xl">
              لا تبدأ من
              <br />
              صفحة فارغة.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#5B6478] sm:text-base">
              اكتب فكرتك فقط، وسيتولى المساعد بناء المحتوى المدرسي كاملًا بما يناسب المرحلة والموضوع.
            </p>
          </div>

          <div className="mt-12 hidden lg:block">
            <div className="flex items-center gap-3 text-xs font-medium text-[#7A8194]">
              <div className="h-px w-10 bg-[#B8862E]" />
              صياغة ذكية · محتوى منظم · جاهز للاستخدام
            </div>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-8 lg:p-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-sm font-bold text-[#15213A]">ماذا تريد أن تنشئ؟</p>
              <p className="mt-1 text-xs text-[#858B9A]">اختر نوع المحتوى الذي تحتاجه.</p>
            </div>

            <div className="flex w-full rounded-lg border border-[#E4DFC9] bg-[#F7F4EA] p-1 sm:w-auto">
              <button
                type="button"
                onClick={() => setMode("broadcast")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold transition-all sm:flex-none ${
                  mode === "broadcast" ? "bg-[#15213A] text-[#D9AE55] shadow-sm" : "text-[#6B7280] hover:text-[#15213A]"
                }`}
              >
                <MicIcon />
                إذاعة
              </button>

              <button
                type="button"
                onClick={() => setMode("report")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold transition-all sm:flex-none ${
                  mode === "report" ? "bg-[#15213A] text-[#D9AE55] shadow-sm" : "text-[#6B7280] hover:text-[#15213A]"
                }`}
              >
                <FileIcon />
                تقرير
              </button>
            </div>
          </div>

          <div className="rounded-xl border-2 border-[#E4DFC9] bg-white transition-all focus-within:border-[#B8862E] focus-within:ring-4 focus-within:ring-[#B8862E]/[0.08]">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
              className="min-h-[180px] w-full resize-none bg-transparent px-5 pt-5 text-sm leading-7 text-[#1B2233] outline-none placeholder:text-[#A6ABBB]"
              placeholder={
                mode === "broadcast"
                  ? "مثال: أنشئ إذاعة مدرسية عن أهمية القراءة لطلاب المرحلة المتوسطة..."
                  : "مثال: أنشئ تقريرًا رسميًا عن حملة القراءة الأسبوعية..."
              }
            />

            <div className="flex flex-col gap-4 border-t border-[#EEE8D6] p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] leading-5 text-[#9AA0AF]">
                اضغط Enter للبدء، أو استخدم Shift + Enter لسطر جديد.
              </p>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#15213A] px-5 py-3 text-sm font-bold text-[#D9AE55] transition-all hover:-translate-y-0.5 hover:bg-[#0D1526] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 sm:w-auto"
              >
                <SealIcon />
                إنشاء المحتوى
                <ArrowIcon />
              </button>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#9AA0AF]">جرّب أحد الأمثلة</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setPrompt(example)}
                  className="rounded-md border border-[#E4DFC9] bg-[#FBF9F0] px-3 py-2 text-xs text-[#5B6478] transition-all hover:border-[#B8862E]/60 hover:bg-[#FFFCF2] hover:text-[#15213A]"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIGenerator;
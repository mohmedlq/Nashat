import React, { useState } from "react";
import { ArrowLeft, FileText, Mic2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

type GeneratorMode = "broadcast" | "report";

const AIGenerator: React.FC = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<GeneratorMode>("broadcast");
  const [prompt, setPrompt] = useState("");

  const examples =
    mode === "broadcast"
      ? [
          "إذاعة عن أهمية القراءة",
          "إذاعة عن بر الوالدين",
          "إذاعة عن المحافظة على الوقت",
        ]
      : [
          "تقرير عن حملة القراءة",
          "تقرير عن اليوم الوطني",
          "تقرير عن النشاط الرياضي",
        ];

  const handleGenerate = () => {
    const cleanPrompt = prompt.trim();

    if (!cleanPrompt) return;

    navigate("/generator", {
      state: {
        prompt: cleanPrompt,
        mode,
        autoSend: true,
      },
    });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-2xl border border-[#303A34] bg-[#181F1B] shadow-[0_25px_80px_rgba(0,0,0,0.18)]"
    >
      <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
        {/* Intro */}
        <div className="relative overflow-hidden border-b border-[#303A34] p-7 sm:p-9 lg:border-b-0 lg:border-l">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#7F9887]/[0.05] blur-3xl" />

          <div className="relative">
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#3A463F] bg-[#202923] text-[#B39A63]">
              {mode === "broadcast" ? (
                <Mic2 size={20} />
              ) : (
                <FileText size={20} />
              )}
            </div>

            <h3 className="text-2xl font-bold leading-tight text-[#E9ECE8]">
              حوّل فكرتك
              <br />
              إلى محتوى جاهز.
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[#929C95]">
              اكتب الموضوع أو الفكرة التي تريد العمل عليها، وسنساعدك في
              تجهيز المحتوى المدرسي المناسب.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "صياغة مناسبة للبيئة المدرسية",
                "إمكانية التعديل قبل الاستخدام",
                "محتوى منظم وسهل القراءة",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-xs text-[#A9B1AB]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#26322B] text-[#8FA495]">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-[#141A17] p-5 sm:p-7">
          {/* Mode */}
          <div className="mb-5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7F8A82]">
              نوع المحتوى
            </span>

            <div className="flex rounded-lg border border-[#303A34] bg-[#1A211D] p-1">
              <button
                type="button"
                onClick={() => setMode("broadcast")}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition ${
                  mode === "broadcast"
                    ? "bg-[#DCE3DD] text-[#18211C]"
                    : "text-[#8F9992] hover:text-[#C6CCC8]"
                }`}
              >
                <Mic2 size={14} />
                إذاعة
              </button>

              <button
                type="button"
                onClick={() => setMode("report")}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition ${
                  mode === "report"
                    ? "bg-[#DCE3DD] text-[#18211C]"
                    : "text-[#8F9992] hover:text-[#C6CCC8]"
                }`}
              >
                <FileText size={14} />
                تقرير
              </button>
            </div>
          </div>

          {/* Textarea */}
          <div className="rounded-xl border border-[#303A34] bg-[#111714] transition focus-within:border-[#526258]">
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                mode === "broadcast"
                  ? "مثال: أريد إذاعة مدرسية عن أهمية القراءة..."
                  : "مثال: أريد تقريرًا عن حملة القراءة في المدرسة..."
              }
              className="min-h-[190px] w-full resize-none bg-transparent p-5 text-sm leading-8 text-[#E4E8E4] outline-none placeholder:text-[#5F6962]"
            />

            <div className="flex items-center justify-between border-t border-[#29332D] px-4 py-3">
              <span className="text-[11px] text-[#5F6962]">
                Enter للإنشاء · Shift + Enter لسطر جديد
              </span>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="group inline-flex items-center gap-2 rounded-lg bg-[#DCE3DD] px-4 py-2.5 text-xs font-bold text-[#18211C] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                إنشاء المحتوى
                <ArrowLeft
                  size={15}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
              </button>
            </div>
          </div>

          {/* Examples */}
          <div className="mt-5">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold text-[#68736B]">
              <Sparkles size={13} />
              أفكار للبدء
            </div>

            <div className="flex flex-wrap gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setPrompt(example)}
                  className="rounded-lg border border-[#303A34] bg-[#191F1B] px-3 py-2 text-[11px] text-[#8F9992] transition hover:border-[#4A574F] hover:bg-[#202923] hover:text-[#C4CBC6]"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;
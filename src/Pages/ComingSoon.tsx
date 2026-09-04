import React from "react";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import Background from "../Components/Background";

export default function ComingSoon() {
  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#111714] text-[#E7E9E5]"
    >
      <Background />

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B39A63]/[0.035] blur-3xl" />

        <div className="absolute right-[-120px] top-1/4 h-72 w-72 rounded-full border border-[#29332D]/50" />

        <div className="absolute bottom-1/4 left-[-120px] h-72 w-72 rounded-full border border-[#29332D]/50" />
      </div>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16 sm:px-8">
        <div className="w-full max-w-3xl text-center">

          {/* Small Label */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#344039] bg-[#171E1A]/80 px-4 py-2 text-xs font-medium text-[#AEB7B0] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B39A63]" />

            منصة نَشَاط
          </div>

          {/* Coming Soon */}
          <div className="relative mx-auto mb-8 w-fit">
            <div className="absolute inset-0 bg-[#B39A63]/10 blur-3xl" />

            <h1 className="relative text-[72px] font-black leading-none tracking-[-0.06em] text-[#DCE3DD] sm:text-[110px]">
              قريبًا
            </h1>

            {/* Small Accent */}
            <div className="absolute -bottom-3 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-[#B39A63]" />
          </div>

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#354039] bg-[#171E1A] text-[#B39A63] shadow-[0_15px_40px_rgba(0,0,0,0.18)]">
            <Clock3 size={28} strokeWidth={1.7} />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold tracking-tight text-[#E8EBE7] sm:text-4xl">
            نعمل على شيء جديد لك.
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-[#929C95] sm:text-base">
            هذه الصفحة قيد التطوير حاليًا.
            <br className="hidden sm:block" />
            نعمل على تجهيزها لتكون جزءًا من تجربة نَشَاط بشكل أفضل.
          </p>

          {/* Action */}
          <div className="mt-9 flex items-center justify-center">
            <a
              href="/"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#DCE3DD] px-6 text-sm font-bold text-[#18211C] transition-all duration-200 hover:bg-white"
            >
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />

              العودة للرئيسية
            </a>
          </div>

          {/* Bottom Message */}
          <div className="mx-auto mt-16 flex max-w-xl items-center justify-center gap-3 border-t border-[#29332D] pt-6 text-xs text-[#6F7B73]">
            <span className="h-px w-8 bg-[#29332D]" />

            <span className="flex items-center gap-1.5">
              <Sparkles size={12} />
              شيء جميل قادم
            </span>

            <span className="h-px w-8 bg-[#29332D]" />
          </div>
        </div>
      </main>
    </div>
  );
}
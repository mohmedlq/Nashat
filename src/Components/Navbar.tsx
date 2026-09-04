import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  FileText,
  Lightbulb,
  Menu,
  Mic2,
  Sparkles,
  X,
} from "lucide-react";
const AI_ROUTE = "/generator";

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setSidebarOpen(false);

  const isActive = (path: string): boolean => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        dir="rtl"
        className="sticky top-0 z-50 border-b border-[#29332D] bg-[#111714]/95 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* ================= BRAND ================= */}
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label="المساعد المدرسي"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#354039] bg-[#1A211D] text-[#B39A63] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#4A574F] group-hover:bg-[#202923]">
              <BookOpen
                size={19}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="hidden sm:block">
              <div className="text-[15px] font-bold tracking-[-0.02em] text-[#E5E9E5]">
                المساعد المدرسي
              </div>

              <div className="mt-0.5 text-[8px] font-semibold tracking-[0.22em] text-[#68756D]">
                EDUCATION TOOLS
              </div>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden items-center gap-1 md:flex">
            {/* AI Assistant */}
            <Link
              to={AI_ROUTE}
              className={`group relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                isActive(AI_ROUTE)
                  ? "bg-[#202923] text-[#DCE3DD]"
                  : "text-[#89938C] hover:bg-[#1A211D] hover:text-[#D5DBD6]"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
                  isActive(AI_ROUTE)
                    ? "bg-[#303D35] text-[#B39A63]"
                    : "bg-[#202923] text-[#718077] group-hover:bg-[#29352E] group-hover:text-[#B39A63]"
                }`}
              >
                <Sparkles size={13} strokeWidth={1.7} />
              </span>

              المساعد الذكي

              {isActive(AI_ROUTE) && (
                <span className="absolute bottom-1 right-1/2 h-1 w-1 translate-x-1/2 rounded-full bg-[#B39A63]" />
              )}
            </Link>

            {/* Divider */}
            <div className="mx-2 h-5 w-px bg-[#29332D]" />

            {/* Broadcast Library */}
            <Link
              to="/broadcasts"
              className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                isActive("/v")
                  ? "bg-[#202923] text-[#DCE3DD]"
                  : "text-[#89938C] hover:bg-[#1A211D] hover:text-[#D5DBD6]"
              }`}
            >
              <Mic2
                size={15}
                strokeWidth={1.7}
                className={
                  isActive("/broadcasts")
                    ? "text-[#91A394]"
                    : "text-[#68756D]"
                }
              />

              مكتبة الإذاعات

              {isActive("/broadcasts") && (
                <span className="absolute bottom-1 right-1/2 h-1 w-1 translate-x-1/2 rounded-full bg-[#B39A63]" />
              )}
            </Link>

            {/* certificates */}
            <Link
              to="/reports"
              className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                isActive("/Report")
                  ? "bg-[#202923] text-[#DCE3DD]"
                  : "text-[#89938C] hover:bg-[#1A211D] hover:text-[#D5DBD6]"
              }`}
            >
              <FileText
                size={15}
                strokeWidth={1.7}
                className={
                  isActive("/reports")
                    ? "text-[#91A394]"
                    : "text-[#68756D]"
                }
              />

              التقارير

              {isActive("/reports") && (
                <span className="absolute bottom-1 right-1/2 h-1 w-1 translate-x-1/2 rounded-full bg-[#B39A63]" />
              )}
            </Link>
<Link
  to="/certificates"
  className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
    isActive("/certificates")
      ? "bg-[#202923] text-[#DCE3DD]"
      : "text-[#89938C] hover:bg-[#1A211D] hover:text-[#D5DBD6]"
  }`}
>
  <BadgeCheck
    size={15}
    strokeWidth={1.7}
    className={
      isActive("/certificates")
        ? "text-[#91A394]"
        : "text-[#68756D]"
    }
  />

  الشهادات

  {isActive("/certificates") && (
    <span className="absolute bottom-1 right-1/2 h-1 w-1 translate-x-1/2 rounded-full bg-[#B39A63]" />
  )}
</Link>
            
          </nav>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex items-center gap-3">
{/* Desktop CTA */}
<Link
  to={AI_ROUTE}
  className="group hidden items-center gap-2.5 rounded-lg border border-[#3A463F] bg-[#DCE3DD] px-4 py-2.5 text-[12px] font-bold text-[#18211C] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white md:inline-flex"
>
  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#18211C]/10">
    <Lightbulb
      size={14}
      strokeWidth={1.8}
      className="transition-transform duration-300 group-hover:rotate-6"
    />
  </span>

  <span className="hidden lg:inline">
    ابدأ مع المساعد
  </span>

  <span className="inline lg:hidden">
    أنشئ محتواك الآن
  </span>

  <ArrowLeft
    size={14}
    className="transition-transform duration-200 group-hover:-translate-x-0.5"
  />
</Link>
            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="فتح القائمة"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#303A34] bg-[#171E1A] text-[#AAB3AC] transition-all duration-200 hover:border-[#4A574F] hover:bg-[#202923] hover:text-[#E0E4E0] md:hidden"
            >
              <Menu size={19} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          onClick={closeSidebar}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[3px] md:hidden"
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        dir="rtl"
        aria-hidden={!sidebarOpen}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[320px] max-w-[88vw] flex-col border-l border-[#303A34] bg-[#111714] shadow-[-25px_0_70px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-[#29332D] px-5 py-4">
          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#354039] bg-[#1A211D] text-[#B39A63]">
              <BookOpen size={17} strokeWidth={1.7} />
            </div>

            <div>
              <p className="text-sm font-bold text-[#E2E6E2]">
                المساعد المدرسي
              </p>

              <p className="mt-0.5 text-[8px] font-semibold tracking-[0.18em] text-[#68756D]">
                EDUCATION TOOLS
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="إغلاق القائمة"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#303A34] bg-[#171E1A] text-[#7F8A82] transition-colors hover:border-[#4A574F] hover:bg-[#202923] hover:text-[#D5DBD6]"
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
          {/* Assistant Card */}
          <Link
            to={AI_ROUTE}
            onClick={closeSidebar}
            className="group mb-8 overflow-hidden rounded-2xl border border-[#354039] bg-[#171E1A] p-5 transition-all duration-200 hover:border-[#4A574F] hover:bg-[#1A221E]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#3A463F] bg-[#202923] text-[#B39A63]">
                <Sparkles size={17} strokeWidth={1.7} />
              </div>

              <span className="rounded-md border border-[#3A463F] bg-[#202923] px-2 py-1 text-[9px] font-bold text-[#8FA495]">
                مساعد
              </span>
            </div>

            <p className="text-sm font-bold text-[#E0E5E0]">
              المساعد الذكي
            </p>

            <p className="mt-2 text-xs leading-6 text-[#808B83]">
              أنشئ إذاعتك أو تقريرك من خلال تجربة بسيطة ومباشرة.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#9AAA9E] transition-colors group-hover:text-[#C5CEC8]">
              ابدأ الآن
              <ArrowLeft
                size={13}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
            </div>
          </Link>

          {/* Navigation Label */}
          <p className="mb-3 px-3 text-[9px] font-bold tracking-[0.18em] text-[#68756D]">
            استكشف المنصة
          </p>

          {/* Navigation */}
          <nav className="space-y-1">
            {/* Home */}
            <Link
              to="/"
              onClick={closeSidebar}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                isActive("/")
                  ? "bg-[#202923] text-[#E0E5E0]"
                  : "text-[#858F88] hover:bg-[#171E1A] hover:text-[#D3D9D4]"
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen size={16} strokeWidth={1.7} />
                الرئيسية
              </div>

              {isActive("/") && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#B39A63]" />
              )}
            </Link>

            {/* Broadcasts */}
            <Link
              to="/broadcasts"
              onClick={closeSidebar}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                isActive("/broadcasts")
                  ? "bg-[#202923] text-[#E0E5E0]"
                  : "text-[#858F88] hover:bg-[#171E1A] hover:text-[#D3D9D4]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Mic2 size={16} strokeWidth={1.7} />
                مكتبة الإذاعات
              </div>

              {isActive("/broadcasts") && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#B39A63]" />
              )}
            </Link>

            {/* Reports */}
            <Link
              to="/reports"
              onClick={closeSidebar}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                isActive("/reports")
                  ? "bg-[#202923] text-[#E0E5E0]"
                  : "text-[#858F88] hover:bg-[#171E1A] hover:text-[#D3D9D4]"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText size={16} strokeWidth={1.7} />
                التقارير
              </div>

              {isActive("/reports") && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#B39A63]" />
              )}
            </Link>

            {/* Generator */}
            <Link
              to={AI_ROUTE}
              onClick={closeSidebar}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                isActive(AI_ROUTE)
                  ? "bg-[#202923] text-[#E0E5E0]"
                  : "text-[#858F88] hover:bg-[#171E1A] hover:text-[#D3D9D4]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles size={16} strokeWidth={1.7} />
                إنشاء محتوى
              </div>

              {isActive(AI_ROUTE) && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#B39A63]" />
              )}
            </Link>
             <Link
  to="/certificates"
  className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
    isActive("/certificates")
      ? "bg-[#202923] text-[#DCE3DD]"
      : "text-[#89938C] hover:bg-[#1A211D] hover:text-[#D5DBD6]"
  }`}
>
  <BadgeCheck
    size={15}
    strokeWidth={1.7}
    className={
      isActive("/certificates")
        ? "text-[#91A394]"
        : "text-[#68756D]"
    }
  />

  الشهادات

  {isActive("/certificates") && (
    <span className="absolute bottom-1 right-1/2 h-1 w-1 translate-x-1/2 rounded-full bg-[#B39A63]" />
  )}
</Link>
          </nav>

          {/* Bottom */}
          <div className="mt-auto pt-8">
            <div className="mb-5 h-px bg-[#29332D]" />

            <div className="rounded-xl border border-[#29332D] bg-[#151B18] p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-[#B39A63]">
                  <Lightbulb size={15} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-[#AAB2AC]">
                    فكرة صغيرة تكفي
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[#68736C]">
                    ابدأ بموضوع بسيط وحوّله إلى محتوى جاهز.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-[9px] text-[#505B54]">
              منصة لتسهيل العمل المدرسي
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AI_ROUTE = "/generator";

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const closeSidebar = () => setSidebarOpen(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const CrestIcon = ({ className = "h-[19px] w-[19px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 2 20 6v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4Z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  );

  return (
    <>
      <header dir="rtl" className="sticky top-0 z-50 border-b border-[#E4DFC9] bg-[#F7F4EA]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-3" aria-label="المساعد المدرسي">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#B8862E]/40 bg-[#15213A] shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
               <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-[#D9AE55] transition-transform duration-200 group-hover:rotate-6">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                  <path d="M5.5 5.5l13 13" />
                  <path d="M18.5 5.5l-13 13" />
                </svg>
              </span>
            </div>

            <div className="hidden sm:block">
              <div className="font-serif text-[15px] font-extrabold tracking-[-0.01em] text-[#15213A]">
                المساعد المدرسي
              </div>
              <div className="mt-0.5 text-[8px] font-bold tracking-[0.22em] text-[#9A8A5E]">
                ACADEMIC EDITION
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to={AI_ROUTE}
              className={`group relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-bold transition-all duration-200 ${
                isActive(AI_ROUTE) ? "bg-[#EDE7D2] text-[#15213A]" : "text-[#5B6478] hover:bg-[#EFEADA] hover:text-[#15213A]"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-md ${
                  isActive(AI_ROUTE)
                    ? "bg-[#15213A] text-[#D9AE55]"
                    : "bg-[#E4DFC9] text-[#6B7280] group-hover:bg-[#15213A] group-hover:text-[#D9AE55]"
                } transition-colors`}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.5l1.7 6.8L20.5 11l-6.8 1.7L12 19.5l-1.7-6.8L3.5 11l6.8-1.7L12 2.5Z" />
                </svg>
              </span>
              المساعد الذكي
            </Link>

            <div className="mx-2 h-6 w-px bg-[#E4DFC9]" />

            <Link
              to="/broadcast"
              className={`relative rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                isActive("/broadcast") ? "text-[#15213A]" : "text-[#5B6478] hover:bg-[#EFEADA] hover:text-[#15213A]"
              }`}
            >
              مكتبة الإذاعات
              {isActive("/broadcast") && <span className="absolute bottom-1 right-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#B8862E]" />}
            </Link>

            <Link
              to="/Report"
              className={`relative rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                isActive("/Report") ? "text-[#15213A]" : "text-[#5B6478] hover:bg-[#EFEADA] hover:text-[#15213A]"
              }`}
            >
              التقارير
              {isActive("/Report") && <span className="absolute bottom-1 right-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#B8862E]" />}
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              to={AI_ROUTE}
              className="group hidden items-center gap-2.5 rounded-lg bg-[#15213A] px-4.5 py-2.5 text-[12px] font-bold text-[#D9AE55] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0D1526] hover:shadow-md active:translate-y-0 md:inline-flex"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-[#D9AE55] transition-transform duration-200 group-hover:rotate-6">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                  <path d="M5.5 5.5l13 13" />
                  <path d="M18.5 5.5l-13 13" />
                </svg>
              </span>
              ابدأ مع المساعد
            </Link>

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="فتح القائمة"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E4DFC9] bg-white text-[#15213A] transition-all duration-200 hover:bg-[#EFEADA] md:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          onClick={closeSidebar}
          className="fixed inset-0 z-[60] bg-[#0D1526]/40 backdrop-blur-[3px] md:hidden"
        />
      )}

      <aside
        dir="rtl"
        aria-hidden={!sidebarOpen}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[320px] max-w-[88vw] flex-col border-l border-[#E4DFC9] bg-[#F7F4EA] shadow-[-25px_0_70px_rgba(13,21,38,0.15)] transition-transform duration-300 ease-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#E4DFC9] px-5 py-4">
          <Link to="/" onClick={closeSidebar} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8862E]/40 bg-[#15213A] text-[#D9AE55]">
              <CrestIcon className="h-[16px] w-[16px]" />
            </div>
            <div>
              <p className="font-serif text-sm font-extrabold text-[#15213A]">المساعد المدرسي</p>
              <p className="mt-0.5 text-[8px] font-bold tracking-[0.18em] text-[#9A8A5E]">ACADEMIC EDITION</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="إغلاق القائمة"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4DFC9] bg-white text-[#5B6478] transition-colors hover:text-[#15213A]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
          <Link
            to={AI_ROUTE}
            onClick={closeSidebar}
            className="group mb-7 overflow-hidden rounded-xl border border-[#B8862E]/30 bg-[#15213A] p-5 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-[#D9AE55]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.5l1.7 6.8L20.5 11l-6.8 1.7L12 19.5l-1.7-6.8L3.5 11l6.8-1.7L12 2.5Z" />
                </svg>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-bold text-[#D9AE55]">AI</span>
            </div>

            <p className="text-sm font-bold">المساعد الذكي</p>
            <p className="mt-1.5 text-xs leading-6 text-[#C7CCDA]">
              أنشئ إذاعتك أو تقريرك من خلال محادثة بسيطة مع المساعد.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#D9AE55]">
              ابدأ الآن
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            </div>
          </Link>

          <p className="mb-3 px-3 text-[9px] font-bold tracking-[0.18em] text-[#9A8A5E]">استكشف المنصة</p>

          <nav className="space-y-1">
            <Link
              to="/"
              onClick={closeSidebar}
              className={`flex items-center justify-between rounded-lg px-4 py-3.5 text-sm font-semibold transition-colors ${
                isActive("/") ? "bg-[#EDE7D2] text-[#15213A]" : "text-[#5B6478] hover:bg-white hover:text-[#15213A]"
              }`}
            >
              الرئيسية
              {isActive("/") && <span className="h-1.5 w-1.5 rounded-full bg-[#B8862E]" />}
            </Link>

            <Link
              to="/broadcast"
              onClick={closeSidebar}
              className={`flex items-center justify-between rounded-lg px-4 py-3.5 text-sm font-semibold transition-colors ${
                isActive("/broadcast") ? "bg-[#EDE7D2] text-[#15213A]" : "text-[#5B6478] hover:bg-white hover:text-[#15213A]"
              }`}
            >
              مكتبة الإذاعات
              {isActive("/broadcast") && <span className="h-1.5 w-1.5 rounded-full bg-[#B8862E]" />}
            </Link>

            <Link
              to="/Report"
              onClick={closeSidebar}
              className={`flex items-center justify-between rounded-lg px-4 py-3.5 text-sm font-semibold transition-colors ${
                isActive("/Report") ? "bg-[#EDE7D2] text-[#15213A]" : "text-[#5B6478] hover:bg-white hover:text-[#15213A]"
              }`}
            >
              التقارير
              {isActive("/Report") && <span className="h-1.5 w-1.5 rounded-full bg-[#B8862E]" />}
            </Link>
          </nav>

          <div className="mt-auto pt-8">
            <div className="mb-5 h-px bg-[#E4DFC9]" />
            <p className="text-center text-[10px] leading-5 text-[#8A8F9E]">منصة ذكية لتسهيل العمل المدرسي</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
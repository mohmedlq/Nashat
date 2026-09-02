import React from "react";

const Footer: React.FC = () => {
  return (
    <footer dir="rtl" className="border-t border-[#E4DFC9] bg-[#F7F4EA]">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#B8862E]/40 bg-[#15213A] text-[#D9AE55]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2 20 6v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4Z" />
                  <path d="M9 12l2 2 4-4.5" />
                </svg>
              </div>

              <div>
                <p className="font-serif text-sm font-bold text-[#15213A]">المساعد المدرسي</p>
                <p className="mt-1 text-[9px] font-medium tracking-[0.16em] text-[#9A8A5E]">EDUCATION TOOLS</p>
              </div>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#5B6478]">
              أدوات ذكية تساعد المعلمين ورواد النشاط على إنشاء المحتوى المدرسي بشكل أسرع وأسهل.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 font-serif text-xs font-bold text-[#15213A]">المنتج</h3>
            <ul className="space-y-3 text-sm text-[#5B6478]">
              <li><a href="#generator" className="transition-colors hover:text-[#15213A]">المولّد الذكي</a></li>
              <li><a href="#levels" className="transition-colors hover:text-[#15213A]">المراحل الدراسية</a></li>
              <li><a href="#library" className="transition-colors hover:text-[#15213A]">مكتبة الإذاعات</a></li>
              <li><a href="/ai-generator" className="transition-colors hover:text-[#15213A]">إنشاء إذاعة</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 font-serif text-xs font-bold text-[#15213A]">الموارد</h3>
            <ul className="space-y-3 text-sm text-[#5B6478]">
              <li><a href="/broadcast" className="transition-colors hover:text-[#15213A]">جميع الإذاعات</a></li>
              <li><a href="#library" className="transition-colors hover:text-[#15213A]">النماذج الجاهزة</a></li>
              <li><a href="#" className="transition-colors hover:text-[#15213A]">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-5 font-serif text-xs font-bold text-[#15213A]">المساعد المدرسي</h3>
            <ul className="space-y-3 text-sm text-[#5B6478]">
              <li><a href="#" className="transition-colors hover:text-[#15213A]">عن المشروع</a></li>
              <li><a href="#" className="transition-colors hover:text-[#15213A]">تواصل معنا</a></li>
              <li><a href="#" className="transition-colors hover:text-[#15213A]">الخصوصية</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#E4DFC9] py-6 text-xs text-[#7A8194] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} المساعد المدرسي. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8862E]" />
            <span>صُنع لخدمة البيئة التعليمية</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
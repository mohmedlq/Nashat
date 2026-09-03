import React from "react";
import { ArrowUpLeft, BookOpen, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer
      dir="rtl"
      className="border-t border-[#29332D] bg-[#0D1210]"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#354039] bg-[#1A211D] text-[#B39A63]">
                <BookOpen size={19} />
              </span>

              <div>
                <div className="font-bold text-[#E2E6E2]">
                  المساعد المدرسي
                </div>

                <div className="mt-0.5 text-[9px] font-semibold tracking-[0.2em] text-[#68736C]">
                  EDUCATION TOOLS
                </div>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#737E77]">
              أدوات بسيطة تساعد المعلمين ورواد النشاط على إعداد المحتوى
              المدرسي وتنظيمه واستخدامه بسهولة.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 text-xs font-bold text-[#D5DAD6]">
              المنتج
            </h3>

            <div className="space-y-3">
              <a
                href="#generator"
                className="block text-sm text-[#737E77] transition hover:text-[#B5BDB8]"
              >
                مولّد المحتوى
              </a>

              <a
                href="#how-it-works"
                className="block text-sm text-[#737E77] transition hover:text-[#B5BDB8]"
              >
                طريقة العمل
              </a>

              <Link
                to="/broadcast"
                className="block text-sm text-[#737E77] transition hover:text-[#B5BDB8]"
              >
                مكتبة الإذاعات
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-xs font-bold text-[#D5DAD6]">
              روابط
            </h3>

            <div className="space-y-3">
              <Link
                to="/generator"
                className="block text-sm text-[#737E77] transition hover:text-[#B5BDB8]"
              >
                إنشاء محتوى
              </Link>

              <a
                href="#library"
                className="block text-sm text-[#737E77] transition hover:text-[#B5BDB8]"
              >
                النماذج الجاهزة
              </a>

              <a
                href="mailto:"
                className="inline-flex items-center gap-2 text-sm text-[#737E77] transition hover:text-[#B5BDB8]"
              >
                <Mail size={14} />
                تواصل معنا
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-[#232C27] pt-6 text-[11px] text-[#59645D] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} المساعد المدرسي. جميع الحقوق محفوظة.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-1 transition hover:text-[#8D9890]"
          >
            العودة للأعلى
            <ArrowUpLeft size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
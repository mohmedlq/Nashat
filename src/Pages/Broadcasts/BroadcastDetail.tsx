import React, { useState } from 'react';
import type { Broadcast } from '../../types/BroadcastTypes';

interface BroadcastDetailProps {
  broadcast: Broadcast;
  onBack: () => void;
}

const SECTION_ICONS: Record<string, string> = {
  'القرآن الكريم': '📖',
  'الحديث الشريف': '🕌',
  'كلمة الصباح': '🎙️',
  'هل تعلم': '💡',
  'رسالة اليوم': '✉️',
  'نصيحة اليوم': '🌟',
  'موقف اليوم': '🎭',
};

const getSectionIcon = (section: string): string => SECTION_ICONS[section] ?? '📌';

const BroadcastDetail: React.FC<BroadcastDetailProps> = ({ broadcast, onBack }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('printable-broadcast');
    if (!element) return;

    try {
      setIsGeneratingPdf(true);
      await new Promise((resolve) => setTimeout(resolve, 100));

      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || (html2pdfModule as any);

      if (typeof html2pdf !== 'function') {
        throw new Error('فشل في تهيئة مكتبة html2pdf');
      }

      const options = {
        margin: 10,
        filename: `إذاعة_${broadcast.title.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.95 },
        html2canvas: {
          scale: 1.5,
          useCORS: true,
          logging: false,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { unit: 'mm' as const, format: 'a4', orientation: 'portrait' as const },
        pagebreak: { mode: ['css', 'legacy'] },
      };

      await html2pdf().from(element).set(options).save();
    } catch (error) {
      console.error('خطأ تفصيلي أثناء إنشاء ملف PDF:', error);
      alert('حدث خطأ أثناء تحميل الملف.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F7F4EA] text-[#1B2233] font-sans antialiased selection:bg-[#D9AE55]/30 selection:text-[#15213A] print:bg-white print:min-h-0 print:py-0">
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-16 print:max-w-none print:px-0 print:py-0">

        {/* Navigation Bar - Hidden on print */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#E4DFC9] print:hidden">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-[#5B6478] hover:text-[#15213A] transition-colors cursor-pointer group"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[#E4DFC9] text-lg leading-none transition-transform group-hover:-translate-x-0.5">
              →
            </span>
            <span>العودة لمكتبة الإذاعات</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2.5 py-1.5 rounded-md bg-[#EDE7D2] text-[#15213A]">
              {broadcast.level}
            </span>
            <span className="text-xs font-medium px-2.5 py-1.5 rounded-md bg-[#FBF3DF] text-[#8B681F] border border-[#E9D5A4]">
              {broadcast.type}
            </span>
          </div>
        </div>

        {/* Printable Section Container */}
        <div id="printable-broadcast" className="print:p-4">

          {/* Hero Article Header */}
          <header className="mb-8 print:mb-6">
            <div className="hidden print:flex items-center justify-between border-b pb-3 mb-4 border-slate-300">
              <span className="text-xs text-slate-500">المرحلة: {broadcast.level} | النوع: {broadcast.type}</span>
              <span className="text-xs text-slate-500">الإذاعة المدرسية</span>
            </div>

            <span className="text-xs font-semibold text-[#B8862E] tracking-wider uppercase mb-2 block print:hidden">
              دليل الإذاعة المدرسية
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#15213A] tracking-tight leading-snug sm:leading-tight mb-4 print:text-2xl print:mb-2">
              {broadcast.title}
            </h1>
            <p className="text-sm text-[#5B6478] leading-relaxed max-w-xl print:text-xs print:text-slate-600">
              محتوى مجهز ومقسم حسب الفقرات الرسمية للإذاعة المدرسية، جاهز للإلقاء المباشر أو الطباعة.
            </p>
          </header>

          {/* Sections Flow */}
          <div className="space-y-6 print:space-y-4">
            {broadcast.content.map((item, index) => (
              <article
                key={`${item.section}-${index}`}
                className="group bg-white rounded-xl border border-[#E4DFC9] p-6 shadow-sm print:shadow-none print:border-slate-300 print:rounded-lg print:p-4 print:break-inside-avoid"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EEE8D6] print:pb-2 print:mb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-[#F7F4EA] border border-[#E4DFC9] flex items-center justify-center text-lg shadow-sm print:w-6 print:h-6 print:text-xs">
                      {getSectionIcon(item.section)}
                    </span>
                    <h2 className="font-serif font-bold text-[#15213A] text-base print:text-sm">
                      {item.section}
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-[#9AA0AF] font-semibold tracking-wider">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Body Text */}
                <p className="text-[#3A4256] text-sm sm:text-base leading-relaxed sm:leading-loose whitespace-pre-line print:text-xs print:leading-normal">
                  {item.content}
                </p>
              </article>
            ))}
          </div>

        </div>

        {/* Action Controls - Hidden on print */}
        <footer className="mt-12 pt-8 border-t border-[#E4DFC9] flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <p className="text-xs text-[#7A8194]">
            يمكنك طباعة هذا النموذج أو تصديره كملف PDF لاستخدامه ورقيًا.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 sm:flex-none px-4 py-3 rounded-lg text-sm font-bold text-[#15213A] bg-white border border-[#E4DFC9] hover:bg-[#FBF9F0] transition-colors cursor-pointer"
            >
              العودة
            </button>

            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="flex-1 sm:flex-none px-4 py-3 rounded-lg text-sm font-bold text-[#8B681F] bg-[#FBF3DF] border border-[#E9D5A4] hover:bg-[#F6E9C4] transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="text-base">📄</span>
              {isGeneratingPdf ? 'جاري التحميل...' : 'تحميل PDF'}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 sm:flex-none px-5 py-3 rounded-lg text-sm font-bold text-[#D9AE55] bg-[#15213A] hover:bg-[#0D1526] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="text-base">🖨️</span>
              طباعة المسودة
            </button>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default BroadcastDetail;
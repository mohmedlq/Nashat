import React, { useRef, useState } from 'react';
import type { Broadcast } from '../../types/BroadcastTypes';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

const getSectionIcon = (section: string): string => {
  return SECTION_ICONS[section] ?? '📌';
};

/* =========================================================
   A4 EXPORT SETTINGS
   ========================================================= */

const A4_WIDTH_PX = 794; // 210mm عند 96dpi
const A4_PAGE_WIDTH_MM = 210;
const A4_PAGE_HEIGHT_MM = 297;
const CAPTURE_SCALE = 3;

type ActionType = 'pdf' | 'png' | 'print' | null;

/* =========================================================
   COMPONENT
   ========================================================= */

const BroadcastDetail: React.FC<BroadcastDetailProps> = ({
  broadcast,
  onBack,
}) => {
  const [activeAction, setActiveAction] = useState<ActionType>(null);

  const broadcastContentRef = useRef<HTMLDivElement>(null);

  const isBusy = activeAction !== null;

  /* =========================================================
     HELPERS
     ========================================================= */

  const waitForNextPaint = (): Promise<void> => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });
  };

  const waitForFonts = async (): Promise<void> => {
    try {
      if ('fonts' in document) {
        await document.fonts.ready;
      }
    } catch {}
  };

  const waitForImages = async (element: HTMLElement): Promise<void> => {
    const images = Array.from(element.querySelectorAll('img'));

    await Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve();
              return;
            }

            const finish = () => {
              img.removeEventListener('load', finish);
              img.removeEventListener('error', finish);
              resolve();
            };

            img.addEventListener('load', finish);
            img.addEventListener('error', finish);
          })
      )
    );
  };

  const getSafeFileName = (): string => {
    const title = broadcast.title
      .trim()
      .replace(/[\\/:*?"<>|]/g, '')
      .replace(/\s+/g, '_');

    return title || 'إذاعة_مدرسية';
  };

  /**
   * تنزيل Blob بطريقة متوافقة مع كل الأجهزة (بدل data: URI + download
   * attribute اللي يتصرف بشكل مختلف على iOS Safari وغيره).
   */
  const downloadBlob = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 60000);
  };

  const canvasToBlob = (
    canvas: HTMLCanvasElement,
    type: string,
    quality?: number
  ) =>
    new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas export returned an empty blob.'));
        },
        type,
        quality
      );
    });

  /* =========================================================
     CREATE EXPORT PAGE
     ========================================================= */

  const createExportPage = async (): Promise<HTMLDivElement> => {
    const original = broadcastContentRef.current;

    if (!original) {
      throw new Error('لم يتم العثور على محتوى الإذاعة.');
    }

    const wrapper = document.createElement('div');

    Object.assign(wrapper.style, {
      position: 'fixed',
      top: '0',
      left: '-9999px',
      width: `${A4_WIDTH_PX}px`,
      overflow: 'hidden',
      zIndex: '-9999',
    });

    const clone = original.cloneNode(true) as HTMLDivElement;

    Object.assign(clone.style, {
      width: `${A4_WIDTH_PX}px`,
      minWidth: `${A4_WIDTH_PX}px`,
      maxWidth: `${A4_WIDTH_PX}px`,
      minHeight: '1123px',
      padding: '40px',
      margin: '0',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
      direction: 'rtl',
    });

    clone.querySelectorAll('h1').forEach((el) => {
      const e = el as HTMLElement;
      e.style.fontSize = '40px';
      e.style.lineHeight = '1.4';
      e.style.marginBottom = '16px';
    });

    clone.querySelectorAll('header p').forEach((el) => {
      const e = el as HTMLElement;
      e.style.fontSize = '20px';
      e.style.lineHeight = '1.6';
    });

    clone.querySelectorAll('h2').forEach((el) => {
      const e = el as HTMLElement;
      e.style.fontSize = '28px';
      e.style.lineHeight = '1.5';
    });

    clone.querySelectorAll('article p').forEach((el) => {
      const e = el as HTMLElement;
      e.style.fontSize = '24px';
      e.style.lineHeight = '1.9';
      e.style.margin = '0';
      e.style.fontWeight = 'bold';
    });

    clone
      .querySelectorAll('article > div > div > span')
      .forEach((el) => {
        const e = el as HTMLElement;
        e.style.width = '48px';
        e.style.height = '48px';
        e.style.fontSize = '24px';
      });

    clone.querySelectorAll('article > div > span').forEach((el) => {
      const e = el as HTMLElement;
      e.style.fontSize = '18px';
    });

    clone.querySelectorAll('.space-y-6').forEach((el) => {
      const e = el as HTMLElement;
      e.classList.remove('space-y-6');
      e.style.display = 'flex';
      e.style.flexDirection = 'column';
      e.style.gap = '32px';
    });

    clone.querySelectorAll('article').forEach((el) => {
      const e = el as HTMLElement;
      e.style.breakInside = 'avoid';
      e.style.pageBreakInside = 'avoid';
      e.style.padding = '24px';
      e.style.margin = '0';
    });

    clone.querySelectorAll('article > div').forEach((el) => {
      const e = el as HTMLElement;
      e.style.paddingBottom = '12px';
      e.style.marginBottom = '16px';
    });

    // ملاحظة: هذا يحذف أي عنصر معلّم بـ export-ignore من الملف
    // المُصدَّر (حاليًا يشمل الـ header بعنوان الإذاعة). إذا تبي
    // العنوان يظهر بالـ PDF/PNG، شيل export-ignore عن الـ <header>.
    clone
      .querySelectorAll('[data-pdf-ignore], .export-ignore')
      .forEach((el) => el.remove());

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    await waitForFonts();
    await waitForImages(clone);
    await waitForNextPaint();

    return wrapper;
  };

  /* =========================================================
     GENERATE CANVAS
     ========================================================= */

  const generateCanvas = async (
    wrapper: HTMLDivElement
  ): Promise<HTMLCanvasElement> => {
    const clone = wrapper.firstChild as HTMLElement;

    return html2canvas(clone, {
      scale: CAPTURE_SCALE,
      width: A4_WIDTH_PX,
      windowWidth: A4_WIDTH_PX,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      allowTaint: false,
    });
  };

  /* =========================================================
     BUILD PDF BLOB
     (المصدر الوحيد الموثوق لإنتاج A4 — يُستخدم لكل من
     "تحميل PDF" و"طباعة")
     ========================================================= */

  const buildPdfBlob = async (): Promise<Blob> => {
    const exportWrapper = await createExportPage();

    try {
      const canvas = await generateCanvas(exportWrapper);

      const imgHeight =
        (canvas.height * A4_PAGE_WIDTH_MM) / canvas.width;

      const imageData = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      if (imgHeight <= A4_PAGE_HEIGHT_MM) {
        const yOffset = (A4_PAGE_HEIGHT_MM - imgHeight) / 2;

        pdf.addImage(
          imageData,
          'JPEG',
          0,
          yOffset,
          A4_PAGE_WIDTH_MM,
          imgHeight,
          undefined,
          'FAST'
        );
      } else {
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(
          imageData,
          'JPEG',
          0,
          position,
          A4_PAGE_WIDTH_MM,
          imgHeight,
          undefined,
          'FAST'
        );

        heightLeft -= A4_PAGE_HEIGHT_MM;

        while (heightLeft >= 1) {
          position = heightLeft - imgHeight;

          pdf.addPage();

          pdf.addImage(
            imageData,
            'JPEG',
            0,
            position,
            A4_PAGE_WIDTH_MM,
            imgHeight,
            undefined,
            'FAST'
          );

          heightLeft -= A4_PAGE_HEIGHT_MM;
        }
      }

      return pdf.output('blob');
    } finally {
      exportWrapper.remove();
    }
  };

  /* =========================================================
     DOWNLOAD PNG
     ========================================================= */

  const handleDownloadPNG = async (): Promise<void> => {
    if (isBusy) return;

    try {
      setActiveAction('png');

      await waitForNextPaint();

      const exportWrapper = await createExportPage();

      try {
        const canvas = await generateCanvas(exportWrapper);
        const blob = await canvasToBlob(canvas, 'image/png');

        downloadBlob(blob, `${getSafeFileName()}.png`);
      } finally {
        exportWrapper.remove();
      }
    } catch (error) {
      console.error('PNG generation failed:', error);
      alert('حدث خطأ أثناء تحميل صورة PNG.');
    } finally {
      setActiveAction(null);
    }
  };

  /* =========================================================
     DOWNLOAD PDF
     ========================================================= */

  const handleDownloadPDF = async (): Promise<void> => {
    if (isBusy) return;

    try {
      setActiveAction('pdf');

      await waitForNextPaint();

      const pdfBlob = await buildPdfBlob();
      downloadBlob(pdfBlob, `${getSafeFileName()}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('حدث خطأ أثناء تحميل ملف PDF.');
    } finally {
      setActiveAction(null);
    }
  };

  /* =========================================================
     PRINT
     يولّد نفس ملف PDF المضبوط بمقاس A4 ويفتحه بتبويب جديد ليطبعه
     المستخدم من عارض PDF — هذا يعمل بنفس الشكل على كل الأجهزة
     (جوال / لابتوب)، بعكس الاعتماد على window.print() للصفحة الحية.
     ========================================================= */

  const handlePrint = async (): Promise<void> => {
    if (isBusy) return;

    try {
      setActiveAction('print');

      await waitForNextPaint();

      const pdfBlob = await buildPdfBlob();
      const url = URL.createObjectURL(pdfBlob);

      const printWindow = window.open(url, '_blank');

      if (!printWindow) {
        // بعض متصفحات الجوال تمنع فتح نافذة جديدة (popup blocker)
        downloadBlob(pdfBlob, `${getSafeFileName()}.pdf`);
        alert(
          'تم تحميل ملف PDF لأن المتصفح منع فتح نافذة جديدة. افتح الملف واطبعه من هناك.'
        );
      }

      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) {
      console.error('Print preparation failed:', error);
      alert('حدث خطأ أثناء تجهيز الإذاعة للطباعة.');
    } finally {
      setActiveAction(null);
    }
  };

  /* =========================================================
     UI
     ========================================================= */

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#111714] text-[#E5E9E5] font-sans antialiased selection:bg-[#B39A63]/20 selection:text-[#E5E9E5]"
    >
      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        {/* ================= NAVIGATION ================= */}

        <div className="mb-10 flex items-center justify-between border-b border-[#29332D] pb-6">
          <button
            type="button"
            onClick={onBack}
            disabled={isBusy}
            className="group inline-flex cursor-pointer items-center gap-2 text-sm font-bold tracking-wide text-[#89938C] transition-colors hover:text-[#DCE3DD] disabled:cursor-not-allowed disabled:opacity-50 export-ignore"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#303A34] bg-[#171E1A] text-lg leading-none text-[#9AAA9E] transition-all group-hover:-translate-x-0.5 group-hover:border-[#46534B] group-hover:bg-[#202923]">
              →
            </span>
            <span>العودة لمكتبة الإذاعات</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="rounded-md border border-[#303A34] bg-[#202923] px-2.5 py-1.5 text-xs font-medium text-[#A4AEA7]">
              {broadcast.level}
            </span>

            <span className="rounded-md border border-[#4A4638] bg-[#27251F] px-2.5 py-1.5 text-xs font-medium text-[#B9A875]">
              {broadcast.type}
            </span>
          </div>
        </div>

        {/* ================= BROADCAST CONTENT ================= */}

        <div ref={broadcastContentRef} className="w-full rounded-2xl bg-[#171E1A]">
          {/* ================= HEADER ================= */}

          <header className="mb-8 export-ignore">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#B39A63]">
              دليل الإذاعة المدرسية
            </span>

            <h1 className="mb-4 font-serif text-3xl font-extrabold leading-snug tracking-tight text-[#E7EAE6] sm:text-4xl sm:leading-tight">
              {broadcast.title}
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-[#89938C] sm:text-lg">
              محتوى مجهز ومقسم حسب الفقرات الرسمية للإذاعة المدرسية، جاهز
              للإلقاء المباشر أو الاستخدام الورقي.
            </p>
          </header>

          {/* ================= SECTIONS ================= */}

          <div className="space-y-6">
            {broadcast.content.map((item, index) => (
              <article
                key={`${item.section}-${index}`}
                className="group rounded-xl border-2 border-[#303A34] bg-[#171E1A] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-[#46534B] hover:bg-[#1A221E] hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
              >
                <div className="mb-4 flex items-center justify-between border-b border-[#29332D] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#354039] bg-[#202923] text-lg shadow-sm">
                      {getSectionIcon(item.section)}
                    </span>

                    <h2 className="font-serif text-2xl font-bold text-[#E3E7E3] transition-colors group-hover:text-[#B7C2BA] sm:text-3xl">
                      {item.section}
                    </h2>
                  </div>

                  <span className="font-mono text-xs font-semibold tracking-wider text-[#68756D]">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <p className="whitespace-pre-line text-2xl font-bold leading-relaxed text-[#B6BDB8] sm:leading-loose">
                  {item.content}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ================= ACTIONS ================= */}

        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#29332D] pt-8 sm:flex-row">
          <p className="text-xs text-[#68756D]">
            يمكنك طباعة الإذاعة أو تحميلها بصيغة PDF أو PNG.
          </p>

          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            {/* BACK */}
            <button
              type="button"
              onClick={onBack}
              disabled={isBusy}
              className="flex-1 cursor-pointer rounded-lg border border-[#303A34] bg-[#171E1A] px-4 py-3 text-sm font-bold text-[#A5AEA8] transition-all hover:border-[#46534B] hover:bg-[#202923] hover:text-[#DCE3DD] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              العودة
            </button>

            {/* PRINT */}
            <button
              type="button"
              onClick={handlePrint}
              disabled={isBusy}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#303A34] bg-[#171E1A] px-4 py-3 text-sm font-bold text-[#A5AEA8] transition-all hover:border-[#46534B] hover:bg-[#202923] hover:text-[#DCE3DD] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              {activeAction === 'print' ? 'جاري التجهيز...' : 'طباعة'}
            </button>

            {/* PNG */}
            <button
              type="button"
              onClick={handleDownloadPNG}
              disabled={isBusy}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#303A34] bg-[#171E1A] px-4 py-3 text-sm font-bold text-[#A5AEA8] transition-all hover:border-[#46534B] hover:bg-[#202923] hover:text-[#DCE3DD] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              {activeAction === 'png' ? 'جاري التصدير...' : 'تحميل PNG'}
            </button>

            {/* PDF */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isBusy}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#4A4638] bg-[#27251F] px-4 py-3 text-sm font-bold text-[#B9A875] transition-all hover:border-[#B39A63]/60 hover:bg-[#302D24] hover:text-[#D0BC86] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              {activeAction === 'pdf' ? 'جاري المعالجة...' : 'تحميل PDF'}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default BroadcastDetail;
import React, { useState, useRef } from 'react';
import type { ReportFormData, MockReport } from '../../../types/ReportsTypes';
import logoImage from '../../../assets/MinistrLogo.png';
import { useUser } from '../../../context/Context';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getTodayHijri, stripWhiteBackground } from '../../../misc/miscOne';

import { PRESET_THEMES, type Theme } from '../../../misc/Theme';
import { A4_WIDTH_MM, A4_HEIGHT_MM, A4_WIDTH_PX, A4_HEIGHT_PX } from '../../../misc/PdfConfig';
import { ReportEditForm } from './ReportEditForm';
import { ReportPrintDocument } from './ReportPrint.tsx';
import { PrinterIcon, PdfDownloadIcon, ImageDownloadIcon, SpinnerIcon } from '../../../Icons/Icons';

export type { Theme };
export { PRESET_THEMES };

/* ============================
 * TYPES & PROPS
 * ============================ */

export interface ReportProps {
  id?: string;
  initialData?: Partial<ReportFormData>;
  logoUrl?: string;
  initialThemeId?: string;
  onChange?: (data: ReportFormData) => void;
  onSubmit?: (data: ReportFormData) => void;
}

type ToastType = 'error' | 'success' | 'warning' | 'info';

interface ToastState {
  message: string;
  type: ToastType;
}

/* ============================
 * COMPONENT
 * ============================ */

export default function Report({
  id,
  initialData,
  logoUrl,
  initialThemeId = 'emerald-teal',
  onChange,
  onSubmit,
}: ReportProps) {
  const {
    schoolName,
    teacherName,
    region,
    setSchoolName,
    setTeacherName,
    setRegion,
    reports,
    setNewReport,
  } = useUser();

  const report = reports.find((item) => String(item.id) === id);
  const printRef = useRef<HTMLDivElement>(null);

  const [downloadingType, setDownloadingType] = useState<'pdf' | 'png' | 'print' | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  // دالة لإظهار الإشعارات بشكل محترف بدلاً من alert
  const showToast = (message: string, type: ToastType = 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 4500);
  };

  const DEFAULT_FORM_DATA: ReportFormData = {
    schoolName: schoolName || '',
    region: region || '',
    reportTitle: '',
    implementer: teacherName || '',
    location: 'الفصل الدراسي',
    target: 'الطلاب',
    beneficiaries: '33',
    date: getTodayHijri(),
    objectives: '',
    evidences: [null, null, null, null],
  };

  const [formData, setFormData] = useState<ReportFormData>(() => ({
    ...DEFAULT_FORM_DATA,
    ...(report?.formData ?? initialData ?? {}),
    evidences:
      report?.formData?.evidences ?? initialData?.evidences ?? DEFAULT_FORM_DATA.evidences,
  }));

  const [processedLogoSrc, setProcessedLogoSrc] = useState<string | null>(null);

  React.useEffect(() => {
    const sourceUrl = logoUrl || logoImage;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        setProcessedLogoSrc(stripWhiteBackground(img));
      } catch (error) {
        console.error('Logo background removal failed:', error);
        setProcessedLogoSrc(null);
      }
    };

    img.onerror = () => setProcessedLogoSrc(null);
    img.src = sourceUrl;
  }, [logoUrl]);

  React.useEffect(() => {
    if (report) {
      setFormData((prev) => ({
        ...prev,
        ...report.formData,
        evidences: report.formData.evidences ?? prev.evidences,
      }));
      return;
    }

    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        evidences: initialData.evidences ?? prev.evidences,
      }));
    }
  }, [report, initialData]);

  const [currentTheme, setCurrentTheme] = useState<Theme>(
    () => PRESET_THEMES.find((theme) => theme.id === initialThemeId) || PRESET_THEMES[0]
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateUserValue = () => {
    setSchoolName(formData.schoolName);
    setTeacherName(formData.implementer);
    setRegion(formData.region);
  };

  function onSave() {
    if (report) {
      setNewReport((prev) =>
        prev.map((item) => (String(item.id) === id ? { ...item, formData } : item))
      );
      return;
    }

    const newReport: MockReport = {
      id: Date.now(),
      category: 'مصنوعة مني',
      type: 'عام',
      formData,
    };

    setNewReport((prev) => [...prev, newReport]);
  }

  const updateFormData = (updater: (prev: ReportFormData) => ReportFormData) => {
    setFormData((prev) => {
      const updated = updater(prev);
      onChange?.(updated);
      return updated;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    updateFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('الرجاء اختيار ملف صورة صالح فقط.', 'warning');
      e.target.value = '';
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    updateFormData((prev) => {
      const newEvidences = [...prev.evidences];
      const oldImage = newEvidences[index];

      if (oldImage && oldImage.startsWith('blob:')) {
        URL.revokeObjectURL(oldImage);
      }

      newEvidences[index] = imageUrl;
      return { ...prev, evidences: newEvidences };
    });

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    const oldImage = formData.evidences[index];

    if (oldImage && oldImage.startsWith('blob:')) {
      URL.revokeObjectURL(oldImage);
    }

    updateFormData((prev) => {
      const newEvidences = [...prev.evidences];
      newEvidences[index] = null;
      return { ...prev, evidences: newEvidences };
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const hasEvidence = formData.evidences.some((src) => Boolean(src));

    if (!hasEvidence) {
      newErrors.evidences = 'يجب إضافة صورة شاهد واحدة على الأقل.';
      showToast('يجب إضافة صورة شاهد واحدة على الأقل للاستمرار.', 'warning');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const waitForDocumentFonts = async () => {
    if ('fonts' in document) {
      try {
        await (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
      } catch {}
    }
  };

  const waitForImages = async (element: HTMLElement) => {
    const images = Array.from(element.querySelectorAll('img'));

    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
          const finish = () => {
            img.removeEventListener('load', finish);
            img.removeEventListener('error', finish);
            resolve();
          };
          img.addEventListener('load', finish);
          img.addEventListener('error', finish);
        });
      })
    );
  };

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

  const getCaptureScale = () => 3;

  const captureReportCanvas = async (element: HTMLElement, scale: number) => {
    await waitForDocumentFonts();
    await waitForImages(element);

    return html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 15000,
      width:A4_WIDTH_PX,
      height:A4_HEIGHT_PX,
      windowWidth: A4_WIDTH_PX,
      windowHeight:A4_HEIGHT_PX,
      x: 0,        
      y: 0,     
      scrollY: 0,  
      scrollX: 0,
      ignoreElements: (el) =>
        el.hasAttribute('data-pdf-ignore') || el.classList.contains('export-ignore'),
    });
  };

  const getSafeFileName = () => {
    const title = formData.reportTitle
      .trim()
      .replace(/[\\/:*?"<>|]/g, '')
      .replace(/\s+/g, '-');

    return title || 'تقرير';
  };

  const generateReportPdfBlob = async (): Promise<Blob> => {
    if (!printRef.current) {
      throw new Error('Print document element not found.');
    }

    const canvas = await captureReportCanvas(printRef.current, getCaptureScale());

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = A4_WIDTH_MM;
    const pageHeight = A4_HEIGHT_MM;

    const pdfScale = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);

    const imgWidth = canvas.width * pdfScale;
    const imgHeight = canvas.height * pdfScale;

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    const imageData = canvas.toDataURL('image/jpeg', 0.96);

    pdf.addImage(imageData, 'JPEG', x, y, imgWidth, imgHeight, undefined, 'FAST');

    return pdf.output('blob');
  };

  const handleDownloadPDF = async () => {
    if (!validateForm()) return;

    try {
      setDownloadingType('pdf');

      updateUserValue();
      onSave();
      onSubmit?.(formData);

      const pdfBlob = await generateReportPdfBlob();
      downloadBlob(pdfBlob, `${getSafeFileName()}.pdf`);
      showToast('تم تحميل التقرير بصيغة PDF بنجاح!', 'success');
    } catch (error) {
      console.error('PDF generation failed:', error);
      showToast('تعذر تحميل التقرير كملف PDF. حاول مرة أخرى.', 'error');
    } finally {
      setDownloadingType(null);
    }
  };

  const handleDownloadPNG = async () => {
    if (!validateForm()) return;
    if (!printRef.current) return;

    try {
      setDownloadingType('png');

      updateUserValue();
      onSave();
      onSubmit?.(formData);

      const canvas = await captureReportCanvas(printRef.current, getCaptureScale());
      const imageBlob = await canvasToBlob(canvas, 'image/png');
      downloadBlob(imageBlob, `${getSafeFileName()}.png`);
      showToast('تم تحميل التقرير كصورة بنجاح!', 'success');
    } catch (error) {
      console.error('PNG generation failed:', error);
      showToast('تعذر تحميل التقرير كصورة PNG. حاول مرة أخرى.', 'error');
    } finally {
      setDownloadingType(null);
    }
  };

  const handlePrint = async () => {
    if (!validateForm()) return;

    // فتح نافذة جديدة فوراً لمنع حظر المتصفح للنوافذ المنبثقة
    const printWindow = window.open('', '_blank');

    try {
      setDownloadingType('print');

      updateUserValue();
      onSave();
      onSubmit?.(formData);

      const pdfBlob = await generateReportPdfBlob();
      const url = URL.createObjectURL(pdfBlob);

      if (printWindow) {
        printWindow.location.href = url;
      } else {
        downloadBlob(pdfBlob, `${getSafeFileName()}.pdf`);
        showToast(
          'تم تحميل ملف PDF لأن المتصفح منع فتح النافذة تلقائياً.',
          'info'
        );
      }

      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) {
      if (printWindow) printWindow.close();
      console.error('Print preparation failed:', error);
      showToast('تعذر تجهيز التقرير للطباعة. حاول مرة أخرى.', 'error');
    } finally {
      setDownloadingType(null);
    }
  };

  const isBusy = downloadingType !== null;
  const logoSrc = processedLogoSrc || logoUrl;

  return (
    <div
      dir="rtl"
      className="relative min-h-screen w-full overflow-x-auto bg-[#111714] px-2 py-4 text-[#E5E9E5] font-sans antialiased selection:bg-[#B39A63]/20 selection:text-[#E5E9E5] sm:px-4 sm:py-8 print:hidden"
    >
      <style>{`
        @media print {
          body::before {
            content: 'الرجاء استخدام زر "طباعة" أو "تحميل PDF" داخل الصفحة لضمان توافق المقاس مع ورقة A4 على جميع الأجهزة.';
            display: block;
            padding: 40px;
            font-size: 18px;
            text-align: center;
            direction: rtl;
          }
        }
      `}</style>

      {/* ================= TOAST NOTIFICATION SYSTEM ================= */}
      {toast && (
        <div className="fixed top-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-[#3A463F] bg-[#171E1A] px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all animate-in fade-in slide-in-from-top-4">
          <span
            className={`h-3 w-3 rounded-full ${
              toast.type === 'error'
                ? 'bg-red-500'
                : toast.type === 'warning'
                ? 'bg-amber-500'
                : toast.type === 'success'
                ? 'bg-emerald-500'
                : 'bg-blue-500'
            }`}
          />
          <span className="text-sm font-semibold text-[#E5E9E5]">{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="mr-2 text-xs text-[#7F8A82] hover:text-[#E5E9E5]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Form التعديل التفاعلي */}
      <ReportEditForm
        formData={formData}
        errors={errors}
        theme={currentTheme}
        logoSrc={logoSrc}
        onChange={handleChange}
        onImageUpload={handleImageUpload}
        onRemoveImage={handleRemoveImage}
      />

      {/* مستند الطباعة المخفي بالتنسيق الصحيح للالتقاط عبر html2canvas */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: A4_WIDTH_PX,
          zIndex: -9999,
          opacity: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <ReportPrintDocument ref={printRef} data={formData} theme={currentTheme} logoSrc={logoSrc} />
      </div>

      {/* ================= CONTROLS ================= */}
      <div
        className="mx-auto mt-8 flex w-full max-w-[95%] flex-col items-center gap-4 rounded-2xl border border-[#29332D] bg-[#171E1A] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)] sm:w-fit sm:flex-row sm:rounded-full sm:px-6 sm:py-3"
        data-pdf-ignore
      >
        <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:border-l sm:border-[#29332D] sm:pl-4">
          <span className="whitespace-nowrap text-sm font-bold text-[#89938C]">
            اختر الثيم:
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRESET_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setCurrentTheme(theme)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                  currentTheme.id === theme.id
                    ? 'scale-105 border-[#46534B] bg-[#202923] text-[#E5E9E5] shadow-sm ring-1 ring-[#B39A63]/40'
                    : 'border-transparent text-[#7F8A82] hover:border-[#303A34] hover:bg-[#202923] hover:text-[#D3D9D4]'
                }`}
              >
                <div className="flex h-3.5 w-7 overflow-hidden rounded-full border border-[#46534B]">
                  {theme.swatches.map((color, index) => (
                    <span key={index} className="h-full flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <span>{theme.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          disabled={isBusy}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#3A463F] bg-[#202923] px-6 py-2 text-md font-bold text-[#DCE3DD] shadow-sm transition-all hover:border-[#B39A63]/50 hover:bg-[#29352E] hover:text-[#E7E9E5] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto cursor-pointer"
        >
          {downloadingType === 'print' ? (
            <>
              <SpinnerIcon />
              <span>جاري التجهيز...</span>
            </>
          ) : (
            <>
              <PrinterIcon />
              <span>طباعة</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isBusy}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#3A463F] bg-[#202923] px-6 py-2 text-md font-bold text-[#DCE3DD] shadow-sm transition-all hover:border-[#B39A63]/50 hover:bg-[#29352E] hover:text-[#E7E9E5] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto cursor-pointer"
        >
          {downloadingType === 'pdf' ? (
            <>
              <SpinnerIcon />
              <span>جاري تجهيز PDF...</span>
            </>
          ) : (
            <>
              <PdfDownloadIcon />
              <span>تحميل PDF</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownloadPNG}
          disabled={isBusy}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#3A463F] bg-[#202923] px-6 py-2 text-md font-bold text-[#DCE3DD] shadow-sm transition-all hover:border-[#B39A63]/50 hover:bg-[#29352E] hover:text-[#E7E9E5] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto cursor-pointer"
        >
          {downloadingType === 'png' ? (
            <>
              <SpinnerIcon />
              <span>جاري تجهيز PNG...</span>
            </>
          ) : (
            <>
              <ImageDownloadIcon />
              <span>تحميل PNG</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
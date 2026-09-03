import React, { useState, useRef } from 'react';
import DatePicker from 'react-multi-date-picker';
import arabic from 'react-date-object/calendars/arabic';
import arabic_ar from 'react-date-object/locales/arabic_ar';
import type {
  ReportFormData,
  MockReport,
} from '../../types/ReportsTypes';
import logoImage from '../../assets/MinistrLogo.png';
import { useUser } from '../../context/Context';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getTodayHijri,stripWhiteBackground } from '../../misc/miscOne';
const Picker = (DatePicker as any).default || DatePicker;

/* ============================
 * A4 CONSTANTS
 * ============================ */

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// نسبة mm -> px ثابتة في مواصفات CSS (3.7795275591), لا تعتمد على DPI الجهاز
const MM_TO_PX = 96 / 25.4;
const A4_WIDTH_PX = Math.round(A4_WIDTH_MM * MM_TO_PX); // ~794
const A4_HEIGHT_PX = Math.round(A4_HEIGHT_MM * MM_TO_PX); // ~1123

/* ============================
 * THEMES
 * ============================ */

export type Theme = {
  id: string;
  name: string;
  headerGradient: string;
  darkAccent: string;
  primaryBorder: string;
  labelColor: string;
  titleBorder: string;
  btnBg: string;
  swatches: string[];
};

export const PRESET_THEMES: Theme[] = [
  {
    id: 'emerald-teal',
    name: 'الأخضر التعليمي (الافتراضي)',
    headerGradient:
      'linear-gradient(to left, #34d399, #14b8a6, #0ea5e9)',
    darkAccent: '#0f3d3e',
    primaryBorder: '#14b8a6',
    labelColor: '#0d9488',
    titleBorder: '#2dd4bf',
    btnBg: '#0d9488',
    swatches: ['#34d399', '#14b8a6', '#0ea5e9', '#0f3d3e'],
  },
  {
    id: 'royal-navy',
    name: 'الكحلي والذهبي الملكي',
    headerGradient:
      'linear-gradient(to left, #0f172a, #1e3a8a, #2563eb)',
    darkAccent: '#0b1220',
    primaryBorder: '#3b82f6',
    labelColor: '#b45309',
    titleBorder: '#f59e0b',
    btnBg: '#b45309',
    swatches: ['#0f172a', '#1e3a8a', '#f59e0b', '#0b1220'],
  },
  {
    id: 'burgundy-luxury',
    name: 'العنابي الدافئ',
    headerGradient:
      'linear-gradient(to left, #6b21a8, #9f1239, #be123c)',
    darkAccent: '#3f0a1c',
    primaryBorder: '#be123c',
    labelColor: '#9f1239',
    titleBorder: '#fb7185',
    btnBg: '#9f1239',
    swatches: ['#6b21a8', '#9f1239', '#be123c', '#3f0a1c'],
  },
  {
    id: 'amber-gold',
    name: 'الذهبي الكهرماني',
    headerGradient:
      'linear-gradient(to left, #b45309, #d97706, #f59e0b)',
    darkAccent: '#4a2c05',
    primaryBorder: '#d97706',
    labelColor: '#b45309',
    titleBorder: '#fbbf24',
    btnBg: '#b45309',
    swatches: ['#b45309', '#d97706', '#f59e0b', '#4a2c05'],
  },
  {
    id: 'slate-formal',
    name: 'الرمادي الرسمي',
    headerGradient:
      'linear-gradient(to left, #334155, #475569, #64748b)',
    darkAccent: '#1e293b',
    primaryBorder: '#64748b',
    labelColor: '#475569',
    titleBorder: '#94a3b8',
    btnBg: '#475569',
    swatches: ['#334155', '#475569', '#64748b', '#1e293b'],
  },
  {
    id: 'sky-calm',
    name: 'الأزرق السماوي الهادئ',
    headerGradient:
      'linear-gradient(to left, #0369a1, #0284c7, #38bdf8)',
    darkAccent: '#0c3450',
    primaryBorder: '#0284c7',
    labelColor: '#0369a1',
    titleBorder: '#7dd3fc',
    btnBg: '#0369a1',
    swatches: ['#0369a1', '#0284c7', '#38bdf8', '#0c3450'],
  },
  {
    id: 'olive-classic',
    name: 'الزيتوني التقليدي',
    headerGradient:
      'linear-gradient(to left, #3f6212, #4d7c0f, #65a30d)',
    darkAccent: '#1a2e05',
    primaryBorder: '#4d7c0f',
    labelColor: '#3f6212',
    titleBorder: '#84cc16',
    btnBg: '#3f6212',
    swatches: ['#3f6212', '#4d7c0f', '#65a30d', '#1a2e05'],
  },
];
/* ============================
 * PROPS
 * ============================ */

export interface ReportProps {
  id?: string;
  initialData?: Partial<ReportFormData>;
  logoUrl?: string;
  initialThemeId?: string;
  onChange?: (data: ReportFormData) => void;
  onSubmit?: (data: ReportFormData) => void;
}

/* ============================
 * FIELD PROPS
 * ============================ */

type FieldProps = {
  label: string;
  name: keyof ReportFormData;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  type?: 'text' | 'textarea' | 'date';
  className?: string;
  align?: 'center' | 'right';
  theme: Theme;
  isExportMode?: boolean;
};

/* ============================
 * FIELD
 * ============================ */

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  className = '',
  align = 'center',
  theme,
  isExportMode = false,
}: FieldProps) {
  return (
    <div
      className={`relative min-w-0 rounded-[11px] border-2 bg-white px-3 py-4 transition-all sm:px-5 sm:py-5 ${className}`}
      style={{
        borderColor: error ? '#ef4444' : theme.primaryBorder,
      }}
    >
      <span
        className="absolute -top-4 right-4 bg-white px-2 text-[16px] font-bold transition-colors sm:-top-5 sm:right-5 sm:text-[22px]"
        style={{
          color: error ? '#ef4444' : theme.labelColor,
        }}
      >
        {label}
      </span>

      <div className="h-full w-full min-w-0">
        {isExportMode ? (
          <div
            className={`w-full min-w-0 whitespace-pre-wrap break-words text-[19px] leading-[1.7] text-[#424242] ${
              type === 'textarea' ? 'min-h-[190px]' : ''
            } ${align === 'right' ? 'text-right' : 'text-center'}`}
          >
            {value && value.trim() ? value : '\u00A0'}
          </div>
        ) : type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className={`h-full min-h-[150px] w-full resize-none overflow-auto bg-transparent text-[16px] leading-[1.7] text-[#424242] outline-none placeholder:text-gray-300 sm:min-h-[190px] sm:text-[19px] ${
              align === 'right' ? 'text-right' : 'text-center'
            }`}
            placeholder={`أدخل ${label}`}
          />
        ) : type === 'date' ? (
          <div className="relative flex w-full min-w-0 items-center">
            <Picker
              value={value ? value.replace(/[همـ\s]/g, '') : ''}
              onChange={(date: any) => {
                const formatted = date
                  ? `${date.format('YYYY/MM/DD')} هـ`
                  : '';

                onChange({
                  target: { name, value: formatted },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              calendar={arabic}
              locale={arabic_ar}
              calendarPosition="bottom-right"
              containerClassName="w-full"
              inputClass={`w-full min-w-0 bg-transparent text-[18px] leading-8 text-[#424242] outline-none placeholder:text-gray-300 sm:text-[22px] ${
                align === 'right' ? 'text-right' : 'text-center'
              }`}
              placeholder={`اختر ${label}`}
            />
          </div>
        ) : (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full min-w-0 bg-transparent text-[18px] leading-8 text-[#424242] outline-none placeholder:text-gray-300 sm:text-[22px] ${
              align === 'right' ? 'text-right' : 'text-center'
            }`}
            placeholder={`أدخل ${label}`}
          />
        )}
      </div>

      {error && !isExportMode && (
        <span className="absolute -bottom-6 right-5 text-sm font-bold text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}

/* ============================
 * HEADER TEXT
 * ============================ */

function HeaderText({
  isExportMode,
  value,
  placeholder,
  className,
  name,
  onChange,
}: {
  isExportMode: boolean;
  value: string;
  placeholder: string;
  className: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const textClasses = `${className} block w-full min-w-0 m-0 p-0 leading-[1.2]`;

  if (isExportMode) {
    return (
      <div className={`${textClasses} flex items-center justify-center`}>
        {value && value.trim() ? value : '\u00A0'}
      </div>
    );
  }

  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={textClasses}
    />
  );
}

/* ============================
 * MINISTRY LOGO
 * ============================ */

function MinistryLogo({ src }: { src?: string }) {
  return (
    <img
      src={src || logoImage}
      alt="شعار وزارة التعليم السعودية"
      className="h-16 w-auto object-contain"
    />
  );
}

/* ============================
 * ICONS
 * ============================ */

function PrinterIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

function PdfDownloadIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <polyline points="9 14 12 17 15 14" />
    </svg>
  );
}

function ImageDownloadIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function SpinnerIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
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

  const reportRef = useRef<HTMLDivElement>(null);

  // 'pdf' | 'png' | 'print' -> نفس القناة الموثوقة تُستخدم للثلاثة
  const [downloadingType, setDownloadingType] = useState
   < 'pdf' | 'png' | 'print' | null
  >(null);

  const [isExportMode, setIsExportMode] = useState(false);

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
      report?.formData?.evidences ??
      initialData?.evidences ??
      DEFAULT_FORM_DATA.evidences,
  }));
const [processedLogoSrc, setProcessedLogoSrc] = useState<string | null>(
  null
);
React.useEffect(() => {
  const sourceUrl = logoUrl || logoImage;

  const img = new Image();

  // مهم فقط إذا كان الشعار من رابط خارجي (Cross-Origin)؛ الصور
  // المستوردة محليًا (bundled) تعمل بدون مشاكل بأي الحالتين.
  img.crossOrigin = 'anonymous';

  img.onload = () => {
    try {
      const transparentSrc = stripWhiteBackground(img);
      setProcessedLogoSrc(transparentSrc);
    } catch (error) {
      // لو فشلت المعالجة (مثلاً صورة خارجية بدون رؤوس CORS صحيحة
      // تخلي الـ canvas "tainted")، نرجع للصورة الأصلية كحل احتياطي
      console.error('Logo background removal failed:', error);
      setProcessedLogoSrc(null);
    }
  };

  img.onerror = () => {
    setProcessedLogoSrc(null);
  };

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
    () =>
      PRESET_THEMES.find((theme) => theme.id === initialThemeId) ||
      PRESET_THEMES[0]
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
        prev.map((item) =>
          String(item.id) === id ? { ...item, formData } : item
        )
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

  const updateFormData = (
    updater: (prev: ReportFormData) => ReportFormData
  ) => {
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
      alert('الرجاء اختيار ملف صورة فقط.');
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
      newErrors.evidences = 'يجب إضافة صورة شاهد واحدة على الأقل .';
      alert('يجب إضافة صورة شاهد واحدة على الأقل .');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const waitForNextPaint = () =>
    new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    );

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

  /* ============================
   * EXPORT MODE
   * (المصدر الوحيد والموثوق لأي إخراج A4:
   *   PDF / PNG / طباعة كلهم يمرّون من هنا)
   * ============================ */

  const enterExportMode = async () => {
    setIsExportMode(true);

    const element = reportRef.current;

    if (element) {
      // نفرض عرض A4 بالبكسل الثابت (مو mm عشان نتحكم بدقة كاملة
      // ونضمن تطابق windowWidth في html2canvas لاحقًا)
      element.style.width = `${A4_WIDTH_PX}px`;
      element.style.maxWidth = 'none';
    }

    await waitForNextPaint();
    await waitForNextPaint();
    await waitForDocumentFonts();

    if (reportRef.current) {
      await waitForImages(reportRef.current);
    }
  };

  const exitExportMode = () => {
    const element = reportRef.current;

    if (element) {
      element.style.width = '';
      element.style.maxWidth = '';
    }

    setIsExportMode(false);
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

  const captureReportCanvas = async (
    element: HTMLElement,
    scale: number
  ) => {
    await waitForImages(element);

    return html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 15000,
      x: 0,
      y: 0,
      width: element.scrollWidth,
      height: element.scrollHeight,
      // نطابق windowWidth مع عرض A4 الفعلي المفروض على العنصر
      // (بدل رقم ثابت غير مرتبط بالواقع) عشان الـ breakpoints
      // تتفعّل بنفس الطريقة دائمًا بغض النظر عن جهاز المستخدم
      windowWidth: A4_WIDTH_PX,
      windowHeight: Math.max(A4_HEIGHT_PX, element.scrollHeight),
      ignoreElements: (el) =>
        el.hasAttribute('data-pdf-ignore') ||
        el.classList.contains('export-ignore'),
    });
  };

  const getSafeFileName = () => {
    const title = formData.reportTitle
      .trim()
      .replace(/[\\/:*?"<>|]/g, '')
      .replace(/\s+/g, '-');

    return title || 'تقرير';
  };

  /**
   * ينتج PDF مطابق تمامًا لمقاس A4 (210×297mm) من عنصر التقرير.
   * هذه هي القناة الوحيدة والموثوقة لإنتاج مخرجات A4 — تُستخدم
   * لكل من "تحميل PDF" و "طباعة"، لأن الاعتماد على window.print()
   * غير متسق عبر المتصفحات والأجهزة (خصوصًا الجوال).
   */
  const generateReportPdfBlob = async (): Promise<Blob> => {
    if (!reportRef.current) {
      throw new Error('Report element not found.');
    }

    const canvas = await captureReportCanvas(
      reportRef.current,
      getCaptureScale()
    );

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = A4_WIDTH_MM;
    const pageHeight = A4_HEIGHT_MM;

    const pdfScale = Math.min(
      pageWidth / canvas.width,
      pageHeight / canvas.height
    );

    const imgWidth = canvas.width * pdfScale;
    const imgHeight = canvas.height * pdfScale;

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2; // توسيط عمودي أيضًا بدل الالتصاق بالأعلى

    const imageData = canvas.toDataURL('image/jpeg', 0.96);

    pdf.addImage(
      imageData,
      'JPEG',
      x,
      y,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );

    return pdf.output('blob');
  };

  const handleDownloadPDF = async () => {
    if (!validateForm()) return;

    try {
      setDownloadingType('pdf');

      updateUserValue();
      onSave();
      onSubmit?.(formData);

      await enterExportMode();

      const pdfBlob = await generateReportPdfBlob();
      downloadBlob(pdfBlob, `${getSafeFileName()}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('تعذر تحميل التقرير كملف PDF. حاول مرة أخرى.');
    } finally {
      exitExportMode();
      setDownloadingType(null);
    }
  };

  const handleDownloadPNG = async () => {
    if (!validateForm()) return;
    if (!reportRef.current) return;

    try {
      setDownloadingType('png');

      updateUserValue();
      onSave();
      onSubmit?.(formData);

      await enterExportMode();

      if (!reportRef.current) {
        throw new Error('Report element not found.');
      }

      const canvas = await captureReportCanvas(
        reportRef.current,
        getCaptureScale()
      );

      const imageBlob = await canvasToBlob(canvas, 'image/png');
      downloadBlob(imageBlob, `${getSafeFileName()}.png`);
    } catch (error) {
      console.error('PNG generation failed:', error);
      alert('تعذر تحميل التقرير كصورة PNG. حاول مرة أخرى.');
    } finally {
      exitExportMode();
      setDownloadingType(null);
    }
  };

  /**
   * زر "طباعة": يولّد نفس ملف PDF المضبوط بدقة A4 ويفتحه في تبويب
   * جديد. من هناك يقدر المستخدم يطبع مباشرة من عارض PDF المدمج في
   * المتصفح/نظام التشغيل — هذا يعمل بنفس الشكل تمامًا على الجوال
   * واللابتوب وأي جهاز، لأنه ملف PDF فعلي وليس محاولة طباعة صفحة حية.
   */
  const handlePrint = async () => {
    if (!validateForm()) return;

    try {
      setDownloadingType('print');

      updateUserValue();
      onSave();
      onSubmit?.(formData);

      await enterExportMode();

      const pdfBlob = await generateReportPdfBlob();
      const url = URL.createObjectURL(pdfBlob);

      const printWindow = window.open(url, '_blank');

      if (!printWindow) {
        // إذا انحظر الـ popup (شائع بالجوال) نسقط تلقائيًا لتحميل الملف
        downloadBlob(pdfBlob, `${getSafeFileName()}.pdf`);
        alert(
          'تم تحميل ملف PDF لأن المتصفح منع فتح نافذة جديدة. افتح الملف واطبعه من هناك.'
        );
      }

      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) {
      console.error('Print preparation failed:', error);
      alert('تعذر تجهيز التقرير للطباعة. حاول مرة أخرى.');
    } finally {
      exitExportMode();
      setDownloadingType(null);
    }
  };

  const activeImages = formData.evidences.filter(
    (src): src is string => Boolean(src)
  );

  const activeCount = activeImages.length;

  const displayCount =
    activeCount === 0 ? 1 : Math.min(activeCount + 1, 4);

  const getEditGridItemClass = (index: number, total: number) => {
    if (total === 1) {
      return 'col-span-1 md:col-span-2 max-w-[500px] mx-auto w-full';
    }
    if (total === 3 && index === 2) {
      return 'col-span-1 md:col-span-2 w-full';
    }
    return 'w-full';
  };

  const getExportItemClass = (index: number, total: number) => {
    if (total === 1) return 'col-span-2 w-full';
    if (total === 3 && index === 2) return 'col-span-2 mx-auto w-[60%]';
    return 'w-full';
  };

  const getExportItemHeight = (total: number) => {
    if (total === 1) return 'h-[400px]';
    if (total === 2) return 'h-[250px]';
    if (total === 3) return 'h-[190px]';
    return 'h-[175px]';
  };

  const isBusy = downloadingType !== null;

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full overflow-x-auto bg-[#111714] px-2 py-4 text-[#E5E9E5] font-sans antialiased selection:bg-[#B39A63]/20 selection:text-[#E5E9E5] sm:px-4 sm:py-8 print:hidden"
    >
      {/* لا نعتمد على طباعة المتصفح إطلاقًا (window.print) لأنها غير
          متسقة عبر الأجهزة. إذا ضغط المستخدم Ctrl+P بالخطأ نخفي كل
          شيء ونعرض توجيه بسيط بدل صفحة مكسورة. */}
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

      <div
        ref={reportRef}
        className={`mx-auto w-full max-w-[950px] overflow-hidden rounded-2xl bg-white font-[Arial,sans-serif] text-[#173f56] shadow-2xl ${
          isExportMode ? 'rounded-none shadow-none m-0' : ''
        }`}
      >
        {/* ================= HEADER ================= */}
        <header
          className="relative min-h-[150px] sm:min-h-[193px] overflow-visible rounded-b-[18px] pb-8 sm:pb-10"
          style={{ background: currentTheme.headerGradient }}
        >
          <div className="mx-auto flex h-full max-w-[760px] flex-row items-center justify-center gap-3 px-3 pb-6 pt-5 text-white sm:gap-8 sm:px-4 sm:pb-7 sm:pt-6">
            <div className="flex items-center gap-2 border-r-[3px] border-white pr-3 sm:gap-4 sm:border-r-[4px] sm:pr-5">
              <div className="text-right text-[15px] font-bold leading-[1.55] sm:text-[21px]">
                وزارة التعليم
                <br />
                <span className="text-[9px] font-normal tracking-wide sm:text-[14px]">
                  Ministry of Education
                </span>
              </div>

              <div className="flex items-center justify-center pr-1 sm:pr-2">
                <MinistryLogo src={processedLogoSrc||logoUrl} />
              </div>
            </div>

            <div className="w-auto text-right text-[15px] font-bold leading-[1.7] sm:text-[21px]">
              الإدارة العامة للتعليم
              <br />
              <HeaderText
                isExportMode={isExportMode}
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="أدخل المنطقة"
                className="w-full min-w-0 sm:min-w-[180px] bg-transparent text-right font-bold text-white outline-none placeholder:text-white/60"
              />
            </div>
          </div>

          {/* ================= SCHOOL + TITLE ================= */}
          <div className="absolute -bottom-28 left-1/2 z-10 w-[calc(100%-32px)] max-w-[742px] -translate-x-1/2 sm:-bottom-40 sm:w-[calc(100%-112px)]">
            <div
              className="mb-2 rounded-[12px] px-3 py-2 shadow-sm sm:mb-3 sm:px-6 sm:py-4"
              style={{ backgroundColor: currentTheme.darkAccent }}
            >
              <HeaderText
                isExportMode={isExportMode}
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="أدخل اسم المدرسة"
                className="w-full min-w-0 bg-transparent text-center text-[16px] font-bold text-white outline-none placeholder:text-white/60 sm:text-[21px]"
              />
            </div>

            <div
              className="border-b-[4px] px-3 py-2 sm:border-b-[7px] sm:px-6 sm:py-4"
              style={{
                backgroundColor: currentTheme.darkAccent,
                borderColor: currentTheme.titleBorder,
              }}
            >
              <HeaderText
                isExportMode={isExportMode}
                name="reportTitle"
                value={formData.reportTitle}
                onChange={handleChange}
                placeholder="أدخل عنوان التقرير"
                className="w-full min-w-0 bg-transparent text-center text-[18px] font-bold text-white outline-none placeholder:text-white/60 sm:text-[23px]"
              />
            </div>
          </div>
        </header>

        {/* ================= FIELDS ================= */}
        <section
          className={`mx-auto max-w-[840px] px-3 pb-0 pt-[135px] sm:px-8 sm:pt-[194px] ${
            isExportMode ? 'max-w-none px-[12mm] pt-[32mm] pb-0' : ''
          }`}
        >
          <div className="grid grid-cols-[1.3fr_1fr] gap-x-2 gap-y-5 sm:gap-x-4 sm:gap-y-7">
            <Field
              theme={currentTheme}
              isExportMode={isExportMode}
              name="implementer"
              value={formData.implementer}
              onChange={handleChange}
              error={errors.implementer}
              label="المنفذ:"
              className="col-start-1 row-start-1"
            />

            <Field
              theme={currentTheme}
              isExportMode={isExportMode}
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              label="مكان التنفيذ:"
              className="col-start-2 row-start-1"
            />

            <Field
              theme={currentTheme}
              isExportMode={isExportMode}
              name="target"
              value={formData.target}
              onChange={handleChange}
              error={errors.target}
              label="المستهدفون:"
              className="col-start-1 row-start-2"
            />

            <Field
              theme={currentTheme}
              isExportMode={isExportMode}
              name="beneficiaries"
              value={formData.beneficiaries}
              onChange={handleChange}
              error={errors.beneficiaries}
              label="عدد المستفيدين:"
              className="col-start-1 row-start-3"
            />

            <Field
              theme={currentTheme}
              isExportMode={isExportMode}
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              label="تاريخ التنفيذ:"
              className="col-start-1 row-start-4"
            />

            <Field
              theme={currentTheme}
              isExportMode={isExportMode}
              name="objectives"
              value={formData.objectives}
              onChange={handleChange}
              error={errors.objectives}
              label="الأهداف:"
              type="textarea"
              align="right"
              className="min-h-[205px] col-start-2 row-start-2 row-span-3 sm:min-h-[237px]"
            />
          </div>

          {/* ============================
              EVIDENCE — EDIT MODE
              ============================ */}
          <div
            className={`report-evidence relative mt-6 rounded-[11px] border-2 px-3 pb-3 pt-4 sm:mt-7 sm:px-5 sm:pb-5 sm:pt-5 ${
              isExportMode ? 'hidden' : ''
            }`}
            style={{ borderColor: currentTheme.primaryBorder }}
          >
            <span
              className="absolute -top-4 right-1/2 translate-x-1/2 bg-white px-2 text-lg font-bold sm:-top-5 sm:px-3 sm:text-[24px]"
              style={{ color: currentTheme.labelColor }}
            >
              الشواهد
            </span>

            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {Array.from({ length: displayCount }).map((_, boxIndex) => {
                const imageSrc = formData.evidences[boxIndex];

                return (
                  <div
                    key={boxIndex}
                    className={`relative min-w-0 ${getEditGridItemClass(
                      boxIndex,
                      displayCount
                    )}`}
                  >
                    <label
                      className="group relative flex h-[150px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[11px] border-2 bg-white transition-all hover:border-dashed hover:bg-gray-50 sm:h-[230px]"
                      style={{ borderColor: currentTheme.labelColor }}
                      aria-label={`إضافة شاهد ${boxIndex + 1}`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, boxIndex)}
                      />

                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={`شاهد ${boxIndex + 1}`}
                          className="h-full w-full bg-white object-contain"
                        />
                      ) : (
                        <div
                          className="flex flex-col items-center opacity-70 transition-opacity group-hover:opacity-100"
                          style={{ color: currentTheme.labelColor }}
                        >
                          <span className="text-3xl leading-none sm:text-4xl">
                            +
                          </span>
                          <span className="mt-2 text-xs font-bold sm:text-sm">
                            إضافة صورة
                          </span>
                        </div>
                      )}
                    </label>

                    {imageSrc && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(boxIndex)}
                        className="absolute right-1.5 top-1.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-base font-bold text-white shadow-md transition-all hover:scale-105 sm:right-2 sm:top-2 sm:h-8 sm:w-8 sm:text-lg"
                        aria-label="حذف الصورة"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================
              EVIDENCE — EXPORT MODE
              ============================ */}
          {activeCount > 0 && (
            <div
              className={`report-evidence mt-7 rounded-[11px] border-2 px-5 pb-5 pt-5 ${
                isExportMode ? 'block' : 'hidden'
              }`}
              style={{ borderColor: currentTheme.primaryBorder }}
            >
              <div className="relative grid grid-cols-2 gap-4">
                <span
                  className="absolute -top-10 right-1/2 z-10 translate-x-1/2 bg-white px-3 text-[24px] font-bold"
                  style={{ color: currentTheme.labelColor }}
                >
                  الشواهد
                </span>

                {activeImages.map((src, index) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-[11px] border-2 bg-white ${getExportItemHeight(
                      activeCount
                    )} ${getExportItemClass(index, activeCount)}`}
                    style={{ borderColor: currentTheme.primaryBorder }}
                  >
                    <img
                      src={src}
                      alt={`شاهد ${index + 1}`}
                      className="h-full w-full bg-white object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ================= FOOTER ================= */}
        <footer
          className="h-[43px]"
          style={{ backgroundColor: currentTheme.darkAccent }}
        />
      </div>

      {/* ============================
          CONTROLS
          ============================ */}
      <div
        className="mx-auto mt-8 flex w-full max-w-[95%] flex-col items-center gap-4 rounded-2xl border border-[#29332D] bg-[#171E1A] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)] sm:w-fit sm:flex-row sm:rounded-full sm:px-6 sm:py-3"
        data-pdf-ignore
      >
        {/* ================= THEMES ================= */}
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
                    <span
                      key={index}
                      className="h-full flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span>{theme.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= PRINT ================= */}
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

        {/* ================= PDF ================= */}
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

        {/* ================= PNG ================= */}
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
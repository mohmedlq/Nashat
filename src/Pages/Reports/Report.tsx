import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-multi-date-picker';
import arabic from 'react-date-object/calendars/arabic';
import arabic_ar from 'react-date-object/locales/arabic_ar';
import type { ReportFormData } from '../../types/ReportsTypes';
import logoImage from '../../assets/MinistrLogo.png';
import { useUser } from '../../context/Context';
import DateObject from 'react-date-object';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Picker = (DatePicker as any).default || DatePicker;

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
    headerGradient: 'linear-gradient(to left, #43bb77, #2da69f, #268bc1)',
    darkAccent: '#194760',
    primaryBorder: '#2b9bd4',
    labelColor: '#25b878',
    titleBorder: '#39b978',
    btnBg: '#39b978',
    swatches: ['#43bb77', '#2da69f', '#268bc1', '#194760'],
  },
  {
    id: 'royal-navy',
    name: 'الكحلي والذهبي الملكي',
    headerGradient: 'linear-gradient(to left, #0f172a, #1e3a8a, #3b82f6)',
    darkAccent: '#0f172a',
    primaryBorder: '#3b82f6',
    labelColor: '#d97706',
    titleBorder: '#f59e0b',
    btnBg: '#d97706',
    swatches: ['#0f172a', '#1e3a8a', '#d97706'],
  },
  {
    id: 'burgundy-luxury',
    name: 'العنابي الدافئ',
    headerGradient: 'linear-gradient(to left, #581c87, #831843, #be123c)',
    darkAccent: '#4c0519',
    primaryBorder: '#be123c',
    labelColor: '#9d174d',
    titleBorder: '#fb7185',
    btnBg: '#9d174d',
    swatches: ['#581c87', '#831843', '#be123c'],
  },
];

export interface ReportProps {
  initialData?: Partial<ReportFormData>;
  logoUrl?: string;
  initialThemeId?: string;
  onChange?: (data: ReportFormData) => void;
  onSubmit?: (data: ReportFormData) => void;
}

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
      className={`relative min-w-0 rounded-[11px] border-2 bg-white px-3 py-3 transition-all sm:px-5 sm:py-5 ${className}`}
      style={{ borderColor: error ? '#ef4444' : theme.primaryBorder }}
    >
      <span
        className="absolute -top-4 right-3 bg-white px-2 text-base font-bold transition-colors sm:-top-5 sm:right-5 sm:text-[22px]"
        style={{ color: error ? '#ef4444' : theme.labelColor }}
      >
        {label}
      </span>

      <div className="h-full w-full min-w-0">
        {isExportMode ? (
          <div
            className={`w-full min-w-0 whitespace-pre-wrap break-words text-base leading-[1.7] text-[#424242] sm:text-[19px] ${
              type === 'textarea'
                ? 'min-h-[140px] sm:min-h-[190px]'
                : ''
            } ${
              align === 'right' ? 'text-right' : 'text-center'
            }`}
          >
            {value && value.trim() ? value : '\u00A0'}
          </div>
        ) : type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className={`h-full min-h-[140px] w-full resize-none overflow-auto bg-transparent text-base leading-[1.7] text-[#424242] outline-none placeholder:text-gray-300 sm:text-[19px] ${
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
                  target: {
                    name,
                    value: formatted,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              calendar={arabic}
              locale={arabic_ar}
              calendarPosition="bottom-right"
              containerClassName="w-full"
              inputClass={`w-full min-w-0 bg-transparent text-base leading-7 text-[#424242] outline-none placeholder:text-gray-300 sm:text-[22px] sm:leading-8 ${
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
            className={`w-full min-w-0 bg-transparent text-base leading-7 text-[#424242] outline-none placeholder:text-gray-300 sm:text-[22px] sm:leading-8 ${
              align === 'right' ? 'text-right' : 'text-center'
            }`}
            placeholder={`أدخل ${label}`}
          />
        )}
      </div>

      {error && !isExportMode && (
        <span className="absolute -bottom-5 right-3 text-xs font-bold text-red-500 sm:-bottom-6 sm:right-5 sm:text-sm">
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
  if (isExportMode) {
    return (
      <span className={`${className} block truncate`}>
        {value && value.trim() ? value : '\u00A0'}
      </span>
    );
  }

  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
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
      className="h-[50px] w-auto object-contain brightness-0 invert sm:h-[75px]"
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
  initialData,
  logoUrl,
  initialThemeId = 'emerald-teal',
  onChange,
  onSubmit,
}: ReportProps) {
  const { schoolName, teacherName, region } = useUser();

  const reportRef = useRef<HTMLDivElement>(null);
  const pageFrameRef = useRef<HTMLDivElement>(null);

  const [downloadingType, setDownloadingType] = useState<
    'pdf' | 'png' | null
  >(null);

  const [isExportMode, setIsExportMode] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  /* ============================
   * DEFAULT DATA
   * ============================ */

  const getTodayHijri = () => {
    const today = new DateObject({
      calendar: arabic,
      locale: arabic_ar,
    });

    return `${today.format('YYYY/MM/DD')} هـ`;
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
    ...initialData,
    evidences:
      initialData?.evidences ?? DEFAULT_FORM_DATA.evidences,
  }));

  const [currentTheme, setCurrentTheme] = useState<Theme>(
    () =>
      PRESET_THEMES.find(
        (theme) => theme.id === initialThemeId
      ) || PRESET_THEMES[0]
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ============================
   * INITIAL DATA SYNC
   * ============================ */

  useEffect(() => {
    if (!initialData) return;

    setFormData((prev) => ({
      ...prev,
      ...initialData,
      evidences:
        initialData.evidences ?? prev.evidences,
    }));
  }, [initialData]);

  /* ============================
   * FORM UPDATE
   * ============================ */

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    updateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /* ============================
   * IMAGE UPLOAD
   * ============================ */

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

      return {
        ...prev,
        evidences: newEvidences,
      };
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

      return {
        ...prev,
        evidences: newEvidences,
      };
    });
  };

  /* ============================
   * VALIDATION
   * ============================ */

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const hasEvidence = formData.evidences.some(
      (src) => Boolean(src)
    );

    if (!hasEvidence) {
      newErrors.evidences =
        'يجب إضافة صورة شاهد واحدة على الأقل .';

      alert(
        'يجب إضافة صورة شاهد واحدة على الأقل .'
      );
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ============================
   * WAIT HELPERS
   * ============================ */

  const waitForNextPaint = () =>
    new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });

  const waitForDocumentFonts = async () => {
    if ('fonts' in document) {
      try {
        await (
          document as Document & {
            fonts?: FontFaceSet;
          }
        ).fonts?.ready;
      } catch {
        // لا نوقف التصدير.
      }
    }
  };

  const waitForImages = async (element: HTMLElement) => {
    const images = Array.from(
      element.querySelectorAll('img')
    );

    await Promise.all(
      images.map((img) => {
        if (
          img.complete &&
          img.naturalWidth > 0
        ) {
          return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
          const finish = () => {
            img.removeEventListener(
              'load',
              finish
            );

            img.removeEventListener(
              'error',
              finish
            );

            resolve();
          };

          img.addEventListener(
            'load',
            finish
          );

          img.addEventListener(
            'error',
            finish
          );
        });
      })
    );
  };

  /* ============================
   * PRINT LAYOUT
   * ============================ */

  const fitReportToPrintPage = async () => {
    const element = reportRef.current;

    if (!element) return;

    element.style.transform = 'none';
    element.style.width = '210mm';
    element.style.maxWidth = 'none';
    element.style.transformOrigin = 'top right';

    void element.offsetHeight;

    await waitForNextPaint();

    const widthPx =
      element.getBoundingClientRect().width ||
      element.offsetWidth;

    const naturalHeightPx =
      element.scrollHeight;

    const pageHeightPx =
      widthPx * (297 / 210);

    if (
      !widthPx ||
      !naturalHeightPx ||
      !pageHeightPx
    ) {
      return;
    }

    const scale = Math.min(
      1,
      pageHeightPx / naturalHeightPx
    );

    if (scale < 1) {
      element.style.width =
        `${210 / scale}mm`;

      element.style.transform =
        `scale(${scale})`;
    } else {
      element.style.width = '210mm';
      element.style.transform = 'none';
    }

    await waitForNextPaint();
  };

  const resetPrintLayout = () => {
    const element = reportRef.current;

    if (!element) return;

    element.style.transform = '';
    element.style.width = '';
    element.style.maxWidth = '';
    element.style.transformOrigin = '';
  };

  useEffect(() => {
    const handleAfterPrint = () => {
      resetPrintLayout();
      setIsPrinting(false);
      setIsExportMode(false);
    };

    window.addEventListener(
      'afterprint',
      handleAfterPrint
    );

    return () => {
      window.removeEventListener(
        'afterprint',
        handleAfterPrint
      );
    };
  }, []);

  /* ============================
   * PRINT
   * ============================ */

  const handlePrint = async () => {
    if (!validateForm()) return;

    onSubmit?.(formData);

    setIsPrinting(true);
    setIsExportMode(true);

    try {
      await waitForNextPaint();
      await waitForNextPaint();

      await waitForDocumentFonts();

      if (reportRef.current) {
        await waitForImages(
          reportRef.current
        );
      }

      await fitReportToPrintPage();

      await waitForNextPaint();

      window.print();
    } catch (error) {
      console.error(
        'Print preparation failed:',
        error
      );

      resetPrintLayout();

      setIsPrinting(false);
      setIsExportMode(false);

      alert(
        'تعذر تجهيز التقرير للطباعة. حاول مرة أخرى.'
      );
    }
  };

  /* ============================
   * DEVICE
   * ============================ */

  const isMobileDevice = () => {
    return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  /*
   * على الجوال نستخدم Scale أقل لتقليل استهلاك الذاكرة.
   *
   * Desktop:
   *   2.5
   *
   * Mobile:
   *   1.5
   *
   * هذا كافٍ جدًا لتقرير A4 ويمنع Canvas ضخم.
   */
  const getCaptureScale = () => {
    return isMobileDevice() ? 1.5 : 2.5;
  };

  /* ============================
   * CANVAS → BLOB
   * ============================ */

  const canvasToBlob = (
    canvas: HTMLCanvasElement,
    type: string,
    quality?: number
  ) =>
    new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(
              new Error(
                'Canvas export returned an empty blob.'
              )
            );
          }
        },
        type,
        quality
      );
    });

  /* ============================
   * CANVAS CAPTURE
   * ============================ */

  const captureReportCanvas = async (
    element: HTMLElement,
    scale: number
  ) => {
    await waitForImages(element);

    /*
     * لا نستخدم windowWidth/windowHeight بحجم
     * scrollWidth/scrollHeight.
     *
     * html2canvas سيأخذ أبعاد العنصر نفسه.
     */
    return html2canvas(element, {
      scale,

      useCORS: true,
      allowTaint: false,

      backgroundColor: '#ffffff',

      logging: false,

      imageTimeout: 15000,

      width: element.scrollWidth,
      height: element.scrollHeight,

      ignoreElements: (el) => {
        return (
          el.hasAttribute('data-pdf-ignore') ||
          el.classList.contains('export-ignore')
        );
      },
    });
  };

  /* ============================
   * FILE NAME
   * ============================ */

  const getSafeFileName = () => {
    const title =
      formData.reportTitle
        .trim()
        .replace(
          /[\\/:*?"<>|]/g,
          ''
        )
        .replace(/\s+/g, '-');

    return title || 'تقرير';
  };

  /* ============================
   * EXPORT MODE
   * ============================ */

  const enterExportMode = async () => {
    setIsExportMode(true);

    const element = reportRef.current;

    if (element) {
      element.style.transform = 'none';
      element.style.width = '';
      element.style.maxWidth = '';
      element.style.transformOrigin = '';
    }

    await waitForNextPaint();
    await waitForNextPaint();
  };

  const exitExportMode = () => {
    resetPrintLayout();
    setIsExportMode(false);
  };

  /* ============================
   * MOBILE FILE DELIVERY
   * ============================ */

  const downloadBlob = async (
    blob: Blob,
    fileName: string
  ) => {
    const file = new File(
      [blob],
      fileName,
      {
        type:
          blob.type ||
          'application/octet-stream',
      }
    );

    /*
     * ============================
     * MOBILE
     * ============================
     *
     * إذا كان الجهاز يدعم مشاركة الملفات،
     * نستخدم Web Share API.
     *
     * هذا أفضل خيار للـ iPhone وWebViews.
     */
    if (
      isMobileDevice() &&
      typeof navigator.share === 'function'
    ) {
      try {
        const canShareFiles =
          typeof navigator.canShare ===
            'function'
            ? navigator.canShare({
                files: [file],
              })
            : true;

        if (canShareFiles) {
          await navigator.share({
            files: [file],
            title: fileName,
          });

          return;
        }
      } catch (error) {
        /*
         * AbortError = المستخدم أغلق المشاركة.
         */
        if (
          error instanceof DOMException &&
          error.name === 'AbortError'
        ) {
          return;
        }

        console.warn(
          'Mobile file sharing failed:',
          error
        );
      }
    }

    /*
     * ============================
     * FALLBACK
     * ============================
     */

    const url =
      URL.createObjectURL(blob);

    try {
      const link =
        document.createElement('a');

      link.href = url;
      link.download = fileName;
      link.rel = 'noopener';
      link.style.display = 'none';

      document.body.appendChild(link);

      link.click();

      link.remove();
    } finally {
      /*
       * ننتظر حتى لا يقوم Safari/Chrome
       * بإلغاء قراءة الـ Blob قبل فتحه.
       */
      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60_000);
    }
  };

  /* ============================
   * PDF
   * ============================ */

  const handleDownloadPDF = async () => {
    if (!validateForm()) return;
    if (!reportRef.current) return;

    let canvas:
      | HTMLCanvasElement
      | null = null;

    try {
      setDownloadingType('pdf');

      onSubmit?.(formData);

      await enterExportMode();

      await waitForDocumentFonts();

      if (!reportRef.current) {
        throw new Error(
          'Report element not found.'
        );
      }

      canvas =
        await captureReportCanvas(
          reportRef.current,
          getCaptureScale()
        );

      /*
       * نحول Canvas إلى JPEG Blob مباشرة.
       *
       * لا نستخدم:
       *
       * canvas.toDataURL()
       *
       * لأن Base64 يستهلك ذاكرة أكبر على الجوال.
       */
      const imageBlob =
        await canvasToBlob(
          canvas,
          'image/jpeg',
          0.92
        );

      /*
       * نقرأ Blob كـ ArrayBuffer.
       *
       * jsPDF يدعم إدخال الصورة كـ Data URL
       * أو ImageData، لكن لا نريد Base64 ضخم.
       *
       * لذلك نستخدم FileReader فقط لتحويل
       * الصورة إلى Data URL عند الضرورة.
       *
       * بما أن scale أصبح منخفضًا على الجوال،
       * سيكون الحجم أقل بكثير من النسخة القديمة.
       */
      const imageData =
        await new Promise<string>(
          (resolve, reject) => {
            const reader =
              new FileReader();

            reader.onload = () => {
              if (
                typeof reader.result ===
                'string'
              ) {
                resolve(
                  reader.result
                );
              } else {
                reject(
                  new Error(
                    'Failed to read image blob.'
                  )
                );
              }
            };

            reader.onerror = () => {
              reject(
                new Error(
                  'Failed to convert image blob.'
                )
              );
            };

            reader.readAsDataURL(
              imageBlob
            );
          }
        );

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pageWidth = 210;
      const pageHeight = 297;

      const pdfScale = Math.min(
        pageWidth / canvas.width,
        pageHeight / canvas.height
      );

      const imgWidth =
        canvas.width * pdfScale;

      const imgHeight =
        canvas.height * pdfScale;

      const x =
        (pageWidth - imgWidth) / 2;

      const y = 0;

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

      const pdfBlob =
        pdf.output('blob');

      /*
       * التخلص من Data URL مبكرًا.
       */
      await downloadBlob(
        pdfBlob,
        `${getSafeFileName()}.pdf`
      );
    } catch (error) {
      console.error(
        'PDF generation failed:',
        error
      );

      alert(
        'تعذر تحميل التقرير كملف PDF. حاول مرة أخرى.'
      );
    } finally {
      /*
       * تحرير الـ Canvas من الذاكرة.
       */
      if (canvas) {
        canvas.width = 1;
        canvas.height = 1;
        canvas = null;
      }

      exitExportMode();

      setDownloadingType(null);
    }
  };

  /* ============================
   * PNG
   * ============================ */

  const handleDownloadPNG = async () => {
    if (!validateForm()) return;
    if (!reportRef.current) return;

    let canvas:
      | HTMLCanvasElement
      | null = null;

    try {
      setDownloadingType('png');

      onSubmit?.(formData);

      await enterExportMode();

      await waitForDocumentFonts();

      if (!reportRef.current) {
        throw new Error(
          'Report element not found.'
        );
      }

      canvas =
        await captureReportCanvas(
          reportRef.current,
          getCaptureScale()
        );

      /*
       * PNG يتم إنشاؤه مباشرة كـ Blob.
       */
      const imageBlob =
        await canvasToBlob(
          canvas,
          'image/png'
        );

      await downloadBlob(
        imageBlob,
        `${getSafeFileName()}.png`
      );
    } catch (error) {
      console.error(
        'PNG generation failed:',
        error
      );

      alert(
        'تعذر تحميل التقرير كصورة PNG. حاول مرة أخرى.'
      );
    } finally {
      /*
       * تحرير الـ Canvas من الذاكرة.
       */
      if (canvas) {
        canvas.width = 1;
        canvas.height = 1;
        canvas = null;
      }

      exitExportMode();

      setDownloadingType(null);
    }
  };

  /* ============================
   * EVIDENCE DATA
   * ============================ */

  const activeImages =
    formData.evidences.filter(
      (src): src is string =>
        Boolean(src)
    );

  const activeCount =
    activeImages.length;

  const displayCount =
    activeCount === 0
      ? 1
      : Math.min(
          activeCount + 1,
          4
        );

  const getEditGridItemClass = (
    index: number,
    total: number
  ) => {
    if (total === 1) {
      return 'sm:col-span-2 max-w-[500px] mx-auto w-full';
    }

    if (
      total === 3 &&
      index === 2
    ) {
      return 'sm:col-span-2 w-full';
    }

    return 'w-full';
  };

  const getExportItemClass = (
    index: number,
    total: number
  ) => {
    if (total === 1) {
      return 'col-span-2 w-full';
    }

    if (
      total === 3 &&
      index === 2
    ) {
      return 'col-span-2 mx-auto w-[60%]';
    }

    return 'w-full';
  };

  const getExportItemHeight = (
    total: number
  ) => {
    if (total === 1) {
      return 'h-[400px]';
    }

    if (total === 2) {
      return 'h-[250px]';
    }

    if (total === 3) {
      return 'h-[190px]';
    }

    return 'h-[175px]';
  };

  return (
    <div
      dir="rtl"
      className="
        min-h-screen w-full overflow-x-hidden bg-slate-100
        px-2 py-4 sm:px-4 sm:py-8
        print:min-h-0 print:bg-white print:p-0 print:m-0
      "
    >
      {/* ============================
          PRINT CSS
          ============================ */}

      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        @media print {
          html,
          body {
            width: 210mm !important;
            min-width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            overflow: hidden !important;
          }

          body * {
            visibility: hidden;
          }

          .report-page-frame,
          .report-page-frame * {
            visibility: visible;
          }

          .report-page-frame {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }

          .report-print-area {
            position: absolute !important;
            top: 0 !important;
            right: 0 !important;
            width: 210mm !important;
            max-width: none !important;
            height: auto !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            transform-origin: top right !important;
          }

          .print-hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* ============================
          PAGE FRAME
          ============================ */}

      <div
        ref={pageFrameRef}
        className="report-page-frame"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePrint();
          }}
        >
          <div
            ref={reportRef}
            className={`
              report-print-area
              mx-auto w-full max-w-[950px]
              overflow-hidden rounded-2xl bg-white
              font-[Arial,sans-serif] text-[#173f56]
              shadow-2xl
              ${
                isExportMode
                  ? 'w-[210mm] max-w-none rounded-none shadow-none m-0'
                  : ''
              }
            `}
          >
            {/* ================= HEADER ================= */}

            <header
              className="relative min-h-[193px] overflow-visible rounded-b-[18px] pb-10 print:rounded-b-[18px]"
              style={{
                background:
                  currentTheme.headerGradient,
              }}
            >
              <div className="mx-auto flex h-full max-w-[760px] flex-col items-center justify-center gap-4 px-4 pb-24 pt-6 text-white sm:flex-row sm:gap-8 sm:pb-7">
                <div className="flex items-center gap-3 border-b-2 border-white/60 pb-3 sm:gap-4 sm:border-b-0 sm:border-r-[4px] sm:border-white sm:pb-0 sm:pr-5">
                  <div className="text-center text-base font-bold leading-[1.4] sm:text-right sm:text-[21px] sm:leading-[1.55]">
                    وزارة التعليم
                    <br />

                    <span className="text-[11px] font-normal tracking-wide sm:text-[14px]">
                      Ministry of Education
                    </span>
                  </div>

                  <div className="flex items-center justify-center pr-1 sm:pr-2">
                    <MinistryLogo
                      src={logoUrl}
                    />
                  </div>
                </div>

                <div className="w-full text-center text-base font-bold leading-[1.4] sm:w-auto sm:text-right sm:text-[21px] sm:leading-[1.7]">
                  الإدارة العامة للتعليم
                  <br />

                  <HeaderText
                    isExportMode={
                      isExportMode
                    }
                    name="region"
                    value={
                      formData.region
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="أدخل المنطقة"
                    className="w-full min-w-0 bg-transparent text-center font-bold text-white outline-none placeholder:text-white/60 sm:min-w-[180px] sm:text-right"
                  />
                </div>
              </div>

              {/* ================= SCHOOL + TITLE ================= */}

              <div className="absolute -bottom-28 left-1/2 z-10 w-[92%] max-w-[742px] -translate-x-1/2 sm:-bottom-40 sm:w-[calc(100%-112px)]">
                <div
                  className="mb-2 rounded-[12px] px-3 py-2 shadow-sm sm:mb-3 sm:px-6 sm:py-4"
                  style={{
                    backgroundColor:
                      currentTheme.darkAccent,
                  }}
                >
                  <HeaderText
                    isExportMode={
                      isExportMode
                    }
                    name="schoolName"
                    value={
                      formData.schoolName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="أدخل اسم المدرسة"
                    className="w-full min-w-0 bg-transparent text-center text-base font-bold text-white outline-none placeholder:text-white/60 sm:text-[21px]"
                  />
                </div>

                <div
                  className="border-b-[4px] px-3 py-2 sm:border-b-[7px] sm:px-6 sm:py-4"
                  style={{
                    backgroundColor:
                      currentTheme.darkAccent,
                    borderColor:
                      currentTheme.titleBorder,
                  }}
                >
                  <HeaderText
                    isExportMode={
                      isExportMode
                    }
                    name="reportTitle"
                    value={
                      formData.reportTitle
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="أدخل عنوان التقرير"
                    className="w-full min-w-0 bg-transparent text-center text-lg font-bold text-white outline-none placeholder:text-white/60 sm:text-[23px]"
                  />
                </div>
              </div>
            </header>

            {/* ================= FIELDS ================= */}

            <section
              className={`
                mx-auto max-w-[840px] px-3 pb-4 pt-[140px]
                sm:px-8 sm:pt-[194px]
                print:max-w-none print:px-[12mm] print:pt-[32mm] print:pb-0
                ${
                  isExportMode
                    ? 'max-w-none px-[12mm] pt-[32mm] pb-0'
                    : ''
                }
              `}
            >
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:gap-y-7 md:grid-cols-[1.3fr_1fr]">
                <Field
                  theme={currentTheme}
                  isExportMode={
                    isExportMode
                  }
                  name="implementer"
                  value={
                    formData.implementer
                  }
                  onChange={
                    handleChange
                  }
                  error={
                    errors.implementer
                  }
                  label="المنفذ:"
                  className="md:col-start-1 md:row-start-1"
                />

                <Field
                  theme={currentTheme}
                  isExportMode={
                    isExportMode
                  }
                  name="location"
                  value={
                    formData.location
                  }
                  onChange={
                    handleChange
                  }
                  error={
                    errors.location
                  }
                  label="مكان التنفيذ:"
                  className="md:col-start-2 md:row-start-1"
                />

                <Field
                  theme={currentTheme}
                  isExportMode={
                    isExportMode
                  }
                  name="target"
                  value={
                    formData.target
                  }
                  onChange={
                    handleChange
                  }
                  error={
                    errors.target
                  }
                  label="المستهدفون:"
                  className="md:col-start-1 md:row-start-2"
                />

                <Field
                  theme={currentTheme}
                  isExportMode={
                    isExportMode
                  }
                  name="beneficiaries"
                  value={
                    formData.beneficiaries
                  }
                  onChange={
                    handleChange
                  }
                  error={
                    errors.beneficiaries
                  }
                  label="عدد المستفيدين:"
                  className="md:col-start-1 md:row-start-3"
                />

                <Field
                  theme={currentTheme}
                  isExportMode={
                    isExportMode
                  }
                  name="date"
                  type="date"
                  value={
                    formData.date
                  }
                  onChange={
                    handleChange
                  }
                  error={
                    errors.date
                  }
                  label="تاريخ التنفيذ:"
                  className="md:col-start-1 md:row-start-4"
                />

                <Field
                  theme={currentTheme}
                  isExportMode={
                    isExportMode
                  }
                  name="objectives"
                  value={
                    formData.objectives
                  }
                  onChange={
                    handleChange
                  }
                  error={
                    errors.objectives
                  }
                  label="الأهداف:"
                  type="textarea"
                  align="right"
                  className="min-h-[180px] sm:min-h-[237px] md:col-start-2 md:row-span-3 md:row-start-2"
                />
              </div>

              {/* ============================
                  EVIDENCE — EDIT MODE
                  ============================ */}

              <div
                className={`
                  report-evidence relative mt-7 rounded-[11px] border-2 px-3 pb-5 pt-5 sm:px-5
                  ${
                    activeCount === 0
                      ? 'print:hidden'
                      : ''
                  }
                  ${
                    isExportMode
                      ? 'hidden'
                      : ''
                  }
                `}
                style={{
                  borderColor:
                    currentTheme.primaryBorder,
                }}
              >
                <span
                  className="absolute -top-4 right-1/2 translate-x-1/2 bg-white px-3 text-lg font-bold sm:-top-5 sm:text-[24px]"
                  style={{
                    color:
                      currentTheme.labelColor,
                  }}
                >
                  الشواهد
                </span>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 print:hidden">
                  {Array.from({
                    length: displayCount,
                  }).map(
                    (_, boxIndex) => {
                      const imageSrc =
                        formData
                          .evidences[
                          boxIndex
                        ];

                      return (
                        <div
                          key={boxIndex}
                          className={`relative min-w-0 ${getEditGridItemClass(
                            boxIndex,
                            displayCount
                          )}`}
                        >
                          <label
                            className="group relative flex h-[180px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[11px] border-2 bg-white transition-all hover:border-dashed hover:bg-gray-50 sm:h-[230px]"
                            style={{
                              borderColor:
                                currentTheme.labelColor,
                            }}
                            aria-label={`إضافة شاهد ${
                              boxIndex +
                              1
                            }`}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(
                                e
                              ) =>
                                handleImageUpload(
                                  e,
                                  boxIndex
                                )
                              }
                            />

                            {imageSrc ? (
                              <img
                                src={
                                  imageSrc
                                }
                                alt={`شاهد ${
                                  boxIndex +
                                  1
                                }`}
                                className="h-full w-full object-contain bg-white"
                              />
                            ) : (
                              <div
                                className="flex flex-col items-center opacity-70 transition-opacity group-hover:opacity-100"
                                style={{
                                  color:
                                    currentTheme.labelColor,
                                }}
                              >
                                <span className="text-4xl leading-none">
                                  +
                                </span>

                                <span className="mt-2 text-sm font-bold">
                                  إضافة صورة
                                </span>
                              </div>
                            )}
                          </label>

                          {imageSrc && (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveImage(
                                  boxIndex
                                )
                              }
                              className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white shadow-md transition-all hover:scale-105"
                              aria-label="حذف الصورة"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* ============================
                  EVIDENCE — EXPORT MODE
                  ============================ */}

              {activeCount > 0 && (
                <div
                  className={`
                    report-evidence mt-7 rounded-[11px] border-2 px-3 pb-5 pt-5 sm:px-5
                    ${
                      isExportMode
                        ? 'block'
                        : 'hidden print:block'
                    }
                  `}
                  style={{
                    borderColor:
                      currentTheme.primaryBorder,
                  }}
                >
                  <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <span
                      className="absolute -top-9 right-1/2 z-10 translate-x-1/2 bg-white px-3 text-lg font-bold sm:-top-10 sm:text-[24px]"
                      style={{
                        color:
                          currentTheme.labelColor,
                      }}
                    >
                      الشواهد
                    </span>

                    {activeImages.map(
                      (
                        src,
                        index
                      ) => (
                        <div
                          key={index}
                          className={`overflow-hidden rounded-[11px] border-2 bg-white ${getExportItemHeight(
                            activeCount
                          )} ${getExportItemClass(
                            index,
                            activeCount
                          )}`}
                          style={{
                            borderColor:
                              currentTheme.primaryBorder,
                          }}
                        >
                          <img
                            src={src}
                            alt={`شاهد ${
                              index +
                              1
                            }`}
                            className="print-evidence-image h-full w-full bg-white object-contain"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* ================= FOOTER ================= */}

            <footer
              className="h-[43px]"
              style={{
                backgroundColor:
                  currentTheme.darkAccent,
              }}
            />
          </div>

          {/* ============================
              MOBILE PRINT CONTROL
              ============================ */}

          <div className="mt-6 flex justify-center sm:hidden print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              disabled={
                isPrinting ||
                downloadingType !== null
              }
              className="flex w-full max-w-[360px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-60"
              style={{
                backgroundColor:
                  currentTheme.btnBg,
              }}
            >
              <PrinterIcon />
              <span>
                طباعة التقرير
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* ============================
          CONTROLS
          ============================ */}

      <div
        className="
          print:hidden
          mx-auto mt-8 flex w-full max-w-[95%] flex-col items-center gap-4
          rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur-md
          sm:w-fit sm:flex-row sm:rounded-full sm:px-6 sm:py-3
        "
        data-pdf-ignore
      >
        {/* ================= THEMES ================= */}

        <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:border-l sm:border-gray-300 sm:pl-4">
          <span className="whitespace-nowrap text-sm font-bold text-gray-700">
            اختر الثيم:
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRESET_THEMES.map(
              (theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() =>
                    setCurrentTheme(
                      theme
                    )
                  }
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                    currentTheme.id ===
                    theme.id
                      ? 'scale-105 shadow-sm ring-2 ring-blue-500 ring-offset-1'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex h-3.5 w-7 overflow-hidden rounded-full border border-gray-300">
                    {theme.swatches.map(
                      (
                        color,
                        index
                      ) => (
                        <span
                          key={
                            index
                          }
                          className="h-full flex-1"
                          style={{
                            backgroundColor:
                              color,
                          }}
                        />
                      )
                    )}
                  </div>

                  <span>
                    {
                      theme.name.split(
                        ' '
                      )[0]
                    }
                  </span>
                </button>
              )
            )}
          </div>
        </div>

        {/* ================= PRINT ================= */}

        <button
          type="button"
          onClick={
            handlePrint
          }
          disabled={
            isPrinting ||
            downloadingType !== null
          }
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-2 text-md font-bold text-white shadow-lg transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          style={{
            backgroundColor:
              currentTheme.btnBg,
          }}
        >
          {isPrinting ? (
            <>
              <SpinnerIcon />

              <span>
                جاري التجهيز
                للطباعة...
              </span>
            </>
          ) : (
            <>
              <PrinterIcon />

              <span>
                طباعة
              </span>
            </>
          )}
        </button>

        {/* ================= PDF ================= */}

        <button
          type="button"
          onClick={
            handleDownloadPDF
          }
          disabled={
            downloadingType !==
              null ||
            isPrinting
          }
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-slate-800 px-6 py-2 text-md font-bold text-white shadow-lg transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {downloadingType ===
          'pdf' ? (
            <>
              <SpinnerIcon />

              <span>
                جاري تجهيز PDF...
              </span>
            </>
          ) : (
            <>
              <PdfDownloadIcon />

              <span>
                تحميل PDF
              </span>
            </>
          )}
        </button>

        {/* ================= PNG ================= */}

        <button
          type="button"
          onClick={
            handleDownloadPNG
          }
          disabled={
            downloadingType !==
              null ||
            isPrinting
          }
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-slate-600 px-6 py-2 text-md font-bold text-white shadow-lg transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {downloadingType ===
          'png' ? (
            <>
              <SpinnerIcon />

              <span>
                جاري تجهيز PNG...
              </span>
            </>
          ) : (
            <>
              <ImageDownloadIcon />

              <span>
                تحميل PNG
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
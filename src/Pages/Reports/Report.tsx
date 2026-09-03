import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-multi-date-picker';
import arabic from 'react-date-object/calendars/arabic';
import arabic_ar from 'react-date-object/locales/arabic_ar';
import type {
  ReportFormData,
  MockReport,
} from '../../types/ReportsTypes';
import logoImage from '../../assets/MinistrLogo.png';
import { useUser } from '../../context/Context';
import DateObject from 'react-date-object';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Picker = (DatePicker as any).default || DatePicker;

/* ============================
 * A4 CONSTANTS
 * ============================ */

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

const A4_WIDTH_PX =
  (A4_WIDTH_MM / 25.4) * 96;

const A4_HEIGHT_PX =
  (A4_HEIGHT_MM / 25.4) * 96;

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
      'linear-gradient(to left, #43bb77, #2da69f, #268bc1)',
    darkAccent: '#194760',
    primaryBorder: '#2b9bd4',
    labelColor: '#25b878',
    titleBorder: '#39b978',
    btnBg: '#39b978',
    swatches: [
      '#43bb77',
      '#2da69f',
      '#268bc1',
      '#194760',
    ],
  },
  {
    id: 'royal-navy',
    name: 'الكحلي والذهبي الملكي',
    headerGradient:
      'linear-gradient(to left, #0f172a, #1e3a8a, #3b82f6)',
    darkAccent: '#0f172a',
    primaryBorder: '#3b82f6',
    labelColor: '#d97706',
    titleBorder: '#f59e0b',
    btnBg: '#d97706',
    swatches: [
      '#0f172a',
      '#1e3a8a',
      '#d97706',
    ],
  },
  {
    id: 'burgundy-luxury',
    name: 'العنابي الدافئ',
    headerGradient:
      'linear-gradient(to left, #581c87, #831843, #be123c)',
    darkAccent: '#4c0519',
    primaryBorder: '#be123c',
    labelColor: '#9d174d',
    titleBorder: '#fb7185',
    btnBg: '#9d174d',
    swatches: [
      '#581c87',
      '#831843',
      '#be123c',
    ],
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
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
      className={`
        relative
        min-w-0
        rounded-[11px]
        border-2
        bg-white
        px-5
        py-5
        transition-all
        ${className}
      `}
      style={{
        borderColor: error
          ? '#ef4444'
          : theme.primaryBorder,
      }}
    >
      <span
        className="
          absolute
          -top-5
          right-5
          bg-white
          px-2
          text-[22px]
          font-bold
          transition-colors
        "
        style={{
          color: error
            ? '#ef4444'
            : theme.labelColor,
        }}
      >
        {label}
      </span>

      <div className="h-full w-full min-w-0">
        {isExportMode ? (
          <div
            className={`
              w-full
              min-w-0
              whitespace-pre-wrap
              break-words
              text-[19px]
              leading-[1.7]
              text-[#424242]
              ${
                type === 'textarea'
                  ? 'min-h-[190px]'
                  : ''
              }
              ${
                align === 'right'
                  ? 'text-right'
                  : 'text-center'
              }
            `}
          >
            {value && value.trim()
              ? value
              : '\u00A0'}
          </div>
        ) : type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className={`
              h-full
              min-h-[190px]
              w-full
              resize-none
              overflow-auto
              bg-transparent
              text-[19px]
              leading-[1.7]
              text-[#424242]
              outline-none
              placeholder:text-gray-300
              ${
                align === 'right'
                  ? 'text-right'
                  : 'text-center'
              }
            `}
            placeholder={`أدخل ${label}`}
          />
        ) : type === 'date' ? (
          <div className="relative flex w-full min-w-0 items-center">
            <Picker
              value={
                value
                  ? value.replace(
                      /[همـ\s]/g,
                      ''
                    )
                  : ''
              }
              onChange={(date: any) => {
                const formatted = date
                  ? `${date.format(
                      'YYYY/MM/DD'
                    )} هـ`
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
              inputClass={`
                w-full
                min-w-0
                bg-transparent
                text-[22px]
                leading-8
                text-[#424242]
                outline-none
                placeholder:text-gray-300
                ${
                  align === 'right'
                    ? 'text-right'
                    : 'text-center'
                }
              `}
              placeholder={`اختر ${label}`}
            />
          </div>
        ) : (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className={`
              w-full
              min-w-0
              bg-transparent
              text-[22px]
              leading-8
              text-[#424242]
              outline-none
              placeholder:text-gray-300
              ${
                align === 'right'
                  ? 'text-right'
                  : 'text-center'
              }
            `}
            placeholder={`أدخل ${label}`}
          />
        )}
      </div>

      {error && !isExportMode && (
        <span
          className="
            absolute
            -bottom-6
            right-5
            text-sm
            font-bold
            text-red-500
          "
        >
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
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  const textClasses = `
    ${className}
    block
    w-full
    min-w-0
    m-0
    p-0
    leading-[1.2]
  `;

  if (isExportMode) {
    return (
      <div
        className={`
          ${textClasses}
          flex
          items-center
          justify-center
        `}
      >
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

function MinistryLogo({
  src,
}: {
  src?: string;
}) {
  return (
    <img
      src={src || logoImage}
      alt="شعار وزارة التعليم السعودية"
      className="
        h-[75px]
        w-auto
        object-contain
        brightness-0
        invert
      "
    />
  );
}

/* ============================
 * ICONS
 * ============================ */

function PrinterIcon({
  className = '',
}: {
  className?: string;
}) {
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
      <rect
        x="6"
        y="14"
        width="12"
        height="8"
      />
    </svg>
  );
}

function PdfDownloadIcon({
  className = '',
}: {
  className?: string;
}) {
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
      <line
        x1="12"
        y1="11"
        x2="12"
        y2="17"
      />
      <polyline points="9 14 12 17 15 14" />
    </svg>
  );
}

function ImageDownloadIcon({
  className = '',
}: {
  className?: string;
}) {
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
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
      />
      <circle
        cx="8.5"
        cy="8.5"
        r="1.5"
      />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function SpinnerIcon({
  className = '',
}: {
  className?: string;
}) {
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
  /* ============================
   * USER CONTEXT
   * ============================ */

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

  /* ============================
   * FIND EXISTING REPORT
   * ============================ */

  const report = reports.find(
    (item) =>
      String(item.id) === id
  );

  /* ============================
   * REFS
   * ============================ */

  const reportRef =
    useRef<HTMLDivElement>(null);

  const pageFrameRef =
    useRef<HTMLDivElement>(null);

  /* ============================
   * STATES
   * ============================ */

  const [downloadingType, setDownloadingType] =
    useState<'pdf' | 'png' | null>(null);

  const [isExportMode, setIsExportMode] =
    useState(false);

  const [isPrinting, setIsPrinting] =
    useState(false);

  /* ============================
   * DEFAULT DATA
   * ============================ */

  const getTodayHijri = () => {
    const today = new DateObject({
      calendar: arabic,
      locale: arabic_ar,
    });

    return `${today.format(
      'YYYY/MM/DD'
    )} هـ`;
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
    evidences: [
      null,
      null,
      null,
      null,
    ],
  };

  /* ============================
   * FORM DATA
   * ============================ */

  const [formData, setFormData] =
    useState<ReportFormData>(() => ({
      ...DEFAULT_FORM_DATA,

      ...(report?.formData ?? initialData ?? {}),

      evidences:
        report?.formData?.evidences ??
        initialData?.evidences ??
        DEFAULT_FORM_DATA.evidences,
    }));

  /* ============================
   * LOAD REPORT DATA
   * ============================ */

  useEffect(() => {
    if (report) {
setFormData((prev) => ({
  ...prev,
  ...report.formData,
  evidences:
    report.formData.evidences ??
    prev.evidences,
}));      return;
    }

    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        evidences:
          initialData.evidences ??
          prev.evidences,
      }));
    }
  }, [report, initialData]);

  /* ============================
   * THEME
   * ============================ */

  const [currentTheme, setCurrentTheme] =
    useState<Theme>(
      () =>
        PRESET_THEMES.find(
          (theme) =>
            theme.id === initialThemeId
        ) || PRESET_THEMES[0]
    );

  /* ============================
   * ERRORS
   * ============================ */

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  /* ============================
   * UPDATE USER VALUES
   * ============================ */

  const updateUserValue = () => {
    setSchoolName(formData.schoolName);
    setTeacherName(formData.implementer);
    setRegion(formData.region);
  };

  /* ============================
   * SAVE REPORT
   * ============================ */

  function onSave() {
    /*
     * إذا كان عندنا تقرير موجود
     * نحدث نفس التقرير.
     */
    if (report) {
      setNewReport((prev) =>
        prev.map((item) =>
          String(item.id) === id
            ? {
                ...item,
                formData,
              }
            : item
        )
      );

      return;
    }

    /*
     * إذا لم يكن هناك تقرير موجود
     * ننشئ تقرير جديد.
     */
    const newReport: MockReport = {
      id: Date.now(),
      category: 'مصنوعة مني',
      type: 'عام',
      formData,
    };

    setNewReport((prev) => [
      ...prev,
      newReport,
    ]);
  }

  /* ============================
   * FORM SUBMIT
   * ============================ */

  const onFormSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    await handlePrint();
  };

  /* ============================
   * FORM UPDATE
   * ============================ */

  const updateFormData = (
    updater: (
      prev: ReportFormData
    ) => ReportFormData
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
      alert(
        'الرجاء اختيار ملف صورة فقط.'
      );

      e.target.value = '';
      return;
    }

    const imageUrl =
      URL.createObjectURL(file);

    updateFormData((prev) => {
      const newEvidences = [
        ...prev.evidences,
      ];

      const oldImage =
        newEvidences[index];

      if (
        oldImage &&
        oldImage.startsWith('blob:')
      ) {
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

  const handleRemoveImage = (
    index: number
  ) => {
    const oldImage =
      formData.evidences[index];

    if (
      oldImage &&
      oldImage.startsWith('blob:')
    ) {
      URL.revokeObjectURL(oldImage);
    }

    updateFormData((prev) => {
      const newEvidences = [
        ...prev.evidences,
      ];

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
    const newErrors: Record<
      string,
      string
    > = {};

    const hasEvidence =
      formData.evidences.some(
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

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /* ============================
   * WAIT FOR RENDER
   * ============================ */

  const waitForNextPaint = () =>
    new Promise<void>((resolve) =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          resolve()
        )
      )
    );

  const waitForDocumentFonts =
    async () => {
      if ('fonts' in document) {
        try {
          await (
            document as Document & {
              fonts?: FontFaceSet;
            }
          ).fonts?.ready;
        } catch {}
      }
    };

  /* ============================
   * IMAGE LOADING
   * ============================ */

  const waitForImages = async (
    element: HTMLElement
  ) => {
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

        return new Promise<void>(
          (resolve) => {
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
          }
        );
      })
    );
  };

  /* ============================
   * FIT REPORT TO PRINT PAGE
   * ============================ */

  const fitReportToPrintPage =
    async () => {
      const element =
        reportRef.current;

      if (!element) return;

      element.style.transform =
        'none';

      element.style.width =
        `${A4_WIDTH_MM}mm`;

      element.style.maxWidth =
        'none';

      element.style.transformOrigin =
        'top right';

      void element.offsetHeight;

      await waitForNextPaint();

      const naturalHeightPx =
        element.scrollHeight;

      if (
        !naturalHeightPx ||
        !A4_HEIGHT_PX
      ) {
        return;
      }

      const scale = Math.min(
        1,
        A4_HEIGHT_PX /
          naturalHeightPx
      );

      if (scale < 1) {
        element.style.width =
          `${A4_WIDTH_MM}mm`;

        element.style.transform =
          `scale(${scale})`;
      } else {
        element.style.width =
          `${A4_WIDTH_MM}mm`;

        element.style.transform =
          'none';
      }

      await waitForNextPaint();
    };

  /* ============================
   * RESET PRINT LAYOUT
   * ============================ */

  const resetPrintLayout = () => {
    const element =
      reportRef.current;

    if (!element) return;

    element.style.transform = '';
    element.style.width = '';
    element.style.maxWidth = '';
    element.style.transformOrigin =
      '';
  };

  /* ============================
   * AFTER PRINT
   * ============================ */

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
   * CANVAS
   * ============================ */

  const captureReportCanvas =
    async (
      element: HTMLElement,
      scale: number
    ) => {
      await waitForImages(element);

      const startX = 0;
      const startY = 0;

      const endX =
        element.scrollWidth;

      const endY =
        element.scrollHeight;

      const cropWidth =
        endX - startX;

      const cropHeight =
        endY - startY;

      return html2canvas(element, {
        scale,

        useCORS: true,
        allowTaint: false,

        backgroundColor: '#ffffff',

        logging: false,

        imageTimeout: 15000,

        x: startX,
        y: startY,

        width: cropWidth,
        height: cropHeight,

        windowWidth: 950,

        windowHeight: Math.max(
          A4_HEIGHT_PX,
          element.scrollHeight
        ),

        ignoreElements: (el) => {
          return (
            el.hasAttribute(
              'data-pdf-ignore'
            ) ||
            el.classList.contains(
              'export-ignore'
            )
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
        .replace(
          /\s+/g,
          '-'
        );

    return title || 'تقرير';
  };

  /* ============================
   * EXPORT MODE
   * ============================ */

  const enterExportMode =
    async () => {
      setIsExportMode(true);

      const element =
        reportRef.current;

      if (element) {
        element.style.transform =
          'none';

        element.style.width =
          `${A4_WIDTH_MM}mm`;

        element.style.maxWidth =
          'none';

        element.style.transformOrigin =
          'top right';
      }

      await waitForNextPaint();
      await waitForNextPaint();

      await waitForDocumentFonts();

      if (reportRef.current) {
        await waitForImages(
          reportRef.current
        );
      }
    };

  const exitExportMode = () => {
    resetPrintLayout();
    setIsExportMode(false);
  };

  /* ============================
   * DOWNLOAD BLOB
   * ============================ */

  const downloadBlob = (
    blob: Blob,
    fileName: string
  ) => {
    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement('a');

    link.href = url;
    link.download = fileName;
    link.style.display = 'none';

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000);
  };

  /* ============================
   * CANVAS TO BLOB
   * ============================ */

  const canvasToBlob = (
    canvas: HTMLCanvasElement,
    type: string,
    quality?: number
  ) =>
    new Promise<Blob>(
      (resolve, reject) => {
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
      }
    );

  const getCaptureScale = () => 3;

  /* ============================
   * PDF
   * ============================ */

  const handleDownloadPDF =
    async () => {
      if (!validateForm()) return;

      if (!reportRef.current) return;

      try {
        setDownloadingType('pdf');

        /*
         * تحديث معلومات المستخدم
         * ثم حفظ التقرير.
         *
         * إذا كان التقرير موجودًا:
         * سيتم تحديثه.
         *
         * إذا كان جديدًا:
         * سيتم إنشاء تقرير جديد.
         */
        updateUserValue();
        onSave();

        onSubmit?.(formData);

        await enterExportMode();

        if (!reportRef.current) {
          throw new Error(
            'Report element not found.'
          );
        }

        const canvas =
          await captureReportCanvas(
            reportRef.current,
            getCaptureScale()
          );

        const pdf =
          new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true,
          });

        const pageWidth = A4_WIDTH_MM;
        const pageHeight =
          A4_HEIGHT_MM;

        const pdfScale =
          Math.min(
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

        const imageData =
          canvas.toDataURL(
            'image/jpeg',
            0.96
          );

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

        downloadBlob(
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
        exitExportMode();
        setDownloadingType(null);
      }
    };

  /* ============================
   * PNG
   * ============================ */

  const handleDownloadPNG =
    async () => {
      if (!validateForm()) return;

      if (!reportRef.current) return;

      try {
        setDownloadingType('png');

        /*
         * تحديث معلومات المستخدم
         * ثم حفظ التقرير.
         */
        updateUserValue();
        onSave();

        onSubmit?.(formData);

        await enterExportMode();

        if (!reportRef.current) {
          throw new Error(
            'Report element not found.'
          );
        }

        const canvas =
          await captureReportCanvas(
            reportRef.current,
            getCaptureScale()
          );

        const imageBlob =
          await canvasToBlob(
            canvas,
            'image/png'
          );

        downloadBlob(
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
      return `
        col-span-1
        md:col-span-2
        max-w-[500px]
        mx-auto
        w-full
      `;
    }

    if (
      total === 3 &&
      index === 2
    ) {
      return `
        col-span-1
        md:col-span-2
        w-full
      `;
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
        min-h-screen
        w-full
        overflow-x-auto
        bg-[#111714]
        px-2
        py-4
        text-[#E5E9E5]
        font-sans
        antialiased
        selection:bg-[#B39A63]/20
        selection:text-[#E5E9E5]
        sm:px-4
        sm:py-8
        print:min-h-0
        print:bg-white
        print:p-0
        print:m-0
      "
    >
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        @media print {
          html,
          body {
            width: 100% !important;
            min-width: 0 !important;
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

      <div
        ref={pageFrameRef}
        className="report-page-frame"
      >
        <form
          onSubmit={onFormSubmit}
        >
          <div
            ref={reportRef}
            className={`
              report-print-area
              mx-auto
              w-full
              max-w-[950px]
              overflow-hidden
              rounded-2xl
              bg-white
              font-[Arial,sans-serif]
              text-[#173f56]
              shadow-[0_24px_70px_rgba(0,0,0,0.35)]

              ${
                isExportMode
                  ? `
                    w-[210mm]
                    max-w-none
                    rounded-none
                    m-0
                    shadow-none
                  `
                  : ''
              }
            `}
          >
            {/* ================= HEADER ================= */}

            <header
              className="
                relative
                min-h-[193px]
                overflow-visible
                rounded-b-[18px]
                pb-10
                print:rounded-b-[18px]
              "
              style={{
                background:
                  currentTheme.headerGradient,
              }}
            >
              <div
                className="
                  mx-auto
                  flex
                  h-full
                  max-w-[760px]
                  flex-row
                  items-center
                  justify-center
                  gap-8
                  px-4
                  pb-7
                  pt-6
                  text-white
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    border-r-[4px]
                    border-white
                    pr-5
                  "
                >
                  <div
                    className="
                      text-right
                      text-[21px]
                      font-bold
                      leading-[1.55]
                    "
                  >
                    وزارة التعليم

                    <br />

                    <span
                      className="
                        text-[14px]
                        font-normal
                        tracking-wide
                      "
                    >
                      Ministry of Education
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      pr-2
                    "
                  >
                    <MinistryLogo
                      src={logoUrl}
                    />
                  </div>
                </div>

                <div
                  className="
                    w-auto
                    text-right
                    text-[21px]
                    font-bold
                    leading-[1.7]
                  "
                >
                  الإدارة العامة للتعليم

                  <br />

                  <HeaderText
                    isExportMode={
                      isExportMode
                    }
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    placeholder="أدخل المنطقة"
                    className="
                      w-full
                      min-w-[180px]
                      bg-transparent
                      text-right
                      font-bold
                      text-white
                      outline-none
                      placeholder:text-white/60
                    "
                  />
                </div>
              </div>

              <div
                className="
                  absolute
                  translate-y-[70px]
                  left-1/2
                  z-10
                  w-[calc(100%-112px)]
                  max-w-[742px]
                  -translate-x-1/2
                "
              >
                {/* اسم المدرسة */}

                <div
                  className="
                    mb-3
                    flex
                    h-[58px]
                    items-center
                    justify-center
                    rounded-[12px]
                    px-6
                    shadow-sm
                  "
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
                    onChange={handleChange}
                    placeholder="أدخل اسم المدرسة"
                    className="
                      text-center
                      text-[21px]
                      font-bold
                      leading-[1.2]
                      text-white
                      outline-none
                      placeholder:text-white/60
                    "
                  />
                </div>

                {/* عنوان التقرير */}

                <div
                  className="
                    relative
                    flex
                    h-[68px]
                    items-center
                    justify-center
                    px-6
                    pb-[7px]
                  "
                  style={{
                    backgroundColor:
                      currentTheme.darkAccent,
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
                    onChange={handleChange}
                    placeholder="أدخل عنوان التقرير"
                    className="
                      text-center
                      text-[23px]
                      font-bold
                      leading-[1.2]
                      text-white
                      outline-none
                      placeholder:text-white/60
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      h-[7px]
                    "
                    style={{
                      backgroundColor:
                        currentTheme.titleBorder,
                    }}
                  />
                </div>
              </div>
            </header>

            {/* ================= FIELDS ================= */}

            <section
              className={`
                mx-auto
                max-w-[840px]
                px-4
                sm:px-8
                pb-0
                pt-[194px]

                print:max-w-none
                print:px-[12mm]
                print:pb-0
                print:pt-[32mm]

                ${
                  isExportMode
                    ? `
                      max-w-none
                      px-[12mm]
                      pb-0
                      pt-[32mm]
                    `
                    : ''
                }
              `}
            >
              <div
                className={`
                  grid
                  grid-cols-1
                  md:grid-cols-[1.3fr_1fr]
                  print:grid-cols-[1.3fr_1fr]
                  gap-x-4
                  gap-y-7

                  ${
                    isExportMode
                      ? 'grid-cols-[1.3fr_1fr]'
                      : ''
                  }
                `}
              >
                <Field
                  theme={currentTheme}
                  isExportMode={
                    isExportMode
                  }
                  name="implementer"
                  value={
                    formData.implementer
                  }
                  onChange={handleChange}
                  error={
                    errors.implementer
                  }
                  label="المنفذ:"
                  className={`${
                    isExportMode
                      ? `
                        col-start-1
                        row-start-1
                      `
                      : `
                        col-auto
                        row-auto
                        md:col-start-1
                        md:row-start-1
                        print:col-start-1
                        print:row-start-1
                      `
                  }`}
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
                  onChange={handleChange}
                  error={
                    errors.location
                  }
                  label="مكان التنفيذ:"
                  className={`${
                    isExportMode
                      ? `
                        col-start-2
                        row-start-1
                      `
                      : `
                        col-auto
                        row-auto
                        md:col-start-2
                        md:row-start-1
                        print:col-start-2
                        print:row-start-1
                      `
                  }`}
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
                  onChange={handleChange}
                  error={
                    errors.target
                  }
                  label="المستهدفون:"
                  className={`${
                    isExportMode
                      ? `
                        col-start-1
                        row-start-2
                      `
                      : `
                        col-auto
                        row-auto
                        md:col-start-1
                        md:row-start-2
                        print:col-start-1
                        print:row-start-2
                      `
                  }`}
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
                  onChange={handleChange}
                  error={
                    errors.beneficiaries
                  }
                  label="عدد المستفيدين:"
                  className={`${
                    isExportMode
                      ? `
                        col-start-1
                        row-start-3
                      `
                      : `
                        col-auto
                        row-auto
                        md:col-start-1
                        md:row-start-3
                        print:col-start-1
                        print:row-start-3
                      `
                  }`}
                />

                <Field
                  theme={currentTheme}
                  isExportMode={
                    isExportMode
                  }
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={errors.date}
                  label="تاريخ التنفيذ:"
                  className={`${
                    isExportMode
                      ? `
                        col-start-1
                        row-start-4
                      `
                      : `
                        col-auto
                        row-auto
                        md:col-start-1
                        md:row-start-4
                        print:col-start-1
                        print:row-start-4
                      `
                  }`}
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
                  onChange={handleChange}
                  error={
                    errors.objectives
                  }
                  label="الأهداف:"
                  type="textarea"
                  align="right"
                  className="
                    min-h-[237px]

                    ${
                      isExportMode
                        ? `
                          col-start-2
                          row-start-2
                          row-span-3
                        `
                        : `
                          col-auto
                          row-auto
                          md:col-start-2
                          md:row-start-2
                          md:row-span-3
                          print:col-start-2
                          print:row-start-2
                          print:row-span-3
                        `
                    }
                  "
                />
              </div>

              {/* ================= EVIDENCE — EDIT ================= */}

              <div
                className={`
                  report-evidence
                  relative
                  mt-7
                  rounded-[11px]
                  border-2
                  px-5
                  pb-5
                  pt-5

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
                  className="
                    absolute
                    -top-5
                    right-1/2
                    translate-x-1/2
                    bg-white
                    px-3
                    text-[24px]
                    font-bold
                  "
                  style={{
                    color:
                      currentTheme.labelColor,
                  }}
                >
                  الشواهد
                </span>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                    print:hidden
                  "
                >
                  {Array.from({
                    length: displayCount,
                  }).map(
                    (_, boxIndex) => {
                      const imageSrc =
                        formData.evidences[
                          boxIndex
                        ];

                      return (
                        <div
                          key={boxIndex}
                          className={`
                            relative
                            min-w-0
                            ${getEditGridItemClass(
                              boxIndex,
                              displayCount
                            )}
                          `}
                        >
                          <label
                            className="
                              group
                              relative
                              flex
                              h-[230px]
                              w-full
                              cursor-pointer
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-[11px]
                              border-2
                              bg-white
                              transition-all
                              hover:border-dashed
                              hover:bg-gray-50
                            "
                            style={{
                              borderColor:
                                currentTheme.labelColor,
                            }}
                            aria-label={`إضافة شاهد ${
                              boxIndex + 1
                            }`}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageUpload(
                                  e,
                                  boxIndex
                                )
                              }
                            />

                            {imageSrc ? (
                              <img
                                src={imageSrc}
                                alt={`شاهد ${
                                  boxIndex + 1
                                }`}
                                className="
                                  h-full
                                  w-full
                                  bg-white
                                  object-contain
                                "
                              />
                            ) : (
                              <div
                                className="
                                  flex
                                  flex-col
                                  items-center
                                  opacity-70
                                  transition-opacity
                                  group-hover:opacity-100
                                "
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
                              className="
                                absolute
                                right-2
                                top-2
                                z-20
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                bg-red-500
                                text-lg
                                font-bold
                                text-white
                                shadow-md
                                transition-all
                                hover:scale-105
                              "
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

              {/* ================= EVIDENCE — EXPORT ================= */}

              {activeCount > 0 && (
                <div
                  className={`
                    report-evidence
                    mt-7
                    rounded-[11px]
                    border-2
                    px-5
                    pb-5
                    pt-5

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
                  <div className="relative grid grid-cols-2 gap-4">
                    <span
                      className="
                        absolute
                        -top-10
                        right-1/2
                        z-10
                        translate-x-1/2
                        bg-white
                        px-3
                        text-[24px]
                        font-bold
                      "
                      style={{
                        color:
                          currentTheme.labelColor,
                      }}
                    >
                      الشواهد
                    </span>

                    {activeImages.map(
                      (src, index) => (
                        <div
                          key={index}
                          className={`
                            overflow-hidden
                            rounded-[11px]
                            border-2
                            bg-white
                            ${getExportItemHeight(
                              activeCount
                            )}
                            ${getExportItemClass(
                              index,
                              activeCount
                            )}
                          `}
                          style={{
                            borderColor:
                              currentTheme.primaryBorder,
                          }}
                        >
                          <img
                            src={src}
                            alt={`شاهد ${
                              index + 1
                            }`}
                            className="
                              print-evidence-image
                              h-full
                              w-full
                              bg-white
                              object-contain
                            "
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </form>
      </div>

      {/* ============================
          CONTROLS
          ============================ */}

      <div
        className="
          print:hidden
          mx-auto
          mt-8
          flex
          w-full
          max-w-[95%]
          flex-col
          items-center
          gap-4
          rounded-2xl
          border
          border-[#29332D]
          bg-[#171E1A]
          p-4
          shadow-[0_18px_50px_rgba(0,0,0,0.25)]
          sm:w-fit
          sm:flex-row
          sm:rounded-full
          sm:px-6
          sm:py-3
        "
        data-pdf-ignore
      >
        {/* ================= THEMES ================= */}

        <div
          className="
            flex
            w-full
            flex-col
            items-center
            gap-2
            sm:w-auto
            sm:flex-row
            sm:border-l
            sm:border-[#29332D]
            sm:pl-4
          "
        >
          <span
            className="
              whitespace-nowrap
              text-sm
              font-bold
              text-[#89938C]
            "
          >
            اختر الثيم:
          </span>

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
            "
          >
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
                  className={`
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    transition-all

                    ${
                      currentTheme.id ===
                      theme.id
                        ? `
                          scale-105
                          border-[#46534B]
                          bg-[#202923]
                          text-[#E5E9E5]
                          shadow-sm
                          ring-1
                          ring-[#B39A63]/40
                        `
                        : `
                          border-transparent
                          text-[#7F8A82]
                          hover:border-[#303A34]
                          hover:bg-[#202923]
                          hover:text-[#D3D9D4]
                        `
                    }
                  `}
                >
                  <div
                    className="
                      flex
                      h-3.5
                      w-7
                      overflow-hidden
                      rounded-full
                      border
                      border-[#46534B]
                    "
                  >
                    {theme.swatches.map(
                      (
                        color,
                        index
                      ) => (
                        <span
                          key={index}
                          className="
                            h-full
                            flex-1
                          "
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

        {/* ================= PDF ================= */}

        <button
          type="button"
          onClick={
            handleDownloadPDF
          }
          disabled={
            downloadingType !== null ||
            isPrinting
          }
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            whitespace-nowrap
            rounded-xl
            border
            border-[#3A463F]
            bg-[#202923]
            px-6
            py-2
            text-md
            font-bold
            text-[#DCE3DD]
            shadow-sm
            transition-all
            hover:border-[#B39A63]/50
            hover:bg-[#29352E]
            hover:text-[#E7E9E5]
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:w-auto
            cursor-pointer
          "
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
            downloadingType !== null ||
            isPrinting
          }
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            whitespace-nowrap
            rounded-xl
            border
            border-[#3A463F]
            bg-[#202923]
            px-6
            py-2
            text-md
            font-bold
            text-[#DCE3DD]
            shadow-sm
            transition-all
            hover:border-[#B39A63]/50
            hover:bg-[#29352E]
            hover:text-[#E7E9E5]
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:w-auto
            cursor-pointer
          "
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
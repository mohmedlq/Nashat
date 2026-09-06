import React, { useState, useRef } from 'react';
import type {
  ReportFormData,
  MockReport,
} from '../../types/ReportsTypes.ts';

import logoImage from '../../assets/MinistrLogo.png';
import { useUser } from '../../context/Context.tsx';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {
  getTodayHijri,
  stripWhiteBackground,
} from '../../misc/miscOne.tsx';

import {
  PRESET_THEMES,
  type Theme,
} from '../../misc/Theme.ts';

import {
  A4_WIDTH_MM,
  A4_HEIGHT_MM,
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
} from '../../misc/PdfConfig.ts';

import {
  PrinterIcon,
  PdfDownloadIcon,
  ImageDownloadIcon,
  SpinnerIcon,
} from '../../Icons/Icons.tsx';

import {
  REPORT_DESIGNS,
  DEFAULT_REPORT_MODE,
  DEFAULT_REPORT_DESIGN_ID,
  getReportDesignById,
  type ReportMode,
  getReportDesignsByMode,
} from './registry.tsx';

export type { Theme };
export { PRESET_THEMES };

/* =========================================================
 * TYPES
 * ========================================================= */

export interface ReportProps {
  id?: string;
  initialData?: Partial<ReportFormData>;
  logoUrl?: string;
  initialThemeId?: string;
  onChange?: (data: ReportFormData) => void;
  onSubmit?: (data: ReportFormData) => void;
}

type ToastType =
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

interface ToastState {
  message: string;
  type: ToastType;
}

/* =========================================================
 * HTML2CANVAS COLOR NORMALIZATION
 * ========================================================= */

/*
 * html2canvas versions may fail when they encounter modern
 * CSS color functions such as:
 *
 * oklab()
 * oklch()
 * lab()
 * lch()
 * color()
 * color-mix()
 *
 * IMPORTANT:
 * We DO NOT modify the real React DOM.
 *
 * Everything below runs only against html2canvas's cloned
 * document.
 */

const MODERN_COLOR_FUNCTIONS = [
  'color-mix(',
  'oklab(',
  'oklch(',
  'lab(',
  'lch(',
  'color(',
];

const MODERN_COLOR_REGEX =
  /(?:color-mix|oklab|oklch|lab|lch|color)\(/i;

/* =========================================================
 * CHECK MODERN COLOR
 * ========================================================= */

const containsModernColor = (
  value: string
): boolean => {
  return Boolean(
    value &&
      MODERN_COLOR_REGEX.test(value)
  );
};

/* =========================================================
 * FIND CLOSING PARENTHESIS
 * ========================================================= */

const findClosingParenthesis = (
  value: string,
  openingIndex: number
): number => {
  let depth = 0;

  for (
    let index = openingIndex;
    index < value.length;
    index++
  ) {
    const char = value[index];

    if (char === '(') {
      depth++;
    }

    if (char === ')') {
      depth--;

      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
};

/* =========================================================
 * RESOLVE SINGLE MODERN COLOR
 * ========================================================= */

const resolveModernColor = (
  documentRef: Document,
  probe: HTMLSpanElement,
  color: string
): string | null => {
  if (!color) {
    return null;
  }

  /* -------------------------------------------------------
   * METHOD 1
   * Browser CSS engine
   * ------------------------------------------------------- */

  try {
    probe.style.color = '';

    probe.style.color = color;

    if (probe.style.color) {
      const computed =
        documentRef.defaultView?.getComputedStyle(
          probe
        ).color;

      if (
        computed &&
        !containsModernColor(computed)
      ) {
        return computed;
      }
    }
  } catch {
    // Continue to canvas fallback.
  }

  /* -------------------------------------------------------
   * METHOD 2
   * Canvas CSS color parser
   * ------------------------------------------------------- */

  try {
    const canvas =
      documentRef.createElement(
        'canvas'
      );

    canvas.width = 1;
    canvas.height = 1;

    const context =
      canvas.getContext('2d');

    if (!context) {
      return null;
    }

    /*
     * Reset first so a failed assignment cannot leave
     * a previous value.
     */
    context.fillStyle =
      'rgb(0, 0, 0)';

    context.fillStyle = color;

    const normalized =
      context.fillStyle;

    if (
      normalized &&
      !containsModernColor(normalized)
    ) {
      return normalized;
    }
  } catch {
    // Ignore.
  }

  return null;
};

/* =========================================================
 * REPLACE MODERN FUNCTIONS INSIDE CSS VALUE
 * ========================================================= */

const replaceModernColorFunctions = (
  documentRef: Document,
  probe: HTMLSpanElement,
  value: string
): string => {
  if (
    !value ||
    !containsModernColor(value)
  ) {
    return value;
  }

  let result = '';
  let index = 0;

  while (index < value.length) {
    const lowerValue =
      value.toLowerCase();

    let functionStart = -1;
    let matchedFunction:
      | string
      | null = null;

    /*
     * Find the earliest modern color function.
     */
    for (const functionName of MODERN_COLOR_FUNCTIONS) {
      const found =
        lowerValue.indexOf(
          functionName,
          index
        );

      if (
        found !== -1 &&
        (
          functionStart === -1 ||
          found < functionStart
        )
      ) {
        functionStart = found;
        matchedFunction =
          functionName;
      }
    }

    /*
     * No more modern colors.
     */
    if (
      functionStart === -1 ||
      !matchedFunction
    ) {
      result += value.slice(index);
      break;
    }

    /*
     * Copy everything before the function.
     */
    result += value.slice(
      index,
      functionStart
    );

    /*
     * Position of "(".
     */
    const openingIndex =
      functionStart +
      matchedFunction.length -
      1;

    /*
     * Find matching ")".
     */
    const closingIndex =
      findClosingParenthesis(
        value,
        openingIndex
      );

    /*
     * Malformed CSS.
     *
     * Do not allow the original modern function
     * to reach html2canvas.
     */
    if (closingIndex === -1) {
      result +=
        'rgb(0, 0, 0)';

      break;
    }

    const candidate =
      value.slice(
        functionStart,
        closingIndex + 1
      );

    const normalized =
      resolveModernColor(
        documentRef,
        probe,
        candidate
      );

    /*
     * If browser/canvas successfully understands
     * the modern color, use RGB/RGBA.
     *
     * Otherwise use a safe black fallback.
     *
     * This is only the cloned export document.
     */
    result +=
      normalized &&
      !containsModernColor(
        normalized
      )
        ? normalized
        : 'rgb(0, 0, 0)';

    index =
      closingIndex + 1;
  }

  return result;
};

/* =========================================================
 * NORMALIZE ALL COLORS IN CLONED DOCUMENT
 * ========================================================= */

const normalizeColorsForHtml2Canvas = (
  clonedDocument: Document,
  root: HTMLElement
): void => {
  /*
   * One probe is reused for the entire normalization pass.
   */
  const probe =
    clonedDocument.createElement(
      'span'
    );

  probe.style.position =
    'fixed';

  probe.style.left =
    '-999999px';

  probe.style.top =
    '-999999px';

  probe.style.width =
    '1px';

  probe.style.height =
    '1px';

  probe.style.padding =
    '0';

  probe.style.margin =
    '0';

  probe.style.border =
    '0';

  probe.style.opacity =
    '0';

  probe.style.pointerEvents =
    'none';

  probe.style.visibility =
    'hidden';

  clonedDocument.body.appendChild(
    probe
  );

  /* -------------------------------------------------------
   * Properties that directly contain colors
   * ------------------------------------------------------- */

  const colorProperties = [
    'color',
    'background-color',

    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',

    'outline-color',

    'text-decoration-color',

    'column-rule-color',

    'caret-color',

    'accent-color',

    'scrollbar-color',

    'fill',
    'stroke',

    'stop-color',
    'flood-color',
    'lighting-color',
  ];

  /* -------------------------------------------------------
   * Properties that may contain colors inside functions
   * ------------------------------------------------------- */

  const complexProperties = [
    'background-image',
    'background',

    'box-shadow',
    'text-shadow',

    'outline',

    'filter',

    'mask',
    'mask-image',

    '-webkit-mask',
    '-webkit-mask-image',

    'border-image',
    'border-image-source',
  ];

  try {
    const elements = [
      root,
      ...Array.from(
        root.querySelectorAll<HTMLElement>(
          '*'
        )
      ),
    ];

    /* =====================================================
     * NORMALIZE HTML ELEMENTS
     * ===================================================== */

    for (const element of elements) {
      const computedStyle =
        clonedDocument.defaultView?.getComputedStyle(
          element
        );

      if (!computedStyle) {
        continue;
      }

      /* ---------------------------------------------------
       * Direct color properties
       * --------------------------------------------------- */

      for (const property of colorProperties) {
        try {
          const value =
            computedStyle.getPropertyValue(
              property
            );

          if (
            !value ||
            !containsModernColor(
              value
            )
          ) {
            continue;
          }

          const normalized =
            replaceModernColorFunctions(
              clonedDocument,
              probe,
              value
            );

          /*
           * Never allow the modern function
           * to remain in the cloned document.
           */
          if (
            normalized &&
            !containsModernColor(
              normalized
            )
          ) {
            element.style.setProperty(
              property,
              normalized,
              'important'
            );
          }
        } catch {
          // Ignore individual property.
        }
      }

      /* ---------------------------------------------------
       * Complex properties
       * --------------------------------------------------- */

      for (const property of complexProperties) {
        try {
          const value =
            computedStyle.getPropertyValue(
              property
            );

          if (
            !value ||
            !containsModernColor(
              value
            )
          ) {
            continue;
          }

          const normalized =
            replaceModernColorFunctions(
              clonedDocument,
              probe,
              value
            );

          if (
            normalized &&
            !containsModernColor(
              normalized
            )
          ) {
            element.style.setProperty(
              property,
              normalized,
              'important'
            );
          } else {
            /*
             * Shadows are not essential to the report.
             *
             * If one somehow cannot be normalized,
             * remove the shadow from the clone rather
             * than allowing html2canvas to crash.
             */
            if (
              property ===
                'box-shadow' ||
              property ===
                'text-shadow'
            ) {
              element.style.setProperty(
                property,
                'none',
                'important'
              );
            }
          }
        } catch {
          // Ignore individual property.
        }
      }

      /* ---------------------------------------------------
       * INLINE STYLES
       *
       * React style={{ backgroundColor: ... }}
       * can also contain modern colors.
       * --------------------------------------------------- */

      for (
        let i = 0;
        i < element.style.length;
        i++
      ) {
        const property =
          element.style.item(i);

        if (!property) {
          continue;
        }

        const value =
          element.style.getPropertyValue(
            property
          );

        if (
          !value ||
          !containsModernColor(
            value
          )
        ) {
          continue;
        }

        const normalized =
          replaceModernColorFunctions(
            clonedDocument,
            probe,
            value
          );

        if (
          normalized &&
          !containsModernColor(
            normalized
          )
        ) {
          element.style.setProperty(
            property,
            normalized
          );
        }
      }
    }

    /* =====================================================
     * SVG SAFETY PASS
     * ===================================================== */

    const svgElements =
      Array.from(
        root.querySelectorAll<SVGElement>(
          'svg *'
        )
      );

    for (const element of svgElements) {
      const attributes = [
        'fill',
        'stroke',
        'color',
        'stop-color',
        'flood-color',
        'lighting-color',
      ];

      for (const attribute of attributes) {
        try {
          const value =
            element.getAttribute(
              attribute
            );

          if (
            !value ||
            !containsModernColor(
              value
            )
          ) {
            continue;
          }

          const normalized =
            replaceModernColorFunctions(
              clonedDocument,
              probe,
              value
            );

          if (
            normalized &&
            !containsModernColor(
              normalized
            )
          ) {
            element.setAttribute(
              attribute,
              normalized
            );
          }
        } catch {
          // Ignore SVG attribute.
        }
      }
    }
  } finally {
    probe.remove();
  }
};

/* =========================================================
 * COMPONENT
 * ========================================================= */

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

  const report = reports.find(
    (item) =>
      String(item.id) === id
  );

  /*
   * Always points to the currently selected
   * print component.
   */
  const printRef =
    useRef<HTMLDivElement>(null);

  const [
    downloadingType,
    setDownloadingType,
  ] = useState<
    'pdf' | 'png' | 'print' | null
  >(null);

  const [toast, setToast] =
    useState<ToastState | null>(
      null
    );

  /* =========================================================
   * REPORT SELECTION
   * ========================================================= */

  const [reportMode, setReportMode] =
    useState<ReportMode>(
      DEFAULT_REPORT_MODE
    );

  const [
    reportDesignId,
    setReportDesignId,
  ] = useState<string>(
    DEFAULT_REPORT_DESIGN_ID
  );

  const activeReportDesign =
    getReportDesignById(
      reportDesignId
    );

  /* =========================================================
   * TOAST
   * ========================================================= */

  const showToast = (
    message: string,
    type: ToastType = 'error'
  ) => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast((current) =>
        current?.message ===
        message
          ? null
          : current
      );
    }, 4500);
  };

  /* =========================================================
   * DEFAULT FORM DATA
   * ========================================================= */

  const DEFAULT_FORM_DATA:
    ReportFormData = {
    schoolName:
      schoolName || '',

    region:
      region || '',

    reportTitle:
      '',

    implementer:
      teacherName || '',

    location:
      'الفصل الدراسي',

    target:
      'الطلاب',

    beneficiaries:
      '33',

    date:
      getTodayHijri(),

    objectives:
      '',

    evidences: [
      null,
      null,
      null,
      null,
    ],
  };

  const [formData, setFormData] =
    useState<ReportFormData>(
      () => ({
        ...DEFAULT_FORM_DATA,

        ...(report?.formData ??
          initialData ??
          {}),

        evidences:
          report?.formData
            ?.evidences ??
          initialData?.evidences ??
          DEFAULT_FORM_DATA.evidences,
      })
    );

  const [
    processedLogoSrc,
    setProcessedLogoSrc,
  ] = useState<string | null>(
    null
  );

  /* =========================================================
   * LOGO
   * ========================================================= */

  React.useEffect(() => {
    const sourceUrl =
      logoUrl || logoImage;

    const img = new Image();

    img.crossOrigin =
      'anonymous';

    img.onload = () => {
      try {
        setProcessedLogoSrc(
          stripWhiteBackground(img)
        );
      } catch (error) {
        console.error(
          'Logo background removal failed:',
          error
        );

        setProcessedLogoSrc(
          null
        );
      }
    };

    img.onerror = () =>
      setProcessedLogoSrc(
        null
      );

    img.src = sourceUrl;
  }, [logoUrl]);

  /* =========================================================
   * LOAD REPORT
   * ========================================================= */

  React.useEffect(() => {
    if (report) {
      setFormData((prev) => ({
        ...prev,

        ...report.formData,

        evidences:
          report.formData
            .evidences ??
          prev.evidences,
      }));

      return;
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
  }, [
    report,
    initialData,
  ]);

  /* =========================================================
   * THEME
   * ========================================================= */

  const [
    currentTheme,
    setCurrentTheme,
  ] = useState<Theme>(
    () =>
      PRESET_THEMES.find(
        (theme) =>
          theme.id ===
          initialThemeId
      ) ||
      PRESET_THEMES[0]
  );

  const [
    errors,
    setErrors,
  ] = useState<
    Record<string, string>
  >({});

  /* =========================================================
   * USER VALUES
   * ========================================================= */

  const updateUserValue = () => {
    setSchoolName(
      formData.schoolName
    );

    setTeacherName(
      formData.implementer
    );

    setRegion(
      formData.region
    );
  };

  /* =========================================================
   * SAVE
   * ========================================================= */

  function onSave() {
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

    const newReport:
      MockReport = {
      id: Date.now(),

      category:
        'مصنوعة مني',

      type:
        'عام',

      formData,
    };

    setNewReport((prev) => [
      ...prev,
      newReport,
    ]);
  }

  /* =========================================================
   * FORM UPDATE
   * ========================================================= */

  const updateFormData = (
    updater: (
      prev: ReportFormData
    ) => ReportFormData
  ) => {
    setFormData((prev) => {
      const updated =
        updater(prev);

      onChange?.(updated);

      return updated;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

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

  /* =========================================================
   * IMAGE UPLOAD
   * ========================================================= */

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        'image/'
      )
    ) {
      showToast(
        'الرجاء اختيار ملف صورة صالح فقط.',
        'warning'
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
        oldImage.startsWith(
          'blob:'
        )
      ) {
        URL.revokeObjectURL(
          oldImage
        );
      }

      newEvidences[index] =
        imageUrl;

      return {
        ...prev,

        evidences:
          newEvidences,
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
      oldImage.startsWith(
        'blob:'
      )
    ) {
      URL.revokeObjectURL(
        oldImage
      );
    }

    updateFormData((prev) => {
      const newEvidences = [
        ...prev.evidences,
      ];

      newEvidences[index] =
        null;

      return {
        ...prev,

        evidences:
          newEvidences,
      };
    });
  };

  /* =========================================================
   * VALIDATION
   * ========================================================= */

  const validateForm = () => {
    const newErrors:
      Record<string, string> = {};

    if (
      reportMode ===
      'with-image'
    ) {
      const hasEvidence =
        formData.evidences.some(
          (src) =>
            Boolean(src)
        );

      if (!hasEvidence) {
        newErrors.evidences =
          'يجب إضافة صورة شاهد واحدة على الأقل.';

        showToast(
          'يجب إضافة صورة شاهد واحدة على الأقل للاستمرار.',
          'warning'
        );
      }
    }

    setErrors(
      newErrors
    );

    return (
      Object.keys(
        newErrors
      ).length === 0
    );
  };

  /* =========================================================
   * EXPORT HELPERS
   * ========================================================= */

  const waitForDocumentFonts =
    async () => {
      if ('fonts' in document) {
        try {
          await (
            document as Document & {
              fonts?: FontFaceSet;
            }
          ).fonts?.ready;
        } catch {
          // Ignore font errors.
        }
      }
    };

  const waitForImages =
    async (
      element: HTMLElement
    ) => {
      const images =
        Array.from(
          element.querySelectorAll(
            'img'
          )
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
              const finish =
                () => {
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

  const downloadBlob = (
    blob: Blob,
    fileName: string
  ) => {
    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        'a'
      );

    link.href = url;

    link.download =
      fileName;

    link.style.display =
      'none';

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    setTimeout(
      () =>
        URL.revokeObjectURL(
          url
        ),
      60000
    );
  };

  const canvasToBlob = (
    canvas: HTMLCanvasElement,
    type: string,
    quality?: number
  ) =>
    new Promise<Blob>(
      (
        resolve,
        reject
      ) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(
                blob
              );
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

  const getCaptureScale =
    () => 3;

  /* =========================================================
   * CAPTURE REPORT
   * ========================================================= */

  const captureReportCanvas =
    async (
      element: HTMLElement,
      scale: number
    ): Promise<HTMLCanvasElement> => {
      await waitForDocumentFonts();

      await waitForImages(
        element
      );

      /*
       * IMPORTANT:
       *
       * html2canvas gets its own cloned DOM.
       *
       * The normalization happens inside that clone.
       *
       * Therefore the real application DOM remains
       * completely untouched.
       */
      const canvas =
        await html2canvas(
          element,
          {
            scale,

            useCORS:
              true,

            allowTaint:
              false,

            backgroundColor:
              '#ffffff',

            logging:
              false,

            imageTimeout:
              15000,

            width:
              A4_WIDTH_PX,

            height:
              A4_HEIGHT_PX,

            windowWidth:
              A4_WIDTH_PX,

            windowHeight:
              A4_HEIGHT_PX,

            x: 0,

            y: 0,

            scrollY: 0,

            scrollX: 0,

            ignoreElements:
              (el) =>
                el.hasAttribute(
                  'data-pdf-ignore'
                ) ||
                el.classList.contains(
                  'export-ignore'
                ),

            onclone:
              (
                clonedDocument
              ) => {
                /*
                 * Locate only the print wrapper.
                 */
                const clonedRoot =
                  clonedDocument.querySelector(
                    '[data-report-print-wrapper]'
                  ) as HTMLElement | null;

                if (!clonedRoot) {
                  console.warn(
                    'Print root not found during html2canvas clone.'
                  );

                  return;
                }

                /*
                 * Remove every unsupported modern
                 * CSS color from the cloned report.
                 */
                normalizeColorsForHtml2Canvas(
                  clonedDocument,
                  clonedRoot
                );
              },
          }
        );

      return canvas;
    };

  /* =========================================================
   * FILE NAME
   * ========================================================= */

  const getSafeFileName =
    () => {
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

      return (
        title ||
        'تقرير'
      );
    };

  /* =========================================================
   * PDF
   * ========================================================= */

  const generateReportPdfBlob =
    async (): Promise<Blob> => {
      if (
        !printRef.current
      ) {
        throw new Error(
          'Print document element not found.'
        );
      }

      /*
       * This function now definitely exists in the same
       * component scope and handles the complete capture
       * pipeline.
       */
      const canvas =
        await captureReportCanvas(
          printRef.current,
          getCaptureScale()
        );

      const pdf =
        new jsPDF({
          orientation:
            'portrait',

          unit:
            'mm',

          format:
            'a4',

          compress:
            true,
        });

      const pageWidth =
        A4_WIDTH_MM;

      const pageHeight =
        A4_HEIGHT_MM;

      const pdfScale =
        Math.min(
          pageWidth /
            canvas.width,

          pageHeight /
            canvas.height
        );

      const imgWidth =
        canvas.width *
        pdfScale;

      const imgHeight =
        canvas.height *
        pdfScale;

      const x =
        (pageWidth -
          imgWidth) /
        2;

      const y =
        (pageHeight -
          imgHeight) /
        2;

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

      return pdf.output(
        'blob'
      );
    };

  /* =========================================================
   * DOWNLOAD PDF
   * ========================================================= */

  const handleDownloadPDF =
    async () => {
      if (
        !validateForm()
      ) {
        return;
      }

      try {
        setDownloadingType(
          'pdf'
        );

        updateUserValue();

        onSave();

        onSubmit?.(
          formData
        );

        const pdfBlob =
          await generateReportPdfBlob();

        downloadBlob(
          pdfBlob,
          `${getSafeFileName()}.pdf`
        );

        showToast(
          'تم تحميل التقرير بصيغة PDF بنجاح!',
          'success'
        );
      } catch (error) {
        console.error(
          'PDF generation failed:',
          error
        );

        showToast(
          'تعذر تحميل التقرير كملف PDF. حاول مرة أخرى.',
          'error'
        );
      } finally {
        setDownloadingType(
          null
        );
      }
    };

  /* =========================================================
   * DOWNLOAD PNG
   * ========================================================= */

  const handleDownloadPNG =
    async () => {
      if (
        !validateForm()
      ) {
        return;
      }

      if (
        !printRef.current
      ) {
        return;
      }

      try {
        setDownloadingType(
          'png'
        );

        updateUserValue();

        onSave();

        onSubmit?.(
          formData
        );

        const canvas =
          await captureReportCanvas(
            printRef.current,
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

        showToast(
          'تم تحميل التقرير كصورة بنجاح!',
          'success'
        );
      } catch (error) {
        console.error(
          'PNG generation failed:',
          error
        );

        showToast(
          'تعذر تحميل التقرير كصورة PNG. حاول مرة أخرى.',
          'error'
        );
      } finally {
        setDownloadingType(
          null
        );
      }
    };

  /* =========================================================
   * PRINT
   * ========================================================= */

  const handlePrint =
    async () => {
      if (
        !validateForm()
      ) {
        return;
      }

      const printWindow =
        window.open(
          '',
          '_blank'
        );

      try {
        setDownloadingType(
          'print'
        );

        updateUserValue();

        onSave();

        onSubmit?.(
          formData
        );

        const pdfBlob =
          await generateReportPdfBlob();

        const url =
          URL.createObjectURL(
            pdfBlob
          );

        if (printWindow) {
          printWindow.location.href =
            url;
        } else {
          downloadBlob(
            pdfBlob,
            `${getSafeFileName()}.pdf`
          );

          showToast(
            'تم تحميل ملف PDF لأن المتصفح منع فتح النافذة تلقائياً.',
            'info'
          );
        }

        setTimeout(
          () =>
            URL.revokeObjectURL(
              url
            ),
          60000
        );
      } catch (error) {
        if (printWindow) {
          printWindow.close();
        }

        console.error(
          'Print preparation failed:',
          error
        );

        showToast(
          'تعذر تجهيز التقرير للطباعة. حاول مرة أخرى.',
          'error'
        );
      } finally {
        setDownloadingType(
          null
        );
      }
    };

  /* =========================================================
   * UI STATE
   * ========================================================= */

  const isBusy =
    downloadingType !== null;

  const logoSrc =
    processedLogoSrc ||
    logoUrl;

  /* =========================================================
   * REPORT MODE CHANGE
   * ========================================================= */

  const handleReportModeChange = (
    mode: ReportMode
  ) => {
    setReportMode(
      mode
    );

    const designsForMode =
      getReportDesignsByMode(
        mode
      );

    const stillValid =
      designsForMode.some(
        (design) =>
          design.id ===
          reportDesignId
      );

    if (!stillValid) {
      setReportDesignId(
        designsForMode[0]
          ?.id ??
          DEFAULT_REPORT_DESIGN_ID
      );
    }
  };

  /* =========================================================
   * REPORT EDITOR
   * ========================================================= */

  const renderReportEditor =
    () => {
      if (
        !activeReportDesign
      ) {
        return (
          <div className="mx-auto w-full max-w-[950px] rounded-[28px] border border-dashed border-[#46534B] bg-[#171E1A] p-12 text-center">
            <h2 className="text-lg font-black text-[#D8C18E]">
              لا يوجد تصميم
            </h2>

            <p className="mt-2 text-sm text-[#89938C]">
              لم يتم تسجيل أي تصميم للتقرير.
            </p>
          </div>
        );
      }

      if (
        !activeReportDesign.component
      ) {
        return (
          <div className="mx-auto w-full max-w-[950px] rounded-[28px] border border-dashed border-[#46534B] bg-[#171E1A] p-12 text-center shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl border border-[#3A463F] bg-[#202923] text-2xl text-[#B39A63]">
              ▤
            </div>

            <h2 className="text-lg font-black text-[#D8C18E]">
              {
                activeReportDesign.name
              }
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-[#89938C]">
              {
                activeReportDesign.description
              }
            </p>
          </div>
        );
      }

      const ReportEditor =
        activeReportDesign.component;

      const sharedProps =
        {
          formData,
          errors,
          theme:
            currentTheme,
          logoSrc,

          onChange:
            handleChange,

          onImageUpload:
            handleImageUpload,

          onRemoveImage:
            handleRemoveImage,
        };

      return (
        <ReportEditor
          key={
            activeReportDesign.id
          }
          {...sharedProps}
        />
      );
    };

  /* =========================================================
   * AVAILABLE DESIGNS
   * ========================================================= */

  const availableDesigns =
    getReportDesignsByMode(
      reportMode
    );

  /* =========================================================
   * RENDER
   * ========================================================= */

  return (
    <div
      dir="rtl"
      className="relative min-h-screen w-full overflow-x-auto bg-[#111714] px-2 py-4 font-sans antialiased text-[#E5E9E5] selection:bg-[#B39A63]/20 selection:text-[#E5E9E5] sm:px-4 sm:py-8 print:hidden"
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

      {/* =====================================================
       * TOAST
       * ===================================================== */}

      {toast && (
        <div className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-[#3A463F] bg-[#171E1A] px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <span
            className={`size-2.5 rounded-full ${
              toast.type ===
              'error'
                ? 'bg-red-500'
                : toast.type ===
                  'warning'
                ? 'bg-amber-500'
                : toast.type ===
                  'success'
                ? 'bg-emerald-500'
                : 'bg-blue-500'
            }`}
          />

          <span className="text-sm font-semibold text-[#E5E9E5]">
            {
              toast.message
            }
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              setToast(
                null
              );
            }}
            className="mr-2 text-xs text-[#7F8A82] transition-colors hover:text-[#E5E9E5]"
          >
            ✕
          </button>
        </div>
      )}

      {/* =====================================================
       * 1. REPORT
       * ===================================================== */}

      {/* =====================================================
       * 2. REPORT TYPE
       * ===================================================== */}

      <section
        className="mx-auto mt-6 w-full max-w-[950px]"
        data-pdf-ignore
      >
        <div className="overflow-hidden rounded-[26px] border border-[#29332D] bg-[#171E1A] shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
          <div className="border-b border-[#29332D] px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#3A463F] bg-[#202923] text-[#B39A63]">
                ▤
              </div>

              <div>
                <h2 className="text-sm font-black text-[#E5E9E5]">
                  نوع التقرير
                </h2>

                <p className="mt-1 text-xs leading-5 text-[#6F7B73]">
                  اختر طريقة بناء التقرير قبل اختيار شكله.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* WITH IMAGE */}

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  handleReportModeChange(
                    'with-image'
                  );
                }}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-right transition-all duration-200 ${
                  reportMode ===
                  'with-image'
                    ? 'border-[#B39A63] bg-[#202923] shadow-[0_8px_25px_rgba(0,0,0,0.18)]'
                    : 'border-[#29332D] bg-[#111714] hover:border-[#46534B] hover:bg-[#1B221E]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl border text-lg transition-colors ${
                      reportMode ===
                      'with-image'
                        ? 'border-[#B39A63]/50 bg-[#B39A63]/10 text-[#D8C18E]'
                        : 'border-[#3A463F] bg-[#202923] text-[#7F8A82] group-hover:text-[#D3D9D4]'
                    }`}
                  >
                    ▧
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-sm font-black ${
                          reportMode ===
                          'with-image'
                            ? 'text-[#E5E9E5]'
                            : 'text-[#B8C0BA]'
                        }`}
                      >
                        تقرير بالشواهد
                      </span>

                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                          reportMode ===
                          'with-image'
                            ? 'border-[#B39A63] bg-[#B39A63] text-[#111714]'
                            : 'border-[#46534B]'
                        }`}
                      >
                        {reportMode ===
                          'with-image' && (
                          <span className="text-[11px] font-black">
                            ✓
                          </span>
                        )}
                      </span>
                    </div>

                    <p className="mt-1.5 text-[11px] leading-5 text-[#6F7B73]">
                      تقرير يحتوي على صور الشواهد والأدلة المرتبطة بالنشاط.
                    </p>
                  </div>
                </div>
              </button>

              {/* NO IMAGE */}

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  handleReportModeChange(
                    'no-image'
                  );
                }}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-right transition-all duration-200 ${
                  reportMode ===
                  'no-image'
                    ? 'border-[#B39A63] bg-[#202923] shadow-[0_8px_25px_rgba(0,0,0,0.18)]'
                    : 'border-[#29332D] bg-[#111714] hover:border-[#46534B] hover:bg-[#1B221E]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl border text-lg transition-colors ${
                      reportMode ===
                      'no-image'
                        ? 'border-[#B39A63]/50 bg-[#B39A63]/10 text-[#D8C18E]'
                        : 'border-[#3A463F] bg-[#202923] text-[#7F8A82] group-hover:text-[#D3D9D4]'
                    }`}
                  >
                    ≡
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-sm font-black ${
                          reportMode ===
                          'no-image'
                            ? 'text-[#E5E9E5]'
                            : 'text-[#B8C0BA]'
                        }`}
                      >
                        تقرير نصي
                      </span>

                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                          reportMode ===
                          'no-image'
                            ? 'border-[#B39A63] bg-[#B39A63] text-[#111714]'
                            : 'border-[#46534B]'
                        }`}
                      >
                        {reportMode ===
                          'no-image' && (
                          <span className="text-[11px] font-black">
                            ✓
                          </span>
                        )}
                      </span>
                    </div>

                    <p className="mt-1.5 text-[11px] leading-5 text-[#6F7B73]">
                      تقرير يعتمد على المحتوى والنصوص بدون صور شواهد.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto mt-6 w-full max-w-[1100px]">
        {renderReportEditor()}
      </section>
      {/* =====================================================
       * 3. CUSTOMIZATION
       * ===================================================== */}

      <section
        className="mx-auto mt-6 w-full max-w-[950px]"
        data-pdf-ignore
      >
        <div className="overflow-hidden rounded-[28px] border border-[#29332D] bg-[#171E1A] shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
          {/* HEADER */}

          <div className="border-b border-[#29332D] px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#3A463F] bg-[#202923] text-[#B39A63]">
                ⚙
              </div>

              <div>
                <h2 className="text-sm font-black text-[#E5E9E5]">
                  تخصيص التقرير
                </h2>

                <p className="mt-0.5 text-xs text-[#6F7B73]">
                  اختر شكل التقرير والألوان المناسبة.
                </p>
              </div>
            </div>
          </div>

          {/* REPORT DESIGN */}

          <div className="border-b border-[#29332D] px-5 py-6 sm:px-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black text-[#D3D9D4]">
                  شكل التقرير
                </p>

                <p className="mt-1 text-[10px] leading-5 text-[#68736C]">
                  اختر التصميم الذي سيظهر به التقرير.
                </p>
              </div>

              <span className="hidden rounded-full border border-[#29332D] bg-[#111714] px-3 py-1 text-[10px] font-bold text-[#68736C] sm:block">
                {
                  availableDesigns.length
                }{' '}
                تصاميم
              </span>
            </div>

            {availableDesigns.length >
            0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {availableDesigns.map(
                  (design) => {
                    const isSelected =
                      reportDesignId ===
                      design.id;

                    return (
                      <button
                        key={
                          design.id
                        }
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          setReportDesignId(
                            design.id
                          );
                        }}
                        className={`group relative overflow-hidden rounded-2xl border-2 bg-[#111714] text-right transition-all duration-200 ${
                          isSelected
                            ? 'border-[#B39A63] shadow-[0_10px_30px_rgba(0,0,0,0.22)]'
                            : 'border-[#29332D] hover:border-[#46534B]'
                        }`}
                      >
                        {/* PREVIEW */}

                        <div className="relative h-[190px] overflow-hidden">
                          <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.02]">
                            {
                              design.preview
                            }
                          </div>

                          {/* OVERLAY */}

                          <div
                            className={`absolute inset-0 transition-opacity ${
                              isSelected
                                ? 'bg-[#B39A63]/[0.04]'
                                : 'bg-black/0 group-hover:bg-black/[0.04]'
                            }`}
                          />

                          {/* SELECTED */}

                          {isSelected && (
                            <div className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-[#B39A63] text-[#111714] shadow-lg">
                              <span className="text-xs font-black">
                                ✓
                              </span>
                            </div>
                          )}

                          {/* DESIGN NAME */}

                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-8">
                            <span className="text-xs font-black text-white">
                              {
                                design.name
                              }
                            </span>
                          </div>
                        </div>

                        {/* DESCRIPTION */}

                        <div className="border-t border-[#29332D] bg-[#171E1A] px-3.5 py-3">
                          <p className="line-clamp-2 text-[10px] leading-5 text-[#68736C]">
                            {
                              design.description
                            }
                          </p>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#3A463F] bg-[#111714] px-5 py-10 text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl border border-[#3A463F] bg-[#202923] text-[#B39A63]">
                  ▤
                </div>

                <p className="text-xs font-bold text-[#B8C0BA]">
                  لا توجد تصاميم متاحة
                </p>

                <p className="mt-1 text-[10px] text-[#68736C]">
                  لم تتم إضافة تصاميم لهذا النوع من التقارير.
                </p>
              </div>
            )}
          </div>

          {/* THEME */}

          <div className="px-5 py-6 sm:px-6">
            <div className="mb-4">
              <p className="text-xs font-black text-[#D3D9D4]">
                الثيم
              </p>

              <p className="mt-1 text-[10px] text-[#68736C]">
                الألوان العامة للتقرير.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {PRESET_THEMES.map(
                (theme) => {
                  const isSelected =
                    currentTheme.id ===
                    theme.id;

                  return (
                    <button
                      key={
                        theme.id
                      }
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        setCurrentTheme(
                          theme
                        );
                      }}
                      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition-all ${
                        isSelected
                          ? 'border-[#46534B] bg-[#202923] text-[#E5E9E5] ring-1 ring-[#B39A63]/30'
                          : 'border-transparent text-[#7F8A82] hover:border-[#303A34] hover:bg-[#202923] hover:text-[#D3D9D4]'
                      }`}
                    >
                      <div className="flex h-3.5 w-7 overflow-hidden rounded-full border border-[#46534B]">
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
                          theme.name
                        }
                      </span>

                      {isSelected && (
                        <span className="text-[10px] text-[#D8C18E]">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
       * PRINT DOCUMENT
       * ===================================================== */}

      {activeReportDesign?.printComponent && (
        <div
          data-report-print-wrapper
          style={{
            position:
              'fixed',

            top:
              '-10000px',

            left:
              '0',

            width:
              A4_WIDTH_PX,

            zIndex:
              -9999,

            pointerEvents:
              'none',

            /*
             * IMPORTANT:
             *
             * Do NOT use:
             *
             * display: none
             * visibility: hidden
             * opacity: 0
             *
             * because html2canvas must be able to render
             * the print component.
             */
            visibility:
              'visible',
          }}
          aria-hidden="true"
        >
          {(() => {
            const PrintComponent =
              activeReportDesign.printComponent;

            return (
              <PrintComponent
                ref={printRef}
                data={formData}
                theme={
                  currentTheme
                }
                logoSrc={
                  logoSrc
                }
              />
            );
          })()}
        </div>
      )}

      {/* =====================================================
       * 4. EXPORT CONTROLS
       * ===================================================== */}

      <section
        className="mx-auto justify-center mt-6 w-full max-w-[950px]"
        data-pdf-ignore
      >
        <div className="rounded-[24px] border border-[#29332D] bg-[#171E1A] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)] sm:p-5">
          <div className="mb-4">
            <p className="text-xs font-black text-[#D3D9D4]">
              حفظ وإخراج التقرير
            </p>

            <p className="mt-1 text-[10px] text-[#68736C]">
              اطبع التقرير مباشرة أو حمّله كملف PDF أو صورة.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
            {/* PRINT */}

            <button
              type="button"
              onClick={
                handlePrint
              }
              disabled={
                isBusy
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#3A463F] bg-[#202923] px-6 py-2.5 text-sm font-bold text-[#DCE3DD] transition-all hover:border-[#B39A63]/50 hover:bg-[#29352E] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {downloadingType ===
              'print' ? (
                <>
                  <SpinnerIcon />

                  <span>
                    جاري التجهيز...
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

            {/* PDF */}

            <button
              type="button"
              onClick={
                handleDownloadPDF
              }
              disabled={
                isBusy
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#3A463F] bg-[#202923] px-6 py-2.5 text-sm font-bold text-[#DCE3DD] transition-all hover:border-[#B39A63]/50 hover:bg-[#29352E] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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

            {/* PNG */}

            <button
              type="button"
              onClick={
                handleDownloadPNG
              }
              disabled={
                isBusy
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#3A463F] bg-[#202923] px-6 py-2.5 text-sm font-bold text-[#DCE3DD] transition-all hover:border-[#B39A63]/50 hover:bg-[#29352E] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
      </section>
    </div>
  );
}
import React, { useState, useRef } from 'react';

import type {
  ReportFormData,
  MockReport,
} from '../../../types/ReportsTypes';

import logoImage from '../../../assets/MinistrLogo.png';
import { useUser } from '../../../context/Context';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {
  getTodayHijri,
  stripWhiteBackground,
} from '../../../misc/miscOne';

import {
  PRESET_THEMES,
  type Theme,
} from '../../../misc/Theme';

import {
  A4_WIDTH_MM,
  A4_HEIGHT_MM,
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
} from '../../../misc/PdfConfig';

import {
  ReportEditForm,
} from '../Image-reports/Image-styles/types/ReportEditForm.tsx';

import { ReportPrintDocument } from './ReportPrint.tsx';

import {
  PrinterIcon,
  PdfDownloadIcon,
  ImageDownloadIcon,
  SpinnerIcon,
} from '../../../Icons/Icons';


export type { Theme };
export { PRESET_THEMES };


/* =========================================================
 * REPORT DESIGN SYSTEM
 * ========================================================= */

type ReportMode =
  | 'with-image'
  | 'no-image';


type ReportDesign = {
  id: string;

  name: string;

  mode: ReportMode;

  component: React.ComponentType<any> | null;

  description: string;

  preview?: React.ReactNode;
};


/* =========================================================
 * DESIGN PREVIEWS
 * ========================================================= */

/*
 * المعاينة الخاصة بالتصميم الأخضر الكلاسيك.
 *
 * هذا هو التصميم الافتراضي والحالي الوحيد.
 */

const GreenClassicPreview = () => (
  <div className="absolute inset-0 flex items-center justify-center">

    <div className="relative h-[155px] w-[110px] overflow-hidden rounded-[4px] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)]">

      <div className="h-4 bg-[#315B56]" />

      <div className="px-3 pt-3">

        <div className="mx-auto h-2 w-[65%] rounded-full bg-[#315B56]/80" />

        <div className="mt-3 grid grid-cols-2 gap-1.5">

          <div className="h-5 rounded bg-[#F0F2F1]" />
          <div className="h-5 rounded bg-[#F0F2F1]" />
          <div className="h-5 rounded bg-[#F0F2F1]" />
          <div className="h-5 rounded bg-[#F0F2F1]" />

        </div>

        <div className="mt-4 h-1.5 rounded-full bg-[#E5E8E6]" />
        <div className="mt-1.5 h-1.5 rounded-full bg-[#E5E8E6]" />
        <div className="mt-1.5 h-1.5 w-[75%] rounded-full bg-[#E5E8E6]" />

        <div className="mt-4 grid grid-cols-2 gap-1.5">

          <div className="h-12 rounded bg-[#F0F2F1]" />
          <div className="h-12 rounded bg-[#F0F2F1]" />

        </div>

      </div>

    </div>

  </div>
);


/*
 * =========================================================
 * DESIGNS FUTURE
 * =========================================================
 *
 * لما تضيف تصميمات مستقبلًا، تقدر ترجع هذه الـ previews
 * أو تضيف previews جديدة هنا.
 *
 * مثال:
 *
 * const GoldenRoyalPreview = () => (...);
 *
 * const NoImagePreview = () => (...);
 *
 */


/* =========================================================
 * REPORT DESIGNS REGISTRY
 * ========================================================= */

/*
 * حاليًا يوجد تصميم واحد فقط:
 *
 * green-classic
 *
 * وهو التصميم الافتراضي للتقرير.
 *
 * ---------------------------------------------------------
 *
 * لاحقًا لإضافة تصميم جديد:
 *
 * 1. استورد ملف TSX الخاص بالتصميم.
 *
 * 2. أضف object جديد هنا.
 *
 * 3. حدد mode:
 *
 *    with-image
 *    أو
 *    no-image
 *
 * 4. اربط component.
 *
 * مثال مستقبلي:
 *
 * {
 *   id: 'golden-royal',
 *   name: 'ذهبي ملكي',
 *   mode: 'with-image',
 *   component: ModernReportEditForm,
 *   description: '...',
 *   preview: <GoldenRoyalPreview />,
 * }
 *
 * =========================================================
 */

const REPORT_DESIGNS: ReportDesign[] = [

  {
    id: 'green-classic',

    name: 'أخضر كلاسيك',

    mode: 'with-image',

    component: ReportEditForm,

    description:
      'التصميم الكلاسيكي الحالي للتقارير التي تحتوي على صور الشواهد.',

    preview:
      <GreenClassicPreview />,
  },

  /*
   * =======================================================
   * DESIGNS FUTURE
   * =======================================================
   *
   * أضف التصميمات الجديدة هنا لاحقًا.
   *
   * مثال:
   *
   * {
   *   id: 'golden-royal',
   *   name: 'ذهبي ملكي',
   *   mode: 'with-image',
   *   component: ModernReportEditForm,
   *   description: '...',
   *   preview: <GoldenRoyalPreview />,
   * }
   *
   * =======================================================
   */

];


/* =========================================================
 * DEFAULTS
 * ========================================================= */

/*
 * نوع التقرير الداخلي حاليًا ثابت على with-image.
 *
 * لن يظهر للمستخدم حاليًا لأن اختيار نوع التقرير
 * تم تعليقه من الواجهة.
 *
 * لاحقًا يمكن إعادة واجهة الاختيار بسهولة.
 */

const DEFAULT_REPORT_MODE: ReportMode =
  'with-image';


/*
 * التصميم الافتراضي:
 *
 * أخضر كلاسيك
 */

const DEFAULT_REPORT_DESIGN_ID: string =
  'green-classic';


/* =========================================================
 * TYPES
 * ========================================================= */

export interface ReportProps {

  id?: string;

  initialData?: Partial<ReportFormData>;

  logoUrl?: string;

  initialThemeId?: string;

  onChange?: (
    data: ReportFormData
  ) => void;

  onSubmit?: (
    data: ReportFormData
  ) => void;
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


  const report =
    reports.find(
      (item) =>
        String(item.id) === id
    );


  const printRef =
    useRef<HTMLDivElement>(null);


  const [downloadingType, setDownloadingType] =
    useState<
      'pdf' | 'png' | 'print' | null
    >(null);


  const [toast, setToast] =
    useState<ToastState | null>(null);


  /* =========================================================
   * REPORT SELECTION
   * ========================================================= */

  /*
   * نوع التقرير حاليًا ثابت داخليًا على:
   *
   * with-image
   *
   * تم إخفاء اختيار نوع التقرير من الواجهة مؤقتًا.
   *
   * =======================================================
   * لاحقًا يمكن إعادة UI الخاص بـ:
   *
   * تقرير بصورة
   * تقرير بدون صورة
   *
   * =======================================================
   */

  const [reportMode] =
    useState<ReportMode>(
      DEFAULT_REPORT_MODE
    );


  /*
   * التصميم الحالي:
   *
   * green-classic
   */

  const [reportDesignId] =
    useState<string>(
      DEFAULT_REPORT_DESIGN_ID
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
        current?.message === message
          ? null
          : current
      );

    }, 4500);
  };


  /* =========================================================
   * DEFAULT FORM DATA
   * ========================================================= */

  const DEFAULT_FORM_DATA: ReportFormData = {

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

    evidences:
      [null, null, null, null],
  };


  const [formData, setFormData] =
    useState<ReportFormData>(() => ({

      ...DEFAULT_FORM_DATA,

      ...(report?.formData ??
        initialData ??
        {}),

      evidences:
        report?.formData?.evidences ??
        initialData?.evidences ??
        DEFAULT_FORM_DATA.evidences,

    }));


  const [processedLogoSrc, setProcessedLogoSrc] =
    useState<string | null>(null);


  /* =========================================================
   * LOGO
   * ========================================================= */

  React.useEffect(() => {

    const sourceUrl =
      logoUrl || logoImage;


    const img =
      new Image();


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

        setProcessedLogoSrc(null);
      }
    };


    img.onerror = () => {
      setProcessedLogoSrc(null);
    };


    img.src =
      sourceUrl;

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
          report.formData.evidences ??
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

  }, [report, initialData]);


  /* =========================================================
   * THEME
   * ========================================================= */

  const [currentTheme, setCurrentTheme] =
    useState<Theme>(() =>

      PRESET_THEMES.find(
        (theme) =>
          theme.id === initialThemeId
      ) ||
      PRESET_THEMES[0]

    );


  const [errors, setErrors] =
    useState<Record<string, string>>({});


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


    const newReport: MockReport = {

      id:
        Date.now(),

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

      onChange?.(
        updated
      );

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

      [name]:
        value,

    }));


    if (errors[name]) {

      setErrors((prev) => ({

        ...prev,

        [name]:
          '',

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


    if (!file)
      return;


    if (!file.type.startsWith('image/')) {

      showToast(
        'الرجاء اختيار ملف صورة صالح فقط.',
        'warning'
      );

      e.target.value =
        '';

      return;
    }


    const imageUrl =
      URL.createObjectURL(file);


    updateFormData((prev) => {

      const newEvidences =
        [...prev.evidences];


      const oldImage =
        newEvidences[index];


      if (
        oldImage &&
        oldImage.startsWith('blob:')
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


    e.target.value =
      '';
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

      URL.revokeObjectURL(
        oldImage
      );
    }


    updateFormData((prev) => {

      const newEvidences =
        [...prev.evidences];


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
      Record<string, string> =
      {};


    /*
     * بما أن النوع الحالي داخليًا with-image،
     * فالتقرير الأخضر يحتاج صورة شاهد واحدة على الأقل.
     */

    if (
      reportMode ===
      'with-image'
    ) {

      const hasEvidence =
        formData.evidences.some(
          (src) => Boolean(src)
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

        } catch {}
      }
  };


  const waitForImages =
    async (
      element: HTMLElement
    ) => {

      const images =
        Array.from(
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


  const downloadBlob = (
    blob: Blob,
    fileName: string
  ) => {

    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement('a');


    link.href =
      url;

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
      (resolve, reject) => {

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


  const captureReportCanvas =
    async (
      element: HTMLElement,
      scale: number
    ) => {

      await waitForDocumentFonts();

      await waitForImages(
        element
      );


      return html2canvas(
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

          x:
            0,

          y:
            0,

          scrollY:
            0,

          scrollX:
            0,

          ignoreElements:
            (el) =>
              el.hasAttribute(
                'data-pdf-ignore'
              ) ||
              el.classList.contains(
                'export-ignore'
              ),

        }
      );
  };


  /* =========================================================
   * FILE NAME
   * ========================================================= */

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

      if (!printRef.current) {

        throw new Error(
          'Print document element not found.'
        );
      }


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
        (
          pageWidth -
          imgWidth
        ) / 2;


      const y =
        (
          pageHeight -
          imgHeight
        ) / 2;


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

      if (!validateForm())
        return;


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

      if (!validateForm())
        return;


      if (!printRef.current)
        return;


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

      if (!validateForm())
        return;


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
   * ACTIVE REPORT DESIGN
   * ========================================================= */

  const activeReportDesign =
    REPORT_DESIGNS.find(
      (design) =>
        design.id ===
        reportDesignId
    ) ??
    REPORT_DESIGNS[0];


  /* =========================================================
   * REPORT EDITOR
   * ========================================================= */

  const renderReportEditor =
    () => {

      if (!activeReportDesign) {

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
              {activeReportDesign.name}
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-[#89938C]">
              {activeReportDesign.description}
            </p>

          </div>
        );
      }


      const ReportEditor =
        activeReportDesign.component;


      const sharedProps = {

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

            content:
              'الرجاء استخدام زر "طباعة" أو "تحميل PDF" داخل الصفحة لضمان توافق المقاس مع ورقة A4 على جميع الأجهزة.';

            display:
              block;

            padding:
              40px;

            font-size:
              18px;

            text-align:
              center;

            direction:
              rtl;
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
              toast.type === 'error'
                ? 'bg-red-500'
                : toast.type === 'warning'
                ? 'bg-amber-500'
                : toast.type === 'success'
                ? 'bg-emerald-500'
                : 'bg-blue-500'
            }`}
          />

          <span className="text-sm font-semibold text-[#E5E9E5]">
            {toast.message}
          </span>

          <button
            type="button"
            onClick={() =>
              setToast(null)
            }
            className="mr-2 text-xs text-[#7F8A82] transition-colors hover:text-[#E5E9E5]"
          >
            ✕
          </button>

        </div>

      )}


      {/* =====================================================
       * 1. REPORT
       *
       * الأخضر كلاسيك يظهر مباشرة.
       * ===================================================== */}

      <section className="mx-auto w-full max-w-[1100px]">

        {renderReportEditor()}

      </section>


      {/* =====================================================
       * 2. CUSTOMIZATION
       * ===================================================== */}

      <section
        className="mx-auto mt-8 w-full max-w-[950px]"
        data-pdf-ignore
      >

        <div className="overflow-hidden rounded-[28px] border border-[#29332D] bg-[#171E1A] shadow-[0_18px_50px_rgba(0,0,0,0.25)]">


          {/* =================================================
           * CUSTOMIZATION HEADER
           * ================================================= */}

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
                  خصص ألوان التقرير واختر الثيم المناسب
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
           * REPORT TYPE
           *
           * تم تعطيل هذه الخانة مؤقتًا.
           *
           * نحتفظ بها في الكود حتى نرجعها لاحقًا بسهولة.
           * ================================================= */}

          {/*
          <div className="px-5 py-6 sm:px-6">

            <div className="mb-4">

              <p className="text-xs font-black text-[#D3D9D4]">
                نوع التقرير
              </p>

              <p className="mt-1 text-[10px] leading-5 text-[#68736C]">
                اختر ما إذا كان التقرير يعتمد على صور الشواهد
                أو على المحتوى النصي فقط.
              </p>

            </div>


            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">


              <button
                type="button"
                onClick={() =>
                  handleReportModeChange(
                    'with-image'
                  )
                }
                className="..."
              >

                تقرير بصورة

              </button>


              <button
                type="button"
                onClick={() =>
                  handleReportModeChange(
                    'no-image'
                  )
                }
                className="..."
              >

                تقرير بدون صورة

              </button>

            </div>

          </div>
          */}


          {/* =================================================
           * DESIGN SECTION
           *
           * حاليًا لا نحتاج اختيار التصميم لأن الأخضر
           * هو التصميم الافتراضي الوحيد.
           *
           * تم تعطيل خانة "شكل التقرير" مؤقتًا.
           *
           * لاحقًا عند إضافة أكثر من تصميم يمكن إرجاعها.
           * ================================================= */}

          {/*
          <div className="border-t border-[#29332D] px-5 py-6 sm:px-6">

            <div className="mb-4 flex items-end justify-between gap-4">

              <div>

                <p className="text-xs font-black text-[#D3D9D4]">
                  شكل التقرير
                </p>

                <p className="mt-1 text-[10px] text-[#68736C]">
                  اختر التصميم الذي سيظهر به التقرير.
                </p>

              </div>

            </div>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {designsForCurrentMode.map(
                (design) => {

                  // design card

                }
              )}

            </div>

          </div>
          */}


          {/* =================================================
           * THEME
           * ================================================= */}

          <div className="border-t border-[#29332D] px-5 py-6 sm:px-6">

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
                (theme) => (

                  <button
                    key={theme.id}
                    type="button"
                    onClick={() =>
                      setCurrentTheme(
                        theme
                      )
                    }
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition-all ${
                      currentTheme.id ===
                      theme.id

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
                            key={index}
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
                      {theme.name}
                    </span>

                  </button>

                )
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
       * PRINT DOCUMENT
       * ===================================================== */}

      <div
        style={{

          position:
            'fixed',

          top:
            0,

          left:
            0,

          width:
            A4_WIDTH_PX,

          zIndex:
            -9999,

          opacity:
            0,

          pointerEvents:
            'none',

        }}

        aria-hidden="true"
      >

        <ReportPrintDocument

          ref={printRef}

          data={
            formData
          }

          theme={
            currentTheme
          }

          logoSrc={
            logoSrc
          }

        />

      </div>


      {/* =====================================================
       * 3. EXPORT CONTROLS
       * ===================================================== */}

      <section
        className="mx-auto mt-6 w-full max-w-[950px]"
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


          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">


            {/* =================================================
             * PRINT
             * ================================================= */}

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


            {/* =================================================
             * PDF
             * ================================================= */}

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


            {/* =================================================
             * PNG
             * ================================================= */}

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
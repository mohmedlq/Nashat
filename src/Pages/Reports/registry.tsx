import React from 'react';

/* =========================================================
 * استورد هنا كل مكوّنات كل تصميم: العرض + الطباعة.
 * كل تصميم جديد = سطرين استيراد هنا فقط.
 * ========================================================= */

import { CyanGalleryStyle } from '../../Components/Reports/Templates/with-Image/CyanGalleryStyle.tsx';
import { CyanGalleryStylePrint } from '../../Components/Reports/Print_Templates/with-Image/CyanGalleryStylePrint.tsx';

import { ModernReportEditForm } from '../../Components/Reports/Templates/with-Image/ModernReportEditForm.tsx';
import { ModernStylePrint} from "../../Components/Reports/Print_Templates/with-Image/Modren.tsx" 


import { FormalReport } from '../../Components/Reports/Templates/no-Image/Formal.tsx';
import { FormalReportPrint } from '../../Components/Reports/Print_Templates/no-Image/FormalReportPrint.tsx';

import {ClasicStyle} from "../../Components/Reports/Templates/with-Image/Classic.tsx"
import { ClasicStylePrint } from '../../Components/Reports/Print_Templates/with-Image/Classic.tsx';

//import { ModernReportprint } from '../../Components/Reports/Print/ReportPrint.tsx';
/*
 * مثال لما تضيف تصميم ثاني مستقبلًا:
 *
 * import { GoldenRoyalEditForm } from '../../Components/Reports/GoldenRoyal/GoldenRoyalEditForm';
 * import { GoldenRoyalPrintDocument } from '../../Components/Reports/GoldenRoyal/GoldenRoyalPrintDocument';
 */

/* =========================================================
 * TYPES
 * ========================================================= */

export type ReportMode = 'with-image' | 'no-image';

export type ReportDesign = {
  id: string;
  name: string;
  mode: ReportMode;

  /** مكوّن شاشة العرض/التعديل */
  component: React.ComponentType<any> | null;

  /**
   * مكوّن الطباعة — إجباري لكل تصميم (forwardRef).
   * لو نسيت تحطه، TypeScript يرفض الملف يبني — هذا مقصود،
   * عشان ما يصير "تصميم يعرض صح لكن يطبع تصميم غلط".
   */
  printComponent: React.ForwardRefExoticComponent<any> | null;

  description: string;
  preview?: React.ReactNode;
};

/* =========================================================
 * PREVIEWS (المصغّرات اللي تظهر بواجهة اختيار التصميم)
 * كل تصميم جديد يحتاج preview صغير هنا، أو تسيبه بدون preview.
 * ========================================================= */

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
 * مثال preview لتصميم جديد مستقبلًا:
 *
 * const GoldenRoyalPreview = () => ( ... );
 */

/* =========================================================
 * ★ السجل الرئيسي ★
 * هذي القائمة الوحيدة اللي تحتاج تعدّلها كل ما ضفت تقرير جديد.
 * ========================================================= */

export const REPORT_DESIGNS: ReportDesign[] = [
  {
    id: 'green-classic',
    name: 'أخضر كلاسيك',
    mode: 'with-image',
    component: CyanGalleryStyle,
    printComponent: CyanGalleryStylePrint,
    description: 'التصميم الكلاسيكي الحالي للتقارير التي تحتوي على صور الشواهد.',
    preview: <GreenClassicPreview />,
  },
{
    id: 'Royal',
    name: 'حديث',
    mode: 'with-image',
    component: ModernReportEditForm,
    printComponent: ModernStylePrint,
    description: 'التصميم الكلاسيكي الحالي للتقارير التي تحتوي على صور الشواهد.',
    preview: <GreenClassicPreview />,
  },
  {
    id: 'perfect',
    name: 'التقرير الاساسي',
    mode: 'with-image',
    component: ClasicStyle,
    printComponent: ClasicStylePrint,
    description: 'التصميم الكلاسيكي الحالي للتقارير التي تحتوي على صور الشواهد.',
    preview: <GreenClassicPreview />,
  },
{
    id: 'Formal',
    name: 'رسمي',
    mode: 'no-image',
    component: FormalReport,
    printComponent: FormalReportPrint,
    description: 'التصميم الرسمي بدون صور .',
    preview: <GreenClassicPreview />,
  },
  /*
   * =======================================================
   * أضف أي تصميم جديد هنا — نسخة واحدة بس من هذا الكائن:
   *
   * {
   *   id: 'golden-royal',
   *   name: 'ذهبي ملكي',
   *   mode: 'with-image',
   *   component: GoldenRoyalEditForm,
   *   printComponent: GoldenRoyalPrintDocument,   // 👈 لا تنساه أبدًا
   *   description: '...',
   *   preview: <GoldenRoyalPreview />,
   * }
   *
   * بمجرد ما تضيفه هنا، يظهر تلقائيًا في Report.tsx —
   * بالعرض وبالطباعة معًا — بدون أي تعديل ثاني بأي ملف آخر.
   * =======================================================
   */
];

/* =========================================================
 * DEFAULTS + HELPERS
 * ========================================================= */

export const DEFAULT_REPORT_MODE: ReportMode = 'with-image';
export const DEFAULT_REPORT_DESIGN_ID: string = 'green-classic';

export function getReportDesignById(id: string): ReportDesign {
  return REPORT_DESIGNS.find((design) => design.id === id) ?? REPORT_DESIGNS[0];
}

export function getReportDesignsByMode(mode: ReportMode): ReportDesign[] {
  return REPORT_DESIGNS.filter((design) => design.mode === mode);
}
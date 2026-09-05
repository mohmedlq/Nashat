import React from 'react';
import type { ReportFormData } from '../../../../types/ReportsTypes';
import type { Theme } from '../../../../misc/Theme';
import { MinistryLogo } from '../../../../Icons/Icons';
import { PrintField } from '../../Print/PrintField';
import { PrintHeaderText } from '../../Print/Printheadertext';
import { PrintEvidenceStack } from '../../Print/PrintEvidenceGrid';

export type CyanGalleryPrintProps = {
  data: ReportFormData;
  theme: Theme;
  logoSrc?: string;
};

/* أيقونات مطابقة تمامًا لأيقونات ملف العرض CyanGalleryStyle.tsx */

function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

/**
 * ميزانية الارتفاع (297mm إجمالي):
 * هيدر 34mm + بانر العنوان ~22mm (مع الهوامش) + فوتر 14mm
 * = المحتوى الرئيسي يأخذ الباقي عبر flex-1، بدون absolute ولا sm:،
 * عشان يطابق تمامًا بين الجوال والكمبيوتر (نفس الدرس من التصميم الكلاسيكي).
 */
export const CyanGalleryStylePrint = React.forwardRef<HTMLDivElement, CyanGalleryPrintProps>(
  ({ data, theme, logoSrc }, ref) => {
    return (
      <div
        ref={ref}
        className="flex w-[210mm] h-[297mm] flex-col overflow-hidden bg-white font-[Arial,sans-serif] text-[#173f56] shadow-none m-0"
      >
        {/* ================= HEADER ================= */}
        <header
          className="flex h-[34mm] shrink-0 flex-row items-center justify-between gap-3 border-b-2 px-8"
          style={{ borderColor: theme.primaryBorder }}
        >
          <div className="w-1/3 text-right" style={{ color: theme.primaryBorder }}>
            <PrintHeaderText value={data.schoolName} className="!text-inherit text-right text-[17px] font-bold leading-6" />
          </div>

          <div className="flex flex-col items-center gap-1">
            <MinistryLogo src={logoSrc} />
            <span className="text-[13px] font-bold" style={{ color: theme.labelColor }}>
              وزارة التعليم
            </span>
          </div>

          <div className="w-1/3 text-left text-[12px] font-bold leading-6 text-[#4b5563]">
            <p>المملكة العربية السعودية</p>
            <p>وزارة التعليم</p>
            <PrintHeaderText value={data.region} className="text-left" />
          </div>
        </header>

        {/* ================= TITLE BANNER ================= */}
        <div className="shrink-0 px-8 pt-4">
          <div
            className="rounded-xl py-4 text-center text-[22px] font-bold text-white shadow-sm"
            style={{ background: theme.headerGradient }}
          >
            <PrintHeaderText value={data.reportTitle} className="!text-inherit text-center text-white" />
          </div>
        </div>

        {/* ================= CONTENT: TWO COLUMNS ================= */}
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-5 px-8 py-5">
          {/* -------- LEFT: PHOTOS -------- */}
          <PrintEvidenceStack evidences={data.evidences} theme={theme} />

          {/* -------- RIGHT: INFO -------- */}
          <div className="flex min-h-0 flex-col gap-3">
            <div className="grid shrink-0 grid-cols-2 gap-3">
              <PrintField
                theme={theme}
                variant="card"
                icon={<UsersIcon />}
                value={data.beneficiaries}
                label="عدد المستفيدين"
                align="center"
              />
              <PrintField
                theme={theme}
                variant="card"
                icon={<CalendarIcon />}
                value={data.date}
                label="تاريخ التنفيذ"
                align="center"
              />
            </div>

            <div
              className="shrink-0 rounded-xl p-3 text-center font-bold text-white"
              style={{ backgroundColor: theme.darkAccent }}
            >
              <span className="ml-1 opacity-80">المنفذ: </span>
              <PrintHeaderText value={data.implementer} className="!text-inherit inline w-auto text-white" />
            </div>

            <div
              className="shrink-0 rounded-xl p-3 text-center font-bold text-white"
              style={{ backgroundColor: theme.darkAccent }}
            >
              <span className="ml-1 opacity-80">مكان التنفيذ: </span>
              <PrintHeaderText value={data.location} className="!text-inherit inline w-auto text-white" />
            </div>

            <div
              className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden rounded-2xl border-2 border-dashed p-4"
              style={{ borderColor: theme.primaryBorder }}
            >
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className="inline-block shrink-0 rounded-full px-4 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: theme.darkAccent }}
                >
                  المستهدفون
                </span>
                <PrintHeaderText value={data.target} className="flex-1 text-right text-[14px] font-bold" />
              </div>

              <div className="min-h-0 flex-1 overflow-hidden">
                <span
                  className="mb-2 inline-block rounded-full px-4 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: theme.darkAccent }}
                >
                  الأهداف
                </span>
                <PrintField
                  theme={theme}
                  value={data.objectives}
                  label=""
                  type="textarea"
                  align="right"
                  className="!border-0 !bg-transparent !p-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <footer
          className="absolute top-bottom left-0 w-full shrink-0 items-center justify-between px-8 text-white"
          style={{ backgroundColor: theme.darkAccent }}
        >
        </footer>
      </div>
    );
  }
);

CyanGalleryStylePrint.displayName = 'CyanGalleryStylePrint';
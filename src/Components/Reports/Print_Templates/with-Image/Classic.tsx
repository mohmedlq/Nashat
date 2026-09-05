import React from 'react';

import type { ReportFormData } from '../../../../types/ReportsTypes';
import type { Theme } from '../../../../misc/Theme';

import { MinistryLogo } from '../../../../Icons/Icons';
import { PrintField } from '../../Print/PrintField';
import { PrintHeaderText } from '../../Print/Printheadertext';
import { PrintEvidenceStack } from '../../Print/PrintEvidenceGrid';

export type ReportPrintDocumentProps = {
  data: ReportFormData;
  theme: Theme;
  logoSrc?: string;
};

export const ClasicStylePrint = React.forwardRef<
  HTMLDivElement,
  ReportPrintDocumentProps
>(({ data, theme, logoSrc }, ref) => {
  return (
    <div
      ref={ref}
      /* تثبيت أبعاد ورقة A4 بالضبط وحظر التمدد الزائد */
      className="
        relative
        m-0
        flex
        h-[297mm]
        w-[210mm]
        min-h-0
        flex-col
        overflow-hidden
        bg-white
        font-[Arial,sans-serif]
        text-[#173f56]
        shadow-none
      "
    >
      {/* ================= 1. HEADER (ABSOLUTE) ================= */}
      <header
        className="
          absolute
          left-0
          top-0
          z-0
          min-h-[166px]
          w-full
          overflow-visible
          rounded-b-[18px]
          pb-10
        "
        style={{ background: theme.headerGradient }}
      >
        <div
          className="
            mx-auto
            flex
            h-full
            max-w-[800px]
            flex-row
            items-center
            justify-center
            gap-5
            px-2
            pb-4
            pt-6
            text-white
          "
        >
          <div className="flex items-center gap-4 border-r-[4px] border-white pr-5">
            <div className="text-right text-[21px] font-bold leading-[1.55]">
              وزارة التعليم
              <br />

              <span className="text-[14px] font-normal tracking-wide">
                Ministry of Education
              </span>
            </div>

            <div className="flex items-center justify-center pr-2">
              <MinistryLogo src={logoSrc} />
            </div>
          </div>

          <div className="w-auto text-right text-[21px] font-bold leading-[1.7]">
            الإدارة العامة للتعليم
            <br />

            <PrintHeaderText
              value={data.region}
              className="
                w-full
                min-w-[180px]
                bg-transparent
                text-right
                font-bold
                text-white
                outline-none
              "
            />
          </div>
        </div>
      </header>

      {/* ================= 2. MAIN CONTENT ================= */}
      <main
        className="
          z-10
          flex
          min-h-0
          w-full
          flex-1
          flex-col
          overflow-hidden
          pt-[180px]
        "
      >
        {/* ================= SCHOOL + TITLE ================= */}
        <div
          className="
            relative
            z-10
            mx-auto
            mb-4
            w-[85%]
            shrink-0
          "
        >
          <div
            className="
              mb-2
              rounded-[12px]
              px-6
              py-3
              pb-4
              shadow-sm
            "
            style={{
              backgroundColor: theme.darkAccent,
            }}
          >
            <PrintHeaderText
              value={data.schoolName}
              className="
                w-full
                min-w-0
                bg-transparent
                text-center
                text-[21px]
                font-bold
                text-white
                outline-none
              "
            />
          </div>

          <div
            className="border-b-[7px] px-6 py-3"
            style={{
              backgroundColor: theme.darkAccent,
              borderColor: theme.titleBorder,
            }}
          >
            <PrintHeaderText
              value={data.reportTitle}
              className="
                w-full
                min-w-0
                bg-transparent
                text-center
                text-[23px]
                font-bold
                text-white
                outline-none
              "
            />
          </div>
        </div>

        {/* ================= 3. FIELDS & EVIDENCE ================= */}
        <section
          className="
            flex
            min-h-0
            w-full
            flex-1
            flex-col
            gap-4
            px-[12mm]
            pb-4
          "
        >
          {/* ================= FIELDS ================= */}
          <div
            className="
              grid
              shrink-0
              grid-cols-[1.3fr_1fr]
              gap-x-4
              gap-y-4
            "
          >
            <PrintField
              theme={theme}
              value={data.implementer}
              label="المنفذ:"
              className="
                col-start-1
                row-start-1
                min-h-0
              "
            />

            <PrintField
              theme={theme}
              value={data.location}
              label="مكان التنفيذ:"
              className="
                col-start-2
                row-start-1
                min-h-0
              "
            />

            <PrintField
              theme={theme}
              value={data.target}
              label="المستهدفون:"
              className="
                col-start-1
                row-start-2
                min-h-0
              "
            />

            <PrintField
              theme={theme}
              value={data.beneficiaries}
              label="عدد المستفيدين:"
              className="
                col-start-1
                row-start-3
                min-h-0
              "
            />

            <PrintField
              theme={theme}
              value={data.date}
              label="تاريخ التنفيذ:"
              className="
                col-start-1
                row-start-4
                min-h-0
              "
            />

            {/* ================= OBJECTIVES ================= */}
            <PrintField
              theme={theme}
              value={data.objectives}
              label="الأهداف:"
              type="textarea"
              align="right"
              className="
                col-start-2
                row-start-2
                row-span-3
                min-h-0
              "
            />
          </div>

          {/* ================= EVIDENCE ================= */}
          <div
            className="
              min-h-0
              w-full
              flex-1
              overflow-hidden
            "
          >
            <PrintEvidenceStack
              evidences={data.evidences}
              theme={theme}
            />
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer
        className="
          absolute
          bottom-0
          left-0
          z-20
          h-[40px]
          w-full
        "
        style={{
          backgroundColor: theme.darkAccent,
        }}
      />
    </div>
  );
});

ClasicStylePrint.displayName = 'ReportPrintDocument';
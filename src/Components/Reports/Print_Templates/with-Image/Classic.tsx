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

export const ClasicStylePrint = React.forwardRef<HTMLDivElement, ReportPrintDocumentProps>(
  ({ data, theme, logoSrc }, ref) => {
    return (
      <div
        ref={ref}
        /* تثبيت أبعاد ورقة A4 بالضبط وحظر التمدد الزائد */
        className="w-[210mm] h-[297mm] flex flex-col bg-white font-[Arial,sans-serif] text-[#173f56] shadow-none m-0 relative overflow-hidden"
      >
        {/* ================= 1. HEADER (ABSOLUTE) ================= */}
        <header
          className="absolute top-0 left-0 w-full min-h-[166px] overflow-visible rounded-b-[18px] pb-10 z-0"
          style={{ background: theme.headerGradient }}
        >
          <div className="mx-auto flex h-full max-w-[800px] flex-row items-center justify-center gap-5 px-2 pb-4 pt-6 text-white">
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
                className="w-full min-w-[180px] bg-transparent text-right font-bold text-white outline-none"
              />
            </div>
          </div>
        </header>

        {/* ================= 2. MAIN CONTENT ================= */}
        <main className="flex-1 w-full flex flex-col pt-[180px] z-10 min-h-0 overflow-hidden">
          <div className="relative z-10 mx-auto w-[85%] mb-4 shrink-0">
            <div
              className="pb-4 mb-2 rounded-[12px] px-6 py-3 shadow-sm"
              style={{ backgroundColor: theme.darkAccent }}
            >
              <PrintHeaderText
                value={data.schoolName}
                className="w-full min-w-0 bg-transparent text-center text-[21px] font-bold text-white outline-none"
              />
            </div>

            <div
              className="border-b-[7px] px-6 py-3"
              style={{ backgroundColor: theme.darkAccent, borderColor: theme.titleBorder }}
            >
              <PrintHeaderText
                value={data.reportTitle}
                className="w-full min-w-0 bg-transparent text-center text-[23px] font-bold text-white outline-none"
              />
            </div>
          </div>

          {/* ================= 3. FIELDS & EVIDENCE ================= */}
          <section className="w-full px-[12mm] pb-4 flex-1 flex flex-col min-h-0 gap-4">
            <div className="grid grid-cols-[1.3fr_1fr] gap-x-4 gap-y-4 shrink-0">
              <PrintField theme={theme} value={data.implementer} label="المنفذ:" className="col-start-1 row-start-1" />
              <PrintField theme={theme} value={data.location} label="مكان التنفيذ:" className="col-start-2 row-start-1" />
              <PrintField theme={theme} value={data.target} label="المستهدفون:" className="col-start-1 row-start-2" />
              <PrintField
                theme={theme}
                value={data.beneficiaries}
                label="عدد المستفيدين:"
                className="col-start-1 row-start-3"
              />
              <PrintField theme={theme} value={data.date} label="تاريخ التنفيذ:" className="col-start-1 row-start-4" />
              <PrintField
                theme={theme}
                value={data.objectives}
                label="الأهداف:"
                type="textarea"
                align="right"
                className="min-h-[200px] col-start-2 row-start-2 row-span-3"
              />
            </div>

            {/* الحاوية المغلفة للصور تأخذ المساحة المتبقية بالضبط */}
            <div className="flex-1 min-h-0 w-full">
              <PrintEvidenceStack evidences={data.evidences} theme={theme} />
            </div>
          </section>
        </main>

        {/* ================= FOOTER ================= */}
        <footer
          className="absolute top-bottom left-0 w-full h-[40px] shrink-0 z-10"
          style={{ backgroundColor: theme.darkAccent }}
        />
      </div>
    );
  }
);

ClasicStylePrint.displayName = 'ReportPrintDocument';
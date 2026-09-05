import React from 'react';

import type { ReportFormData } from '../../../../types/ReportsTypes';
import type { Theme } from '../../../../misc/Theme';

import { MinistryLogo } from '../../../../Icons/Icons';
import { PrintField } from '../../Print/PrintField';
import { PrintHeaderText } from '../../Print/Printheadertext';
import { PrintEvidenceStack } from '../../Print/PrintEvidenceGrid';

export type ModernReportPrintDocumentProps = {
  data: ReportFormData;
  theme: Theme;
  logoSrc?: string;
};

export const ModernStylePrint = React.forwardRef<
  HTMLDivElement,
  ModernReportPrintDocumentProps
>(({ data, theme, logoSrc }, ref) => {
  return (
    <div
      ref={ref}
      dir="rtl"
      className="
        relative
        mx-auto
        flex
        h-[297mm]
        w-[210mm]
        flex-col
        bg-white
        p-[10mm]
        shadow-2xl
        print:m-0
        print:p-[10mm]
        print:shadow-none
      "
      style={{
        fontFamily: 'Arial, Tahoma, sans-serif',
        color: theme.darkAccent,
      }}
    >
      {/* =====================================================
          OUTER FORMAL FRAME
      ===================================================== */}
      <div
        className="
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          border-[2px]
          p-[4px]
        "
        style={{
          borderColor: theme.primaryBorder,
        }}
      >
        {/* Inner Frame */}
        <div
          className="
            relative
            flex
            h-full
            flex-col
            border-[1px]
            px-8
            py-7
          "
          style={{
            borderColor: `${theme.primaryBorder}80`,
          }}
        >
          {/* =================================================
              FORMAL CORNERS
          ================================================= */}
          <FormalCorner
            theme={theme}
            className="absolute -right-0.5 -top-0.5 z-20 size-10"
          />

          <FormalCorner
            theme={theme}
            className="absolute -left-0.5 -top-0.5 z-20 size-10 -scale-x-100"
          />

          <FormalCorner
            theme={theme}
            className="absolute -right-0.5 -bottom-0.5 z-20 size-10 -scale-y-100"
          />

          <FormalCorner
            theme={theme}
            className="absolute -left-0.5 -bottom-0.5 z-20 size-10 rotate-180"
          />

          {/* =================================================
              HEADER
          ================================================= */}
          <header
            className="
              relative
              flex
              shrink-0
              items-center
              justify-between
              pb-5
            "
            dir="rtl"
          >
            {/* ================= RIGHT ================= */}
            <div
              className="
                flex
                w-1/3
                flex-col
                text-right
              "
            >
              <h1
                className="
                  text-[21px]
                  font-black
                  leading-[1.5]
                  tracking-normal
                "
                style={{
                  color: theme.darkAccent,
                }}
              >
                وزارة التعليم
              </h1>

              <p
                dir="ltr"
                className="
                  mt-1
                  text-[12px]
                  font-bold
                  leading-[1.4]
                  tracking-wide
                  text-right
                "
                style={{
                  color: theme.darkAccent,
                }}
              >
                Ministry of Education
              </p>
            </div>

            {/* ================= LOGO ================= */}
            <div className="flex w-1/3 justify-center">
              <MinistryLogo src={logoSrc} />
            </div>

            {/* ================= LEFT ================= */}
            <div
              className="
                flex
                w-1/3
                flex-col
                text-left
              "
            >
              <h2
                className="
                  text-[20px]
                  font-black
                  leading-[1.5]
                  tracking-normal
                "
                style={{
                  color: theme.darkAccent,
                }}
              >
                الإدارة العامة للتعليم
              </h2>

              <PrintHeaderText
                value={data.region}
                className="
                  mt-1
                  w-full
                  bg-transparent
                  text-left
                  text-[19px]
                  font-bold
                  leading-[1.6]
                  outline-none
                "
              />
            </div>
          </header>

          {/* =================================================
              HEADER DIVIDER
          ================================================= */}
          <div
            className="
              relative
              mb-6
              flex
              h-[2px]
              w-full
              shrink-0
              items-center
              justify-center
            "
            style={{
              backgroundColor: '#d1d5db',
            }}
          >
            <div
              className="
                absolute
                h-[2px]
                w-1/3
              "
              style={{
                backgroundColor: theme.primaryBorder,
              }}
            />

            <div
              className="
                absolute
                h-1.5
                w-1.5
                rotate-45
                border
                bg-white
              "
              style={{
                borderColor: theme.primaryBorder,
              }}
            />
          </div>

          {/* =================================================
              TITLES
          ================================================= */}
          <section
            className="
              flex
              shrink-0
              flex-col
              items-center
              gap-4
              pb-7
              pt-1
            "
            dir="rtl"
          >
            {/* School */}
            <PrintHeaderText
              value={data.schoolName}
              className="
                w-full
                bg-transparent
                text-center
                text-[25px]
                font-black
                leading-[1.6]
                outline-none
              "
            />

            {/* Report Title */}
            <div className="mt-2 flex w-full justify-center">
              <TitleBanner theme={theme}>
                <PrintHeaderText
                  value={data.reportTitle}
                  className="
                    min-w-[300px]
                    bg-transparent
                    text-center
                    text-[29px]
                    font-black
                    leading-[1.6]
                    outline-none
                  "
                />
              </TitleBanner>
            </div>
          </section>

          {/* =================================================
              REPORT DETAILS
          ================================================= */}
          <section
            className="
              relative
              flex
              shrink-0
              flex-col
              gap-5
              rounded-xl
              border
              px-6
              py-5
            "
            style={{
              backgroundColor: `${theme.darkAccent}04`,
              borderColor: `${theme.primaryBorder}50`,
            }}
            dir="rtl"
          >
            {/* Decorative top line */}
            <div
              className="
                absolute
                left-6
                right-6
                top-0
                h-[2px]
                rounded-b-md
              "
              style={{
                backgroundColor: theme.primaryBorder,
              }}
            />

            <div className="grid grid-cols-2 gap-x-12 gap-y-5">
              {/* ================= COLUMN ONE ================= */}
              <div className="flex flex-col gap-4 text-right">
                <PrintField
                  theme={theme}
                  value={data.implementer}
                  label="المنفذ:"
                  align="right"
                  className="
                    text-[17px]
                    leading-[1.8]
                    text-right
                  "
                />

                <PrintField
                  theme={theme}
                  value={data.target}
                  label="المستهدفون:"
                  align="right"
                  className="
                    text-[17px]
                    leading-[1.8]
                    text-right
                  "
                />

                <PrintField
                  theme={theme}
                  value={data.beneficiaries}
                  label="عدد المستفيدين:"
                  align="right"
                  className="
                    text-[17px]
                    leading-[1.8]
                    text-right
                  "
                />

                <PrintField
                  theme={theme}
                  value={data.date}
                  label="تاريخ التنفيذ:"
                  align="right"
                  className="
                    text-[17px]
                    leading-[1.8]
                    text-right
                  "
                />
              </div>

              {/* ================= COLUMN TWO ================= */}
              <div className="flex h-full flex-col gap-4 text-right">
                <PrintField
                  theme={theme}
                  value={data.location}
                  label="مكان التنفيذ:"
                  align="right"
                  className="
                    text-[17px]
                    leading-[1.8]
                    text-right
                  "
                />

                <PrintField
                  theme={theme}
                  value={data.objectives}
                  label="الأهداف:"
                  type="textarea"
                  align="right"
                  className="
                    min-h-[120px]
                    flex-1
                    text-[17px]
                    leading-[2]
                    text-right
                  "
                />
              </div>
            </div>
          </section>

          {/* =================================================
              EVIDENCE SECTION
          ================================================= */}
          <section
            className="
              mt-6
              flex
              min-h-0
              flex-1
              flex-col
            "
            dir="rtl"
          >
            <div
              className="
                mb-4
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  h-5
                  w-1.5
                  rounded-full
                "
                style={{
                  backgroundColor: theme.primaryBorder,
                }}
              />

              <h3
                className="
                  text-[20px]
                  font-black
                  leading-[1.5]
                  tracking-normal
                "
                style={{
                  color: theme.darkAccent,
                }}
              >
                المرفقات والشواهد
              </h3>
            </div>

            <div className="min-h-0 w-full flex-1">
              <PrintEvidenceStack
                evidences={data.evidences}
                theme={theme}
              />
            </div>
          </section>

          {/* =================================================
              FOOTER
          ================================================= */}
          <footer
            className="
              mt-4
              flex
              shrink-0
              items-center
              justify-between
              border-t-[2px]
              pt-3
              text-[14px]
              font-bold
            "
            style={{
              borderColor: `${theme.primaryBorder}30`,
            }}
          >
            <span
              style={{
                color: theme.primaryBorder,
              }}
            >
              ■
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
});

ModernStylePrint.displayName = 'ModernStylePrint';

/* =============================================================
   TITLE BANNER
============================================================= */

function TitleBanner({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <div
      className="
        relative
        inline-flex
        items-center
        justify-center
        border-y-[3px]
        px-12
        py-3
      "
      style={{
        borderColor: theme.primaryBorder,
        backgroundColor: `${theme.primaryBorder}0D`,
      }}
      dir="rtl"
    >
      {/* Corners */}
      <div
        className="absolute left-0 top-0 h-2 w-[3px]"
        style={{
          backgroundColor: theme.primaryBorder,
        }}
      />

      <div
        className="absolute right-0 top-0 h-2 w-[3px]"
        style={{
          backgroundColor: theme.primaryBorder,
        }}
      />

      <div
        className="absolute bottom-0 left-0 h-2 w-[3px]"
        style={{
          backgroundColor: theme.primaryBorder,
        }}
      />

      <div
        className="absolute bottom-0 right-0 h-2 w-[3px]"
        style={{
          backgroundColor: theme.primaryBorder,
        }}
      />

      <div
        className="
          z-10
          whitespace-nowrap
          text-center
        "
        style={{
          color: theme.darkAccent,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* =============================================================
   FORMAL GEOMETRIC CORNER
============================================================= */

function FormalCorner({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 0 H40 V4 H4 V40 H0 V0 Z"
        fill={theme.primaryBorder}
      />

      <rect
        x="6"
        y="6"
        width="4"
        height="4"
        fill={theme.titleBorder || theme.darkAccent}
      />
    </svg>
  );
}
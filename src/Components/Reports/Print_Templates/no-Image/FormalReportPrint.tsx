import React from 'react';

import type { ReportFormData } from '../../../../types/ReportsTypes';
import type { Theme } from '../../../../misc/Theme';

import { MinistryLogo } from '../../../../Icons/Icons';
import { PrintField } from '../../Print/PrintField';
import { PrintHeaderText } from '../../Print/Printheadertext';

export type ReportPrintDocumentProps = {
  data: ReportFormData;
  theme: Theme;
  logoSrc?: string;
};

export const FormalReportPrint = React.forwardRef<
  HTMLDivElement,
  ReportPrintDocumentProps
>(({ data, theme, logoSrc }, ref) => {
  return (
    <div
      ref={ref}
      dir="rtl"
      className="
        relative
        m-0
        flex
        h-[297mm]
        min-h-[297mm]
        w-[210mm]
        flex-col
        overflow-hidden
        bg-white
        font-[Arial,sans-serif]
        text-[#173f56]
        shadow-none
      "
      style={{
        pageBreakAfter: 'always',
      }}
    >
      {/* إعدادات الطباعة */}
      <style type="text/css">
        {`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }

            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `}
      </style>

      {/* الخط العلوي */}
      <div
        className="absolute left-0 top-0 z-20 h-[6px] w-full"
        style={{
          background: theme.headerGradient,
        }}
      />

      {/* ================= HEADER ================= */}
      <header
        className="
          relative
          z-10
          w-full
          shrink-0
          px-[13mm]
          pb-[9mm]
          pt-[12mm]
        "
      >
        <div
          className="
            flex
            w-full
            items-center
            justify-between
            gap-[8mm]
          "
        >
          {/* الإدارة */}
          <div className="w-[38%] text-right">
            <div
              className="mb-2 text-[16px] font-bold"
              style={{
                color: theme.labelColor,
              }}
            >
              الإدارة العامة للتعليم
            </div>

            <PrintHeaderText
              value={data.region}
              className="
                w-full
                min-w-0
                justify-start
                bg-transparent
                text-right
                text-[20px]
                font-black
                !border-0
                !outline-none
                focus:!border-0
                focus:!outline-none
                focus:!ring-0
              "
            />
          </div>

          {/* الشعار */}
          <div className="flex w-[24%] justify-center">
            <div
              className="
                flex
                h-[27mm]
                w-[27mm]
                items-center
                justify-center
                rounded-full
                border-[2.5px]
                bg-white
                p-[3.5mm]
              "
              style={{
                borderColor: theme.titleBorder,
              }}
            >
              <MinistryLogo src={logoSrc} />
            </div>
          </div>

          {/* الوزارة */}
          <div className="w-[38%] text-left">
            <div
              className="text-[20px] font-black"
              style={{
                color: theme.labelColor,
              }}
            >
              وزارة التعليم
            </div>

            <div
              className="mt-1 text-[12px] font-medium tracking-wide"
              style={{
                color: theme.labelColor,
                opacity: 0.7,
              }}
            >
              Ministry of Education
            </div>
          </div>
        </div>

        {/* الفاصل */}
        <div className="mt-[7mm] flex items-center gap-3">
          <div
            className="h-[1.5px] flex-1"
            style={{
              backgroundColor: `${theme.primaryBorder}60`,
            }}
          />

          <div
            className="h-[7px] w-[7px] rotate-45"
            style={{
              backgroundColor: theme.titleBorder,
            }}
          />

          <div
            className="h-[1.5px] flex-1"
            style={{
              backgroundColor: `${theme.primaryBorder}60`,
            }}
          />
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main
        className="
          relative
          z-10
          flex
          w-full
          flex-1
          flex-col
          min-h-0
        "
      >
        {/* ================= SCHOOL + TITLE ================= */}
        <section className="shrink-0 px-[13mm]">
          {/* المدرسة */}
          <div
            className="
              rounded-[5px]
              border-[2px]
              px-[6mm]
              py-[4mm]
              text-center
            "
            style={{
              backgroundColor: `${theme.primaryBorder}08`,
              borderColor: theme.primaryBorder,
            }}
          >
            <div
              className="mb-1 text-[12px] font-bold"
              style={{
                color: theme.labelColor,
              }}
            >
              المدرسة
            </div>

            <PrintHeaderText
              value={data.schoolName}
              className="
                w-full
                min-w-0
                bg-transparent
                text-center
                text-[21px]
                font-black
                !border-0
                !outline-none
                focus:!border-0
                focus:!outline-none
                focus:!ring-0
              "
            />
          </div>

          {/* عنوان التقرير */}
          <div
            className="
              relative
              mt-[4mm]
              overflow-hidden
              rounded-[5px]
              border-[2px]
              px-[7mm]
              py-[5mm]
              text-center
            "
            style={{
              background: theme.headerGradient,
              borderColor: theme.titleBorder,
            }}
          >
            <div
              className="absolute right-0 top-0 h-full w-[3mm]"
              style={{
                backgroundColor: theme.titleBorder,
              }}
            />

            <div className="relative">
              <PrintHeaderText
                value={data.reportTitle}
                className="
                  w-full
                  min-w-0
                  bg-transparent
                  text-center
                  text-[23px]
                  font-black
                  text-white
                  !border-0
                  !outline-none
                  focus:!border-0
                  focus:!outline-none
                  focus:!ring-0
                "
              />
            </div>
          </div>
        </section>

        {/* ================= REPORT DATA ================= */}
        <section className="shrink-0 px-[13mm] pt-[6mm]">
          <PrintSectionHeading
            title="بيانات التقرير"
            theme={theme}
          />

          <div className="mt-[4mm] grid grid-cols-2 gap-[4mm]">
            {/* مكان التنفيذ */}
            <PrintInfoCard
              label="مكان التنفيذ"
              theme={theme}
              icon={<MapPinIcon />}
            >
              <PrintField
                theme={theme}
                value={data.location}
                label=""
                align="right"
                className="
                  w-full
                  min-w-0
                  bg-transparent
                  p-0
                  text-[19px]
                  font-bold
                  !border-0
                  !outline-none
                  focus:!border-0
                  focus:!outline-none
                  focus:!ring-0
                "
              />
            </PrintInfoCard>

            {/* الفئة المستهدفة */}
            <PrintInfoCard
              label="الفئة المستهدفة"
              theme={theme}
              icon={<TargetIcon />}
            >
              <PrintField
                theme={theme}
                value={data.target}
                label=""
                align="right"
                className="
                  w-full
                  min-w-0
                  bg-transparent
                  p-0
                  text-[19px]
                  font-bold
                  !border-0
                  !outline-none
                  focus:!border-0
                  focus:!outline-none
                  focus:!ring-0
                "
              />
            </PrintInfoCard>

            {/* المعلم / المنفذ */}
            <PrintInfoCard
              label="المعلم / المنفذ"
              theme={theme}
              icon={<UserIcon />}
            >
              <PrintField
                theme={theme}
                value={data.implementer}
                label=""
                align="right"
                className="
                  w-full
                  min-w-0
                  bg-transparent
                  p-0
                  text-[19px]
                  font-bold
                  !border-0
                  !outline-none
                  focus:!border-0
                  focus:!outline-none
                  focus:!ring-0
                "
              />
            </PrintInfoCard>

            {/* عدد المستفيدين */}
            <PrintInfoCard
              label="عدد المستفيدين"
              theme={theme}
              icon={<UsersIcon />}
            >
              <PrintField
                theme={theme}
                value={data.beneficiaries}
                label=""
                align="right"
                className="
                  w-full
                  min-w-0
                  bg-transparent
                  p-0
                  text-[15px]
                  font-bold
                  !border-0
                  !outline-none
                  focus:!border-0
                  focus:!outline-none
                  focus:!ring-0
                "
              />
            </PrintInfoCard>

            {/* تاريخ التنفيذ */}
            <div
              className="
                col-span-2
                rounded-[5px]
                border-[2px]
                bg-white
              "
              style={{
                borderColor: theme.primaryBorder,
              }}
            >
              <div
                className="
                  flex
                  min-h-[21mm]
                  items-center
                  gap-[4mm]
                  px-[5mm]
                  py-[3mm]
                "
              >
                <div
                  className="
                    flex
                    h-[11mm]
                    w-[11mm]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[4px]
                  "
                  style={{
                    backgroundColor: `${theme.primaryBorder}12`,
                    color: theme.primaryBorder,
                  }}
                >
                  <CalendarIcon />
                </div>

                <div className="min-w-0 flex-1">
                  <div
                    className="mb-1 text-[19px] font-black"
                    style={{
                      color: theme.labelColor,
                    }}
                  >
                    تاريخ التنفيذ
                  </div>

                  <PrintField
                    theme={theme}
                    value={data.date}
                    label=""
                    align="right"
                    className="
                      w-full
                      min-w-0
                      bg-transparent
                      p-0
                      p-6
                      text-[25px]
                      font-bold
                      !border-0
                      !outline-none
                      focus:!border-0
                      focus:!outline-none
                      focus:!ring-0
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= OBJECTIVES ================= */}
        <section className="mb-5 flex flex-1 flex-col px-[13mm] pt-[6mm]">
          <PrintSectionHeading
            title="أهداف التقرير"
            theme={theme}
          />

          <div
            className="
              mt-[4mm]
              flex
              flex-1
              flex-col
              overflow-hidden
              rounded-[5px]
              border-[2px]
            "
            style={{
              borderColor: theme.primaryBorder,
            }}
          >
            {/* عنوان الأهداف */}
            <div
              className="
                flex
                shrink-0
                items-center
                gap-[3mm]
                px-[5mm]
                py-[3mm]
              "
              style={{
                backgroundColor: `${theme.primaryBorder}0D`,
                borderBottom: `1px solid ${theme.primaryBorder}25`,
              }}
            >
              <div
                className="
                  flex
                  h-[9mm]
                  w-[9mm]
                  items-center
                  justify-center
                  rounded-[3px]
                "
                style={{
                  backgroundColor: theme.primaryBorder,
                  color: '#ffffff',
                }}
              >
                <TargetIcon />
              </div>

              <span
                className="text-[19px] font-black"
                style={{
                  color: theme.labelColor,
                }}
              >
                الأهداف والنتائج المتوقعة
              </span>
            </div>

            {/* محتوى الأهداف */}
            <div className="flex flex-1 flex-col bg-white px-[5mm] py-[4mm]">
              <PrintField
                theme={theme}
                value={data.objectives}
                label=""
                type="textarea"
                align="right"
                className="
                  flex-1
                  w-full
                  resize-none
                  bg-transparent
                  p-0
                  text-[22px]
                  font-medium
                  leading-[2]
                  !border-0
                  !outline-none
                  focus:!border-0
                  focus:!outline-none
                  focus:!ring-0
                "
              />
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer
        className="
          relative
          z-20
          mt-auto
          flex
          h-[10px]
          w-full
          shrink-0
          items-center
          justify-between
          px-[13mm]
        "
        style={{
          background: theme.headerGradient,
        }}
      >
        <div
          className="h-[2px] w-[14mm]"
          style={{
            backgroundColor: theme.titleBorder,
          }}
        />
      </footer>
    </div>
  );
});

FormalReportPrint.displayName = 'FormalReportPrint';

/* =========================================================
   SECTION HEADING
========================================================= */

function PrintSectionHeading({
  title,
  theme,
}: {
  title: string;
  theme: Theme;
}) {
  return (
    <div className="flex items-center gap-[3mm]">
      <div
        className="
          flex
          h-[9mm]
          w-[9mm]
          items-center
          justify-center
          rounded-[3px]
        "
        style={{
          backgroundColor: theme.primaryBorder,
          color: '#ffffff',
        }}
      >
        <ClipboardIcon />
      </div>

      <div>
        <div
          className="text-[15px] font-black"
          style={{
            color: theme.darkAccent,
          }}
        >
          {title}
        </div>

        <div
          className="mt-[1mm] h-[1px] w-[11mm]"
          style={{
            backgroundColor: theme.titleBorder,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function PrintInfoCard({
  icon,
  label,
  children,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <div
      className="
        min-w-0
        rounded-[5px]
        border-[2px]
        bg-white
      "
      style={{
        borderColor: theme.primaryBorder,
      }}
    >
      <div
        className="
          flex
          min-h-[23mm]
          items-center
          gap-[5mm]
          px-[6mm]
          py-[3.5mm]
        "
      >
        {/* Icon */}
        <div
          className="
            flex
            h-[12mm]
            w-[12mm]
            shrink-0
            items-center
            justify-center
            rounded-[4px]
          "
          style={{
            backgroundColor: `${theme.primaryBorder}12`,
            color: theme.primaryBorder,
          }}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="mb-[1.5mm] text-[12px] font-black"
            style={{
              color: theme.labelColor,
            }}
          >
            {label}
          </div>

          <div
            className="
              w-full
              min-w-0
              overflow-hidden
              break-words
              border-0
              bg-transparent
              p-0
              text-[15px]
              font-bold
              leading-[1.7]
            "
            style={{
              color: theme.darkAccent,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ICONS
========================================================= */

function ClipboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-[5mm] w-[5mm]"
    >
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V2h6v2" />
      <path d="M9 9h6" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-[5mm] w-[5mm]"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-[5mm] w-[5mm]"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-[5mm] w-[5mm]"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-[5mm] w-[5mm]"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-6 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-[4.5mm] w-[4.5mm]"
      style={{
        color: 'currentColor',
      }}
    >
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="M8 14h2" />
      <path d="M14 14h2" />
      <path d="M8 18h2" />
      <path d="M14 18h2" />
    </svg>
  );
}
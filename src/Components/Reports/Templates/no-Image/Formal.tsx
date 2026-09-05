import React from 'react';
import {
  CalendarDays,
  MapPin,
  UserRound,
  Users,
  Target,
  ClipboardList,
} from 'lucide-react';

import type { ReportEditFormProps } from '../../../../types/ReportsTypes';
import EditableHeaderText from '../../Editable/EditableHeader';
import { EditableField } from '../../Editable/EditableField';
import { MinistryLogo } from '../../../../Icons/Icons';

/* =========================================================
 * FORMAL REPORT
 *
 * تقرير مدرسي رسمي بدون صور.
 *
 * يعتمد فقط على:
 * - ReportFormData
 * - Theme
 * - onChange
 * - logoSrc
 *
 * لا يحتوي على:
 * - منطق حفظ
 * - منطق تصدير
 * - حقول إضافية غير موجودة في ReportFormData
 * ========================================================= */

export function FormalReport({
  formData,
  errors,
  theme,
  logoSrc,
  onChange,
}: ReportEditFormProps) {
  return (
    <main
      dir="rtl"
      className="min-h-screen px-3 py-6 font-[Arial,sans-serif] sm:px-6 sm:py-10"
      style={{
        backgroundColor: `${theme.darkAccent}12`,
      }}
    >
      {/* =====================================================
          LOCAL STYLES
      ===================================================== */}

      <style>{`
        .formal-report input,
        .formal-report textarea {
          color: ${theme.darkAccent} !important;
          caret-color: ${theme.primaryBorder};
        }

        .formal-report input::placeholder,
        .formal-report textarea::placeholder {
          color: ${theme.darkAccent}70 !important;
        }

        .formal-report input:focus,
        .formal-report textarea:focus {
          outline: none !important;
        }

        .formal-header-input {
          transition:
            border-color 180ms ease,
            background-color 180ms ease,
            box-shadow 180ms ease;
        }

        .formal-header-input:hover,
        .formal-header-input:focus {
          border-color: ${theme.titleBorder} !important;
          background-color: ${theme.primaryBorder}08 !important;
        }

        /* =====================================================
           DATE PICKER
           مهم: منع قص التقويم بسبب overflow
        ===================================================== */

        .formal-report .date-field-container {
          position: relative;
          z-index: 50;
        }

        .formal-report .date-field-container .rmdp-container {
          z-index: 9999 !important;
        }

        .formal-report .date-field-container .rmdp-wrapper {
          z-index: 9999 !important;
        }

        .formal-report .date-field-container .rmdp-calendar {
          z-index: 9999 !important;
        }
      `}</style>

      {/* =====================================================
          PAPER
      ===================================================== */}

      <div className="formal-report mx-auto w-full max-w-[920px]">
        <div
          className="
            overflow-visible
            rounded-[22px]
            border-[1.5px]
            bg-[#fdfcf9]
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          "
          style={{
            borderColor: `${theme.primaryBorder}55`,
          }}
        >
          {/* =================================================
              TOP ACCENT
          ================================================= */}

          <div
            className="h-2 w-full rounded-t-[20px]"
            style={{
              background: theme.headerGradient,
            }}
          />

          {/* =================================================
              HEADER
          ================================================= */}

          <header className="px-5 pb-6 pt-7 sm:px-10 sm:pb-8 sm:pt-9">
            <div
              className="
                grid
                grid-cols-1
                items-center
                gap-6
                sm:grid-cols-[1fr_auto_1fr]
                sm:gap-8
              "
            >
              {/* ---------------------------------------------
                  RIGHT — EDUCATION ADMINISTRATION
              --------------------------------------------- */}

              <div className="order-2 text-center sm:order-1 sm:text-right">
                <div
                  className="mb-2 text-[11px] font-bold sm:text-sm"
                  style={{
                    color: theme.labelColor,
                  }}
                >
                  الإدارة العامة للتعليم
                </div>

                <EditableHeaderText
                  name="region"
                  value={formData.region}
                  onChange={onChange}
                  placeholder="أدخل المنطقة"
                  className="
                    formal-header-input
                    w-full
                    rounded-md
                    border-b-[3px]
                    border-transparent
                    bg-transparent
                    px-2
                    py-1
                    text-center
                    text-base
                    font-black
                    outline-none
                    sm:text-right
                    sm:text-lg
                  "
                />
              </div>

              {/* ---------------------------------------------
                  CENTER — LOGO
              --------------------------------------------- */}

              <div className="order-1 flex justify-center sm:order-2">
                <div
                  className="
                    flex
                    size-[82px]
                    items-center
                    justify-center
                    rounded-full
                    border-[3px]
                    bg-white
                    p-3
                    shadow-sm
                    sm:size-[96px]
                  "
                  style={{
                    borderColor: theme.titleBorder,
                  }}
                >
                  <MinistryLogo src={logoSrc} />
                </div>
              </div>

              {/* ---------------------------------------------
                  LEFT — MINISTRY
              --------------------------------------------- */}

              <div className="order-3 text-center sm:text-left">
                <div
                  className="text-[13px] font-black sm:text-base"
                  style={{
                    color: theme.labelColor,
                  }}
                >
                  وزارة التعليم
                </div>

                <div
                  className="mt-1 text-[8px] font-medium tracking-wide sm:text-[10px]"
                  style={{
                    color: theme.labelColor,
                    opacity: 0.7,
                  }}
                >
                  Ministry of Education
                </div>
              </div>
            </div>

            {/* ---------------------------------------------
                HEADER DIVIDER
            --------------------------------------------- */}

            <div className="mt-7 flex items-center gap-3">
              <div
                className="h-[2px] flex-1"
                style={{
                  backgroundColor: `${theme.primaryBorder}45`,
                }}
              />

              <div
                className="size-2.5 rotate-45"
                style={{
                  backgroundColor: theme.titleBorder,
                }}
              />

              <div
                className="h-[2px] flex-1"
                style={{
                  backgroundColor: `${theme.primaryBorder}45`,
                }}
              />
            </div>
          </header>

          {/* =================================================
              SCHOOL NAME
          ================================================= */}

          <section className="px-5 sm:px-10">
            <div
              className="
                rounded-xl
                border-[2px]
                px-5
                py-4
                text-center
              "
              style={{
                backgroundColor: `${theme.primaryBorder}08`,
                borderColor: `${theme.primaryBorder}45`,
              }}
            >
              <div
                className="mb-1 text-[10px] font-bold sm:text-xs"
                style={{
                  color: theme.labelColor,
                }}
              >
                المدرسة
              </div>

              <EditableHeaderText
                name="schoolName"
                value={formData.schoolName}
                onChange={onChange}
                placeholder="أدخل اسم المدرسة"
                className="
                  formal-header-input
                  w-full
                  rounded-md
                  border-b-[3px]
                  border-transparent
                  bg-transparent
                  px-2
                  py-1
                  text-center
                  text-lg
                  font-black
                  outline-none
                  sm:text-xl
                "
              />
            </div>
          </section>

          {/* =================================================
              REPORT TITLE
          ================================================= */}

          <section className="px-5 pb-7 pt-5 sm:px-10 sm:pb-9">
            <div
              className="
                relative
                overflow-hidden
                rounded-xl
                border-[1.5px]
                px-5
                py-5
                text-center
                shadow-sm
                sm:px-8
                sm:py-6
              "
              style={{
                background: theme.headerGradient,
                borderColor: `${theme.titleBorder}80`,
              }}
            >
              {/* Decorative side */}

              <div
                className="absolute right-0 top-0 h-full w-2"
                style={{
                  backgroundColor: theme.titleBorder,
                }}
              />

              <div className="relative">
                <div className="mb-2 text-[19px] font-bold tracking-[0.18em] text-white/70 sm:text-[19px]">
                  عنوان التقرير 
                </div>

                <EditableHeaderText
                  name="reportTitle"
                  value={formData.reportTitle}
                  onChange={onChange}
                  placeholder="أدخل عنوان التقرير"
                  className="
                    formal-header-input
                    w-full
                    rounded-md
                    border-b-[3px]
                    border-transparent
                    bg-transparent
                    px-2
                    py-1
                    text-center
                    text-lg
                    font-black
                    !text-white
                    outline-none
                    placeholder:!text-white/60
                    sm:text-2xl
                  "
                />
              </div>
            </div>
          </section>

          {/* =================================================
              INFORMATION
          ================================================= */}

          <section className="px-5 pb-8 sm:px-10">
            <SectionHeading
              icon={<ClipboardList className="size-4" />}
              title="بيانات التقرير"
              theme={theme}
            />

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* LOCATION */}

              <InfoCard
                icon={<MapPin className="size-[18px]" />}
                label="مكان التنفيذ"
                theme={theme}
              >
                <EditableField
                  label=""
                  name="location"
                  value={formData.location}
                  onChange={onChange}
                  error={errors?.location}
                  theme={theme}
                  variant="default"
                  align="right"
                  placeholder="أدخل مكان التنفيذ"
                  className="
                    w-full
                    border-0
                    bg-transparent
                    px-0
                    py-0
                    text-sm
                    font-bold
                  "
                />
              </InfoCard>

              {/* TARGET */}

              <InfoCard
                icon={<Target className="size-[18px]" />}
                label="الفئة المستهدفة"
                theme={theme}
              >
                <EditableField
                  label=""
                  name="target"
                  value={formData.target}
                  onChange={onChange}
                  error={errors?.target}
                  theme={theme}
                  variant="default"
                  align="right"
                  placeholder="أدخل الفئة المستهدفة"
                  className="
                    w-full
                    border-0
                    bg-transparent
                    px-0
                    py-0
                    text-sm
                    font-bold
                  "
                />
              </InfoCard>

              {/* IMPLEMENTER */}

              <InfoCard
                icon={<UserRound className="size-[18px]" />}
                label="المعلم / المنفذ"
                theme={theme}
              >
                <EditableField
                  label=""
                  name="implementer"
                  value={formData.implementer}
                  onChange={onChange}
                  error={errors?.implementer}
                  theme={theme}
                  variant="default"
                  align="right"
                  placeholder="أدخل اسم المعلم أو المنفذ"
                  className="
                    w-full
                    border-0
                    bg-transparent
                    px-0
                    py-0
                    text-sm
                    font-bold
                  "
                />
              </InfoCard>

              {/* BENEFICIARIES */}

              <InfoCard
                icon={<Users className="size-[18px]" />}
                label="عدد المستفيدين"
                theme={theme}
              >
                <EditableField
                  label=""
                  name="beneficiaries"
                  value={formData.beneficiaries}
                  onChange={onChange}
                  error={errors?.beneficiaries}
                  theme={theme}
                  variant="default"
                  align="right"
                  placeholder="أدخل عدد المستفيدين"
                  className="
                    w-full
                    border-0
                    bg-transparent
                    px-0
                    py-0
                    text-sm
                    font-bold
                  "
                />
              </InfoCard>

              {/* DATE */}

              <InfoCard
                icon={<CalendarDays className="size-[18px]" />}
                label="تاريخ التنفيذ"
                theme={theme}
                fullWidth
                dateField
              >
                <div className="date-field-container relative z-50">
                  <EditableField
                    label=""
                    name="date"
                    value={formData.date}
                    onChange={onChange}
                    error={errors?.date}
                    type="date"
                    theme={theme}
                    variant="default"
                    align="right"
                    placeholder="اختر تاريخ التنفيذ"
                    className="
                      w-full
                      border-0
                      bg-transparent
                      px-0
                      py-0
                      text-sm
                      font-bold
                    "
                  />
                </div>
              </InfoCard>
            </div>
          </section>

          {/* =================================================
              OBJECTIVES
          ================================================= */}

          <section className="px-5 pb-9 sm:px-10">
            <SectionHeading
              icon={<Target className="size-4" />}
              title="أهداف التقرير"
              theme={theme}
            />

            <div
              className="mt-4 overflow-hidden rounded-xl border-[1.5px]"
              style={{
                borderColor: `${theme.primaryBorder}40`,
              }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  backgroundColor: `${theme.primaryBorder}0D`,
                  borderBottom: `1px solid ${theme.primaryBorder}25`,
                }}
              >
                <div
                  className="flex size-7 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: theme.primaryBorder,
                    color: '#ffffff',
                  }}
                >
                  <Target className="size-4" />
                </div>

                <span
                  className="text-xs font-black sm:text-sm"
                  style={{
                    color: theme.labelColor,
                  }}
                >
                  الأهداف والنتائج المتوقعة
                </span>
              </div>

              <div className="bg-white px-4 py-3 sm:px-5 sm:py-4">
                <EditableField
                  label=""
                  name="objectives"
                  value={formData.objectives}
                  onChange={onChange}
                  error={errors?.objectives}
                  type="textarea"
                  theme={theme}
                  variant="default"
                  align="right"
                  placeholder="اكتب أهداف التقرير والنتائج المتوقعة..."
                  className="
                    min-h-[155px]
                    w-full
                    border-0
                    bg-transparent
                    px-0
                    py-0
                    text-sm
                    font-medium
                    leading-8
                  "
                />
              </div>
            </div>
          </section>

          {/* =================================================
              SUMMARY STRIP
          ================================================= */}

          <section className="px-5 pb-8 sm:px-10">
            <div
              className="rounded-xl border-[1.5px] px-4 py-4 sm:px-5"
              style={{
                backgroundColor: `${theme.primaryBorder}06`,
                borderColor: `${theme.primaryBorder}30`,
              }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* IMPLEMENTER */}

                <div className="flex items-center gap-2">
                  <div
                    className="size-2 rounded-full"
                    style={{
                      backgroundColor: theme.titleBorder,
                    }}
                  />

                  <span
                    className="text-[11px] font-bold sm:text-xs"
                    style={{
                      color: theme.labelColor,
                    }}
                  >
                    المنفذ
                  </span>

                  <span
                    className="text-xs font-black sm:text-sm"
                    style={{
                      color: theme.darkAccent,
                    }}
                  >
                    {formData.implementer || 'لم يتم تحديد المنفذ'}
                  </span>
                </div>

                {/* DIVIDER */}

                <div
                  className="hidden h-5 w-px sm:block"
                  style={{
                    backgroundColor: `${theme.primaryBorder}30`,
                  }}
                />

                {/* DATE */}

                <div className="flex items-center gap-2">
                  <CalendarDays
                    className="size-4"
                    style={{
                      color: theme.primaryBorder,
                    }}
                  />

                  <span
                    className="text-[11px] font-bold sm:text-xs"
                    style={{
                      color: theme.labelColor,
                    }}
                  >
                    تاريخ التنفيذ
                  </span>

                  <span
                    className="text-xs font-black sm:text-sm"
                    style={{
                      color: theme.darkAccent,
                    }}
                  >
                    {formData.date || 'غير محدد'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer
            className="relative overflow-hidden rounded-b-[20px] px-5 py-5 sm:px-10"
            style={{
              background: theme.headerGradient,
            }}
          >
            <div className="relative flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-right">
            

              <div
                className="h-px w-20 sm:hidden"
                style={{
                  backgroundColor: theme.titleBorder,
                }}
              />

            
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  icon,
  title,
  theme,
}: {
  icon: React.ReactNode;
  title: string;
  theme: ReportEditFormProps['theme'];
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex size-8 items-center justify-center rounded-lg"
        style={{
          backgroundColor: theme.primaryBorder,
          color: '#ffffff',
        }}
      >
        {icon}
      </div>

      <div>
        <h2
          className="text-sm font-black sm:text-base"
          style={{
            color: theme.darkAccent,
          }}
        >
          {title}
        </h2>

        <div
          className="mt-1 h-0.5 w-10 rounded-full"
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

function InfoCard({
  icon,
  label,
  children,
  theme,
  fullWidth = false,
  dateField = false,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  theme: ReportEditFormProps['theme'];
  fullWidth?: boolean;
  dateField?: boolean;
}) {
  return (
    <div
      className={`
        relative
        rounded-xl
        border-[1.5px]
        bg-white
        ${fullWidth ? 'sm:col-span-2' : ''}
        ${dateField ? 'overflow-visible z-40' : 'overflow-hidden'}
      `}
      style={{
        borderColor: `${theme.primaryBorder}30`,
      }}
    >
      <div className="flex min-h-[82px] items-center gap-4 px-4 py-3">
        {/* Icon */}

        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${theme.primaryBorder}12`,
            color: theme.primaryBorder,
          }}
        >
          {icon}
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <div
            className="mb-1 text-[10px] font-black sm:text-xs"
            style={{
              color: theme.labelColor,
            }}
          >
            {label}
          </div>

          <div
            className="min-w-0 text-sm font-bold"
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
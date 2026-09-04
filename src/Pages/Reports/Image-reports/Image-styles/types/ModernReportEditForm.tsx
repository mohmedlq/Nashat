import React from 'react';
import {
  CalendarDays,
  Presentation,
  UserRound,
  Users,
} from 'lucide-react';

import type {
  ReportEditFormProps,
} from '../../../../../types/ReportsTypes';

import { EditableField } from '../EditableField';
import { EditableHeaderText } from '../EditableHeader';
import { EvidenceUploadGrid } from '../Evidenceuploadgrid';
import { MinistryLogo } from '../../../../../Icons/Icons';

export function ModernReportEditForm({
  formData,
  errors,
  theme,
  logoSrc,
  onChange,
  onImageUpload,
  onRemoveImage,
}: ReportEditFormProps) {
  return (
    <main
      dir="rtl"
      className="min-h-screen px-3 py-6 font-sans sm:px-6 sm:py-10"
      style={{
        backgroundColor: theme.darkAccent,
      }}
    >
      {/* =====================================================
          DYNAMIC THEME STYLES FOR INPUTS
      ===================================================== */}
      <style>{`
        /* تطبيق ألوان الثيم على حقول الإدخال العادية */
        .themed-inputs-container input,
        .themed-inputs-container textarea {
          border-color: ${theme.primaryBorder}80 !important;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* توهج الإطار عند التركيز (Focus) */
        .themed-inputs-container input:focus,
        .themed-inputs-container textarea:focus {
          border-color: ${theme.titleBorder} !important;
          box-shadow: 0 0 0 1px ${theme.titleBorder} !important;
          outline: none !important;
        }

        /* تنسيق حقول العناوين الشفافة (ظهور خط سفلي عند التمرير والتركيز) */
        .header-editable-text {
          border-bottom: 2px dashed transparent;
          transition: border-color 0.3s ease;
        }
        .header-editable-text:hover,
        .header-editable-text:focus {
          border-bottom-color: ${theme.titleBorder} !important;
        }
      `}</style>

      <div className="mx-auto w-full max-w-3xl">

        {/* =====================================================
            OUTER ORNAMENT FRAME
        ===================================================== */}

        <div
          className="relative rounded-[26px] border-2 p-2 shadow-2xl"
          style={{
            borderColor: theme.primaryBorder,
            backgroundColor: theme.darkAccent,
            boxShadow: `inset 0 0 0 1px ${theme.titleBorder}50, 0 25px 50px -12px rgba(0,0,0,0.5)`,
          }}
        >

          <div
            className="relative overflow-hidden rounded-[20px] border bg-[#efe9db]"
            style={{
              borderColor: `${theme.primaryBorder}70`,
            }}
          >

            {/* =================================================
                DECORATIVE CORNERS
            ================================================= */}

            <Corner theme={theme} className="absolute -left-1 -top-1 z-20 size-12 sm:size-16" />
            <Corner theme={theme} className="absolute -right-1 -top-1 z-20 size-12 rotate-90 sm:size-16" />
            <Corner theme={theme} className="absolute -bottom-1 -right-1 z-20 size-12 rotate-180 sm:size-16" />
            <Corner theme={theme} className="absolute -bottom-1 -left-1 z-20 size-12 -rotate-90 sm:size-16" />

            {/* =================================================
                HEADER
            ================================================= */}

            <header className="relative flex items-stretch justify-between gap-3 px-5 pb-5 pt-6 sm:gap-4 sm:px-10">

              <div
                className="flex min-w-0 flex-col items-start justify-center border-r-[3px] pr-3 text-right sm:pr-4"
                style={{ borderColor: theme.primaryBorder }}
              >
                <h1
                  className="text-base font-black leading-tight sm:text-2xl"
                  style={{ color: theme.labelColor }}
                >
                  وزارة التعليم
                </h1>
                <p
                  className="mt-1 text-[9px] font-medium tracking-wide sm:text-xs"
                  style={{ color: theme.labelColor, opacity: 0.8 }}
                >
                  Ministry of Education
                </p>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <MinistryLogo src={logoSrc} />
              </div>

              <div className="flex min-w-0 flex-col items-end justify-center text-left">
                <h2
                  className="text-sm font-black leading-snug sm:text-xl"
                  style={{ color: theme.labelColor }}
                >
                  الإدارة العامة للتعليم
                </h2>
                <EditableHeaderText
                  name="region"
                  value={formData.region}
                  onChange={onChange}
                  placeholder="أدخل المنطقة"
                  className="header-editable-text w-full bg-transparent text-left text-sm font-black leading-snug outline-none sm:text-xl"
                />
              </div>

            </header>

            {/* =================================================
                HEADER DIVIDER
            ================================================= */}

            <div
              className="mx-6 h-px sm:mx-10"
              style={{
                background: `linear-gradient(to left, transparent, ${theme.primaryBorder}, transparent)`,
                opacity: 0.65,
              }}
            />

            {/* =================================================
                SCHOOL + REPORT TITLE
            ================================================= */}

            <section className="space-y-4 px-5 pt-6 sm:px-10">
              <TitleBanner size="lg" theme={theme}>
                <EditableHeaderText
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={onChange}
                  placeholder="أدخل اسم المدرسة"
                  className="header-editable-text w-full bg-transparent text-center font-black outline-none"
                />
              </TitleBanner>

              <TitleBanner size="md" theme={theme}>
                <EditableHeaderText
                  name="reportTitle"
                  value={formData.reportTitle}
                  onChange={onChange}
                  placeholder="أدخل عنوان التقرير"
                  className="header-editable-text w-full bg-transparent text-center font-black outline-none"
                />
              </TitleBanner>
            </section>

            {/* =================================================
                INFORMATION FIELDS (مع إضافة كلاس الثيم هنا)
            ================================================= */}

            <section className="themed-inputs-container grid grid-cols-1 gap-x-6 gap-y-5 px-5 pt-6 sm:grid-cols-2 sm:px-10">

              {/* ================= COLUMN 1 ================= */}
              <div className="flex flex-col gap-5">
                <EditableField
                  label="المنفذ:"
                  name="implementer"
                  value={formData.implementer}
                  onChange={onChange}
                  error={errors?.implementer}
                  theme={theme}
                  variant="card"
                  icon={<UserRound className="size-7" strokeWidth={2} />}
                  placeholder="أدخل اسم المنفذ"
                  align="right"
                />

                <EditableField
                  label="المستهدفون:"
                  name="target"
                  value={formData.target}
                  onChange={onChange}
                  error={errors?.target}
                  theme={theme}
                  variant="card"
                  icon={<UserRound className="size-7" strokeWidth={2} />}
                  placeholder="أدخل الفئة المستهدفة"
                  align="right"
                />

                <EditableField
                  label="عدد المستفيدين:"
                  name="beneficiaries"
                  value={formData.beneficiaries}
                  onChange={onChange}
                  error={errors?.beneficiaries}
                  theme={theme}
                  variant="card"
                  icon={<Users className="size-7" strokeWidth={2} />}
                  placeholder="أدخل عدد المستفيدين"
                  align="right"
                />

                <EditableField
                  label="تاريخ التنفيذ:"
                  name="date"
                  value={formData.date}
                  onChange={onChange}
                  error={errors?.date}
                  type="date"
                  theme={theme}
                  variant="card"
                  icon={<CalendarDays className="size-7" strokeWidth={2} />}
                  align="right"
                />
              </div>

              {/* ================= COLUMN 2 ================= */}
              <div className="flex flex-col gap-5">
                <EditableField
                  label="مكان التنفيذ:"
                  name="location"
                  value={formData.location}
                  onChange={onChange}
                  error={errors?.location}
                  theme={theme}
                  variant="card"
                  icon={<Presentation className="size-7" strokeWidth={2} />}
                  placeholder="أدخل مكان التنفيذ"
                  align="right"
                />

                <EditableField
                  label="الأهداف:"
                  name="objectives"
                  value={formData.objectives}
                  onChange={onChange}
                  error={errors?.objectives}
                  type="textarea"
                  theme={theme}
                  className="min-h-[250px]"
                  align="right"
                  placeholder="اكتب أهداف النشاط، ويمكن كتابة كل هدف في سطر مستقل..."
                />
              </div>
            </section>

            {/* =================================================
                EVIDENCE
            ================================================= */}

            <div className="pt-8">
              <section className="px-5 pb-6 sm:px-10">
                <EvidenceUploadGrid
                  evidences={formData.evidences}
                  theme={theme}
                  onUpload={onImageUpload}
                  onRemove={onRemoveImage}
                />
              </section>
            </div>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div
              className="h-6"
              style={{
                backgroundColor: theme.darkAccent,
              }}
            />

          </div>
        </div>
      </div>
    </main>
  );
}


/* =============================================================
   TITLE BANNER
============================================================= */

function TitleBanner({
  children,
  size = 'lg',
  theme,
}: {
  children: React.ReactNode;
  size?: 'lg' | 'md';
  theme: ReportEditFormProps['theme'];
}) {
  return (
    <div className="relative">
      {/* THEME EDGE */}
      <div
        className="rounded-2xl p-[3px]"
        style={{
          background: `linear-gradient(145deg, #fbf0cf 0%, ${theme.titleBorder} 30%, ${theme.primaryBorder} 60%, ${theme.darkAccent} 100%)`,
          boxShadow: `0 12px 26px -12px ${theme.darkAccent}99, inset 0 1px 0 rgba(255,255,255,0.6)`,
        }}
      >
        {/* THEME BODY */}
        <div
          className="relative overflow-hidden rounded-[13px] px-5 py-3.5 sm:px-6 sm:py-4"
          style={{
            background: theme.headerGradient,
            boxShadow: `inset 0 0 0 1px ${theme.titleBorder}40, inset 0 2px 10px rgba(0,0,0,0.35)`,
          }}
        >
          {/* SHEEN */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] rounded-[13px] bg-gradient-to-b from-white/[0.16] to-transparent" />
          
          <div
            className={`relative drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] ${
              size === 'lg'
                ? 'text-2xl sm:text-3xl'
                : 'text-xl sm:text-2xl'
            }`}
            style={{ 
              color: theme.titleBorder 
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


/* =============================================================
   ORNAMENT CORNER
============================================================= */

function Corner({
  className,
  theme,
}: {
  className?: string;
  theme: ReportEditFormProps['theme'];
}) {
  return (
    <svg
      viewBox="0 0 90 90"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 86 V26 Q4 4 26 4 H86"
        stroke={theme.primaryBorder}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 86 V28 Q12 12 28 12 H86"
        stroke={theme.titleBorder}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M26 26 q10 -14 26 -14 M26 26 q-14 10 -14 26"
        stroke={theme.primaryBorder}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="26"
        cy="26"
        r="3.4"
        fill={theme.primaryBorder}
      />
    </svg>
  );
}
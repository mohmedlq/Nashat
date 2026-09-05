import React from 'react';
import {
  CalendarDays,
  Presentation,
  UserRound,
  Users,
} from 'lucide-react';

import type {
  ReportEditFormProps,
} from '../../../../types/ReportsTypes';

import { EditableField } from '../../Editable/EditableField';
import EditableHeaderText from '../../Editable/EditableHeader';
import { EvidenceUploadGrid } from '../../Editable/Evidenceuploadgrid';
import { MinistryLogo } from '../../../../Icons/Icons';

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
  className="min-h-screen px-3 py-6 sm:px-6 sm:py-10"
  style={{
    backgroundColor: theme.darkAccent,
    fontFamily: 'Arial, Tahoma, sans-serif',
  }}
>
  <style>{`
    .themed-inputs-container input,
    .themed-inputs-container textarea {
      border-color: ${theme.primaryBorder}80 !important;
      transition:
        border-color 0.25s ease,
        box-shadow 0.25s ease;
    }

    .themed-inputs-container input:focus,
    .themed-inputs-container textarea:focus {
      border-color: ${theme.titleBorder} !important;
      box-shadow: 0 0 0 1px ${theme.titleBorder} !important;
      outline: none !important;
    }

    .header-editable-text {
      border-bottom: 2px dashed transparent;
      transition: border-color 0.25s ease;
    }

    .header-editable-text:hover,
    .header-editable-text:focus {
      border-bottom-color: ${theme.titleBorder} !important;
    }
  `}</style>

  {/* =====================================================
      MAIN REPORT
  ===================================================== */}
  <div className="mx-auto w-full max-w-[1200px]">

    <div
      className="
        relative
        overflow-hidden
        rounded-[20px]
        border
        bg-[#efe9db]
      "
      style={{
        borderColor: `${theme.primaryBorder}70`,
      }}
    >

      {/* =================================================
          FORMAL CORNERS
      ================================================= */}
      <FormalCorner
        theme={theme}
        className="
          absolute
          -right-0.5
          -top-0.5
          z-20
          size-10
          sm:size-12
        "
      />

      <FormalCorner
        theme={theme}
        className="
          absolute
          -left-0.5
          -top-0.5
          z-20
          size-10
          -scale-x-100
          sm:size-12
        "
      />

      <FormalCorner
        theme={theme}
        className="
          absolute
          -right-0.5
          -bottom-0.5
          z-20
          size-10
          -scale-y-100
          sm:size-12
        "
      />

      <FormalCorner
        theme={theme}
        className="
          absolute
          -left-0.5
          -bottom-0.5
          z-20
          size-10
          rotate-180
          sm:size-12
        "
      />

      {/* =================================================
          HEADER
      ================================================= */}
      <header
        className="
          relative
          flex
          items-center
          justify-between
          gap-6
          px-6
          pb-6
          pt-7
          sm:gap-10
          sm:px-14
          sm:pb-7
          sm:pt-9
        "
      >

        <div
          className="
            flex
            min-w-0
            w-1/3
            flex-col
            text-right
          "
        >
          <h1
            className="
              text-[18px]
              font-black
              leading-[1.5]
              sm:text-[21px]
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
              text-[10px]
              font-bold
              leading-[1.4]
              tracking-wide
              text-right
              sm:text-[12px]
            "
            style={{
              color: theme.darkAccent,
            }}
          >
            Ministry of Education
          </p>
        </div>

        <div
          className="
            flex
            w-1/3
            shrink-0
            justify-center
          "
        >
          <MinistryLogo src={logoSrc} />
        </div>

        <div
          className="
            flex
            min-w-0
            w-1/3
            flex-col
            text-left
          "
        >
          <h2
            className="
              text-[17px]
              font-black
              leading-[1.5]
              sm:text-[20px]
            "
            style={{
              color: theme.darkAccent,
            }}
          >
            الإدارة العامة للتعليم
          </h2>

          <EditableHeaderText
            name="region"
            value={formData.region}
            onChange={onChange}
            placeholder="أدخل المنطقة"
            className="
              header-editable-text
              mt-1
              w-full
              bg-transparent
              text-left
              text-[16px]
              font-bold
              leading-[1.6]
              outline-none
              sm:text-[19px]
            "
          />
        </div>
      </header>

      {/* =================================================
          DIVIDER
      ================================================= */}
      <div
        className="
          relative
          mx-8
          mb-6
          h-[2px]
          sm:mx-14
        "
        style={{
          backgroundColor: '#d1d5db',
        }}
      >
        <div
          className="
            absolute
            left-1/3
            right-1/3
            top-0
            h-[2px]
          "
          style={{
            backgroundColor: theme.primaryBorder,
          }}
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            size-1.5
            -translate-x-1/2
            -translate-y-1/2
            rotate-45
            border
            bg-[#efe9db]
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
          flex-col
          items-center
          gap-4
          px-6
          pb-8
          pt-1
          sm:px-14
        "
        dir="rtl"
      >
        <EditableHeaderText
          name="schoolName"
          value={formData.schoolName}
          onChange={onChange}
          placeholder="أدخل اسم المدرسة"
          className="
            header-editable-text
            w-full
            bg-transparent
            text-center
            text-[21px]
            font-black
            leading-[1.6]
            outline-none
            sm:text-[25px]
          "
        />

        <div className="mt-2 flex w-full justify-center">
          <TitleBanner theme={theme}>
            <EditableHeaderText
              name="reportTitle"
              value={formData.reportTitle}
              onChange={onChange}
              placeholder="أدخل عنوان التقرير"
              className="
                header-editable-text
                w-full
                min-w-[260px]
                bg-transparent
                text-center
                text-[24px]
                font-black
                leading-[1.6]
                outline-none
                sm:min-w-[420px]
                sm:text-[29px]
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
          themed-inputs-container
          relative
          mx-6
          flex
          flex-col
          gap-5
          rounded-xl
          border
          px-6
          py-6
          sm:mx-14
          sm:px-8
          sm:py-7
        "
        style={{
          backgroundColor: `${theme.darkAccent}04`,
          borderColor: `${theme.primaryBorder}50`,
        }}
        dir="rtl"
      >
        <div
          className="
            absolute
            left-8
            right-8
            top-0
            h-[2px]
            rounded-b-md
          "
          style={{
            backgroundColor: theme.primaryBorder,
          }}
        />

        <div
          className="
            grid
            grid-cols-1
            gap-x-10
            gap-y-6
            sm:grid-cols-2
          "
        >

          {/* COLUMN ONE */}
          <div className="flex flex-col gap-5">

            <EditableField
              label="المنفذ:"
              name="implementer"
              value={formData.implementer}
              onChange={onChange}
              error={errors?.implementer}
              theme={theme}
              variant="card"
              icon={
                <UserRound
                  className="size-7"
                  strokeWidth={2}
                />
              }
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
              icon={
                <UserRound
                  className="size-7"
                  strokeWidth={2}
                />
              }
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
              icon={
                <Users
                  className="size-7"
                  strokeWidth={2}
                />
              }
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
              icon={
                <CalendarDays
                  className="size-7"
                  strokeWidth={2}
                />
              }
              align="right"
            />
          </div>

          {/* COLUMN TWO */}
          <div className="flex flex-col gap-5">

            <EditableField
              label="مكان التنفيذ:"
              name="location"
              value={formData.location}
              onChange={onChange}
              error={errors?.location}
              theme={theme}
              variant="card"
              icon={
                <Presentation
                  className="size-7"
                  strokeWidth={2}
                />
              }
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
              className="
                min-h-[250px]
                text-[16px]
                leading-[2]
              "
              align="right"
              placeholder="اكتب أهداف النشاط، ويمكن كتابة كل هدف في سطر مستقل..."
            />
          </div>
        </div>
      </section>

      {/* =================================================
          EVIDENCE
      ================================================= */}
      <section
        className="
          px-6
          pb-7
          pt-9
          sm:px-14
          sm:pt-10
        "
        dir="rtl"
      >
        <EvidenceUploadGrid
          evidences={formData.evidences}
          theme={theme}
          onUpload={onImageUpload}
          onRemove={onRemoveImage}
        />
      </section>

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
</main>
  );
}


/* =============================================================
   TITLE BANNER
============================================================= */

function TitleBanner({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: ReportEditFormProps['theme'];
}) {
  return (
    <div
      className="
        relative
        inline-flex
        w-full
        items-center
        justify-center
        border-y-[3px]
        px-8
        py-3
        sm:px-12
      "
      style={{
        borderColor: theme.primaryBorder,
        backgroundColor: `${theme.primaryBorder}0D`,
      }}
      dir="rtl"
    >
      {/* TOP LEFT */}
      <div
        className="
          absolute
          left-0
          top-0
          h-2
          w-[3px]
        "
        style={{
          backgroundColor: theme.primaryBorder,
        }}
      />

      {/* TOP RIGHT */}
      <div
        className="
          absolute
          right-0
          top-0
          h-2
          w-[3px]
        "
        style={{
          backgroundColor: theme.primaryBorder,
        }}
      />

      {/* BOTTOM LEFT */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-2
          w-[3px]
        "
        style={{
          backgroundColor: theme.primaryBorder,
        }}
      />

      {/* BOTTOM RIGHT */}
      <div
        className="
          absolute
          bottom-0
          right-0
          h-2
          w-[3px]
        "
        style={{
          backgroundColor: theme.primaryBorder,
        }}
      />

      <div
        className="
          z-10
          w-full
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
  theme: ReportEditFormProps['theme'];
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
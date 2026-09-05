import React from 'react';
import type { ReportEditFormProps } from '../../../../types/ReportsTypes';
import { MinistryLogo } from '../../../../Icons/Icons';
import { EditableField } from '../../Editable/EditableField';
import EditableHeaderText from '../../Editable/EditableHeader';
import { EvidenceUploadGrid } from '../../Editable/Evidenceuploadgrid';

/* =========================================================
 * أيقونات بسيطة inline (بدون أي مكتبة خارجية)
 * ========================================================= */

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

export function CyanGalleryStyle({
  formData,
  errors,
  theme,
  logoSrc,
  onChange,
  onImageUpload,
  onRemoveImage,
}: ReportEditFormProps) {
  return (
    <div
      className="mx-auto w-full max-w-[950px] overflow-hidden rounded-2xl bg-white font-[Arial,sans-serif] shadow-2xl"
      style={{ color: theme.darkAccent }}
    >
      {/* ================= HEADER ================= */}
      <header
        className="flex flex-col items-center gap-4 border-b-2 px-4 py-5 sm:flex-row sm:justify-between sm:px-8 sm:py-6"
        style={{ borderColor: theme.primaryBorder }}
      >
        {/* اسم المدرسة */}
        <div className="w-full text-center sm:w-1/3 sm:text-right" style={{ color: theme.primaryBorder }}>
          <EditableHeaderText
            name="schoolName"
            value={formData.schoolName}
            onChange={onChange}
            placeholder="أدخل اسم المدرسة"
            className="!text-inherit text-center text-[15px] font-bold leading-6 sm:text-right sm:text-[17px]"
          />
        </div>

        {/* الشعار + وزارة التعليم */}
        <div className="flex flex-col items-center gap-1">
          <MinistryLogo src={logoSrc} />
          <span className="text-[13px] font-bold" style={{ color: theme.labelColor }}>
            وزارة التعليم
          </span>
        </div>

        {/* المنطقة */}
        <div className="w-full text-center text-[12px] font-bold leading-6 text-[#4b5563] sm:w-1/3 sm:text-left">
          <p>المملكة العربية السعودية</p>
          <p>وزارة التعليم</p>
          <EditableHeaderText
            name="region"
            value={formData.region}
            onChange={onChange}
            placeholder="أدخل المنطقة/الإدارة"
            className="text-center sm:text-left"
          />
        </div>
      </header>

      {/* ================= TITLE BANNER ================= */}
      <div className="px-4 pt-5 sm:px-8">
        <div
          className="rounded-xl py-3 text-center text-[18px] font-bold text-white shadow-sm sm:py-4 sm:text-[22px]"
          style={{ background: theme.headerGradient }}
        >
          <EditableHeaderText
            name="reportTitle"
            value={formData.reportTitle}
            onChange={onChange}
            placeholder="أدخل عنوان التقرير"
            className="!text-inherit text-center text-white outline-none placeholder:!text-white/70"
          />
        </div>
      </div>

      {/* ================= CONTENT: TWO COLUMNS ================= */}
      <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 sm:p-8">
        {/* -------- LEFT: PHOTOS -------- */}
        <div>
          <EvidenceUploadGrid
            evidences={formData.evidences}
            theme={theme}
            onUpload={onImageUpload}
            onRemove={onRemoveImage}
            label="صور الشواهد"
          />
        </div>

        {/* -------- RIGHT: INFO -------- */}
        <div className="flex flex-col gap-3">
          {/* بطاقتا إحصاء */}
          <div className="grid grid-cols-2 gap-3">
            <EditableField
              theme={theme}
              variant="card"
              icon={<UsersIcon />}
              name="beneficiaries"
              value={formData.beneficiaries}
              onChange={onChange}
              error={errors.beneficiaries}
              label="عدد المستفيدين"
              align="center"
            />
            <EditableField
              theme={theme}
              variant="card"
              icon={<CalendarIcon />}
              name="date"
              type="date"
              value={formData.date}
              onChange={onChange}
              error={errors.date}
              label="تاريخ التنفيذ"
              align="center"
            />
          </div>

          {/* المنفذ */}
          <div className="rounded-xl p-3 text-center font-bold text-white" style={{ backgroundColor: theme.darkAccent }}>
            <span className="ml-1 opacity-80">المنفذ:</span>
            <EditableHeaderText
              name="implementer"
              value={formData.implementer}
              onChange={onChange}
              placeholder="أدخل اسم المنفذ"
              className="!text-inherit inline w-auto text-white"
            />
          </div>

          {/* مكان التنفيذ */}
          <div className="rounded-xl p-3 text-center font-bold text-white" style={{ backgroundColor: theme.darkAccent }}>
            <span className="ml-1 opacity-80">مكان التنفيذ:</span>
            <EditableHeaderText
              name="location"
              value={formData.location}
              onChange={onChange}
              placeholder="أدخل مكان التنفيذ"
              className="!text-inherit inline w-auto text-white"
            />
          </div>

          {/* المستهدفون + الأهداف */}
          <div
            className="flex flex-1 flex-col gap-3 rounded-2xl border-2 border-dashed p-4"
            style={{ borderColor: theme.primaryBorder }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block rounded-full px-4 py-1 text-xs font-bold text-white"
                style={{ backgroundColor: theme.darkAccent }}
              >
                المستهدفون
              </span>
              <EditableHeaderText
                name="target"
                value={formData.target}
                onChange={onChange}
                placeholder="مثلاً: الطلاب"
                className="flex-1 text-right text-[14px] font-bold"
              />
            </div>

            <div>
              <span
                className="mb-2 inline-block rounded-full px-4 py-1 text-xs font-bold text-white"
                style={{ backgroundColor: theme.darkAccent }}
              >
                الأهداف
              </span>
              <EditableField
                theme={theme}
                name="objectives"
                value={formData.objectives}
                onChange={onChange}
                error={errors.objectives}
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
        className="flex items-center justify-between px-4 py-3 text-white sm:px-8 sm:py-4"
        style={{ backgroundColor: theme.darkAccent }}
      >
        <span className="text-[13px] font-bold sm:text-[15px]">{formData.schoolName || 'اسم المدرسة'}</span>
        <span className="text-[11px] opacity-70">وزارة التعليم</span>
      </footer>
    </div>
  );
}
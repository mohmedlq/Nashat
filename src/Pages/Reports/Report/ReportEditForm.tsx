import React from 'react';
import type { ReportFormData } from '../../../types/ReportsTypes';
import type { Theme } from '../../../misc/Theme';
import { MinistryLogo } from '../../../Icons/Icons';
import { EditableField } from './EditableField';
import { EditableHeaderText } from './EditableHeader';
import { EvidenceUploadGrid } from './Evidenceuploadgrid';

export type ReportEditFormProps = {
  formData: ReportFormData;
  errors: Record<string, string>;
  theme: Theme;
  logoSrc?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onRemoveImage: (index: number) => void;
};

export function ReportEditForm({
  formData,
  errors,
  theme,
  logoSrc,
  onChange,
  onImageUpload,
  onRemoveImage,
}: ReportEditFormProps) {
  return (
    <div className="mx-auto w-full max-w-[950px] overflow-hidden rounded-2xl bg-white font-[Arial,sans-serif] text-[#173f56] shadow-2xl">
      {/* ================= HEADER ================= */}
      <header
        className="relative min-h-[150px] sm:min-h-[193px] overflow-visible rounded-b-[18px] pb-8 sm:pb-10"
        style={{ background: theme.headerGradient }}
      >
        <div className="mx-auto flex h-full max-w-[760px] flex-row items-center justify-center gap-3 px-3 pb-6 pt-5 text-white sm:gap-8 sm:px-4 sm:pb-7 sm:pt-6">
          <div className="flex items-center gap-2 border-r-[3px] border-white pr-3 sm:gap-4 sm:border-r-[4px] sm:pr-5">
            <div className="text-right text-[15px] font-bold leading-[1.55] sm:text-[21px]">
              وزارة التعليم
              <br />
              <span className="text-[9px] font-normal tracking-wide sm:text-[14px]">
                Ministry of Education
              </span>
            </div>

            <div className="flex items-center justify-center pr-1 sm:pr-2">
              <MinistryLogo src={logoSrc} />
            </div>
          </div>

          <div className="w-auto text-right text-[15px] font-bold leading-[1.7] sm:text-[21px]">
            الإدارة العامة للتعليم
            <br />
            <EditableHeaderText
              name="region"
              value={formData.region}
              onChange={onChange}
              placeholder="أدخل المنطقة"
              className="w-full min-w-0 sm:min-w-[180px] bg-transparent text-right font-bold text-white outline-none placeholder:text-white/60"
            />
          </div>
        </div>

        {/* ================= SCHOOL + TITLE ================= */}
        <div className="absolute -bottom-28 left-1/2 z-10 w-[calc(100%-32px)] max-w-[742px] -translate-x-1/2 sm:-bottom-40 sm:w-[calc(100%-112px)]">
          <div
            className="mb-2 rounded-[12px] px-3 py-2 shadow-sm sm:mb-3 sm:px-6 sm:py-4"
            style={{ backgroundColor: theme.darkAccent }}
          >
            <EditableHeaderText
              name="schoolName"
              value={formData.schoolName}
              onChange={onChange}
              placeholder="أدخل اسم المدرسة"
              className="w-full min-w-0 bg-transparent text-center text-[16px] font-bold text-white outline-none placeholder:text-white/60 sm:text-[21px]"
            />
          </div>

          <div
            className="border-b-[4px] px-3 py-2 sm:border-b-[7px] sm:px-6 sm:py-4"
            style={{ backgroundColor: theme.darkAccent, borderColor: theme.titleBorder }}
          >
            <EditableHeaderText
              name="reportTitle"
              value={formData.reportTitle}
              onChange={onChange}
              placeholder="أدخل عنوان التقرير"
              className="w-full min-w-0 bg-transparent text-center text-[18px] font-bold text-white outline-none placeholder:text-white/60 sm:text-[23px]"
            />
          </div>
        </div>
      </header>

      {/* ================= FIELDS ================= */}
      <section className="mx-auto max-w-[840px] px-3 pb-0 pt-[135px] sm:px-8 sm:pt-[194px]">
        <div className="grid grid-cols-[1.3fr_1fr] gap-x-2 gap-y-5 sm:gap-x-4 sm:gap-y-7">
          <EditableField
            theme={theme}
            name="implementer"
            value={formData.implementer}
            onChange={onChange}
            error={errors.implementer}
            label="المنفذ:"
            className="col-start-1 row-start-1"
          />

          <EditableField
            theme={theme}
            name="location"
            value={formData.location}
            onChange={onChange}
            error={errors.location}
            label="مكان التنفيذ:"
            className="col-start-2 row-start-1"
          />

          <EditableField
            theme={theme}
            name="target"
            value={formData.target}
            onChange={onChange}
            error={errors.target}
            label="المستهدفون:"
            className="col-start-1 row-start-2"
          />

          <EditableField
            theme={theme}
            name="beneficiaries"
            value={formData.beneficiaries}
            onChange={onChange}
            error={errors.beneficiaries}
            label="عدد المستفيدين:"
            className="col-start-1 row-start-3"
          />

          <EditableField
            theme={theme}
            name="date"
            type="date"
            value={formData.date}
            onChange={onChange}
            error={errors.date}
            label="تاريخ التنفيذ:"
            className="col-start-1 row-start-4"
          />

          <EditableField
            theme={theme}
            name="objectives"
            value={formData.objectives}
            onChange={onChange}
            error={errors.objectives}
            label="الأهداف:"
            type="textarea"
            align="right"
            className="min-h-[205px] col-start-2 row-start-2 row-span-3 sm:min-h-[237px]"
          />
        </div>

        <EvidenceUploadGrid
          evidences={formData.evidences}
          theme={theme}
          onUpload={onImageUpload}
          onRemove={onRemoveImage}
        />
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="h-[43px]" style={{ backgroundColor: theme.darkAccent }} />
    </div>
  );
}
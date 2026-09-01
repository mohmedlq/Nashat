import React, { useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import arabic from 'react-date-object/calendars/arabic';
import arabic_ar from 'react-date-object/locales/arabic_ar';
import type { ReportFormData } from '../../types/ReportsTypes';
import logoImage from '../../assets/MinistrLogo.png';
import { useUser } from "../../context/Context";
import DateObject from 'react-date-object';
const Picker = (DatePicker as any).default || DatePicker;

export type Theme = {
  id: string;
  name: string;
  headerGradient: string;
  darkAccent: string;
  primaryBorder: string;
  labelColor: string;
  titleBorder: string;
  btnBg: string;
  swatches: string[];
};

export const PRESET_THEMES: Theme[] = [
  {
    id: 'emerald-teal',
    name: 'الأخضر التعليمي (الافتراضي)',
    headerGradient:
      'linear-gradient(to left, #43bb77, #2da69f, #268bc1)',
    darkAccent: '#194760',
    primaryBorder: '#2b9bd4',
    labelColor: '#25b878',
    titleBorder: '#39b978',
    btnBg: '#39b978',
    swatches: ['#43bb77', '#2da69f', '#268bc1', '#194760'],
  },
  {
    id: 'royal-navy',
    name: 'الكحلي والذهبي الملكي',
    headerGradient:
      'linear-gradient(to left, #0f172a, #1e3a8a, #3b82f6)',
    darkAccent: '#0f172a',
    primaryBorder: '#3b82f6',
    labelColor: '#d97706',
    titleBorder: '#f59e0b',
    btnBg: '#d97706',
    swatches: ['#0f172a', '#1e3a8a', '#d97706'],
  },
  {
    id: 'burgundy-luxury',
    name: 'العنابي الدافئ',
    headerGradient:
      'linear-gradient(to left, #581c87, #831843, #be123c)',
    darkAccent: '#4c0519',
    primaryBorder: '#be123c',
    labelColor: '#9d174d',
    titleBorder: '#fb7185',
    btnBg: '#9d174d',
    swatches: ['#581c87', '#831843', '#be123c'],
  },
];

export interface ReportProps {
  initialData?: Partial<ReportFormData>;
  logoUrl?: string;
  initialThemeId?: string;
  onChange?: (data: ReportFormData) => void;
  onSubmit?: (data: ReportFormData) => void;
}


type FieldProps = {
  label: string;
  name: keyof ReportFormData;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  type?: 'text' | 'textarea' | 'date';
  className?: string;
  align?: 'center' | 'right';
  theme: Theme;
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  className = '',
  align = 'center',
  theme,
}: FieldProps) {
  return (
    <div
      className={`relative min-w-0 rounded-[11px] border-2 bg-white px-3 py-3 sm:px-5 sm:py-5 transition-all ${className}`}
      style={{
        borderColor: error ? '#ef4444' : theme.primaryBorder,
      }}
    >
      <span
        className="absolute -top-4 right-3 bg-white px-2 text-base font-bold transition-colors sm:-top-5 sm:right-5 sm:text-[22px]"
        style={{
          color: error ? '#ef4444' : theme.labelColor,
        }}
      >
        {label}
      </span>

      <div className="h-full w-full min-w-0">
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className={`h-full min-h-[140px] w-full resize-none overflow-auto bg-transparent text-base leading-[1.7] text-[#424242] outline-none placeholder:text-gray-300 sm:text-[19px] ${
              align === 'right' ? 'text-right' : 'text-center'
            }`}
            placeholder={`أدخل ${label}`}
          />
        ) : type === 'date' ? (
          <div className="relative flex w-full min-w-0 items-center">
            <Picker
              value={value ? value.replace(/[همـ\s]/g, '') : ''}
              onChange={(date: any) => {
                const formatted = date
                  ? `${date.format('YYYY/MM/DD')} هـ`
                  : '';

                onChange({
                  target: {
                    name,
                    value: formatted,
                  },
                } as any);
              }}
              calendar={arabic}
              locale={arabic_ar}
              calendarPosition="bottom-right"
              containerClassName="w-full"
              inputClass={`w-full min-w-0 bg-transparent text-base leading-7 text-[#424242] outline-none placeholder:text-gray-300 sm:text-[22px] sm:leading-8 ${
                align === 'right' ? 'text-right' : 'text-center'
              }`}
              placeholder={`اختر ${label}`}
            />
          </div>
        ) : (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full min-w-0 bg-transparent text-base leading-7 text-[#424242] outline-none placeholder:text-gray-300 sm:text-[22px] sm:leading-8 ${
              align === 'right' ? 'text-right' : 'text-center'
            }`}
            placeholder={`أدخل ${label}`}
          />
        )}
      </div>

      {error && (
        <span className="absolute -bottom-5 right-3 text-xs font-bold text-red-500 sm:-bottom-6 sm:right-5 sm:text-sm">
          {error}
        </span>
      )}
    </div>
  );
}

function MinistryLogo({ src }: { src?: string }) {
  return (
    <img
      src={src || logoImage}
      alt="شعار وزارة التعليم السعودية"
      className="h-[50px] w-auto object-contain brightness-0 invert sm:h-[75px]"
    />
  );
}

export default function Report({
  initialData,
  logoUrl,
  initialThemeId = 'emerald-teal',
  onChange,
  onSubmit,
}: ReportProps) {
     const {
    schoolName,
    teacherName,
    region,
  } = useUser();
const getTodayHijri = () => {
  const today = new DateObject({
    calendar: arabic,
    locale: arabic_ar,
  });

  return `${today.format('YYYY/MM/DD')} هـ`;
};
  const DEFAULT_FORM_DATA: ReportFormData = {
    schoolName: schoolName || '',
    region: region || '',
    reportTitle: '',
    implementer: teacherName || '',
    location: 'الفصل الدراسي',
    target: 'الطلاب',
    beneficiaries: '33',
    date: getTodayHijri(),
    objectives: '',
    evidences: [null, null, null, null],
  };
  const [formData, setFormData] = useState<ReportFormData>(() => ({
    ...DEFAULT_FORM_DATA,
    ...initialData,
    evidences:
      initialData?.evidences ?? DEFAULT_FORM_DATA.evidences,
  }));

  const [currentTheme, setCurrentTheme] = useState<Theme>(
    () =>
      PRESET_THEMES.find(
        (t) => t.id === initialThemeId
      ) || PRESET_THEMES[0]
  );

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        evidences:
          initialData.evidences ?? prev.evidences,
      }));
    }
  }, [initialData]);

  const updateFormData = (
    updater: (prev: ReportFormData) => ReportFormData
  ) => {
    setFormData((prev) => {
      const updated = updater(prev);
      onChange?.(updated);
      return updated;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    updateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    updateFormData((prev) => {
      const newEvidences = [...prev.evidences];
      newEvidences[index] = imageUrl;

      return {
        ...prev,
        evidences: newEvidences,
      };
    });
  };

  const handleRemoveImage = (index: number) => {
    updateFormData((prev) => {
      const newEvidences = [...prev.evidences];
      newEvidences[index] = null;

      return {
        ...prev,
        evidences: newEvidences,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.schoolName.trim())
      newErrors.schoolName = 'مطلوب';

    if (!formData.reportTitle.trim())
      newErrors.reportTitle = 'مطلوب';

    if (!formData.implementer.trim())
      newErrors.implementer = 'مطلوب';

    if (!formData.location.trim())
      newErrors.location = 'مطلوب';

    if (!formData.target.trim())
      newErrors.target = 'مطلوب';

    if (!formData.date.trim())
      newErrors.date = 'مطلوب';

    if (!formData.objectives.trim())
      newErrors.objectives = 'مطلوب';

    if (!formData.beneficiaries.trim()) {
      newErrors.beneficiaries = 'مطلوب';
    } else if (!/\d/.test(formData.beneficiaries)) {
      newErrors.beneficiaries = 'يجب أن يحتوي على رقم';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData);

      alert(
        'البيانات مكتملة! سيتم تجهيز التقرير للطباعة.'
      );

      window.print();
    }
  };

  const activeEvidencesCount =
    formData.evidences.filter(Boolean).length;

  const displayCount =
    activeEvidencesCount === 0
      ? 1
      : Math.min(activeEvidencesCount + 1, 4);

  const getGridItemClass = (
    index: number,
    total: number
  ) => {
    if (total === 1) {
      return 'sm:col-span-2 max-w-[500px] mx-auto w-full';
    }

    if (total === 3 && index === 2) {
      return 'sm:col-span-2 w-full';
    }

    return 'w-full';
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full overflow-x-hidden bg-slate-100 px-2 py-4 sm:px-4 sm:py-8 print:min-h-0 print:bg-white print:p-0 print:m-0"
    >
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        @media print {
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-[950px] overflow-hidden rounded-2xl bg-white font-[Arial,sans-serif] text-[#173f56] shadow-2xl transition-all print:w-full print:max-w-none print:rounded-none print:shadow-none print:m-0 print:p-0"
      >
        {/* ================= HEADER ================= */}

        <header
          className="relative min-h-[193px] overflow-visible rounded-b-[18px] pb-10 transition-all sm:pb-0"
          style={{
            background: currentTheme.headerGradient,
          }}
        >
          <div className="mx-auto flex h-full max-w-[760px] flex-col items-center justify-center gap-4 px-4 pb-24 pt-6 text-white sm:flex-row sm:gap-8 sm:pb-7">
            <div className="flex items-center gap-3 border-b-2 border-white/60 pb-3 sm:gap-4 sm:border-b-0 sm:border-r-[4px] sm:border-white sm:pb-0 sm:pr-5">
              <div className="text-center text-base font-bold leading-[1.4] sm:text-right sm:text-[21px] sm:leading-[1.55]">
                وزارة التعليم

                <br />

                <span className="text-[11px] font-normal tracking-wide sm:text-[14px]">
                  Ministry of Education
                </span>
              </div>

              <div className="flex items-center justify-center pr-1 sm:pr-2">
                <MinistryLogo src={logoUrl} />
              </div>
            </div>

            <div className="w-full text-center text-base font-bold leading-[1.4] sm:w-auto sm:text-right sm:text-[21px] sm:leading-[1.7]">
              الإدارة العامة للتعليم

              <br />

              <input
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="أدخل المنطقة"
                className="w-full min-w-0 bg-transparent text-center font-bold text-white outline-none placeholder:text-white/60 sm:min-w-[180px] sm:text-right"
              />
            </div>
          </div>

          {/* School + Title */}

          <div className="absolute -bottom-28 left-1/2 z-10 w-[92%] max-w-[742px] -translate-x-1/2 sm:-bottom-40 sm:w-[calc(100%-112px)]">
            <div
              className={`mb-2 rounded-[12px] px-3 py-2 shadow-sm transition-all sm:mb-3 sm:px-6 sm:py-4 ${
                errors.schoolName
                  ? 'ring-2 ring-red-500'
                  : ''
              }`}
              style={{
                backgroundColor:
                  currentTheme.darkAccent,
              }}
            >
              <input
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="أدخل اسم المدرسة"
                className="w-full min-w-0 bg-transparent text-center text-base font-bold text-white outline-none placeholder:text-white/60 sm:text-[21px]"
              />
            </div>

            <div
              className={`border-b-[4px] px-3 py-2 transition-all sm:border-b-[7px] sm:px-6 sm:py-4 ${
                errors.reportTitle
                  ? 'ring-2 ring-red-500'
                  : ''
              }`}
              style={{
                backgroundColor:
                  currentTheme.darkAccent,
                borderColor:
                  currentTheme.titleBorder,
              }}
            >
              <input
                name="reportTitle"
                value={formData.reportTitle}
                onChange={handleChange}
                placeholder="أدخل عنوان التقرير"
                className="w-full min-w-0 bg-transparent text-center text-lg font-bold text-white outline-none placeholder:text-white/60 sm:text-[23px]"
              />
            </div>
          </div>
        </header>

        {/* ================= FIELDS ================= */}

        <section className="mx-auto max-w-[840px] px-3 pb-8 pt-[140px] sm:px-8 sm:pt-[194px]">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:gap-y-7 md:grid-cols-[1.3fr_1fr]">
            <Field
              theme={currentTheme}
              name="implementer"
              value={formData.implementer}
              onChange={handleChange}
              error={errors.implementer}
              label="المنفذ:"
              className="md:col-start-1 md:row-start-1"
            />

            <Field
              theme={currentTheme}
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              label="مكان التنفيذ:"
              className="md:col-start-2 md:row-start-1"
            />

            <Field
              theme={currentTheme}
              name="target"
              value={formData.target}
              onChange={handleChange}
              error={errors.target}
              label="المستهدفون:"
              className="md:col-start-1 md:row-start-2"
            />

            <Field
              theme={currentTheme}
              name="beneficiaries"
              value={formData.beneficiaries}
              onChange={handleChange}
              error={errors.beneficiaries}
              label="عدد المستفيدين:"
              className="md:col-start-1 md:row-start-3"
            />

            <Field
              theme={currentTheme}
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              label="تاريخ التنفيذ:"
              className="md:col-start-1 md:row-start-4"
            />

            <Field
              theme={currentTheme}
              name="objectives"
              value={formData.objectives}
              onChange={handleChange}
              error={errors.objectives}
              label="الأهداف:"
              type="textarea"
              align="right"
              className="min-h-[180px] sm:min-h-[237px] md:col-start-2 md:row-span-3 md:row-start-2"
            />
          </div>

          {/* ================= EVIDENCES ================= */}

          <div
            className="relative mt-7 rounded-[11px] border-2 px-3 pb-5 pt-5 sm:px-5"
            style={{
              borderColor:
                currentTheme.primaryBorder,
            }}
          >
            <span
              className="absolute -top-4 right-1/2 translate-x-1/2 bg-white px-3 text-lg font-bold sm:-top-5 sm:text-[24px]"
              style={{
                color: currentTheme.labelColor,
              }}
            >
              الشواهد
            </span>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({
                length: displayCount,
              }).map((_, boxIndex) => {
                const imageSrc =
                  formData.evidences[boxIndex];

                const gridClass =
                  getGridItemClass(
                    boxIndex,
                    displayCount
                  );

                return (
                  <div
                    key={boxIndex}
                    className={`relative min-w-0 ${gridClass}`}
                  >
                    <label
                      className="group relative flex h-[180px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[11px] border-2 bg-white transition-all hover:border-dashed hover:bg-gray-50 sm:h-[230px]"
                      style={{
                        borderColor:
                          currentTheme.labelColor,
                      }}
                      aria-label={`شاهد ${
                        boxIndex + 1
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(
                            e,
                            boxIndex
                          )
                        }
                      />

                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={`شاهد ${
                            boxIndex + 1
                          }`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="flex flex-col items-center opacity-70 transition-opacity group-hover:opacity-100"
                          style={{
                            color:
                              currentTheme.labelColor,
                          }}
                        >
                          <span className="text-3xl leading-none sm:text-4xl">
                            +
                          </span>

                          <span className="mt-1 text-xs font-bold sm:text-sm">
                            إضافة صورة
                          </span>
                        </div>
                      )}
                    </label>

                    {imageSrc && (
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveImage(boxIndex)
                        }
                        className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white shadow-md transition-all hover:scale-105"
                        aria-label="حذف الصورة"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= MOBILE / FORM BUTTON ================= */}

          <div className="mt-6 flex justify-center sm:hidden">
            <button
              type="submit"
              className="w-full max-w-[360px] rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98]"
              style={{
                backgroundColor:
                  currentTheme.btnBg,
              }}
            >
              🖨️ حفظ واعتماد التقرير
            </button>
          </div>
        </section>

        <footer
          className="h-[43px]"
          style={{
            backgroundColor:
              currentTheme.darkAccent,
          }}
        />
      </form>

      {/* ================= CONTROLS ================= */}

      <div className="mx-auto mt-8 flex w-full max-w-[95%] flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur-md print:hidden sm:w-fit sm:flex-row sm:rounded-full sm:px-6 sm:py-3">
        <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:border-l sm:border-gray-300 sm:pl-4">
          <span className="whitespace-nowrap text-sm font-bold text-gray-700">
            اختر الثيم:
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRESET_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() =>
                  setCurrentTheme(theme)
                }
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                  currentTheme.id === theme.id
                    ? 'scale-105 shadow-sm ring-2 ring-blue-500 ring-offset-1'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex h-3.5 w-7 overflow-hidden rounded-full border border-gray-300">
                  {theme.swatches.map(
                    (color, i) => (
                      <span
                        key={i}
                        className="h-full flex-1"
                        style={{
                          backgroundColor:
                            color,
                        }}
                      />
                    )
                  )}
                </div>

                <span>
                  {theme.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          form=""
          onClick={handleSubmit}
          className="hidden w-full whitespace-nowrap rounded-full px-6 py-2 text-md font-bold text-white shadow-lg transition-all hover:scale-105 sm:block sm:w-auto"
          style={{
            backgroundColor:
              currentTheme.btnBg,
          }}
        >
          حفظ واعتماد التقرير 🖨️
        </button>
      </div>
    </div>
  );
}

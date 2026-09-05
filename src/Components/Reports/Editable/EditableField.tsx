import React from 'react';
import DatePicker from 'react-multi-date-picker';
import arabic from 'react-date-object/calendars/arabic';
import arabic_ar from 'react-date-object/locales/arabic_ar';
import type { ReportFormData } from '../../../types/ReportsTypes';
import type { Theme } from '../../../misc/Theme';

const Picker = (DatePicker as any).default || DatePicker;

export type EditableFieldProps = {
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

  /**
   * default:
   * الشكل التقليدي للحقل.
   *
   * card:
   * بطاقة معلومات مثل التصميم الجديد.
   */
  variant?: 'default' | 'card';

  /**
   * أيقونة الحقل عند استخدام variant="card"
   */
  icon?: React.ReactNode;

  /**
   * placeholder مخصص عند الحاجة
   */
  placeholder?: string;
};

export function EditableField({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  className = '',
  align = 'center',
  theme,
  variant = 'default',
  icon,
  placeholder,
}: EditableFieldProps) {
  /*
   * =========================
   * CARD VARIANT
   * =========================
   */

  if (variant === 'card') {
    return (
      <div
        className={`relative min-w-0 rounded-xl border bg-[#F8F9F8] p-3 transition-all duration-200 focus-within:bg-white ${className}`}
        style={{
          borderColor: error ? '#ef4444' : '#E1E5E2',
        }}
      >
        <div className="flex min-w-0 items-center gap-3">
          {/* Icon */}
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
            style={{
              backgroundColor: theme.darkAccent,
            }}
          >
            {icon}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <label
              htmlFor={`report-field-${String(name)}`}
              className="mb-1 block text-[12px] font-bold"
              style={{
                color: error ? '#ef4444' : theme.labelColor,
              }}
            >
              {label}
            </label>

            {type === 'textarea' ? (
              <textarea
                id={`report-field-${String(name)}`}
                name={String(name)}
                value={value}
                onChange={onChange}
                placeholder={placeholder ?? `أدخل ${label}`}
                className={`block min-h-[100px] w-full resize-none bg-transparent text-[15px] font-semibold leading-7 text-[#303632] outline-none placeholder:text-[#AEB6B0] sm:text-[16px] ${
                  align === 'right' ? 'text-right' : 'text-center'
                }`}
              />
            ) : type === 'date' ? (
              <div className="relative min-w-0">
                <Picker
                  value={value ? value.replace(/[همـ\s]/g, '') : ''}
                  onChange={(date: any) => {
                    const formatted = date
                      ? `${date.format('YYYY/MM/DD')} هـ`
                      : '';

                    onChange({
                      target: {
                        name: String(name),
                        value: formatted,
                      },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  calendar={arabic}
                  locale={arabic_ar}
                  calendarPosition="bottom-right"
                  containerClassName="w-full"
                  inputClass={`w-full min-w-0 bg-transparent text-[15px] font-semibold leading-7 text-[#303632] outline-none placeholder:text-[#AEB6B0] sm:text-[16px] ${
                    align === 'right' ? 'text-right' : 'text-center'
                  }`}
                  placeholder={placeholder ?? `اختر ${label}`}
                />
              </div>
            ) : (
              <input
                id={`report-field-${String(name)}`}
                type="text"
                name={String(name)}
                value={value}
                onChange={onChange}
                placeholder={placeholder ?? `أدخل ${label}`}
                className={`block w-full min-w-0 bg-transparent text-[15px] font-semibold leading-7 text-[#303632] outline-none placeholder:text-[#AEB6B0] sm:text-[16px] ${
                  align === 'right' ? 'text-right' : 'text-center'
                }`}
              />
            )}
          </div>
        </div>

        {error && (
          <span className="mt-1 block text-right text-[11px] font-bold text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }

  /*
   * =========================
   * DEFAULT VARIANT
   * =========================
   */

  return (
    <div
      className={`relative min-w-0 rounded-[11px] border-2 bg-white px-3 py-4 transition-all sm:px-5 sm:py-5 ${className}`}
      style={{
        borderColor: error ? '#ef4444' : theme.primaryBorder,
      }}
    >
      <label
        htmlFor={`report-field-${String(name)}`}
        className="absolute -top-4 right-4 bg-white px-2 text-[16px] font-bold transition-colors sm:-top-5 sm:right-5 sm:text-[22px]"
        style={{
          color: error ? '#ef4444' : theme.labelColor,
        }}
      >
        {label}
      </label>

      <div className="h-full w-full min-w-0">
        {type === 'textarea' ? (
          <textarea
            id={`report-field-${String(name)}`}
            name={String(name)}
            value={value}
            onChange={onChange}
            placeholder={placeholder ?? `أدخل ${label}`}
            className={`h-full min-h-[150px] w-full resize-none overflow-auto bg-transparent text-[16px] leading-[1.7] text-[#424242] outline-none placeholder:text-gray-300 sm:min-h-[190px] sm:text-[19px] ${
              align === 'right' ? 'text-right' : 'text-center'
            }`}
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
                    name: String(name),
                    value: formatted,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              calendar={arabic}
              locale={arabic_ar}
              calendarPosition="bottom-right"
              containerClassName="w-full"
              inputClass={`w-full min-w-0 bg-transparent text-[18px] leading-8 text-[#424242] outline-none placeholder:text-gray-300 sm:text-[22px] ${
                align === 'right' ? 'text-right' : 'text-center'
              }`}
              placeholder={placeholder ?? `اختر ${label}`}
            />
          </div>
        ) : (
          <input
            id={`report-field-${String(name)}`}
            type="text"
            name={String(name)}
            value={value}
            onChange={onChange}
            placeholder={placeholder ?? `أدخل ${label}`}
            className={`w-full min-w-0 bg-transparent text-[18px] leading-8 text-[#424242] outline-none placeholder:text-gray-300 sm:text-[22px] ${
              align === 'right' ? 'text-right' : 'text-center'
            }`}
          />
        )}
      </div>

      {error && (
        <span className="absolute -bottom-6 right-5 text-sm font-bold text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
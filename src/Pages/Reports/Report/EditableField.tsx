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
}: EditableFieldProps) {
  return (
    <div
      className={`relative min-w-0 rounded-[11px] border-2 bg-white px-3 py-4 transition-all sm:px-5 sm:py-5 ${className}`}
      style={{ borderColor: error ? '#ef4444' : theme.primaryBorder }}
    >
      <span
        className="absolute -top-4 right-4 bg-white px-2 text-[16px] font-bold transition-colors sm:-top-5 sm:right-5 sm:text-[22px]"
        style={{ color: error ? '#ef4444' : theme.labelColor }}
      >
        {label}
      </span>

      <div className="h-full w-full min-w-0">
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className={`h-full min-h-[150px] w-full resize-none overflow-auto bg-transparent text-[16px] leading-[1.7] text-[#424242] outline-none placeholder:text-gray-300 sm:min-h-[190px] sm:text-[19px] ${
              align === 'right' ? 'text-right' : 'text-center'
            }`}
            placeholder={`أدخل ${label}`}
          />
        ) : type === 'date' ? (
          <div className="relative flex w-full min-w-0 items-center">
            <Picker
              value={value ? value.replace(/[همـ\s]/g, '') : ''}
              onChange={(date: any) => {
                const formatted = date ? `${date.format('YYYY/MM/DD')} هـ` : '';
                onChange({
                  target: { name, value: formatted },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              calendar={arabic}
              locale={arabic_ar}
              calendarPosition="bottom-right"
              containerClassName="w-full"
              inputClass={`w-full min-w-0 bg-transparent text-[18px] leading-8 text-[#424242] outline-none placeholder:text-gray-300 sm:text-[22px] ${
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
            className={`w-full min-w-0 bg-transparent text-[18px] leading-8 text-[#424242] outline-none placeholder:text-gray-300 sm:text-[22px] ${
              align === 'right' ? 'text-right' : 'text-center'
            }`}
            placeholder={`أدخل ${label}`}
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
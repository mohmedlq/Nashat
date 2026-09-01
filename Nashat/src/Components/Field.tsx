import React, { useState } from 'react';
import DatePicker from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";

const Picker = (DatePicker as any).default || DatePicker;

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  type?: 'text' | 'textarea' | 'date';
  className?: string;
  align?: 'center' | 'right';
};

export default function Field({ label, name, value, onChange, type = 'text', className = '', align = 'center' }: FieldProps) {
  const [isHijri, setIsHijri] = useState(true);

  return (
    <div className={`relative rounded-[11px] border-2 border-[#2b9bd4] bg-white px-5 py-5 transition-colors ${className}`}>
      <span className="absolute -top-5 right-5 bg-white px-2 text-[22px] font-bold text-[#25b878]">
        {label}
      </span>
      <div className="h-full w-full">
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className={`h-full w-full resize-none bg-transparent text-[19px] leading-[1.7] text-[#424242] outline-none placeholder:text-gray-300 ${align === 'right' ? 'text-right' : 'text-center'}`}
            placeholder={`أدخل ${label}`}
          />
        ) : type === 'date' ? (
          <div className="relative w-full flex items-center">
            <Picker
              value={value.replace(/[همـ\s]/g, '')}
              onChange={(date: any) => {
                const suffix = isHijri ? 'هـ' : 'م';
                const formatted = date ? `${date.format('YYYY/MM/DD')} ${suffix}` : '';
                onChange({ target: { name, value: formatted } });
              }}
              calendar={isHijri ? arabic : gregorian}
              locale={isHijri ? arabic_ar : gregorian_ar}
              calendarPosition="bottom-right"
              inputClass={`w-full bg-transparent text-[22px] leading-8 text-[#424242] outline-none placeholder:text-gray-300 ${align === 'right' ? 'text-right' : 'text-center'}`}
              placeholder={`اختر ${label}`}
            />
            <button
              type="button"
              onClick={() => setIsHijri(!isHijri)}
              className="absolute left-0 text-[11px] font-bold bg-[#e8f6fc] text-[#2b9bd4] px-2 py-1.5 rounded-md hover:bg-[#2b9bd4] hover:text-white transition-colors print:hidden"
            >
              {isHijri ? 'لميلادي 🔄' : 'لهجري 🔄'}
            </button>
          </div>
        ) : (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full bg-transparent text-[22px] leading-8 text-[#424242] outline-none placeholder:text-gray-300 ${align === 'right' ? 'text-right' : 'text-center'}`}
            placeholder={`أدخل ${label}`}
          />
        )}
      </div>
    </div>
  );
}
import React from 'react';
import type { Theme } from '../../../misc/Theme';

export type PrintFieldProps = {
  label: string;
  value: string;
  type?: 'text' | 'textarea' | 'date';
  className?: string;
  align?: 'center' | 'right';
  theme: Theme;
};

export function PrintField({
  label,
  value,
  type = 'text',
  className = '',
  align = 'center',
  theme,
}: PrintFieldProps) {
  return (
    <div
      className={`relative rounded-[11px] border-2 bg-white px-3 py-4 ${className}`}
      style={{ borderColor: theme.primaryBorder }}
    >
      <span
        className="absolute -top-4 right-4 z-10 bg-white px-2 text-[16px] font-bold"
        style={{ color: theme.labelColor }}
      >
        {label}
      </span>

      <div className="flex h-full w-full items-center">
        <div
          className={`w-full whitespace-pre-wrap break-words text-[16px] leading-[1.6] text-[#424242] ${
            type === 'textarea' ? 'min-h-[190px] items-start' : ''
          } ${align === 'right' ? 'text-right' : 'text-center'}`}
        >
          {value && value.trim() ? value : '\u00A0'}
        </div>
      </div>
    </div>
  );
}
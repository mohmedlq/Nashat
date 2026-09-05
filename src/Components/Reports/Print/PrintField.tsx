import React from 'react';
import type { Theme } from '../../../misc/Theme';

export type PrintFieldProps = {
  label: string;
  value: string;
  type?: 'text' | 'textarea' | 'date';
  className?: string;
  align?: 'center' | 'right';
  theme: Theme;

  /**
   * default: الشكل التقليدي.
   * card: بطاقة معلومات — يطابق EditableField variant="card" بالضبط.
   */
  variant?: 'default' | 'card';

  /** أيقونة الحقل عند استخدام variant="card" (نفس الأيقونة المستخدمة بالعرض) */
  icon?: React.ReactNode;
};

export function PrintField({
  label,
  value,
  type = 'text',
  className = '',
  align = 'center',
  theme,
  variant = 'default',
  icon,
}: PrintFieldProps) {
  /* =========================
   * CARD VARIANT
   * ========================= */

  if (variant === 'card') {
    return (
      <div
        className={`relative rounded-xl border bg-[#F8F9F8] p-3 ${className}`}
        style={{ borderColor: '#E1E5E2' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
            style={{ backgroundColor: theme.darkAccent }}
          >
            {icon}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 text-[12px] font-bold" style={{ color: theme.labelColor }}>
              {label}
            </div>
            <div
              className={`whitespace-pre-wrap break-words text-[15px] font-semibold leading-7 text-[#303632] ${
                align === 'right' ? 'text-right' : 'text-center'
              }`}
            >
              {value && value.trim() ? value : '\u00A0'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
   * DEFAULT VARIANT
   * =========================
   * ملاحظة: ما فيه min-h ثابت على الـ textarea هنا عن قصد — أي تصميم
   * يحتاج ارتفاع أدنى معيّن يمرره بنفسه عبر className (مثل ClasicStylePrint
   * الذي يمرر min-h-[237px] بنفسه)، أو يعتمد على flex-1 من حاوية الأب
   * (مثل FormalReportPrint). فرض min-h هنا يكسر أي تصميم يبي "يملأ
   * المساحة المتبقية ديناميكيًا" بدل حد أدنى ثابت.
   */

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
            type === 'textarea' ? 'items-start' : ''
          } ${align === 'right' ? 'text-right' : 'text-center'}`}
        >
          {value && value.trim() ? value : '\u00A0'}
        </div>
      </div>
    </div>
  );
}
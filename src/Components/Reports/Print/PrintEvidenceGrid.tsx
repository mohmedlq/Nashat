import React from 'react';
import type { Theme } from '../../../misc/Theme';

export type PrintEvidenceStackProps = {
  evidences: (string | null)[];
  theme: Theme;
  className?: string;
};

/**
 * يعرض حتى 4 صور شواهد داخل عمود بارتفاع ثابت (h-full)، موزّعة
 * بشبكة CSS تملأ المساحة بالتساوي (fr units) — بعكس PrintEvidenceGrid
 * الذي يستخدم ارتفاعات بكسل ثابتة. مخصص لتصاميم تحتاج عمود صور
 * يملأ ارتفاع العمود المقابل له بالضبط.
 */
export function PrintEvidenceStack({ evidences, theme, className = '' }: PrintEvidenceStackProps) {
  const activeImages = evidences.filter((src): src is string => Boolean(src));

  if (activeImages.length === 0) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed text-sm font-bold ${className}`}
        style={{ borderColor: theme.primaryBorder, color: theme.labelColor }}
      >
        لا توجد صور شواهد
      </div>
    );
  }

  // شبكة 2 عمود دائمًا، وعدد الصفوف يتحدد حسب عدد الصور (1-2 صورة = صف
  // واحد بارتفاع كامل، 3-4 صور = صفين). كل خلية تملأ نصيبها بالتساوي.
  const rows = activeImages.length <= 2 ? 1 : 2;

  return (
    <div
      className={`grid h-full w-full gap-3 ${className}`}
      style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
    >
      {activeImages.map((src, index) => {
        // لو صورة وحدة، تمتد على العرض الكامل.
        const spanFull = activeImages.length === 1;

        return (
          <div
            key={index}
            className={`flex items-center justify-center overflow-hidden rounded-xl border-2 bg-white p-1 ${
              spanFull ? 'col-span-2' : ''
            }`}
            style={{ borderColor: theme.primaryBorder }}
          >
            <img src={src} alt={`شاهد ${index + 1}`} className="max-h-full max-w-full object-contain" />
          </div>
        );
      })}
    </div>
  );
}
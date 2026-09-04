import React from 'react';
import type { Theme } from '../../../misc/Theme';

export type PrintEvidenceGridProps = {
  evidences: (string | null)[];
  theme: Theme;
};

function getExportItemClass(index: number, total: number) {
  if (total === 1) return 'col-span-2 w-full';
  if (total === 3 && index === 2) return 'col-span-2 mx-auto w-[60%]';
  return 'w-full';
}

function getExportItemHeight(total: number) {
  if (total === 1) return 'h-[250px]'; // تم تقليل الارتفاع الضخم ليناسب A4
  if (total === 2) return 'h-[200px]';
  if (total === 3) return 'h-[180px]';
  return 'h-[150px]';
}

export function PrintEvidenceGrid({ evidences, theme }: PrintEvidenceGridProps) {
  const activeImages = evidences.filter((src): src is string => Boolean(src));

  if (activeImages.length === 0) return null;

  return (
    <div
      className="relative mt-8 rounded-[11px] border-2 px-5 pb-5 pt-6"
      style={{ borderColor: theme.primaryBorder }}
    >
      <span
        className="absolute -top-5 right-1/2 z-10 translate-x-1/2 bg-white px-4 text-[20px] font-bold"
        style={{ color: theme.labelColor }}
      >
        الشواهد
      </span>

      <div className="grid grid-cols-2 gap-4">
        {activeImages.map((src, index) => (
          <div
            key={index}
            className={`flex items-center justify-center overflow-hidden rounded-[11px] border-2 bg-white p-1 ${getExportItemHeight(
              activeImages.length
            )} ${getExportItemClass(index, activeImages.length)}`}
            style={{ borderColor: theme.primaryBorder }}
          >
            <img
              src={src}
              alt={`شاهد ${index + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}